import test from "node:test";
import assert from "node:assert/strict";
import { referralMessage } from "../lib/notifications.mjs";
test("Referral mail uses only configured operations recipient and plain submitted text", () => {
  const q = {
    id: "quote-id",
    identity: "customer@example.com",
    referrer: "member@example.com",
    referral: "1234567890abcdef",
    product: "bitaxe",
    quantity: 3,
    details: "<img src=x onerror=alert(1)>",
    submitted: "2026-09-13",
  };
  for (const to of [
    "",
    "ops@example.com,attacker@example.com",
    "bad\n@example.com",
  ])
    assert.equal(
      referralMessage(
        q,
        to,
        "Mercado <mail@example.com>",
        "https://mercado.bittrees.org",
      ),
      null,
    );
  const m = referralMessage(
    q,
    "ops@example.com",
    "Mercado <mail@example.com>",
    "https://mercado.bittrees.org",
  );
  assert.deepEqual(m.to, ["ops@example.com"]);
  assert.equal(m.html, undefined);
  assert.ok(m.text.includes(q.details));
  assert.ok(m.text.includes("/admin/quotes"));
  assert.equal(m.cc, undefined);
});
