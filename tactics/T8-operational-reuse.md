# OAK-T8 — Operator Continuity / Attribution Signals

**Phase:** Post-extraction
**Adjacent tactics:** T1 (Token Genesis), T7 (Laundering)

## Scope

Operator Continuity / Attribution Signals captures **cross-incident attribution signals, not new attacker actions**. The "attack" was performed in some other Tactic (T1–T7, T9–T17); T8 sub-Techniques are forensic markers used to maintain operator-cluster identification across incidents — wallet reuse, deployment-pattern reuse, funding-source reuse, off-chain-asset reuse. From a defender's perspective, T8 is the Tactic that makes the cumulative cost of detection drop over time: each newly attributed incident provides priors for the next, and operators who reuse infrastructure can be tracked across campaigns even when individual tokens are short-lived.

T8 is **categorically different** from the rest of the OAK Tactic axis. T1–T7 / T9–T17 document *adversarial actions* — things the attacker does on-chain or off-chain that produce loss. T8 documents *the forensic markers that connect those actions across incidents* — the signal that says "the same operator did multiple of these," not a separate attack the operator performed. Contributors writing T8 sub-Techniques (T8.001 Common-Funder Cluster Reuse, T8.002 Cross-Chain Operator Continuity, future additions) should preserve this framing: T8 sub-Techniques describe *attribution-signal patterns*, not *attacker actions*. The human-readable Tactic name was updated at schema 0.5 to make this distinction explicit; the underlying ID (`OAK-T8`) is unchanged.

## What defenders observe

- Common funding-source addresses appearing across the genesis events of multiple adversarial tokens.
- Reused deployment patterns: identical compiler metadata, identical constructor parameter shapes, identical proxy/admin role mappings across nominally unrelated tokens.
- Off-chain reuse: shared social handles, shared promotional venues, shared landing-page templates linked by analytics or hosting fingerprints.

## Relationship to other tactics

T8 is the connective tissue between incidents. A T7 laundering destination that becomes a T1 funder for a new token is the canonical T8 pattern — and is the strongest available signal that an investigator is tracking an operator, not a one-off.

## Techniques in this Tactic (v0.1)

- OAK-T8.001 — Common-Funder Cluster Reuse
- OAK-T8.002 — Cross-Chain Operator Continuity

## Maintainer notes

T8 detection benefits most from longitudinal datasets. v0.1 documents the patterns that are stable across known operator campaigns; future versions will add Techniques tied to specific operator behaviors as those become independently citable.
