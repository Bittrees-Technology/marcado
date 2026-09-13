// Explicit one-time import: preserves existing products and later admin edits.
import fs from "node:fs";
import { neon } from "@neondatabase/serverless";
import { itemInput } from "../lib/catalog.mjs";
if (!process.argv.includes("--apply"))
  throw Error(
    "Review data/sourcing-expansion.json, deploy its photos, then pass --apply",
  );
const sql = neon(process.env.DATABASE_URL);
const items = JSON.parse(fs.readFileSync("data/sourcing-expansion.json"));
for (const item of items) {
  const p = itemInput(item);
  await sql`INSERT INTO marcada.items(id,product_id,name,description,price,currency,price_kind,price_checked,source_url,source_name,image_url,image_credit,specifications,supplier_status,supplier_region,tax_note,configuration_note) VALUES(${p.id},${p.product_id},${p.name},${p.description},${p.price},${p.currency},${p.price_kind},${p.price_checked},${p.source_url},${p.source_name},${p.image_url},${p.image_credit},${p.specifications},${p.supplier_status},${p.supplier_region},${p.tax_note},${p.configuration_note}) ON CONFLICT(id) DO NOTHING`;
}
console.log(
  await sql`SELECT product_id, count(*)::int AS count FROM marcada.items WHERE active=true GROUP BY product_id ORDER BY product_id`,
);
