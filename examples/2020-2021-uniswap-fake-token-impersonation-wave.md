# Uniswap V2/V3 fake-token impersonation wave — Ethereum — 2020-2021

**Loss:** cumulative estimate across the impersonation-wave cohort: low-confidence interval ~\$15M, high-confidence interval ~\$50M (no per-incident aggregation authority at the time; the figure is a retrospective lower-bound estimate from community-tracking efforts and DEX-volume-anomaly reconstruction).
**OAK Techniques observed:** **OAK-T2.005** (Token Metadata Spoofing — the ERC-20 `name()`/`symbol()`/`decimals()` return values impersonated legitimate high-value tokens); **OAK-T6.006** (Counterfeit Token Impersonation — full-spectrum brand counterfeit spanning on-chain metadata and, in many cases, off-chain token-list logo impersonation).
**Attribution:** **pseudonymous / unattributed (no named individuals publicly identified)**. The impersonation wave was conducted by a diffuse set of deployers; no single operator cluster was identified as responsible for a majority of the impersonation deployments. Attribution is at the pattern level rather than the actor level.
**Key teaching point:** **ERC-20 metadata (name/symbol/decimals) is the impersonation primitive — wallet UIs display it without cross-referencing the contract address against canonical token registries, creating a structurally-open impersonation surface that persists at OAK v0.1.**

## Summary

During the 2020-2021 DeFi summer and its aftermath, a wave of token-impersonation deployments targeted Uniswap V2 and V3 users on Ethereum mainnet. Attackers deployed token contracts whose ERC-20 `name()`, `symbol()`, and `decimals()` return values matched legitimate high-value tokens — primarily USDT (Tether USD), USDC (USD Coin), WBTC (Wrapped Bitcoin), and ETH — while the contract addresses differed from the canonical deployments. The impersonator tokens were paired against ETH or a legitimate stablecoin in Uniswap pools, creating a swap path where a user searching for "USDT" in the Uniswap token selector would see the impersonator token displayed as "USDT" with no visual indicator that the contract address differed from the legitimate `0xdAC17F958D2ee523a2206206994597C13D831ec7`.

The impersonation surface is the ERC-20 metadata display layer. The Uniswap Interface token selector, Etherscan token pages, and MetaMask token import all displayed the token's self-reported `name()` and `symbol()` as the primary identifier. None of these interfaces cross-referenced the token's contract address against a canonical token registry at the time. A token that returned `symbol() = "USDT"` was displayed as "USDT" regardless of its contract address, and a user clicking "Import Token" or selecting it in the swap interface had no in-UI indication that they were interacting with a non-canonical contract.

Some impersonator tokens embedded additional malicious logic: modifiable transfer taxes (T1.001), anti-sell restrictions, or honeypot mechanics where the user could buy but not sell. Others simply existed as address-space pollution — the impersonator token was tradable but was not the asset the user intended to acquire, and the user's swap routed to the impersonator pool rather than the canonical token's pool. In both cases, the metadata display was the lure: the user saw "USDT" and acted on that identifier.

The impersonation wave subsided as (a) the Uniswap Interface introduced the Uniswap Token List with default token curation, (b) Etherscan added token-verification badges and impersonation warnings, and (c) wallet UIs added token-import warnings. The structural surface — that ERC-20 metadata is self-reported and not registry-cross-referenced at the display layer — persists at OAK v0.1.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2020-05 | Uniswap V2 launches; token-selector UI displays self-reported `name()`/`symbol()` without registry cross-reference | (standing T2.005 surface) |
| 2020-06 to 2020-09 | "DeFi Summer" — Uniswap V2 volume surges; token-impersonation deployments begin appearing | T2.005 (metadata spoofing) |
| 2020-Q4 to 2021-Q1 | Impersonation wave peaks; fake USDT/USDC/WBTC/ETH tokens proliferate on Uniswap V2 | T2.005 + T6.006 |
| 2021-05 | Uniswap V3 launches; token-selector inherits V2's metadata-display pattern | (surface persists) |
| 2021-Q2 to 2021-Q4 | Uniswap Token List default curation and Etherscan token-verification badges reduce the surface; impersonation wave subsides | (defender response) |

## Realised extraction

Cumulative across the impersonation-wave cohort: low-confidence interval ~\$15M, high-confidence interval ~\$50M. The wide interval reflects the absence of a per-incident aggregation authority at the time — no single entity tracked losses across the full impersonation-wave cohort, and the figure is a retrospective lower-bound estimate from community-tracking efforts (DEX-volume-anomaly reconstruction, token-deployment enumeration, victim-report aggregation on Reddit/Twitter/Discord). Individual impersonator-token deployments typically extracted smaller amounts (low-thousands to mid-tens-of-thousands of dollars) before being flagged; the aggregate cohort extraction is large because the number of impersonator-token deployments was high.

## References

- Uniswap Token List (canonical token-registry reference — the post-hoc mitigation that reduced the impersonation surface).
- Etherscan token-verification badges and impersonation-warning documentation.
- MetaMask token-import warning documentation (post-2021).
- Community-tracking efforts: Reddit r/Uniswap, r/ethdev, and r/CryptoCurrency impersonation-warning threads (2020-2021); Twitter/X community-tracking threads.
- `[uniswapv2tokenimpersonation]` — see `citations.bib` (community-tracking aggregation of the 2020-2021 impersonation wave).
