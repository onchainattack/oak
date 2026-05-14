# Curve Finance Vyper + Market.xyz read-only reentrancy chain — Ethereum — 2023-07-30

**Loss:** approximately \$500K from Market.xyz (a lending protocol on Ethereum that accepted Curve LP tokens as collateral) via a read-only reentrancy against the Curve pool's `get_virtual_price()` view function during the Vyper-compiler-level reentrancy window. The Curve pool itself lost nothing from the Market.xyz leg — the view-function reentry did not mutate Curve's state. This case is structurally distinct from the direct Vyper reentrancy drains against the Curve pools themselves (approximately \$73M aggregate, catalogued under `examples/2023-07-curve-vyper.md`).

**OAK Techniques observed:** **OAK-T9.010** (Read-Only Reentrancy) — primary; the attacker re-entered Curve pool's `get_virtual_price()` view function while the pool was mid-execution during the Vyper `@nonreentrant` lock failure window, obtaining a stale (inflated) LP-token price. The stale price was consumed by Market.xyz's oracle pathway to extend a loan against inflated collateral valuation, and the attacker extracted the loan principal. The Curve pool was not the loss surface — its assets were unaffected by the `staticcall` view-function read. **OAK-T9.005** (Reentrancy — Vyper compiler-level) — composing precondition; the Vyper 0.2.15–0.3.0 `@nonreentrant` lock failure created the transaction-level window during which Curve pool state was temporarily inconsistent, enabling the stale read. **OAK-T9.002** (Flash-Loan-Enabled Exploit) — working-capital precondition that scaled the per-iteration mispricing to a single-transaction extraction.

