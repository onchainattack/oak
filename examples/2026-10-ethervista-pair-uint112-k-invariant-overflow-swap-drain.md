# EtherVista — the K check multiplied uint112 reserves and overflowed, so a smaller product passed as a larger one — EtherVista / EVM — 2026-10-09

**Loss:** **~\$18.6K** in WETH and VISTA.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary, arithmetic overflow*. **`EtherVistaPair.swap()`** checked the constant-product invariant on reserves stored as **uint112** in a way that could **wrap**, letting a post-swap product that had actually fallen pass the check. Two crafted swaps drained the pool. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). **OAK-T9.004** — the attacker first **registered its own contract as an authorised router**.

**Re-mapped 2026-10-11:** primary Technique moved from T9.011 to [`T9.016-contract-accounting-state-invariant-flaw`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md).

**Attribution:** **pseudonymous.**

**Key teaching point:** **Uniswap V2 stores uint112 reserves so that their product fits in uint256; a fork that changes the multiplication path loses that guarantee.** Forked AMM math is only safe with its original widths and casts.

## Summary

On 2026-10-09 an attacker registered its own contract as an EtherVista router and executed two crafted swaps whose overflowing K check passed despite a falling reserve product, draining ~\$18.6K of WETH and VISTA. SlowMist flagged it at 05:20 UTC.

## Timeline (UTC)

Only the SlowMist alert time is public; the exploit transaction time is not stated in the cited sources.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-09 (undisclosed) | The pair contract ([`0xfdd05552f1377aa488afed744c8024358af02041`](https://etherscan.io/address/0xfdd05552f1377aa488afed744c8024358af02041)) checks its K-invariant by multiplying uint112 reserves in a way that overflows and wraps, so the check can pass when the real reserve product has fallen. Since when is not stated. | **T9.016** |
| 2026-10-09 (before the drain, time undisclosed) | The attacker ([`0xbbf8f3fe8e4fdf6b594e6107144d78293d2018fa`](https://etherscan.io/address/0xbbf8f3fe8e4fdf6b594e6107144d78293d2018fa)) registers its own contract ([`0x469424b628a9d2036e41496e814db500d683b120`](https://etherscan.io/address/0x469424b628a9d2036e41496e814db500d683b120)) as an authorised router. Funding and rehearsal are not published. | **T9.004** |
| 2026-10-09 (time undisclosed) | Two crafted swaps through that router, shown in [`0xb2c7332d9e1be6a86d9d37083aa4cc0d94b60eb95cc9b29494555a3c09764930`](https://etherscan.io/tx/0xb2c7332d9e1be6a86d9d37083aa4cc0d94b60eb95cc9b29494555a3c09764930), pass the overflowing check and drain WETH and VISTA (~\$18.6K). | **T9.016** |
| after the drain | Where the proceeds went is not stated in the cited sources (undisclosed). | — |
| 2026-10-09 05:20 | SlowMist publishes an alert naming the overflow root cause. No project statement, pause or refund appears in the cited sources. | response |

Key addresses:

- Attacker — [`0xbbf8f3fe8e4fdf6b594e6107144d78293d2018fa`](https://etherscan.io/address/0xbbf8f3fe8e4fdf6b594e6107144d78293d2018fa)
- Attack contract (registered router) — [`0x469424b628a9d2036e41496e814db500d683b120`](https://etherscan.io/address/0x469424b628a9d2036e41496e814db500d683b120)
- Vulnerable pair contract — [`0xfdd05552f1377aa488afed744c8024358af02041`](https://etherscan.io/address/0xfdd05552f1377aa488afed744c8024358af02041)

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2108427455572918626>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist: EtherVistaPair.swap()'s K-invariant check on uint112 reserves could overflow and pass a falling reserve product; the attacker registered its own router first.

## Public references

- `[cryptotimesbitbayethervista2026]` — The Crypto Times, "SlowMist Flags BitBay and EtherVista Hacks as Attackers Drain \$32,600 From DeFi Vault & Pool" (2026-10-09): <https://cryptotimes.io/2026/10/09/slowmist-flags-bitbay-and-ethervista-hacks-as-attackers-drain-32600-from-defi-vault-pool>
- `[slowmistethervista2026]` — SlowMist on X, EtherVista alert: <https://x.com/SlowMist_Team/status/2108427455572918626>
