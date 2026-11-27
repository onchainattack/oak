# Big Daddy Ape Club — NFT mint proceeds taken and no NFTs delivered after a Civic-verified founder launch — Solana — 2022-01-11

**Loss:** 9,136 SOL, about \$1.3M at the time, sent by collectors to mint Big Daddy Ape Club (BDAC) NFTs; no NFTs were delivered, per [Decrypt](https://decrypt.co/90833/solana-nft-project-rug-pull-big-daddy-ape-civic). No recovery is reported there.

**OAK Techniques observed:** none — the opened page describes a mint that took payment and delivered nothing, with no contract exploit, liquidity pool or renounced-authority mechanism, so no Technique page matches. **OAK-T7.002** (CEX Deposit Layering: Decrypt reports, via researcher Mert, that some funds went to Binance accounts).

**Attribution:** **pseudonymous**. [Decrypt](https://decrypt.co/90833/solana-nft-project-rug-pull-big-daddy-ape-civic) does not name the founder; Civic says the identity of the person who held themselves out as the founder was verified and that it is cooperating with law enforcement.

**Key teaching point:** **A verified founder identity does not protect mint buyers; only a payment path that releases funds against delivery would.** Civic's CEO told Decrypt that Civic does not endorse projects in its program, and Solanart said the project was approved by Civic verification but "decided to scam anyway" (both per Decrypt).

## Summary

BDAC was billed as 2,222 ape-themed NFTs on Solana, to be listed on Solanart. Per [Decrypt](https://decrypt.co/90833/solana-nft-project-rug-pull-big-daddy-ape-civic) (2022-01-20), victims said the Discord was locked a few hours before the mint on January 11, 2022, they received no NFTs after sending SOL, and the Twitter account, Discord and website then went dark. Digital artist Faith Orr said: "This is an especially brutal move on their part." Solanart said it was deleting the collection from its grid. Researcher Mert called it the largest NFT rug pull he had tracked and tracked the scammer's Solana wallet; Decrypt prints no wallet addresses.

## Timeline (UTC)

Decrypt gives dates only; times of day and transaction hashes are undisclosed.

| When | What happened | OAK |
|---|---|---|
| 2021-12-22 | Civic announces BDAC as "Verified by Civic Pass": control of Twitter handle and domain, and founder ID capture with a 3D face scan ([Decrypt](https://decrypt.co/90833/solana-nft-project-rug-pull-big-daddy-ape-civic)) | none (entry) |
| 2022-01-11, hours before mint (time undisclosed) | Discord locked ([Decrypt](https://decrypt.co/90833/solana-nft-project-rug-pull-big-daddy-ape-civic)) | none (preparation) |
| 2022-01-11 | Mint: collectors send 9,136 SOL in total and receive no NFTs; Twitter, Discord and website go dark ([Decrypt](https://decrypt.co/90833/solana-nft-project-rug-pull-big-daddy-ape-civic)) | none (execution) |
| After the mint (undisclosed) | Some funds sent to Binance accounts, which Binance reportedly blocked after a report ([Decrypt](https://decrypt.co/90833/solana-nft-project-rug-pull-big-daddy-ape-civic)); the rest undisclosed | T7.002 |
| After the mint (undisclosed) | Solanart deletes the collection; Binance says it is investigating; Civic says it is cooperating with law enforcement ([Decrypt](https://decrypt.co/90833/solana-nft-project-rug-pull-big-daddy-ape-civic)) | response |

Key addresses: none printed in full on an opened page (undisclosed).

## Root-cause evidence

- **Technique:** OAK-T7.002 (only the laundering step matches a Technique; the root cause has none)
- **Source:** <https://decrypt.co/90833/solana-nft-project-rug-pull-big-daddy-ape-civic>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** Decrypt relays victim accounts, Solanart, Civic, Binance and researcher statements. No on-chain trace of the proceeds was opened, so the destination of most funds is not established.

## Public references

- Decrypt, "Solana NFT Project Rug Pulls Investors for $1.3M—Despite Civic 'Verification'" (2022-01-20): <https://decrypt.co/90833/solana-nft-project-rug-pull-big-daddy-ape-civic>
