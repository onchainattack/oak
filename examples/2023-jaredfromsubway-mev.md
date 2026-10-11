# Jaredfromsubway MEV sandwich bot — Ethereum — 2023

**Loss:** **Aggregate extraction across many individual sandwiches.** EigenPhi's May 2023 appraisal of the jaredfromsubway.eth bot reports about \$40.65M of revenue from front- and back-run victims, about \$6.3M of profit after roughly \$34.35M in gas fees (as of 2023-05-08), from about 254K transactions since launch `[eigenphi2023]`. Per-trade extraction sizes are not given in the cited source.
**OAK Techniques observed:** **OAK-T5.004** (Sandwich MEV Extraction) — canonical anchor. jaredfromsubway.eth is the most publicly visible and extensively studied MEV sandwich bot on Ethereum, representing the operational T5.004 pattern at the largest scale of any individually-tracked MEV searcher. **OAK-T9.013** (Slippage-Manipulation Sandwich Attack) — co-occurring. High-slippage swap transactions targeted by the bot also triggered the T9.013 slippage-band extraction surface.
**Attribution:** **pseudonymous** — the bot's Ethereum address (jaredfromsubway.eth) is publicly known and its activity is tracked by EigenPhi. The human operator behind the address is not publicly identified.

**Corrected 2026-10-11:** the bot launched in February 2023 (not December 2022); the \$34.35M figure is EigenPhi's gas spend, not profit; unsupported Flashbots-usage, activity-tempo and 2024-moderation claims removed.

**Key teaching point:** jaredfromsubway.eth is the canonical T5.004 anchor because it demonstrates the industrial-scale, automated nature of MEV sandwich extraction: a single bot address executing hundreds of thousands of transactions within months of launch (EigenPhi counts ~254K by 2023-05-08 `[eigenphi2023]`), operating as a profit-maximizing agent that treats every mempool-observable swap as a candidate for sandwich extraction. The bot's scale makes it the natural baseline for calibrating sandwich detection parameters.

## Summary

jaredfromsubway.eth is the Ethereum address of a MEV searcher bot that specialized in sandwich attacks against Uniswap V2/V3 traders. During 2023, it was the most active and profitable MEV sandwich bot on Ethereum mainnet per EigenPhi's May 2023 appraisal of the bot `[eigenphi2023]`.

The bot operated the canonical T5.004 pattern at scale: (1) observe a pending swap transaction in the public mempool; (2) front-run with a buy transaction that moves the pool price in the attacker's favour; (3) the victim's swap executes at the moved price; (4) back-run with a sell transaction that unwinds the position at the post-victim-swap price, capturing the spread.

The bot's operational characteristics — very high transaction frequency and heavy gas spend (about \$34.35M in gas through 2023-05-08 per EigenPhi `[eigenphi2023]`) — made it the most visible MEV searcher in the Ethereum ecosystem and the reference case for academic and industry MEV research.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-02 | Bot contract deployed (EigenPhi gives 2023-02-21 as creation date and 2023-02-27 as launch date) `[eigenphi2023]` | T5.004 (emergence) |
| 2023-05-10 | EigenPhi publishes "Performance Appraisal of Jaredfromsubway.eth": ~\$40.65M revenue, ~\$6.3M profit as of 2023-05-08 `[eigenphi2023]` | (public analysis) |

## Public references

- `[eigenphi2023]` — EigenPhi, "Performance Appraisal of Jaredfromsubway.eth" (2023-05-10): <https://eigenphi.substack.com/p/performance-appraisal-of-jaredfromsubway-eth?open=false>
- `[unchained2023]` — Unchained, "MEV sandwich attacks made 1 million in single day profit" (2023-04-20): <https://unchainedcrypto.com/mev-sandwich-attacks-made-1-million-in-single-day-profit/>
