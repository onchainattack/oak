# zkLink Nova — the L1 Arbitrator did not clear a claimed message hash, so a public relayer's hash was reused to install a forged withdrawal root — zkLink Nova / Ethereum — 2026-10-29

**Loss:** **~\$783K** from the ZkLink and L1ERC20Bridge escrow contracts on Ethereum (SlowMist).

**OAK Techniques observed:** **OAK-T10.002** (Message-Verification Bypass — *primary*. Per SlowMist, `Arbitrator.claimMessage` did not clear the transient `finalizeMessageHash` or require a fresh authenticated callback per call. Through the publicly callable, authorised `SyncL2TxHashRelayer` the attacker first set a valid hash, then reused it with `EthereumGateway.sendMessage` as the claim target. That ran `ZkLink.syncBatchRoot` under the legitimate gateway identity, installed an attacker-chosen `l2LogsRootHashes` root, and the attacker withdrew with forged proofs. See [`techniques/T10.002-message-verification-bypass.md`](../techniques/T10.002-message-verification-bypass.md)). No key was compromised.

**Attribution:** **pseudonymous.**

**Key teaching point:** **Authentication that lives in transient state must be consumed when used.** One valid message authorised a second, different call because the "this message was verified" flag outlived the message.

## Summary

SlowMist flagged the exploit on 2026-10-29 with two Ethereum transactions. Attacker addresses [`0xaca0655a11200a80d33d0e48786317304cde5718`](https://etherscan.io/address/0xaca0655a11200a80d33d0e48786317304cde5718) and [`0xDAB137F390dF77caA97fd492540E973fd5e2F8c8`](https://etherscan.io/address/0xDAB137F390dF77caA97fd492540E973fd5e2F8c8); vulnerable Arbitrator [`0x1ee09a2caa0813a5183f90f5a6d0e4871f4c6002`](https://etherscan.io/address/0x1ee09a2caa0813a5183f90f5a6d0e4871f4c6002).

## Timeline (UTC)

Read it as three stages. **Flaw**: a message-verified flag that outlives the message. **Take**: populate a hash, reuse it to install a forged root, withdraw with forged proofs. **After**: nothing public beyond the alert. Times are from the SlowMist alert.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-29 (since when: undisclosed) | `Arbitrator.claimMessage` does not clear the transient `finalizeMessageHash` or require a fresh authenticated callback for each call. The `SyncL2TxHashRelayer` is publicly callable yet authorised, so anyone can populate a valid hash. | **T10.002** |
| Before the exploit (undisclosed) | Funding and preparation of the two attacker addresses are not published. | — |
| 2026-10-29 (before 02:41 UTC) | Through `SyncL2TxHashRelayer` the attacker first populates a valid message hash. | **T10.002** |
| 2026-10-29 (same sequence) | The attacker reuses the hash while substituting `EthereumGateway.sendMessage` as the claim target. This runs `ZkLink.syncBatchRoot` under the legitimate gateway identity and installs an attacker-chosen `l2LogsRootHashes` root. No key is compromised. | **T10.002** |
| 2026-10-29 (same sequence) | Using forged proofs against that root, the attacker withdraws about **\$783.1K** from the ZkLink and L1ERC20Bridge escrow contracts. SlowMist lists two Ethereum transactions, [`0x4f3c23e75b9134e8cae5a462550daad42fbbc19242567fcc34c0a035e297462c`](https://etherscan.io/tx/0x4f3c23e75b9134e8cae5a462550daad42fbbc19242567fcc34c0a035e297462c) and [`0x8a7e38b9c2a7a40981317ba87fbaa2e50527ec412cefc2fb4c9e3184f8848ae9`](https://etherscan.io/tx/0x8a7e38b9c2a7a40981317ba87fbaa2e50527ec412cefc2fb4c9e3184f8848ae9), without saying which step each is. | — |
| 2026-10-28 22:21:35 and 2026-10-29 01:43:11 | Traced by OAK: the two listed transactions are the withdrawals, the first from attacker 1 (22.43 ETH plus nine tokens) and the second from attacker 2 (216.4M ZKL). The first predates the alert by about four hours. | T10.002 |
| 2026-10-28 22:28 to 2026-10-29 05:53 | Traced by OAK: attacker 1 sells the tokens, spreads 303 ETH over three wallets and swaps it to DAI (about 702K DAI held by transfer events). Attacker 2 sells 22M of 216M ZKL on CoW Protocol and Uniswap V4. See Fund flow. | — |
| 2026-10-29 02:41:32 | SlowMist TI alert. No zkLink pause, statement, post-mortem or compensation plan appears in the cited sources: undisclosed. | response |

Key addresses:

- Attacker 1 (traced by OAK) — [`0xaca0655a11200a80d33d0e48786317304cde5718`](https://etherscan.io/address/0xaca0655a11200a80d33d0e48786317304cde5718)
- Attacker 2 (traced by OAK) — [`0xDAB137F390dF77caA97fd492540E973fd5e2F8c8`](https://etherscan.io/address/0xDAB137F390dF77caA97fd492540E973fd5e2F8c8)
- Victim (ZkLink) — [`0x5fd9f73286b7e8683bab45019c94553b93e015cf`](https://etherscan.io/address/0x5fd9f73286b7e8683bab45019c94553b93e015cf)
- Victim (L1ERC20Bridge) — [`0xad16edcf7deb7e90096a259c81269d811544b6b6`](https://etherscan.io/address/0xad16edcf7deb7e90096a259c81269d811544b6b6)
- Vulnerable contract (Arbitrator proxy) — [`0x1ee09a2caa0813a5183f90f5a6d0e4871f4c6002`](https://etherscan.io/address/0x1ee09a2caa0813a5183f90f5a6d0e4871f4c6002)
- Arbitrator implementation — [`0x7a0bb4805ecb7fd3c8dabbe4afa0e91cb1761e34`](https://etherscan.io/address/0x7a0bb4805ecb7fd3c8dabbe4afa0e91cb1761e34)
- Transaction 1 — [`0x4f3c23e75b9134e8cae5a462550daad42fbbc19242567fcc34c0a035e297462c`](https://etherscan.io/tx/0x4f3c23e75b9134e8cae5a462550daad42fbbc19242567fcc34c0a035e297462c)
- Transaction 2 — [`0x8a7e38b9c2a7a40981317ba87fbaa2e50527ec412cefc2fb4c9e3184f8848ae9`](https://etherscan.io/tx/0x8a7e38b9c2a7a40981317ba87fbaa2e50527ec412cefc2fb4c9e3184f8848ae9)
- DAI holding wallets (traced by OAK) — [`0x211b4aebefea02470587286b398ed28fb7e09c6a`](https://etherscan.io/address/0x211b4aebefea02470587286b398ed28fb7e09c6a), [`0x2d5a8aabf7af4022e314eb2a54753ba2402bafb0`](https://etherscan.io/address/0x2d5a8aabf7af4022e314eb2a54753ba2402bafb0), [`0x75dcf3395b6cbefc6b66b28d6d93f193b58dc0f3`](https://etherscan.io/address/0x75dcf3395b6cbefc6b66b28d6d93f193b58dc0f3)

## Fund flow

Ethereum leg, traced by OAK with `tools/explorer.py` (Blockscout, keyless) on 2026-10-30. Edges marked *traced by OAK* were checked on-chain. Counterfeit-token transfers were excluded (`trusted: false`: MSWETH, MSTETH in transaction 1; MMETH, rnETH, nETH, MWBETH in transaction 2). Only Ethereum is involved. The trace window ends on 2026-10-30 (about one day after the exploit, not three) because that is today.

```oak-flow
as_of: 2026-10-30T12:31Z
nodes:
  - {id: vzk, chain: ethereum, address: 0x5fd9f73286b7e8683bab45019c94553b93e015cf, role: victim, label: "ZkLink (escrow)"}
  - {id: vbr, chain: ethereum, address: 0xad16edcf7deb7e90096a259c81269d811544b6b6, role: victim, label: "zkLink Nova L1ERC20Bridge (escrow)"}
  - {id: f1, chain: ethereum, address: 0x4e5b2e1dc63f6b91cb6cd759936495434c7e972f, role: unknown, label: "Unlabelled funder of attacker 1"}
  - {id: f2, chain: ethereum, address: 0x5c7bcd6e7de5423a257d81b442095a1a6ced35c5, role: unknown, label: "Unlabelled funder of attacker 2"}
  - {id: a1, chain: ethereum, address: 0xaca0655a11200a80d33d0e48786317304cde5718, role: attacker-eoa, label: "Attacker 1"}
  - {id: a2, chain: ethereum, address: 0xdab137f390df77caa97fd492540e973fd5e2f8c8, role: attacker-eoa, label: "Attacker 2"}
  - {id: h1, chain: ethereum, address: 0x211b4aebefea02470587286b398ed28fb7e09c6a, role: attacker-holding, label: "DAI holding 1"}
  - {id: h2, chain: ethereum, address: 0x2d5a8aabf7af4022e314eb2a54753ba2402bafb0, role: attacker-holding, label: "DAI holding 2"}
  - {id: h3, chain: ethereum, address: 0x75dcf3395b6cbefc6b66b28d6d93f193b58dc0f3, role: attacker-holding, label: "DAI holding 3"}
  - {id: o1, chain: ethereum, address: 0x791a1cff9f9431ef98ca25c2e31ecb92a8ac2f25, role: intermediary, label: "Onward wallet (DAI)"}
  - {id: o2, chain: ethereum, address: 0xdf410542aa35dab5e1ff3f46fcbd671d5e243977, role: intermediary, label: "Onward wallet (DAI)"}
  - {id: o3, chain: ethereum, address: 0x685cca4082f5c89a17f0dc8820b1187f5e9dd9e3, role: intermediary, label: "Onward wallet (ETH)"}
  - {id: o4, chain: ethereum, address: 0x064e4a4f459341c5668eb9ce6fa5f2a715f7fb39, role: intermediary, label: "Onward wallet (ETH)"}
  - {id: o5, chain: ethereum, address: 0x05b38c2d3c66031d72c990753f464271a7fd6def, role: intermediary, label: "Onward wallet (ETH)"}
  - {id: o6, chain: ethereum, address: 0xc8b6530952474f10b26db8292e4b82ee82027799, role: intermediary, label: "Onward wallet (ETH)"}
  - {id: o7, chain: ethereum, address: 0x8f10b468b06c6fd214b65f87778827f7d113f996, role: dex, label: "High-volume swap executor (shared infrastructure)"}
  - {id: dex, chain: ethereum, role: dex, label: "Curve router / MetaMask Swaps / Uniswap routers"}
  - {id: cow, chain: ethereum, address: 0x9008d19f58aabd9ed0d60971565aa8510560ab41, role: dex, label: "CoW Protocol settlement"}
  - {id: uv4, chain: ethereum, address: 0x000000000004444c5dc75cb358380d2e3de08a90, role: dex, label: "Uniswap V4 PoolManager"}
  - {id: linea, chain: ethereum, address: 0xd19d4b5d358258f05d7b411e21a1460d11b0876f, role: bridge, label: "Linea L1 message service"}
edges:
  - {from: f1, to: a1, asset: ETH, amount: 0.02723853, tx: 0x72ada39754513281745e0feeaa19c48069f5505085e31b61b12a0a02e94832ad, time: 2026-10-28T15:49:11Z, verified: oak}
  - {from: f2, to: a2, asset: ETH, amount: 0.03997221, tx: 0xa33a8fa9d25549f161f2a6676d1c6de4ffd9728333c9a2a55889c0679a5e18de, time: 2026-09-18T12:17:59Z, verified: oak}
  - {from: a1, to: linea, asset: ETH, amount: 0.0021, tx: 0x931c4e40ab42d8af4ee235a0c332c5bda1a9d4816850b5e02fd2cc4547350d6d, time: 2026-10-28T17:49:11Z, verified: oak}
  - {from: vzk, to: a1, asset: ETH, amount: 22.43129453, tx: 0x4f3c23e75b9134e8cae5a462550daad42fbbc19242567fcc34c0a035e297462c, time: 2026-10-28T22:21:35Z, technique: T10.002, verified: oak}
  - {from: vbr, to: a1, asset: "9 tokens (PUFETH 245.73789885, EZETH 12.56925386, USDC 18113.448053, RSETH 6.8664716, STONE 6.29975064, WBTC 0.17360197, USDT 3360.898152, WSTETH 0.46595855, RSWETH 0.5)", tx: 0x4f3c23e75b9134e8cae5a462550daad42fbbc19242567fcc34c0a035e297462c, time: 2026-10-28T22:21:35Z, technique: T10.002, verified: oak}
  - {from: vbr, to: a2, asset: ZKL, amount: 216437891.95234516, tx: 0x8a7e38b9c2a7a40981317ba87fbaa2e50527ec412cefc2fb4c9e3184f8848ae9, time: 2026-10-29T01:43:11Z, technique: T10.002, verified: oak}
  - {from: a1, to: dex, asset: "PUFETH, USDC, WBTC, RSETH, STONE, USDT, RSWETH, WSTETH", tx: 0x123bd9627d3c06f73498bd466100a62d4f7db76783ef9cd5ce5906a1e4fe4460, time: 2026-10-28T22:28:47Z, tx_count: 8, time_last: 2026-10-28T22:44:47Z, verified: oak}
  - {from: a1, to: h1, asset: EZETH, amount: 12.56925386, tx: 0x764e91b6a46502634eee74ca5292e8cb84fa6aff444349989f2f74110eb3810e, time: 2026-10-28T22:55:35Z, verified: oak}
  - {from: a1, to: h1, asset: ETH, amount: 101, tx: 0x2522281fbc77a612193e78e27f8cddd8147c605759216b67ce40320b9c8ff56e, time: 2026-10-28T22:58:35Z, verified: oak}
  - {from: a1, to: h2, asset: ETH, amount: 100, tx: 0x5696e2178bf680110d927d9bf71bdf05fcc22a282ad8a15bbdb938e5f852de44, time: 2026-10-28T23:00:11Z, verified: oak}
  - {from: a1, to: h3, asset: ETH, amount: 102.06100317, tx: 0x04c207b1b0e181fa3aa6eb5f2ee35cdd629db5d706a555ac8e0e2a26c0b0e3bc, time: 2026-10-28T23:01:23Z, verified: oak}
  - {from: a1, to: h3, asset: DAI, amount: 32157.74568493, tx: 0x3cb9c99a328abdef151fa564ade95dc4d925227603ee3d1d09c91d3f7119d65c, time: 2026-10-28T23:03:59Z, verified: oak}
  - {from: h1, to: dex, asset: EZETH, amount: 12.56925386, tx: 0x10663233ddaed2a5358d7f83758bbac17aec952992f43066ea52205a2aca7cad, time: 2026-10-29T00:26:23Z, verified: oak}
  - {from: h1, to: dex, asset: ETH, amount: 100.9798326, tx: 0x204b007ada844fc3720e083cf61b1eb9ab1400e96c88fc3f7c577d20b974a90f, time: 2026-10-29T00:27:35Z, tx_count: 2, time_last: 2026-10-29T00:53:59Z, verified: oak}
  - {from: h2, to: dex, asset: ETH, amount: 99.8, tx: 0x3481da9ac3274c5e72331a2d798b5371a89d7f2391046ee95c18e58ee58fcac8, time: 2026-10-29T00:25:47Z, tx_count: 2, time_last: 2026-10-29T00:56:47Z, verified: oak}
  - {from: h3, to: dex, asset: ETH, amount: 102, tx: 0x2d1381a6a27c008f4e024b67884462d1c5e95a80a124f10e858f91ed1237e630, time: 2026-10-29T00:21:23Z, tx_count: 3, time_last: 2026-10-29T00:55:23Z, verified: oak}
  - {from: h2, to: o1, asset: DAI, amount: 5000, tx: 0x8f0796105a30c02fffe21ae8410217dbc385d653578ef2fa3445073356eec3e0, time: 2026-10-29T01:32:35Z, verified: oak}
  - {from: h2, to: dex, asset: DAI, amount: 16645, tx: 0x76c43e3a629d14993ad54d2d3732d2c4f652d22a3f6a9f1b7efcfb0581ee1d19, time: 2026-10-29T01:41:35Z, tx_count: 2, time_last: 2026-10-29T01:48:23Z, verified: oak}
  - {from: h2, to: o3, asset: ETH, amount: 2, tx: 0x264e2f3e1a5cdeab62a659f6f628dd6d3768cb3932084299994fadbc3ef4fcd0, time: 2026-10-29T01:43:23Z, verified: oak}
  - {from: h2, to: o4, asset: ETH, amount: 5, tx: 0x2b3020cfcb598bad80bc1f0bbcc58161d90c6552268cd3edf9b055ccb2afa5f3, time: 2026-10-29T01:49:59Z, verified: oak}
  - {from: h3, to: dex, asset: DAI, amount: 24000, tx: 0x266ead6668314e2a4cce5b842c99c0260f8ba1698cdb1230f208280dbddbd543, time: 2026-10-29T01:54:59Z, verified: oak}
  - {from: h3, to: o5, asset: ETH, amount: 5, tx: 0x8b6d9b0a7696857ae7b956e458a1999891dcd3f73236fc7d9a10703468fbe8c1, time: 2026-10-29T01:57:35Z, verified: oak}
  - {from: h3, to: o6, asset: ETH, amount: 5, tx: 0xc2199ed6e2f2664ef5ea88ac416b6cb16f2fea862e7acc07f155135efd037a38, time: 2026-10-29T02:01:59Z, verified: oak}
  - {from: h3, to: o2, asset: DAI, amount: 25000, tx: 0x7c6955ba4e2a9e954966975a3d63187784a75c092a7013de447260e6e1c9d3ff, time: 2026-10-29T02:08:35Z, verified: oak}
  - {from: a2, to: linea, asset: ETH, amount: 0.0021, tx: 0x684dc81ca8829e7c75f082177871438d79eadfc33632ab509db59b7593833482, time: 2026-10-28T22:38:35Z, verified: oak}
  - {from: a2, to: o7, asset: "UNIBTC, UNIETH, SWETH, GAL", tx: 0x1637dd9745d7732574b6a003cedefd8eb91ec3ba4237f9782f1a1ee48ff1a4f2, time: 2026-10-29T03:35:47Z, tx_count: 5, time_last: 2026-10-29T03:47:35Z, verified: oak}
  - {from: a2, to: cow, asset: ZKL, amount: 386411.81248362, tx: 0xcbb01b4a60393353af9218ca460c71cebb579532a13e486c7815632f43743f54, time: 2026-10-29T03:56:35Z, tx_count: 3, time_last: 2026-10-29T05:17:23Z, verified: oak}
  - {from: a2, to: uv4, asset: ZKL, amount: 21605148.01398615, tx: 0x5ec50be24bc186bd2efbeb43989bfdf55b30c774c3feb8c38cc0c97c256af869, time: 2026-10-29T05:53:35Z, verified: oak}
```

What the trace adds beyond the sources:

- **Timing.** Transaction 1 ran at **2026-10-28 22:21:35 UTC** and transaction 2 at **2026-10-29 01:43:11 UTC**. SlowMist's alert is dated 2026-10-29 02:41:32, so the first withdrawal came about four hours before the alert and a day earlier than the timeline's "2026-10-29" wording implied. Transaction 1 was sent by attacker 1 to `0xd5f162b68a0281686e8dc76db8d67d2f3e6aff07`; transaction 2 by attacker 2 to `0x61f4f8eda80a1138178ca81a2c0f70642fb6f402`. Both are withdrawals. The forged-root installation steps are not either of the two listed transactions.
- **What each took.** Transaction 1 took 22.43 ETH from ZkLink and nine tokens from the L1ERC20Bridge (listed in the first edge); two further transfers (MSWETH, MSTETH) are counterfeit and excluded. Transaction 2 took **216,437,891.95 ZKL** plus dust-sized amounts of about 30 long-tail tokens (UNIBTC, UNIETH, SWETH, GAL, USDE, MNT, COLON and others).
- **Attacker 1 liquidated within hours.** The wallet routed PUFETH, USDC, WBTC, RSETH, STONE, USDT, RSWETH and WSTETH through Curve and MetaMask Swaps routers between 22:28 and 22:44 UTC on 2026-10-28, then moved 303 ETH (proceeds, mostly from the PUFETH sale) to three fresh holding wallets. Those wallets swapped the ETH and EZETH into DAI between 00:21 and 00:56 UTC on 2026-10-29. By transfer events (not a live balance query) they hold **about 268,344 DAI, 211,963 DAI and 221,848 DAI** (about 702,155 DAI in total), which is consistent with SlowMist's ~\$783K once the smaller token sales and DAI already moved on are added. OAK does not convert amounts to dollars.
- **Attacker 2 sold only a fraction of the ZKL.** Of 216.44M ZKL it sold 386,412 on CoW Protocol and 21.6M into Uniswap V4. About **194.4M ZKL** (216,437,891.95 less the two sales) has not moved since, by transfer events. This is a limit, not a freeze.
- **Same operator, probably.** Both attackers sent exactly 0.0021 ETH to the Linea L1 message service on 2026-10-28 (at 17:49 and 22:38 UTC). Attacker 2 existed since 2026-09-18 and made small test transfers on 2026-09-23. Attacker 1 was first funded on 2026-10-28 15:49 UTC. Treat the common Linea step as a link, not proof.
- **Limits.** The six onward wallets in the graph (full addresses in the nodes) each received 2 to 25,000 of one asset and now hold nothing; they were not followed. The wallet `0x8f10b468b06c6fd214b65f87778827f7d113f996` received attacker 2's long-tail tokens but trades tens of thousands of dollars every few minutes on 2026-10-30, so it is probably a swap bot or aggregator-linked wallet, not an attacker wallet. It is not followed. Funding sources of both attackers are unlabelled and not followed further. No exchange deposit, mixer or freeze was observed in this window. No issuer or zkLink action is reported in the cited sources.

## Root-cause evidence

- **Technique:** OAK-T10.002
- **Source:** <https://x.com/SlowMist_Team/status/2115635114638250409>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist's trace analysis names the function, the reused transient hash, the relayer path and the forged root; no zkLink post-mortem yet.

## Public references

- `[slowmistzklink2026]` — SlowMist TI alert (2026-10-29): <https://x.com/SlowMist_Team/status/2115635114638250409>
- `[etherscanzklink2026]` — exploit transaction: <https://etherscan.io/tx/0x4f3c23e75b9134e8cae5a462550daad42fbbc19242567fcc34c0a035e297462c>
