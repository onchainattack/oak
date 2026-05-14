# Paraluni flash-loan exploit — BNB Chain — 2022-03-13

**Loss:** approximately $1.7M extracted from Paraluni's masterChef contract via a price-calculation manipulation attack funded by flash loans.
**OAK Techniques observed:** OAK-T9.001 (Oracle Price Manipulation — primary; the attacker exploited a price-calculation bug in Paraluni's masterChef contract, manipulating the liquidity-addition pricing through flash-loan-funded pool-state distortion). OAK-T9.002 (Flash-Loan-Funded Attack — structurally co-occurring; the attacker used flash loans to fund the capital base for the price-manipulation cycle).
**Attribution:** pseudonymous; the attacker has not been publicly identified. No portion of the funds was returned.
**Key teaching point:** A masterChef-style yield-farming contract that computes liquidity-addition prices from live pool state without TWAP smoothing or deviation breakers is a standing T9.001 surface — the masterChef pattern, widely deployed across BSC yield farms in the 2021-2022 period, inherits the same pool-state-as-oracle vulnerability that the lending-market oracle class (bZx, Harvest, Cream) made canonical on Ethereum.

## Summary

Paraluni was a BNB Chain yield aggregator and farming protocol whose masterChef contract computed the exchange rate for liquidity-addition operations from live pool state. On 2022-03-13, an attacker used flash loans to borrow a large amount of the relevant trading pair, manipulated the pool's price, and then added liquidity through the masterChef contract at the distorted exchange rate — receiving a disproportionately large allocation of yield-farming rewards in exchange for a small genuine capital contribution. The attacker then extracted the over-allocated rewards and repaid the flash loan, netting approximately $1.7M in profit.

The price-calculation bug was a standard pool-state-as-oracle failure: the masterChef contract read the instantaneous pool reserve ratio as the canonical price, with no TWAP window, no deviation breaker, and no sanity-check against an external price reference. Flash-loan-funded price distortion across a single block was sufficient to push the reserve ratio to the attacker's chosen level, producing an inflated liquidity-addition exchange rate that the masterChef contract accepted as legitimate.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-03-13 | Attacker takes flash loan from PancakeSwap (or equivalent BSC DEX) to fund the attack | T9.002 (capital sourcing) |
| 2022-03-13 (same block) | Attacker manipulates the pool price to distort the reserve ratio | T9.001 (oracle input manipulation) |
| 2022-03-13 (same block) | Attacker adds liquidity through Paraluni's masterChef contract at the manipulated exchange rate, receiving over-allocated rewards | T9.001 (extraction — inflated LP allocation) |
| 2022-03-13 (same block) | Attacker extracts over-allocated rewards, repays flash loan, retains ~$1.7M profit | T9.001 (extraction complete) |
| 2022-03-13 (post-event) | Paraluni team identifies the exploit; publishes post-mortem | (operator response) |

## Public references

- Paraluni operator-side post-mortem, March 2022 — `[paralunipostmortem2022]`.
- PeckShield on-chain trace — `[peckshieldparaluni2022]`.
- SlowMist forensic analysis — `[slowmistparaluni2022]`.
- Rekt News public-facing summary — `[rektparaluni2022]`.
- Cross-reference: T9.001 (Oracle Price Manipulation) at `techniques/T9.001-oracle-price-manipulation.md`.
- Cross-reference: T9.002 (Flash-Loan-Funded Attack) at `techniques/T9.002-flash-loan-funded-attack.md`.

## Discussion

Paraluni is the canonical BSC-yield-farm masterChef-price-manipulation worked example in the OAK record. The masterChef pattern — where a farming contract reads live pool state to determine deposit/reward exchange rates — recurs across numerous BSC yield-farm exploits in the 2021-2022 period (PancakeBunny May 2021, Bogged Finance May 2021, and the broader BSC yield-farm exploit cohort). Paraluni's specific contribution to the T9.001 chain is its masterChef-instant-pool-state-reading sub-pattern: unlike the lending-market oracle class where the manipulated price flows into a borrow/liquidate calculation, the masterChef class uses the manipulated price to inflate the attacker's yield-farm reward allocation, producing an extraction shape (over-allocated rewards vs. under-collateralised borrows) that is mechanically distinct from the Cream/Harvest/bZx subclass.

The $1.7M loss magnitude places Paraluni in the mid-range of the BSC yield-farm exploit cohort and makes it a useful worked example for smaller-scale T9.001 + T9.002 incidents where the extraction mechanism is cleanly separable into "manipulate price" and "capture inflated reward allocation" — a structure that generalises to farming protocols beyond the masterChef variant.
