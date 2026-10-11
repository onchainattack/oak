# BitBay StableVault — with liquidity forced to zero, one share redeemed the whole vault — BitBay StableVault (UsdcDaiV4Vault) / Polygon — 2026-10-09

**Loss:** **~14,838 DAI (~\$14K).**

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary, edge-case accounting*. When the vault's liquidity was zero, **`_withdraw()`** paid the caller the contract's **entire token balance** instead of a pro-rata share. The attacker called **`reposition()`** to drive liquidity to zero, then redeemed a single minimal share unit. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). **OAK-T9.004** — `reposition()` was callable by the attacker. *(Re-mapped 2026-10-11 from OAK-T9.011; see [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md).)*

**Attribution:** **pseudonymous.**

**Key teaching point:** **The zero-denominator branch is where share math stops being pro-rata.** If a public function can reach the state where that branch runs, the branch is the exploit.

## Summary

On 2026-10-09 an attacker called `reposition()` on BitBay's UsdcDaiV4Vault on Polygon to drive its liquidity to zero, then redeemed one minimal share and received the vault's full ~14,838 DAI balance. SlowMist flagged it at 03:28 UTC.

## Public references

- `[cryptotimesbitbayethervista2026]` — The Crypto Times, "SlowMist Flags BitBay and EtherVista Hacks as Attackers Drain \$32,600 From DeFi Vault & Pool" (2026-10-09): <https://cryptotimes.io/2026/10/09/slowmist-flags-bitbay-and-ethervista-hacks-as-attackers-drain-32600-from-defi-vault-pool>
- `[slowmistbitbay2026]` — SlowMist on X, BitBay StableVault alert: <https://x.com/SlowMist_Team/status/2108399198035202138>
