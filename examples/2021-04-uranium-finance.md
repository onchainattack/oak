# Uranium Finance migration-pair arithmetic error — BSC — 2021-04-28

**Loss:** approximately \$50M across multiple token pairs bridged or deployed on BSC (BUSD, WBNB, ETH, and others held in Uranium V2 liquidity pools). Funds were not recovered or returned.
**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — broadly construed; the V2 pair contract was deployed with a swap-amount calculation that contained a multiplication-by-1000-where-multiplication-by-10000-was-coded arithmetic error, creating a path for any caller to extract 10x the correct swap output from affected pools; no access-control guard validated that the swap-output amount was consistent with the pool's reserve ratio). **OAK-T9.011** (Precision-Loss / Rounding Attack — the arithmetic error was structurally a precision-loss error: the contract multiplied the input amount by an incorrect constant (1000 vs. 10000 in the integer-math amplification step), causing the output calculation to systematically over-credit the swapper).
**Attribution:** **pseudonymous (no public attribution)**. The attacker's address was identified on BSC scan; no wallet-cluster attribution to a known actor was published by on-chain analytics providers. The rapid discovery — within hours of the V2 deployment — suggests that MEV searchers or opportunistic actors monitoring new BSC contract deployments were the likely exploiters.
**Key teaching point:** **Uranium Finance is the canonical worked example of an arithmetic-error drain introduced during a protocol-migration contract deployment — the single most expensive integer-math bug in DeFi history at the time of the exploit.** The incident demonstrates that a V1-to-V2 migration, even when the V2 code is a fork of audited, battle-tested code (Uniswap v2), reintroduces the risk of a one-line arithmetic typo in the migration-specific contract — effectively the contract-deployment equivalent of a production-configuration error — and that the absence of a migration-delay / grace period or community-review window between V2 deployment and V2 activation is the structural T12.004 pre-condition that converts a one-line bug into a \$50M drain.

## Summary

Uranium Finance was a Uniswap v2 fork deployed on Binance Smart Chain (BSC). It operated a V1 version and announced a migration to V2 in late April 2021. The V2 migration involved deploying new pair contracts and migrating liquidity from V1 to V2 pools.

On 2021-04-28, the Uranium team deployed the V2 pair contracts and began the liquidity migration. A critical arithmetic error was present in the V2 pair contract's swap-amount calculation. In Uniswap v2's standard implementation, the `getAmountOut` function multiplies the input amount by 997 (the 0.3% fee denominator, expanded as `input * 997`). The Uranium V2 pair contract — for reasons that remain unclear (likely a copy-paste or configuration error during the Uniswap v2 fork customisation) — used an incorrect constant in this multiplication step. The net effect: any swap through an affected V2 pool would credit the swapper with approximately 10x (or, in some analyses, 100x) the correct output amount, effectively allowing the swapper to drain the pool's reserves by iterating swaps through the same pool.

Within hours of the V2 pair deployment — potentially within minutes — an opportunistic actor (or MEV searcher monitoring new BSC contract deployments) identified the arithmetic error and executed a series of swaps that drained approximately \$50M from the V2 pools, principal across BUSD, WBNB, ETH, and other tokens. The attacker swapped a small input amount, received a disproportionately large output, and repeated the operation across multiple pools until the V2 pair reserves were effectively empty.

The Uranium team suspended the protocol and acknowledged the exploit within hours. No funds were recovered or returned. The incident was the second-largest exploit on BSC in 2021, surpassed only by the Venom/PancakeBunny flash-loan exploit (May 2021, ~$45M initially estimated at $200M). It joined the PancakeBunny, Spartan Protocol, and Belt Finance incidents in establishing BSC's 2021 reputation as the highest-exploit-frequency DeFi ecosystem per-TVL during that year's yield-farming wave.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021-04-28 ~04:00 | Uranium Finance deploys V2 pair contracts on BSC; liquidity migration begins | (migration deployment) |
| 2021-04-28 ~06:00 to ~08:00 | Arithmetic error in V2 swap calculation discovered by opportunistic actor; drain begins across affected pools | T9.011 (precision-loss arithmetic error), T9.004 (no output-amount validation) |
| 2021-04-28 ~08:00 | ~\$50M in tokens drained from V2 pools; Uranium team confirms exploit; protocol suspended | (exploit complete) |
| 2021-04-28 ~12:00 | Uranium publishes initial post-mortem acknowledging the arithmetic error in V2 pair contract | (post-mortem) |
| post-04-28 | No funds recovered; Uranium protocol effectively defunct after the exploit | (project failure) |

## Realised extraction

Approximately \$50M across multiple BSC tokens (BUSD, WBNB, ETH, and various BEP-20 tokens deposited into Uranium V2 pools). No funds were recovered or returned.

## T9.011 classification

The Uranium Finance exploit is the canonical anchor for OAK-T9.011 (Precision-Loss / Rounding Attack) in the **arithmetic-constant error** sub-shape. The standard Uniswap v2 integer-math amplification pattern (`amountIn * 997 / 1000` to apply the 0.3% fee) relies on a correct amplification constant. The Uranium V2 pair contract used an incorrect constant — structurally a one-line typo — that amplified the output amount by an unintended factor. The attacker did not need to manipulate an oracle, exploit a flash loan, or abuse reentrancy: calling the swap function with the flawed arithmetic was sufficient to drain the pool.

The distinction between T9.011 (precision-loss) and T9.004 (access-control) in the Uranium case is that the arithmetic error is the **technical mechanism** (T9.011), while the absence of an output-amount validation that would have rejected the output as inconsistent with the pool's invariant is the **access-control / validation gap** (T9.004). A correct Uniswap v2 implementation validates the output through the constant-product invariant check at the end of the swap; the Uranium V2 check was either missing or also used the wrong constant, meaning the invariant-validation guard that would have caught the arithmetic error was itself flawed. This dual failure — wrong arithmetic constant + no validating invariant check — is the forensic signature of the Uranium exploit class.

## References

- Uranium Finance, "Uranium Finance Exploit Post-Mortem," April 28, 2021 (via Medium)
- PeckShield, "Uranium Finance Root Cause Analysis," April 28, 2021
- SlowMist, "Uranium Finance Exploit Technical Breakdown," April 28, 2021
- Rekt News, "Uranium Finance — REKT," rekt.news, April 28, 2021
- BscScan — exploit transaction hashes and affected pool addresses (April 28, 2021)
