// One-time dated source snapshot. Does not overwrite existing catalog items.
import fs from "node:fs";
import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL),
  date = new Date().toISOString().slice(0, 10),
  items = [];
const solo = await (
  await fetch(
    "https://www.solosatoshi.com/wp-json/wc/store/v1/products?search=bitaxe&per_page=20",
  )
).json();
for (const slug of ["bitaxe-gamma", "bitaxe-40w-5v-8a-power-supply"]) {
  const p = solo.find((x) => x.slug === slug);
  if (!p) throw Error("Missing supplier product");
  items.push({
    id: slug + "-us",
    product_id: slug === "bitaxe-gamma" ? "bitaxe" : "mining-accessories",
    name:
      slug === "bitaxe-gamma"
        ? "Bitaxe Gamma 602"
        : "Bitaxe 5V 8A power supply",
    description:
      slug === "bitaxe-gamma"
        ? "Single-chip, open-source Bitcoin miner from Solo Satoshi in Houston, Texas."
        : "40W supply for compatible 5V Bitaxe boards. Confirm the connector and power requirements.",
    price: Number(p.prices.price) / 100,
    currency: "USD",
    source_url: p.permalink,
    source_name: "Solo Satoshi",
    remote_image: p.images[0].src,
    supplier_region: "US",
    supplier_status: p.is_in_stock ? "InStock" : "OutOfStock",
    tax_note: "US supplier price; tax and delivery confirmed by quote",
    configuration_note: p.prices.price_range
      ? "From-price for the lowest-priced configuration. Stand and power-supply choices change the price."
      : "5V / 8A. Not a substitute for a 12V miner supply.",
  });
}
function nodes(html) {
  return [
    ...html.matchAll(
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
}
for (const [slug, filename] of [
  ["ucg-ultra", "cloud-gateway-ultra.png"],
  ["usw-flex-mini", "switch-flex-mini.png"],
]) {
  const url = "https://eu.store.ui.com/eu/en/products/" + slug;
  const html = await (await fetch(url)).text();
  const group = nodes(html).find((n) => n["@type"] === "ProductGroup"),
    p = group.hasVariant.find((v) => v.sku.endsWith("-EU")),
    offer = p.offers,
    price = offer.priceSpecification;
  items.push({
    id: slug + "-eu",
    product_id: "servers",
    name:
      (slug === "ucg-ultra" ? "Cloud Gateway Ultra" : "Switch Flex Mini") +
      " (EU)",
    description:
      slug === "ucg-ultra"
        ? "Compact UniFi gateway with multi-WAN support and an EU power plug."
        : "Five-port Layer 2 network switch. EU single-unit configuration.",
    price: Number(price.price),
    currency: "EUR",
    source_url: p.url,
    source_name: "Ubiquiti EU",
    image_url: "/products/" + filename,
    supplier_region: "EU",
    supplier_status: offer.availability.split("/").at(-1),
    tax_note: price.valueAddedTaxIncluded
      ? "Supplier price includes VAT; confirm destination treatment"
      : "Supplier price excludes VAT; destination tax and shipping are additional",
    configuration_note:
      "EU storefront and EU plug configuration. Supplier-market listing; dispatch location is not confirmed.",
  });
}
const url =
  "https://www.bitshopper.de/en/shop/bitaxe-en/bitaxe-gamma-v601-open-source-bitcoin-miner-kopie/";
const html = await (await fetch(url)).text();
const ns = nodes(html),
  p = ns.find((n) => n["@type"] === "Product"),
  offer = p.offers[0],
  price = offer.priceSpecification[0],
  image = ns.find((n) => n["@type"] === "ImageObject");
items.push({
  id: "bitaxe-gamma-601-eu",
  product_id: "bitaxe",
  name: "Bitaxe Gamma 601 · GekkoScience edition",
  description:
    "BM1370-based Bitcoin miner from bitshopper in Germany. This supplier listing currently reports out of stock.",
  price: Number(price.price),
  currency: "EUR",
  source_url: url,
  source_name: "bitshopper",
  remote_image: image.url,
  supplier_region: "EU",
  supplier_status: offer.availability.split("/").at(-1),
  tax_note:
    "Supplier price includes VAT; destination tax treatment and delivery confirmed by quote",
  configuration_note:
    "GekkoScience edition with the supplier-listed 5V power supply. Availability must be reconfirmed.",
});
const de = await (
  await fetch(
    "https://www.bitshopper.de/wp-json/wc/store/v1/products?search=bitaxe&per_page=30",
  )
).json();
for (const [slug, id, name, category] of [
  [
    "bitaxe-gamma-v601-supersink",
    "bitaxe-gamma-supersink-eu",
    "Bitaxe Gamma 601 SuperSink",
    "bitaxe",
  ],
  [
    "thesolomining-co-custom-supersilent-luefter",
    "bitaxe-supersilent-fan-eu",
    "Bitaxe SuperSilent replacement fan",
    "mining-accessories",
  ],
]) {
  const p = de.find((p) => p.slug === slug);
  if (!p) throw Error("Regional product missing: " + slug);
  items.push({
    id,
    product_id: category,
    name,
    description:
      category === "bitaxe"
        ? "Bitaxe Gamma with the supplier’s SuperSink cooling configuration."
        : "Replacement fan for compatible Bitaxe setups. Confirm voltage, connector and mounting before ordering.",
    price: Number(p.prices.price) / 100,
    currency: p.prices.currency_code,
    source_url: p.permalink,
    source_name: "bitshopper",
    remote_image: p.images[0].src,
    supplier_region: "EU",
    supplier_status: p.is_in_stock ? "InStock" : "OutOfStock",
    tax_note:
      "Supplier storefront price; VAT and delivery confirmed for the destination",
    configuration_note:
      "German supplier listing. Check the exact included accessories before accepting a quote.",
  });
}
for (const p of items) {
  if (p.remote_image) {
    const r = await fetch(p.remote_image);
    if (!r.ok || !r.headers.get("content-type")?.startsWith("image/"))
      throw Error("Photo unavailable");
    const type = r.headers.get("content-type");
    const ext = type.includes("webp")
      ? "webp"
      : type.includes("png")
        ? "png"
        : "jpg";
    p.image_url = "/products/" + p.id + "." + ext;
    fs.writeFileSync(
      "public" + p.image_url,
      Buffer.from(await r.arrayBuffer()),
    );
  }
  p.price_checked = date;
  p.price_kind = "reference";
  p.image_credit = p.source_name + " product photo";
  p.specifications = p.configuration_note;
  await sql`INSERT INTO marcada.items(id,product_id,name,description,price,currency,price_kind,price_checked,source_url,source_name,image_url,image_credit,specifications,supplier_status,supplier_region,tax_note,configuration_note) VALUES(${p.id},${p.product_id},${p.name},${p.description},${p.price},${p.currency},${p.price_kind},${date},${p.source_url},${p.source_name},${p.image_url},${p.image_credit},${p.specifications},${p.supplier_status},${p.supplier_region},${p.tax_note},${p.configuration_note}) ON CONFLICT(id) DO NOTHING`;
}
await sql`UPDATE marcada.items SET supplier_region=CASE WHEN source_name='D-Central' THEN 'CA' WHEN source_name IN ('Adafruit','Ubiquiti') THEN 'US' ELSE 'Unverified' END WHERE supplier_region='Unverified'`;
fs.writeFileSync(
  "data/regional-sources.json",
  JSON.stringify(items, null, 2) + "\n",
);
console.log(
  "Added",
  items.length,
  "US/EU supplier listings without replacing existing products.",
);
