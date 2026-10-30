# Yapeswap — a governance contract with zero quorum passed a near-zero-vote proposal that handed over the factory's admin role — Yapeswap / Ethereum — 2026-10-25

**Loss:** **~\$21.9K** (SlowMist).

**OAK Techniques observed:** **OAK-T9.003** (Governance Attack — *primary*. WorkersUnion had **zero quorum**, so a proposal backed by ~0.000055% of voting power transferred YapeFactory's `feeToSetter` role to the attacker. The attacker installed a Registry whose `latestVault()` returned fake vaults while `vaults()` still listed the real ones; YapePair counted deposits diverted to the fake vaults as farming assets without receiving redeemable shares. See [`techniques/T9.003-governance-attack.md`](../techniques/T9.003-governance-attack.md)).

**Attribution:** **pseudonymous** ([`0x6e523866424220b3cb2cab88ba2195cfa5636b12`](https://etherscan.io/address/0x6e523866424220b3cb2cab88ba2195cfa5636b12)).

**Key teaching point:** **Quorum zero means any holder is the DAO.** Abandoned or quiet governance contracts keep their powers; a minimum quorum and timelock cost nothing to keep.

## Summary

SlowMist flagged the exploit on 2026-10-25.

## Timeline (UTC)

Read it as three stages. **Get in**: a governance contract with zero quorum. **Prepare**: not published. **Take**: a proposal, then a fake vault registry. Times are from SlowMist's alert.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-25 (undisclosed) | WorkersUnion, Yapeswap's governance contract, has zero quorum, so any proposal that gets a vote passes. Since when is not published. | **T9.003** |
| 2026-10-25 (preparation undisclosed) | Funding of the attacker address is not published. | — |
| 2026-10-25 (time undisclosed) | A proposal backed by about 0.000055% of voting power passes and transfers YapeFactory's `feeToSetter` role to the attacker. | **T9.003** |
| same sequence | The attacker installs a Registry (contract [`0x327bf6dfc38a79393f78866c705193c39b04be01`](https://etherscan.io/address/0x327bf6dfc38a79393f78866c705193c39b04be01)) whose `latestVault()` returns fake vaults while `vaults()` still lists the real ones. | **T9.003** |
| same sequence | YapePair counts deposits diverted to the fake vaults as farming assets without receiving redeemable shares. Total loss about \$21.9K. SlowMist's listed transaction: [`0x4c741568cc12b23b382db409b0a38a4cfb6c708904f0c2ce7bad2e4fa7179e1e`](https://etherscan.io/tx/0x4c741568cc12b23b382db409b0a38a4cfb6c708904f0c2ce7bad2e4fa7179e1e). | **T9.003** |
| 2026-10-25 02:20:47 (traced by OAK) | A second transaction ([`0x0eeaa8fd0c80d03b394bac2778fc39a183b5a20d46f5224640396bf59738f80b`](https://etherscan.io/tx/0x0eeaa8fd0c80d03b394bac2778fc39a183b5a20d46f5224640396bf59738f80b)) swaps the stolen stablecoins and WBTC into WETH on four Uniswap V3 pools and sends 10.51596134 ETH to the attacker EOA. | **T9.003** |
| 2026-10-29 03:07 to 03:11 (traced by OAK) | The EOA deposits 10.5 ETH into the Tornado Cash router in six transactions, first [`0xa945d9c90a2961b1ba4cb0c2f7351f84b235d7d9de7881a24c5d117715116401`](https://etherscan.io/tx/0xa945d9c90a2961b1ba4cb0c2f7351f84b235d7d9de7881a24c5d117715116401). | — |
| 2026-10-25 09:36:49 | SlowMist publishes its alert. | response |
| after 2026-10-25 (undisclosed) | No Yapeswap statement, pause or fix appears in the cited sources. | response |

Key addresses:

- Attacker EOA — [`0x6e523866424220b3cb2cab88ba2195cfa5636b12`](https://etherscan.io/address/0x6e523866424220b3cb2cab88ba2195cfa5636b12)
- Attacker contract (Registry) — [`0x327bf6dfc38a79393f78866c705193c39b04be01`](https://etherscan.io/address/0x327bf6dfc38a79393f78866c705193c39b04be01)
- Vulnerable YapeFactory / YapePair / YapeWrapper — [`0x46adc1c052fafd590f56c42e379d7d16622835a2`](https://etherscan.io/address/0x46adc1c052fafd590f56c42e379d7d16622835a2)
- Victim YapePair contracts (full addresses traced by OAK; SlowMist published them shortened):
  - [`0x23c1653e9e13eefe2e1b5954bfef00a2db0483b6`](https://etherscan.io/address/0x23c1653e9e13eefe2e1b5954bfef00a2db0483b6)
  - [`0x670120d4833633466c7db4b515c53fa8c5b33b97`](https://etherscan.io/address/0x670120d4833633466c7db4b515c53fa8c5b33b97)
  - [`0x8e5b9d85c8bbd309f571dba0c82ddacaca897805`](https://etherscan.io/address/0x8e5b9d85c8bbd309f571dba0c82ddacaca897805)
  - [`0xe3b43be5ab96629493f948229efbee2c0787ed25`](https://etherscan.io/address/0xe3b43be5ab96629493f948229efbee2c0787ed25)
  - [`0xec5ed926ed8cfe13dae06ed5649d0c497f2216b6`](https://etherscan.io/address/0xec5ed926ed8cfe13dae06ed5649d0c497f2216b6)
  - [`0x0415af9f90a1f774edc426047d945b474417c0aa`](https://etherscan.io/address/0x0415af9f90a1f774edc426047d945b474417c0aa)
- Gas funder of the attacker EOA (traced by OAK): [`0x003106dedde4f109568df40bf41d28afc9664282`](https://etherscan.io/address/0x003106dedde4f109568df40bf41d28afc9664282)
- Exploit transaction — [`0x4c741568cc12b23b382db409b0a38a4cfb6c708904f0c2ce7bad2e4fa7179e1e`](https://etherscan.io/tx/0x4c741568cc12b23b382db409b0a38a4cfb6c708904f0c2ce7bad2e4fa7179e1e)

## Fund flow

Ethereum only, traced by OAK with `tools/explorer.py` and the Blockscout API on 2026-10-30, covering 2026-10-25 to 2026-10-30. Every edge was checked on-chain. Counterfeit receipt tokens in the exploit transaction (`ysUSDS`, `yvUSDS-1`, `ysDAI`, `yvDAI-1`) are flagged `trusted: false` and were ignored.

```oak-flow
as_of: 2026-10-30T14:10Z
nodes:
  - {id: eoa, chain: ethereum, address: 0x6e523866424220b3cb2cab88ba2195cfa5636b12, role: attacker-eoa, label: "Attacker EOA"}
  - {id: reg, chain: ethereum, address: 0x327bf6dfc38a79393f78866c705193c39b04be01, role: attack-contract, label: "Fake Registry contract"}
  - {id: p1, chain: ethereum, address: 0x23c1653e9e13eefe2e1b5954bfef00a2db0483b6, role: victim, label: "YapePair (DAI, USDC)"}
  - {id: p2, chain: ethereum, address: 0x670120d4833633466c7db4b515c53fa8c5b33b97, role: victim, label: "YapePair (WETH)"}
  - {id: p3, chain: ethereum, address: 0x8e5b9d85c8bbd309f571dba0c82ddacaca897805, role: victim, label: "YapePair (USDC, WETH)"}
  - {id: p4, chain: ethereum, address: 0xe3b43be5ab96629493f948229efbee2c0787ed25, role: victim, label: "YapePair (USDT, WETH)"}
  - {id: p5, chain: ethereum, address: 0xec5ed926ed8cfe13dae06ed5649d0c497f2216b6, role: victim, label: "YapePair (DAI, WETH)"}
  - {id: p6, chain: ethereum, address: 0x0415af9f90a1f774edc426047d945b474417c0aa, role: victim, label: "YapePair (WBTC, WETH)"}
  - {id: fund, chain: ethereum, address: 0x003106dedde4f109568df40bf41d28afc9664282, role: unknown, label: "Gas funder (0.009975 ETH)"}
  - {id: dex, chain: ethereum, role: dex, label: "4 Uniswap V3 pools (WBTC, USDT, DAI, USDC)"}
  - {id: tc, chain: ethereum, address: 0xd90e2f925da726b50c4ed8d0fb90ad053324f31b, role: mixer, label: "Tornado Cash router"}
edges:
  - {from: fund, to: eoa, asset: ETH, amount: 0.009975, tx: 0xdf424023a83b98b598986b1a94ff9fe2635566cf094658e8032bf7e5198877d4, time: 2026-10-13T13:23:59Z, verified: oak}
  - {from: p1, to: reg, asset: "DAI, USDC", tx: 0x4c741568cc12b23b382db409b0a38a4cfb6c708904f0c2ce7bad2e4fa7179e1e, time: 2026-10-25T02:19:23Z, technique: T9.003, verified: oak}
  - {from: p2, to: reg, asset: "WETH", tx: 0x4c741568cc12b23b382db409b0a38a4cfb6c708904f0c2ce7bad2e4fa7179e1e, time: 2026-10-25T02:19:23Z, technique: T9.003, verified: oak}
  - {from: p3, to: reg, asset: "USDC, WETH", tx: 0x4c741568cc12b23b382db409b0a38a4cfb6c708904f0c2ce7bad2e4fa7179e1e, time: 2026-10-25T02:19:23Z, technique: T9.003, verified: oak}
  - {from: p4, to: reg, asset: "USDT, WETH", tx: 0x4c741568cc12b23b382db409b0a38a4cfb6c708904f0c2ce7bad2e4fa7179e1e, time: 2026-10-25T02:19:23Z, technique: T9.003, verified: oak}
  - {from: p5, to: reg, asset: "DAI, WETH", tx: 0x4c741568cc12b23b382db409b0a38a4cfb6c708904f0c2ce7bad2e4fa7179e1e, time: 2026-10-25T02:19:23Z, technique: T9.003, verified: oak}
  - {from: p6, to: reg, asset: "WBTC, WETH", tx: 0x4c741568cc12b23b382db409b0a38a4cfb6c708904f0c2ce7bad2e4fa7179e1e, time: 2026-10-25T02:19:23Z, technique: T9.003, verified: oak}
  - {from: reg, to: dex, asset: "USDT, USDC, DAI, WBTC (swapped to WETH)", tx: 0x0eeaa8fd0c80d03b394bac2778fc39a183b5a20d46f5224640396bf59738f80b, time: 2026-10-25T02:20:47Z, tx_count: 4, technique: T9.003, verified: oak}
  - {from: reg, to: eoa, asset: ETH, amount: 10.51596134, tx: 0x0eeaa8fd0c80d03b394bac2778fc39a183b5a20d46f5224640396bf59738f80b, time: 2026-10-25T02:20:47Z, technique: T9.003, verified: oak}
  - {from: eoa, to: tc, asset: ETH, amount: 10.5, tx: 0xa945d9c90a2961b1ba4cb0c2f7351f84b235d7d9de7881a24c5d117715116401, time: 2026-10-29T03:07:35Z, tx_count: 6, time_last: 2026-10-29T03:11:11Z, verified: oak}
```

What the trace adds beyond the sources:

- **Full victim pair addresses.** The six YapePair contracts SlowMist published shortened are, in order: `0x23c1653e9e13eefe2e1b5954bfef00a2db0483b6`, `0x670120d4833633466c7db4b515c53fa8c5b33b97`, `0x8e5b9d85c8bbd309f571dba0c82ddacaca897805`, `0xe3b43be5ab96629493f948229efbee2c0787ed25`, `0xec5ed926ed8cfe13dae06ed5649d0c497f2216b6` and `0x0415af9f90a1f774edc426047d945b474417c0aa`.
- **What left the pairs.** In the exploit transaction (2026-10-25 02:19:23 UTC) the pairs sent the Registry contract: 1,021.27 DAI and 1,150.31 USDC (first pair), 0.0060 WETH (second), 457.10 USDC and 0.1932 WETH (third), 7,705.31 USDT and 3.2722 WETH (fourth), 591.98 DAI and 0.2488 WETH (fifth), 0.01409 WBTC and 0.4848 WETH (sixth). The amounts include a few dust transfers. OAK does not convert these to USD; the \$21.9K figure is SlowMist's.
- **Cash-out 84 seconds later.** In a second transaction (02:20:47) the Registry swapped 8,386.28 USDT, 2,286.17 USDC, 1,691.85 DAI and 0.0316 WBTC into WETH on four Uniswap V3 pools, unwrapped **10.51596134 WETH** and sent it as ETH to the attacker EOA.
- **Mixer deposit.** On 2026-10-29 between 03:07 and 03:11 UTC (about four days after the exploit) the EOA deposited **10.5 ETH** into the Tornado Cash router in six transactions (one of 10 ETH, five of 0.1 ETH). That is the whole of the ETH. Withdrawal-side tracing out of Tornado Cash is not attempted.
- **Funding.** The EOA's only inbound transfer before the exploit was 0.009975 ETH from the unlabelled `0x003106dedde4f109568df40bf41d28afc9664282` on 2026-10-13. Where that address got its ETH was not traced. The EOA also received 543.98 YAPE from the pair `0x670120d4833633466c7db4b515c53fa8c5b33b97` on 2026-10-16 (a flagged, unpriced token, ignored).
- **Limits.** No other chain was checked. The governance proposal itself was not located.

## Root-cause evidence

- **Technique:** OAK-T9.003
- **Source:** <https://x.com/SlowMist_Team/status/2114290073546219799>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist's trace analysis of the proposal, role transfer and Registry swap.

## Public references

- `[slowmistyape2026]` — SlowMist TI alert (2026-10-25): <https://x.com/SlowMist_Team/status/2114290073546219799>
- `[etherscanyape2026]` — exploit transaction: <https://etherscan.io/tx/0x4c741568cc12b23b382db409b0a38a4cfb6c708904f0c2ce7bad2e4fa7179e1e>
