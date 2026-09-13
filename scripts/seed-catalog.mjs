import { neon } from "@neondatabase/serverless";
import { readFile } from "node:fs/promises";
const sql = neon(process.env.DATABASE_URL);
const items = JSON.parse(
  await readFile(new URL("../data/catalog-seed.json", import.meta.url), "utf8"),
);
for (const p of items)
  await sql`INSERT INTO marcada.items(id,product_id,name,description,price,currency,price_kind,price_checked,source_url,source_name,image_url,image_credit,specifications,supplier_status) VALUES(${p.id},${p.product_id},${p.name},${p.description},${p.price},${p.currency},${p.price_kind},${p.price_checked},${p.source_url},${p.source_name},${p.image_url},${p.image_credit},${p.specifications},${p.supplier_status || "Unknown"}) ON CONFLICT(id) DO NOTHING`;
console.log("Catalog seeded without overwriting admin edits:", items.length);
