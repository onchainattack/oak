# OAK Taxonomy Audit — 2026-05

> **Resolution status (2026-05-15): all 10 findings resolved across schema 0.5 and 0.6.** This audit is retained for historical reference and to document the reasoning behind each resolution. The VERSIONING.md changelog (0.5, 0.6) records the specific schema changes.

After two Tactic introductions (T15, T16) and ~20 sub-Technique promotions across the recent v0.x cycle, the taxonomy has accumulated drift, overlap, and naming inconsistencies. This document is a structural review identifying classification mistakes and proposing remap actions.

**Scope of audit (original):** 16 Tactics, 93 sub-Techniques, ~220 worked examples. **Current (post-resolution):** 17 Tactics, 136 Techniques, 577 worked examples.

**Author:** maintainer audit, not agent-generated. Judgment calls flagged explicitly.

## Top-line findings

1. **T9.003 (Governance Attack) overlaps T16.x family** — biggest classification mistake. Should migrate.
2. **Maturity vocabulary drift** — docs say `stable/emerging/draft/deprecated`; files use `observed/developing` too. Need either widen the vocabulary or normalize 13 files.
3. **Phase field semantics inconsistent** — Tactic-level `**Phase:**` field uses six different value styles. Need a controlled vocabulary.
4. **T11.002 vs T15.002 overlap** — wallet software distribution compromise is a sub-class of supply-chain vendor pipeline compromise. Cross-reference language is muddled.
5. **T7.004 vs T12.001 NFT wash duplication** — same on-chain artefact, two intent classifications. Documented but worth explicit cross-link.
6. **T11.004 missing slot** — gap in numbering (T11.001-003, T11.005-009; T11.004 was reserved for Insufficient-Entropy Key Generation but never created).
7. **T8 (Operational Reuse) is an attribution-signal Tactic, not an attack-phase Tactic** — semantically ambiguous; the only sub-Techniques (T8.001 cluster reuse, T8.002 cross-chain operator continuity) are forensic markers, not attacker actions.
8. **T10.001 (Validator/Signer Key Compromise) overlaps T11.001 / T11.003** — bridge-validator custody is a subclass of generic third-party signing-vendor / multisig custody.
9. **T15.x partially shadows T11.001** — the T15 introduction lifted the *off-chain pre-positioning phase* into its own Tactic, but T11.001 still describes Bybit-class as a "third-party signing vendor compromise" without consistently delegating the off-chain narrative to T15.
10. **T6 has two distinct sub-clusters under one Tactic** — T6.001-004 are pre-deployment / off-chain claims (audit fakery, source mismatch); T6.005-007 are on-chain or vendor-policy events. Probably fine as-is but the parent Tactic description should explicitly enumerate the two sub-clusters.

## Detail by category

### A — T9.003 → T16.x migration (most concrete misclassification)

**Current:** `techniques/T9.003-governance-attack.md` lives under T9 Smart-Contract Exploit. After T16 Governance / Voting Manipulation introduction, T9.003 is conceptually a parent of T16.001 / T16.002 / T16.003 / T16.004 / T16.005 — a generic ancestor class.

**Problem:** T9.003 is now redundant. Worked examples that previously mapped to T9.003 now also map to T16.x. The dual mapping muddles the meaning of "T9 Smart-Contract Exploit" because governance attacks are *not* protocol-layer code-execution exploits — they are voting-power-against-protocol attacks.

**Options:**

- **A.1 Deprecate T9.003** — mark Maturity `deprecated`, add `**Replaced by:** T16.001-005`, keep ID resolvable per VERSIONING.md deprecation window. **Schema major bump** (per VERSIONING.md "renaming or removing an OAK ID is breaking"). One minor cycle until removal.
- **A.2 Keep T9.003 as a generic placeholder** — for governance attacks not fitting any T16.x sub-pattern. Cross-reference T16.x prominently. Awkward maintenance.
- **A.3 Reframe T9.003** — narrow scope to "Protocol-layer governance-binding bug exploitation" (as opposed to T16 which is voting-power abuse). Examples where the *governance contract* itself has a bug. Distinct from T16 (which assumes governance contract works as designed but the *outcome* is captured).

