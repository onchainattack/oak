# LooksRare / X2Y2 wash-trading reward-farming cohort — Ethereum — 2022

**Loss:** structural — NFT wash trading on LooksRare (from its January 2022 launch) and later on X2Y2 (volume surpassing OpenSea's from late July 2022) to farm token rewards. CryptoSlam identified more than \$8.3B of wash trading on LooksRare within about 18 days of launch, about 87% of its volume `[decryptlooks2]`. No aggregate cross-marketplace figure is established by the cited sources. The marketplace contracts functioned as designed; the failure was a token-incentive design that rewarded trading volume without checking whether it was genuine.

**OAK Techniques observed:** **OAK-T7.004** (NFT Wash Laundering — primary; NFTs cycled between controlled addresses to generate volume, with token rewards extracted). **OAK-T5.002** (Slow LP/Value Extraction — structurally adjacent reward-farming analogue).

**Attribution:** **pseudonymous**. Individual wash-trading clusters are visible on-chain; the cited sources name no individuals. The marketplaces' operators were not shown to be wash-trading participants.
**Corrected 2026-10-11:** removed the unsourced "\$18B+" figure and "80-95%" share, and fixed the X2Y2 mechanism (launched with staking-only rewards; wash trading followed fee reimbursement in X2Y2 tokens, per Delphi).

**Key teaching point:** **Marketplace token-incentive designs that reward trading volume (or reimburse fees in a token) without wash-trade detection convert the marketplace into a rail for synthetic-volume reward extraction.** The reward contract accepts the NFT transfer at face value.

## Summary

LooksRare launched in January 2022 paying LOOKS rewards for trading. Users wash-traded between their own wallets at inflated prices to earn more in LOOKS than they paid in the 2% fee and gas `[decryptlooks2]`. By 2022-01-28 CryptoSlam had identified over \$8.3B of wash trading out of over \$9.5B total volume (about 87%) `[decryptlooks2]`.

X2Y2 launched in February 2022 with a different design: trading volume earned no rewards, only staking X2Y2 did, and the team said it aimed to stop "trade mining" linked to wash trading `[theblockx2y2]`. Later, Delphi Digital reported that X2Y2 reimburses trading fees in its own token, which incentivised wash trades, and that X2Y2 volume regularly surpassed OpenSea's from late July 2022 mainly because of wash trading; two collections ("Dreadfulz" and "More Loot") accounted for 59% of its all-time volume `[delphix2y2]`.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2022-01 | LooksRare launches with LOOKS trading rewards `[decryptlooks1]` | **T7.004 surface deployment** |
| 2022-01-28 | CryptoSlam: over \$8.3B wash trading of over \$9.5B volume `[decryptlooks2]` | **T7.004 execution** |
| 2022-02-16 | X2Y2 live with staking-only rewards `[theblockx2y2]` | (design differs from LooksRare) |
| 2022-07 onward | X2Y2 volume regularly exceeds OpenSea's, mainly wash trading `[delphix2y2]` | **T7.004 extension** |

## What defenders observed

- Reward or fee-reimbursement designs that pay per unit of volume are wash-trading surfaces by construction.
- Detection lived in third-party analytics (Dune, CryptoSlam) rather than in the marketplace contracts `[decryptlooks2]`.

## Public references

- `[decryptlooks1]` — Decrypt, "Hot Ethereum NFT Platform LooksRare Is Rife With Wash Trading—And OK With It" (2022-01-12): <https://decrypt.co/90317/ethereum-nft-market-looksrare-wash-trading>
- `[decryptlooks2]` — Decrypt, "LooksRare Has Reportedly Generated \$8B in Ethereum NFT Wash Trading" (2022-01-28): <https://decrypt.co/91510/looksrare-has-reportedly-generated-8b-ethereum-nft-wash-trading>
- `[theblockx2y2]` — The Block, "Another NFT marketplace, x2y2, begins vampire attack on OpenSea" (2022-02-16): <https://www.theblock.co/post/134450/another-nft-marketplace-x2y2-begins-vampire-attack-on-opensea>
- `[delphix2y2]` — Delphi Digital, "X2Y2 Volume Surges Despite Downturn Due To Wash Trading" (2022-09-22): <https://members.delphidigital.io/reports/x2y2-volume-surges-despite-downturn-due-to-wash-trading>
- Cross-reference: T7.004 at `techniques/T7.004-nft-wash-laundering.md`; T5.002 at `techniques/T5.002-slow-lp-trickle-value-extraction.md`.
