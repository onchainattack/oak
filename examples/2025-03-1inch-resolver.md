# 1inch Fusion v1 — calldata-pointer underflow in Settlement lets an attacker forge the resolver field and drain a market maker's resolver contract — 1inch Fusion v1 / Ethereum — 2025-03-05

**Loss:** over \$5M ([BlockSec](https://blocksec.com/blog/1inch-incident-from-calldata-corruption-to-forged-settlement-binary-exploitation-goes-on-chain)); SlowMist traced 2.4M USDC and 1,276 WETH ([Cointelegraph](https://cointelegraph.com/news/1inch-loses-5m-hack-fusion-v1-smart-contract)). Decurity gives no total. The one confirmed victim is the TrustedVolumes resolver contract; end-user funds were not affected, per 1inch as relayed by Cointelegraph. **Recovery:** after an on-chain negotiation the attacker returned all funds except a fractional bounty between 2025-03-05 23:59 and 2025-03-06 04:12 UTC; the bounty amount is not stated ([Decurity](https://www.decurity.io/research/yul-calldata-corruption-1inch-postmortem)).

**OAK Techniques observed:** none — the flaw is an arithmetic underflow in how the Fusion v1 `Settlement` contract reconstructs calldata, which lets an attacker overwrite the resolver field the victim resolver trusts. No page in `techniques/` matches that mechanism ([Decurity](https://www.decurity.io/research/yul-calldata-corruption-1inch-postmortem)).

**Attribution:** **unattributed.** The attacker's exploit deployer was funded through Tornado Cash ([Decurity](https://www.decurity.io/research/yul-calldata-corruption-1inch-postmortem)); no identity is given.

**Key teaching point:** **A resolver or integrator contract must not accept a forwarded call on the strength of msg.sender alone; verify the calldata fields it relies on, and retire old settlement versions that integrators still approve.** The victim's only checks were that the caller was `Settlement` and that the first argument equalled its own address, and the attacker satisfied both ([Decurity](https://www.decurity.io/research/yul-calldata-corruption-1inch-postmortem)).

## Summary

On 2025-03-05 an attacker exploited the Fusion v1 `Settlement` contract to call a third-party resolver contract as if `Settlement` were forwarding a legitimate order. `_settleOrder` appends a suffix to calldata at `ptr + interactionOffset + interactionLength`; because `interactionLength` is an attacker-controlled 32-byte word, the calculation underflows, the suffix is written backward over the resolver field, and the attacker sets that field to the victim's address. The victim's `resolveOrders` then transferred tokens to the caller ([Decurity](https://www.decurity.io/research/yul-calldata-corruption-1inch-postmortem)). BlockSec's example transaction used five valid orders, null-byte padding, and a final `interactionLength` of `0xffff…fe00` (-512), with the resolver trusting forwarded calldata based on `msg.sender` ([BlockSec](https://blocksec.com/blog/1inch-incident-from-calldata-corruption-to-forged-settlement-binary-exploitation-goes-on-chain)). Decurity says the bug was introduced in November 2022 during a Solidity-to-Yul rewrite and stayed deployed in the older `Settlement` version for over two years. 1inch said only resolvers using Fusion v1 in their own contracts were affected and urged resolvers to audit and update ([Cointelegraph](https://cointelegraph.com/news/1inch-loses-5m-hack-fusion-v1-smart-contract)).

## Timeline (UTC)

Stages: **Flaw**, **Take**, **Money**, **Response**. Times are from Decurity's post-mortem, March 5-6, 2025.

| When | What happened | OAK |
|---|---|---|
| November 2022 | Bug introduced in a Solidity-to-Yul rewrite of the Fusion v1 `Settlement` contract ([Decurity](https://www.decurity.io/research/yul-calldata-corruption-1inch-postmortem)) | — |
| Before 2025-03-05 (undisclosed) | Exploit deployer funded through Tornado Cash ([Decurity](https://www.decurity.io/research/yul-calldata-corruption-1inch-postmortem)) | — |
| 2025-03-05 17:31 | Decurity sees a 1inch hack alert on the Defimon dashboard | — |
| 2025-03-05 17:54 | Attacker finishes draining funds; exploit transactions listed below ([Decurity](https://www.decurity.io/research/yul-calldata-corruption-1inch-postmortem)) | — |
| 2025-03-05 17:55 | Decurity concludes it is a third-party resolver hack and notifies 1inch | response |
| 2025-03-05 18:34 | Attacker sends an on-chain message asking for a bounty, in [`0xf70d0aa5a3692540fc484945e9f50b672e4b752ff366a03d92cd5e1a1b459301`](https://etherscan.io/tx/0xf70d0aa5a3692540fc484945e9f50b672e4b752ff366a03d92cd5e1a1b459301); TrustedVolumes offers to negotiate | response |
| 2025-03-05 23:55 | Negotiation concludes | response |
| 2025-03-05 23:59 to 2025-03-06 04:12 | Attacker returns funds to the victim, keeping a fractional bounty | response |

Exploit transactions listed by Decurity, all on Ethereum: [`0x04975648e0db631b0620759ca934861830472678dae82b4bed493f1e1e3ed03a`](https://etherscan.io/tx/0x04975648e0db631b0620759ca934861830472678dae82b4bed493f1e1e3ed03a), [`0xb5c94efa0c8fd8f5c8cc2826e374a99620b01061d395b59b8f45dddc9fce1c60`](https://etherscan.io/tx/0xb5c94efa0c8fd8f5c8cc2826e374a99620b01061d395b59b8f45dddc9fce1c60), [`0xb16bbf03d324b66685c94d62dbe31c739ee23c114b3915d169c74cd7c98eec8c`](https://etherscan.io/tx/0xb16bbf03d324b66685c94d62dbe31c739ee23c114b3915d169c74cd7c98eec8c), [`0xc69b4c8029c70ae468e92af31120ac6b01bb89c6e35d34818413e9942aedebb6`](https://etherscan.io/tx/0xc69b4c8029c70ae468e92af31120ac6b01bb89c6e35d34818413e9942aedebb6), [`0xefcb740bf9ec17ed99839ffcc05393fae5ec2d44149aee91ba119f48bc20a1ef`](https://etherscan.io/tx/0xefcb740bf9ec17ed99839ffcc05393fae5ec2d44149aee91ba119f48bc20a1ef), [`0x74bc4d5dc7f8da468788da6087bb9f73465966ab5b8cf9cf1053d98e78a9bf96`](https://etherscan.io/tx/0x74bc4d5dc7f8da468788da6087bb9f73465966ab5b8cf9cf1053d98e78a9bf96) (BlockSec's example), [`0x3947e5a4d98104e313e08ee321673e1183db3d6ff8b7207f3eabb36f71436c1d`](https://etherscan.io/tx/0x3947e5a4d98104e313e08ee321673e1183db3d6ff8b7207f3eabb36f71436c1d), [`0x9ce5187c7160f531189e4765f21af5975dc2a62d961fb61ae09866d082918256`](https://etherscan.io/tx/0x9ce5187c7160f531189e4765f21af5975dc2a62d961fb61ae09866d082918256), [`0xb0688eb1f46c28f36d7397366146fced23d3f8da7e08b760a5f612ce134ee9d2`](https://etherscan.io/tx/0xb0688eb1f46c28f36d7397366146fced23d3f8da7e08b760a5f612ce134ee9d2), [`0x62734ce80311e64630a009dd101a967ea0a9c012fabbfce8eac90f0f4ca090d6`](https://etherscan.io/tx/0x62734ce80311e64630a009dd101a967ea0a9c012fabbfce8eac90f0f4ca090d6).

Key addresses (roles per [Decurity](https://www.decurity.io/research/yul-calldata-corruption-1inch-postmortem)):

- Victim resolver (TrustedVolumes) — [`0xb02f39e382c90160eb816de5e0e428ac771d77b5`](https://etherscan.io/address/0xb02f39e382c90160eb816de5e0e428ac771d77b5)
- 1inch Settlement V1 — [`0xa88800cd213da5ae406ce248380802bd53b47647`](https://etherscan.io/address/0xa88800cd213da5ae406ce248380802bd53b47647)
- Exploit deployer (Tornado-funded) — [`0xa7264a43a57ca17012148c46adbc15a5f951766e`](https://etherscan.io/address/0xa7264a43a57ca17012148c46adbc15a5f951766e)
- Exploit contract — [`0x019bfc71d43c3492926d4a9a6c781f36706970c9`](https://etherscan.io/address/0x019bfc71d43c3492926d4a9a6c781f36706970c9)
- Funds receiver — [`0xbbb587e59251d219a7a05ce989ec1969c01522c0`](https://etherscan.io/address/0xbbb587e59251d219a7a05ce989ec1969c01522c0)

Indicator of compromise: function selector `0x1944799f` (`resolveOrders(address,bytes,bytes)`).

## Root-cause evidence

- **Technique:** none — calldata-reconstruction underflow in `Settlement`; no matching Technique
- **Source:** <https://www.decurity.io/research/yul-calldata-corruption-1inch-postmortem>; <https://blocksec.com/blog/1inch-incident-from-calldata-corruption-to-forged-settlement-binary-exploitation-goes-on-chain>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** Decurity (which audited Fusion v1 and joined the response) and BlockSec independently describe the same `interactionLength` underflow and the forged resolver field. Neither is the operator. Where the funds were swapped after the drain, if at all, is undisclosed.

## Public references

- Decurity, "Yul Calldata Corruption: 1inch Postmortem" (2025-03-07): <https://www.decurity.io/research/yul-calldata-corruption-1inch-postmortem>
- BlockSec, "1inch Incident: From Calldata Corruption to Forged Settlement" (2025-03): <https://blocksec.com/blog/1inch-incident-from-calldata-corruption-to-forged-settlement-binary-exploitation-goes-on-chain>
- Cointelegraph, "Hacker of 1inch resolver returns stolen funds after negotiation, keeps bounty" (2025-03-07, updated 2025-03-08): <https://cointelegraph.com/news/1inch-loses-5m-hack-fusion-v1-smart-contract>
