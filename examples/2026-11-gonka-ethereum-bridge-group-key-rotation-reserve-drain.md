# Gonka AI — Ethereum bridge accepted a new epoch BLS group key from an outside caller, then released stablecoin reserves and minted unbacked WGNK — Gonka <> Ethereum bridge / Ethereum — 2026-11-18

**Loss:** **~\$1.05M** per Rekt Radar's summary of Blockaid's estimate, "about 5 transactions" ([rektradargonka2026]; the Blockaid post OAK fetched carries only addresses). On-chain, traced by OAK: 884,150.874884 USDT and 647.736653 USDC released from the bridge, plus 22,000,000 unbacked WGNK minted. The attacker converted the stablecoins and 8,500,000 WGNK to ETH and sent 606.70203572 ETH on to THORChain. **Recovery:** the project posted on 2026-11-19 09:14 UTC "The funds have been fully returned." ([gonkareturn2026]). OAK could not find the return transaction (see Open questions). Net loss after the return: per the project, none; compensation of WGNK holders was left to the community to decide ([gonkaupdate2026]).

**OAK Techniques observed:** **OAK-T10.002** (Message-Verification Bypass — *primary*. The bridge's public `submitGroupKey` accepted a new epoch-462 group key from an unrelated EOA, and the same key then validated a `withdraw` and a `mintWithSignature`. The control that should have rejected the rotation is the contract's transition-signature check. See [`techniques/T10.002-message-verification-bypass.md`](../techniques/T10.002-message-verification-bypass.md)). **OAK-T7.003** (Cross-Chain Bridge Laundering — 606.7 ETH sent to the THORChain router in 11 transactions, traced by OAK). **OAK-T10.001** (Validator / Signer Key Compromise) is *not established*: no source says whether epoch 461's signing key was compromised or the transition check was flawed. See Root-cause evidence.

