# OAK-S03 — Pink Drainer

**Type:** drainer-kit
**Aliases:** Pink, Pinkdrainer, "Pink-X" (occasional industry shorthand for the operator-of-record team behind the kit).
**Active:** yes — in market since approximately mid-2023.
**First observed:** approximately mid-2023.
**Used by Groups:** OAK-G02 (Drainer-as-a-Service)
**Observed Techniques:** OAK-T4.001 (Permit2 Authority Misuse, primary), OAK-T4.002 (Compromised Front-End Permit Solicitation), OAK-T4.004 (Allowance / Approve-Pattern Drainer), OAK-T4.005 (setApprovalForAll NFT Drainer), OAK-T4.006 (WalletConnect Session Hijack — observed on selected high-value individual extractions), OAK-T7.001 (Mixer-Routed Hop), OAK-T7.003 (Cross-Chain Bridge Laundering), OAK-T8.001 (Common-Funder Cluster Reuse).
**Targets:** EVM-chain wallet holders, including selected high-net-worth individuals; affiliate-driven phishing alongside operator-run high-value extractions. Both fungible-token and NFT drains within scope.

## Description

Pink Drainer is one of the most-tracked named drainer kits within OAK-G02, distinguished from peer kits by a hybrid commercial model: in addition to renting the kit to affiliates on a take-of-proceeds basis (canonical for the category), the Pink operator-team has been industry-attributed to running its own targeted scams against named high-value individuals. Reporting linked to Pink includes multiple individual extractions in the multi-million-dollar range — for example, the publicly-reported approximately $4.2M extraction from Bo Hines in 2024 (`[scamsniffer2024pink]`).

The kit's affiliate-distribution pattern is consistent with the rest of OAK-G02: compromised or counterfeit Discord servers, fake "claim airdrop" / "extra mint" announcements, impersonated protocol UIs, and X / Twitter promo posts. Per `[checkpoint2023drainers]`, Pink's recurring on-chain spender addresses were observable alongside Inferno's and Angel's from 2023 onward and feed the same wallet-vendor warning lists and exchange-side deposit-screening rules.

Pink's distinguishing feature for OAK-G02 attribution work is the operator-run-extractions overlay: where Inferno's and Angel's per-incident attribution typically lands on the *affiliate* (and OAK-G02 rolls up to **inferred-strong** only at the service-infrastructure cluster level), a subset of Pink-attributed thefts have been industry-reconstructed as direct operator activity. That subset is small relative to the affiliate-driven volume but is overrepresented in the high-dollar tail.

## Observed examples

- Reporting on the approximately $4.2M Bo Hines extraction in 2024, attributed to the Pink Drainer operator team (`[scamsniffer2024pink]`).
- Aggregate Pink-spender-cluster characterisation in `[checkpoint2023drainers]` and `[slowmist2024report]`.
- No dedicated per-incident example in [`examples/`](../examples/) as of v0.1; future contributors writing a Pink per-incident example should use the operator-profile framing of [`examples/2024-10-inferno-drainer-handover.md`](../examples/2024-10-inferno-drainer-handover.md).

## Detection / attribution signals

- **Pink-specific spender-cluster fingerprint.** Per `[checkpoint2023drainers]`, Pink's on-chain spender re-use exhibits a separate cluster from Inferno / Angel, observable since 2023 and suitable for inclusion in wallet-vendor warning lists.
- **Hybrid take-percentage signature.** Affiliate-driven Pink flows show the canonical ~80% / ~20% two-output split (similar to Inferno / Angel); operator-run extractions show single-recipient consolidation without an affiliate split — a useful operator-vs-affiliate mode-discriminator on a per-incident basis.
- **High-value-target reconnaissance signal.** A subset of Pink-attributed extractions are preceded by on-chain reconnaissance (test transactions to known whale addresses, cross-checking against known social-media accounts), distinguishing operator-run targeted activity from affiliate-driven mass-phishing volume.
- **WalletConnect-session-hijack overlay (OAK-T4.006).** Several Pink-attributed targeted extractions have used WalletConnect-session-hijack flows in addition to canonical Permit2 / approve flows; this is more characteristic of Pink than of broader-category affiliates.
- **Cluster-funder pattern.** Canonical OAK-T8.001 funder-graph pattern, shared with the broader category.

## Citations

- `[checkpoint2023drainers]` — recurring on-chain spender addresses tied to Pink alongside Angel and Inferno; 2023 baseline characterisation.
- `[slowmist2024report]` — Pink as a category peer in 2024 wallet-drainer market-share decomposition.
- `[scamsniffer2024pink]` — industry reporting on Pink-attributed individual extractions, including the approximately $4.2M Bo Hines extraction in 2024 (BibTeX entry to be added in a v0.x update).

## Discussion

Pink Drainer is the canonical OAK-G02 case for the *hybrid* operator-and-rent-out model: most G02-category kits behave as pure rental services where affiliates do the per-victim work and the operator collects a cut, but Pink has been industry-tracked running its own targeted high-value extractions in parallel. This complicates per-incident attribution within the OAK framework — a Pink-attributed incident may be **inferred-weak** at the named-affiliate level (canonical for the category) or **inferred-strong** at the named-operator level (rarer, but more frequent for Pink than for peers).

For defenders, the practical implication is that Pink-attributed activity does not collapse cleanly to a single attribution-level rating across the corpus; per-incident write-ups in this category should be explicit about whether the attribution lands at the affiliate-execution layer or at the operator-run-extraction layer. Pink does not appear to have been part of the October 2024 Inferno → Angel handover; its lineage is parallel rather than upstream or downstream of the Inferno → Angel chain.
