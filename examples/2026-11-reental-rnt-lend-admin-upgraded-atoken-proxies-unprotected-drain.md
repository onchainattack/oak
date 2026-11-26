# Reental RNT Lend — the pool admin key upgraded the USDT0 and USDC aToken proxies to an implementation with an unprotected drain function, and MEV bots and the keyholder emptied about \$955K of stablecoins — RNT Lend (Aave V3 white-label market) / Polygon — 2026-11-18

**Loss:** **~\$955K** in stablecoins (**\$954,703** per Bitquery's on-chain analysis), split in two. MEV bots took **\$454,825** (294,040 USDT0 and 160,785 USDC) from the two aToken reserves. The keyholder (the address holding Reental's admin key; custody unresolved, see Root-cause evidence) took **\$499,877** in USDT0 from 1,149 user wallets and four Safes and bridged it out. The first public alerts counted only the bot leg (Blockaid: "~\$454k drained from the aTokens so far across 2 txs"). Separately, property tokens priced by the pool at **\$49.34M** were taken and pulled back by Reental within about two hours with its own token-manager controls (Bitquery). Rektradar reports the stablecoin loss as unrecovered at the time of writing. Reental's own statement: undisclosed (Bitquery: "Reental had not commented publicly"; OAK found none on the operator's X account or site).

