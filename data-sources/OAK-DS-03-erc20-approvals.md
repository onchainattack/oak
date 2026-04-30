# OAK-DS-03 — Token Approval Events

**Layer:** on-chain
**Chains:** EVM (primary), Solana (token-account delegate authority)
**Typical access path:** ERC-20 `Approval` and ERC-721 / ERC-1155 `ApprovalForAll` events; per-token-account delegate-authority changes on Solana.

## Description

Records the granting of transfer authority from a token holder to a third-party spender or operator. T4.004 (Approve-Pattern Drainer) and T4.005 (setApprovalForAll NFT Drainer) both produce explicit `Approval` / `ApprovalForAll` events at the moment of authority grant — making these the highest-leverage detection-side telemetry for the on-chain authority artefact.

## What data

- ERC-20 `Approval(owner, spender, value)` events.
- ERC-721 `Approval(owner, approved, tokenId)` events.
- ERC-721 / ERC-1155 `ApprovalForAll(owner, operator, approved)` events.
- Per-token allowance state via `allowance(owner, spender)` view calls.

## Where defenders access it

RPC node event subscription (real-time); block-explorer event tab; revoke.cash and similar tools (per-wallet allowance review); indexers for cohort-scale analysis.

## Techniques that depend on this Data Source

- OAK-T4.004 — Allowance / Approve-Pattern Drainer (primary authority-grant artefact).
- OAK-T4.005 — setApprovalForAll NFT Drainer (primary authority-grant artefact).
- OAK-T4.001 — Permit2 Authority Misuse (partial — Permit2 grants are off-chain signed but produce on-chain consumption events traceable through DS-04).

## Maintainer notes

Per-spender / per-operator clustering against known drainer-infrastructure watchlists is the canonical real-time detection methodology; vendor coverage is most mature at wallet vendors (Rabby, MetaMask, Coinbase Wallet) and at allowance-management tools (revoke.cash).
