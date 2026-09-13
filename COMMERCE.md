# Payment and delivery foundations

The current customer flow is product → quote request → operator review. No on-site payment, shipping booking or paid-order creation endpoint is active. `/api/catalog` explicitly reports `checkout: false` and `delivery: false`.

## Infrastructure installed

- Catalog items have stable SKUs, category membership, numeric prices, currency, source, price verification date and image records.
- Quotes and negotiated offers can reference a specific catalog item.
- `orders` stores an immutable quote reference, customer identity, currency and monetary totals in minor units, with a constraint requiring subtotal + tax + shipping = total.
- `order_lines` stores SKU/name snapshots, quantities and unit prices so future catalog edits do not rewrite purchased items.
- `payment_events` has a unique provider/event key for idempotency, expected amount/currency, and a verification timestamp.
- `shipments` stores carrier, tracking, delivery state and an optional address. No addresses are collected before delivery is implemented.

The tables are empty foundations. They are not a complete checkout service, inventory system or webhook integration. Browsers have no direct database access, and no public route exposes these tables.

## Before activating checkout

1. Decide merchant of record, currencies, stock ownership, dealer fulfillment, shipping destinations, tax rules and returns/warranty responsibilities.
2. Choose payment provider(s) and delivery carrier integrations. Keep provider secrets server-side and separate development/live accounts.
3. Build server-authoritative quote acceptance and inventory reservation. Snapshot prices and currency; never trust prices or totals submitted by the browser. Define expiry and stock release on abandoned checkout.
4. Create provider checkout sessions with an idempotency key. Verify signed webhook payloads, amount, currency and order identity before transitioning a paid state. Never mark paid from a client redirect. Deduplicate webhook events inside the same transaction as the state update.
5. Collect the minimal delivery address, restrict access to authorized fulfillment staff, calculate tax/shipping, and record customer agreement to the final total and policies.
6. Verify signed carrier callbacks. Add customer order history, refunds/cancellations, reconciliation, support workflows and retention controls.
7. Tie referral commissions to settled, non-refunded orders under actual dealer agreements. A quote or visit alone is not a commission event.

Enable production payments only after sandbox tests cover duplicate/out-of-order webhooks, mismatched amounts/currencies, reservation races, partial refunds and delivery failures. Keep explicit server feature flags off until that release is ready.
