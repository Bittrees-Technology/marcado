# Marcada

Mining, AI and server equipment storefront for Bittrees Technology.

Production: https://marcada.bittrees.org

See [PLAN.md](PLAN.md) for scope, operations and the direct-commerce roadmap.

## Development

Node 24+, `npm ci`, copy `.env.example` to `.env.local` and configure server values. `npm run build` builds the frontend. Vercel serves `api/index.mjs`; `npm run dev` is a frontend preview and does not emulate server functions. Use Vercel development or production for API-backed flows.

`npm run db:migrate` applies idempotent additive migrations to the dedicated `marcada` PostgreSQL schema. This runs explicitly, not during every deployment. Never point tests at other applications' schemas.

`npm test` runs unit security tests. `node --env-file=.env.local tests/integration.mjs` exercises server authorization, quote/referral persistence, email-code replay protection, and SIWE verification using generated test identities and removes its test records. It never sends email.

## Store operations

Sign in with the protected owner identity, then choose Manage store. Owner wallet is the deployment-time mainnet resolution of raging.eth; it is pinned so ENS transfers cannot silently transfer Marcada ownership. Update server configuration to intentionally transfer ownership. Do not expose server environment values in browser bundles.

Owner appoints administrators, dealer managers and support by exact email or wallet identity. Users authenticate those identities before receiving access. There are no automatic invitation messages. Email and wallet accounts are separate; assigning both is explicit.

Dealer offers can be added later, edited, deactivated and reactivated. Private terms and links stay server-side. Private access is granted/revoked per offer. A dealer manager sees negotiated offers; support sees quote requests. Role removal takes effect on the next server request. Admins cannot modify owner roles.

Customers can copy store or product referral links. Valid referral codes on incoming URLs are attached to submitted quote requests, excluding self-referrals. External dealer conversion reporting and commission payouts require a dealer integration; they are not inferred from visits.

Initial collection records are sourcing categories. Add verified prices and dealer URLs before advertising availability. Direct checkout remains off; quote requests and dealer checkout are supported.

## Services

Hosted on Vercel under bittrees-tech. Marcada uses an isolated schema on existing Bittrees PostgreSQL infrastructure and the existing verified Resend sender domain. Analytics uses the consent-controlled Bittrees Insights integration, product ID `marcada`. Authentication cookies are host-only, Secure and HttpOnly. Daily maintenance removes expired sessions, challenges and rate limits.

## Validation limits

Server integration tests validate actual cryptographic signing with a generated wallet. They do not exercise a user's browser wallet extension. Resend sender configuration is verified without sending unsolicited test email. Live inbox delivery should be confirmed by the owner signing in.
