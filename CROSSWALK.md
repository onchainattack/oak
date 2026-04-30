# OAK ↔ OWASP Smart Contract Top 10 — Crosswalk

> Mapping table between OAK Techniques and OWASP Smart Contract Top 10 categories. Defender-perspective. Updated when either framework releases a major version.

This crosswalk operationalises the orthogonality framing in [`PRIOR-ART.md`](./PRIOR-ART.md). OAK and OWASP SC Top 10 are complementary, not competing: OWASP catalogues the **contract-vulnerability layer** (what makes a contract exploitable); OAK catalogues the **operator-behaviour layer** (what an adversary does with a contract once deployed, what they do to capture holders, how they extract value, how they launder). The two layers overlap directly inside OAK-T9 (Smart-Contract Exploit) and partially inside OAK-T1.003 (Renounced-But-Not-Really / Proxy-Upgrade Backdoor). Outside that overlap, neither framework subsumes the other — a contributor mapping a detector should expect to claim coverage in **both** frameworks, not one or the other.

OWASP version referenced: **OWASP Smart Contract Top 10 — 2026 edition** (anchored on 2025 incident data; \~122 deduplicated incidents, \~\$905.4M tracked losses), citation `[owaspscstop10]`. The 2026 list reorders the 2025 list and introduces SC10 Proxy & Upgradeability as a new top-level category; reentrancy moved from #2 (2025) to #8 (2026).

OAK version referenced: **OAK v0.1** — 12 Tactics, 51 Techniques. v0.1 does **not** yet include a T13 Account Abstraction Tactic; ERC-4337-specific Techniques are flagged in [`TAXONOMY-GAPS.md`](./TAXONOMY-GAPS.md) and tracked in [`ROADMAP.md`](./ROADMAP.md). When T13 lands, this crosswalk gains its second direct-overlap row.

---

## OWASP SC Top 10 (2026) — categories used in this crosswalk

| ID | Category |
|---|---|
| SC01 | Access Control |
| SC02 | Business Logic |
| SC03 | Oracle Integration |
| SC04 | Flash Loan Resilience |
| SC05 | Input Validation |
| SC06 | External Call Safety |
| SC07 | Arithmetic |
| SC08 | Reentrancy |
| SC09 | Overflow / Underflow |
| SC10 | Proxy Safety |

---

## OAK → OWASP — Techniques with an OWASP correspondent

Only OAK Techniques that map onto a contract-vulnerability class appear here. Every other OAK Technique is operator-behaviour-only and is listed in the third table below.

| OAK ID | OAK Technique | OWASP correspondent | Mapping notes |
|---|---|---|---|
| OAK-T1.003 | Renounced-But-Not-Really (Proxy-Upgrade Backdoor) | SC10 Proxy Safety | Partial overlap. OWASP SC10 covers the contract-side weakness (admin-slot misconfiguration, unsafe `initialize()`, missing `_disableInitializers()`, takeover via reinitialisation). OAK-T1.003 covers the operator behaviour built on top of that weakness (publicly claiming a contract is renounced while retaining proxy-admin or EIP-1967-slot privileges as a covert kill-switch). OAK is **narrower than OWASP** on the vulnerability surface but **broader than OWASP** on attribution and intent framing. |
| OAK-T9.001 | Oracle Price Manipulation | SC03 Oracle Integration | Full direct overlap on the technical class. OWASP SC03 frames it as a vulnerability category (single-source/spot-price oracles, missing TWAP, missing staleness checks); OAK-T9.001 frames it as an adversary technique with attribution and observed-indicator framing. T9.001 chains operationally with T9.002. |
| OAK-T9.002 | Flash-Loan-Enabled Exploit | SC04 Flash Loan Resilience | Full direct overlap on the technical class. OWASP SC04 frames the resilience requirement (atomic-borrow primitives, multi-block invariants, MEV-resistance); OAK-T9.002 frames the adversary primitive that exploits its absence. Frequently chains with T9.001 (oracle manipulation), T9.003 (governance), T9.005 (reentrancy). |
| OAK-T9.003 | Governance Attack | SC01 Access Control (primary) + SC02 Business Logic (secondary) | Partial overlap. SC01 covers the access-control surface of governance (privileged role gating, `onlyOwner`, timelock bypass); SC02 covers economic-model failure modes (token-borrow vote manipulation, donation/quorum games). OAK-T9.003 spans both: the access-control vulnerability *is* the governance contract, and the economic abuse *is* the adversary primitive. OAK is **broader than either single OWASP category**. |
| OAK-T9.004 | Access-Control Misconfiguration | SC01 Access Control | Full direct overlap. OWASP SC01 is the canonical OWASP category for missing/incorrect role gating, public initialisation, exposed admin functions, and signature-verification bypass. OAK-T9.004 catalogues the same surface from the adversary-technique angle. |
| OAK-T9.005 | Reentrancy | SC08 Reentrancy | Full direct overlap on the technical class. Note: SC06 External Call Safety is the proximate cause class in OWASP 2026; SC08 is the canonical reentrancy entry. Cross-protocol and read-only sub-variants frequently chain with T9.002. |

