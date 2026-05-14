# Cygnus Finance read-only reentrancy via LP-token oracle — EVM — 2024-03

**Loss:** approximately \$200K extracted from Cygnus Finance via a read-only reentrancy against the protocol's LP-token collateral pricing oracle. The attacker exploited a stale view-function read from an integrated AMM pool that was mid-execution during a flash-loan-manipulated callback, obtaining an inflated LP-token valuation and borrowing against it.
**OAK Techniques observed:** **OAK-T9.010** (Read-Only Reentrancy) — primary; the attacker re-entered a view function on an integrated AMM pool while the pool was mid-execution, reading a stale LP-token price that Cygnus Finance consumed for a collateral-valuation decision. The loss was realised on Cygnus Finance (the consumer protocol), not on the AMM pool (the target). **OAK-T9.002** (Flash-Loan-Enabled Exploit) — secondary; flash-loaned capital scaled the per-iteration mispricing to a material extraction.
**Attribution:** **pseudonymous**. No public named-individual attribution; the attacker address is identifiable on-chain.
**Key teaching point:** **Cygnus Finance demonstrates that the read-only reentrancy class (T9.010) is a recurring integration-layer surface — any lending protocol that consumes a view-function read from an integrated AMM for collateral pricing is exposed to stale-read risk when the AMM can be mid-execution during the query.** The incident reinforces that the consumer protocol (the lender) is the loss surface, not the AMM whose view function was read.

## Summary

Cygnus Finance is a stablecoin-lending protocol on Ethereum that accepted LP tokens from integrated AMM pools as collateral. The protocol priced LP-token collateral via a view-function read (`get_virtual_price()` or equivalent) from the AMM pool contract.

In March 2024, an attacker exploited a read-only reentrancy vector: using a flash loan as working capital, the attacker manipulated an AMM pool's state mid-transaction via a callback from the pool's own operation. While the pool was mid-execution — its reserves temporarily distorted by the flash-loan-backed manipulation — Cygnus Finance's oracle read the pool's view function, which returned a stale (inflated) LP-token price. Cygnus extended a loan against the inflated valuation, and the attacker extracted the loan principal, leaving the protocol with bad debt of approximately \$200K.

The AMM pool itself lost nothing — the view-function read did not mutate the pool's state, and the pool's post-transaction invariants were intact. The loss was entirely on Cygnus Finance, the consumer protocol that trusted the view-function output at a moment when the pool was mid-execution. This is the canonical T9.010 pattern: the target contract (the AMM pool) is "innocent"; the victim is the consumer protocol that consumed the stale view-function read for an economic decision.

The incident structurally parallels the Curve Finance + Market.xyz read-only reentrancy chain of July 2023, where Market.xyz consumed a stale `get_virtual_price()` from Curve pools during the Vyper reentrancy window. The Cygnus case is a smaller-scale but independent confirmation that the T9.010 surface generalises across AMM-pool types and consumer-protocol architectures.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-2024-03 | Cygnus Finance deploys with LP-token collateral support; oracle reads AMM pool view function for pricing without read-only reentrancy guard | T9.010 surface present (latent) |
| 2024-03 (attack tx) | Attacker takes flash loan; initiates AMM pool operation that creates callback window | T9.002 (working-capital precondition) |
| 2024-03 (same tx) | During pool's mid-execution callback, Cygnus oracle reads pool's view function; receives stale/inflated LP-token price | **T9.010** (stale view-function read) |
| 2024-03 (same tx) | Cygnus extends loan against inflated LP-token valuation; attacker extracts loan principal — ~\$200K bad debt | **T9.010** extraction |
| 2024-03 (post-attack) | Cygnus pauses affected markets; patches oracle pathway with read-only reentrancy guard | (operator response) |

## Realised extraction

Approximately \$200K. No public recovery.

## Public references

- Cross-reference: T9.010 at `techniques/T9.010-read-only-reentrancy.md`.
- Cross-reference: 2023-07-curve-market-xyz-read-only-reentrancy at `examples/2023-07-curve-market-xyz-read-only-reentrancy.md` (canonical T9.010 anchor).
- Cross-reference: 2023-04-sentiment at `examples/2023-04-sentiment.md` (Sentiment Protocol read-only reentrancy via Balancer LP integration).

## Public References

See citations in corresponding technique file.
