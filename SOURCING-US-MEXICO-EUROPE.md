# US, Mexico and Western Europe sourcing expansion

Research date: 14 September 2026. This second regional search adds **541 supplier offerings from eight new suppliers** to Mercado's previous 1,007 listings, for a planned total of **1,548 offerings**. These are supplier-specific offers, not 541 unique hardware models. Public sourcing leads do not establish a distribution agreement or guaranteed fulfillment.

## Coverage

| Supplier market | Additional offerings |
|---|---:|
| United States | 373 |
| Mexico | 85 |
| European Union: Spain and Austria | 55 |
| United Kingdom | 28 |

The category distribution is 405 components, 60 servers, 28 mining accessories, 25 ASIC miners, 21 AI-compute products and two Bitaxe products. All 27 miners include a qualified hash rate. Components cover single-board computers, compute modules, compatible power and cooling, storage, networking and development peripherals. Consumer gaming bundles, unrelated home automation, decorative duplicates and merchandise were excluded.

## Supplier qualification

The following primary sources support the regional classifications. Region describes the supplier's documented business presence, not manufacturing origin or a promise that every SKU dispatches from that country. Confirm dispatch location for the actual order.

| Supplier | Location evidence | Offers | Commercial fit |
|---|---|---:|---|
| [ameriDroid](https://ameridroid.com/pages/privacy-policy) | California | 156 | SBCs, edge compute and compatible accessories |
| [Vilros](https://vilros.com/pages/contact-us) | New Jersey | 138 | Raspberry Pi hardware, kits and components |
| [Microbot México](https://microbot.com.mx/pages/contacto-1) | Morelos | 85 | Mexico-based SBC and electronics sourcing in MXN |
| [21energy](https://21energy.com/policies/legal-notice) | Austria | 29 | Mining hardware and heat reuse equipment |
| [Bitronics](https://bitronics.store/pages/contacto) | Spain | 26 | Bitcoin miners and accessories |
| [SB Components](https://shop.sb-components.co.uk/pages/contact-us) | United Kingdom | 28 | Compute expansion boards and peripherals |
| [UNIXSurplus](https://unixsurplus.com/) | California | 62 | Enterprise servers, networking and parts |
| [TechMikeNY](https://techmikeny.com/about-us) | New York / Iowa | 17 | Configurable refurbished enterprise servers |

Microbot's [contact page](https://microbot.com.mx/pages/contacto-1) identifies its Morelos operation. Its [Raspberry Pi kit listing](https://microbot.com.mx/products/kit-raspberry-pi-5-expansion-64gb) provides a local product lead and describes invoicing and warranty arrangements. Those are supplier statements; Mercado must confirm applicability to each business purchase and destination.

Bitronics' [contact information](https://bitronics.store/pages/contacto) places shipping in Spain. 21energy's [legal notice](https://21energy.com/policies/legal-notice) identifies its Austrian entity. TechMikeNY describes its New York headquarters and Iowa facility on its [company page](https://techmikeny.com/about-us). The vendor registry records public contact routes for follow-up without enrolling vendors or sending messages.

## Evidence and selection method

Discovery combined official supplier pages, public product feeds and enterprise product sitemaps. Bounded retrieval reduced repeated requests; individual product pages were then checked for status, title, selected configuration, pricing and available imagery. The evidence file retains source URLs, check timestamps and page fingerprints. Feed fingerprints document the discovery snapshots; this was a broad, bounded search, not a claim to have exhausted every regional supplier.

Every selected offering returned a successful product-page response. **537 of 541** selected prices matched structured page offers or product-price metadata. The other four retain the exact available-variant price from the supplier's public catalog feed and remain reference prices requiring confirmation. A successful response alone does not prove stock. Every imported row therefore uses an unknown Mercado stock status and a quote-confirmation note.

Every offer has a validated local product image and a recorded image hash. Byte-identical images can share an existing asset. Photos illustrate supplier configurations; the selected SKU and quote determine included components. Source credit is retained and authorized catalog managers can replace images. Technical validation does not establish a separate image license or supplier relationship.

The selected Shopify variant ID is retained in product links where available. Generic aggregate prices were not substituted for selected variants. Public server prices can be starting chassis or configure-to-order prices; notes identify that limitation. GPU-capable chassis do not imply installed GPUs, and component counts are not inferred from a chassis photograph.

## Review decisions

A live feed is insufficient evidence that a supplier still trades. **69 Chicago Electronic Distributors candidates were excluded** after its [official site](https://chicagodist.com/pages/about-us) stated that it no longer accepts orders. Its successor direction, [PiShop.us](https://www.pishop.us/), remains a separate sourcing lead rather than a fabricated replacement vendor on those rows.

Configuration review separated Raspberry Pi RAM capacities, display sizes, power-plug variants and accelerator performance tiers. Vilros Argon accessory variants explicitly identify an expansion board alone when the lowest available variant is not a full enclosure. 21energy Ofen 3 uses the selected Base 40 TH/s configuration rather than a faster headline configuration; Ofen 2 Pro retains its qualified up-to-60 TH/s rate. Refurbished miners are labeled accordingly. Bitronics T21 records its industrial voltage requirement. A conflicting NerdQaxe rate is expressed as a qualified range.

Five final candidates were deferred for unresolved model naming, capacity, network-speed or system-configuration issues, or because they fell outside the marketplace's enterprise scope. Earlier scope exclusions and unavailable enterprise candidates are retained separately. No unsupported Mexico-based miner listing was invented to balance regional counts. [330ohms](https://www.330ohms.com/shop) and [Minería Crypto MX](https://www.mineriacryptomx.com/) remain leads requiring a separate product-level validation pass before import.

## Comparing vendor offers

The initial reviewed map covers **96 existing and new offers in 36 model/configuration groups**. Matching listings appear together with vendor, supplier market, reference price and check date. Offers sort from lowest to highest **within each currency**. Currency headings make the boundaries explicit; no exchange rate is implied. A UK storefront returned EUR prices, so those prices remain EUR. Mexico listings preserve MXN.

Only explicit comparison labels merge listings. Similar titles alone do not merge products. Distinct memory, hash-rate, accessory-only and known condition configurations remain separate. Supplier-specific packaging, cords, warranty and delivery still require confirmation. Existing offer URLs are preserved, including matches across collections, and each vendor row opens that offer's Mercado detail page. Referral attribution and quantity-based quote requests continue through Mercado.

Authorized product managers can edit **Comparison group** in Products, pricing & photos, or import the optional `model_group` CSV column. Use the same precise label only for reviewed matching hardware and configurations. Leave it blank when equivalence is uncertain. The maintenance script fills empty groups and preserves subsequent administrator labels. Regional and currency fields now accept Mexico and MXN across catalog, CSV, dealer-offer and proposal flows.

## Operating recommendation

Prioritize commercial qualification of Microbot for Mexico, the two US enterprise suppliers for Nevada-led server requests, and Bitronics/21energy for Portugal-led mining requests. Confirm resale terms, invoice issuer, dispatch country, order minimums, warranty handling and live stock before promising delivery. These are proposed procurement priorities inferred from the documented business locations and product fit, not established partnerships.

Use supplier prices to initiate a Mercado quote, then calculate the actual delivered offer for the customer's quantity and destination. Nevada and Portugal can coordinate sourcing without representing that these goods are already in either hub. Cross-currency comparisons, tax treatment and delivery costs must be resolved in the quote. Automated checkout, payments, payouts and delivery are not enabled by this expansion.

## Audit files

- [541 product and supplier references](SOURCING-ROUND4-PRODUCTS.md)
- [Import snapshot](data/sourcing-round4.json)
- [Product-page evidence](data/research/sourcing-round4-evidence.json)
- [Supplier registry](data/research/sourcing-round4-vendors.json)
- [Feed manifest](data/research/sourcing-round4-feed-manifest.json)
- [Scope exclusions](data/research/sourcing-round4-review-exclusions.json)
- [Enterprise exclusions](data/research/sourcing-round4-enterprise-exclusions.json)
- [Final deferred candidates](data/research/sourcing-round4-deferred.json)
- [Reviewed comparison assignments](data/comparison-groups.json)

Validation covers catalog constraints, model-group behavior, currency sorting, source evidence, image hashes and rendering all 1,548 offer pages. Desktop and mobile browser checks exercise regional filtering, vendor links, referrals, quantity input and responsive layout. Publication requires the deployed image assets to pass verification before catalog insertion.
