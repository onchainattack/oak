# OAK-M26 — Wash-Trade-Rate Metrics at Marketplace Layer

**Class:** venue
**Audience:** venue (NFT marketplace, DEX), aggregator (analytics), risk-team
**Maps to Techniques:** OAK-T3.002, OAK-T7.004, OAK-T12.001

## Description

A marketplace-side mitigation in which the venue (NFT marketplace, DEX, or per-collection / per-pair aggregator) computes per-collection and per-pair wash-trade-rate metrics on a recurring cadence and exposes them as a first-class data surface — to the user as part of the collection / pair page, to downstream UIs as the default volume figure, and to incentive programs as the eligibility filter. The wash-trade rate is computed against a counterparty-graph and source-of-funds analysis: trades whose buyer-side funding originates from the seller-side cluster, trades that round-trip within a self-financed cluster, and trades whose per-token-id sale-history is inconsistent with arms-length price discovery are aggregated into a per-cluster wash-trade rate. The rate then feeds three distinct surfaces: (a) a published wash-adjusted volume figure shown alongside raw volume, with floor-price-resilience and unique-buyer-growth as companion metrics; (b) a user-visible per-cluster or per-collection wash-rate score on the collection / pair page; (c) reward-program filters — token rewards, airdrop seasons, leaderboard rankings, trending surfaces — that exclude wash-trade volume at cluster granularity rather than at trade granularity.

The defender's framing is that wash-trading is **incentive-driven**: the marketplace itself frequently pays the wash-trader (rewards, airdrops, leaderboard exposure) and the volume figure is consumed downstream as a quality signal. As long as the metric is raw volume, the rational play for a participant is to inflate it; the only structural fix is to make the published metric itself wash-adjusted and to apply the same adjustment to the reward-eligibility filter. Per-trade detection without cluster-level filtering is insufficient, because the attacker can fragment trades across nominally-distinct addresses inside one self-financed cluster.

The class is `venue` rather than `detection` because the mitigation requires a marketplace-layer policy decision (which volume figure is published, which reward filter is applied, which leaderboard surface is wash-adjusted) — it is not satisfied by an off-marketplace analytics provider publishing wash-rate scores while the marketplace continues to pay rewards on raw volume.

## How it applies

- **OAK-T3.002 (Wash-Trade Volume Inflation, ERC-20 / DEX):** the DEX or DEX-aggregator publishes wash-adjusted volume metrics alongside raw figures on the pair page; downstream UIs default to the wash-adjusted figure; per-pair leaderboards and any DEX-side incentive program filter wash-trade volume at cluster granularity. Holder-growth and unique-counterparty metrics are weighted over raw volume in any quality-score derived from the metric set.
- **OAK-T7.004 (NFT Wash Laundering):** the marketplace integrates per-trade source-of-funds analysis at the trade-acceptance layer; trades where buyer-side funding originates from the seller-side cluster are flagged, optionally rate-capped per cluster, and excluded from any KYC-tier-feeding volume figure that the marketplace exposes to regulated venues for downstream review. Per-marketplace wash-trade-rate metrics are published on a recurring cadence to give compliance providers and downstream venues a marketplace-level baseline.
- **OAK-T12.001 (NFT Wash Trade Volume Inflation):** the marketplace computes and enforces a per-cluster wash-trade-rate cap (e.g., a wallet whose 30-day wash-trade rate exceeds a calibrated threshold has its trades excluded from leaderboard volume and from the published floor); publishes a wash-adjusted volume metric and a floor-price-resilience metric alongside raw volume, with both surfaced on collection pages; excludes self-financed-cluster trades from leaderboard ranking and `"trending"` surfaces; applies the same cluster-level exclusion to reward-eligible volume in token-reward and airdrop programs to neutralise the marketplace-incentive sub-motivation at the source.

## Limitations

- Cluster attribution is heuristic: a determined attacker can fund the buyer-side from an exchange withdrawal under a separate KYC identity, which defeats source-of-funds analysis at the on-chain layer. The mitigation compresses the attack surface but does not eliminate it; sophisticated wash-trade rings combining off-chain coordination with on-chain cluster separation remain a residual threat.
- Marketplace-side application creates a coordination-failure risk across the ecosystem: a marketplace that unilaterally adopts wash-adjusted reward filters loses leaderboard ranking against marketplaces that do not, which is a competitive disincentive. The mitigation is materially stronger when applied as an industry-wide convention (compliance-provider-published per-marketplace metrics on a recurring cadence) than as a single-marketplace policy.
- The wash-trade-rate metric itself is a noisy signal at low volumes — small collections / thin pairs can have legitimate cluster-overlap (community member buying from project treasury) that scores as wash-trade. The mitigation is most useful at marketplace-aggregate and per-collection-aggregate granularity rather than at per-trade granularity for low-volume pairs.
- The reward-program filter component depends on the marketplace running a reward program in the first place; for venues with no incentive surface, only the published-metric and user-visible-score components apply.
- DEX-side application at OAK-T3.002 is partial at v0.1: most aggregators expose raw volume by default and surface wash-adjusted metrics (where available) only as a secondary view. The mitigation's effectiveness depends on the wash-adjusted figure becoming the default surface.

## Reference implementations

- Chainalysis 2021 NFT retrospective methodology — well-established per-marketplace wash-trade-rate computation methodology, extended in subsequent industry research; the canonical reference for the cluster-level wash-trade-rate primitive.
- LooksRare and Blur airdrop-eligibility filters — partial coverage of the reward-program-filter leg in the NFT-marketplace context, with documented evolution across reward seasons toward stricter cluster-exclusion.
- OpenSea / Magic Eden trade-feed metadata — partial surface for source-of-funds analysis; downstream analytics providers (Dune dashboards, NFT analytics tools) compute per-collection wash-rate scores against these feeds.
- DEX-aggregator volume figures (1inch, ParaSwap, CoinGecko) — at v0.1 predominantly raw-volume surfaces; the mitigation's DEX-side application is a roadmap item rather than current practice.

## Citations

- `[chainalysis2022nft]` — Chainalysis 2021 NFT retrospective; per-marketplace wash-trade-rate methodology and scale figures.
- `[theblock2022boredape]` — illustrative single-collection wash-trade case material.
- `[chainalysis2024laundering]` — broader market-manipulation and laundering context within which marketplace wash-trade sits.