**Recommendation:** A.3 — narrowest scope refinement avoids breaking change. Document the distinction: T9.003 = bug in governance contract code; T16.x = abuse of governance contract operating as designed. Update the technique file with clarified scope.

### B — Maturity vocabulary drift

**Current vocabulary in files:**

```text
stable      (~12 files)
emerging    (~22 files)
observed    (~14 files) ← not in VERSIONING.md
developing  (~1 file)   ← not in VERSIONING.md
draft       (~1 file)
```

**VERSIONING.md says:** stable / emerging / draft / deprecated.

**Two solutions:**

- **B.1 Widen vocabulary** — accept `observed` (occurred in the wild but not yet field-confirmed by multi-vendor) and `developing` (proposed sub-Technique with no field anchor) as additional values. Update VERSIONING.md.
- **B.2 Normalize 13 files** — `observed` → `emerging` (most fit; the criterion is "≤ 2 worked examples" which most do), `developing` → `draft`.

**Recommendation:** B.1. The five-value vocabulary (stable / emerging / observed / draft / deprecated) reflects real distinctions:

- `stable`: definition fixed, multi-vendor agreement, ≥ 3 anchors.
- `emerging`: definition recently introduced, single-vendor or single-source attestation, ≤ 2 worked examples.
- `observed`: occurred in the wild but field-confirmed at a single anchor; awaiting cross-vendor agreement.
- `draft`: proposed in TAXONOMY-GAPS, no anchor.
- `deprecated`: marked for removal, replaced by another ID.

Update VERSIONING.md to widen the vocabulary, then ensure all files use exactly one of the five.

### C — Phase field controlled vocabulary

**Current values across 16 Tactics:**

```text
Pre-launch / launch                              (T1)
Launch                                           (T2)
Launch / growth                                  (T3)
Targeted compromise                              (T4)
Realization                                      (T5)
Concurrent with T1–T5                            (T6)
Post-extraction                                  (T7)
Cross-incident                                   (T8)
Realization (protocol-layer)                     (T9)
Realization (cross-chain infrastructure layer)   (T10)
Realization (custody-and-signing-infrastructure) (T11)
Realization (NFT-marketplace and collection)     (T12)
Realization (account-abstraction infrastructure) (T13)
Realization (consensus and staking-infrastructure)(T14)
Pre-positioning                                  (T15)
Holder-state-derived control                     (T16)
```

**Problem:** "Realization" is used for everything operational; "Launch" appears three times with slight variation; T6 is "Concurrent with T1-T5" (a relationship not a phase); T8 is "Cross-incident" (also a relationship); T16 is "Holder-state-derived control" (its own thing).

**Recommendation:** introduce a controlled vocabulary in `tactics/README.md`. Five canonical phases:

1. **Pre-positioning** — off-chain entry-vector setup (T15)
2. **Launch / Pre-launch** — token / project / liquidity / holder-base setup (T1, T2, T3)
3. **Targeted compromise** — initial on-chain access acquisition (T4, T11, T13, T14, T10)
4. **Realization** — value extraction event itself (T5, T9, T12, T16)
5. **Post-extraction** — laundering + operator continuity (T7, T8)
6. **Cross-cutting** — operates across phases (T6 defense evasion)

Reassign each Tactic to one of these. T16 becomes Realization. T8 becomes Post-extraction (operator-continuity post-event). T6 stays cross-cutting.

### D — T11.002 vs T15.002 overlap

**T11.002:** Wallet-Software Distribution Compromise. Anchors: Atomic Wallet 2023, Ledger Connect Kit 2023.
**T15.002:** Supply-chain vendor pipeline compromise. Anchors: same plus Solana web3.js 2024, Bybit 2025, Polymarket trader-tooling 2026, CoinStats 2024.

**Problem:** T11.002 is a *type* of T15.002. They share anchors. Differentiating language ("wallet binary distribution" vs "general supply-chain") is not maintained consistently across both files.

**Options:**

- **D.1 Deprecate T11.002** — migrate anchors to T15.002. **Schema major.** Heavy.
- **D.2 Keep both, make T11.002 explicitly a sub-class of T15.002** — add `**Parent Techniques:** T15.002` to T11.002 (new field). Refine T11.002 scope to "T15.002 sub-class where the compromised vendor's product is a wallet binary that holds end-user keys." Schema additive.
- **D.3 Rename T11.002 to clarify scope** — "Wallet-Binary Build-Pipeline Compromise (sub-class of T15.002)". **Schema major** (rename).

