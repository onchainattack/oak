# Warp Finance flash-loan oracle exploit — Ethereum — 2020-12-17

**Loss:** approximately $7.8M in DAI and USDC `[rektwarp]` drained from Warp Finance's lending market. The attacker used flash loans to manipulate the Uniswap V2 WETH-DAI LP token price that Warp Finance's oracle used to value collateral.
**OAK Techniques observed:** OAK-T9.001 (Oracle Price Manipulation — primary; LP-token valuation sub-class: the attacker manipulated Uniswap LP token prices that Warp Finance used as the collateral valuation reference for lending-market deposits). OAK-T9.002 (Flash-Loan-Funded Attack — structurally co-occurring; flash loans provided the capital base for the LP-token price manipulation).
**Attribution:** **unattributed** pseudonymous; the attacker has not been publicly identified. Warp Finance recovered approximately $5.85M (about 75%) of the roughly $7.7M lost, returned as ETH/DAI Uniswap LP tokens, by liquidating the attacker's position through an admin function `[theblockwarp]`; no negotiation with the attacker is reported.
**Corrected 2026-10-11:** Uniswap V2 (not V3, which did not exist yet) was the oracle source; loss is about $7.8M; recovery came from Warp liquidating the attacker's position as admin, in LP tokens, not from negotiation; removed the unsourced "retained ~$2.2M" and "exits with proceeds" framing.
**Key teaching point:** Using Uniswap LP tokens as collateral without a secondary price validation layer creates a manipulable collateral-valuation surface — the attacker can flash-loan funds, trade sharply in the Uniswap pool to inflate the LP token's price, deposit the now-inflated LP token as collateral, borrow against the inflated valuation, and exit well ahead of the loan position, leaving the protocol with under-collateralised debt.

## Summary

Warp Finance was an Ethereum lending protocol that accepted Uniswap V2 LP tokens as collateral for borrowing. The protocol's oracle priced LP tokens by reading the Uniswap pool's live state — reserve ratios and total supply — and computing the LP token's value directly from those pool-state inputs with no TWAP smoothing, no deviation breaker, and no external price reference for cross-validation.

On 2020-12-17, an attacker used flash loans to manipulate the relevant Uniswap pools: the attacker borrowed a large amount of one side of the LP pair, traded it for the other side in the Uniswap pool to push the reserve ratio (and thus the LP token price) sharply upward, deposited the now-overvalued LP tokens into Warp Finance as collateral, and borrowed DAI and USDC against the inflated collateral value. The attacker's loan position was significantly under-collateralised in real terms — the inflated LP-token valuation collapsed back to fair value as soon as the manipulated pool rebalanced — but Warp Finance's oracle accepted the manipulated spot price as the canonical collateral valuation throughout the borrow cycle. The attacker borrowed about 3.86M DAI and 3.9M USDC against the inflated collateral and repaid the flash loans; the LP tokens remained locked in Warp against an under-water position `[rektwarp]`.

Warp Finance announced (reported by The Block on 2020-12-21) that it had recovered about \$5.85M (about 75%) of the \$7.7M lost, returned as ETH/DAI Uniswap LP tokens. The Block reported that Warp likely moved admin rights of its contract to an externally-owned address to call a liquidation function, bypassing a two-day timelock, and that Warp did not explain the recovery in detail; no negotiation with the attacker is mentioned `[theblockwarp]`. The DAI and USDC were not recovered; Warp planned IOU tokens for v2 users.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2020-12-17 | Attacker takes flash loan to fund the LP-token price manipulation | T9.002 (capital sourcing) |
| 2020-12-17 (same block) | Attacker trades in the Uniswap pool to push LP token price sharply upward, inflating the collateral valuation | T9.001 (oracle input manipulation — LP-token sub-class) |
| 2020-12-17 (same block) | Attacker deposits overvalued LP tokens into Warp Finance as collateral | T9.001 (collateral deposit at manipulated price) |
| 2020-12-17 (same block) | Attacker borrows ~3.86M DAI and ~3.9M USDC against the inflated collateral valuation | T9.001 (extraction via under-collateralised borrow) |
| 2020-12-17 (same block) | Attacker repays flash loan; leaves the under-water position with LP tokens locked in Warp | T9.001 (extraction complete) |
| 2020-12-17 (post-event) | Warp Finance team identifies the exploit; publicly discloses | (operator response) |
| 2020-12-17 to 2021-01 | Warp Finance liquidates the attacker's position via admin function; recovers ~$5.85M (~75%) as LP tokens | (recovery — admin-liquidation recovery) |

## Public references

- `[rektwarp]` — Rekt, "Warp Finance - REKT" (2020-12-18): <https://rekt.news/warp-finance-rekt>
- `[theblockwarp]` — The Block, "DeFi protocol Warp Finance says it has recovered 75% of stolen funds, about $5.85 million" (2020-12-21): <https://www.theblock.co/news/defi/2020-12-21-defi-protocol-warp-finance-recovered-funds-flash-loan-attack-88645>
- `[slowmistwarp]` — SlowMist, "Analysis of Warp Finance hacked incident": <https://slowmist.medium.com/analysis-of-warp-finance-hacked-incident-cb12a1af74cc>
- Cross-reference: T9.001 at `techniques/T9.001-oracle-price-manipulation.md`; T9.002 at `techniques/T9.002-flash-loan-funded-attack.md`.

## Discussion

Warp Finance is the canonical LP-token-collateral-valuation subclass of T9.001 and occupies the slot between Harvest Finance (October 2020, pool-state-as-oracle via curve-pool virtual price) and Cream Finance (October 2021, yUSD LP-token oracle manipulation) in the T9.001 LP-token-collateral sub-chain. The structural contribution is the collateral-deposit-borrow extraction shape: unlike the bZx/Harvest pattern where the manipulated price feeds into a trade or mint function that directly extracts the manipulated asset, Warp Finance's extraction surface is a lending-market borrow against overvalued collateral — the attacker leaves an under-collateralised loan position that the protocol cannot liquidate at fair value because the collateral's oracle price has returned to normal. This extraction shape (inflate-collateral, borrow-against-it, exit-with-loan-proceeds) is mechanically distinct from the direct-trade-extraction shape and requires a different set of defender-side monitors: collateral-value-deviation alerts against external price references, TWAP-windowed oracle reads, and borrow-volume-against-single-collateral-type anomaly detection.

The ~75% recovery came from liquidating the attacker's under-water position, not from a negotiated return, so it is not comparable to dYdX (November 2023, ~90% recovery), Poly Network (August 2021, 100% recovery), and Euler Finance (March 2023, 100% recovery). It is notable instead as a case where an admin-key path let the operator unwind the attack, and it raised decentralisation questions.
