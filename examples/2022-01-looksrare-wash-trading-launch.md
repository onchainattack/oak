# LooksRare — volume-proportional LOOKS trading rewards without a wash-trade filter, farmed by self-dealing NFT trades — LooksRare / Ethereum — 2022-01-10

**Loss:** No theft. The harm is market-information integrity: [CryptoSlam estimated](https://decrypt.co/91510/looksrare-has-reportedly-generated-8b-ethereum-nft-wash-trading) more than $8.3 billion of wash trades out of more than $9.5 billion of LooksRare Ethereum volume (Dune) by 2022-01-28, about 87%. Both figures are third-party estimates; CryptoSlam's criteria are its own.

**OAK Techniques observed:** **OAK-T12.001** (NFT Wash-Trade Volume Inflation, *primary*). Traders sold NFTs between wallets they controlled at inflated prices to earn more LOOKS than the 2% fee plus gas cost them, per [Decrypt, 2022-01-28](https://decrypt.co/91510/looksrare-has-reportedly-generated-8b-ethereum-nft-wash-trading). See [`techniques/T12.001-nft-wash-trade-volume-inflation.md`](../techniques/T12.001-nft-wash-trade-volume-inflation.md). The fungible-token volume-inflation Technique was rejected: the trades are NFT sales at the marketplace layer, not DEX swaps on a token pair. The single-sided liquidity plant Technique that an earlier version listed was rejected: no opened page mentions liquidity provision.

**Attribution:** **unattributed.** The opened pages name no wash-trading participant. They describe many wallets responding to a public incentive.

**Key teaching point:** **A reward paid as a share of nominal trading volume, with no exclusion of self-trades, pays people to wash trade.** The marketplace contracts worked as designed; the defender control is a reward formula or a pre-payout filter that discounts same-wallet round trips, which [CryptoSlam applied after the fact](https://decrypt.co/91510/looksrare-has-reportedly-generated-8b-ethereum-nft-wash-trading) (an NFT sold and bought back by the same wallet within seven days counts as a wash trade).

## Summary

LooksRare, an Ethereum NFT marketplace, launched on 2022-01-10 according to [Decrypt (2022-01-28)](https://decrypt.co/91510/looksrare-has-reportedly-generated-8b-ethereum-nft-wash-trading). Its LOOKS token was airdropped to 185,000 wallets of eligible OpenSea users; LOOKS stakers receive a share of platform fees in WETH, and LOOKS is distributed daily to users who trade NFTs in select verified collections ([Decrypt, 2022-01-12](https://decrypt.co/90317/ethereum-nft-market-looksrare-wash-trading)). At $4.23 per token the daily giveaway was worth more than $12.1 million at the time of that report. Traders pay a 2% fee plus gas.

On 2022-01-12 Decrypt reported, from CryptoSlam's top-sales list, a Meebits NFT sold for about $50 million in WETH per sale between the same two wallets (about $100 million of volume in two transactions), and dozens of Loot and Meebits NFTs sold at about $3 million in WETH each in back-and-forth trades. The average Meebits sale on OpenSea the prior week was about 4.1 ETH, and Loot under 2.2 ETH. Meebits and Loot charge no creator royalties. Dune showed LooksRare Ethereum volume of $377 million so far that day after $325 million the day before, against OpenSea's $176 million the previous day ([Decrypt, 2022-01-12](https://decrypt.co/90317/ethereum-nft-market-looksrare-wash-trading)).

LooksRare made no official statement; it retweeted a post by an apparent seed investor saying the wash trading was happening "by design... probably", and Decrypt's request for comment went unanswered ([Decrypt, 2022-01-12](https://decrypt.co/90317/ethereum-nft-market-looksrare-wash-trading)). CryptoSlam's CEO said it was not removing transactions in the short term. By 2022-01-28 CryptoSlam had removed wash trades from its totals and reported them per collection: Meebits $4.4 billion, Terraforms $2.9 billion, Loot $705 million, CryptoPhunks $251 million, other projects $62 million ([Decrypt, 2022-01-28](https://decrypt.co/91510/looksrare-has-reportedly-generated-8b-ethereum-nft-wash-trading)).

## Timeline (UTC)

Stages: **entry** (reward design) → **preparation** (airdrop and reward launch) → **execution** (self-trades) → **funds** (LOOKS rewards; no on-chain trace by OAK) → **response**. Sources give dates only, no times.

| When | What happened | OAK |
|---|---|---|
| 2022-01-10 | LooksRare launches; LOOKS rewards for trading NFTs in select collections are live ([Decrypt, 01-28](https://decrypt.co/91510/looksrare-has-reportedly-generated-8b-ethereum-nft-wash-trading)) | **T12.001** (surface) |
| Early after launch | Same-wallet round trips of Meebits and Loot at tens of millions of dollars per sale ([Decrypt, 01-12](https://decrypt.co/90317/ethereum-nft-market-looksrare-wash-trading)) | **T12.001** |
| 2022-01-11/12 | Dune shows $325M then $377M daily LooksRare volume, above OpenSea's ([Decrypt, 01-12](https://decrypt.co/90317/ethereum-nft-market-looksrare-wash-trading)) | **T12.001** |
| Rewards earned | LOOKS paid on the washed volume; recipient wallets and onward movement undisclosed in the opened pages | — |
| 2022-01-12 | CryptoSlam says it is monitoring and will not remove transactions short term; LooksRare retweets an investor's "by design... probably" remark | response |
| 2022-01-28 | CryptoSlam removes wash trades from totals; reports more than $8.3B of more than $9.5B volume | response |

Key addresses: undisclosed; none of the opened pages prints a wash-trading address or transaction hash.

## Root-cause evidence

- **Technique:** OAK-T12.001
- **Source:** <https://decrypt.co/90317/ethereum-nft-market-looksrare-wash-trading>; <https://decrypt.co/91510/looksrare-has-reportedly-generated-8b-ethereum-nft-wash-trading>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** Decrypt describes the reward mechanism and the incentive to self-trade, and relays CryptoSlam's and Dune's figures. The $8.3 billion and 87% figures are CryptoSlam's estimate combined with Dune's volume by Decrypt (Decrypt says that if both sources are accurate the share is about 87%), not an OAK-verified count. No on-chain trace of reward recipients is public in these pages.

## Public references

- Decrypt, "Hot Ethereum NFT Platform LooksRare Is Rife With Wash Trading—And OK With It" (2022-01-12): <https://decrypt.co/90317/ethereum-nft-market-looksrare-wash-trading>
- Decrypt, "LooksRare Has Reportedly Generated $8B in Ethereum NFT Wash Trading" (2022-01-28): <https://decrypt.co/91510/looksrare-has-reportedly-generated-8b-ethereum-nft-wash-trading>