**Recommendation:** D.2 — additive parent-Technique cross-reference field. Allows hierarchical grouping without renames. Apply same pattern to other overlap cases (T10.001 ⊂ T11.001 / T11.003).

### E — T11.004 missing slot

**Current:** `techniques/T11.001-*`, `T11.002-*`, `T11.003-*`, `T11.005-*`, `T11.006-*`, ..., `T11.009-*`. T11.004 was reserved in TAXONOMY-GAPS for "Insufficient-Entropy Key Generation" (Wintermute / Profanity Sep 2022 — already a worked example: `examples/2022-09-wintermute-profanity-cohort.md`).

**Action:** create `techniques/T11.004-insufficient-entropy-key-generation.md` referencing the existing Wintermute example. Backfill the slot. Schema additive.

### F — T7.004 vs T12.001 NFT wash duplication

**T7.004:** NFT Wash-Laundering — laundering-motivated wash-trade in NFTs.
**T12.001:** NFT Wash-Trade Volume Inflation — market-manipulation-motivated wash-trade in NFTs.

**Same on-chain artefact, two intent classifications.** Detection signal is identical (cyclic counterparty graph). Mitigation is identical at platform layer.

**Recommendation:** keep both, but add explicit `**Adjacent technique:**` cross-reference on each pointing to the other, and document in the parent Discussion that the artefact is shared and the classification depends on motive (which is rarely directly observable on-chain). This is a documentation fix, not a structural change.

### G — T8 Operational Reuse — attribution Tactic, not attack Tactic

**T8.001:** Common-Funder Cluster Reuse — operator continuity across incidents.
**T8.002:** Cross-Chain Operator Continuity — operator activity across chains.

**Both are forensic markers**, not attacker actions. The "attack" was performed in some other Tactic; T8 documents that the same operator did multiple of them. This makes T8 *categorically different* from the other Tactics.

**Options:**

- **G.1 Lift T8.x to a new top-level concept** — "Attribution Signals" (parallel to Tactics, like Mitigations or Data Sources). Schema major.
- **G.2 Rename T8 to "Operator Continuity / Attribution Signals"** — make the categorical difference explicit at the Tactic name. Additive (schema-major if ID renamed; can keep T8 ID and just rename the human-readable name).
- **G.3 Migrate T8.001 / T8.002 to live as Data Source decompositions** — they describe data-source patterns more than attack patterns. Schema major.

**Recommendation:** G.2 keep ID, rename to "T8 — Operator Continuity / Attribution". Update Tactic file Description to clearly say "this Tactic captures cross-incident attribution signals, not new attacker actions." Cheapest. Documentation fix only.

### H — T10.001 / T11.001 / T11.003 overlap

**T10.001:** Validator / Signer Key Compromise (bridge-specific).
**T11.001:** Third-Party Signing Vendor Compromise (bridge / wallet / custody — all).
**T11.003:** Multisig Contract Manipulation.

**Problem:** Bridge-validator multisig compromise can hit all three. T10.001 is the bridge-specific reading of T11.001 / T11.003.

**Recommendation:** Same as D.2 — add `**Parent Techniques:**` cross-reference field on T10.001 declaring it as the bridge-specific sub-class of T11.001 / T11.003. Document overlap explicitly.

### I — T15 partial shadow on T11.001

**Problem:** After T15 introduction, T11.001 (Third-Party Signing Vendor Compromise) is dual-mapped on Bybit / Atomic Wallet / similar cases as both T15.001 (social engineering) + T15.002 (supply-chain) + T15.003 (endpoint compromise) + T11.001. The T11.001 narrative still includes the off-chain pre-positioning phase that should be delegated to T15.x.

**Recommendation:** refactor T11.001's `## Description` to focus on the *on-chain manifestation* (UI substitution → cold-to-warm transfer redirection). Move pre-positioning narrative to T15.001 / T15.003. T11.001 examples keep mapping to both. Documentation cleanup, not structural change.

### J — T6 sub-cluster split

**Current T6 sub-Techniques:**

