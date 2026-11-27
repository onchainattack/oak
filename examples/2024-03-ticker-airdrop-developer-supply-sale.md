# TICKER — developer tasked with the airdrop sells 13% of supply for about $900K after TGE — Base — 2024-03-16

**Loss:** about \$900K from selling 13% of the TICKER token supply, per [crypto.news](https://crypto.news/french-developer-steals-900k-from-ticker-presale-buys-nfts-and-memecoins/) and [DailyCoin](https://dailycoin.com/ticker-presale-ends-in-900k-theft-by-french-developer/); the presale raised 877 ETH (\$3.19M). No recovery is reported on the opened pages.

**OAK Techniques observed:** none — an insider sold tokens he held for distribution (an airdrop allocation, not presale funds, per the two news pages), which matches no Technique page. **OAK-T7.003** (Cross-Chain Bridge Laundering: the proceeds were moved Base to Ethereum to Solana through Orbiter Finance, Mayan Swap and Allbridge, per [crypto.news](https://crypto.news/french-developer-steals-900k-from-ticker-presale-buys-nfts-and-memecoins/)).

**Attribution:** **inferred-weak**, reported by an independent investigator. [ZachXBT](https://x.com/zachxbt/status/1770821182838763998) names a French developer; DailyCoin presents this as allegations and reports no charges, lawsuit or arrest, and crypto.news reports none. This file names no individual, because no opened page shows the person is charged, sued or convicted (the file name predates this rule).

**Key teaching point:** **Do not hand an anonymous-team airdrop allocation to one person without a lock or a distribution contract.** Per [crypto.news](https://crypto.news/french-developer-steals-900k-from-ticker-presale-buys-nfts-and-memecoins/) the developer was tasked with distributing airdrop tokens and sold 13% of supply shortly after the TGE.

## Summary

[ZachXBT](https://x.com/zachxbt/status/1770821182838763998) (2024-03-21) opened an investigation into a French developer who "recently stole $900K from the TICKER presale on Base before spending the funds on meme coins and Milady NFTs". The detail comes from the news write-ups of his thread. TICKER raised 877 ETH, about \$3.19M, on Base. Per [DailyCoin](https://dailycoin.com/ticker-presale-ends-in-900k-theft-by-french-developer/) the team sent 15% of supply to the developer to distribute as an airdrop; he allegedly sold 13% for about \$900K. Per both write-ups, he bridged the ETH across chains, sent \$536K back to Ethereum, spent 46 ETH (about \$161K) on Milady and Milady-derivative NFTs and traded meme coins, then said he controlled the funds and was "not sorry" before deactivating his account. Only the first post of the thread was opened; the thread's replies were not.

## Timeline (UTC)

Dates come from the news pages; times and transaction hashes are undisclosed on the opened pages.

| When | What happened | OAK |
|---|---|---|
| Before 2024-03-16 (undisclosed) | Team (anonymous, per [crypto.news](https://crypto.news/french-developer-steals-900k-from-ticker-presale-buys-nfts-and-memecoins/)) gives the developer an airdrop allocation (15% of supply per [DailyCoin](https://dailycoin.com/ticker-presale-ends-in-900k-theft-by-french-developer/)) | none (entry) |
| 2024-03-16 | After the TGE, the developer sells 13% of supply for about \$900K ([crypto.news](https://crypto.news/french-developer-steals-900k-from-ticker-presale-buys-nfts-and-memecoins/); DailyCoin dates the presale launch the same day) | none (execution) |
| After 2024-03-16 (undisclosed) | ETH bridged Base to Ethereum (Orbiter Finance), then to Solana (Mayan Swap, Allbridge); \$536K bridged back to Ethereum ([crypto.news](https://crypto.news/french-developer-steals-900k-from-ticker-presale-buys-nfts-and-memecoins/)) | T7.003 |
| After 2024-03-16 (undisclosed) | 46 ETH (about \$161K) spent on Milady NFTs and derivatives; meme coin trading; over \$140,000 held across several wallets ([crypto.news](https://crypto.news/french-developer-steals-900k-from-ticker-presale-buys-nfts-and-memecoins/)) | none (funds disposition) |
| 2024-03-21 | ZachXBT publishes the investigation ([X](https://x.com/zachxbt/status/1770821182838763998)); the developer posts that he is "not sorry" and deactivates his account ([crypto.news](https://crypto.news/french-developer-steals-900k-from-ticker-presale-buys-nfts-and-memecoins/)) | response |

Key addresses: none printed in full on an opened page (undisclosed).

## Root-cause evidence

- **Technique:** OAK-T7.003 (only the laundering step matches a Technique; the root cause has none)
- **Source:** <https://x.com/zachxbt/status/1770821182838763998>; <https://crypto.news/french-developer-steals-900k-from-ticker-presale-buys-nfts-and-memecoins/>; <https://dailycoin.com/ticker-presale-ends-in-900k-theft-by-french-developer/>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** The investigator's thread, relayed by two news sites, establishes an insider sale of a distribution allocation. No on-chain addresses or transactions were opened, and the thread's later posts were not read.

## Public references

- ZachXBT, first post of the TICKER investigation thread (2024-03-21): <https://x.com/zachxbt/status/1770821182838763998>
- crypto.news, "French developer steals $900k from TICKER presale, buys NFTs and memecoins" (2024-03-22): <https://crypto.news/french-developer-steals-900k-from-ticker-presale-buys-nfts-and-memecoins/>
- DailyCoin, "TICKER Presale Ends in $900K Theft by French Developer" (2024-03-22): <https://dailycoin.com/ticker-presale-ends-in-900k-theft-by-french-developer/>
