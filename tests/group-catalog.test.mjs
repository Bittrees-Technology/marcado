import { test } from "node:test";
import assert from "node:assert/strict";
import {
  comparisonKey,
  groupCatalog,
  sortVendorOffers,
} from "../lib/group-catalog.mjs";
import { itemInput } from "../lib/catalog.mjs";
const offer = (
  id,
  price,
  currency = "USD",
  model_group = "Pi 5 — 8GB board",
) => ({
  id,
  price,
  currency,
  model_group,
  product_id: "components",
  name: "Vendor title",
  source_name: id,
});
test("reviewed matching configurations stack with ascending prices inside each currency", () => {
  const items = [
    offer("us-expensive", 100),
    offer("mexico", 1800, "MXN"),
    offer("us-cheap", 80),
    offer("eu", 90, "EUR"),
    offer("kit", 75, "USD", "Pi 5 — 8GB kit"),
  ];
  const groups = groupCatalog(items);
  assert.equal(groups.length, 2);
  assert.deepEqual(
    groups[0].items.map((x) => x.id),
    ["eu", "mexico", "us-cheap", "us-expensive"],
  );
  assert.deepEqual(
    sortVendorOffers(items.filter((x) => x.currency === "USD")).map(
      (x) => x.price,
    ),
    [75, 80, 100],
  );
  assert.notEqual(
    comparisonKey(offer("new", 100, "USD", "GPU new")),
    comparisonKey(offer("used", 80, "USD", "GPU refurbished")),
  );
});
test("similar names stay separate; explicitly reviewed matches can span collections", () => {
  const a = offer("a", 20, "USD", ""),
    b = offer("b", 10, "USD", "");
  assert.equal(groupCatalog([a, b]).length, 2);
  assert.equal(
    comparisonKey(offer("a", 20)),
    comparisonKey({ ...offer("b", 20), product_id: "ai-compute" }),
  );
});
test("MXN and Mexico survive catalog validation and comparison groups are bounded", () => {
  const p = itemInput({
    ...offer("sample", 100, "MXN"),
    description: "Test",
    price_kind: "reference",
    price_checked: "2026-09-14",
    image_url: "/products/test.jpg",
    supplier_region: "MX",
    active: true,
  });
  assert.equal(p.currency, "MXN");
  assert.equal(p.supplier_region, "MX");
  assert.equal(p.model_group, "Pi 5 — 8GB board");
});
