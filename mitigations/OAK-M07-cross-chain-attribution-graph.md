# OAK-M07 — Cross-Chain Attribution Graph

**Class:** detection
**Audience:** vendor, risk-team, venue
**Maps to Techniques:** OAK-T7.001, OAK-T7.002, OAK-T7.003, OAK-T7.004, OAK-T7.005, OAK-T7.006, OAK-T8.002, OAK-T11.001

## Description

A cross-chain attribution graph is a per-cluster data product that links wallet activity, deposit / withdrawal events, bridge transfers, and instant-swap rails into a single operator-level view that spans multiple chains. The canonical commercial implementations are Chainalysis Reactor, TRM Labs Tactical, Elliptic Lens / Investigator, MetaSleuth, and similar forensic-provider platforms; each maintains heuristics-driven cluster reuse, common-spend, and cross-chain bridge-correlation pipelines that downstream defenders consume as cluster IDs, watchlists, or screening API responses.

For OAK, this mitigation is the dominant defensive surface across the T7 (Defense Evasion / Laundering) family and the T8.002 (Cross-Chain Operator Continuity) class. The detection mechanism is structural: laundering Techniques succeed when the operator's downstream off-ramp activity *appears unrelated* to the source-incident cluster. A cross-chain attribution graph denies that appearance by re-linking the operator's identity across the chain-switch boundary that the laundering Technique exploited.

The graph itself is not a single artefact; it is a continuously-rebuilt index combining cluster heuristics, bridge-side message correlation, instant-swap-service inflow / outflow matching, off-chain CTI inputs (sanctioned-entity lists, indictment-derived addresses, vendor-disclosure feeds), and per-incident asset-freeze coordination feeds. Defender consumption is typically via a screening API at deposit time at a downstream venue, or via investigator-driven graph traversal during incident response.

## How it applies

- **OAK-T7.001 (Mixer-Routed Hop):** post-mix-withdrawal flagging is published by major compliance providers as cluster-level annotations on the attribution graph; venues screening incoming deposits against those annotations deny the laundering Technique its terminal off-ramp.
- **OAK-T7.002 (CEX Deposit Layering):** per-cluster aggregate inflow tracking — provided as a cluster-level metric in the attribution graph — lets exchanges aggregate nominally-distinct customer deposits whose upstream source-clusters overlap, defeating the structuring-evasion pattern.
- **OAK-T7.003 (Cross-Chain Bridge Laundering):** bridge-side message correlation is the canonical attribution-graph edge that re-links the source-chain extraction cluster to the destination-chain off-ramp cluster; this is the defining cross-chain-attribution use case.
- **OAK-T7.004 (NFT Wash Laundering):** per-marketplace wash-trade-rate metrics derived from the attribution graph (buyer / seller cluster overlap) flag NFT-sale proceeds where source-of-funds analysis reveals the buyer-side funding originates from the seller-side cluster.
- **OAK-T7.005 (Privacy-Chain Hops):** the attribution graph cannot follow the privacy-chain hop directly, but it preserves the pre-hop and post-hop edges (deposit cluster → privacy-chain venue → re-emergence cluster), which is sufficient for amount-class-matching re-emergence detection at downstream venues.
- **OAK-T7.006 (DeFi Yield Strategy Laundering):** per-protocol illicit-cluster inflow / outflow metrics surfaced from the attribution graph let DeFi protocols and downstream off-ramps treat positions with deposit-source / withdrawal-recipient divergence as elevated risk.
- **OAK-T8.002 (Cross-Chain Operator Continuity):** per-chain funder-graph extensions and off-chain operator-profile data (DS-12) integrated into the attribution graph maintain operator-cluster identity across the chain-switch boundary that T8.002 relies on for continuity.
- **OAK-T11.001 (Third-Party Signing Vendor Compromise):** when a signing-vendor breach surfaces in vendor-disclosure feeds, the attribution graph cross-references vendor-disclosure addresses with on-chain cluster activity to scope the impact across affected customer organisations and chains.

## Limitations

Cross-chain attribution-graph formats are not standardised at v0.1; vendor-specific heuristics, coverage, and cluster-membership decisions diverge materially across providers, and a cluster ID at one provider is not directly portable to another. The graph relies on heuristics (common-spend, common-funder, deposit-address reuse, bridge-message correlation) that each have known false-positive and false-negative modes; high-stakes attribution decisions still require investigator review.

The graph's privacy-chain coverage is structurally limited (the pre-hop / post-hop framing above is the practical boundary), and instant-swap services remain a comparatively under-covered surface relative to CEXes. Light-client and zero-knowledge bridges are an emerging coverage gap. Finally, attribution graphs do not, on their own, mitigate the laundering Technique — they require a downstream venue or risk team to act on the screening signal; a graph that nobody screens against provides no defence.

## Reference implementations

- Chainalysis (Reactor / KYT) — cluster heuristics, bridge tracing, sanctioned-entity feeds.
- TRM Labs (Tactical / TRM Forensics) — cross-chain attribution + risk-API screening.
- Elliptic (Lens / Navigator / Investigator) — cluster + bridge correlation; integrates with VASP screening.
- MetaSleuth (BlockSec) — investigator-driven cross-chain graph traversal.
- Crystal Blockchain — deposit-screening + investigator workflow.
- Open-source primitives exist for individual heuristics (e.g., common-spend clustering on Bitcoin), but no open-source product replicates the cross-chain attribution-graph surface at v0.1.

## Citations

- `[chainalysis2024dprk]` — DPRK-attributed multi-chain operations and cross-chain attribution methodology; canonical reference for OAK-T8.002 and the T7.003 bridge-laundering edge.
- `[chainalysis2024laundering]` — 2024 Money Laundering report; per-cluster deposit-address aggregation methodology underpinning T7.002 mitigation.
- `[chainalysis2022nft]` — NFT wash-trade-rate attribution methodology underpinning T7.004 mitigation.
- `[ellipticronin2022]` — Ronin forensic write-up; canonical worked example of cross-chain attribution applied to a bridge-extraction event (T7.003 + T11.001 / T10.001 chain).
- `[trmlabs2024nomadextradition]` — TRM tracing applied to extradition-relevant bridge-laundering chain.
- `[coindeskthorchainlazarus2025]` — THORChain-as-Lazarus-laundering-rail framing; canonical T7.003 worked example.
- `[chainalysisprivacychain2024]` — privacy-chain pre-hop / post-hop attribution framing for T7.005.
- `[crystalwazirx2024]` — Crystal Blockchain attribution applied to the WazirX 2024 incident (T11.001 chain).
