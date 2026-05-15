# OAK Methodology v0.1.0

**Status:** draft
**Maintainer:** @iZonex
**Target audience:** researchers citing OAK, detection vendors evaluating coverage claims, protocol teams assessing threat-model completeness

This document defines how OAK techniques are defined, classified, validated, and evolved. It is the normative statement of OAK's intellectual commitments — what the taxonomy claims, what evidence backs each claim, and how claims change over time. Readers evaluating whether OAK is appropriate for a given use case should start here.

---

## 1. What OAK is

OAK is an open, vendor-neutral taxonomy of adversary behavior observed against on-chain assets. It is modelled on MITRE ATT&CK's structural shape (Tactics → Techniques → Sub-Techniques, per-item maturity, detection-oriented prose) but built for crypto's threat surface: public-ledger finality, anonymous adversaries, smart-contract code as the attack surface, money-and-laundering as the primary objective, and no patchable endpoints.

OAK makes three core claims:

1. **Completeness of the Tactic space.** The 17 Tactics (T1–T17) partition the on-chain adversarial kill chain from token genesis through laundering and operational continuity. Every on-chain adversarial action observable by a defender belongs to at least one Tactic.

2. **Detection-orientation.** Every Technique describes what a defender, investigator, or risk team observes — not how an attacker operates. Technique pages carry observed indicators, detection signals, and vendor-neutral detection specs.

3. **Stable identifier system.** `OAK-Tn.NNN` identifiers are stable across schema versions. Renaming or removing an ID is a breaking change that triggers a deprecation window of one schema-minor cycle.

OAK does **not** claim:

