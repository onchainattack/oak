# Arcus — a bug in transfers between a user's own subaccounts let one new account record a balance far larger than it held, then withdraw 2,234,391 USDG — Arcus Labs / Arcus exchange (Robinhood Chain per Arcus FAQ; withdrawal chain undisclosed) — 2026-11-09

**Loss:** **\$2,234,391** (2,234,391 USDG), per the operator: "\$2,234,391 USDG was withdrawn on-chain before withdrawals were stopped." A further **\$3M** of requested withdrawals "was held by the bridge's on-chain rate limit, never paid out, and later reversed." The operator states: "The temporary shortfall has been fully covered by Arcus Labs from the company's treasury." No other user balances, positions or orders were affected (operator).

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary, with a fit caveat*). The operator says the exchange mishandled transfers between a user's own subaccounts and, "under specific conditions," recorded "a balance far larger than it actually held." The caller was entitled to the transfer; the bookkeeping, not an access check, was wrong, and the inflated balance was then withdrawn through the bridge. This is the same shape as OAK's Cypher 2023 case (sub-account accounting), see [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md). **Caveat:** T9.016 is defined for contract logic; Arcus calls the failing component "the exchange", and the report does not say whether the flawed ledger is on-chain or in an off-chain engine. OAK has no Technique for an off-chain exchange-ledger flaw; filed under T9.016 by mechanism (invariant: recorded balance ≤ held balance) pending a taxonomy decision. **OAK-T7.003** (Cross-Chain Bridge Laundering) and **OAK-T7.007** (DEX Aggregator Routing Laundering) describe only the on-chain hops traced by OAK (Relay inbound and THORChain; CoW Protocol swap), not a source statement. **OAK-M11** (rate limit) is a mitigation that worked here, not a Technique.

