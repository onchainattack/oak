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
| 2026-10-09 (before 03:28 UTC) | The attacker redeems **one minimal share unit**. `_withdraw()` pays out the vault's whole balance, **~14,838.47 DAI** ([`0x5b795dc5c5e1665b712c7ccf478c1d8c59a162d698f4e0bfb40bd303e04a7ff2`](https://polygonscan.com/tx/0x5b795dc5c5e1665b712c7ccf478c1d8c59a162d698f4e0bfb40bd303e04a7ff2)). | **T9.016** |
| After 2026-10-09 | Where the DAI went after the attacker address is not published. | — |
| 2026-10-09 03:28:35 | SlowMist TI alert; The Crypto Times reports it alongside the EtherVista incident (page not retrievable when this timeline was written). No BitBay statement, pause or fix appears in the cited sources: undisclosed. | response |

Key addresses:

- Attacker — [`0x59Ae3c8dd50063429D86BdaEBbC350fB64e9884B`](https://polygonscan.com/address/0x59Ae3c8dd50063429D86BdaEBbC350fB64e9884B)
- Victim and vulnerable contract (UsdcDaiV4Vault) — [`0x048E88311ca84876aeA086125825492e2AF2e5A0`](https://polygonscan.com/address/0x048E88311ca84876aeA086125825492e2AF2e5A0)
- Drain transaction — [`0x5b795dc5c5e1665b712c7ccf478c1d8c59a162d698f4e0bfb40bd303e04a7ff2`](https://polygonscan.com/tx/0x5b795dc5c5e1665b712c7ccf478c1d8c59a162d698f4e0bfb40bd303e04a7ff2)

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2108399198035202138>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist: with liquidity driven to zero via reposition(), _withdraw() paid the whole contract balance for one share unit.

## Public references

- `[cryptotimesbitbayethervista2026]` — The Crypto Times, "SlowMist Flags BitBay and EtherVista Hacks as Attackers Drain \$32,600 From DeFi Vault & Pool" (2026-10-09): <https://cryptotimes.io/2026/10/09/slowmist-flags-bitbay-and-ethervista-hacks-as-attackers-drain-32600-from-defi-vault-pool>
- `[slowmistbitbay2026]` — SlowMist on X, BitBay StableVault alert: <https://x.com/SlowMist_Team/status/2108399198035202138>
