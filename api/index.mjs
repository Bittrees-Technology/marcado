import { itemInput, imageUpload } from "../lib/catalog.mjs";
import { neon } from "@neondatabase/serverless";
import { randomUUID, randomInt } from "node:crypto";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { parseSiweMessage } from "viem/siwe";
import {
  hash,
  token,
  normalizeIdentity,
  isAdmin,
  dealerUrl,
  uuid,
  textField,
} from "../lib/security.mjs";
const sql = () => neon(process.env.DATABASE_URL);
const origin = () => process.env.APP_ORIGIN || "https://marcado.bittrees.org";
const cookie = (req, name) =>
  String(req.headers.cookie || "")
    .split(";")
    .map((x) => x.trim())
    .find((x) => x.startsWith(name + "="))
    ?.slice(name.length + 1) || "";
const setCookie = (res, name, value, seconds) =>
  res.setHeader(
    "Set-Cookie",
    `${name}=${value}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${seconds}`,
  );
const json = (res, status, data) => res.status(status).json(data);
async function limited(req, bucket, max) {
  const key = hash(
    `${bucket}|${req.headers["x-forwarded-for"] || "unknown"}|${Math.floor(Date.now() / 600000)}`,
  );
  const [r] =
    await sql()`INSERT INTO marcada.rate_limits(key,count,expires_at) VALUES(${key},1,now()+interval '10 minutes') ON CONFLICT(key) DO UPDATE SET count=marcada.rate_limits.count+1 RETURNING count`;
  if (r.count > max)
    throw Object.assign(Error("Please try again shortly."), { status: 429 });
}
async function user(req) {
  const key = cookie(req, "__Host-marcado");
  if (!key) return null;
  const [s] =
    await sql()`SELECT s.identity,u.referral FROM marcada.sessions s JOIN marcada.users u ON u.identity=s.identity WHERE s.hash=${hash(key)} AND s.expires_at>now()`;
  if (!s) return null;
  const [r] =
    await sql()`SELECT role FROM marcada.roles WHERE identity=${s.identity}`;
  const owner = isAdmin(s.identity),
    role = owner ? "owner" : r?.role || "customer";
  return {
    ...s,
    role,
    owner,
    admin: owner || role === "admin",
    staff: role !== "customer",
    canDeals: ["owner", "admin", "dealer_manager"].includes(role),
    canQuotes: ["owner", "admin", "support"].includes(role),
  };
}
async function session(res, identity) {
  await sql()`INSERT INTO marcada.users(identity,referral) VALUES(${identity},${token().slice(0, 16)}) ON CONFLICT(identity) DO NOTHING`;
  const value = token();
  await sql()`INSERT INTO marcada.sessions(hash,identity,expires_at) VALUES(${hash(value)},${identity},now()+interval '7 days')`;
  setCookie(res, "__Host-marcado", value, 604800);
}
async function audit(actor, action, detail) {
  await sql()`INSERT INTO marcada.audit(id,actor,action,detail) VALUES(${randomUUID()},${actor},${action},${detail})`;
}
async function sendCode(email, code) {
  if (!process.env.RESEND_API_KEY)
    throw Object.assign(Error("Email delivery is not configured."), {
      status: 503,
    });
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.MAIL_FROM,
      to: [email],
      subject: "Your Marcado sign-in code",
      text: `Your Marcado verification code is ${code}. It expires in 10 minutes and works once. If you did not request it, ignore this email.`,
    }),
  });
  if (!r.ok)
    throw Object.assign(Error("Email delivery is temporarily unavailable."), {
      status: 503,
    });
}
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex");
  try {
    const url = new URL(req.url, origin()),
      route = url.pathname.replace(/^\/api\/?/, "");
    let body = req.body || {};
    if (typeof body === "string") {
      if (body.length > (route === "admin/image" ? 1500000 : 16000))
        return json(res, 413, { error: "Request too large" });
      try {
        body = JSON.parse(body);
      } catch {
        return json(res, 400, { error: "Invalid JSON" });
      }
    }
    if (
      JSON.stringify(body).length > (route === "admin/image" ? 1500000 : 16000)
    )
      return json(res, 413, { error: "Request too large" });
    if (route === "image" && req.method === "GET") {
      const id = url.searchParams.get("id");
      if (!uuid(id)) return json(res, 400, { error: "Invalid image" });
      const [m] =
        await sql()`SELECT mime,data FROM marcada.media WHERE id=${id}`;
      if (!m) return json(res, 404, { error: "Image not found" });
      res.setHeader("Content-Type", m.mime);
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      return res.status(200).end(Buffer.from(m.data, "base64"));
    }
    if (route === "health" && req.method === "GET") {
      await sql()`SELECT 1 FROM marcada.products LIMIT 1`;
      return json(res, 200, { ok: true });
    }
    if (route === "maintenance" && req.method === "GET") {
      if (
        !process.env.CRON_SECRET ||
        req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`
      )
        return json(res, 401, { error: "Unauthorized" });
      for (const t of [
        "sessions",
        "auth_tokens",
        "email_challenges",
        "rate_limits",
      ])
        await sql().query(`DELETE FROM marcada.${t} WHERE expires_at<now()`);
      return json(res, 200, { ok: true });
    }
    if (route === "catalog" && req.method === "GET") {
      const u = await user(req);
      const products =
        await sql()`SELECT * FROM marcada.products WHERE active ORDER BY CASE WHEN id='bitaxe' THEN 0 ELSE 1 END,name`;
      const offers =
        await sql()`SELECT o.id,o.product_id,o.item_id,o.dealer,o.price,o.currency,o.private,o.expires_at FROM marcada.offers o WHERE o.active AND (o.expires_at IS NULL OR o.expires_at>now()) AND (NOT o.private OR ${u?.canDeals || false} OR EXISTS(SELECT 1 FROM marcada.offer_grants g WHERE g.offer_id=o.id AND g.identity=${u?.identity || ""}))`;
      const items =
        await sql()`SELECT * FROM marcada.items WHERE active ORDER BY product_id,name`;
      return json(res, 200, {
        products,
        offers,
        items,
        commerce: { checkout: false, delivery: false },
      });
    }
    if (route === "go" && req.method === "GET") {
      const id = url.searchParams.get("id");
      if (!uuid(id)) return json(res, 400, { error: "Invalid offer" });
      const u = await user(req);
      const [o] =
        await sql()`SELECT o.url FROM marcada.offers o WHERE o.id=${id} AND o.active AND (o.expires_at IS NULL OR o.expires_at>now()) AND (NOT o.private OR ${u?.canDeals || false} OR EXISTS(SELECT 1 FROM marcada.offer_grants g WHERE g.offer_id=o.id AND g.identity=${u?.identity || ""}))`;
      if (!o) return json(res, 404, { error: "Offer unavailable" });
      res.setHeader("Location", dealerUrl(o.url));
      return res.status(302).end();
    }
    if (req.method !== "GET" && req.headers.origin !== origin())
      return json(res, 403, { error: "Request origin rejected" });
    if (route === "auth/email" && req.method === "POST") {
      await limited(req, "email", 5);
      const identity = normalizeIdentity(body.email);
      if (!identity.includes("@"))
        return json(res, 400, { error: "Enter an email address" });
      await limited(
        { headers: { "x-forwarded-for": identity } },
        "email-identity",
        5,
      );
      const challenge = token();
      if (true) {
        const code = String(randomInt(100000000)).padStart(8, "0");
        await sql()`DELETE FROM marcada.email_challenges WHERE identity=${identity}`;
        await sql()`INSERT INTO marcada.email_challenges(hash,identity,code_hash,expires_at) VALUES(${hash(challenge)},${identity},${hash(challenge + ":" + code)},now()+interval '10 minutes')`;
        await sendCode(identity, code);
      }
      return json(res, 200, {
        challenge,
        message: "A verification code has been sent.",
      });
    }
    if (route === "auth/verify-email" && req.method === "POST") {
      await limited(req, "verify-email", 30);
      const challenge = String(body.challenge || ""),
        code = String(body.code || "");
      if (!/^[a-f0-9]{64}$/.test(challenge) || !/^[0-9]{8}$/.test(code))
        return json(res, 401, { error: "Invalid or expired code" });
      const [attempt] =
        await sql()`UPDATE marcada.email_challenges SET attempts=attempts+1 WHERE hash=${hash(challenge)} AND attempts<5 AND expires_at>now() RETURNING code_hash`;
      if (!attempt || attempt.code_hash !== hash(challenge + ":" + code))
        return json(res, 401, { error: "Invalid or expired code" });
      const [record] =
        await sql()`DELETE FROM marcada.email_challenges WHERE hash=${hash(challenge)} AND code_hash=${hash(challenge + ":" + code)} AND attempts<=5 AND expires_at>now() RETURNING identity`;
      if (!record) return json(res, 401, { error: "Invalid or expired code" });
      await session(res, record.identity);
      await audit(record.identity, "sign_in", "email_code");
      return json(res, 200, { ok: true });
    }
    if (route === "auth/consume" && req.method === "POST") {
      await limited(req, "consume", 20);
      const [t] =
        await sql()`DELETE FROM marcada.auth_tokens WHERE hash=${hash(String(body.token || ""))} AND kind='email' AND expires_at>now() RETURNING identity`;
      if (!t)
        return json(res, 401, {
          error: "This link is invalid or expired. Request a new one.",
        });
      await session(res, t.identity);
      await audit(t.identity, "sign_in", "email");
      return json(res, 200, { ok: true });
    }
    if (route === "auth/nonce" && req.method === "POST") {
      await limited(req, "nonce", 20);
      const nonce = token();
      await sql()`INSERT INTO marcada.auth_tokens(hash,identity,kind,expires_at) VALUES(${hash(nonce)},'', 'siwe',now()+interval '5 minutes')`;
      setCookie(res, "__Host-marcado-nonce", nonce, 300);
      return json(res, 200, {
        nonce,
        domain: new URL(origin()).host,
        uri: origin(),
      });
    }
    if (route === "auth/wallet" && req.method === "POST") {
      await limited(req, "wallet", 20);
      const nonce = cookie(req, "__Host-marcado-nonce");
      const message = String(body.message || "");
      if (message.length > 3000 || !nonce)
        return json(res, 401, { error: "Request a new wallet challenge" });
      const parsed = parseSiweMessage(message);
      if (
        parsed.nonce !== nonce ||
        parsed.domain !== new URL(origin()).host ||
        parsed.uri !== origin() ||
        parsed.chainId !== 1 ||
        !parsed.issuedAt ||
        Math.abs(Date.now() - parsed.issuedAt.getTime()) > 300000
      )
        return json(res, 401, { error: "Invalid wallet challenge" });
      const [challenge] =
        await sql()`SELECT 1 FROM marcada.auth_tokens WHERE hash=${hash(nonce)} AND kind='siwe' AND expires_at>now()`;
      if (!challenge)
        return json(res, 401, { error: "Wallet challenge expired" });
      const client = createPublicClient({
        chain: mainnet,
        transport: http(
          process.env.ETH_RPC_URL || "https://ethereum-rpc.publicnode.com",
        ),
      });
      if (
        !(await client.verifySiweMessage({
          message,
          signature: body.signature,
          domain: new URL(origin()).host,
          nonce,
        }))
      )
        return json(res, 401, { error: "Wallet signature rejected" });
      const identity = normalizeIdentity(parsed.address);
      const consumed =
        await sql()`DELETE FROM marcada.auth_tokens WHERE hash=${hash(nonce)} AND kind='siwe' AND expires_at>now() RETURNING hash`;
      if (!consumed.length)
        return json(res, 401, { error: "Challenge already used" });
      await session(res, identity);
      await audit(identity, "sign_in", "wallet");
      return json(res, 200, { ok: true });
    }
    if (route === "auth/logout" && req.method === "POST") {
      await sql()`DELETE FROM marcada.sessions WHERE hash=${hash(cookie(req, "__Host-marcado"))}`;
      setCookie(res, "__Host-marcado", "", 0);
      return json(res, 200, { ok: true });
    }
    const u = await user(req);
    if (!u) return json(res, 401, { error: "Sign in to continue" });
    if (route === "me" && req.method === "GET") {
      const quotes =
        await sql()`SELECT q.*,p.name,i.name AS item_name FROM marcada.quotes q JOIN marcada.products p ON p.id=q.product_id LEFT JOIN marcada.items i ON i.id=q.item_id WHERE q.identity=${u.identity} ORDER BY q.created_at DESC LIMIT 100`;
      return json(res, 200, { user: u, quotes });
    }
    if (route === "quotes" && req.method === "POST") {
      await limited(req, "quote", 10);
      const product = textField(body.product, 80),
        quantity = Number(body.quantity),
        details = textField(body.details);
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10000)
        return json(res, 400, { error: "Quantity must be from 1 to 10,000" });
      if (
        !(
          await sql()`SELECT 1 FROM marcada.products WHERE id=${product} AND active`
        ).length
      )
        return json(res, 400, { error: "Unknown product" });
      const itemId = body.item_id || null;
      if (
        itemId &&
        !(
          await sql()`SELECT 1 FROM marcada.items WHERE id=${itemId} AND product_id=${product} AND active`
        ).length
      )
        return json(res, 400, {
          error: "Choose an available product in this collection",
        });
      const [ref] =
        await sql()`SELECT referral FROM marcada.users WHERE referral=${String(body.referral || "").slice(0, 16)} AND identity<>${u.identity}`;
      const id = randomUUID();
      await sql()`INSERT INTO marcada.quotes(id,identity,product_id,quantity,details,referral,item_id) VALUES(${id},${u.identity},${product},${quantity},${details},${ref?.referral || null},${itemId})`;
      return json(res, 201, { id });
    }
    if (!u.staff) return json(res, 403, { error: "Staff access required" });
    if (route.startsWith("admin/role") && !u.owner)
      return json(res, 403, { error: "Owner access required" });
    if (
      (route.startsWith("admin/offer") || route === "admin/grant") &&
      !u.canDeals
    )
      return json(res, 403, { error: "Dealer manager access required" });
    if (route === "admin/quote" && !u.canQuotes)
      return json(res, 403, { error: "Quote manager access required" });
    if ((route === "admin/item" || route === "admin/image") && !u.canDeals)
      return json(res, 403, { error: "Product manager access required" });
    if (route === "admin/image" && req.method === "POST") {
      await limited(req, "image-upload", 20);
      const m = imageUpload(body.image),
        id = randomUUID();
      await sql()`INSERT INTO marcada.media(id,mime,data,bytes,created_by) VALUES(${id},${m.mime},${m.data},${m.bytes},${u.identity})`;
      await audit(u.identity, "upload_product_image", id);
      return json(res, 201, { url: "/api/image?id=" + id });
    }
    if (route === "admin/item" && req.method === "POST") {
      const p = itemInput(body);
      if (
        !(
          await sql()`SELECT 1 FROM marcada.products WHERE id=${p.product_id} AND active`
        ).length
      )
        return json(res, 400, { error: "Unknown collection" });
      await sql()`INSERT INTO marcada.items(id,product_id,name,description,price,currency,price_kind,price_checked,source_url,source_name,image_url,image_credit,specifications,active) VALUES(${p.id},${p.product_id},${p.name},${p.description},${p.price},${p.currency},${p.price_kind},${p.price_checked},${p.source_url},${p.source_name},${p.image_url},${p.image_credit},${p.specifications},${p.active}) ON CONFLICT(id) DO UPDATE SET product_id=EXCLUDED.product_id,name=EXCLUDED.name,description=EXCLUDED.description,price=EXCLUDED.price,currency=EXCLUDED.currency,price_kind=EXCLUDED.price_kind,price_checked=EXCLUDED.price_checked,source_url=EXCLUDED.source_url,source_name=EXCLUDED.source_name,image_url=EXCLUDED.image_url,image_credit=EXCLUDED.image_credit,specifications=EXCLUDED.specifications,active=EXCLUDED.active,updated_at=now()`;
      await audit(u.identity, "save_product", p.id);
      return json(res, 200, { id: p.id });
    }
    if (route === "admin/role" && req.method === "POST") {
      const identity = normalizeIdentity(body.identity);
      if (isAdmin(identity))
        return json(res, 400, { error: "Owner access is protected" });
      if (
        !["admin", "dealer_manager", "support", "customer"].includes(body.role)
      )
        return json(res, 400, { error: "Invalid role" });
      if (body.role === "customer")
        await sql()`DELETE FROM marcada.roles WHERE identity=${identity}`;
      else
        await sql()`INSERT INTO marcada.roles(identity,role) VALUES(${identity},${body.role}) ON CONFLICT(identity) DO UPDATE SET role=EXCLUDED.role`;
      await audit(u.identity, "set_role", identity + ":" + body.role);
      return json(res, 200, { ok: true });
    }
    if (route === "admin" && req.method === "GET") {
      return json(res, 200, {
        items: u.canDeals
          ? await sql()`SELECT * FROM marcada.items ORDER BY product_id,name`
          : [],
        roles: u.owner
          ? await sql()`SELECT identity,role FROM marcada.roles ORDER BY identity`
          : [],
        offers: u.canDeals
          ? await sql()`SELECT o.*,COALESCE((SELECT json_agg(g.identity) FROM marcada.offer_grants g WHERE g.offer_id=o.id),'[]') AS recipients FROM marcada.offers o ORDER BY o.created_at DESC`
          : [],
        quotes: u.canQuotes
          ? await sql()`SELECT q.*,p.name,i.name AS item_name FROM marcada.quotes q JOIN marcada.products p ON p.id=q.product_id LEFT JOIN marcada.items i ON i.id=q.item_id ORDER BY q.created_at DESC LIMIT 500`
          : [],
      });
    }
    if (route === "admin/offer" && req.method === "POST") {
      const id = uuid(body.id) ? body.id : randomUUID(),
        product = textField(body.product, 80),
        dealer = textField(body.dealer, 100),
        target = dealerUrl(body.url),
        notes = String(body.notes || "").slice(0, 3000),
        price =
          body.price === "" || body.price == null ? null : Number(body.price),
        currency = String(body.currency || "USD");
      if (
        (price !== null && (!Number.isFinite(price) || price < 0)) ||
        !["USD", "EUR", "GBP", "CAD", "AUD"].includes(currency)
      )
        return json(res, 400, { error: "Invalid price or currency" });
      if (typeof body.private !== "boolean")
        return json(res, 400, { error: "Choose offer visibility" });
      const itemId = body.item_id || null;
      if (
        itemId &&
        !(
          await sql()`SELECT 1 FROM marcada.items WHERE id=${itemId} AND product_id=${product}`
        ).length
      )
        return json(res, 400, {
          error: "Product does not belong to this collection",
        });
      const expires = body.expires ? new Date(body.expires) : null;
      if (
        expires &&
        (!Number.isFinite(expires.getTime()) || expires.getTime() <= Date.now())
      )
        return json(res, 400, { error: "Expiry must be in the future" });
      if (
        !(await sql()`SELECT 1 FROM marcada.products WHERE id=${product}`)
          .length
      )
        return json(res, 400, { error: "Unknown product" });
      await sql()`INSERT INTO marcada.offers(id,product_id,dealer,url,price,currency,private,notes,expires_at,item_id) VALUES(${id},${product},${dealer},${target},${price},${currency},${body.private},${notes},${expires?.toISOString() || null},${itemId}) ON CONFLICT(id) DO UPDATE SET product_id=EXCLUDED.product_id,dealer=EXCLUDED.dealer,url=EXCLUDED.url,price=EXCLUDED.price,currency=EXCLUDED.currency,private=EXCLUDED.private,notes=EXCLUDED.notes,expires_at=EXCLUDED.expires_at,item_id=EXCLUDED.item_id`;
      await audit(u.identity, "save_offer", id);
      return json(res, 200, { id });
    }
    if (route === "admin/offer-state" && req.method === "POST") {
      if (!uuid(body.id) || typeof body.active !== "boolean")
        return json(res, 400, { error: "Invalid offer" });
      await sql()`UPDATE marcada.offers SET active=${body.active} WHERE id=${body.id}`;
      await audit(u.identity, "offer_state", body.id);
      return json(res, 200, { ok: true });
    }
    if (route === "admin/grant" && req.method === "POST") {
      if (!uuid(body.id) || typeof body.remove !== "boolean")
        return json(res, 400, { error: "Invalid offer" });
      const identity = normalizeIdentity(body.identity);
      if (body.remove)
        await sql()`DELETE FROM marcada.offer_grants WHERE offer_id=${body.id} AND identity=${identity}`;
      else
        await sql()`INSERT INTO marcada.offer_grants(offer_id,identity) VALUES(${body.id},${identity}) ON CONFLICT DO NOTHING`;
      await audit(
        u.identity,
        body.remove ? "revoke_offer" : "grant_offer",
        body.id,
      );
      return json(res, 200, { ok: true });
    }
    if (route === "admin/quote" && req.method === "POST") {
      if (
        !uuid(body.id) ||
        !["new", "reviewing", "quoted", "closed"].includes(body.status)
      )
        return json(res, 400, { error: "Invalid quote status" });
      await sql()`UPDATE marcada.quotes SET status=${body.status} WHERE id=${body.id}`;
      await audit(u.identity, "quote_status", body.id);
      return json(res, 200, { ok: true });
    }
    return json(res, 404, { error: "Not found" });
  } catch (error) {
    return json(res, error.status || 500, {
      error: error.status
        ? error.message
        : "Something went wrong. Please try again.",
    });
  }
}
