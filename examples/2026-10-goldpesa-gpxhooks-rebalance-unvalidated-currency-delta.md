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
| 2026-10-02 13:05:51 (same transaction, traced by OAK) | The attack contract swaps the 114,428.509331 USDC net for 96,388.996061 USDT at `0xd56da2b74ba826f19015e6b7dd9dae1903e85da1` and forwards it to the attacker. The attacker's USDT balance is now zero; the onward path is not traced (token not in the OAK Base allowlist). | **T9.016** |
| 2026-10-03 | SlowMist posts the alert; GPX trading volume is reported at \$0. No pause, fix or statement from GoldPesa is found in the cited sources (undisclosed). | response |

Key addresses:

- Attacker — [`0x4a5FD2e9357cC87DF4cD6A1808174DBc8646899F`](https://basescan.org/address/0x4a5FD2e9357cC87DF4cD6A1808174DBc8646899F)
- Victim and vulnerable contract (GPXHooks) — [`0x4519e2b040ff1B64fa03aBe2AeF0BC99D7CcEaA8`](https://basescan.org/address/0x4519e2b040ff1B64fa03aBe2AeF0BC99D7CcEaA8)
- Attack contract (traced by OAK) — [`0x3d69591a3868fe77b531187486862c459cce4e86`](https://basescan.org/address/0x3d69591a3868fe77b531187486862c459cce4e86)
- PoolManager that paid out the USDC (traced by OAK) — [`0x498581ff718922c3f8e6a244956af099b2652b2b`](https://basescan.org/address/0x498581ff718922c3f8e6a244956af099b2652b2b)
- Exploit transaction — [`0x5c1febd5047c2a15c37988b6abd5c8b984236dddf6fd24eed96b0f43951ad2c9`](https://basescan.org/tx/0x5c1febd5047c2a15c37988b6abd5c8b984236dddf6fd24eed96b0f43951ad2c9)

## Fund flow

Base leg, traced by OAK on 2026-10-30 from the exploit transaction. Base's Blockscout blocks automated clients, so OAK used public JSON-RPC: `tx` sees every Transfer log of the exploit transaction, but native ETH and internal calls are not visible. Edges marked *traced by OAK* were checked on-chain. The USDC the attacker took did not stay as USDC: inside the same transaction it was swapped for USDT.

```oak-flow
as_of: 2026-10-30T14:20Z
nodes:
  - {id: lend, chain: base, address: 0xbbbbbbbbbb9cc5e90e3b3af64bdaf62c37eeffcb, role: lending, label: "Flash-loan source (Morpho-style lender, unlabelled by OAK)"}
  - {id: pm, chain: base, address: 0x498581ff718922c3f8e6a244956af099b2652b2b, role: victim, label: "PoolManager holding the pooled USDC"}
  - {id: hook, chain: base, address: 0x4519e2b040ff1b64fa03abe2aef0bc99d7cceaa8, role: vulnerable-contract, label: "GPXHooks"}
  - {id: atkc, chain: base, address: 0x3d69591a3868fe77b531187486862c459cce4e86, role: attack-contract, label: "Attack contract (exploit tx target)"}
  - {id: atk, chain: base, address: 0x4a5fd2e9357cc87df4cd6a1808174dbc8646899f, role: attacker-eoa, label: "Attacker"}
  - {id: pool, chain: base, address: 0xd56da2b74ba826f19015e6b7dd9dae1903e85da1, role: dex, label: "USDC/USDT swap venue"}
edges:
  - {from: lend, to: atkc, asset: USDC, amount: 175000, tx: 0x5c1febd5047c2a15c37988b6abd5c8b984236dddf6fd24eed96b0f43951ad2c9, time: 2026-10-02T13:05:51Z, verified: oak}
  - {from: pm, to: atkc, asset: USDC, amount: 125428.509331, tx: 0x5c1febd5047c2a15c37988b6abd5c8b984236dddf6fd24eed96b0f43951ad2c9, time: 2026-10-02T13:05:51Z, tx_count: 2, technique: T9.016, verified: oak}
  - {from: atkc, to: pm, asset: USDC, amount: 11000, tx: 0x5c1febd5047c2a15c37988b6abd5c8b984236dddf6fd24eed96b0f43951ad2c9, time: 2026-10-02T13:05:51Z, tx_count: 2, verified: oak}
  - {from: atkc, to: lend, asset: USDC, amount: 175000, tx: 0x5c1febd5047c2a15c37988b6abd5c8b984236dddf6fd24eed96b0f43951ad2c9, time: 2026-10-02T13:05:51Z, verified: oak}
  - {from: atkc, to: pool, asset: USDC, amount: 114428.509331, tx: 0x5c1febd5047c2a15c37988b6abd5c8b984236dddf6fd24eed96b0f43951ad2c9, time: 2026-10-02T13:05:51Z, verified: oak}
  - {from: pool, to: atkc, asset: USDT, amount: 96388.996061, tx: 0x5c1febd5047c2a15c37988b6abd5c8b984236dddf6fd24eed96b0f43951ad2c9, time: 2026-10-02T13:05:51Z, verified: oak}
  - {from: atkc, to: atk, asset: USDT, amount: 96388.996061, tx: 0x5c1febd5047c2a15c37988b6abd5c8b984236dddf6fd24eed96b0f43951ad2c9, time: 2026-10-02T13:05:51Z, verified: oak}
```

What the trace adds beyond the sources:

- **Everything happened in one transaction** (`0x5c1febd5047c2a15c37988b6abd5c8b984236dddf6fd24eed96b0f43951ad2c9`, 2026-10-02 13:05:51 UTC, sent by the attacker to the attack contract `0x3d69591a3868fe77b531187486862c459cce4e86`). The exact time was undisclosed in the sources.
- **A 175,000 USDC flash loan** came in from `0xbbbbbbbbbb9cc5e90e3b3af64bdaf62c37eeffcb` and was repaid in full inside the same transaction.
- **The amounts match the source.** The PoolManager sent the attack contract 114,999.999186 USDC (the source's figure) and 10,428.510145 USDC, and received 11,000 USDC back, a net outflow of 114,428.509331 USDC. The hook received 33,868.603002 USDC and returned the same amount in the same transaction.
- **The attacker ended with USDT, not USDC.** The attack contract sold the 114,428.509331 USDC at `0xd56da2b74ba826f19015e6b7dd9dae1903e85da1` for 96,388.996061 USDT and forwarded it to the attacker. That is about 18,040 less than the USDC taken, so the swap was at a poor rate or the venue was thin. The reported \$114.9K is the USDC figure, not what the attacker received.
- The USDT token is `0xfde4c96c8593536e31f229ea8f37b2ada2699bb2` (name "Tether USD", symbol USDT, read on-chain). OAK's Base allowlist does not include it, so the tool flagged it `trusted: false`. It is not a counterfeit; this is an allowlist gap.
- **The PoolManager role.** The USDC left `0x498581ff718922c3f8e6a244956af099b2652b2b`, which exchanged USDC with the hook. The source describes an "attacker-controlled PoolManager"; OAK did not verify which contract is which beyond the Transfer logs.
- **Limits.** The attacker's USDT balance is now zero (`balanceOf` read 2026-10-30), but `transfers` and `trace` cover only allowlisted tokens, so where the 96,388.996061 USDT went is not traced. Native ETH is not visible over RPC. `trace` from the attacker for 2026-10-02 to 2026-10-05 found no USDC or WETH movement.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2106415554492059872>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist alert, relayed in syndicated reporting: GPXHooks.reBalance() did not validate currency deltas against the shared PositionManager. No transaction-level analysis located.

## Public references

- `[slowmistgoldpesa2026]` — SlowMist on X, GoldPesa alert (2026-10-02): <https://x.com/SlowMist_Team/status/2106415554492059872>
- `[edgexgoldpesa2026]` — EdgeX News, "Goldpesatoken Hit by \$114.9K Exploit as Flaw in GPXHooks reBalance() Function Revealed": <https://pro.edgex.exchange/en-US/news/article/goldpesatoken-exploit-defi-loss>