- T6.001: Source-verification-mismatch
- T6.002: Fake-audit-claim
- T6.003: Audit-of-different-bytecode-version
- T6.004: Audit-pending-marketing-claim
- T6.005: Proxy-Upgrade Malicious Switching
- T6.006: Counterfeit Token Impersonation
- T6.007: Trust-substrate Shift / Vendor-side Promise Revocation

**Two distinct sub-clusters:**

- *Pre-deployment / off-chain claim falsification* (T6.001-004): the attacker lies about the contract's audit status / source verification.
- *Operational defense-evasion* (T6.005-007): the attack hides itself from runtime detection.

**Recommendation:** acknowledge in T6's Tactic-level Description that the Tactic has two sub-clusters with different defender surfaces. No ID renames needed.

## Proposed action plan

### Cheap (additive, schema-minor)

1. **T11.004 backfill** — create `techniques/T11.004-insufficient-entropy-key-generation.md` referencing existing Wintermute example.
2. **Maturity vocabulary widening** — update VERSIONING.md to canonicalize five values (stable / emerging / observed / draft / deprecated). No file changes required if the ones that say `observed` keep saying `observed`.
3. **Phase controlled vocabulary** — write `tactics/README.md` documenting the five-or-six canonical phases. Update each Tactic's `**Phase:**` line to match. Documentation fix.
4. **Adjacent-technique cross-reference field** — add optional `**Adjacent techniques:**` and `**Parent techniques:**` lines to technique-file template. Document in CONTRIBUTING.md. Apply to T7.004↔T12.001, T11.002⊂T15.002, T10.001⊂T11.001/T11.003.
5. **T9.003 scope refinement** — narrow T9.003 to "Protocol-layer governance-binding bug exploitation" (vs T16.x voting-power abuse). Documentation update on the technique file.
6. **T11.001 scope cleanup** — narrow `## Description` to on-chain manifestation; delegate off-chain phase to T15.x.
7. **T8 rename (human-readable name only, ID kept)** — "T8 — Operator Continuity / Attribution Signals". Documentation update in Tactic file.
8. **T6 sub-cluster documentation** — Tactic file Description acknowledges the two sub-clusters explicitly.

These eight changes are all additive or doc-only; no schema major bump required.

### Expensive (breaking, schema-major)

These would each bump schema 0.3 → 1.0:

- T9.003 deprecate → migrate (Option A.1) — large blast radius across worked examples.
- T11.002 deprecate → migrate (Option D.1).
- T8 → "Attribution Signals" lift to new axis (Option G.1).

**Recommendation:** defer all schema-major changes to v1.0. v0.x runs additive-only. The cheap actions cover ~80% of the audit findings. The expensive ones are aesthetic / philosophical refinements that don't change defender utility.

## Maturity audit (per-file)

Random spot-check across 6 files:

| Technique | Maturity | Anchors | Comment |
|---|---|---|---|
| T11.001 | stable | 5+ | Correct (multi-anchor, multi-vendor) |
| T11.005 | emerging | 4 | Should likely promote to `stable` (4 anchors, multiple vendor narratives) |
| T1.001 | stable | ? | Verify anchors |
| T13.001 | observed | 1+ | Vocabulary widening (B.1) makes this OK; otherwise rename to `emerging` |
| T16.004 | draft | 0 | Correct |
| T9.005 | stable | 20 | Correct |

Full per-file maturity sweep is a follow-up activity (script-driven: count anchors per technique, recommend maturity per anchor count + vendor diversity).

## Summary recommendation

**Do all 8 cheap fixes in v0.4 (additive, schema-minor).** Defer the 3 expensive structural decisions to v1.0 with explicit RFC. The cheap fixes resolve most of the user-facing classification confusion without breaking downstream consumers (oak-mcp, vendor coverage maps).

**Suggested order (one v0.4 cycle):**

1. T11.004 backfill (1 file).
2. Phase / Maturity vocabulary canonicalization (VERSIONING.md + tactics/README.md + ~14 Tactic files).
3. Adjacent / Parent technique cross-reference fields (template change + ~10 technique-file updates).
4. T9.003 scope refinement + T11.001 scope cleanup + T8 rename + T6 sub-cluster documentation (4 doc updates).

That's one focused PR cycle. Validators don't change shape — `check_linkage.py` already accepts the existing structure.
