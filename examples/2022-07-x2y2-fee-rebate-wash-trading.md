# X2Y2 — trading fees reimbursed in the X2Y2 token, followed by wash-driven volume above OpenSea — X2Y2 / Ethereum — 2022-07

**Loss:** No theft. The harm is market-information integrity: [Delphi Digital](https://members.delphidigital.io/reports/x2y2-volume-surges-despite-downturn-due-to-wash-trading) (2022-09-22) reports X2Y2 regularly surpassed OpenSea in volume since late July 2022, mainly because of wash trading. No dollar figure for wash volume is given in the pages OAK opened.

**OAK Techniques observed:** **OAK-T12.001** (NFT Wash-Trade Volume Inflation, *primary*). Delphi says X2Y2 reimburses trading fees in its token, which incentivises trading for token rewards, and that two collections known for wash trading made up 59% of all-time volume. See [`techniques/T12.001-nft-wash-trade-volume-inflation.md`](../techniques/T12.001-nft-wash-trade-volume-inflation.md). The fungible-token volume-inflation Technique was rejected: these are NFT marketplace sales, not DEX swaps.

**Attribution:** **unattributed.** No opened page names a participant.

**Key teaching point:** **A fee reimbursement paid in a token makes trading cheaper or free, so volume-for-reward farming does not need a trading-reward program.** X2Y2 launched with [staking-only rewards and a stated aim to end trade mining](https://www.theblock.co/post/134450/another-nft-marketplace-x2y2-begins-vampire-attack-on-opensea), yet the later fee reimbursement was the incentive Delphi names. The control is a reimbursement formula that excludes same-wallet and circular trades.

## Summary

[The Block (2022-02-16)](https://www.theblock.co/post/134450/another-nft-marketplace-x2y2-begins-vampire-attack-on-opensea) reported that X2Y2 airdropped 120 million tokens (12% of supply) to OpenSea users, all 861,417 wallets that traded on OpenSea before January 2022; that trading volume earned no rewards, only staking X2Y2 did (650 million tokens, 65% of supply, earmarked for staking rewards); that the fee was 2%; and that the team said limiting rewards to staking would eliminate trade mining, which it linked to wash trading.

[Delphi Digital (2022-09-22)](https://members.delphidigital.io/reports/x2y2-volume-surges-despite-downturn-due-to-wash-trading) reported that since late July X2Y2 had regularly surpassed OpenSea in volume, mainly because of wash trading; that X2Y2 reimburses trading fees in X2Y2 tokens; that its fee is 0.5% against OpenSea's 2.5% and LooksRare's 2%; that X2Y2 made royalties optional on certain purchases; and that "Dreadfulz" and "More Loot" are notorious for wash trading and together account for 59% of X2Y2's all-time volume. The LooksRare precedent is in [`2022-01-looksrare-wash-trading-launch.md`](2022-01-looksrare-wash-trading-launch.md).

## Timeline (UTC)

Stages: **entry** (reward design) → **preparation** (launch) → **execution** (wash volume) → **funds** (token rewards; undisclosed) → **response**. Sources give dates only.

| When | What happened | OAK |
|---|---|---|
| 2022-02-16 | X2Y2 goes live as an OpenSea competitor with airdrop and staking-only rewards ([The Block](https://www.theblock.co/post/134450/another-nft-marketplace-x2y2-begins-vampire-attack-on-opensea)) | — |
| Before 2022-09-22 (start undisclosed) | Fees reimbursed in X2Y2 token ([Delphi](https://members.delphidigital.io/reports/x2y2-volume-surges-despite-downturn-due-to-wash-trading)) | **T12.001** (incentive) |
| From late 2022-07 | X2Y2 volume regularly exceeds OpenSea's, mainly wash trading ([Delphi](https://members.delphidigital.io/reports/x2y2-volume-surges-despite-downturn-due-to-wash-trading)) | **T12.001** |
| Rewards earned | Recipients and onward movement undisclosed | — |
| Response | No X2Y2 response in the opened pages; undisclosed | — |

Key addresses: undisclosed; no opened page prints a wash-trading address or transaction hash.

## Root-cause evidence

- **Technique:** OAK-T12.001
- **Source:** <https://members.delphidigital.io/reports/x2y2-volume-surges-despite-downturn-due-to-wash-trading>; <https://www.theblock.co/post/134450/another-nft-marketplace-x2y2-begins-vampire-attack-on-opensea>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** Delphi (a research firm, not a forensic firm) states the wash-trading conclusion and the fee-reimbursement incentive; the method behind the wash-trading conclusion and the 59% figure was not visible in the page OAK read. The Block supplies the launch design.

## Public references

- The Block, "Another NFT marketplace, x2y2, begins vampire attack on OpenSea" (2022-02-16): <https://www.theblock.co/post/134450/another-nft-marketplace-x2y2-begins-vampire-attack-on-opensea>
- Delphi Digital, "X2Y2 Volume Surges Despite Downturn Due To Wash Trading" (2022-09-22): <https://members.delphidigital.io/reports/x2y2-volume-surges-despite-downturn-due-to-wash-trading>
