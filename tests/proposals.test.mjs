import test from "node:test";
import assert from "node:assert/strict";
import { moneyMinor, proposalInput } from "../lib/proposals.mjs";
test("Quote amounts use integer minor units and require explicit terms and expiry", () => {
  assert.equal(moneyMinor("123.45"), 12345);
  assert.equal(moneyMinor("0.1"), 10);
  for (const x of ["1.001", "-1", "Infinity", "1e3", ""])
    assert.throws(() => moneyMinor(x));
  assert.throws(() => proposalInput({ currency: "BTC" }));
  assert.throws(() =>
    proposalInput({
      currency: "EUR",
      expires_at: "2020-01-01",
      terms: "Valid terms",
    }),
  );
});
