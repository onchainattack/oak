# OAK Research Cadence

Predictable research rhythm so contributors can plan around it and the corpus doesn't drift between bursts and droughts.

## Cadence

| Frequency | Focus | Responsible | Output |
|---|---|---|---|
| Monthly | New incidents (any Tactic) — keep recency tight | Maintainers + community | New `examples/` files for the prior month's significant incidents |
| Quarterly | Named focus area — close one specific gap deeply | Maintainers (call for community contribution) | Cohort wave of 8-15 worked examples + TAXONOMY-GAPS proposals |
| Annual | Schema review, per-item maturity sweep, deprecation | Maintainers | Schema version bump + maturity promotions / demotions in CHANGELOG |

## Quarterly focus rotation

The quarterly focus is announced one month in advance with a tracking GitHub issue listing candidate cases. Contributors can claim items via that issue. Past or planned focus quarters:

- **2026 Q2** — hardware-wallet / cold-storage / seed-phrase exfiltration cohort. LastPass 2022 cascade, tampered-device cohort, hardware-wallet-specific T11.x, T6 trust-substrate-shift.
- **2026 Q3** — **T12 (NFT-Specific Patterns), announced 2026-08-16**, selected by the rule below: T12 tied for the most `check_targets.py --strict` P1 cells (2021 and 2026) and carried the most TAXONOMY-GAPS candidates without anchors (three) of any Tactic. Scope is **NFT-fi rather than the 2021–2022 marketplace surfaces** — the classic T12 trio (wash trading, counterfeit mint, royalty bypass) describes a market structure that has contracted, while the live attack surface has migrated into protocols that make non-fungible assets behave fungibly. Wave one (2026-08) landed **OAK-T12.006** (NFT-Collateral Lending Manipulation, anchored XCarnival 2022-06 and Omni Protocol 2022-07), **OAK-T12.007** (Mint-Outcome Reroll, anchored Meebits 2021-05), the **T12.008** hybrid-standard forward candidate (anchored Flooring Protocol 2026-06), and closed both P1 year cells. Remaining open for the quarter: a second hybrid-standard anchor to promote T12.008, marketplace listing manipulation beyond stale-listing front-running, and RWA-NFT bridge surfaces.
- **2026 Q4** — TBD. Annual cleanup + structural sweep.

The selection rule: pick the Tactic with the highest number of P0/P1 violations from `tools/check_targets.py --strict` plus the highest number of TAXONOMY-GAPS candidates without anchors.

## Monthly cadence

A simpler rhythm. Every month the maintainer (or community) sweeps:

1. **Check known incidents** — read `tools/build_stats.py --terse` to see corpus totals and the Recent year-month panel.
2. **Identify recent gaps** — incidents from the prior month that have public forensic write-ups but aren't in OAK yet.
3. **Pre-flight duplicate check** — for each candidate, run `tools/check_known.py "<description>"` before research.
4. **Write examples** — submit PRs with the standard template.
5. **Run validators** — `tools/check_citations.py` + `tools/check_linkage.py` + `tools/check_backlinks.py` (strict in CI). Auto-fixable.
6. **Update TAXONOMY-GAPS** if a new sub-Technique class emerges from the cohort.

## Annual cadence

Once a year:

1. **Schema review** — does the JSON / STIX export shape need a minor or major bump? Documented in `VERSIONING.md`.
2. **Maturity promotion / demotion** — every Technique, Mitigation, Software, Group with `**Maturity:**` field reviewed:
   - `draft` candidates with ≥ 1 anchor case → promote to `emerging`.
   - `emerging` items with ≥ 3 anchor cases AND multi-vendor agreement → promote to `stable`.
   - `stable` items whose definition has shifted → demote to `emerging` with a CHANGELOG note.
3. **Deprecation sweep** — items proposed for deprecation get a one-minor-cycle window per `VERSIONING.md`.
4. **Source diversity audit** — `tools/source_diversity.py` to confirm no provider monopoly is growing. Surface under-used providers and seed them into the next quarter's research focus.

## Why a cadence at all

Without a cadence, an open framework drifts. Maintainer attention is bursty; community contribution is sparse without a published expectation. A predictable rhythm:

- Lets contributors plan ("Q3 is NFT — I'll prep an example over August").
- Keeps the corpus matching the threat surface ("monthly sweep caught the 2026-04 RaveDAO incident within three weeks of disclosure").
- Surfaces drift early ("annual audit shows top-3 providers now carry 65% of citations — we need to diversify in Q1").
- Gives users of OAK a predictable signal of how fresh the data is on a given page.

## Related

- `tools/build_backlog.py` — prioritized contributor backlog regenerated from corpus state
- `tools/check_targets.py` — per-Tactic floor enforcement
- `tools/check_known.py` — pre-flight duplicate check
- `tools/source_diversity.py` — citation-publisher distribution audit
- `COVERAGE-TARGETS.md` — per-Tactic minimums
- `VERSIONING.md` — schema / content / per-item maturity model
- `CONTRIBUTING.md` — submission flow + local checks
