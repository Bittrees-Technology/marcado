# Referral notifications and private deals

## Operations email

Set `REFERRAL_NOTIFY_EMAIL` to the approved Mercado operations mailbox in Vercel production. `MAIL_FROM` and `RESEND_API_KEY` use the existing verified sender. A blank or invalid recipient disables new notification creation. Changing the recipient affects future requests only; already queued messages retain their original recipient and content.

A successful purchase-quote submission with a valid member referral code atomically saves the quote and an email outbox record. Link visits and code entry alone do not send mail. The email contains the quote ID, timestamp, submitting account, referral code, referring account, product/collection, quantity, submitted requirements and an authenticated admin link. Only the configured operations recipient receives this message. Referrers and vendors do not automatically receive customer information, private offers or dealer notes. Historical quotes are not replayed.

Delivery is attempted immediately with a 10-second timeout. Failures do not discard the quote. Admin → Quotes displays notification state and permits authorized quote staff to retry pending messages. The existing daily maintenance job also processes up to ten pending messages per run. This is a recovery path, not a frequent delivery scheduler. Provider acceptance is not proof of inbox delivery; there is no bounce/delivery webhook yet.

Retries use the same stored body and provider idempotency key, with a database claim preventing concurrent sends. After five attempts or 23 hours from the first attempt, the record requires operator review instead of automatic resend. This stays within [Resend's 24-hour idempotency window](https://resend.com/docs/dashboard/emails/idempotency-keys). Check provider logs before resolving an uncertain delivery manually. Email payload copies are access-restricted database records and are deleted when the parent quote is deleted.

Tests replace provider calls with a mock. Do not use real customer quotes as delivery tests.

## How private offers currently work

An owner, administrator, dealer manager or offer manager creates an offer with a dealer URL, optional price, currency, expiry and staff notes, then explicitly grants access to normalized email or wallet identities. A recipient signs in as the granted identity. Grants currently match that exact identity; linking an email and wallet does not merge offer grants or account quote history.

The catalog API returns the offer's dealer, price, currency and expiry only to authorized recipients and deal staff. Internal notes and the grant list remain on the authorized administration surface. The dealer URL is resolved through `/api/go` only after the server checks access, active status and expiry again. Revocation takes effect for subsequent Mercado requests. A previously revealed external URL cannot be recalled or made confidential by Mercado; vendor-side codes and restrictions are required if the external deal itself must remain exclusive.

Opening the dealer link redirects to the dealer's website. Mercado does not transmit the customer's quote form to the vendor in that redirect. Any affiliate or deal parameters already placed in the configured dealer URL are passed to the dealer. The vendor then collects its own checkout information and controls its purchase terms. Mercado does not yet confirm external sales or calculate/pay commissions.

The separate Mercado purchase-quote path stores the customer's request for authorized quote staff. It does not currently bind the request to a private offer, send a formal price proposal, collect acceptance, process payment, or book delivery. Those steps remain manual. Quote statuses describe operator progress and do not execute a transaction.

## Wallet messaging integration direction

The Chirpy thread was asked to review its actual XMTP capabilities and deployment blockers. Wallet authentication alone is not messaging consent or evidence of a reachable messaging inbox. A production integration should require an opted-in, verified wallet and an available messaging identity; use a dedicated Mercado service sender with server-side key custody and durable delivery tracking.

Prefer a minimal “Your quote has an update” notification linking to an authenticated Mercado page. Private prices, customer requirements, dealer URLs and identity mappings should stay behind Mercado authorization unless the customer explicitly chooses to share them in a conversation. Do not assume messages can be revoked after delivery.

Wallet delivery is not enabled by this email feature. No customer wallet messages or referral emails were sent during implementation.

### Chirpy review findings

The requested thread review checked Chirpy remote/live commit `16b2685e38c205b4a345924f2ec06c7fc1510655`. Its production XMTP transport supports direct messages, request/accept/block consent and reachability checks. The business notification sender/outbox API does not exist; `/api/workflow-event` is telemetry, not a messaging endpoint. Message bodies currently render as plain text, with no supported business-notification deep-link router. The token gate is not production-ready, but a direct-message pilot does not depend on that gate.

Recommended first integration: opted-in direct-message alerts, a dedicated persistent Node sender, server-verified wallet/inbox binding, and minimal messages linking to a new authenticated Mercado notification-detail route. Add safe HTTPS link rendering in Chirpy, stable event IDs, subscription-version checks, leased queue claims, bounded retries, expiration and reconciliation after uncertain sends. Unlinking, opt-out and changed inbox mappings must invalidate queued messages. Do not silently retarget a pending message to a different wallet.

Before wallet activation, choose the service host and organization/key custodian, permitted notification categories and recipients, opt-out/retention owner, and whether negotiations include dealers. Linked accounts currently remain separate access/referral principals; a canonical-member policy is needed before cross-alias rewards. Referral attribution is not a completed sale or earned commission. XMTP delivery does not establish operating-system push delivery.

Chirpy messaging must never grant an offer, accept final terms or mark payment complete. Quote-submit idempotency, versioned offer acceptance, and a recipient-authorized notification endpoint are follow-on Mercado work. These are distinct from the implemented operations-email outbox and are not yet shipped.
