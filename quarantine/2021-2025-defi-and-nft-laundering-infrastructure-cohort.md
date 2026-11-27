> **QUARANTINED 2026-11-27 — not part of the OAK corpus.** The 2026-11 source pass rewrote this file from the pages it could open and found no attack to record: what remained after the source pass is one Chainalysis report on NFT wash trading by profit-seeking traders, already covered by the LooksRare and X2Y2 files; no opened page documents laundering through yield protocols. It is kept here, outside `examples/`, and can return if a source documents an incident.

# NFT wash trading and illicit-address inflows to NFT marketplaces — Chainalysis 2022 report on 2021 data — Ethereum NFT marketplaces — 2021

**Loss:** no theft loss is attached. [Chainalysis](https://www.chainalysis.com/blog/2022-crypto-crime-report-preview-nft-wash-trading-money-laundering/) reports that illicit addresses sent just over $1 million to NFT marketplaces in Q3 2021 and just under $1.4 million in Q4 2021, and that the 110 profitable wash traders it identified made nearly $8.9 million.

**OAK Techniques observed:** none — the one opened page documents profit-motivated NFT wash trading and illicit addresses buying NFTs, and it does not show proceeds being laundered through self-financed NFT sales or through DeFi yield, lending or staking protocols. The earlier version of this file declared the NFT wash-laundering and DeFi yield-strategy laundering Techniques; no opened page supports either (see Root-cause evidence).

**Attribution:** **unattributed.** The page names no individual wash trader; it cites sanctions exposure only for transfers from the P2P exchange Chatex.

**Key teaching point:** **A marketplace that screens only for wash-trade patterns will miss illicit inflows, and one that screens only for illicit inflows will miss wash trades; Chainalysis reports both on the same venues.** The report measures the two separately: wash trading for profit by repeat self-sellers, and funds from scam, stolen-funds and sanctioned addresses buying NFTs.

## Summary

On 2022-02-02 [Chainalysis published](https://www.chainalysis.com/blog/2022-crypto-crime-report-preview-nft-wash-trading-money-laundering/) a preview of its 2022 Crypto Crime Report on NFTs. It says it identified "262 users who have sold an NFT to a self-financed address more than 25 times." It says "The 110 profitable wash traders have collectively made nearly $8.9 million in profit from this activity," against "$416,984 in losses made by the 152 unprofitable wash traders." It separately measures value sent to NFT marketplaces by illicit addresses: over $1 million in Q3 2021 and just under $1.4 million in Q4 2021, "the vast majority" from scam-associated addresses, with "significant amounts of stolen funds" too, and about $284,000 in Q4 from addresses with sanctions risk, all from Chatex. It calls all of this "a drop in the bucket" against "the $8.6 billion worth of cryptocurrency-based money laundering we tracked in all of 2021."

The page describes the wash trades as profit-seeking activity. It does not say the self-financed sales cleaned illicit proceeds. A [second Chainalysis page](https://www.chainalysis.com/blog/2024-crypto-money-laundering/) on 2023 laundering says "DeFi's inherent transparency generally makes it a poor choice for obfuscating the movement of funds," and does not mention lending, yield or staking as a laundering route. The previous version of this file claimed DeFi yield protocols were used as laundering cover by Lazarus Group; neither page says so.

Sibling OAK files cover NFT-marketplace wash trading on its own terms: [LooksRare and X2Y2](2022-01-looksrare-x2y2-wash-trading-cohort.md), [Blur airdrop wash cohort](2023-02-blur-airdrop-wash-cohort.md). This file is not a cohort of sourced incidents; it records one report.

## Timeline (UTC)

Stages: **Activity** (2021 data) → **Publication**. Dates come from the Chainalysis page; it gives quarters, not days.

| When | What happened | OAK |
|---|---|---|
| 2021 Q3 | Illicit addresses send over $1 million to NFT marketplaces, mostly scam-associated addresses ([Chainalysis](https://www.chainalysis.com/blog/2022-crypto-crime-report-preview-nft-wash-trading-money-laundering/)) | — |
| 2021 Q4 | The figure rises to just under $1.4 million; about $284,000 comes from addresses with sanctions risk, all from Chatex (same page) | — |
| 2021 (full year) | 262 users each sold an NFT to a self-financed address more than 25 times; 110 were profitable (same page). Addresses undisclosed | — |
| Funds afterwards | Where the proceeds went is undisclosed on the page | — |
| 2022-02-02 | Chainalysis publishes the findings and says marketplaces, regulators and law enforcement should monitor the activity closely (same page) | response |

Key addresses: none published on the page.

## Root-cause evidence

- **Technique:** none
- **Source:** <https://www.chainalysis.com/blog/2022-crypto-crime-report-preview-nft-wash-trading-money-laundering/>; <https://www.chainalysis.com/blog/2024-crypto-money-laundering/>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** Chainalysis states the counts and profit figures above from its own blockchain analysis. It does not say the wash trades were laundering, and its 2024 report says DeFi's transparency makes it a poor choice for obfuscation. The earlier claims of Lazarus yield-protocol laundering, per-protocol "lockup minimum" patterns, the 94.5% and 84.2% wash-trade rates, and the Bored Ape and CryptoPunks trades are not on any opened page and were removed.

## Public references

- Chainalysis, "NFT Money Laundering and Wash Trading" (2022-02-02): <https://www.chainalysis.com/blog/2022-crypto-crime-report-preview-nft-wash-trading-money-laundering/>
- Chainalysis, "2024 Crypto Money Laundering Report": <https://www.chainalysis.com/blog/2024-crypto-money-laundering/>
