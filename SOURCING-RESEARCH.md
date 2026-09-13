# Marcado hardware sourcing review

**Research date: 13 September 2026. Scope: the six Marcado equipment verticals, with US and EU sourcing preferred.**

## Recommendation

Expand the catalog from 20 to 128 supplier listings, adding 108 products. The expansion contains 63 US-market listings, 43 EU-market listings and two complete AI systems whose dispatch market remains unverified. All 108 new listings had a positive public price, an original supplier product photograph and an affirmative stock indication at review. These are reference listings for quote requests, not Marcado warehouse inventory or confirmed reseller agreements.

A catalog near the lower end of the requested 100–200 range is appropriate. Extending the selection to 200 at this stage would disproportionately add networking variants, minor accessories or uncertain stock. The selected range covers home mining, maintenance, local AI development, self-hosted services, network infrastructure and supporting electronics. It does not yet constitute a comprehensive enterprise server or GPU distribution business.

The structured decision register contains 304 candidate records. Its coverage includes two public mining catalogs, a reviewed page of a Canadian mining catalog, selected products from the Ubiquiti EU and Adafruit catalogs, and five complete-system candidates. It is a bounded sourcing review, not an exhaustive inventory of every supplier or SKU. The catalog appendix below links every new listing to its primary product source. The companion [decision register](data/sourcing-decisions.json) records selected, deferred and excluded candidates; [catalog data](data/sourcing-expansion.json) preserves prices, currencies, source images and compatibility notes.

| Vertical | Total listings after expansion |
|---|---:|
| Bitaxe miners | 12 |
| ASIC / other miners | 10 |
| Mining essentials | 39 |
| AI compute | 6 |
| Servers & networking | 39 |
| Electronic components | 22 |
| **Total** | **128** |

## Commercial interpretation

The strongest immediate fit is a quote-led storefront. A visitor can identify a product, inspect its reference price and supplier market, then request a quote for a specific quantity and destination. Marcado can subsequently confirm the actual purchasing route, lead time and negotiated terms. This supports the existing referral workflow while leaving room for direct sales later.

A listed supplier price does not establish a dealer margin. Retail prices are useful for discovery and budget discussions, but resale economics depend on negotiated discounts, inbound transport, handling, outbound delivery, returns and payment costs. No commission, exclusive territory, dropshipping service or wholesale account was inferred from a public product page. Private referral terms can be added later through the existing administrative workflow without replacing the underlying product record.

Nevada and Portugal are useful operating anchors supplied by the business. This review does not claim that any listed unit is held in either hub. The supplier-region filter describes a supplier or storefront market. Ubiquiti EU prices, for example, belong to the European storefront; that does not independently identify the warehouse dispatching a particular order. The two Seeed systems remain explicitly unverified by region because public product availability alone does not establish a US or EU fulfillment route.

For the next commercial step, prioritize a small group of products with clear demand and negotiate their actual fulfillment terms. A large public catalog can coexist with a much smaller stocked range. Small miners, replacement cooling parts and commonly used networking equipment are plausible first stocked candidates; expensive systems should remain individually quoted until demand and support responsibilities are understood. This is an operating recommendation, not a measured demand forecast.

## Mining: product families and boundaries

### Bitaxe miners

