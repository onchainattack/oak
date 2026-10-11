# GoldPesa — a hook's reBalance() trusted currency deltas it never settled through the shared PositionManager — GoldPesa (GPX) / Base — 2026-10-02

**Loss:** **~\$114.9K.**

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary, single-sourced*. Per syndicated reporting of SlowMist's alert, **`GPXHooks.reBalance()`** did not validate currency deltas against the shared **PositionManager**, allowing positions to be minted without the matching settlement. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). No transaction-level analysis was found; mapping is provisional.

**Attribution:** **pseudonymous.**

**Key teaching point:** **In a hook architecture the hook is part of the accounting, and an unsettled delta is free money.** Every path that changes a position must close its deltas against the pool manager before returning.

## Summary

On 2026-10-02 an attacker used GoldPesa's `GPXHooks.reBalance()` to mint positions without settling the matching currency deltas through the PositionManager, extracting ~\$114.9K. SlowMist flagged it; GPX trading volume fell to zero afterwards.

## Public references

- `[slowmistgoldpesa2026]` — SlowMist on X, GoldPesa alert (2026-10-02): <https://x.com/SlowMist_Team/status/2106415554492059872>
- `[edgexgoldpesa2026]` — EdgeX News, "Goldpesatoken Hit by \$114.9K Exploit as Flaw in GPXHooks reBalance() Function Revealed": <https://pro.edgex.exchange/en-US/news/article/goldpesatoken-exploit-defi-loss>
