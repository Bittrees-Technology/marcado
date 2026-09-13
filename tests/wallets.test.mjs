import test from "node:test";
import assert from "node:assert/strict";
import {
  discoverWallets,
  signWalletMessage,
  walletError,
} from "../lib/wallets.mjs";
test("Multiple announced wallets remain distinct and legacy duplicates collapse", async () => {
  const target = new EventTarget();
  const p = { request() {} };
  target.ethereum = p;
  let list = [];
  const off = discoverWallets(target, (v) => (list = v));
  const event = new Event("eip6963:announceProvider");
  event.detail = { provider: p, info: { uuid: "one", name: "Wallet one" } };
  target.dispatchEvent(event);
  target.dispatchEvent(event);
  const second = new Event("eip6963:announceProvider");
  second.detail = {
    provider: { request() {} },
    info: { uuid: "two", name: "Wallet two" },
  };
  target.dispatchEvent(second);
  await new Promise((r) => setTimeout(r, 280));
  assert.equal(list.length, 2);
  off();
});
test("Signature stays bound to selected wallet account, with actionable errors", async () => {
  const address = "0x" + "1".repeat(40);
  let calls = [];
  const p = {
    async request(r) {
      calls.push(r);
      return r.method === "eth_accounts" ? [address] : "0xsigned";
    },
  };
  assert.equal(await signWalletMessage(p, address, "Hello"), "0xsigned");
  assert.equal(calls[0].params[0], "0x48656c6c6f");
  await assert.rejects(
    () =>
      signWalletMessage(
        {
          request: async (r) =>
            r.method === "eth_accounts" ? ["0x" + "2".repeat(40)] : "0xsigned",
        },
        address,
        "Hello",
      ),
    /account changed/,
  );
  assert.match(walletError({ code: 4001 }), /declined/);
  assert.match(walletError({ code: -32002 }), /already open/);
});
