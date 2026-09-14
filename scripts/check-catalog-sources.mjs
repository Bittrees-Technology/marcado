// Read-only, resumable review of public supplier pages. Never imports or purchases.
import fs from "node:fs";
import { createHash } from "node:crypto";
const [input, output] = process.argv.slice(2);
if (!input || !output || input === output)
  throw Error("Pass a catalog snapshot and a separate review output JSON path");
const rows = JSON.parse(fs.readFileSync(input));
const previous = fs.existsSync(output)
  ? JSON.parse(fs.readFileSync(output))
  : [];
const results = new Map(previous.map((r) => [r.id, r]));
const hosts = [...new Set(rows.map((r) => new URL(r.source_url).host))];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const save = () =>
  fs.writeFileSync(
    output,
    JSON.stringify([...results.values()], null, 2) + "\n",
  );
// At most three hosts in parallel; only one request per host every 2.5 seconds.
for (let i = 0; i < hosts.length; i += 3) {
  await Promise.all(
    hosts.slice(i, i + 3).map(async (host) => {
      for (const row of rows.filter(
        (r) => new URL(r.source_url).host === host,
      )) {
        if (results.get(row.id)?.reachable) continue;
        const result = {
          id: row.id,
          url: row.source_url,
          checked_at: new Date().toISOString(),
        };
        let limited = false;
        try {
          const response = await fetch(row.source_url, {
            signal: AbortSignal.timeout(25000),
          });
          result.http_status = response.status;
          if ([429, 403].includes(response.status)) {
            limited = true;
            result.retry_after = response.headers.get("retry-after");
          }
          if (!response.ok) throw Error("HTTP " + response.status);
          if (!response.headers.get("content-type")?.includes("text/html"))
            throw Error("Expected product HTML");
          const html = await response.text();
          result.title = html
            .match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]
            ?.trim();
          result.html_sha256 = createHash("sha256").update(html).digest("hex");
          result.reachable = Boolean(
            result.title &&
            !/404|not found|access denied|just a moment/i.test(result.title),
          );
          result.offers = [];
          const walk = (value) => {
            if (!value || typeof value !== "object") return;
            if (value.priceCurrency && value.price !== undefined)
              result.offers.push({
                price: Number(value.price),
                currency: value.priceCurrency,
                availability: value.availability,
              });
            for (const child of Object.values(value))
              if (typeof child === "object")
                Array.isArray(child) ? child.forEach(walk) : walk(child);
          };
          for (const match of html.matchAll(
            /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g,
          )) {
            try {
              walk(JSON.parse(match[1]));
            } catch {
              /* Record absence; never invent a price. */
            }
          }
          const amount = html.match(
            /property="product:price:amount"\s+content="([\d.]+)"/,
          )?.[1];
          const currency = html.match(
            /property="product:price:currency"\s+content="([A-Z]+)"/,
          )?.[1];
          if (amount && currency)
            result.offers.push({ price: Number(amount), currency });
          result.price_match = result.offers.some(
            (o) =>
              o.currency === row.currency &&
              Math.abs(o.price - row.price) < 0.011,
          );
          result.review_required = !result.reachable || !result.price_match;
        } catch (error) {
          result.error = error.message;
          result.reachable = false;
          result.review_required = true;
        }
        results.set(row.id, result);
        save();
        if (limited) {
          console.log(
            "Stopped requests to",
            host,
            "after",
            result.http_status,
            "— retry only after supplier cooldown.",
          );
          break;
        }
        await sleep(2500);
      }
    }),
  );
}
console.log(
  "Reviewed",
  results.size,
  "of",
  rows.length,
  "pages. Reachability is not stock, price, or supplier approval.",
);
