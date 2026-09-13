import { test } from "node:test";
import assert from "node:assert/strict";
import { dealerUrl, normalizeIdentity, isAdmin } from "../lib/security.mjs";
test("dealer links reject executable URLs, credentials and private hosts", () => {
  for (const s of [
    "javascript:alert(1)",
    "http://dealer.com",
    "https://user:pass@dealer.com",
    "https://127.0.0.1",
    "https://192.168.1.1",
    "https://localhost",
    "https://internal.local",
  ])
    assert.throws(() => dealerUrl(s));
  assert.equal(
    dealerUrl("https://example.com/product?ref=abc"),
    "https://example.com/product?ref=abc",
  );
});
test("identities normalize without accepting an ENS name as proof of ownership", () => {
  assert.equal(normalizeIdentity(" Person@Example.com "), "person@example.com");
  assert.throws(() => normalizeIdentity("raging.eth"));
  assert.throws(() => normalizeIdentity("raging.bittrees.org"));
  assert.equal(isAdmin("untrusted@example.com"), false);
});
