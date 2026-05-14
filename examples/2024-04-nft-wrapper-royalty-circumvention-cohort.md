# NFT wrapper / fractionalisation protocol royalty circumvention cohort — NFTX / FloorDAO / Sudoswap — Ethereum — 2022–2025

**Loss:** structural — creator royalty revenue foregone through wrapper-based trading paths that bypass the original collection's royalty mechanism. Exact aggregate dollar loss is diffuse across collections, but the wrapper-path volume share across major NFT collections reached measurable percentages during the 2023–2024 royalty-bypass transition window. The loss is measured as foregone creator revenue rather than extracted funds.
**OAK Techniques observed:** **OAK-T12.003** (Royalty Bypass / Marketplace Manipulation — the wrapper-based royalty-circumvention sub-pattern: NFT wrapping protocols convert the original NFT into a fungible or semi-fungible token that trades on venues that do not query the original collection's ERC-2981 royalty registry, bypassing creator-set royalty rates at the protocol layer rather than at the marketplace-policy layer).
**Attribution:** **unattributed** — structural / protocol-design-level. The wrapper protocols themselves are not attackers; they are legitimate DeFi infrastructure whose architecture has the structural side-effect of disconnecting the wrapped asset from the original collection's royalty mechanism. The wrappers did not introduce the royalty-enforcement gap (ERC-2981's lack of on-chain enforcement is the root cause) but they operationalise it at scale by providing liquid markets for royalty-free NFT exposure.

**Key teaching point:** **NFT wrapper and fractionalisation protocols create a royalty-circumvention path that is independent of marketplace policy.** Even if a marketplace enforces creator royalties at the contract level, the enforcement binds only trades of the original ERC-721 token on that marketplace. When the NFT is deposited into a wrapper contract (NFTX vault, FloorDAO sweep, Sudoswap pool), the depositor receives a fungible ERC-20 or wrapped ERC-721 token that trades on a different venue — typically a DEX or an NFT AMM pool — that has no knowledge of, and no mechanism to enforce, the original collection's royalty. The wrapper path decouples the economic exposure to the NFT from the royalty obligation, and no marketplace-policy change can close this gap because the wrapper contract, not the marketplace, is the token owner.

## Summary

NFT wrapper protocols — most prominently NFTX (ERC-20 vault tokens representing fractionalized NFT collections), FloorDAO (protocol-owned NFT sweep-and-tokenise), and Sudoswap (NFT AMM pools) — emerged as DeFi infrastructure for NFT liquidity during the 2021–2022 NFT market expansion. Their core mechanism is straightforward: a user deposits an NFT into a vault/pool contract and receives a fungible or semi-fungible token in return. The deposited NFT sits in the vault contract; the wrapper token circulates on DEXes and NFT AMM venues that have no integration with the original collection's royalty registry.

The structural consequence for creator royalties is immediate: when an NFT enters a wrapper, the wrapper contract becomes the on-chain owner. Any subsequent trade of the wrapper token is a trade of a different asset class (ERC-20 vault token, AMM LP position, wrapped ERC-721) on a different venue, and the original collection's royalty mechanism — whether enforced by marketplace policy or by a contract-level gating predicate — never sees the trade. The wrapper token buyer acquires economic exposure to the underlying NFT without paying the creator-set royalty.

The wrapper royalty bypass is structurally distinct from the marketplace-policy bypass documented in the companion T12.003 examples (X2Y2/LooksRare royalty-optional shift, OpenSea Operator Filter sunset). Marketplace-policy bypass leaves the NFT as an ERC-721 trading through marketplace contracts that choose not to enforce royalties. Wrapper bypass converts the NFT into a different token standard that trades on venues structurally incapable of enforcing royalties. The marketplace-policy bypass can be closed by a marketplace changing its policy; the wrapper bypass can only be closed by protocol-level royalty enforcement at the token-contract layer or by wrapper protocols voluntarily implementing royalty-routing.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021-01 | NFTX launches — first NFT fractionalisation protocol; users deposit NFTs into vaults, receive ERC-20 vault tokens | T12.003 (wrapper royalty bypass — origin) |
| 2021-09 | FloorDAO launches — protocol-owned NFT collection sweep and tokenisation; sweeps accumulate NFTs without per-trade royalty payment | T12.003 (DAO-level wrapper bypass) |
| 2022-02 | Sudoswap launches — NFT AMM pools; pool creators deposit NFTs and receive LP tokens that trade without royalty queries | T12.003 (AMM-level wrapper bypass) |
| 2022-2024 | Wrapper-path volume share grows across major collections as the NFT-Fi ecosystem matures and marketplace-side royalties erode | T12.003 (wrapper-path volume — structural) |
| 2024 onward | Wrapper-protocol royalty-routing proposals emerge (NFTX fee-switch discussions, Sudoswap royalty-query integration proposals) but remain unimplemented at v0.1 | (mitigation design — unimplemented) |
| Continuing | No protocol-level royalty enforcement exists at the token-contract layer; the wrapper royalty bypass remains open through the v0.1 cutoff | T12.003 (structurally open) |

