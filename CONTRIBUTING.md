# Contributing to OAK

Thanks for considering a contribution. OAK grows through pull requests from the community of on-chain investigators, detection engineers, security researchers, and protocol teams who work directly with these adversarial patterns. This document describes how to submit and what to expect.

## Scope of contributions

We accept PRs in any of the following categories:

| Category | What it looks like |
|---|---|
| **New Technique** | A new file under `techniques/` with a proposed `OAK-Tn.NNN` identifier. |
| **Tactic refinement** | Edits to an existing `tactics/Tn-*.md` improving description, scope, or relationships. |
| **Technique improvement** | Detection-signal additions, mitigation additions, new real-world example references, citation additions. |
| **New Mitigation** | A new file under `mitigations/` with a proposed `OAK-MNN` identifier. Mitigations are reusable defences mapping many-to-many to Techniques. |
| **New Software** | A new file under `software/` with a proposed `OAK-SNN` identifier. Tools, kits, and malware families used by Threat Actors. |
| **New Threat Actor / Group** | A new file under `actors/` with a proposed `OAK-Gnn` identifier. Tracked operators and operator-cohort families with explicit attribution-strength language. |
| **New Data Source** | A new file under `data-sources/` with a proposed `OAK-DS-NN` identifier. Telemetry-input identifiers used across the framework. |
| **Reference-implementation mapping** | A new row under "Reference implementations" pointing to your tool's coverage of an existing Technique or Mitigation. |
| **Real-world example** | A new file under `examples/` documenting a publicly known incident, mapped to one or more Techniques. |
| **Citation** | A new entry in `citations.bib` (with stable DOI / arXiv ID where possible). |
| **Tooling** | Improvements to `tools/` validators, exporters, or coverage-map generators. |
| **Relationship-graph edge** | A new entry exposed via `tools/oak.json` (mitigates / uses / detects / targets edge between existing axis entries). |

## Per-Technique template (defender's-eye-view)

OAK is a **detection and defense** framework, not an offensive playbook. Every Technique page is written from the perspective of **what a defender, investigator, or risk team observes** — not as instructions for performing an action. Use this template:

```markdown
# OAK-Tn.NNN — <Technique Name>

**Parent Tactics:** OAK-Tn (...), OAK-Tm (...)
**Maturity:** stable | observed | emerging
**Chains:** EVM | Solana | Tron | cross-chain
**First documented:** YYYY
**Aliases:** common informal names used by investigators

## Description

2–3 paragraphs in defender language: what this category of adversarial behavior
looks like in the wild, why it matters to risk teams, and where in the kill
chain it sits.

## Observed indicators

What an analyst sees when this Technique has been used. Bullet list of
on-chain or off-chain artifacts that are externally visible after the fact.

- Indicator 1 — what the artifact is, where it appears, why it correlates
  with this Technique, known false-positive scenarios.
- ...

## Detection signals

Concrete signals a detector or analyst can act on, ordered by reliability.
Each signal should be specific enough that a contributor can implement it.

- Signal 1 — what to look for, source data, threshold or rule notes,
  expected precision/recall trade-offs, false-positive notes.
- ...

## Real-world examples

Link to public, verifiable incidents only. Use forensic write-ups, post-mortem
reports, or on-chain transaction links. Do not link to live attacker
infrastructure.

- [Token / contract] — chain — date — loss (if public) — link to public
  forensic write-up or post-mortem.
- ...

## Reference implementations

Detection coverage of this Technique in known tools. Honest about partial
coverage and gaps.

- MG `mg-detectors-rs` — Dxx (link)
- GoPlus — partial via `<api_field>`
- RugCheck — partial / N/A
- ...

## Mitigations

What defenders can do to reduce exposure. Two audiences:

- **For traders / risk teams / investigators:** ...
- **For protocols / launchpads / venues:** ...

## Citations

Numeric or BibTeX-key list pointing into `citations.bib`.

## Discussion

Open questions, known edge cases, observed evasion variants. This is the
"living" section — issues and PRs land here first.
```

