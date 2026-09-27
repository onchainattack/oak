# Payy — a forged withdrawal rode inside an otherwise valid proven batch and the bridge paid out its whole balance — Payy Network (privacy stablecoin rollup) / Ethereum L1 bridge — 2026-09-24

**Loss:** **1,832,149.47 USDC** (some reporting: ~\$1.92M) — the **full balance** of Payy's Ethereum bridge contract (`0x367c1eaF14AA06b78ce76bd0243297de79d85270`), paid in one transaction at **04:21:23 UTC** (block 26044909), ~1.83M of it to `0xAa4985dBDaBfACa344237D40F7E06C4a0BB57E70`. Payy confirmed the funds were **users' non-custodial deposits**. The USDC was swapped to **~683 ETH** and split across three addresses. Payy **paused all network activity**, including deposits, withdrawals, transfers and card payments.

**OAK Techniques observed:** **OAK-T10.002** (Message-Verification Bypass — *primary, class provisional, mechanism undisclosed*. The payout came through the bridge's **`verifyRollup`** path. Researchers report the attacker **injected a fake burn message into the rollup's proven public inputs**, so a forged withdrawal was settled alongside legitimate ones in a batch the bridge accepted as verified. Payy has said its initial root-cause analysis is complete and **"it was NOT a compromised key, social engineering or exploit of our off-chain infrastructure,"** with a validated report pending from an audit firm. See [`techniques/T10.002-message-verification-bypass.md`](../techniques/T10.002-message-verification-bypass.md)). If the report places the defect in the proof system's constraints rather than the bridge's handling of public inputs, the mapping should move to **T9.014** (Protocol-Client Consensus Bug) alongside the Zcash Orchard under-constraint anchor.

**Explicitly not OAK-T10.001** on the operator's own statement.

**Attribution:** **pseudonymous.** Specter reports the attacker was funded via Railgun; unconfirmed.

**Key teaching point:** **A validity proof proves the statement it was built to prove, and the bridge must check that the statement is the one it cares about.** If the withdrawals a bridge pays are read from public inputs, then whatever binds those public inputs to the proven state transition *is* the bridge's security, and it is exactly as strong as that binding. Payy's report will say where the binding failed; the defensive rule holds regardless: **per-batch withdrawal caps and a delay on large exits** turn "drained of its full balance" into a bounded loss with a response window.

## Summary

At 04:21 UTC on 2026-09-24 Payy's Ethereum bridge paid its entire USDC balance — users' non-custodial deposits — to an attacker through its `verifyRollup` path, reportedly because a forged burn/withdrawal had been placed among the proven batch's public inputs. Payy paused the network, ruled out key compromise and off-chain infrastructure, and is validating a root-cause report with an audit firm.

## Timeline (UTC, 2026-09-24)

| When | Event | OAK ref |
|---|---|---|
| 04:21:23 | `verifyRollup` batch containing a forged withdrawal settles; bridge pays 1,832,149 USDC | **T10.002 (provisional)** |
| morning | Specter publishes on-chain analysis; USDC swapped to ~683 ETH, split across three addresses | (laundering) |
| 14:04 | Payy confirms exploit; network paused; law enforcement and exchanges notified | (response) |
| 09-25 → 26 | Payy: not a key compromise, social engineering or off-chain exploit; validated report pending | (operator disclosure) |

## Public references

- `[cryptotimespayy2026]` — The Crypto Times, "\$1.83 Million in USDC Leaves Payy Network's Ethereum Rollup Contract" (block, addresses, `verifyRollup`): <https://www.cryptotimes.io/2026/09/24/1-83-million-in-usdc-leaves-payy-networks-ethereum-rollup-contract/>
- `[unchainedpayy2026]` — Unchained, "Payy Rules Out a Compromised Key in \$1.92 Million Drain of Users' Deposits": <https://unchainedcrypto.com/payy-rules-out-a-compromised-key-in-1-92-million-drain-of-users-deposits/>
- `[payyrca2026]` — Payy on X, initial root-cause statement: <https://x.com/payy_link/status/2103537290425532889>
- `[cryptobriefingpayy2026]` — Crypto Briefing, "Payy Network halts operations after \$1.92M USDC exploit drains Ethereum rollup": <https://cryptobriefing.com/payy-network-halt-usdc-exploit-ethereum-rollup/>

Revision trigger: Payy's validated root-cause report.