---

## OWASP → OAK — reverse coverage check

For every OWASP SC Top 10 (2026) category, where does OAK currently catalogue the corresponding adversary technique?

| OWASP ID | OWASP category | OAK correspondent | Status |
|---|---|---|---|
| SC01 | Access Control | OAK-T9.003 + OAK-T9.004 | Covered. T9.004 is the canonical OAK entry; T9.003 is the governance specialisation. |
| SC02 | Business Logic | OAK-T9.003 (partial) | Partial. OAK does not have a dedicated "business-logic flaw" Technique; the closest match is governance-economic attacks under T9.003 and oracle-driven economic exploits under T9.001. A dedicated `OAK-T9.NNN — Economic Invariant Break` is a candidate v0.x addition. |
| SC03 | Oracle Integration | OAK-T9.001 | Covered. |
| SC04 | Flash Loan Resilience | OAK-T9.002 | Covered. |
| SC05 | Input Validation | — | **Not covered.** Pure contract-vulnerability layer. Detection and mitigation live entirely in static analysis, fuzzing, and audit. OAK does not catalogue input-validation flaws as a standalone adversary Technique. |
| SC06 | External Call Safety | — | **Not covered.** Pure contract-vulnerability layer; partially adjacent to OAK-T9.005 (Reentrancy) since unchecked external calls are the proximate cause. |
| SC07 | Arithmetic | — | **Not covered.** Pure contract-vulnerability layer (rounding, precision-loss, division-order). |
| SC08 | Reentrancy | OAK-T9.005 | Covered. |
| SC09 | Overflow / Underflow | — | **Not covered.** Pure contract-vulnerability layer. Largely mitigated since Solidity 0.8.x default checked arithmetic and Rust's checked-arithmetic conventions; remains in OWASP for legacy and unchecked-block cases. |
| SC10 | Proxy Safety | OAK-T1.003 (partial) | Partial. T1.003 covers the operator-behaviour exploitation of unsafe upgrade authority; SC10 also covers the unsafe-`initialize()` and storage-collision contract-bug surface that OAK does not catalogue. |

---

## OAK Techniques without an OWASP correspondent (operator-behaviour layer)

The following 45 of OAK's 51 v0.1 Techniques have **no** OWASP SC Top 10 correspondent. They sit on the operator-behaviour layer that OWASP scopes out by design. This is the bulk of OAK's contribution and the strongest argument for the orthogonality framing.

- **OAK-T1 Token Genesis** — T1.001 Modifiable Tax Function, T1.002 Token-2022 Permanent Delegate, T1.004 Blacklist/Pausable Transfer Weaponization, T1.005 Hidden Fee-on-Transfer. *(T1.003 is the partial-overlap exception above.)*
- **OAK-T2 Liquidity Establishment** — T2.001 Single-Sided Liquidity Plant, T2.002 Locked-Liquidity Spoof, T2.003 Cross-Chain Locked-Liquidity Spoof, T2.004 Initial-Liquidity Backdoor.
- **OAK-T3 Holder Capture** — T3.001 Sybil-Bundled Launch, T3.002 Wash-Trade Volume Inflation, T3.003 Coordinated Pump-and-Dump.
- **OAK-T4 Access Acquisition** — T4.001 Permit2 Authority Misuse, T4.002 Compromised Front-End Permit, T4.003 Address Poisoning, T4.004 Allowance/Approve-Pattern Drainer, T4.005 setApprovalForAll NFT Drainer, T4.006 WalletConnect Session Hijack.
- **OAK-T5 Value Extraction** — T5.001 Hard LP Drain, T5.002 Slow LP Trickle Removal, T5.003 Hidden-Mint Dilution, T5.004 Sandwich/MEV Extraction, T5.005 Treasury-Management Exit, T5.006 Vesting Cliff Dump.
- **OAK-T6 Defense Evasion** — T6.001 Source-Verification Mismatch, T6.002 Fake Audit-Claim, T6.003 Audit-of-Different-Bytecode-Version.
- **OAK-T7 Laundering** — T7.001 Mixer-Routed Hop, T7.002 CEX Deposit-Address Layering, T7.003 Cross-Chain Bridge Laundering, T7.004 NFT Wash-Laundering, T7.005 Privacy-Chain Hops, T7.006 DeFi Yield-Strategy Laundering.
- **OAK-T8 Operational Reuse** — T8.001 Common-Funder Cluster Reuse, T8.002 Cross-Chain Operator Continuity.
- **OAK-T10 Bridge & Cross-Chain** — T10.001 Validator/Signer Key Compromise, T10.002 Message-Verification Bypass, T10.003 Cross-Chain Replay, T10.004 Optimistic-Bridge Fraud-Proof Gap, T10.005 Light-Client Verification Bypass. *(Bridge-infrastructure layer; OWASP SC Top 10 scopes contract-level vulnerabilities and does not separate the bridge-protocol surface.)*
- **OAK-T11 Custody and Signing Infrastructure** — T11.001 Third-Party Signing/Custody Vendor Compromise, T11.002 Wallet-Software Distribution Compromise, T11.003 In-Use Multisig Smart-Contract Manipulation. *(Off-chain entry vector; out of OWASP scope.)*
- **OAK-T12 NFT-Specific Patterns** — T12.001 NFT Wash-Trade Volume Inflation, T12.002 Fake-Mint/Counterfeit Collection, T12.003 Royalty Bypass/Marketplace Manipulation. *(Marketplace-moderation layer; out of OWASP scope.)*

