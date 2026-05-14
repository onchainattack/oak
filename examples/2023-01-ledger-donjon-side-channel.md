# Ledger Donjon side-channel seed-extraction research — hardware — 2023

**Loss:** \$0 — coordinated disclosure by Ledger's internal security research team (Ledger Donjon). The research demonstrated side-channel extraction of a PIN from a Ledger Nano S via power-analysis, then extended to a supply-chain attack proof-of-concept involving a compromised anti-tamper mesh.
**OAK Techniques observed:** **OAK-T11.007.002** (Physical-Access Hardware-Side Seed Extraction) — primary; the Ledger Donjon research demonstrated that even secure-element-equipped hardware wallets (EAL5+ certified) are not immune to sophisticated physical-access side-channel attacks, though the attack complexity and equipment cost are materially higher than the STM32-class voltage-glitch attack. The research establishes the physical-access threat-model ceiling for secure-element hardware.
**Attribution:** **vendor self-disclosure** (Ledger Donjon internal security research team). No attacker attribution applicable — the research was a coordinated disclosure to improve the product's security posture.
**Key teaching point:** **The Ledger Donjon side-channel research demonstrates that T11.007.002 is a spectrum, not a binary — the STM32-class voltage-glitch attack (Kraken/Trezor) requires ~15 minutes and ~\$500 in equipment, while the Ledger secure-element-class side-channel attack requires sophisticated laboratory equipment and expertise, but both fall under the same physical-access threat model.** The defender guidance: secure-element hardware (Ledger Nano, Trezor Safe 3/5) raises the attack cost from commodity to laboratory-grade, but the physical-access threat model is never entirely eliminated.

## Summary

Ledger Donjon is Ledger's internal security research team, responsible for attacking Ledger's own hardware wallets to identify and remediate vulnerabilities before they are exploited in the wild. In 2023, the Donjon team published research demonstrating two attack classes against Ledger hardware wallets:

1. **Side-channel PIN extraction:** Using power-analysis techniques (differential power analysis / DPA), the team demonstrated extraction of the device PIN from a Ledger Nano S by monitoring the device's power consumption during PIN-entry processing. The PIN gates access to the device's secure element; without the PIN, the attacker cannot sign transactions. The attack required physical access to the device plus an oscilloscope and power-analysis probe — laboratory-grade equipment rather than the commodity hardware-hacking tools sufficient for the STM32-class voltage-glitch attack.

2. **Supply-chain anti-tamper-mesh bypass proof-of-concept:** The team demonstrated a supply-chain-attack variant where the device's anti-tamper mesh (a physical security feature of the secure element packaging) could be bypassed if the attacker had access to the device during manufacturing. This is a supply-chain-attack vector (adjacent to T11.007.001, Counterfeit-Hardware Substitution) but the physical-access extraction dimensions place it within the T11.007.002 spectrum.

Both attacks were disclosed to Ledger's engineering team and remediated in hardware revisions. The research established the physical-access threat-model ceiling for secure-element-equipped hardware: sophisticated laboratory-grade attacks are possible, but the equipment cost and expertise required are orders of magnitude above the commodity hardware-hacking tools sufficient for the STM32-class attack (Kraken/Trezor, ~\$500, ~15 minutes).

For OAK's purposes, the Ledger Donjon research establishes that T11.007.002 is a spectrum: the attacker's physical-access window and equipment budget determine which hardware class is vulnerable. STM32-based hardware (Trezor One, Trezor Model T) is vulnerable at the commodity level; secure-element hardware (Ledger Nano, Trezor Safe 3/5) requires laboratory-grade attacks that are operationally harder but not impossible.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023 | Ledger Donjon team conducts internal security research; demonstrates side-channel PIN extraction via power analysis on Ledger Nano S | **T11.007.002** (research phase) |
| 2023 | Supply-chain anti-tamper-mesh bypass proof-of-concept demonstrated | T11.007.002 (adjacent T11.007.001 surface) |
| 2023 | Findings disclosed to Ledger engineering; remediated in hardware revisions | (coordinated disclosure) |
| 2023 | Research published; establishes physical-access threat-model ceiling for secure-element hardware | (public transparency) |

## Realised extraction

\$0 — vendor self-disclosure. No on-chain exploitation occurred.

## Public references

- Cross-reference: T11.007.002 at `techniques/T11.007.002-physical-access-hardware-seed-extraction.md`.
- Cross-reference: 2020-01-trezor-kraken-rdp-downgrade at `examples/2020-01-trezor-kraken-rdp-downgrade.md` (canonical T11.007.002 anchor, Trezor/Kraken voltage-glitch).
- Cross-reference: 2019-08-wallet-fail-trezor-keepkey-35c3-disclosure at `examples/2019-08-wallet-fail-trezor-keepkey-35c3-disclosure.md` (Wallet.fail 35C3 disclosure, class-establishing moment).

## Public References

See citations in corresponding technique file.
