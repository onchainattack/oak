# X2Y2 marketplace-incentive wash-trade cohort — Ethereum — 2022-02 onward

**Loss:** unquantified in direct-extraction terms; the failure mode is price-discovery distortion via token-incentive-driven wash trading. Delphi Digital reported that X2Y2 volume regularly surpassed OpenSea's from late July 2022, mainly due to wash trading `[delphix2y2]`.

**OAK Techniques observed:** **OAK-T12.001** (NFT Wash-Trade Volume Inflation) — primary; traders were incentivised to trade because X2Y2 reimbursed trading fees in its own token `[delphix2y2]`. **OAK-T3.002** (Wash-Trade Volume Inflation — structurally adjacent).

**Attribution:** **unattributed**. The incentive was public; the wash trading was the rational economic response.
**Corrected 2026-10-11:** the file claimed X2Y2 launched on 2022-02-15 with volume-proportional trading rewards and an immediate wash wave; sources show it launched with staking-only rewards (no trading rewards), with wash trading documented later (from about July 2022) via fee reimbursement. Unsourced wash-rate claims, named analyst reports and the "airdrop to OpenSea users" parallel to LooksRare were removed or restated.

**Cohort framing:** a cohort case — wash trading on X2Y2 was conducted by a population of operators in parallel, after the similar LooksRare episode (see `examples/2022-01-looksrare-wash-trading-launch.md`).

**Key teaching point:** **Token incentives tied to trading activity — whether volume rewards or fee reimbursements — produce wash trading unless the formula discounts it.** X2Y2 shows the pattern can emerge even after a launch design that explicitly rejected "trade mining" `[theblockx2y2]`.

## Summary

X2Y2 went live around 2022-02-16 as an OpenSea competitor. The Block reported that every wallet that traded on OpenSea before January 2022 (861,417 wallets) qualified for the airdrop, that trading volume earned no rewards, that rewards came only from staking X2Y2 (650 million tokens, 65% of supply, reserved for staking rewards), and that the team aimed to stop "trade mining", which it linked to wash trading. The fee was 2% `[theblockx2y2]`.

By September 2022 Delphi Digital reported that X2Y2 regularly surpassed OpenSea in volume since late July, mainly due to wash trading. X2Y2 reimbursed trading fees in its token, which incentivised wash trades; its fee was 0.5% versus OpenSea's 2.5% and LooksRare's 2%; and two collections known for wash trading ("Dreadfulz" and "More Loot") made up 59% of all-time volume `[delphix2y2]`.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2022-02-16 | X2Y2 live; staking-only rewards, airdrop to 861,417 OpenSea wallets `[theblockx2y2]` | (surface created) |
| 2022-07 (late) onward | X2Y2 volume regularly surpasses OpenSea's, mainly via wash trading `[delphix2y2]` | **T12.001 cohort observation** |

## Realised extraction

Unquantified. The harm is market-information integrity: wash-traded volume presented as genuine activity.

## Public references

- `[theblockx2y2]` — The Block, "Another NFT marketplace, x2y2, begins vampire attack on OpenSea" (2022-02-16): <https://www.theblock.co/post/134450/another-nft-marketplace-x2y2-begins-vampire-attack-on-opensea>
- `[delphix2y2]` — Delphi Digital, "X2Y2 Volume Surges Despite Downturn Due To Wash Trading" (2022-09-22): <https://members.delphidigital.io/reports/x2y2-volume-surges-despite-downturn-due-to-wash-trading>
- Cross-reference: [`examples/2022-01-looksrare-wash-trading-launch.md`](2022-01-looksrare-wash-trading-launch.md).
