# Sentiment Balancer read-only reentrancy exploit — 2023-04

**Loss:** **~$1M** extracted from Sentiment, a DeFi lending protocol on Arbitrum, on 2023-04-04 via a read-only reentrancy attack against Balancer V2's view functions. The attacker re-entered Balancer's view/pure price-query function while Balancer was mid-execution (processing a liquidity operation), reading a temporarily stale price that undervalued pool assets. Sentiment's lending protocol, consuming the stale Balancer price for collateral valuation, accepted the undervalued assets as collateral and allowed the attacker to borrow against the stale (favourable-to-attacker) valuation.
**OAK Techniques observed:** **OAK-T9.010** (Read-Only Reentrancy) — canonical cross-protocol anchor. The vulnerable target (Balancer V2 — the protocol whose mid-execution state was read) and the victim consumer (Sentiment — the protocol that trusted the stale view-function output for a collateral-valuation decision) are distinct contracts. The attack exploited Sentiment's trust in Balancer's view-function freshness during Balancer's own state transition.
**Attribution:** **unattributed** — no public attribution at v0.1 cutoff.

**Key teaching point:** Sentiment/Balancer is the canonical T9.010 anchor: read-only reentrancy is a cross-protocol vulnerability — the target whose state is read mid-execution (Balancer) is not the protocol that loses funds (Sentiment). This distinguishes T9.010 from classic reentrancy (T9.005), where the vulnerable contract is also the victim. The detection signal is the cross-protocol staticcall trace: a staticcall to protocol T while T's outermost call frame has not yet returned, and the staticcall result is consumed for a value-transfer decision on protocol C.

## Summary

On 2023-04-04, an attacker exploited a read-only reentrancy vulnerability where Balancer V2 (on Arbitrum) served as the target and Sentiment served as the victim consumer.

The attack sequence: (1) the attacker initiated a liquidity operation on Balancer V2 (e.g., a swap or pool join/exit), putting Balancer into a mid-execution state where pool balances were temporarily inconsistent; (2) during Balancer's execution, the attacker's callback triggered a transaction on Sentiment's lending protocol; (3) Sentiment called Balancer's view function (`getPrice` or equivalent) via a staticcall to value the attacker's collateral; (4) because Balancer was mid-execution, the view function returned a stale price — a price that had not yet incorporated the pending liquidity operation; (5) Sentiment accepted the stale (undervalued) price as collateral value and allowed the attacker to borrow assets at a favourable collateral ratio; (6) Balancer's liquidity operation completed; the attacker's stale-price loan was now undercollateralised; the attacker walked away with the borrowed assets (~$1M).

The attacker profited from the difference between the stale (favourable) collateral valuation and the settled (unfavourable) valuation, crystallised as an undercollateralised loan that would not be possible under normal (settled-state) pricing.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-04-04 | Read-only reentrancy against Balancer V2 → stale price consumed by Sentiment → ~$1M extracted | T9.010 (cross-protocol read-only reentrancy) |

## Public references

- Sentiment incident post-mortem (2023-04-04).
- Balancer V2: view-function freshness during liquidity operations (protocol documentation).
- Security researcher analysis: read-only reentrancy cross-protocol dependency exploitation.