**Attribution:** **pseudonymous**. The attacker address that submitted the Market.xyz-leg transaction is attributable at the on-chain identity layer; the read-only reentrancy trace path (`staticcall` to Curve pool `get_virtual_price()` while the pool's outermost frame had not returned) is reproducible from the transaction trace. No publicly named-individual attribution.

**Key teaching point:** **Read-only reentrancy (T9.010) is the reentrancy class where the target contract loses nothing — the loss is borne by a third protocol that trusted the target's view-function output at a moment when that output did not reflect settled state.** The Curve/Market.xyz chain is the cleanest operational anchor: the Vyper bug (T9.005) created the mid-execution stale-state window; Market.xyz consumed the stale `get_virtual_price()` reading (T9.010); the loss crystallised on Market.xyz's lending book. The structural lesson is that protocols consuming external view-function reads for pricing/accounting decisions must verify that the target contract is not mid-execution at the moment of the read.

## Summary

On 2023-07-30, the Vyper compiler's `@nonreentrant` lock failure (affecting Vyper versions 0.2.15–0.3.0) created a reentrancy window in multiple Curve Finance liquidity pools. Multiple Curve pools were drained via direct reentrancy (T9.005 — the attacker re-entered a state-mutating function and extracted pool assets). Separately, an attacker exploited the same Vyper-level reentrancy window against Market.xyz — a lending protocol that accepted Curve LP tokens as collateral and priced them via the Curve pool's `get_virtual_price()` view function.

The attack chain on the Market.xyz leg:

1. The Vyper `@nonreentrant` lock failure (described in `examples/2023-07-curve-vyper.md`) created a window where a Curve pool was mid-execution — the pool's state was temporarily inconsistent because the outer execution frame had not yet committed its writes.
2. During this window, the attacker called Market.xyz's lending function, which triggered an oracle price check that read Curve pool's `get_virtual_price()` via a `staticcall`.
3. Because the Curve pool was mid-execution, `get_virtual_price()` returned a stale (inflated) LP-token valuation that did not reflect the post-transaction settled state.
4. Market.xyz, trusting the stale price, extended a loan against the inflated collateral valuation. The attacker withdrew the loan principal in stablecoins/ETH.
5. When the Curve pool's transaction completed and the pool state settled, the LP-token's true price was lower than the price Market.xyz had consumed. Market.xyz was left with under-collateralised bad debt.

The Curve pool itself was entirely unaffected by the Market.xyz leg — the `staticcall` to `get_virtual_price()` is a read-only operation that does not mutate pool state. No assets left the Curve pool. The loss was borne entirely by Market.xyz, the consumer protocol that trusted the view-function output.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021-07-21 | Vyper 0.2.15 released; PR #2391 introduces the malformed `@nonreentrant` storage-slot allocation | (latent precondition — see curve-vyper example) |
| 2021-07–2021-11 | Curve pools deployed using vulnerable Vyper compiler versions; Market.xyz deploys lending protocol with Curve LP-token collateral support and `get_virtual_price()` oracle pathway | T9.010 surface present (latent) |
| 2023-07-30 (attack tx window) | Vyper `@nonreentrant` lock failure exploited against Curve pools; multiple direct-drain transactions execute | T9.005 (direct reentrancy — separate leg) |
| 2023-07-30 (attack tx window) | Attacker constructs transaction: Curve pool manipulation during Vyper-reentrancy window -> Market.xyz collateral deposit -> `get_virtual_price()` stale read -> inflated-collateral loan -> loan-principal withdrawal | **T9.010 extraction** |
| 2023-07-30 (post-tx) | Market.xyz left with under-collateralised bad debt of ~\$500K; Curve pool state settles correctly post-reentrancy window | T9.010 loss crystallised |
| 2023-07-30 onward | Vyper team publishes post-mortem; Curve ecosystem incident response; Market.xyz patching | (defender response) |
| Post-2023-07-30 | Audit-firm literature (Trail of Bits, Spearbit, OpenZeppelin) incorporates read-only reentrancy as a standard protocol-integration review item | (industry defensive-baseline improvement) |

## What defenders observed

- **The Curve pool was not the victim on the Market.xyz leg.** Forensic analysis that only examines the Curve pool's on-chain state (asset balances, LP-token supply, invariant checks) would find no anomaly — the pool's own invariants were not violated. The loss surface was Market.xyz's lending book, and the anomaly was the loan-extended-against-stale-collateral-value. This makes T9.010 harder to detect than T9.005 at the per-contract monitoring layer: the target protocol (Curve) shows no anomalous state, and the victim protocol (Market.xyz) shows a loan that appears correctly priced against the oracle reading at the moment of extension.

- **The Vyper `@nonreentrant` lock failure was a necessary but not sufficient condition.** The reentrancy window created by the Vyper bug made the Curve pool state temporarily inconsistent, which enabled the stale `get_virtual_price()` read. But the Market.xyz oracle pathway did not include any check that the target pool was not mid-execution — the Balancer `ensureNotInVaultContext` equivalent was absent. The structural T9.010 mitigation is the consumer-side check: before consuming a view-function output for a value-transfer decision, verify that the target contract's outermost call frame has returned.

- **The flash-loan working-capital precondition scaled the extraction.** Without flash-loaned capital (T9.002), the per-iteration mispricing from the stale `get_virtual_price()` read would have netted thousands of dollars. The flash loan converted a per-unit oracle inconsistency into a single-transaction ~\$500K extraction — the same structural pattern as the Sentiment 2023-04 case (`examples/2023-04-sentiment.md`) and the broader T9.005/T9.002 precondition-extraction cohort.

- **The read-only reentrancy class was already documented at advisory level.** Balancer had published guidance on the read-only reentrancy pattern (the `ensureNotInVaultContext` check) in early 2023. The Curve Vyper incident extended the class to the Curve LP-token integration surface, demonstrating that the class generalises across AMM designs (Balancer, Curve, Uniswap V2/V3) whenever a lending protocol consumes a pool's view-function output for collateral pricing without verifying that the pool is not mid-execution.

## What this example tells contributors writing future Technique pages

- **T9.010 is the reentrancy class where the victim and the vulnerable protocol are different.** In T9.005, the target contract is both the vulnerable surface and the victim (assets leave the target). In T9.010, the target contract (Curve pool) is the source of stale state but is not the victim; the consumer protocol (Market.xyz) is the victim but does not have the vulnerability in its own logic — the vulnerability is in the cross-protocol trust assumption that view-function reads return settled state. Worked examples for T9.010 should preserve the victim/vulnerable-protocol distinction explicitly.

- **Consumer-side read-only reentrancy guards are the load-bearing mitigation.** The Curve/Market.xyz case demonstrates that per-contract reentrancy guards (`ReentrancyGuard`, `@nonreentrant`) do not protect consumer protocols from read-only reentrancy because: (a) `ReentrancyGuard` blocks re-entry to state-mutating functions, not to view functions; (b) the target protocol's reentrancy guard may itself be buggy (as in the Vyper case); and (c) the consumer protocol has no way to enforce the target's reentrancy guard at the integration boundary. The only robust mitigation is the consumer-side check: before consuming a view-function read for a value-transfer decision, verify that the target contract's outermost call frame has returned.

- **The class composes with any reentrancy-capable target, not just Vyper-buggy ones.** The Curve Vyper bug made the Curve pools reentrancy-capable when they should not have been. But the same T9.010 surface exists against any protocol whose view functions can be read mid-execution via a legitimate callback path — see the Sentiment 2023-04 case for the Balancer Vault-callback equivalent. The structural condition is: Consumer Protocol C reads Target Protocol T's view function for pricing/accounting; T's execution model permits T to be mid-execution (via callbacks, hooks, or reentrancy) at the moment C reads it. This condition is architecture-agnostic and applies across all AMM and DeFi primitive designs.

## Public references

- `[vyperpostmortem2023]` — Vyper compiler post-mortem covering the `@nonreentrant` lock failure (0.2.15–0.3.0).
- `[curvepostmortem2023]` — Curve Finance post-mortem for the July 2023 Vyper-compiler-level reentrancy incident chain.
- `[sentimentpostmortem2023]` — Sentiment Protocol post-mortem (companion T9.010 case via Balancer LP integration, 2023-04).
- `[blockseccurve2023]` — BlockSec post-incident technical write-up covering the multi-pool Vyper reentrancy chain.
- `[trailofbitsreadonly2023]` — Trail of Bits advisory on read-only reentrancy as a distinct integration-layer vulnerability class.

## Discussion

The Curve/Market.xyz chain is OAK's canonical case for the **read-only reentrancy via AMM LP-token oracle** sub-pattern of T9.010. It pairs with the Sentiment 2023-04 Balancer case as the two cleanest 2023 operational anchors. Together they delineate the cross-AMM generality of the class: the Balancer Vault-callback read-only reentrancy surface (Sentiment) and the Vyper-compiler-level reentrancy window enabling the stale `get_virtual_price()` read (Market.xyz) are structurally equivalent at the consumer-protocol layer — in both cases, a lending protocol consumed a stale AMM-pool view-function output and extended credit against it. The AMM design and the specific reentrancy mechanism differ; the consumer-side vulnerability (trusting a view-function read during mid-execution) is identical.

The structural lesson for protocol integrators is: **every external view-function read consumed for a pricing or accounting decision is a cross-protocol trust assumption.** The consumer protocol is trusting that the target protocol's view function returns settled state. That trust assumption is violated whenever the target protocol is mid-execution — whether because of a compiler bug (Curve Vyper), a legitimate callback path (Balancer Vault), or a deliberate manipulation. The consumer-side mitigation is independent of the target's reentrancy surface: verify that the target's outermost call frame has returned before consuming its view-function output for a value-transfer decision.

The class composes with T9.005 (Reentrancy — state-mutating) when the reentrancy window that creates the stale state is itself a bug (the Vyper compiler-level reentrancy). In that case, T9.005 is the precondition Technique and T9.010 is the extraction Technique on the consumer leg. The distinction is operationally meaningful: defenders monitoring for T9.005 reentrancy on Curve pools would see the direct-drain transactions but could miss the Market.xyz leg because no state was mutated on Curve during the Market.xyz transaction. The defender lesson is that T9.010 detection requires cross-protocol call-trace analysis, not per-contract monitoring.

For OAK's broader coverage, the Curve/Market.xyz case closes the gap between the Sentiment 2023-04 Balancer-LP anchor and the broader read-only reentrancy surface. The two cases together establish that the surface is AMM-architecture-agnostic and that the consumer-side mitigation is the load-bearing defensive primitive.
