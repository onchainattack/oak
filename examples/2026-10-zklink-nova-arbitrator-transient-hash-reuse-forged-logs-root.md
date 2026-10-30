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
| After the withdrawal | Where the funds went after the attacker addresses is not published. | — |
| 2026-10-29 02:41:32 | SlowMist TI alert. No zkLink pause, statement, post-mortem or compensation plan appears in the cited sources: undisclosed. | response |

Key addresses:

- Attacker 1 — [`0xaca0655a11200a80d33d0e48786317304cde5718`](https://etherscan.io/address/0xaca0655a11200a80d33d0e48786317304cde5718)
- Attacker 2 — [`0xDAB137F390dF77caA97fd492540E973fd5e2F8c8`](https://etherscan.io/address/0xDAB137F390dF77caA97fd492540E973fd5e2F8c8)
- Victim (ZkLink) — [`0x5fd9f73286b7e8683bab45019c94553b93e015cf`](https://etherscan.io/address/0x5fd9f73286b7e8683bab45019c94553b93e015cf)
- Victim (L1ERC20Bridge) — [`0xad16edcf7deb7e90096a259c81269d811544b6b6`](https://etherscan.io/address/0xad16edcf7deb7e90096a259c81269d811544b6b6)
- Vulnerable contract (Arbitrator proxy) — [`0x1ee09a2caa0813a5183f90f5a6d0e4871f4c6002`](https://etherscan.io/address/0x1ee09a2caa0813a5183f90f5a6d0e4871f4c6002)
- Arbitrator implementation — [`0x7a0bb4805ecb7fd3c8dabbe4afa0e91cb1761e34`](https://etherscan.io/address/0x7a0bb4805ecb7fd3c8dabbe4afa0e91cb1761e34)
- Transaction 1 — [`0x4f3c23e75b9134e8cae5a462550daad42fbbc19242567fcc34c0a035e297462c`](https://etherscan.io/tx/0x4f3c23e75b9134e8cae5a462550daad42fbbc19242567fcc34c0a035e297462c)
- Transaction 2 — [`0x8a7e38b9c2a7a40981317ba87fbaa2e50527ec412cefc2fb4c9e3184f8848ae9`](https://etherscan.io/tx/0x8a7e38b9c2a7a40981317ba87fbaa2e50527ec412cefc2fb4c9e3184f8848ae9)

## Root-cause evidence

- **Technique:** OAK-T10.002
- **Source:** <https://x.com/SlowMist_Team/status/2115635114638250409>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist's trace analysis names the function, the reused transient hash, the relayer path and the forged root; no zkLink post-mortem yet.

## Public references

- `[slowmistzklink2026]` — SlowMist TI alert (2026-10-29): <https://x.com/SlowMist_Team/status/2115635114638250409>
- `[etherscanzklink2026]` — exploit transaction: <https://etherscan.io/tx/0x4f3c23e75b9134e8cae5a462550daad42fbbc19242567fcc34c0a035e297462c>
