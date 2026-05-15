# Curve Vyper read-only reentrancy exploit (market.xyz consumer) — 2023-07

**Loss:** **~$70M** extracted across multiple DeFi protocols on Ethereum on 2023-07-30 via a read-only reentrancy attack against Curve Finance's Vyper-based pool contracts. The attacker re-entered Curve's Vyper-compiled pool contracts during a liquidity operation, reading temporarily stale pool balances. Multiple consumer protocols — including market.xyz (a lending protocol), Ellipsis, and others — trusted the stale Curve price oracles for collateral valuation, liquidation decisions, and borrow-limit calculations. The attack is structurally distinct from the Vyper-reentrancy-lock-bypass incidents (T9.005) that occurred on the same day against different Curve pools: this attack exploited the cross-protocol read-only reentrancy path (T9.010), not the same-contract reentrancy path.
**OAK Techniques observed:** **OAK-T9.010** (Read-Only Reentrancy) — cross-protocol stale-read via Curve Vyper pools. The vulnerable target (Curve Finance Vyper pools) and the victim consumers (market.xyz lending protocol, Ellipsis, and others) are distinct protocols. **OAK-T9.005** (Reentrancy) — the same-day Curve Vyper reentrancy-lock-bypass incidents are classified separately under T9.005 (same-contract state-mutating reentrancy), while the cross-protocol stale-read attacks are T9.010.
**Attribution:** **unattributed** — no public attribution at v0.1 cutoff.

**Key teaching point:** The July 2023 Curve Vyper incident cluster demonstrates the distinction between T9.005 (same-contract reentrancy — Vyper reentrancy-lock bypass, loss on Curve itself) and T9.010 (cross-protocol read-only reentrancy — stale Curve price consumed by market.xyz/Ellipsis, loss on consumer protocols). Both occurred on the same day against the same pool family, but exploit different structural vulnerabilities: T9.005 exploits the absence/failure of a reentrancy lock on the target; T9.010 exploits a consumer's trust in the target's view-function freshness during the target's own state transition.

## Summary

On 2023-07-30, multiple Curve Finance pools compiled with specific Vyper versions (0.2.15, 0.2.16, 0.3.0) were exploited via two structurally distinct attack paths:

1. **T9.005 path (same-contract reentrancy):** The Vyper compiler's reentrancy-lock implementation was bugged — the lock did not prevent reentrancy. Attackers directly re-entered the pool's state-mutating functions, draining pool assets. Loss on Curve pools: ~$52M (alETH/ETH, pETH/ETH, msETH/ETH, CRV/ETH).

2. **T9.010 path (cross-protocol read-only reentrancy):** While Curve pools were mid-execution (processing the T9.005 reentrancy or independent liquidity operations), their view functions returned stale pool balances. Consumer protocols — market.xyz (lending), Ellipsis (stable-swap), and others — called Curve's price oracles via staticcall to value collateral, and the stale prices produced undervaluations that enabled undercollateralised borrowing or liquidation at unfavourable rates. Loss on consumer protocols: ~$18M+.

The T9.010 path exploits the cross-protocol dependency: Curve's view-function freshness is a security assumption of every protocol that consumes Curve price oracles. When Curve is mid-execution, that assumption is violated, and consumers that do not verify oracle freshness (or that use a stale-oracle-resilient pricing mechanism) suffer loss.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-07-30 | Vyper-compiled Curve pools exploited via reentrancy-lock bypass | T9.005 (same-contract reentrancy) |
| 2023-07-30 | market.xyz, Ellipsis, and other consumer protocols exploited via stale Curve oracle prices | T9.010 (cross-protocol read-only reentrancy) |
| 2023-07-30 | Curve and affected protocols begin incident response; Vyper team confirms compiler bug | (incident response) |

## Public references

- Curve Finance: Vyper compiler reentrancy-lock vulnerability disclosure (2023-07-30).
- Vyper: compiler bug advisory for versions 0.2.15, 0.2.16, 0.3.0.
- market.xyz: incident post-mortem — stale Curve oracle price exploitation (2023-07).
- Security researcher analysis: the two distinct attack paths — same-contract vs. cross-protocol reentrancy (2023-07).
