export function moneyMinor(value) {
  const s = String(value ?? "");
  if (!/^\d{1,7}(?:\.\d{1,2})?$/.test(s))
    throw Object.assign(
      Error("Use a non-negative amount with up to two decimal places."),
      { status: 400 },
    );
  const [whole, fraction = ""] = s.split(".");
  return Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
}
export function proposalInput(b) {
  if (!["USD", "EUR", "GBP", "CAD", "AUD"].includes(b.currency))
    throw Object.assign(Error("Choose a supported currency."), { status: 400 });
  const expires = new Date(b.expires_at);
  if (!Number.isFinite(expires.getTime()) || expires <= new Date())
    throw Object.assign(Error("Choose a future expiry."), { status: 400 });
  const terms = String(b.terms || "").trim();
  if (terms.length < 10 || terms.length > 3000)
    throw Object.assign(
      Error("Enter delivery and purchase terms, up to 3,000 characters."),
      { status: 400 },
    );
  return {
    unit: moneyMinor(b.unit_price),
    tax: moneyMinor(b.tax || "0"),
    shipping: moneyMinor(b.shipping || "0"),
    currency: b.currency,
    terms,
    expires: expires.toISOString(),
  };
}
