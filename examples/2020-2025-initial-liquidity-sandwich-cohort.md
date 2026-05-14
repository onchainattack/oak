# Initial liquidity sandwich MEV cohort — EVM / multi-chain — 2020–2025 (ongoing)

**Loss:** no single headline-grabbing loss figure; individual sandwich extractions are modest per launch (tens to low hundreds of ETH-equivalent) but the aggregate extraction across tens of thousands of token launches since 2020 is material. MEV searchers operating as sandwich bots (e.g., jaredfromsubway.eth and equivalents on Ethereum mainnet) routinely monitor the public mempool for `addLiquidity` transactions on newly created pools and execute the sandwich: front-run buy at pre-liquidity price, back-run sell at post-liquidity price.
**OAK Techniques observed:** **OAK-T9.012** (Initial Liquidity Sandwich Attack) — primary; the canonical T9.012 anchor. The attack sandwiches the liquidity addition itself rather than a regular trade, exploiting the structural price discontinuity between pre-liquidity and post-liquidity pool state. **OAK-T5.004** (Sandwich MEV Extraction) — structurally adjacent; T5.004 sandwiches a regular swap in an established pool; T9.012 sandwiches the `addLiquidity` transaction that creates the pool. The two techniques share the same MEV searcher infrastructure but differ in the sandwiched transaction type.
**Attribution:** **pseudonymous** — MEV searcher bot addresses are on-chain attributable (jaredfromsubway.eth, jaredfromsubway.bnb, and equivalents across chains). The sandwich bundle is identifiable at the block-builder layer. Underlying human identity of MEV searcher operators requires off-chain intelligence.
**Key teaching point:** **The initial liquidity sandwich is the canonical 2020 worked example of a MEV pattern that exploits the deployment-process timing rather than a code bug in the deployed contract.** The token contract and AMM pool contract are typically bug-free — the vulnerability is the mempool-visibility of the `addLiquidity` transaction and the atomic bundling that makes the sandwich risk-free for the attacker. The mitigation lives at the transaction-relay layer (private mempool) and the deployment-process layer (atomic deploy + addLiquidity).

## Summary

On Ethereum mainnet and EVM-compatible chains, token deployers create a new Uniswap V2/V3 (or PancakeSwap, or equivalent AMM) pool by deploying the token contract and then submitting an `addLiquidity` transaction that seeds the pool with the token and its paired quote asset (e.g., ETH, USDC). The pool address is deterministic from the token address and the factory contract — the pool's creation is predictable before the `addLiquidity` transaction lands.

MEV searchers monitor the public mempool for `addLiquidity` transactions directed at newly created pools. When a pending `addLiquidity` is observed:

1. **Front-run:** The searcher submits a buy transaction with a higher gas price, acquiring the token at the pre-liquidity price. Since the pool does not yet exist at this point (or was just created at zero reserves), the purchase occurs against the first available liquidity at an extreme price.
2. **addLiquidity:** The deployer's `addLiquidity` transaction lands, seeding the pool with the pair's quote asset (e.g., ETH) and inflating the pool's reserves. The post-addLiquidity price is now materially higher than the front-run acquisition price.
3. **Back-run:** The searcher submits a sell transaction that dumps the tokens acquired in step 1 at the post-addLiquidity price, capturing the price differential between pre-liquidity and post-liquidity state.

All three transactions are typically bundled atomically via MEV-Boost / Flashbots-style relays, eliminating inventory risk for the searcher.

The structural victims:
- **The deployer** receives fewer LP tokens for the same deposited quote-asset amount because the front-run purchase dilutes the deployer's LP share.
- **Early buyers** who trade in the blocks immediately following the pool creation may purchase at the inflated post-sandwich price.

The pattern has been operational since the Uniswap V2 token-deployment wave of 2020 and is so prevalent that token deployers are routinely advised to use private transaction relays (Flashbots Protect, MEV-Share) for the initial liquidity addition.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2020-05 | Uniswap V2 launches on Ethereum mainnet; token-deployment wave begins; mempool-visible `addLiquidity` transactions create the initial-liquidity sandwich surface | (surface creation) |
| 2020–2021 | MEV searchers begin executing initial-liquidity sandwiches; jaredfromsubway.eth and equivalent bot addresses emerge | T9.012 (pattern emergence) |
| 2021–2023 | PancakeSwap on BSC, Raydium on Solana, and equivalent AMMs on alt-L1s see parallel initial-liquidity sandwich patterns | T9.012 (cross-chain surface expansion) |
| 2021–2025 | Deployers increasingly adopt private transaction relays (Flashbots Protect, MEV-Share) for initial liquidity addition; sandwich rates decline for relay-protected launches | (mitigation adoption) |
| 2020–2025 (ongoing) | Public-mempool launches on any AMM remain exposed to T9.012; the pattern is structurally persistent wherever the mempool is transparent and block times permit atomic bundling | T9.012 (ongoing) |

## Realised extraction

No single headline loss; individual sandwich extraction typically tens to low hundreds of ETH-equivalent per launch. The aggregate extraction across thousands of token launches since 2020 is material but distributed — the pattern's significance lies in its prevalence rather than in any single extracted amount.

## References

- Daian et al., "Flash Boys 2.0" (2019) — foundational MEV characterisation
- Zhou et al., "SoK: Decentralized Finance (DeFi) Attacks" (2023) — academic taxonomy including AMM-deployment-layer surface
- EigenPhi — MEV bundle analysis and sandwich detection
- Flashbots MEV-Boost relay data — bundle-level transparency
- Uniswap V2/V3, PancakeSwap, Raydium AMM documentation
- See `techniques/T9.012-initial-liquidity-sandwich-attack.md` for full technique characterisation
