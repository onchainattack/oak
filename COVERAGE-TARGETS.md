# OAK Coverage Targets

Per-Tactic minimum-coverage thresholds. Used by `tools/check_targets.py` and `tools/build_backlog.py` to surface where the corpus is below target so contributors can prioritize.

These thresholds are **operational floors**, not aspirations. They reflect the minimum coverage OAK needs to be useful as a defender's reference for that Tactic in a given active year. Above the floor is good. Below is documented debt.

## Active-year minimums

| Tactic | Name | Active since | Min examples / active year |
|---|---|---:|---:|
| T1 | Token Genesis | 2020 | 5 |
| T2 | Liquidity Establishment | 2020 | 3 |
| T3 | Holder Capture | 2021 | 2 |
| T4 | Access Acquisition | 2020 | 4 |
| T5 | Value Extraction | 2020 | 4 |
| T6 | Defense Evasion | 2022 | 2 |
| T7 | Laundering | 2018 | 4 |
| T8 | Operational Reuse | 2020 | 3 |
| T9 | Smart-Contract Exploit | 2020 | 5 |
| T10 | Bridge / Cross-Chain | 2021 | 3 |
| T11 | Custody / Signing | 2018 | 3 |
| T12 | NFT-Specific | 2021 | 2 |
| T13 | Account Abstraction | 2024 | 3 |
| T14 | Validator / Staking | 2023 | 3 |

## How to read this

- **Active since** — the calendar year the Tactic became materially active in the public attack record. Years before this are not expected to have coverage and are excluded from target-violation checks.
- **Min / active year** — the floor. A Tactic-year cell with fewer documented incidents is flagged as P0 (zero) or P1 (under-target) by `tools/check_targets.py`.
- The *current* calendar year is always excluded because it's in progress.

## How thresholds are set

Conservative — biased toward "what does a defender actually need" rather than "what's discoverable on Twitter." If the public record genuinely has fewer than the threshold count for a year, OAK should still try to anchor what's there; if the record is rich, OAK should not stop at the threshold.

If a threshold consistently can't be met for a Tactic-year because the underlying public record is genuinely thin, that's a finding — document the absence in `TAXONOMY-GAPS.md` rather than lower the threshold. Lowering the threshold to fit current coverage hides debt.

## How thresholds change

Edit this table in a PR with rationale. Every change must update both this document AND the `COVERAGE_TARGETS` constant in `tools/build_backlog.py` and `tools/check_targets.py`. The CI strict-targets check will fail until both stay in sync.

A threshold should be raised when:
- The public record for a Tactic-year is materially richer than the floor reflects
- A new sub-Technique class is introduced that needs anchor cases
- A new Tactic is added (set its initial floor based on the year it becomes active)

A threshold should be lowered only when:
- The Tactic is being deprecated or merged into another
- The public record is genuinely thinner than initial estimate (and TAXONOMY-GAPS reflects the absence)

## Why floor-based rather than absolute counts

A flat "every Tactic must have 50 examples" goal would over-weight T9 (which has 80+ already) and under-weight T13 (only deployable since 2024). Per-active-year floors normalize against when the Tactic actually became attackable in the wild.

## Related

- `tools/check_targets.py` — runs the check
- `tools/build_backlog.py` — emits the prioritized backlog
- `tools/check_known.py` — pre-flight duplicate check before researching a candidate
- `TAXONOMY-GAPS.md` — proposed sub-Techniques not yet promoted
- `VERSIONING.md` — how schema, content, and per-item maturity version separately
