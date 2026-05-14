# Polymarket US election operational-insider trading cohort — multi-chain — 2025

**Loss:** no direct on-chain loss to the prediction market; the loss surface is the information-symmetry violation between bettors. A cohort of Polymarket accounts with apparent access to non-public polling data, campaign-internal information, or operational-timeline knowledge placed bets on US election-related markets with win rates substantially above the baseline, extracting aggregate profits in the mid-seven-figure range.
**OAK Techniques observed:** **OAK-T9.006.004** (Operational-Insider Trading on Subjective-Resolution Prediction Markets) — primary; the cohort demonstrates the information-symmetry-violation pattern across election-related markets where bettors with apparent insider knowledge (campaign-internal data, non-public polling, operational-timeline information) traded ahead of public disclosure. The pattern is structurally adjacent to the Van Dyke / IDF reservist cases (military-operational insider trading) but operates in the political-campaign domain.
**Attribution:** **inferred-strong** at the cohort-behaviour level (anomalous win-rate analysis). Individual account attribution is pseudonymous; KYC linkage at off-ramps is the load-bearing forensic step and was not publicly completed at v0.1.
**Key teaching point:** **The US election insider-trading cohort demonstrates that T9.006.004 generalises beyond military-operational contexts (Van Dyke, IDF reservist) to any domain where non-public information about a real-world event determines a prediction-market resolution — including political campaigns, corporate announcements, regulatory decisions, and sporting events.** The on-chain transparency that makes T9.006.004 forensically tractable (wallet address, deposit timestamp, position ladder, withdrawal pattern) is domain-agnostic.

## Summary

During the 2024 US election cycle and through 2025, Polymarket hosted a large volume of election-related prediction markets — presidential-election winner, popular-vote margin, individual state outcomes, cabinet appointments, legislative outcomes. Several markets attracted volume in the tens to hundreds of millions of dollars.

Industry analytics (ACDC, Bubblemaps, Sonar Pro) identified a cohort of Polymarket accounts whose trading patterns exhibited strong signals of information asymmetry:

1. **Account-age-vs-first-bet correlation:** Several high-win-rate accounts were created shortly before placing large concentrated bets on specific election-related markets, with no prior Polymarket trading history.
2. **Sharp-longshot-win concentration:** Accounts betting on outcomes that the public polling data characterised as longshots won at rates significantly above the ACDC baseline (~51.8% for political/defense markets vs. ~14% for all markets).
3. **Timing-vs-public-disclosure correlation:** Bets were placed in narrow time windows (hours to days) before public information that confirmed the bet's direction — polling releases, campaign announcements, or official election results.
4. **Same-day withdrawal patterns:** Several accounts withdrew the majority of their profits within the same day the winning bet resolved, before public scrutiny could intensify.

The cohort's extraction was concentrated in markets where non-public information — internal campaign polling, donor-commitment data, operational-timeline knowledge from campaign staff or party operatives — would have provided a material betting advantage. The pattern is structurally T9.006.004: bettors with apparent access to non-public, operationally-relevant information traded ahead of public disclosure.

The on-chain forensic surface for T9.006.004 is domain-agnostic: wallet address, deposit timestamp, position ladder, and withdrawal pattern are publicly inspectable on-chain regardless of whether the non-public information is military-operational (Van Dyke, IDF reservist) or political-campaign (US election cohort). The KYC linkage at the off-ramp is the load-bearing step for real-world identification; the on-chain data establishes the anomalous trading pattern but does not name the operator.

The US election cohort is included as the structurally important confirmation that T9.006.004 generalises beyond the military-operational domain to any subjective-resolution prediction market where non-public information about the underlying event provides a trading advantage.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-Q3–2024-Q4 | US election prediction markets on Polymarket attract large volume; cohort of accounts with apparent non-public information begins placing concentrated bets | (market activity) |
| 2024-Q4–2025-Q1 | ACDC, Bubblemaps, Sonar Pro analytics identify anomalous longshot-win concentrations in election-related markets; account-age-vs-first-bet correlation documented | **T9.006.004** (anomaly detection) |
| 2025 | Industry forensics publish cohort-level analysis; sharp-longshot-win rates in political/defense markets (~51.8%) substantially exceed baseline (~14%) | (cohort-characterisation) |
| 2025 | Polymarket / Chainalysis surveillance partnership (operationalised April 2026) partially addresses the cohort-surveillance gap; KYC linkage at off-ramps remains the load-bearing forensic step | (surveillance operationalisation) |
| Continuing | No public indictment for the US election insider-trading cohort at v0.1; pattern expected to recur in future election cycles | T9.006.004 (ongoing structural surface) |

## Realised extraction

Estimated mid-seven-figure aggregate profits extracted by the anomalous-trading cohort. No direct on-chain loss to Polymarket or to other bettors — the extraction is the information-asymmetry advantage, not a drain of platform funds.

## Public references

- Cross-reference: T9.006.004 at `techniques/T9.006.004-operational-insider-trading.md`.
- Cross-reference: 2026-01-polymarket-venezuela-maduro-soldier-insider at `examples/2026-01-polymarket-venezuela-maduro-soldier-insider.md` (canonical T9.006.004 case 1, Van Dyke/Operation Absolute Resolve).
- Cross-reference: 2026-02-polymarket-iran-strike-idf-reservist-insider at `examples/2026-02-polymarket-iran-strike-idf-reservist-insider.md` (T9.006.004 case 2, IDF reservist lateral-disclosure).

## Public References

See citations in corresponding technique file.
