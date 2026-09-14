// Assign reviewed comparison labels only. Preserve subsequent administrator edits.
import fs from "node:fs";
import { neon } from "@neondatabase/serverless";
if (!process.argv.includes("--apply"))
  throw Error("Pass --apply to assign reviewed comparison groups");
const groups = JSON.parse(fs.readFileSync("data/comparison-groups.json"));
const sql = neon(process.env.DATABASE_URL);
let updated = 0;
for (let i = 0; i < groups.length; i += 20) {
  const results = await sql.transaction(
    groups
      .slice(i, i + 20)
      .map(
        (g) =>
          sql`UPDATE marcada.items SET model_group=${g.model_group} WHERE id=${g.id} AND model_group='' RETURNING id`,
      ),
  );
  updated += results.reduce((n, r) => n + r.length, 0);
}
console.log(
  "Assigned",
  updated,
  "comparison labels; existing administrator labels preserved.",
);
