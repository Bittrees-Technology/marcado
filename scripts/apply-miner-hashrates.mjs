// Explicit reviewed backfill. Preserve any rates already edited by administrators.
import fs from "node:fs";
import { neon } from "@neondatabase/serverless";
if (!process.argv.includes("--apply"))
  throw Error("Pass --apply to backfill reviewed miner hash rates");
const rows = JSON.parse(
  fs.readFileSync(new URL("../data/miner-hashrates.json", import.meta.url)),
);
const sql = neon(process.env.DATABASE_URL);
const results = await sql.transaction(
  rows
    .filter((p) => p.hashrate)
    .map(
      (p) =>
        sql`UPDATE marcada.items SET hashrate=${p.hashrate},updated_at=now() WHERE id=${p.id} AND source_url=${p.source_url} AND product_id IN ('bitaxe','asic') AND hashrate='' RETURNING id`,
    ),
);
console.log(
  "Backfilled",
  results.flat().length,
  "miner listings; existing rates preserved.",
);
