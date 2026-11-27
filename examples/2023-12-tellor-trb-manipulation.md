# Tellor (TRB) — thin-float token spikes on spot and perpetuals, TRB-denominated open-interest cap costs Synthetix stakers — Ethereum / CEX / Synthetix — 2023-12-31

**Loss:** more than **\$68 million** in liquidations on TRB derivatives, per CoinGlass data as reported by [Cointelegraph](https://cointelegraph.com/news/tellor-altcoin-pumps-dumps-causes-speculation-over-cause); [AMBCrypto](https://ambcrypto.com/ethereum-hosted-tellor-pumps-and-dumps-73-mln-liquidated/) carries a different figure (about \$73 million) in its headline. Synthetix stakers realized roughly **\$2 million** in losses, per Synthetix founder Kain Warwick as reported by [Cointelegraph](https://cointelegraph.com/news/tellor-altcoin-pumps-dumps-causes-speculation-over-cause).

**OAK Techniques observed:** none — [Cointelegraph](https://cointelegraph.com/news/tellor-altcoin-pumps-dumps-causes-speculation-over-cause) reports manipulation concerns raised by analytics firms and commentators and does not confirm manipulation, and no opened page names who traded or how. The Synthetix loss is described by its founder as a failure of automated risk parameters (an open-interest cap set in TRB units), not an exploit of a contract flaw.

**Attribution:** **unattributed** — Spot On Chain described 20 whale wallets holding TRB and depositing to exchanges ([Cointelegraph](https://cointelegraph.com/news/tellor-altcoin-pumps-dumps-causes-speculation-over-cause)); no opened page links those wallets to the price move. Lookonchain reported a Tellor-team transfer to Coinbase; Tellor did not respond to Cointelegraph's request for comment and no page shows what the transfer meant.

**Key teaching point:** **A perpetuals venue should size an open-interest cap in USD (or re-evaluate it as the price moves), not in units of a low-float token.** Warwick said TRB's cap on Synthetix was \$250,000 and grew to \$12.5 million as the price rose because it was set in TRB units ([Cointelegraph](https://cointelegraph.com/news/tellor-altcoin-pumps-dumps-causes-speculation-over-cause)).

## Summary

TRB, the token of the Tellor oracle network, rose nearly 150% on 2023-12-31 to a new all-time high of \$619 and fell to \$136 within about 13 hours, per [Cointelegraph](https://cointelegraph.com/news/tellor-altcoin-pumps-dumps-causes-speculation-over-cause). The price drop caused more than \$68 million in liquidations per CoinGlass, and Lookonchain called TRB the most liquidated token (same source). Spot On Chain had posted on 2023-12-29 that about 2.5M TRB was in circulation, 1.7M of it on exchanges and 660K held by 20 whale wallets, which began buying near \$15 and had been gradually depositing to centralized exchanges; the same post also said the whales hold "~95%", which Cointelegraph notes conflicts with the 26% figure it cites and does not explain ([Cointelegraph](https://cointelegraph.com/news/tellor-altcoin-pumps-dumps-causes-speculation-over-cause)).

Synthetix stakers lost roughly \$2 million. Warwick attributed this to a failure in automated risk parameters: TRB's open-interest cap was \$250,000 and grew to \$12.5 million as the price rose because it was set in TRB units rather than a fixed USD amount, and he said the Spartan Council is responsible for parameters ([Cointelegraph](https://cointelegraph.com/news/tellor-altcoin-pumps-dumps-causes-speculation-over-cause)). Hyperliquid was also reportedly affected (same source).

The source does not confirm manipulation. Etherscan data showed the Tellor team transferring 4,211 TRB (about \$2.4 million at the time) to a Coinbase wallet at around 8:41 pm UTC as the price spiked, reported by Lookonchain; the article draws no conclusion from it ([Cointelegraph](https://cointelegraph.com/news/tellor-altcoin-pumps-dumps-causes-speculation-over-cause)).

## Timeline (UTC)

Stages: **Setup** (whale holdings, OI cap), **Spike**, **Crash and liquidations**, **Response**. Times come from the cited article; the address of the team transfer is not printed there, so it is undisclosed here.

| When | What happened | OAK |
|---|---|---|
| Before 2023-12-29 | About 20 whale wallets, buying from near \$15, hold 660K of about 2.5M circulating TRB and deposit gradually to centralized exchanges, per Spot On Chain ([Cointelegraph](https://cointelegraph.com/news/tellor-altcoin-pumps-dumps-causes-speculation-over-cause)) | — |
| Before 2023-12-31 (undisclosed) | Synthetix TRB open-interest cap of \$250,000, set in TRB units, is not adjusted as the price rises ([Cointelegraph](https://cointelegraph.com/news/tellor-altcoin-pumps-dumps-causes-speculation-over-cause)) | — |
| 2023-12-31 | TRB rises nearly 150% to an all-time high of \$619 ([Cointelegraph](https://cointelegraph.com/news/tellor-altcoin-pumps-dumps-causes-speculation-over-cause)); the cap has grown to \$12.5 million (same source) | — |
| 2023-12-31 ~20:41 | Tellor team transfers 4,211 TRB (about \$2.4 million) to a Coinbase wallet; reported by Lookonchain ([Cointelegraph](https://cointelegraph.com/news/tellor-altcoin-pumps-dumps-causes-speculation-over-cause)) | — |
| Within about 13 hours of the high | TRB falls to \$136; more than \$68 million liquidated per CoinGlass ([Cointelegraph](https://cointelegraph.com/news/tellor-altcoin-pumps-dumps-causes-speculation-over-cause)) | — |
| 2024-01-01 | Warwick states Synthetix stakers realized roughly \$2 million in losses and ties them to the TRB-unit cap ([Cointelegraph](https://cointelegraph.com/news/tellor-altcoin-pumps-dumps-causes-speculation-over-cause)) | response |

Key addresses: undisclosed — no opened page prints a whale-wallet or Tellor-team address in full.

## Root-cause evidence

- **Technique:** none — mechanism of the price move not established
- **Source:** <https://cointelegraph.com/news/tellor-altcoin-pumps-dumps-causes-speculation-over-cause>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** The article relays the Synthetix founder's account that the loss came from an open-interest cap set in TRB units and the analytics firms' whale-concentration claims, and states that manipulation is not confirmed. Who drove the price, and whether the Tellor-team transfer was related, is undisclosed. Cryptonews ([page](https://cryptonews.com/news/tellors-13-hour-meteoric-rise-and-fall-raises-manipulation-suspicions/)) returned 403 and was not read.

## Public references

- Cointelegraph, "Tellor altcoin's bizarre 150% pump then fall sparks concerns of manipulation" (2024-01-02): <https://cointelegraph.com/news/tellor-altcoin-pumps-dumps-causes-speculation-over-cause>
