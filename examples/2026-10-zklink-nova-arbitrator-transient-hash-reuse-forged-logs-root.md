# zkLink Nova — the L1 Arbitrator did not clear a claimed message hash, so a public relayer's hash was reused to install a forged withdrawal root — zkLink Nova / Ethereum — 2026-10-29

**Loss:** **~\$783K** from the ZkLink and L1ERC20Bridge escrow contracts on Ethereum (SlowMist).

**OAK Techniques observed:** **OAK-T10.002** (Message-Verification Bypass — *primary*. Per SlowMist, `Arbitrator.claimMessage` did not clear the transient `finalizeMessageHash` or require a fresh authenticated callback per call. Through the publicly callable, authorised `SyncL2TxHashRelayer` the attacker first set a valid hash, then reused it with `EthereumGateway.sendMessage` as the claim target. That ran `ZkLink.syncBatchRoot` under the legitimate gateway identity, installed an attacker-chosen `l2LogsRootHashes` root, and the attacker withdrew with forged proofs. See [`techniques/T10.002-message-verification-bypass.md`](../techniques/T10.002-message-verification-bypass.md)). No key was compromised.

**Attribution:** **pseudonymous.**

**Key teaching point:** **Authentication that lives in transient state must be consumed when used.** One valid message authorised a second, different call because the "this message was verified" flag outlived the message.

## Summary

SlowMist flagged the exploit on 2026-10-29 with two Ethereum transactions. Attacker addresses `0xaca0…5718` and `0xDAB1…F8c8`; vulnerable Arbitrator `0x1ee0…6002`.

## Root-cause evidence

- **Technique:** OAK-T10.002
- **Source:** <https://x.com/SlowMist_Team/status/2115635114638250409>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist's trace analysis names the function, the reused transient hash, the relayer path and the forged root; no zkLink post-mortem yet.

## Public references

- `[slowmistzklink2026]` — SlowMist TI alert (2026-10-29): <https://x.com/SlowMist_Team/status/2115635114638250409>
- `[etherscanzklink2026]` — exploit transaction: <https://etherscan.io/tx/0x4f3c23e75b9134e8cae5a462550daad42fbbc19242567fcc34c0a035e297462c>
