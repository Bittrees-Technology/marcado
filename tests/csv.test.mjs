import { test } from "node:test";
import assert from "node:assert/strict";
import { parseCsv, problems } from "../lib/csv.mjs";
test("CSV handles BOM, CRLF, commas, escaped quotes and multiline values", () => {
  const [p] = parseCsv(
    '\uFEFFid,name,description\r\nunit,"A, B","Line 1\n""quoted"""\r\n',
  );
  assert.equal(p.name, "A, B");
  assert.equal(p.description, 'Line 1\n"quoted"');
  assert.equal(p.active, "false");
  assert.equal(p.price_checked, undefined);
});
test("CSV rejects malformed and ambiguous files", () => {
  for (const s of [
    "id,id\na,b",
    "unknown\na",
    "id,name\na",
    'id\n"unclosed',
    'id\n"a"oops',
    "id\n" + Array(201).fill("a").join("\n"),
  ])
    assert.throws(() => parseCsv(s));
});
test("Missing dates and duplicate IDs require correction", () => {
  const rows = parseCsv(
    "id,product_id,name,price,currency,price_kind,image_url\na,bitaxe,Example,12,USD,reference,https://example.com/a.png",
  );
  assert.ok(
    problems(rows[0], rows, [{ id: "bitaxe" }]).includes(
      "price_checked is required",
    ),
  );
  rows[0].price_checked = "2026-02-30";
  assert.ok(
    problems(rows[0], rows, [{ id: "bitaxe" }]).some((x) =>
      x.includes("valid price-check"),
    ),
  );
  rows.push({ ...rows[0] });
  assert.ok(
    problems(rows[0], rows, [{ id: "bitaxe" }]).includes(
      "Duplicate product ID in this file",
    ),
  );
});
