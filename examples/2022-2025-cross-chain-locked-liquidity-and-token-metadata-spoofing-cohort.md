# Cross-Chain Locked-Liquidity and Token Metadata Spoofing Cohort — 2022–2025 — Aggregate $20M+

**Loss:** Aggregate loss estimated at $20M+ across the cross-chain lock-spoof and token-metadata-spoofing sub-cohorts spanning 2022–2025. Individual named-incident losses range from ~$500K to ~$5M; the majority of cases are documented at cohort scale within rug-pull retrospectives rather than as separately-named forensic write-ups. The loss attribution challenge mirrors the broader T2 verification problem: the claim-spoof surface is systemic while the per-incident forensic record is sparse.

**OAK Techniques observed:** **OAK-T2.003** (Cross-Chain Locked-Liquidity Spoof — the deployer publishes a marketing claim of "LP locked" on chain A, pointing to a lock receipt or locker-contract entry on a well-monitored chain, while the actual tradable LP is held on chain B where defender tooling and locker-registry coverage are weaker. The on-chain authority structure that would constrain the deployer is on a chain where no such LP exists, and the LP that does exist is on a chain where no such constraint is recorded.) **OAK-T2.005** (Token Metadata Spoofing — the adversary deploys a token contract whose ERC-20 `name()`, `symbol()`, and `decimals()` return values impersonate a legitimate high-value token, while the token's actual behaviour differs materially. The wallet UI and block explorer display the impersonated name/symbol, misleading the user into believing they are interacting with the legitimate asset.) **OAK-T6.006** (Counterfeit Token Impersonation — the full-spectrum brand-counterfeit: the adversary constructs a complete counterfeit-brand surface spanning on-chain metadata and off-chain brand assets including logo, website, social-media presence, and CoinMarketCap/CoinGecko listing impersonation. T6.006 is the full-spectrum variant; T2.005 is the on-chain metadata primitive that makes the display-level impersonation possible.)

**Attribution:** **unattributed** — Both sub-patterns span independent operators across Ethereum, BSC, Polygon, Avalanche, Arbitrum, Base, and Solana. Cross-chain lock spoofing is concentrated at multi-chain launch venues where the same token markets itself across chains; metadata spoofing is concentrated on DEXs where the token-selector UI displays name/symbol without canonical-address cross-referencing.

**Key teaching point:** **Both T2.003 and T2.005 exploit the same structural gap: the verification surface that would catch the misrepresentation lives in a different system than the one the user is looking at when they make the trust decision.** For T2.003, the user sees the lock-receipt URL on chain A and assumes it covers the pool on chain B — a cross-chain binding that no canonical tooling verifies end-to-end. For T2.005, the user sees "USDT" in the wallet token selector and assumes it is the canonical USDT contract — a metadata-to-address binding that the wallet does not cross-reference against a token registry. In both cases, the attacker does not need to defeat a security control; they only need to exploit the gap between what the UI displays and what the verification infrastructure checks. **The wallet, block explorer, and DEX aggregator are the defender's highest-leverage intervention points for both Technique classes.**

## Summary

This cohort entry documents two distinct but structurally related T2 sub-patterns that share the same root cause: **the user-facing UI displays a claim (lock receipt, token metadata) whose on-chain reality differs from what the claim implies, and the verification that would surface the discrepancy is not performed by the UI the user is looking at.**

### T2.003: Cross-Chain Locked-Liquidity Spoof

The cross-chain lock-spoof pattern emerged as multi-chain token launches became standard. A project deploys its tradable LP on chain B (BSC, Polygon, Solana, Base — typically a chain with weaker locker-registry coverage) while publishing a marketing claim referencing a lock receipt on chain A (Ethereum — typically the chain with the strongest locker-registry and block-explorer UX). The lock receipt is "real" in the narrow sense that a transaction hash or locker-contract entry exists on chain A, but the LP tokens referenced by that lock entry are freshly-minted tokens on chain A with no relationship to the tradable pool on chain B. The marketing claim is literally true at the transaction-hash level and semantically empty at the pool-constraint level.

Two operational sub-patterns dominate:

- **Lock-on-A pool-on-B (standard variant).** The project explicitly or implicitly claims "LP locked" and provides an Etherscan link to a Team Finance or Unicrypt lock entry on Ethereum. The pool, however, is on BSC or Base. The lock receipt on Ethereum covers a token with the same name/symbol deployed on Ethereum, but that token has no liquidity and is not the token users are trading. The pool on BSC has no lock at all.

- **Address-overlap variant.** The locker-contract address on chain B has the *same address* as a legitimate locker on chain A (e.g., the Team Finance locker at its canonical Ethereum address). Because EVM address spaces are not chain-bound, a deployer can deploy a lookalike contract at that address on chain B. The block explorer displays the address; a user who recognises the canonical Ethereum locker address may assume the deployment on chain B is the same contract. It is not — the bytecode at that address on chain B is a deployer-controlled lookalike with administrative override.

**Named cases:**

- **Snowdog DAO — Ethereum / Avalanche — November–December 2023 — ~$3M–$5M.** The canonical named-incident anchor for the lock-on-A pool-on-B sub-pattern. The project marketed a Team Finance lock receipt on Ethereum while the tradable pool operated on Avalanche (Trader Joe). The Ethereum lock covered a token with no Avalanche bridge or pool relationship. The mismatch was surfaced only after the rug event when victims attempted to verify the lock claim and discovered the chain discrepancy.

- **Cross-chain lock-spoof cohort — 2022–2025.** The broader cohort is documented within the TM-RugPull dataset (~1,028 multi-chain projects spanning 2016–2025), which explicitly spans multiple chains and contains sub-cohorts where the lock claim and pool location are on different chains. The SolRPDS dataset (~62,895 suspicious Solana liquidity pools spanning 2021–2024) provides the Solana-side counterpart for cases where a marketing claim references an Ethereum or BSC lock for a Solana pool.

### T2.005 + T6.006: Token Metadata Spoofing and Counterfeit Token Impersonation

The token-metadata-spoofing pattern exploits the ERC-20 metadata primitives — `name()`, `symbol()`, `decimals()` — which are not standardised against a canonical registry at the wallet or block-explorer display layer. A token contract returning `name() = "Tether USD"`, `symbol() = "USDT"`, `decimals() = 6` displays identically to the legitimate USDT at `0xdAC17F958D2ee523a2206206994597C13D831ec7` in virtually every wallet UI and block explorer, regardless of the token's actual transfer logic.

T2.005 (the metadata primitive) and T6.006 (the full-spectrum brand counterfeit) co-occur in most incidents but are structurally separable. A token that spoofs metadata without building a full off-chain brand-counterfeit operation (website, logo, social-media presence) is a pure T2.005 case relying solely on wallet/explorer display-level deception. A token that additionally deploys a clone website, copies the legitimate token's branding, and pursues CoinMarketCap/CoinGecko listing impersonation is a combined T2.005 + T6.006 case.

**The BSC PancakeSwap token-impersonation wave of 2021** is the canonical chain-scale cohort: attackers deployed tokens with `name()/symbol()` matching top-volume PancakeSwap pairs (USDT, USDC, BUSD, ETH, BTCB), seeded thin liquidity against WBNB, and routed swaps through attacker-owned pools. Users searching for "USDT" in the PancakeSwap token selector saw multiple results, indistinguishable by metadata alone; selecting the impersonator token routed the swap through the attacker's pool, delivering a worthless token with the "USDT" label.

**Operational sub-patterns:**

- **Pure metadata spoof (T2.005 only).** The token matches the legitimate asset's `name()`/`symbol()`/`decimals()` but has no off-chain brand presence. It relies entirely on the wallet/explorer display of on-chain metadata to mislead users who check the token selector but not the contract address.

- **Full brand counterfeit (T2.005 + T6.006).** The token matches the legitimate asset's metadata AND the attacker deploys a clone website, copies the logo, creates social-media accounts mirroring the legitimate project's branding, and pursues listing on CoinMarketCap/CoinGecko with the impersonated identity. The user encounter with the counterfeit token can span multiple touchpoints (website, Twitter, CoinGecko, wallet) without any single touchpoint surfacing the address mismatch.

- **Decimals-mismatch variant.** A naive impersonator returns the legitimate asset's `name()` and `symbol()` but gets `decimals()` wrong (e.g., "USDC" with `decimals() = 18` instead of `6`). This is the cheapest static check and catches a non-trivial fraction of unsophisticated impersonators.

**The wallet/explorer UX gap** is the load-bearing enabler for both T2.005 and T6.006. Wallet UIs and block explorers display the token's self-reported `name()` and `symbol()` as the primary identifier in the token selector, with the contract address typically displayed in a smaller font or hidden behind a "view on explorer" link. The user's trust decision is anchored to the human-readable name/symbol; the address verification is an optional step that no UI enforces. This is not a bug in any specific wallet — it is the industry-standard UX pattern, and the impersonation surface is a direct consequence of that pattern.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2020–2021 | Token-impersonation wave on Uniswap V2/V3: fake USDT/USDC/ETH tokens with manipulated name/symbol/decimals fields | T2.005 + T6.006 (class emergence) |
| 2021 | BSC PancakeSwap token-impersonation wave: attacker-deployed tokens matching top-volume pair symbols, seeded thin liquidity, routed swaps through attacker-owned pools | T2.005 + T6.006 (chain-scale cohort) |
| 2022 | Cross-chain lock-spoof pattern characterised in multi-chain rug-pull retrospectives | T2.003 (class emergence) |
| 2023-11 to 2023-12 | Snowdog DAO: lock-on-Ethereum Team Finance / pool-on-Avalanche Trader Joe; ~$3M–$5M | T2.003 (canonical named case) |
| 2022–2025 | Cross-chain lock-spoof cohort documented at scale in TM-RugPull (~1,028 multi-chain projects) and SolRPDS (~62,895 suspicious Solana pools) datasets | T2.003 (cohort scale) |
| 2024–2025 | Token-metadata-spoofing pattern persists across all major DEXs; no wallet or explorer integrates canonical-address cross-referencing as a default UX feature | T2.005 + T6.006 (ongoing) |

## Public references

- `[tmrugpull2026]` — TM-RugPull dataset: ~1,028 multi-chain rug-pull projects spanning 2016–2025
- `[solrpds]` — SolRPDS dataset: ~62,895 suspicious Solana liquidity pools spanning 2021–2024
- `[chainalysis2025rug]` — Chainalysis annual crypto-crime reporting documenting lock-misrepresentation as a recurring rug-pull enabler
- `[slowmist2024report]` — SlowMist annual blockchain security report
- Uniswap Token List, CoinGecko token list, 1inch Token List, Solana Token List — canonical token registries against which metadata cross-referencing should be performed
- See `techniques/T2.003-cross-chain-locked-liquidity-spoof.md`, `techniques/T2.005-token-metadata-spoofing.md`, and `techniques/T6.006-counterfeit-token-impersonation.md` for Technique definitions

## Discussion

The T2.003 / T2.005 / T6.006 cluster shares a common structural signature: **the claim that the user sees (lock receipt on chain A, "USDT" in the token selector, brand assets on a clone website) is technically true at its own layer and semantically false at the layer that matters for the user's economic decision.** The cross-chain lock receipt exists — but not for the pool the user is trading. The token metadata says "USDT" — but the contract address is not the canonical USDT deployment. The website looks legitimate — but the contract it links to is the impersonator.

The defender's highest-leverage intervention is **UI-layer canonical cross-referencing**: wallets and block explorers that display the token's self-reported name/symbol alongside a registry-backed "verified"/"unverified" badge based on canonical-address lookup; DEX aggregators that flag cross-chain lock-receipt mismatches at the pool-listing layer; and locker-contract registries that are unified across chains rather than per-chain silos. Each of these interventions is a UX change, not a protocol change, and the surface they close is large relative to the implementation cost.
