# Chainalysis laundering report — DEX aggregator routing cohort — 2024

**Loss:** **Research/reporting artifact, not a per-victim loss.** Chainalysis's 2024 and 2025 Crypto Crime Reports documented a structural shift in laundering methodology: sanctioned entities and high-risk clusters were increasingly routing illicit proceeds through DEX aggregators (1inch, 0x/Matcha, ParaSwap, CowSwap, Odos) to fragment the on-chain trail across multiple venues, intermediate tokens, and split routes — exploiting aggregator routing complexity as a post-mixer obfuscation layer.
**OAK Techniques observed:** **OAK-T7.007** (DEX Aggregator Routing Laundering) — industry-report evidential anchor. The Chainalysis reports provide the primary third-party evidence base for the aggregator-routing laundering pattern, documenting per-aggregator usage growth among sanctioned and high-risk clusters and characterising the fragmentation-maximisation vs. execution-optimisation distinction.
**Attribution:** **confirmed** — Chainalysis reporting, corroborated by TRM Labs and Elliptic laundering-methodology reports.

**Key teaching point:** The Chainalysis aggregator-routing laundering reports provide the industry evidential anchor for T7.007: the shift from mixer-based to aggregator-based fragmentation is not anecdotal — it is a documented, measured trend across sanctioned and high-risk clusters. The report's per-aggregator per-cluster routing-complexity metrics establish the baseline against which PATH A's route-path-entropy detection signal is calibrated.

## Summary

Chainalysis's 2024 Crypto Crime Report identified a measurable shift in laundering methodology: the combined transaction volume routed through DEX aggregators by sanctioned and high-risk clusters grew substantially year-over-year (2023 vs. 2024), while mixer usage declined following the OFAC sanction of Tornado Cash (2022-08) and subsequent mixer-sector enforcement actions.

The 2025 report refined the analysis with per-aggregator metrics: 1inch and 0x/Matcha were the most-used aggregator routers by sanctioned clusters, and the routing patterns showed systematically higher hop counts and split-venue counts than the per-aggregator per-asset-pair legitimate-use baselines — indicating fragmentation-maximising rather than execution-optimising use.

The reports also documented the complementary trend of cross-chain bridge routing (T7.003) and DeFi yield-protocol laundering (T7.006), establishing the post-Tornado-Cash laundering-methodology landscape as a multi-rail fragmentation strategy: aggregator routing for within-chain obfuscation, cross-chain bridges for cross-chain obfuscation, yield protocols for temporal/crowd obfuscation, and stablecoin-issuer selection (T7.008) for freeze-policy arbitrage.

## Public references

- Chainalysis: 2024 Crypto Crime Report — laundering methodology chapter.
- Chainalysis: 2025 Crypto Crime Report — DEX aggregator routing analysis.
- TRM Labs: laundering infrastructure evolution reporting (2024).
- Elliptic: cross-chain laundering typology research (2024).
