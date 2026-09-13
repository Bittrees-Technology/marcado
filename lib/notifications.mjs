// Operations-only referral notifications. Payloads stay fixed across retries.
export function referralMessage(q, recipient, from, origin) {
  if (!recipient || !/^[^\s@,<>]+@[^\s@,<>]+\.[^\s@,<>]+$/.test(recipient))
    return null;
  if (!from) return null;
  return {
    from,
    to: [recipient],
    subject: `Mercado referral quote ${q.id}`,
    text: [
      "A customer submitted a purchase quote using a member referral code.",
      `Quote: ${q.id}`,
      `Submitted: ${q.submitted}`,
      `Customer account: ${q.identity}`,
      `Referral code: ${q.referral}`,
      `Referring member: ${q.referrer}`,
      `Collection: ${q.product}`,
      `Product: ${q.item || "Collection-level request"}`,
      `Quantity: ${q.quantity}`,
      "",
      "Customer-submitted details (unverified text):",
      q.details,
      "",
      `Review in Mercado: ${origin}/admin/quotes`,
      "For authorized Mercado operations only. This is a quote request, not an order or a commission payment.",
    ].join("\n"),
  };
}
export async function deliverNotification(sql, id) {
  if (!process.env.RESEND_API_KEY) return { status: "not_configured" };
  // Stop before the provider's 24-hour idempotency window expires.
  await sql`UPDATE marcada.referral_notifications SET status='needs_review' WHERE quote_id=${id} AND status IN ('pending','sending') AND first_attempt_at < now()-interval '23 hours'`;
  const [row] =
    await sql`UPDATE marcada.referral_notifications SET status='sending',attempts=attempts+1,first_attempt_at=coalesce(first_attempt_at,now()),locked_until=now()+interval '1 minute' WHERE quote_id=${id} AND (status='pending' OR (status='sending' AND locked_until<now())) AND attempts<5 RETURNING *`;
  if (!row) return { status: "not_claimed" };
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(10000),
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `mercado-referral/${id}`,
      },
      body: JSON.stringify(row.payload),
    });
    if (!r.ok) throw Error("provider_rejected");
    const result = await r.json();
    if (!result.id) throw Error("missing_provider_id");
    await sql`UPDATE marcada.referral_notifications SET status='accepted',provider_id=${result.id},accepted_at=now(),locked_until=NULL WHERE quote_id=${id}`;
    return { status: "accepted" };
  } catch {
    await sql`UPDATE marcada.referral_notifications SET status=${row.attempts >= 5 ? "needs_review" : "pending"},locked_until=NULL WHERE quote_id=${id} AND status='sending'`;
    return { status: "pending" };
  }
}
export async function retryNotifications(sql) {
  const rows =
    await sql`SELECT quote_id FROM marcada.referral_notifications WHERE status IN ('pending','sending') ORDER BY created_at LIMIT 10`;
  for (const r of rows) await deliverNotification(sql, r.quote_id);
}

export async function notificationSettings(sql) {
  const [saved] =
    await sql`SELECT recipient,enabled FROM marcada.notification_settings WHERE id='operations'`;
  return (
    saved || {
      recipient: process.env.REFERRAL_NOTIFY_EMAIL || "",
      enabled: Boolean(process.env.REFERRAL_NOTIFY_EMAIL),
    }
  );
}
