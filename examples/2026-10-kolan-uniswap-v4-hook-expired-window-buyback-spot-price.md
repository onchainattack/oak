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
| After 2026-10-15 (undisclosed) | The proceeds remain with the attacker as of RektRadar's 2026-10-16 brief. No protocol statement, pause, bounty or recovery was found in the posts. | — |

Key addresses:

- Attacker EOA: [`0x8df735014eab81905e76b87ef0c069bd8e0ae382`](https://etherscan.io/address/0x8df735014eab81905e76b87ef0c069bd8e0ae382)
- Victim and vulnerable contract (KolanHook): [`0x0136fecf49e0217bfd2d9551e8e7b05f174ba8ec`](https://etherscan.io/address/0x0136fecf49e0217bfd2d9551e8e7b05f174ba8ec)
- Attack helper contract: [`0x4d6a41f2b80fe75facf27f9d0b3dc8bd0ebc835f`](https://etherscan.io/address/0x4d6a41f2b80fe75facf27f9d0b3dc8bd0ebc835f)

## Root-cause evidence

- **Technique:** OAK-T9.001
- **Source:** <https://x.com/exvulsec/status/2110708025753481600>; <https://www.rektradar.xyz/web3-daily-exploits-16-oct-2026-kolan-3k-uniswap-v4-hook/>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** ExVul names `accept(id)`, `_closeWindow()` and the spot-price buyback; RektRadar, citing Defimon, describes the same mechanism.

## Public references

- `[exvulkolan2026]` — ExVul on X (2026-10-15): <https://x.com/exvulsec/status/2110708025753481600>
- `[etherscankolan2026]` — exploit transaction: <https://etherscan.io/tx/0x7b131926e6f06491ae1aead3e419b208c8aa70ed7898e8c5a33d9f52e40915a9>