**Attribution:** **unattributed.** Arcus names only "the initial address of the exploiter": [`0xeFbf442599310E5CeE1A4EDd5c66334c5f30b3dd`](https://etherscan.io/address/0xeFbf442599310E5CeE1A4EDd5c66334c5f30b3dd). It says it is "working with blockchain investigators and will coordinate with law enforcement as appropriate."

**Key teaching point:** **A withdrawal must be checked against assets actually held, not against the ledger's own balance field.** The only control that bounded this loss was the bridge's on-chain withdrawal rate limit: it held back \$3M and capped the payout at \$2.23M.

## Summary

On 2026-11-09 at around 22:07 ET (03:07 UTC on 11-10), a newly created account used a bug in how Arcus handled transfers between a user's own subaccounts to record a balance far larger than it held, and requested withdrawals against it. Arcus's monitoring flagged the withdrawals at 22:15 ET; platform-wide withdrawals were paused at 23:07 ET and the fix was deployed at 23:37 ET. Arcus published its incident report on 2026-11-10. SlowMist's hacked-incident list records the same facts, classed as "Accounting Bug", and adds nothing independent.

## Timeline (UTC)

**Flaw**, **Take**, **Money**, **Response**. Arcus gives all times "in ET from 11/09 to 11/10" without saying EST or EDT. OAK converts at UTC−5 (US daylight saving ended 2026-11-01, so 11-09 is EST). The report gives no transaction hashes for the Arcus-side events; rows below are Arcus's wording unless marked "traced by OAK".

| When (UTC) | What happened | OAK |
|---|---|---|
| Before 2026-11-10 03:07 (undisclosed) | Flaw in how the exchange handled transfers between a user's own subaccounts; since when it existed is undisclosed. | **T9.016** |
| 2026-11-10 03:07 (11-09 ~22:07 ET) | "A newly created account exploited a bug" in those transfers; "under specific conditions" it recorded "a balance far larger than it actually held" and requested withdrawals against it. | **T9.016** |
| 2026-11-10 03:10 (22:10 ET) | "The bridge's withdrawal rate limit automatically capped payouts and held back \$3M of further requests." Withdrawn on-chain before the stop: 2,234,391 USDG. | **response** (rate limit) |
| 2026-11-10 03:15 (22:15 ET) | "Monitoring flagged the withdrawals and the team began investigating." Same minute, traced by OAK: the exploiter's initial address on Ethereum first receives ETH, [47.12227876 ETH from `0xf70da97812cb96acdf810712aa562db8dfa3dbef`](https://etherscan.io/tx/0x0d7ca983ccdf2a70733401429a6cf9d4c18ffaaa6591af2730ddc2937c62349e) (03:15:59). Then 922.09779836 ETH from the RelayRouter contract in three transfers (03:18 to 03:55), e.g. [`0xeee44e3ac0140a485eac9c5decc08c9b572f17a6489d5060bd4e1da968333d60`](https://etherscan.io/tx/0xeee44e3ac0140a485eac9c5decc08c9b572f17a6489d5060bd4e1da968333d60). Total ETH received 03:15 to 03:59: 1,052.21268853. That this ETH is the USDG proceeds is OAK's inference from timing; the source chain of the Relay transfers was not resolved. | — |
| 2026-11-10 04:07 (23:07 ET) | "Platform-wide withdrawals were paused and the status page was updated." | response |
| 2026-11-10 04:37 (23:37 ET) | "The bug fix was deployed." | response |
| 2026-11-10 04:43 (23:43 ET) | "The exploiter's addresses were blocked from trading, transferring, and withdrawing." | response |
| 2026-11-10 05:34 to 06:20 | Traced by OAK: the address wraps 485.35329511 ETH to WETH in 13 transactions and sends 475.90173127 WETH to CoW Protocol's settlement contract in 11 transactions (first [`0x64f1d899b5adf51d4d7c7e55d1a90cc13512db95b33fc8f0d3310456231986f9`](https://etherscan.io/tx/0x64f1d899b5adf51d4d7c7e55d1a90cc13512db95b33fc8f0d3310456231986f9)); it receives 1,008,945.40782694 DAI back. | T7.007 |
| 2026-11-10 07:43 to 12:09 | Traced by OAK: 52.50606734 ETH to the THORChain router in two `depositWithExpiry` calls (first [`0x700862fe820db2534644fd19e457de6fdebd60a95bd292aa3dbe1d71301e2984`](https://etherscan.io/tx/0x700862fe820db2534644fd19e457de6fdebd60a95bd292aa3dbe1d71301e2984)). | T7.003 |
| 2026-11-10 12:20 | Traced by OAK: 47.79181168 ETH sent to an unlabelled address, [`0xa91fe480c2062afb18df55ac6adfa0104633a3e2`](https://etherscan.io/tx/0x28145735a74e62b5e7480735391185f6f0b1625194bbbf6a5f82f38a96929349); a lookalike-address pattern (zero-value and fake-token transfers to similar-looking addresses) follows on this address, so later outflows are not traced. | — |
| 2026-11-10 09:26 (4:26 ET) | "Platform-wide withdrawals were re-enabled." | response |
| 2026-11-10 10:02 (5:02 ET) | "Pending withdrawals from the exploiter were reversed." | response |
| 2026-11-10 13:18 to 15:29 | Traced by OAK: 1,008,945.41892694 DAI sent in 15 transfers to an unlabelled EOA, [`0x9a30f6a596f3354ecb90d6bd3a2a16750dcf13d0`](https://etherscan.io/tx/0x119ec146add9a9a14f999e983da89070d1aea5df50c23c3c97f05e3e07067bd2). | — |
| 2026-11-10 17:28 (12:28 ET) | "The shortfall was covered from the Arcus Labs company treasury." | response |

Key addresses:

- Exploiter initial address (named by Arcus) — [`0xeFbf442599310E5CeE1A4EDd5c66334c5f30b3dd`](https://etherscan.io/address/0xeFbf442599310E5CeE1A4EDd5c66334c5f30b3dd)
- ETH source, first funding (unlabelled) — [`0xf70da97812cb96acdf810712aa562db8dfa3dbef`](https://etherscan.io/address/0xf70da97812cb96acdf810712aa562db8dfa3dbef)
- RelayRouter (ETH source) — [`0x0729e2a4716d9f7dd17858d5d504426d228697f7`](https://etherscan.io/address/0x0729e2a4716d9f7dd17858d5d504426d228697f7)
- CoW Protocol settlement (swap) — [`0x9008d19f58aabd9ed0d60971565aa8510560ab41`](https://etherscan.io/address/0x9008d19f58aabd9ed0d60971565aa8510560ab41)
- THORChain router — [`0xd37bbe5744d730a1d98d8dc97c42f0ca46ad7146`](https://etherscan.io/address/0xd37bbe5744d730a1d98d8dc97c42f0ca46ad7146)
- DAI holding EOA — [`0x9a30f6a596f3354ecb90d6bd3a2a16750dcf13d0`](https://etherscan.io/address/0x9a30f6a596f3354ecb90d6bd3a2a16750dcf13d0)
- Unlabelled ETH recipient — [`0xa91fe480c2062afb18df55ac6adfa0104633a3e2`](https://etherscan.io/address/0xa91fe480c2062afb18df55ac6adfa0104633a3e2)

Not found: the Arcus-side withdrawal transactions in USDG, the bridge contract address and the chain it runs on. Arcus's page names no chain or hash, and OAK has no Robinhood Chain explorer configured. The address's later activity (from 2026-11-12) is mostly address-poisoning noise and is not treated as exploiter movement.

## Fund flow

```oak-flow
as_of: 2026-11-17T14:45Z
nodes:
  - {id: relay, chain: ethereum, address: 0x0729e2a4716d9f7dd17858d5d504426d228697f7, role: bridge, label: "RelayRouter"}
  - {id: src, chain: ethereum, address: 0xf70da97812cb96acdf810712aa562db8dfa3dbef, role: unknown, label: "Unlabelled ETH source"}
  - {id: atk, chain: ethereum, address: 0xefbf442599310e5cee1a4edd5c66334c5f30b3dd, role: attacker-eoa, label: "Exploiter initial address (Arcus)"}
  - {id: cow, chain: ethereum, address: 0x9008d19f58aabd9ed0d60971565aa8510560ab41, role: dex, label: "CoW Protocol settlement"}
  - {id: thor, chain: ethereum, address: 0xd37bbe5744d730a1d98d8dc97c42f0ca46ad7146, role: bridge, label: "THORChain router"}
  - {id: dai, chain: ethereum, address: 0x9a30f6a596f3354ecb90d6bd3a2a16750dcf13d0, role: attacker-holding, label: "DAI holding EOA"}
  - {id: eth2, chain: ethereum, address: 0xa91fe480c2062afb18df55ac6adfa0104633a3e2, role: unknown, label: "Unlabelled ETH recipient"}
edges:
  - {from: relay, to: atk, asset: ETH, amount: 469.56950905, tx: 0xeee44e3ac0140a485eac9c5decc08c9b572f17a6489d5060bd4e1da968333d60, time: 2026-11-10T03:18:35Z, technique: T7.003, verified: oak}
  - {from: relay, to: atk, asset: ETH, amount: 424.87079229, tx: 0x6496eac08e4bf885cdb73eed6928c8982f2ba3976edda0bbce1ecc357348cf10, time: 2026-11-10T03:26:23Z, technique: T7.003, verified: oak}
  - {from: relay, to: atk, asset: ETH, amount: 27.65749702, tx: 0x9bf0e75e7beff0cbc3e2fe6b62418c759f2c555d176487b136ffdb60864c40d8, time: 2026-11-10T03:55:47Z, technique: T7.003, verified: oak}
  - {from: src, to: atk, asset: ETH, amount: 130.11489017, tx: 0x0d7ca983ccdf2a70733401429a6cf9d4c18ffaaa6591af2730ddc2937c62349e, time: 2026-11-10T03:15:59Z, tx_count: 4, time_last: 2026-11-10T03:59:23Z, verified: oak}
  - {from: atk, to: cow, asset: WETH, amount: 475.90173127, tx: 0x64f1d899b5adf51d4d7c7e55d1a90cc13512db95b33fc8f0d3310456231986f9, time: 2026-11-10T05:41:23Z, tx_count: 11, time_last: 2026-11-10T06:20:11Z, technique: T7.007, verified: oak}
  - {from: cow, to: atk, asset: DAI, amount: 1008945.40782694, tx: 0x64f1d899b5adf51d4d7c7e55d1a90cc13512db95b33fc8f0d3310456231986f9, time: 2026-11-10T05:41:23Z, tx_count: 11, time_last: 2026-11-10T06:20:11Z, technique: T7.007, verified: oak}
  - {from: atk, to: thor, asset: ETH, amount: 52.50606734, tx: 0x700862fe820db2534644fd19e457de6fdebd60a95bd292aa3dbe1d71301e2984, time: 2026-11-10T07:43:23Z, tx_count: 2, time_last: 2026-11-10T12:09:59Z, technique: T7.003, verified: oak}
  - {from: atk, to: eth2, asset: ETH, amount: 47.79181168, tx: 0x28145735a74e62b5e7480735391185f6f0b1625194bbbf6a5f82f38a96929349, time: 2026-11-10T12:20:35Z, verified: oak}
  - {from: atk, to: dai, asset: DAI, amount: 1008945.41892694, tx: 0x119ec146add9a9a14f999e983da89070d1aea5df50c23c3c97f05e3e07067bd2, time: 2026-11-10T13:18:59Z, tx_count: 15, time_last: 2026-11-10T15:29:11Z, verified: oak}
```

The flow starts at the exploiter's Ethereum address because that is the only on-chain anchor Arcus published. The USDG withdrawal itself and the hop that turned USDG into the ETH received here are not shown (chain and transactions undisclosed).

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://arcus.xyz/blog/arcus-incident-report-november-9-2026>; <https://hacked.slowmist.io/>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** Confirmed at the level the operator discloses. Arcus: "a newly created account exploited a bug in how the exchange handled transfers between a user's own subaccounts"; "Under specific conditions, the bug let the account record a balance far larger than it actually held"; "The incident only involved a single account; no other accounts were affected"; the fix "was reviewed by our security partners, along with related checks across the codebase." Not disclosed: the exact conditions, whether the ledger is on-chain or off-chain, the withdrawal chain and transactions, and the bridge address. SlowMist's list repeats the operator's account ("Accounting Bug") and is not independent.

## Public references

- `[arcus2026]` — Arcus, "Arcus Incident Report: November 9, 2026" (2026-11-10): <https://arcus.xyz/blog/arcus-incident-report-november-9-2026>
- `[slowmist2026]` — SlowMist Hacked, entry dated 2026-11-09, "Accounting Bug", \$2,234,391: <https://hacked.slowmist.io/>
- `[arcusfaq]` — Arcus site FAQ ("a decentralized exchange built in partnership with Robinhood on Robinhood Chain"): <https://arcus.xyz>
