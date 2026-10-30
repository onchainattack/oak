# GoldPesa — a hook's reBalance() trusted currency deltas it never settled through the shared PositionManager — GoldPesa (GPX) / Base — 2026-10-02

**Loss:** **~\$114.9K.**

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary, single-sourced*. Per syndicated reporting of SlowMist's alert, **`GPXHooks.reBalance()`** did not validate currency deltas against the shared **PositionManager**, allowing positions to be minted without the matching settlement. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). No transaction-level analysis was found; mapping is provisional.

**Re-mapped 2026-10-11:** primary Technique moved from T9.004 to [`T9.016-contract-accounting-state-invariant-flaw`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md).

**Attribution:** **pseudonymous.**

**Key teaching point:** **In a hook architecture the hook is part of the accounting, and an unsettled delta is free money.** Every path that changes a position must close its deltas against the pool manager before returning.

## Summary

On 2026-10-02 an attacker used GoldPesa's `GPXHooks.reBalance()` to mint positions without settling the matching currency deltas through the PositionManager, extracting ~\$114.9K. SlowMist flagged it; GPX trading volume fell to zero afterwards.

## Timeline (UTC)

Read it as three stages. **Flaw**: the hook's `reBalance()` runs through a shared PositionManager without checking that its currency deltas are zero. **Take**: the attacker leaves a phantom debt open, triggers the rebalance, then cancels the debt. **After**: trading volume falls to zero; no response is published. Times are from SlowMist's alert (posted 2026-10-03 16:06 UTC).

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-02 (undisclosed) | `GPXHooks.reBalance()` is deployed performing liquidity operations through the shared, flash-accounted PositionManager inside a PoolManager `unlock`, without verifying that the PositionManager's GPX/USDC currency deltas are zero. Since when is not stated. | **T9.016** (flaw) |
| 2026-10-02 (exact time undisclosed) | The attacker opens an `unlock` on an attacker-controlled PoolManager and mints a WETH/USDC position with `MINT_POSITION` without settling. That leaves the shared PositionManager with a −114,999.999187 USDC delta. | **T9.016** |
| 2026-10-02 (same transaction) | The attacker swaps on the GPX pool to trigger the hourly rebalance. The hook burns its real position and earns a +148,868.602189 USDC credit, but `TAKE_PAIR` can only withdraw the net positive amount, so the hook receives 33,868.603002 USDC and the attacker's phantom debt absorbs the difference. | **T9.016** |
| 2026-10-02 (same transaction) | The attacker burns its own position, which cancels the debt, and takes 114,999.999186 USDC out of the PoolManager. The loss is reported as about \$114.9K. | **T9.016** |
| After 2026-10-02 | Where the USDC went is not published in the cited sources. | — |
| 2026-10-03 | SlowMist posts the alert; GPX trading volume is reported at \$0. No pause, fix or statement from GoldPesa is found in the cited sources (undisclosed). | response |

Key addresses:

- Attacker — [`0x4a5FD2e9357cC87DF4cD6A1808174DBc8646899F`](https://basescan.org/address/0x4a5FD2e9357cC87DF4cD6A1808174DBc8646899F)
- Victim and vulnerable contract (GPXHooks) — [`0x4519e2b040ff1B64fa03aBe2AeF0BC99D7CcEaA8`](https://basescan.org/address/0x4519e2b040ff1B64fa03aBe2AeF0BC99D7CcEaA8)
- Exploit transaction — [`0x5c1febd5047c2a15c37988b6abd5c8b984236dddf6fd24eed96b0f43951ad2c9`](https://basescan.org/tx/0x5c1febd5047c2a15c37988b6abd5c8b984236dddf6fd24eed96b0f43951ad2c9)

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2106415554492059872>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist alert, relayed in syndicated reporting: GPXHooks.reBalance() did not validate currency deltas against the shared PositionManager. No transaction-level analysis located.

## Public references

- `[slowmistgoldpesa2026]` — SlowMist on X, GoldPesa alert (2026-10-02): <https://x.com/SlowMist_Team/status/2106415554492059872>
- `[edgexgoldpesa2026]` — EdgeX News, "Goldpesatoken Hit by \$114.9K Exploit as Flaw in GPXHooks reBalance() Function Revealed": <https://pro.edgex.exchange/en-US/news/article/goldpesatoken-exploit-defi-loss>
