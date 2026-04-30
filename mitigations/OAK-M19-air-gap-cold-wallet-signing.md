# OAK-M19 — Air-Gap Cold-Wallet Signing

**Class:** operational
**Audience:** custody-customer
**Maps to Techniques:** T11.001, T11.002, T11.003

## Description

Air-gap cold-wallet signing is the operational discipline of holding the private keys controlling a cold (long-term storage) wallet on a machine that is never connected to an internet-bearing network. Transactions are constructed on an internet-connected workstation, transferred to the signer machine over a one-way physical channel (QR code via camera, audio modem, or write-only SD card), signed locally, then transferred back to the connected workstation for broadcast. The signer machine itself runs a minimal, pinned, integrity-verified software stack and is treated as a single-purpose appliance rather than a general-purpose host.

From a defender's perspective, M19 is the canonical custody-side mitigation for the class of attacks where the attacker compromises *how the customer-organisation interacts with its keys* rather than the keys themselves. T11.001 (vendor-side compromise of the signing UI), T11.002 (compromise of the wallet software's distribution channel), and T11.003 (in-use multisig contract manipulation gated by signer-host access) all share the property that an attacker positioned on the signer's connected host can substitute the destination, payload, or contract target of a transaction at sign time. Air-gap signing breaks the substitution surface: the signer machine sees only the structured payload it was handed, displays it on its own (un-compromised) screen, and produces a signature that the connected host cannot retroactively rewrite. The connected host can refuse to broadcast, but it cannot make the signer sign something other than what the signer's own display showed.

M19 does not by itself defeat every attack in this class — the attacker can still substitute the payload *before* it reaches the signer machine if the operator does not verify the destination on the signer's display, and the signer machine's own software supply chain is itself an attack surface. M19's value comes from collapsing the attack surface to a single, narrow, auditable layer (the signer-machine display + the signer-machine binary), which is then defended via the procurement-and-integrity-verification controls described under "How it applies".

## How it applies

- **T11.001 (Third-Party Signing / Custody Vendor Compromise):** the canonical Bybit-Feb-2025 failure mode. Safe{Wallet}'s compromised UI altered the destination of a routine cold-to-warm transfer at sign time. An air-gapped signer that displays the *actual* destination address on its own screen — read by the signing operator before signature confirmation — would have surfaced the destination mismatch before the signature was produced. M19 is the highest-leverage customer-side mitigation against T11.001 for cold-wallet operations; combine with M20 (vendor breach-notification SLA) for the residual surface where the attack lands during a window in which the customer's signer-machine integrity was itself compromised by the vendor.
- **T11.002 (Wallet Software Distribution Compromise):** the Atomic Wallet June 2023 cohort. M19 protects against host-side malicious-update extraction provided the air-gapped signer runs a *separately-sourced, separately-verified* wallet binary — not the same vendor's update channel as the connected host. Pair M19 with hardware-wallet integration for high-balance holdings: the hardware wallet's display is the trust anchor that must show the actual destination, not the connected-host UI's representation of it.
- **T11.003 (In-Use Multisig Smart-Contract Manipulation):** Wazirx-Liminal July 2024. M19 limits the attacker's ability to push a contract-modification transaction through a single compromised signer host: each signer must independently approve on their own air-gapped device, and the modification's calldata is visible to each signer. The destination-of-authority audit (see M22) is the load-bearing complement — M19 ensures each signer sees what they sign; M22 ensures they understand what the contract-modification calldata actually grants.

## Limitations

- **Signer-display verification is operator-dependent.** M19 produces a signal (the destination address on the signer's own screen) but does not enforce that the operator reads it. A signer who treats the air-gap step as a procedural rubber-stamp can sign a substituted destination just as readily on an air-gapped machine as on a connected one. Operator training and a hard procedural gate (e.g., the operator must read the last six characters of the destination aloud to a second person before confirming) is the binding control.
- **Air-gapped does not mean trustworthy.** The signer machine's own firmware, OS, and signing-software supply chain are themselves T11.002-class surfaces. Reproducible builds, signed binaries, hardware-attested boot, and one-way write provenance for the signer machine are necessary complements; M19 alone does not provide them.
- **Operational cost is significant.** The QR-code / SD-card transfer cycle adds minutes per signature, makes high-frequency operational signing impractical, and is poorly suited to hot-wallet flows. M19 is calibrated for cold-storage and high-value treasury operations; warm-wallet and operational-wallet flows trade some of M19's protection for throughput, with the scope of authorities held by warm wallets bounded accordingly.
- **One-way channels can leak.** Camera-based QR transfer is the dominant pattern but introduces optical-side-channel risk (ambient camera observation of the signer screen by an attacker-positioned third camera). SD-card transfer introduces malicious-firmware risk on the SD controller itself. Audio modem channels are slow and noisy. Each channel has its own attack surface; a procurement choice rather than a default.

## Reference implementations

- Hardware-wallet vendor integrations: Ledger / Trezor desktop apps with QR-based "PSBT" (Partially Signed Bitcoin Transaction) flows; Keystone / Cobo Vault as canonical purpose-built air-gap signers; GridPlus Lattice1 with SafeCard-based key isolation.
- Multisig coordinators with air-gap support: Specter Desktop, Sparrow Wallet (Bitcoin); Foundation Passport workflow.
- Institutional custody patterns: cold-storage vaults at major custodians (BitGo, Anchorage, Fireblocks legacy cold storage) implement variants of M19 internally; the customer-visible interface is typically the warm-wallet API, but the underlying signer-host isolation is M19-class.
- v0.1 OAK observation: M19 is well-understood at the institutional layer but unevenly adopted at the small-treasury / DAO-multisig layer where the dominant pattern is browser-based signing on the same host the operator uses for daily browsing — a T11.001 / T11.002 attack surface that M19 closes.

## Citations

- `[radiantpostmortem2024]` — Radiant Capital October 2024 incident; INLETDRIFT macOS backdoor on multiple developer laptops modified signed multisig transactions in flight. Canonical demonstration that signer-host integrity is the binding control; M19 is the architectural response.
- `[mandiantradiant2024]` — UNC4736 / Citrine Sleet attribution; DPRK-nexus signer-host targeting cluster.
- `[ellipticatomic2023]` — Atomic Wallet 2023; T11.002 cohort that M19-with-hardware-wallet defeats end-to-end.
- `[chainalysis2024dprk]` — broader OAK-G01 context for signer-host targeting as a recurring DPRK entry vector.
