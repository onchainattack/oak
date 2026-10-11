# Wallet.fail Trezor / Ledger Hardware-Wallet Attacks — 35C3 — 2018-12-27

**Loss:** $0 realised on-chain loss. This was a conference disclosure of attacks requiring physical access or proximity; no live-fund theft was reported.
**OAK Techniques observed:** **OAK-T11.007.002** (Physical-Access Hardware-Side Seed Extraction — primary; fault injection against the Trezor One's STM32F2 microcontroller to extract key and PIN from RAM). **OAK-T11.007.001** (Counterfeit-Hardware Substitution — the supply-chain demonstration swapped the microcontroller in a resealed device).
**Attribution:** **unattributed** — Dmitry Nedospasov, Thomas Roth, and Josh Datko presented at 35C3 (35th Chaos Communication Congress) in Leipzig, Germany, December 2018.
**Key teaching point:** **The Wallet.fail talk showed that hardware wallets built around general-purpose microcontrollers could be attacked through fault injection, bootloader flaws, tamper-seal bypass with component swap, and (for Ledger Blue) a radio side channel — and that vendors disputed the practicality of physical-access attacks.** It is a public research anchor for T11.007.002, with the caveat that the Trezor fault-injection finding built on a flaw first found in 2017.

**Corrected 2026-10-11:** Removed KeepKey (not mentioned in contemporaneous coverage), the Ledger "secure-element side-channel" claim (the Nano S finding was a bootloader/programming-port flaw; the side channel was against Ledger Blue), the Trezor-specific counterfeit-firmware demo, the "15 minutes" figure, the claim of vendor-coordinated disclosure (Trezor said it was not informed of details beforehand), and unsourced vendor-hardware rows.

## Summary

At 35C3 in Leipzig in late December 2018, Dmitry Nedospasov, Thomas Roth and Josh Datko presented "wallet.fail", covering firmware, side-channel, microcontroller and supply-chain attacks on hardware wallets `[secaffairs]``[threatpost]`.

Reported findings:

- **Trezor One:** A fault-injection attack on the STM32F2 microcontroller: by interrupting a firmware upgrade before RAM was cleared, the researchers could extract the private key and PIN from a RAM dump. Trezor had patched a different fault-injection bug found in 2017 `[threatpost]``[secaffairs]`.
- **Ledger Nano S:** A bootloader flaw, an enabled programming port, allowed flashing custom firmware (demonstrated with a Snake game) and bypassing a memory-region blacklist `[threatpost]``[secaffairs]`.
- **Ledger Blue:** A radio side channel (antenna and software-defined radio, with machine learning) recovered PIN digits with roughly 90% accuracy at close proximity `[threatpost]``[secaffairs]`.
- **Supply chain:** Tamper-evident seals were removed with a hair dryer and the microcontroller swapped for one running a custom bootloader, or an RF transmitter added `[secaffairs]``[threatpost]`.

Vendors responded on 2018-12-28. Ledger called the attacks impractical and said no seed or PIN was extracted from a stolen device. Trezor said it was not informed ahead of time about the details, that the flaw is physical and requires breaking into the case, and that it would address it as soon as possible `[threatpost]`.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2018-12 (late) | Wallet.fail presented at 35C3, Leipzig: Trezor One fault injection, Ledger Nano S bootloader flaw, Ledger Blue side channel, supply-chain component swap | **T11.007.002** / T11.007.001 |
| 2018-12-28 | Ledger and Trezor publish responses | (vendor response) |
| 2020-01-31 | Kraken Security Labs RDP-downgrade disclosure on the Trezor; see linked example | T11.007.002 |

## Realised extraction

$0. A research disclosure; no theft of user funds was reported in the cited coverage.

## Public references

- `[secaffairs]` — Security Affairs, "During the 35c3 conference held in Leipzig, Germany, the researchers..." (2019-01-01): <https://securityaffairs.com/?p=79367>
- `[threatpost]` — Threatpost, "Cryptocurrency Wallet Hacks Spark Dustup" (2018-12-31): <https://threatpost.com/cryptocurrency-wallet-hacks-spark-dustup/>
- Cross-reference: T11.007.002 (Physical-Access Hardware-Side Seed Extraction) at `techniques/T11.007.002-physical-access-hardware-seed-extraction.md`.
- [`examples/2020-01-trezor-kraken-rdp-downgrade.md`](../examples/2020-01-trezor-kraken-rdp-downgrade.md) — Kraken Security Labs RDP-downgrade disclosure (canonical T11.007.002 capability anchor; January 2020).
