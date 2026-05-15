# DPRK post-Tornado-Cash DEX aggregator routing laundering — 2023–2025

**Loss:** **Infrastructure case, not a per-victim loss.** Following the OFAC sanction of Tornado Cash (2022-08), DPRK-linked laundering clusters (OAK-G01 Lazarus Group) shifted from mixer-based obfuscation to DEX-aggregator routing fragmentation — exploiting the routing complexity of aggregators (1inch, 0x/Matcha, ParaSwap, CowSwap, Odos) to fragment the on-chain trail across multiple venues, intermediate tokens, and split routes within a single aggregator-routed transaction.
**OAK Techniques observed:** **OAK-T7.007** (DEX Aggregator Routing Laundering) — canonical DPRK-cluster anchor. The launderer uses aggregator routing complexity as a post-mixer obfuscation layer: where previously a Tornado Cash deposit would break the on-chain trail via the mixer's anonymity set, post-sanction the launderer routes proceeds through aggregator split-routes, hopping across intermediate tokens and venues to fragment the chain-analysis trail without touching a sanctioned mixer contract.
**Attribution:** **confirmed** — DPRK-linked clusters (Lazarus Group) identified by Chainalysis, TRM Labs, and U.S. Treasury/OFAC designations.

**Key teaching point:** The DPRK post-Tornado-Cash shift to aggregator-routing laundering is the canonical T7.007 anchor: the launderer's goal is not execution-quality optimisation (the aggregator's design purpose) but fragmentation maximisation — sacrificing basis points to routing complexity to fragment the chain-analysis trail. The detection signal is the gap between per-trade route-path entropy and the per-aggregator per-asset-pair baseline for legitimate execution-optimising aggregator use.

## Summary

Following the OFAC sanction of Tornado Cash in August 2022, DPRK-linked laundering clusters (primarily OAK-G01 Lazarus Group) shifted from mixer-based obfuscation to structural obfuscation via DEX aggregator routing. The launderer routes illicit proceeds through a DEX aggregator (e.g., 1inch) configured for maximum routing complexity — high hop count, multiple intermediate tokens, split venues — rather than for optimal execution price.

The structural signal distinguishing laundering use from legitimate use: (1) route-path entropy (hop count × intermediate tokens × split venues) significantly exceeds the per-aggregator per-asset-pair legitimate-use baseline; (2) the execution price is materially worse than the best single-venue price for the same pair — the launderer sacrifices basis points for fragmentation; (3) the cluster interacts with multiple aggregator-router contracts within a short window (cross-aggregator churn); (4) the post-aggregator output cluster is previously unseen — fragmenting not just the transaction trail but the cluster continuity.

Chainalysis's 2024 and 2025 laundering reports documented the aggregator-routing shift as a structural evolution in DPRK laundering methodology post-Tornado-Cash.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-08 | OFAC sanctions Tornado Cash; DPRK clusters lose primary mixer rail | (sanctions event) |
| 2022–2023 | DPRK clusters experiment with cross-chain bridges, instant exchangers, and DeFi yield protocols as alternative laundering rails | T7.003 / T7.006 |
| 2023–2025 | DPRK clusters shift to DEX-aggregator routing fragmentation as a primary laundering methodology | T7.007 (aggregator routing laundering) |
| Continuing | DPRK aggregator-routing laundering remains active at v0.1 cutoff | (ongoing) |

## Public references

- Chainalysis: 2024 Crypto Crime Report — DPRK laundering methodology evolution.
- Chainalysis: 2025 Crypto Crime Report — aggregator-routing laundering analysis.
- TRM Labs: DPRK post-Tornado-Cash laundering infrastructure reporting.
- OFAC: Tornado Cash sanctions designation and subsequent DPRK-laundering actor designations.
