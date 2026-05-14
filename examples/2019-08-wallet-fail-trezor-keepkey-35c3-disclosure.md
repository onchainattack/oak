# Wallet.fail Trezor / KeepKey Hardware-Side Seed Extraction Disclosure — 35C3 — 2018-12-27

**Loss:** $0 realised on-chain loss. The Wallet.fail team disclosed vulnerabilities to vendors under coordinated disclosure before public presentation; no public exploit was released against live user funds.
**OAK Techniques observed:** **OAK-T11.007.002** (Physical-Access Hardware-Side Seed Extraction — primary; STM32F205 microcontroller physical-access attack extracting the encrypted seed from Trezor One). **OAK-T11.007.001** (Counterfeit-Hardware Substitution — the disclosure covered multiple hardware wallets; the KeepKey MCU-glitching attack shared the counterfeit-device threat-model surface).
**Attribution:** **identified** — Dmitry Nedospasov (Wallet.fail), Thomas Roth (leveldown security), and Josh Datko (Cryptotronix) disclosed at 35C3 (35th Chaos Communication Congress) in Leipzig, Germany, December 27, 2018. Coordinated disclosure to vendors prior to public presentation.
**Key teaching point:** **The Wallet.fail 35C3 disclosure is the first multi-vendor, multi-vector public demonstration that hardware wallets based on general-purpose microcontrollers without a dedicated secure element are structurally vulnerable to physical-access seed extraction. The disclosure covered Trezor One (STM32F205 MCU glitching), KeepKey (MCU glitching), and Ledger (side-channel attacks against the ST31G480 secure element — more difficult but demonstrated). The disclosure is the class-establishing moment for T11.007.002: it precedes the Kraken Security Labs RDP-downgrade disclosure (January 2020) by 13 months and established the STM32-class vulnerability as a public research finding.**

## Summary

At the 35th Chaos Communication Congress (35C3) in Leipzig on December 27, 2018, the Wallet.fail research team (Dmitry Nedospasov, Thomas Roth, Josh Datko) presented "Wallet.fail: How to Steal Millions in Cryptocurrency from Hardware Wallets" — the first multi-vendor public demonstration of physical-access seed extraction from multiple leading hardware wallet models.

Key findings:

- **Trezor One (STM32F205):** The team demonstrated MCU voltage-glitching to extract the encrypted seed from the general-purpose STM32F205 microcontroller. The attack required physical access to the device for approximately 15 minutes and modest hardware-hacking equipment. The STM32F205's lack of a dedicated secure element (no active countermeasures against voltage-glitching, no tamper-responsive key zeroization) was the load-bearing vulnerability.

- **KeepKey:** Similar MCU-glitching attack against the KeepKey's microcontroller. KeepKey shared the Trezor One's STM32-based architecture and was vulnerable to the same class of physical-access extraction.

- **Ledger Nano S (ST31G480 dual-chip architecture):** The team demonstrated side-channel attacks against the ST31G480 secure element. The attack was more difficult than the STM32-class attacks (the secure element had active countermeasures) but the researchers demonstrated partial key-material leakage. The Ledger's dual-chip architecture (STM32F042 + ST31G480 secure element) made extraction substantially harder than the single-chip STM32 designs of Trezor and KeepKey.

- **Supply-chain attack demonstration:** The team also demonstrated a counterfeit-device supply-chain attack — pre-flashing a Trezor One with modified firmware that appeared to function normally but exfiltrated the seed on first USB connection. This demonstration bridged T11.007.001 (counterfeit substitution) and T11.007.002 (physical-access extraction).

The disclosure was coordinated with vendors (SatoshiLabs/Trezor, KeepKey, Ledger) before the public presentation. All three vendors acknowledged the findings and published responses. SatoshiLabs noted that the MCU-glitching attack was a known property of the STM32 architecture and that the BIP39 passphrase was the recommended mitigation. Ledger noted that the side-channel attack was partially mitigated by the secure element's countermeasures and that the dual-chip architecture provided defense-in-depth.

The 35C3 disclosure is the class-establishing moment for T11.007.002 as a public research finding. The Kraken Security Labs RDP-downgrade disclosure (January 31, 2020) subsequently provided a cleaner, more reproducible attack primitive (voltage-glitching the STM32's RDP protection to downgrade it from RDP2 to RDP1), but the 35C3 disclosure was the first to publicly frame the STM32-class vulnerability as a generalisable attack class across multiple vendors.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-2018-12 | Wallet.fail team researches hardware-wallet physical-access attacks; coordinated disclosure to SatoshiLabs, KeepKey, Ledger | (pre-disclosure) |
| 2018-12-27 | Wallet.fail presents at 35C3 in Leipzig: Trezor One STM32F205 MCU glitching, KeepKey MCU glitching, Ledger Nano S side-channel, supply-chain firmware substitution demonstration | **T11.007.002 class-establishing disclosure** |
| 2018-12 to 2019-01 | Vendor responses published: SatoshiLabs notes BIP39 passphrase as mitigation; KeepKey acknowledges findings; Ledger notes secure-element countermeasures | (vendor response) |
| 2020-01-31 | Kraken Security Labs RDP-downgrade disclosure — cleaner, more reproducible STM32 attack primitive; $0 realised loss | **T11.007.002 canonical capability anchor** |
| 2023–2024 | Trezor Safe 3 / Safe 5 ship with EAL6+ certified secure element, addressing the STM32-class vulnerability at the hardware layer | (vendor hardware remediation) |

## Realised extraction

$0. Coordinated disclosure; no public exploit released against live user funds. The disclosure's value is in establishing the attack class as a public research finding rather than in realised extraction.

## Public references

- Wallet.fail 35C3 presentation — "Wallet.fail: How to Steal Millions in Cryptocurrency from Hardware Wallets" (December 27, 2018, Leipzig).
- SatoshiLabs / Trezor response to 35C3 disclosure — acknowledged STM32-class vulnerability; recommended BIP39 passphrase.
- Ledger response to 35C3 disclosure — noted secure-element countermeasures and dual-chip defense-in-depth.
- KeepKey response to 35C3 disclosure.
- Cross-reference: T11.007.002 (Physical-Access Hardware-Side Seed Extraction) at `techniques/T11.007.002-physical-access-hardware-seed-extraction.md`.
- [`examples/2020-01-trezor-kraken-rdp-downgrade.md`](../examples/2020-01-trezor-kraken-rdp-downgrade.md) — Kraken Security Labs RDP-downgrade disclosure (canonical T11.007.002 capability anchor; January 2020).
