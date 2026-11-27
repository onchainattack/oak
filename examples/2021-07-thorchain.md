# THORChain — Bifrost credited deposits that were not real (ETH router) — THORChain / Ethereum — 2021-07-16 and 2021-07-22

**Loss:** two ETH-router exploits in July 2021. The first is given as about \$4.9M by [THORChain's weekly dev update 99](https://blog.thorchain.org/weekly-dev-update-99) and by [Halborn](https://halborn.com/explained-the-thorchain-hack-july-2021/), and as about 4,200 ETH by [THORChain's post-mortem](https://blog.thorchain.org/post-mortem-eth-router-exploits-1-2-and-premature-return-to-trading-incident), whose heading for it says "~$8m". The second is about \$8M per [CoinDesk](https://www.coindesk.com/markets/2021/07/23/blockchain-protocol-thorchain-suffers-8m-hack), with the token amounts listed in the [post-mortem](https://blog.thorchain.org/post-mortem-eth-router-exploits-1-2-and-premature-return-to-trading-incident). **No source opened reports any of the stolen funds returned.** The post-mortem says "The THORChain treasury will cover all losses to LPs. Nodes are not affected."

**OAK Techniques observed:** **OAK-T10.002.001** (Off-chain Observer Source-Event Forgery — *primary*). THORChain's Bifrost node component, the off-chain observer that decides a deposit happened on Ethereum, accepted attacker-authored data as a deposit. In exploit 1 it read `msg.value` instead of the deposit event ([dev update 99](https://blog.thorchain.org/weekly-dev-update-99), [post-mortem](https://blog.thorchain.org/post-mortem-eth-router-exploits-1-2-and-premature-return-to-trading-incident)). In exploit 2 a fake router and fake Asgard vault produced a deposit event with a malicious memo that Bifrost treated as a normal deposit and refunded ([post-mortem](https://blog.thorchain.org/post-mortem-eth-router-exploits-1-2-and-premature-return-to-trading-incident), [Rekt](https://rekt.news/thorchain-rekt2)). See [`techniques/T10.002.001-off-chain-observer-source-event-forgery.md`](../techniques/T10.002.001-off-chain-observer-source-event-forgery.md). Also **OAK-T9.005** (Reentrancy) for the separate 2021-07-09 whitehat find, an ERC-777 hook that triggered a secondary deposit ([post-mortem of the router upgrade](https://blog.thorchain.org/post-mortem-eth-router-upgrade)).

**Attribution:** **unattributed.** No source opened names the actors. THORChain's own tweet, reported by [CoinDesk](https://www.coindesk.com/markets/2021/07/23/blockchain-protocol-thorchain-suffers-8m-hack), described the second attacker as having deliberately limited their impact and as seemingly a whitehat; that is the protocol's characterisation, not a finding. The post-mortem says the exploit-2 attack wallet was spawned from Tornado Cash.

**Key teaching point:** **A bridge observer must credit a deposit from the state it can verify, not from fields the depositor can write.** Both exploits worked because Bifrost took a value or an event the attacker controlled (a `msg.value` set by a wrapper contract, a deposit event emitted by a fake router) as proof of funds received. The fix THORChain gave for exploit 1 was to read only the deposit event for a deposit action ([post-mortem](https://blog.thorchain.org/post-mortem-eth-router-exploits-1-2-and-premature-return-to-trading-incident)).

## Summary

THORChain is a cross-chain liquidity network whose Bifrost component watches external chains and whose ETH router contract takes deposits on Ethereum. On 2021-07-09 a whitehat found an ERC-777 re-entrancy in the router and the team rescued the funds to the THORStarter deployer account ([router upgrade post-mortem](https://blog.thorchain.org/post-mortem-eth-router-upgrade)). On 2021-07-16 THORChain detected an exploit of Bifrost and paused trading ([dev update 99](https://blog.thorchain.org/weekly-dev-update-99)). On 2021-07-22 a second attack through a fake router drained ERC-20 assets; [Rekt](https://rekt.news/thorchain-rekt2) says its observation began at 21:42 GMT that day and that THORChain first believed only about \$800k had been lost to a whitehat. A later premature return to trading while the ETH balance was wrong left the network insolvent; the post-mortem puts the insolvency at roughly \$16m.

An earlier version of this file described a cluster of three incidents ending with a "ChefDAO" exploit on 2021-08-12, a returned 10% bounty and a non-prosecution outcome. No page opened in the 2026-11 source pass supports those claims, and they are removed.

## Timeline (UTC)

Stages: **Flaw** (Bifrost trusts attacker-written deposit data), **Take** (two exploits), **Money** (what the sources say about it), **Response**. The sources give dates by day only; exact times are undisclosed unless shown.

| When | What happened | OAK |
|---|---|---|
| 2021-07-09 | A whitehat finds an ERC-777 hook in the router that triggers a secondary deposit; recursive deposits could raise the member's allowance to the full router balance. THORChain works with them to rescue the funds to the THORStarter deployer account ([post-mortem](https://blog.thorchain.org/post-mortem-eth-router-upgrade)) | T9.005 |
| Before 2021-07-16 | Bifrost's override of the transaction value, meant only for the `vaultTransferEvent` router function, applies to any router call ([dev update 99](https://blog.thorchain.org/weekly-dev-update-99)) | **T10.002.001** |
| Before 2021-07-16 (time undisclosed) | The attacker deploys a contract in front of the router. It sends `msg.value` 200 and calls the router with call value 0 and deposit amount 0; Bifrost reads 200. Repeated, this drains pools; the post-mortem says about 4,200 ETH ([dev update 99](https://blog.thorchain.org/weekly-dev-update-99), [post-mortem](https://blog.thorchain.org/post-mortem-eth-router-exploits-1-2-and-premature-return-to-trading-incident)) | **T10.002.001** |
| 2021-07-16 | THORChain detects the exploit and pauses trading; release 0.60.1 stops all outbound ETH-chain transactions ([dev update 99](https://blog.thorchain.org/weekly-dev-update-99)) | response |
| 2021-07-22 | The attacker deploys a fake router and a fake Asgard vault, calls `returnVaultAssets()` with a small amount of ETH, and the fake vault produces a deposit event with a malicious memo. Bifrost treats it as a deposit and refunds the attacker. Six transactions listed below ([post-mortem](https://blog.thorchain.org/post-mortem-eth-router-exploits-1-2-and-premature-return-to-trading-incident), [Rekt](https://rekt.news/thorchain-rekt2)) | **T10.002.001** |
| 2021-07-22 | THORChain says ETH trading is halted until audit partners review it, and that ERC-20 pool LPs will be subsidised ([CoinDesk](https://www.coindesk.com/markets/2021/07/23/blockchain-protocol-thorchain-suffers-8m-hack)) | response |
| After 2021-07-22 (date undisclosed) | A store migration meant to correct the ETH balance, then trading is enabled before the ETH price updates; arbitrage empties the remaining ETH and the network is insolvent. The post-mortem calls the upgrade "not adequately war-gamed" ([post-mortem](https://blog.thorchain.org/post-mortem-eth-router-exploits-1-2-and-premature-return-to-trading-incident)) | response |
| 2021-07-30 | Post-mortem published with a five-part recovery plan: audits by Trail of Bits and Halborn, a bounty, a red team, monitoring (solvency checker, 25-minute node timeout, outbound throttling), insurance. Insolvency cover: one-third treasury, one-third an Iron Bank loan, one-third arbitrage ([post-mortem](https://blog.thorchain.org/post-mortem-eth-router-exploits-1-2-and-premature-return-to-trading-incident)) | response |
| Onward from exploit 2 | Where the stolen assets went: undisclosed in the sources opened. [Rekt](https://rekt.news/thorchain-rekt2) says the attacker "left most of the loot behind" | — |

Key addresses (all from the [post-mortem](https://blog.thorchain.org/post-mortem-eth-router-exploits-1-2-and-premature-return-to-trading-incident), repeated by [Rekt](https://rekt.news/thorchain-rekt2) for exploit 2):

- Exploit 1 attacker wallet — [`0x3a196410a0f5facd08fd7880a4b8551cd085c031`](https://etherscan.io/address/0x3a196410a0f5facd08fd7880a4b8551cd085c031)
- Exploit 1 contract — [`0x4a33862042d004d3fc45e284e1aafa05b48e3c9c`](https://etherscan.io/address/0x4a33862042d004d3fc45e284e1aafa05b48e3c9c)
- Tornado address named in the post-mortem — [`0x4b713980d60b4994e0aa298a66805ec0d35ebc5a`](https://etherscan.io/address/0x4b713980d60b4994e0aa298a66805ec0d35ebc5a)
- Exploit 2 fake router — [`0xc145990e84155416144c532e31f89b840ca8c2ce`](https://etherscan.io/address/0xc145990e84155416144c532e31f89b840ca8c2ce)
- Exploit 2 fake vault — [`0xf56cba49337a624e94042e325ad6bc864436e370`](https://etherscan.io/address/0xf56cba49337a624e94042e325ad6bc864436e370)
- Exploit 2 attack contract — [`0x700196e226283671a3de6704ebcdb37a76658805`](https://etherscan.io/address/0x700196e226283671a3de6704ebcdb37a76658805)
- Exploit 2 attack wallet (spawned from Tornado Cash) — [`0x8c1944fac705ef172f21f905b5523ae260f76d62`](https://etherscan.io/address/0x8c1944fac705ef172f21f905b5523ae260f76d62)
- Exploit 2 last attacker address, token transfers — [`0xd95e6eab231b9f3afa24c31c7050bd84c2982072`](https://etherscan.io/address/0xd95e6eab231b9f3afa24c31c7050bd84c2982072)

Exploit 2 transactions:

1. [`0x10352e6ec052771a92f05f93e037e066873f64bb502d4488726697987f054595`](https://etherscan.io/tx/0x10352e6ec052771a92f05f93e037e066873f64bb502d4488726697987f054595)
2. [`0x1c6ef4d5122f1287085097ac37df076d43f389bfc62a1bdfcd3163254b5fe94a`](https://etherscan.io/tx/0x1c6ef4d5122f1287085097ac37df076d43f389bfc62a1bdfcd3163254b5fe94a)
3. [`0x0b39a878f1bf3daa78be149222dd8e5fa3e37b54d0451872b3d7a2cbf7f070e2`](https://etherscan.io/tx/0x0b39a878f1bf3daa78be149222dd8e5fa3e37b54d0451872b3d7a2cbf7f070e2)
4. [`0x01f38f17ba838b54350f8e2a2bd54fcdd9cf3c45fa1d2a735f5311507671be9e`](https://etherscan.io/tx/0x01f38f17ba838b54350f8e2a2bd54fcdd9cf3c45fa1d2a735f5311507671be9e)
5. [`0xa89d90f300fed8d1d987dec86d0d628f31ffd2d8aefdd857ad90151084531d4c`](https://etherscan.io/tx/0xa89d90f300fed8d1d987dec86d0d628f31ffd2d8aefdd857ad90151084531d4c)
6. [`0x9db403ad39d3fe78de378af0b49f03d244326662f7fee230db87d12a624f564b`](https://etherscan.io/tx/0x9db403ad39d3fe78de378af0b49f03d244326662f7fee230db87d12a624f564b)

Assets taken in exploit 2, per the [post-mortem](https://blog.thorchain.org/post-mortem-eth-router-exploits-1-2-and-premature-return-to-trading-incident): 966.62 ALCX, 20,866,664.53 XRUNE, 1,672,794.010 USDC, 56,104 SUSHI, 6.91 YFI and 990,137.46 USDT. [Rekt](https://rekt.news/thorchain-rekt2) also reports a separate follow-on drain of RUNE holders through the RUNE token's use of `tx.origin` in `transferTo`.

## Root-cause evidence

- **Technique:** OAK-T10.002.001
- **Source:** <https://blog.thorchain.org/weekly-dev-update-99>; <https://blog.thorchain.org/post-mortem-eth-router-exploits-1-2-and-premature-return-to-trading-incident>; <https://rekt.news/thorchain-rekt2>
- **Source type:** operator
- **Confidence:** corroborated
- **Evidence:** The operator's dev update and post-mortem state the mechanism for both exploits (Bifrost read `msg.value`; a fake router and vault produced a deposit event with a malicious memo). [Rekt](https://rekt.news/thorchain-rekt2) and [Halborn](https://halborn.com/explained-the-thorchain-hack-july-2021/) independently describe the same mechanisms. Dollar figures differ between sources (about \$4.9M and "~$8m" for exploit 1); exact exploit-1 transactions and date are not given on the pages opened.

## Public references

- THORChain, "Weekly dev update 99": <https://blog.thorchain.org/weekly-dev-update-99>
- THORChain, "Post-mortem: ETH Router Exploits 1 & 2, and premature Return To Trading Incident" (2021-07-30): <https://blog.thorchain.org/post-mortem-eth-router-exploits-1-2-and-premature-return-to-trading-incident>
- THORChain, "Post-mortem: ETH Router Upgrade" (2021-07-14): <https://blog.thorchain.org/post-mortem-eth-router-upgrade>
- Rekt, "THORChain - REKT 2" (2021-07-26): <https://rekt.news/thorchain-rekt2>
- CoinDesk, "Blockchain Protocol Thorchain Suffers $8M Hack" (2021-07-22, updated 2021-09-14): <https://www.coindesk.com/markets/2021/07/23/blockchain-protocol-thorchain-suffers-8m-hack>
- Halborn, "Explained: The THORChain Hack (July 2021)" (2021-07-20): <https://halborn.com/explained-the-thorchain-hack-july-2021/>
