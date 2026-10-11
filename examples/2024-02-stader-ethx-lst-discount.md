# Stader ETHx LST secondary-market discount to ETH NAV — DEX liquidity pool pricing divergence during LRT-season liquidity migration — Ethereum — 2024-02

**Corrected 2026-10-11:** the unsupported 2–5% February discount, "mid-seven-figures" markdown and LRT-migration cause removed; discount restated as the marginal discount (peg range ~97.3–100.15%, Jan–Apr 2024) that LlamaRisk reports.

**Loss:** structural and small — LlamaRisk reports ETHx traded at a marginal discount to ETH on secondary markets (liquidity concentrated in Curve pools), with the peg ranging about 97.3%–100.15% between January and April 2024. Holders who sold at the low end realised the discount as a loss. No source reviewed supports a specific February discount of 2–5%, an aggregate dollar markdown, or a cause in LRT liquidity migration; those claims earlier in this file were unverified and are removed.
**OAK Techniques observed:** **OAK-T14.003.001** (LST/LRT Depeg-Cascade as Constrained-Primitive Sub-class — sub-class (iii) withdrawal-queue-depth saturation, operationalised at a much smaller scale than the canonical Lido stETH cases: ETHx traded at a marginal secondary-market discount on thin, Curve-concentrated liquidity. The cause is not established in the source reviewed; a link to LST-to-LRT liquidity migration and to the Stader withdrawal queue's throughput is a plausible hypothesis, not a finding). Fit to sub-class (iii) is therefore tentative.
**Attribution:** **unattributed** — structural / liquidity-migration-driven. The discount was a market-structure event — LRT-season liquidity migration from LST pools to LRT pools — not an attack. No attribution is relevant. The structural cause is unverified (see Summary).

**Key teaching point:** **Mid-cap LSTs with thin, concentrated secondary-market liquidity can trade at a persistent marginal discount to NAV.** The ETHx case is a small-magnitude illustration that discount risk is not specific to LRTs; whether the mechanism matches the T14.003.001 withdrawal-queue pattern is not established by the sources reviewed. LST tokens with thinner secondary-market liquidity (like ETHx relative to stETH) are more susceptible to the discount because a given sell-pressure magnitude produces a larger price impact on a thinner pool. The case is a tentative, low-magnitude LST-layer comparison to the four 2024 LRT depegs that anchor the class.

## Summary

Stader Labs launched ETHx as a liquid staking token on Ethereum in mid-2023, competing with Lido stETH, Rocket Pool rETH, Frax frxETH, and other LSTs in the Ethereum liquid staking market. ETHx maintained secondary-market liquidity primarily through Curve and Balancer LST pools, with the Stader withdrawal queue providing the redemption path for arbitrageurs buying discounted ETHx to redeem at NAV.

Over January–April 2024, LlamaRisk's peg data show ETHx trading in a band of roughly 97.3% to 100.15% of ETH, i.e. at a marginal discount, with liquidity concentrated in Curve pools. The 2024 EigenLayer LRT points-season (Renzo, Ether.fi, Kelp, Puffer) coincided with this period and may have pulled liquidity from mid-cap LST pools, but no source reviewed establishes that link.

The discount was market-structure rather than solvency-driven: no source reported impairment of the ETH backing. The candidate pattern — thin pool liquidity → secondary-market discount → arbitrage via the Stader withdrawal queue → return toward NAV — resembles the 2024 LRT depegs at much smaller magnitude, but the specific drivers for ETHx are unverified.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-07 | Stader Labs launches ETHx on Ethereum mainnet | (LST launch) |
| 2024-01 to 2024-04 | ETHx trades at a marginal discount to ETH, peg range ~97.3%–100.15% (LlamaRisk); cause unverified | **T14.003.001 sub-class (iii)** (tentative) |
| Continuing | LST-to-LRT liquidity migration dynamics persist; mid-cap LSTs remain susceptible to secondary-market discount during LRT points-season events | T14.003.001 (structurally open) |

## What defenders observed

- **The ETHx discount is a small LST-layer comparison point to the LRT depegs.** The four 2024 LRT depegs (Renzo, Ether.fi, Kelp, Puffer) are the class anchors; ETHx shows a marginal discount at the LST layer. Whether the same mechanism is at work is not established. Defenders can still monitor secondary-market peg and pool depth for LSTs as for LRTs.
- **Thinner pools make a token more susceptible to discounts.** ETHx's liquidity was concentrated in Curve pools and its peg wandered more than stETH's would be expected to; pool-depth monitoring is a reasonable forward-looking risk signal.

## Public references

- `[llamariskethx2024]` — LlamaRisk, "ETHx addendum" (undated; peg data through 2024-04-21): <https://hackmd.io/@LlamaRisk/ETHx-addendum> (ETHx traded at a marginal discount to ETH; liquidity concentrated in Curve pools)

## Discussion

The Stader ETHx secondary-market discount is the first LST-layer T14.003.001 worked example, a tentative, low-magnitude comparison point at the LST layer. The evidence is limited to LlamaRisk's peg data; it does not by itself establish that the withdrawal-queue saturation mechanism operated.
