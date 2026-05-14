# NFT marketplace royalty-enforcement sunset and creator-revenue bypass — multi-chain (Ethereum, Solana, Bitcoin ordinals) — 2024

**Loss:** structural — ongoing creator royalty revenue foregone across NFT marketplaces as major platforms moved to optional-royalty models during 2024. The cumulative creator-royalty loss across the NFT ecosystem is estimated in the hundreds of millions of dollars, though per-creator attribution is diffuse and the loss is measured as foregone revenue rather than extracted funds.
**OAK Techniques observed:** **OAK-T12.003** (Royalty Bypass / Marketplace Manipulation — the systematic removal or optionalisation of creator royalty enforcement at the marketplace layer, beginning with Blur's October 2022 royalty-optional model and accelerating through 2023-2024 as OpenSea, Magic Eden, and other major marketplaces adopted royalty-optional or royalty-reduced models). The 2024 marketplace landscape effectively completed the royalty-bypass transition that began in 2022-2023, with creator royalties becoming structurally unenforceable at the marketplace-contract layer across all major EVM and Solana NFT venues in the absence of protocol-level royalty enforcement (EIP-2981 having no on-chain enforcement mechanism).
**Attribution:** **unattributed** (structural / market-wide — not attributable to a specific operator; the royalty bypass is a marketplace-architecture-level structural shift rather than a per-incident attack).
**Key teaching point:** **NFT royalties without protocol-level enforcement are structurally voluntary.** The 2022-2024 royalty bypass transition demonstrates that EIP-2981-style informational royalty standards, without on-chain enforcement at the token-contract or chain level, are bypassed by marketplace competition within two years of a major venue (Blur) adopting a royalty-optional model.

## Summary

Through 2022-2024, NFT marketplace royalty enforcement transitioned from near-universal (OpenSea's operator filter enforcing creator royalties at the contract level) to structurally voluntary. Blur's October 2022 launch with a royalty-optional model was the catalyst; OpenSea's August 2023 sunset of its operator filter (see `examples/2023-08-opensea-operator-filter-sunset.md`) was the tipping point. By 2024, all major NFT marketplaces (OpenSea, Blur, Magic Eden, Tensor) operated with royalty-optional or royalty-minimal models, and creator royalty enforcement at the marketplace-contract layer had been effectively deprecated. The case is the canonical 2024 T12.003 worked example and the endpoint of the NFT royalty-bypass transition arc.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-10 | Blur launches with royalty-optional model | T12.003 (catalyst) |
| 2023-08 | OpenSea sunsets operator-filter royalty enforcement | T12.003 (tipping point) |
| 2024 (full year) | All major marketplaces operate royalty-optional; creator royalties structurally unenforceable at marketplace layer | **T12.003** (endpoint) |

## Public references

- `[openseaoperatorfilter2023]` — OpenSea operator-filter sunset announcement (August 2023).
- `[blurroyalty2022]` — Blur royalty-optional model launch coverage.

## Discussion

The 2024 NFT royalty landscape is the structural endpoint of the royalty-bypass transition arc that OAK documents across 2022 (Blur launch), 2023 (OpenSea operator-filter sunset), and 2024 (market-wide royalty-optional norm). The case is included at the structural/cohort level for T12.003 and closes the T12×2024 near-threshold gap at v0.1. The absence of protocol-level royalty enforcement (on-chain, at the token-contract or chain level) is the load-bearing structural observation; marketplace competition alone cannot sustain royalty enforcement when a single major venue can defect and capture volume.
