# Resupply Finance wstUSR empty-market donation exploit — Ethereum — 2025-06-26

**Loss:** approximately \$9.5M-\$9.6M extracted from Resupply Finance's wstUSR lending market on Ethereum mainnet on 2025-06-26 at approximately 01:53 UTC. Resupply is a CDP / yield-aggregating lending protocol associated with the Curve / Convex / Yearn ecosystem cluster; the drained surface was specifically the wstUSR market integrating Resolv Labs's wstUSR yield-token via a CurveLend pair using a cvcrvUSD synthetic stablecoin pricing path.
**Recovery:** **partial via on-chain bounty negotiation**. Per the operator post-incident statement and BlockSec / SlowMist forensic threads, the attacker engaged with Resupply's on-chain message-channel bounty offer and returned approximately \$1M to the protocol's recovery multisig over the days following the incident; the residual ~\$8.5M was routed through Tornado Cash and is presumed unrecoverable. A subsequent **Singapore court order** was filed in connection with downstream operator-cluster disputes between Resupply and adjacent ecosystem participants (the Curve / Resolv ecosystem). There is no public DOJ / civil-forfeiture action against the attacker.
**OAK Techniques observed:** **OAK-T9.005** (Reentrancy / arithmetic precision-loss class — empty-market rounding-error donation-attack subclass) + **OAK-T9.002** (flash-loan precondition) + **OAK-T7.001** (Mixer-Routed Hop — residual ~\$8.5M was routed through Tornado Cash). The specific failure was an **empty ERC4626 wrapper used as a price oracle** in the CurveLend pair; the attacker donated 2 crvUSD to the empty wrapper, manipulating the per-share exchange rate, then borrowed ~10M reUSD against artificially-inflated collateral + **OAK-T9.007** (Fork-Substrate Vulnerability — Not Mitigated at Fork Time).
**Attribution:** **pseudonymous-unattributed**. The attacker funded the exploit wallet via Tornado Cash at 01:50:11 UTC — three minutes before the first attack transaction — and returned to Tornado Cash for the unreturned portion. No industry forensic provider has produced a named-individual claim; same-cluster correlation across the funding hop and laundering hop is the strongest forensic signal.
**Key teaching point:** **The empty-market rounding-error subclass continues to recur in 2025**, now with a yield-token-integration variant. The Resupply June 2025 incident is structurally identical to the Hundred Finance April 2023 → Midas Capital 2023 → Sonne Finance May 2024 → Onyx Protocol November 2023 + September 2024 → zkLend February 2025 cohort cases — same donation-attack pattern, same flash-loan funding, same fork-substrate-vulnerability-not-mitigated-at-fork-time meta-class — but extended in the Resupply case from the canonical Compound-v2 cToken substrate to the **ERC4626 vault-wrapper substrate** used as a price oracle. Resupply 2025 is the canonical 2025 cohort-anchor for the proposition that fork-substrate vulnerabilities recur indefinitely until the underlying upstream pattern is fixed at every downstream fork *and* across every adjacent vault-wrapper integration; defenders should treat fork-substrate vulnerability monitoring as a permanent operational discipline rather than a one-time audit task, and should extend it explicitly to ERC4626-wrapper-as-oracle integrations.

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

- **Pre-event (cohort-pattern publicly documented).** The empty-market rounding-error subclass had been publicly documented across the Hundred / Midas / Sonne / Onyx / zkLend cohort with detailed technical post-mortems; defenders performing audit-readiness review of any new Compound-v2-or-Curve-fork lending protocol launching in 2024-2025 had access to the cohort-pattern reference. The Resupply incident reflects that the audit-readiness-review process was either not performed at all or was insufficient to flag the donation-attack vector at protocol-launch time, and specifically did not extend the cohort-pattern reference to the ERC4626-wrapper-as-oracle integration substrate.
- **At-event (rapid forensic identification across multiple investigators).** The detection chain ran in parallel across at least four independent providers within the first hour. **BlockSec PhalconHQ** flagged the anomalous flow at the on-chain extraction event and published the function-level walkthrough. **PeckShield** issued the cumulative-loss aggregation and laundering-trace headline. **SlowMist** attached the funding-source tracking — identifying the Tornado Cash funding hop at 01:50:11 UTC, three minutes before the first attack transaction. **QuillAudits** published a same-day analytical breakdown of the donation-attack mechanics specific to the empty ERC4626 wrapper. The cohort-recognition was substantially faster than at the foundational Hundred Finance April 2023 incident (where the subclass was novel and required several days of cross-cohort analysis to articulate); by 2025 the empty-market donation pattern was a same-hour signal.
- **At-event (independent investigator engagement).** Beyond the formal forensic providers, the incident was tracked in real time by independent on-chain investigators on X / Twitter; the wstUSR market identification, the donation transaction hash, and the cvcrvUSD pricing path were published in pseudonymous-investigator threads alongside the formal forensic write-ups, producing a richer detection surface than the formal-provider channel alone.
- **Post-event (operator-side recovery-via-negotiation).** Resupply's emergency-pause + on-chain-message-channel bounty offer follows the post-Euler-2023 operating norm and produced approximately 10% recovery via partial-bounty (~\$1M returned). The recovery rate sits in the realistic 10-30% band for cases where negotiation surface is engaged, consistent with the zkLend February 2025 (~20%) and Loopscale April 2025 (~50%) parallel cases.
- **Post-event (downstream ecosystem dispute).** The Resupply incident produced a documented downstream operator-cluster dispute that culminated in a **Singapore court order** filed between Resupply / Curve / Resolv-adjacent ecosystem participants. The dispute is structurally distinct from the on-chain incident itself; it reflects the contractual and operational entanglement between the integrating protocols (Resupply consuming Resolv's wstUSR through Curve's CurveLend infrastructure) and is one of the cleaner 2025 examples of a DeFi exploit producing legal-process spillover into the operator-of-record cluster relationships, even when the attacker remains pseudonymous.

