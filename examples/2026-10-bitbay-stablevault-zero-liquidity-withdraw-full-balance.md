# BitBay StableVault — with liquidity forced to zero, one share redeemed the whole vault — BitBay StableVault (UsdcDaiV4Vault) / Polygon — 2026-10-09

**Loss:** **~14,838 DAI (~\$14K).**

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary, edge-case accounting*. When the vault's liquidity was zero, **`_withdraw()`** paid the caller the contract's **entire token balance** instead of a pro-rata share. The attacker called **`reposition()`** to drive liquidity to zero, then redeemed a single minimal share unit. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). **OAK-T9.004** — `reposition()` was callable by the attacker.

**Re-mapped 2026-10-11:** primary Technique moved from T9.011 to [`T9.016-contract-accounting-state-invariant-flaw`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md).

**Attribution:** **pseudonymous.**

**Key teaching point:** **The zero-denominator branch is where share math stops being pro-rata.** If a public function can reach the state where that branch runs, the branch is the exploit.

## Summary

On 2026-10-09 an attacker called `reposition()` on BitBay's UsdcDaiV4Vault on Polygon to drive its liquidity to zero, then redeemed one minimal share and received the vault's full ~14,838 DAI balance. SlowMist flagged it at 03:28 UTC.

## Timeline (UTC)

