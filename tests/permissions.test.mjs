import { test } from "node:test";
import assert from "node:assert/strict";
import { permissions } from "../lib/permissions.mjs";
test("Focused roles restrict each administrative capability", () => {
  const expected = {
    catalog_manager: ["canProducts"],
    offer_manager: ["canDeals"],
    support: ["canQuotes"],
    vendor_manager: ["canVendors"],
    vendor: ["vendor"],
    customer: [],
  };
  for (const [role, keys] of Object.entries(expected))
    assert.deepEqual(
      Object.entries(permissions(role))
        .filter(([, v]) => v)
        .map(([k]) => k),
      keys,
    );
  assert.equal(permissions("owner").canVendors, true);
  assert.equal(permissions("dealer_manager").canProducts, true);
});
