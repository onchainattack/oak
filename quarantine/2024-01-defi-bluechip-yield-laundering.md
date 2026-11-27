> **QUARANTINED 2026-11-27 — not part of the OAK corpus.** The 2026-11 source pass rewrote this file from the pages it could open and found no attack to record: no opened page documents the deposit-hold-withdraw laundering pattern it described or names the protocols it listed. It is kept here, outside `examples/`, and can return if a source documents an incident.

# Blue-chip DeFi yield-protocol laundering claim — no incident found on opened pages — 2024

**Loss:** none attributable. An earlier version of this file described tens of millions of dollars laundered through Aave, Compound, Lido and Maker/Spark and cited attributions by Chainalysis and TRM Labs. No opened page says this, so those claims are removed.

**OAK Techniques observed:** none — no opened page describes stolen funds deposited into a lending, staking or yield protocol in order to launder them, so no laundering Technique page is matched.

**Attribution:** **unattributed** (no actor, wallet or protocol is named by any opened page for this pattern).

**Key teaching point:** **A pattern named in OAK is not an incident.** The one source this file leaned on, the [Chainalysis report](https://www.chainalysis.com/blog/2024-crypto-money-laundering/), says DeFi's transparency makes it "a poor choice for obfuscating the movement of funds" and reports mixer inflows falling and bridge inflows rising. A defender should not rely on a deposit-duration or yield-claim heuristic for laundering detection until a sourced case shows it.

## Summary

This file is the same subject as [`examples/2024-01-post-tornado-defi-yield-laundering.md`](2024-01-post-tornado-defi-yield-laundering.md): a claim that illicit actors moved laundering from mixers to DeFi yield protocols, with the same single general source. It adds a named list of protocols and a four-step deposit, hold, withdraw, off-ramp pattern; no opened page carries either.

What the opened pages say:

- [Chainalysis](https://www.chainalysis.com/blog/2024-crypto-money-laundering/): illicit mixer inflows fell from \$1.0 billion (2022) to \$504.3 million (2023); bridge inflows rose from \$312.2 million to \$743.8 million; the share of illicit funds going to DeFi grew, mainly because DeFi grew. The page does not mention lending or yield protocols and does not say stolen funds were parked in them.
- [AMBCrypto](https://ambcrypto.com/how-did-binance-hacker-leverage-aave-to-outsmart-tether-circle-freeze/): the attacker in the Binance theft deposited about \$60M USDT on Aave and borrowed 19,760 WETH, per an analyst post; the article describes this as avoiding freezes and does not call it laundering ([`examples/2026-10-binance-devops-laptop-service-container-hot-wallet-drain.md`](2026-10-binance-devops-laptop-service-container-hot-wallet-drain.md)). It also says Kelp DAO's attacker used a similar lending route to cash out, and that Aave was left with over \$120M in bad debt; this is the article's claim, not checked against a primary source.
- [DL News](https://www.dlnews.com/articles/defi/bungled-aave-trade-highly-unlikely-to-be-money-laundering-experts-say/): a \$50 million USDT to AAVE swap on 12 March was a user error and experts judged it unlikely to be laundering. It cites no case of stolen funds in lending or yield protocols.
- [Cointelegraph](https://cointelegraph.com/news/kelp-dao-recovery-hacker-launders-most-funds-293m-exploit): Kelp DAO proceeds were laundered via Wasabi and then Tornado Cash, per an on-chain analyst; no lending or yield protocol is named for laundering.

The closest real behaviour in these pages is collateral borrowing to turn frozen-risk assets into unfreezable ETH, which is cash-out, not yield-user cover.

## Timeline (UTC)

| When | What happened | OAK |
|---|---|---|
| 2023 | Mixer inflows fall and bridge inflows rise, per [Chainalysis](https://www.chainalysis.com/blog/2024-crypto-money-laundering/) | — |
| 2024 (undisclosed) | Any deposit into Aave, Compound, Lido or Maker/Spark as laundering: no opened page records one | — |
| 2024 (undisclosed) | Fund movement and response for such a flow: undisclosed | — |

## Root-cause evidence

- **Technique:** none
- **Source:** <https://www.chainalysis.com/blog/2024-crypto-money-laundering/>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** Aggregate venue-type figures only. No opened page documents a yield-protocol laundering mechanism or a case.

## Public references

- Chainalysis: <https://www.chainalysis.com/blog/2024-crypto-money-laundering/>
- AMBCrypto: <https://ambcrypto.com/how-did-binance-hacker-leverage-aave-to-outsmart-tether-circle-freeze/>
- DL News: <https://www.dlnews.com/articles/defi/bungled-aave-trade-highly-unlikely-to-be-money-laundering-experts-say/>
- Cointelegraph: <https://cointelegraph.com/news/kelp-dao-recovery-hacker-launders-most-funds-293m-exploit>
- Sibling: [`examples/2023-2025-defi-yield-strategy-laundering-cohort.md`](2023-2025-defi-yield-strategy-laundering-cohort.md)
