# EigenLayer withdrawal slippage sandwich — Ethereum — 2024-05

**Loss:** estimated mid-six-figure ETH equivalent extracted from EigenLayer LST/LRT withdrawal transactions via slippage-manipulation sandwich attacks. The attacker exploited wide-slippage tolerance parameters on large withdrawal swaps, front-running the price to the victim's `amountOutMin` boundary and back-running to unwind at the post-swap price.
**OAK Techniques observed:** **OAK-T9.013** (Slippage-Manipulation Sandwich Attack) — primary; the attacker exploited the victim's own slippage-tolerance parameter as the profit surface, pushing the pool price to the exact boundary of the victim's authorised slippage band. **OAK-T5.004** (Sandwich MEV Extraction) — structurally adjacent; the standard sandwich infrastructure provided the execution substrate.
**Attribution:** **pseudonymous** — MEV searcher bot addresses are on-chain attributable. The sandwich bundle is identifiable at the block-builder layer.
**Key teaching point:** **EigenLayer withdrawal sandwiches demonstrate that the slippage-tolerance-as-attack-surface pattern (T9.013) is most acute during high-volume protocol events where users submit large swaps with wide slippage — the user's protection against failed execution becomes the attacker's profit ceiling.** The incident reinforces that wallet-side auto-slippage calculation based on pool depth is the highest-leverage per-user mitigation.

## Summary

EigenLayer is an Ethereum restaking protocol. In May 2024, following a major protocol upgrade that enabled withdrawals of previously-restaked ETH and LSTs/LRTs, a wave of large withdrawal transactions hit the Ethereum mempool. Many users — some institutional, some retail — submitted withdrawal swaps (LST/LRT-to-ETH) with wide slippage tolerances (3–10%) to ensure execution under the volatile post-upgrade conditions.

MEV searchers, observing the wave of high-slippage swaps in the public mempool, executed T9.013 sandwiches against these withdrawals:

1. **Front-run:** The searcher front-ran the victim's swap, moving the pool price to the exact boundary of the victim's `amountOutMin`.
2. **Victim's swap:** The victim's withdrawal executed at the worst-acceptable rate — the `amountOutMin` was exactly satisfied, never exceeded.
3. **Back-run:** The searcher back-ran to unwind at the post-victim-swap price, capturing the full authorised slippage band as profit.

The attack was particularly profitable because (a) the withdrawal swaps were large (institutional-scale), (b) slippage tolerances were wide due to post-upgrade volatility expectations, and (c) the pools involved had sufficient depth for the attacker to push price to the slippage boundary without excessive capital commitment. Individual sandwich extractions ranged from tens to hundreds of ETH-equivalent.

The incident structurally parallels the broader slippage-manipulation sandwich cohort: the victim's slippage tolerance — intended as execution-certainty protection — became the attacker's profit surface. The wider the band, the deeper the attacker could push the price and the larger the extraction.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-05 (upgrade) | EigenLayer enables withdrawals; wave of large LST/LRT-to-ETH swaps hits mempool with wide slippage tolerances | T9.013 surface (event-driven) |
| 2024-05 (attack windows) | MEV searchers identify high-slippage withdrawal swaps in public mempool; execute T9.013 sandwiches: front-run to `amountOutMin` boundary, victim swap at worst rate, back-run unwind | **T9.013** extraction |
| 2024-05 (repeated) | Multiple withdrawal swaps sandwiched across the post-upgrade window; aggregate extraction estimated mid-six-figure ETH-equivalent | T9.013 (cohort pattern) |
| 2024-05 onward | EigenLayer community issues guidance on slippage-tolerance reduction and private transaction relay for large withdrawals | (mitigation guidance) |

## Realised extraction

Estimated mid-six-figure ETH equivalent across multiple withdrawal transactions. No single headline loss; the extraction was distributed across multiple victims and multiple sandwich bundles.

## Public references

- Cross-reference: T9.013 at `techniques/T9.013-slippage-manipulation-sandwich-attack.md`.
- Cross-reference: 2021-2025-slippage-manipulation-sandwich-cohort at `examples/2021-2025-slippage-manipulation-sandwich-cohort.md` (broader EVM/multi-chain T9.013 anchor).
- Cross-reference: 2023-2024-squeeth-volatility-auction-slippage at `examples/2023-2024-squeeth-volatility-auction-slippage-sandwich.md` (Squeeth auction variant of T9.013).

## Public References

See citations in corresponding technique file.
