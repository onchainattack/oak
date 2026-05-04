# OAK-T12 — NFT-Specific Patterns

**Phase:** Realization
**Adjacent tactics:** T1 (Token Genesis — fungible analogue at the deployment layer), T3 (Holder Capture — fungible analogue at the volume / market-signal layer), T4 (Access Acquisition — NFT drainer flows already covered under T4.005), T7 (Laundering — NFT-specific laundering already covered under T7.004)

## Scope

NFT-Specific Patterns covers attack classes that are structurally tied to non-fungible token semantics — per-token-id ownership rather than fungible balances, marketplace-mediated trade flows, on-chain royalty-payment infrastructure, scarcity-of-edition as the primary bait surface, and Discord-server-driven community structure as the social-engineering surface. These attack classes do not cleanly fit under T1–T11 because the detection signals, the artefact set, and the mitigation surface differ from their fungible-token equivalents in ways that matter to defenders.

T12 in v0.1 is intentionally narrow. The 2021–2022 NFT bubble produced a forensic record (canonically `[chainalysis2022nft]`) that supports three Technique classes with strong public evidence: NFT wash-trade volume inflation, fake-mint / counterfeit collections, and royalty bypass via marketplace-flow manipulation. The broader NFT-specific risk surface — NFT-specific phishing flows, OpenSea / Blur marketplace-flow-specific patterns, and NFT-collateral-lending exploits — is targeted for v0.x updates as the public forensic record matures.

## What defenders observe

- Repeated transfers of the same `tokenId` between a small set of related addresses at monotonically rising prices, where the buyer-side and seller-side wallets share funder ancestry — the per-NFT signature of T12.001.
- Collection-deployment events that mirror the artefact set of a higher-profile collection (name, ticker / symbol, off-chain metadata, art) but originate from an unrelated deployer address, paired with mint-page promotion through Discord / X channels not affiliated with the genuine project — the T12.002 signature.
- Marketplace orders routed through low-royalty or zero-royalty venues, custom-router contracts, or order-book primitives that bypass the royalty-payment hook embedded in the collection's standard transfer path — the T12.003 signature.
- Discord-server compromise events at the collection's official server (admin-account takeover, webhook-injection) whose timing precedes a spike in mint-page traffic to a counterfeit collection (T12.002 antecedent).
- Floor-price moves that are driven by intra-cluster trades rather than by external market participation — a holder-protection signal at the collection level rather than at the token level.

## Relationship to other tactics

T12 is the NFT-specific analogue of two distinct patterns already in OAK at the fungible-token layer:

- **T3.002 (Wash-Trade Volume Inflation, fungible)** vs. **T12.001 (NFT Wash-Trade Volume Inflation)**: the failure mode is conceptually parallel — inflating apparent market activity to manipulate buyer perception — but the detection signal differs. Fungible wash trades aggregate at the pool / pair / volume layer; NFT wash trades aggregate at the per-token-id layer, requiring tokenId-level cluster-graph reconstruction. Detection logic does not transfer cleanly.
- **T1 (Token Genesis, fungible)** vs. **T12.002 (Fake-Mint / Counterfeit Collection)**: deployment of a counterfeit ERC-20 and deployment of a counterfeit ERC-721 collection share the impersonation predicate but differ in artefact set (NFT collections add metadata-URI, royalty-recipient, mint-page, and Discord-server artefacts that fungible deployments do not have) and in bait surface (scarcity-of-edition rather than initial-liquidity-pool credibility).

T12 is **not** the right home for two NFT-related patterns that already live elsewhere in OAK and should not be duplicated here:

- **T4.005 (setApprovalForAll NFT Drainer)** stays under T4 because the failure mode is identical to T4.004 (signature-phishing for fungible approval) with different granularity — the predicate is "victim grants attacker authority over their assets", and the NFT-vs-fungible distinction does not change the detection or mitigation logic.
- **T7.004 (NFT Wash-Laundering)** stays under T7 because the predicate is laundering-of-illicit-proceeds through NFT trades, not manipulation of the NFT market itself; the NFT is the laundering vehicle, not the attack target.

The boundary rule for contributors: if the attack *targets* an NFT collection, its holders, or its market-signal layer, it belongs in T12. If it *uses* NFTs as instrumentation for a generic on-chain attack pattern (drainer, laundering), it belongs in the generic Tactic.

## Techniques in this Tactic (v0.1)

- OAK-T12.001 — NFT Wash-Trade Volume Inflation
- OAK-T12.002 — Fake-Mint / Counterfeit Collection
- OAK-T12.003 — Royalty Bypass / Marketplace Manipulation

## Maintainer notes

T12 in v0.1 is intentionally narrow at three Techniques. The canonical NFT industry retrospective `[chainalysis2022nft]` is the primary anchor citation across all three Techniques and supplies the forensic record for the 2021–2022 cohort. Per-Technique pages add marketplace-specific and case-specific citations.

Patterns explicitly out of scope for v0.1 and targeted for v0.x updates:

- NFT-specific phishing flows (fake-mint-page promotion via compromised Discord, X-account takeover patterns specific to NFT-project communications) — overlaps with T4.005 and T11-class wallet-compromise paths and needs a clean boundary before promotion.
- OpenSea-flow-specific and Blur-flow-specific attack patterns (loan-default griefing, bid-pool manipulation, point-farming wash structures) — the public forensic record is still maturing as of v0.1.
- NFT-collateral-lending exploits (BendDAO-class liquidations, oracle-floor-price manipulation against NFT lending protocols) — likely splits between a future T12 Technique (when NFT-specific) and T9.001 (when the failure is generic oracle manipulation against a lending protocol that happens to take NFT collateral).

Contributors proposing additions to T12 should preserve the boundary rule above: T12 is for attacks whose detection signal or mitigation surface is structurally NFT-specific, not for generic on-chain attacks that incidentally use NFTs.
