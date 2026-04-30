# OAK-M01 — Source-Bytecode Verification

**Class:** detection
**Audience:** vendor, risk-team, venue
**Maps to Techniques:** OAK-T1.001, OAK-T1.003, OAK-T1.004, OAK-T1.005, OAK-T2.004, OAK-T6.001, OAK-T6.003

## Description

Source-Bytecode Verification is the deterministic-recompile defence: for any deployed contract whose source has been claimed (Etherscan-style verified source, project-published GitHub commit, or audit-firm-cited commit), recompile the source under the declared compiler version and optimisation flags, and compare the produced bytecode against the bytecode actually deployed at the target address. The two should match within compiler-deterministic noise (metadata-hash trailers excluded). Anything else is a divergence between what defenders believe the contract does and what it actually does.

The defensive principle is that source-level review (manual audit, static analysis, Technique-level pattern matching) is only meaningful if the source actually corresponds to the deployed bytecode. Without that binding, every downstream defensive control reduces to a marketing claim. The mitigation works because the comparison is mechanical, falsifiable, and cheap relative to the harm prevented — a single recompile-and-hash converts a class of evasion patterns (T6.001 and its T1 / T6.003 combinations) from undetectable into deterministic.

The canonical-at-listing-time variant — where a venue or risk team performs the recompile as a *listing precondition* and stores the bytecode hash in a registry — is the highest-leverage deployment surface. It pushes the verification cost from per-trader (where it is rarely paid) to per-venue (where it amortises across every trader).

## How it applies

- **OAK-T1.001 (Modifiable Tax Function):** static-analysis-tool detection of fee-mutability paths only holds if the verified source compiles to the deployed bytecode; recompile binding is the precondition that makes downstream T1.001 fee-branch enumeration trustworthy.
- **OAK-T1.003 (Renounced-but-not-Really):** authority-graph enumeration over the verified source produces correct results only when the source matches the bytecode; without recompile binding, an attacker can publish a renounced-looking source while deploying a different bytecode that retains admin paths.
- **OAK-T1.004 (Blacklist / Pausable Weaponisation):** blacklist and pause predicates may be present in deployed bytecode but absent from the published source; recompile binding closes that gap.
- **OAK-T1.005 (Hidden Fee-on-Transfer):** asymmetric fee branches are commonly hidden behind a source-vs-bytecode mismatch; the recompile is the structural check that makes T1.005 branch enumeration meaningful.
- **OAK-T2.004 (Initial Liquidity Backdoor):** pool-creation-time admin paths must be evaluated against the actual deployed bytecode of the token and pool wrapper, not the announced source; recompile binding is a prerequisite for the creation-transaction trace check.
- **OAK-T6.001 (Source-Verification Mismatch):** this is the canonical Technique that OAK-M01 exists to defeat — the recompile is the unambiguous detection signal.
- **OAK-T6.003 (Audit of Different Bytecode Version):** recompile against the audited commit, hash the result, compare against the deployed-bytecode hash; non-match is the audit-vs-deployed gap that T6.003 exploits.

## Limitations

OAK-M01 does not cover proxy patterns where the proxy itself is verified-source-correct but the implementation it points to is unverified or has been swapped post-listing — that is OAK-M03 territory (continuous bytecode-diff monitoring). It also does not cover semantic equivalence: two bytecodes that match exactly are not necessarily *safe*, only *consistent with the source that was reviewed*. The mitigation is binding, not absolution. Compiler-determinism edge cases (Solidity metadata-hash variations, IR pipeline changes between minor versions, Vyper evaluation-order changes) require a normalised hash that strips known-variable trailers; naive byte-equality comparisons produce false positives. CREATE2-replay-after-`selfdestruct` requires a re-binding event at the point of redeploy, not just at original listing. And on Solana / non-EVM chains the verification surface is different (BPF program hashes, IDL-vs-binary comparisons) and OAK-M01 in its v0.1 form is EVM-centric.

## Reference implementations

- `mg-detectors-rs` — recompile-binding pipeline planned; current v0.1 status is gap (mirrors the T6.001 detection gap).
- Sourcify (`sourcify.dev`) — cryptographic source-verification via metadata-hash matching; the canonical open-source implementation of the recompile-bind primitive at scale.
- Etherscan / Blockscout / Routescan — block-explorer "verified source" UIs; partial-match vs full-match labelling is the relevant distinction defenders should consume programmatically rather than as a UI badge.
- Foundry `forge verify-bytecode` and Hardhat verification plugins — local recompile tooling suitable for per-listing pipelines.
- Audit-attestation registries (proposed, not yet standardised at v0.1) — would extend OAK-M01 from source-bytecode binding to audit-bytecode binding by publishing the audited-commit's recompile hash alongside the audit certificate.

## Citations

- `[chainalysis2025rug]` — cohort-scale context on rug-pull retrospectives where source-bytecode mismatch is a recurring evasion modifier.
- `[slowmist2024report]` — industry-side enumeration of source-verification-mismatch patterns in 2024 incident corpus.
- `[certikfakeaudit]` — fake-audit-claim cohort context; relevant to T6.003-mode application of OAK-M01 (audit-bytecode binding).
- `[quillauditsbackdoor]` — backdoor-via-proxy patterns where source-bytecode binding (and OAK-M03 follow-up) is the relevant defence.
