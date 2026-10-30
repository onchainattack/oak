# X100 — flash-loaned tokens bought two of three Senate seats, which approved and executed a treasury dump in the same transaction — X100 / Ethereum — 2026-10-24

**Loss:** **~\$4.85M USDT** (~\$4.75M in the first transaction, ~\$96K in a second by another attacker minutes later; a third burned the Freezer's Uniswap V3 positions). X fell >96%.

**OAK Techniques observed:** **OAK-T16.001** (Vote Takeover via Flash Loan — *primary*. Senate membership is decided by **current** frozen stake with no snapshot. The attacker flash-borrowed ~1.94M USDT from Aave, bought ~38.2K X, split it across two contracts that each froze ~19K X and called `applyForSenate()`, taking 2 of 3 seats. See [`techniques/T16.001-vote-takeover-via-flash-loan.md`](../techniques/T16.001-vote-takeover-via-flash-loan.md)). **OAK-T16.006** (Timelock-Free Governance Execution — `propose()` → `vote()` → `execute()` ran in one transaction, calling `DexTreasury.v3Swap` to swap 400,000 treasury X into an attacker-created PancakeSwap V3 pool with zero minimum output. See [`techniques/T16.006-timelock-free-governance-execution.md`](../techniques/T16.006-timelock-free-governance-execution.md)).

**Attribution:** **pseudonymous** ([`0x7ec2afdf3ec5964899894f8d58afa95cbb8ffd63`](https://etherscan.io/address/0x7ec2afdf3ec5964899894f8d58afa95cbb8ffd63)).

**Key teaching point:** **Membership by current balance plus same-block execution is a flash-loan door.** Either a snapshot or a timelock alone would have stopped it.

## Summary

Blockaid, Defimon and Phalcon flagged the exploit on 2026-10-24. Proceeds (~2,023 ETH) had not moved by early 2026-10-25.

## Timeline (UTC)

Read it as three stages. **Flaw**: Senate seats go to whoever freezes enough X right now, and a proposal can run in the same transaction. **Take**: one transaction buys the seats with flash-loaned funds, passes a proposal and sells the treasury's X into the attacker's own pool. **After**: a second attacker follows, and only alerts are public. Times are from Defimon, Phalcon and Blockaid posts; the exploit transaction time is not given.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-24 (undisclosed) | The X100 Senate, run through the Freezer / DexTreasury contract [`0x79f35a33fe2813414851c4ae8daeacd14d822a46`](https://etherscan.io/address/0x79f35a33fe2813414851c4ae8daeacd14d822a46), lets anyone join by freezing X and paying a 100-X candidacy fee. Membership is decided by current frozen stake with no snapshot or timelock, and a proposal can call the treasury's own `v3Swap` in the same transaction. Since when is not stated. | **T16.001** (flaw) |
| 2026-10-24 (before the exploit; undisclosed) | Preparation: the attacker deploys two helper contracts, and creates and supplies liquidity to a new PancakeSwap V3 X/USDT pool it controls (Phalcon). Funding of the attacker is not published. | — |
| 2026-10-24 (exploit transaction [`0x38c60844f1923d53fdce7d99e9bc2a2d8c73a08e793341dfbb479f8cc74d81d0`](https://etherscan.io/tx/0x38c60844f1923d53fdce7d99e9bc2a2d8c73a08e793341dfbb479f8cc74d81d0)) | The attacker flash-borrows about 1.94M USDT from Aave and buys about 38.2K X. It splits the X across the two helper contracts, which each freeze about 19K X and call `applyForSenate()`, taking two of the three Senate seats. | **T16.001** |
| 2026-10-24 (same transaction) | The attacker calls `propose()`, `vote()` and `execute()` on a proposal described as "testnet flash governance proof". It directs `DexTreasury.v3Swap` to swap 400,000 treasury X into the attacker's pool with zero minimum output; the treasury receives about 35.68 USDT. | **T16.006** |
| 2026-10-24 (same transaction) | The attacker withdraws its liquidity, sells part of the recovered X on the existing Uniswap V3 X/USDT pool, repays the flash loan and keeps about 4.75M USDT. | — |
| 2026-10-24 (minutes later) | A second attacker burns the Freezer's Uniswap V3 positions. Blockaid counts about \$4.85M USDT realised across two transactions. Where the USDT went afterwards is not stated in the cited posts. | — |
| 2026-10-24 14:49–15:44 | Blockaid (14:49), Defimon (14:52) and Phalcon (15:44) post alerts. Blockaid says the attack was still ongoing. No pause or statement from X100 is found in the cited posts (undisclosed). | response |

Key addresses:

- Attacker — [`0x7ec2afdf3ec5964899894f8d58afa95cbb8ffd63`](https://etherscan.io/address/0x7ec2afdf3ec5964899894f8d58afa95cbb8ffd63)
- Victim and vulnerable contract (Freezer / DexTreasury) — [`0x79f35a33fe2813414851c4ae8daeacd14d822a46`](https://etherscan.io/address/0x79f35a33fe2813414851c4ae8daeacd14d822a46)
- Exploit transaction — [`0x38c60844f1923d53fdce7d99e9bc2a2d8c73a08e793341dfbb479f8cc74d81d0`](https://etherscan.io/tx/0x38c60844f1923d53fdce7d99e9bc2a2d8c73a08e793341dfbb479f8cc74d81d0)

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