---

## OWASP categories without an OAK correspondent (pure contract-vulnerability layer)

Three OWASP SC Top 10 (2026) categories have **no** standalone OAK Technique and are unlikely to gain one, because they are pure contract-implementation defects rather than adversary behaviours that benefit from attribution-and-mitigation framing:

- **SC05 Input Validation** — caught by static analysis, fuzzing, and audit. No defender benefit from operator-behaviour framing.
- **SC07 Arithmetic** — rounding, precision-loss, division-order. Caught by audit and formal verification.
- **SC09 Overflow / Underflow** — largely solved at the language layer; remains for legacy and unchecked-block cases.

**SC06 External Call Safety** is also without a dedicated OAK Technique but is partially adjacent to OAK-T9.005 (Reentrancy), since unchecked external calls are the proximate cause class for reentrancy. A dedicated OAK Technique is unlikely; the adversary-technique angle is fully captured by T9.005.

---

## Discussion — operator-behaviour vs contract-vulnerability

The numerical asymmetry in the tables above (45 OAK-only Techniques, 3 OWASP-only categories, 6 overlap rows) is not a coverage failure on either side — it is the structural consequence of the two frameworks targeting different layers of the same problem.

- **OWASP SC Top 10 answers**: *"What contract-implementation defect made this exploit possible?"* That question matters most before deployment (audit-time), and during patch / postmortem analysis. Its audience is contract authors, auditors, and formal-verification engineers.
- **OAK answers**: *"What did the operator do — across the entire kill chain from token genesis to laundering?"* That question matters most during operation (real-time-monitoring time), during attribution, and during procurement. Its audience is risk teams, investigators, vendors publishing coverage maps, and threat-intel consumers.

The intersection — six rows — is the smart-contract-exploit class itself: it is both an implementation defect (OWASP framing) **and** an adversary primitive used inside a larger operator kill chain (OAK framing). A defender team that needs to know *both* "is our protocol exploitable?" and *"is an exploit underway right now and who is behind it?"* needs both frameworks.

A contributor mapping a detector should therefore expect to claim coverage in both frameworks, not one or the other. Vendors who claim coverage of "OWASP SC03 Oracle Integration" and "OAK-T9.001 Oracle Price Manipulation" are claiming complementary things: SC03 coverage means their tool finds oracle-pattern bugs in source; OAK-T9.001 coverage means their tool detects oracle-manipulation attempts in flight.

---

## Maintenance commitment

This crosswalk is updated when **either** framework releases a major version:

- **OWASP SC Top 10** publishes on roughly an annual cadence (2025, 2026 confirmed). Each new edition triggers a re-validation of the OAK → OWASP and OWASP → OAK tables, including the SC0X numbering and any added/removed categories (the 2025→2026 edition added SC10 Proxy Safety as a top-level category).
- **OAK** publishes on a planned v0.x cadence. The v0.5 milestone introduces the Threat-Actors and Data-Sources axes as a first-class crosswalk surface; the v0.x landing of T13 Account Abstraction will add a second direct-overlap region (ERC-4337 EntryPoint and Paymaster contract-vulnerability classes overlap with SC01 / SC05 / SC10).

Crosswalk corrections (mapping rationale, missed overlaps, OWASP-category renames) are accepted via PR per [`CONTRIBUTING.md`](./CONTRIBUTING.md). Substantive changes are recorded in [`CHANGELOG.md`](./CHANGELOG.md) under the OAK release that incorporates them; the OWASP version referenced at the top of this file is updated in the same PR.

---

## References

- OWASP Smart Contract Top 10 (2025/2026): `[owaspscstop10]` — <https://scs.owasp.org/sctop10/>
- Orthogonality framing and prior-art positioning: [`PRIOR-ART.md`](./PRIOR-ART.md)
- OAK Technique inventory (T1–T12, 51 Techniques): [`COVERAGE.md`](./COVERAGE.md)
- OAK gaps and planned additions (T13 Account Abstraction, etc.): [`TAXONOMY-GAPS.md`](./TAXONOMY-GAPS.md), [`ROADMAP.md`](./ROADMAP.md)
