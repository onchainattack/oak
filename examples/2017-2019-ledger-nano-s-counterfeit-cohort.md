# Early Ledger Nano S Counterfeit Cohort — 2017–2019

**Loss:** Not centrally tabulated; individual losses from four to six figures per victim. The counterfeit-device distribution through AliExpress, eBay third-party sellers, and Telegram-based resellers predated the 2025 ESP32-S3 radio-exfiltration variant.
**OAK Techniques observed:** **OAK-T11.007.001** (Counterfeit-Hardware Substitution — primary; counterfeit Ledger Nano S devices sold through informal retail channels with pre-seeded recovery cards or tampered firmware). **OAK-T8.002** (Cross-Chain Operator Continuity — counterfeit-device distributors operated across multiple sales channels and platforms).
**Attribution:** **pseudonymous** at the individual-seller level; Chinese-marketplace (AliExpress / Taobao) third-party sellers as primary distribution channel. No central operator identified.
**Key teaching point:** **The 2017–2019 counterfeit Ledger Nano S wave established the T11.007.001 class before the ESP32-S3 radio-exfiltration variant escalated the threat model. The early counterfeit pattern was simpler — pre-seeded recovery cards and tampered firmware — but the victim acquisition surface (informal-channel purchase) and the structural defence (authorised-retailer-purchase invariant) were the same. The 2025 ESP32-S3 variant is not a new attack class; it is the hardware-capability escalation of a class that has existed since hardware wallets reached retail scale.**

## Summary

From approximately 2017, as Ledger Nano S hardware wallets gained market adoption, counterfeit devices began appearing on Chinese marketplaces (AliExpress, Taobao) and on eBay through third-party sellers. The counterfeit pattern in this period relied on one of two simpler attack primitives:

1. **Pre-seeded recovery cards:** The counterfeit device shipped with a pre-printed recovery phrase card whose seed the seller already controlled. Victims who used the pre-printed card funded a wallet the seller could drain at will. The legitimate Ledger device was designed to generate a fresh seed during initialisation — but victims unfamiliar with the setup flow who used the pre-filled card were immediately compromised.

2. **Tampered firmware:** The counterfeit device ran modified firmware that recorded the user-generated seed and exfiltrated it via USB upon next connection to Ledger Live, or stored it for later extraction if the device was returned or intercepted.

Both patterns relied on the same user-side failure: purchasing a hardware wallet through an informal channel (AliExpress third-party seller, eBay, Telegram reseller, second-hand market) rather than through Ledger's authorised retail network. The structural lesson — a hardware wallet purchased outside authorised retail channels is structurally indistinguishable from a deliberate seed-exfiltration device — was established during this period and remains the load-bearing T11.007.001 invariant.

Ledger responded with: (a) the Ledger Live device-genuineness check, which cryptographically verifies that the connected device is a genuine Ledger product running unmodified firmware; (b) public guidance to purchase exclusively through authorised retail channels; and (c) tamper-evident packaging for retail units.

The 2017–2019 cohort is the class-establishing period for T11.007.001. The 2025 counterfeit Ledger Nano S Plus cohort — with ESP32-S3 microcontroller substitution, chip markings physically scraped off, and PCB antenna trace for Wi-Fi/BLE radio exfiltration — escalated the hardware capability but did not change the fundamental attack class or the defender-side mitigation surface.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2014–2016 | Ledger Nano S launched (2014–2015); hardware wallet adoption grows; retail distribution through authorised channels | (pre-cohort) |
| 2017 | Counterfeit Ledger Nano S devices appear on AliExpress and Taobao; pre-seeded recovery card and tampered firmware patterns documented | **T11.007.001 class emergence** |
| 2017–2019 | Ledger issues public guidance on authorised-retailer purchasing; Ledger Live device-genuineness check introduced; tamper-evident packaging deployed | (vendor response) |
| 2018–2019 | Counterfeit devices also appear on eBay, Telegram reseller channels, and in-person counterfeit-product markets | **T11.007.001 distribution channel expansion** |
| 2017–2019 | Individual victim losses documented; victims who used pre-seeded recovery cards are drained; per-victim forensic analysis identifies counterfeit devices as the common cause | **T11.007.001 early victim cohort** |
| 2025 | Counterfeit Ledger Nano S Plus cohort with ESP32-S3 radio exfiltration — the hardware-capability escalation of the T11.007.001 class | **T11.007.001 capability escalation** |

## Realised extraction

Not centrally tabulated for the 2017–2019 cohort; individual losses from four to six figures. No central recovery mechanism. The 2025 cohort escalated the per-victim extraction to ~$9.5M+ across ~50+ victims.

## Public references

- Cross-reference: T11.007.001 (Counterfeit-Hardware Substitution) at `techniques/T11.007.001-counterfeit-hardware-substitution.md`.
- [`examples/2025-01-counterfeit-ledger-nano-s-plus-cohort.md`](../examples/2025-01-counterfeit-ledger-nano-s-plus-cohort.md) — Counterfeit Ledger Nano S Plus cohort, 2025 (canonical T11.007.001 deployed-attack anchor; ESP32-S3 radio exfiltration variant).
- Ledger — authorised retailer list and public guidance on counterfeit device detection.
- Ledger Live device-genuineness check documentation.
- Community reporting on AliExpress / Taobao counterfeit Ledger devices (Reddit r/ledgerwallet, BitcoinTalk, 2017–2019).
