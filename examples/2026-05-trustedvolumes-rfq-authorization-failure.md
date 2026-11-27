# TrustedVolumes — a custom RFQ swap proxy lets anyone register as an order signer and pull tokens from the inventory it holds unlimited approvals over — TrustedVolumes (1inch Fusion resolver) / Ethereum — 2026-05-07

**Loss:** **~\$5.87M** in one transaction across 1,291 WETH, 206,282 USDT, 16.939 WBTC and 1,268,771 USDC, per [rekt.news](https://rekt.news/trustedvolumes-rekt); Blockaid's first figure was about \$5.87M, with 1,291.16 WETH ([The Block](https://www.theblock.co/news/regulation/2026-05-06-1inch-trustedvolumes-exploit-400332)). TrustedVolumes later put the loss at about \$6.7M, held across three Ethereum addresses (about \$3M, about \$3M and about \$700K) ([Cointelegraph](https://cointelegraph.com/news/1inch-fusion-resolver-trusted-volumes-floats-bounty-after-67m-exploit)). No recovery is reported in the opened pages.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary*. `registerAllowedOrderSigner()` had no access control, and `fillOrder()` checked the signer against the attacker-controlled receiver rather than the inventory owner, per [rekt.news](https://rekt.news/trustedvolumes-rekt). See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). A broken replay guard (`saltStatus` written to one storage key and read from another) is recorded by rekt.news as a further defect, not as a separate Technique.

**Attribution:** **inferred-weak.** Blockaid says the attacker is the same entity behind the March 2025 exploit of 1inch Fusion V1, with a different vulnerability ([The Block](https://www.theblock.co/news/regulation/2026-05-06-1inch-trustedvolumes-exploit-400332)); a researcher cited by [Cointelegraph](https://cointelegraph.com/news/1inch-fusion-resolver-trusted-volumes-floats-bounty-after-67m-exploit) says the same. The earlier incident is [`2025-03-1inch-resolver.md`](2025-03-1inch-resolver.md). No identity is published.

**Key teaching point:** **A contract that holds unlimited token approvals over a treasury must authenticate who may spend, not only who signed: gate signer registration to the owner and check the order's maker, not the receiver.** The flaw needed no victim signature, per [rekt.news](https://rekt.news/trustedvolumes-rekt).

## Summary

TrustedVolumes is a liquidity provider and resolver in 1inch's Fusion ecosystem. Its custom RFQ swap proxy, which the team controlled and not a standard 1inch route, held unlimited ERC-20 approvals over the inventory ([rekt.news](https://rekt.news/trustedvolumes-rekt), [The Block](https://www.theblock.co/news/regulation/2026-05-06-1inch-trustedvolumes-exploit-400332)). The attacker registered itself as an allowed signer through a public function and filled orders naming the inventory as taker. Blockaid flagged the attack on 2026-05-06 (US time) while it was ongoing, and TrustedVolumes confirmed it on 2026-05-07. 1inch says its systems and user funds were not affected ([The Block](https://www.theblock.co/news/regulation/2026-05-06-1inch-trustedvolumes-exploit-400332), [Cointelegraph](https://cointelegraph.com/news/1inch-fusion-resolver-trusted-volumes-floats-bounty-after-67m-exploit)).

## Timeline (UTC)

Stages: **Flaw**, **Execution**, **Money**, **Response**. Exact transaction time is undisclosed in the opened pages. The Block's article was published 2026-05-06 22:04 EDT, which is 2026-05-07 02:04 UTC.

| When | What happened | OAK |
|---|---|---|
| Before 2026-05-07 | The inventory grants the RFQ proxy unlimited ERC-20 approvals; the implementation contract is unverified on Etherscan and no audit of it is disclosed ([rekt.news](https://rekt.news/trustedvolumes-rekt)) | **T9.004** (standing surface) |
| 2026-05-07 (time undisclosed) | The attacker calls `registerAllowedOrderSigner()`, a public function with no access control, to register a signer for its own maker contract ([rekt.news](https://rekt.news/trustedvolumes-rekt)) | **T9.004** |
| Same transaction ([`0xc5c61b3ac39d854773b9dc34bd0cdbc8b5bbf75f18551802a0b5881fcb990513`](https://etherscan.io/tx/0xc5c61b3ac39d854773b9dc34bd0cdbc8b5bbf75f18551802a0b5881fcb990513)) | Four `fillOrder()` calls: the signer is checked against the receiver, the taker field (set to the inventory) is used as the `from` address, and the replay guard does not stop the repeats; each call sends 1 wei of USDC to the inventory | **T9.004** |
| Same transaction and after | WETH is unwrapped and proceeds are forwarded from the exploit contract to two attacker EOAs; much was converted to ETH before TrustedVolumes confirmed ([rekt.news](https://rekt.news/trustedvolumes-rekt)) | — |
| 2026-05-06 (US evening) | Blockaid posts on X that the attack is ongoing; CertiK posted first per rekt.news, and SlowMist published a root-cause breakdown | response |
| 2026-05-07 (about 2.5 hours after, per rekt.news) | TrustedVolumes confirms, offers a bug bounty and says it is open to "constructive communication" ([Cointelegraph](https://cointelegraph.com/news/1inch-fusion-resolver-trusted-volumes-floats-bounty-after-67m-exploit)) | response |
| 2026-05-07 | 1inch calls reports linking it to the exploit misleading; says its systems and user funds were not affected | response |
| Undisclosed | Fund movement after consolidation; no recovery reported | undisclosed |

Key addresses (from [rekt.news](https://rekt.news/trustedvolumes-rekt)):

- Attacker EOA — [`0xC3EBDdEa4f69df717a8f5c89e7cF20C1c0389100`](https://etherscan.io/address/0xC3EBDdEa4f69df717a8f5c89e7cF20C1c0389100)
- Attacker EOA — [`0x61e6301614178A2cA21Bfa0FBB30ABa06ACC2D1c`](https://etherscan.io/address/0x61e6301614178A2cA21Bfa0FBB30ABa06ACC2D1c)
- Exploit contract — [`0xD4D5DB5EC65272B26F756712247281515F211E95`](https://etherscan.io/address/0xD4D5DB5EC65272B26F756712247281515F211E95)
- Vulnerable RFQ proxy — [`0xeEeEEe53033F7227d488ae83a27Bc9A9D5051756`](https://etherscan.io/address/0xeEeEEe53033F7227d488ae83a27Bc9A9D5051756)
- RFQ implementation (unverified) — [`0x88eb28009351Fb414A5746F5d8CA91cdc02760d8`](https://etherscan.io/address/0x88eb28009351Fb414A5746F5d8CA91cdc02760d8)
- TrustedVolumes inventory owner — [`0x9bA0CF1588E1DFA905eC948F7FE5104dD40EDa31`](https://etherscan.io/address/0x9bA0CF1588E1DFA905eC948F7FE5104dD40EDa31)

## Root-cause evidence

- **Technique:** OAK-T9.004
- **Source:** <https://rekt.news/trustedvolumes-rekt>; <https://www.theblock.co/news/regulation/2026-05-06-1inch-trustedvolumes-exploit-400332>; <https://cointelegraph.com/news/1inch-fusion-resolver-trusted-volumes-floats-bounty-after-67m-exploit>
- **Source type:** news
- **Confidence:** corroborated
- **Evidence:** rekt.news relays the CertiK, SlowMist and banteg analyses (a Foundry reproduction against a fork of block 25039669) of the three-defect chain; The Block and Cointelegraph independently relay Blockaid's and CertiK's description of the custom RFQ proxy and signer registration. TrustedVolumes has not published a root-cause statement in the opened pages. The loss differs by source: \$5.87M on-chain, \$6.7M per TrustedVolumes.

## Public references

- rekt.news, "TrustedVolumes - Rekt" (2026-05-14): <https://rekt.news/trustedvolumes-rekt>
- The Block, "1inch liquidity provider TrustedVolumes hit with ongoing exploit, draining nearly \$6 million: Blockaid" (2026-05-06): <https://www.theblock.co/news/regulation/2026-05-06-1inch-trustedvolumes-exploit-400332>
- Cointelegraph, "1inch Fusion resolver TrustedVolumes floats bounty after \$6.7M exploit" (2026-05-07): <https://cointelegraph.com/news/1inch-fusion-resolver-trusted-volumes-floats-bounty-after-67m-exploit>
