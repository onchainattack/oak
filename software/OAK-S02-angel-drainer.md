# OAK-S02 — Angel Drainer

**Type:** drainer-kit
**Aliases:** Angel, Angel DaaS, "Angel-X" (occasional rebranding suffix observed in industry forensic posts).
**Active:** yes — in market since approximately early 2023; received the Inferno Drainer (OAK-S01) affiliate base and infrastructure tooling in the October 19, 2024 service-layer handover (`[slowmist2024report]`); primary heir to Inferno's market share through end-of-2024.
**First observed:** approximately early 2023.
**Used by Groups:** OAK-G02 (Drainer-as-a-Service)
**Observed Techniques:** OAK-T4.001 (Permit2 Authority Misuse, primary), OAK-T4.002 (Compromised Front-End Permit Solicitation, occasional), OAK-T4.004 (Allowance / Approve-Pattern Drainer), OAK-T4.005 (setApprovalForAll NFT Drainer), OAK-T7.001 (Mixer-Routed Hop), OAK-T7.003 (Cross-Chain Bridge Laundering, increasing share post-2024), OAK-T8.001 (Common-Funder Cluster Reuse), OAK-T8.002 (Service-Layer Operator Continuity, broadly construed for the inbound Inferno handover).
**Targets:** EVM-chain wallet holders at scale, including the major L2s; both fungible-token and NFT drains within scope. Affiliate distribution patterns track Inferno's pre-handover playbook (compromised Discord servers, impersonated protocol UIs, X / Twitter promo posts).

## Description

Angel Drainer was already an established commercial drainer kit in the OAK-G02 category before the October 2024 handover from Inferno; per `[checkpoint2023drainers]`, recurring on-chain spender addresses tied to Angel were observable and tracked alongside Inferno's through 2023. Angel's commercial model is canonical for the category: a 20% take of affiliate proceeds in exchange for a turnkey drainer pipeline (cloned-UI signature-phishing pages, routing contract, multichain support, laundering-route packaging).

The defining lifecycle event for Angel — and the reason it is the dominant post-2024 entry in this corpus — is the inbound handover from Inferno on October 19, 2024. Per `[slowmist2024report]`, Inferno announced via Telegram that its platform had been transferred to the Angel Drainer team; concurrent with the announcement, approximately 2,845 ETH (~$7.5M) moved out of the Inferno fee-collection address. The drainer kit, affiliate base, spender-address clusters, and laundering-route tooling do not appear to have been retired — they appear to have been re-branded onto Angel's service infrastructure.

Per `[slowmist2024report]`, post-October-2024 drainer activity in this category should be attributed at the *service-infrastructure* level rather than at the *named-operator* level until the Angel-and-successors landscape stabilises. OAK-G02 makes this guidance explicit at the actor-page level and at the [`examples/2024-10-inferno-drainer-handover.md`](../examples/2024-10-inferno-drainer-handover.md) example level.

## Observed examples

- [`examples/2024-10-inferno-drainer-handover.md`](../examples/2024-10-inferno-drainer-handover.md) — service-level worked example covering the October 19, 2024 inbound handover from Inferno (OAK-S01).
- Aggregate ecosystem metrics for 2024 from `[slowmist2024report]` (~$494M category-wide losses; permit-signature share ~56.7%); Angel-specific Q4 2024 share is the residual of the Inferno post-handover migration plus Angel's own pre-handover book.
- `[checkpoint2023drainers]` 2023-baseline characterisation of Angel's on-chain spender re-use as a category peer of Inferno before the handover.

## Detection / attribution signals

- **Continuity of Inferno's routing-contract patterns.** Post-October-2024, defenders should expect Angel-branded operations to re-deploy or re-use routing-contract bytecode and spender-cluster funder graphs traceable to the pre-handover Inferno infrastructure. Per `[slowmist2024report]`, infrastructure persistence is the stronger signal than the brand on it.
- **20%-take consolidation signature.** Per-victim outflows splitting into an ~80% affiliate hop and an ~20% operator hop, identical in shape to the Inferno-era pattern.
- **Cluster-funder pattern.** Recurring funder addresses seeding new affiliate spender contracts with small amounts of gas — canonical OAK-T8.001 at the service layer.
- **Pre-handover Angel-specific spender clusters.** Per `[checkpoint2023drainers]`, Angel had its own on-chain spender footprint observable from 2023 onward, separate from Inferno's; Q4 2024 and 2025 attribution work has the option of either treating the merged infrastructure as a single cluster or distinguishing pre-merger Angel-only and Inferno-migrated sub-clusters.
- **Laundering-rail mix.** Through 2024 Angel's outflows (and the broader category) showed progressive substitution from OAK-T7.001 (mixer hops) toward OAK-T7.003 (cross-chain bridge laundering); affiliate-side variance is wide.

## Citations

- `[slowmist2024report]` — October 19 2024 inbound handover from Inferno; ~2,845 ETH fee-address outflow concurrent with announcement; service-infrastructure-level attribution guidance.
- `[checkpoint2023drainers]` — recurring on-chain spender addresses tied to Angel and category peers from 2023 onward; permit / approve / setApprovalForAll attack-flow decomposition.

## Discussion

Angel Drainer's lineage entry in OAK is structurally a *successor* entry: the kit was already present as a category peer of Inferno through 2023–early 2024, but its dominant post-October-2024 position is a function of the Inferno handover rather than of organic share growth. For OAK contributors, the practical implication is that Angel-attributed activity in 2025 onward should be assumed to overlap heavily with pre-handover Inferno infrastructure unless a forensic source (SlowMist, Check Point, Chainalysis, ScamSniffer) establishes a clean separation.

The forward-looking question for Angel is whether it itself becomes a future handover *origin* — repeating the Monkey → Inferno → Angel chain — or whether it persists as a multi-year operator. Either outcome is consistent with the OAK-G02 thesis that infrastructure-cluster watchlists outperform operator-name watchlists across handover events. Defender controls (wallet-side warning lists, exchange-side deposit screening, browser extensions) should track Angel at the spender-cluster and routing-contract layer rather than at the brand-name layer.
