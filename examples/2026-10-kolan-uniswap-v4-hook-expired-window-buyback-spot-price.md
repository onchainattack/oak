# Kolan — anyone could settle an expired window, and settlement ran an unbounded buyback at the pool's instantaneous price — KolanHook (Uniswap v4) / Ethereum — 2026-10-15

**Loss:** **~1.28 ETH (~\$3K)** profit; the hook lost ~2.31 ETH.

**OAK Techniques observed:** **OAK-T9.001** (Oracle / Price Manipulation — *primary*. `KolanHook.accept(id)` is callable by anyone after expiry, and `_closeWindow()` repositions escrowed ETH liquidity and runs an unbounded buyback at the same pool's instantaneous `_sqrtPrice()`. The attacker pushed KLN up with a 6.7 WETH Balancer flash loan, forced settlement of expired windows 10 and 42, then sold back through the ETH those closes injected. See [`techniques/T9.001-oracle-price-manipulation.md`](../techniques/T9.001-oracle-price-manipulation.md)). Flash-loan funded (OAK-T9.002).

**Attribution:** **pseudonymous** ([`0x8df735014eab81905e76b87ef0c069bd8e0ae382`](https://etherscan.io/address/0x8df735014eab81905e76b87ef0c069bd8e0ae382)).

**Key teaching point:** **Permissionless settlement at spot is a price the caller sets.** Hooks that trade their own reserves need a slippage bound or a TWAP.

## Summary

ExVul and Defimon reported the exploit on 2026-10-15.

## Timeline (UTC)

Read it as three stages. **Flaw**: settlement of an expired window is open to anyone and buys back at the spot price. **Take**: one transaction moves the price, forces two settlements, and sells back. **Aftermath**: the profit stays with the attacker. Times are not published; the whole exploit is one transaction on 2026-10-15.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-15 (undisclosed) | KolanHook ([`0x0136fecf49e0217bfd2d9551e8e7b05f174ba8ec`](https://etherscan.io/address/0x0136fecf49e0217bfd2d9551e8e7b05f174ba8ec)), a Uniswap v4 hook, holds escrowed ETH for timed purchase windows. `accept(id)` can be called by anyone once a window has expired. `_closeWindow()` then repositions the escrowed ETH liquidity and runs an unbounded buyback at the same pool's instantaneous `_sqrtPrice()`, with no slippage limit. Since when the code was deployed is not stated. | **T9.001** (flaw) |
| Before 2026-10-15 (undisclosed) | The attacker ([`0x8df735014eab81905e76b87ef0c069bd8e0ae382`](https://etherscan.io/address/0x8df735014eab81905e76b87ef0c069bd8e0ae382)) prepares a helper contract ([`0x4d6a41f2b80fe75facf27f9d0b3dc8bd0ebc835f`](https://etherscan.io/address/0x4d6a41f2b80fe75facf27f9d0b3dc8bd0ebc835f)). Funding is not published. | — |
| 2026-10-15 (one transaction, [`0x7b131926e6f06491ae1aead3e419b208c8aa70ed7898e8c5a33d9f52e40915a9`](https://etherscan.io/tx/0x7b131926e6f06491ae1aead3e419b208c8aa70ed7898e8c5a33d9f52e40915a9)) | The attacker flash-borrows 6.7 WETH from Balancer and buys KLN, pushing the pool's spot price up. | **T9.002** |
| 2026-10-15 (same transaction) | The attacker calls `accept` on expired windows 10 and 42. The hook spends 2.309861 ETH of its reserves buying back and burning KLN at the manipulated price. | **T9.001** |
| 2026-10-15 (same transaction) | The attacker sells the KLN it bought into the pool, now enriched by the injected ETH, repays the loan and keeps a net 1.279453 ETH (about \$3K). | **T9.001** |
| 2026-10-15 12:23 | ExVul posts the alert and root cause; Defimon also reports it. | — |
| 2026-10-15 to 2026-10-18 (traced by OAK) | The 1.27991443 ETH net reaches the attacker EOA in the same transaction. On 2026-10-18 at 07:57 UTC the EOA deposits 1 ETH into the Tornado Cash router ([`0xbc815b4c4797424db199a134a458f078ed2de84afeb485f4a5dd1299775060d6`](https://etherscan.io/tx/0xbc815b4c4797424db199a134a458f078ed2de84afeb485f4a5dd1299775060d6)). | — |
| After 2026-10-15 (undisclosed) | The proceeds remained with the attacker as of RektRadar's 2026-10-16 brief. No protocol statement, pause, bounty or recovery was found in the posts. | — |

Key addresses:

- Attacker EOA: [`0x8df735014eab81905e76b87ef0c069bd8e0ae382`](https://etherscan.io/address/0x8df735014eab81905e76b87ef0c069bd8e0ae382)
- Victim and vulnerable contract (KolanHook): [`0x0136fecf49e0217bfd2d9551e8e7b05f174ba8ec`](https://etherscan.io/address/0x0136fecf49e0217bfd2d9551e8e7b05f174ba8ec)
- Attack helper contract: [`0x4d6a41f2b80fe75facf27f9d0b3dc8bd0ebc835f`](https://etherscan.io/address/0x4d6a41f2b80fe75facf27f9d0b3dc8bd0ebc835f)
- Uniswap v4 PoolManager (counterparty, not the attacker): [`0x000000000004444c5dc75cb358380d2e3de08a90`](https://etherscan.io/address/0x000000000004444c5dc75cb358380d2e3de08a90)
- Tornado Cash router used for the 2026-10-18 deposit (traced by OAK): [`0xd90e2f925da726b50c4ed8d0fb90ad053324f31b`](https://etherscan.io/address/0xd90e2f925da726b50c4ed8d0fb90ad053324f31b)

## Fund flow

Ethereum only, traced by OAK with `tools/explorer.py` and the Blockscout API on 2026-10-30, covering the first five days (to 2026-10-20). Every edge was checked on-chain. The attacker EOA has 40 transactions in total and made no outgoing value transfer in the window except one Tornado Cash deposit. KLN (`0x2cadc4f2660bb77a118b0e74fc9e48e935b3a1bf`) is flagged `trusted: false` by the tool and was ignored. Only the native ETH and WETH legs are drawn.

```oak-flow
as_of: 2026-10-30T14:30Z
nodes:
  - {id: bal, chain: ethereum, address: 0xba12222222228d8ba445958a75a0704d566bf2c8, role: lending, label: "Balancer Vault (flash loan)"}
  - {id: help, chain: ethereum, address: 0x4d6a41f2b80fe75facf27f9d0b3dc8bd0ebc835f, role: attack-contract, label: "Attack helper contract"}
  - {id: pm, chain: ethereum, address: 0x000000000004444c5dc75cb358380d2e3de08a90, role: dex, label: "Uniswap v4 PoolManager"}
  - {id: hook, chain: ethereum, address: 0x0136fecf49e0217bfd2d9551e8e7b05f174ba8ec, role: vulnerable-contract, label: "KolanHook"}
  - {id: eoa, chain: ethereum, address: 0x8df735014eab81905e76b87ef0c069bd8e0ae382, role: attacker-eoa, label: "Attacker EOA"}
  - {id: tc, chain: ethereum, address: 0xd90e2f925da726b50c4ed8d0fb90ad053324f31b, role: mixer, label: "Tornado Cash router"}
edges:
  - {from: bal, to: help, asset: WETH, amount: 6.7, tx: 0x7b131926e6f06491ae1aead3e419b208c8aa70ed7898e8c5a33d9f52e40915a9, time: 2026-10-15T11:06:11Z, technique: T9.002, verified: oak}
  - {from: help, to: pm, asset: ETH, amount: 6.7, tx: 0x7b131926e6f06491ae1aead3e419b208c8aa70ed7898e8c5a33d9f52e40915a9, time: 2026-10-15T11:06:11Z, technique: T9.001, verified: oak}
  - {from: hook, to: pm, asset: ETH, amount: 2.30986111, tx: 0x7b131926e6f06491ae1aead3e419b208c8aa70ed7898e8c5a33d9f52e40915a9, time: 2026-10-15T11:06:11Z, technique: T9.001, verified: oak}
  - {from: pm, to: help, asset: ETH, amount: 7.97991443, tx: 0x7b131926e6f06491ae1aead3e419b208c8aa70ed7898e8c5a33d9f52e40915a9, time: 2026-10-15T11:06:11Z, technique: T9.001, verified: oak}
  - {from: help, to: bal, asset: WETH, amount: 6.7, tx: 0x7b131926e6f06491ae1aead3e419b208c8aa70ed7898e8c5a33d9f52e40915a9, time: 2026-10-15T11:06:11Z, technique: T9.002, verified: oak}
  - {from: help, to: eoa, asset: ETH, amount: 1.27991443, tx: 0x7b131926e6f06491ae1aead3e419b208c8aa70ed7898e8c5a33d9f52e40915a9, time: 2026-10-15T11:06:11Z, technique: T9.001, verified: oak}
  - {from: eoa, to: tc, asset: ETH, amount: 1, tx: 0xbc815b4c4797424db199a134a458f078ed2de84afeb485f4a5dd1299775060d6, time: 2026-10-18T07:57:59Z, verified: oak}
```

What the trace adds beyond the sources:

- **The exploit transaction, line by line.** Balancer lends 6.7 WETH, the helper unwraps it and sends 6.7 ETH into the Uniswap v4 PoolManager. KolanHook then sends 2.05 and 0.25986111 ETH into the PoolManager (2.30986111 ETH in total, matching the 2.309861 ETH in the sources). The PoolManager pays 7.97991443 ETH back to the helper, which repays 6.7 WETH and forwards the rest to the attacker EOA.
- **Net profit differs slightly.** The chain shows **1.27991443 ETH** reaching the EOA (7.97991443 minus 6.7). The sources say 1.279453 ETH. The gap is 0.000461 ETH; the sources do not give their basis, so both figures are kept.
- **Only part of the proceeds moved, and only into a mixer.** On 2026-10-18 at 07:57:59 UTC the EOA deposited **1 ETH** into the Tornado Cash router. The remaining balance stayed put through 2026-10-20, the end of the window. This is the only outgoing value transfer from the EOA between the exploit and 2026-10-20. Where the Tornado output went is not traceable.
- **The EOA is not new.** It had made four earlier 1 ETH Tornado Cash deposits (three on 2026-10-12, one on 2026-08-04) and received small ETH transfers from many addresses before the exploit. Its funding source for the exploit gas was not resolved.
- **Limits.** Withdrawal-side tracing out of Tornado Cash is not attempted. No other chain was checked.

## Root-cause evidence

- **Technique:** OAK-T9.001
- **Source:** <https://x.com/exvulsec/status/2110708025753481600>; <https://www.rektradar.xyz/web3-daily-exploits-16-oct-2026-kolan-3k-uniswap-v4-hook/>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** ExVul names `accept(id)`, `_closeWindow()` and the spot-price buyback; RektRadar, citing Defimon, describes the same mechanism.

## Public references

- `[exvulkolan2026]` — ExVul on X (2026-10-15): <https://x.com/exvulsec/status/2110708025753481600>
- `[etherscankolan2026]` — exploit transaction: <https://etherscan.io/tx/0x7b131926e6f06491ae1aead3e419b208c8aa70ed7898e8c5a33d9f52e40915a9>
