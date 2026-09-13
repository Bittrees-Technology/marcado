# Mercado implementation and launch plan

Canonical site: https://mercado.bittrees.org. Repository: Bittrees-Technology/mercado. Hosting: Vercel, bittrees-tech team.

## Launch scope

A public equipment catalog focused on Bitaxe, with mining hardware, AI compute and server categories. Initial catalog records are sourcing categories, not promises of stock or specifications. Prices are on request until the operator adds verified dealer offers. Customers can request quotes; operators review and progress them in the admin area. Dealer checkout is enabled only for operator-entered HTTPS offers. No invented stock, discounts, commissions or dealer relationships.

## Accounts

Email verification codes and EIP-4361 Sign-In with Ethereum. Server-side expiring, single-use challenges; hashed sessions in Secure HttpOnly SameSite cookies; rate limits and same-origin mutation checks. Bounties reference uses wallet auth; email code UX follows the existing Bittrees Insights implementation. Mercado accounts and tables are separate, without cross-product session sharing. Admin identity is explicitly configured, never self-selected. Email and wallet identities are separate in v1; linking requires a future dual-verification flow.

## Referrals and private deals

Each signed-in user gets an opaque referral code. Store and product share URLs use ?ref=. The referring code is validated server-side and attributed to quote submissions, excluding self-referrals. Referral attribution is carried in the current URL; no silent persistent marketing cookie. Click reporting is not proof of a sale and no automatic commission payout is promised.

Operators add product offers with dealer, HTTPS checkout/referral URL, optional price/currency, expiry, public/private visibility, and private notes. Private access requires explicit email/wallet grants per offer. Price and dealer are visible only to authorized identities; destination URLs and internal terms remain in server records and are resolved through an authorized redirect. Public offer metadata excludes private notes. A recipient necessarily sees the destination after following an authorized dealer redirect. Operators can deactivate offers and remove grants. Dealer links may earn Mercado a commission; disclose alongside the link.

## Data and analytics

Dedicated marcada schema on existing Bittrees database infrastructure. Tables for products, offers, grants, quotes, users, auth challenges, sessions, rate limits and audit. No direct browser database access. Insights consent.js installed with product ID marcada. Register canonical origin in Insights and verify collection; avoid private form content or identity in analytics labels. Expired authentication and rate-limit records are cleaned daily; quote records retained for operations until an approved retention policy is set.

## Release checks

Build, auth replay/invalid signature/expiry checks, anonymous and non-admin rejection, private offer access rejection, safe redirect validation, catalog and quote persistence, production health, Insights registration, custom domain and GitHub push. Email delivery and actual wallet interaction require an inbox and wallet controlled by the tester; do not send unsolicited verification emails.

## Next commercial phase

Before direct on-site payment: agree actual inventory, dealer fulfillment, shipping destinations, tax treatment, returns/warranty ownership, payment provider and referral commission rules. Then add cart, server-authoritative checkout, signed payment webhooks, inventory reservation, order history and commission settlement. AI/server sourcing can start through the same quote workflow today.

## Owner and delegated roles

Owner: raging.eth, resolved on Ethereum mainnet to 0xE5350D96FC3161BF5c385843ec5ee24E8B465B2f on 2026-09-13. Owner email: raging@bittrees.org (confirmed). Owner access is protected in server configuration. Owner can assign/revoke local dealer manager or support roles by verified email/wallet identity. Roles are checked on each server request. Administrators manage quotes and offers but cannot appoint other admins. Dealer managers cannot read quote customer details. Support cannot read negotiated offers or private notes. Roles do not send invitations automatically. Referral URLs and deal terms can be edited at any time; old offers can also be deactivated.

## Launch status — 2026-09-13

Published on Vercel at the canonical domain and connected to Bittrees-Technology/mercado for future deployments. Insights product registered; deployed consent snippet and backend collection verified with a temporary event, then removed. Protected owner wallet configured; email owner raging@bittrees.org configured. Dealer offers can be populated later through Manage store. No real dealer relationships or stock were invented.

## Category catalog expansion

Renamed public site, GitHub repository and Vercel project to Mercado. Existing database schema and Insights product ID remain stable to preserve records. Old domain forwards to the new domain. Six equipment category routes under `/equipment/:category` contain 20 sourced catalog items. Each item has an individual detail page, dated price, currency, source link and real supplier photo. Landing illustrations remain. Product and category referral links retain quote attribution.

Authorized dealer managers and admins can create/edit/hide products, set listed or supplier-reference prices, replace image URLs, or upload PNG/JPEG/WebP images up to 1 MB. Uploaded images are public immutable assets; private dealer terms never enter product fields. Seeding never overwrites operator edits. Optional item references tie quotes and offers to a specific product.

## US/EU sourcing and shared governance

Nevada and Portugal are the user-confirmed distribution/coordination hubs. Add verified US/EU supplier listings without asserting that supplier inventory is hub inventory. Keep USD/EUR prices unconverted, retain VAT/configuration caveats, and verify final landed costs and delivery by quote. No bank details or payment promises are published. Payment-provider entities, accounts and settlement currencies belong to the later payment phase.

Governance Partner → Mercado Owner; governance Admin / Snapshot space admin → Mercado Administrator. Read current registry state on each authenticated request. Existing explicit recovery owners remain. Local assignments are limited to dealer manager and support. Email access inherits governance privilege only after an authenticated email session and fresh wallet signature establish a unique link. No roles are written to governance.
