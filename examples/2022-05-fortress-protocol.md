# Fortress Protocol flash-loan governance vote manipulation — 2022-05

**Loss:** **~$3M** extracted from Fortress Protocol on BNB Chain via a same-transaction flash-loan governance attack on 2022-05-08. The attacker borrowed FTS governance tokens via a direct flash loan from the FTS DEX liquidity pool, used the temporary voting power to pass a malicious proposal draining the protocol's treasury, and repaid the flash loan — all atomically within a single transaction.
**OAK Techniques observed:** **OAK-T12.005** (Flash-Loan Governance Vote Manipulation) — canonical same-transaction direct-borrow anchor. Unlike Elephant Money's two-hop acquisition (flash-loaned BNB → governance tokens), Fortress Protocol's FTS token had sufficient DEX liquidity to borrow a quorum directly via flash loan — the simplest and most direct T12.005 sub-pattern.
**Attribution:** **unattributed** — no public attribution at v0.1 cutoff.

**Key teaching point:** Fortress Protocol is the canonical direct-borrow T12.005 sub-pattern: when the governance token has sufficient DEX liquidity to reach quorum in a single flash loan, the attack is structurally simpler — one borrow, one proposal, one drain, one repay. The detection signal is the cleanest possible T12.005 match: same-address flash-loan recipient and governance-proposal creator, same-transaction novel governance-stake acquisition and zero-balance exit.

## Summary

On 2022-05-08, Fortress Protocol — a DeFi lending and yield protocol on BNB Chain — was exploited for approximately $3M. The attacker used a PancakeSwap flash swap to borrow FTS governance tokens directly from the FTS/BNB liquidity pool in sufficient quantity to meet or exceed the governance quorum threshold.

With the temporarily acquired FTS balance, the attacker created and executed a governance proposal that modified the protocol's treasury-withdrawal authorisation, drained the treasury to an attacker-controlled address, and repaid the flash loan — all within a single atomic transaction. The attacker's FTS balance before and after the transaction was zero; the governance power existed only for the duration of the transaction's execution.

The attack exploited three structural vulnerabilities: (1) governance voting power measured via current `balanceOf` rather than a prior-block snapshot (`getPriorVotes` or equivalent); (2) zero or bypassable timelock between proposal creation and execution; (3) FTS DEX liquidity exceeding the governance quorum threshold.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-05-08 | Attacker flash-loans FTS governance tokens, creates + executes malicious proposal, drains ~$3M | T12.005 (direct-borrow flash-loan governance attack) |

## Public references

- Fortress Protocol post-incident announcement (Twitter/X, 2022-05-08).
- CertiK / PeckShield incident analysis (2022-05-08).
- BNB Chain transaction tracing: flash-loan path and governance-event correlation.
