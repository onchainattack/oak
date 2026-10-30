# Unnamed trading Safe — unlimited approvals to an address that held the team's pool on other chains but was empty on Avalanche, so anyone could deploy there — Safe multisig / Avalanche — 2026-10-26

**Loss:** **~\$7.45M** (3.09M USDC, 350.4K WAVAX, 182 WETH.e, 10.79 BTC.b) taken from a 2-of-7 Safe holding trading inventory. An MEV bot front-ran the original attacker in the same block, took the funds, called itself a whitehat and offered to return them for a 5–10% bounty. The operator evacuated its Safes on five other chains (~\$38.7M) to a fresh address.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary*. On 2026-03-07 the Safe approved **unlimited** WAVAX, USDC, WETH.e and BTC.b to [`0x3725bd4d175283108156c3f15f86e1c51266155d`](https://snowtrace.io/address/0x3725bd4d175283108156c3f15f86e1c51266155d). On Base, Arbitrum and Ethereum the team's pool lives there; on Avalanche the address was **empty**, and it is simply what Safe's public CreateCall contract produces on its 13th deployment. An attacker deployed CreateCall via the Safe singleton factory, ran 12 throwaway deployments, then put a sweeper at that address. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). No signer key was compromised.

**Attribution:** **pseudonymous;** the operator is not publicly named.

**Key teaching point:** **The same address is not the same contract on another chain.** Approving a counterfactual address on a chain where nothing is deployed hands the allowance to whoever deploys there first. Check code at the spender before approving, per chain, and revoke allowances that nothing uses.

## Summary

Defimon detected the attack on 2026-10-26 at 13:00 UTC. The approvals had been live for seven months.

## Timeline (UTC)

Read it as four stages. **Flaw**: unlimited approvals to an address that was empty on Avalanche. **Prepare**: an attacker deploys CreateCall and burns 12 deployments to reach that address. **Take**: a sweeper is placed at the address; an MEV bot copies the transaction and wins the race. **Respond**: the operator evacuates its other Safes while the bot negotiates a bounty. Times are from Defimon unless marked.

| When | What happened | OAK |
|---|---|---|
| 2026-03-07 16:10 | A batch from the 2-of-7 Safe ([`0x631fca4a73aee699638634479132452ef354b9b8`](https://snowtrace.io/address/0x631fca4a73aee699638634479132452ef354b9b8)) ([`0x6952f80bbbcad4368b020bcda600965cf0a520a8694db431b6b1521842d3829e`](https://snowtrace.io/tx/0x6952f80bbbcad4368b020bcda600965cf0a520a8694db431b6b1521842d3829e)) sets **unlimited** WAVAX, USDC, WETH.e and BTC.b allowances to [`0x3725bd4d175283108156c3f15f86e1c51266155d`](https://snowtrace.io/address/0x3725bd4d175283108156c3f15f86e1c51266155d). On Base, Arbitrum and Ethereum the team's pool contract is at that address. On Avalanche it is empty. The allowances are never revoked, so they stay live for about seven months. | **T9.004** |
| Before 2026-10-26 (undisclosed) | A fresh EOA ([`0x4c48b79b97516719444056d2bf0dc9564138fa0a`](https://snowtrace.io/address/0x4c48b79b97516719444056d2bf0dc9564138fa0a)) deploys Safe's CreateCall contract through the Safe singleton factory, then runs 12 throwaway deployments, so that the 13th deployment lands at [`0x3725bd4d175283108156c3f15f86e1c51266155d`](https://snowtrace.io/address/0x3725bd4d175283108156c3f15f86e1c51266155d). Exact times are not published. | **T9.004** |
| 2026-10-26 12:56:14 | The attacker's transaction ([`0xf1f87d370290afe269ae8eb30fe8e5e4694ad153914a2de6d980641f4a331289`](https://snowtrace.io/tx/0xf1f87d370290afe269ae8eb30fe8e5e4694ad153914a2de6d980641f4a331289)) places a sweeper at [`0x3725bd4d175283108156c3f15f86e1c51266155d`](https://snowtrace.io/address/0x3725bd4d175283108156c3f15f86e1c51266155d) to pull every balance out of the Safe. It reverts with "Multicall3: Call Failed", because the MEV bot's copy runs first (SnowScan card in Defimon's quoted post). | **T9.004** |
| 2026-10-26 (same block) | An MEV bot ([`0x36b112875f921e51f5ea8ff39b374960694d21b3`](https://snowtrace.io/address/0x36b112875f921e51f5ea8ff39b374960694d21b3)) copies the attack and front-runs it in the same block ([`0xf88a7960a07832e1bf5be64edbd12a9e615b4f63959a4b87a147f0c63c007ed5`](https://snowtrace.io/tx/0xf88a7960a07832e1bf5be64edbd12a9e615b4f63959a4b87a147f0c63c007ed5)), taking 3.09M USDC, 350.4K WAVAX, 182 WETH.e and 10.79 BTC.b (about \$7.45M). Funds go straight to the bot (traced by OAK) and, from 14:05 to 14:22, to [`0x11eb9b677510e2594857f4d137fd12a7fef39bc5`](https://snowtrace.io/address/0x11eb9b677510e2594857f4d137fd12a7fef39bc5). | **T9.004** |
| 2026-10-26 13:00:23 | Defimon detects the activity. | — |
| 2026-10-26 to 10-27 (undisclosed) | The bot posts on-chain messages that it is a whitehat, shares the original attack transaction, says it will return funds to [`0x35c6aa248e9495E0572598fBfE0528aCbAC2807C`](https://snowtrace.io/address/0x35c6aa248e9495E0572598fBfE0528aCbAC2807C) within hours, and asks for a 5–10% bounty. One owner message offers 42,500 WAVAX (about \$371K) (RektRadar; related transaction [`0xd2916fecdf3f0749692830918bd0ac8059c4d87e62d174181e609a7076911afc`](https://snowtrace.io/tx/0xd2916fecdf3f0749692830918bd0ac8059c4d87e62d174181e609a7076911afc)). Return confirmed on-chain by OAK (next rows). | response |
| 2026-10-27 07:22 to 09:46 (traced by OAK) | Return: after small tests and the owners' confirmation of the 42,500 WAVAX arrangement at 09:30:43, the bot's holding wallet sends USDC, WETH.e, BTC.b and 307,834.8552616179 WAVAX to the owners' wallet `0x35c6aa248e9495E0572598fBfE0528aCbAC2807C`. The bot keeps 42,541 WAVAX. | response |
| 2026-10-27 14:46 to 17:19 (traced by OAK) | The owners forward the returned assets to a second wallet, `0x0ae383b9075cf0df1991a23cca8ee546249eda8e`. | response |
| From 13:48 (date not stated; reported 2026-10-27) | Signers of the operator's other Safes, each with its own signers, evacuate the Safes on HyperEVM, Base, Robinhood Chain, BSC and Ethereum to one fresh address (0x70d54baf9ffa48b8fe4e843774a44e24ff452099), about \$38.7M. | response |
| 2026-10-27 | Defimon publishes the public alert. | — |

Key addresses:

- Spender that held the unlimited approvals and later got the sweeper (team pool on Base, Arbitrum, Ethereum; empty on Avalanche): [`0x3725bd4d175283108156c3f15f86e1c51266155d`](https://snowtrace.io/address/0x3725bd4d175283108156c3f15f86e1c51266155d)
- Victim 2-of-7 Safe: [`0x631fca4a73aee699638634479132452ef354b9b8`](https://snowtrace.io/address/0x631fca4a73aee699638634479132452ef354b9b8)
- Original attacker EOA: [`0x4c48b79b97516719444056d2bf0dc9564138fa0a`](https://snowtrace.io/address/0x4c48b79b97516719444056d2bf0dc9564138fa0a)
- MEV bot that front-ran the attack: [`0x36b112875f921e51f5ea8ff39b374960694d21b3`](https://snowtrace.io/address/0x36b112875f921e51f5ea8ff39b374960694d21b3)
- Address holding the taken funds: [`0x11eb9b677510e2594857f4d137fd12a7fef39bc5`](https://snowtrace.io/address/0x11eb9b677510e2594857f4d137fd12a7fef39bc5)
- Return address chosen by the owners and named in the bot's on-chain message (traced by OAK): [`0x35c6aa248e9495E0572598fBfE0528aCbAC2807C`](https://snowtrace.io/address/0x35c6aa248e9495E0572598fBfE0528aCbAC2807C)
- Owners' onward wallet (traced by OAK): [`0x0ae383b9075cf0df1991a23cca8ee546249eda8e`](https://snowtrace.io/address/0x0ae383b9075cf0df1991a23cca8ee546249eda8e)
- Fresh address that received the operator's evacuated Safes (about \$38.7M; chains other than Avalanche, no single explorer, full value given by Defimon): `0x70d54baf9ffa48b8fe4e843774a44e24ff452099`

## Fund flow

Avalanche leg, traced by OAK with `tools/explorer.py` (Routescan for transfers and message transactions, public RPC for transaction checks) on 2026-10-30. Edges marked *traced by OAK* were checked on-chain. The other chains of the operator's evacuation are not traced (`verified: source`). OAK records the return neutrally: it is a sequence of transfers and signed messages, not a verdict on the bot's intent. Counterfeit-token and dust transfers were excluded: address-poisoning bots sent lookalike transfers around the bot and return wallets (for example `0x36b183ef3574e5b0805f04cafbf1fd41f86a21b3`, `0x36bca9bfd7851b7facac27263044e8f08e4d21b3` and `0x36b1903d177762fd1a5a685bf01f5d4c720a21b3` imitating the MEV bot `0x36b112875f921e51f5ea8ff39b374960694d21b3`, `0x11eb00774c62e9d8b723dfc06cc05a8480939bc5` imitating `0x11eb9b677510e2594857f4d137fd12a7fef39bc5`, `0x35c660258365830b2b1504ec3428ede12852807c` imitating `0x35c6aa248e9495E0572598fBfE0528aCbAC2807C` and `0x0ae32dd00fb0d633cfc840954c30bf99f1deda8e` imitating `0x0ae383b9075cf0df1991a23cca8ee546249eda8e`), using fake BTC.b and USDC tokens.

```oak-flow
as_of: 2026-10-30T14:30Z
nodes:
  - {id: atk, chain: avalanche, address: 0x4c48b79b97516719444056d2bf0dc9564138fa0a, role: attacker-eoa, label: "Original attacker EOA"}
  - {id: safe, chain: avalanche, address: 0x631fca4a73aee699638634479132452ef354b9b8, role: victim, label: "Victim 2-of-7 Safe"}
  - {id: bot, chain: avalanche, address: 0x36b112875f921e51f5ea8ff39b374960694d21b3, role: unknown, label: "MEV bot (front-runner)"}
  - {id: hold, chain: avalanche, address: 0x11eb9b677510e2594857f4d137fd12a7fef39bc5, role: unknown, label: "Bot holding wallet"}
  - {id: ret, chain: avalanche, address: 0x35c6aa248e9495e0572598fbfe0528acbac2807c, role: returned, label: "Owners' receiving wallet"}
  - {id: own, chain: avalanche, address: 0x0ae383b9075cf0df1991a23cca8ee546249eda8e, role: unknown, label: "Owners' onward wallet"}
  - {id: oth, chain: ethereum, role: victim, label: "Operator's other Safes (HyperEVM, Base, Robinhood Chain, BSC, Ethereum)"}
  - {id: evac, chain: ethereum, address: 0x70d54baf9ffa48b8fe4e843774a44e24ff452099, role: unknown, label: "Fresh evacuation address"}
edges:
  - {from: atk, to: safe, asset: "sweep attempt via Multicall3 (reverted)", tx: 0xf1f87d370290afe269ae8eb30fe8e5e4694ad153914a2de6d980641f4a331289, time: 2026-10-26T12:56:14Z, technique: T9.004, verified: oak}
  - {from: safe, to: bot, asset: USDC, amount: 3090123.580226, tx: 0xf88a7960a07832e1bf5be64edbd12a9e615b4f63959a4b87a147f0c63c007ed5, time: 2026-10-26T12:56:14Z, technique: T9.004, verified: oak}
  - {from: safe, to: bot, asset: WAVAX, amount: 350375.8552616179, tx: 0xf88a7960a07832e1bf5be64edbd12a9e615b4f63959a4b87a147f0c63c007ed5, time: 2026-10-26T12:56:14Z, technique: T9.004, verified: oak}
  - {from: safe, to: bot, asset: WETH.e, amount: 181.97607772632665, tx: 0xf88a7960a07832e1bf5be64edbd12a9e615b4f63959a4b87a147f0c63c007ed5, time: 2026-10-26T12:56:14Z, technique: T9.004, verified: oak}
  - {from: safe, to: bot, asset: BTC.b, amount: 10.786059, tx: 0xf88a7960a07832e1bf5be64edbd12a9e615b4f63959a4b87a147f0c63c007ed5, time: 2026-10-26T12:56:14Z, technique: T9.004, verified: oak}
  - {from: bot, to: hold, asset: USDC, amount: 3090123.580226, tx: 0x019860b647f54ab154e2d9b6053cd583487616d255b73c1deee074d2f377e282, time: 2026-10-26T14:05:45Z, tx_count: 2, time_last: 2026-10-26T14:07:54Z, verified: oak}
  - {from: bot, to: hold, asset: WAVAX, amount: 350334.8552616179, tx: 0x471abfe47e36011f98007ac09c3dcc03c44ae09179764ba89a8c323bf34c4e9e, time: 2026-10-26T14:13:56Z, tx_count: 2, time_last: 2026-10-26T14:16:37Z, verified: oak}
  - {from: bot, to: hold, asset: WETH.e, amount: 181.97607772632666, tx: 0x93b2f836a9215c581482133c969cc6b662bf8dd2b391eab1240cfad2ee21bb4b, time: 2026-10-26T14:18:20Z, tx_count: 2, time_last: 2026-10-26T14:19:08Z, verified: oak}
  - {from: bot, to: hold, asset: BTC.b, amount: 10.786059, tx: 0xcd27a3c421ca5af20a6496834c426f272796e0f8987e7b4ec45047aeb50be17a, time: 2026-10-26T14:20:39Z, tx_count: 2, time_last: 2026-10-26T14:22:33Z, verified: oak}
  - {from: hold, to: ret, asset: USDC, amount: 3090123.580326, tx: 0xf99fdd6276163fd7b8b5f931d2058c45bb67f8ce88703211bdd26a1779f1a986, time: 2026-10-27T07:22:20Z, tx_count: 3, time_last: 2026-10-27T09:39:15Z, verified: oak}
  - {from: hold, to: ret, asset: WETH.e, amount: 181.9760777263266588, tx: 0x74e6ead82e6ab215fb5b91633562dfd20e1f30da5671d5a445880437ac9cb6a1, time: 2026-10-27T09:40:48Z, tx_count: 2, time_last: 2026-10-27T09:41:49Z, verified: oak}
  - {from: hold, to: ret, asset: BTC.b, amount: 10.786059, tx: 0x51e268038ea259a3bbff5298060cf4a16944a2349bee5b40b9b226cb1de4efe4, time: 2026-10-27T09:42:59Z, tx_count: 2, time_last: 2026-10-27T09:43:49Z, verified: oak}
  - {from: hold, to: ret, asset: WAVAX, amount: 307834.8552616179, tx: 0xb14ea648ebb99a9258f3ddaceb801599f37ecdfe09959fc1fb3100f9e3d810b0, time: 2026-10-27T09:45:12Z, tx_count: 2, time_last: 2026-10-27T09:46:42Z, verified: oak}
  - {from: ret, to: own, asset: USDC, amount: 3090123.580326, tx: 0xe5c3e566f33814aff872268751aaf6edeee2f216fcedfc5e87d26102000c9b38, time: 2026-10-27T14:46:03Z, tx_count: 2, time_last: 2026-10-27T17:17:50Z, verified: oak}
  - {from: ret, to: own, asset: BTC.b, amount: 10.786059, tx: 0x1b166307c627ba7c8b3ae05f9d1b799055a07a8b1402d44759b0ebb5a76b65c2, time: 2026-10-27T17:18:34Z, verified: oak}
  - {from: ret, to: own, asset: WETH.e, amount: 181.97607772632665, tx: 0x9c897b6cd3f01b041ba1d19584f496666fcb97eaf3bccba18be095daee35c64b, time: 2026-10-27T17:18:49Z, verified: oak}
  - {from: ret, to: own, asset: WAVAX, amount: 307834.8552616179, tx: 0x29b632012067d82b9fdc7c94db0608a0d9ae8b9fa1f3645254492c3ee94cc970, time: 2026-10-27T17:19:17Z, verified: oak}
  - {from: oth, to: evac, asset: "evacuated Safe balances (about $38.7M)", time: 2026-10-27T00:00:00Z, verified: source, source: defimonavaxsafe2026}
```

What the trace adds beyond the sources:

- **Where the taken funds were.** The 2026-10-26 12:56:14 transaction `0xf88a7960a07832e1bf5be64edbd12a9e615b4f63959a4b87a147f0c63c007ed5` sent 3,090,123.580226 USDC, 350,375.8552616179 WAVAX, 181.97607772632665 WETH.e and 10.786059 BTC.b from the Safe straight to the MEV bot `0x36b112875f921e51f5ea8ff39b374960694d21b3`. The bot moved them to `0x11eb9b677510e2594857f4d137fd12a7fef39bc5` between 14:05 and 14:22 in two or more transfers per asset; the bot address itself held none of them after that.
- **The attacker's attempt.** The original attacker's transaction (`0xf1f87d370290afe269ae8eb30fe8e5e4694ad153914a2de6d980641f4a331289`) went to Multicall3 and failed, and the attacker address `0x4c48b79b97516719444056d2bf0dc9564138fa0a` has no other transaction and no outgoing transfers. It received 6.77 AVAX through a contract call at 12:29:39 from an address OAK did not trace.
- **The bot's messages are on-chain.** The bot wrote to the Safe at 13:15:17 on 2026-10-26 that it intercepted an attack and would return the funds. A signer address (`0xa79fa01919da236a13ce3b204a4d74a736cf63f2`) replied at 15:04 naming the receiving wallet `0x35c6aa248e9495E0572598fBfE0528aCbAC2807C`, and at 09:30:43 on 2026-10-27 accepted that the bot keep 42,500 WAVAX. A second owner address, the wallet deployer `0xffcc49336f12db595d4ecfc10fde1eb0c5cd9a57`, confirmed the signer's message by transaction. So the "return address named in the bot's message" was chosen by the owners, not by the bot; the sources read it the other way.
- **The return happened.** From 07:22 to 09:46 on 2026-10-27 `0x11eb9b677510e2594857f4d137fd12a7fef39bc5` sent the funds to `0x35c6aa248e9495E0572598fBfE0528aCbAC2807C`: 3,090,123.580326 USDC (0.0001 USDC above the take, matching a 0.0001 USDC poisoning dust transfer received at 14:08), 181.9760777263266588 WETH.e, 10.786059 BTC.b and 307,834.8552616179 WAVAX. After a 0.58 USDC and 1 USDC test, the large transfers followed the owners' 09:30 confirmation. The WAVAX not returned is 42,541 (350,375.8552616179 − 307,834.8552616179): the agreed 42,500 plus 41, of which 40.05196 was unwrapped to AVAX at 12:56:50 on 2026-10-26 (this split is an inference from the unwrap amount). All other assets were returned in full to the unit.
- **Owners' onward moves.** From 14:46 to 17:19 on 2026-10-27, `0x35c6aa248e9495E0572598fBfE0528aCbAC2807C` forwarded the whole return to `0x0ae383b9075cf0df1991a23cca8ee546249eda8e`, which on 2026-10-28 swapped part of it, received AVAX in many small transfers from fresh wallets, sent 10.786059 BTC.b to the signer address and moved USDC and USDT to `0x519f10e96a76fcb1a86b8efca7b2fc209aa79b6a`. Control by the owners is inferred from the signer sending it funds and receiving BTC.b back; those later moves are not drawn.
- **The evacuation** of the operator's other Safes (about $38.7M) is relayed from Defimon and not traced: the sources give no Safe addresses or hashes, and the time of day is given only as "from 13:48", so the edge date is a placeholder at day granularity. The destination `0x70d54baf9ffa48b8fe4e843774a44e24ff452099` is full on Ethereum, but its explorer view is dominated by fake-token poisoning events, so OAK did not follow it.
- **Figures.** 3.09M USDC, 350.4K WAVAX, 182 WETH.e and 10.79 BTC.b match the sources. The amounts in the table are exact.
- **Not traced:** the original attacker's funding, the bot's later activity (swaps through `0xe44eea4c6c2085d590a4a6bea01cf83e87a37be5` and many small fan-outs on 2026-10-29 and 2026-10-30, which look like its own MEV operations), and the owners' post-return activity beyond the first wallet.

## Root-cause evidence

- **Technique:** OAK-T9.004
- **Source:** <https://x.com/DefimonAlerts/status/2115005055619260758>; <https://www.rektradar.xyz/web3-daily-exploits-27-oct-2026-avax-safe-7-45m-mev-frontrun/>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** Defimon links the 2026-03-07 approval batch, the CreateCall deployment sequence, the reverted attack and the MEV front-run; RektRadar's brief agrees.

## Public references

- `[defimonavaxsafe2026]` — Defimon on X (2026-10-27): <https://x.com/DefimonAlerts/status/2115005055619260758>
- `[snowtraceapprovals2026]` — vulnerable approvals: <https://snowtrace.io/tx/0x6952f80bbbcad4368b020bcda600965cf0a520a8694db431b6b1521842d3829e>
- `[rektradaravax2026]` — RektRadar daily brief, 2026-10-27: <https://www.rektradar.xyz/web3-daily-exploits-27-oct-2026-avax-safe-7-45m-mev-frontrun/>
