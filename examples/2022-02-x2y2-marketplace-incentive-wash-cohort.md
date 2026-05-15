# X2Y2 marketplace-incentive wash-trade cohort — Ethereum — 2022-02-15 onward

**Loss:** unquantified in direct-extraction terms; the failure mode is **price-discovery-distortion** via token-reward-driven wash trading that inflated the platform's reported trading volume. X2Y2's X2Y2 token launch distributed trading rewards proportional to nominal trading volume with no wash-trading exclusion, producing a structurally-incentivised wash-trade cohort within days of launch. Public on-chain forensic analysis reported wash-trade rates for X2Y2 in the multi-tens-of-percent range during peak incentive windows in 2022, comparable in mechanism to the LooksRare launch wash wave of January 2022.

**OAK Techniques observed:** **OAK-T12.001** (NFT Wash-Trade Volume Inflation) — primary; the X2Y2 token-reward mechanism paid wash traders in X2Y2 tokens for volume that was self-dealing, producing inflated volume metrics on the marketplace's own leaderboard and on third-party data-aggregator dashboards. The **marketplace-incentive-driven wash sub-motivation** (explicitly named in the T12.001 technique page) is the dominant operator goal — wash traders farmed X2Y2 token rewards rather than targeting a third-party-buyer exit. **OAK-T3.002** (Wash-Trade Volume Inflation — structurally adjacent; the same token-reward-incentive wash-farming pattern as the fungible-token analogue).

**Attribution:** **unattributed** X2Y2's X2Y2 token launch distributed trading rewards proportional to nominal trading volume, structurally parallel to LooksRare's LOOKS launch the preceding month. The reward mechanism was public and specified in the X2Y2 token documentation; the resulting wash-trading wave was the rational economic response to the specified incentive structure.

**Cohort framing:** this is a **cohort case** — marketplace-incentive-driven wash trading during the X2Y2 launch and subsequent incentive windows was conducted by a population of operators in parallel. The cohort case captures the token-reward-mechanism-design pattern that recurs across the 2022 NFT marketplace launch cohort (LooksRare, X2Y2, and subsequently Blur in 2023).

**Key teaching point:** **The X2Y2 launch — occurring one month after the LooksRare launch — demonstrates that the token-reward-driven wash-trade pattern is a structural feature of NFT marketplace launch tokenomics with volume-proportional rewards and no wash-trading exclusion, not a one-off consequence of a particular launch design.** Any NFT marketplace that distributes token rewards proportional to nominal trading volume without a per-cluster wash-trade-rate exclusion filter structurally produces incentive-driven wash trading. The recurrence across LooksRare (January 2022), X2Y2 (February 2022), and Blur (January–February 2023) across three different teams, three different tokens, and three different reward formulas confirms that the wash-trading outcome is mechanism-design-determined, not operator-behaviour-determined.

## Summary

