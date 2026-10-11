# LooksRare wash-trading launch incentive — Ethereum — 2022-01-10 onward

**Loss:** unquantified in extraction terms; the LOOKS trading-reward mechanism produced incentivised wash trading that inflated the platform's reported volume above OpenSea's within days of launch. The harm is market-information-integrity erosion: wash-traded volume was reported as genuine trading activity.

**OAK Techniques observed:** **OAK-T12.001** (NFT Wash Trading — primary; LOOKS rewards paid for volume that was self-dealing). **OAK-T3.002** (Wash-Trade Volume Inflation — structurally co-occurring). **OAK-T2.001** (Single-Sided Liquidity Plant — structurally adjacent; unverified in the cited sources and retained only as the original mapping).

**Attribution:** **unattributed**. LooksRare distributed LOOKS rewards based on a percentage of each day's total sales; the incentive was public and the wash trading was the rational economic response. LooksRare did not comment directly, but retweeted a seed investor's remark that the wash trading was happening "by design... probably" `[decryptlooks1]`.
**Corrected 2026-10-11:** removed unsourced figures (95%+ wash share, named analyst reports, #2 ranking, CryptoSlam exclusion, airdrop threshold, Blur/X2Y2 2023 dates) and replaced them with Decrypt-sourced figures.

**Key teaching point:** **A token-reward mechanism that distributes rewards proportional to nominal trading volume, without a wash-trading exclusion filter, structurally produces wash-trading volume.** It is a mechanism-design property, not an attacker-behaviour property.

## Summary

LooksRare launched in January 2022 as an OpenSea competitor with a LOOKS token. Traders earned LOOKS for trading NFTs, and LOOKS stakers received WETH from daily platform fees; about 185,000 eligible OpenSea wallets received an airdrop `[decryptlooks1]`. Over \$12.1M of LOOKS was distributed daily at \$4.23 per token at the time of reporting `[decryptlooks1]`.

Decrypt (2022-01-12) observed back-and-forth trades using CryptoSlam sales data: a Meebits NFT sold for about \$50M in WETH in each of two trades, and dozens of Loot and Meebits sales were about \$3M in WETH each, against OpenSea averages of about 4.1 ETH for Meebits and under 2.2 ETH for Loot. Dune showed LooksRare at \$377M volume that day after \$325M the day before, above OpenSea's `[decryptlooks1]`. CryptoSlam said it was monitoring the activity `[decryptlooks1]`.

By 2022-01-28 Decrypt reported more than \$9.5B total Ethereum volume since launch (Dune) and more than \$8.3B of wash trading identified by CryptoSlam, about 87% of volume `[decryptlooks2]`. The mechanism: users wash-traded between their own wallets at inflated prices to earn more LOOKS than the 2% marketplace fee plus gas `[decryptlooks2]`.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2022-01 (launch) | LooksRare launches; LOOKS airdrop and trading rewards go live `[decryptlooks1]` | **T12.001 surface created** |
| 2022-01-11/12 | Reported volume (\$325M, then \$377M) exceeds OpenSea's; round-trip multi-million-dollar trades flagged `[decryptlooks1]` | **T3.002 execution** |
| 2022-01-28 | CryptoSlam identifies over \$8.3B of wash trading of over \$9.5B volume `[decryptlooks2]` | (analyst response) |

## What defenders observed

- Volume-proportional token rewards without wash-trading exclusion predictably produce wash trading; the contracts functioned as designed.
- Wash volume contaminates market-information surfaces: LooksRare's reported volume exceeded OpenSea's while organic activity was far smaller `[decryptlooks1]`.
- Detection came from third-party analytics (Dune, CryptoSlam), not from the marketplace `[decryptlooks2]`.

## Public references

- `[decryptlooks1]` — Decrypt, "Hot Ethereum NFT Platform LooksRare Is Rife With Wash Trading—And OK With It" (2022-01-12): <https://decrypt.co/90317/ethereum-nft-market-looksrare-wash-trading>
- `[decryptlooks2]` — Decrypt, "LooksRare Has Reportedly Generated \$8B in Ethereum NFT Wash Trading" (2022-01-28): <https://decrypt.co/91510/looksrare-has-reportedly-generated-8b-ethereum-nft-wash-trading>
