// Opt-in integration tests against the dedicated Marcada schema. No email is sent.
import assert from "node:assert/strict";
import { neon } from "@neondatabase/serverless";
import { randomUUID } from "node:crypto";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { createSiweMessage } from "viem/siwe";
import handler from "../api/index.mjs";
import { hash, token } from "../lib/security.mjs";
const originalFetch = globalThis.fetch;
const sql = neon(process.env.DATABASE_URL),
  origin = process.env.APP_ORIGIN,
  tag = randomUUID(),
  customer = `customer-${tag}@example.com`,
  support = `support-${tag}@example.com`,
  dealer = `dealer-${tag}@example.com`,
  admin = `admin-${tag}@example.com`,
  owner = `owner-${tag}@example.com`;
process.env.ADMIN_EMAIL = owner;
const cookies = {},
  identities = [customer, support, dealer, admin, owner];
let offerId, quoteId, wallet, mediaId, itemQuoteId;
const testItem = "test-" + tag;
async function request(path, body, who, custom = {}) {
  let status = 200,
    data,
    headers = {};
  const res = {
    setHeader(k, v) {
      headers[k.toLowerCase()] = v;
    },
    status(n) {
      status = n;
      return this;
    },
    json(d) {
      data = d;
      return this;
    },
    end(value) {
      if (value) data = value;
      return this;
    },
  };
  await handler(
    {
      url: "/api/" + path,
      method: body === undefined ? "GET" : "POST",
      body,
      headers: {
        origin,
        "x-forwarded-for": tag,
        ...(who ? { cookie: cookies[who] } : {}),
        ...custom,
      },
    },
    res,
  );
  return { status, data, headers };
}
try {
  for (const i of identities) {
    const t = token();
    cookies[i] = "__Host-marcado=" + t;
    await sql`INSERT INTO marcada.users(identity,referral) VALUES(${i},${token().slice(0, 16)})`;
    await sql`INSERT INTO marcada.sessions(hash,identity,expires_at) VALUES(${hash(t)},${i},now()+interval '1 hour')`;
  }
  for (const [i, role] of [
    [support, "support"],
    [dealer, "dealer_manager"],
    [admin, "admin"],
  ])
    await sql`INSERT INTO marcada.roles(identity,role) VALUES(${i},${role})`;
  assert.equal((await request("admin")).status, 401);
  assert.equal((await request("admin", undefined, customer)).status, 403);
  assert.equal(
    (await request("admin/role", { identity: customer, role: "admin" }, admin))
      .status,
    403,
  );
  assert.equal((await request("admin/offer", {}, support)).status, 403);
  assert.equal((await request("admin/quote", {}, dealer)).status, 403);
  const o = await request(
    "admin/offer",
    {
      product: "bitaxe",
      dealer: "Integration test " + tag,
      url: "https://example.com/offer?ref=test",
      price: 123,
      currency: "USD",
      private: true,
      notes: "CONFIDENTIAL-" + tag,
    },
    owner,
  );
  assert.equal(o.status, 200, JSON.stringify(o.data));
  offerId = o.data.id;
  for (const who of [undefined, customer, support]) {
    const c = await request("catalog", undefined, who);
    assert.equal(c.status, 200);
    assert.equal(
      c.data.offers.some((o) => o.id === offerId),
      false,
    );
    assert.equal(
      (await request("go?id=" + offerId, undefined, who)).status,
      404,
    );
  }
  assert.equal(
    (
      await request(
        "admin/grant",
        { id: offerId, identity: customer, remove: false },
        owner,
      )
    ).status,
    200,
  );
  const c = await request("catalog", undefined, customer);
  assert.ok(c.data.offers.some((o) => o.id === offerId));
  assert.equal(JSON.stringify(c.data).includes("CONFIDENTIAL"), false);
  assert.equal(JSON.stringify(c.data).includes("example.com/offer"), false);
  assert.equal(
    (await request("go?id=" + offerId, undefined, customer)).status,
    302,
  );
  await request(
    "admin/grant",
    { id: offerId, identity: customer, remove: true },
    owner,
  );
  assert.equal(
    (await request("go?id=" + offerId, undefined, customer)).status,
    404,
  );
  const [ref] =
    await sql`SELECT referral FROM marcada.users WHERE identity=${support}`;
  const q = await request(
    "quotes",
    {
      product: "bitaxe",
      quantity: 2,
      details: "Integration test",
      referral: "  " + ref.referral.toUpperCase() + "  ",
    },
    customer,
  );
  assert.equal(q.status, 201, JSON.stringify(q.data));
  quoteId = q.data.id;
  const [saved] =
    await sql`SELECT referral FROM marcada.quotes WHERE id=${quoteId}`;
  assert.equal(saved.referral, ref.referral);
  for (const code of ["typo", ref.referral + "extra", "0000000000000000"]) {
    const rejected = await request(
      "quotes",
      {
        product: "bitaxe",
        quantity: 1,
        details: "Referral negative test",
        referral: code,
      },
      customer,
    );
    assert.equal(rejected.status, 400);
    assert.ok(rejected.data.error.toLowerCase().includes("referral"));
  }
  const [self] =
    await sql`SELECT referral FROM marcada.users WHERE identity=${customer}`;
  assert.equal(
    (
      await request(
        "quotes",
        {
          product: "bitaxe",
          quantity: 1,
          details: "Self referral",
          referral: self.referral,
        },
        customer,
      )
    ).status,
    400,
  );

  assert.equal(
    (await request("admin", undefined, dealer)).data.quotes.length,
    0,
  );
  assert.equal(
    (await request("admin", undefined, support)).data.offers.length,
    0,
  );
  assert.equal(
    (
      await request(
        "admin/offer-state",
        { id: offerId, active: false },
        owner,
        { origin: "https://evil.example" },
      )
    ).status,
    403,
  );
  const challenge = token(),
    code = "12345678";
  await sql`INSERT INTO marcada.email_challenges(hash,identity,code_hash,expires_at) VALUES(${hash(challenge)},${customer},${hash(challenge + ":" + code)},now()+interval '1 minute')`;
  assert.equal(
    (await request("auth/verify-email", { challenge, code: "00000000" }))
      .status,
    401,
  );
  const ok = await request("auth/verify-email", { challenge, code });
  assert.equal(ok.status, 200);
  assert.match(ok.headers["set-cookie"], /HttpOnly; Secure; SameSite=Lax/);
  assert.equal(
    (await request("auth/verify-email", { challenge, code })).status,
    401,
  );
  const account = privateKeyToAccount(generatePrivateKey());
  wallet = account.address.toLowerCase();
  const n = await request("auth/nonce", {});
  const nonceCookie = n.headers["set-cookie"].split(";")[0];
  const message = createSiweMessage({
    address: account.address,
    chainId: 1,
    domain: new URL(origin).host,
    uri: origin,
    nonce: n.data.nonce,
    version: "1",
    issuedAt: new Date(),
  });
  const signature = await account.signMessage({ message });
  const args = { message, signature };
  assert.equal(
    (await request("auth/wallet", args, undefined, { cookie: nonceCookie }))
      .status,
    200,
  );
  assert.equal(
    (await request("auth/wallet", args, undefined, { cookie: nonceCookie }))
      .status,
    401,
  );
  const n2 = await request("auth/nonce", {});
  const wrong = createSiweMessage({
    address: account.address,
    chainId: 1,
    domain: "evil.example",
    uri: origin,
    nonce: n2.data.nonce,
    version: "1",
    issuedAt: new Date(),
  });
  assert.equal(
    (
      await request(
        "auth/wallet",
        {
          message: wrong,
          signature: await account.signMessage({ message: wrong }),
        },
        undefined,
        { cookie: n2.headers["set-cookie"].split(";")[0] },
      )
    ).status,
    401,
  );
  await sql`DELETE FROM marcada.auth_tokens WHERE hash=${hash(n2.data.nonce)}`;
  assert.equal((await request("admin/item", {}, support)).status, 403);
  assert.equal((await request("admin/image", {}, customer)).status, 403);
  const upload = await request(
    "admin/image",
    {
      image:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=",
    },
    dealer,
  );
  assert.equal(upload.status, 201, JSON.stringify(upload.data));
  mediaId = upload.data.url.split("=")[1];
  const photo = await request("image?id=" + mediaId);
  assert.equal(photo.status, 200);
  assert.equal(photo.headers["content-type"], "image/png");
  assert.ok(Buffer.isBuffer(photo.data));
  const product = {
    id: testItem,
    product_id: "bitaxe",
    name: "Test product",
    description: "Integration test product",
    price: 19.95,
    currency: "USD",
    price_kind: "asking",
    price_checked: new Date().toISOString().slice(0, 10),
    image_url: upload.data.url,
    active: true,
  };
  assert.equal((await request("admin/item", product, dealer)).status, 200);
  let catalog = await request("catalog");
  assert.equal(
    Number(catalog.data.items.find((i) => i.id === testItem).price),
    19.95,
  );
  assert.equal(
    (
      await request(
        "admin/item",
        { ...product, price: 29.95, image_url: "/products/bitaxe-gt.png" },
        dealer,
      )
    ).status,
    200,
  );
  catalog = await request("catalog");
  assert.equal(
    catalog.data.items.find((i) => i.id === testItem).image_url,
    "/products/bitaxe-gt.png",
  );
  const iq = await request(
    "quotes",
    {
      product: "bitaxe",
      item_id: testItem,
      quantity: 1,
      details: "Selected item test",
    },
    customer,
  );
  assert.equal(iq.status, 201);
  itemQuoteId = iq.data.id;
  const accountView = await request("me", undefined, customer);
  assert.equal(
    accountView.data.quotes.find((q) => q.id === itemQuoteId).item_name,
    "Test product",
  );
  assert.equal(
    (
      await request(
        "quotes",
        {
          product: "servers",
          item_id: testItem,
          quantity: 1,
          details: "Mismatched category",
        },
        customer,
      )
    ).status,
    400,
  );
  await request("admin/item", { ...product, active: false }, dealer);
  catalog = await request("catalog");
  assert.equal(
    catalog.data.items.some((i) => i.id === testItem),
    false,
  );
  assert.equal(catalog.data.commerce.checkout, false);
  assert.equal((await request("checkout", {}, customer)).status, 403);
  const linkNonce = await request("auth/link-nonce", {}, customer);
  assert.equal(linkNonce.status, 200);
  const linkCookie = linkNonce.headers["set-cookie"].split(";")[0];
  const linkMessage = createSiweMessage({
    address: account.address,
    chainId: 1,
    domain: new URL(origin).host,
    uri: origin,
    nonce: linkNonce.data.nonce,
    statement: linkNonce.data.statement,
    version: "1",
    issuedAt: new Date(),
  });
  const linkArgs = {
    message: linkMessage,
    signature: await account.signMessage({ message: linkMessage }),
  };
  assert.equal(
    (
      await request("auth/link-wallet", linkArgs, support, {
        cookie: cookies[support] + "; " + linkCookie,
      })
    ).status,
    401,
  );
  assert.equal(
    (
      await request("auth/link-wallet", linkArgs, customer, {
        cookie: cookies[customer] + "; " + linkCookie,
      })
    ).status,
    200,
  );
  assert.equal(
    (
      await request("auth/link-wallet", linkArgs, customer, {
        cookie: cookies[customer] + "; " + linkCookie,
      })
    ).status,
    401,
  );
  let labels = [{ label: "Partner" }],
    admins = [];
  globalThis.fetch = async (url, options) =>
    String(url) === "https://gov.bittrees.org/api/community"
      ? new Response(JSON.stringify({ roles: { [wallet]: labels } }))
      : String(url) === "https://hub.snapshot.org/graphql"
        ? new Response(
            JSON.stringify({
              data: { space: { id: "gov.bittrees.eth", admins } },
            }),
          )
        : originalFetch(url, options);
  assert.equal(
    (await request("me", undefined, customer)).data.user.role,
    "owner",
  );
  labels = [];
  assert.equal(
    (await request("me", undefined, customer)).data.user.role,
    "customer",
  );
  assert.equal((await request("admin", undefined, customer)).status, 403);
  admins = [wallet];
  assert.equal(
    (await request("me", undefined, customer)).data.user.role,
    "admin",
  );
  assert.equal(
    (await request("admin/role", { identity: dealer, role: "admin" }, owner))
      .status,
    400,
  );
  await request("auth/unlink-wallet", {}, customer);
  assert.equal(
    (await request("me", undefined, customer)).data.user.role,
    "customer",
  );
  globalThis.fetch = originalFetch;
  console.log(
    "PASS: role boundaries, private offers and revocation, CSRF, quote/referral persistence, email code replay, secure cookies, SIWE signature/replay/domain checks.",
  );
} finally {
  globalThis.fetch = originalFetch;
  await sql`DELETE FROM marcada.identity_links WHERE email=${customer} OR email=${support}`;
  if (itemQuoteId)
    await sql`DELETE FROM marcada.quotes WHERE id=${itemQuoteId}`;
  await sql`DELETE FROM marcada.items WHERE id=${testItem}`;
  if (mediaId) await sql`DELETE FROM marcada.media WHERE id=${mediaId}`;
  if (offerId) await sql`DELETE FROM marcada.offers WHERE id=${offerId}`;
  if (quoteId) await sql`DELETE FROM marcada.quotes WHERE id=${quoteId}`;
  for (const i of [...identities, wallet].filter(Boolean)) {
    await sql`DELETE FROM marcada.sessions WHERE identity=${i}`;
    await sql`DELETE FROM marcada.email_challenges WHERE identity=${i}`;
    await sql`DELETE FROM marcada.roles WHERE identity=${i}`;
    await sql`DELETE FROM marcada.audit WHERE actor=${i}`;
    await sql`DELETE FROM marcada.users WHERE identity=${i}`;
  }
}
