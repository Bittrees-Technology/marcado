import { test } from "node:test";
import assert from "node:assert/strict";
import { governanceRole, resolveGovernance } from "../lib/governance.mjs";
import { filterCatalog } from "../lib/filter-catalog.mjs";
const wallet = "0x" + "1".repeat(40),
  space = { id: "gov.bittrees.eth", admins: [] };
test("only exact governance partners and admins receive privilege", () => {
  assert.equal(
    governanceRole(wallet, { [wallet]: [{ label: "Partner" }] }, space),
    "owner",
  );
  assert.equal(
    governanceRole(wallet, { [wallet]: [{ label: "Admin" }] }, space),
    "admin",
  );
  assert.equal(
    governanceRole(wallet, {}, { ...space, admins: [wallet] }),
    "admin",
  );
  for (const label of [
    "Junior Partner",
    "Associate",
    "Moderator",
    "Shareholder",
    "partner assistant",
  ])
    assert.equal(
      governanceRole(wallet, { [wallet]: [{ label }] }, space),
      null,
    );
  assert.throws(() => governanceRole(wallet, { [wallet]: "Partner" }, space));
});
test("unavailable, oversized and malformed upstreams never grant authority", async () => {
  assert.equal(
    (
      await resolveGovernance(wallet, {
        fetcher: async () => {
          throw Error("offline");
        },
      })
    ).role,
    null,
  );
  assert.equal(
    (
      await resolveGovernance(wallet, {
        fetcher: async () => new Response("x".repeat(524289)),
      })
    ).status,
    "unavailable",
  );
  assert.equal(
    (
      await resolveGovernance(wallet, {
        fetcher: async () => new Response("{}"),
      })
    ).status,
    "unavailable",
  );
});
test("revoked roles are rechecked without cached grants", async () => {
  let labels = [{ label: "Partner" }];
  const fetcher = async (url) =>
    new Response(
      JSON.stringify(
        url.includes("community")
          ? { roles: { [wallet]: labels } }
          : { data: { space } },
      ),
    );
  assert.equal((await resolveGovernance(wallet, { fetcher })).role, "owner");
  labels = [];
  assert.equal((await resolveGovernance(wallet, { fetcher })).role, null);
});
test("regional price filtering never compares unlike currencies", () => {
  const items = [
    {
      name: "A",
      source_name: "US dealer",
      description: "",
      currency: "USD",
      price: 100,
      supplier_region: "US",
      supplier_status: "InStock",
    },
    {
      name: "B",
      source_name: "EU dealer",
      description: "",
      currency: "EUR",
      price: 90,
      supplier_region: "EU",
      supplier_status: "OutOfStock",
    },
  ];
  assert.equal(filterCatalog(items, { market: "EU" })[0].name, "B");
  assert.equal(
    filterCatalog(items, { currency: "USD", maxPrice: 95 }).length,
    0,
  );
  assert.equal(
    filterCatalog(items, { currency: "All", maxPrice: 95, sort: "price-asc" })
      .length,
    2,
  );
  assert.equal(filterCatalog(items, { availability: "InStock" })[0].name, "A");
});