X2Y2 launched on February 15, 2022 as an Ethereum NFT marketplace positioned as a community-governed alternative to OpenSea, with a stated commitment to lower fees and enforced creator royalties (a positioning that distinguished it from LooksRare's royalty-optional model). The launch strategy combined:

1. **X2Y2 token airdrop to OpenSea users** — any wallet that had traded on OpenSea in the preceding period was eligible for an X2Y2 airdrop, creating a built-in initial user base (structurally parallel to LooksRare's OpenSea-user airdrop of January 2022).

2. **Trading-reward emissions** — X2Y2 tokens were distributed to NFT traders proportional to their trading volume on the platform. The reward formula paid X2Y2 tokens per unit of trading volume (in ETH), and the market value of the X2Y2 reward typically exceeded the platform's trading fee — making wash trading net-profitable at the transaction level.

3. **Staking mechanism** — X2Y2 holders could stake their tokens to earn a share of platform trading-fee revenue (in WETH), creating buy-pressure for the X2Y2 token and a secondary incentive to accumulate X2Y2 through wash-trading reward farming.

The wash-trading surface was structurally identical to LooksRare: a trader who paid the platform fee on a self-trade (wash trade) would receive X2Y2 tokens whose market value exceeded the fee paid, netting a profit. The wash-trading loop was: list an NFT at an inflated price, self-purchase via a separate wallet, pay the platform fee, receive X2Y2 rewards worth more than the fee, sell the X2Y2 rewards on the open market, repeat.

On-chain forensic providers (Hildobby Dune dashboards, NFTGo wash-trade reports, CryptoSlam wash-trade indices) documented the wash-trading wave within days of X2Y2's launch. Per-platform wash-trade rate estimates placed X2Y2 in the multi-tens-of-percent range during peak incentive windows (comparable to the LooksRare wash-trade rates of the preceding month). Across the 2022 NFT marketplace launch cohort — LooksRare (January), X2Y2 (February), and Blur Season 1 (October 2022 onward) — the token-reward-driven wash-trade pattern was the dominant on-chain artefact for each launch.

Over 2022, the X2Y2 token declined from its post-launch peak as the wash-trading incentive waned and organic adoption did not sustain the platform at the post-launch volume level — the same incentive-resolution trajectory as LooksRare. The structural lesson, confirmed by the recurrence across three independent launches, is that volume-proportional token rewards without wash-trading exclusion predictably produce wash-trading volume — the wash-trading outcome is a mechanism-design property, not an incident.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-02-15 | X2Y2 launches; X2Y2 token airdrop + trading-reward emissions go live | **T12.001 surface created** |
| 2022-02-15 to 2022-02-20 | On-chain analysts identify wash-trading patterns in X2Y2 volume data; per-platform wash-trade rate estimates published by Hildobby, NFTGo, CryptoSlam | **T12.001 cohort observation phase** |
| 2022-Q1 to 2022-Q2 | X2Y2 token declines from post-launch peak; wash-trading incentive wanes as X2Y2 price falls; platform volume normalises toward organic adoption | (incentive-resolution) |
| 2022-10-19 | Blur launches as pro-trader Ethereum NFT marketplace with its own points-and-airdrop incentive mechanism | (class recurrence — Blur Season 1) |
| 2023-02-14 | Blur Season 1 BLUR airdrop crystallises the third instance of the token-reward-driven wash-trade pattern across the 2022–2023 NFT marketplace launch cohort | **T12.001 class recurrence confirmed** |

## Realised extraction

Unquantified in direct-extraction terms. The harm is market-information-integrity erosion: wash-traded volume was reported as genuine trading activity, misleading users, data aggregators, and token-price-discovery mechanisms about the platform's true organic adoption.

## Public references

- Hildobby / Dune Analytics — per-marketplace wash-trade rate analyses covering X2Y2 across the 2022 launch window.
- NFTGo wash-trade reports — per-collection and per-marketplace wash-trade metrics for 2022.
- CryptoSlam wash-trade indices — wash-adjusted volume exclusion for NFT marketplace reporting.
- Cross-reference: T12.001 at `techniques/T12.001-nft-wash-trade-volume-inflation.md`.
- Cross-reference: [`examples/2022-01-looksrare-wash-trading-launch.md`](2022-01-looksrare-wash-trading-launch.md) — LooksRare launch wash-trading wave (January 2022).
- Cross-reference: [`examples/2023-02-blur-airdrop-wash-cohort.md`](2023-02-blur-airdrop-wash-cohort.md) — Blur airdrop incentive-driven wash-trade cohort (2022–2024).

## Discussion

The X2Y2 launch is the second instance in the 2022 NFT marketplace launch cohort of the token-reward-driven wash-trade pattern. Occurring one month after LooksRare (January 2022) and structurally parallel in mechanism design, it confirms that the pattern is a mechanism-design property — not a one-off consequence of a particular launch design or a particular team's tokenomics.

The recurrence across three independent launches — LooksRare (January 2022, LOOKS token), X2Y2 (February 2022, X2Y2 token), and Blur (October 2022 onward, BLUR token/points) — establishes the mechanism-design determinism of the pattern. Each launch used a variant of volume-proportional token rewards, each experienced a wash-trading wave within days of launch, and each saw the wash-trading incentive wane as the token price declined. The structural regularity is sufficient that any NFT marketplace launch with volume-proportional token rewards and no wash-trading exclusion should be treated as a standing T12.001 surface at launch time — the wash-trading outcome is predictable from the mechanism design alone.

The defender lesson for NFT marketplace designers: the token-reward formula is the highest-leverage T12.001 mitigation surface. If the reward formula pays per unit of nominal trading volume without a per-cluster wash-trade-rate discount, the wash-trading outcome is mechanism-design-determined — the formula will attract wash traders who extract token rewards at the expense of marketplace-metric integrity. The LooksRare and X2Y2 post-launch trajectories (token decline, volume normalisation toward organic adoption) are the incentive-resolution path when the reward formula is not adjusted: the market prices the wash-trading incentive into the token, the token declines, and the wash-trading volume falls with the token price — a market-driven correction that destroys token-holder value in the process.
