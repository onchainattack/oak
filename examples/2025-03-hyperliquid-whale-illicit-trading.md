# Hyperliquid whale — about \$20M from high-leverage perp trades, trader's identity alleged by ZachXBT — 2025-03

**Loss:** No theft is established. [Cointelegraph](https://cointelegraph.com/news/zachxb-unmasked-mysterious-50x-hyperliquid-whale) reports the trader made about \$20M from highly leveraged trades on Hyperliquid and GMX. On 12 March, per the same article, an intentional liquidation of an ETH long of about \$200M cost Hyperliquid's liquidity pool about \$4M while the trader earned about \$1.8M. Hyperliquid said it was not an exploit but a predictable result of how the platform works under extreme conditions.

**OAK Techniques observed:** none — the opened pages describe profitable high-leverage trading and one deliberate liquidation that the venue called a predictable outcome of its design. They show no spoofing, oracle manipulation or other manipulation primitive. The ZachXBT claim that the wallet also received phishing proceeds concerns the wallet's history, not the trading.

**Attribution:** **inferred-weak.** ZachXBT said an individual was behind the wallet, based on a phone number given by a person who allegedly received a payment from the wallet ([Cointelegraph](https://cointelegraph.com/news/zachxb-unmasked-mysterious-50x-hyperliquid-whale)). Cointelegraph did not verify it, and neither opened article reports a response from the person. The name is not repeated here because no opened page shows the person charged or convicted for this activity.

**Key teaching point:** **A perp venue that lets one account take an outsized position can have its liquidity vault absorb the loss when that position is liquidated.** After the 12 March event Hyperliquid changed its collateral rules for open positions and, per [CoinGape](https://coingape.com/zachxbt-reveals-identity-of-hyperliquid-whale-behind-20m-profit/), lowered maximum leverage to 40x for BTC and 25x for ETH. Whether trading is "illicit" here rests on the wallet's alleged link to phishing proceeds, not on a shown manipulation.

## Summary

On 2025-03-20 ZachXBT [posted](https://x.com/zachxbt/status/1902713021937426495) an investigation into the alleged identity of a Hyperliquid whale "tied to illicit activity that profited ~\$20M via highly leveraged positions over the past couple weeks". [Cointelegraph](https://cointelegraph.com/news/zachxb-unmasked-mysterious-50x-hyperliquid-whale) and [CoinGape](https://coingape.com/zachxbt-reveals-identity-of-hyperliquid-whale-behind-20m-profit/) relay the claims: trades up to 50x on Hyperliquid and GMX, public wallets linked to the whale having received proceeds of past on-chain phishing, and the identity link by phone number. CoinGape also reports counterparties linked to Roobet and Binance and withdrawals from Solana casinos, and puts the trading activity between January and March 2025. These are secondhand reports of an investigator's claims.

Cointelegraph reports that on 14 March the whale opened a multimillion-dollar LINK long. The earlier version of this file said positions were 3-5x the platform average, accounts were funded from one source, profits went to cold storage, and a specific address was suspected. No opened page carries those statements, so they are removed.

## Timeline (UTC)

Times are as the two articles give them; hours are undisclosed.

| When | What happened | OAK |
|---|---|---|
| 2025-01 to 2025-03 | Wallet trades with high leverage on Hyperliquid and GMX, per [CoinGape](https://coingape.com/zachxbt-reveals-identity-of-hyperliquid-whale-behind-20m-profit/) | — |
| 2025-03-12 | Intentional liquidation of an ETH long of about \$200M; Hyperliquid's liquidity pool loses about \$4M, the trader gains about \$1.8M, per [Cointelegraph](https://cointelegraph.com/news/zachxb-unmasked-mysterious-50x-hyperliquid-whale) | — |
| 2025-03-14 | Multimillion-dollar LINK long opened, per Cointelegraph | — |
| 2025-03-20 | ZachXBT [posts](https://x.com/zachxbt/status/1902713021937426495) the investigation | response |
| After 2025-03-12 (date undisclosed) | Hyperliquid revises collateral rules for open positions (Cointelegraph) and lowers max leverage to 40x BTC / 25x ETH ([CoinGape](https://coingape.com/zachxbt-reveals-identity-of-hyperliquid-whale-behind-20m-profit/)) | response |

Key addresses:

- Whale wallet: CoinGape prints only "0xe4d3" (full address not published on the opened pages). The address in the earlier version of this file is on no opened page and is removed.

## Root-cause evidence

- **Technique:** none
- **Source:** <https://cointelegraph.com/news/zachxb-unmasked-mysterious-50x-hyperliquid-whale>; <https://coingape.com/zachxbt-reveals-identity-of-hyperliquid-whale-behind-20m-profit/>; <https://x.com/zachxbt/status/1902713021937426495>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** Two news articles agree on the \$20M figure and the 12 March liquidation and cite Hyperliquid's statement that it was not an exploit. The identity and phishing-proceeds claims are ZachXBT's and unverified. The rest of ZachXBT's thread (only the first post was opened) was not read.

## Public references

- [ZachXBT, X post](https://x.com/zachxbt/status/1902713021937426495) (2025-03-20).
- [Cointelegraph, "Crypto sleuth ZachXBT says he unmasked 50x Hyperliquid whale"](https://cointelegraph.com/news/zachxb-unmasked-mysterious-50x-hyperliquid-whale) (2025-03-20).
- [CoinGape, "ZachXBT Reveals Identity of Hyperliquid Whale Behind \$20M Profit"](https://coingape.com/zachxbt-reveals-identity-of-hyperliquid-whale-behind-20m-profit/) (2025-03-20).
