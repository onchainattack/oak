# X100 — flash-loaned tokens bought two of three Senate seats, which approved and executed a treasury dump in the same transaction — X100 / Ethereum — 2026-10-24

**Loss:** **~\$4.85M USDT** (~\$4.75M in the first transaction, ~\$96K in a second by another attacker minutes later; a third burned the Freezer's Uniswap V3 positions). X fell >96%.

**OAK Techniques observed:** **OAK-T16.001** (Vote Takeover via Flash Loan — *primary*. Senate membership is decided by **current** frozen stake with no snapshot. The attacker flash-borrowed ~1.94M USDT from Aave, bought ~38.2K X, split it across two contracts that each froze ~19K X and called `applyForSenate()`, taking 2 of 3 seats. See [`techniques/T16.001-vote-takeover-via-flash-loan.md`](../techniques/T16.001-vote-takeover-via-flash-loan.md)). **OAK-T16.006** (Timelock-Free Governance Execution — `propose()` → `vote()` → `execute()` ran in one transaction, calling `DexTreasury.v3Swap` to swap 400,000 treasury X into an attacker-created PancakeSwap V3 pool with zero minimum output. See [`techniques/T16.006-timelock-free-governance-execution.md`](../techniques/T16.006-timelock-free-governance-execution.md)). **OAK-T7.001** (Mixer-Routed Hop — *traced by OAK*: about 2,022.4 ETH of proceeds entered Tornado Cash through its router on 2026-10-26 and 10-27. See [`techniques/T7.001-mixer-routed-hop.md`](../techniques/T7.001-mixer-routed-hop.md)).

**Attribution:** **pseudonymous** ([`0x7ec2afdf3ec5964899894f8d58afa95cbb8ffd63`](https://etherscan.io/address/0x7ec2afdf3ec5964899894f8d58afa95cbb8ffd63)).

**Key teaching point:** **Membership by current balance plus same-block execution is a flash-loan door.** Either a snapshot or a timelock alone would have stopped it.

## Summary

Blockaid, Defimon and Phalcon flagged the exploit on 2026-10-24. RektRadar described the proceeds (~2,023 ETH) as not moved by early 2026-10-25. OAK's own trace shows otherwise: the USDT was swapped to ETH within six minutes, the ETH was split into fresh wallets within half an hour, and about 2,022.4 ETH went through Tornado Cash on 2026-10-26 and 10-27 (see Fund flow).

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
| 2026-10-24 14:16 → 10-27 13:56 | *Traced by OAK:* the attacker sells the 4,749,726 USDT to a UniswapX filler for 2,022.86 ETH (14:16–14:19), moves it to a fresh distributor [`0x8296721489d0a7e934edd66ea27159b1c88a42e5`](https://etherscan.io/address/0x8296721489d0a7e934edd66ea27159b1c88a42e5), which splits it 400.5 ETH each to four fresh wallets (14:39–14:44). On 2026-10-26 and 10-27 about 2,022.4 ETH enters Tornado Cash through its router [`0xd90e2f925da726b50c4ed8d0fb90ad053324f31b`](https://etherscan.io/address/0xd90e2f925da726b50c4ed8d0fb90ad053324f31b) in 82 deposits. See Fund flow. | **T7.001** |
| 2026-10-24 14:49–15:44 | Blockaid (14:49), Defimon (14:52) and Phalcon (15:44) post alerts. Blockaid says the attack was still ongoing. No pause or statement from X100 is found in the cited posts (undisclosed). | response |

Key addresses:

- Attacker — [`0x7ec2afdf3ec5964899894f8d58afa95cbb8ffd63`](https://etherscan.io/address/0x7ec2afdf3ec5964899894f8d58afa95cbb8ffd63)
- Victim and vulnerable contract (Freezer / DexTreasury) — [`0x79f35a33fe2813414851c4ae8daeacd14d822a46`](https://etherscan.io/address/0x79f35a33fe2813414851c4ae8daeacd14d822a46)
- Exploit transaction — [`0x38c60844f1923d53fdce7d99e9bc2a2d8c73a08e793341dfbb479f8cc74d81d0`](https://etherscan.io/tx/0x38c60844f1923d53fdce7d99e9bc2a2d8c73a08e793341dfbb479f8cc74d81d0)

## Fund flow

Ethereum, traced by OAK with `tools/explorer.py` (Blockscout, keyless) on 2026-10-30, with a trace window of about 3 days after the exploit (to 2026-10-27). Every edge below was checked on-chain. The flow has three parts: the treasury X is sold into the attacker's own pool, the USDT is swapped to ETH within minutes, and the ETH is then split across fresh wallets and put through Tornado Cash.

```oak-flow
as_of: 2026-10-30T11:50Z
nodes:
  - {id: treasury, chain: ethereum, address: 0x79f35a33fe2813414851c4ae8daeacd14d822a46, role: vulnerable-contract, label: "Freezer / DexTreasury"}
  - {id: pool, chain: ethereum, address: 0x9a03c41c539880b51508bebbc2dde7b738f6f075, role: attack-contract, label: "Attacker-created PancakeSwap V3 X/USDT pool"}
  - {id: atk, chain: ethereum, address: 0x37541fc4a6f1ec86889ba506f51dc39f2bedd10a, role: attack-contract, label: "Attack contract (flash loan, seats, proposal)"}
  - {id: fwd, chain: ethereum, address: 0x89e903e4512f8a315cebd99c29a1e40eee6fe2c9, role: intermediary, label: "Forwarding contract"}
  - {id: eoa, chain: ethereum, address: 0x7ec2afdf3ec5964899894f8d58afa95cbb8ffd63, role: attacker-eoa, label: "Attacker"}
  - {id: filler, chain: ethereum, address: 0x225a38bc71102999dd13478bfabd7c4d53f2dc17, role: dex, label: "UniswapX filler (Rizzolver)"}
  - {id: hop0, chain: ethereum, address: 0x8296721489d0a7e934edd66ea27159b1c88a42e5, role: attacker-holding, label: "ETH distributor"}
  - {id: w1, chain: ethereum, address: 0xf637dcee7dd96e8fdab926c5993d558b52d635ea, role: intermediary, label: "Wallet 1"}
  - {id: w2, chain: ethereum, address: 0x6790cf09ba33d05ada2c13cbb4104f5b8b666391, role: intermediary, label: "Wallet 2"}
  - {id: w3, chain: ethereum, address: 0x64b135af3d80733c9c290d58873e2cccb34a81ae, role: intermediary, label: "Wallet 3"}
  - {id: w4, chain: ethereum, address: 0x4fdb9f9a44b356c8a9c2ea060a40fb7a9caabef3, role: intermediary, label: "Wallet 4"}
  - {id: tc, chain: ethereum, address: 0xd90e2f925da726b50c4ed8d0fb90ad053324f31b, role: mixer, label: "Tornado Cash router"}
edges:
  - {from: treasury, to: pool, asset: X, amount: 400000, tx: 0x38c60844f1923d53fdce7d99e9bc2a2d8c73a08e793341dfbb479f8cc74d81d0, time: 2026-10-24T14:11:47Z, technique: T16.006, verified: oak}
  - {from: atk, to: fwd, asset: USDT, amount: 4749726.096973, tx: 0x38c60844f1923d53fdce7d99e9bc2a2d8c73a08e793341dfbb479f8cc74d81d0, time: 2026-10-24T14:11:47Z, technique: T16.001, verified: oak}
  - {from: fwd, to: eoa, asset: USDT, amount: 4749726.096973, tx: 0x38c60844f1923d53fdce7d99e9bc2a2d8c73a08e793341dfbb479f8cc74d81d0, time: 2026-10-24T14:11:47Z, verified: oak}
  - {from: eoa, to: filler, asset: USDT, amount: 4749726.096973, tx: 0xb861b3710531230449711b04b416cc65ccff87e6dab0457e373e5dbb637e5dd5, time: 2026-10-24T14:16:35Z, tx_count: 2, time_last: 2026-10-24T14:17:47Z, verified: oak}
  - {from: eoa, to: hop0, asset: ETH, amount: 2022.85670474, tx: 0x9a3f04912e1e52ad04fc00ac72efb3169e4a4c73596d1a5d7c055375397cc0dc, time: 2026-10-24T14:18:59Z, tx_count: 2, time_last: 2026-10-24T14:19:23Z, verified: oak}
  - {from: hop0, to: w1, asset: ETH, amount: 400.5, tx: 0xa08147bbd6cd279678327faf43af3e7f96323aed376f5bdbe44ed9fbef2898e5, time: 2026-10-24T14:39:47Z, tx_count: 2, time_last: 2026-10-26T13:03:47Z, verified: oak}
  - {from: hop0, to: w2, asset: ETH, amount: 400.5, tx: 0x5954deb30f637cd2d789403dce8a03caa9a89f2c088f7963976927948804953e, time: 2026-10-24T14:40:35Z, tx_count: 2, time_last: 2026-10-26T13:03:59Z, verified: oak}
  - {from: hop0, to: w3, asset: ETH, amount: 400.5, tx: 0x09c7e5feac1a466c67f9b6816bf82f8f2f16297acfe282e7592b0dbd749366bf, time: 2026-10-24T14:43:35Z, tx_count: 2, time_last: 2026-10-26T13:04:11Z, verified: oak}
  - {from: hop0, to: w4, asset: ETH, amount: 400.5, tx: 0x8f2bfb1391244540283d009e05dcd49988452d0ea456a7edba4dd331394cbbd9, time: 2026-10-24T14:43:59Z, tx_count: 2, time_last: 2026-10-26T13:05:11Z, verified: oak}
  - {from: hop0, to: tc, asset: ETH, amount: 420.8, tx: 0x36c670c7b2447ccd0314b89d143546a8d0fed4bab269d1a205531293dd9b6965, time: 2026-10-26T13:09:23Z, tx_count: 50, time_last: 2026-10-26T13:46:47Z, technique: T7.001, verified: oak}
  - {from: w1, to: tc, asset: ETH, amount: 400.4, tx: 0x8eb143491acb3dbd266e009c597b15628e73085cdd977ec776a36f65fae7307c, time: 2026-10-26T13:50:35Z, tx_count: 8, time_last: 2026-10-26T13:56:47Z, technique: T7.001, verified: oak}
  - {from: w2, to: tc, asset: ETH, amount: 400.4, tx: 0x730b40ee6fa02f1f901ceed31a290948034241ff5b6a02d8f7ea3a5fb4602de5, time: 2026-10-27T13:32:59Z, tx_count: 8, time_last: 2026-10-27T13:49:47Z, technique: T7.001, verified: oak}
  - {from: w3, to: tc, asset: ETH, amount: 400.4, tx: 0xdb0da1aa4c98ed597def193ed7da141d56a020b23ddbdbe7cfdd6c5de4e65e66, time: 2026-10-27T13:36:35Z, tx_count: 8, time_last: 2026-10-27T13:52:59Z, technique: T7.001, verified: oak}
  - {from: w4, to: tc, asset: ETH, amount: 400.4, tx: 0x122e384bc035ce6086675a149b07e2177b0001aa86b9c5c5451cc5e474b79f63, time: 2026-10-27T13:40:59Z, tx_count: 8, time_last: 2026-10-27T13:56:11Z, technique: T7.001, verified: oak}
```

What the trace adds beyond the sources:

- **Where the USDT went.** The sources say only that proceeds "had not moved" and that the USDT's destination was not stated. Within 5 to 6 minutes of the exploit (14:16 and 14:17 UTC) the attacker sold the full **4,749,726.096973 USDT** to a UniswapX filler for ETH, in two swaps (2,000,000 and 2,749,726.096973 USDT). The ETH came back in two transfers of 851.54 and 1,170.47 ETH, and the attacker held it as **2,022.86 ETH** by 14:19.
- **Proceeds moved the same day.** Blockaid and Defimon posted at 14:49 to 15:44, after the 14:39 to 14:44 split. RektRadar's "not moved by early 2026-10-25" conflicts with this: the USDT was swapped within 6 minutes and the ETH was split within about 30 minutes. The ETH sat in fresh wallets, not in the exploit address, which is probably why it looked unmoved.
- **Split and mixing.** Between 14:39 and 14:44 on 2026-10-24 a fresh wallet `0x8296721489d0a7e934edd66ea27159b1c88a42e5` sent 400 ETH each to four other fresh wallets. On 2026-10-26 at 13:03 it sent each 0.5 ETH for gas. It put 420.8 ETH into Tornado Cash in 50 deposits (13:09 to 13:46 on 2026-10-26), and the four wallets put in 400.4 ETH each in 8 deposits (one on 2026-10-26, three on 2026-10-27, 13:32 to 13:56). In total **2,022.4 ETH** entered Tornado Cash, about the whole amount. The trail ends there.
- **Exploit mechanics confirmed.** The exploit tx shows the 400,000 X leaving the treasury into the attacker's pool (the treasury received only 35.675313 USDT in return), the two helper contracts each freezing 19,000 X plus the 100 X candidacy fee, and 4,749,726.096973 USDT reaching the attacker, matching the ~4.75M figure.
- **Gaps.** The second attacker's transaction (the ~\$96K) was not traced. Funding of the attacker before the exploit was not traced. Withdrawals from Tornado Cash cannot be linked to deposits.

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
