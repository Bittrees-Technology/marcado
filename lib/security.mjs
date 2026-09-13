import { createHash, randomBytes } from "node:crypto";
export const hash = (v) => createHash("sha256").update(v).digest("hex");
export const token = () => randomBytes(32).toString("hex");
export function normalizeIdentity(value) {
  const v = String(value || "")
    .trim()
    .toLowerCase();
  if (
    /^0x[a-f0-9]{40}$/.test(v) ||
    (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length < 255)
  )
    return v;
  throw Object.assign(Error("Enter a valid email or wallet address"), {
    status: 400,
  });
}
export const isAdmin = (i) =>
  Boolean(
    i &&
    (i === process.env.ADMIN_EMAIL?.toLowerCase() ||
      i === process.env.ADMIN_WALLET?.toLowerCase()),
  );
export function dealerUrl(value) {
  let u;
  try {
    u = new URL(value);
  } catch {
    throw Object.assign(Error("Enter a valid HTTPS dealer URL"), {
      status: 400,
    });
  }
  if (
    u.protocol !== "https:" ||
    u.username ||
    u.password ||
    u.port ||
    !u.hostname.includes(".") ||
    /^(localhost|127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)/.test(
      u.hostname,
    ) ||
    u.hostname.endsWith(".local") ||
    u.hostname.endsWith(".internal") ||
    value.length > 2000
  )
    throw Object.assign(
      Error("Use a public HTTPS dealer URL without credentials"),
      { status: 400 },
    );
  return u.href;
}
export const uuid = (v) =>
  /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(
    String(v || ""),
  );
export function textField(v, max = 3000) {
  if (typeof v !== "string" || !v.trim() || v.length > max)
    throw Object.assign(Error("Check the required fields and their length"), {
      status: 400,
    });
  return v.trim();
}
