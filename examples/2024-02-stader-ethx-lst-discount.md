# Stader ETHx LST secondary-market discount to ETH NAV — DEX liquidity pool pricing divergence during LRT-season liquidity migration — Ethereum — 2024-02

**Loss:** structural — ETHx traded at a discount of approximately 2–5% below its ETH NAV on secondary markets (Curve stETH/ETHx pools, Balancer LST pools) during the February 2024 window when liquidity migrated toward higher-yield LRT tokens (Renzo ezETH, Ether.fi weETH, Kelp rsETH, Puffer pufETH). ETHx holders who sold during the discount window realised the discount as a loss; the aggregate dollar-denominated markdown across circulating ETHx supply at the discount trough was in the mid-seven-figures range. The discount self-corrected as arbitrageurs bought discounted ETHx and redeemed via the Stader withdrawal queue.
**OAK Techniques observed:** **OAK-T14.003.001** (LST/LRT Depeg-Cascade as Constrained-Primitive Sub-class — sub-class (iii) withdrawal-queue-depth saturation, operationalised at a smaller scale than the canonical Lido stETH cases: the ETHx discount was driven by LST-to-LRT liquidity migration during the February 2024 LRT points-season, which withdrew Curve/Balancer pool liquidity from the ETHx pools. The diminished pool depth widened the discount needed to absorb sell orders, and the Stader withdrawal queue's per-epoch throughput cap constrained the arbitrageur absorption rate). The ETHx discount is a sub-class (iii) case at the LST layer (rather than the LRT layer of the Renzo/Ether.fi/Kelp/Puffer cases), confirming that the withdrawal-queue-depth saturation mechanism operates at both the LST and LRT layers.
**Attribution:** **unattributed** — structural / liquidity-migration-driven. The discount was a market-structure event — LRT-season liquidity migration from LST pools to LRT pools — not an attack. No attribution is relevant.

**Key teaching point:** **LST-to-LRT liquidity migration during points-season events creates secondary-market discount pressure on LST tokens that is structurally analogous to the LRT depeg pattern.** The ETHx discount demonstrates that T14.003.001's withdrawal-queue-depth saturation mechanism is not specific to LRTs — it operates on any liquid staking token whose secondary-market liquidity can be withdrawn faster than the redemption queue can clear. LST tokens with thinner secondary-market liquidity (like ETHx relative to stETH) are more susceptible to the discount because a given sell-pressure magnitude produces a larger price impact on a thinner pool. The ETHx case extends the T14.003.001 surface from the LRT layer (where the four 2024 LRT depegs anchor the class) to the LST layer (where ETHx provides the mid-cap-LST anchor).

## Summary

Stader Labs launched ETHx as a liquid staking token on Ethereum in mid-2023, competing with Lido stETH, Rocket Pool rETH, Frax frxETH, and other LSTs in the Ethereum liquid staking market. ETHx maintained secondary-market liquidity primarily through Curve and Balancer LST pools, with the Stader withdrawal queue providing the redemption path for arbitrageurs buying discounted ETHx to redeem at NAV.

In February 2024, the EigenLayer LRT points-season (Renzo ezETH, Ether.fi weETH, Kelp rsETH, Puffer pufETH) drew substantial liquidity from LST pools to LRT pools as yield-seeking capital rotated from vanilla ETH staking yield (LSTs, \~3–5% APR) to ETH staking + restaking yield + points (LRTs, \~3–5% + additional points-implied yield). The liquidity migration disproportionately affected mid-cap LSTs like ETHx — stETH's deep Curve pool absorbed the migration with minimal discount, but ETHx's thinner pools experienced a material discount (2–5%) as sell orders to migrate from ETHx to LRTs encountered diminished pool depth.

The discount was structural rather than solvency-driven: the underlying ETH backing was never impaired, the Stader withdrawal queue remained operational, and arbitrageurs absorbed the discounted ETHx over the following days to weeks as the withdrawal queue cleared. The discount pattern — pool-liquidity migration → secondary-market discount → arbitrageur absorption via withdrawal queue → return to NAV — is the same structural mechanism as the 2024 LRT depegs (Renzo, Ether.fi, Kelp, Puffer), operating at the LST layer with a smaller discount magnitude reflecting ETHx's functioning redemption path (unlike the EigenLayer withdrawal-cap constraint that amplified the LRT depegs).

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-07 | Stader Labs launches ETHx on Ethereum mainnet | (LST launch) |
| 2024-01 to 2024-02 | EigenLayer LRT points-season accelerates; capital rotates from LST pools to LRT pools | T14.003.001 (liquidity migration) |
| 2024-02 | ETHx Curve/Balancer pool depth diminishes; ETHx trades at ~2–5% discount to ETH NAV at trough | **T14.003.001 sub-class (iii)** |
| 2024-02 to 2024-03 | Arbitrageurs buy discounted ETHx, redeem via Stader withdrawal queue; discount narrows to near-par | (self-correction) |
| Continuing | LST-to-LRT liquidity migration dynamics persist; mid-cap LSTs remain susceptible to secondary-market discount during LRT points-season events | T14.003.001 (structurally open) |

## What defenders observed

- **The ETHx discount is the LST-layer analogue of the LRT depeg mechanism.** The four 2024 LRT depegs (Renzo, Ether.fi, Kelp, Puffer) demonstrated the T14.003.001 surface at the LRT layer; the ETHx discount demonstrates the same surface at the LST layer. The mechanism — secondary-market liquidity migration exceeding the withdrawal queue's per-epoch absorption capacity — is layer-agnostic. Defenders evaluating LST risk should apply the same T14.003.001 analytical framework to both LSTs and LRTs.
- **Mid-cap LSTs are structurally more susceptible to T14.003.001 discount events than large-cap LSTs.** stETH's deep secondary-market liquidity absorbed the February 2024 LRT migration with minimal discount; ETHx's thinner pools could not absorb the same sell-pressure magnitude without a material price impact. The discount susceptibility is inversely proportional to secondary-market pool depth, making pool-depth monitoring the forward-looking risk signal for LST-level T14.003.001.

## Public references

- `[staderethx2023]` *(proposed)* — Stader Labs ETHx launch and mechanism design; the liquid staking token architecture and withdrawal queue specification.
- `[curveethxpool]` *(proposed)* — Curve ETHx/ETH pool analytics; the secondary-market liquidity depth that grounded the discount event.
- `[lrtpoints2024]` *(proposed)* — EigenLayer LRT points-season dynamics and the LST-to-LRT liquidity migration pattern.

## Discussion

The Stader ETHx secondary-market discount is the first LST-layer T14.003.001 worked example, extending the technique's coverage from the LRT layer (Renzo, Ether.fi, Kelp, Puffer depegs) to the LST layer. The structural observation — T14.003.001's withdrawal-queue-depth saturation mechanism operates at both the LST and LRT layers, and mid-cap tokens with thinner secondary-market liquidity are structurally more susceptible — strengthens the technique's claim to being a general liquid-staking-token risk class rather than an LRT-specific concern.
