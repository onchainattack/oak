# OAK-DS-01 — Token Deployment Events and Bytecode

**Layer:** on-chain
**Chains:** EVM, Solana, cross-chain
**Typical access path:** RPC node `eth_getTransactionReceipt` for the deployment tx + `eth_getCode` for the deployed bytecode; equivalent on Solana via mint-account inspection; block explorers (Etherscan, Solscan) and indexers (The Graph, Dune Analytics, Allium) provide enriched access.

## Description

Records the moment a new token contract is deployed: deployer address, deployment block, raw bytecode, constructor parameters, and (for Solana SPL Token-2022) the list of enabled extensions and their authorities. From a defender's perspective this is the earliest observable signal in a token's lifecycle, and it is the substrate on which OAK-T1 (Token Genesis) Techniques are detected.

## What data

- Deployment transaction sender (deployer cluster identification).
- Deployed contract address and runtime bytecode.
- Constructor parameters (where source-verified) including owner / admin role assignments.
- Token standard / extension list (Solana SPL Token-2022 specific: `PermanentDelegate`, `TransferHook`, `MintCloseAuthority`, etc.).
- Source-verification status at the relevant block explorer (verified / unverified / partial-match).

## Where defenders access it

RPC nodes for raw data; block explorers for verified-source enrichment; data-warehouse indexers (Dune, Allium, Flipside) for cohort-scale analysis.

## Techniques that depend on this Data Source

- OAK-T1.001 — Modifiable Tax Function (static analysis of fee-modification surface).
- OAK-T1.002 — Token-2022 Permanent Delegate (extension-list enumeration).
- OAK-T8.001 — Common-Funder Cluster Reuse (deployer-address clustering).

## Maintainer notes

Source-verification status is itself a meaningful signal — a token whose source is unverified at the block explorer is a candidate OAK-T6 (Defense Evasion) modifier on whatever T1 Technique applies, and is captured separately under OAK-T6.001 (Source-Verification Mismatch).
