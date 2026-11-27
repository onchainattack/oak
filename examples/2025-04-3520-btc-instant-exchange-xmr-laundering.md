# 3520 BTC theft from an individual — social-engineering theft, then instant exchanges to Monero — Bitcoin / Monero — 2025-04-28

**Loss:** **3520 BTC (~\$330.7M)**, per [ZachXBT's alert](https://x.com/zachxbt/status/1916756932763046273). [The Block](https://www.theblock.co/post/352572/zachxbt-says-330-million-bitcoin-theft-victim-is-an-elderly-person-in-us) gives roughly \$330 million; [Decrypt](https://decrypt.co/316640/monero-jumps-51-after-suspicious-transfer-of-333m-in-bitcoin) headlines about \$333 million. Recovery: [Cointelegraph](https://cointelegraph.com/news/elderly-us-victim-loses-330m-bitcoin-in-social-engineering-theft) reports that Binance said it is working with law enforcement and that investigators alerted exchanges about possible freezes; no opened page reports funds recovered.

**OAK Techniques observed:** **OAK-T7.005** (Privacy-Chain Hops — *primary for the laundering leg*). ZachXBT says the funds were swapped for XMR through 6+ instant exchanges ([alert](https://x.com/zachxbt/status/1916756932763046273)). See [`techniques/T7.005-privacy-chain-hops.md`](../techniques/T7.005-privacy-chain-hops.md). The extraction itself is a social-engineering theft from an individual holder ([The Block](https://www.theblock.co/post/352572/zachxbt-says-330-million-bitcoin-theft-victim-is-an-elderly-person-in-us)); no opened page gives the method, so no extraction Technique is declared (none — mechanism of the social engineering undisclosed).

**Attribution:** **unattributed.** [ZachXBT](https://x.com/zachxbt/status/1916756932763046273) published the theft address [`bc1qcrypchnrdx87jnal5e5m849fw460t4gk7vz55g`](https://mempool.space/address/bc1qcrypchnrdx87jnal5e5m849fw460t4gk7vz55g). Per [Decrypt](https://decrypt.co/316640/monero-jumps-51-after-suspicious-transfer-of-333m-in-bitcoin) and [Cointelegraph](https://cointelegraph.com/news/zachxbt-330m-btc-heist-xmr-surge-chainalysis-privacy-crypto), he considers North Korean involvement highly improbable.

**Key teaching point:** **A large non-custodial holder needs a second control that social engineering cannot talk past: a time-delayed or multi-party spend path for any transfer of this size.** The theft was a single large transfer from an individual's wallet, and once the BTC reached instant exchanges and Monero, on-chain recovery was effectively over. Exchanges and investigators had the hours between the transfer and the swaps to act, and the XMR price move was visible in public market data meanwhile.

## Summary

On 2025-04-28 [ZachXBT posted](https://x.com/zachxbt/status/1916756932763046273) (07:30 UTC) that nine hours earlier a suspicious transfer of 3520 BTC (\$330.7M) was made from a "potential victim", and that the funds were then laundered via 6+ instant exchanges and swapped for XMR, "causing the XMR price to spike 50%". [Decrypt](https://decrypt.co/316640/monero-jumps-51-after-suspicious-transfer-of-333m-in-bitcoin) reports XMR up as much as 51% that Monday morning, to \$347.72 within seven hours; [Cointelegraph](https://cointelegraph.com/news/zachxbt-330m-btc-heist-xmr-surge-chainalysis-privacy-crypto) reports an intraday high of \$339 per CoinMarketCap. Sources differ on the peak price; both agree on roughly +50%.

On 2025-04-30 ZachXBT said it was a social-engineering theft from an elderly individual in the U.S. ([The Block](https://www.theblock.co/post/352572/zachxbt-says-330-million-bitcoin-theft-victim-is-an-elderly-person-in-us)). [Cointelegraph's follow-up](https://cointelegraph.com/news/elderly-us-victim-loses-330m-bitcoin-in-social-engineering-theft) reports the BTC arrived in two transactions and was spread by peel chains over 300+ wallets and 20+ exchanges or payment services including Binance, with a small portion bridged to Ethereum; Hacken's Extractor tracked about \$284M through the chains. Figures for the number of exchanges differ between the alert (6+ instant exchanges) and this report (20+ exchanges or services); both are secondary to the on-chain data, which no opened page prints in full beyond the theft address. Exchanges used are not named in the alert.

## Timeline (UTC)

Stages: **Entry** (social engineering of the holder) → **Take** → **Money** → **Response**. Times come from the cited posts; the transfer time is derived from "nine hours ago" in a post stamped 07:30 UTC, so it is approximate. [The Block](https://www.theblock.co/post/352572/zachxbt-says-330-million-bitcoin-theft-victim-is-an-elderly-person-in-us) says ZachXBT first flagged it on Sunday 2025-04-27 while its URL says 04-28; the post itself is stamped 2025-04-28.

| When | What happened | OAK |
|---|---|---|
| Before 2025-04-28 (undisclosed) | Victim, an elderly U.S. individual, is socially engineered; method undisclosed ([The Block](https://www.theblock.co/post/352572/zachxbt-says-330-million-bitcoin-theft-victim-is-an-elderly-person-in-us)) | none — social-engineering method undisclosed |
| ~2025-04-27 22:30 to 2025-04-28 (approx.) | 3520 BTC (\$330.7M) moved from the victim's wallet; [Cointelegraph](https://cointelegraph.com/news/elderly-us-victim-loses-330m-bitcoin-in-social-engineering-theft) says it arrived in two transactions (hashes not printed on an opened page) | none — extraction primitive undisclosed |
| 2025-04-28, after the transfer | Funds split by peel chains across 300+ wallets and 20+ exchanges or services; small portion bridged to Ethereum ([Cointelegraph](https://cointelegraph.com/news/elderly-us-victim-loses-330m-bitcoin-in-social-engineering-theft)) | — |
| 2025-04-28, after the transfer | Funds swapped to XMR via 6+ instant exchanges; XMR up about 50% ([alert](https://x.com/zachxbt/status/1916756932763046273), [Decrypt](https://decrypt.co/316640/monero-jumps-51-after-suspicious-transfer-of-333m-in-bitcoin)) | **T7.005** |
| 2025-04-28 07:30 | ZachXBT publishes the alert and theft address | response |
| 2025-04-30 | ZachXBT identifies it as social-engineering theft from an elderly U.S. individual; Binance says it is working with law enforcement; exchanges alerted about freezes ([The Block](https://www.theblock.co/post/352572/zachxbt-says-330-million-bitcoin-theft-victim-is-an-elderly-person-in-us), [Cointelegraph](https://cointelegraph.com/news/elderly-us-victim-loses-330m-bitcoin-in-social-engineering-theft)) | response |

Key addresses:

- Theft address (Bitcoin) — [`bc1qcrypchnrdx87jnal5e5m849fw460t4gk7vz55g`](https://mempool.space/address/bc1qcrypchnrdx87jnal5e5m849fw460t4gk7vz55g), per [ZachXBT](https://x.com/zachxbt/status/1916756932763046273)

## Root-cause evidence

- **Technique:** OAK-T7.005 (laundering leg only)
- **Source:** <https://x.com/zachxbt/status/1916756932763046273>; <https://www.theblock.co/post/352572/zachxbt-says-330-million-bitcoin-theft-victim-is-an-elderly-person-in-us>; <https://cointelegraph.com/news/elderly-us-victim-loses-330m-bitcoin-in-social-engineering-theft>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** An independent on-chain investigator's alert and follow-up, relayed by news outlets. The laundering path (instant exchanges to XMR) is stated by the investigator; the social-engineering cause rests on his statement alone. The method, the transaction hashes and the exchanges used are not in any opened page.

## Public references

- ZachXBT, X post (2025-04-28): <https://x.com/zachxbt/status/1916756932763046273>
- Decrypt, "Monero jumps 51% after suspicious transfer of \$333M in Bitcoin" (2025-04-28): <https://decrypt.co/316640/monero-jumps-51-after-suspicious-transfer-of-333m-in-bitcoin>
- Cointelegraph, ZachXBT \$330M BTC heist and XMR surge (2025-04-28): <https://cointelegraph.com/news/zachxbt-330m-btc-heist-xmr-surge-chainalysis-privacy-crypto>
- The Block, "ZachXBT says \$330 million bitcoin theft victim is an 'elderly' person in US" (2025-04-30): <https://www.theblock.co/post/352572/zachxbt-says-330-million-bitcoin-theft-victim-is-an-elderly-person-in-us>
- Cointelegraph, "Elderly US victim loses \$330M Bitcoin in social engineering theft" (2025-04-30): <https://cointelegraph.com/news/elderly-us-victim-loses-330m-bitcoin-in-social-engineering-theft>