## What defenders observed

- **Wrapper-path volume is a load-bearing royalty-leakage signal.** Per-collection royalty-payment-rate metrics that count only marketplace trades undercount the leakage because wrapper-path trades do not appear in marketplace royalty-query logs. The wrapper-path volume must be tracked separately, at the vault/pool deposit and withdrawal level, and the royalty-foregone on the intervening wrapper-token trades must be estimated from the wrapper-token venue's volume and the collection's stated royalty rate.
- **The wrapper path is not an "exploit" — it is a structural side effect of the token-standard boundary.** The wrapper contract correctly implements its specified behaviour (accept NFT deposit, mint wrapper token). The royalty mechanism correctly reports the creator's desired rate (ERC-2981 `royaltyInfo`). The gap is at the boundary: the wrapper token trades on venues that have no obligation to query the original collection's royalty registry, and the original collection's royalty mechanism has no visibility into wrapper-token trades. This is an architecture-level gap, not a contract-level bug.
- **Protocol-level royalty enforcement is the only structural fix.** Marketplace-policy enforcement (Operator Filter Registry, marketplace-side royalty queries) cannot reach wrapper-token trades because the wrapper token is a different asset on a different venue. Closing the wrapper royalty bypass requires protocol-level enforcement — either a token-contract-level royalty mechanism that follows the asset across wrapping events, or wrapper-protocol-level royalty-routing that voluntarily directs a fraction of wrapper-token trading fees to the original creator.

## What this example tells contributors writing future Technique pages

- **The T12.003 wrapper sub-pattern is structurally distinct from the marketplace-policy sub-pattern.** Marketplace-policy bypass (X2Y2/LooksRare/Blur royalty-optional models) can be mitigated by marketplace-policy changes. Wrapper bypass can only be mitigated by protocol-level enforcement or voluntary wrapper-protocol royalty-routing. Contributors writing future T12.003 examples should distinguish the two sub-patterns explicitly — they share the same Technique classification but have different mitigation surfaces.
- **Wrapper-protocol royalty-routing is an active design space.** NFTX fee-switch proposals, Sudoswap royalty-query integration designs, and EIP-7572-class contract-level metadata standards are all aimed at closing the wrapper royalty gap. Contributors should track these as the v0.x updates mature.

## Public references

- `[nftxvaults2021]` *(proposed)* — NFTX vault architecture; the ERC-20 vault token mechanism that decouples NFT exposure from the original ERC-721 royalty mechanism.
- `[floordao2021]` *(proposed)* — FloorDAO sweep-and-tokenise architecture; DAO-level NFT accumulation without per-trade royalty payment.
- `[sudoswapamm2022]` *(proposed)* — Sudoswap NFT AMM pool architecture; LP tokens as royalty-free NFT exposure.
- `[eip2981]` — ERC-2981 NFT Royalty Standard; the metadata-only standard whose lack of on-chain enforcement is the root cause the wrapper bypass exploits.
- `[chainalysis2022nft]` — cohort-scale NFT-marketplace volume and royalty-payment-rate framing.

## Discussion

The NFT wrapper royalty circumvention cohort is the T12.003 sub-pattern that most clearly demonstrates the structural ceiling of marketplace-side royalty enforcement. Even in a counterfactual world where every NFT marketplace enforced creator royalties at the contract level, the wrapper path would remain open because wrapper tokens trade on DEXes and AMM venues that have no royalty infrastructure. The structural fix — protocol-level royalty enforcement that follows the asset across wrapping events — requires changes at the token-standard layer (a successor to ERC-2981 with on-chain enforcement, or an EIP-7572-class metadata standard that wrapper protocols can voluntarily query) that were not deployed at the OAK v0.1 cutoff.

The case is the fourth T12.003 worked example and anchors the wrapper-based sub-pattern alongside the marketplace-policy sub-pattern (X2Y2/LooksRare, OpenSea Operator Filter sunset, 2024 market-wide royalty-optional norm). The wrapper sub-pattern is expected to grow in operational significance as NFT-Fi infrastructure matures and wrapper-path volume share increases; contributors writing future T12.003 examples should expect wrapper-based circumvention to be the dominant royalty-bypass vector once marketplace-side policy stabilises.
