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
| 2026-10-09 03:47:59 (block time, traced by OAK) | Two crafted swaps through that router, shown in [`0xb2c7332d9e1be6a86d9d37083aa4cc0d94b60eb95cc9b29494555a3c09764930`](https://etherscan.io/tx/0xb2c7332d9e1be6a86d9d37083aa4cc0d94b60eb95cc9b29494555a3c09764930), pass the overflowing check and drain WETH and VISTA (~\$18.6K). | **T9.016** |
| 2026-10-09 03:55 to 05:43 | Traced by OAK: the attacker burns 43,930.08065685 VISTA to `0x…dEaD`, unwraps the WETH, swaps 7.46802069 ETH for 18,590.71646 USDC through the Uniswap Universal Router, and forwards 11,000 USDC in three transfers to an older, unlabelled wallet (see Fund flow). | — |
| 2026-10-09 05:20 | SlowMist publishes an alert naming the overflow root cause. No project statement, pause or refund appears in the cited sources. | response |

Key addresses:

- Attacker — [`0xbbf8f3fe8e4fdf6b594e6107144d78293d2018fa`](https://etherscan.io/address/0xbbf8f3fe8e4fdf6b594e6107144d78293d2018fa)
- Attack contract (registered router) — [`0x469424b628a9d2036e41496e814db500d683b120`](https://etherscan.io/address/0x469424b628a9d2036e41496e814db500d683b120)
- Vulnerable pair contract — [`0xfdd05552f1377aa488afed744c8024358af02041`](https://etherscan.io/address/0xfdd05552f1377aa488afed744c8024358af02041)
- Gas funder of the attacker (unlabelled, pre-existing wallet) — [`0x963737c550e70ffe4d59464542a28604edb2ef9a`](https://etherscan.io/address/0x963737c550e70ffe4d59464542a28604edb2ef9a), traced by OAK
- USDC recipient (unlabelled, active since 2026-04) — [`0x043c8f2df89612f9da2d91a92d30d3295cf842d3`](https://etherscan.io/address/0x043c8f2df89612f9da2d91a92d30d3295cf842d3), traced by OAK

## Fund flow

Ethereum leg, traced by OAK with `tools/explorer.py` (Blockscout, keyless) on 2026-10-30, looking at the five days after the exploit. Edges marked *traced by OAK* were checked on-chain. The attacker wallet received many zero-value or unverified token transfers, some from lookalike addresses, which the tool skipped (76 `skipped_unverified_token_transfers`). Several of them imitate the real USDC recipient `0x043c8f2df89612f9da2d91a92d30d3295cf842d3`: `0x043ca157660b3110bb0e70c6d35475bfe86d42d3`, `0x043ce2ae037a033a1b0285d9f4fdb523c27a42d3`, `0x043c1f594e8498abd25dc0612783abcb9fa642d3` and `0x043cb00638fac40015d97f08afaf52105d8842d3` all share its first six and last four characters. OAK followed only the address the attacker actually paid USDC to (`0x043c8f2d…`, written in full above).

```oak-flow
as_of: 2026-10-30T14:40Z
nodes:
  - {id: fund, chain: ethereum, address: 0x963737c550e70ffe4d59464542a28604edb2ef9a, role: unknown, label: "Gas funder (unlabelled)"}
  - {id: eoa, chain: ethereum, address: 0xbbf8f3fe8e4fdf6b594e6107144d78293d2018fa, role: attacker-eoa, label: "Attacker"}
  - {id: atk, chain: ethereum, address: 0x469424b628a9d2036e41496e814db500d683b120, role: attack-contract, label: "Attack contract (registered router)"}
  - {id: pair, chain: ethereum, address: 0xfdd05552f1377aa488afed744c8024358af02041, role: vulnerable-contract, label: "EtherVista pair"}
  - {id: burn, chain: ethereum, address: 0x000000000000000000000000000000000000dead, role: burn, label: "0x...dEaD burn address"}
  - {id: ur, chain: ethereum, address: 0x23617e59a5925b2a4bf75d73ff6711cd0b29de85, role: dex, label: "Uniswap Universal Router (ETH to USDC)"}
  - {id: rcv, chain: ethereum, address: 0x043c8f2df89612f9da2d91a92d30d3295cf842d3, role: unknown, label: "USDC recipient (unlabelled)"}
edges:
  - {from: fund, to: eoa, asset: ETH, amount: 0.04644843, tx: 0xbbe324f8dd2ba2b91d428ab76704b74ea697771f136aa1778c98b68226a8f3ad, time: 2026-10-09T03:37:59Z, verified: oak}
  - {from: pair, to: atk, asset: WETH, amount: 21.36557848, tx: 0xb2c7332d9e1be6a86d9d37083aa4cc0d94b60eb95cc9b29494555a3c09764930, time: 2026-10-09T03:47:59Z, technique: T9.016, verified: oak}
  - {from: atk, to: pair, asset: WETH, amount: 13.88762601, tx: 0xb2c7332d9e1be6a86d9d37083aa4cc0d94b60eb95cc9b29494555a3c09764930, time: 2026-10-09T03:47:59Z, tx_count: 2, technique: T9.016, verified: oak}
  - {from: atk, to: eoa, asset: WETH, amount: 7.47795247, tx: 0xb2c7332d9e1be6a86d9d37083aa4cc0d94b60eb95cc9b29494555a3c09764930, time: 2026-10-09T03:47:59Z, technique: T9.016, verified: oak}
  - {from: pair, to: eoa, asset: VISTA, amount: 43855.90219628, tx: 0xb2c7332d9e1be6a86d9d37083aa4cc0d94b60eb95cc9b29494555a3c09764930, time: 2026-10-09T03:47:59Z, technique: T9.016, verified: oak}
  - {from: eoa, to: burn, asset: VISTA, amount: 43930.08065685, tx: 0x9be0e1c315cc2298597758a98bd12c8f25a7ee50037897644401a7d6f5638db4, time: 2026-10-09T03:55:47Z, verified: oak}
  - {from: eoa, to: ur, asset: ETH, amount: 7.46802069, tx: 0xbf33cf4c991ca5527182406fcae5c502e5942f4959a6d0d7c47ecb61833b4ba1, time: 2026-10-09T04:41:59Z, tx_count: 3, time_last: 2026-10-09T04:44:11Z, verified: oak}
  - {from: ur, to: eoa, asset: USDC, amount: 18590.71646, tx: 0xbf33cf4c991ca5527182406fcae5c502e5942f4959a6d0d7c47ecb61833b4ba1, time: 2026-10-09T04:41:59Z, tx_count: 3, time_last: 2026-10-09T04:44:11Z, verified: oak}
  - {from: eoa, to: rcv, asset: USDC, amount: 11000, tx: 0x00104388309a3d311f4e96a27f4400e563a9b083da92b8e46a2aba0be3379317, time: 2026-10-09T05:36:47Z, tx_count: 3, time_last: 2026-10-09T05:43:47Z, verified: oak}
```

What the trace adds beyond the sources:

- **Exploit time and size.** The exploit transaction ran at 2026-10-09 03:47:59 UTC, about 1.5 hours before the SlowMist alert. The attack contract took 21.36557848 WETH from the pair, paid 13.88762601 WETH back, and the attacker EOA ended with 7.47795247 WETH and 43,855.90219628 VISTA.
- **Funding.** The attacker was funded with 0.04644843 ETH from an older unlabelled wallet (`0x963737c550e70ffe4d59464542a28604edb2ef9a`, holding about 111 ETH on 2026-10-30) six minutes before the first test swap.
- **Rehearsal.** Between 03:43 and 03:54 UTC the attacker made six small buys and sells through the EtherVista router (`0x9bd63c5d44ff28390df1eaafd4eb4bd73e94a72a`), about 0.04 ETH in total, before the drain.
- **The VISTA was burned, not sold.** The attacker sent 43,930.08065685 VISTA to `0x000000000000000000000000000000000000dead` at 03:55:47 UTC, a little more than the drain yielded because of the small buys.
- **The WETH was cashed out.** It was unwrapped to ETH (six `withdraw` calls, 7.477 WETH in total), and 7.46802069 ETH was swapped for 18,590.71646 USDC in three Universal Router transactions between 04:41 and 04:44 UTC. This USDC figure matches the ~\$18.6K loss in the sources; the burned VISTA is not part of it.
- **Onward.** 11,000 USDC was sent in three transfers (1,000, 5,000, 5,000) to `0x043c8f2df89612f9da2d91a92d30d3295cf842d3`, a wallet that already had activity from April 2026 and showed no outgoing transfers in the window; the remaining ~7,590 USDC stayed in the attacker EOA through the end of the window (balance check only, not a full ledger).
- **Limits.** The `0x043c8f2d…` wallet is unlabelled; OAK does not attribute it. Tokens PVC and ETHG that appeared in the attacker wallet were unsolicited and ignored. The router registration transaction was not traced.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2108427455572918626>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist: EtherVistaPair.swap()'s K-invariant check on uint112 reserves could overflow and pass a falling reserve product; the attacker registered its own router first.

## Public references

- `[cryptotimesbitbayethervista2026]` — The Crypto Times, "SlowMist Flags BitBay and EtherVista Hacks as Attackers Drain \$32,600 From DeFi Vault & Pool" (2026-10-09): <https://cryptotimes.io/2026/10/09/slowmist-flags-bitbay-and-ethervista-hacks-as-attackers-drain-32600-from-defi-vault-pool>
- `[slowmistethervista2026]` — SlowMist on X, EtherVista alert: <https://x.com/SlowMist_Team/status/2108427455572918626>
