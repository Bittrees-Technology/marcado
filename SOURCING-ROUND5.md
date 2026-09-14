# Additional regional suppliers and product offerings

This pass qualifies **178 additional supplier offerings from four new vendors**, bringing the catalog from 1,548 to **1,726 offerings** after import. It continues the US, Mexico and Western Europe scope and retains the existing mining, AI, compute, server and supporting-component categories. Counts represent supplier offerings, not unique hardware models.

## Qualified suppliers

| Supplier | Documented location | Added offers | Product emphasis |
|---|---|---:|---|
| [PiShop.us](https://www.pishop.us/contact-us/) | New Castle, Delaware, US | 66 | Raspberry Pi hardware, PoE, storage adapters and PiKVM |
| [330ohms](https://www.330ohms.com/contacto) | Coyoacán, Mexico City | 36 | Raspberry Pi boards, AI accelerators, displays and components |
| [BerryBase](https://www.berrybase.de/en/footer/information/imprint/) | Germany: Berlin branch and Hamburg head office | 55 | Compute hardware, AI accessories, storage expansion and cooling |
| [The Solo Mining Co’](https://www.thesolomining.co/) | UK; trading name of CFLT Limited | 21 | Home miners, a Bitcoin node and mining accessories |

PiShop publishes a Delaware warehouse address and explicitly welcomes volume quote requests on its [company page](https://www.pishop.us/about/). 330ohms offers a business quotation contact route and states that its Mexico City location handles collection of online purchases rather than walk-in sales. BerryBase's current imprint identifies BerryBase GmbH; older translated pages naming a different operating entity were not used for qualification. The Solo Mining Co' identifies its UK company number on its official site.

These facts support supplier-market classification. They do not establish manufacturing origin, dispatch location for every item, inventory at Mercado's Nevada or Portugal hubs, or a reseller agreement. Public business contact routes are recorded; no supplier was contacted or enrolled.

## Products and evidence

The additions comprise **143 components, 13 mining accessories, nine AI-compute offers, six server/node/remote-management offers, five ASIC miners and two Bitaxe miners**. Every offering has a direct supplier product page, a positive price with its original currency, a dated check, a supplier photo and a retained source fingerprint.

Discovery used public supplier catalogs, product sitemaps and a public WooCommerce store feed. Product pages were checked individually. The 157 non-UK additions have fixed-price, in-stock or limited-availability structured page offers. The 21 UK additions are simple products whose feed prices matched the visible product-page prices and whose feed stock flag was available. Variable-price products without an exact selected configuration were excluded. These are supplier statements at the time of checking; imported Mercado stock remains unknown and requires confirmation.

Reference prices are preserved as USD, MXN, EUR or GBP. BerryBase storefront prices include VAT; the quote must determine applicable destination taxes, duties and delivery. No currency conversion is implied. The lowest displayed supplier reference is not a promise of the lowest delivered cost.

## Configuration review

All seven miners have qualified hash rates: Avalon Mini 3 up to 37.5 TH/s; NerdQAxe++ Rev 6.1.2PM approximately 6.1 TH/s; BitForge Nano approximately 2.6 TH/s; Avalon Nano 3S up to 6 TH/s; two Gamma 602 configurations around 1.2 TH/s; and Mein Coffee up to approximately 650 GH/s under favorable cooling. The coffee warmer adjusts performance to its temperature target, so its maximum is not presented as a fixed operating rate. Each product's source link and relevant qualification are retained in the catalog and [evidence file](data/research/sourcing-round5-evidence.json).

The inexpensive industrial panel listing is explicitly a display and enclosure with **no Raspberry Pi board**. Other accessory kits with insufficient included-compute detail were deferred. A generic Compute Module 5 page was resolved to the page's CM5002000 SKU: 2 GB RAM, Lite storage and no wireless. The Rebel Node lists a ThinkCentre with Core i5, 16 GB RAM and 2 TB SSD; its note requires confirmation of exact CPU generation, condition and warranty.

Duplicate supplier aliases were removed, including two URLs for the same CM5 development kit. Redundant cosmetic enclosure variants, consumer desktop computers, robotics kits, rentals, rental credit, merchandise and unconfirmed B-grade condition were excluded. A failed structured-data extraction on the UK pages was resolved by checking their visible product prices against the public feed; those successful rows are not retained as unresolved exclusions.

## Vendor comparison groups

Thirty new offers receive reviewed model/configuration labels. Two existing offers receive labels for their already documented 4 GB and 16 GB Raspberry Pi 5 configurations. This produces **128 labeled offers across 42 comparison groups**. Existing labeled offers remain intact.

The shared groups cover precise RAM capacities, 13 versus 26 TOPS accelerator variants, display sizes, official cooling, RTC batteries and selected enclosure configurations. A 6.1 TH/s NerdQAxe++ is not merged with a 4.8 TH/s revision, and an accessory is not grouped with an assembled system. Different power-plug, packaging or warranty details still need review in the supplier-specific quote.

Customer pages continue to stack vendor and reference price from lowest to highest within each currency. Offers beyond the first four can be expanded. Selecting a vendor retains its Mercado detail page, referral attribution and quantity-based quote request. Authorized product managers can maintain labels through the existing Comparison group field or CSV import.

## Deferred leads and commercial next steps

Bargain Hardware remains an enterprise-sourcing lead, but this pass received an access-limited product response and did not import an unverified offer. Nerdminer Store exposed a public product feed, but its accessible contact information did not establish a sufficiently specific Western European business location for this pass. Bitsaga's current [site](https://bitsaga.be/) emphasizes custody services and signing devices; it did not provide a qualified mining-hardware addition. These are research limitations rather than judgments about supplier reliability.

The strongest immediate procurement routes are PiShop's published volume quotation channel, 330ohms' business quotation form and BerryBase's business/support channels. Commercial qualification should establish resale terms, live stock, dispatch origin, minimum order quantities and warranty handling before Mercado promises delivery. The UK additions broaden home mining choices, but purchase and resale arrangements remain to be agreed.

## Audit and validation

- [Complete product and source index](SOURCING-ROUND5-PRODUCTS.md)
- [Reviewed import snapshot](data/sourcing-round5.json)
- [Page and price evidence](data/research/sourcing-round5-evidence.json)
- [Supplier qualification registry](data/research/sourcing-round5-vendors.json)
- [Discovery fingerprints](data/research/sourcing-round5-feed-manifest.json)
- [Excluded or deferred candidates](data/research/sourcing-round5-exclusions.json)
- [Comparison assignments](data/comparison-groups.json)

Validation checks identifiers, source uniqueness, category/currency constraints, evidence prices, miner rates and image hashes. All offer pages are rendered, and browser checks exercise longer comparison stacks and the quote quantity control. Assets are deployed and checked before database insertion. Existing catalog fields are preserved except the two reviewed comparison labels; direct checkout and delivery remain disabled.
