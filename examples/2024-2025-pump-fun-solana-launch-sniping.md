# Pump.fun / Solana token-launch MEV sniping cohort — Solana — 2024–2025

**Loss:** cohort-level MEV extraction across thousands of newly created tokens on pump.fun and Raydium pools. Individual sandwich/snipe extractions range from sub-SOL to hundreds of SOL-equivalent per launch; aggregate extraction across the cohort estimated in the tens of millions of USD-equivalent across 2024–2025.
**OAK Techniques observed:** **OAK-T9.012** (Initial Liquidity Sandwich Attack — primary; MEV searchers targeting newly created tokens on pump.fun and Raydium pools execute initial-liquidity sandwich and sniping strategies: the searcher observes the token creation and initial liquidity addition, front-runs the first trades at extreme pre-liquidity prices, and back-runs the post-liquidity price discovery with a dump of acquired tokens). **OAK-T5.004** (Sandwich MEV Extraction — secondary; the broader MEV-sandwich infrastructure on Solana that supports the initial-liquidity-sandwich pattern, including private-mempool-access, bundle-construction, and block-leader-collaboration primitives).
**Attribution:** **pseudonymous (at cohort scale)** — MEV searcher bot addresses are on-chain attributable; the individual operator identities behind the principal sniper bots are pseudonymous. Multiple independent searcher entities operate in this cohort.
**Key teaching point:** **The pump.fun / Solana token-launch MEV sniping cohort is the 2024–2025 operational anchor for T9.012 on a non-EVM chain — Solana's low-latency block times, transparent mempool (pre-scheduler-upgrade), and high token-launch velocity on pump.fun created a structurally distinct but functionally equivalent initial-liquidity-sandwich surface to the Uniswap V2/V3 and PancakeSwap patterns documented on EVM chains.** The incident demonstrates that T9.012 is chain-agnostic: any AMM-based token-deployment pattern with a public mempool or observable transaction stream and atomic/semi-atomic execution capability supports the sandwich-at-addLiquidity pattern.

## Summary

Pump.fun is a Solana-based token-launch platform that allows users to create new tokens and establish initial liquidity pools via a bonding-curve mechanism. Tokens that graduate from the pump.fun bonding curve to Raydium (Solana's primary AMM) undergo a liquidity-addition transaction that establishes the token's first Raydium pool.

The token-launch mechanics create the structural preconditions for T9.012:
1. The token creation and bonding-curve graduation are publicly observable on-chain.
2. The initial Raydium liquidity addition is a discrete transaction whose timing and parameters are predictable from on-chain state.
3. The first trade after liquidity addition occurs at a price determined by the constant-product formula with the initial reserves — which may differ dramatically from the post-liquidity equilibrium price.
4. Solana's low-latency block times and (at the time) transparent transaction-forwarding infrastructure allowed MEV searchers to observe, bundle, and land transactions with sufficient determinism to make sandwich strategies economically viable.

MEV searchers on Solana deployed sniper bots specialised in pump.fun and Raydium token launches. The bots monitored the pump.fun bonding-curve graduation events and the subsequent Raydium `initializePool` and `addLiquidity` transactions. The standard strategy: the bot front-runs the initial-liquidity addition with a token-purchase transaction (acquiring the token at the pre-liquidity bonding-curve price or at the extreme first-trade Raydium price), and back-runs the liquidity addition with a token-sale transaction that dumps the acquired tokens into the now-funded Raydium pool at the inflated post-liquidity price.

The cohort is structurally parallel to the Uniswap V2 token-launch sandwich cohort (2020–2025) on Ethereum — the canonical T9.012 calibration anchor — but with Solana-specific mechanics: the pump.fun bonding-curve pre-graduation phase adds a pre-AMM pricing layer, and the Raydium liquidity-addition transaction (rather than a direct `addLiquidity` on Uniswap V2) is the sandwich target. The unifying structural feature is the sandwich-at-liquidity-addition primitive: the attacker exploits the temporal sequencing of the liquidity-establishing transaction to extract the price differential between pre-liquidity and post-liquidity state.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024–2025 | Pump.fun operates as Solana's primary token-launch platform; bonding-curve→Raydium graduation path active; thousands of tokens launched | T9.012 surface (latent — token-launch velocity creates the observation surface) |
| 2024–2025 | MEV searchers deploy Solana sniper bots specialised in pump.fun/Raydium token-launch sandwich strategies | **T5.004** (MEV-sandwich infrastructure deployed) |
| Per-launch (2024–2025) | Bot observes pump.fun bonding-curve graduation event; front-runs the initial Raydium liquidity addition with a token-purchase transaction | **T9.012** (initial-liquidity sandwich — front-run buy at pre-liquidity price) |
| Per-launch (2024–2025) | Raydium `addLiquidity` transaction lands; pool funded with initial reserves | **T9.012** (liquidity-addition target) |
| Per-launch (2024–2025) | Bot back-runs the `addLiquidity` with a token-sale transaction; dumps acquired tokens at inflated post-liquidity price; extracts profit | **T9.012** (initial-liquidity sandwich — back-run sell at post-liquidity price) |
| 2024–2025 | Sniper bot operators accumulate profits; some deploy private-mempool-access or block-leader-collaboration arrangements to improve sandwich success rate | T5.004 (MEV-infrastructure refinement) |

## Realised extraction

Cohort-level MEV extraction across thousands of token launches. Individual sandwich extractions range from sub-SOL (tens of dollars) to hundreds of SOL-equivalent (thousands to tens of thousands of dollars) per launch, depending on the initial-liquidity size. The larger the deployer's initial-liquidity addition, the more profitable the sandwich — a dynamic that penalises well-capitalised legitimate launches.

## OAK technique classification rationale

T9.012 (Initial Liquidity Sandwich Attack) is the primary classification because the load-bearing extraction primitive was the sandwich-at-liquidity-addition — front-run buy at pre-liquidity price, back-run sell at post-liquidity price. The temporal sequencing of the liquidity-establishing transaction (pump.fun bonding-curve graduation → Raydium `addLiquidity`) provided the price-discontinuity window that the sandwich exploited.

T5.004 (Sandwich MEV Extraction) is the secondary classification because the broader MEV-sandwich infrastructure on Solana (sniper bots, bundle-construction primitives, private-mempool-access arrangements) supported the initial-liquidity-sandwich pattern. T9.012 is a specific sub-class of the broader T5.004 sandwich surface — T5.004 sandwiches regular swap transactions in established pools; T9.012 sandwiches the liquidity-addition transaction that creates the pool.

## References

- Pump.fun bonding-curve and Raydium graduation mechanics documentation
- Solana MEV searcher bot-address profiling (pump.fun/Raydium sniper bot clusters)
- EigenPhi-style MEV bundle analysis for Solana token-launch sandwiches (vendor coverage emerging at v0.x)
- See `examples/2020-2025-initial-liquidity-sandwich-cohort.md` for the EVM canonical T9.012 anchor (Uniswap V2/V3 and PancakeSwap token-launch sandwich cohort)
