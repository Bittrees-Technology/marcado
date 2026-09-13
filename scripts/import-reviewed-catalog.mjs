// Explicit operator import of a reviewed snapshot. Never overwrites existing rows.
import fs from "node:fs";
import { neon } from "@neondatabase/serverless";
import { itemInput } from "../lib/catalog.mjs";
const path = process.argv[2];
if (!path || !process.argv.includes("--apply"))
  throw Error(
    "Usage: node --env-file=.env.local scripts/import-reviewed-catalog.mjs data/reviewed.json --apply",
  );
const raw = JSON.parse(fs.readFileSync(path));
const items = raw.map(itemInput);
if (new Set(items.map((p) => p.id)).size !== items.length)
  throw Error("Duplicate product IDs");
const sql = neon(process.env.DATABASE_URL);
let inserted = 0;
for (let i = 0; i < items.length; i += 20) {
  const queries = items
    .slice(i, i + 20)
    .map(
      (p) =>
        sql`INSERT INTO marcada.items(id,product_id,name,description,price,currency,price_kind,price_checked,source_url,source_name,image_url,image_credit,specifications,supplier_status,supplier_region,tax_note,configuration_note,active) VALUES(${p.id},${p.product_id},${p.name},${p.description},${p.price},${p.currency},${p.price_kind},${p.price_checked},${p.source_url},${p.source_name},${p.image_url},${p.image_credit},${p.specifications},${p.supplier_status},${p.supplier_region},${p.tax_note},${p.configuration_note},${p.active}) ON CONFLICT(id) DO NOTHING RETURNING id`,
    );
  const results = await sql.transaction(queries);
  inserted += results.reduce((n, r) => n + r.length, 0);
}
console.log(
  "Inserted",
  inserted,
  "of",
  items.length,
  "reviewed rows; existing rows preserved.",
);
console.log(
  await sql`SELECT product_id,count(*)::int AS count FROM marcada.items WHERE active GROUP BY product_id ORDER BY product_id`,
);
