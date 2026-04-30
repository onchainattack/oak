# OAK-M04 — Funder-Graph Clustering

**Class:** detection
**Audience:** vendor, risk-team

**Maps to Techniques:** OAK-T2.001, OAK-T3.001, OAK-T3.002, OAK-T3.003, OAK-T8.001, OAK-T8.002, OAK-T1.001, OAK-T2.004

## Description

Funder-Graph Clustering is the attribution-side defence against fresh-address camouflage: cluster on-chain addresses by common funder ancestry — the wallet, exchange withdrawal, or bridge that supplied the gas / initial balance — and treat any set of addresses tracing back to a shared funder within a narrow time window as a *single operator entity* for the purposes of risk decisions. Where surface analysis sees twenty independent first-block buyers, funder-graph clustering sees one operator splitting an allocation across twenty wallets to evade per-buyer concentration limits.

The defensive principle is that an attacker controls address creation but cannot easily control the genesis of value: every wallet must be funded by *something* (a centralised-exchange withdrawal, a bridge inflow, an existing on-chain balance), and that funder is a structural attribution edge that survives address rotation. Clustering by funder reconstructs the operator-level view that the attacker is trying to hide, and in doing so re-enables the per-operator risk controls (concentration caps, position limits, listing thresholds) that fresh-address camouflage was designed to bypass.

OAK-M04 is the canonical capability under OAK-T8.001 (the Technique itself describes the *failure to apply* this mitigation as the relevant attack surface). It is also the load-bearing input for any sybil-class detection: rate limits, airdrop-eligibility checks, and concentration metrics that operate on *addresses* without first collapsing to *operators* are systematically defeated by sybil deployment.

## How it applies

- **OAK-T2.001 (Single-Sided Liquidity Plant):** when the entity providing initial liquidity also funds the first cohort of buyers from the same ancestor wallet, funder-graph clustering exposes the structural collusion that depth-snapshots alone cannot distinguish from organic interest.
- **OAK-T3.001 (Sybil Bundled Launch):** the canonical T3.001 pattern is N freshly-created wallets buying within the first M blocks; clustering them by common funder collapses the apparent diversity into a single operator and surfaces the concentration the operator was hiding.
- **OAK-T3.002 (Wash-Trade Volume Inflation):** wash-trade pairs that pass surface tests (different addresses, plausible pricing) collapse under funder-graph clustering when both sides trace to a common ancestor; this is a direct contributor to wash-adjusted volume metrics.
- **OAK-T3.003 (Pump-and-Dump Coordination):** coordinator wallets accumulating before promotional spikes are typically funded through a small set of ancestor wallets; clustering surfaces the coordinator cohort as a single concentration signal.
- **OAK-T8.001 (Cluster Reuse / Operator Continuity):** this is the canonical Technique that OAK-M04 implements. The Technique's "operator-cluster watchlist" formulation is the mature-deployment form of funder-graph clustering applied across launches over time.
- **OAK-T8.002 (Cross-Chain Operator Continuity):** funder-graph clustering extends cross-chain when bridge transactions are treated as funding edges; the defender then sees a unified operator-graph spanning chains, which is the canonical T8.002 detection surface.
- **OAK-T1.001 (Modifiable Tax Function) — contributory:** when a fee-mutability operator deploys repeatedly, funder-graph clustering ties the new deployment to known prior-cohort operators even when the contract surface is freshly deployed.
- **OAK-T2.004 (Initial Liquidity Backdoor) — contributory:** the LP-mint recipient and the deployer wallet are typically common-funder-clustered with the operator's broader infrastructure; OAK-M04 ties the per-deployment surface analysis to the operator-history layer.

## Limitations

Funder-graph clustering is defeated when the attacker funds wallets through high-mixing infrastructure (Tornado Cash and successors, CEX-deposit-and-withdraw cycles with sufficient delay, cross-chain bridges with embedded mixing). It also produces false positives when many users share a common funder by ordinary means — exchange hot-wallets fund millions of withdrawals daily, and a naive clustering algorithm will collapse all of them into a single "operator". Mitigation requires CEX-deposit-address recognition (so that a CEX hot wallet is treated as a *boundary*, not as a clustering ancestor) and time-window-bounded clustering (addresses funded by a common ancestor *within a narrow window* are stronger evidence than addresses funded over months). Privacy-respecting users who legitimately deploy multiple addresses from a personal hot wallet are clustered together, which is correct attribution but raises false-positive rates for any downstream control that treats clustering as inculpatory rather than informational. Finally, the mitigation is chain-aware: clustering quality is highest on EVM chains with rich exchange-address labelling, and weakest on chains with native privacy features (Monero, Zcash shielded pools, Solana confidential transfers).

## Reference implementations

- Chainalysis Reactor / KYT — commercial address-clustering and funder-graph traversal; the reference implementation in compliance-tooling form.
- TRM Labs, Elliptic Navigator, Crystal Blockchain — equivalent commercial offerings with overlapping but non-identical clustering heuristics; defenders integrating multiple providers see better recall.
- Arkham Intelligence — public-facing entity-attribution surface; funder-graph traversal is a first-class UI primitive.
- Breadcrumbs.app, Etherscan address labels (Nansen / Nansen Query) — open / freemium tooling suitable for case-by-case investigation rather than at-scale risk gating.
- `mg-detectors-rs` — funder-graph clustering against Solana operator-cluster lists is a v0.1 in-scope capability; EVM extension planned.
- Open-source GraphSense — academic / OSS clustering toolkit; suitable for self-hosted research deployments.

## Citations

- `[chainalysis2024dprk]` — Chainalysis 2024 retrospective on DPRK-attributed flows where funder-graph clustering was the principal attribution method; relevant to T8.001 / T8.002 application against state-actor operator cohorts.
- `[dydx2024sybil]` — dYdX sybil-cohort retrospective; canonical example of T3.001 patterns surfaced post-hoc by funder-graph clustering.
- `[chainalysis2025rug]` — cohort-scale evidence on rug-pull operator continuity across launches; the T8.001 deployment surface for OAK-M04.
- `[slowmist2024report]` — industry-side retrospective; recurring sybil and wash-trade patterns where clustering is the load-bearing detection.
- `[chainalysisprivacychain2024]` — privacy-chain hop patterns that defeat naive funder-graph clustering; the limitation surface OAK-M04 must acknowledge.
