// Read-only primary-source collector. Usage: node scripts/research-suppliers.mjs jobs.json output.json
// Each job specifies source (ui/ada/seeed/olimex), market, id and public product URL.
import fs from "node:fs";
const jobs = JSON.parse(fs.readFileSync(process.argv[2]));
const output = process.argv[3],
  results = fs.existsSync(output) ? JSON.parse(fs.readFileSync(output)) : [];
const clean = (s) =>
  String(s || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(x[0-9a-f]+|\d+);/gi, (_, n) =>
      String.fromCodePoint(
        n[0].toLowerCase() === "x" ? parseInt(n.slice(1), 16) : Number(n),
      ),
    )
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const nodes = (h) =>
  [
    ...h.matchAll(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g,
    ),
  ].flatMap((m) => {
    try {
      const j = JSON.parse(m[1]);
      return j["@graph"] || [j];
    } catch {
      return [];
    }
  });
for (let i = 0; i < jobs.length; i += 4) {
  await Promise.all(
    jobs.slice(i, i + 4).map(async (j) => {
      if (results.some((r) => r.url === j.url)) return;
      const r = { ...j, checked_at: new Date().toISOString() };
      try {
        const res = await fetch(j.url, { signal: AbortSignal.timeout(30000) });
        r.http_status = res.status;
        r.final_url = res.url;
        if (!res.ok) throw Error("Source HTTP " + res.status);
        const h = await res.text();
        if (["ada", "ui"].includes(j.source)) {
          const ns = nodes(h),
            group = ns.find((n) => n["@type"] === "ProductGroup");
          const p = group
            ? group.hasVariant.find((v) => v.sku?.endsWith("-" + j.market)) ||
              group.hasVariant[0]
            : ns.find((n) => n["@type"] === "Product");
          if (!p) throw Error("No structured product");
          const o = Array.isArray(p.offers) ? p.offers[0] : p.offers;
          const pr = o?.priceSpecification || o;
          Object.assign(r, {
            name: clean(p.name),
            sku: String(p.sku),
            price: Number(pr?.price),
            currency: pr?.priceCurrency,
            availability: o?.availability?.split("/").at(-1),
            source_url: p.url || j.url,
            tax_included: pr?.valueAddedTaxIncluded,
            images: (Array.isArray(p.image) ? p.image : [p.image])
              .map((x) => (typeof x === "string" ? x : x?.url))
              .filter(Boolean)
              .map((x) => x.replace(".com//", ".com/")),
          });
          // Public product description is retained only as a short factual excerpt for review, never a marketing claim.
          r.review_excerpt = clean(p.description).slice(0, 200);
          r.surcharge_mentioned =
            /Surcharge incl|surcharge/i.test(h) &&
            j.source === "ui" &&
            j.market === "US";
        } else if (j.source === "seeed") {
          const meta = (k) =>
            clean(
              h.match(
                new RegExp('<meta property="' + k + '"\\s+content="([^"]+)"'),
              )?.[1],
            );
          const amount = meta("product:price:amount");
          const priceNode = h.match(
            new RegExp(
              'id="product-price-' +
                j.id +
                '"[\\s\\S]{0,150}?data-price-amount="([^"]+)"',
            ),
          )?.[1];
          if (!amount || Number(amount) !== Number(priceNode))
            throw Error("Price metadata/rendered price mismatch");
          Object.assign(r, {
            name: meta("og:title"),
            price: Number(amount),
            currency: meta("product:price:currency"),
            images: [meta("og:image")],
            availability: /class="stock available"/.test(h)
              ? "InStock"
              : "Unknown",
            source_url: j.url,
          });
        } else if (j.source === "olimex") {
          const name = clean(h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]);
          const img = h.match(
            /<img[^>]*itemprop="image"[^>]*src="([^"]+)"/,
          )?.[1];
          Object.assign(r, {
            name,
            price: Number(h.match(/itemprop="price" content="([^"]+)"/)?.[1]),
            currency: h.match(
              /itemprop="priceCurrency" content="([^"]+)"/,
            )?.[1],
            availability: h.match(
              /itemprop="availability" content="[^"]*\/([^"]+)"/,
            )?.[1],
            images: img ? [new URL(img, j.url).href] : [],
            source_url: j.url,
          });
        }
        if (
          !r.name ||
          !r.images?.[0] ||
          !Number.isFinite(r.price) ||
          r.price <= 0 ||
          !["USD", "EUR", "CAD", "GBP"].includes(r.currency)
        )
          throw Error("Missing or invalid product/price/photo");
      } catch (e) {
        r.error = e.message;
      }
      results.push(r);
    }),
  );
  fs.writeFileSync(output, JSON.stringify(results, null, 2) + "\n");
  console.log("Reviewed", results.length, "of", jobs.length);
}
