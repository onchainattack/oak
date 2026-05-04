# OAK Versioning

OAK is a living knowledge base. Strict semver versioning of the corpus as a whole doesn't fit — adding a worked example shouldn't bump a major version, renaming a Technique ID is a breaking change for downstream consumers, and the corpus changes daily as new incidents land. This document describes OAK's versioning approach, what counts as a breaking change, and how downstream consumers should pin against the framework.

## Three-axis versioning

OAK separates three independent concerns and versions each on its own axis.

### 1. Schema version (semver)

The **schema** is the structural shape of OAK objects: field names, relationship types, ID conventions, the JSON / STIX export format. The schema is versioned with strict semver because downstream tools (`oak-mcp`, third-party detectors, vendor-side coverage maps) depend on stable shape contracts.

- **Major** (X.0.0) — breaking change to field names, ID format, relationship types, or removal of an axis.
- **Minor** (0.X.0) — additive change: new optional field, new relationship type, new axis.
- **Patch** (0.0.X) — non-structural fix: typo in field documentation, clarifying example in CONTRIBUTING.

Current schema version is published in `tools/oak.json` under `"schema_version"`.

### 2. Content snapshot (date-based)

The **content** is the corpus itself: Tactics, Techniques, Mitigations, Software, Threat Actors, Data Sources, and worked examples. Content evolves daily and snapshot-pinning is the right model — date-based, immutable once published.

- Format: `YYYY-MM-DD` (e.g. `2026-05-03`).
- Snapshot is the state of `main` at midnight UTC on the named date.
- A signed snapshot tag (`snapshot/2026-05-03`) is published on git when the snapshot is cut.
- The `tools/oak.json` and `tools/oak-stix.json` exports embed `"generated_at"` so any consumer can identify the snapshot they received.

Snapshots are produced quarterly at minimum and on-demand for major events (taxonomy reorganization, large research wave landing).

### 3. Per-item maturity (controlled vocabulary)

Each Tactic, Technique, Mitigation, Software, and Group has a `**Maturity:**` field on its page with **exactly one** of the five canonical values:

- **stable** — definition fixed, multi-vendor agreement, ≥ 3 anchored worked examples. Renames or scope changes are breaking.
- **emerging** — definition recently introduced, single-vendor or single-source attestation, ≤ 2 worked examples. Scope refinement expected; not yet rename-stable.
- **observed** — occurred in the wild but field-confirmed at a single anchor; awaiting cross-vendor agreement. Pattern is real and documented; the breadth of independent attestation needed for `emerging` or `stable` has not yet landed.
- **draft** — proposed in `TAXONOMY-GAPS.md`, no example anchors yet, definition open for community input. May be promoted, merged, or dropped.
- **deprecated** — marked for removal, replaced by another ID. Carries a `**Replaced by:**` cross-reference and remains resolvable for at least one schema-minor cycle (see *Backwards-compatible deprecation* below).

The five-value vocabulary was widened from four (stable / emerging / draft / deprecated) at schema 0.5 to canonicalise the `observed` distinction that v0.1–v0.4 files were already using to capture single-anchor in-the-wild patterns awaiting cross-vendor agreement. The structural difference between `emerging` and `observed` is breadth-of-independent-attestation: `emerging` is a recently-introduced definition with a small worked-example set; `observed` is a field-confirmed-at-a-single-anchor pattern whose cross-vendor agreement is still pending. Either may be promoted to `stable` once the ≥ 3 anchored worked-examples and multi-vendor-agreement bar is met.

Worked examples carry an attribution-strength label instead of a maturity field — see CONTRIBUTING.md for the convention (`confirmed` / `inferred-strong` / `inferred-weak` / `pseudonymous` / `unattributed`).

## What counts as breaking

For downstream consumers (vendor coverage maps, `oak-mcp`, automated detectors), the following changes are breaking and bump the **schema** major version:

- Renaming or removing an OAK ID (`OAK-T*`, `OAK-G*`, `OAK-M*`, `OAK-S*`, `OAK-DS-*`).
- Removing a field from `tools/oak.json` schema.
- Changing a relationship type semantic.
- Changing the meaning of an attribution-strength label.

The following are **not** breaking, even when they touch many items:

- Adding a new Tactic, Technique, Mitigation, Software, Group, Data Source, or worked example.
- Adding new optional fields to existing objects.
- Adding new relationships between existing objects.
- Promoting a `draft` item to `emerging`, or `emerging` to `stable`.
- Adding new TAXONOMY-GAPS candidates.
- Adding a new attribution-strength label to a worked example.
- Demoting a `stable` item to `emerging` (definition refinement) — flagged in CHANGELOG but not breaking unless the ID is renamed.

## How to pin

