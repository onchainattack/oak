# Uranium Finance migration-pair arithmetic error — BSC — 2021-04-28

**Loss:** over \$50M across 26 market pairs on BNB Chain `[immunefi]`; The Block listed drained assets including about 17.9M BUSD, 5.7M USDT, 34,000 wrapped BNB, 1,800 ETH and 80 BTC `[theblockuranium]`. No recovery is reported in the sources consulted.
**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — the fork changed the fee scaling factor from 1000 to 10000 in the adjusted-balance calculation but left the constant-product (K) check at 1000, so the check no longer matched the adjusted balances and a tiny swap could take nearly the whole opposite balance `[immunefi]`). **OAK-T9.011** (Precision-Loss / Rounding Attack — secondary; the flaw is an inconsistent scaling constant rather than rounding, so this mapping is weak).

**Re-mapped 2026-10-11:** primary Technique moved from T9.004 to [`T9.016-contract-accounting-state-invariant-flaw`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md).
**Attribution:** **pseudonymous**. The attacker is not identified in the sources consulted. The Block's analyst said an insider job or rug pull was possible (the team ran no white-hat test before the V2.1 migration, and the contracts repository was removed from GitHub); this is speculation, not a finding `[theblockuranium]`. The "opportunistic MEV searcher" explanation in the original file was unsourced and is removed.
**Corrected 2026-10-11:** Mechanism fixed (fee-scale constant changed 1000→10000 without updating the K check, not a 997 getAmountOut typo); the exploit hit the V2.1 migration; loss detail and Tornado Cash laundering added from sources; removed the unsourced timeline hours, post-mortem, "second-largest BSC exploit" and PancakeBunny comparison claims.
**Key teaching point:** **Uranium Finance is the canonical worked example of an arithmetic-error drain introduced during a protocol-migration contract deployment — an inconsistent constant between the swap fee adjustment and the invariant check.** The incident demonstrates that a V1-to-V2 migration, even when the V2 code is a fork of audited, battle-tested code (Uniswap v2), reintroduces the risk of a one-line arithmetic typo in the migration-specific contract — effectively the contract-deployment equivalent of a production-configuration error — and that unreviewed migration code can turn a small inconsistency into a \$50M drain.

## Summary

Uranium Finance was a Uniswap v2 fork deployed on Binance Smart Chain (BSC). It operated a V1 version and announced a migration to V2 in late April 2021. The V2 migration involved deploying new pair contracts and migrating liquidity from V1 to V2 pools.

On 2021-04-28 the project was drained of over \$50M across 26 market pairs. Uranium said the exploit occurred during its migration to V2.1 `[theblockuranium]`. Per Immunefi's analysis, Uranium forked Uniswap V2 but changed the fee scaling factor from 1000 to 10000 in the adjusted-balance calculation while the K invariant check still used 1000; the check was therefore ineffective and an attacker could swap a tiny amount of one token for nearly the entire balance of the other, with post-swap K effectively 100 times pre-swap K `[immunefi]`. The original file's claim that the bug was in `getAmountOut`'s 997 multiplier is not supported.

Funds were moved by swapping DOT and ADA to ETH on PancakeSwap, bridging ETH and BTC via AnySwap and mixing ETH through Tornado Cash; The Block counted about 2,438 ETH (~\$6.4M) withdrawn via Tornado Cash `[theblockuranium]`. Cointelegraph noted speculation about an inside job given the further upgrade only 11 days after the V2 migration `[cointelegraphuranium]`.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021-04 | Uranium launches, migrates to V2 and then V2.1 | (migration deployment) |
| 2021-04-28 | Pair contracts drained across 26 pairs, over \$50M `[immunefi]` | T9.016 (K check inconsistent with scaled balances) |
| 2021-04-28 | Proceeds swapped, bridged and mixed through Tornado Cash `[theblockuranium]` | (laundering) |

## Realised extraction

Over \$50M across 26 pairs `[immunefi]`; asset breakdown in `[theblockuranium]`.

## T9.011 classification

The Uranium Finance exploit is the earliest corpus anchor for OAK-T9.016 (Contract Accounting / State-Invariant Flaw) in the **invariant-computed-wrong** sub-shape — an arithmetic-constant error, not a rounding-direction error, which is why it moved out of T9.011 on 2026-10-11. In the Uniswap V2 pair, the swap adjusts balances by the fee scale and then checks the K invariant at the same scale. Uranium changed the scale to 10000 in the adjusted-balance step but not in the K check `[immunefi]`. The attacker did not need to manipulate an oracle, exploit a flash loan, or abuse reentrancy: calling the swap function with the flawed arithmetic was sufficient to drain the pool.

The mismatch is better described as an invariant-computed-wrong flaw (T9.016) than as precision loss; the original file's claim that the invariant check was "missing or also used the wrong constant" is replaced by the sourced description above.

## Public references

- `[immunefi]` — Immunefi, "Hack Analysis: Uranium Finance, April 2021": <https://immunefi.com/blog/bug-fix-reviews/hack-analysis-uranium-finance-april-2021/>
- `[theblockuranium]` — The Block, "Binance Smart Chain-based DeFi project Uranium Finance exploited, lost \$50 million" (2021-04-28): <https://theblock.co/news/defi/2021-04-28-binance-smart-chain-defi-uranium-finance-exploited-lost-50-million-103076>
- `[cointelegraphuranium]` — Cointelegraph, "\$50M reportedly stolen from BSC-based Uranium Finance" (2021-04-28): <https://cointelegraph.com/news/50m-reportedly-stolen-from-bsc-based-uranium-finance>
