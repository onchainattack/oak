# Kolan — anyone could settle an expired window, and settlement ran an unbounded buyback at the pool's instantaneous price — KolanHook (Uniswap v4) / Ethereum — 2026-10-15

**Loss:** **~1.28 ETH (~\$3K)** profit; the hook lost ~2.31 ETH.

**OAK Techniques observed:** **OAK-T9.001** (Oracle / Price Manipulation — *primary*. `KolanHook.accept(id)` is callable by anyone after expiry, and `_closeWindow()` repositions escrowed ETH liquidity and runs an unbounded buyback at the same pool's instantaneous `_sqrtPrice()`. The attacker pushed KLN up with a 6.7 WETH Balancer flash loan, forced settlement of expired windows 10 and 42, then sold back through the ETH those closes injected. See [`techniques/T9.001-oracle-price-manipulation.md`](../techniques/T9.001-oracle-price-manipulation.md)). Flash-loan funded (OAK-T9.002).

**Attribution:** **pseudonymous** (`0x8df7…e382`).

**Key teaching point:** **Permissionless settlement at spot is a price the caller sets.** Hooks that trade their own reserves need a slippage bound or a TWAP.

## Summary

ExVul and Defimon reported the exploit on 2026-10-15.

## Root-cause evidence

- **Technique:** OAK-T9.001
- **Source:** <https://x.com/exvulsec/status/2110708025753481600>; <https://www.rektradar.xyz/web3-daily-exploits-16-oct-2026-kolan-3k-uniswap-v4-hook/>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** ExVul names `accept(id)`, `_closeWindow()` and the spot-price buyback; RektRadar, citing Defimon, describes the same mechanism.

## Public references

- `[exvulkolan2026]` — ExVul on X (2026-10-15): <https://x.com/exvulsec/status/2110708025753481600>
- `[etherscankolan2026]` — exploit transaction: <https://etherscan.io/tx/0x7b131926e6f06491ae1aead3e419b208c8aa70ed7898e8c5a33d9f52e40915a9>
