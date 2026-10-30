# Argent-style smart wallets — a settable recovery period wrapped the deadline into the past, and a signed payload could be replayed in one transaction — unnamed smart-wallet system / Ethereum — 2026-10-19

**Loss:** **~\$59.8K** (SlowMist).

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting-State Invariant Flaw — *primary*. Two flaws per SlowMist. (1) The recovery module's unrestricted setter `0x254a2e49` accepted a recovery period that made the computed deadline **overflow to a past timestamp**, so a guardian-signed recovery finalised in the same transaction and changed the wallet owner. (2) The execution module did not reject reuse of an identical signed `0xaacaaf88` payload; it ran 19 times in one transaction and nine in the other, and the attacker traded the repeats around a thin MARK/WETH pool. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). Preparation and cash-out: **OAK-T7.001** (Tornado Cash funding of the attacker EOA, and 10 ETH deposited back into Tornado Cash after the theft; traced by OAK).

**Attribution:** **pseudonymous** ([`0xc10609ce5c032db92e562e463b1234aab0872b02`](https://etherscan.io/address/0xc10609ce5c032db92e562e463b1234aab0872b02)).

**Key teaching point:** **Security delays and nonces are invariants, not parameters.** A recovery delay anyone can set, and a signature without single-use enforcement, each remove the one property the module exists for.

## Summary

SlowMist flagged two Ethereum transactions on 2026-10-19 against wallets [`0xe545b9a69bff1bf0ed2e922551dda4afc8ee8f66`](https://etherscan.io/address/0xe545b9a69bff1bf0ed2e922551dda4afc8ee8f66) and [`0x5a79e5772493cf4329682d202aa2d28f85a85440`](https://etherscan.io/address/0x5a79e5772493cf4329682d202aa2d28f85a85440).

## Timeline (UTC)

Read it as three stages. **Get in**: two missing invariants in the wallet modules. **Prepare**: not published. **Take**: two Ethereum transactions. Times are from SlowMist's alert.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-19 (undisclosed) | The recovery module's setter `0x254a2e49` has no access restriction, and a crafted recovery period makes the computed deadline wrap to a timestamp in the past. Separately, the execution module does not reject reuse of an identical signed `0xaacaaf88` payload. Since when is not published. | **T9.016** |
| 2026-10-19 09:31:23 (traced by OAK) | The attacker address receives 0.09761 ETH from the Tornado Cash 0.1 ETH pool (tx [`0x6871f0e18429be8a40b5cc4d358b140ca987bee61ab00d6f652ccb59df631f63`](https://etherscan.io/tx/0x6871f0e18429be8a40b5cc4d358b140ca987bee61ab00d6f652ccb59df631f63)). Any rehearsal is not published. | T7.001 |
| 2026-10-19 (time undisclosed) | A guardian-signed recovery is finalised in the same transaction it is started, because the deadline is already in the past, and the wallet owner is changed. | **T9.016** |
| 2026-10-19 09:42:35 and 09:43:35 (traced by OAK) | The identical signed payload is executed 19 times in one transaction and nine times in the other. The repeats are used to trade around a low-liquidity MARK/WETH pool. Transactions: [`0xbfed8d33561ed5f9cbd0f4e62a5bbd20187a64f3e22180148dcb58ed6ebaa795`](https://etherscan.io/tx/0xbfed8d33561ed5f9cbd0f4e62a5bbd20187a64f3e22180148dcb58ed6ebaa795) and [`0xa0ee8f914205a948c79eca039b7d8265537eb220472c9be1455d3321f1bd571b`](https://etherscan.io/tx/0xa0ee8f914205a948c79eca039b7d8265537eb220472c9be1455d3321f1bd571b). SlowMist does not say which transaction did which. OAK: the first (`0xbfed…`, 09:42:35) is the 19-run against `0xe545…`; the second (`0xa0ee…`, 09:43:35) is the nine-run against `0x5a79…`. | **T9.016** |
| 2026-10-19 09:44:35 to 09:48:59 (traced by OAK) | The attack contract sends 50,655.918487 USDC to the attacker EOA, which swaps all of it for 20.59733776 ETH. | — |
| 2026-10-20 08:56 to 09:03 (traced by OAK) | The attacker EOA sends 1 ETH and 19.68 ETH to a fresh wallet `0xfba873b1e5d0256301b87ce74f79a30d6781364a`. | — |
| 2026-10-20 11:17 to 2026-10-21 03:42 (traced by OAK) | That wallet forwards 5.05 ETH and 5.02 ETH to two intermediaries, which deposit 5 ETH each into Tornado Cash. The rest is not followed in the window. | T7.001 |
| 2026-10-19 12:21:40 | SlowMist publishes its alert. | response |
| after 2026-10-19 (undisclosed) | No operator or wallet-vendor statement appears in the cited sources. The affected system is not named. | response |

Key addresses:

- Attacker EOA — [`0xc10609ce5c032db92e562e463b1234aab0872b02`](https://etherscan.io/address/0xc10609ce5c032db92e562e463b1234aab0872b02)
- Attack contract (traced by OAK) — [`0x3c5884377cca79ff221936aea4a5df43293fb310`](https://etherscan.io/address/0x3c5884377cca79ff221936aea4a5df43293fb310), the target of both transactions
- Cash-out wallet (traced by OAK) — [`0xfba873b1e5d0256301b87ce74f79a30d6781364a`](https://etherscan.io/address/0xfba873b1e5d0256301b87ce74f79a30d6781364a)
- Victim wallet — [`0xe545b9a69bff1bf0ed2e922551dda4afc8ee8f66`](https://etherscan.io/address/0xe545b9a69bff1bf0ed2e922551dda4afc8ee8f66)
- Victim wallet — [`0x5a79e5772493cf4329682d202aa2d28f85a85440`](https://etherscan.io/address/0x5a79e5772493cf4329682d202aa2d28f85a85440)
- Vulnerable contract — [`0xf490557d67d934440677a4f16793d5ef319b8ef5`](https://etherscan.io/address/0xf490557d67d934440677a4f16793d5ef319b8ef5)
- Vulnerable contract — [`0x4e50adfc953551286bbd7fee2b2b846d1d227394`](https://etherscan.io/address/0x4e50adfc953551286bbd7fee2b2b846d1d227394)
- Transactions — [`0xbfed8d33561ed5f9cbd0f4e62a5bbd20187a64f3e22180148dcb58ed6ebaa795`](https://etherscan.io/tx/0xbfed8d33561ed5f9cbd0f4e62a5bbd20187a64f3e22180148dcb58ed6ebaa795); [`0xa0ee8f914205a948c79eca039b7d8265537eb220472c9be1455d3321f1bd571b`](https://etherscan.io/tx/0xa0ee8f914205a948c79eca039b7d8265537eb220472c9be1455d3321f1bd571b)

## Fund flow

Ethereum only, traced by OAK with `tools/explorer.py` (Blockscout, keyless) on 2026-10-30, window 2026-10-19 to 2026-10-24. Edges marked *traced by OAK* were checked on-chain. Transfers of unsolicited tokens (PVC, ETHG, AICC) into the attacker EOA were ignored. The cash-out wallet `0xfba873b1e5d0256301b87ce74f79a30d6781364a` has lookalikes (`0xfba815132f70bbb66f617f7d1d03fc873ce3364a`, `0xfba84344097f5e072448cb2788917177ec71364a`, `0xfba8a5ae55fec1f2bbd199b88cda82484f26364a`) that sent the attacker EOA dust of 0 to 0.000001 ETH on 2026-10-20 within minutes of the real transfers. These are address poisoning, not attacker wallets, and no edge follows them.

```oak-flow
as_of: 2026-10-30T14:10Z
nodes:
  - {id: tc, chain: ethereum, address: 0x12d66f87a04a9e220743712ce6d9bb1b5616b8fc, role: mixer, label: "Tornado Cash 0.1 ETH pool"}
  - {id: eoa, chain: ethereum, address: 0xc10609ce5c032db92e562e463b1234aab0872b02, role: attacker-eoa, label: "Attacker EOA"}
  - {id: atk, chain: ethereum, address: 0x3c5884377cca79ff221936aea4a5df43293fb310, role: attack-contract, label: "Attack contract"}
  - {id: v1, chain: ethereum, address: 0xe545b9a69bff1bf0ed2e922551dda4afc8ee8f66, role: victim, label: "Victim wallet 1"}
  - {id: v2, chain: ethereum, address: 0x5a79e5772493cf4329682d202aa2d28f85a85440, role: victim, label: "Victim wallet 2"}
  - {id: mp, chain: ethereum, address: 0x6f23d2fedb4ff4f1e9f8c521f66e5f2a1451b6f3, role: dex, label: "MARK/WETH pool"}
  - {id: up, chain: ethereum, address: 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc, role: dex, label: "USDC/WETH pool"}
  - {id: fb, chain: ethereum, address: 0xfba873b1e5d0256301b87ce74f79a30d6781364a, role: attacker-holding, label: "Cash-out wallet"}
  - {id: m1, chain: ethereum, address: 0x0d9ed4bbb6efeda5471cae1aa5f4bbe0e8f12f40, role: intermediary, label: "Mixer feeder 1"}
  - {id: m2, chain: ethereum, address: 0xa382be41d349404bcf3c0abff767651f9332567c, role: intermediary, label: "Mixer feeder 2"}
  - {id: tcr, chain: ethereum, address: 0xd90e2f925da726b50c4ed8d0fb90ad053324f31b, role: mixer, label: "Tornado Cash router"}
edges:
  - {from: tc, to: eoa, asset: ETH, amount: 0.09761, tx: 0x6871f0e18429be8a40b5cc4d358b140ca987bee61ab00d6f652ccb59df631f63, time: 2026-10-19T09:31:23Z, technique: T7.001, verified: oak}
  - {from: v1, to: mp, asset: "ETH (19 replayed executions, wrapped via the Uniswap v2 router)", amount: 20.17636929, tx: 0xbfed8d33561ed5f9cbd0f4e62a5bbd20187a64f3e22180148dcb58ed6ebaa795, time: 2026-10-19T09:42:35Z, tx_count: 19, technique: T9.016, verified: oak}
  - {from: v2, to: up, asset: USDC, amount: 9000, tx: 0xa0ee8f914205a948c79eca039b7d8265537eb220472c9be1455d3321f1bd571b, time: 2026-10-19T09:43:35Z, tx_count: 9, technique: T9.016, verified: oak}
  - {from: atk, to: up, asset: WETH, amount: 20.94729521, tx: 0xbfed8d33561ed5f9cbd0f4e62a5bbd20187a64f3e22180148dcb58ed6ebaa795, time: 2026-10-19T09:42:35Z, tx_count: 2, time_last: 2026-10-19T09:43:35Z, technique: T9.016, verified: oak}
  - {from: up, to: atk, asset: USDC, amount: 50655.918487, tx: 0xbfed8d33561ed5f9cbd0f4e62a5bbd20187a64f3e22180148dcb58ed6ebaa795, time: 2026-10-19T09:42:35Z, tx_count: 2, time_last: 2026-10-19T09:43:35Z, technique: T9.016, verified: oak}
  - {from: atk, to: eoa, asset: USDC, amount: 50655.918487, tx: 0xc041e86d96df91df94bb585506865139fe17bebd8473d840cff2e7c4808a2756, time: 2026-10-19T09:44:35Z, verified: oak}
  - {from: eoa, to: up, asset: USDC, amount: 50655.918487, tx: 0xc220bb3c307f7317f4fa12e67220c77bc767db64a61587ebdebdbb442e00f0ce, time: 2026-10-19T09:48:59Z, verified: oak}
  - {from: eoa, to: fb, asset: ETH, amount: 20.68, tx: 0xce8fb63bd9145b205f172243a485e535de627f0810a274d1ff6d3c0a7cc6946a, time: 2026-10-20T08:56:23Z, tx_count: 2, time_last: 2026-10-20T09:03:11Z, verified: oak}
  - {from: fb, to: m1, asset: ETH, amount: 5.05, tx: 0x1d7d1d4e7fd61938f1a908292888bd4d2b4ba570cc8713de95633ed00ab7bdc1, time: 2026-10-20T11:17:23Z, verified: oak}
  - {from: m1, to: tcr, asset: ETH, amount: 5, tx: 0x1ba62ed4886fd6b8feae723f66597b4f3940af914b1168bc93ef43de026bdb1b, time: 2026-10-20T11:19:11Z, tx_count: 5, time_last: 2026-10-20T11:46:35Z, technique: T7.001, verified: oak}
  - {from: fb, to: m2, asset: ETH, amount: 5.02, tx: 0xf51f6fc17b49cbbe4da96130e3878875d737316595a38bd5f78c16e55596136b, time: 2026-10-21T00:07:11Z, verified: oak}
  - {from: m2, to: tcr, asset: ETH, amount: 5, tx: 0xd4f21e2702dd976d277083e6e265a63313a0575367f711890d85c73a89d33b52, time: 2026-10-21T00:08:23Z, tx_count: 5, time_last: 2026-10-21T03:42:59Z, technique: T7.001, verified: oak}
```

What the trace adds beyond the sources:

- **Which transaction did what.** SlowMist does not say. The first (`0xbfed…`, 2026-10-19 09:42:35) replayed the payload 19 times against `0xe545…` (19 ETH-for-MARK buys of 1.06190891 ETH each). The second (`0xa0ee…`, 09:43:35) ran it nine times against `0x5a79…` (nine 1,000 USDC payments into the pool). Both were sent by the attacker EOA to one attack contract, `0x3c5884377cca79ff221936aea4a5df43293fb310`. The Blockscout internal-transfer list shows 13 of the 19 ETH legs of the first transaction; the 19 count comes from the WETH mint logs.
- **Where the money was made.** The replays pushed the victims' funds into the thin MARK/WETH pool as buys. The attack contract, holding borrowed WETH from Balancer (0.5 and 2 WETH, repaid in the same transactions), sold MARK back to the pool and then sold 20.94729521 WETH for 50,655.918487 USDC in the USDC/WETH pool. Each refund leg also sent 0.02562135 ETH (first victim) or 45.039706 USDC (second victim) to `0xd33814c56fdacdc7f084a5443d600ee5464452e7` per execution. Who controls that address is not known.
- **Cash-out.** All 50,655.918487 USDC went to the attacker EOA at 09:44:35, and 4 minutes later the EOA sold it for 20.59733776 ETH. On 2026-10-20 it sent 20.68 ETH to a fresh wallet, which sent 10.07 ETH on to two feeder wallets; those put 5 ETH each (ten deposits) into Tornado Cash within hours.
- **Funding.** The attacker EOA was funded 12 minutes before the first transaction by a 0.1 ETH Tornado Cash withdrawal.

Limits and open points:

- **Figures.** The realised USDC (about 50.7K) is below SlowMist's about \$59.8K. The gap (MARK still held, or different pricing) is not explained and no dollar figure here is OAK's own.
- **Cash-out wallet is commingled.** It also received ETH from at least four other addresses (3.848, 3, 0.49989026 and four roughly 5 ETH transfers on 2026-10-20 and 2026-10-21), so the 5.05 and 5.02 ETH it forwarded cannot be attributed to this theft alone. Its later activity (to `0x5bfe8fe93006f4c0b502e4b412d501f9dcb9c1e0` on 2026-10-25, to `0x19491ecc33d410f451eb65b654cb6ee877a3f1fa` on 2026-10-27, and on 2026-10-30) is outside the window and not followed; it held 13.45521712 ETH on 2026-10-30.
- **Unsolicited tokens** into the attacker EOA (PVC, ETHG, AICC) look like spam and were not traced.
- Pools are unlabelled in the tool; roles come from the transfer pattern, not from a label.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2112157232624476254>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist's trace analysis of the recovery and execution modules.

## Public references

- `[slowmistargentstyle2026]` — SlowMist TI alert (2026-10-19): <https://x.com/SlowMist_Team/status/2112157232624476254>
