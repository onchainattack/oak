# OAK-M43 — KYT Operational Practice and Cross-VASP Coordination

**Class:** venue
**Audience:** venue (CEX, OTC desk, custodian, bridge protocol), compliance-provider vendor, risk-team
**Maps to Techniques:** OAK-T7.001, OAK-T7.002, OAK-T7.003, OAK-T7.006, OAK-T7.007, OAK-T7.008, OAK-T8.001, OAK-T8.002

## Description

An institutional operational mitigation that codifies Know Your Transaction (KYT) as an *ongoing monitoring* practice — not a one-time onboarding gate — and integrates KYT with cross-VASP coordination to create a network-effect compliance surface. The mitigation's core premise: KYC at onboarding establishes the customer's identity at a point in time; KYT throughout the customer relationship establishes the *transaction graph's* identity — the source-cluster attribution, the laundering-path provenance, the counterparty-risk profile — for every deposit and withdrawal the customer conducts after onboarding.

The mitigation has four legs: (a) **continuous KYT monitoring** — every inbound deposit is screened against compliance-provider watchlists at acceptance time, with the screening result (clean / watchlisted / sanctioned / high-risk-cluster) determining the deposit's processing path; clean deposits proceed, watchlisted deposits are escalated for review, sanctioned deposits are frozen, and high-risk-cluster deposits trigger enhanced due-diligence review of the customer relationship; (b) **cluster-level rather than address-level KYT** — the screening operates at the forensic-provider's cluster granularity, so that fresh-address generation by a watchlisted cluster does not bypass the screen; (c) **per-cluster aggregate-flow tracking** — the venue tracks the total flow attributed to each watchlisted or high-risk cluster across all customer accounts, not merely per-customer flow, so that cluster-level structuring (many small deposits across many customer accounts) is detected; (d) **cross-VASP KYT coordination** — venues share watchlist and cluster-attribution data via compliance-provider feeds (Chainalysis KYT, TRM Forensics, Elliptic Investigator) and Travel Rule message exchange (IVMS-101), so that a cluster's deposit at Venue A that is flagged as high-risk feeds into the watchlist update that Venue B receives before the cluster's withdrawal at Venue B settles.

The class is `venue` because KYT is a venue-side operational practice that requires integration with compliance-provider feeds, per-deposit screening infrastructure, and cross-VASP message-exchange capability. The mitigation is the operational complement to OAK-M41 (freeze/confiscate workflow) and OAK-M42 (SAR/STR filing): M43 is the continuous-monitoring layer that detects the laundering event; M41 is the freeze response; M42 is the regulatory-intelligence filing.

## How it applies

- **Continuous KYT monitoring at deposit acceptance:** the venue's deposit-processing pipeline queries the compliance-provider API (Chainalysis KYT, TRM Forensics, Elliptic Investigator) for each inbound deposit at the point of block confirmation. The query returns the source-cluster attribution (clean / watchlisted / sanctioned / high-risk) and the laundering-path provenance (e.g., "funds trace to Lazarus Group G01 cluster via Tornado Cash and 1inch aggregator routing"). The deposit is routed to the appropriate processing path based on the KYT result.
- **Cluster-level screening closes the fresh-address bypass:** the KYT query resolves the deposit address to its forensic-provider cluster, not to the per-address sanctions list. A launderer who generates 100 fresh deposit addresses from the same source cluster is flagged on the first deposit; the 99 subsequent deposits are flagged at cluster-match time even if the per-address OFAC SDN list does not include them.
- **Per-cluster aggregate-flow tracking closes the structuring-by-customer-account bypass:** the venue's compliance system tracks total inflow from Watchlisted Cluster X across all customer accounts, not merely per-customer inflow. A launderer who distributes a $1M deposit across 20 customer accounts each receiving $50K is detected at the cluster-aggregate level ($1M from Cluster X), not at the per-customer level where each $50K deposit may fall below the per-customer review threshold.
- **Cross-VASP KYT coordination as a network-effect compliance surface:** when Venue A flags a cluster as high-risk based on a KYT screening result, the flag feeds into the compliance-provider's shared watchlist update. Venue B, receiving the same cluster's deposit 30 minutes later, queries the same compliance-provider API and receives the updated (post-Venue-A-flag) risk assessment. The cross-VASP propagation of KYT results shrinks the window during which a cluster can move between venues without elevated scrutiny.
- **KYT + Travel Rule message exchange:** the KYT result for a deposit is transmitted alongside the Travel Rule originator information (IVMS-101) to the beneficiary VASP, so that the destination venue receives both the customer-identity information (from Travel Rule) and the transaction-graph-attribution information (from KYT) at deposit-acceptance time.

## Limitations

- KYT effectiveness depends on the compliance-provider's attribution quality: a cluster that is not yet attributed by any forensic provider will pass KYT screening as "clean." The KYT surface is only as good as the forensic-provider attribution coverage, which lags behind new clusters and new laundering methodologies.
- Cross-VASP coordination is a network effect: the mitigation's effectiveness is proportional to the share of total off-ramp volume covered by KYT-practicing venues. A single significant non-KYT venue (or a venue that practices KYC-without-KYT) creates a hole through which watchlisted clusters can on-ramp, transit, and off-ramp without elevated scrutiny.
- KYT is computationally expensive at scale: per-deposit API queries to the compliance provider add latency and cost to the deposit-processing pipeline. High-volume venues must balance screening comprehensiveness against operational throughput, creating a potential gap for high-frequency low-value deposits that are batch-screened rather than individually screened.
- The privacy-chain interior remains KYT-intractable: funds that enter a privacy chain (Monero, Zcash shielded, Tornado Cash, Railgun) and exit to a fresh address are not attributable by KYT at the re-emergence point. The KYT query at the re-emergence point returns "clean" because the privacy-chain hop has broken the attribution graph. OAK-M27 (Travel Rule and KYC at Privacy-Chain Boundary) is the complementary mitigation for the privacy-chain case.

## Reference implementations

- { target: chainalysis-kyt,           class: compliance_feed, chain: cross-chain, url: "" }
- { target: trm-forensics,             class: compliance_feed, chain: cross-chain, url: "" }
- { target: elliptic-investigator,     class: compliance_feed, chain: cross-chain, url: "" }
- { target: scorechain,                class: compliance_feed, chain: cross-chain, url: "" }
- { target: crystal-blockchain,        class: compliance_feed, chain: cross-chain, url: "" }
