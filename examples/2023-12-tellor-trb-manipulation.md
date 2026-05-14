# Tellor (TRB) spot-perpetual manipulation and liquidation cascade — Ethereum / CEX — 2023-12-31

**Loss:** approximately **$68 million** in perpetual-futures liquidations across Binance, OKX, Bybit, and other venues on 2023-12-31, per CoinGlass data. Synthetix stakers suffered an additional ~$2M in losses due to a TRB-denominated open-interest cap that expanded ~50× (from $250K to $12.5M) as TRB's spot price rose, per founder Kain Warwick. The liquidation total was the highest of any crypto derivative contract in the 24-hour window.

**OAK Techniques observed:** **OAK-T17.001** (Cross-Venue Arbitrage-Driven Price-Discovery Distortion — primary; a cluster of ~20 whale wallets accumulated TRB at ~$15 in August–September 2023, then executed a coordinated spot-market pump on December 31 driving TRB from ~$213 to $619 in ~8 hours, creating a dislocation between spot and perpetual-futures prices with no arbitrage mechanism to close the gap) + **OAK-T17.002** (Liquidation Cascade Engineering — the subsequent crash from $619 to $136 in ~1 hour triggered $68M in cascading perpetual-futures liquidations; the whale cluster's gradual exchange-deposit programme across the preceding two months positioned them to profit from both the pump and the liquidation cascade) + **OAK-T8.001** (Common-Funder Cluster Reuse — the 20-whale-wallet cluster was identified by Spot On Chain as having accumulated TRB at a common $15 cost basis in August–September 2023, then executing a coordinated deposit-to-exchanges programme across October–December 2023; the funder-graph clustering is the load-bearing attribution signal).

**Attribution:** **pseudonymous** — the 20-whale-wallet cluster was identified on-chain by Spot On Chain and Lookonchain but not linked to named individuals at v0.1. The Tellor team transferred ~4,211 TRB (~$2.4M) to a Coinbase wallet as the price spiked, raising questions about team involvement, but no public attribution to the team as the orchestrator of the manipulation has been established. The case sits in the pseudonymous-attribution category with strong on-chain cluster evidence.

**Key teaching point:** TRB Dec 2023 is the canonical pre-2025 anchor for the **spot-perpetual dislocation + liquidation cascade** sub-pattern of T17. The manipulator cluster executed a three-phase operation: (1) accumulation at low cost basis (~$15), (2) gradual exchange deposit over months to position for the exit, and (3) a coordinated spot-market pump on a single day that created a spot-perpetual dislocation — the spot price at $600+ vs. perpetual-futures prices that lagged — triggering cascading short-liquidations as the pump proceeded, then cascading long-liquidations as the crash followed. The structural lesson is that **low-float, high-exchange-concentration tokens are T17.001-exposed by construction**: with ~1.7M of 2.5M circulating TRB on exchanges, the available float for price discovery was thin enough for a coordinated whale cluster to dominate both the spot and perpetual order books.

## Summary

Tellor (TRB) is an Ethereum-based oracle protocol whose native token serves as a staking and dispute-resolution asset for the Tellor oracle network. As of December 2023, TRB had a circulating supply of approximately 2.5M tokens and was listed on major exchanges including Binance, OKX, and Bybit. Approximately 1.7M TRB (~68% of circulating supply) sat on exchange wallets, making the token's available trading float unusually concentrated.

In August and September 2023, a cluster of approximately 20 whale wallets accumulated TRB at a cost basis of approximately $15 per token. Over October through December 2023, these wallets executed a gradual deposit-to-exchanges programme, positioning their holdings to be liquid on exchange order books while avoiding the price impact of a single large deposit.

On December 31, 2023, the whale cluster executed a coordinated spot-market pump. TRB's price rose from approximately $213 to an all-time high of approximately $619 in roughly 8 hours — a ~172% intraday move. The spot price dislocation against perpetual-futures prices was the load-bearing manipulation surface: as the spot price detached from perpetual marks, the dislocation created a no-arbitrage condition where the usual arbitrageur flow (buy spot, short perp, or vice versa) could not re-anchor the spread. The Synthetix perpetuals market exacerbated the condition because its open-interest cap was denominated in TRB tokens rather than notional USD value — as TRB's price soared, the OI cap expanded approximately 50× from $250K to $12.5M, allowing outsized short positions to accumulate at dislocated prices.

At approximately the peak ($619), the whale cluster began selling. TRB crashed from $619 to approximately $136 in roughly one hour — a ~78% intra-hour decline. The crash triggered cascading liquidations across perpetual-futures markets: CoinGlass reported $68M in total TRB-contract liquidations for the 24-hour window, the highest of any crypto derivative contract globally. Synthetix stakers suffered approximately $2M in losses due to the TRB-denominated OI cap mechanism, per founder Kain Warwick's public post-mortem.

Lookonchain identified a Tellor-team-linked address depositing approximately 4,211 TRB (~$2.4M at the spike price) to a Coinbase wallet as the price spiked. The team's involvement in the manipulation has not been publicly established, and no DOJ, CFTC, or other regulator action has named the orchestrators at the v0.1 cutoff.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-08 to 2023-09 | ~20 whale wallets accumulate TRB at ~$15 cost basis; cluster identified retrospectively by Spot On Chain | T8.001 (cluster-reuse signal — common accumulation window and cost basis) |
| 2023-10 to 2023-12 | Whale cluster executes gradual deposit-to-exchanges programme, positioning ~1.7M TRB (~68% of circulating supply) on exchange order books | T17.001 (pre-positioning phase — exchange-deposit accumulation without price impact) |
| 2023-12-31 (~00:00–08:00) | Coordinated spot-market pump: TRB rises from ~$213 to ~$619 (~172% intraday) over ~8 hours; spot-perpetual dislocation widens with no arbitrageur flow to re-anchor | **T17.001 execution** (spot-market pump creating cross-venue price-discovery distortion) |
| 2023-12-31 (~08:00) | TRB reaches all-time high ~$619; Synthetix OI cap (TRB-denominated) expands ~50× to $12.5M | T17.001 (dislocation amplifies via Synthetix OI cap mechanism) |
| 2023-12-31 (~08:00–09:00) | Whale cluster begins selling; TRB crashes from ~$619 to ~$136 in ~1 hour (~78% decline) | **T17.002 execution** (liquidation cascade — $68M liquidated across Binance, OKX, Bybit) |
| 2023-12-31 (same window) | Tellor team deposits ~4,211 TRB (~$2.4M) to Coinbase; Lookonchain flags the deposit | T8.001 (team-linked address activity during the crash) |
| 2023-12-31 (post-crash) | CoinGlass reports $68M in TRB-contract liquidations — highest of any crypto derivative in the 24h window; Synthetix stakers report ~$2M loss | (liquidation accounting) |
| 2024-Q1 | Spot On Chain and Lookonchain publish retrospective cluster analysis of the 20-whale-wallet accumulation pattern | (defender-side attribution) |

## What defenders observed

- **Pre-event (exchange-concentration signal):** Approximately 1.7M of 2.5M circulating TRB (~68%) sat on exchange order books before the event. For a token with this level of exchange concentration, a coordinated whale cluster holding a material fraction of the exchange-resident supply can dominate both the spot and perpetual order books. Exchange-concentration ratio is a standing T17.001 risk factor independent of any specific manipulation attempt.

- **Pre-event (cluster-accumulation signal):** The ~20 whale wallets accumulated TRB at a common ~$15 cost basis in August–September 2023 — a funder-graph cluster signal (T8.001) that was retrospectively identified by Spot On Chain. A defender-side monitoring framework that tracked exchange-deposit concentration by funder-graph cluster would have surfaced the accumulation-to-deposit pipeline before the manipulation event.

- **At-event (spot-perpetual dislocation):** During the pump, the spot price on Binance and other venues detached from perpetual-futures prices. The usual arbitrageur flow (buy spot/short perp or vice versa) failed to re-anchor the spread because the whale cluster's sell pressure was coordinated to release only after the peak. The dislocation widened to the point where TRB-perpetual marks were no longer tracking spot, and liquidations fired on both sides — shorts during the pump, longs during the crash.

- **At-event (Synthetix OI cap amplification):** Synthetix's TRB-denominated OI cap was a mechanism-design amplifier: as TRB's spot price rose, the cap expanded in notional terms, allowing outsized short positions to accumulate at prices that were already dislocated from spot. The ~$2M Synthetix staker loss is a structural T17.001 amplification signal — the venue's risk parameters were not robust to spot-price manipulation of the underlying.

- **Post-event (liquidation cascade):** The $68M liquidation total across Binance, OKX, and Bybit was the highest of any crypto derivative contract in the 24-hour window. The cascade produced both short-liquidations (during the pump) and long-liquidations (during the crash), a dual-direction liquidation pattern that is the distinctive footprint of a pump-then-dump manipulation on a venue with both long and short open interest.

## What this example tells contributors writing future Technique pages

- **TRB Dec 2023 is the canonical pre-2025 anchor for the spot-perpetual dislocation + dual-direction liquidation cascade sub-pattern of T17.** Prior to the 2025 Hyperliquid JELLY and POPCAT cases, TRB was the highest-dollar-loss publicly-documented case of a coordinated spot-market pump producing cascading liquidations on perpetual-futures venues. The three-phase structure — accumulation at low cost basis, gradual exchange-deposit positioning, single-day coordinated pump — is the operationally significant T17.001/T17.002 chaining pattern that contributors should expect to see in future cases.

- **Exchange-concentration ratio is a standing T17.001 risk factor.** TRB had ~68% of circulating supply on exchanges at the time of the event. For any token with exchange-concentration above ~50%, the available float for price discovery is thin relative to the exchange-resident supply, and a coordinated whale cluster holding a material fraction of exchange-resident tokens can dominate both spot and perpetual order books. Contributors writing future T17.001 detection guidance should include exchange-concentration ratio as a pre-event risk metric.

- **TRB-denominated OI caps are a mechanism-design T17.001 amplifier.** Synthetix's OI cap denominated in TRB tokens (not notional USD) expanded ~50× as TRB's spot price rose. Venue risk parameters that scale with the manipulated asset's price rather than with a stable reference (USD, ETH) amplify T17.001 events by construction. Contributors writing T17 technique pages should flag asset-denominated risk parameters as a venue-side design vulnerability.

- **T8.001 cluster-reuse is the load-bearing attribution signal for pseudonymous whale-cluster manipulations.** The ~20 whale wallets accumulating at a common $15 cost basis and executing a coordinated deposit-to-exchanges programme is a textbook T8.001 signal: common funder-graph, common accumulation window, common cost basis, coordinated exit timing. Contributors writing pseudonymous-attribution T17 cases should treat the funder-graph cluster as the primary attribution surface.

## Public references

- `[cointelegraphtrb2024]` — CoinTelegraph, "Tellor altcoin's bizarre 150% pump then fall sparks concerns of manipulation" (2024-01): <https://cointelegraph.com/news/tellor-altcoin-pumps-dumps-causes-speculation-over-cause>
- `[spotonchaintrb2024]` — Spot On Chain, retrospective cluster analysis of the 20-whale-wallet TRB accumulation pattern (2024-01)
- `[lookonchaintrb2024]` — Lookonchain, on-chain analysis of Tellor-team-linked deposit and whale-cluster activity during the Dec 31 manipulation (2024-01)
- `[coinglasstrb2023]` — CoinGlass, TRB liquidation data: $68M in 24h liquidations on 2023-12-31 — highest of any crypto derivative contract
- `[synthetixtrb2024]` — Synthetix founder Kain Warwick, public post-mortem on the TRB-denominated OI cap mechanism and ~$2M staker loss (2024-01)
- `[cryptoranktrb2024]` — CryptoRank, "Ethereum-hosted Tellor pumps and dumps, $73 mln liquidated" (2024-01)

## Citations

- `[cointelegraphtrb2024]` — contemporaneous press; price trajectory ($213 → $619 → $136), whale-cluster framing, exchange-concentration context.
- `[spotonchaintrb2024]` — primary on-chain cluster analysis; 20-whale-wallet identification, $15 cost basis, accumulation window.
- `[lookonchaintrb2024]` — primary on-chain analysis; Tellor-team-linked deposit, whale exchange-deposit programme.
- `[coinglasstrb2023]` — liquidation data; $68M figure, highest-of-any-contract framing.
- `[synthetixtrb2024]` — venue-side post-mortem; TRB-denominated OI cap mechanism, ~$2M staker loss.

## Discussion

TRB Dec 2023 is the canonical pre-2025 anchor for the **spot-perpetual dislocation + dual-direction liquidation cascade** sub-pattern that bridges the T17.001 (Cross-Venue Arbitrage-Driven Price-Discovery Distortion) and T17.002 (Liquidation Cascade Engineering) techniques. The case demonstrates the recurring structural property that **low-float, high-exchange-concentration tokens are T17-exposed by construction**: with ~68% of circulating supply on exchanges, a coordinated whale cluster could dominate both spot and perpetual order books and produce a dislocation that the usual arbitrageur flow could not close.

The three-phase operational structure — accumulation at low cost basis (Aug–Sep 2023), gradual exchange-deposit positioning (Oct–Dec 2023), coordinated single-day spot-market pump (Dec 31, 2023) — is the operationally significant T17.001/T17.002 chaining pattern. The dual-direction liquidation cascade (shorts liquidated during the pump, longs liquidated during the crash) is the distinctive on-chain footprint that distinguishes this from a simple pump-and-dump: the manipulator extracted value from both the upward and downward legs by triggering cascading liquidations on both sides of the perpetual-futures order book.

The Synthetix OI cap mechanism is a venue-side design lesson. Risk parameters denominated in the manipulated asset rather than in a stable reference currency amplify T17 events by construction: as the asset price rises, the risk capacity expands, allowing more exposure to build at precisely the moment when the asset is being manipulated. The fix — denominating OI caps in USD or another stable reference — is straightforward but was not applied at Synthetix before the event.

The attribution surface is the case's principal limitation at v0.1. The 20-whale-wallet cluster is well-characterized on-chain (Spot On Chain, Lookonchain) and the T8.001 cluster-reuse signal is strong, but no public attribution to named individuals or entities has been established. The case sits alongside the Hyperliquid JELLY (2025) and POPCAT (2025) cases as a T17 anchor, with the whale-cluster attribution surface providing the on-chain forensic baseline that future named-attribution cases can build on.
