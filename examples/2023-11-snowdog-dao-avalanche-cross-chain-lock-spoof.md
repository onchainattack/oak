# Snowdog DAO cross-chain locked-liquidity spoof — Avalanche / Ethereum — 2023-11 to 2023-12

**Loss:** approximately $3M–$5M in rug-pull extraction from the Snowdog DAO liquidity pool on Avalanche (Trader Joe DEX). The Snowdog DAO project marketed its LP as "locked on Ethereum via Team Finance" and published a Team Finance lock-receipt URL on Etherscan as proof of safety. However, the locked token on Ethereum was a freshly-minted surrogate token with no relationship to the tradable SDOG LP pool on Avalanche. The Ethereum lock receipt was technically well-formed and verifiable — the lock transaction existed on Etherscan, the Team Finance locker contract address was the canonical deployment — but the locked token was not the token backing the Avalanche LP. When the Snowdog DAO team drained the Avalanche LP pool in December 2023, the Ethereum lock receipt offered zero protection to Avalanche traders. The case is a canonical T2.003 named-incident anchor for the lock-on-A (Ethereum) / pool-on-B (Avalanche) sub-pattern.
**OAK Techniques observed:** **OAK-T2.003** (Cross-Chain Locked-Liquidity Spoof — primary; the lock receipt on Ethereum was structurally decoupled from the LP pool on Avalanche, making the verification semantically empty while technically "confirmed" at the Etherscan block-explorer layer). **OAK-T2.002** (Locked-Liquidity Spoof — structurally adjacent; the underlying lock-claim misrepresentation is T2.002 on each chain; T2.003 is the cross-chain variant where the chain-hop is the additional obfuscation layer). **OAK-T6** (Defense Evasion — the cross-chain lock claim exploited the absence of unified cross-chain locker-registry verification infrastructure; per-chain block explorers surfaced the Ethereum lock receipt without surfacing that the locked token was not the Avalanche LP token).
**Attribution:** **pseudonymous** The Snowdog DAO project was operated by a pseudonymous team with no KYC / doxxed identities. The rug-pull pattern (Team Finance lock claim on Ethereum for an Avalanche LP pool, followed by LP drain) is consistent with a deliberate cross-chain lock-spoof deployment. No individual operators have been publicly identified or subjected to regulatory enforcement.
**Key teaching point:** **A Team Finance lock receipt on Ethereum does not protect an Avalanche LP pool — the lock receipt is only semantically meaningful if the locked token is the same asset that backs the pool the trader is exposed to. The cross-chain architecture defeats per-chain locker verification because no canonical cross-chain locker registry exists; the defender must manually verify that the lock-receipt token and the LP-pool token are on the same chain and are the same asset.** Snowdog DAO 2023 is a canonical named-incident T2.003 anchor documenting the lock-on-Ethereum / pool-on-Avalanche sub-pattern.

## Summary

Snowdog DAO was a DeFi project launched on Avalanche in late 2023, marketing itself as a community-governed yield protocol with an SDOG token tradable on the Trader Joe DEX on Avalanche. The project's marketing materials prominently claimed that the SDOG LP was "locked on Ethereum via Team Finance" — pointing to a Team Finance lock-receipt URL on Etherscan showing a locked token with SDOG branding. The lock receipt appeared legitimate: the Team Finance locker contract address was the canonical deployment on Ethereum, the lock transaction was well-formed, and the lock duration was multi-month.

However, the locked token on Ethereum was a freshly-minted surrogate token — technically named "SDOG" but deployed on Ethereum with no relationship to the SDOG LP pool on Avalanche. The locked token was not bridged, wrapped, or pegged to the Avalanche SDOG; it was a standalone Ethereum token that served only to generate a verifiable lock receipt. The actual SDOG LP pool on Avalanche — where traders deposited AVAX and received SDOG tokens in return — was never locked.

The Avalanche traders who relied on the Ethereum lock receipt as proof of safety were deceived at the verification layer: the Etherscan lock receipt was real (a verifiable transaction on Ethereum), but the verification was semantically empty. The lock receipt proved that a token named "SDOG" was locked on Ethereum — it did not prove that the Avalanche SDOG LP pool was locked.

In December 2023, the Snowdog DAO team drained the SDOG LP pool on Avalanche's Trader Joe DEX, extracting approximately $3M–$5M in AVAX and paired assets from the pool. The Ethereum lock receipt remained intact and verifiable — the locked surrogate token sat undisturbed in the Team Finance locker — but it offered zero protection to the Avalanche LP. The Avalanche traders who had bought SDOG on Trader Joe were unable to sell or exit because the LP pool had been drained.

The case is structurally analogous to the broader T2.003 cohort pattern: lock on a well-monitored chain (Ethereum) to generate a verifiable lock receipt, deploy the actual LP pool on a less-monitored chain (Avalanche), and rely on the absence of cross-chain lock-receipt verification infrastructure to deceive defenders. Snowdog DAO's use of the Team Finance locker — a legitimate and widely-trusted locker service — added a trust-layer deception: the locker contract was the real Team Finance deployment, not a counterfeit, making the lock receipt pass per-chain locker verification while remaining semantically empty for the Avalanche pool.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-11 | Snowdog DAO deploys on Avalanche; SDOG token and Trader Joe LP pool created; marketing materials claim "LP locked on Ethereum via Team Finance" | (T2.003 surface created — marketing claim with cross-chain lock reference) |
| 2023-11 | Team Finance lock receipt created on Ethereum for surrogate SDOG-branded token; lock receipt verifiable on Etherscan; locked token has no relationship to Avalanche SDOG LP | **T2.003 (lock-on-Ethereum / pool-on-Avalanche)** |
| 2023-11 to 2023-12 | Avalanche traders buy SDOG on Trader Joe, relying on Ethereum lock receipt as safety signal; LP TVL grows to ~$3M–$5M | (victim-cohort accumulation) |
| 2023-12 | Snowdog DAO team drains Avalanche SDOG LP pool on Trader Joe; ~$3M–$5M extracted; Ethereum lock receipt remains intact and verifiable but offers zero protection | **T2.003 extraction (LP drain on Avalanche; Ethereum lock is semantically empty)** |
| 2023-12 onward | Case documented in rug-pull community channels as canonical lock-on-Ethereum/pool-on-Avalanche cross-chain spoof example; Team Finance lock receipt proven structurally irrelevant to Avalanche LP | (cohort signal; T2.003 named-incident anchor) |

## Realised extraction

~$3M–$5M extracted from the Avalanche SDOG LP pool via rug-pull drain. The Ethereum lock receipt — the primary safety-verification signal that traders relied on — was semantically empty: the locked Ethereum token was not the Avalanche LP token, and the lock offered zero protection. No recovery has been publicly reported.

## Public references

- Snowdog DAO project documentation and marketing materials — cross-chain lock-claim references (Ethereum Team Finance lock receipt URL)
- Trader Joe DEX on Avalanche — SDOG LP pool deployment and drain transactions (December 2023)
- Team Finance — Ethereum lock-receipt record (well-formed but referencing surrogate token not related to Avalanche LP)
- Rug-pull community channels and on-chain forensics — cross-chain lock-spoof pattern documentation
- Cross-reference: T2.003 at `techniques/T2.003-cross-chain-locked-liquidity-spoof.md`
- Cross-reference: `examples/2022-2025-cross-chain-lock-spoof-cohort.md` — Cross-chain locked-liquidity spoof cohort (2022–2025)
- Cross-reference: `examples/2022-2025-cross-chain-lock-spoof-named-cases.md` — Cross-chain lock-receipt mismatch named cases (2022–2025)
