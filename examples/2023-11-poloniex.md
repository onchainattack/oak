# Poloniex hot-wallet drain — multi-chain — 2023-11-10

**Loss:** approximately $120M across multiple chains (~$60M ETH + ~$30M TRX + ~$13M BTTC + ~$17M cross-chain stablecoins and tokens).
**OAK Techniques observed:** **OAK-T4.001** (Private Key / Seed Phrase Compromise — primary; the attacker compromised Poloniex's hot-wallet signing infrastructure, gaining access to private key material across ETH, TRX, BTTC, and other chains simultaneously) + **OAK-T7.003** (Cross-Chain Bridge Laundering — the bulk of the extracted $120M was routed through cross-chain laundering rails into Lazarus-attributed laundering chains) + **OAK-T15.003** (Operator Endpoint / Infrastructure Compromise — the proximate entry vector was intrusion into Poloniex's operator-side hot-wallet infrastructure; the multi-chain simultaneous extraction pattern indicates co-located key material). The case is also referenceable under **OAK-T11** (Custody and Signing Infrastructure) at the Tactic level.
**Attribution:** **inferred-strong** per Chainalysis + SlowMist + Match Systems + ZachXBT analyses converging on the laundering-pattern overlap with confirmed Lazarus laundering chains.
**OAK-Gnn:** [OAK-G01 Lazarus Group / DPRK-attributed](../actors/OAK-G01-lazarus.md).
**Key teaching point:** **Multi-chain key-store co-location at exchange-side hot-wallet infrastructure produces multi-chain loss surfaces from a single compromise event**. Poloniex's November 2023 incident drained simultaneously across ETH, TRX, BTTC, and other chains, indicating that the underlying hot-wallet signing infrastructure was sharing key material or signing-execution context across the affected chains. The pattern recurs at the broader OAK-G01 TraderTraitor cluster of 2023-2024 exchange compromises (Phemex January 2025, HTX November 2023, Indodax September 2024) and is canonical for OAK-T11 contributions discussing multi-chain key-isolation as a discrete custody-side architectural variable.

## Summary

Poloniex is a major centralised exchange acquired by Justin Sun's TRON-aligned investment vehicle in late 2019. On November 10, 2023, an attacker drained approximately $120M in cumulative value across the exchange's ETH, TRX, BTTC, and other-chain hot-wallet infrastructure. The simultaneous-multi-chain extraction pattern indicates that the underlying signing-infrastructure compromise was at a single point in the operator-side architecture rather than per-chain isolated compromises.

Justin Sun publicly disclosed the breach within hours, paused affected withdrawals, and committed to making customer funds whole from operator reserves. The recovery framework included an on-chain bounty offer (approximately $10M white-hat bounty for return of funds) and partial recovery via post-event coordination with industry forensic providers and exchange counterparties to flag the laundering-route deposit addresses. Cumulative recovery via these channels was limited; the bulk of the extracted value entered laundering chains consistent with confirmed-grade OAK-G01 TraderTraitor laundering patterns within days.

Industry forensic analysis (Chainalysis, SlowMist, Match Systems, ZachXBT) converged on `inferred-strong` G01 / TraderTraitor attribution within approximately 7-10 days of the incident, on the basis of laundering-cluster overlap with confirmed Lazarus chains and operator-side TTP overlap with the confirmed-attribution Bybit (Feb 2025), DMM Bitcoin (May 2024), WazirX (Jul 2024), and Phemex (Jan 2025) custody-vendor cluster.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-11-10 | Attacker compromises Poloniex hot-wallet signing-infrastructure; simultaneous multi-chain extraction across ETH / TRX / BTTC / others; ~$120M cumulative outflow | T11 (extraction) |
| 2023-11-10 (within hours) | Justin Sun publicly discloses the breach; affected withdrawals paused; customer-funds-whole commitment | (operator response) |
| 2023-11-10 to 2023-11-11 | Industry forensic posts (PeckShield, SlowMist, ZachXBT) publish on-chain trace and cumulative-loss aggregation | (forensic record) |
| 2023-11-12 onwards | Justin Sun publishes on-chain bounty offer (~$10M for return of funds); attempts coordination with forensic providers and exchange counterparties for laundering-route deposit-address flagging | M35 (whitehat-rescue-coordination broadly construed) + M07 (cross-chain attribution-graph) |
| 2023-11-15 to 2023-11-20 | Industry forensic analysis converges on `inferred-strong` G01 / TraderTraitor attribution; laundering-cluster overlap with confirmed Lazarus chains | M07 (attribution-graph reaches inferred-strong) |
| 2023-11 onwards | Cumulative recovery via bounty + counterparty-coordination is limited; bulk of extracted value enters confirmed-Lazarus-overlapping laundering chains | T7.001 + T7.002 + T7.003 |

## What defenders observed

