# Likwid — the zero-leverage borrow path never updated reserves, so every borrow got the same quote — Likwid / BNB Smart Chain — 2026-09-18

**Loss:** **74.31 BNB (~\$55,721)**, subsequently sent to Tornado Cash.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*, state-machine shape. In **`LikwidMarginPosition`**, the **`leverage = 0` path did not update pair reserves**, so repeated borrows each priced against the same, stale quote. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). **OAK-T9.001** (Oracle Price Manipulation — the attacker first **pumped a thin meme-token pool** to set the quote the loop then reused). **OAK-T7.001** (Mixer-Routed Hop — proceeds to Tornado Cash).

**Re-mapped 2026-10-11:** primary Technique moved from T9.004 to [`T9.016-contract-accounting-state-invariant-flaw`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md).

**Attribution:** **pseudonymous.**

**Key teaching point:** **An edge-case branch that skips the state update is a branch the attacker will live in.** `leverage = 0` was presumably treated as a degenerate no-op; it was the one path where borrowing did not move the price it borrowed against. Every branch that transfers value must perform the same accounting as the main path.

## Summary

On 2026-09-18 an attacker pumped a thin meme-token pool, then looped collateral/borrow cycles through LikwidMarginPosition's leverage = 0 path, which did not update pair reserves. Each borrow reused the same inflated quote; 74.31 BNB was drained and sent to Tornado Cash.

## Timeline (UTC)

Read it as three stages. **Flaw**: one branch skips the reserve update. **Take**: a 14-cycle borrow loop in one transaction. **After**: the cited sources stop at the alert. Times are from the SlowMist alert.

| When | What happened | OAK |
|---|---|---|
| Before 2026-09-18 (since when: undisclosed) | In `LikwidMarginPosition._executeAddCollateralAndBorrow`, the `leverage = 0` branch never assigns `delta.pairDelta`, so a borrow through it leaves `pairReserves` untouched. The flaw is in the deployed contract; how long it was live is not published. | **T9.016** |
| Before the loop (undisclosed) | The attacker deploys an attack contract and sets up the quote the loop will reuse. This entry records the setup as a pump of a thin meme-token pool; the cited SlowMist alert does not describe that step and gives no transaction for it. | T9.001 |
| 2026-09-18 (before 03:13 UTC) | In one transaction, [`0x83cbd07d59aedc2f114c351c568d3386ff5bc7caa87d12bc6494e2dc7bf16f4d`](https://bscscan.com/tx/0x83cbd07d59aedc2f114c351c568d3386ff5bc7caa87d12bc6494e2dc7bf16f4d), the attack contract repeats the margin/borrow cycle **14 times**. `getAmountOut(pairReserves, …)` returns the same 4.7857 BNB quote every time, so 211.8M TOKEN settle at the first-trade price with no AMM price impact. | **T9.016** |
| 2026-09-18 | The attacker keeps **74.31 BNB** (~\$55,721) taken from `LikwidVault`. This entry records the proceeds as sent to Tornado Cash; the cited sources do not show those transfers, so the route and time are undisclosed. | T7.001 |
| 2026-09-18 03:13:48 | SlowMist TI alert names the root cause and the four contracts. Coinfomania repeats it the same day. | — |
| After 2026-09-18 | No Likwid statement, pause, fix or compensation plan appears in the cited sources: undisclosed. | response |

Key addresses:

- Attacker EOA — [`0x90bde1e0bb16b3deeb9d638acf8d01f19fd2f31e`](https://bscscan.com/address/0x90bde1e0bb16b3deeb9d638acf8d01f19fd2f31e)
- Attack contract — [`0xc63fb27f52ed8d06673c60c3075b2d3bd26cf4aa`](https://bscscan.com/address/0xc63fb27f52ed8d06673c60c3075b2d3bd26cf4aa)
- Vulnerable contract (`LikwidMarginPosition`) — [`0x6bec0c1dc4898484b7f094566ddf8bc82ed7abe8`](https://bscscan.com/address/0x6bec0c1dc4898484b7f094566ddf8bc82ed7abe8)
- Victim contract (`LikwidVault`) — [`0x065d449ec9d139740343990b7e1cf05fa830e4ba`](https://bscscan.com/address/0x065d449ec9d139740343990b7e1cf05fa830e4ba)
- Tornado Cash deposit addresses — not published in the cited sources

## Public references

- `[slowmistlikwid2026]` — SlowMist on X, Likwid alert (2026-09-18): <https://x.com/SlowMist_Team/status/2100785330849009937>
- `[coinfomanialikwid2026]` — Coinfomania, "Likwid's Margin Position Exploit Results in 74.31 BNB Loss": <https://coinfomania.com/likwids-margin-position-exploit-results-in-74-31-bnb-loss/>