## What this example tells contributors writing future Technique pages

- **Empty-market rounding-error is a permanent fork-substrate-vulnerability class.** Future T9.005 contributions should explicitly enumerate this subclass as a permanent recurring class rather than a historical cohort. The pattern recurs across 2023 (Hundred, Midas), 2024 (Sonne, Onyx), and 2025 (Resupply); the underlying fork-substrate-vulnerability is in the Compound-v2-fork lineage and has not been universally fixed at every downstream fork.
- **Fork-substrate-vulnerability monitoring is a permanent operational discipline.** Defenders advising on protocol-launch audit-readiness should treat fork-substrate-vulnerability monitoring as a permanent operational discipline — every new lending-protocol fork in the Compound-v2-or-Curve-fork lineage should be subject to a fork-substrate-vulnerability audit pass at protocol-launch time, with the cohort-pattern reference (Hundred → Midas → Sonne → Onyx → Resupply) as the load-bearing input.
- **Cohort-pattern recognition latency improves over time.** Hundred Finance April 2023 required several days of cross-cohort analysis to articulate; Resupply June 2025 was identified within hours. Future T9.005 contributions documenting cohort-cases should track the cohort-recognition-latency metric as a measurable variable.

## Public references

- Resupply Finance operator-side post-mortem — `[resupplypostmortem2025]`.
- PeckShield on-chain trace and cumulative-loss aggregation — `[peckshieldresupply2025]`.
- BlockSec function-level walkthrough including the empty-ERC4626-wrapper price-oracle root cause — `[blocksec_resupply2025]`.
- SlowMist incident analysis covering the Tornado Cash funding-hop tracking — `[slowmistresupply2025]`.
- Halborn defender-oriented post-mortem — `[halbornresupply2025]`.
- QuillAudits same-day analytical breakdown of the donation-attack mechanics — `[quillauditsresupply2025]`.
- The Block reporting on the on-chain extraction, including the BlockSec attribution — `[theblockresupply2025]`.
- Cointelegraph reporting on the Singapore court order following the downstream Curve / Resolv ecosystem dispute — `[cointelegraphresupplysingapore2025]`.

## Citations

- `[resupplypostmortem2025]` — Resupply operator-side post-mortem and partial-bounty recovery framework.
- `[peckshieldresupply2025]` — PeckShield on-chain trace.
- `[blocksec_resupply2025]` — BlockSec function-level walkthrough; primary technical source for the empty-ERC4626-wrapper price-oracle root cause.
- `[slowmistresupply2025]` — SlowMist incident analysis; primary source for funding-source Tornado Cash hop tracking.
- `[halbornresupply2025]` — Halborn defender-oriented post-mortem.
- `[quillauditsresupply2025]` — QuillAudits analytical breakdown; secondary technical source for the donation-attack mechanics.
- `[theblockresupply2025]` — The Block contemporaneous reporting; secondary source for the on-chain extraction timeline and BlockSec attribution.
- `[cointelegraphresupplysingapore2025]` — Cointelegraph reporting on the Singapore court order; primary source for the downstream ecosystem dispute spillover.
- `[zhou2023sok]` — academic taxonomy classifying this as a flash-loan-enabled empty-market rounding-error attack.

## Discussion

Resupply Finance June 2025 is the canonical 2025 anchor for the **empty-market rounding-error / donation-attack** subclass of T9.005. The cohort framing across 2023-2025 (Hundred Apr 2023 → Midas 2023 → Onyx Nov 2023 → Sonne May 2024 → Onyx Sep 2024 → Resupply Jun 2025) gives the subclass a six-case multi-year structural articulation; defenders writing operator-cohort-attribution and protocol-launch audit-readiness review should treat the cohort as a recurring framework-level pattern rather than a historical-curiosity collection.

The mitigation surface composes across multiple OAK-M classes: OAK-M16 pre-deployment audit (with a discrete fork-substrate-vulnerability audit pass at protocol-launch time), OAK-M11 rate-limiting + per-block caps (to bound the per-block extraction velocity), OAK-M38 time-windowed withdrawal limits (to bound the per-window cumulative extraction), OAK-M34 emergency-pause (to limit detection-to-pause latency), and OAK-M39 cross-protocol watcher network (with empty-market-detection invariants tuned for Compound-v2-fork lending markets specifically).

The pseudonymous-unattributed framing is consistent with the broader cohort; none of the six cohort cases have produced confirmed-attribution outcomes. The cohort represents a steady source of attacker-cohort revenue at the OAK-G02-class operator-substrate level rather than at the OAK-G01-or-G05-class operator-substrate level; future industry forensic-cluster-attribution may produce stronger attribution if a future arrest or DOJ action explicitly addresses cohort-level operator-of-record.
