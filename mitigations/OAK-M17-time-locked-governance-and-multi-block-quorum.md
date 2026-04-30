# OAK-M17 — Time-Locked Governance and Multi-Block Quorum

**Class:** architecture
**Audience:** protocol, designer (governance)

**Maps to Techniques:** OAK-T9.003

## Description

OAK-M17 is the canonical defence against governance attacks (OAK-T9.003): a mandatory delay between a proposal passing and its execution (timelock), combined with voting-power computation that resists same-transaction acquisition (multi-block snapshot or time-averaged quorum), and capped by guardian-veto roles permitted to halt or revert malicious proposals during the timelock window. The architectural insight is that governance attacks compress the proposal lifecycle to a single transaction (Beanstalk: flash-loan-funded acquisition of ~67% STALK voting power, immediate `emergencyCommit` execution, treasury drain — all in one transaction). Forcing the lifecycle to span multiple blocks at the voting-power-snapshot layer breaks the flash-loan-funded acquisition path; forcing the lifecycle to span hours-to-days at the execution layer creates a window for human review, guardian veto, or community response.

The Beanstalk Farms case (~$182M loss, 2022-04) is the textbook chain M17 is designed to break: T9.002 (flash loan as precondition) → T9.003 (governance acquisition + emergencyCommit) → T7.001 (Tornado Cash laundering). M17 attacks each leg of the governance step independently: snapshot-based voting power makes the flash-loan-funded acquisition irrelevant (the attacker holds the tokens for one block, the snapshot was taken at proposal-creation block, so the acquisition contributes zero voting power); minimum proposal delay removes the same-transaction execution path; quorum-with-timelock ensures execution lags voting by enough wall-clock time for community response; guardian-veto roles preserve a human-in-the-loop kill switch during the timelock window without requiring on-chain voting to halt the proposal.

Snapshot-based voting power is the load-bearing component because it eliminates the flash-loan vector entirely. Compound's Governor Bravo checkpoint pattern is the canonical reference implementation: voting power for a proposal is computed against balances at the proposal-creation block, not at the proposal-execution block, so flash-loaned tokens released in the next block do not vote. Post-Beanstalk, large-scale T9.003 incidents are rarer at the top tier of DeFi precisely because of this design shift; smaller-protocol governance attacks remain common in protocols that did not adopt the pattern.

## How it applies

- **OAK-T9.003 (Governance Attack):** require flash-loan-resistant voting-power computation (snapshot at proposal-creation block; multi-block window where snapshot is impractical); enforce minimum delay between proposal submission, vote-end, and execution (timelock); remove emergency-execution paths that bypass the normal proposal lifecycle; designate guardian-veto roles permitted to halt or revert during the timelock window; treasury-touching proposals warrant longer timelocks than parameter-tuning proposals.

## Limitations

- M17 does not protect against governance attacks executed by genuinely-acquired voting power held over the snapshot window (an attacker who buys ~67% of governance tokens off-market and holds them through the snapshot is acquiring real voting authority; M17 is bypassed because the assumption that acquisition is flash-loan-funded does not hold).
- Timelock windows are themselves a coordination mechanism between protocol and users: too short and human review is impractical; too long and legitimate parameter changes (oracle updates, pause-unpause cycles) cannot respond to incident timelines. Calibration is protocol-specific and rarely revisited.
- Guardian-veto roles re-introduce centralisation that the governance design was meant to mitigate; a captured or absent guardian is an independent failure mode (governance contracts whose guardian-key is the same operator multisig that controls treasury have not really separated authority).
- Multi-block quorum without snapshot can be defeated by attackers who maintain voting power across the quorum window (e.g., by composing multiple governance-token-borrow positions across consecutive blocks). Snapshot-based voting power is structurally stronger than time-averaged voting power against flash-loan-style attacks.
- M17 has no effect against off-chain governance compromises (Discord-pinned-message manipulation, multisig-signer phishing on a guardian role, social-engineering of forum moderators). The on-chain governance contract is one defensive surface; the off-chain governance process is another.
- Smaller-protocol governance attacks frequently rely on emergency-execution paths that the protocol kept "for upgradeability" — the on-chain artefact is M17-compliant on the normal path but bypassable on the emergency path. M17 prescribes removing these paths or subjecting them to the same timelock-and-quorum discipline.

## Reference implementations

- Compound Governor Bravo — checkpoint-based voting-power snapshot; the dominant reference implementation widely forked across DeFi governance contracts.
- OpenZeppelin Governor — production governance contract framework with timelock, quorum, and snapshot support; the standard library implementation for new protocols.
- Snapshot.org — off-chain signal voting (mitigation rather than detection); reduces on-chain governance attack surface for non-binding decisions but is not a substitute for on-chain timelock on binding actions.
- Tally / Boardroom — governance-side observation dashboards; surface proposal queues and execution timelines for risk-team monitoring.
- Forta — governance-monitoring agents capable of alerting on flash-loan-funded acquisitions correlated with active proposals.

## Citations

- `[zhou2023sok]` — academic taxonomy classifying governance attacks within the broader smart-contract-exploit category.
- `[owaspscstop10]` — OWASP SC Top 10; access-control and protocol-logic categories cover the M17-relevant failure modes.
- See worked example for Beanstalk primary citations (`examples/2022-04-beanstalk.md`) — canonical T9.003 case M17 is designed to break.
