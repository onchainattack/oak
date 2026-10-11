# MakerDAO Black Thursday liquidation-cascade zero-bid auctions — Ethereum — 2020-03-12

**Loss:** MakerDAO's collateral auctions left the system undercollateralised by an estimated 6.65M DAI per the post-mortem `[ctpostmortem]`; contemporaneous reports gave at least \$4.5M of DAI left unbacked `[decrypt1]``[glassnode]`. Under-collateralised vault owners received nothing from the zero-bid auctions `[decrypt1]`. A single bidder won nearly 62,843 ETH for virtually zero DAI across 1,461 auctions `[ctpostmortem]`. The loss was a *liquidation-mechanism-failure* loss, not an *attacker-extraction* loss. The shortfall was recapitalised through MKR debt auctions that raised over 5M DAI `[ctpostmortem]`; the sources cited here do not show that vault owners were compensated.
**OAK Techniques observed:** **OAK-T17.002** (Liquidation-Cascade Engineering — primary; the mass liquidation of vaults during the ETH price crash, combined with Ethereum network congestion that kept keepers from bidding, converted a market-wide drawdown into zero-bid auction settlements). The case is **not T9** — there is no smart-contract exploit; the auction contracts executed as designed, but the design assumed keepers would always bid. The case is **not T14** — the congestion was organic transaction demand during the crash.
**Attribution:** **unattributed** (systemic mechanism failure — no adversarial threat-actor cluster). The bidder who won the zero-bid auctions was operating within the auction rules as written `[ctpostmortem]`.
**Key teaching point:** **a liquidation mechanism whose auctions can be won by a lone bidder at zero DAI when network congestion keeps competing keepers out will fail under combined price-crash + congestion conditions.** MakerDAO's March 2020 experience is the canonical case for why liquidation-mechanism design must consider tail conditions (price crash, network congestion, keeper unavailability) as a coupled failure mode.

**Corrected 2026-10-11:** Loss figure replaced (\$4.5M-\$8M was unsupported; sources give at least \$4.5M to 6.65M DAI of system shortfall); removed the ~1,200-vault count (not found in fetched sources), the claim that governance voted to compensate vault holders (sources only report community calls for compensation), the dated "Liquidations 2.0 / Dutch auction" row and unsourced gas-price and keeper-behaviour specifics.

## Summary

On 2020-03-12, "Black Thursday", ETH fell by roughly half within a short span `[decrypt1]``[ctpostmortem]`. Many Maker vaults fell below the required collateral ratio and were liquidated `[decrypt1]`. Ethereum congestion pushed gas prices to extremes, discouraging keepers from participating in the collateral auctions, and "a single clever keeper" bought collateral at \$0 `[decrypt1]`. The post-mortem reports that one bidder won nearly 62,843 ETH for virtually zero DAI across 1,461 auctions, leaving Maker undercollateralised by an estimated 6.65M DAI `[ctpostmortem]`.

Maker responded by halting liquidations via governance, adjusting auction parameters and adding USDC as a collateral type `[ctpostmortem]`; USDC vaults were proposed on 2020-03-16 `[decrypt1]`. The shortfall was recapitalised through MKR debt auctions raising over 5M DAI, with Paradigm Capital winning 68% of the auctioned MKR `[ctpostmortem]`. Community members called for compensating liquidated vault owners as an "act of good faith", but contemporaneous coverage called it unclear whether more MKR would be minted to do so `[glassnode]`.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2020-03-12 | ETH falls by about half; vault liquidations cascade; Ethereum congestion deters keeper bids | (cascade) |
| 2020-03-12 to 2020-03-13 | One bidder wins ~62,843 ETH at near-zero DAI across 1,461 auctions | **T17.002 zero-bid settlement** |
| 2020-03-16 | Maker proposes accepting USDC as collateral | (emergency measure) |
| 2020-03 to 2020-04 | MKR debt auctions raise over 5M DAI | (recapitalisation) |
| 2020-04-29 | Post-mortem by "MakerMan" published; recommends safeguards | (post-mortem) |

## What defenders observed

- **Pre-event (mechanism design):** the English-style collateral auctions assumed keeper competition would drive the winning bid toward market value; the post-mortem's recommended safeguards (restart auctions with fewer than three bids or two unique bidders, cap lots at 50 ETH, add a liquidation dashboard) target that assumption `[ctpostmortem]`.
- **At-event:** congestion disabled keeper competition and zero-bid wins were visible on-chain; governance could halt the auction system and liquidations, which the team did `[ctpostmortem]`.
- **Post-event:** recapitalisation via MKR debt auctions diluted MKR holders `[glassnode]`. Whether vault owners were ever made whole is not established by the sources cited here.

## What this example tells contributors writing future Technique pages

- **T17.002 has a mechanism-design sub-pattern distinct from the deliberate-attacker sub-pattern.** Black Thursday emerged from market conditions, network conditions and auction-design assumptions, with no attacker constructing the cascade.
- **Auction safeguards are the structural mitigation:** longer auction duration, a minimum number of bidders, capped lot sizes and bidder interfaces were the responses reported at the time `[ctpostmortem]``[decrypt1]`.
- **Recovery cost fell on MKR holders through dilution** `[glassnode]`, while vault owners who were liquidated at zero bids absorbed the loss unless later compensated.

## Public references

- `[ctpostmortem]` — Cointelegraph, "Maker debt crisis post-mortem recommends new safeguards" (2020-04-29): <https://cointelegraph.com/news/maker-debt-crisis-post-mortem-recommends-new-safeguards>
- `[glassnode]` — Glassnode, "What Really Happened To MakerDAO?" (2020-03): <https://research.glassnode.com/what-really-happened-to-makerdao>
- `[decrypt1]` — Decrypt, "MakerDAO: What went wrong and how it was fixed" (2020-03): <https://decrypt.co/23027/makerdao-what-went-wrong-and-how-it-was-fixed>

## Discussion

MakerDAO Black Thursday (2020-03-12) is the canonical 2020 anchor for the **mechanism-design-failure-driven** sub-pattern of T17.002 (Liquidation-Cascade Engineering). The case demonstrates that a liquidation cascade does not require an adversary — the cascade can emerge from the interaction of market conditions, network conditions, and auction-design assumptions — and that the defender-side mitigations discussed in the post-mortem (longer auctions, restarting auctions with too few bidders, capped lot sizes, bidder interfaces) generalise across both the mechanism-failure and deliberate-attacker sub-patterns.

The case is structurally distinct from the 2022-06 stETH depeg cascade (`examples/2022-06-lido-steth-depeg.md`) which is T17.002's *market-structure-driven* anchor: stETH was a deliberate depeg event propagated through Aave and Compound lending markets; MakerDAO March 2020 was a systemic-condition-driven cascade with no adversary. Together they bracket the T17.002 Technique and demonstrate that the same defender-observable artefact — cascading liquidations propagating through lending-market architecture — can originate from fundamentally different upstream causes. Contributors writing T17.002 mitigation guidance should treat both sub-patterns as first-class detection surfaces.

For OAK's broader T17 coverage, the MakerDAO case + the stETH case (2022-06) + the BonqDAO case (2023-02) collectively populate the T17.002 cohort across the 2020–2023 window: MakerDAO anchors the mechanism-failure sub-pattern at the protocol-design layer, stETH anchors the market-structure sub-pattern at the cross-protocol lending layer, and BonqDAO anchors the oracle-driven sub-pattern at the price-feed layer. The cohort framing is structurally complete for v0.1.
