# Mercado: US and Western European supplier expansion

Research date: 14 September 2026. Scope: additional supplier offerings for the existing Mercado equipment verticals.

## Outcome

The reviewed import contains **566 additional offerings from eight suppliers**, bringing the existing 441-item catalog to **1,007 active listings** after import. These are supplier offerings, not 566 distinct inventions or manufacturer models. Equivalent hardware from different vendors is retained when it gives customers a sourcing choice; cosmetic variants and redundant same-vendor part aliases were removed.

All additions have a positive source price, currency, direct product URL, dated review evidence, supplier image and an existing Mercado category. Product pages offer a quantity-based Mercado purchase quote. Public prices are reference prices, not a promise of Mercado stock, a reseller agreement or a delivered selling price.

The geographic split is **185 US, 115 EU and 266 UK offerings**. EU additions are from the Netherlands and Germany. The UK is included geographically in Western Europe and has a separate catalog filter; it is not labeled EU. Supplier market identifies the business/source, not the manufacturing country or a guaranteed ship-from warehouse.

## Catalog coverage

| Mercado category | Added offerings | What this adds |
|---|---:|---|
| ASIC and other crypto miners | 87 | Industrial miners, home miners/heaters, hydro and immersion models, USB kits and selected non-Bitcoin miners |
| Bitaxe | 13 | Supplier/configuration alternatives and current open-source boards |
| AI compute | 28 | Refurbished accelerators and GPU-server configurations, edge AI boards, HATs and cameras |
| Servers and networking | 14 | Storage enclosures, switches, serial servers, rack and node infrastructure |
| Components | 304 | Enterprise SSD/HDD and ECC memory, compute modules, NVMe/PCIe/PoE hardware, power and compatible enclosures |
| Mining accessories | 120 | PSUs, cooling, exhaust adapters, controller parts, screens and stands |
| **Total** | **566** | |

The large component share is deliberate: storage, memory, power and compatible expansion parts support complete node, mining and AI deployments. A rack or GPU-ready bare system is described as such; slots do not imply installed GPUs, and a case does not imply an included computer. Hobby merchandise, unrelated consumer products, wallet accessories, apparel and purely decorative duplicates were excluded.

## Supplier findings and recommended procurement order

