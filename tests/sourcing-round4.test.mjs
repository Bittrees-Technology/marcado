import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createHash } from "node:crypto";
import { itemInput } from "../lib/catalog.mjs";
const read = (p) => JSON.parse(fs.readFileSync(p));
const rows = read("data/sourcing-round4.json"),
  evidence = new Map(
    read("data/research/sourcing-round4-evidence.json").map((e) => [e.id, e]),
  );
const canon = (u) => {
  const x = new URL(u);
  return (
    x.hostname.replace(/^www\./, "") +
    decodeURIComponent(x.pathname).replace(/\/$/, "")
  );
};
test("second sourcing pass preserves distinct in-scope supplier offers, prices and image provenance", () => {
  assert.ok(rows.length > 500);
  const prior = [
    "catalog-seed",
    "regional-sources",
    "sourcing-expansion",
    "sourcing-round2",
    "dtv-electronics",
    "home-mining-gadgets",
    "sourcing-round3",
  ].flatMap((f) => read("data/" + f + ".json"));
  const urls = new Set(prior.map((p) => canon(p.source_url)));
  const ids = new Set(prior.map((p) => p.id));
  for (const row of rows) {
    itemInput(row);
    assert.ok(!ids.has(row.id));
    ids.add(row.id);
    assert.ok(!urls.has(canon(row.source_url)), row.id);
    urls.add(canon(row.source_url));
    assert.ok(
      [
        "components",
        "servers",
        "asic",
        "bitaxe",
        "ai-compute",
        "mining-accessories",
      ].includes(row.product_id),
    );
    assert.ok(["US", "MX", "EU", "UK"].includes(row.supplier_region));
    assert.equal(row.supplier_status, "Unknown");
    assert.ok(row.price > 0);
    const e = evidence.get(row.id);
    assert.equal(e.http_status, 200);
    assert.equal(e.price, row.price);
    assert.equal(e.currency, row.currency);
    assert.match(e.html_sha256, /^[a-f0-9]{64}$/);
    assert.equal(
      createHash("sha256")
        .update(fs.readFileSync("public" + row.image_url))
        .digest("hex"),
      row.image_sha256,
    );
    if (["bitaxe", "asic"].includes(row.product_id))
      assert.match(row.hashrate, /TH\/s/);
  }
  assert.ok(
    rows.some((r) => r.currency === "MXN" && r.supplier_region === "MX"),
  );
  assert.ok(
    rows.every((r) => r.source_name !== "Chicago Electronic Distributors"),
  );
});
test("comparison assignments reference real offers and retain configuration-specific labels", () => {
  const all = [
    "catalog-seed",
    "regional-sources",
    "sourcing-expansion",
    "sourcing-round2",
    "dtv-electronics",
    "home-mining-gadgets",
    "sourcing-round3",
    "sourcing-round4",
  ].flatMap((f) => read("data/" + f + ".json"));
  const ids = new Set(all.map((p) => p.id));
  const assignments = read("data/comparison-groups.json");
  assert.equal(new Set(assignments.map((x) => x.id)).size, assignments.length);
  for (const a of assignments) {
    assert.ok(ids.has(a.id));
    assert.ok(a.model_group.length > 0 && a.model_group.length <= 160);
  }
  assert.ok(assignments.some((x) => x.model_group.includes("13 TOPS")));
  assert.ok(
    !assignments.some(
      (x) =>
        x.id === "r3-pimoroni-7351951032403" &&
        x.model_group.includes("13 TOPS"),
    ),
  );
});
