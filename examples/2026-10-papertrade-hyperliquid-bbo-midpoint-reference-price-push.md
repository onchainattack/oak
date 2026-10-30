# Papertrade — a 1,000x exchange priced every trade off Hyperliquid's bid/ask midpoint, so a trader moved that midpoint by a few dollars — Papertrade / HyperEVM (Hyperliquid) — 2026-10-10

**Loss:** **~\$1.28M** profit to one wallet ([`0x2025137a136bea7446deba681cbfc7cf1970840e`](https://hyperdash.com/address/0x2025137a136bea7446deba681cbfc7cf1970840e)) on ~\$3.18B Papertrade volume on launch day, per The Block's review of trading data; the wallet withdrew ~\$2.48M against ~\$1.2M deposited. Papertrade's pool fell from ~\$5M to ~\$2.4M before recovering. A later 30-short position was liquidated for a ~\$450K loss. Papertrade says the trader returned most gains through new accounts; **unverified**.

**OAK Techniques observed:** **OAK-T17.001** (Cross-Venue Arbitrage-Driven Price-Discovery Distortion — *primary*. Papertrade prices every trade at the **midpoint of Hyperliquid's best bid and offer**. The wallet held large leveraged Papertrade positions while buying ~6,060 ETH on Hyperliquid (lifting ETH ~\$3, 0.12%), selling ~5,210 ETH (dropping it ~\$3.50), and later selling ~6,590 ETH into 660x shorts. At up to 1,000x, a 0.1% move on the reference venue is a full-margin payout on the derived one. See [`techniques/T17.001-cross-venue-arbitrage-price-distortion.md`](../techniques/T17.001-cross-venue-arbitrage-price-distortion.md)). No key, contract or authorisation was bypassed.

**Attribution:** **pseudonymous.** First flagged by X users Boblob and butler.

**Key teaching point:** **Leverage divides the cost of moving your price feed.** About \$52K of Hyperliquid fees bought ~\$1.28M because the venue's price was a single book's top-of-book and its open-interest caps let one account hold positions far larger than the depth behind that price. Papertrade calls it loose launch caps, not a design flaw; either way, the cap is what bounded the loss, and it was set for demand rather than for the cost of manipulation.

## Summary

Papertrade, a HyperEVM perpetuals exchange offering up to 1,000x, launched at 10:00 ET on 2026-10-10. Within hours one wallet alternated large Hyperliquid ETH trades with offsetting Papertrade positions and closed them at the moved midpoint. Papertrade said the attempts were "not an oversight in the mechanism design," attributed them to loose open-interest caps and tightened caps on-chain and at the relayer.

## Timeline (UTC)

Read it as three stages. **Flaw**: Papertrade prices each trade off Hyperliquid's best bid/offer midpoint. **Take**: one wallet pushes that midpoint with Hyperliquid ETH trades while holding leveraged Papertrade positions, again and again. **After**: the wallet's final close fails, and Papertrade tightens caps. Times are from butler's on-chain breakdown, which does not state a time zone; they are consistent with UTC. The Block's article could not be fetched (blocked), so figures follow butler and Papertrade, and The Block's slightly different ETH sizes are in the Loss line.

| When | What happened | OAK |
|---|---|---|
| 2026-10-10 14:00 (10:00 ET) | Papertrade, a HyperEVM exchange offering up to 1,000x, launches. Every trade is priced at the midpoint of Hyperliquid's best bid and offer. Open-interest caps are permissive during launch congestion, in Papertrade's own words. | **T17.001** (flaw) |
| Before 22:01 (undisclosed) | The wallet [`0x2025137a136bea7446deba681cbfc7cf1970840e`](https://hyperdash.com/address/0x2025137a136bea7446deba681cbfc7cf1970840e) prepares. It has more than $13M all-time PnL and $14B volume on Hyperliquid (butler). Funding and account setup are not published. | — |
| 22:01 | Opens $200M of longs on Papertrade, then buys 6,055 ETH on Hyperliquid, lifting the price about $3. | **T17.001** |
| 22:03 | Closes the longs for +$168K, opens $160M of shorts, and sells 5,260 ETH on Hyperliquid, dropping the price about $3. | **T17.001** |
| 22:04 → | Closes the shorts for +$97K, flips long again, and repeats. 296 of 305 trades win, typical hold 98 seconds, total PnL $1.73M. | **T17.001** |
| 23:13 | Opens 30 shorts ($297M at 2507.35) and sells about 6,600 ETH on Hyperliquid, pushing it to 2504.4. This time the close does not go through. | **T17.001** |
| 2026-10-11 02:31 | ETH reaches 2509.95 and all 30 shorts are liquidated for -$450K, leaving about $1.28M profit. butler guesses the team blocked the closes; that is not confirmed. | — |
| 2026-10-11 (hours later) | Funds: Papertrade says the trader later donated most of the profit back through new accounts, and that some users reversed manipulated trades for points. Unverified. | — |
| 2026-10-11 15:42 | Papertrade posts that the attempts were "not an oversight in the mechanism design", were possible only because of permissive caps, and that it has begun tightening open-interest caps on-chain and at the relayer. | response |

Key addresses:

- Trader wallet (Papertrade and Hyperliquid) — [`0x2025137a136bea7446deba681cbfc7cf1970840e`](https://hyperdash.com/address/0x2025137a136bea7446deba681cbfc7cf1970840e)

## Root-cause evidence

- **Technique:** OAK-T17.001
- **Source:** <https://www.theblock.co/news/defi/2026-10-11-trader-nets-1-28-million-on-new-1000x-exchange-papertrade-by-moving-hyperliquids-eth-prices-418239>; <https://x.com/papertrade_xyz/status/2109308773231911359>
- **Source type:** news
- **Confidence:** corroborated
- **Evidence:** The Block, from Hyperliquid trading data and Papertrade account records, shows the wallet's Hyperliquid ETH trades moving the BBO midpoint Papertrade prices from while holding leveraged Papertrade positions; Papertrade acknowledges the activity and attributes it to its OI caps.

## Public references

- `[theblockpapertrade2026]` — The Block, "Trader nets \$1.28 million on new 1,000x exchange Papertrade by moving Hyperliquid's ETH prices" (2026-10-11): <https://www.theblock.co/news/defi/2026-10-11-trader-nets-1-28-million-on-new-1000x-exchange-papertrade-by-moving-hyperliquids-eth-prices-418239>
- `[papertradestatement2026]` — Papertrade on X, statement: <https://x.com/papertrade_xyz/status/2109308773231911359>
- `[butlerpapertrade2026]` — butler on X, trade breakdown: <https://x.com/btlrtrades/status/2109129513078567221>
