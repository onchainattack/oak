# OAK-T11 — Custody and Signing Infrastructure

**Phase:** Targeted compromise
**Adjacent tactics:** T7 (Laundering), T8 (Operational Reuse), T10 (Bridge and Cross-Chain — adjacent because validator-key compromise patterns overlap conceptually)

## Scope

Custody and Signing Infrastructure covers attack classes that compromise the off-chain custody, signing, or wallet-distribution surface of cryptocurrency holdings — producing on-chain extraction events whose authority appears legitimate at the on-chain layer. Bybit (Feb 2025, \~\$1.46B), Atomic Wallet (June 2023, \~\$100M), and WazirX (July 2024, \~\$234.9M) are the canonical examples; cumulatively these three incidents alone account for more than \$1.8B in losses.

T11 is intentionally distinct from T10 (Bridge and Cross-Chain) even though both involve signing-key or signing-flow compromise: T10 is bridge-infrastructure-specific (validator messages, cross-chain semantics), while T11 covers the broader class of custody-and-signing infrastructure compromise across centralised exchanges, custodial wallet services, multisig vendors, and end-user wallet software distribution channels.

T11 is also distinct from T9 (Smart-Contract Exploit) because the on-chain authority that the attacker exercises is, at the contract-correctness layer, valid — the compromise lives at the off-chain layer that produced or distributed the signing keys / authority. The defender's challenge is that on-chain detection arrives too late; T11 mitigation lives at the off-chain operational-security layer (vendor-relationship management, supply-chain controls, signing-flow architecture).

## What defenders observe

- Single-transaction or short-burst extraction events from cold wallets, hot wallets, or custodial multisigs at exchanges and custody services, where the on-chain authorisation appears valid.
- Wallet-software-update events at end-user wallet vendors that produce subsequent extractions across the wallet's user base.
- Multisig contract upgrade or modification events at custodial venues whose authority artefact subsequently changes.
- Off-chain disclosure of supply-chain compromise at signing-infrastructure vendors (e.g., Safe{Wallet} developer workstation compromise post-Bybit) — typically published within days-to-weeks post-incident.

## Relationship to other tactics

T11 events typically chain into T7.003 (Cross-Chain Bridge Laundering) — the canonical post-2022 Lazarus laundering rail — and contribute to OAK-T8.001 (Common-Funder Cluster Reuse) at the operator-attribution layer. The dollar-loss-prevented metric for T11 is most sensitive to the off-chain operational-security layer, not to the on-chain detection layer; OAK documents this explicitly in each Technique page.

## Techniques in this Tactic (v0.1)

- OAK-T11.001 — Third-Party Signing-Vendor UI / Signing-Flow Compromise
- OAK-T11.002 — Wallet-Software Distribution Compromise
- OAK-T11.003 — In-Use Multisig Smart-Contract Manipulation
- OAK-T11.004 — Insufficient-Entropy Key Generation
- OAK-T11.005 — Operator-Side Fake-Platform Fraud
- OAK-T11.006 — Cold-Storage Seed Phrase Exfiltration at Rest
- OAK-T11.007 — Hardware-Wallet Supply-Chain / Physical-Access Compromise
- OAK-T11.008 — Embedded-Wallet Identity-Provider Compromise
- OAK-T11.009 — Trader-Tooling Supply-Chain ENV-Key Compromise

## Maintainer notes

T11 is an explicit response to the v0.1 TAXONOMY-GAPS observation that Bybit-class incidents have an off-chain entry vector that the OAK on-chain Tactic taxonomy did not cover. Adding T11 as a first-class Tactic (rather than continuing to footnote the entry vector in worked examples) brings OAK's coverage of the largest single class of public crypto theft (DPRK / Lazarus-attributed CEX, custody, and wallet-vendor compromises) into the formal taxonomy. Per `[chainalysis2024dprk]`, this is the single largest attribution category in modern crypto theft by aggregate dollar value.

Worked examples for T11.001 and T11.002 are linked from the corresponding Technique pages and from `actors/OAK-G01-lazarus.md`.
