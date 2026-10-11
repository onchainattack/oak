# Hardware-Wallet Physical Compromise Cohort — 2017–2025

**OAK Techniques observed:** OAK-T11.007, OAK-T11.007.001, OAK-T11.007.002

**Attribution:** **unattributed** (aggregate cohort).
**Loss:** T11.007.001 ~\$9.5M+ (2025 counterfeit Ledger Nano S Plus cohort, ~50+ victims, 20+ blockchain ecosystems — figures carried from the sibling example, not independently sourced in this file); T11.007.002 aggregate undocumented at class level (physical-access seed extraction requires device theft or seizure, so per-incident extraction is bounded by the device holder's balance; class-level loss is small relative to remote-attack classes but the capability is structural and the per-device extraction can be catastrophic for the individual victim).

**Corrected 2026-10-11:** the Trezor attack equipment cost was "under \$500" in the earlier text; Kraken's disclosure says several hundred dollars of equipment. The 2017 "early Ledger Nano S inserts", the AliExpress/Taobao/Telegram channel list and the "2021" date for the mailed-device campaign had no source and were removed or softened.

**Key teaching point:** Both sub-Techniques exploit the hardware wallet's physical-attack surface, but through fundamentally different paths. T11.007.001 substitutes the *device itself* at purchase time — the user receives a structurally-compromised counterfeit. T11.007.002 attacks a *legitimate device* through physical access — the device is genuine but the microcontroller has a structural vulnerability that physical access exploits. The binding constraint for T11.007.001 is the purchase channel; for T11.007.002, it is physical possession of the device.

## Summary

## Timeline

T11.007.001 from ~2018 (pre-seeded Ledger Nano S devices sold via eBay; see the sibling 2017–2019 example) through 2025 (counterfeit Ledger Nano S Plus cohort); T11.007.002 from 2020-01-31 (Trezor RDP-downgrade Kraken disclosure).

## T11.007.001 — Counterfeit-Hardware Substitution

Counterfeit or pre-initialised hardware-wallet devices distributed through informal retail channels (eBay and second-hand sellers in the sourced 2018 cases; Chinese marketplaces in the 2025 cohort) that brand-impersonate legitimate products.

Two device-compromise primitives:

- **Pre-seeded recovery phrase.** The device ships with a recovery card or pre-initialised seed that the seller already knows (documented in Ledger's 2018 guidance and a ~£25,000 eBay case).
- **Secure-element substitution.** The legitimate secure element is replaced with an attacker-controlled microcontroller (ESP32-S3 or similar) storing seeds in plaintext flash with embedded Wi-Fi/BLE radio for exfiltration — defeating the air-gap that the legitimate device provides.

Canonical case: **2025 counterfeit Ledger Nano S Plus cohort — ~\$9.5M+ across ~50+ victims, 20+ blockchain ecosystems.** ESP32-S3 microcontroller substitution with chip markings physically scraped off; antenna trace on PCB for 2.4 GHz Wi-Fi/BLE radio exfiltration. The legitimate Ledger Nano S Plus is air-gapped by design. See `examples/2025-01-counterfeit-ledger-nano-s-plus-cohort.md`.

Adjacent: **mailed fake "replacement" Ledger devices** following the December 2020 Ledger customer-data leak (a database of about 273,000 customers with names, emails, addresses and phone numbers posted on RaidForums; Bitdefender reports recipients got fake devices with a letter falsely claiming to be a post-breach replacement). The exact start date of the mailings is not established in the sources cited.

Purchase-channel discipline (vendor's authorised retail channels only) is the binding mitigation.

## T11.007.002 — Physical-Access Hardware-Side Seed Extraction

Voltage-glitching, side-channel, or chip-tampering attacks against a legitimate hardware wallet's microcontroller requiring physical access to the device.

Canonical capability anchor: **Trezor One / Model T RDP-downgrade voltage-glitch attack — Kraken Security Labs disclosure, 2020-01-31.** The STM32F205/STM32F427 microcontroller's Read Protection (RDP) feature could be downgraded from RDP2 to RDP1 by voltage-glitching the MCU's VDD pin during boot-up, exposing SRAM contents including the encrypted seed over the ARM SWD debugging interface. Physical access requirement: approximately 15 minutes. Equipment cost: several hundred dollars (2020); Kraken estimated a mass-produced consumer glitching device at about \$75. Kraken states the vulnerability cannot be fixed by firmware (the glitch targets the BootROM) and needs a new hardware revision. See `examples/2020-01-trezor-kraken-rdp-downgrade.md`.

The BIP39 passphrase is the defender-side mitigation primitive: an attacker who extracts the seed obtains an encrypted seed that, without the passphrase, opens an empty decoy wallet. Newer Trezor products (Safe 3/Safe 5, 2023–2024) ship with a dedicated EAL6+ certified secure element addressing the structural vulnerability.

Ledger Nano series uses a dedicated secure element and is not vulnerable to the STM32-class voltage-glitch attack.

## Public references

- `[kraken2020trezor]` — Kraken Security Labs, "Kraken Identifies Critical Flaw in Trezor Hardware Wallets" (2020-01-31): <https://blog.kraken.com/product/security/kraken-identifies-critical-flaw-in-trezor-hardware-wallets>
- `[block2020trezor]` — The Block, "Kraken Security Labs: Hackers can exploit Trezor hardware wallets with only 15 minutes of physical access to the device" (2020-01-31): <https://www.theblock.co/news/markets/2020-01-31-kraken-security-labs-hackers-can-exploit-trezor-hardware-wallets-with-only-15-minutes-of-physical-access-to-the-device-54631>
- `[block2020ledger]` — The Block, "A detailed look at the Ledger data leak and other recent incidents": <https://www.theblock.co/post/88706/a-detailed-look-at-the-ledger-data-leak-and-other-recent-incidents>
- `[bitdefender2020ledger]` — Bitdefender Hot for Security, "Fake Ledger devices mailed out in attempt to steal from cryptocurrency fans": <https://hotforsecurity.bitdefender.com/blog/fake-ledger-devices-mailed-out-in-attempt-to-steal-from-cryptocurrency-fans-25991.html>
- `[ledgersecondhand]` — Ledger, "Scam: second-hand Ledger device" (dated 01/12/2018 on the page): <https://ledger.com/scam-second-hand-ledger-device>