- **Pre-event (no public-record advance warning).** No public-record indication of impending compromise; the pre-event period had no detectable signals that would have allowed external defenders to act.
- **At-event (rapid simultaneous multi-chain extraction).** The simultaneous multi-chain extraction pattern is itself the structural diagnostic signal — single-chain hot-wallet compromise produces single-chain extraction; simultaneous multi-chain extraction indicates shared signing-infrastructure across chains. Defenders writing custody-side architectural review should treat this pattern as a high-confidence indicator of single-point-of-compromise in the operator-side architecture.
- **Post-event (operator-side rapid public response).** Justin Sun's same-day disclosure-and-pause + customer-funds-whole commitment + on-chain bounty offer is consistent with operator-side incident-response best-practice; the recovery limitation reflects the inherent difficulty of recovering laundered funds at the OAK-G01 TraderTraitor cluster level rather than operator-side response inadequacy.

## What this example tells contributors writing future Technique pages

- **Multi-chain key-store co-location is a discrete custody-side architectural anti-pattern.** Future T11 contributions discussing exchange hot-wallet architecture should explicitly enumerate multi-chain key-store co-location as a variable composing with single-EOA-admin-authority (EasyFi April 2021) and HSM/MPC-with-UI-compromise (Bybit February 2025) anti-patterns.
- **Simultaneous multi-chain extraction is a single-point-of-compromise diagnostic.** Defenders writing operator-cohort-attribution from on-chain telemetry should treat this pattern as high-confidence evidence of operator-side single-point-compromise; it informs both attribution and architectural-review priorities.
- **Operator-side rapid public response is a load-bearing recovery variable.** Justin Sun's same-day disclosure-and-pause + customer-funds-whole-commitment substantially limited downstream user-side panic and downstream-loss; the contrast with operators who delay disclosure (DEXX September 2024 multi-week mis-attribution period) is canonical.

## Public references

- Justin Sun public disclosure thread on X / Twitter — `[justinsunpoloniex2023]`.
- Poloniex operator-side post-incident statements — `[poloniexpostmortem2023]`.
- Chainalysis G01 / TraderTraitor attribution analysis — `[chainalysispoloniex2023]`.
- SlowMist incident analysis and laundering-cluster overlap — `[slowmistpoloniex2023]`.
- Match Systems forensic walkthrough — `[matchsystemspoloniex2023]`.
- ZachXBT independent investigation thread — `[zachxbtpoloniex2023]`.
- PeckShield on-chain trace — `[peckshieldpoloniex2023]`.

## Citations

- `[justinsunpoloniex2023]` — Justin Sun own incident statement.
- `[poloniexpostmortem2023]` — Poloniex operator-side post-incident statements.
- `[chainalysispoloniex2023]` — Chainalysis G01 / TraderTraitor attribution writeup; load-bearing input for the inferred-strong attribution.
- `[slowmistpoloniex2023]` — SlowMist incident analysis.
- `[matchsystempoloniex2023]` — Match Systems forensic walkthrough; G01 cluster-attribution.
- `[zachxbtpoloniex2023]` — ZachXBT independent on-chain investigation.
- `[peckshieldpoloniex2023]` — PeckShield on-chain trace and cumulative-loss aggregation.
- `[chainalysis2024dprk]` — Chainalysis 2024 DPRK report; cross-reference for the broader G01 cluster-attribution context.
- `[chainalysisdprktradertraitor]` — Chainalysis TraderTraitor / DPRK report; cross-reference.

## Discussion

Poloniex November 2023 is a canonical large-scale 2023 G01 / TraderTraitor cluster worked example and is structurally a precursor case to the larger OAK-G01 cluster of 2024-2025 exchange compromises (DMM Bitcoin May 2024, WazirX July 2024, Phemex January 2025, Bybit February 2025). The 2023-11-10 to 2025-02-21 cluster (Poloniex → DMM → WazirX → Indodax → Phemex → Bybit) represents approximately $1.7B+ in cumulative confirmed-and-inferred-strong G01 / TraderTraitor exchange-compromise losses across approximately 15 months — the largest single operator-cluster loss-aggregate in the OAK reference period and the load-bearing context for OAK-G01 TraderTraitor cluster prioritisation in defender-side custody-vendor risk-assessment.

The multi-chain-key-store-co-location structural observation pairs with the broader pattern of OAK-T11 incidents where the operator-side compromise produces simultaneous multi-asset extraction; future T11 contributions should treat the multi-chain co-location vs per-chain isolation distinction as a load-bearing architectural variable. The mitigation surface is OAK-M37 HSM/MPC custody (per-chain key isolation via cryptographic-architecture rather than via operational discipline alone) composed with OAK-M19 air-gap signing for cold-wallet portion of treasury.

The inferred-strong attribution is robust at v0.1 cutoff but is not at confirmed-grade level (no DOJ indictment / OFAC SDN action specifically linking the November 2023 Poloniex incident to a named DPRK operator persona). Future industry forensic-cluster-attribution updates may upgrade to confirmed-grade if a future U.S.-government action explicitly names the incident.