**Attribution:** **unattributed.** Exploiter EOA [`0x6650a1CB0c3B970a0e4CEd26984fe06DB7844D80`](https://etherscan.io/address/0x6650a1CB0c3B970a0e4CEd26984fe06DB7844D80), published by Blockaid. The project says "several promising leads have been identified" and shares no detail ([gonkaupdate2026]).

**Key teaching point:** **A bridge that lets the next signing key be rotated by a public call must prove that the previous key's holders approved exactly that key, and must bound what the new key can do on day one.** Here one transaction installed epoch 462 and the next three transactions spent the reserves and minted WGNK under it, all within 72 seconds of the rotation. A delay between a group-key change and its first use for withdrawals or mints, a per-window release cap, and an alert on any `GroupKeySubmitted` event would each have given the operator time to pause before the stablecoin reserves left.

## Summary

On 2026-11-18 at 18:00:59 UTC an EOA with no prior role called `submitGroupKey(462, <new 256-byte G2 key>, <128-byte signature>)` on the Ethereum side of the Gonka bridge. The verified source of that contract shows the function is `public`, requires the epoch to be the next in sequence and requires a BLS "transition signature" that verifies against the previous epoch's group key. The call succeeded, so the bridge's stored epoch moved from 461 to 462. Over the next 72 seconds the same EOA called `withdraw` twice (all USDT, then all USDC reserves) and `mintWithSignature` once (22,000,000 WGNK), each carrying a BLS signature that verified against the epoch-462 key. Blockaid flagged the exploit at 18:28:49 UTC and published the exploiter, an example transaction and the bridge address.

The operator wrote on 2026-11-19 00:24 UTC that the incident "did not affect Gonka's network consensus", told users not to use or trade WGNK and to pull liquidity from DEX pools, and at 09:14 UTC said funds had been fully returned. The part nobody has published is **why `submitGroupKey` accepted the call**: whether the epoch-461 signing key was compromised and used to sign the transition, or the on-chain verification accepted a signature it should have rejected. OAK has no source for either, so root cause is `reported` at best, and the mechanism below is what the chain itself shows.

## Timeline (UTC)

**Entry** is the undisclosed reason the epoch-462 key was accepted; **preparation** is the funding of the exploiter; **execution** is the key rotation, two withdrawals and one mint; **funds** are swaps and THORChain deposits traced by OAK; **response** is the operator and Blockaid posts. Transaction times are from OAK's on-chain trace.

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-18 18:00:59 (undisclosed) | The condition that let an outside caller install a new group key: epoch-461 signing key compromised, or a flaw in the transition-signature verification. No source states which. | **T10.002** (T10.001 not established) |
| 2026-11-18 12:08:23 | The exploiter is funded with 0.05 ETH from [`0x2ba3d1b5648d64f292cac81cbb0dbee18c1c25cd`](https://etherscan.io/address/0x2ba3d1b5648d64f292cac81cbb0dbee18c1c25cd) in [`0x48069fa62dab0082fa3033df2d33f9d26d46c9d1ed98c02a5d98908782002562`](https://etherscan.io/tx/0x48069fa62dab0082fa3033df2d33f9d26d46c9d1ed98c02a5d98908782002562). Funder not traced further. | — |
| 2026-11-18 18:00:59 | `submitGroupKey` with `epochId` 462 installs the attacker-supplied group key: [`0xa6b23e579b004e47657fd8f963a1f5732c5063a7d6eb7f9d7b185cd05d487178`](https://etherscan.io/tx/0xa6b23e579b004e47657fd8f963a1f5732c5063a7d6eb7f9d7b185cd05d487178) (Blockaid's example transaction). | **T10.002** |
| 2026-11-18 18:01:35 | `withdraw` (epoch 462) releases 884,150.874884 USDT to the exploiter: [`0x37ac0f3d9b8ed415fa025f04fe61a6305f3569636c5b32e226800106f8d8e492`](https://etherscan.io/tx/0x37ac0f3d9b8ed415fa025f04fe61a6305f3569636c5b32e226800106f8d8e492) | **T10.002** |
| 2026-11-18 18:01:59 | `withdraw` (epoch 462) releases 647.736653 USDC: [`0x7dcbc8fe3a5c47f1d7ca63386d1f9c1850447249701007cd8725afe166c16d58`](https://etherscan.io/tx/0x7dcbc8fe3a5c47f1d7ca63386d1f9c1850447249701007cd8725afe166c16d58) | **T10.002** |
| 2026-11-18 18:02:11 | `mintWithSignature` (epoch 462) mints 22,000,000 WGNK to the exploiter: [`0x31dd93ecd452dd0d8ca985b098bfee29fc5b16bc8256dbcc8c889f6538d0b31d`](https://etherscan.io/tx/0x31dd93ecd452dd0d8ca985b098bfee29fc5b16bc8256dbcc8c889f6538d0b31d) | **T10.002** |
| 2026-11-18 18:02:59 | 884,150.874884 USDT sold through UniswapX for 499.68257215 ETH: [`0x2f7fb4801002a3f8808aa8391e20e38efef077313353bd082e6412017d413e0d`](https://etherscan.io/tx/0x2f7fb4801002a3f8808aa8391e20e38efef077313353bd082e6412017d413e0d) | — |
| 2026-11-18 18:03:47 | 647.736653 USDC sold in a Uniswap V3 pool for 0.36618253 ETH: [`0xe12a3a3d8d9633a425ec4569e197a308da12820b4375efa693f7a472b61c27b4`](https://etherscan.io/tx/0xe12a3a3d8d9633a425ec4569e197a308da12820b4375efa693f7a472b61c27b4) | — |
| 2026-11-18 18:04:59 | 8,500,000 WGNK sold through UniswapX for 105.45504627 ETH: [`0x11d0e27f88148188bb974aa24feb818f4049165b2325e199f95bbb1e27636548`](https://etherscan.io/tx/0x11d0e27f88148188bb974aa24feb818f4049165b2325e199f95bbb1e27636548) | — |
| 2026-11-18 18:05:47 | 13,000,000 WGNK sent to the zero address (burned): [`0xb476f22eac7e8d3a4f98b11224207307d6e5a045a8c4474815aa3ff8326b36ec`](https://etherscan.io/tx/0xb476f22eac7e8d3a4f98b11224207307d6e5a045a8c4474815aa3ff8326b36ec). OAK did not establish why. | — |
| 2026-11-18 18:08:11 to 20:19:35 | 606.70203572 ETH moved to [`0xdE356F654e9B6EbCc7E3af869E5168885293434a`](https://etherscan.io/address/0xdE356F654e9B6EbCc7E3af869E5168885293434a) in three transfers of 10, 100 and 496.70203572 ETH (first: [`0x761e2b6201515f2baf0e0a6f6c01c555749d0819f6329876dd170da121eddfb4`](https://etherscan.io/tx/0x761e2b6201515f2baf0e0a6f6c01c555749d0819f6329876dd170da121eddfb4)). | — |
| 2026-11-18 18:09:23 to 2026-11-19 01:37:59 | That address sends 606.7 ETH to the THORChain router in 11 transactions (5, 10, 20, 50, 50, 50, 71, 100, 150, 100 and 0.7 ETH; first: [`0xb48d33c376168aaa1c52c055e836a00372a2d738720dc28c997c0c5a75544b50`](https://etherscan.io/tx/0xb48d33c376168aaa1c52c055e836a00372a2d738720dc28c997c0c5a75544b50)). Destination chain and address are not visible on Ethereum. | T7.003 |
| 2026-11-18 18:28:49 | Blockaid reports the exploit and publishes the exploiter, example transaction and bridge ([blockaidgonka2026]). | response |
| 2026-11-19 00:24:07 | Gonka says consensus was not affected, an investigation is ongoing with "several promising leads", users should not use or trade WGNK and should withdraw DEX liquidity ([gonkaupdate2026]). | response |
| 2026-11-19 09:14:24 | Gonka: "The funds have been fully returned." ([gonkareturn2026]). Return transaction and chain: undisclosed. | response |

Key addresses:

- Exploiter EOA — [`0x6650a1CB0c3B970a0e4CEd26984fe06DB7844D80`](https://etherscan.io/address/0x6650a1CB0c3B970a0e4CEd26984fe06DB7844D80)
- Vulnerable contract (Gonka bridge, `BridgeContract`, also the WGNK token) — [`0x972a7A92D92796a98801A8818bcF91f1648f2F68`](https://etherscan.io/address/0x972a7A92D92796a98801A8818bcF91f1648f2F68)
- Exploiter funder (0.05 ETH) — [`0x2ba3d1b5648d64f292cac81cbb0dbee18c1c25cd`](https://etherscan.io/address/0x2ba3d1b5648d64f292cac81cbb0dbee18c1c25cd)
- ETH holder before THORChain — [`0xdE356F654e9B6EbCc7E3af869E5168885293434a`](https://etherscan.io/address/0xdE356F654e9B6EbCc7E3af869E5168885293434a)
- THORChain router — [`0xd37bbe5744d730a1d98d8dc97c42f0ca46ad7146`](https://etherscan.io/address/0xd37bbe5744d730a1d98d8dc97c42f0ca46ad7146)
- UniswapX V2 Dutch Order Reactor — [`0x00000011f84b9aa48e5f8aa8b9897600006289be`](https://etherscan.io/address/0x00000011f84b9aa48e5f8aa8b9897600006289be)
- WGNK buyer (UniswapX fill, 8,500,000 WGNK) — [`0x6fd41c212afff4a24e5e4b561eb79456f4212786`](https://etherscan.io/address/0x6fd41c212afff4a24e5e4b561eb79456f4212786)

Watch-out: the bridge and exploiter addresses are flooded with zero-value and fake-token transfers from lookalike senders (address poisoning); check full addresses. Only the transactions above moved real value.

## Fund flow

Ethereum leg traced by OAK with `tools/explorer.py` (Blockscout, keyless) on 2026-11-26. The THORChain edge ends at the router; the destination chain is not visible from Ethereum. The project's return of funds on 2026-11-19 is not shown because OAK found no on-chain return transaction.

```oak-flow
as_of: 2026-11-26T12:00Z
nodes:
  - {id: vic, chain: ethereum, address: 0x972a7a92d92796a98801a8818bcf91f1648f2f68, role: vulnerable-contract, label: "Gonka bridge / WGNK (Ethereum)"}
  - {id: atk, chain: ethereum, address: 0x6650a1cb0c3b970a0e4ced26984fe06db7844d80, role: attacker-eoa, label: "Exploiter EOA"}
  - {id: fund, chain: ethereum, address: 0x2ba3d1b5648d64f292cac81cbb0dbee18c1c25cd, role: unknown, label: "Exploiter funder"}
  - {id: rct, chain: ethereum, address: 0x00000011f84b9aa48e5f8aa8b9897600006289be, role: dex, label: "UniswapX V2 reactor"}
  - {id: hold, chain: ethereum, address: 0xde356f654e9b6ebcc7e3af869e5168885293434a, role: attacker-holding, label: "ETH holder"}
  - {id: thor, chain: ethereum, address: 0xd37bbe5744d730a1d98d8dc97c42f0ca46ad7146, role: bridge, label: "THORChain router"}
edges:
  - {from: fund, to: atk, asset: ETH, amount: 0.05, tx: 0x48069fa62dab0082fa3033df2d33f9d26d46c9d1ed98c02a5d98908782002562, time: 2026-11-18T12:08:23Z, verified: oak}
  - {from: vic, to: atk, asset: USDT, amount: 884150.874884, tx: 0x37ac0f3d9b8ed415fa025f04fe61a6305f3569636c5b32e226800106f8d8e492, time: 2026-11-18T18:01:35Z, technique: T10.002, verified: oak}
  - {from: vic, to: atk, asset: USDC, amount: 647.736653, tx: 0x7dcbc8fe3a5c47f1d7ca63386d1f9c1850447249701007cd8725afe166c16d58, time: 2026-11-18T18:01:59Z, technique: T10.002, verified: oak}
  - {from: atk, to: rct, asset: USDT, amount: 884150.874884, tx: 0x2f7fb4801002a3f8808aa8391e20e38efef077313353bd082e6412017d413e0d, time: 2026-11-18T18:02:59Z, verified: oak}
  - {from: rct, to: atk, asset: ETH, amount: 499.68257215, tx: 0x2f7fb4801002a3f8808aa8391e20e38efef077313353bd082e6412017d413e0d, time: 2026-11-18T18:02:59Z, verified: oak}
  - {from: rct, to: atk, asset: ETH, amount: 105.45504627, tx: 0x11d0e27f88148188bb974aa24feb818f4049165b2325e199f95bbb1e27636548, time: 2026-11-18T18:04:59Z, verified: oak}
  - {from: atk, to: hold, asset: ETH, amount: 606.70203572, tx: 0x761e2b6201515f2baf0e0a6f6c01c555749d0819f6329876dd170da121eddfb4, time: 2026-11-18T18:08:11Z, tx_count: 3, time_last: 2026-11-18T20:19:35Z, verified: oak}
  - {from: hold, to: thor, asset: ETH, amount: 606.7, tx: 0xb48d33c376168aaa1c52c055e836a00372a2d738720dc28c997c0c5a75544b50, time: 2026-11-18T18:09:23Z, tx_count: 11, time_last: 2026-11-19T01:37:59Z, technique: T7.003, verified: oak}
```

## Root-cause evidence

- **Technique:** OAK-T10.002
- **Source:** <https://x.com/blockaid_/status/2123121262079664399>; <https://x.com/gonka_ai/status/2123210678211318257>; <https://www.rektradar.xyz/web3-daily-exploits-19-nov-2026-k3-3-4m-sbold-share-accounting/>; OAK read of the verified `BridgeContract` source at [`0x972a7A92D92796a98801A8818bcF91f1648f2F68`](https://etherscan.io/address/0x972a7A92D92796a98801A8818bcF91f1648f2F68)
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** Rekt Radar's summary of Blockaid's alert says the attacker rotated the epoch BLS group key, drained the remaining stablecoin reserves and minted unbacked WGNK; the Blockaid post OAK fetched lists the exploiter, an example transaction and the bridge only. OAK's trace agrees: the example transaction is a `submitGroupKey` call with `epochId` 462 from the exploiter EOA, and the later `withdraw` and `mintWithSignature` calls use `epochId` 462. The verified source shows `submitGroupKey` is `public` and relies on `_verifyTransitionSignature` against the previous epoch's key. **Not established:** why that check passed (epoch-461 signing key compromised, or a verification flaw such as missing validity checks on the supplied points). Gonka says only that investigation details "cannot be shared yet" and consensus was unaffected. No post-mortem found, so this is not `confirmed`, and T10.001 is not ruled out.

## Public references

- `[blockaidgonka2026]` — Blockaid, exploiter, example tx and bridge (2026-11-18 18:28 UTC): <https://x.com/blockaid_/status/2123121262079664399>
- `[gonkaupdate2026]` — Gonka AI, incident update (2026-11-19 00:24 UTC): <https://x.com/gonka_ai/status/2123210678211318257>
- `[gonkareturn2026]` — Gonka AI, "The funds have been fully returned." (2026-11-19 09:14 UTC): <https://x.com/gonka_ai/status/2123344126276149308>
- `[rektradargonka2026]` — Rekt Radar, "Web3 Daily Exploits, 19 Nov 2026": <https://www.rektradar.xyz/web3-daily-exploits-19-nov-2026-k3-3-4m-sbold-share-accounting/>
