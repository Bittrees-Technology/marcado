# Marcado

Mining, AI and server equipment storefront for Bittrees Technology.

Production: https://marcado.bittrees.org

See [PLAN.md](PLAN.md) for scope, operations and the direct-commerce roadmap.

## Development

Node 24+, `npm ci`, copy `.env.example` to `.env.local` and configure server values. `npm run build` builds the frontend. Vercel serves `api/index.mjs`; `npm run dev` is a frontend preview and does not emulate server functions. Use Vercel development or production for API-backed flows.

`npm run db:migrate` applies idempotent additive migrations to the dedicated `marcada` PostgreSQL schema. This runs explicitly, not during every deployment. Never point tests at other applications' schemas.

`npm test` runs unit security tests. `node --env-file=.env.local tests/integration.mjs` exercises server authorization, quote/referral persistence, email-code replay protection, and SIWE verification using generated test identities and removes its test records. It never sends email.

## Store operations

Sign in with the protected owner identity, then choose Manage store. Owner wallet is the deployment-time mainnet resolution of raging.eth; it is pinned so ENS transfers cannot silently transfer Marcado ownership. Update server configuration to intentionally transfer ownership. Do not expose server environment values in browser bundles.

Governance Partners receive Owner access and governance Admins (including Snapshot space admins) receive Administrator access. Owners appoint local dealer managers and support by exact email or wallet identity. Users authenticate those identities before receiving access. There are no automatic invitation messages. Email users can link a wallet from My account after email authentication and a fresh wallet signature. Governance access then follows that wallet. Linking does not merge existing quote histories.

Dealer offers can be added later, edited, deactivated and reactivated. Private terms and links stay server-side. Private access is granted/revoked per offer. A dealer manager sees negotiated offers; support sees quote requests. Role removal takes effect on the next server request. Admins cannot modify owner roles.

Customers can copy store or product referral links. Valid referral codes on incoming URLs are attached to submitted quote requests, excluding self-referrals. External dealer conversion reporting and commission payouts require a dealer integration; they are not inferred from visits.

The catalog starts with 20 real products across six sourcing collections, using dated supplier-reference pricing and credited supplier photographs. These are not promises of Marcado inventory. Manage store lets authorized users add/edit/hide products, set prices, and replace photos by upload (JPEG/PNG/WebP, up to 1 MB) or HTTPS URL. Direct checkout remains off; quote requests and dealer checkout are supported.

## Services

Hosted on Vercel under bittrees-tech. Marcado uses an isolated schema on existing Bittrees PostgreSQL infrastructure and the existing verified Resend sender domain. Analytics uses the consent-controlled Bittrees Insights integration, product ID `marcada`. Authentication cookies are host-only, Secure and HttpOnly. Daily maintenance removes expired sessions, challenges and rate limits.

## Validation limits

Server integration tests validate actual cryptographic signing with a generated wallet. They do not exercise a user's browser wallet extension. Resend sender configuration is verified without sending unsolicited test email. Live inbox delivery should be confirmed by the owner signing in.

## Category pages and source data

`/equipment/:category` lists products; `/equipment/:category/:item` opens an individual item. Each page ends with a quote request. `data/catalog-seed.json` records source product URLs, original photo URLs and price verification dates. `npm run db:seed` inserts missing records and never overwrites subsequent admin edits. Product images in `public/products` are credited supplier photos, not generated illustrations.

Owner identities: raging@bittrees.org and the pinned mainnet resolution of raging.eth. Analytics retains the internal `marcada` ID and database schema to preserve history after the public rename.

See [COMMERCE.md](COMMERCE.md) for dormant payment and delivery foundations.

## Shared governance access

`lib/governance.mjs` reads only `https://gov.bittrees.org/api/community` and the `gov.bittrees.eth` Snapshot space. It uses no write credentials and makes no upstream changes. Every authenticated request checks current governance privileges for the verified wallet or the email account’s verified link. Exact Partner maps to Owner; exact Admin or Snapshot space admin maps to Administrator. Junior Partner, Associate, Moderator and token balance do not elevate Marcado access. Unavailable/malformed sources never create a shared privilege. Configured recovery owners remain valid; local admin rows do not confer admin access.

Email linking requires both an authenticated email session and an origin-bound, expiring, single-use SIWE challenge that identifies the email being linked. A wallet can link to one email. Unlink from the email account removes inherited governance privileges. Roles are not copied into local staff records.

## Regional sourcing and filters

`data/regional-sources.json` documents US/EU vendor pages, currencies, tax notes, configuration caveats, photos and source-check dates. `scripts/source-regional-catalog.mjs` inserts new regional listings without overwriting admin edits. Supplier market is distinct from actual dispatch location and inventory in Nevada or Portugal. Filters include market, supplier, currency, availability, search and a maximum price within a selected currency. Price sorting never compares unlike currencies.
