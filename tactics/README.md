# OAK Tactics — conventions

This directory holds the OAK Tactic-level entries (`OAK-T1` … `OAK-Tn`). Each Tactic file documents the kill-chain phase, scope, and the sub-Techniques that live under it. This README documents the controlled vocabularies and optional fields that Tactic and Technique files use, so contributors writing new entries land on the existing shape rather than introducing drift.

## Phase — controlled vocabulary

Every Tactic file carries a `**Phase:**` field with **exactly one** of the six canonical phases below. Phase tags the part of the adversarial kill-chain at which the Tactic operates. Where a Tactic genuinely fits more than one, pick the dominant phase and note the secondary association in the Tactic-file Description.

1. **Pre-positioning** — off-chain entry-vector setup. The attacker establishes an off-chain foothold (operator-personnel social engineering, vendor-pipeline compromise, endpoint compromise, credential compromise, communication-channel takeover) before any on-chain manifestation. Default phase for `OAK-T15`.
2. **Pre-launch / Launch** — token / project / liquidity / holder-base setup. The attacker shapes the on-chain artefact (token genesis, liquidity pool establishment, holder-base concentration) at or before the launch event. Default phase for `OAK-T1`, `OAK-T2`, `OAK-T3`.
3. **Targeted compromise** — on-chain access acquisition. The attacker acquires a privileged on-chain authority (signer key, validator key, paymaster, account-abstraction session key, custody-pipeline access, signing-vendor access). Default phase for `OAK-T4`, `OAK-T10`, `OAK-T11`, `OAK-T13`, `OAK-T14`.
4. **Realization** — value-extraction event. The attacker converts the prior phases into on-chain value movement: smart-contract exploitation, NFT-marketplace manipulation, governance-binding capture, market-mechanism abuse, direct treasury / liquidity drain. Default phase for `OAK-T5`, `OAK-T9`, `OAK-T12`, `OAK-T16`, `OAK-T17`.
5. **Post-extraction** — laundering plus operator-continuity / attribution-signal. The attacker moves proceeds away from the realization event and forensic markers identify the operator across incidents. Default phase for `OAK-T7`, `OAK-T8`.
6. **Cross-cutting** — operates across phases. The Tactic is not anchored to one phase but functions as a force-multiplier or evasion modifier across multiple phases. Default phase for `OAK-T6`.

The vocabulary was canonicalised at schema 0.5. Earlier files used phase strings that mixed phase-of-kill-chain and target-substrate-layer language ("Realization (cross-chain infrastructure layer)"); the substrate-layer information is preserved inside each Tactic-file Description while the `**Phase:**` line is normalised to one of the six canonical strings above.

## Optional cross-reference fields — `Parent Techniques` / `Adjacent Techniques`

Technique files may carry two optional cross-reference fields after the `**Parent Tactics:**` line:

- `**Parent Techniques:** OAK-Tn.NNN[, OAK-Tm.MMM, ...]` — declares that this Technique is a **sub-class** of one or more other Techniques. Use this when the Technique's structural shape is a narrower instance of a more general Technique elsewhere in the corpus (e.g., a wallet-binary-distribution compromise is a sub-class of a generic supply-chain compromise; a bridge-validator key compromise is a sub-class of generic third-party signing-vendor compromise and generic multisig manipulation). The parent Technique's worked examples typically include the sub-class's anchors; the sub-class file refines scope.
- `**Adjacent Techniques:** OAK-Tn.NNN[, OAK-Tm.MMM, ...] (note)` — declares that this Technique shares an on-chain artefact, detection signal, or mitigation surface with another Technique while remaining structurally distinct (typically because the operator goal differs). Use this when the discrimination depends on a non-on-chain signal (operator motive, post-event behaviour, downstream platform context). The two Techniques cross-reference each other symmetrically.

Both fields are **additive** — they do not replace `**Parent Tactics:**`, and they do not change the Technique's primary classification. They give defenders and downstream consumers an explicit hierarchy / sibling map without requiring the underlying ID to be renamed or merged. Apply at the per-Technique-file level only; do not duplicate inside Tactic-file enumerations.

## Maturity — controlled vocabulary

Each Tactic / Technique / Mitigation / Software / Group file carries a `**Maturity:**` field with one of: `stable` / `emerging` / `observed` / `draft` / `deprecated`. The canonical definitions live in `VERSIONING.md` § "Per-item maturity (controlled vocabulary)"; refer there before assigning maturity to a new entry.

## See also

- `../CONTRIBUTING.md` — per-Technique / per-Mitigation / per-Software / per-Group templates and writing-style rules.
- `../VERSIONING.md` — schema-version history, per-item maturity vocabulary, deprecation window.
- `../TAXONOMY-GAPS.md` — promotion candidates and held v0.x sub-Technique reservations.
