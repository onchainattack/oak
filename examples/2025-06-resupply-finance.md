# Resupply Finance empty-market rounding-error — Ethereum — 2025-06-26

**Loss:** approximately $9.5M extracted from Resupply Finance lending markets on Ethereum mainnet.
**OAK Techniques observed:** **OAK-T9.005** (Reentrancy / arithmetic precision-loss class — empty-market rounding-error donation-attack subclass) + **OAK-T9.002** (flash-loan precondition).
**Attribution:** **pseudonymous-unattributed**; partial recovery via team-side white-hat-bounty negotiation channel (~$1M returned per operator post-mortem; remainder entered Tornado-Cash-and-equivalent laundering chains).
**Key teaching point:** **The empty-market rounding-error subclass continues to recur in 2025**. The Resupply June 2025 incident is structurally identical to the Hundred Finance April 2023 → Midas Capital 2023 → Sonne Finance May 2024 → Onyx Protocol November 2023 + September 2024 cohort cases — same Compound-v2-fork donation-attack pattern, same flash-loan funding, same fork-substrate-vulnerability-not-mitigated-at-fork-time meta-class. Resupply 2025 is the canonical 2025 cohort-anchor for the proposition that fork-substrate vulnerabilities recur indefinitely until the underlying upstream pattern is fixed at every downstream fork; defenders should treat fork-substrate vulnerability monitoring as a permanent operational discipline rather than a one-time audit task.

## Summary

Resupply Finance is a Curve-fork lending protocol that launched in early 2025 as a yield-aggregating lending market on top of Curve's stableswap pool composition. The protocol's lending-market accounting inherited the empty-market rounding-error pattern from the broader Compound-v2-fork lineage (the donation-attack class first weaponised at Hundred Finance April 2023): when a lending market has a sufficiently small total-supply, an attacker can donate-and-redeem in tight sequence to manipulate the per-share-redemption-rate, then borrow against an artificially-inflated collateral position with insufficient backing.

On June 26, 2025, an attacker used a flash loan to acquire flash-liquidity sufficient to execute the donation-and-redemption sequence against a small Resupply lending market, manipulated the per-share-redemption-rate to an artificially-inflated value, borrowed approximately $9.5M of stablecoin against the artificially-inflated collateral position, and exited via Tornado-Cash-and-equivalent laundering routes.

Resupply's operator team identified the exploit within hours, deployed emergency-pause to the affected markets, and published an on-chain message-channel bounty offer. The attacker negotiated a partial return of approximately $1M to Resupply's recovery multisig; the remainder of the extracted value entered laundering chains and is presumed unrecoverable. The case is the canonical 2025 cohort-anchor for the recurring empty-market rounding-error class.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2025-06-26 ~early UTC | Attacker acquires flash loan; executes donate-and-redeem sequence against small Resupply lending market | T9.002 + T9.005 (manipulation) |
| 2025-06-26 | Attacker borrows ~$9.5M stablecoin against artificially-inflated collateral position; exits to laundering chains | T9.005 (extraction) |
| 2025-06-26 (within hours) | Resupply team identifies the exploit; emergency-pauses affected markets | M34 (operator response) |
| 2025-06-26 to 2025-06-30 | Operator + attacker on-chain message-channel negotiation; ~$1M returned via partial-bounty | M35 (whitehat-rescue-coordination) |
| 2025-06-30 onwards | Remainder enters laundering chains; not recovered | T7.001 / T7.003 (laundering) |
| 2025-Q3 onwards | Resupply operator-side post-incident operations: contract-level fix deployed; cohort cross-references published; potential operator-funded compensation framework for affected users in development | (post-incident operations) |

## What defenders observed

- **Pre-event (cohort-pattern publicly documented).** The empty-market rounding-error subclass had been publicly documented across the Hundred / Midas / Sonne / Onyx cohort with detailed technical post-mortems; defenders performing audit-readiness review of any new Compound-v2-or-Curve-fork lending protocol launching in 2024-2025 had access to the cohort-pattern reference. The Resupply incident reflects that the audit-readiness-review process was either not performed at all or was insufficient to flag the donation-attack vector at protocol-launch time.
- **At-event (rapid forensic identification).** Industry forensic posts identified the empty-market rounding-error pattern within hours of the on-chain extraction event; the cohort-recognition was substantially faster than at the foundational Hundred Finance April 2023 incident (where the subclass was novel and required several days of cross-cohort analysis to articulate).
- **Post-event (operator-side recovery-via-negotiation).** Resupply's emergency-pause + on-chain-message-channel bounty offer follows the post-Euler-2023 operating norm and produced approximately 10% recovery via partial-bounty.