| Consumer profile | Recommended pin |
|---|---|
| Reference-implementation vendors building production detectors | Pin **schema** major version + track latest **content** snapshot. |
| Threat-intel platforms ingesting OAK as one source among many | Pin **schema** minor version + track latest **content** snapshot. |
| Educational / documentation use | No pin — track latest. |
| Compliance / audit reference (point-in-time evidence) | Pin **content** snapshot date. |
| AI agent / LLM context (oak-mcp) | Pin **schema** major + track latest content; the MCP transport carries the snapshot date so the model can reason about freshness. |

## Backwards-compatible deprecation

When an item must be renamed or removed, OAK provides a deprecation window of one schema-minor cycle:

1. Mark the item `**Maturity:** deprecated` and add a `**Replaces:**` or `**Replaced by:**` cross-reference.
2. Keep the old ID resolvable in `tools/oak.json` for at least one minor version.
3. Update CHANGELOG with the rename and the upgrade path.
4. Remove the ID at the next major version.

## Schema version history

| Version | Date | Notes |
|---|---|---|
| 0.1 | 2026-04 | Initial public draft. 14 Tactics, 62 Techniques, 18 Threat Actors, 40 Mitigations, 40 Software, 12 Data Sources. |
| 0.2 | 2026-05 | Additive: T15 Off-chain Entry-Vector / Pre-Positioning Tactic + 5 sub-Techniques (T15.001–T15.005). 15 Tactics, 63+ Techniques. Existing T1–T14 IDs unchanged; existing T11.x / T4.x worked-example mappings preserved. Schema-minor bump per the additive-Tactic rule. |
| 0.3 | 2026-05 | Additive: T16 Governance / Voting Manipulation Tactic + 5 sub-Techniques (T16.001–T16.005). 16 Tactics, 93+ Techniques. Existing T9.003 / T9.001 / T8.001 / T5.005 / T9.002 mappings preserved on anchor examples; T16.x added as additional Technique mappings. |
| 0.4 | 2026-05 | Additive: T17 Market Manipulation Tactic + 4 sub-Techniques (T17.001–T17.004). 17 Tactics. T3.002 / T3.003 / T3.004 / T5.004 / T9.001 / T9.006.x now cross-reference T17 as additional parent. No existing IDs renamed; existing T3 / T5 / T9 parent-Tactic mappings preserved on every cross-referenced sub-Technique. |
| 0.5 | 2026-05 | Additive cheap fixes from `TAXONOMY-AUDIT.md`. T11.004 (Insufficient-Entropy Key Generation) backfilled, anchored at Wintermute / Profanity (Sep 2022). Maturity vocabulary widened from four to five canonical values (`stable` / `emerging` / `observed` / `draft` / `deprecated`) — `observed` and `developing` files normalised to the canonical set. Tactic `**Phase:**` field canonicalised to a six-value vocabulary (Pre-positioning / Pre-launch-Launch / Targeted compromise / Realization / Post-extraction / Cross-cutting); documented at `tactics/README.md`. Optional `**Parent Techniques:**` and `**Adjacent Techniques:**` fields documented at `tactics/README.md` and `CONTRIBUTING.md`; applied to T11.001 / T11.002 / T10.001 / T9.003 / T7.004 / T12.001. T9.003 scope refined to governance-contract-bug case (T16.x covers voting-power abuse). T11.001 scope refined to on-chain manifestation (off-chain pre-positioning delegated to T15.x). T8 human-readable name updated to "Operator Continuity / Attribution Signals" (ID `OAK-T8` unchanged). T6 sub-cluster split (T6.001–004 pre-deployment-claim-falsification vs T6.005–007 operational-defense-evasion) documented. No OAK ID renamed. 17 Tactics, 94 Techniques. |

## Content snapshot history

Snapshots are published as signed git tags (`snapshot/YYYY-MM-DD`). Consumers should reference snapshots by tag.

The earliest snapshot is the OAK v0.1 public draft commit. Subsequent snapshots will be cut as the corpus matures and downstream consumers ship dependencies.

## Why not just semver the whole thing

Crypto-attack surface evolves on a daily cadence. Tying corpus growth to semver releases would either make every minor release feel hollow ("we added one example") or batch incidents into multi-week release cycles that lag the threat landscape. The three-axis split lets the schema stay slow and contract-stable while content tracks reality and per-item maturity carries the social signal of how reliable each definition is right now.

The closest analogue in adjacent ecosystems is MITRE ATT&CK's separation of *enterprise framework versions* (semver-ish), *content updates* (rolling), and *technique deprecation status* (per-item). OAK adopts the same shape because the same operational pressure applies — a defender vocabulary that doesn't track active adversary behavior is decorative; one that bumps a major version every week is unusable.
