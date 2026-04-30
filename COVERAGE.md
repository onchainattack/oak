# OAK v0.1 — Coverage Matrix

This document publishes the honest coverage status of every Technique in v0.1, mapped against the first reference implementation (`mg-detectors-rs`). Coverage is reported as one of:

- **full** — implementation covers the Technique end-to-end, with calibrated thresholds and tests.
- **partial** — implementation covers the Technique under restricted conditions or with un-calibrated thresholds; gaps documented.
- **gap** — Technique is documented in OAK but no production reference implementation exists yet; calibration and detection methodology are open work items.

OAK's credibility depends on reporting these honestly. Vendors who submit Reference-implementation entries are expected to follow the same convention.

`mg-detectors-rs` is an operator-behaviour detector; its scope cleanly covers T1–T8. T9 (Smart-Contract Exploit) is a protocol-layer Tactic and is uniformly **gap** against MG at v0.1 — protocol-layer detection is provided by other tooling (Forta, OpenZeppelin Defender, BlockSec PhalconHQ, audit firms with continuous-monitoring services). T10 (Bridge), T11 (Custody), T12 (NFT), T13 (Account Abstraction), and T14 (Validator/Staking) are similarly out of MG's operator-behaviour-detector scope and are uniformly **gap** for v0.1 against MG; vendor-side coverage from protocol-and-infrastructure-monitoring tools is the v0.x evolution surface. The two-dimensional matrix planned for v0.5 will surface this orthogonality cleanly.

This document covers the **Techniques axis** specifically. The other v0.1 axes — Mitigations (40 entries), Software (40 entries), Threat Actors (18 entries), Data Sources (12 entries), and Worked Examples (142 entries) — are not "covered" in the implementation-status sense; they are tracked as catalogue entries with citation-quality verification status. See the Other-axes section below for the per-axis status convention.

---

## Tactic-level summary (v0.1)

| Tactic | Techniques | Full | Partial | Gap |
|---|---:|---:|---:|---:|
| OAK-T1 — Token Genesis | 5 | 2 | 3 | 0 |
| OAK-T2 — Liquidity Establishment | 4 | 1 | 1 | 2 |
| OAK-T3 — Holder Capture | 3 | 3 | 0 | 0 |
| OAK-T4 — Access Acquisition | 6 | 1 | 1 | 4 |
| OAK-T5 — Value Extraction | 6 | 3 | 0 | 3 |
| OAK-T6 — Defense Evasion | 4 | 0 | 0 | 4 |
| OAK-T7 — Laundering | 6 | 0 | 1 | 5 |
| OAK-T8 — Operational Reuse | 2 | 1 | 0 | 1 |
| OAK-T9 — Smart-Contract Exploit | 5 | 0 | 0 | 5 |
| OAK-T10 — Bridge and Cross-Chain | 5 | 0 | 0 | 5 |
| OAK-T11 — Custody and Signing Infrastructure | 3 | 0 | 0 | 3 |
| OAK-T12 — NFT-Specific Patterns | 3 | 0 | 0 | 3 |
| OAK-T13 — Account Abstraction Attacks | 3 | 0 | 0 | 3 |
| OAK-T14 — Validator/Staking/Restaking Attacks | 3 | 0 | 0 | 3 |
| **Total** | **58** | **11** | **6** | **41** |

T6 (Defense Evasion) is intentionally not populated with standalone Techniques in v0.1; evasion patterns are listed as parent tactics on the Technique they modify (e.g., OAK-T2.002 lists T2 + T6 as parents). Standalone T6 entries are scheduled for a v0.x update.

T9 (Smart-Contract Exploit) and T10 (Bridge and Cross-Chain) are uniformly gap against `mg-detectors-rs` because protocol-layer and bridge-infrastructure detection are out of MG's scope. The expected v0.x evolution is to surface vendor-side coverage from protocol-monitoring tools (Forta, OpenZeppelin Defender, BlockSec PhalconHQ) and bridge-specialist audit firms (Halborn, Trail of Bits, OpenZeppelin) via the multi-implementation matrix planned for v0.5.