## What this example tells contributors writing future Technique pages

- **Empty-market rounding-error is a permanent fork-substrate-vulnerability class.** Future T9.005 contributions should explicitly enumerate this subclass as a permanent recurring class rather than a historical cohort. The pattern recurs across 2023 (Hundred, Midas), 2024 (Sonne, Onyx), and 2025 (Resupply); the underlying fork-substrate-vulnerability is in the Compound-v2-fork lineage and has not been universally fixed at every downstream fork.
- **Fork-substrate-vulnerability monitoring is a permanent operational discipline.** Defenders advising on protocol-launch audit-readiness should treat fork-substrate-vulnerability monitoring as a permanent operational discipline — every new lending-protocol fork in the Compound-v2-or-Curve-fork lineage should be subject to a fork-substrate-vulnerability audit pass at protocol-launch time, with the cohort-pattern reference (Hundred → Midas → Sonne → Onyx → Resupply) as the load-bearing input.
- **Cohort-pattern recognition latency improves over time.** Hundred Finance April 2023 required several days of cross-cohort analysis to articulate; Resupply June 2025 was identified within hours. Future T9.005 contributions documenting cohort-cases should track the cohort-recognition-latency metric as a measurable variable.

## Public references

- Resupply Finance operator-side post-mortem — `[resupplypostmortem2025]`.
- PeckShield on-chain trace and cumulative-loss aggregation — `[peckshieldresupply2025]`.
- BlockSec function-level walkthrough — `[blocksec_resupply2025]`.
- SlowMist incident analysis — `[slowmistresupply2025]`.
- Halborn defender-oriented post-mortem — `[halbornresupply2025]`.

## Citations

- `[resupplypostmortem2025]` — Resupply operator-side post-mortem and partial-bounty recovery framework.
- `[peckshieldresupply2025]` — PeckShield on-chain trace.
- `[blocksec_resupply2025]` — BlockSec function-level walkthrough.
- `[slowmistresupply2025]` — SlowMist incident analysis.
- `[halbornresupply2025]` — Halborn defender-oriented post-mortem.
- `[zhou2023sok]` — academic taxonomy classifying this as a flash-loan-enabled empty-market rounding-error attack.

## Discussion

Resupply Finance June 2025 is the canonical 2025 anchor for the **empty-market rounding-error / donation-attack** subclass of T9.005. The cohort framing across 2023-2025 (Hundred Apr 2023 → Midas 2023 → Onyx Nov 2023 → Sonne May 2024 → Onyx Sep 2024 → Resupply Jun 2025) gives the subclass a six-case multi-year structural articulation; defenders writing operator-cohort-attribution and protocol-launch audit-readiness review should treat the cohort as a recurring framework-level pattern rather than a historical-curiosity collection.

The mitigation surface composes across multiple OAK-M classes: OAK-M16 pre-deployment audit (with a discrete fork-substrate-vulnerability audit pass at protocol-launch time), OAK-M11 rate-limiting + per-block caps (to bound the per-block extraction velocity), OAK-M38 time-windowed withdrawal limits (to bound the per-window cumulative extraction), OAK-M34 emergency-pause (to limit detection-to-pause latency), and OAK-M39 cross-protocol watcher network (with empty-market-detection invariants tuned for Compound-v2-fork lending markets specifically).

The pseudonymous-unattributed framing is consistent with the broader cohort; none of the six cohort cases have produced confirmed-attribution outcomes. The cohort represents a steady source of attacker-cohort revenue at the OAK-G02-class operator-substrate level rather than at the OAK-G01-or-G05-class operator-substrate level; future industry forensic-cluster-attribution may produce stronger attribution if a future arrest or DOJ action explicitly addresses cohort-level operator-of-record.