### Writing-style rules

- **Lead with what defenders see.** Description and Observed indicators come before any mention of mechanism.
- **No how-to.** Do not include attacker tutorials, working exploit code, or step-by-step execution recipes. OAK documents observable patterns, not procedures.
- **Cite or omit.** Every claim about prevalence, scale, or real-world incidents must cite a public source in `citations.bib` or link a public forensic write-up. Anecdote without citation gets removed in review.
- **Be honest about gaps.** If your Reference-implementation row is partial or untested, mark it that way. OAK's credibility depends on honest coverage claims.
- **No live attacker infrastructure.** Do not link to active drainer kits, live mixer front-ends, or recoverable C2. Cite the forensic write-up instead.

## Per-Mitigation template

```markdown
# OAK-MNN — <Mitigation Name>

**Class:** detection | architecture | operational | venue | wallet-ux
**Audience:** trader | protocol | venue | risk-team | vendor | wallet | custody-customer | custody-vendor | designer
**Maps to Techniques:** OAK-Tn.NNN, OAK-Tm.MMM, ...

## Description
2–3 paragraphs: what the mitigation is, the underlying defensive principle, why it works.

## How it applies
Per-Technique bullets — one bullet per mapped OAK-Tn.NNN with 1–2 sentences on the mitigation mechanism in that technique's context.

## Limitations
What this does NOT cover; where it fails; combinatorial gaps with other mitigations.

## Reference implementations
Vendor-side / open-source / formal-method tools. Honest "no production tooling yet" if none.

## Citations
- `[BIBKEY]` — short note
```

A mitigation is not a Technique-page mitigation bullet; it is a reusable cross-Technique surface that vendors and risk teams reference when scoping coverage. Use the test "would this mitigation address ≥3 Techniques across ≥2 audience classes?" — if not, the work probably belongs in a Technique-page Mitigations section, not a new OAK-MNN entry.

## Per-Software template

```markdown
# OAK-SNN — <Name>

**Type:** ransomware | malware | tool | drainer-kit | infostealer | mev-bot | vanity-gen | etc
**Aliases:** <comma list>
**Active:** yes | dormant | sunset (with date)
**First observed:** <date or quarter>
**Used by Groups:** <OAK-Gnn list, or "ecosystem-wide / not Group-specific">
**Host platforms:** Windows | macOS | Linux | EVM | Solana | cross-platform | etc
**Observed Techniques:** OAK-Tn.NNN, ...

## Description
2–3 paragraphs: what the tool/kit/family is, infection vector or operating model, role in the OAK-relevant attack chain.

## Observed examples
Per-incident references; link to existing `examples/` files where they apply.

## Detection / attribution signals
What defenders look for. NO specific file hashes — refer to live CTI feeds and named-vendor reporting instead.

## Citations
- `[BIBKEY]` — note

## Discussion
Lineage (predecessors / successors), market-share evolution, naming-overlap caveats, takedown / disruption history.
```

Software entries cover named tools and malware families; the operator group that uses them lives at `OAK-Gnn` actor entries. The Group/Software split keeps reusable tooling distinct from the operators that use it.

## Per-Group (Threat Actor) template

```markdown
# OAK-Gnn — <Group Name>

**Aliases:** <comma list>
**First observed in crypto:** <date>
**Attribution status:** confirmed | inferred-strong | inferred-weak
**Active:** yes | dormant | inactive (with last-observed date)

## Description
2–3 paragraphs.

## Targeting profile
- target type 1
- target type 2

## Observed Techniques
- OAK-Tn.NNN — short note

## Observed Examples
- examples/<incident>.md — short note

## Citations
- `[BIBKEY]` — note

## Discussion
Operator-profile evolution, TTPs over time, attribution caveats, cluster-boundary distinctions vs neighbouring OAK-G entries.
```