The new Bitaxe selection adds Naja Duo, Gamma Hex, Touch, Gamma Duo, GT Gamma Turbo and Supra configurations from Solo Satoshi. These are distinct model families or hardware designs rather than extra color listings. The existing Gamma and EU SuperSink listings remain available, so the expansion avoids adding every supplier-specific cooling edition simply to increase the count. The source catalog offers the relevant model pages and current prices. [Solo Satoshi miners](https://www.solosatoshi.com/product-category/bitcoin-miners/solo-miners/).

Buyers should be able to distinguish a single-board miner from a complete package. Some supplier products use a base price that changes with accessories or configuration. Such records carry a “From-price” note rather than implying that every photographed accessory is included. Photos show the supplier configuration, but the quote must identify the exact power supply, stand and cooling components included.

Mining performance should not be marketed as a promise of income. The public catalog deliberately avoids supplier lottery language, electricity-cost assumptions and projected returns. Hashrate, tuning and cooling claims need to be tied to a particular revision and configuration if Marcado later adds structured performance filters. A generic “Bitaxe compatible” label is not sufficient to establish electrical or mechanical compatibility.

### Other ASIC and crypto mining equipment

The expansion includes NerdQaxe++, Nerdaxe Gamma, BitForge Nano, Avalon Q, GekkoScience USB/pod products and the FutureBit Moonlander 2. These sit under the ASIC vertical rather than being mislabeled as Bitaxe boards. The category also retains the existing Avalon desktop and heater listings. The selected German supplier pages provide a European path for several USB and specialist miners. [bitshopper catalog](https://www.bitshopper.de/wp-json/wc/store/v1/products?per_page=100).

Moonlander 2 is specifically a Scrypt product. It must not be presented as a Bitcoin SHA-256 miner. USB miners may require a separate host, powered hub and software; the quote should include that dependency rather than treating a USB stick as a complete standalone appliance. The supplier material for some older models contains inconsistent performance units, so the catalog does not repeat those questionable figures.

Large industrial mining fleets remain a gap. The Canadian catalog contained relevant equipment, but the first reviewed page was dominated by ducting configurations and proposed AI/build products. Expanding that list indiscriminately would not improve the US/EU sourcing objective. Rack-scale or high-power ASIC procurement should receive a separate, model-specific pass covering condition, power infrastructure, noise, service and delivery before being offered as a routine stock item. [D-Central reviewed catalog page](https://d-central.tech/wp-json/wc/store/v1/products?per_page=100).

### Mining essentials

Power supplies, fan splitters, thermal compounds, heatsinks, replacement displays, stands and power cables account for 35 additions. This is a meaningful part of the assortment: existing hardware owners need maintenance and replacement parts, and new miners need compatible supporting equipment. Different voltages and connector types represent real functional differences; decorative variants do not.

The catalog explicitly separates 5V supplies from 12V and 12.4V supplies. Mean Well LRS products and an AC pigtail are installation components, not plug-and-play consumer accessories. Their descriptions call out the need for an appropriate enclosure and qualified mains installation. A replacement BM1370PA chip is described as a board-level repair component requiring specialist soldering, not a miner that can run independently. These distinctions are part of product fit and reduce misleading quote requests. [Solo Satoshi power supplies and components](https://www.solosatoshi.com/wp-json/wc/store/v1/products?per_page=100).

## AI compute: useful development hardware, bounded system coverage

The AI additions include the Raspberry Pi AI Camera, BrainCraft HAT and two Seeed reComputer systems. The existing AI HAT+ 2 and AI Kit remain in the catalog. This creates a compact range covering camera-side inference, audio/display prototyping, accelerator add-ons and complete Jetson computers.

BrainCraft is an interface and prototyping board, not a dedicated neural accelerator. The camera uses an IMX500 sensor with inference capability, while the HAT products depend on a compatible host. Buyers should be asked about their model, framework, memory needs and input/output requirements before a quote recommends one platform over another. TOPS figures should not be compared across products without considering precision and workload. [Adafruit AI Camera](https://www.adafruit.com/product/6009), [BrainCraft HAT](https://www.adafruit.com/product/4374), [Raspberry Pi AI HAT product information](https://www.raspberrypi.com/products/ai-hat/).

The reComputer J3011 provides a complete Orin Nano 8GB platform with storage. The Industrial J3011 is a different system design, including a fanless enclosure and industrial interfaces, so keeping both is justified. The direct pages showed USD 699 and USD 899.99 respectively during review. Search-index content for the industrial model showed a different price; the catalog uses the live page's price metadata and matching rendered price. The warehouse, power adapter and software configuration still require confirmation for a destination-specific quote. [reComputer J3011](https://www.seeedstudio.com/reComputer-J3011-p-5590.html), [Industrial J3011](https://www.seeedstudio.com/reComputer-Industrial-J3011-p-5682.html).

Two SparkFun Jetson kits remain on the watchlist because the pages displayed both stock and backorder language. The product pages expose USD 399 for the Orin Nano Super kit and USD 3,499 for the AGX Orin 64GB kit, but this does not resolve immediate availability. The NVIDIA DGX Spark marketplace was also reviewed as a lead; its direct page was inaccessible to the verification request, so it was not converted into a new catalog listing. None of these deferrals implies a product-quality judgment. [SparkFun Orin Nano](https://www.sparkfun.com/nvidia-jetson-orin-nano-developer-kit.html), [SparkFun AGX Orin](https://www.sparkfun.com/nvidia-jetson-agx-orin-64gb-developer-kit.html), [NVIDIA DGX Spark](https://www.nvidia.com/en-us/products/workstations/dgx-spark/).

The next AI sourcing priority should be regional distribution for complete systems and supported accelerators, not a proliferation of loosely related electronics. Enterprise GPUs, rack servers and configurable workstations need exact memory, storage, warranty and delivery configurations before a meaningful public price can be attached. This review leaves those gaps visible rather than representing the small development-board range as a full enterprise offering.

## Servers, networking and supporting electronics

The server/networking additions include a Start9 home server, Raspberry Pi 5 boards, Ubiquiti gateways, switches, aggregation equipment and a four-bay network-storage enclosure. They support self-hosting and the infrastructure around mining and AI equipment. Most new networking listings use the EU storefront, substantially strengthening the European side of the assortment. [Start9 Server One supplier listing](https://www.solosatoshi.com/product/start9-server-one-2026-home-server-with-startos/), [Ubiquiti EU switching](https://eu.store.ui.com/eu/en/category/all-switching).

Port speed, uplink capacity, PoE budget and management requirements are substantive reasons to retain multiple switches. The shortlist excludes a product explicitly labeled “Vintage,” an unavailable Pro 24 configuration and an unavailable UNAS 2 variant. It also avoids adding both US and EU versions of every new switch merely to multiply listings. When dual-region offers become commercially useful, multiple dealer offers beneath one model will be clearer than an indefinitely growing list of regional duplicates.

Ubiquiti EU prices are explicitly marked as excluding VAT. They should not be compared directly against tax-inclusive European listings or USD prices without resolving the final destination treatment. Marcado's currency filter and currency-specific price sorting support that distinction. No converted “global price” was invented during this research.

The electronic-components additions focus on storage adapters, cases, cooling, power and connectivity for Raspberry Pi systems. They exclude unrelated craft products, merchandise, free print files and obsolete compute-module variants. These products are useful as a supporting assortment, but many are not complete computers and must be described accordingly. [Adafruit Raspberry Pi catalog](https://www.adafruit.com/category/105).

Compatibility notes identify several common traps. The PoE+ HAT selected here supports Pi 3 B+ and Pi 4, not Pi 5. A Compute Module IO board does not include the compute module. The compact M.2 HAT has a narrower device-size requirement than the standard adapter. A 100Mb Ethernet power splitter is not a Gigabit or full-power Pi 5 solution. These facts are preserved on the individual product pages instead of burying them in a general disclaimer. [PoE+ HAT](https://www.adafruit.com/product/5058), [CM4 IO board](https://www.adafruit.com/product/4787), [Compact M.2 HAT](https://www.adafruit.com/product/6427), [PoE splitter](https://www.adafruit.com/product/4552).

## Filters and catalog maintenance

The existing filters already address the most dependable fields in this review: supplier market, supplier, currency, availability, search and price within a chosen currency. They are suitable for the expanded catalog. Adding filters with incompletely populated technical values would hide relevant products and give buyers false confidence in comparisons.

The next useful structured fields are mining algorithm and host requirement; input/output voltage and connector for power parts; network port speed and PoE budget; and AI memory, accelerator family and host dependency. They should be introduced one vertical at a time, with an explicit “not specified” state and source-backed values. A single global “performance” filter would not meaningfully compare miners, switches and AI boards.

Public source status is a dated observation, not a live supplier integration. Before issuing any binding quote, recheck the selected configuration, quantity, price and stock. Administrative image and referral edits remain available. Bulk research imports use non-overwriting inserts, so later operator changes will not be silently replaced by re-running the import.

Source photographs are attributed and linked to their supplier origin. This review confirms their association with the product pages, not a negotiated image-use license. If a dealer supplies authorized assets or requests changes, the existing image editor can replace them. The original top-level category illustrations remain separate from the real product photographs.

## Sources and product-level evidence

All prices below are dated **13 September 2026**, in the supplier currency, and are reference prices. A “from” note on the corresponding product page means options can change the price. All new records were marked in stock by the supplier during review; this does not establish available quantity, an approved resale arrangement or a promised shipping date. Existing listings were preserved and may have older check dates or out-of-stock status.

The linked title in each row is the primary product source and identifies its publisher in the Supplier column. Product pages generally provide no publication date; the date above is the observation date. The JSON companion retains the exact image source, configuration note, tax note and regional qualification for each record.


### bitaxe — 6 additions

| Product / source | Supplier | Market | Reference price |
|---|---|---|---|
| [Bitaxe GT Gamma Turbo Bitcoin Solo Miner (801 Model)](https://www.solosatoshi.com/product/bitaxe-gt-gamma-turbo/) | Solo Satoshi | US | From USD 173.99 |
| [Bitaxe Gamma Duo Bitcoin Solo Miner (650 Model)](https://www.solosatoshi.com/product/bitaxe-duo-bitcoin-solo-miner-650-model/) | Solo Satoshi | US | From USD 104.29 |
| [Bitaxe Gamma Hex Bitcoin Solo Miner (1300 Model)](https://www.solosatoshi.com/product/bitaxe-gamma-hex/) | Solo Satoshi | US | From USD 396.99 |
| [Bitaxe Naja Duo Bitcoin Solo Miner (Model 1201)](https://www.solosatoshi.com/product/bitaxe-naja-duo/) | Solo Satoshi | US | From USD 389.99 |
| [Bitaxe Supra Bitcoin Solo Miner](https://www.solosatoshi.com/product/bitaxe-supra/) | Solo Satoshi | US | USD 69.69 |
| [Bitaxe Touch Bitcoin Solo Miner (Turbo Touch Edition)](https://www.solosatoshi.com/product/bitaxe-touch/) | Solo Satoshi | US | USD 250.00 |

### asic — 8 additions

| Product / source | Supplier | Market | Reference price |
|---|---|---|---|
| [BitForge Nano Bitcoin Solo Miner (Ghost Edition)](https://www.solosatoshi.com/product/bitforge-nano-ghost-edition/) | Solo Satoshi | US | USD 349.99 |
| [Canaan Avalon Q Bitcoin Home Miner](https://www.solosatoshi.com/product/canaan-avalon-q-90th-bitcoin-home-miner/) | Solo Satoshi | US | USD 1888.00 |
| [FutureBit Moonlander 2 Scrypt USB miner](https://www.bitshopper.de/shop/futurebit/moonlander2/) | bitshopper | EU | EUR 59.95 |
| [GekkoScience Compac A2 USB miner](https://www.bitshopper.de/shop/gekkoscience/compac-a2/) | bitshopper | EU | EUR 99.95 |
| [GekkoScience MeinCoffee mining cup warmer](https://www.bitshopper.de/shop/gekkoscience/gekkoscience-meincoffee/) | bitshopper | EU | EUR 349.00 |
| [GekkoScience Terminus R909 USB pod miner](https://www.bitshopper.de/shop/gekkoscience/r909/) | bitshopper | EU | EUR 99.00 |
| [NerdQaxe++ Bitcoin Solo Miner (Revision 7)](https://www.solosatoshi.com/product/nerdqaxe-plus-plus/) | Solo Satoshi | US | From USD 189.99 |
| [Nerdaxe Gamma Bitcoin Solo Miner (Revision 2.3 Model)](https://www.solosatoshi.com/product/nerdaxe-gamma-bitcoin-solo-miner/) | Solo Satoshi | US | From USD 139.00 |

### mining-accessories — 35 additions

| Product / source | Supplier | Market | Reference price |
|---|---|---|---|
| [12.4V 10A 124W Switching Power Supply with XT30 Connector](https://www.solosatoshi.com/product/12-4v-10a-124w-switching-power-supply-with-xt30-connector/) | Solo Satoshi | US | USD 24.99 |
| [12V 10A 120W Switching Power Supply With 5.5×2.1 Jack](https://www.solosatoshi.com/product/12v-10a-120w-switching-power-supply-with-5-5x2-1-jack/) | Solo Satoshi | US | USD 24.99 |
| [150W power supply with 6-pin PCIe connector](https://www.bitshopper.de/shop/zubehoer/netzteil-150w/) | bitshopper | EU | EUR 74.95 |
| [24-pin ATX power supply switch](https://www.bitshopper.de/shop/zubehoer/atx-netzteil-schalter/) | bitshopper | EU | EUR 3.95 |
| [4-Pin PWM Fan Splitter Cable 10.5 Inch 1-to-2 Converter](https://www.solosatoshi.com/product/4-pin-pwm-fan-splitter-cable/) | Solo Satoshi | US | USD 5.99 |
| [5.5 x 2.1mm 90 Degree Barrel Jack Male Pigtail 1 Meter 16 AWG](https://www.solosatoshi.com/product/5-5-x-2-1mm-90-degree-barrel-jack-male-pigtail-1-meter-16-awg/) | Solo Satoshi | US | USD 4.99 |
| [52Pi Copper MOSFET Heatsink Kit for Bitaxe and Nerdaxe](https://www.solosatoshi.com/product/52pi-copper-mosfet-heatsink-kit-for-bitaxe-and-nerdaxe/) | Solo Satoshi | US | USD 11.09 |
| [6-pin PCIe power cable · 60cm](https://www.bitshopper.de/shop/zubehoer/pcie-6pin-anschlusskabel/) | bitshopper | EU | EUR 3.95 |
| [Avalon Q Riser Stand](https://www.solosatoshi.com/product/avalon-q-riser-stand/) | Solo Satoshi | US | USD 9.99 |
| [Bitaxe 2.42-inch OLED display upgrade kit](https://www.bitshopper.de/shop/bitaxe/big-display-umruestkit/) | bitshopper | EU | EUR 49.95 |
| [Bitaxe 30W 5V 6A Power Supply](https://www.solosatoshi.com/product/bitaxe-power-supply-5v-6a-30w/) | Solo Satoshi | US | USD 9.99 |
| [Bitaxe Fan adapter](https://www.solosatoshi.com/product/bitaxe-fan-adapter/) | Solo Satoshi | US | USD 1.00 |
| [Bitaxe Heatsink Upgrade](https://www.solosatoshi.com/product/bitaxe-heatsink-upgrade/) | Solo Satoshi | US | From USD 6.99 |
| [Bitaxe LonelyFan dual fan adapter](https://www.bitshopper.de/shop/bitaxe/thesolomining-co-bitaxe-lonelyfan/) | bitshopper | EU | EUR 5.99 |
| [Bitaxe Replacement OLED Screen](https://www.solosatoshi.com/product/bitaxe-replacement-oled-screen/) | Solo Satoshi | US | USD 4.99 |
| [Bitaxe SuperSink copper cooling upgrade kit](https://www.bitshopper.de/shop/bitaxe/umruestkit-supersink/) | bitshopper | EU | EUR 69.95 |
| [Bitmain BM1370BC ASIC Chip](https://www.solosatoshi.com/product/bitmain-bm1370pa-asic-chip/) | Solo Satoshi | US | USD 29.99 |
| [Black 3D Printed NerdQaxe++ Display Stand](https://www.solosatoshi.com/product/black-3d-printed-nerdqaxe-display-stand/) | Solo Satoshi | US | USD 11.99 |
| [El Mirage Heatsink for Bitaxe and Nerdaxe](https://www.solosatoshi.com/product/el-mirage-heatsink-for-bitaxe-and-nerdaxe/) | Solo Satoshi | US | From USD 8.99 |
| [LilyGo T-Display S3 (H577) Bitcoin Solo Miner Replacement Screen](https://www.solosatoshi.com/product/lilygo-t-display-s3-h577-replacement-screen/) | Solo Satoshi | US | USD 19.99 |
| [Mean Well LRS-350-12 348W 12V 29A Switching Power Supply](https://www.solosatoshi.com/product/mean-well-lrs-350-12-348w-12v-29a-switching-power-supply/) | Solo Satoshi | US | USD 33.99 |
| [Mean Well LRS-350-5 300W 5V 60A Switching Power Supply](https://www.solosatoshi.com/product/mean-well-lrs-350-5-300w-5v-60a-switching-power-supply/) | Solo Satoshi | US | USD 38.99 |
| [Mean Well LRS-50-5 50W 5V 10A Switching Power Supply](https://www.solosatoshi.com/product/mean-well-lrs-50-5/) | Solo Satoshi | US | USD 14.99 |
| [Mean Well LRS-600-12 600W 12V 50A Switching Power Supply](https://www.solosatoshi.com/product/mean-well-lrs-600-12-600w-12v-50a-switching-power-supply/) | Solo Satoshi | US | USD 59.90 |
| [Noctua NF-A8 PWM, Premium Quiet Fan, 4-Pin (80mm, Brown)](https://www.solosatoshi.com/product/noctua-nf-a8-pwm-premium-quiet-fan-4-pin-80mm-brown/) | Solo Satoshi | US | USD 19.99 |
| [OEM Bitaxe 40mm Replacement Fan](https://www.solosatoshi.com/product/bitaxe-replacement-fan/) | Solo Satoshi | US | USD 4.99 |
| [PWM Fan Hub 1-to-5 Splitter Cable 16 Inch](https://www.solosatoshi.com/product/pwm-fan-hub-1-to-5-splitter-cable/) | Solo Satoshi | US | USD 8.99 |
| [Satoshi Stacker – Stackable Bitaxe Stand](https://www.solosatoshi.com/product/stackable-bitaxe-stand/) | Solo Satoshi | US | USD 9.99 |
| [Thermal Grizzly Kryonaut Extreme Thermal Paste 2g](https://www.solosatoshi.com/product/thermal-grizzly-kryonaut-extreme-thermal-paste-2g/) | Solo Satoshi | US | USD 21.99 |
| [Thermal Grizzly Kryonaut thermal paste · 1g](https://www.bitshopper.de/shop/bitaxe/thermal-grizzly-kryonaut/) | bitshopper | EU | EUR 8.90 |
| [Thermalright AXP90-X47 Full Copper Heatsink + 92mm PWM Fan](https://www.solosatoshi.com/product/thermalright-axp90-x47-full-copper-heatsink-fan/) | Solo Satoshi | US | USD 55.99 |
| [Thermalright TF7 Thermal Paste 2g](https://www.solosatoshi.com/product/thermalright-tf7-thermal-paste-2g/) | Solo Satoshi | US | USD 3.99 |
| [Thermalright TL-9015B 92mm Slim PWM Fan](https://www.solosatoshi.com/product/thermalright-tl-9015b-92mm-slim-pwm-fan/) | Solo Satoshi | US | USD 11.99 |
| [US 3 Prong AC Plug Pigtail 1 Meter 14 AWG](https://www.solosatoshi.com/product/us-3-prong-ac-plug-pigtail-1-meter-14-awg/) | Solo Satoshi | US | USD 3.99 |
| [XT30 Female Pigtail 1 Meter 16 AWG](https://www.solosatoshi.com/product/xt30-female-pigtail-1-meter-16-awg/) | Solo Satoshi | US | USD 4.99 |

### ai-compute — 4 additions

| Product / source | Supplier | Market | Reference price |
|---|---|---|---|
| [Adafruit BrainCraft HAT - Machine Learning for Raspberry Pi 4](https://www.adafruit.com/product/4374) | Adafruit | US | USD 44.95 |
| [Raspberry Pi AI Camera with Sony IMX500](https://www.adafruit.com/product/6009) | Adafruit | US | USD 77.00 |
| [reComputer Industrial J3011 · Orin Nano 8GB](https://www.seeedstudio.com/reComputer-Industrial-J3011-p-5682.html) | Seeed Studio | Unverified | USD 899.99 |
| [reComputer J3011 · Orin Nano 8GB](https://www.seeedstudio.com/reComputer-J3011-p-5590.html) | Seeed Studio | Unverified | USD 699.00 |

### servers — 35 additions

| Product / source | Supplier | Market | Reference price |
|---|---|---|---|
| [Cloud Gateway Fiber](https://eu.store.ui.com/eu/en/products/ucg-fiber) | Ubiquiti EU | EU | EUR 250.00 |
| [Cloud Gateway Max / EU Version](https://eu.store.ui.com/eu/en/products/ucg-max?variant=ucg-max-eu) | Ubiquiti EU | EU | EUR 250.00 |
| [Dream Machine Pro / EU Version](https://eu.store.ui.com/eu/en/products/udm-pro?variant=udm-pro-eu) | Ubiquiti EU | EU | EUR 340.00 |
| [Dream Machine Special Edition / EU Version](https://eu.store.ui.com/eu/en/products/udm-se?variant=udm-se-eu) | Ubiquiti EU | EU | EUR 449.00 |
| [Gateway Lite / EU Version](https://eu.store.ui.com/eu/en/products/uxg-lite?variant=uxg-lite-eu) | Ubiquiti EU | EU | EUR 80.00 |
| [Gateway Max](https://eu.store.ui.com/eu/en/products/uxg-max) | Ubiquiti EU | EU | EUR 179.00 |
| [Raspberry Pi 5 - 16 GB RAM](https://www.adafruit.com/product/6125) | Adafruit | US | USD 350.00 |
| [Raspberry Pi 5 - 8 GB RAM](https://www.adafruit.com/product/5813) | Adafruit | US | USD 200.00 |
| [Start9 Server One Home Server with StartOS (2026 Model)](https://www.solosatoshi.com/product/start9-server-one-2026-home-server-with-startos/) | Solo Satoshi | US | From USD 899.00 |
| [Switch 16 PoE](https://eu.store.ui.com/eu/en/products/usw-16-poe) | Ubiquiti EU | EU | EUR 269.00 |
| [Switch 24](https://eu.store.ui.com/eu/en/products/usw-24) | Ubiquiti EU | EU | EUR 200.00 |
| [Switch 24 PoE](https://eu.store.ui.com/eu/en/products/usw-24-poe) | Ubiquiti EU | EU | EUR 340.00 |
| [Switch Aggregation / EU Version](https://eu.store.ui.com/eu/en/products/usw-aggregation?variant=usw-aggregation-eu) | Ubiquiti EU | EU | EUR 240.00 |
| [Switch Flex / Single Unit](https://eu.store.ui.com/eu/en/products/usw-flex?variant=usw-flex) | Ubiquiti EU | EU | EUR 89.00 |
| [Switch Flex 2.5G](https://eu.store.ui.com/eu/en/products/usw-flex-2-5g-8) | Ubiquiti EU | EU | EUR 145.00 |
| [Switch Flex 2.5G PoE](https://eu.store.ui.com/eu/en/products/usw-flex-2-5g-8-poe) | Ubiquiti EU | EU | EUR 179.00 |
| [Switch Flex Mini 2.5G / EU Version](https://eu.store.ui.com/eu/en/products/usw-flex-2-5g-5?variant=usw-flex-2dot5g-5-eu) | Ubiquiti EU | EU | EUR 45.00 |
| [Switch Flex XG / EU Version](https://eu.store.ui.com/eu/en/products/usw-flex-xg?variant=usw-flex-xg-eu) | Ubiquiti EU | EU | EUR 270.00 |
| [Switch Hi-Capacity Aggregation](https://eu.store.ui.com/eu/en/products/usw-pro-aggregation) | Ubiquiti EU | EU | EUR 809.00 |
| [Switch Lite 16 PoE / EU Version](https://eu.store.ui.com/eu/en/products/usw-lite-16-poe?variant=usw-lite-16-poe-eu) | Ubiquiti EU | EU | EUR 179.00 |
| [Switch Lite 8 PoE / EU Version](https://eu.store.ui.com/eu/en/products/usw-lite-8-poe?variant=usw-lite-8-poe-eu) | Ubiquiti EU | EU | EUR 99.00 |
| [Switch Pro 24 PoE / EU Version](https://eu.store.ui.com/eu/en/products/usw-pro-24-poe?variant=usw-pro-24-poe-eu) | Ubiquiti EU | EU | EUR 629.00 |
| [Switch Pro 8 PoE](https://eu.store.ui.com/eu/en/products/usw-pro-8-poe) | Ubiquiti EU | EU | EUR 269.00 |
| [Switch Pro HD 24 / EU Version](https://eu.store.ui.com/eu/en/products/usw-pro-hd-24?variant=usw-pro-hd-24-eu) | Ubiquiti EU | EU | EUR 539.00 |
| [Switch Pro HD 24 PoE / EU Version](https://eu.store.ui.com/eu/en/products/usw-pro-hd-24-poe?variant=usw-pro-hd-24-poe-eu) | Ubiquiti EU | EU | EUR 899.00 |
| [Switch Pro Max 16](https://eu.store.ui.com/eu/en/products/usw-pro-max-16) | Ubiquiti EU | EU | EUR 250.00 |
| [Switch Pro Max 16 PoE / EU Version](https://eu.store.ui.com/eu/en/products/usw-pro-max-16-poe?variant=usw-pro-max-16-poe-eu) | Ubiquiti EU | EU | EUR 359.00 |
| [Switch Pro Max 24 / EU Version](https://eu.store.ui.com/eu/en/products/usw-pro-max-24?variant=usw-pro-max-24-eu) | Ubiquiti EU | EU | EUR 405.00 |
| [Switch Pro Max 24 PoE / EU Version](https://eu.store.ui.com/eu/en/products/usw-pro-max-24-poe?variant=usw-pro-max-24-poe-eu) | Ubiquiti EU | EU | EUR 739.00 |
| [Switch Pro XG 10 PoE / EU Version](https://eu.store.ui.com/eu/en/products/usw-pro-xg-10-poe?variant=usw-pro-xg-10-poe-eu) | Ubiquiti EU | EU | EUR 629.00 |
| [Switch Pro XG 24 PoE / EU Version](https://eu.store.ui.com/eu/en/products/usw-pro-xg-24-poe?variant=usw-pro-xg-24-poe-eu) | Ubiquiti EU | EU | EUR 1619.00 |
| [Switch Pro XG 8 PoE / EU Version](https://eu.store.ui.com/eu/en/products/usw-pro-xg-8-poe?variant=usw-pro-xg-8-poe-eu) | Ubiquiti EU | EU | EUR 449.00 |
| [UNAS Pro 4](https://eu.store.ui.com/eu/en/products/unas-pro-4) | Ubiquiti EU | EU | EUR 449.00 |
| [UniFi WAN Switch](https://eu.store.ui.com/eu/en/products/usw-wan) | Ubiquiti EU | EU | EUR 225.00 |
| [UniFi WAN Switch RJ45](https://eu.store.ui.com/eu/en/products/usw-wan-rj45) | Ubiquiti EU | EU | EUR 225.00 |

### components — 20 additions

| Product / source | Supplier | Market | Reference price |
|---|---|---|---|
| [Adafruit FPC Breakout for Raspberry Pi 5 DSI or RP2350 HSTX](https://www.adafruit.com/product/6014) | Adafruit | US | USD 2.50 |
| [Aluminum Metal Heatsink Raspberry Pi 5 Case](https://www.adafruit.com/product/6307) | Adafruit | US | USD 12.50 |
| [Aluminum Metal Heatsink Raspberry Pi 5 Case with Fan](https://www.adafruit.com/product/6277) | Adafruit | US | USD 19.95 |
| [Flirc Aluminum Case for Raspberry Pi 5](https://www.adafruit.com/product/5847) | Adafruit | US | USD 16.95 |
| [Official Raspberry Pi 27W PD Power Supply 5.1V 5A with USB C](https://www.adafruit.com/product/5814) | Adafruit | US | USD 14.04 |
| [Official Raspberry Pi 45W USB-C Power Supply](https://www.adafruit.com/product/6320) | Adafruit | US | USD 16.50 |
| [Official Raspberry Pi 5 Active Cooler](https://www.adafruit.com/product/5815) | Adafruit | US | USD 13.50 |
| [Official Raspberry Pi Foundation Raspberry Pi 5 Case + Fan](https://www.adafruit.com/product/5816) | Adafruit | US | USD 12.00 |
| [PCIe Flex Cable for NVMe Base and Raspberry Pi 5 – PCIe Pipe](https://www.adafruit.com/product/5931) | Adafruit | US | USD 1.95 |
| [Pimoroni NVMe Base Duo for Raspberry Pi 5](https://www.adafruit.com/product/5969) | Adafruit | US | USD 34.95 |
| [Pimoroni NVMe Base for Raspberry Pi 5](https://www.adafruit.com/product/5845) | Adafruit | US | USD 19.95 |
| [PoE Splitter with USB Type C - 5V 2A - 100 MB Ethernet](https://www.adafruit.com/product/4552) | Adafruit | US | USD 14.95 |
| [Raspberry Pi 5 FPC Camera Cable - 22-pin 0.5mm to 15-pin 1mm](https://www.adafruit.com/product/5818) | Adafruit | US | USD 2.70 |
| [Raspberry Pi 5 RTC Battery](https://www.adafruit.com/product/5817) | Adafruit | US | USD 5.00 |
| [Raspberry Pi Compute Module 4 Antenna Kit](https://www.adafruit.com/product/4793) | Adafruit | US | USD 6.25 |
| [Raspberry Pi Compute Module 4 IO Board](https://www.adafruit.com/product/4787) | Adafruit | US | USD 35.00 |
| [Raspberry Pi M.2 HAT+](https://www.adafruit.com/product/5902) | Adafruit | US | USD 17.40 |
| [Raspberry Pi M.2 HAT+ Compact](https://www.adafruit.com/product/6427) | Adafruit | US | USD 21.75 |
| [Raspberry Pi PoE+ HAT](https://www.adafruit.com/product/5058) | Adafruit | US | USD 29.00 |
| [USB 2.0 and Ethernet Hub - 3 USB Ports and 1 Ethernet](https://www.adafruit.com/product/2909) | Adafruit | US | USD 17.50 |
