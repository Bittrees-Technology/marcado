# Mercado

Marketplace infrastructure for product discovery, dealer offers, referral attribution and quote management. Catalogs and categories are configurable; the Bittrees deployment currently focuses on mining, compute and electronics.

[Live marketplace](https://mercado.bittrees.org) · [Architecture and roadmap](PLAN.md) · [Commerce foundations](COMMERCE.md)

## Capabilities

- Product collections, pricing, source metadata, editable images and catalog filters.
- Public dealer offers and private deals with explicit access controls.
- Member referral codes and shareable links, attributed to customer quote requests.
- Email verification and Sign-In with Ethereum, with verified email–wallet linking.
- Role-based administration and optional Bittrees governance role resolution.
- Consent-controlled analytics and foundations for future payments and delivery.

Direct checkout and payouts are not enabled. Supplier reference prices and availability do not represent marketplace inventory or guaranteed fulfillment.

## Stack

React and Vite frontend, Vercel server functions, PostgreSQL via Neon, Resend email and viem for wallet verification. Authorization, private deal terms and credentials remain server-side.

## Development

Use Node.js 24 or later. Copy `.env.example` to `.env.local` and configure the server credentials.

```sh
npm ci
npm run dev
npm run build
npm test
```

`npm run dev` previews the frontend. Use `vercel dev` for API-backed local flows. Apply database migrations explicitly with `npm run db:migrate`; deployments do not run migrations automatically. Catalog imports preserve existing operator edits.

For database-backed verification, run `node --env-file=.env.local tests/integration.mjs` against a dedicated test database. Tests create and remove fixture records and do not send email. `node tests/equipment-render.mjs` checks collection and product rendering.

## Deployment and operations

Deploy to Vercel with `APP_ORIGIN` set to the canonical HTTPS domain and a verified email sender. Configure recovery owners through server environment values. The Bittrees integration maps verified governance Partners to Owners and Admins to Administrators; owners can assign local dealer managers and support staff.

The existing deployment retains the internal `marcada` database schema and analytics identifier to preserve records and reporting history. Public branding, links and authentication use Mercado. Previous storefront domains redirect to the canonical domain while preserving product paths and referral parameters.

See [sourcing research](SOURCING-RESEARCH.md) for the current deployment's catalog evidence. Products, supplier relationships and commercial terms are deployment data, independent of the marketplace infrastructure.
