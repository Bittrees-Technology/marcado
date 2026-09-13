# Mercado catalog expansion — 13 September 2026

300 additional supplier listings were selected from 712 reviewed candidate records, bringing the catalog to 428 listings. Listings represent purchasable configurations or regional supplier offers, not necessarily 428 unique hardware models. No existing listing is overwritten.

## Scope and selection

The search expanded within mining systems, miner repair and power parts, AI and edge compute, server/network infrastructure, and supporting electronics. Sources included [Ubiquiti switching](https://store.ui.com/us/en/category/all-switching), [Olimex open hardware](https://www.olimex.com/Products/OLinuXino/open-source-hardware), [Seeed edge computing](https://www.seeedstudio.com/solution/edge-computing/), Adafruit product pages and D-Central's public product catalog. Individual primary sources are linked below.

The review excluded unrelated merchandise, books, unavailable products, unpriced records, ambiguous configurations and unnecessary cosmetic variants. The 300 selected records have a positive supplier price, currency, dated stock reference, source URL and a downloaded supplier photograph. Exact source URLs and catalog IDs do not duplicate the previous catalog. Regional alternatives are retained where they provide a practical procurement choice; they should not be counted as different hardware models.

| Collection | Added | Total |
|---|---:|---:|
| ai-compute | 13 | 19 |
| asic | 19 | 29 |
| bitaxe | 2 | 14 |
| components | 92 | 114 |
| mining-accessories | 50 | 89 |
| servers | 124 | 163 |

## Supplier and regional coverage

| Supplier storefront | Added listings |
|---|---:|
| Adafruit | 80 |
| D-Central | 74 |
| Olimex | 29 |
| Seeed Studio | 17 |
| Ubiquiti EU | 56 |
| Ubiquiti US | 44 |

| Supplier region | Added listings |
|---|---:|
| CA | 74 |
| EU | 85 |
| US | 124 |
| Unverified | 17 |

US and EU storefront coverage supports sourcing discussions for the Nevada and Portugal hubs. A storefront region is not evidence of a particular dispatch warehouse, delivery route or local inventory. Canadian mining specialists provide additional repair and hardware options. Seeed dispatch origin remains explicitly unverified. EU-edition packaging alone does not establish EU fulfillment.

## Validation and commercial limits

Primary product pages were parsed for structured product, price and availability information. D-Central's public WooCommerce Store API provided product identity, price, stock and source images; linked product pages received a separate reachability check. Seeed prices were checked against rendered product-price metadata and Olimex against product microdata. Supplier images were downloaded, checked for supported image signatures and deduplicated by content hash. The catalog validator checks record identity, currencies, prices, URLs and required fields. Candidate decisions and timestamps are retained in [review evidence](data/sourcing-round2-review.json); the publication snapshot is [catalog data](data/sourcing-round2.json). All 300 primary product URLs returned HTTP 200 with HTML in the final [link check](data/sourcing-round2-link-checks.json).

The stock reference is the supplier's reported status at review time. It does not confirm enough units for a customer's requested quantity. Reference prices apply to the displayed configuration or package, may change, and do not include Mercado margins, negotiated terms or a confirmed delivered total. Ubiquiti US base prices may incur storefront surcharges. Taxes, shipping, regional radio/power requirements and compatibility require confirmation. Miner repair parts are distinguished from complete systems; Scrypt miners are not described as Bitcoin SHA-256 miners. Refurbishment, revision and condition require confirmation where relevant.

No reseller agreement, reserved stock, image license agreement or supplier fulfillment integration was established by this research. Supplier photographs retain attribution and source URLs; commercial image-use permissions should be confirmed with vendors as relationships are formalized.

## Customer purchase flow

Customers select a quantity on the product page and request a purchase quote from Mercado. The quantity carries into the quote form through sign-in, remains editable, and is stored with the request. The server enforces whole quantities from 1 to 10,000. Mercado confirms availability, destination, final price and delivery terms before a purchase. Direct checkout and payments remain disabled. Supplier links provide supporting references.

Collections initially render 24 listings, with an explicit Show more action and the existing currency-aware, regional and product filters. This keeps the expanded catalog practical to browse.

## Repeatable tooling

- `scripts/research-suppliers.mjs`: bounded, resumable collection of primary supplier metadata from an explicit job list.
- `scripts/prepare-catalog-photos.mjs`: source image retrieval, format validation and content deduplication.
- `scripts/import-reviewed-catalog.mjs`: explicit reviewed-snapshot import that preserves existing catalog rows.

These tools support operator review. They do not publish arbitrary supplier feeds automatically. Failed or rate-limited source checks are deferred instead of treated as verified stock. Recheck price, stock, quantity and delivery when preparing each customer quote.

## Product evidence

All prices below were checked on 2026-09-13 and are supplier references in their original currency. Each product name links directly to its primary supplier listing. The selected records all reported InStock at review; quantities were not verified.

| Product / primary source | Supplier | Region | Reference price |
|---|---|---|---:|
| [16mm 10MP Telephoto Lens for Raspberry Pi HQ Camera](https://www.adafruit.com/product/4562) | Adafruit | US | USD 77.50 |
| [2x20 pin IDC Box Header - Raspberry Pi A+/B+/Pi 2/Pi 3/Pi 4](https://www.adafruit.com/product/1993) | Adafruit | US | USD 0.75 |
| [40 Pin GPIO Extension Cable for any 2x20 Pin Raspberry Pi](https://www.adafruit.com/product/4823) | Adafruit | US | USD 2.95 |
| [5V 1.8A Isolated Output PoE Module - For Raspberry Pi 3 B+ or 4](https://www.adafruit.com/product/3848) | Adafruit | US | USD 15.95 |
| [5V 1A (1000mA) USB port power supply - UL Listed](https://www.adafruit.com/product/501) | Adafruit | US | USD 5.95 |
| [5V 2.5A Switching Power Supply with 20AWG MicroUSB Cable](https://www.adafruit.com/product/1995) | Adafruit | US | USD 8.25 |
| [6mm 3MP Wide Angle Lens for Raspberry Pi HQ Camera](https://www.adafruit.com/product/4563) | Adafruit | US | USD 49.30 |
| [Adafruit 128x64 OLED Bonnet for Raspberry Pi](https://www.adafruit.com/product/3531) | Adafruit | US | USD 22.50 |
| [Adafruit 2.23" Monochrome OLED Bonnet for Raspberry Pi](https://www.adafruit.com/product/4567) | Adafruit | US | USD 22.50 |
| [Adafruit CSI or DSI Cable Adapter Thingy for Raspberry Pi](https://www.adafruit.com/product/5785) | Adafruit | US | USD 2.50 |
| [Adafruit CSI or DSI Cable Extender Thingy for Raspberry Pi](https://www.adafruit.com/product/3671) | Adafruit | US | USD 2.95 |
| [Adafruit CYBERDECK Bonnet for Raspberry Pi 400 & 500](https://www.adafruit.com/product/4862) | Adafruit | US | USD 7.95 |
| [Adafruit CYBERDECK HAT for Raspberry Pi 400 & 500](https://www.adafruit.com/product/4863) | Adafruit | US | USD 8.95 |
| [Adafruit Feather RP2040](https://www.adafruit.com/product/4884) | Adafruit | US | USD 11.95 |
| [Adafruit Fruit Jam - Mini RP2350 Computer](https://www.adafruit.com/product/6200) | Adafruit | US | USD 39.95 |
| [Adafruit ItsyBitsy RP2040](https://www.adafruit.com/product/4888) | Adafruit | US | USD 9.95 |
| [Adafruit KB2040 - RP2040 Kee Boar Driver](https://www.adafruit.com/product/5302) | Adafruit | US | USD 8.95 |
| [Adafruit Metro RP2040](https://www.adafruit.com/product/5786) | Adafruit | US | USD 14.95 |
| [Adafruit Metro RP2350](https://www.adafruit.com/product/6003) | Adafruit | US | USD 24.95 |
| [Adafruit Perma-Proto 40-Pin Raspberry Pi Breadboard PCB Kit](https://www.adafruit.com/product/4354) | Adafruit | US | USD 7.95 |
| [Adafruit Pi Protector for Raspberry Pi Model Zero](https://www.adafruit.com/product/2883) | Adafruit | US | USD 4.95 |
| [Adafruit PiOLED - 128x32 Monochrome OLED Add-on for Raspberry Pi](https://www.adafruit.com/product/3527) | Adafruit | US | USD 14.95 |
| [Adafruit PiRTC - PCF8523 Real Time Clock for Raspberry Pi](https://www.adafruit.com/product/3386) | Adafruit | US | USD 7.50 |
| [Adafruit PiRTC - Precise DS3231 Real Time Clock for Raspberry Pi](https://www.adafruit.com/product/4282) | Adafruit | US | USD 14.95 |
| [Adafruit PiUART - USB Console and Power Add-on for Raspberry Pi](https://www.adafruit.com/product/3589) | Adafruit | US | USD 6.95 |
| [Adafruit QT Py RP2040](https://www.adafruit.com/product/4900) | Adafruit | US | USD 9.95 |
| [Adafruit Raspberry Pi Zero Case](https://www.adafruit.com/product/3252) | Adafruit | US | USD 4.75 |
| [Adafruit Trinkey QT2040 - RP2040 USB Key with Stemma QT](https://www.adafruit.com/product/5056) | Adafruit | US | USD 8.95 |
| [Aluminum Heat Sink for Raspberry Pi 3 - 14 x 14 x 8mm](https://www.adafruit.com/product/3083) | Adafruit | US | USD 1.50 |
| [Aluminum Heat Sink for Raspberry Pi 3 or 4 - 15 x 15 x 15mm](https://www.adafruit.com/product/3082) | Adafruit | US | USD 1.95 |
| [Aluminum Metal Heatsink Raspberry Pi 4 Case](https://www.adafruit.com/product/4341) | Adafruit | US | USD 24.95 |
| [Aluminum Metal Heatsink Raspberry Pi 4 Case with Dual Fans](https://www.adafruit.com/product/4340) | Adafruit | US | USD 24.95 |
| [Flirc Aluminum Case for Raspberry Pi Zero / Zero WH](https://www.adafruit.com/product/4822) | Adafruit | US | USD 13.50 |
| [HDMI Cable - 1 meter](https://www.adafruit.com/product/608) | Adafruit | US | USD 4.95 |
| [Maker Pi Pico Base - Raspberry Pi Pico Not Included](https://www.adafruit.com/product/5160) | Adafruit | US | USD 9.95 |
| [Mini Aluminum Heat Sink for Raspberry Pi - 13 x 13 x 3mm](https://www.adafruit.com/product/3084) | Adafruit | US | USD 0.95 |
| [Miniature 5V Cooling Fan for Raspberry Pi (and Other Computers)](https://www.adafruit.com/product/3368) | Adafruit | US | USD 3.50 |
| [Miniature 5V Cooling Fan with Molex PicoBlade Connector](https://www.adafruit.com/product/4468) | Adafruit | US | USD 2.95 |
| [Official Raspberry Pi 4 Case Fan and Heatsink](https://www.adafruit.com/product/4794) | Adafruit | US | USD 7.25 |
| [Official Raspberry Pi 5 Desktop Kit - Pi 5 Sold Separately](https://www.adafruit.com/product/5824) | Adafruit | US | USD 50.00 |
| [Official Raspberry Pi Foundation Raspberry Pi 4 Case - Red White](https://www.adafruit.com/product/4301) | Adafruit | US | USD 6.50 |
| [Official Raspberry Pi Micro HDMI to HDMI Cable](https://www.adafruit.com/product/4302) | Adafruit | US | USD 11.81 |
| [PCIe Flex Cable for NVMe Base and Raspberry Pi 5 – PCIe Pipe](https://www.adafruit.com/product/5930) | Adafruit | US | USD 1.95 |
| [Pimoroni Automation HAT for Raspberry Pi](https://www.adafruit.com/product/3289) | Adafruit | US | USD 29.95 |
| [Pimoroni Pico LiPo Power SHIM for Raspberry Pi Pico and Pico W](https://www.adafruit.com/product/5612) | Adafruit | US | USD 8.95 |
| [Pimoroni Pico Plus 2 W - RP2350 Dev Board with Pico Shape](https://www.adafruit.com/product/6243) | Adafruit | US | USD 22.50 |
| [Piunora Lite Carrier for Raspberry Pi 4 Module by Diodes Delight](https://www.adafruit.com/product/5403) | Adafruit | US | USD 39.95 |
| [Protective Silicone Bumper for Raspberry Pi 5](https://www.adafruit.com/product/6056) | Adafruit | US | USD 5.25 |
| [Raspberry Pi 3 - Model B - ARMv8 with 1G RAM](https://www.adafruit.com/product/3055) | Adafruit | US | USD 35.00 |
| [Raspberry Pi 3 - Model B+ - 1.4GHz Cortex-A53 with 1GB RAM](https://www.adafruit.com/product/3775) | Adafruit | US | USD 54.00 |
| [Raspberry Pi 4 Model B - 4 GB RAM](https://www.adafruit.com/product/4296) | Adafruit | US | USD 120.00 |
| [Raspberry Pi 4 Model B - 8 GB RAM](https://www.adafruit.com/product/4564) | Adafruit | US | USD 190.00 |
| [Raspberry Pi 400 Desktop - Computer Only](https://www.adafruit.com/product/4795) | Adafruit | US | USD 60.00 |
| [Raspberry Pi 400 Desktop - Full Computer Kit](https://www.adafruit.com/product/4796) | Adafruit | US | USD 80.00 |
| [Raspberry Pi 500 Desktop - Computer Only](https://www.adafruit.com/product/6111) | Adafruit | US | USD 216.00 |
| [Raspberry Pi 500 Desktop - Full Computer Kit](https://www.adafruit.com/product/6123) | Adafruit | US | USD 240.00 |
| [Raspberry Pi Camera Module 3 - 12MP 120 Degree Wide Angle Lens](https://www.adafruit.com/product/5658) | Adafruit | US | USD 38.50 |
| [Raspberry Pi Camera Module 3 NoIR - 12MP 75 Degree Infrared Lens](https://www.adafruit.com/product/5659) | Adafruit | US | USD 25.00 |
| [Raspberry Pi Camera Module 3 Standard](https://www.adafruit.com/product/5657) | Adafruit | US | USD 29.25 |
| [Raspberry Pi Camera Module 3 Wide NoIR - 12MP 120 Degree](https://www.adafruit.com/product/5660) | Adafruit | US | USD 38.50 |
| [Raspberry Pi Flash Drive 128GB USB 3.0](https://www.adafruit.com/product/6452) | Adafruit | US | USD 34.95 |
| [Raspberry Pi Flash Drive 256GB USB 3.0](https://www.adafruit.com/product/6453) | Adafruit | US | USD 63.25 |
| [Raspberry Pi High Quality HQ Camera](https://www.adafruit.com/product/4561) | Adafruit | US | USD 55.00 |
| [Raspberry Pi Model 3 A+](https://www.adafruit.com/product/4027) | Adafruit | US | USD 25.00 |
| [Raspberry Pi NoIR Camera Board v2 - 8 Megapixels](https://www.adafruit.com/product/3100) | Adafruit | US | USD 29.95 |
| [Raspberry Pi Official Model 3 A+ Case](https://www.adafruit.com/product/4096) | Adafruit | US | USD 5.95 |
| [Raspberry Pi Pico 2 - RP2350](https://www.adafruit.com/product/6006) | Adafruit | US | USD 6.25 |
| [Raspberry Pi Pico 2W with Header](https://www.adafruit.com/product/6315) | Adafruit | US | USD 8.00 |
| [Raspberry Pi Pico W](https://www.adafruit.com/product/5526) | Adafruit | US | USD 6.00 |
| [Raspberry Pi PoE+ Injector](https://www.adafruit.com/product/6281) | Adafruit | US | USD 33.95 |
| [Raspberry Pi USB 3 Hub - 5 Gbit/s USB 3.2 Gen1](https://www.adafruit.com/product/6012) | Adafruit | US | USD 15.00 |
| [Replacement CSI/DSI Connector for Raspberry Pi - Repair Part](https://www.adafruit.com/product/4728) | Adafruit | US | USD 0.95 |
| [Snap-on Enclosure for Raspberry Pi Pico / W / 2 / 2W](https://www.adafruit.com/product/6252) | Adafruit | US | USD 2.95 |
| [Terminal Block Breakout Module for Raspberry Pi Pico](https://www.adafruit.com/product/5095) | Adafruit | US | USD 24.95 |
| [USB Mini Hub with Power Switch](https://www.adafruit.com/product/2998) | Adafruit | US | USD 4.95 |
| [USB Mini Hub with Power Switch - OTG Micro-USB](https://www.adafruit.com/product/2991) | Adafruit | US | USD 5.95 |
| [USB to TTL Serial Cable - Debug / Console Cable for Raspberry Pi](https://www.adafruit.com/product/954) | Adafruit | US | USD 9.95 |
| [Zero2Go Omini – Multi-Channel Power Supply for Raspberry Pi](https://www.adafruit.com/product/4114) | Adafruit | US | USD 19.95 |
| [Zero4U - 4 Port USB Hub for Raspberry Pi Zero v1.3](https://www.adafruit.com/product/3298) | Adafruit | US | USD 9.95 |
| [Zero4U - 4-Port USB Hub without Pogo Pins](https://www.adafruit.com/product/4115) | Adafruit | US | USD 9.95 |
| [10-Inch Rack Mount for Ubiquiti Unifi USW-Lite-16 PoE – Secure Fit with Port Access and Top Cable Clearance](https://d-central.tech/product/ubiquiti-usw-lite-16-rack-mount/) | D-Central | CA | CAD 19.99 |
| [6-15P to C19 Power Cable](https://d-central.tech/product/6-15p-to-c19-power-cable/) | D-Central | CA | CAD 20.00 |
| [6-20R to C13 Power Cable 14AWG SJT](https://d-central.tech/product/6-20r-to-c13-power-cable-14awg-sjt/) | D-Central | CA | CAD 20.00 |
| [6-20R to C14 14AWG SJT Power Cord](https://d-central.tech/product/6-20r-to-c14-14awg-sjt-power-cord/) | D-Central | CA | CAD 20.00 |
| [6ft 6-15P to C13 Power Cable 14AWG SJT](https://d-central.tech/product/6ft-6-15p-to-c13-power-cable-14awg-sjt/) | D-Central | CA | CAD 19.99 |
| [AC Infinity Cloudline S6 Quiet 6” Duct Fan](https://d-central.tech/product/ac-infinity-cloudline-s6-quiet-6-duct-fan/) | D-Central | CA | CAD 185.00 |
| [AC Infinity Cloudline S8 Quiet 8” Duct Fan](https://d-central.tech/product/ac-infinity-cloudline-s8-quiet-8-duct-fan/) | D-Central | CA | CAD 275.00 |
| [Antminer Dual 120mm Silencer](https://d-central.tech/product/antminer-dual-120mm-silencer/) | D-Central | CA | CAD 20.00 |
| [Antminer L3+ Space Heater Edition](https://d-central.tech/product/antminer-l3-space-heater-edition/) | D-Central | CA | CAD 295.00 |
| [Antminer L7 Heater · Pivotal Edition](https://d-central.tech/product/l7-heater-pivotal-edition-3-5ghs-1300w/) | D-Central | CA | CAD 2,350.00 |
| [Antminer Loki Edition](https://d-central.tech/product/antminer-loki-edition/) | D-Central | CA | CAD 585.00 |
| [Antminer Pivotal Edition](https://d-central.tech/product/antminer-pivotal-edition/) | D-Central | CA | CAD 645.00 |
| [Antminer S17/T17 Space Heater Case — DIY Conversion Kit](https://d-central.tech/product/antminer-s17-t17-space-heater-case/) | D-Central | CA | CAD 160.00 |
| [Antminer S19 Space Heater Edition](https://d-central.tech/product/antminer-s19-space-heater-edition/) | D-Central | CA | CAD 755.00 |
| [Antminer S21 Pro & S21 XP to 8-Inch Round Vent Duct Shroud Adapter – High-Efficiency 3D Printed Airflow Shroud – 200mm Exhaust Outlet for ASIC Miner Cooling](https://d-central.tech/product/antminer-s21-pro-xp-8-inch-shroud-adapter/) | D-Central | CA | CAD 39.99 |
| [Antminer S9 Space Heater Edition](https://d-central.tech/product/antminer-s9-space-heater-edition/) | D-Central | CA | CAD 235.00 |
| [Antminer Slim Edition](https://d-central.tech/product/antminer-slim-edition/) | D-Central | CA | CAD 560.00 |
| [BM1366AL for Antminer S19 XP](https://d-central.tech/product/bm1366al/) | D-Central | CA | CAD 22.50 |
| [BM1366BS For Antminer S19k Pro](https://d-central.tech/product/bm1366bs/) | D-Central | CA | CAD 18.33 |
| [Bitaxe Argon THRML Noctua Socket](https://d-central.tech/product/bitaxe-argon-thrml-noctua-socket/) | D-Central | CA | CAD 24.99 |
| [Bitaxe Basic Heatsink](https://d-central.tech/product/bitaxe-basic-heatsink/) | D-Central | CA | CAD 14.99 |
| [Bitaxe DIY Kit](https://d-central.tech/product/bitaxe-diy-kit/) | D-Central | CA | CAD 120.00 |
| [Bitaxe Hex Case](https://d-central.tech/product/bitaxe-hex-case/) | D-Central | CA | CAD 19.99 |
| [Bitaxe Hex Heatsink](https://d-central.tech/product/bitaxe-hex-heatsink/) | D-Central | CA | CAD 19.99 |
| [Bitaxe Modern Heatsink](https://d-central.tech/product/bitaxe-modern-heatsink/) | D-Central | CA | CAD 19.99 |
| [Bitaxe Replacement OLED Display (Pack of 3)](https://d-central.tech/product/bitaxe-replacement-oled-display-pack-of-3/) | D-Central | CA | CAD 14.99 |
| [Bitmain APW12+ 1417 PSU for Antminer L7/D7](https://d-central.tech/product/bitmain-apw12-1417-psu-for-antminer-l7-d7/) | D-Central | CA | CAD 149.99 |
| [Bitmain Antminer AMlogic Control board A113D Ctrl_C76](https://d-central.tech/product/bitmain-antminer-amlogic-control-board-a113d-ctrl_c76/) | D-Central | CA | CAD 140.00 |
| [Bitmain Antminer AMlogic Control board A113D Ctrl_C81](https://d-central.tech/product/bitmain-antminer-amlogic-control-board-a113d-ctrl_c81/) | D-Central | CA | CAD 79.99 |
| [Bitmain Antminer CVITEK Control board CV1835 Ctrl_C97](https://d-central.tech/product/bitmain-antminer-cvitek-control-board-cv1835-ctrl_c97/) | D-Central | CA | CAD 99.99 |
| [Bitmain Antminer L7](https://d-central.tech/product/bitmain-antminer-l7/) | D-Central | CA | CAD 3,600.00 |
| [Bitmain Antminer S19j Pro](https://d-central.tech/product/bitmain-antminer-s19j-pro/) | D-Central | CA | CAD 925.00 |
| [Bitmain Antminer S19k Pro](https://d-central.tech/product/bitmain-antminer-s19k-pro/) | D-Central | CA | CAD 2,200.00 |
| [Bitmain Antminer S21 Pro](https://d-central.tech/product/bitmain-antminer-s21-pro/) | D-Central | CA | CAD 8,000.00 |
| [Bitmain Antminer S21 XP](https://d-central.tech/product/bitmain-antminer-s21-xp/) | D-Central | CA | CAD 6,499.99 |
| [Bitmain Antminer Xilinx 7007 Zync Control board Ctrl_C87](https://d-central.tech/product/bitmain-antminer-xilinx-7007-zync-control-board-ctrl_c87/) | D-Central | CA | CAD 140.00 |
| [Braiins BCB 100 Mining Control Board for 19 Series](https://d-central.tech/product/braiins-bcb-100-mining-control-board-for-19-series/) | D-Central | CA | CAD 200.00 |
| [C14 to 2x NEMA 5-15R Power Splitter Cable](https://d-central.tech/product/c14-to-2x-nema-5-15r-power-splitter-cable/) | D-Central | CA | CAD 20.00 |
| [C14 to 3x C13 Power Splitter Cable](https://d-central.tech/product/c14-to-3x-c13-power-splitter-cable/) | D-Central | CA | CAD 20.00 |
| [C20 to 2x C13 Power Splitter Cable](https://d-central.tech/product/c20-to-2x-c13-power-splitter-cable/) | D-Central | CA | CAD 30.00 |
| [Canaan Avalon Mini 3](https://d-central.tech/product/canaan-avalon-mini-3/) | D-Central | CA | CAD 1,750.00 |
| [D-CENTRAL.TECH Bitcoin Antminer Slim DIY Case – Dual-Purpose Bitcoin Miner & Home Heater  /  Compatible with Antminer 19 & 21 Series, Black](https://d-central.tech/product/antminer-slim-diy-case/) | D-Central | CA | CAD 199.99 |
| [D-Central.TECH Bitcoin Antminer S9 & L3 Space Heater DIY Box  /  Made for Dual-Purpose Mining & Home Heating  /  Whisper-Quiet 140mm Fan Support  /  Compatible with A](https://d-central.tech/product/antminer-s9-l3-space-heater-diy-box/) | D-Central | CA | CAD 99.99 |
| [ESP32 programmer](https://d-central.tech/product/esp32-programmer/) | D-Central | CA | CAD 23.00 |
| [Fan Speed Tester for ASIC Miner](https://d-central.tech/product/fan-speed-tester-for-asic-miner/) | D-Central | CA | CAD 94.99 |
| [Fanless Case for Orange Pi 5 – Compact Dual-Part Enclosure with Passive Ventilation](https://d-central.tech/product/orange-pi-5-fanless-case/) | D-Central | CA | CAD 14.99 |
| [Hashboard Airflow Deflector for Antminer 19/21 Series](https://d-central.tech/product/hashboard-airflow-deflector-for-antminer-19-21-series/) | D-Central | CA | CAD 21.00 |
| [IEC C20 to PA45/P13 Power Cable](https://d-central.tech/product/iec-c20-to-pa45-p13-power-cable/) | D-Central | CA | CAD 30.00 |
| [Ice Cooler Low-Profile Tower Bitaxe Socket](https://d-central.tech/product/ice-cooler-low-profile-tower-bitaxe-socket/) | D-Central | CA | CAD 19.99 |
| [MARTECH DF1203812B2UN 6000 PWM](https://d-central.tech/product/martech-df1203812b2un-6000-pwm/) | D-Central | CA | CAD 34.99 |
| [NerdQaxe 24-Pin Socket Extension](https://d-central.tech/product/nerdqaxe-24-pin-socket-extension/) | D-Central | CA | CAD 17.99 |
| [Njord Cloudline](https://d-central.tech/product/njord-cloudline/) | D-Central | CA | CAD 60.00 |
| [Noctua NF-A14 iPPC-3000 PWM](https://d-central.tech/product/noctua-nf-a14-ippc-3000-pwm/) | D-Central | CA | CAD 47.00 |
| [Noctua NF-F12 iPPC 3000 PWM](https://d-central.tech/product/noctua-nf-f12-ippc-3000-pwm/) | D-Central | CA | CAD 36.25 |
| [Replacement hashboard for Antminer S19 XP](https://d-central.tech/product/replacement-hashboard-for-antminer-s19-xp/) | D-Central | CA | CAD 599.99 |
| [Replacement hashboard for Antminer S19j Pro](https://d-central.tech/product/replacement-hashboard-for-antminer-s19j-pro/) | D-Central | CA | CAD 412.50 |
| [Replacement hashboard for Antminer S19k Pro](https://d-central.tech/product/replacement-hashboard-for-antminer-s19k-pro/) | D-Central | CA | CAD 871.00 |
| [Replacement hashboard for Antminer S21](https://d-central.tech/product/replacement-hashboard-for-antminer-s21/) | D-Central | CA | CAD 2,164.00 |
| [Replacement hashboard for Antminer T17 (Upgraded)](https://d-central.tech/product/replacement-hashboard-for-antminer-t17-upgraded/) | D-Central | CA | CAD 140.00 |
| [SilentMiner ASIC Fan Speed Reducer Cable](https://d-central.tech/product/silentminer-asic-fan-speed-reducer-cable/) | D-Central | CA | CAD 4.00 |
| [Simpleton NerdQaxe+ Stand  /  3D Printed Crypto Mining Stand  /  Bitcoin ASIC Miner Holder for NerdQaxe+  /  Sturdy & Space-Saving (Galaxy Purple)](https://d-central.tech/product/nerdqaxe-stand-galaxy-purple/) | D-Central | CA | CAD 14.99 |
| [Sj SG121238BS 6000 PWM](https://d-central.tech/product/sj-sg121238bs-6000-pwm/) | D-Central | CA | CAD 29.99 |
| [T451](https://d-central.tech/product/t451/) | D-Central | CA | CAD 4.50 |
| [The BitChimney](https://d-central.tech/product/the-bitchimney/) | D-Central | CA | CAD 540.00 |
| [The Bitaxe](https://d-central.tech/product/the-bitaxe/) | D-Central | CA | CAD 184.99 |
| [The Bitaxe Hex](https://d-central.tech/product/the-bitaxe-hex/) | D-Central | CA | CAD 389.99 |
| [The NerdOctaxe Gamma](https://d-central.tech/product/the-nerdoctaxe-gamma/) | D-Central | CA | CAD 849.99 |
| [The NerdQaxe+](https://d-central.tech/product/the-nerdqaxe-plus/) | D-Central | CA | CAD 529.99 |
| [The Nerdaxe](https://d-central.tech/product/the-nerdaxe/) | D-Central | CA | CAD 169.99 |
| [The QAxe](https://d-central.tech/product/the-qaxe/) | D-Central | CA | CAD 319.99 |
| [The StealthMiner](https://d-central.tech/product/the-stealthminer/) | D-Central | CA | CAD 849.99 |
| [USB to TTL cable](https://d-central.tech/product/usb-to-ttl-cable/) | D-Central | CA | CAD 14.99 |
| [Vonets WiFi Adapter Cable for Antminer – Dual 6-Pin PSU Splitter for Control Board & WiFi](https://d-central.tech/product/vonets-wifi-adapter-cable-antminer/) | D-Central | CA | CAD 14.99 |
| [ePIC Blockchain UMC Universal Mining Control Board](https://d-central.tech/product/epic-blockchain-umc-universal-mining-control-board/) | D-Central | CA | CAD 229.99 |
| [ACDC-85-255-12V0.4A](https://www.olimex.com/Products/Power-Supply/Modules/ACDC-85-255-12V0.4A/) | Olimex | EU | EUR 2.95 |
| [ACDC-85-255-12V1A](https://www.olimex.com/Products/Power-Supply/Modules/ACDC-85-255-12V1A/) | Olimex | EU | EUR 4.95 |
| [ACDC-85-255-5V0.7A](https://www.olimex.com/Products/Power-Supply/Modules/ACDC-85-255-5V0.7A/) | Olimex | EU | EUR 2.95 |
| [ACDC-85-255-5V2A](https://www.olimex.com/Products/Power-Supply/Modules/ACDC-85-255-5V2A/) | Olimex | EU | EUR 4.95 |
| [DCDC-50-5-12](https://www.olimex.com/Products/Power-Supply/Modules/DCDC-50-5-12/open-source-hardware) | Olimex | EU | EUR 4.95 |
| [ESP32-C3-DevKit-Lipo](https://www.olimex.com/Products/IoT/ESP32-C3/ESP32-C3-DevKit-Lipo/open-source-hardware) | Olimex | EU | EUR 4.95 |
| [ESP32-C5-DevKit-Lipo](https://www.olimex.com/Products/IoT/ESP32-C5/ESP32-C5-DevKit-Lipo/open-source-hardware) | Olimex | EU | EUR 12.95 |
| [ESP32-C5-EVB](https://www.olimex.com/Products/IoT/ESP32-C5/ESP32-C5-EVB/open-source-hardware) | Olimex | EU | EUR 16.95 |
| [ESP32-C6-DevKit-Lipo](https://www.olimex.com/Products/IoT/ESP32-C6/ESP32-C6-DevKit-Lipo/open-source-hardware) | Olimex | EU | EUR 8.95 |
| [ESP32-C6-EVB](https://www.olimex.com/Products/IoT/ESP32-C6/ESP32-C6-EVB/open-source-hardware) | Olimex | EU | EUR 12.95 |
| [ESP32-P4-PC](https://www.olimex.com/Products/IoT/ESP32-P4/ESP32-P4-PC/open-source-hardware) | Olimex | EU | EUR 24.95 |
| [ESP32-POE](https://www.olimex.com/Products/IoT/ESP32/ESP32-POE/open-source-hardware) | Olimex | EU | EUR 17.95 |
| [ESP32-POE2](https://www.olimex.com/Products/IoT/ESP32/ESP32-POE2/open-source-hardware) | Olimex | EU | EUR 20.95 |
| [ESP32-S3-DevKit-Lipo](https://www.olimex.com/Products/IoT/ESP32-S3/ESP32-S3-DevKit-Lipo/open-source-hardware) | Olimex | EU | EUR 7.95 |
| [ETHERNET-CABLE-PANEL](https://www.olimex.com/Products/Components/Cables/Ethernet/ETHERNET-CABLE-PANEL/) | Olimex | EU | EUR 3.00 |
| [ETHERNET-EXTENDER](https://www.olimex.com/Products/Components/Cables/Ethernet/ETHERNET-EXTENDER/) | Olimex | EU | EUR 3.00 |
| [Ethernet-CABLE-1M](https://www.olimex.com/Products/Components/Cables/Ethernet/Ethernet-CABLE-1M/) | Olimex | EU | EUR 2.00 |
| [MIPI-HDMI](https://www.olimex.com/Products/IoT/ESP32-P4/MIPI-HDMI/open-source-hardware) | Olimex | EU | EUR 14.95 |
| [MOD-ESP32-C5](https://www.olimex.com/Products/IoT/ESP32-C5/MOD-ESP32-C5/open-source-hardware) | Olimex | EU | EUR 5.95 |
| [POEv3](https://www.olimex.com/Products/IoT/ESP32-P4/POEv3/open-source-hardware) | Olimex | EU | EUR 4.95 |
| [STMP157-OLinuXino-LIME2](https://www.olimex.com/Products/OLinuXino/STMP1/STMP157-OLinuXino-LIME2/open-source-hardware) | Olimex | EU | EUR 52.95 |
| [STMP15X-SHIELD](https://www.olimex.com/Products/OLinuXino/STMP1/STMP15X-SHIELD/open-source-hardware) | Olimex | EU | EUR 3.95 |
| [USB-4SERIAL](https://www.olimex.com/Products/USB-Modules/Interfaces/USB-4SERIAL/open-source-hardware) | Olimex | EU | EUR 18.00 |
| [USB-C-CARD-READER](https://www.olimex.com/Products/USB-Modules/Interfaces/USB-C-CARD-READER/) | Olimex | EU | EUR 3.00 |
| [USB-C-HUB](https://www.olimex.com/Products/USB-Modules/Hub/USB-C-HUB/) | Olimex | EU | EUR 3.50 |
| [USB-CARD-READER](https://www.olimex.com/Products/USB-Modules/Interfaces/USB-CARD-READER/) | Olimex | EU | EUR 1.50 |
| [USB-HUB](https://www.olimex.com/Products/USB-Modules/Hub/USB-HUB/) | Olimex | EU | EUR 3.50 |
| [USB-ISO-HS](https://www.olimex.com/Products/USB-Modules/USB-ISO-HS/) | Olimex | EU | EUR 24.95 |
| [USB-SATA](https://www.olimex.com/Products/USB-Modules/Interfaces/USB-SATA/open-source-hardware) | Olimex | EU | EUR 7.95 |
| [Grove Vision AI Module V2 · Cortex-M55 and Ethos-U55](https://www.seeedstudio.com/Grove-Vision-AI-Module-V2-p-5851.html) | Seeed Studio | Unverified | USD 15.99 |
| [NVMe M.2 2280 SSD 1TB](https://www.seeedstudio.com/NVMe-M-2-2280-SSD-1TB-p-5767.html) | Seeed Studio | Unverified | USD 234.00 |
| [Raspberry Pi 5 8GB](https://www.seeedstudio.com/Raspberry-Pi-5-8GB-p-5810.html) | Seeed Studio | Unverified | USD 175.00 |
| [Raspberry Pi 500+ Desktop Kit - EU Version](https://www.seeedstudio.com/Pi500-EU-desktop-computer-kit-p-6655.html) | Seeed Studio | Unverified | USD 430.00 |
| [Raspberry Pi 500+ Desktop Kit - US Version](https://www.seeedstudio.com/Pi500-US-desktop-computer-kit-p-6656.html) | Seeed Studio | Unverified | USD 430.00 |
| [Raspberry Pi AI HAT+ · Hailo-8L 13 TOPS](https://www.seeedstudio.com/Raspberry-Pi-AI-HAT-13TOPS-p-6716.html) | Seeed Studio | Unverified | USD 70.00 |
| [reComputer Industrial R2235-12 - Raspberry Pi Edge AI/IOT NVR with 26 TOPS](https://www.seeedstudio.com/reComputer-Industrial-R2235-12-p-6654.html) | Seeed Studio | Unverified | USD 636.90 |
| [reComputer Industrial R2245-12 - Raspberry Pi Edge AI/IOT NVR with 26 TOPS](https://www.seeedstudio.com/reComputer-Industrial-R2245-12-p-6653.html) | Seeed Studio | Unverified | USD 915.90 |
| [reComputer J401 Nano Bundle with Jetson Orin™ Nano 8GB in Super Mode](https://www.seeedstudio.com/reComputer-J401-Nano-Bundle-p-6625.html) | Seeed Studio | Unverified | USD 699.00 |
| [reComputer RK3576 Dev Kit with RK1820 AI Accelerator  /  High Performance Rockchip Industrial Edge Al Platform](https://www.seeedstudio.com/reComputer-RK3576-Module-Dev-Kit-with-RK1820-AI-Accelerator-p-6953.html) | Seeed Studio | Unverified | USD 379.00 |
| [reComputer RK3576 Dev Kit  /  Compact Rockchip Industrial Edge Al Platform](https://www.seeedstudio.com/reComputer-RK3576-Module-Dev-Kit-p-6952.html) | Seeed Studio | Unverified | USD 219.00 |
| [reComputer RK3576 Module 4GB RAM/32GB eMMC  /  Rockchip Compute Module for Industrial Edge AI](https://www.seeedstudio.com/reComputer-RK3576-Module-0432-p-6949.html) | Seeed Studio | Unverified | USD 130.00 |
| [reComputer RK3576 Module 8GB RAM/64GB eMMC  /  Rockchip Compute Module for Industrial Edge AI](https://www.seeedstudio.com/reComputer-RK3576-Module-0864-p-6950.html) | Seeed Studio | Unverified | USD 170.00 |
| [reComputer RK3576 Module IO Board](https://www.seeedstudio.com/reComputer-RK3576-Module-lO-Board-p-6951.html) | Seeed Studio | Unverified | USD 18.00 |
| [reComputer Rugged J3011 - Ruggedized IP66 Edge AI Computer with NVIDIA® Jetson Orin™ Nano 8GB](https://www.seeedstudio.com/reComputer-Rugged-J3011-p-6921.html) | Seeed Studio | Unverified | USD 1,299.00 |
| [reComputer Rugged J4012 - Ruggedized IP66 Edge AI Computer with NVIDIA® Jetson Orin™ 16GB](https://www.seeedstudio.com/reComputer-Rugged-J4012-p-6920.html) | Seeed Studio | Unverified | USD 2,299.00 |
| [reComputer Super J401 NX Bundle with Jetson Orin™ NX 16GB in Super Mode](https://www.seeedstudio.com/reComputer-Super-J401-NX-Bundle-p-6686.html) | Seeed Studio | Unverified | USD 1,449.00 |
| [24-Port Blank Keystone Patch Panel](https://eu.store.ui.com/eu/en/products/uacc-rack-panel-patch-blank-24) | Ubiquiti EU | EU | EUR 25.00 |
| [5G Ethernet Adapter](https://eu.store.ui.com/eu/en/products/uacc-adapter-rj45-usbc-5ge) | Ubiquiti EU | EU | EUR 44.00 |
| [AC Adapter 210W / EU Version](https://eu.store.ui.com/eu/en/products/uacc-adapter-ac-210w?variant=uacc-adapter-ac-210w-eu) | Ubiquiti EU | EU | EUR 70.00 |
| [Access Point U6 Enterprise](https://eu.store.ui.com/eu/en/products/u6-enterprise) | Ubiquiti EU | EU | EUR 250.00 |
| [Access Point U6 Enterprise In-Wall](https://eu.store.ui.com/eu/en/products/u6-enterprise-iw) | Ubiquiti EU | EU | EUR 269.00 |
| [Access Point U6 In-Wall](https://eu.store.ui.com/eu/en/products/u6-iw) | Ubiquiti EU | EU | EUR 160.00 |
| [Access Point U6 Mesh / EU Version](https://eu.store.ui.com/eu/en/products/u6-mesh?variant=u6-mesh-eu) | Ubiquiti EU | EU | EUR 160.00 |
| [Access Point U6 Mesh Pro / EU Version](https://eu.store.ui.com/eu/en/products/u6-mesh-pro?variant=u6-mesh-pro-eu) | Ubiquiti EU | EU | EUR 185.00 |
| [Access Point U6 Plus](https://eu.store.ui.com/eu/en/products/u6-plus) | Ubiquiti EU | EU | EUR 89.00 |
| [Access Point U6 Pro](https://eu.store.ui.com/eu/en/products/u6-pro) | Ubiquiti EU | EU | EUR 145.00 |
| [Access Point U7 In-Wall](https://eu.store.ui.com/eu/en/products/u7-iw) | Ubiquiti EU | EU | EUR 135.00 |
| [Access Point U7 Lite](https://eu.store.ui.com/eu/en/products/u7-lite) | Ubiquiti EU | EU | EUR 89.00 |
| [Access Point U7 Long-Range](https://eu.store.ui.com/eu/en/products/u7-lr) | Ubiquiti EU | EU | EUR 145.00 |
| [Access Point U7 Mesh](https://eu.store.ui.com/eu/en/products/u7-mesh) | Ubiquiti EU | EU | EUR 179.00 |
| [Access Point U7 Outdoor](https://eu.store.ui.com/eu/en/products/u7-outdoor) | Ubiquiti EU | EU | EUR 185.00 |
| [Access Point U7 Pro / Single Unit](https://eu.store.ui.com/eu/en/products/u7-pro?variant=u7-pro) | Ubiquiti EU | EU | EUR 160.00 |
| [Access Point U7 Pro Max](https://eu.store.ui.com/eu/en/products/u7-pro-max) | Ubiquiti EU | EU | EUR 250.00 |
| [Access Point U7 Pro Outdoor](https://eu.store.ui.com/eu/en/products/u7-pro-outdoor) | Ubiquiti EU | EU | EUR 250.00 |
| [Access Point U7 Pro Wall](https://eu.store.ui.com/eu/en/products/u7-pro-wall) | Ubiquiti EU | EU | EUR 185.00 |
| [Access Point U7 Pro XG / Black](https://eu.store.ui.com/eu/en/products/u7-pro-xg?variant=u7-pro-xg-b) | Ubiquiti EU | EU | EUR 179.00 |
| [Access Point U7 Pro XG Wall](https://eu.store.ui.com/eu/en/products/u7-pro-xg-wall) | Ubiquiti EU | EU | EUR 250.00 |
| [Access Point U7 Pro XGS / Black](https://eu.store.ui.com/eu/en/products/u7-pro-xgs?variant=u7-pro-xgs-b) | Ubiquiti EU | EU | EUR 269.00 |
| [Cloud Gateway Industrial](https://eu.store.ui.com/eu/en/products/ucg-industrial) | Ubiquiti EU | EU | EUR 520.00 |
| [Dream Machine Beast](https://eu.store.ui.com/eu/en/products/udm-beast) | Ubiquiti EU | EU | EUR 1,349.00 |
| [Dream Machine Pro Max / EU Version](https://eu.store.ui.com/eu/en/products/udm-pro-max?variant=udm-pro-max-eu) | Ubiquiti EU | EU | EUR 539.00 |
| [Easy Cable, 2-Pack](https://eu.store.ui.com/eu/en/products/uacc-cable-extender-c6a) | Ubiquiti EU | EU | EUR 17.00 |
| [Gateway Fiber](https://eu.store.ui.com/eu/en/products/uxg-fiber) | Ubiquiti EU | EU | EUR 269.00 |
| [Gateway Pro](https://eu.store.ui.com/eu/en/products/uxg-pro) | Ubiquiti EU | EU | EUR 449.00 |
| [Keystone Blank Insert Pass-Through, 12-Pack](https://eu.store.ui.com/eu/en/products/uacc-keystone-blank-insert-th) | Ubiquiti EU | EU | EUR 17.00 |
| [Keystone Blank Insert, 24-Pack](https://eu.store.ui.com/eu/en/products/uacc-keystone-blank-insert) | Ubiquiti EU | EU | EUR 17.00 |
| [PoE to USB-C Adapter](https://eu.store.ui.com/eu/en/products/uacc-adapter-poe-usbc) | Ubiquiti EU | EU | EUR 45.00 |
| [RJ45 Dust Cover, 24-Pack](https://eu.store.ui.com/eu/en/products/uacc-rj45-cover) | Ubiquiti EU | EU | EUR 17.00 |
| [RJ45 Inline Coupler Indoor, 10-Pack](https://eu.store.ui.com/eu/en/products/uacc-rj45-coupler-c6a) | Ubiquiti EU | EU | EUR 26.00 |
| [Rack Ear Kit / 1U](https://eu.store.ui.com/eu/en/products/uacc-rack-ear?variant=uacc-rack-ear-1u) | Ubiquiti EU | EU | EUR 8.10 |
| [Rack Mount OCD Panels / 1U Blank Panel](https://eu.store.ui.com/eu/en/products/uacc-rack-panel-ocd?variant=uacc-rack-panel-blank-1u) | Ubiquiti EU | EU | EUR 17.00 |
| [Redundant Power](https://eu.store.ui.com/eu/en/products/usp-rps) | Ubiquiti EU | EU | EUR 359.00 |
| [SnapMount Rack Kit, 20-Pack](https://eu.store.ui.com/eu/en/products/uacc-rack-pm-kit) | Ubiquiti EU | EU | EUR 45.00 |
| [Switch 48](https://eu.store.ui.com/eu/en/products/usw-48) | Ubiquiti EU | EU | EUR 359.00 |
| [Switch 48 PoE](https://eu.store.ui.com/eu/en/products/usw-48-poe) | Ubiquiti EU | EU | EUR 530.00 |
| [Switch Flex Utility](https://eu.store.ui.com/eu/en/products/usw-flexutility) | Ubiquiti EU | EU | EUR 45.00 |
| [Switch Pro 48 PoE / EU Version](https://eu.store.ui.com/eu/en/products/usw-pro-48-poe?variant=usw-pro-48-poe-eu) | Ubiquiti EU | EU | EUR 989.00 |
| [Switch Pro Max 48 / EU Version](https://eu.store.ui.com/eu/en/products/usw-pro-max-48?variant=usw-pro-max-48-eu) | Ubiquiti EU | EU | EUR 599.00 |
| [Switch Pro Max 48 PoE / EU Version](https://eu.store.ui.com/eu/en/products/usw-pro-max-48-poe?variant=usw-pro-max-48-poe-eu) | Ubiquiti EU | EU | EUR 1,199.00 |
| [Switch Pro XG 24](https://eu.store.ui.com/eu/en/products/usw-pro-xg-24) | Ubiquiti EU | EU | EUR 989.00 |
| [Switch Pro XG 48](https://eu.store.ui.com/eu/en/products/usw-pro-xg-48) | Ubiquiti EU | EU | EUR 1,799.00 |
| [Switch Pro XG 48 PoE / EU Version](https://eu.store.ui.com/eu/en/products/usw-pro-xg-48-poe?variant=usw-pro-xg-48-poe-eu) | Ubiquiti EU | EU | EUR 2,249.00 |
| [Switch Pro XG Aggregation / EU Version](https://eu.store.ui.com/eu/en/products/usw-pro-xg-aggregation?variant=usw-pro-xg-aggregation-eu) | Ubiquiti EU | EU | EUR 2,249.00 |
| [Toolless Mini Rack Stacking Kit](https://eu.store.ui.com/eu/en/products/uacc-rack-stacking-kit) | Ubiquiti EU | EU | EUR 70.00 |
| [UNAS Pro / EU Version](https://eu.store.ui.com/eu/en/products/unas-pro?variant=unas-pro-eu) | Ubiquiti EU | EU | EUR 449.00 |
| [UNAS Pro 8 / EU Version](https://eu.store.ui.com/eu/en/products/unas-pro-8?variant=unas-pro-8-eu) | Ubiquiti EU | EU | EUR 719.00 |
| [UPS PoE Switch Mission Critical](https://eu.store.ui.com/eu/en/products/usw-mission-critical-eu) | Ubiquiti EU | EU | EUR 925.00 |
| [USB-C Cable with Charge Display / 0.3 m](https://eu.store.ui.com/eu/en/products/uacc-cable-usb-100w?variant=uacc-cable-usb-100w-0dot3m-bk) | Ubiquiti EU | EU | EUR 17.50 |
| [UniFi Etherlighting Patch Cable / 0.15 m](https://eu.store.ui.com/eu/en/products/uacc-cable-patch-el?variant=uacc-cable-patch-el-0dot15m-w) | Ubiquiti EU | EU | EUR 3.50 |
| [UniFi Patch Cable (10 GbE) / White / 0.2 m / Single Unit](https://eu.store.ui.com/eu/en/products/uacc-cable-patch?variant=uacc-cable-patch-0dot2m-w) | Ubiquiti EU | EU | EUR 2.30 |
| [UniFi Premium Patch Cable / 0.15 m / Single Unit](https://eu.store.ui.com/eu/en/products/uacc-cable-patch-el-c6a?variant=uacc-cable-patch-el-c6a-0dot15m-w) | Ubiquiti EU | EU | EUR 4.50 |
| [UniFi Sliding Rack Rails](https://eu.store.ui.com/eu/en/products/uacc-rack-rails-slide) | Ubiquiti EU | EU | EUR 70.00 |
| [Access Point U6 Enterprise](https://store.ui.com/us/en/products/u6-enterprise) | Ubiquiti US | US | USD 279.00 |
| [Access Point U6 Enterprise In-Wall](https://store.ui.com/us/en/products/u6-enterprise-iw) | Ubiquiti US | US | USD 299.00 |
| [Access Point U6 In-Wall](https://store.ui.com/us/en/products/u6-iw) | Ubiquiti US | US | USD 179.00 |
| [Access Point U6 Mesh](https://store.ui.com/us/en/products/u6-mesh) | Ubiquiti US | US | USD 179.00 |
| [Access Point U6 Mesh Pro](https://store.ui.com/us/en/products/u6-mesh-pro) | Ubiquiti US | US | USD 199.00 |
| [Access Point U6 Plus](https://store.ui.com/us/en/products/u6-plus) | Ubiquiti US | US | USD 129.00 |
| [Access Point U6 Pro](https://store.ui.com/us/en/products/u6-pro) | Ubiquiti US | US | USD 159.00 |
| [Access Point U7 In-Wall](https://store.ui.com/us/en/products/u7-iw) | Ubiquiti US | US | USD 149.00 |
| [Access Point U7 Lite](https://store.ui.com/us/en/products/u7-lite) | Ubiquiti US | US | USD 99.00 |
| [Access Point U7 Long-Range](https://store.ui.com/us/en/products/u7-lr) | Ubiquiti US | US | USD 159.00 |
| [Access Point U7 Mesh](https://store.ui.com/us/en/products/u7-mesh) | Ubiquiti US | US | USD 199.00 |
| [Cloud Gateway Fiber](https://store.ui.com/us/en/products/ucg-fiber) | Ubiquiti US | US | USD 279.00 |
| [Dream Machine Pro](https://store.ui.com/us/en/products/udm-pro) | Ubiquiti US | US | USD 379.00 |
| [Dream Machine Special Edition](https://store.ui.com/us/en/products/udm-se) | Ubiquiti US | US | USD 499.00 |
| [Gateway Enterprise](https://store.ui.com/us/en/products/uxg-enterprise) | Ubiquiti US | US | USD 1,999.00 |
| [Gateway Lite](https://store.ui.com/us/en/products/uxg-lite) | Ubiquiti US | US | USD 89.00 |
| [Gateway Max](https://store.ui.com/us/en/products/uxg-max) | Ubiquiti US | US | USD 199.00 |
| [Pro Max 16 Rack Mount](https://store.ui.com/us/en/products/uacc-pro-max-16-rm) | Ubiquiti US | US | USD 49.00 |
| [Switch 16 PoE](https://store.ui.com/us/en/products/usw-16-poe) | Ubiquiti US | US | USD 299.00 |
| [Switch 24](https://store.ui.com/us/en/products/usw-24) | Ubiquiti US | US | USD 225.00 |
| [Switch 24 PoE](https://store.ui.com/us/en/products/usw-24-poe) | Ubiquiti US | US | USD 379.00 |
| [Switch Aggregation](https://store.ui.com/us/en/products/usw-aggregation) | Ubiquiti US | US | USD 269.00 |
| [Switch Flex / Single Unit](https://store.ui.com/us/en/products/usw-flex?variant=usw-flex) | Ubiquiti US | US | USD 99.00 |
| [Switch Flex 2.5G](https://store.ui.com/us/en/products/usw-flex-2-5g-8) | Ubiquiti US | US | USD 159.00 |
| [Switch Flex 2.5G PoE](https://store.ui.com/us/en/products/usw-flex-2-5g-8-poe) | Ubiquiti US | US | USD 199.00 |
| [Switch Flex Mini 2.5G](https://store.ui.com/us/en/products/usw-flex-2-5g-5) | Ubiquiti US | US | USD 49.00 |
| [Switch Flex XG](https://store.ui.com/us/en/products/usw-flex-xg) | Ubiquiti US | US | USD 299.00 |
| [Switch Hi-Capacity Aggregation](https://store.ui.com/us/en/products/usw-pro-aggregation) | Ubiquiti US | US | USD 899.00 |
| [Switch Lite 16 PoE](https://store.ui.com/us/en/products/usw-lite-16-poe) | Ubiquiti US | US | USD 199.00 |
| [Switch Lite 8 PoE](https://store.ui.com/us/en/products/usw-lite-8-poe) | Ubiquiti US | US | USD 109.00 |
| [Switch Pro 24 PoE](https://store.ui.com/us/en/products/usw-pro-24-poe) | Ubiquiti US | US | USD 699.00 |
| [Switch Pro 8 PoE](https://store.ui.com/us/en/products/usw-pro-8-poe) | Ubiquiti US | US | USD 349.00 |
| [Switch Pro HD 24](https://store.ui.com/us/en/products/usw-pro-hd-24) | Ubiquiti US | US | USD 599.00 |
| [Switch Pro HD 24 PoE](https://store.ui.com/us/en/products/usw-pro-hd-24-poe) | Ubiquiti US | US | USD 999.00 |
| [Switch Pro Max 16](https://store.ui.com/us/en/products/usw-pro-max-16) | Ubiquiti US | US | USD 279.00 |
| [Switch Pro Max 16 PoE](https://store.ui.com/us/en/products/usw-pro-max-16-poe) | Ubiquiti US | US | USD 399.00 |
| [Switch Pro Max 24](https://store.ui.com/us/en/products/usw-pro-max-24) | Ubiquiti US | US | USD 449.00 |
| [Switch Pro Max 24 PoE](https://store.ui.com/us/en/products/usw-pro-max-24-poe) | Ubiquiti US | US | USD 799.00 |
| [Switch Pro XG 10 PoE](https://store.ui.com/us/en/products/usw-pro-xg-10-poe) | Ubiquiti US | US | USD 699.00 |
| [Switch Pro XG 8 PoE](https://store.ui.com/us/en/products/usw-pro-xg-8-poe) | Ubiquiti US | US | USD 499.00 |
| [UNAS 2 / Black](https://store.ui.com/us/en/products/unas-2?variant=unas-2-b) | Ubiquiti US | US | USD 199.00 |
| [UNAS Pro 4](https://store.ui.com/us/en/products/unas-pro-4) | Ubiquiti US | US | USD 499.00 |
| [UniFi WAN Switch](https://store.ui.com/us/en/products/usw-wan) | Ubiquiti US | US | USD 249.00 |
| [UniFi WAN Switch RJ45](https://store.ui.com/us/en/products/usw-wan-rj45) | Ubiquiti US | US | USD 249.00 |
