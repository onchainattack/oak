# Likwid — the zero-leverage borrow path never updated reserves, so every borrow got the same quote — Likwid / BNB Smart Chain — 2026-09-18

**Loss:** **74.31 BNB (~\$55,721)**, subsequently sent to Tornado Cash.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary*, state-machine shape. In **`LikwidMarginPosition`**, the **`leverage = 0` path did not update pair reserves**, so repeated borrows each priced against the same, stale quote. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). **OAK-T9.001** (Oracle Price Manipulation — the attacker first **pumped a thin meme-token pool** to set the quote the loop then reused). **OAK-T7.001** (Mixer-Routed Hop — proceeds to Tornado Cash).

**Attribution:** **pseudonymous.**

**Key teaching point:** **An edge-case branch that skips the state update is a branch the attacker will live in.** `leverage = 0` was presumably treated as a degenerate no-op; it was the one path where borrowing did not move the price it borrowed against. Every branch that transfers value must perform the same accounting as the main path.

## Summary

On 2026-09-18 an attacker pumped a thin meme-token pool, then looped collateral/borrow cycles through LikwidMarginPosition's leverage = 0 path, which did not update pair reserves. Each borrow reused the same inflated quote; 74.31 BNB was drained and sent to Tornado Cash.

## Public references

- `[slowmistlikwid2026]` — SlowMist on X, Likwid alert (2026-09-18): <https://x.com/SlowMist_Team/status/2100785330849009937>
- `[coinfomanialikwid2026]` — Coinfomania, "Likwid's Margin Position Exploit Results in 74.31 BNB Loss": <https://coinfomania.com/likwids-margin-position-exploit-results-in-74-31-bnb-loss/>
