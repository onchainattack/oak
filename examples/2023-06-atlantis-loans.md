# Atlantis Loans audit-bytecode-mismatch exploit — BNB Chain — 2023-06-10

**Loss:** approximately **$2.5 million** drained from Atlantis Loans lending pools on BNB Chain. The protocol held a legitimate audit from a recognised firm on its v1 lending-pool contracts published in December 2022, but the deployed v2 "yield-optimising" router contract — deployed in May 2023 and holding approximately $4M in user-deposited collateral at the time of exploitation — was never submitted for audit. The unaudited router contained a reentrancy vulnerability in its `withdrawCollateral()` function that the attacker exploited to drain pool assets.

**OAK Techniques observed:** **OAK-T6.003** (Audit-of-Different-Bytecode-Version — primary; the protocol legitimately held a registry-verifiable audit on the v1 lending-pool contracts published December 2022, but the v2 router contract deployed in May 2023 — which held user-deposited collateral and routed deposits and withdrawals across the lending pools — was a different codebase entirely, unaudited, and contained the exploitable vulnerability) + **OAK-T9.001** (Reentrancy Exploit — the technical root cause was a reentrancy vulnerability in the `withdrawCollateral()` function of the v2 router, allowing the attacker to drain pool assets through recursive withdrawal calls) + **OAK-T7.003** (Cross-Chain Bridge Laundering — the drained BNB-chain assets were bridged to Ethereum via Stargate Finance and subsequently routed through Tornado Cash).

**Attribution:** **pseudonymous** — the attacker EOA and contract addresses are observable on-chain. The Atlantis Loans team operated under pseudonymous identities and deleted their Telegram and X/Twitter accounts within 48 hours of the exploit. No named individual has been publicly attributed at v0.1. The audit firm confirmed that the v2 router contract was not within the December 2022 audit scope.

**Key teaching point:** Atlantis Loans is the canonical illustration of the **incremental-deployment audit-scope-drift sub-pattern** of T6.003: a protocol starts with an audited v1 codebase, deploys a new v2 contract as an incremental upgrade, and markets the v1 audit as coverage for the entire deployed system — while the v2 contract (which now holds user funds or controls the user-funds routing surface) was never audited. The sub-pattern is distinct from the "multi-contract system with single-contract audit" case (Arbix Finance) in that the audit scope was once correct (at v1 launch) and drifted over time through incremental deployment.

## Summary

Atlantis Loans was a lending protocol on BNB Chain that launched its v1 in late 2022, offering single-asset lending pools with over-collateralised borrowing. In December 2022, the protocol obtained a smart-contract audit from a recognised firm covering the v1 lending-pool contracts (deposit, withdraw, borrow, repay, liquidate). The audit was published in the firm's public registry and was verifiable. The protocol used the audit as its primary defensive-baseline marketing claim.

In May 2023, Atlantis Loans deployed a v2 "yield-optimising router" contract — a new contract that was not a proxy-upgrade replacement but a separately-deployed routing layer. The v2 router accepted user-deposited collateral and routed it across the v1 lending pools, applying a yield-optimisation strategy that rebalanced collateral across pools based on utilisation rates. The v2 router held approximately $4M in user-deposited collateral at the time of the exploit. Critically, the v2 router was never submitted for audit — it was deployed outside the scope of the December 2022 audit, which had covered only the v1 lending-pool contracts.

On June 10, 2023, an attacker exploited a reentrancy vulnerability in the v2 router's `withdrawCollateral()` function. The function updated the user's collateral balance only *after* making an external call to transfer the withdrawn tokens — a classic reentrancy pattern. The attacker deployed a malicious contract that recursively called `withdrawCollateral()` during the external transfer, draining approximately $2.5 million in user-deposited assets (BUSD, USDT, WBNB, and ETH) from the router's collateral pool before the balance update could be applied.

The audit-scope-mismatch dimension was the load-bearing T6.003 surface: the protocol's marketing continued to cite the December 2022 v1 audit as coverage for the platform, while the v2 router — the contract holding user funds at risk — was an entirely different, unaudited codebase. Users who verified the audit in the firm's registry would have found a confirmatory result (the v1 audit existed) and would not have been alerted that the v2 router holding their collateral was outside scope.

The drained assets were bridged from BNB Chain to Ethereum via Stargate Finance and subsequently routed through Tornado Cash. The Atlantis Loans team deleted their Telegram and X/Twitter accounts within 48 hours; the audit firm later confirmed in a public statement that the v2 router was not in scope of the December 2022 engagement.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-12 | Atlantis Loans v1 lending-pool contracts audited; audit published in firm's public registry; protocol markets "audited by [Firm]" as primary trust signal | T6.003 (audit scope = v1 contracts only) |
| 2023-05 | v2 yield-optimising router contract deployed; accepts user-deposited collateral (~$4M TVL); router contract never submitted for audit | **T6.003 setup (audit scope drift)** |
| 2023-05 to 2023-06-09 | Protocol operates with v1 audit as marketing cover for v2 router; users deposit into v2 router assuming audit coverage extends to entire system | T6.003 (standing surface) |
| 2023-06-10 | Attacker exploits reentrancy vulnerability in v2 router's `withdrawCollateral()`; drains ~$2.5M from collateral pool via recursive withdrawal calls | **T9.001 execution → T6.003 realised** |
| 2023-06-10 to 2023-06-11 | Drained assets bridged BNB Chain → Ethereum via Stargate Finance; routed through Tornado Cash | T7.003 (cross-chain laundering) |
| 2023-06-12 | Atlantis Loans team deletes Telegram and X/Twitter accounts; audit firm confirms v2 router was outside audit scope | (operator disappearance + audit-firm scope confirmation) |

## Realised extraction

Approximately $2.5 million in BUSD, USDT, WBNB, and ETH drained from the v2 router's collateral pool. Assets bridged to Ethereum and routed through Tornado Cash. No funds were recovered. No operator identity was established.

## Public references

- Cross-reference: T6.003 at `techniques/T6.003-audit-of-different-bytecode-version.md`.
- Cross-reference: T9.001 at `techniques/T9.001-reentrancy-exploit.md`.
- Cross-reference: `examples/2022-01-arbix-finance.md` — canonical T6.003 anchor (multi-contract audit-scope-mismatch).
- Cross-reference: `examples/2020-12-compounder-finance.md` — Compounder Finance (audited-then-malicious-strategy-swap, T6.003 + T5.001).
- `[theblockatlantis2023]` — The Block, "Atlantis Loans Exploited for $2.5M via Reentrancy in Unaudited Router" (2023-06).
- `[certikdefi2023]` — CertiK, "Atlantis Loans Post-Mortem: Audit-Scope-Drift as Recurring Exploit Precondition" (2023-06).

## Public References

See citations in corresponding technique file.
