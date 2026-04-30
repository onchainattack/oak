# OAK-DS-06 — Token Mint and Burn Events

**Layer:** on-chain
**Chains:** EVM, Solana
**Typical access path:** ERC-20 `Transfer` events with `from = 0x00...0` (mint) or `to = 0x00...0` (burn); equivalent on Solana via mint-account state changes.

## Description

Records changes to a token's total supply. Critical for OAK-T5.003 (Hidden-Mint Dilution) detection — both pre-event (presence of mint authority) and at-event (mint to deployer-clustered addresses).

## What data

- Mint events (transfer from null address); recipient, amount, timestamp.
- Burn events (transfer to null address); source, amount, timestamp.
- Total-supply trajectory derived from mint - burn over time.

## Where defenders access it

Standard ERC-20 `Transfer` event subscription, filtered for null-address counterparty; Solana mint-account state via RPC `getTokenSupply` and account-data inspection.

## Techniques that depend on this Data Source

- OAK-T5.003 — Hidden-Mint Dilution (post-launch mint events).
- OAK-T1.001 / T1.002 — Token Genesis (pre-launch presence of mint authority via DS-01).
- OAK-T9.004 — Access-Control Misconfiguration (Wormhole case: mint-without-corresponding-lock invariant violation).

## Maintainer notes

The "mint without corresponding lock" invariant — relevant at bridge wrapping contracts — is one of the highest-leverage real-time invariants a defender can monitor; a single violated DS-06 mint event paired with absence of the corresponding DS-10 lock event is an unambiguous T9.004 / T10.002 signal at runtime.
