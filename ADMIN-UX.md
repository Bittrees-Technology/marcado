# Admin and wallet experience

## Implemented

The workspace has separate Overview, Products, Dealer offers, Quotes, Vendors, Team access and Notifications pages. Navigation only includes authorized sections. Desktop uses page tabs; phone layouts use a sticky page selector. The heading identifies the signed-in account and role.

Products can be searched by name, ID or supplier before selecting an existing record. The editing form is collapsed until needed; CSV import stays separate. Dealer product choices follow the selected collection. Offers and quotes have search, status filters and batches of 20 records. Overview links summarize assigned work. Mobile forms use one column, readable input sizes, touch-sized actions and dynamic viewport sizing for dialogs.

Owner-only notification settings configure the operations inbox and future referral-email sending. Quote staff can prepare versioned proposals with unit price, currency, tax, delivery, expiry and terms. Customers explicitly accept the current version in their account. Payment and shipping automation remain disabled.

## Wallet behavior

[ERC-6963 provider discovery](https://eips.ethereum.org/EIPS/eip-6963) gives the user a separate button for each announcing wallet. Legacy `window.ethereum` and `ethereum.providers` are fallback discovery paths. Repeated announcements of the same provider are deduplicated. Wallet names are rendered as text; wallet-provided HTML and icons are not rendered.

Both sign-in and verified-email linking use the selected EIP-1193 provider. The signing account is checked again after the signature returns. Rejection, an already-open request, unauthorized access and disconnection have actionable messages. For a wallet selected during the current page session, account-change/disconnect events clear the visible session and request server logout. On a later page load, the header shows the existing authenticated Mercado account; connecting another wallet does not silently change its authority.

Ethereum SIWE sign-in does not request a transaction or spending approval. Mainnet verification behavior is unchanged. Email remains available when no injected wallet is present, including ordinary mobile browsers. Users can open the same URL inside their wallet's browser. Remote QR/WalletConnect transport is not installed, and no compatibility claim is made for a wallet that does not provide these interfaces. Linking retains separate email/wallet quote ownership and private grants.

## Validation

`tests/admin-browser.mjs` uses isolated browser instances, fixture APIs and simulated providers; it does not control the user's Brave tabs, sign real wallet messages or send notifications. It checks seven pages at 320, 375, 812 and 1440 pixel widths in Chromium, Firefox and WebKit (84 page/viewport combinations), including overflow, product selection, search, and multi-wallet cancellation/sign-in/account change. A separate 390 × 844 wallet-dialog case runs in each engine. Screenshots were visually reviewed and used to fix inherited header sizing and phone navigation.

Unit tests cover provider discovery/deduplication, legacy fallback, message encoding, changed accounts and error mapping. Server integration tests exercise SIWE domain/signature/replay controls, role restrictions, recipient access, private-offer revocation, duplicate quote requests, notification retries, proposal totals/version/expiry and customer acceptance. Server rendering also checks all 428 product pages.

These tests cover browser engines and simulated interfaces, not physical wallet apps. Before advertising specific app support, perform device acceptance with current MetaMask, Rabby, Coinbase Wallet and Brave Wallet versions where available, plus iOS Safari and Android Chrome email fallback. Verify returning from wallet approval, rejected/pending requests, switching accounts, virtual keyboard/rotation, session expiry and image/CSV file pickers. Native wallet apps, remote wallet transports and operating-system push remain outside the tested coverage.

To repeat browser checks, install Playwright and its Chromium/Firefox/WebKit engines in a development environment, run `npm run dev -- --port 4173`, then `node tests/admin-browser.mjs`. An isolated installation can be selected with `PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs`.