---

## Per-Technique status

| Technique | Status | Reference implementation | Notes |
|---|---|---|---|
| OAK-T1.001 — Modifiable Tax Function | full | `mg-detectors-rs` D01 | Static analysis + simulation; calibrated. |
| OAK-T1.002 — Token-2022 Permanent Delegate | full | `mg-detectors-rs` D01 + D07 | Binary check on mint extension list. |
| OAK-T1.003 — Renounced-But-Not-Really (Proxy-Upgrade Backdoor) | partial | `mg-detectors-rs` D03 (EVM) | Covers: EIP-1967 admin-slot direct read, transparent-proxy / UUPS authority enumeration, OpenZeppelin Ownable-style multi-role mapping on EVM. Excludes: non-EIP-1967 custom proxy patterns, Solana program upgrade authority (different model), diamond-pattern (EIP-2535) facet authority. Token Sniffer / GoPlus / RugCheck cover the EVM standard-proxy surface. |
| OAK-T1.004 — Blacklist / Pausable Transfer Weaponization | partial | `mg-detectors-rs` D04 | Covers: ERC-20 static transfer-gate analysis (blacklist mapping reads, paused() guards) + dynamic transfer simulation against deployer / random / victim address tuples on EVM. Excludes: ERC-721/1155 transfer-gate variants, Solana SPL freeze-authority (covered separately under T1.002 family), upgrade-introduced blacklist (post-deploy-only via T1.003). Token Sniffer / GoPlus / RugCheck cover the ERC-20 surface. |
| OAK-T1.005 — Hidden Fee-on-Transfer | partial | `mg-detectors-rs` D04 | Covers: ERC-20 static fee-branch predicate enumeration + multi-axis (caller / counterparty / size / time) simulation matrix on EVM. Excludes: SPL Token-2022 transfer-fee extension (covered under T1.002), ERC-721/1155 (no canonical fee-on-transfer surface), rebasing-token mechanic (separate failure mode). Token Sniffer / GoPlus / RugCheck / Honeypot.is cover the EVM ERC-20 surface. |
| OAK-T2.001 — Single-Sided Liquidity Plant | full | `mg-detectors-rs` D10 | Threshold calibration per chain documented. |
| OAK-T2.002 — Locked-Liquidity Spoof | partial | `mg-detectors-rs` D02 | Cross-chain locker references not yet covered. |
| OAK-T2.003 — Cross-Chain Locked-Liquidity Spoof | gap | out of MG single-chain scope | Cross-chain lock-receipt-to-pool resolution; unified cross-chain locker registry with per-chain bytecode hashes does not exist as of v0.1. |
| OAK-T2.004 — Initial-Liquidity Backdoor | gap | out of MG production scope | Pool-creation-transaction trace + LP-mint-recipient + per-admin-role enumerator are documented detection primitives but not production in MG; Token Sniffer / GoPlus / RugCheck cover the EVM Uniswap-V2 / V3 pool-creation surface only, no Solana / Sui / Aptos pool-creation parity. |
| OAK-T3.001 — Sybil-Bundled Launch | full | `mg-detectors-rs` D08 | Funder-graph depth calibrated for EVM + Solana. |
| OAK-T3.002 — Wash-Trade Volume Inflation | full | `mg-detectors-rs` D05 | Single-venue; multi-venue gap documented in Technique page. |
| OAK-T3.003 — Coordinated Pump-and-Dump | full | `mg-detectors-rs` D04 | Confidence-band reporting per Technique page. |
| OAK-T4.001 — Permit2 Authority Misuse | full | `mg-detectors-rs` D12 | On-chain layer; wallet-UX layer out of scope. |
| OAK-T4.002 — Compromised Front-End Permit | partial | `mg-detectors-rs` partial | Requires off-chain DNS/hosting telemetry input. |
| OAK-T4.003 — Address Poisoning | gap | wallet-UX layer, out of MG scope | Detection lives at the wallet UX (full-address verification, lookalike detection); on-chain detection is post-event only. |
| OAK-T4.004 — Allowance / Approve-Pattern Drainer | gap | wallet-UX layer, out of MG scope | Approval-event monitoring + per-spender-cluster heatmaps live at wallet vendors and risk-team layer. |
| OAK-T4.005 — setApprovalForAll NFT Drainer | gap | wallet-UX layer, out of MG scope | Marketplace-operator allowlisting is the canonical wallet-side mitigation; Discord-compromise vector requires off-chain integration. |
| OAK-T4.006 — WalletConnect Session Hijack | gap | wallet-UX + app-store-moderation layer, out of MG scope | Per-dApp domain / app-store-package allowlisting at session-establishment time; chains into T4.001 / T4.004 / T4.005 for the actual extraction. |
| OAK-T5.001 — Hard LP Drain | full | `mg-detectors-rs` D02 | Real-time + pre-event correlation with T2 signals. |
| OAK-T5.002 — Slow LP Trickle Removal | gap | calibration in progress | Window/threshold calibration is open research item. |
| OAK-T5.003 — Hidden-Mint Dilution | full | `mg-detectors-rs` D06 | Per-chain mint-authority semantics covered. |
| OAK-T5.004 — Sandwich / MEV Extraction | full | `mg-detectors-rs` D13 | Public datasets; well-characterized in literature. |
| OAK-T5.005 — Treasury-Management Exit | gap | calibration in progress | Treasury-balance + destination-clustering primitives in MG scope; off-chain budget-document ingestion + stated-purpose reconciliation are open work items. |
| OAK-T5.006 — Vesting Cliff Dump | gap | calibration in progress | Per-recipient-cluster outflow monitoring around scheduled cliffs; token-unlock-tracker calendar integration (TokenUnlocks/Tokenomist, CryptoRank, DefiLlama Unlocks). |
| OAK-T6.001 — Source-Verification Mismatch | gap | out of MG production scope | Deterministic-recompile-against-verified-source is the canonical detection methodology and is in scope for MG's static-analysis surface conceptually but not implemented at v0.1 (no production pipeline binding solc / vyper / cairo / anchor toolchain versions to verified-source metadata). Etherscan / Sourcify / Routescan provide the verified-source substrate; recompile-and-compare automation is an open work item. |
| OAK-T6.002 — Fake Audit-Claim | gap | off-chain audit-registry verification, out of MG scope | Audit-firm public-registry verification is the canonical user-side mitigation. |
| OAK-T6.003 — Audit-of-Different-Bytecode-Version | gap | off-chain audit-attestation verification, out of MG scope | Audit-firm-published bytecode-hash vs deployed bytecode comparison; machine-readable cryptographic audit attestations as canonical mitigation. |
| OAK-T6.004 — Audit-Pending Marketing Claim | gap | off-chain audit-claim verification, out of MG scope | Verifiable audit-engagement attestations + audit-firm public-registry verification + post-listing audit-status decay monitoring as canonical user-side and venue-side mitigation. |
| OAK-T7.001 — Mixer-Routed Hop | partial | `mg-detectors-rs` cluster-graph only | Direct privacy-service heuristics not yet implemented. |
| OAK-T7.002 — CEX Deposit-Address Layering | gap | exchange-compliance layer, out of MG scope | Per-cluster aggregate inflow tracking + threshold-structuring detection on deposit-amount distribution. |
| OAK-T7.003 — Cross-Chain Bridge Laundering | gap | cross-chain forensic layer, out of MG scope | Cross-chain attribution graphs + per-protocol illicit-cluster inflow metrics; Chainalysis / TRM / Elliptic provide vendor-side coverage. |
| OAK-T7.004 — NFT Wash-Laundering | gap | wallet-and-marketplace layer, out of MG scope | Per-trade source-of-funds analysis + per-cluster wash-trade-rate metrics at marketplace layer. |
| OAK-T7.005 — Privacy-Chain Hops | gap | cross-chain forensic + CEX-compliance layer, out of MG scope | Pre-privacy-chain CEX deposit attribution + post-privacy-chain re-emergence inferential heuristics; CEX delisting / Travel Rule policy. |
| OAK-T7.006 — DeFi Yield-Strategy Laundering | gap | DeFi-protocol-compliance + cross-protocol forensic layer, out of MG scope | Per-position duration + yield-claim-rate + withdrawal-recipient-divergence detection at protocol layer; per-cluster aggregate cross-protocol flow analysis at forensic-provider layer. |
| OAK-T8.001 — Common-Funder Cluster Reuse | full | `mg-detectors-rs` D08 funder-graph | Cluster freshness/decay convention pending v0.x. |
| OAK-T8.002 — Cross-Chain Operator Continuity | gap | cross-chain forensic layer, out of MG scope | Cross-chain attribution-graph providers (Chainalysis, TRM, Elliptic) provide vendor coverage; OAK-G01 attribution depends on it. |
| OAK-T9.001 — Oracle Price Manipulation | gap | out of MG scope | Protocol-layer; vendor coverage available externally (Forta, OpenZeppelin Defender, BlockSec). |
| OAK-T9.002 — Flash-Loan-Enabled Exploit | gap | out of MG scope | Protocol-layer; per-transaction flash-loan-pattern detectors are the canonical vendor approach. |
| OAK-T9.003 — Governance Attack | gap | out of MG scope | Protocol-layer; governance-monitoring agents are the canonical vendor approach. |
| OAK-T9.004 — Access-Control Misconfiguration | gap | out of MG scope | Protocol-layer; pre-deployment audit + formal verification + deployed-contract monitoring are the canonical defensive stack. |
| OAK-T9.005 — Reentrancy | gap | out of MG scope | Pre-deployment: checks-effects-interactions + OpenZeppelin ReentrancyGuard + audit + formal verification. Cross-protocol and read-only sub-variants frequently chain with T9.002. |
| OAK-T10.001 — Validator / Signer Key Compromise | gap | out of MG scope | Bridge-infrastructure layer; off-chain (validator-operator security posture, anti-phishing) + on-chain (per-bridge threshold-signing monitoring) split. |
| OAK-T10.002 — Message-Verification Bypass | gap | out of MG scope | Bridge-infrastructure layer; pre-deployment audit + post-upgrade smoke-test are the canonical mitigation stack. |
| OAK-T10.003 — Cross-Chain Replay | gap | out of MG scope | Bridge-infrastructure layer; per-message binding (chain ID + instance address + nonce) is the canonical mitigation. |
| OAK-T10.004 — Optimistic-Bridge Fraud-Proof Gap | gap | out of MG scope | Architecture-review layer; longer challenge windows + economically-incentivised challenger network + liveness guarantees as canonical mitigation. |
| OAK-T10.005 — Light-Client Verification Bypass | gap | out of MG scope | Cryptographic-primitive layer; circuit audit + formal verification + trusted-setup MPC ceremonies + multi-prover redundancy as canonical mitigation. Veridise / Trail of Bits / ZK Security as canonical access. |
| OAK-T11.001 — Third-Party Signing/Custody Vendor Compromise | gap | out of MG scope | Custody-and-signing-infrastructure layer; mitigation is primarily off-chain CTI + procurement controls + out-of-band destination verification. |
| OAK-T11.002 — Wallet-Software Distribution Compromise | gap | out of MG scope | Wallet-vendor build-pipeline + signed-binary distribution + reproducible builds is the canonical mitigation; user-side hardware-wallet integration as defence-in-depth. |
| OAK-T11.003 — In-Use Multisig Smart-Contract Manipulation | gap | out of MG scope | Custodial-multisig modification monitoring + change-control delay between proposal and execution is the canonical mitigation. |
| OAK-T12.001 — NFT Wash-Trade Volume Inflation | gap | NFT-marketplace layer, out of MG scope | Per-collection same-buyer-same-seller patterns + per-cluster wash-trade rate caps; marketplace-side moderation. |
| OAK-T12.002 — Fake-Mint / Counterfeit Collection | gap | NFT-marketplace-moderation layer, out of MG scope | Canonical-contract-allowlist enforcement + image-perceptual-hash / metadata-similarity scoring; verified-creator badges. |
| OAK-T12.003 — Royalty Bypass / Marketplace Manipulation | gap | out of MG scope | Marketplace-side royalty enforcement (Operator Filter Registry-style allowlists); EIP-7572 / cross-marketplace policy alignment. |

