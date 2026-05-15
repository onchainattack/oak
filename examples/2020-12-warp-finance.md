# Warp Finance flash-loan oracle exploit — Ethereum — 2020-12-17

**Loss:** approximately $8M in DAI and USDC drained from Warp Finance's lending market. The attacker used flash loans to manipulate Uniswap V3 LP token prices used as collateral reference by Warp Finance's oracle.
**OAK Techniques observed:** OAK-T9.001 (Oracle Price Manipulation — primary; LP-token valuation sub-class: the attacker manipulated Uniswap LP token prices that Warp Finance used as the collateral valuation reference for lending-market deposits). OAK-T9.002 (Flash-Loan-Funded Attack — structurally co-occurring; flash loans provided the capital base for the LP-token price manipulation).
**Attribution:** **unattributed** pseudonymous; the attacker has not been publicly identified. Warp Finance recovered approximately $5.8M (approximately 75%) of user funds via negotiations with the attacker.
**Key teaching point:** Using Uniswap LP tokens as collateral without a secondary price validation layer creates a manipulable collateral-valuation surface — the attacker can flash-loan funds, trade sharply in the Uniswap pool to inflate the LP token's price, deposit the now-inflated LP token as collateral, borrow against the inflated valuation, and exit well ahead of the loan position, leaving the protocol with under-collateralised debt.

## Summary

Warp Finance was an Ethereum lending protocol that accepted Uniswap V3 LP tokens as collateral for borrowing. The protocol's oracle priced LP tokens by reading the Uniswap pool's live state — reserve ratios and total supply — and computing the LP token's value directly from those pool-state inputs with no TWAP smoothing, no deviation breaker, and no external price reference for cross-validation.

On 2020-12-17, an attacker used flash loans to manipulate the relevant Uniswap pools: the attacker borrowed a large amount of one side of the LP pair, traded it for the other side in the Uniswap pool to push the reserve ratio (and thus the LP token price) sharply upward, deposited the now-overvalued LP tokens into Warp Finance as collateral, and borrowed DAI and USDC against the inflated collateral value. The attacker's loan position was significantly under-collateralised in real terms — the inflated LP-token valuation collapsed back to fair value as soon as the manipulated pool rebalanced — but Warp Finance's oracle accepted the manipulated spot price as the canonical collateral valuation throughout the borrow cycle. The attacker exited with approximately $8M in DAI and USDC and did not repay the under-collateralised loans.

Warp Finance subsequently negotiated with the attacker and recovered approximately $5.8M (approximately 75%) of user funds, one of the largest proportional recoveries in the 2020 DeFi incident record. The remaining ~$2.2M was retained by the attacker.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2020-12-17 | Attacker takes flash loan to fund the LP-token price manipulation | T9.002 (capital sourcing) |
| 2020-12-17 (same block) | Attacker trades in the Uniswap pool to push LP token price sharply upward, inflating the collateral valuation | T9.001 (oracle input manipulation — LP-token sub-class) |
| 2020-12-17 (same block) | Attacker deposits overvalued LP tokens into Warp Finance as collateral | T9.001 (collateral deposit at manipulated price) |
| 2020-12-17 (same block) | Attacker borrows ~$8M in DAI and USDC against the inflated collateral valuation | T9.001 (extraction via under-collateralised borrow) |
| 2020-12-17 (same block) | Attacker repays flash loan; retains ~$8M in extracted DAI and USDC | T9.001 (extraction complete) |
| 2020-12-17 (post-event) | Warp Finance team identifies the exploit; publicly discloses | (operator response) |
| 2020-12-17 to 2021-01 | Warp Finance negotiates with the attacker; recovers ~$5.8M (~75%) of user funds | (recovery — negotiated partial return) |

## Public references

- Warp Finance operator-side post-mortem, December 2020 — `[warpfinancepostmortem2020]`.
- PeckShield on-chain trace — `[peckshieldwarp2020]`.
- Rekt News public-facing summary — `[rektwarp2020]`.
- Cross-reference: T9.001 (Oracle Price Manipulation) at `techniques/T9.001-oracle-price-manipulation.md`.
- Cross-reference: T9.002 (Flash-Loan-Funded Attack) at `techniques/T9.002-flash-loan-funded-attack.md`.

## Discussion

Warp Finance is the canonical LP-token-collateral-valuation subclass of T9.001 and occupies the slot between Harvest Finance (October 2020, pool-state-as-oracle via curve-pool virtual price) and Cream Finance (October 2021, yUSD LP-token oracle manipulation) in the T9.001 LP-token-collateral sub-chain. The structural contribution is the collateral-deposit-borrow extraction shape: unlike the bZx/Harvest pattern where the manipulated price feeds into a trade or mint function that directly extracts the manipulated asset, Warp Finance's extraction surface is a lending-market borrow against overvalued collateral — the attacker leaves an under-collateralised loan position that the protocol cannot liquidate at fair value because the collateral's oracle price has returned to normal. This extraction shape (inflate-collateral, borrow-against-it, exit-with-loan-proceeds) is mechanically distinct from the direct-trade-extraction shape and requires a different set of defender-side monitors: collateral-value-deviation alerts against external price references, TWAP-windowed oracle reads, and borrow-volume-against-single-collateral-type anomaly detection.

The ~75% negotiated recovery is one of the largest proportional recoveries in the 2020 DeFi incident record and establishes Warp Finance as a reference case for the negotiated-partial-return recovery channel alongside dYdX (November 2023, ~90% recovery), Poly Network (August 2021, 100% recovery), and Euler Finance (March 2023, 100% recovery). The Warp Finance recovery is notable because the negotiation occurred within the same DeFi exploit cohort that produced the Eminence-and-Harvest partial-return patterns and established the attacker-return-as-grey-hat-signal norm that would recur across subsequent incidents.
