# DeFi and NFT Laundering-Infrastructure Cohort — 2021–2025

**Tags:** OAK-T7.004, OAK-T7.006

**Loss:** T7.004 aggregate ~$8.9M+ in documented laundering-profit wash trades (Chainalysis 2022, 110 laundering users); T7.006 aggregate undocumented at the class level but the Lazarus Group / G01 cluster is the principal known operator using DeFi yield protocols as laundering cover at scale.

**Key teaching point:** Both T7.004 and T7.006 use legitimate on-chain infrastructure — NFT marketplaces and DeFi yield protocols — as laundering cover. The protocols themselves are not designed to obscure flows; the laundering effect comes from the *crowd* the launderer joins. Legitimate NFT traders and yield-seekers produce high-volume baselines of activity that make laundering events statistically indistinguishable from legitimate use at the per-transaction level. Detection requires per-position behavioural analysis: laundering positions exhibit lockup-minimum duration, no yield-claim events, no rebalancing, and deposit-source/withdrawal-recipient mismatches that have no legitimate-user explanation.

## Timeline

Both classes emerged systematically from 2021 onward as NFT marketplace and DeFi liquidity surfaces grew large enough to absorb laundering flows.

## T7.004 — NFT Wash-Laundering

Self-financed NFT trades convert illicit proceeds into nominally-legitimate "art purchase" or "art sale" income. The attacker purchases an NFT from a self-controlled wallet at the desired-laundered value; the funds delivered to the seller side are now nominally-legitimate sales proceeds.

Canonical data points:
- **Chainalysis 2022 NFT Laundering Report.** 262 users identified selling NFTs to self-financed addresses more than 25 times in 2021; 110 of them collectively netted ~$8.9M in profit. Remaining 152 users did not net profit, indicating mixed laundering and wash-trading motives. NFT-specific money laundering remained <1% of total crypto-wide laundering (~$8.6B) in 2021.
- **LooksRare / X2Y2 wash-trade rates — 2022–2023.** Platform-level wash-trade rates of ~94.5% (LooksRare) and ~84.2% (X2Y2) at peak, driven primarily by token-emission-farming incentives but providing on-chain cover for T7.004 laundering flows mixed into the same trace.
- **Sudoswap AMM-pool wash-trade laundering — 2023.** Estimated $8-15M in laundering volume routed through self-financed Sudoswap liquidity pools, exploiting the AMM-pool intermediary as structural obscurity. See `examples/2023-05-sudoswap-wash-pools.md`.
- **Blur airdrop incentive-wash cohort — 2022–2024.** On-chain trade patterns structurally indistinguishable from laundering-motive wash-trades, though dominant cohort motive was airdrop-farming. See `examples/2023-02-blur-airdrop-wash-cohort.md`.
- **CryptoPunks / BAYC-class high-value wash trades — 2022.** Several high-value NFT trades exhibited self-financed counterparty signatures at headline-grabbing valuations during the 2022 bull-market peak.

The motive-ambiguity problem (T3.002 wash-trading vs. T7.004 laundering) is structural: the on-chain trade pattern is identical; only downstream behaviour and source-of-funds analysis can discriminate.

## T7.006 — DeFi Yield-Strategy Laundering

Proceeds deposited into legitimate DeFi yield-farming, liquidity-provision, lending, or liquid-staking protocols and withdrawn after a delay — using the "yield user" or "liquidity provider" persona as cover.

Canonical sub-patterns:
- **Deposit-and-withdraw via different recipient address.** Where the protocol permits non-self withdrawal recipients, the deposit-side and withdrawal-side clusters differ by construction — the protocol acts as a same-asset-class bridge.
- **Multi-protocol rotation.** Funds rotate through multiple yield protocols in sequence, each step fragmenting the on-chain trail.
- **Liquid-staking-derivative conversion.** Source asset converted to stETH, jitoSOL, mSOL, etc., held for a delay, then redeemed — the derivative leg sits in a deeply liquid market dominated by legitimate stakers.
- **Single-sided LP-pool laundering.** Single-sided deposit followed by asymmetric withdrawal of a different pool-asset composition.

Primary operator: **OAK-G01 Lazarus Group** is the principal documented cluster using DeFi yield protocols as laundering cover at scale, particularly post-Tornado-Cash sanctions (2022-08). See `examples/2024-01-post-tornado-defi-yield-laundering.md`.

Detection primitives: per-position duration distribution (laundering positions cluster at lockup minimum), yield-claim-rate signal (near-zero claim rate against active deposit volume), withdrawal-recipient divergence, cross-protocol rotation graph analysis (N≥3 yield protocols without yield-claim events).

## References

- `[chainalysis2022nft]` — Chainalysis 2022 NFT Money Laundering Report
- `[chainalysisnftcounterfeit2022]` — Chainalysis NFT counterfeit / wash-trade analysis
- `[theblock2022boredape]` — Bored Ape / CryptoPunks wash-trade coverage
- `[chainalysis2024laundering]` — Chainalysis 2024 Crypto Laundering Report (DeFi yield protocol coverage)
- `[blurzeroroyalty2022]` — Blur zero-royalty marketplace launch and incentive structure
