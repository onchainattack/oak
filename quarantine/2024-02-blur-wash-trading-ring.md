> **MERGED 2026-11-27 into `examples/2023-02-blur-airdrop-wash-cohort.md`** — a second entry for the February 2023 Blur airdrop farming, misdated to 2024; its multi-wallet ring structure is on no opened page. Not part of the OAK corpus; kept for the record.

**Merged into:** 2023-02-blur-airdrop-wash-cohort

# Blur — BLUR airdrop rewards farmed with wash trades between related wallets — Blur NFT marketplace / Ethereum — 2023-02

**Loss:** no direct theft. The harm is inflated marketplace volume and BLUR rewards earned on wash volume. Estimates of the wash share differ by method: [Dune analyst hildobby](https://decrypt.co/122369/wash-trading-blur-ethereum-nfts) put it at about $345 million, nearly 14% of Blur's recorded volume since the October 2022 launch (as of 2023-02-27); [CryptoSlam](https://decrypt.co/122369/wash-trading-blur-ethereum-nfts) removed nearly $824 million, over 80% of the $1.02 billion volume since the 2023-02-14 airdrop. A [Dune Digest summary](https://dunedigest.substack.com/p/dune-digest-71) of a dashboard by @jhackworth reports that wallets with 90% or higher wash trading claimed $100k or more in $BLUR. No total of rewards captured by wash trades is published on an opened page.

**OAK Techniques observed:** **OAK-T12.001** (NFT Wash-Trade Volume Inflation, *primary*). Traders trade NFTs in circles to raise their Blur volume and rewards. The [Decrypt report](https://decrypt.co/122369/wash-trading-blur-ethereum-nfts) quotes CryptoSlam's founder calling the flagged trades the byproduct of token farming incentives introduced by Blur. See [`techniques/T12.001-nft-wash-trade-volume-inflation.md`](../techniques/T12.001-nft-wash-trade-volume-inflation.md).

**Attribution:** **pseudonymous.** [Decrypt](https://decrypt.co/122369/wash-trading-blur-ethereum-nfts) and [NFT Plazas](https://nftplazas.com/blur-token-live/) report suspected wash traders but name no operator; the top-earning wallet is described only as a relatively new address.

**Key teaching point:** **Do not pay token rewards on raw trading volume without excluding trades between related wallets.** A reward that scales with volume pays a trader more for trading with themselves than the trade costs. [CryptoSlam's founder](https://decrypt.co/122369/wash-trading-blur-ethereum-nfts) tied the flagged trades to Blur's token farming incentives.

## Summary

Blur ran airdrops that rewarded trading activity on its marketplace. [NFT Plazas](https://nftplazas.com/blur-token-live/) reports the BLUR token went live on 2023-02-14 with the largest airdrop, over 360 million BLUR to traders who placed bids on Blur. It also reports that some suspected traders manipulated trades to boost rewards and that, after the final airdrop, several top-earning traders appeared to be wash trading.

[Decrypt](https://decrypt.co/122369/wash-trading-blur-ethereum-nfts) (published 2023-02-28) reports two measurements that disagree. Hildobby's Dune dashboard showed about $345 million of wash trading since launch, nearly 14% of recorded volume. CryptoSlam removed $577 million of Blur trades on 2023-02-24 and nearly $824 million by the following Monday, over 80% of the $1.02 billion volume since the airdrop, against about $6.6 million (roughly 2.5%) on OpenSea. [Dune Digest #71](https://dunedigest.substack.com/p/dune-digest-71) (2023-03-03) reports that the top 5 traders had a wash share of 37% of their volume. Which wallets formed rings, how many wallets each ring used and how they were funded are undisclosed on the opened pages.

## Timeline (UTC)

**Entry** (reward design), **execution** (wash volume), **funds** (rewards claimed and sold), **response** (analyst flags). Dates come from the cited pages; no times are published.

| When | What happened | OAK |
|---|---|---|
| 2022-10 | Blur launches; the wash-share figures above are measured from this month ([Decrypt](https://decrypt.co/122369/wash-trading-blur-ethereum-nfts)) | none — marketplace launch |
| Before 2023-02-14 (undisclosed) | Preparation of wash wallets is undisclosed | none — undisclosed |
| 2023-02-14 | BLUR token and the largest airdrop go live; over 360 million BLUR awarded to bidders ([NFT Plazas](https://nftplazas.com/blur-token-live/)) | **T12.001** |
| 2023-02-14 onward | Suspected wash trades repeat the same NFTs among top-earning wallets ([NFT Plazas](https://nftplazas.com/blur-token-live/)) | **T12.001** |
| 2023-02-24 to 2023-02-27 | CryptoSlam removes $577 million, then nearly $824 million, of Blur trades; hildobby's dashboard shows about $345 million ([Decrypt](https://decrypt.co/122369/wash-trading-blur-ethereum-nfts)) | response |
| 2023-03-03 | Dune Digest reports wallets with 90% or higher wash trading claimed $100k or more in BLUR; almost 80% of airdrop recipients dumped their tokens ([Dune Digest](https://dunedigest.substack.com/p/dune-digest-71)) | none — reward sale, not traced |

Key addresses: undisclosed on the opened pages.

## Root-cause evidence

- **Technique:** OAK-T12.001
- **Source:** <https://decrypt.co/122369/wash-trading-blur-ethereum-nfts>; <https://dunedigest.substack.com/p/dune-digest-71>; <https://nftplazas.com/blur-token-live/>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** Three news and newsletter pages report wash trades and quote analyst estimates that disagree by method. None shows a transaction-level trace or a Blur post-mortem, so the ring structure and how rewards were extracted are not established here.

## Public references

- Decrypt, "How Much Wash Trading Is Really Happening on Blur?" (2023-02-28, updated 2023-08-11): <https://decrypt.co/122369/wash-trading-blur-ethereum-nfts>
- Dune Digest #71 (2023-03-03): <https://dunedigest.substack.com/p/dune-digest-71>
- NFT Plazas, "$BLUR Token Goes Live Amid Wash Trading Concerns": <https://nftplazas.com/blur-token-live/>
- Sibling incident: [`2023-02-blur-airdrop-wash-cohort.md`](2023-02-blur-airdrop-wash-cohort.md)