---

## How to read this matrix as a buyer / risk team

A "full" rating means a production implementation exists, has calibrated thresholds, and is tested against known-positive incidents. A "partial" rating means the Technique is detectable under restricted conditions; the per-Technique page documents the conditions and gaps. A "gap" rating means OAK has named the Technique and characterized observable indicators, but production-grade detection is an open work item — published deliberately, so contributors and other vendors can target the gap.

The T9 gap row is **not** a failure of OAK; it reflects the deliberate orthogonality between operator-behaviour detectors (which MG is) and protocol-layer detectors (which Forta and similar are). Buyers evaluating coverage across the full OAK taxonomy should expect to combine implementations from both classes.

OAK does not score "vendor coverage" by counting Techniques alone. The coverage methodology spec (planned RFC, Y1 Q3) will define an audited methodology for vendor self-attestation against this matrix.

---

## Other implementations

Other vendors are invited to submit Reference-implementation entries via PR (see `CONTRIBUTING.md`). At v0.1, the matrix is single-implementation. By v0.5 the matrix will be expanded to a two-dimensional matrix (Technique × Implementation).

## Other axes — catalogue and verification status

The Mitigations, Software, Threat Actors, Data Sources, and Worked Examples axes are not "covered" in the detection-implementation sense; they are catalogue entries with citation-quality verification status. The convention:

