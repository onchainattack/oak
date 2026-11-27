> **MERGED 2026-11-27 into `examples/2022-06-opensea-insider-trading.md`** — no opened page shows the 2024–2026 persistence it claimed; what remained was the OpenSea insider case and 2021 wash-trading data already in their own files. Not part of the OAK corpus; kept for the record.

**Merged into:** 2022-06-opensea-insider-trading

# NFT marketplace insider trading and wash trading — two documented patterns, no 2024–2026 incident found — NFT marketplaces / Ethereum — 2021–2025

**Loss:** structural; no single loss figure. This file earlier asserted that both patterns "persisted" in 2024–2026; no opened page says so, and that claim is removed. What the opened pages carry: the OpenSea head of product earned about \$57,000 trading ahead of homepage features ([DLA Piper](https://www.dlapiper.com/en/insights/publications/2025/08/second-circuit-vacates-nft-insider-trading-conviction)), and Chainalysis reported 110 Ethereum addresses with \$8.9 million in NFT wash-trading profits for 2021 ([Cointelegraph, 2022-02-06](https://cointelegraph.com/news/chainalysis-report-finds-most-nft-wash-traders-unprofitable)).

**OAK Techniques observed:** **OAK-T12.001** (NFT Wash-Trade Volume Inflation — for the wash-trading pattern: Chainalysis tracked NFT sales to self-financed addresses, meaning addresses funded by the seller or by the seller's funder, per [Cointelegraph](https://cointelegraph.com/news/chainalysis-report-finds-most-nft-wash-traders-unprofitable); see [`techniques/T12.001-nft-wash-trade-volume-inflation.md`](../techniques/T12.001-nft-wash-trade-volume-inflation.md)). The marketplace insider-trading pattern maps to no OAK Technique: the one Technique named for insider trading is scoped to prediction markets, and the royalty-bypass Technique this file earlier declared is a different mechanism.

**Attribution:** **unattributed** for the wash-trading data (addresses, not named parties). The insider case is a charged and convicted individual whose conviction was later vacated; see [`examples/2022-06-opensea-insider-trading.md`](2022-06-opensea-insider-trading.md).

**Key teaching point:** **Keep promotional decisions and employee trading apart, and screen volume metrics for self-funded trades.** In the OpenSea case the insider chose which NFTs were featured on the homepage, which typically raised their value, and bought them beforehand ([DLA Piper](https://www.dlapiper.com/en/insights/publications/2025/08/second-circuit-vacates-nft-insider-trading-conviction)). In the wash-trading data, the tell Chainalysis used was a buyer funded by the seller ([Cointelegraph](https://cointelegraph.com/news/chainalysis-report-finds-most-nft-wash-traders-unprofitable)).

## Summary

This was written as a 2024–2026 standing-surface file. After a source pass, no opened page documents NFT insider trading or wash trading in 2024–2026, so it does not stand as a cohort. It is reduced to the two sourced patterns, each of which belongs in its own file.

**Insider trading, OpenSea.** The head of product chose which NFTs OpenSea featured on its homepage and bought them before featuring; he was asked to resign in September 2021, convicted at a jury trial of wire fraud and money laundering, and sentenced to three months in prison and three years of supervised release ([DLA Piper](https://www.dlapiper.com/en/insights/publications/2025/08/second-circuit-vacates-nft-insider-trading-conviction); [The Block, 2025-07-31](https://www.theblock.co/news/web3/2025-07-31-us-appeals-court-overturns-opensea-product-manager-nathanial-chastains-wire-fraud-and-money-laundering-conviction-365052)). The sources differ on the indictment date: DLA Piper says May 2022, The Block says June 2022. On 2025-07-31 the Second Circuit vacated both convictions and remanded, holding that confidential business information must have commercial value to the employer to be property under the wire fraud statute; one judge dissented ([DLA Piper](https://www.dlapiper.com/en/insights/publications/2025/08/second-circuit-vacates-nft-insider-trading-conviction); [The Block](https://www.theblock.co/news/web3/2025-07-31-us-appeals-court-overturns-opensea-product-manager-nathanial-chastains-wire-fraud-and-money-laundering-conviction-365052)). The full incident is in [`2022-06-opensea-insider-trading.md`](2022-06-opensea-insider-trading.md).

**Wash trading.** Chainalysis found at least \$44.2 billion sent to NFT-linked Ethereum contracts in 2021, 110 addresses with \$8.9 million in wash-trading profit and 152 addresses with combined losses of \$416,984; most wash traders were unprofitable ([Cointelegraph](https://cointelegraph.com/news/chainalysis-report-finds-most-nft-wash-traders-unprofitable)). Incident files: [`2022-01-looksrare-x2y2-wash-trading-cohort.md`](2022-01-looksrare-x2y2-wash-trading-cohort.md) and [`2024-02-blur-wash-trading-ring.md`](2024-02-blur-wash-trading-ring.md).

## Timeline (UTC)

Stages: **Flaw** (a marketplace decision visible to insiders, or volume that rewards self-trades), **Take** (trades), **Response** (charges, appeal). No crypto fund flow is traced here; see the sibling files.

| When | What happened | OAK |
|---|---|---|
| 2021 | Chainalysis data period: 110 addresses profit \$8.9 million from NFT wash trading ([Cointelegraph](https://cointelegraph.com/news/chainalysis-report-finds-most-nft-wash-traders-unprofitable)) | **T12.001** |
| 2021 (exact dates undisclosed on opened pages) | OpenSea head of product buys NFTs before they are featured, sells after ([DLA Piper](https://www.dlapiper.com/en/insights/publications/2025/08/second-circuit-vacates-nft-insider-trading-conviction)) | — |
| 2021-09 | OpenSea asks him to resign ([DLA Piper](https://www.dlapiper.com/en/insights/publications/2025/08/second-circuit-vacates-nft-insider-trading-conviction)) | response |
| 2022-02-06 | Cointelegraph reports the Chainalysis wash-trading findings | — |
| 2022-05 or 2022-06 | Indictment (sources differ, see Summary) | response |
| 2023 | Convicted at trial and sentenced to three months in prison, per [The Block](https://www.theblock.co/news/web3/2025-07-31-us-appeals-court-overturns-opensea-product-manager-nathanial-chastains-wire-fraud-and-money-laundering-conviction-365052); the opened pages do not give the trial date | response |
| 2025-07-31 | Second Circuit vacates both convictions and remands | response |
| 2024–2026 | No incident documented in the opened pages | — |

Key addresses: none published in the opened pages.

## Root-cause evidence

- **Technique:** OAK-T12.001
- **Source:** <https://cointelegraph.com/news/chainalysis-report-finds-most-nft-wash-traders-unprofitable>; <https://www.dlapiper.com/en/insights/publications/2025/08/second-circuit-vacates-nft-insider-trading-conviction>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** For wash trading, Chainalysis's method (sales to self-financed addresses) is relayed by a news outlet; the original Chainalysis post was not opened. For insider trading, the facts come from a law-firm summary of the appeal and a news report; the court opinion was not opened. Nothing opened covers 2024–2026.

## Public references

- Cointelegraph, "Chainalysis report finds most NFT wash traders unprofitable" (2022-02-06): <https://cointelegraph.com/news/chainalysis-report-finds-most-nft-wash-traders-unprofitable>
- DLA Piper, "Second Circuit vacates NFT insider trading conviction" (2025-08-12): <https://www.dlapiper.com/en/insights/publications/2025/08/second-circuit-vacates-nft-insider-trading-conviction>
- The Block, "US appeals court overturns OpenSea product manager Nathanial Chastain's wire fraud and money laundering conviction" (2025-07-31): <https://www.theblock.co/news/web3/2025-07-31-us-appeals-court-overturns-opensea-product-manager-nathanial-chastains-wire-fraud-and-money-laundering-conviction-365052>
