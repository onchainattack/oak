> **QUARANTINED 2026-11-27 — not part of the OAK corpus.** The 2026-11 source pass rewrote this file from the pages it could open and found no attack to record: no opened page documents stolen funds laundered through yield protocols; the Chainalysis page it rests on does not mention lending or yield protocols. It is kept here, outside `examples/`, and can return if a source documents an incident.

# Illicit flows after the Tornado Cash sanctions: mixers fall, bridges rise (Chainalysis 2023 figures) — multi-chain — 2023

**Loss:** none attributable. This file is aggregate laundering context, not a loss event. An earlier version said illicit actors moved from mixers to DeFi yield protocols and quoted multi-billion-dollar volumes and a THORChain fee figure. The opened source does not say any of that, so those claims are removed.

**OAK Techniques observed:** none — the opened source reports aggregate illicit inflows to services and describes no yield-strategy mechanism, so no laundering Technique page is matched.

**Attribution:** **unattributed** (aggregate figures from a blockchain-analytics firm; the Lazarus Group is named only for its mixer use).

**Key teaching point:** **Do not treat a yield-protocol deposit as a laundering signal on the strength of this source.** The [Chainalysis report](https://www.chainalysis.com/blog/2024-crypto-money-laundering/) credits the growth of illicit funds sent to DeFi mainly to DeFi's overall growth and says DeFi's transparency makes it "a poor choice for obfuscating the movement of funds". What it does show is a fall in mixer inflows and a rise in bridge inflows.

## Summary

The [Chainalysis report](https://www.chainalysis.com/blog/2024-crypto-money-laundering/) (title: "Money Laundering Activity Spread Across More Service Deposit Addresses in 2023, Plus New Tactics from Lazarus Group") gives these figures:

- Illicit addresses sent \$22.2 billion to services in 2023, down from \$31.5 billion in 2022.
- Illicit inflows to mixers fell from \$1.0 billion in 2022 to \$504.3 million in 2023. Sinbad, a preferred mixer of North Korea-affiliated hackers in 2022, was sanctioned and shut down in November 2023. YoMix, a Bitcoin-based mixer, replaced it, and its inflows grew more than five-fold during 2023.
- Bridge protocols received \$743.8 million from illicit addresses in 2023, up from \$312.2 million in 2022. North Korea-affiliated hackers are among the heaviest bridge users.
- The share of illicit funds going to DeFi protocols grew, attributed mainly to DeFi's overall growth. The page gives no dollar figure for DeFi. It says DeFi protocols generally cannot freeze funds because they run autonomously and do not take custody.
- The page does not mention lending or yield protocols, and does not say stolen funds were parked in them to launder them.

The page gives no 2023 figure for Tornado Cash and does not mention the August 2022 sanctions.

Two other opened pages touch lending protocols, neither as yield laundering. [AMBCrypto](https://ambcrypto.com/how-did-binance-hacker-leverage-aave-to-outsmart-tether-circle-freeze/) reports that after the Binance theft the attacker deposited about \$60M USDT on Aave and borrowed 19,760 WETH to hold an asset that stablecoin issuers could not freeze (an analyst-sourced claim; the incident is in [`examples/2026-10-binance-devops-laptop-service-container-hot-wallet-drain.md`](2026-10-binance-devops-laptop-service-container-hot-wallet-drain.md)). [Cointelegraph](https://cointelegraph.com/news/kelp-dao-recovery-hacker-launders-most-funds-293m-exploit) says the Kelp DAO proceeds were laundered through Wasabi and then Tornado Cash and does not say a lending or yield protocol was used to launder them (see [`examples/2026-04-kelpdai-rseth-bridge-layerzero-compromise.md`](2026-04-kelpdai-rseth-bridge-layerzero-compromise.md)).

Sibling files on the same pattern: [`examples/2024-01-defi-bluechip-yield-laundering.md`](2024-01-defi-bluechip-yield-laundering.md) (the same subject with the same source), [`examples/2023-2025-defi-yield-strategy-laundering-cohort.md`](2023-2025-defi-yield-strategy-laundering-cohort.md), and the Bybit laundering file [`examples/2025-02-bybit-thorchain-laundering.md`](2025-02-bybit-thorchain-laundering.md).

## Timeline (UTC)

| When | What happened | OAK |
|---|---|---|
| 2022 | Illicit mixer inflows total \$1.0 billion; bridge inflows \$312.2 million ([Chainalysis](https://www.chainalysis.com/blog/2024-crypto-money-laundering/)) | — |
| 2023 | Illicit mixer inflows fall to \$504.3 million; bridge inflows rise to \$743.8 million (same report) | — |
| 2023-11 | Sinbad mixer sanctioned and shut down; YoMix takes its place (same report) | response |
| 2023 (undisclosed) | Any individual yield-protocol laundering flow: entry, preparation, execution and fund movement undisclosed | — |

## Root-cause evidence

- **Technique:** none
- **Source:** <https://www.chainalysis.com/blog/2024-crypto-money-laundering/>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** One analytics firm's aggregate figures by venue type. They do not establish a yield-strategy mechanism.

## Public references

- Chainalysis, "Money Laundering Activity Spread Across More Service Deposit Addresses in 2023, Plus New Tactics from Lazarus Group": <https://www.chainalysis.com/blog/2024-crypto-money-laundering/>
- AMBCrypto, on the Aave deposit and borrow after the Binance theft: <https://ambcrypto.com/how-did-binance-hacker-leverage-aave-to-outsmart-tether-circle-freeze/>
- Cointelegraph, on the Kelp DAO laundering path: <https://cointelegraph.com/news/kelp-dao-recovery-hacker-launders-most-funds-293m-exploit>
