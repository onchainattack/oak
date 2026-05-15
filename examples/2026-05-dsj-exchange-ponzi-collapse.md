# DSJ Exchange (DSJEX) — Ponzi Collapse — 2026-04/05

**Loss:** $150M+ total; $92M+ laundered across chains in a 6-day window (April 27 – May 3, 2026).
**OAK Techniques observed:** OAK-T2 (Token/Investment Fraud) — Ponzi scheme primary; OAK-T7 (Laundering) — cross-chain laundering exit.
**Attribution:** **confirmed** — operators of DSJ Exchange / BG Wealth Sharing platform. ZachXBT led cross-chain tracing initiative with multiple contributors.

**Key teaching point:** The DSJ Exchange collapse demonstrates the **Ponzi-to-cross-chain-laundering exit pattern**: when a Ponzi scheme collapses, operators attempt to move remaining funds across multiple chains (Ethereum, TRON, BSC) within days to obscure the trail. The detection approach is similar to bridge exploit laundering: monitor for exchange outflows that fan out across chains + mixers + CEX deposits within a compressed time window.

## Summary

DSJ Exchange (DSJEX) / BG Wealth Sharing operated as an investment platform promising returns to depositors. In late April 2026, the platform collapsed — a classic Ponzi unwind when withdrawals exceeded new deposits.

What distinguishes DSJEX from smaller Ponzi schemes is the laundering operation: between April 27 and May 3, 2026, illicit actors laundered $92M+ across Ethereum, TRON, and BSC. ZachXBT led an initiative to trace the cross-chain flows, working with multiple contributors to map the laundering graph.

The case connects to the broader trend of Ponzi schemes using crypto infrastructure for both the fraud (accepting deposits in USDT/USDC) and the exit (cross-chain laundering through mixers, bridges, and CEX deposits).

## Timeline

| When | Event | OAK ref |
|---|---|---|
| Pre-Apr 2026 | DSJEX / BG Wealth Sharing operates as investment/Ponzi platform | **T2 Ponzi scheme** |
| 2026-04-27 | Platform collapses. Withdrawals halted. Operators begin laundering remaining funds | **T7 laundering begins** |
| 2026-04-27~05-03 | $92M+ laundered across ETH, TRON, BSC chains. Cross-chain swaps, mixer deposits, CEX fan-out | **T7 cross-chain laundering** |
| 2026-05-05 | ZachXBT publishes initial tracing results. Community contributors add laundering graph data | (public disclosure) |

## What defenders observed

- **Pre-collapse:** Investment platform with above-market guaranteed returns, opaque ownership, and no regulated entity structure — classic Ponzi indicators.
- **At-collapse:** Withdrawal halt followed by immediate cross-chain movement of remaining funds. The tempo switch from "normal operations" to "all funds moving" within hours is a Ponzi exit signature.
- **Post-collapse laundering:** Cross-chain fan-out across three chains (ETH, TRON, BSC) within 6 days. Mixers, bridges, and CEX deposit addresses used in sequence. The multi-chain pattern mirrors professional laundering operations (cf. Lazarus Group T7 patterns).

## What this example tells contributors

- **Ponzi exit laundering tempo is a specific detection signal.** The transition from steady-state (deposits ≈ withdrawals) to all-funds-moving across chains within hours is statistically distinct from normal exchange operations. T2 detection should model the withdrawal velocity spike at Ponzi unwind.
- **Multi-chain fan-out is the laundering signature.** The $92M was distributed across ETH, TRON, and BSC simultaneously, making single-chain tracing insufficient. T7 detection should model cross-chain fan-out as a laundering indicator.
- **Community tracing is a force multiplier.** ZachXBT led the initiative but multiple contributors added laundering graph data. This model — lead investigator publishes initial trace, community extends — is effective for Ponzi collapse tracing where the transaction volume exceeds what a single analyst can map in real-time.

## Public references

- [ZachXBT — DSJ Exchange Ponzi Collapse (X/Twitter)](https://twitter.com/zachxbt/status/2051645845993648517)
- Cross-chain laundering graph: documented in ZachXBT thread and community contributions.
