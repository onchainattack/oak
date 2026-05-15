# Elephant Money flash-loan governance attack — 2022-04

**Loss:** **~$11.2M** extracted from Elephant Money's TREASURY contract via a flash-loan-enabled governance-vote manipulation on 2022-04-12. The attacker borrowed BNB (~$3.5M) via a PancakeSwap flash swap, used the BNB to acquire ELEPHANT governance tokens on DEXes, and voted to execute a malicious proposal that drained the TREASURY contract — repaying the flash loan within the same transaction.
**OAK Techniques observed:** **OAK-T12.005** (Flash-Loan Governance Vote Manipulation) — two-hop acquisition sub-pattern. The attacker did not borrow governance tokens directly (no DEX pair has sufficient ELEPHANT liquidity for a direct flash loan). Instead, the attacker flash-loaned BNB, swapped BNB → ELEPHANT on PancakeSwap, acquired a controlling governance stake, executed a treasury-draining proposal, swapped remaining ELEPHANT → BNB, and repaid the BNB flash loan — all atomically within a single transaction.
**Attribution:** **unattributed** — no public attribution at v0.1 cutoff.

**Key teaching point:** Elephant Money demonstrates the two-hop T12.005 sub-pattern: when a governance token lacks sufficient DEX liquidity to borrow a quorum directly, the attacker flash-loans a liquid base-pair asset (BNB) and converts it to governance tokens within the same atomic transaction. The detection signal remains the same-block flash-loan + governance-event correlation — but the governance-token acquisition path is indirect.

## Summary

Elephant Money, a DeFi protocol on BNB Chain, was exploited on 2022-04-12 for approximately $11.2M. The attacker used PancakeSwap's flash-swap facility to borrow ~$3.5M in BNB, which was then swapped for ELEPHANT governance tokens on PancakeSwap's BNB/ELEPHANT pair. With the acquired governance stake, the attacker queued and executed a treasury-draining proposal, converted remaining ELEPHANT back to BNB, and repaid the PancakeSwap flash swap — all within a single transaction.

The attack's success was enabled by three structural conditions: (1) ELEPHANT's governance quorum was lower than the DEX-liquidity-accessible token quantity; (2) the governance contract measured voting power via current balance (`balanceOf`) rather than a prior-block snapshot; (3) the proposal-execution timelock was zero (or bypassable), enabling same-transaction queuing and execution.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-04-12 | Attacker flash-loans BNB via PancakeSwap, acquires ELEPHANT governance tokens, drains TREASURY | T12.005 (two-hop flash-loan governance attack) |
| 2022-04-12 | Attacker repays BNB flash loan; net extraction ~$11.2M in BNB/BUSD | T12.005 |

## Public references

- Elephant Money post-incident announcement (Twitter/X, 2022-04-12).
- BlockSec / PeckShield incident analysis (2022-04-12).
- BNB Chain transaction tracing: attacker address and flash-loan path.
