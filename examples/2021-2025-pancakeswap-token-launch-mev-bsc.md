# PancakeSwap token-launch MEV sandwich cohort — BSC — 2021–2025

**Loss:** **Distributed across thousands of token launches.** Individual sandwich extractions range from tens to low hundreds of BNB-equivalent per launch; the aggregate extraction across all PancakeSwap new-pool launches from 2021 to 2025 is material but distributed. No single headline-grabbing loss figure anchors the class because the extraction is per-launch modest and spread across thousands of token-deployment events.
**OAK Techniques observed:** **OAK-T9.012** (Initial Liquidity Sandwich Attack) — canonical BSC anchor. The attacker sandwiches the token deployer's `addLiquidity` transaction — front-running with a token purchase at the pre-liquidity price and back-running with a sale at the post-liquidity price — on PancakeSwap pools.
**Attribution:** **pseudonymous** — multiple MEV bot addresses operating on BSC are on-chain attributable. The bot operators are not publicly identified.

**Key teaching point:** BSC's transparent mempool and 3-second block times create a structurally attractive surface for initial-liquidity sandwich attacks — the mempool visibility is equivalent to Ethereum L1, and the short block interval compresses the window for deployer-side mitigation (private relay, atomic deploy+addLiquidity). PancakeSwap's position as the dominant BSC AMM means the vast majority of BSC token launches route through its factory, concentrating the T9.012 surface on a single venue.

## Summary

PancakeSwap is the dominant AMM on BNB Smart Chain (BSC), hosting the majority of BSC token-deployment activity. BSC's transparent public mempool and 3-second block times make initial-liquidity sandwich attacks against PancakeSwap new-pool launches operationally attractive to MEV searchers.

The attack follows the canonical T9.012 pattern adapted to the BSC/PancakeSwap environment: (1) the attacker observes a token deployer's `addLiquidity` transaction in the BSC mempool; (2) the attacker front-runs the `addLiquidity` with a token purchase at the pre-liquidity price (the pool does not yet exist, so the purchase occurs against the first block's available liquidity at an extreme price); (3) the deployer's `addLiquidity` transaction seeds the pool with quote-asset reserves, inflating the pool's total liquidity; (4) the attacker back-runs with a token sale at the post-liquidity price, extracting the price differential between pre-liquidity and post-liquidity. The deployer's quote-asset deposit funds the attacker's profit — the larger the initial liquidity, the larger the extraction.

Multiple MEV bots specialise in PancakeSwap new-pool sandwiches. The pattern has been operational since PancakeSwap's launch in 2020 and continues at v0.1 cutoff. The BSC sandwich surface is structurally identical to the Uniswap V2 surface on Ethereum but operates in a lower-gas-cost environment, making smaller token launches economically viable sandwich targets.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2020-09 | PancakeSwap launches on BSC; the transparent mempool and short block times create the initial-liquidity sandwich surface from deployment day | T9.012 (BSC surface) |
| 2021–2025 | Multiple MEV bots specialise in PancakeSwap new-pool sandwiches; the pattern is operationally continuous across the BSC token-deployment wave | T9.012 (operational) |
| 2021–2025 | BSC MEV searchers port Ethereum MEV bot infrastructure to BSC; sandwich bundles adapted to PancakeSwap's fee structure and block-gas limit | T9.012 (tooling) |
| Continuing | PancakeSwap new-pool sandwiching remains an active MEV extraction pattern on BSC; deployer-side mitigations (private relay, atomic deploy+addLiquidity) are inconsistently adopted | (ongoing surface) |

## Realised extraction

**Distributed across thousands of token launches.** Individual sandwich extractions range from tens to low hundreds of BNB-equivalent per launch, depending on the deployer's initial liquidity size and the attacker's front-run capital. The aggregate extraction is material when summed across all PancakeSwap new-pool launches over 2021–2025 but is not concentrated in any single incident.

The extraction scales with the deployer's quote-asset deposit — a deployer who seeds the pool with a large BNB/USDT/BUSD deposit inadvertently funds a larger attacker profit. The per-launch extraction is lower on BSC than on Ethereum mainnet for an equivalent-quote-value launch due to BSC's lower gas costs enabling more searchers to compete for each sandwich — the competition compresses per-sandwich margins but does not eliminate the surface.

## What defenders observed

- **BSC mempool transparency is the enabling condition.** BSC's public mempool exposes `addLiquidity` transactions before inclusion, allowing MEV searchers to construct sandwich bundles targeting the new pool. The absence of a private transaction relay ecosystem on BSC (compared to Ethereum's Flashbots Protect) means fewer deployers use private channels for the initial liquidity addition.
- **Short block times compress the defender's window.** BSC's 3-second block interval leaves less time between transaction broadcast and inclusion for deployer-side detection or intervention compared to Ethereum's 12-second blocks.
- **PancakeSwap factory address concentration.** The vast majority of BSC token launches route through PancakeSwap's canonical factory contracts, making the T9.012 surface monitorable from a single set of factory addresses — both a detection advantage (single monitoring surface) and a concentration risk (one venue hosts nearly all BSC token-launch MEV).
- **Lower gas costs expand the viable-target set.** BSC's lower transaction costs make smaller token launches economically viable sandwich targets — a launch that would be below the gas-cost threshold for a profitable sandwich on Ethereum mainnet may be above the threshold on BSC. This expands the per-chain T9.012 victim set on BSC relative to Ethereum.

## What this example tells contributors

- **BSC is the canonical non-Ethereum T9.012 anchor.** The PancakeSwap surface demonstrates that T9.012 generalises across EVM chains: the structural requirements are a public mempool, an AMM factory with observable `addLiquidity` transactions, and block-level atomic execution. Any chain meeting these three conditions hosts the T9.012 surface.
- **Mempool transparency is the load-bearing environmental variable.** Chains with encrypted mempools, private transaction relay as standard, or leader-based sequencing without a public mempool (Solana) shift the T9.012 observation surface but do not eliminate the sandwich — the attack adapts to the leader-scheduling layer.
- **Venue concentration aids detection.** PancakeSwap's dominance on BSC means monitoring a single factory address set covers the vast majority of BSC token-launch sandwich activity. The equivalent monitoring surface on Ethereum is fragmented across Uniswap V2, Uniswap V3, and numerous smaller AMM factories.

## Public references

- PancakeSwap factory contracts: canonical BSC AMM deployment infrastructure.
- BSC block explorer (BscScan): mempool-level transaction observation and sandwich-bundle identification.
- MEV searcher addresses on BSC are on-chain attributable; EigenPhi and equivalent MEV analytics providers cover the BSC sandwich surface.
- Cross-reference: `examples/2020-2025-initial-liquidity-sandwich-cohort.md` (Ethereum Uniswap V2 anchor); `examples/2024-2025-pump-fun-solana-launch-sniping.md` (Solana leader-scheduling variant).
