# OAK-T6 — Defense Evasion

**Phase:** Cross-cutting
**Adjacent tactics:** all

## Scope

Defense Evasion covers actions taken to make adversarial setup or behavior harder for vendors, investigators, and risk teams to detect. T6 has **two operationally-distinct sub-clusters** that contributors should preserve when writing or mapping incidents — defenders working in either cluster face different mitigation surfaces:

- **T6.001–T6.004 — Pre-deployment / off-chain claim falsification.** The attacker lies about the contract's audit status, source verification, or pre-deployment review. Surface: source-verification mismatch (T6.001), fake audit-claim (T6.002), audit-of-different-bytecode-version (T6.003), audit-pending marketing-claim (T6.004). Detection runs against pre-deployment claims vs deployed-bytecode evidence; mitigation is auditor-registry verification, deterministic recompile, and bytecode-vs-claim correlation.
- **T6.005–T6.007 — Operational defense-evasion.** The attack hides itself from runtime detection or invalidates a defender's prior trust-substrate claim. Surface: proxy-upgrade malicious switching (T6.005), counterfeit token impersonation (T6.006), trust-substrate shift / vendor-side promise revocation (T6.007). Detection runs against runtime state changes, contract-identity signal, and vendor-policy-event monitoring; mitigation is upgrade-control review, brand / contract-identity registry coordination, and vendor-policy-change tracking.

Secondarily, T6 also functions as a **modifier** label that may be tagged on Techniques in T1–T5 when the evasion pattern is tightly coupled to that Technique's own primary failure mode (e.g., OAK-T2.002 Locked-Liquidity Spoof lists T2 + T6 as parents because the spoof pattern is inseparable from the locked-liquidity surface). The standalone T6 Techniques are the canonical entries; the modifier-mode tagging is a secondary use that surfaces evasion concerns inside other Tactics' pages.

## What defenders observe

- Configuration patterns or contract structures designed to defeat common static-analysis heuristics.
- Off-chain claims (audit reports, locker references, KYC attestations) whose on-chain evidence does not match the claim's stated scope or authority.
- Behavioral patterns — such as transfer logic that selectively allows or disallows certain addresses — that are observable only by simulation or by comparing claimed behavior to executed behavior.

## Relationship to other tactics

T6 is a "force multiplier" Tactic. Each T6 Technique should explicitly list the T1–T5 Techniques it most commonly modifies, and Reference implementations should describe how detection coverage degrades when paired with that T6 pattern. Where an evasion pattern is structurally inseparable from a specific Technique's primary failure mode, the parent Technique carries T6 as a secondary parent rather than producing a duplicate standalone T6 entry (e.g., OAK-T2.002 Locked-Liquidity Spoof).

## Techniques in this Tactic (v0.1)

- OAK-T6.001 — Source-Verification Mismatch (verified-source vs deployed-bytecode mismatch; generic across T1 and T9 classes).
- OAK-T6.002 — Fake Audit-Claim (off-chain marketing claim of an audit that the named firm never performed).
- OAK-T6.003 — Audit-of-Different-Bytecode-Version (a real audit was performed, but the deployed bytecode differs from the audited version).
- OAK-T6.004 — Audit-Pending Marketing Claim (marketing represents an audit as imminent or in-progress to defer due-diligence pressure during the launch window).

In addition, the locked-liquidity-spoof pattern appears as OAK-T2.002 with T6 listed as a secondary parent — that case stays under T2 because the spoof is inseparable from the locked-liquidity surface.

## Maintainer notes

T6.001 was the first standalone Technique because its failure mode is generic across Tactic classes and its detection signal (deterministic recompile against verified source) is unambiguous and tooling-mature. T6.002–T6.004 followed as the audit-claim adjacent failure modes — fake claim, scope-mismatch claim, and pending-claim — each reached independent characterisation maturity. v0.x updates will add additional T6.NNN entries when new evasion patterns meet the same standalone-characterisation bar.
