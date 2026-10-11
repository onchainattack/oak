# EtherVista — the K check multiplied uint112 reserves and overflowed, so a smaller product passed as a larger one — EtherVista / EVM — 2026-10-09

**Loss:** **~\$18.6K** in WETH and VISTA.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary, arithmetic overflow*. **`EtherVistaPair.swap()`** checked the constant-product invariant on reserves stored as **uint112** in a way that could **wrap**, letting a post-swap product that had actually fallen pass the check. Two crafted swaps drained the pool. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). **OAK-T9.004** — the attacker first **registered its own contract as an authorised router**. *(Re-mapped 2026-10-11 from OAK-T9.011; see [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md).)*

**Attribution:** **pseudonymous.**

**Key teaching point:** **Uniswap V2 stores uint112 reserves so that their product fits in uint256; a fork that changes the multiplication path loses that guarantee.** Forked AMM math is only safe with its original widths and casts.

## Summary

On 2026-10-09 an attacker registered its own contract as an EtherVista router and executed two crafted swaps whose overflowing K check passed despite a falling reserve product, draining ~\$18.6K of WETH and VISTA. SlowMist flagged it at 05:20 UTC.

## Public references

- `[cryptotimesbitbayethervista2026]` — The Crypto Times, "SlowMist Flags BitBay and EtherVista Hacks as Attackers Drain \$32,600 From DeFi Vault & Pool" (2026-10-09): <https://cryptotimes.io/2026/10/09/slowmist-flags-bitbay-and-ethervista-hacks-as-attackers-drain-32600-from-defi-vault-pool>
- `[slowmistethervista2026]` — SlowMist on X, EtherVista alert: <https://x.com/SlowMist_Team/status/2108427455572918626>
