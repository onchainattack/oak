# Jaredfromsubway MEV sandwich bot — Ethereum — 2023

**Loss:** **Aggregate extraction across thousands of individual sandwiches.** The jaredfromsubway.eth MEV bot extracted an estimated mid-eight-figure USD-equivalent in cumulative sandwich profits from Uniswap V2/V3 traders during its peak operational period (2023). Individual sandwich extractions ranged from tens to thousands of USD-equivalent per trade.
**OAK Techniques observed:** **OAK-T5.004** (Sandwich MEV Extraction) — canonical anchor. jaredfromsubway.eth is the most publicly visible and extensively studied MEV sandwich bot on Ethereum, representing the operational T5.004 pattern at the largest scale of any individually-tracked MEV searcher. **OAK-T9.013** (Slippage-Manipulation Sandwich Attack) — co-occurring. High-slippage swap transactions targeted by the bot also triggered the T9.013 slippage-band extraction surface.
**Attribution:** **pseudonymous** — the bot's Ethereum address (jaredfromsubway.eth) is publicly known and its sandwich bundles are identifiable in EigenPhi and Flashbots relay data. The human operator behind the address is not publicly identified.

**Key teaching point:** jaredfromsubway.eth is the canonical T5.004 anchor because it demonstrates the industrial-scale, automated nature of MEV sandwich extraction: a single bot address executing thousands of sandwich bundles per week, operating as a profit-maximizing agent that treats every mempool-observable swap as a candidate for sandwich extraction. The bot's scale makes it the natural baseline for calibrating sandwich detection parameters.

## Summary

jaredfromsubway.eth is the Ethereum address of a MEV searcher bot that specialized in sandwich attacks against Uniswap V2/V3 traders. During 2023, it was the most active and profitable MEV sandwich bot on Ethereum mainnet by transaction count and cumulative extracted value, according to EigenPhi bundle-level data.

The bot operated the canonical T5.004 pattern at scale: (1) observe a pending swap transaction in the public mempool; (2) front-run with a buy transaction that moves the pool price in the attacker's favour; (3) the victim's swap executes at the moved price; (4) back-run with a sell transaction that unwinds the position at the post-victim-swap price, capturing the spread.

The bot's operational characteristics — high transaction frequency (hundreds per day at peak), broad token-pair coverage (most Uniswap V2/V3 pairs above a minimum liquidity threshold), and aggressive gas bidding to secure bundle inclusion — made it the most visible MEV searcher in the Ethereum ecosystem and the reference case for academic and industry MEV research.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-12 | jaredfromsubway.eth address first observed executing sandwich bundles on Uniswap V2/V3 | T5.004 (emergence) |
| 2023-01/06 | Peak operational period; hundreds of sandwich bundles per day; EigenPhi data records cumulative extraction | T5.004 (scaled) |
| 2023-04 | MEV researchers publish detailed analysis of jaredfromsubway's sandwich strategy and cumulative extraction; the bot becomes the reference case for sandwich MEV in academic and industry literature | (public analysis) |
| 2023-06/12 | Operational tempo continues; bot adapts to competitor MEV searchers entering the sandwich market | T5.004 (competitive) |
| 2024 | Activity level moderates as MEV competition increases and private transaction relay adoption reduces the sandwichable swap pool | (maturation) |

## Public references

- EigenPhi: bundle-level MEV data including jaredfromsubway.eth sandwich bundles, extraction amounts, and per-pair activity.
- Flashbots MEV-Boost relay data: jaredfromsubway was an active user of MEV-Boost bundles for atomic sandwich execution.
- MEV research literature: multiple academic and industry papers use jaredfromsubway.eth as the primary data source for sandwich MEV characterization (2023–2024 vintage).
- Cross-reference: `examples/2020-2025-mev-sandwich-attack-cohort.md` (combined T5.004/T9.013 cohort).
