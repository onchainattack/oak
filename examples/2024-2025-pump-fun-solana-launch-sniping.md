# Pump.fun / Solana token sandwiching cohort — Solana — 2024–2025

**Loss:** no cohort-wide loss figure is sourced. Helius's Solana MEV report measured one sandwich program (Vpe) over 2024-12-07 to 2025-01-05: about 1.55 million sandwich transactions, 88.9% success rate, profit of 65,880 SOL (~\$13.43M), average ~0.0425 SOL (~\$8.67) per sandwich. That figure covers all tokens, not only pump.fun launches. The earlier "tens of millions" cohort estimate was unsupported and has been removed.
**OAK Techniques observed:** **OAK-T5.004** (Sandwich MEV Extraction — primary per the sources: Helius documents ordinary sandwiching of swaps in pump.fun-created tokens, most victim swaps routed through Raydium). **T9.012** (Initial Liquidity Sandwich Attack) was removed 2026-10-11: no source documents sandwiching of the Raydium liquidity-addition at bonding-curve graduation.
**Attribution:** **pseudonymous** — sandwich-bot addresses are on-chain attributable; operators are not identified.

**Corrected 2026-10-11:** Replaced the unsupported "front-run Raydium addLiquidity at graduation" mechanism and "tens of millions" cohort estimate with the Helius-documented pattern (sandwiching of swaps in pump.fun tokens; 16 of the top 20 sandwiched tokens were pump.fun launches; Vpe ~\$13.43M over Dec 2024–Jan 2025); removed the "transparent mempool" claim, since Jito suspended its public mempool in March 2024.

**Key teaching point:** **Illiquid, volatile launch tokens with large default slippage are the preferred sandwich victims.** Helius found that 16 of the 20 most-sandwiched tokens were pump.fun creations, with victims' swaps mostly going through Raydium. Solana's lack of a public mempool after Jito's March 2024 closure did not end sandwiching; searchers moved to other transaction-observation and bundle routes, so users should limit slippage and use protected-transaction routes rather than assuming the chain is sandwich-proof.

## Summary

Pump.fun is a Solana launch platform where tokens trade on a bonding curve and graduate to Raydium. Helius's January 2025 MEV report found sandwiching to be a major MEV strategy on Solana, with pump.fun tokens heavily over-represented among victims: of the top 20 sandwiched tokens, 16 were created on pump.fun, and most victim swaps went through Raydium. Victim tokens were illiquid and highly volatile, which makes sandwiches profitable even at small per-trade sizes (a single example sandwich netted ~0.017 SOL, about \$3).

The earlier version of this file described a different mechanism, bots front-running the Raydium `addLiquidity` transaction at graduation and dumping afterwards, and stated that Solana had a transparent mempool. Neither is supported by the sources reviewed. Jito suspended its public mempool in March 2024, and Helius documents ordinary swap sandwiching rather than liquidity-addition sandwiching.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-03 | Jito suspends its public mempool feature (Helius) | (context) |
| 2024-12-07 to 2025-01-05 | Vpe sandwich program: ~1.55M sandwiches, ~65,880 SOL (~\$13.43M) profit (Helius) | **T5.004** |
| 2025-01 | Helius reports 16 of the top-20 sandwiched tokens were pump.fun launches | T5.004 |

## Realised extraction

~\$13.43M by one sandwich program over about a month across all tokens (Helius); the pump.fun-specific share is not isolated. Individual sandwiches are typically a few dollars.

## OAK technique classification rationale

T5.004 is the primary fit because the documented pattern is front-run and back-run of victim swaps. T9.012 requires sandwiching the pool-creating liquidity-addition transaction, which the sources do not show for pump.fun graduations.

## Public references

- `[heliussolmev2025]` — Helius, "Solana MEV Report: Trends, Insights, and Challenges" (2025-01): <https://www.helius.dev/blog/solana-mev-report> (sandwiching on Solana; 16 of top-20 sandwiched tokens were pump.fun launches; Vpe figures; Jito mempool suspension March 2024)