**Attribution-strength discipline.** OAK distinguishes three attribution levels: **confirmed** (multiple credible national-government or law-enforcement bodies have publicly attributed the activity — FBI press release, OFAC SDN, DOJ indictment, or multi-government joint advisory); **inferred-strong** (major industry forensic providers have published consistent attributions with technical evidence — wallet-cluster analysis, malware fingerprints, tactical fingerprints); **inferred-weak** (speculation or single-source attribution; OAK does not publish single-source attributions at v0.1). Be honest about which level applies and revise upward only when evidence supports it.

## Submission flow

1. **Open an issue first** for any new Technique or Tactic-level change. Use the `proposal:` label. The maintainers may comment on scope, ID assignment, or de-duplication before you spend effort drafting.
2. **Branch from `main`**, write your contribution following the template, run the local checks below, and open a PR.
3. **PR title format:** `[OAK-Tn.NNN] <short>` for Technique work, `[OAK-MNN] <short>` for Mitigation work, `[OAK-SNN] <short>` for Software work, `[OAK-Gnn] <short>` for Threat Actor work, `[OAK-DS-NN] <short>` for Data Source work, `[tactic Tn] <short>` for Tactic work, `[examples] <short>` for incident write-ups, `[tools] <short>` for code.
4. **Sign your work.** Add `Signed-off-by: Your Name <email>` to your commit (`git commit -s`). This certifies the [Developer Certificate of Origin](https://developercertificate.org/).

## Local checks before opening a PR

```sh
# markdown lint (matches the CI workflow)
npx markdownlint-cli2 "**/*.md"

# link check (slow; optional)
lychee --no-progress './**/*.md'

# citation-format validation + cross-reference check
python3 tools/check_citations.py

# forward references + worked-example structural completeness:
# every OAK-T*, OAK-G*, OAK-M*, OAK-S* mention resolves; every example has
# Loss / Techniques / Attribution / Summary / Public references sections.
python3 tools/check_linkage.py

# reverse anchors + bidirectional consistency:
# actor `## Observed Examples` and technique `## Real-world examples`
# sections must list every example that attributes / references them;
# mitigation `**Maps to Techniques:**` and software `**Used by Groups:**`
# metadata must resolve. v0.1 corpus has known legacy debt; new contributions
# must not add to it.
python3 tools/check_backlinks.py

# generate paste-ready bullets when populating actor or technique anchors:
python3 tools/suggest_backlinks.py --actor OAK-Gnn --only-missing
python3 tools/suggest_backlinks.py --technique OAK-Tn.nnn --only-missing

# inspect the corpus (year x Tactic, year-month, per-Technique density):
python3 tools/build_coverage_matrix.py --per-technique --monthly

# topline stats snapshot (counts, attribution distribution, gap surface):
python3 tools/build_stats.py

# regenerate the machine-readable export and commit the result if it changed
python3 tools/export_json.py
git diff --quiet -- tools/oak.json || git add tools/oak.json
```

## Review SLA

Maintainers commit to a **first response within 7 calendar days** of PR open. Substantive Technique reviews may take longer if peer-review is needed. If you have not heard back in 14 days, please ping `@iZonex` in a comment.

## Identifier assignment

- Tactic IDs (`OAK-T1` … `OAK-T14`) are stable for v0.x; new top-level Tactics will only be added at v1.0+ after community consultation.
- Technique IDs (`OAK-Tn.NNN`), Mitigation IDs (`OAK-MNN`), Software IDs (`OAK-SNN`), Threat Actor IDs (`OAK-Gnn`), and Data Source IDs (`OAK-DS-NN`) are assigned by maintainers at PR-open time, based on the proposed scope and the next free numeric slot.
- Once published, IDs are **never reused**. Deprecated entries are marked `Maturity: deprecated` (Techniques) or `Active: dormant / inactive` (Software, Groups) and remain in the repository with a pointer to the superseding entry.

## Code of conduct

Be excellent. Disagreements happen — keep them about the content. Maintainers will close threads that get personal.

## Maintainer contact

Initial maintainer: **Dmytro Chystiakov** ([@iZonex](https://github.com/iZonex)).

For sensitive disclosures or non-public real-world examples, please reach out off-list before opening a public PR.
