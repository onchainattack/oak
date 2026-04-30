# OAK-M28 — Token-Unlock Calendar Integration

**Class:** venue
**Audience:** venue (DEX aggregator, CEX, market-data aggregator), risk-team, trader
**Maps to Techniques:** OAK-T5.006

## Description

A scheduled-event integration in which the per-protocol vesting calendar is wired into venue-side, risk-team-side, and trader-side surfaces as a first-class input rather than treated as an out-of-band reference. The integration consumes one or more public unlock-tracker feeds (TokenUnlocks / Tokenomist, CryptoRank token-unlock dashboards, DefiLlama Unlocks open data) and produces three downstream surfaces: (a) per-protocol cliff schedules, recipient-cohort breakdown, and per-cohort allocation size displayed at trade time on the aggregator / venue UI, so that a trader entering a position is presented with the next cliff date and size before the trade rather than after; (b) per-recipient-cluster outflow monitoring during the window around a scheduled unlock, where the cluster-baseline cadence is built from the cohort's prior cliff-window behaviour and divergence from the cohort's stated disposal intent (sell / hold / OTC) is flagged as a standalone risk signal; (c) recurring listing-maintenance disclosure obligations, where the venue requires the project to publish ex-post cliff-window net-flow data alongside the ex-ante stated intent, so that materially-divergent behaviour is observable in subsequent listing-review cycles.

The defender's framing is that scheduled vesting cliffs are the canonical case of a known-future-event risk that today is treated as an unknown-unknown by most venues and most traders: the calendars exist (TokenUnlocks, CryptoRank, DefiLlama all publish them), the cohort breakdowns exist (project tokenomics docs publish them), and the per-cluster outflow data exists (on-chain), but the wiring between these three surfaces and the venue / aggregator UI is the structural gap. The mitigation closes the gap by making cliff-aware risk display and per-cohort outflow monitoring the default state, and by reframing the project's stated disposal intent at cliff as a defender-facing commitment that is verifiable ex-post rather than a marketing assertion.

The class is `venue` rather than `detection` because the mitigation requires venue-side integration work (calendar feed consumption, trade-time UI display, listing-maintenance disclosure policy) — a per-cluster outflow detector emitting alerts to a back-office dashboard does not satisfy the mitigation if the trader entering the position never sees the cliff context.

## How it applies

- **OAK-T5.006 (Vesting Cliff Dump):** the mitigation wires token-unlock-tracker calendars as scheduled-event input to the aggregator / venue trade-time surface, so cliffs are pre-known to the trader rather than a surprise; per-recipient-cluster outflow baselines are built from prior cliff-window behaviour, and cliff-window concentration is measured against the cohort's normal disposal cadence rather than against zero. Listing venues / launchpads require vesting-cliff disclosure (full schedule, recipient cohorts, intent statement) as a listing precondition, and require cliff-window post-disclosure (actual recipient-cluster outflow vs stated intent) as a listing-maintenance condition. Trader-side risk teams use the calendar feed to pre-position around scheduled cliffs for any token in active book, sizing exposure relative to cliff calendar and historical cliff-window concentration. Materially-divergent cliff-window behaviour vs stated intent is treated as a standalone risk signal independent of any single cliff's price outcome — i.e., a cohort that consistently outflows where it stated `"hold"` is a higher OAK-T5.006 risk for the next cliff regardless of whether the prior cliff's price moved against the cohort.

## Limitations

- Calendar-feed coverage is uneven across protocols; the unlock trackers cover the high-cap and active-trader-interest cohort well, but long-tail tokens with custom vesting contracts or off-chain vesting schedules are under-covered, and projects can deliberately omit cohort-level breakdowns from their public schedules. The mitigation's effectiveness scales with calendar-feed coverage and is materially weaker for tokens absent from the major trackers.
- Recipient-cluster attribution is heuristic: a cohort that wishes to disguise its cliff-window outflow can pre-distribute allocation across multiple addresses or route through OTC desks before the public cliff date, defeating per-cluster outflow monitoring at the on-chain layer. The mitigation compresses but does not eliminate the OAK-T5.006 surface.
- Stated-intent disclosure is voluntary at v0.1; absent a venue-side listing-maintenance policy that enforces ex-post disclosure, the cohort can decline to publish a stated intent and there is no measurable divergence to flag. The mitigation is materially stronger as a venue-side policy than as a trader-side analytics surface.
- Trade-time UI display competes for screen real-estate with the standard trade execution surface; aggregators and venues face a UX cost in surfacing cliff context prominently enough that traders actually consume it. The mitigation's effectiveness depends on UI placement, not just data availability.
- Cliff-window concentration is a per-cliff-event measurement; the mitigation does not detect slow distribution across many small post-cliff windows that aggregate to material sell-pressure, which is closer to OAK-T5.002 (slow LP-trickle removal) framing applied to vesting allocation.

## Reference implementations

- TokenUnlocks / Tokenomist — the canonical cliff-calendar access path; per-protocol cliff schedules, allocation breakdowns, and recipient-cohort metadata.
- CryptoRank token-unlock dashboard — allocation-group framing and historical per-cohort cliff-window data.
- DefiLlama Unlocks — open-data integration source suitable for venue-side and risk-team-side programmatic consumption.
- MG `mg-detectors-rs` — per-recipient-cluster outflow detector against pre-loaded cliff calendar is a v0.x roadmap item; the per-cluster baseline and divergence-from-stated-intent surfaces sit naturally in the on-chain detector layer.

## Citations

- `[tokenunlocks2026platform]` — TokenUnlocks / Tokenomist; canonical cliff-calendar access path.
- `[cryptorank2026unlock]` — CryptoRank token-unlock dashboard; allocation-group framing.
- `[defillama2026unlocks]` — DefiLlama Unlocks; open-data integration source.
- `[chainalysis2025rug]` — broader market-manipulation context within which cliff-dump behaviour sits.
