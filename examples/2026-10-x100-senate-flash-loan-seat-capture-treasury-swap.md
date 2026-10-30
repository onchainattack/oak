# X100 — flash-loaned tokens bought two of three Senate seats, which approved and executed a treasury dump in the same transaction — X100 / Ethereum — 2026-10-24

**Loss:** **~\$4.85M USDT** (~\$4.75M in the first transaction, ~\$96K in a second by another attacker minutes later; a third burned the Freezer's Uniswap V3 positions). X fell >96%.

**OAK Techniques observed:** **OAK-T16.001** (Vote Takeover via Flash Loan — *primary*. Senate membership is decided by **current** frozen stake with no snapshot. The attacker flash-borrowed ~1.94M USDT from Aave, bought ~38.2K X, split it across two contracts that each froze ~19K X and called `applyForSenate()`, taking 2 of 3 seats. See [`techniques/T16.001-vote-takeover-via-flash-loan.md`](../techniques/T16.001-vote-takeover-via-flash-loan.md)). **OAK-T16.006** (Timelock-Free Governance Execution — `propose()` → `vote()` → `execute()` ran in one transaction, calling `DexTreasury.v3Swap` to swap 400,000 treasury X into an attacker-created PancakeSwap V3 pool with zero minimum output. See [`techniques/T16.006-timelock-free-governance-execution.md`](../techniques/T16.006-timelock-free-governance-execution.md)).

**Attribution:** **pseudonymous** (`0x7ec2…fd63`).

**Key teaching point:** **Membership by current balance plus same-block execution is a flash-loan door.** Either a snapshot or a timelock alone would have stopped it.

## Summary

Blockaid, Defimon and Phalcon flagged the exploit on 2026-10-24. Proceeds (~2,023 ETH) had not moved by early 2026-10-25.

## Root-cause evidence

- **Technique:** OAK-T16.001
- **Source:** <https://x.com/DefimonAlerts/status/2114007082055700836>; <https://x.com/Phalcon_xyz/status/2114020331925258732>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** Defimon and Phalcon independently trace the flash loan, seat capture and same-transaction proposal; Blockaid confirms the Senate capture.

## Public references

- `[defimonx100]` — Defimon on X (2026-10-24): <https://x.com/DefimonAlerts/status/2114007082055700836>
- `[phalconx100]` — Phalcon on X (2026-10-24): <https://x.com/Phalcon_xyz/status/2114020331925258732>
- `[blockaidx100]` — Blockaid on X (2026-10-24): <https://x.com/blockaid_/status/2114006384735916278>