Read it as two stages. **Flaw**: a withdraw branch that pays everything at zero liquidity, and a public function that reaches it. **Take**: reposition, then redeem one share. Times are from the SlowMist alert.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-09 (since when: undisclosed) | In the UsdcDaiV4Vault on Polygon, `_withdraw()` transfers its **entire token balance** when `liquidity == 0`, instead of the caller's pro-rata share. `reposition()` can be called by the attacker, so the zero-liquidity state is reachable. | **T9.016** / T9.004 |
| Before the drain (undisclosed) | No funding, rehearsal or deployment steps are published. SlowMist lists only the attacker address and one transaction. | — |
| 2026-10-09 (before 03:28 UTC) | The attacker calls `reposition()` to drive the vault's liquidity to zero. | T9.004 |
| 2026-10-09 02:23:42 | The attacker redeems **one minimal share unit**. `_withdraw()` pays out the vault's whole balance, **~14,838.47 DAI** ([`0x5b795dc5c5e1665b712c7ccf478c1d8c59a162d698f4e0bfb40bd303e04a7ff2`](https://polygonscan.com/tx/0x5b795dc5c5e1665b712c7ccf478c1d8c59a162d698f4e0bfb40bd303e04a7ff2)). | **T9.016** |
| 2026-10-09 02:24:21 | **Traced by OAK:** the attacker sends the proceeds, **14,813.548248 USDC**, to a pass-through address that splits it in the same transaction: 129.618547 USDC and 14,683.929701 USDC to two further addresses ([`0x397c0c95e3bea5966d9bec90bf752b7850809b8e82ff1b82b95d30011562f821`](https://polygonscan.com/tx/0x397c0c95e3bea5966d9bec90bf752b7850809b8e82ff1b82b95d30011562f821)). Later movements: not traced (see Fund flow). | — |
| 2026-10-09 03:28:35 | SlowMist TI alert; The Crypto Times reports it alongside the EtherVista incident (page not retrievable when this timeline was written). No BitBay statement, pause or fix appears in the cited sources: undisclosed. | response |

Key addresses:

- Attacker — [`0x59Ae3c8dd50063429D86BdaEBbC350fB64e9884B`](https://polygonscan.com/address/0x59Ae3c8dd50063429D86BdaEBbC350fB64e9884B)
- Victim and vulnerable contract (UsdcDaiV4Vault) — [`0x048E88311ca84876aeA086125825492e2AF2e5A0`](https://polygonscan.com/address/0x048E88311ca84876aeA086125825492e2AF2e5A0)
- Attack contract (traced by OAK, the drain tx's `to`) — [`0xc2c6f4f7e1425be1dcb996175cf7852bf53c23e2`](https://polygonscan.com/address/0xc2c6f4f7e1425be1dcb996175cf7852bf53c23e2)
- Pass-through address (traced by OAK) — [`0xfb7c744da69aef11dfb54f31d9db12a3b086b025`](https://polygonscan.com/address/0xfb7c744da69aef11dfb54f31d9db12a3b086b025)
- Split receivers (traced by OAK) — [`0xf2446da67fe63efcd0179275937800f0a3828616`](https://polygonscan.com/address/0xf2446da67fe63efcd0179275937800f0a3828616) and [`0xc1d13492285eb664951e201bf7c80c7c6318a1b5`](https://polygonscan.com/address/0xc1d13492285eb664951e201bf7c80c7c6318a1b5)
- Drain transaction — [`0x5b795dc5c5e1665b712c7ccf478c1d8c59a162d698f4e0bfb40bd303e04a7ff2`](https://polygonscan.com/tx/0x5b795dc5c5e1665b712c7ccf478c1d8c59a162d698f4e0bfb40bd303e04a7ff2)

## Fund flow

Polygon leg, traced by OAK with `tools/explorer.py` on 2026-10-30 through the public JSON-RPC fallback (Blockscout answers HTTP 403 for Polygon), window 2026-10-09 to 2026-10-14. Only allowlisted tokens (USDC, USDT, WETH and similar) are visible to `transfers` and `trace` on this path, and native POL transfers are not visible outside a known transaction.

```oak-flow
as_of: 2026-10-30T14:20Z
nodes:
  - {id: vault, chain: polygon, address: 0x048E88311ca84876aeA086125825492e2AF2e5A0, role: vulnerable-contract, label: "UsdcDaiV4Vault"}
  - {id: atk, chain: polygon, address: 0x59Ae3c8dd50063429D86BdaEBbC350fB64e9884B, role: attacker-eoa, label: "Attacker"}
  - {id: ac, chain: polygon, address: 0xc2c6f4f7e1425be1dcb996175cf7852bf53c23e2, role: attack-contract, label: "Attack contract"}
  - {id: pass, chain: polygon, address: 0xfb7c744da69aef11dfb54f31d9db12a3b086b025, role: intermediary, label: "Pass-through (splits in one tx)"}
  - {id: r1, chain: polygon, address: 0xf2446da67fe63efcd0179275937800f0a3828616, role: unknown, label: "Split receiver (small)"}
  - {id: r2, chain: polygon, address: 0xc1d13492285eb664951e201bf7c80c7c6318a1b5, role: unknown, label: "Split receiver (large)"}
edges:
  - {from: vault, to: ac, asset: DAI, amount: 14838.46660899, tx: 0x5b795dc5c5e1665b712c7ccf478c1d8c59a162d698f4e0bfb40bd303e04a7ff2, time: 2026-10-09T02:23:42Z, technique: T9.016, verified: oak}
  - {from: ac, to: atk, asset: USDC, amount: 14813.548248, tx: 0x5b795dc5c5e1665b712c7ccf478c1d8c59a162d698f4e0bfb40bd303e04a7ff2, time: 2026-10-09T02:23:42Z, verified: oak}
  - {from: atk, to: pass, asset: USDC, amount: 14813.548248, tx: 0x397c0c95e3bea5966d9bec90bf752b7850809b8e82ff1b82b95d30011562f821, time: 2026-10-09T02:24:21Z, verified: oak}
  - {from: pass, to: r1, asset: USDC, amount: 129.618547, tx: 0x397c0c95e3bea5966d9bec90bf752b7850809b8e82ff1b82b95d30011562f821, time: 2026-10-09T02:24:21Z, verified: oak}
  - {from: pass, to: r2, asset: USDC, amount: 14683.929701, tx: 0x397c0c95e3bea5966d9bec90bf752b7850809b8e82ff1b82b95d30011562f821, time: 2026-10-09T02:24:21Z, verified: oak}
```

What the trace adds beyond the sources:

- **The drain was run through an attack contract**, `0xc2c6f4f7e1425be1dcb996175cf7852bf53c23e2` (the transaction's `to`). The vault sent it 14,838.46660899 DAI, matching SlowMist's ~14,838 DAI. The contract swapped through other pools in the same transaction and paid the attacker **14,813.548248 USDC**, not DAI. The roughly 25 difference is swap cost and is not itemised here.
- **Token flag.** The tool marks the DAI contract `0x8f3cf7ad23cd3cadbd9735aff958023239c6a063` as `trusted: false` only because it is not on the allowlist; it is the DAI the vault holds and the source reports. The same transaction also shows other DAI and USDC legs through the Balancer vault and other pool addresses; OAK did not keep them as edges.
- **Split.** The attacker forwarded the USDC to a pass-through address, which split it into 129.618547 and 14,683.929701 USDC in the same transaction. The trace tool also saw a second attacker-to-pass-through USDC transfer by 03:43:27 UTC (18,969.923175 USDC across two transfers in total); its transaction was not opened, so it is not itemised here.
- **Not traced:** movements out of the two split receivers. The public RPC returned connection resets on the second hop. Native POL transfers are invisible on this provider. No CEX, bridge or mixer endpoint is confirmed.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2108399198035202138>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist: with liquidity driven to zero via reposition(), _withdraw() paid the whole contract balance for one share unit.

## Public references

- `[cryptotimesbitbayethervista2026]` — The Crypto Times, "SlowMist Flags BitBay and EtherVista Hacks as Attackers Drain \$32,600 From DeFi Vault & Pool" (2026-10-09): <https://cryptotimes.io/2026/10/09/slowmist-flags-bitbay-and-ethervista-hacks-as-attackers-drain-32600-from-defi-vault-pool>
- `[slowmistbitbay2026]` — SlowMist on X, BitBay StableVault alert: <https://x.com/SlowMist_Team/status/2108399198035202138>
