# Tornado Cash governance attack — Ethereum — 2023-05-20

**Loss:** approximately $1M nominal (drained from the Tornado Cash governance treasury) — substantially-recovered when the attacker subsequently returned ~$890k to the community after the on-chain message-channel negotiation.
**OAK Techniques observed:** **OAK-T9.003** (Governance Attack — self-modifying-contract / hidden-malicious-proposal subclass) + **OAK-T9.004** (post-passage access-control privilege escalation through the malicious proposal's setup() function granting attacker 1.2M voting power) + **OAK-T16.005** (Malicious Proposal Snowballing — canonical anchor for the self-modifying-contract sub-shape; the case is the textbook T16.005 chain).
**Attribution:** **pseudonymous**; the attacker subsequently published a follow-up proposal (Proposal 21) that returned all attack-acquired voting power to a normal state and returned ~$890k of the extracted ETH and TORN to the community treasury, framed as an "I was demonstrating a vulnerability" position.
**Key teaching point:** **Self-modifying-contract proposals are a governance-attack subclass distinct from voting-power-accumulation governance attacks** (Beanstalk April 2022, Compound Vote Takeover July 2024 attempted) and from storage-collision governance attacks (Audius Jul 2022, Curio DAO Mar 2024). The Tornado Cash May 2023 case is the canonical case for the **proposal-payload-as-attack-vector** subclass: a proposal contract that appears to perform one function on the front-end UI but executes a different function (`setup()`-style privilege escalation) at on-chain execution time. Future T9.003 contributions should explicitly enumerate this subclass alongside voting-power-accumulation and storage-collision sub-classes.

## Summary

Tornado Cash's on-chain governance system (controlling the project's treasury and the Tornado Cash Pools' parameter-update authority) accepted proposals as deployed contracts whose execution was triggered by a successful vote. The proposal-execution flow assumed that proposals would do what their public description said they would do; the front-end UI displayed the proposal's stated function (in this case, an apparently-routine governance-treasury-management proposal), but the actual deployed proposal contract included a hidden `setup()`-style function that granted the proposer 1.2M voting power upon execution.

The attacker submitted Proposal 20 with the front-end-displayed-text describing it as a routine treasury proposal, the community voted on Proposal 20 based on the front-end-displayed text (the proposal received sufficient legitimate votes to pass), and at execution time the hidden setup() function ran and granted the proposer 1.2M voting power — sufficient to reach quorum on subsequent arbitrary proposals unilaterally. The attacker then submitted and self-passed Proposal 21 (transferring the governance treasury balance to the attacker), drained approximately $1M of treasury TORN and ETH, and exited.

The case is structurally important because it represents **the first major case on the public record of a governance-attack-via-hidden-proposal-payload** — the attacker did not need to acquire voting power before the attack; the attack was the mechanism by which voting power was acquired. The mitigation surface requires reading the actual deployed contract bytecode at proposal-creation time rather than trusting the front-end-displayed text, which is a discipline-in-practice not consistently implemented across DAO front-end implementations even at v0.1 cutoff.

The attacker subsequently returned ~$890k to the community via a follow-up proposal (Proposal 21-followup) that reset the voting-power state to pre-attack and transferred the extracted treasury back. The attacker's stated framing was "demonstrating a vulnerability"; whether this constitutes a whitehat-rescue outcome or a recover-the-stolen-funds-after-getting-caught outcome is debated in the public record.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-05-20 (early) | Attacker submits Proposal 20 with front-end-displayed text describing routine governance-treasury management | T9.003 (preparation) |
| 2023-05-20 (later) | Community votes on Proposal 20 based on front-end-displayed text; proposal passes with sufficient legitimate votes | (community response to mis-displayed proposal) |
| 2023-05-20 | Proposal 20 executes; hidden setup() function grants attacker 1.2M voting power | T9.003 + T9.004 (extraction; voting-power escalation) |
| 2023-05-20 | Attacker submits and self-passes Proposal 21; drains ~$1M of treasury TORN and ETH | T9.003 (extraction; governance-execution) |
| 2023-05-21 | Industry forensic posts (PeckShield, BlockSec, Tornado Cash community) publish on-chain trace | (forensic record) |
| 2023-05-26 | Attacker publishes Proposal 21-followup returning ~$890k of extracted funds and resetting voting-power state | M35 (whitehat-rescue-coordination broadly construed; debated framing) |
| 2023-05 onward | Tornado Cash community implements governance-improvement proposals to require contract-bytecode-display at proposal-creation time | (mitigation deployment) |

## What defenders observed

- **Pre-event (no proposal-bytecode-display in the front-end UI).** Tornado Cash's governance front-end displayed the proposal's stated text but did not display the actual deployed contract bytecode; this front-end design choice is the structural pre-incident root cause. Defenders auditing DAO governance front-end implementations should treat proposal-bytecode-display as a discrete UX-layer mitigation class.
- **At-event (proposal passed via legitimate community votes).** The proposal received enough legitimate community votes to pass at face value; the community did not perform the additional bytecode-audit step before voting. The case is canonical for the proposition that DAO-governance security depends on the worst-case voter's audit discipline, not the average-case voter's audit discipline.
- **Post-event (attacker-driven recovery via follow-up proposal).** The attacker's published follow-up proposal returned ~$890k and reset the voting-power state. The recovery-via-attacker-follow-up-proposal pattern is rare on the public record and has not recurred at scale post-2023.

## What this example tells contributors writing future Technique pages

- **Self-modifying-contract proposals are a discrete T9.003 subclass.** Future T9.003 contributions should explicitly enumerate this subclass alongside voting-power-accumulation (Beanstalk Apr 2022, Compound Vote Takeover Jul 2024) and storage-collision (Audius Jul 2022, Curio DAO Mar 2024) sub-classes.
- **Front-end displayed text is not a sufficient verification surface for proposal payload.** The mitigation requires bytecode-level reading at proposal-creation time. Future T9.003 contributions and OAK-M-class mitigation contributions should explicitly enumerate proposal-bytecode-display as a discrete UX-layer mitigation class.
- **Recovery-via-attacker-follow-up-proposal is a rare governance-specific recovery pattern.** Most T9 recovery cases route through M35 whitehat-rescue-coordination via off-chain on-chain-message-channel negotiation (Euler 2023, Tapioca 2024). The Tornado Cash case is one of the rare cases where the recovery itself was performed via the same governance mechanism that was attacked, which is a feature of governance protocols specifically and not generalisable to non-governance T9.x cases.

## Public references

- Tornado Cash community discussion and post-incident analysis — `[tornadocomm2023]`.
- PeckShield on-chain trace — `[peckshieldtornado2023]`.
- BlockSec function-level walkthrough — `[blocksectornadogov2023]`.
- SlowMist incident analysis — `[slowmisttornadogov2023]`.

## Citations

- `[tornadocomm2023]` — Tornado Cash community post-incident analysis and governance-improvement proposals.
- `[peckshieldtornado2023]` — PeckShield on-chain trace.
- `[blocksectornadogov2023]` — BlockSec function-level walkthrough.
- `[slowmisttornadogov2023]` — SlowMist incident analysis.
- `[zhou2023sok]` — academic taxonomy classifying this as a governance / proposal-payload-attack subclass of T9.003.
- `[ofac2022tornado]` — OFAC Tornado Cash designation; cross-reference for the broader Tornado-Cash-related context (the August 2022 OFAC SDN action against Tornado Cash precedes the May 2023 governance-attack incident; the two are structurally distinct events).

## Discussion

The Tornado Cash governance attack is the canonical case for the **self-modifying-contract proposal subclass** of T9.003 and is a useful framework-level reference for OAK contributors articulating the difference between governance-attack subclasses. The three documented T9.003 subclasses (voting-power-accumulation, storage-collision, self-modifying-contract) have distinct mitigation surfaces: voting-power-accumulation is mitigated by quorum-and-timelock design (OAK-M17), storage-collision is mitigated by storage-layout audit at fork-time (OAK-M16 + a discrete fork-substrate audit pass), and self-modifying-contract is mitigated by proposal-bytecode-display at proposal-creation time (a UX-layer mitigation that does not have a current OAK-M designation as of v0.1 and is a candidate for future OAK-M-class addition).

The pseudonymous-unattributed framing reflects per-incident attribution; the attacker's published follow-up proposal contained a brief on-chain-message that could be read as a whitehat framing or as a after-getting-caught recovery framing, with the public record divided between the two interpretations. The case is documented as `pseudonymous-unattributed` with the attribution-strength language reflecting the divided public record.

The OAK reference period note: the May 2023 governance attack precedes the August 2022 OFAC SDN action against Tornado Cash by several months in calendar time; the two events are structurally distinct and should not be conflated. The August 2022 OFAC action targeted the Tornado Cash mixer-protocol-as-laundering-venue; the May 2023 governance attack targeted the Tornado Cash on-chain-governance-treasury via the proposal-execution mechanism.
