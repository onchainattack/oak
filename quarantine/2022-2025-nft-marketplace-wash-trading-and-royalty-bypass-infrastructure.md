> **QUARANTINED 2026-11-28 — not part of the OAK corpus.** Not a cohort of its own: after its unsourced royalty half was removed, what remains is the Chainalysis 2022 study, already cited on the OAK-T12.001 page, and links to the LooksRare, X2Y2 and Blur files. It is kept here, outside `examples/`, and can return if a source documents an incident.

# NFT marketplace wash trading — index of sourced cohorts and one Chainalysis study — 2022–2023

**Loss:** structural; no aggregate figure is established. The earlier version claimed royalty-revenue loss in the hundreds of millions and an effective royalty rate falling from about 100% to under 10% of nominal. No opened page carries either, so both are removed. Sourced figures sit in the sibling files below. [Chainalysis](https://www.chainalysis.com/blog/2022-crypto-crime-report-preview-nft-wash-trading-money-laundering/) (February 2022) identified 262 users who sold an NFT to a self-financed address more than 25 times; the 110 profitable ones made nearly \$8.9M, and the 152 unprofitable ones lost about \$417,000. Chainalysis covered only ETH and WETH sales and says it cannot be sure every such sale was wash trading.

**Scope note:** the earlier file combined wash trading with royalty bypass. Royalty-policy changes by marketplaces are not attacks, so the royalty half is dropped and the royalty Technique is not declared. The wash-trading half cited no opened page, and the cohorts it named already have their own files, so this file is an index (verdict no_cohort).

**OAK Techniques observed:** **OAK-T12.001** (NFT Wash-Trade Volume Inflation): the Chainalysis study's self-financed sales to inflate prices or volume. See [`techniques/T12.001-nft-wash-trade-volume-inflation.md`](../techniques/T12.001-nft-wash-trade-volume-inflation.md).

**Attribution:** **unattributed**. Chainalysis reports counts of users, no names.

**Key teaching point:** **Detect wash trading from funding links, not from price.** Chainalysis flagged sales to addresses funded by the seller or by the seller's funder ([Chainalysis](https://www.chainalysis.com/blog/2022-crypto-crime-report-preview-nft-wash-trading-money-laundering/)), a check a marketplace can run on its own order flow before it pays any reward.

## Summary

Reward-driven wash trading on NFT marketplaces is documented per incident, not as one 2022–2025 cohort. Use these files:

- [`2022-01-looksrare-x2y2-wash-trading-cohort.md`](2022-01-looksrare-x2y2-wash-trading-cohort.md) and [`2022-01-looksrare-wash-trading-launch.md`](2022-01-looksrare-wash-trading-launch.md) for LooksRare.
- [`2022-02-x2y2-marketplace-incentive-wash-cohort.md`](2022-02-x2y2-marketplace-incentive-wash-cohort.md) for X2Y2.
- [`2023-02-blur-airdrop-wash-cohort.md`](2023-02-blur-airdrop-wash-cohort.md) for Blur.

What this file adds is the Chainalysis study above, which is a measurement of individual wash traders in 2021 sales, not a marketplace incident. The statements the earlier file made about Blur's royalty settings, OpenSea's Operator Filter Registry, ERC-2981 and a self-reinforcing incentive cycle were not checked against an opened page and are removed; the royalty-optional marketplace changes are in [`2022-11-x2y2-looksrare-royalty-optional.md`](2022-11-x2y2-looksrare-royalty-optional.md).

## Timeline (UTC)

| When | What happened | OAK |
|---|---|---|
| 2021 | Period of the sales Chainalysis analysed; 262 users flagged ([Chainalysis](https://www.chainalysis.com/blog/2022-crypto-crime-report-preview-nft-wash-trading-money-laundering/)) | **T12.001** |
| 2022-02 | Chainalysis publishes the preview of its 2022 Crypto Crime Report with the NFT wash-trading analysis | response |
| Undisclosed | Where the wash traders' profits went: undisclosed | — |

Key addresses: none printed on an opened page.

## Root-cause evidence

- **Technique:** OAK-T12.001
- **Source:** <https://www.chainalysis.com/blog/2022-crypto-crime-report-preview-nft-wash-trading-money-laundering/>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** A forensic firm's own analysis of self-financed NFT sales, with stated caveats on coverage and on intent.

## Public references

- Chainalysis, [2022 Crypto Crime Report preview: NFT wash trading and money laundering](https://www.chainalysis.com/blog/2022-crypto-crime-report-preview-nft-wash-trading-money-laundering/) (February 2022).
- Sibling files listed in the Summary.