| Supplier | Market | Added | Fit and next step |
|---|---|---:|---|
| [ServerPartDeals](https://servertechsolutions.com/) | Florida | 81 | Enterprise storage, ECC RAM, refurbished GPUs and GPU-server configurations. Prioritize a resale/bulk account, condition grades, warranty handling and Nevada delivery pricing. |
| [Bitcoin Merch](https://bitcoinmerch.com/pages/contact-us) | California supplier market | 66 | Desktop and industrial miners, USB-miner kits, spare parts and power supplies. Confirm preorder dates, actual dispatch location and exact ASIC configuration before accepting customer funds. |
| [CryptoCloaks](https://www.cryptocloaks.com/terms-of-service/) | Colorado | 38 | Home mining hardware, exhaust shrouds, enclosures, stands and heat-reuse accessories. Qualify accessory compatibility, manufacturing lead times and a commercial product-media agreement. |
| [Mining Wholesale](https://miningwholesale.eu/contact/) | Netherlands | 96 | Air, hydro and immersion ASICs, open-source miners and replacement equipment. Confirm the supplying warehouse, selected hashrate, included PSU/cooling and terms for Mercado procurement. Supplier says orders are final only after confirmation and payment. |
| [Solomining / Bolt Engineering](https://solomining.de/pages/impressum) | Germany | 12 | German-sourced Bitaxe configurations, spare power supplies, chips, cooling and stands. Qualify EU plug options, batch availability, warranty and Portugal delivery. |
| [BitcoinStuffStore](https://www.bitcoinstuffstore.com/contact-pagina/) | Netherlands | 7 | Bitaxe and Nerd-series miners plus a Start9 node offering. Confirm exact miner revision, included PSU, node configuration and business purchasing terms. |
| [The Pi Hut](https://thepihut.com/pages/faqs) | United Kingdom | 212 | Edge AI, Compute Module hardware, NVMe/PoE expansions, networking, racks, power and compatible enclosures. Use the published wholesale application route; confirm bulk pricing and landed cost to Portugal or Nevada. |
| [Pimoroni](https://shop.pimoroni.com/pages/about-us) | Sheffield, United Kingdom | 54 | Raspberry Pi compute, AI HATs, NVMe bases, network interfaces, displays and enclosures. Qualify the wholesale account and destination tax treatment. Retail references in this batch include the page-listed UK VAT amount. |

For Nevada, the strongest initial procurement conversations are ServerPartDeals for enterprise compute/storage and Bitcoin Merch or CryptoCloaks for smaller mining orders. For Portugal, start with the German and Dutch sources, then compare UK landed costs for specialized boards. This is a sourcing recommendation based on catalog fit and supplier geography, not a measured service ranking.

The Pi Hut explicitly offers a business/wholesale route and identifies UK warehouse dispatch. Pimoroni publishes a wholesale ordering channel. These are useful starting points for commercial terms, but Mercado has not been approved as a reseller by this research. [The Pi Hut wholesale information](https://thepihut.com/pages/faqs), [Pimoroni wholesale ordering](https://wholesale.pimoroni.com/pages/how-to-order).

Mining Wholesale publishes a Netherlands company address and a quote process, while warning that it sells through its own site. Mercado must procure in its own capacity and agree suitable resale/fulfillment terms; its catalog presence must not imply that Mercado represents that supplier. [Mining Wholesale contact and ordering information](https://miningwholesale.eu/contact/).

## Validation method and limits

1. Queried public supplier catalogs and searched primary company, contact, product and wholesale pages. Across the eight selected suppliers, the collected catalog feeds contained 5,263 rows before scope filtering; pagination was bounded and does not imply exhaustive coverage of every vendor.
2. Compared canonical source URLs against all 441 existing catalog entries. Selected one available, positively priced variant per Shopify parent; retained WooCommerce starting configurations where the supplier uses a variable product. Distinct bundles, hardware revisions, condition grades and meaningful configurations may remain separate.
3. Reviewed 672 initial candidates, removed 98 scope/alias issues, and checked all 574 remaining product pages. Initial rate limits were respected by stopping affected requests, reducing concurrency and retrying after a cooldown. Every final product page returned HTTP 200 and a usable title; no blocked pages were used to satisfy the count.
4. Deferred eight further offerings: conflicting S21++/S21+ naming, conflicting Glod/Thor naming, a 440/480 MH/s conflict, a cosmetic Ghost edition, one equivalent drive alias, an educational CPU lottery device and one unreconciled retail price and one unavailable supplier image. The explicit deferred list is retained below.
5. Recorded product-page fingerprints, the selected variant, feed price, published reference price and available structured page prices. **481 of 566** prices match the product page's structured offer or price metadata. The other **85** use the public catalog's exact variant or starting price; they are not claimed to be independently corroborated page prices. All require a fresh supplier quote before sale.
6. Downloaded supplier product photos, checked image signatures and recorded SHA-256 hashes; byte-identical assets are reused. Photos may illustrate another configuration and are credited accordingly. This establishes provenance, not a negotiated commercial media license.

Public availability indicates that a supplier accepted purchase selection when checked. It does not establish a reserved unit, an agreed delivery date or stock held by Mercado. All new Mercado stock flags remain **confirmation required**. Lead-time/preorder text is carried into configuration notes where found. Public listings and model specifications were checked; hardware was not physically tested, suppliers were not contacted and warranties were not independently audited.

## Pricing and specification corrections

ServerPartDeals is a US source, but its storefront returned **EUR** prices in this research session. Those amounts remain EUR; no assumed exchange rate was applied. The supplier's parent describes its Florida storage operation. [Server Tech Solutions](https://servertechsolutions.com/).

Pimoroni's public feed returned net prices while the retail product pages returned a 20% higher GBP amount. The 54 included Pimoroni entries use the matching retail page amount and carry a tax note. The one unconfirmed reconciliation was deferred. Destination taxes, duties and shipping are still subject to the actual Mercado quote. [Pimoroni retail cart](https://shop.pimoroni.com/en-us/cart).

The Goldshell BYTE page's lowest available variant was a **140W charger**. The imported offering is explicitly a charger in mining accessories, not a complete miner. The Bitaxe Touch offer uses the selected **BM1368** configuration and its 650–750 GH/s rate, rather than the parent's 1 TH/s headline. GPU-server titles retain full specifications and refurbished condition even when the display title is shortened.

Miner hash rates are entered only when supported by the relevant supplier description or selected configuration. Algorithm labels distinguish Scrypt, Equihash, Etchash, kHeavyHash, XPHERE and SHA-3X products from Bitcoin SHA-256 miners. Overclocked figures and aggregate bundle rates are qualified. All 100 new miner offerings have qualified rates. Where a headline omitted units, the product specification table supplied them; rates were not borrowed from similarly named products. Mining revenue and solo-block success are not promised.

## Buying through Mercado

The current flow remains customer selection → quantity and requirements → Mercado quote → supplier confirmation. Before issuing a payable quote, record the selected SKU/revision, quantity, condition, included components, confirmed stock, dispatch location, destination, delivery cost, tax treatment, warranty and quote expiry. The supplier quote and Mercado margin should remain private; the customer receives the Mercado offer and applicable fulfillment terms.

For the Nevada and Portugal hubs, compare delivered cost per order rather than sorting unlike currencies numerically. UK availability is useful for niche compute parts, but its delivery and tax terms should be checked separately from intra-EU procurement. Existing referral attribution and private-deal controls continue to apply to these new product pages. No payment capture or automatic supplier ordering was introduced.

## Further supplier queue

Several additional sources merit a later, narrower enterprise-server pass: [TechMikeNY](https://techmikeny.com/about-us), [UNIXSurplus](https://unixsurplus.com/), [Exxact](https://www.exxactcorp.com/category/Generative-AI-Solutions), [Thinkmate](https://www.thinkmate.com/systems/servers/gpx/rtx), [Bargain Hardware](https://www.bargainhardware.co.uk/) and [Server Parts Europe](https://www.server-parts.eu/). They are leads, not part of this import. Configurator pricing, unavailable standard feeds or access restrictions prevented the same bounded validation in this pass. A useful next batch would emphasize complete servers and accelerators rather than adding more general accessories.

## Review files and repeatable tooling

- [Public feed inventory and collection fingerprints](data/research/sourcing-round3-feed-manifest.json)
- [Imported catalog and all source URLs](data/sourcing-round3.json)
- [Per-product evidence, prices and page fingerprints](data/research/sourcing-round3-evidence.json)
- [Supplier contacts, locations and qualification notes](data/research/sourcing-round3-vendors.json)
- [Final deferred products](data/research/sourcing-round3-deferred.json)
- [Initial scope and alias exclusions](data/research/sourcing-round3-exclusions.json)
- [Full product/source index](SOURCING-ROUND3-PRODUCTS.md)

`node scripts/check-catalog-sources.mjs data/sourcing-round3.json /tmp/mercado-source-review.json` performs a read-only, resumable page check with one request per host at a time, a 2.5-second pause and a stop on rate/access limits. It never imports data, contacts suppliers or places orders. Price mismatches require review, not automatic repricing. Existing photo preparation and reviewed-import tools validate local images and preserve existing catalog rows.

## Release verification

The release passed all 20 automated tests, production compilation, rendering of all 1,007 catalog product pages, and desktop Chromium/mobile WebKit checks for regional filtering, product detail, quantity entry and horizontal layout. Import uses stable IDs and does not overwrite existing catalog records.
