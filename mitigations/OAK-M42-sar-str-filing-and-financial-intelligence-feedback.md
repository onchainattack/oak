# OAK-M42 — SAR/STR Filing and Financial Intelligence Feedback Loop

**Class:** venue
**Audience:** venue (CEX, OTC desk, custodian, stablecoin issuer), regulator, financial-intelligence unit (FIU), risk-team
**Maps to Techniques:** OAK-T7.001, OAK-T7.002, OAK-T7.003, OAK-T7.005, OAK-T5.008

## Description

An institutional regulatory-compliance mitigation that codifies the Suspicious Activity Report (SAR) / Suspicious Transaction Report (STR) filing obligation as a structural detection-and-deterrence mechanism, not merely a compliance checkbox. The mitigation positions SAR/STR filing as the *intelligence-feedback leg* of the broader on-chain attribution pipeline: the venue's compliance team files structured reports that feed into the financial-intelligence-unit (FIU) database, which in turn informs law-enforcement investigation priorities, regulatory enforcement actions, and sanctions-designation decisions — closing the loop from on-chain detection to off-chain enforcement.

The mitigation has four legs: (a) **SAR/STR trigger calibration at cryptocurrency-relevant thresholds** — the venue calibrates SAR/STR filing triggers to cryptocurrency-specific laundering patterns (structuring below the FATF Travel Rule threshold, privacy-chain-adjacent deposit patterns, rapid stablecoin-issuer switching, aggregator-routing complexity above legitimate-use baselines) rather than applying generic TradFi CTR/STR thresholds that miss cryptocurrency-native obfuscation; (b) **cluster-level aggregation** — filing is at per-cluster rather than per-transaction granularity, so that a multi-wallet laundering operation that distributes 50 structuring transactions across 20 fresh addresses is reported as one SAR/STR narrative rather than as 50 unreported individually-sub-threshold transfers; (c) **structured on-chain evidence attachment** — the SAR/STR includes the full on-chain transaction graph trace (source-cluster funder graph, laundering path with hop-level detail, exchange-deposit addresses, per-hop token and amount) as structured data — not merely a narrative description — so that the receiving FIU can ingest the evidence into its own analytical pipeline; (d) **financial-intelligence feedback loop** — the FIU aggregates SAR/STR filings across venues, identifies cross-venue laundering patterns invisible to any single venue, and feeds the resulting intelligence back to venues via updated compliance-provider watchlists and to law enforcement via investigative referrals.

The class is `venue` because SAR/STR filing is a regulated-entity obligation under the Bank Secrecy Act (U.S.), the EU AML Directives, and equivalent national frameworks. The mitigation is not optional for venues in jurisdictions with SAR/STR mandates — it is a legal requirement that also functions as a structural detection input.

## How it applies

- **Cryptocurrency-native trigger calibration:** the venue's transaction-monitoring system flags patterns specific to on-chain laundering: (i) deposit-then-withdraw-then-deposit cycles where the withdraw leg routes through a privacy chain, aggregator, or non-KYC instant-swap; (ii) rapid stablecoin-issuer switching (USDC→USDT→USDC within 24 hours) consistent with freeze-asymmetry-aware routing (T7.008); (iii) deposit structuring below the FATF Travel Rule threshold that aggregates at the cluster level despite individual transactions falling below the per-transaction SAR trigger; (iv) aggregator-routed deposits (T7.007) where the route-path entropy materially exceeds the legitimate-use baseline.
- **Cluster-level aggregation:** the venue's compliance system maps each deposit to its on-chain source cluster (per forensic-provider attribution), aggregates the total flow attributed to each cluster across all customer accounts, and files one SAR/STR per cluster when the aggregate exceeds the filing threshold — closing the structuring-evasion gap that per-transaction filing thresholds create.
- **Structured on-chain evidence:** the SAR/STR incorporates the on-chain evidence in machine-readable form (the transaction hashes, the cluster IDs, the laundering-path hop sequence, the per-hop token and amount, the known-actor attribution tier) alongside the narrative. The structured data enables the receiving FIU to ingest the evidence without manual re-tracing — the venue's compliance team has already performed the on-chain forensic work and transmits the result.
- **FIU feedback loop:** the FIU aggregates SARs/STRs across venues in its jurisdiction and identifies cross-venue laundering patterns — a cluster that deposits at Venue A and withdraws at Venue B within the same jurisdiction, which neither venue observes individually — and feeds the aggregated cluster intelligence back to venues via compliance-provider watchlist updates and to law enforcement via investigative referrals. The FIU's cross-venue visibility is the structural complement to any single venue's per-customer visibility.

## Limitations

- SAR/STR filing is jurisdiction-dependent: venues in jurisdictions without a functioning FIU, without cryptocurrency-specific SAR/STR guidance, or without enforcement follow-through on filed SARs/STRs create a structural filing gap. The mitigation is strongest in jurisdictions with FinCEN-equivalent FIUs and cryptocurrency-specific SAR/STR filing expectations.
- SAR/STR confidentiality limits the feedback loop's speed: FIUs cannot disclose SAR/STR contents to venues in real time, and the FIU's aggregated intelligence feedback to venues lags behind the event window. The feedback loop is a medium-term strengthening mechanism, not a real-time freeze trigger.
- Per-transaction threshold calibration remains a structuring vulnerability if the venue's compliance system has not implemented cluster-level aggregation: a launderer who distributes $999 transfers across 100 fresh wallets generates 100 sub-threshold transfers that individually fall below the SAR trigger if the system operates at per-transaction rather than per-cluster granularity.
- The mitigation's effectiveness depends on the FIU's analytical capability and law-enforcement responsiveness; a well-filed SAR/STR in a jurisdiction where FIUs are under-resourced or law enforcement does not act on financial-intelligence referrals is a compliance artefact, not a detection mechanism.

## Reference implementations

- { target: fincen-sar-filing,           class: regulatory,   chain: cross-chain, url: "" }
- { target: chainalysis-kyr,             class: compliance,   chain: cross-chain, url: "" }
- { target: trm-forensics,               class: compliance,   chain: cross-chain, url: "" }
- { target: elliptic-investigator,       class: compliance,   chain: cross-chain, url: "" }
- { target: goaml-sar-template,          class: regulatory,   chain: cross-chain, url: "" }