| Axis | Entries | Status convention |
|---|---:|---|
| Mitigations (`OAK-MNN`) | 40 | Each entry maps to ≥1 Technique; coverage status is per-mitigation deployment (vendor-side) rather than per-Technique. |
| Software (`OAK-SNN`) | 40 | Each entry has named CTI-vendor or government-anchor citations; family-naming convention follows MITRE ATT&CK Software where applicable. |
| Threat Actors (`OAK-Gnn`) | 18 | Attribution-strength language is explicit per-Group: confirmed (government anchor), inferred-strong (industry-forensic anchor), inferred-weak (single-source; OAK does not publish at v0.1). |
| Data Sources (`OAK-DS-NN`) | 12 | Each entry references the canonical telemetry source and OAK Techniques that consume it. |
| Worked Examples | 142 | Each example cites the operator post-mortem (where one exists), industry-forensic walkthroughs, and government / court records (where applicable). |

**Citation verification status** (v0.1 pre-launch audit, complete): all 964 entries in `citations.bib` carry an explicit per-entry status — `verified` / `verified-with-caveat` (publicly accessible via standard browser; returns 401-403 to non-browser HTTP clients) / `url-not-pinned` (canonical URL pending contributor sweep) / `url-broken` (residual). Government anchors (CISA AAs, OFAC, DOJ, FBI, HHS, foreign-government joint advisories, court records) are verified at submission time. Bulk URL audit completed via `tools/verify_citations.py`; 0 entries remain in `pending verification` state.

## Update cadence

This file is regenerated at every minor-version bump (v0.x). For in-flight changes between versions, see open PRs labeled `coverage:`.
