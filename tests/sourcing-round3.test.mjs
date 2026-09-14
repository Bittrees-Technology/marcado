import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createHash } from "node:crypto";
import { itemInput } from "../lib/catalog.mjs";
import { filterCatalog } from "../lib/filter-catalog.mjs";
const read = (path) => JSON.parse(fs.readFileSync(path));
const rows = read("data/sourcing-round3.json");
const evidence = read("data/research/sourcing-round3-evidence.json");
const canonical = (value) => {
  const u = new URL(value);
  return (
    u.hostname.replace(/^www\./, "") +
    decodeURIComponent(u.pathname).replace(/\/$/, "")
  );
};
test("new sourcing snapshot has over 500 distinct, priced, evidenced offerings within existing verticals", () => {
  assert.ok(rows.length > 500);
  const old = [
    "catalog-seed",
    "regional-sources",
    "sourcing-expansion",
    "sourcing-round2",
    "dtv-electronics",
    "home-mining-gadgets",
  ].flatMap((name) => read("data/" + name + ".json"));
  const sources = new Set(old.map((r) => canonical(r.source_url)));
  const ids = new Set(old.map((r) => r.id));
  for (const row of rows) {
    const normalized = itemInput(row);
    assert.ok(
      [
        "asic",
        "bitaxe",
        "ai-compute",
        "servers",
        "components",
        "mining-accessories",
      ].includes(row.product_id),
    );
    assert.ok(["US", "EU", "UK"].includes(normalized.supplier_region));
    assert.ok(row.price > 0);
    assert.equal(row.supplier_status, "Unknown");
    assert.ok(!sources.has(canonical(row.source_url)), row.source_url);
    assert.ok(!ids.has(row.id));
    sources.add(canonical(row.source_url));
    ids.add(row.id);
    const record = evidence.find((e) => e.id === row.id);
    assert.equal(record.http_status, 200);
    assert.equal(record.price, row.price);
    assert.equal(record.currency, row.currency);
    assert.match(record.html_sha256, /^[a-f0-9]{64}$/);
    assert.match(row.image_url, /^\/products\//);
    const bytes = fs.readFileSync("public" + row.image_url);
    assert.equal(
      createHash("sha256").update(bytes).digest("hex"),
      row.image_sha256,
    );
  }
});
test("UK supplier filtering stays distinct from EU and does not infer currency from supplier location", () => {
  const uk = filterCatalog(rows, { market: "UK" });
  assert.ok(uk.length > 0);
  assert.ok(uk.every((r) => r.supplier_region === "UK"));
  assert.ok(
    filterCatalog(rows, { market: "EU" }).every(
      (r) => r.supplier_region === "EU",
    ),
  );
  assert.ok(
    filterCatalog(rows, { market: "US", currency: "EUR" }).some(
      (r) => r.source_name === "ServerPartDeals",
    ),
  );
});