- Exhaustiveness of the Technique space (new Techniques are added as new threat classes emerge).
- Probabilistic calibration out of the box (spec parameters are expert-heuristic defaults; per-deployment calibration is the implementor's responsibility per CALIBRATION.md).
- Attribution certainty (worked examples carry attribution-strength labels, not attribution conclusions).

---

## 2. Taxonomy structure

```text
Tactic (T1–T17)
├── Technique (Tn.NNN)
│   ├── Sub-Technique (Tn.NNN.NNN) — optional
│   ├── Detection Spec (specs/Tn.NNN-*.yml)
│   ├── Worked Examples (examples/*.md)
│   └── Mitigations (M01–M40, many-to-many)
├── Threat Actor / Group (G01–Gnn)
├── Software / Malware Family (S01–Snn)
└── Data Source (DS-01–DS-nn)
```

### 2.1 Tactics

Tactics represent **why** an action is performed — the adversarial objective at a specific phase of the kill chain. Each Tactic carries a `**Phase:**` field from a six-value controlled vocabulary: Pre-positioning, Pre-launch/Launch, Targeted compromise, Realization, Post-extraction, Cross-cutting. The Tactic space is designed to be complete: every on-chain adversarial action maps to at least one Tactic.

### 2.2 Techniques

Techniques represent **how** an objective is achieved — the specific adversarial behavior observed on-chain or in off-chain pre-positioning. A Technique is defined by:

- A stable identifier (`OAK-Tn.NNN`)
- A defender-language description of the observed pattern
- Observed indicators (what an analyst sees)
- Detection signals (what a detector queries)
- At least one worked example (for `observed` maturity and above)

### 2.3 Sub-Techniques

Sub-Techniques refine a Technique into operationally distinct sub-classes where the mitigation surface differs. They follow a `Tn.NNN.NNN` numbering scheme. Sub-Techniques are promoted when a Technique's sub-patterns require distinct detection logic or distinct mitigations that would be lost under a single entry.

### 2.4 Worked Examples

Worked examples are the evidential anchor of the taxonomy. Each example documents a publicly known incident mapped to one or more Techniques. Examples carry an **attribution-strength label**: `confirmed` (multi-source consensus, law-enforcement or official attribution), `inferred-strong` (single forensic vendor + on-chain evidence), `inferred-weak` (single source, partial evidence), `pseudonymous` (addresses identified, no entity attribution), `unattributed` (no meaningful attribution).

### 2.5 Detection Specs

Each Technique has a corresponding YAML detection spec (`specs/Tn.NNN-*.yml`) carrying vendor-neutral pseudocode, data sources, parameters, test fixtures, false-positive modes, and reference implementations. Specs are Sigma-shaped: each spec defines orthogonal `PATH A / PATH B / ...` detection paths that can be implemented independently. The pseudocode grammar is formally specified in PLS.md.

---

## 3. Maturity model

Each Technique, Mitigation, Software, and Threat Actor carries a `**Maturity:**` field with exactly one of five canonical values:

| Maturity | Evidence bar | Example anchors | ID stability |
|---|---|---|---|
| **draft** | Proposed in TAXONOMY-GAPS.md; no example anchors | 0 | Not stable; may be merged, promoted, or dropped |
| **emerging** | Definition recently introduced; ≤2 worked examples; single-vendor or single-source attestation | 1–2 | Scope refinement expected; not yet rename-stable |
| **observed** | Field-confirmed at a single anchor; pattern is real and documented | ≥1 | ID is stable; scope may refine |
| **stable** | Multi-vendor agreement; ≥3 anchored worked examples | ≥3 | ID and definition are fixed; renames are breaking |
| **deprecated** | Marked for removal; replaced by another ID | N/A | Carries `**Replaced by:**` cross-reference; resolvable for one schema-minor cycle |

The distinguishing criterion between `emerging` and `observed` is **breadth of independent attestation**: `emerging` is a recently introduced definition with a small worked-example set; `observed` is a field-confirmed-at-a-single-anchor pattern whose cross-vendor agreement is still pending. Either may be promoted to `stable` once the ≥3 anchored worked-examples and multi-vendor-agreement bar is met.

A Technique cannot be `stable` with fewer than 3 worked examples. A Technique cannot be `observed` with 0 worked examples. These constraints are enforced by `tools/check_linkage.py`.

---

## 4. Evidence standards

### 4.1 What counts as a worked example

A valid worked example must:

- Reference a publicly documented incident (on-chain transaction data, published forensic report, law-enforcement statement, or credible security-researcher disclosure).
- Be filed under `examples/YYYY-MM-<slug>.md`.
- Map to at least one OAK Technique via an `**OAK Techniques observed:**` field.
- Carry an attribution-strength label.

### 4.2 What does NOT count as a worked example

- Theoretical attack descriptions without an on-chain incident.
- Private or unverifiable reports.
- Anecdotes without transaction-level evidence or credible published analysis.
- The same incident filed under multiple example files (one incident = one example file; the example may map to multiple Techniques).

### 4.3 Multi-incident cohort examples

When a Technique's operational surface spans many small, structurally identical incidents (e.g., honeypot token deployments, address-poisoning dust attacks), OAK uses **cohort examples** — a single example file covering a date range, summarizing the pattern and aggregate loss, with representative transaction hashes. A cohort example counts as one worked example for maturity purposes but may reference dozens or hundreds of individual incidents.

---

## 5. Classification rules

### 5.1 When to split (promote a sub-Technique)

A sub-pattern should be promoted to its own sub-Technique when:

1. Its mitigation surface is structurally distinct from the parent Technique's mitigation surface.
2. Its detection pseudocode differs materially (different data sources, different PATH structure).
3. It has at least one documented incident distinct from the parent's canonical anchors.

### 5.2 When to merge

Two Techniques should be merged when:

1. They share the same on-chain artefact, detection signal, and mitigation surface.
2. The only difference is operator motive (which cannot be observed on-chain).

In this case, the motive-distinction is documented under `**Adjacent Techniques:**` cross-references, and the Techniques remain separate but explicitly linked.

### 5.3 When to deprecate

A Technique should be deprecated when:

1. It is superseded by a more specific sub-Technique family.
2. Its threat class is no longer observable (e.g., a vulnerability class patched at the protocol layer with no instances in >2 years).
3. It is merged into another Technique.

Deprecation follows the backwards-compatible window defined in VERSIONING.md: mark `**Maturity:** deprecated`, add `**Replaced by:**`, keep the ID resolvable for one schema-minor cycle.

### 5.4 The Tactic assignment rule

A Technique is assigned to the Tactic representing the **dominant** adversarial objective. When a Technique spans multiple Tactics (e.g., a flash loan enables both a governance attack and a treasury drain), the Technique lists multiple Parent Tactics, and worked examples carry the full chain. The Parent Tactic ordering places the **load-bearing** Tactic first.

---

## 6. Detection engineering model

OAK separates three concerns:

1. **Spec (what to detect).** Vendor-neutral pseudocode, data sources, parameters, test fixtures. Defined in `specs/`. Validated by `tools/build_specs.py`.

2. **Calibration (how to tune it).** Per-deployment parameter adjustment for a specific chain, protocol, and asset class. Methodology defined in CALIBRATION.md.

3. **Implementation (how to run it).** Vendor-specific code binding logical data sources to real RPC endpoints, indexer APIs, or off-chain feeds. Reference implementations are declared in each spec; the OAK project maintains `mg-detectors-rs` as the canonical open-source reference.

This separation ensures that a spec authored once can be implemented by any vendor, calibrated for any chain, and evaluated against shared test fixtures. A vendor claiming "coverage of OAK-T5.001" must demonstrate that their detector fires on the spec's positive fixtures and does not fire on its negative fixtures.

### 6.1 PLS Conformance Levels

PLS.md defines five conformance levels for spec implementations:

| Level | Name | Requirement |
|---|---|---|
| L0 | **Parseable** | Pseudocode parses against PLS grammar |
| L1 | **Executable** | Parses and executes without runtime errors against test fixtures |
| L2 | **Semantically Correct** | Emits expected PATH labels for positive fixtures; no emit for negative fixtures |
| L3 | **Vendor-Bound** | Runs against a specific vendor's data-source bindings |
| L4 | **Calibrated** | Parameters tuned per CALIBRATION.md for a specific deployment context |

---

## 7. Relationship to existing frameworks

### 7.1 MITRE ATT&CK

OAK adopts ATT&CK's structural shape (Tactics → Techniques → Sub-Techniques, per-item maturity, detection-oriented prose, STIX export) but the Technique space is disjoint: ATT&CK models enterprise IT adversary behavior (phishing, lateral movement, C2, credential dumping); OAK models on-chain adversary behavior (token genesis manipulation, liquidity establishment fraud, flash-loan-enabled exploitation, cross-chain laundering). An incident may chain ATT&CK Techniques (e.g., T1566 spear-phishing via LinkedIn) with OAK Techniques (e.g., T15.001 operator-personnel social engineering → T11.001 signing-vendor compromise). The two taxonomies are complementary, not competing.

The STIX export at `tools/oak-stix.json` uses ATT&CK's STIX extension pattern so that joint ATT&CK+OAK mappings are mechanically composable.

### 7.2 CWE / OWASP Smart Contract Top 10

OAK T9 (Smart-Contract Exploit) overlaps with CWE entries for reentrancy (CWE-841), access control (CWE-284), and precision loss (CWE-682). OAK's contribution is the operational context: which contract-level vulnerability classes have been exploited at scale, what the observed indicators look like, and which detection signals produce actionable alerts. CWE classifies the vulnerability; OAK classifies the adversarial behavior that exploits it.

### 7.3 FATF / AML frameworks

OAK T7 (Laundering) and T11 (Custody/Signing) map to FATF Recommendation 16 (Travel Rule), Recommendation 15 (VA risk assessment), and the jurisdictional VASP-regulatory taxonomy. OAK's contribution is the operational detection layer: what the on-chain artefact of Travel Rule evasion looks like, how sub-threshold structuring clusters are identified, and which VASP-avoidant routing patterns are observable from public-ledger data.

---

## 8. Governance

### 8.1 Maintainer model

OAK is maintained by a core team (@iZonex and contributors) with final authority over:

- Schema version bumps.
- Technique ID assignment.
- Maturity promotion (draft → emerging → observed → stable).
- Deprecation decisions.

Community contributions follow the PR model defined in CONTRIBUTING.md. A PR that adds a new Technique must include: the Technique file, a detection spec, at least one worked example, and passing linkage/backlink checks.

### 8.2 Dispute resolution

Classification disagreements (e.g., whether a specific incident should map to T9.003 vs T16.001) are resolved via the following priority:

1. **On-chain artefact.** What did the transaction actually do?
2. **Load-bearing surface.** Which primitive failed (contract code vs voting-power assumption)?
3. **Defender relevance.** Which classification produces the most actionable detection signal?

When the on-chain artefact is ambiguous, the example maps to multiple Techniques and the ambiguity is documented.

### 8.3 External review

OAK welcomes academic peer review, vendor technical review, and practitioner feedback. The taxonomy is published under a permissive license. Formal academic publication (DOI, peer-reviewed venue) is a v1.0 goal; v0.x is the pre-publication consolidation phase.

---

## 9. How to cite

Academic citations should reference the content snapshot date and the specific Technique or Tactic cited:

```bibtex
@misc{oak2026,
  author = {{OAK Contributors}},
  title  = {OAK -- OnChain Attack Knowledge v0.1},
  year   = {2026},
  note   = {Content snapshot 2026-05-15. \url{https://github.com/onchainattack/oak}},
}
```

Technique-specific citations should include the Technique ID in the citation key:

```bibtex
@misc{oak2026-t9001,
  author = {{OAK Contributors}},
  title  = {OAK-T9.001 -- Oracle/Price Manipulation},
  year   = {2026},
  note   = {OAK v0.1, Technique entry. \url{https://github.com/onchainattack/oak}},
}
```

---

## 10. Versioning

OAK uses three-axis versioning (schema / content snapshot / per-item maturity) as defined in VERSIONING.md. In brief:

- **Schema version** (semver) governs structural shape (field names, ID format, relationship types).
- **Content snapshot** (date-based) pins the state of the corpus at a point in time.
- **Per-item maturity** (controlled vocabulary) signals how reliable each definition is right now.

Consumers should pin according to their risk profile — see VERSIONING.md § "How to pin" for the decision matrix.

---

## 11. Related documents

| Document | Purpose |
|---|---|
| VERSIONING.md | Schema versioning, breaking changes, deprecation policy |
| CONTRIBUTING.md | How to submit Techniques, Examples, Mitigations, Software, Groups |
| CALIBRATION.md | Per-deployment parameter calibration methodology |
| PLS.md | Pseudocode Language Specification — grammar, type system, runtime contract |
| DSR.md | Data Source Schema Registry — provider binding for every logical data source |
| SPECS.md | Auto-generated detection-spec index with maturity and coverage |
| STATS.md | Auto-generated corpus statistics |
| BACKLOG.md | Coverage gaps, contributor backlog, open TAXONOMY-GAPS proposals |
| TAXONOMY-AUDIT.md | Structural review of classification mistakes and overlap (point-in-time audits) |
| tactics/README.md | Phase controlled vocabulary, optional cross-reference fields |
