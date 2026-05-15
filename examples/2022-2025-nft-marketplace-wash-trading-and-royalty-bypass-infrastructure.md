# NFT Marketplace Wash-Trading and Royalty-Bypass Infrastructure — 2022–2025 — Aggregate Revenue Loss in Hundreds of Millions

**Loss:** Aggregate creator-royalty revenue loss is estimated in the hundreds of millions of dollars across the full 2022–2025 cohort, though precise attribution is structurally difficult — royalty-revenue loss is a gradient (effective royalty rate declining from ~100% to <10% of nominal across the cohort) rather than a point extraction event. Wash-trading volume inflation produces direct trader harm through misleading volume signals; royalty bypass produces creator-side revenue loss through marketplace-policy divergence. Neither Technique class produces a single headline extraction figure comparable to T9-class exploits; the loss is distributed across thousands of collections, millions of trades, and a structural marketplace-design shift.

**OAK Techniques observed:** **OAK-T12.001** (NFT Wash Trade / Volume Inflation — the execution of self-dealing or circular trades designed to inflate a collection's reported trading volume, floor price, or trader-count metrics, creating a false signal of organic demand that induces third-party traders to enter at inflated valuations.) **OAK-T12.003** (Royalty Bypass / Marketplace Manipulation — the structural standard-vs-enforcement gap in NFT royalties: ERC-2981 is a metadata standard that lets a contract advertise a royalty rate but does not bind the taker side of a trade to pay it. Marketplaces have made divergent policy choices about royalty enforcement, and the migration of volume to royalty-optional venues has driven the effective realized royalty rate at the cohort level from near-100% to materially lower rates.)

**Attribution:** **unattributed** — The T12.001 and T12.003 surfaces are marketplace-infrastructure design properties rather than individual-actor exploits. Wash-trading infrastructure is operated by collection teams, market-makers, and incentive-farming participants; royalty bypass is a marketplace-level policy decision rather than an individual exploit. The attribution question at the Technique level is "which marketplace policies enable the Technique?" rather than "which actor executed it?"

**Key teaching point:** **T12.001 and T12.003 represent a structural marketplace-design shift rather than a discrete exploit wave — and the defender's question is not "how do we prevent this specific incident?" but "how should marketplace infrastructure be designed to make wash-trading unprofitable and royalty payment enforceable?"** The two Techniques are infrastructurally linked: the migration of volume to royalty-optional venues (T12.003) was accompanied by incentive programmes (Blur Points, LooksRare rewards, X2Y2 farming) whose volume-based reward mechanics created a direct economic incentive for wash trading (T12.001). A marketplace that rewards volume without wash-trade detection is structurally incentivising T12.001; a marketplace that enforces royalties eliminates T12.003 at the marketplace-contract layer. **The marketplace is the load-bearing defender for both Technique classes.**

## Summary

The 2022–2025 period saw a structural transformation of the NFT marketplace landscape driven by two interconnected Technique classes: the migration of trading volume to royalty-optional venues (T12.003), and the wash-trading infrastructure that volume-based marketplace incentives created (T12.001). Together, they represent the most significant marketplace-infrastructure-level attack surface in the NFT segment of the OAK corpus.

### T12.003: Royalty Bypass and the Standard-Vs-Enforcement Gap

ERC-2981, finalized as Final in July 2021, defines a standard interface for NFTs to advertise a royalty recipient and basis-points rate via a `royaltyInfo(tokenId, salePrice)` query. The standard is deliberately scoped to royalty *information* and explicitly leaves payment-binding outside its scope — the standard text notes that compliance is voluntary on the part of the entity executing the sale. This design choice, reasonable from a standards-perspective (a metadata standard cannot force payment), created the structural gap that T12.003 exploits.

The marketplace landscape shifted in late 2022 with the launch of Blur (October 2022) as a pro-trader-focused NFT marketplace. Blur shipped with a recommended-minimum royalty of 0.5% on most collections (with higher per-collection defaults such as BAYC at 8%) and a buyer-customizable royalty input. X2Y2 and LooksRare had already shifted to royalty-optional models earlier in 2022. The result was a rapid migration of Ethereum NFT trading volume from OpenSea (which enforced creator-set royalties at the marketplace-contract layer) to Blur/X2Y2/LooksRare (which made royalties customizable or optional).

The effective realized royalty rate at the cohort level dropped materially. A creator who set a 5% royalty on OpenSea in early 2022 might receive near-100% of that 5% across their collection's trading volume. By mid-2023, with the majority of volume settling through royalty-optional venues, the same creator might receive <20% of their nominal royalty — or less, depending on the collection's volume mix across venues.

OpenSea's response — the Operator Filter Registry (November 2022) — was a creator-side enforcement mechanism: collections that opted in could block listing on non-royalty-enforcing marketplaces. The registry was deprecated in stages through 2023–2024, with enforcement ending on February 29, 2024. The deprecation marked the end of marketplace-contract-layer royalty enforcement as an industry practice for the dominant Ethereum NFT marketplaces.

### T12.001: Wash Trading and Volume Inflation

The volume-based incentive programmes that accompanied the royalty-optional marketplace shift created a direct economic incentive for wash trading. Blur Points, LooksRare rewards, and X2Y2 farming awarded tokens and incentives proportional to trading volume — and trading volume, unlike organic demand, can be manufactured via self-dealing trades whose only cost is the marketplace fee and gas.

The wash-trading infrastructure operates through several documented patterns:

- **Self-dealing:** the same entity controls both sides of a trade, moving an NFT between their own wallets at an inflated price to register the volume on the marketplace's volume counter.
- **Circular trading:** a cluster of wallets trades NFTs among themselves in a circular pattern, each trade registering as independent volume.
- **Incentive-farming wash:** collection teams wash-trade their own collections to inflate volume metrics and earn marketplace incentive rewards, then extract the rewards as profit — the wash-trading cost (fees + gas) is lower than the incentive-reward value.

The wash-trading volume is the "false signal of organic demand" that T12.001 documents: a collection whose 24-hour volume is 90% wash-traded displays the same volume metric in marketplace UIs as a collection with genuine organic demand. The trader who enters based on the volume signal is buying into a market whose apparent depth is manufactured.

### The Infrastructural Link Between T12.001 and T12.003

The two Techniques are infrastructurally linked through marketplace design:

1. A marketplace that makes royalties optional (T12.003) attracts volume from traders who prefer to avoid royalty payments, increasing the marketplace's market share.
2. A marketplace that rewards volume with incentive tokens creates a direct economic incentive for wash trading (T12.001).
3. Wash-trading volume further increases the marketplace's reported volume metrics, attracting more traders (and more incentive farmers), creating a self-reinforcing cycle.

The marketplace that eliminates both surfaces — by enforcing royalties at the contract layer AND by detecting and excluding wash-trading volume from incentive calculations — is the marketplace that breaks the link. At v0.1, no major NFT marketplace implements both controls comprehensively.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021-07 | ERC-2981 finalized as Final; royalty information standard scoped to metadata, payment-binding left outside scope | T12.003 (structural gap created) |
| 2022 early | X2Y2 and LooksRare launch with royalty-optional models; NFT volume begins migrating from OpenSea | T12.003 (marketplace shift begins) |
| 2022-10-19 | Blur launches as pro-trader NFT marketplace with customizable royalty input (0.5% recommended minimum) | T12.003 (canonical marketplace launch) |
| 2022-11 | OpenSea launches Operator Filter Registry as creator-side enforcement mechanism | T12.003 (mitigation attempt) |
| 2022–2023 | Blur Points, LooksRare rewards, X2Y2 farming create volume-based incentive programmes; wash-trading infrastructure emerges at scale | T12.001 + T12.003 (linked emergence) |
| 2023-08 | OpenSea announces sunset of Operator Filter enforcement (effective 2023-08-31); grace period through 2024-02-29 | T12.003 (enforcement deprecation) |
| 2024-02-29 | Operator Filter Registry enforcement ends on OpenSea; marketplace-contract-layer royalty enforcement ceases as industry practice for dominant Ethereum NFT marketplaces | T12.003 (structural shift complete) |
| 2022–2025 | Wash-trading infrastructure persists; marketplace-level wash-trade detection remains inconsistent across venues; effective royalty rates remain structurally depressed | T12.001 + T12.003 (ongoing) |

## Public references

- `[eip2981]` — ERC-2981 NFT Royalty Standard (Final, July 2021)
- `[openseaoperatorfilter2022]` — OpenSea Operator Filter Registry documentation (November 2022)
- Blur marketplace documentation and royalty-policy public statements (October 2022 onward)
- `[chainalysis2022nft]` — Chainalysis NFT market analysis documenting wash-trading and royalty-bypass patterns at cohort scale
- Dune Analytics NFT wash-trading dashboards and royalty-payment-rate cohort analyses
- See `techniques/T12.001-nft-wash-trade-volume-inflation.md` and `techniques/T12.003-royalty-bypass-marketplace-manipulation.md` for Technique definitions

## Discussion

The NFT marketplace wash-trading and royalty-bypass infrastructure is the canonical illustration of a **marketplace-design-driven attack surface** — the Techniques are not exploits of individual smart contracts but rather consequences of marketplace policy choices (royalty enforcement, volume-based incentive design, wash-trade detection) that create economic incentives for adversarial behaviour. The defender is not a single protocol team patching a vulnerability but the marketplace operators whose design decisions determine whether T12.001 and T12.003 are profitable for adversaries.

The structural link between T12.001 and T12.003 — marketplace incentive programmes that reward volume → volume-manufacturing via wash trading → volume migration to royalty-optional venues → further incentive to attract volume via royalty-optional policies — suggests that breaking either link (royalty enforcement at the contract layer, or volume-based incentive programme design that excludes wash-traded volume) would meaningfully reduce the combined T12.001 + T12.003 surface. The persistence of both Techniques through 2025 indicates that marketplace operators have not, at the industry level, chosen to break either link — making T12.001 and T12.003 among the most structurally persistent Technique classes in the OAK corpus.
