# Blur — BLUR airdrop rewards paid out to wash-traded NFT volume — Ethereum — 2023-02 (cohort case)

**Loss:** no direct theft. Two analysts measured wash trading on Blur after the BLUR airdrop, with different methods and different results ([Decrypt, 2023-02-28, updated 2023-08-11](https://decrypt.co/122369/wash-trading-blur-ethereum-nfts)). CryptoSlam announced on Friday 2023-02-24 that it would remove $577 million in Blur trades; by the following Monday the figure had grown to nearly $824 million, over 80% of Blur's $1.02 billion volume since the 2023-02-14 airdrop. hildobby's Dune dashboard showed about $345 million of wash trading since Blur's October 2022 launch, about 14% of recorded volume. The article gives about $290 million for the 2023-02-14 airdrop. [Dune Digest #71](https://dunedigest.substack.com/p/dune-digest-71) (2023-03-03) reports that wallets with "90% or higher wash trading" "claimed substantial rewards of $100k or more in $BLUR" and that "almost 80% of recipients dumped" their BLUR.

**OAK Techniques observed:** **OAK-T12.001** (NFT Wash-Trade Volume Inflation, marketplace-incentive-driven sub-motivation — *primary*, per hildobby and CryptoSlam as reported by Decrypt). Wallets traded NFTs among related addresses, and the volume counted toward BLUR rewards. See [`techniques/T12.001-nft-wash-trade-volume-inflation.md`](../techniques/T12.001-nft-wash-trade-volume-inflation.md). The NFT wash-laundering Technique is not declared: no opened page describes proceeds of crime being cleaned, only reward farming.

**Attribution:** **unattributed.** The opened pages describe wallets and clusters, not named operators. [Decrypt](https://decrypt.co/122369/wash-trading-blur-ethereum-nfts) reports that about 50% of Blur's NFT volume came from roughly 300 wallets.

**Key teaching point:** **A marketplace that pays token rewards on gross volume must filter wash trades out of the reward formula before it pays, not after.** hildobby's criteria (same wallet on both sides, an NFT traded back and forth, the same NFT bought three or more times by one wallet, both wallets funded by the same source) are checks a marketplace can run on its own order flow ([Decrypt](https://decrypt.co/122369/wash-trading-blur-ethereum-nfts)).

## Summary

Blur's BLUR token went live on 2023-02-14 with an airdrop ([NFT Plazas](https://nftplazas.com/blur-token-live/)). NFT Plazas says the first airdrop was dubbed Care Package and that over 360 million BLUR were awarded to traders who bid on Blur with Care Packages. Within two weeks analysts said a large part of post-airdrop volume was wash trading ([Decrypt](https://decrypt.co/122369/wash-trading-blur-ethereum-nfts)). hildobby's criteria are listed above. CryptoSlam widened its criteria to catch a a new class of wash trades, wallets trading without regard to an NFT's metadata, and applied an updated algorithm to future Blur trades. Its CEO said inorganic trading may be a better description. A Blur representative told Decrypt that analysts should rely on well-documented methodologies and pointed to hildobby's data. [Dune Digest #71](https://dunedigest.substack.com/p/dune-digest-71) quotes an analyst that the top 5 traders had a wash volume share of 37% of their total volume.

On OpenSea, CryptoSlam counted about $6.6 million of wash trades out of over $249 million from 2023-02-14 to early the following Monday, about 2.5% ([Decrypt](https://decrypt.co/122369/wash-trading-blur-ethereum-nfts)). Decrypt mentions X2Y2 only as an earlier marketplace with wash trading tied to token rewards and gives no X2Y2 figures.

Earlier reward-driven wash waves have their own files: [`2022-01-looksrare-wash-trading-launch.md`](2022-01-looksrare-wash-trading-launch.md), [`2022-07-x2y2-fee-rebate-wash-trading.md`](2022-07-x2y2-fee-rebate-wash-trading.md).

## Timeline (UTC)

**Entry** (reward program) → **Preparation** (wash wallets) → **Execution** (volume farming) → **Funds** (BLUR rewards) → **Response** (analyst removal). Dates come from the opened pages; times of day are undisclosed.

| When | What happened | OAK |
|---|---|---|
| 2022-10 | Blur launches ([Decrypt](https://decrypt.co/122369/wash-trading-blur-ethereum-nfts) says October launch; exact day not on an opened page) | — |
| 2022-10 to 2023-02-14 | Traders earn Care Package rewards by bidding on Blur ([NFT Plazas](https://nftplazas.com/blur-token-live/)) | — |
| 2023-02-14 | BLUR token goes live; airdrop of about $290 million per [Decrypt](https://decrypt.co/122369/wash-trading-blur-ethereum-nfts); 60 days to claim per [NFT Plazas](https://nftplazas.com/blur-token-live/) | **T12.001** |
| 2023-02-14 to 2023-02-27 | Post-airdrop volume on Blur of $1.02 billion, of which CryptoSlam removes nearly $824 million | **T12.001** |
| 2023-02-24 | CryptoSlam announces removal of $577 million in Blur trades | response |
| 2023-02-27 | hildobby's dashboard shows about $345 million of wash trading, about 14% of volume | detection |
| 2023-03-03 | Dune Digest #71 reports wash-heavy wallets claiming $100k or more in BLUR | **T12.001** |

The exact day of the Monday figures is the Monday before the 2023-02-28 article; the page does not print the date.

Key addresses: none printed in full on an opened page.

## Root-cause evidence

- **Technique:** OAK-T12.001
- **Source:** <https://decrypt.co/122369/wash-trading-blur-ethereum-nfts>; <https://dunedigest.substack.com/p/dune-digest-71>; <https://nftplazas.com/blur-token-live/>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** Two analysts (hildobby, CryptoSlam) measured wash volume with different criteria and got different totals; both say the volume followed the airdrop. That the rewards caused the wash trading is the analysts' inference as relayed by news. The scoring formula and whether Blur changed it between seasons are not on the opened pages.

## Public references

- Decrypt, Wash trading on Blur, (2023-02-28, updated 2023-08-11): <https://decrypt.co/122369/wash-trading-blur-ethereum-nfts>
- Dune Digest, Dune Digest #71 (2023-03-03): <https://dunedigest.substack.com/p/dune-digest-71>
- NFT Plazas, Blur token live: <https://nftplazas.com/blur-token-live/>
