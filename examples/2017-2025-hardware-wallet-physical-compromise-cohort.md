# Hardware-Wallet Physical Compromise Cohort — 2017–2025

**Tags:** OAK-T11.007, OAK-T11.007.001, OAK-T11.007.002

**Loss:** T11.007.001 ~$9.5M+ (2025 counterfeit Ledger Nano S Plus cohort, ~50+ victims, 20+ blockchain ecosystems); T11.007.002 aggregate undocumented at class level (physical-access seed extraction requires device theft or seizure, so per-incident extraction is bounded by the device holder's balance; class-level loss is small relative to remote-attack classes but the capability is structural and the per-device extraction can be catastrophic for the individual victim).

**Key teaching point:** Both sub-Techniques exploit the hardware wallet's physical-attack surface, but through fundamentally different paths. T11.007.001 substitutes the *device itself* at purchase time — the user receives a structurally-compromised counterfeit. T11.007.002 attacks a *legitimate device* through physical access — the device is genuine but the microcontroller has a structural vulnerability that physical access exploits. The binding constraint for T11.007.001 is the purchase channel; for T11.007.002, it is physical possession of the device.

## Timeline

T11.007.001 from 2017 (early Ledger Nano S inserts) through 2025 (counterfeit Ledger Nano S Plus cohort); T11.007.002 from 2020-01-31 (Trezor RDP-downgrade Kraken disclosure).

## T11.007.001 — Counterfeit-Hardware Substitution

Counterfeit hardware-wallet devices distributed through informal retail channels (AliExpress, Taobao, Telegram resellers, in-person counterfeit markets, second-hand without packaging) that brand-impersonate legitimate products.

Two device-compromise primitives:
- **Pre-seeded recovery phrase.** The device ships with a pre-printed recovery card whose seed the operator already knows.
- **Secure-element substitution.** The legitimate secure element is replaced with an attacker-controlled microcontroller (ESP32-S3 or similar) storing seeds in plaintext flash with embedded Wi-Fi/BLE radio for exfiltration — defeating the air-gap that the legitimate device provides.

Canonical case: **2025 counterfeit Ledger Nano S Plus cohort — ~$9.5M+ across ~50+ victims, 20+ blockchain ecosystems.** ESP32-S3 microcontroller substitution with chip markings physically scraped off; antenna trace on PCB for 2.4 GHz Wi-Fi/BLE radio exfiltration. The legitimate Ledger Nano S Plus is air-gapped by design. See `examples/2025-01-counterfeit-ledger-nano-s-plus-cohort.md`.

Adjacent: **2021 mailed-fake-hardware-wallet replacement campaign** leveraging the December 2020 Ledger customer-data leak (~273,000 customer records including email, physical address, and phone number).

Purchase-channel discipline (vendor's authorised retail channels only) is the binding mitigation.

## T11.007.002 — Physical-Access Hardware-Side Seed Extraction

Voltage-glitching, side-channel, or chip-tampering attacks against a legitimate hardware wallet's microcontroller requiring physical access to the device.

Canonical capability anchor: **Trezor One / Model T RDP-downgrade voltage-glitch attack — Kraken Security Labs disclosure, 2020-01-31.** The STM32F205/STM32F427 microcontroller's Read Protection (RDP) feature could be downgraded from RDP2 to RDP1 by voltage-glitching the MCU's VDD pin during boot-up, exposing SRAM contents including the encrypted seed over the ARM SWD debugging interface. Physical access requirement: approximately 15 minutes. Equipment cost: under $500 (2020). The vulnerability is structural — a property of the STM32F2/F4 microcontroller family, not patchable by firmware update. See `examples/2020-01-trezor-kraken-rdp-downgrade.md`.

The BIP39 passphrase is the defender-side mitigation primitive: an attacker who extracts the seed obtains an encrypted seed that, without the passphrase, opens an empty decoy wallet. Newer Trezor products (Safe 3/Safe 5, 2023–2024) ship with a dedicated EAL6+ certified secure element addressing the structural vulnerability.

Ledger Nano series uses a dedicated secure element and is not vulnerable to the STM32-class voltage-glitch attack.

## References

- `[kraken2020trezor]` — Kraken Security Labs Trezor RDP-downgrade disclosure (January 31, 2020)
- `[trezor2020response]` — Trezor response to Kraken disclosure
- `[trezorsafe32023]` — Trezor Safe 3 EAL6+ secure element (2023)
- `[ledger2020databreach]` — Ledger customer-data breach (December 2020, ~273K records)
- `[counterfeitledger2025]` — 2025 counterfeit Ledger Nano S Plus cohort analysis