**OAK Techniques observed:** **OAK-T6.005** (Proxy-Upgrade Malicious Switching — *primary*, per Blockaid and Defimon: the pool admin called `PoolConfigurator.updateAToken` to replace the aToken implementations with a contract exposing `drain(token,to,amount)` with no access control; the upgrade itself is the extraction primitive. See [`techniques/T6.005-proxy-upgrade-malicious-switching.md`](../techniques/T6.005-proxy-upgrade-malicious-switching.md)). **OAK-T11.014** (Operator Privileged-Key Compromise — the upgrade authority was one admin key signing alone. Defimon and Rektradar call it a key compromise; Bitquery says the chain "cannot tell a stolen key from an insider". OAK takes no position on custody. See [`techniques/T11.014-operator-privileged-key-compromise.md`](../techniques/T11.014-operator-privileged-key-compromise.md)). **OAK-T16.006** (Timelock-Free Governance Execution — the admin key deployed its contracts at 11:39 and swapped the proxies at 11:41, two minutes later, with no delay visible to users or watchers. See [`techniques/T16.006-timelock-free-governance-execution.md`](../techniques/T16.006-timelock-free-governance-execution.md)). **OAK-T7.003** (Cross-Chain Bridge Laundering — \$489,777 of the keyholder's USDT0 went to the Relay bridge address and \$10,100 to the Bridgers address, traced by OAK). No Technique covers the MEV bots front-running the keyholder's own drain call; OAK treats that as a fact of the incident, not a Technique.

**Attribution:** **unattributed.** Bitquery labels two MEV-bot senders and a keyholder wallet from on-chain behaviour; no source names a person or group.

**Key teaching point:** **An upgrade key for the aToken proxies of a lending pool must sit behind a timelock and a multisig threshold, so that a swap of the implementation can be seen and vetoed before it executes.** Here one admin key replaced the implementation behind the reserves in a single transaction, and the first bots drained the reserves 20 seconds later.

## Summary

RNT Lend is Reental's lending market for tokenised real estate, built on Aave V3 code on Polygon. Each market keeps its coins in an aToken contract, so whoever controls the code behind the aToken proxy controls the coins. On 2026-11-18 at 11:41 UTC the Reental admin key swapped the code behind the USDT0 and USDC aToken proxies for an implementation that let any caller move the underlying tokens to any address. Two MEV bots saw the new code and drained both reserves within seconds, paying far higher tips than the keyholder, so the keyholder's own drain calls in the same blocks failed (Bitquery). The keyholder then took USDT0 from user wallets and Safes through a replacement program and standing token permissions, bridged it out, and swapped the code behind 89 property-token markets. Reental pulled the property tokens back and the Safe paused all pool markets. Blockaid flagged the exploit at 12:39 UTC, Defimon at 12:50 UTC, and Bitquery published the full accounting at 17:05 UTC.

## Timeline (UTC)

Stages: **Entry** (the admin key and its authority), **Preparation** (two contracts deployed), **Execution** (proxy swap and drain), **Money** (stablecoins bridged out, property tokens taken), **Response** (pull-back and pause). Times for on-chain events are from Bitquery, with the transactions marked "traced by OAK" re-read by OAK on Polygon. All times are 2026-11-18.

| When | What happened | OAK |
|---|---|---|
| Since May 2023 | The admin key had signed Reental's Safe, wallet-factory and token-manager setup. It became a MetaMask smart account on 25 September and was unused from 5 November until the first drain step (Bitquery). How the key came to act on 18 November is undisclosed. | **T11.014** |
| 11:39 | The admin key deploys two new contracts (Bitquery). | — |
| 11:40 | The key hands the pool's admin rights to one of them (Bitquery). | **T11.014** |
| 11:41:38 | The admin key sends [`0xa97dcfe2728c0d20a5833f46d0c6fe58a0cb317fb31fb1b33ce39ea97d727e93`](https://polygonscan.com/tx/0xa97dcfe2728c0d20a5833f46d0c6fe58a0cb317fb31fb1b33ce39ea97d727e93) to the forwarder `0xb67ed59e3bafa9adfe5db19632bf6106ab2e3d45` (traced by OAK). Bitquery identifies it as the code swap on the USDT0 market; Defimon says it called `PoolConfigurator.updateAToken` to install a 68-byte backdoor implementation (`0xCC555fa…`, full address not published) with an unprotected `drain(token,to,amount)`, selector `abf59fc9`, which runs `token.transfer(to,amount)` from the aToken. The USDC market is swapped the same way. | **T6.005**, T16.006 |
| 11:41:58 | An MEV bot sender `0xb0fe6e9c4ea2d567e1fb6e45ecf2c9ddb3401101` calls the new `drain` in [`0xb977d09c1cb4f74c6b33ed0c0a4f5b9536b0c48f86adda65ca072694b2e0642f`](https://polygonscan.com/tx/0xb977d09c1cb4f74c6b33ed0c0a4f5b9536b0c48f86adda65ca072694b2e0642f): 294,040.356612 USDT0 from the USDT0 aToken to `0x301789888805e1967b9db7cb48dd896fba7144b9` (traced by OAK). | **T6.005** |
| 11:42:02 | A second bot sender `0xde0a99fb39e78efd3529e31d78434f7645601163` takes 160,785.04943 USDC from the USDC aToken in [`0x60674299d2ca76176ab9041129c3c3a6ed682a478a2b1c6511628c9e222afa79`](https://polygonscan.com/tx/0x60674299d2ca76176ab9041129c3c3a6ed682a478a2b1c6511628c9e222afa79), routed through contract `0x3cb2452c615007b9ef94d5814765eb48b71ae520` back to the sender (traced by OAK). The keyholder's own calls in those blocks failed (Bitquery). | **T6.005** |
| 11:45–12:01 | The keyholder collecting wallet `0xda45c0b318784ce04a494b112b00588889006c19` receives USDT0 from user wallets and Safes: about \$499,877 across 1,164 incoming transfers in the OAK window scan, matching Bitquery's \$499,877 (\$340,083 from 1,149 user wallets in five batches, \$115,388 from two Safes through a standing token permission to a Reental contract, \$44,401 from two more Safes through a third Reental contract). The wallet forwards it to `0x9ff1a6a5f3ecf28672206ee7113a73ccc85e83b8` in two large transfers, 159,778.267668 and 340,082.294851 USDT0 (traced by OAK). At 11:58 the keyholder deploys a replacement program that obeys only the admin key (Bitquery). | **T11.014** |
| 12:05–12:37 | `0x9ff1a6a5f3ecf28672206ee7113a73ccc85e83b8` sends the USDT0 on: 10,100 to the Bridgers address `0xc1d13492285eb664951e201bf7c80c7c6318a1b5` (two transfers) and 489,777.376992 to the Relay address `0x4cd00e387622c35bddb9b4c962c136462338bc31` (six transfers, last at 12:37:26; traced by OAK). Where it went after the bridges is not traced by Bitquery or OAK. | **T7.003** |
| 12:08 | A Safe transaction signed by three of nine owners adds a further market (Bitquery). | — |
| 12:22–12:44 | The keyholder swaps code behind 89 property-token markets and, at 12:32, pulls five token types from Reental's Safe: \$20.98M from the markets and \$28.36M from the Safe, \$49.34M at the pool's own prices (Bitquery). | **T6.005** |
| 12:39 | Blockaid posts that it "detected an ongoing exploit" on Reental on Polygon, about \$454k drained so far across 2 txs. | response |
| 12:50 | Defimon Alerts posts the loss at about \$455K and the `drain` selector. | response |
| 13:12–13:23 | Reental's new Safe appears, owned by eight of the old Safe's owners (13:12). At 13:23:04 Reental pulls six property tokens back to its Safe `0x48141c561c7cbc5700ab50bd1df96f27cca72906` in [`0xab652faf57f77b4e61ec341dce0f2fed2321f275e61fe15804fd41b69b245555`](https://polygonscan.com/tx/0xab652faf57f77b4e61ec341dce0f2fed2321f275e61fe15804fd41b69b245555) (traced by OAK: six transfers). | response |
| 14:03 | Three Safe owners remove the key from the Safe that owns the pool (Bitquery). | response |
| 14:23:05 | Reental pulls all 89 pool tokens back in [`0xedf90856608bfa85f874e48b6395edceca3a2c801f6ef42f6181eaa16f35fedb`](https://polygonscan.com/tx/0xedf90856608bfa85f874e48b6395edceca3a2c801f6ef42f6181eaa16f35fedb) (traced by OAK: 89 transfers). | response |
| 16:55 | The Safe pauses all 108 pool markets, removing the key's admin rights (Bitquery). | response |
| 17:05 | Bitquery publishes its investigation: \$954,703 in stablecoins left, twice the reported loss. | — |
| 23:05 | Reental replaces the code behind the 91 changed markets (Bitquery). | response |

Key addresses:

- Reental admin key (the address that signed the upgrades) — [`0x30729b6910757042024304e56beb015821462691`](https://polygonscan.com/address/0x30729b6910757042024304e56beb015821462691)
- Forwarder the admin key called for the swap — [`0xb67ed59e3bafa9adfe5db19632bf6106ab2e3d45`](https://polygonscan.com/address/0xb67ed59e3bafa9adfe5db19632bf6106ab2e3d45)
- RNT Lend pool — [`0x67dc8037db6309dd5571d82c65f5f593f7da1505`](https://polygonscan.com/address/0x67dc8037db6309dd5571d82c65f5f593f7da1505)
- USDT0 aToken (victim) — [`0xfaf2338e041258a43c062d60296a9f8f0f8c2121`](https://polygonscan.com/address/0xfaf2338e041258a43c062d60296a9f8f0f8c2121)
- USDC aToken (victim) — [`0xd3cb693d157816dd4a9de27b62c6e723db49d880`](https://polygonscan.com/address/0xd3cb693d157816dd4a9de27b62c6e723db49d880)
- MEV bot sender, USDT0 — [`0xb0fe6e9c4ea2d567e1fb6e45ecf2c9ddb3401101`](https://polygonscan.com/address/0xb0fe6e9c4ea2d567e1fb6e45ecf2c9ddb3401101); wallet that received the USDT0 — [`0x301789888805e1967b9db7cb48dd896fba7144b9`](https://polygonscan.com/address/0x301789888805e1967b9db7cb48dd896fba7144b9)
- MEV bot sender, USDC — [`0xde0a99fb39e78efd3529e31d78434f7645601163`](https://polygonscan.com/address/0xde0a99fb39e78efd3529e31d78434f7645601163); intermediate contract — [`0x3cb2452c615007b9ef94d5814765eb48b71ae520`](https://polygonscan.com/address/0x3cb2452c615007b9ef94d5814765eb48b71ae520)
- Keyholder collecting wallet — [`0xda45c0b318784ce04a494b112b00588889006c19`](https://polygonscan.com/address/0xda45c0b318784ce04a494b112b00588889006c19)
- Keyholder wallet that paid the bridges — [`0x9ff1a6a5f3ecf28672206ee7113a73ccc85e83b8`](https://polygonscan.com/address/0x9ff1a6a5f3ecf28672206ee7113a73ccc85e83b8)
- Relay bridge address — [`0x4cd00e387622c35bddb9b4c962c136462338bc31`](https://polygonscan.com/address/0x4cd00e387622c35bddb9b4c962c136462338bc31); Bridgers address — [`0xc1d13492285eb664951e201bf7c80c7c6318a1b5`](https://polygonscan.com/address/0xc1d13492285eb664951e201bf7c80c7c6318a1b5)
- Reental Safe (2023 setup, property tokens returned here) — [`0x48141c561c7cbc5700ab50bd1df96f27cca72906`](https://polygonscan.com/address/0x48141c561c7cbc5700ab50bd1df96f27cca72906); Safe that owns the pool — [`0x414f65a595b1cb51b685c936169a3bbdf5dc07c5`](https://polygonscan.com/address/0x414f65a595b1cb51b685c936169a3bbdf5dc07c5); new Safe — [`0x38bbfc389c6e3e52ca7c66583245ae3f55f6add5`](https://polygonscan.com/address/0x38bbfc389c6e3e52ca7c66583245ae3f55f6add5)
- Reental wallet factory — [`0x11a6f1e9ac749aea790340fa3c2f6a0d4c7fa6bb`](https://polygonscan.com/address/0x11a6f1e9ac749aea790340fa3c2f6a0d4c7fa6bb); token manager — [`0x9b0f397db67907057a3b8ca73a4488438996c949`](https://polygonscan.com/address/0x9b0f397db67907057a3b8ca73a4488438996c949)
- Backdoor implementation: Defimon gives only `0xCC555fa…` (full address not published).

## Fund flow

Stablecoin legs were re-read by OAK on Polygon with `tools/explorer.py` and match Bitquery. The user-wallet and Safe collection step is relayed from Bitquery (the Safes' own addresses are not published). Not diagrammed: the \$49.34M of property tokens (taken and returned, Bitquery), and anything after the Relay and Bridgers addresses (not traced by any source). Small \$1 to \$2 test transfers between the keyholder wallets are left out.

```oak-flow
as_of: 2026-11-19T12:47Z
nodes:
  - {id: usr, chain: polygon, role: victim, label: "User wallets and Safes (addresses not published)"}
  - {id: usdt, chain: polygon, address: 0xfaf2338e041258a43c062d60296a9f8f0f8c2121, role: vulnerable-contract, label: "USDT0 aToken (RNT Lend)"}
  - {id: usdc, chain: polygon, address: 0xd3cb693d157816dd4a9de27b62c6e723db49d880, role: vulnerable-contract, label: "USDC aToken (RNT Lend)"}
  - {id: bot1, chain: polygon, address: 0x301789888805e1967b9db7cb48dd896fba7144b9, role: attacker-receiver, label: "Wallet paid by MEV bot (USDT0)"}
  - {id: mid, chain: polygon, address: 0x3cb2452c615007b9ef94d5814765eb48b71ae520, role: intermediary, label: "Contract on the USDC bot path"}
  - {id: bot2, chain: polygon, address: 0xde0a99fb39e78efd3529e31d78434f7645601163, role: attacker-receiver, label: "MEV bot sender (USDC)"}
  - {id: kh1, chain: polygon, address: 0xda45c0b318784ce04a494b112b00588889006c19, role: attacker-holding, label: "Keyholder collecting wallet"}
  - {id: kh2, chain: polygon, address: 0x9ff1a6a5f3ecf28672206ee7113a73ccc85e83b8, role: attacker-holding, label: "Keyholder bridge-paying wallet"}
  - {id: rly, chain: polygon, address: 0x4cd00e387622c35bddb9b4c962c136462338bc31, role: bridge, label: "Relay"}
  - {id: brg, chain: polygon, address: 0xc1d13492285eb664951e201bf7c80c7c6318a1b5, role: bridge, label: "Bridgers"}
edges:
  - {from: usdt, to: bot1, asset: USDT0, amount: 294040.356612, tx: 0xb977d09c1cb4f74c6b33ed0c0a4f5b9536b0c48f86adda65ca072694b2e0642f, time: 2026-11-18T11:41:58Z, technique: T6.005, verified: oak}
  - {from: usdc, to: mid, asset: USDC, amount: 160785.04943, tx: 0x60674299d2ca76176ab9041129c3c3a6ed682a478a2b1c6511628c9e222afa79, time: 2026-11-18T11:42:02Z, technique: T6.005, verified: oak}
  - {from: mid, to: bot2, asset: USDC, amount: 160785.04943, tx: 0x60674299d2ca76176ab9041129c3c3a6ed682a478a2b1c6511628c9e222afa79, time: 2026-11-18T11:42:02Z, technique: T6.005, verified: oak}
  - {from: usr, to: kh1, asset: "USDT0, about 499,877 (1,149 wallets and four Safes)", time: 2026-11-18T11:55:00Z, technique: T11.014, verified: source, source: bitquery2026}
  - {from: kh1, to: kh2, asset: USDT0, amount: 159778.267668, tx: 0x15f90c205f727ea3a8cc626be64c28a859fdb2973198a8658fcc686fe6a6e3d3, time: 2026-11-18T11:55:01Z, technique: T11.014, verified: oak}
  - {from: kh1, to: kh2, asset: USDT0, amount: 340082.294851, tx: 0x212f80f2d4b3a8fc7d31cd859e57d905132e8f5e4947afa4f3dbdf938b862819, time: 2026-11-18T12:00:46Z, technique: T11.014, verified: oak}
  - {from: kh2, to: brg, asset: USDT0, amount: 100, tx: 0xf6bc14e27eb4056836821393d084d441c2130b6cfe8e245106fe04b1b1e1e7e7, time: 2026-11-18T12:05:11Z, technique: T7.003, verified: oak}
  - {from: kh2, to: brg, asset: USDT0, amount: 10000, tx: 0xa8707f05c411e5f319e518385824f967cc3ac6af94261b134d301c5d95cb33d3, time: 2026-11-18T12:08:29Z, technique: T7.003, verified: oak}
  - {from: kh2, to: rly, asset: USDT0, amount: 50000, tx: 0xbfc35318d7cc33bfcb8d88b970b27cca226a9f03e1e964ea4689c98d250bf11f, time: 2026-11-18T12:21:08Z, technique: T7.003, verified: oak}
  - {from: kh2, to: rly, asset: USDT0, amount: 50000, tx: 0xf7e2cef90d655f91eca15dae775c3c174b23eaaa40f507fa83fa98eb11d7a903, time: 2026-11-18T12:23:52Z, technique: T7.003, verified: oak}
  - {from: kh2, to: rly, asset: USDT0, amount: 100000, tx: 0xf408144d01c8bd718df7a797540342d39aa4afb08162a480ed0c76554dbaf284, time: 2026-11-18T12:27:43Z, technique: T7.003, verified: oak}
  - {from: kh2, to: rly, asset: USDT0, amount: 100000, tx: 0x148b3a33beb32fdc4b50ad55e55da580d726d37e8a4b656e5be2b793a65c9ec6, time: 2026-11-18T12:31:20Z, technique: T7.003, verified: oak}
  - {from: kh2, to: rly, asset: USDT0, amount: 100000, tx: 0xe518c99671311d47de0c0f26a75fd799928e5da6eecacf58efb7194dbf965a39, time: 2026-11-18T12:34:14Z, technique: T7.003, verified: oak}
  - {from: kh2, to: rly, asset: USDT0, amount: 89777.376992, tx: 0x120d20c1e078e9d2a4312eda53289c5d37134d88b99d733fc9756bba2d4a278d, time: 2026-11-18T12:37:26Z, technique: T7.003, verified: oak}
```

## Root-cause evidence

- **Technique:** OAK-T6.005
- **Source:** <https://x.com/blockaid_/status/2123033403553689899>; <https://x.com/DefimonAlerts/status/2123036062108836145>; <https://bitquery.io/investigations/reental-rnt-lend-drain>; <https://x.com/Bitquery_io/status/2123100195122798895>; <https://www.rektradar.xyz/web3-daily-exploits-19-nov-2026-k3-3-4m-sbold-share-accounting/>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** The mechanism is corroborated by three independent firms. Blockaid: "An admin upgraded the USDT and USDC aToken proxies to a contract that lets anyone drain the underlying tokens". Defimon names the call (`PoolConfigurator.updateAToken`) and the unprotected `drain(token,to,amount)`. Bitquery adds the sequence, the keyholder's calls failing behind the bots, and the later wallet and Safe collection. OAK re-read the swap transaction's sender, the two bot drains and the bridge transfers on Polygon. There is no operator or government statement, so the result is not `confirmed`, and all of these sources are same-day or next-day third-party analyses. Not established: whether the admin key was stolen or used by its holder. Defimon labels it "Private Key Compromise" and Rektradar says "admin private key compromise", but Bitquery writes: "The chain cannot tell a stolen key from an insider, because both sign the same way." OAK maps T11.014 only because it covers the key as the authority, not because custody is settled. Other open points: the full address of the backdoor implementation, how the keyholder wallets map to any person, where the bridged funds went, and Defimon's claim that the admin was reached through a forwarder driven by an EIP-7702-delegated EOA (not mapped to a Technique, since no other source repeats it). Defimon gives about 160,735 USDC, Bitquery and OAK's trace give 160,785.05 USDC; OAK uses the traced figure.

## Mitigations tied to this case

- **Timelock plus multisig threshold on aToken-proxy upgrades** (OAK-M17 time-locked governance, OAK-M15 threshold signing). Put the pool-admin role behind a timelock contract on Polygon whose delay and proposer set cannot be changed by one key, and require several signers to queue an upgrade. This breaks the step where one key replaced the code behind both reserves at 11:41 and bots drained them 20 seconds later; a delay would have let a monitor see the new implementation and cancel it.
- **Alert on `updateAToken` or admin-role changes that triggers the existing pause** (OAK-M34 emergency pause, OAK-M39 watcher network). The Safe paused all 108 markets at 16:55, five hours after the first drain. An automatic pause tied to an upgrade by a non-timelock address would have kept the later wallet, Safe and property-market steps from running.
- **Remove standing token permissions to operator-controlled contracts** (OAK-M08 per-spender approval audit). Part of the keyholder's \$499,877 came from Safes through standing permissions to Reental contracts; expiring or capped permissions would have cut that leg.

## Public references

- `[blockaid2026]` — Blockaid (@blockaid_), "Blockaid detected an ongoing exploit on @Reental_co on Polygon" (2026-11-18): <https://x.com/blockaid_/status/2123033403553689899>
- `[defimon2026]` — Defimon Alerts (@DefimonAlerts), "Reental - Loss ~\$455K (2026-11-18)" (2026-11-18): <https://x.com/DefimonAlerts/status/2123036062108836145>
- `[bitquery2026]` — Bitquery, "Reental RNT Lend Drain: \$955K Gone, MEV Bots Took Half" (2026-11-18, balances read 2026-11-19): <https://bitquery.io/investigations/reental-rnt-lend-drain>
- `[bitqueryx2026]` — Bitquery (@Bitquery_io), "\$954,703 in stablecoins left Reental's lending app, twice the reported loss" (2026-11-18): <https://x.com/Bitquery_io/status/2123100195122798895>
- `[rektradar2026]` — Rektradar, "Web3 Daily Exploits — 19 Nov 2026" (RNT Lend section) (2026-11-19): <https://www.rektradar.xyz/web3-daily-exploits-19-nov-2026-k3-3-4m-sbold-share-accounting/>
