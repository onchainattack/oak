# MEV Sandwich Attack Cohort — 2020–2025

**OAK Techniques observed:** OAK-T9.012, OAK-T9.013, OAK-T17.005

**Attribution:** **unattributed** (aggregate cohort).
**Loss:** T9.012 aggregate undocumented at class level (per-launch extraction typically in the tens-to-hundreds of thousands, distributed across thousands of token launches); T9.013 aggregate embedded in the broader MEV sandwich extraction volume (MEV sandwich extraction estimated in the hundreds of millions to low billions across Ethereum since 2020); T17.005 aggregate undocumented at class level (requires multi-block proposer control, which has been demonstrated in research settings and flagged in audit literature but confirmed large-scale exploitation is sparser than single-block MEV).

**Key teaching point:** These three Techniques represent the evolution of MEV extraction from simple single-block sandwiching (T5.004) to more sophisticated forms: sandwiching the liquidity addition itself (T9.012), exploiting the victim's slippage-tolerance parameter as the profit surface (T9.013), and extending manipulation across multiple blocks via proposer control (T17.005). Each represents a structural refinement of the MEV attacker's capability relative to the baseline sandwich.

## Summary

## Timeline

T9.012 and T9.013 from 2020–2021 (Uniswap V2 token-deployment wave, MEV sandwich literature); T17.005 from 2021–2022 (multi-block MEV characterised by Flashbots research).

## T9.012 — Initial Liquidity Sandwich Attack

The attacker sandwiches a token deployer's `addLiquidity` transaction: front-running with a token purchase at the pre-liquidity zero-or-near-zero-reserve price, and back-running with a token sale at the post-liquidity inflated price. The attacker extracts the price differential between pre-liquidity and post-liquidity state.

The attack exploits the structural price discontinuity between pre-liquidity and post-liquidity state — a discontinuity that is inherent in the AMM token-deployment pattern. Mitigation: deploy and add liquidity atomically within a single transaction (constructor + addLiquidity via factory), or use Flashbots Protect for the `addLiquidity` transaction.

## T9.013 — Slippage-Manipulation Sandwich Attack

The attacker exploits the victim's slippage-tolerance parameter (`amountOutMin` or `sqrtPriceLimitX96`) to extract value beyond a standard sandwich spread. The attacker front-runs the price to the exact boundary of the victim's slippage limit, the victim's trade executes at the worst-acceptable rate, and the attacker back-runs to unwind. The victim's slippage protection is the attacker's profit surface: the wider the slippage band, the larger the extraction.

The structural insight is that the slippage-tolerance parameter — intended as protection against adverse price movement — becomes an attack surface when set too wide relative to the pool's depth.

## T17.005 — TWAP Oracle Manipulation via Multi-Block MEV

Oracle price manipulation conducted across multiple consecutive blocks where the attacker controls the block-proposer slot for multiple sequential blocks to "grind" a TWAP oracle toward a target price. Single-block manipulation (T9.001) is constrained by capital; multi-block manipulation relaxes this constraint by spreading the price movement across multiple blocks with smaller per-block capital requirements.

The multi-block MEV staging surface is the load-bearing T17.005 primitive: the attacker needs proposer-slot control for enough consecutive blocks to grind the TWAP toward the target price. The economic constraint shifts from capital-constrained to proposer-control-constrained.

The composition chain: (1) attacker secures proposer control for N consecutive blocks via MEV-Boost builder coordination, validator collusion, or proposer-bribery; (2) per-block trades move spot price in a consistent direction; (3) the TWAP oracle accumulates per-block prices across the attacker-controlled block sequence; (4) a TWAP-consuming lending market or derivative protocol is exploited before the TWAP reverts.

Detection: multi-block proposer concentration monitoring — alert when a single builder/validator proposes more than N blocks in a configurable window.

## Public references

- `[flashbots2022mev]` — Flashbots MEV research (multi-block MEV characterisation)
- `[eigenphi2023mev]` — EigenPhi MEV dashboard and sandwich-attack metrics
- `[mevinspect2024]` — MEV-Inspect sandwich detection methodology
- `[chainalysis2024mev]` — Chainalysis MEV extraction estimates
