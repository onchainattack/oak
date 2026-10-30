# Initia — a MoveVM script-caching bug let one transaction credit the attacker with unbacked tokens, and the bridges paid out real assets for them — Initia L1 / Ethereum — 2026-10-23

**Loss:** **~\$2.7M** per Initia: 105 WETH and ~1.4M AUSD0 bridged out via LayerZero and ~1.08M USDC via Noble/CCTP, swapped to 1,135.52 ETH held at [`0x358ef0130f7a5aa516dcd81bdc80b18cde41cac8`](https://etherscan.io/address/0x358ef0130f7a5aa516dcd81bdc80b18cde41cac8). *Traced by OAK:* from 2026-10-27 that wallet sent everything on, and 920 ETH entered Tornado Cash by 2026-10-28 (see Fund flow). The L1 and all rollups were halted at 15:41 UTC.

**OAK Techniques observed:** **OAK-T9.014** (Protocol-Client Consensus Bug — *primary, operator-stated*. Initia: "an attacker exploited a bug in Initia MoveVM's script caching that allowed malicious code to bypass security checks", spoofing MoveVM state to credit unbacked WETH, iUSD and USDC "without changing the corresponding token's total supply". No INIT was minted. See [`techniques/T9.014-protocol-client-consensus-bug.md`](../techniques/T9.014-protocol-client-consensus-bug.md)). **OAK-T7.001** (Mixer-Routed Hop — preparation was funded from Tornado Cash, per D2 Finance). **OAK-T7.003** (Cross-Chain Bridge Laundering — the unbacked balances were bridged out through LayerZero adapters and Circle CCTP and swapped to ETH within minutes). The cash-out ran through bridges working as designed: per D2 Finance, LayerZero DVNs attested burns that really happened, and an OFT adapter cannot tell whether burned tokens were ever backed.

**Attribution:** **pseudonymous;** prep funded from Tornado Cash ~6.5 h before (D2 Finance).

**Key teaching point:** **A chain's bridge lockboxes underwrite its VM.** As with [Liquid](2026-09-liquid-network-rangeproof-cache-unbacked-lbtc-pegout.md) in September, a mint bug on the source side was paid at par on Ethereum within minutes; the deepest exit liquidity was the bridge. Per-route rate limits are the control that bounds it.

## Summary

At 14:59 UTC on 2026-10-23 one signed transaction produced the unbacked balances; ~\$2.65M was back on Ethereum within 7 m 21 s. Initia promised a patch, audit and post-mortem.

## Timeline (UTC)

Read it as three stages. **Get in**: a MoveVM caching bug. **Prepare**: Tornado funding and test transfers. **Take**: unbacked balances created on Initia, then bridged out at par. Times are from D2 Finance's decoding unless marked.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-23 (undisclosed) | A bug in Initia MoveVM's script caching lets malicious code bypass security checks (Initia). Since when is not published. | **T9.014** |
| 2026-10-23 08:27 | 0.0979 ETH from Tornado Cash's 0.1 ETH pool funds the attacker's preparation (traced by OAK). | T7.001 (funding) |
| 2026-10-23 from 13:14 | Dust sends through Axelar's `AxelarHandler`. | — |
| 2026-10-23 14:37 | A 0.006 ETH deposit into the same ETH adapter the attacker empties 29 minutes later. | — |
| 2026-10-23 14:59:26 | One signed transaction, the attacker's own key calling one Move function (135,888 gas), credits unbacked WETH, iUSD and USDC and 2,000,000 AUSD (D2's figure) without changing token total supply (Initia). No INIT is minted. | **T9.014** |
| 153 s later | A valid LayerZero message releases 1.4M real AUSD from the Ethereum adapter. LayerZero DVNs attest burns that really happened, and the adapter cannot tell whether burned tokens were backed. | **T7.003** |
| within 7 m 21 s of the mint | Three exits into one Ethereum address: 1.4M AUSD (71% of the adapter's balance), 105 ETH from the native-ETH adapter (96%), and 1.08M USDC minted via Circle CCTP. About \$2.65M is back on Ethereum. | **T7.003** |
| within about 3 minutes of landing | Every stablecoin is swapped to ETH via 1inch and 0x (AUSD in 84 seconds). All 1,135.52 ETH (about \$2.73M) ends in a fresh wallet. | — |
| 2026-10-23 15:41:30 | Initia halts the L1 and all rollups. The halt is announced at 16:00 UTC. | response |
| 2026-10-24 08:46 | Initia says funds sit unmoved in the wallet below, a patch and audit are expected in a few days, recovery is under way with security partners, and a full post-mortem will follow. Funds not moved as of this statement. | response |
| 2026-10-27 13:06 to 2026-10-28 15:46 | The holding wallet sends all 1,135.52 ETH on: 400 ETH to one split wallet and 735.52 ETH to another. 920 ETH goes into Tornado Cash through the router, and about 215 ETH is peeled into ten wallets and on to collectors (traced by OAK). | **T7.001** |

Key addresses:

- Holding wallet for 1,135.52 ETH (Ethereum) — [`0x358ef0130f7a5aa516dcd81bdc80b18cde41cac8`](https://etherscan.io/address/0x358ef0130f7a5aa516dcd81bdc80b18cde41cac8). Traced by OAK: received the ETH on 2026-10-23 15:41:35 and sent all of it on from 2026-10-27 (see Fund flow).
- Address receiving the three bridge exits — [`0xdd922c841d85e12dac2dc2eef5a5e29cfff6edfa`](https://etherscan.io/address/0xdd922c841d85e12dac2dc2eef5a5e29cfff6edfa), the address D2 published only in shortened form. Traced by OAK; D2 shortens the holding wallet too, matching the entry above.

## Fund flow

Ethereum leg traced by OAK with `tools/explorer.py` (Blockscout, keyless) on 2026-10-30, with a trace window of about five days after the exploit (to 2026-10-28, extended to 2026-10-29 for the last Tornado deposits). The Initia L1 and Noble legs are not supported by the tool, so those edges are relayed from the cited sources and drawn dashed. Counterfeit-token transfers were excluded: from minutes after the exploit, address-poisoning bots sent the exit address and the holding wallet fake "ETH" Transfer events from lookalike addresses with the same first four and last four characters (for example `0x358e8903fef95f152ad008528645759deaf5cac8`, `0x3587a7e43037f3efc6b4183405f2a5a39941cac8`, `0x358e99deaf8cc36cff2df3ce1635b5b84bd4cac8` and `0x358ec5bded6bf6b801ac466ed2cf27e283b0cac8` imitating the real holding wallet `0x358ef0130f7a5aa516dcd81bdc80b18cde41cac8`). The tool reported more than 70 skipped unverified token transfers on the two wallets. The first-hop wallet `0x6b1175612794568d56d72afaa098402afc0299a4` was also imitated by many lookalikes sharing its first four and last four characters; only the real one received native ETH signed by the holding wallet.

```oak-flow
as_of: 2026-10-30T13:00Z
nodes:
  - {id: tc1, chain: ethereum, address: 0x12d66f87a04a9e220743712ce6d9bb1b5616b8fc, role: mixer, label: "Tornado Cash 0.1 ETH pool"}
  - {id: initia, chain: initia, role: vulnerable-contract, label: "Initia L1 (MoveVM)"}
  - {id: noble, chain: noble, role: bridge, label: "Noble (USDC to CCTP)"}
  - {id: cctp, chain: ethereum, address: 0x0a992d191deec32afe36203ad87d7d289a738f81, role: bridge, label: "Circle CCTP MessageTransmitter"}
  - {id: ausd, chain: ethereum, address: 0x38b8b7ca28e672018a299b20565aca8cf200c844, role: bridge, label: "LayerZero AUSD adapter"}
  - {id: weth, chain: ethereum, address: 0x66a503a1060ab3f2b1aaabed613fe30babbc1bde, role: bridge, label: "WETH contract (ETH adapter release)"}
  - {id: rcv, chain: ethereum, address: 0xdd922c841d85e12dac2dc2eef5a5e29cfff6edfa, role: attacker-receiver, label: "Exit receiver"}
  - {id: dex, chain: ethereum, role: dex, label: "1inch v6 router and 0x Settler"}
  - {id: hold, chain: ethereum, address: 0x358ef0130f7a5aa516dcd81bdc80b18cde41cac8, role: attacker-holding, label: "Holding wallet (1,135.52 ETH)"}
  - {id: p1, chain: ethereum, address: 0xa764b87fcb14bc850b68dfe41720cba3b24a89c0, role: intermediary, label: "Split wallet A (400 ETH)"}
  - {id: q1, chain: ethereum, address: 0x6b1175612794568d56d72afaa098402afc0299a4, role: intermediary, label: "Mixer-feeder B (735.52 ETH)"}
  - {id: g, chain: ethereum, address: 0xdb3055a681a860955a6a49617062e7653f14966a, role: intermediary, label: "Mixer-feeder C"}
  - {id: s1, chain: ethereum, address: 0x239bcdfb0d18485d5c2dd4c12ad4d76ac4fc5b9f, role: intermediary, label: "Peel 10 ETH"}
  - {id: s2, chain: ethereum, address: 0xd1e4b7a61f7174fe6dd2fe58a199f8cf92308a1b, role: intermediary, label: "Peel 10 ETH"}
  - {id: s3, chain: ethereum, address: 0xe869c927b2ff49727caf6e6eb4b47a6de2bef81f, role: intermediary, label: "Peel 20 ETH"}
  - {id: s4, chain: ethereum, address: 0x86ebfdeddf391077338a98b5c478e1751496de86, role: intermediary, label: "Peel 50 ETH"}
  - {id: s5, chain: ethereum, address: 0xaa45822a0c2b743a7b6520c91079d7fa7cd7a86b, role: intermediary, label: "Peel 50 ETH"}
  - {id: s6, chain: ethereum, address: 0x3ac7794ee10d95a814a8ff92dda1a3d05429a2a8, role: intermediary, label: "Peel 59 ETH"}
  - {id: s7, chain: ethereum, address: 0xafcff40ccb43cff52428c3668d3642d704610a27, role: intermediary, label: "Peel 0.4 ETH"}
  - {id: s8, chain: ethereum, address: 0x81a4c429e08ddfbb9391be400c27b51af7d797b1, role: intermediary, label: "Peel 4 ETH"}
  - {id: s9, chain: ethereum, address: 0x7bb5002e8437d5b960538685affc3e8b8f2cfe8e, role: intermediary, label: "Peel 6 ETH"}
  - {id: s10, chain: ethereum, address: 0x239d3eceb5b11e01a0ecf952c5abfa2155c1588b, role: intermediary, label: "Peel 6.11 ETH"}
  - {id: c1, chain: ethereum, address: 0xcebf738348372f6d918584090c0ae74fe4c8fca3, role: intermediary, label: "Collector 1 (10 ETH, forwarded on)"}
  - {id: c2, chain: ethereum, address: 0xf374966fe9bc01204a6e3c9c91a381c2942d407b, role: intermediary, label: "Collector 2 (about 110 ETH, fans out)"}
  - {id: c3, chain: ethereum, address: 0x0a0b5a470a19342c7746d476f50fb8c09a8a1e56, role: intermediary, label: "Collector 3 (20 ETH)"}
  - {id: c4, chain: ethereum, address: 0x0d15b57a5ba0a31a4774c03ddfacf79b289db9ce, role: intermediary, label: "Collector 4 (59 ETH)"}
  - {id: c5, chain: ethereum, address: 0x3c58043e2cdda4e3a0372e776bb464b40548b402, role: intermediary, label: "Collector 5 (about 16.5 ETH)"}
  - {id: tcr, chain: ethereum, address: 0xd90e2f925da726b50c4ed8d0fb90ad053324f31b, role: mixer, label: "Tornado Cash Router (100 ETH and 10 ETH pools)"}
edges:
  - {from: tc1, to: rcv, asset: ETH, amount: 0.0979495, tx: 0x3fb58feaaff3abdc5d55e3c6128ea03b6527665d702c983630f7f1d2f26c4d49, time: 2026-10-23T08:26:59Z, technique: T7.001, verified: oak}
  - {from: initia, to: rcv, asset: "unbacked WETH, iUSD, USDC and 2,000,000 AUSD credited on Initia (supply unchanged)", time: 2026-10-23T14:59:26Z, technique: T9.014, verified: source, source: d2initia2026}
  - {from: initia, to: ausd, asset: "AUSD bridged out via LayerZero", time: 2026-10-23T14:59:26Z, technique: T7.003, verified: source, source: d2initia2026}
  - {from: initia, to: weth, asset: "WETH bridged out via LayerZero", time: 2026-10-23T14:59:26Z, technique: T7.003, verified: source, source: d2initia2026}
  - {from: initia, to: noble, asset: "USDC bridged to Noble", time: 2026-10-23T14:59:26Z, technique: T7.003, verified: source, source: d2initia2026}
  - {from: noble, to: cctp, asset: "USDC burned for CCTP", time: 2026-10-23T15:02:00Z, technique: T7.003, verified: source, source: d2initia2026}
  - {from: ausd, to: rcv, asset: AUSD, amount: 1400000, tx: 0x034c1076a08091b3221ef1e7bbcfb47dfeda93a6e460888f2d1bc124be17f3b6, time: 2026-10-23T15:01:59Z, technique: T7.003, verified: oak}
  - {from: cctp, to: rcv, asset: USDC, amount: 1079999.739759, tx: 0xb18614bda3d693d557feee0f44813445b084098c1f497a4097d4297e82b089d3, time: 2026-10-23T15:02:35Z, tx_count: 2, time_last: 2026-10-23T15:25:11Z, technique: T7.003, verified: oak}
  - {from: weth, to: rcv, asset: ETH, amount: 105, tx: 0x5cd422fd8166abf5d8632e9919bfedf6e26f5b77cf732cc797d863450887d7e9, time: 2026-10-23T15:06:47Z, technique: T7.003, verified: oak}
  - {from: rcv, to: weth, asset: ETH, amount: 0.00600805, tx: 0xe99b14e1ae9872d971a3984a6ab57d037bd7b5632a09d5e28a85d25420e96372, time: 2026-10-23T14:37:35Z, verified: oak}
  - {from: rcv, to: dex, asset: AUSD, amount: 1400000, tx: 0xeb5e85e76f00a7a84dfe4d2d6aab146a769785b3d80307c67dde14c79f36c5ae, time: 2026-10-23T15:03:23Z, verified: oak}
  - {from: rcv, to: dex, asset: USDC, amount: 1079999.739759, tx: 0x6981eed05757cfbce5ac7818449b28132dcb400361029ed3452037936c66c3b0, time: 2026-10-23T15:04:59Z, tx_count: 2, time_last: 2026-10-23T15:26:47Z, verified: oak}
  - {from: dex, to: rcv, asset: ETH, amount: 1030.44236573, tx: 0xeb5e85e76f00a7a84dfe4d2d6aab146a769785b3d80307c67dde14c79f36c5ae, time: 2026-10-23T15:03:23Z, tx_count: 3, time_last: 2026-10-23T15:26:47Z, verified: oak}
  - {from: rcv, to: hold, asset: ETH, amount: 1135.52459058, tx: 0x60f15b7e96111f11af54a2a0c9adc2ff33fef6b6a3c1a3b073a55c1421043e06, time: 2026-10-23T15:41:35Z, verified: oak}
  - {from: hold, to: p1, asset: ETH, amount: 400, tx: 0xf35dcdd4c23816adcd5e1fb6578a75c2d43b4816bf78203b6721cfb59b9cc7f1, time: 2026-10-27T13:06:11Z, tx_count: 2, time_last: 2026-10-27T17:57:23Z, verified: oak}
  - {from: hold, to: q1, asset: ETH, amount: 735.52466511, tx: 0xb0723493669e7e0458dd446465927090ada5f4caa0a9f0bc6ec7ec5fdc6522df, time: 2026-10-28T13:37:59Z, tx_count: 4, time_last: 2026-10-28T14:59:23Z, verified: oak}
  - {from: p1, to: s1, asset: ETH, amount: 10, tx: 0xc8521e99a77ae96b97cbf9e700b93b13ba35877f3b32fc6ff807ed03c073779a, time: 2026-10-27T13:07:59Z, verified: oak}
  - {from: p1, to: s2, asset: ETH, amount: 10, tx: 0x9c11d8b843435b7402c2807a5bf2866911aedd3c8431f2319a46d73ddf955156, time: 2026-10-27T14:10:35Z, verified: oak}
  - {from: p1, to: s3, asset: ETH, amount: 20, tx: 0x1cb38e7f23ba8127cdb3f70f15d963137e037e2efa0d9f132d6d5d9590b55a13, time: 2026-10-27T14:18:23Z, verified: oak}
  - {from: p1, to: s4, asset: ETH, amount: 50, tx: 0x3cef7bd3a435761e15dbcc8ba4de7e9690833cfca70b849afde304b001c29dac, time: 2026-10-27T15:05:35Z, verified: oak}
  - {from: p1, to: s5, asset: ETH, amount: 50, tx: 0xd46ae44b687a582d7aa4dc314c6307873f04794100a773f41552722d66374484, time: 2026-10-27T15:58:47Z, verified: oak}
  - {from: p1, to: s6, asset: ETH, amount: 59, tx: 0xa0dfb0b76b36ac9b2301a60c49094c24d66ace0b5001492df644ab5eb1d6dc02, time: 2026-10-27T16:02:23Z, verified: oak}
  - {from: p1, to: g, asset: ETH, amount: 100.99797041, tx: 0x5c90665a1922296b4e6dc9ecfd8df58016670d9e108fd1a749edd3a23120c2d6, time: 2026-10-27T18:25:47Z, tx_count: 2, time_last: 2026-10-28T13:14:11Z, verified: oak}
  - {from: p1, to: tcr, asset: ETH, amount: 100, tx: 0xabfc46076fd45942b5b1ca8a2aa6bb6eb0073d81c239ec166fe5e62940632a95, time: 2026-10-28T10:08:11Z, technique: T7.001, verified: oak}
  - {from: g, to: tcr, asset: ETH, amount: 100, tx: 0xe1c270f65982654d369005cb3fe38a5f47270c99829431aad4e6f7c6f3fda823, time: 2026-10-28T13:18:23Z, technique: T7.001, verified: oak}
  - {from: g, to: q1, asset: ETH, amount: 0.99595563, tx: 0xc797cb66715f7eb78cf7ae34cdd35b2238c89a7b0ce68c6ed89af0da9dfcc121, time: 2026-10-28T13:27:35Z, verified: oak}
  - {from: q1, to: tcr, asset: ETH, amount: 720, tx: 0xfcbbc1a5d4dcbe717c1ff9fbe4343b27481000c76e4695c41e78311e4c9e4402, time: 2026-10-28T13:41:23Z, tx_count: 9, time_last: 2026-10-28T15:13:47Z, technique: T7.001, verified: oak}
  - {from: q1, to: s7, asset: ETH, amount: 0.4, tx: 0x8536e0e66790cc2105f7a9b9f5f81e0a914a0de3471978a3fa79cdb529008e71, time: 2026-10-28T15:17:11Z, verified: oak}
  - {from: q1, to: s8, asset: ETH, amount: 4, tx: 0x4820495b37836c074748cf27e03ae62c5f2cfbcc0eacf50beae1b9b0af5314fb, time: 2026-10-28T15:23:35Z, verified: oak}
  - {from: q1, to: s9, asset: ETH, amount: 6, tx: 0x59af97dc9adb74d43ee70c1cbb73cc328ea1bbd7dc0747e7b3c4296c4c4b75af, time: 2026-10-28T15:34:47Z, verified: oak}
  - {from: q1, to: s10, asset: ETH, amount: 6.10955442, tx: 0xdbe99a95446490a268835e0575a423f8e073aa765f05093536d1735394d1d764, time: 2026-10-28T15:45:47Z, verified: oak}
  - {from: s1, to: c1, asset: ETH, amount: 9.99999335, tx: 0xe6d183fa66665540a1bce2a944d0f75574669ae369c78ea53485ad5ac1053582, time: 2026-10-27T13:08:35Z, verified: oak}
  - {from: s2, to: c2, asset: ETH, amount: 9.99998371, tx: 0xfef95c9716610c3fc388f2b0d4c2bcf5761f4eb456249692458ead4591fa3543, time: 2026-10-27T14:11:11Z, verified: oak}
  - {from: s3, to: c3, asset: ETH, amount: 19.99997591, tx: 0x27816298307d9489068f4e177c7679bbb215305608bc18e1ba65f4f37ea1e545, time: 2026-10-27T14:18:47Z, verified: oak}
  - {from: s4, to: c2, asset: ETH, amount: 49.99999197, tx: 0x9c8e16abb57a1393a59be27d5dec38cefb8dbe17d59481fe1c3a75480f9ee4bf, time: 2026-10-27T15:06:11Z, verified: oak}
  - {from: s5, to: c2, asset: ETH, amount: 49.99999219, tx: 0xe4ab8cef724aa018072f934566eae44070cfd29589a1275fe8f63f0dea8d4aa5, time: 2026-10-27T15:59:23Z, verified: oak}
  - {from: s6, to: c4, asset: ETH, amount: 58.99998271, tx: 0x49c0ff9751766e9267c612d1dd34efe7b581fa001dcb58d0ccf0ac39ca47fcf4, time: 2026-10-27T16:02:59Z, verified: oak}
  - {from: s7, to: c5, asset: ETH, amount: 0.39999366, tx: 0x38534dd4d3b87c8c6f4b46ac4023c242933856c09e82aae1ff111963386b6b42, time: 2026-10-28T15:17:47Z, verified: oak}
  - {from: s8, to: c5, asset: ETH, amount: 3.99999276, tx: 0xf051b809d1463164f6fb2b5636486c1aa8e0795569047705b9b10bbbba3423cb, time: 2026-10-28T15:24:11Z, verified: oak}
  - {from: s9, to: c5, asset: ETH, amount: 5.99999279, tx: 0x9342f08bf2691e01ad95f05f72ccafb43c7679b79712a8689e7e575139b0b048, time: 2026-10-28T15:35:35Z, verified: oak}
  - {from: s10, to: c5, asset: ETH, amount: 6.10954893, tx: 0x80f65f8a4cb7600978857c63cd7953cecc061f7f2ae71785215f66960ec69f27, time: 2026-10-28T15:46:23Z, verified: oak}
```

What the trace adds beyond the sources:

- **The exit address is `0xdd922c841d85e12dac2dc2eef5a5e29cfff6edfa`** (D2 published it only shortened). It matches D2's decoding on every figure: the LayerZero AUSD release at 15:01:59 is 153 s after the 14:59:26 mint, the AUSD swap at 15:03:23 is 84 s later, and the last exit (105 ETH, 15:06:47) is exactly 7 m 21 s after the mint.
- **Preparation funding.** The Tornado Cash withdrawal into it at 08:26:59 UTC was 0.0979495 ETH (the 0.1 ETH pool, net of a relayer fee), not a full 0.1 ETH. The 0.006 ETH "deposit into the ETH adapter" at 14:37:35 went to the WETH contract `0x66a503a1060ab3f2b1aaabed613fe30babbc1bde`, the same contract that paid out the 105 ETH.
- **USDC came in two CCTP mints**, not one: 999,999.892101 USDC at 15:02:35 and 79,999.847658 USDC at 15:25:11 (total 1,079,999.739759, the "1.08M"). The second was swapped at 15:26:47 for 33.18 ETH through the 0x Settler; the other swaps went through the 1inch v6 router. The three swaps returned 1,030.44 ETH, plus 105 ETH from WETH and the 0.0979 ETH Tornado funding, minus gas, gives the 1,135.52459058 ETH sent to the holding wallet at 15:41:35.
- **The holding wallet did not stay put.** Initia said on 2026-10-24 that funds sat unmoved; that was true then. From 2026-10-27 13:06 UTC the wallet sent out its whole balance as native ETH: 400 ETH to `0xa764b87fcb14bc850b68dfe41720cba3b24a89c0` in two sends, and 735.52466511 ETH to `0x6b1175612794568d56d72afaa098402afc0299a4` in four sends on 2026-10-28 (the small difference from 1,135.52459058 is poisoning dust of 0.0001 ETH it received).
- **Tornado Cash again.** 920 ETH went into Tornado Cash (100 ETH and 10 ETH pool deposits through the router) between 2026-10-28 10:08 and 15:13 UTC: 100 from the first split wallet, 100 from a gas-and-mixer wallet, and 720 (nine deposits) from the second. This is the same service that funded the preparation (T7.001).
- **Peel chain.** About 215 ETH was split into 10 fresh wallets in amounts of 0.4 to 59 ETH, each of which forwarded its whole balance to a collector wallet within about a minute. These collectors are not traced further here.

Limits:

- The Initia L1 and Noble legs are not supported by the tool; those edges are relayed from `[d2initia2026]` and carry no tx. The Initia-side attacker address is not published.
- The five collectors (the last five intermediary nodes before the Tornado node) were not followed. `0xf374966fe9bc01204a6e3c9c91a381c2942d407b` fans out to many wallets and `0xcebf738348372f6d918584090c0ae74fe4c8fca3` forwards to a wallet labelled "Sweeper" by the explorer; both are outside the trace window.
- Explorer labels are hints, not attribution.

## Root-cause evidence

- **Technique:** OAK-T9.014
- **Source:** <https://x.com/initia/status/2113915002008612945>; <https://x.com/D2_Finance/status/2113667420359700509>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** Initia names the MoveVM script-caching bug; D2 Finance's decoding gives the transaction timing and bridge exits. D2 describes a 2,000,000 AUSD "mint", Initia says total supply did not change; both agree the balances were unbacked.

## Public references

- `[initiastatement2026]` — Initia on X (2026-10-24): <https://x.com/initia/status/2113915002008612945>
- `[initiahalt2026]` — Initia on X, halt (2026-10-23): <https://x.com/initia/status/2113661738625155217>
- `[d2initia2026]` — D2 Finance, exploit decoding: <https://x.com/D2_Finance/status/2113667420359700509>
