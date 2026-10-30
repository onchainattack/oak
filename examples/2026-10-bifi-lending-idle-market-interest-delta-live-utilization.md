# BiFi Lending — 36 days of idle interest were charged at whatever utilization the attacker set inside one block — BiFi / Ethereum — 2026-10-17

**Loss:** **~165.6K USDT** (~\$165.4K), swapped to WETH (Defimon). **Returned:** 159,103.654838 USDC sent back to the BiFi USDT handler by c0ffeebabe.eth on 2026-10-18 17:21 UTC (traced by OAK, [tx](https://etherscan.io/tx/0x9702900bc441039c7e6937a3f3e94251072bda380bdcba38ecf6c7c3e6efeaeb)); no statement on the gap to the ~165.6K taken.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting-State Invariant Flaw — *primary*. BiFi's USDT market sat idle ~264K blocks. `TokenHandler._checkFirstAction` stores that gap as `inactiveActionDelta` and freezes `actionEXR` once per block; every later action in the same block re-runs `interestModel.getInterestAmount`, computing `globalEXR = actionEXR × (1 + rate × 264K)` with the rate from **live** deposit/borrow totals. So the attacker chose the utilization at which 36 days of interest were charged, repeatedly. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). Funded by a 40.5M USDT Morpho flash loan (OAK-T9.002).

**Attribution:** **pseudonymous.** The original attacker ([`0x7c78a049fff71609990017b58a959e926e6ec4c6`](https://etherscan.io/address/0x7c78a049fff71609990017b58a959e926e6ec4c6)) deployed an exploit contract; one block later the MEV operator c0ffeebabe.eth replayed it from its own contract and took the funds.

**Key teaching point:** **Accrual must use the rate that applied during the gap,** not the rate at the moment someone first touches the market. Idle markets in abandoned deployments are where this bites.

## Summary

The exploit ran on 2026-10-17 at 05:43 UTC (blocks 26210255–26210256, on-chain time traced by OAK); Defimon reported it about 26 hours later, on 2026-10-18. On 2026-10-18 at 17:21 UTC c0ffeebabe.eth sent 159,103.654838 USDC back to the BiFi USDT handler (traced by OAK; not in the cited sources).

## Timeline (UTC)

Read it as three stages. **Get in**: a market left idle for 36 days. **Prepare**: an exploit contract. **Take**: a front-run replay with a flash loan. Times are from Defimon.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-17 | BiFi's USDT market sits idle for about 264K blocks (about 36 days). `TokenHandler._checkFirstAction` stores that gap as `inactiveActionDelta` and freezes `actionEXR` once per block, and each later action in the same block recomputes interest from live deposit and borrow totals. | **T9.016** |
| 2026-10-17, block 26210255 | The original attacker [`0x7c78a049fff71609990017b58a959e926e6ec4c6`](https://etherscan.io/address/0x7c78a049fff71609990017b58a959e926e6ec4c6) deploys an exploit contract: [`0x15b47e2c0daf723dec64c75b435079d3a1f8a6058b21b9a64dda4844e877a034`](https://etherscan.io/tx/0x15b47e2c0daf723dec64c75b435079d3a1f8a6058b21b9a64dda4844e877a034). | — |
| 2026-10-17 05:43:11, block 26210256 | c0ffeebabe.eth ([`0xc0ffeebabe5d496b2dde509f9fa189c25cf29671`](https://etherscan.io/address/0xc0ffeebabe5d496b2dde509f9fa189c25cf29671)) front-runs it and replays the attack from its own contract: [`0x756c68055af7a0630aa0b56891ba4de14c56c39cbebe99e47eeb4728f4d6ad14`](https://etherscan.io/tx/0x756c68055af7a0630aa0b56891ba4de14c56c39cbebe99e47eeb4728f4d6ad14). It flash-borrows 40.5M USDT from Morpho (traced by OAK; the explorer timestamps it 2026-10-17 05:43:11 UTC). | **T9.002** |
| same transaction | The attacker deposits the loan in growing tranches, then borrows 30M to push utilization up. Every call charges the 36-day interest at the utilization it just set. | **T9.016** |
| same transaction | A repay/withdraw loop cashes out the inflated deposit interest. The cycle runs twice and takes 165.6K USDT. | **T9.016** |
| same transaction | The USDT is swapped to WETH: 165,574.514633 USDT go to pool [`0x4e68ccd3e89f51c3074ca5072bbac773960dfa36`](https://etherscan.io/address/0x4e68ccd3e89f51c3074ca5072bbac773960dfa36) for 68.05720311 WETH, which is unwrapped in the same transaction (traced by OAK). | — |
| 2026-10-18 17:21:59 | c0ffeebabe.eth sends 159,103.654838 USDC to the BiFi USDT handler: [`0x9702900bc441039c7e6937a3f3e94251072bda380bdcba38ecf6c7c3e6efeaeb`](https://etherscan.io/tx/0x9702900bc441039c7e6937a3f3e94251072bda380bdcba38ecf6c7c3e6efeaeb) (traced by OAK). | response |
| 2026-10-18 07:45:50 | Defimon publishes its detection (about \$165.4K lost). | response |
| after 2026-10-18 (undisclosed) | No BiFi statement, pause or recovery appears in the cited sources. | response |

Key addresses:

- Original attacker — [`0x7c78a049fff71609990017b58a959e926e6ec4c6`](https://etherscan.io/address/0x7c78a049fff71609990017b58a959e926e6ec4c6)
- c0ffeebabe.eth MEV bot — [`0xc0ffeebabe5d496b2dde509f9fa189c25cf29671`](https://etherscan.io/address/0xc0ffeebabe5d496b2dde509f9fa189c25cf29671)
- Replay contract (traced by OAK) — [`0xe08d97e151473a848c3d9ca3f323cb720472d015`](https://etherscan.io/address/0xe08d97e151473a848c3d9ca3f323cb720472d015)
- Victim — [`0x808c3ba97268dbf9695b1ec10729e09c7e67a9e3`](https://etherscan.io/address/0x808c3ba97268dbf9695b1ec10729e09c7e67a9e3)
- Exploit deployment — [`0x15b47e2c0daf723dec64c75b435079d3a1f8a6058b21b9a64dda4844e877a034`](https://etherscan.io/tx/0x15b47e2c0daf723dec64c75b435079d3a1f8a6058b21b9a64dda4844e877a034)
- Front-run replay — [`0x756c68055af7a0630aa0b56891ba4de14c56c39cbebe99e47eeb4728f4d6ad14`](https://etherscan.io/tx/0x756c68055af7a0630aa0b56891ba4de14c56c39cbebe99e47eeb4728f4d6ad14)

## Fund flow

Ethereum only, traced by OAK with `tools/explorer.py` (Blockscout, keyless) on 2026-10-30, with an outgoing window to 2026-10-23. The whole extraction happens inside one transaction, sent by c0ffeebabe.eth to its own contract. The operator's identity is recorded as metadata only; the flow is described by mechanism. Edges marked *traced by OAK* were checked on-chain.

```oak-flow
as_of: 2026-10-30T12:40Z
nodes:
  - {id: morpho, chain: ethereum, address: 0xbbbbbbbbbb9cc5e90e3b3af64bdaf62c37eeffcb, role: lending, label: "Morpho (flash-loan source)"}
  - {id: op, chain: ethereum, address: 0xc0ffeebabe5d496b2dde509f9fa189c25cf29671, role: attacker-eoa, label: "c0ffeebabe.eth (MEV operator, sender)"}
  - {id: bot, chain: ethereum, address: 0xe08d97e151473a848c3d9ca3f323cb720472d015, role: attack-contract, label: "Operator's replay contract"}
  - {id: vic, chain: ethereum, address: 0x808c3ba97268dbf9695b1ec10729e09c7e67a9e3, role: victim, label: "BiFi USDT handler (UsdtHandlerProxy)"}
  - {id: pool, chain: ethereum, address: 0x4e68ccd3e89f51c3074ca5072bbac773960dfa36, role: dex, label: "USDT/WETH pool"}
  - {id: unwrap, chain: ethereum, role: burn, label: "WETH unwrapped to ETH"}
  - {id: orig, chain: ethereum, address: 0x7c78a049fff71609990017b58a959e926e6ec4c6, role: attacker-eoa, label: "Original attacker (deployed exploit contract, no transfers)"}
edges:
  - {from: morpho, to: bot, asset: USDT, amount: 40499999.999997, tx: 0x756c68055af7a0630aa0b56891ba4de14c56c39cbebe99e47eeb4728f4d6ad14, time: 2026-10-17T05:43:11Z, technique: T9.002, verified: oak}
  - {from: bot, to: vic, asset: USDT, amount: 141270327.66758, tx: 0x756c68055af7a0630aa0b56891ba4de14c56c39cbebe99e47eeb4728f4d6ad14, time: 2026-10-17T05:43:11Z, tx_count: 72, technique: T9.016, verified: oak}
  - {from: vic, to: bot, asset: USDT, amount: 141435902.81731, tx: 0x756c68055af7a0630aa0b56891ba4de14c56c39cbebe99e47eeb4728f4d6ad14, time: 2026-10-17T05:43:11Z, tx_count: 72, technique: T9.016, verified: oak}
  - {from: bot, to: morpho, asset: USDT, amount: 40499999.999997, tx: 0x756c68055af7a0630aa0b56891ba4de14c56c39cbebe99e47eeb4728f4d6ad14, time: 2026-10-17T05:43:11Z, technique: T9.002, verified: oak}
  - {from: bot, to: pool, asset: USDT, amount: 165574.514633, tx: 0x756c68055af7a0630aa0b56891ba4de14c56c39cbebe99e47eeb4728f4d6ad14, time: 2026-10-17T05:43:11Z, verified: oak}
  - {from: pool, to: bot, asset: WETH, amount: 68.05720311, tx: 0x756c68055af7a0630aa0b56891ba4de14c56c39cbebe99e47eeb4728f4d6ad14, time: 2026-10-17T05:43:11Z, verified: oak}
  - {from: bot, to: unwrap, asset: WETH, amount: 68.05720311, tx: 0x756c68055af7a0630aa0b56891ba4de14c56c39cbebe99e47eeb4728f4d6ad14, time: 2026-10-17T05:43:11Z, verified: oak}
  - {from: op, to: vic, asset: USDC, amount: 159103.654838, tx: 0x9702900bc441039c7e6937a3f3e94251072bda380bdcba38ecf6c7c3e6efeaeb, time: 2026-10-18T17:21:59Z, verified: oak}
```

What the trace adds beyond the sources:

- **The extraction contract** is `0xe08d97e151473a848c3d9ca3f323cb720472d015`, which the sources do not name. c0ffeebabe.eth is the transaction sender and the contract is the actor. The original attacker `0x7c78a049fff71609990017b58a959e926e6ec4c6` sent a transaction with no token transfers and no created contract in the explorer data, so no funds moved through it.
- **Net amounts.** Across the 72 deposit and withdraw legs the BiFi USDT handler paid out 141,435,902.81731 USDT and took in 141,270,327.66758 USDT, a net loss of **165,575.149730 USDT**. The flash loan of 40,499,999.999997 USDT was repaid in full in the same transaction. The contract then sold 165,574.514633 USDT to the pool for 68.05720311 WETH. About 0.64 USDT was left over.
- **WETH was unwrapped** in the same transaction (68.05720311 WETH burned to the zero address, which is a WETH withdrawal). The resulting ETH is not shown as a transfer by the explorer.
- **A return.** On 2026-10-18 at 17:21:59 UTC, about 36 hours later, c0ffeebabe.eth sent **159,103.654838 USDC** to the BiFi USDT handler. No source mentions this. It is 6,471 below the 165,574.51 USDT-equivalent that was sold; whether that is the operator's costs or a partial return is not stated anywhere OAK saw. This is neutral metadata, not a verdict on the operator.
- **Conflict on date.** The explorer timestamps the exploit deployment at 2026-10-17 05:42:59 UTC and the replay at 2026-10-17 05:43:11 UTC. The sources and this file's header say 2026-10-18. The on-chain times are kept in the edges; Defimon's post is dated 2026-10-18.
- **Limits.** No onward outgoing transfers from the replay contract in the window to 2026-10-23 (the tool returned no edges). The EOA `0xc0ffeebabe5d496b2dde509f9fa189c25cf29671` is a high-volume MEV bot, so its other transactions are not related to this incident and were not followed.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/DefimonAlerts/status/2111725425554571750>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** Defimon's analysis names the functions, the stored idle delta and the live-rate recomputation.

## Public references

- `[defimonbifi2026]` — Defimon on X (2026-10-18): <https://x.com/DefimonAlerts/status/2111725425554571750>
- `[etherscanbifi2026]` — front-run exploit transaction: <https://etherscan.io/tx/0x756c68055af7a0630aa0b56891ba4de14c56c39cbebe99e47eeb4728f4d6ad14>
