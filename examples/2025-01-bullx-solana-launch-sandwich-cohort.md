# BullX / Solana token-launch MEV sandwich cohort — Solana — 2025

**Loss:** no single headline loss figure; aggregate extraction across thousands of Solana token launches via BullX and equivalent sniper-bot infrastructure is material but distributed. MEV searchers operating sniper bots on Solana target newly created Raydium/Orca pools with initial-liquidity sandwich strategies, acquiring tokens at pre-liquidity pricing and dumping post-addLiquidity.
**OAK Techniques observed:** **OAK-T9.012** (Initial Liquidity Sandwich Attack) — primary; the canonical Solana-specific T9.012 anchor. The attack sandwiches the liquidity addition itself rather than a regular trade, exploiting the structural price discontinuity between pre-liquidity and post-liquidity pool state on Solana AMMs. Solana's absence of a public mempool shifts the observation surface to the leader-scheduling layer but the extraction mechanism is structurally T9.012.
**Attribution:** **pseudonymous** — sniper-bot addresses are on-chain attributable on Solana; the sandwich bundle is identifiable at the leader-block-construction layer. Underlying human identity of sniper-bot operators requires off-chain intelligence.
**Key teaching point:** **The Solana token-launch sandwich surface demonstrates that T9.012 is chain-agnostic — Solana's absence of a public mempool shifts the observation surface to the leader-scheduling layer, but the extraction mechanism (front-run buy at pre-liquidity price, back-run sell at post-liquidity price straddling the deployer's `addLiquidity`) is structurally identical to the EVM pattern.** The BullX sniper-bot ecosystem operationalises T9.012 at industrial throughput on Solana.

## Summary

On Solana, token deployers create new AMM pools (typically Raydium or Orca) by deploying a token via the SPL Token Program and then seeding liquidity. Unlike Ethereum, Solana does not have a public mempool — pending transactions are forwarded to the current leader, who constructs the block. However, the leader and allied searchers can observe incoming `addLiquidity` transactions before block construction, enabling the same sandwich pattern observed on EVM chains.

The BullX sniper-bot ecosystem (and equivalents such as Trojan, BonkBot, and FluxBot) operationalises T9.012 on Solana at industrial throughput. These bots monitor for new token deployments and pending `addLiquidity` transactions on Raydium/Orca pools. When a deployer's `addLiquidity` is detected:

1. **Front-run:** The sniper bot submits a buy transaction that lands before the `addLiquidity`, acquiring tokens at the near-zero pre-liquidity price.
2. **addLiquidity:** The deployer's `addLiquidity` lands, seeding the pool with SOL/USDC and inflating the pool's reserves. The post-addLiquidity price is now materially higher.
3. **Back-run:** The sniper bot sells the tokens acquired in step 1 at the post-liquidity price, capturing the price differential.

The sandwich is atomic at the leader-block-construction layer on Solana: the current leader (or a searcher with leader-allied infrastructure) can sequence the three operations within a single block, eliminating inventory risk.

The structural victims are the deployer (who receives diluted LP share) and early buyers who purchase at the inflated post-sandwich price. The pattern is so prevalent on Solana that token deployers are routinely advised to use private transaction submission channels (Jito bundles, priority-fee-aware RPC providers) to prevent leader-level observation of the `addLiquidity`.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023–2024 | Solana DeFi ecosystem expands; Raydium/Orca pool-creation volume grows; sniper-bot infrastructure (BullX, Trojan, BonkBot, FluxBot) emerges | (surface creation) |
| 2024–2025 | Sniper bots operationalise T9.012 on Solana at industrial throughput; thousands of token launches targeted | T9.012 (pattern operationalisation) |
| 2025 | BullX and equivalent bots dominate Solana sniper-bot market share; per-launch extraction typically tens to hundreds of SOL-equivalent | T9.012 (ongoing at scale) |
| 2025 (ongoing) | Deployers increasingly adopt Jito bundles / private RPC submission for `addLiquidity`; sandwich rates decline for protected launches | (mitigation adoption) |
| 2025 (ongoing) | Public-leader-visible launches on any Solana AMM remain exposed; pattern persists wherever leader-observation of `addLiquidity` is possible | T9.012 (ongoing) |

## Realised extraction

No single headline loss; individual sandwich extraction typically tens to hundreds of SOL-equivalent per launch. Aggregate extraction across thousands of launches is material but distributed.

## Public references

- Cross-reference: T9.012 at `techniques/T9.012-initial-liquidity-sandwich-attack.md`.
- Cross-reference: 2020-2025-initial-liquidity-sandwich-cohort at `examples/2020-2025-initial-liquidity-sandwich-cohort.md` (EVM/multi-chain T9.012 anchor).
- Cross-reference: 2024-2025-pump-fun-solana-launch-sniping at `examples/2024-2025-pump-fun-solana-launch-sniping.md` (Pump.fun / Solana token-launch MEV sniping cohort).

## Public References

See citations in corresponding technique file.
