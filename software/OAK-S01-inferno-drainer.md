# OAK-S01 — Inferno Drainer

**Type:** drainer-kit
**Aliases:** Inferno, Inferno DaaS, "Discord-link drainer kit" (per affiliate-channel framing in `[checkpoint2023drainers]`).
**Active:** sunset — Inferno publicly announced its shutdown on Telegram on November 26, 2023 (`[slowmist2024report]`). Affiliates and tooling re-emerged in successor families through 2024 (Angel Drainer / OAK-S02 absorbed a meaningful share of the Inferno affiliate base, but the November 2023 announcement is the primary-source shutdown event, not an October 2024 "handover"). The kit-and-affiliate-base persistence under successor branding is the structural OAK-G02 lesson; the original-branded operation was already retired by end-2023.
**First observed:** approximately 2022, contemporaneous with broader Permit2 adoption.
**Used by Groups:** OAK-G02 (Drainer-as-a-Service)
**Observed Techniques:** OAK-T4.001 (Permit2 Authority Misuse, primary), OAK-T4.002 (Compromised Front-End Permit Solicitation, occasional), OAK-T4.004 (Allowance / Approve-Pattern Drainer), OAK-T4.005 (setApprovalForAll NFT Drainer), OAK-T7.001 (Mixer-Routed Hop) shifting toward OAK-T7.003 (Cross-Chain Bridge Laundering) through 2024, OAK-T8.001 (Common-Funder Cluster Reuse), OAK-T8.002 (Cross-Chain / Service-Layer Operator Continuity, broadly construed for the October 2024 handover).
**Targets:** EVM-chain wallet holders at scale (Ethereum mainnet plus the major L2s); multichain support across the kit's active window. Both fungible-token drains (via Permit2 / approve flows) and NFT drains (via setApprovalForAll) within scope. Affiliates predominantly distributed phishing infrastructure via compromised or counterfeit Discord servers and X / Twitter promo posts.

## Description

Inferno Drainer was, through 2023, the dominant commercial phishing-as-a-service operator within the OAK-G02 category by aggregate stolen value. The 2023 wallet-drainer ecosystem produced approximately $494M in user losses across all named services collectively (Inferno, Angel, Pink, Monkey, Venom, and adjacent operators) per `[slowmist2024report]` — the $494M figure is a 2023 *ecosystem* total, not an Inferno-specific or 2024-specific number. Within that 2023 ecosystem total, Inferno was a major contributor; the largest single per-victim theft attributed to Inferno or its affiliates in this period was approximately $55.48M (`[slowmist2024report]`).

The kit's commercial model was a 20% take of affiliate proceeds in exchange for a turnkey drainer pipeline: cloned-UI signature-phishing pages, a routing contract that consolidated victim-funds outflows to operator-controlled addresses, multichain support, and laundering-route packaging. Affiliate distribution leaned heavily on compromised Discord channels, fake "claim airdrop" / "extra mint" announcements, and impersonated protocol UIs — which is why `[checkpoint2023drainers]` describes the kit's affiliate channel as the "Discord-link drainer kit".

The defining lifecycle event is the **November 26, 2023** Telegram-announced shutdown of Inferno's branded operation, after which the kit, affiliate base, and laundering-route tooling progressively re-surfaced under successor branding (Angel Drainer / OAK-S02 absorbed the largest share of affiliate continuity, with Pink, Venom, Vanilla, and Chick operating in parallel). The OAK reference framing is **service-infrastructure persistence outlives the operator name attached to it** — Inferno's brand retirement did not retire the underlying tooling or the affiliate population (see [`actors/OAK-G02-drainer-services.md`](../actors/OAK-G02-drainer-services.md) and [`examples/2024-10-inferno-drainer-handover.md`](../examples/2024-10-inferno-drainer-handover.md)).

## Observed examples

- [`examples/2024-10-inferno-drainer-handover.md`](../examples/2024-10-inferno-drainer-handover.md) — service-level worked example covering the operating window through the November 26, 2023 shutdown announcement and the subsequent affiliate / kit re-emergence under successor branding (Angel Drainer / OAK-S02 the most prominent continuation).
- Aggregate ecosystem metrics from `[slowmist2024report]` ($494M is the 2023 wallet-drainer ecosystem total across all operators collectively, not an Inferno-specific or 2024-specific figure; ~$55.48M peak single theft attributed to Inferno or its affiliates within that period).
- Cross-category (not Inferno-specific) reference for the T4.002 entry-vector pattern that recurred across G02 affiliates: [`examples/2022-08-curve-dns-hijack.md`](../examples/2022-08-curve-dns-hijack.md).

## Detection / attribution signals

- **Routing-contract bytecode fingerprint.** Inferno's drainer routing contracts exhibited recurring bytecode patterns and consolidation-address re-use across affiliate campaigns; per `[checkpoint2023drainers]`, on-chain spender re-use across affiliate campaigns is more durable than per-affiliate-domain rotation, and was the primary signal feeding wallet-vendor warning lists and exchange-side deposit-screening rules through 2023–2024.
- **20%-take consolidation signature.** Per-victim outflows from the routing contract reliably split into an ~80% affiliate hop and an ~20% operator hop, producing a calibratable two-output pattern observable on-chain.
- **Cluster-funder pattern.** Recurring funder addresses seeding new affiliate spender contracts with small amounts of gas — the canonical OAK-T8.001 fingerprint at the service-infrastructure layer.
- **Fee-collection-address shutdown signal.** Concurrent with the November 26, 2023 Telegram shutdown announcement, an outflow event from the Inferno fee-collection address provided the canonical OAK-T8.002-like signature for an operator winding down a branded service while affiliates and tooling persist under successor branding.
- **Permit / Permit2 signature volume share.** A large share of attributed phishing volume across the entire G02 category routed through permit-class signatures (`[slowmist2024report]`); Inferno was a major contributor to that base rate during its active operational window through 2023.

## Citations

- `[slowmist2024report]` — 2023 wallet-drainer ecosystem total ($494M across all operators collectively), ~$55.48M peak single theft attributed to Inferno or affiliates, November 26 2023 Inferno shutdown announcement, fee-collection-address outflow concurrent with the announcement.
- `[checkpoint2023drainers]` — recurring on-chain spender addresses, Permit / Permit2 / approve / setApprovalForAll attack-flow decomposition, "Discord-link drainer kit" affiliate-channel framing.
- `[chainalysis2024dprk]` — broader-context reference for the 2024 laundering-rail shift toward cross-chain bridge laundering (cited for ecosystem context, not as a direct Inferno attribution).

## Discussion

Inferno Drainer is the canonical kit-level demonstration of OAK-G02's central thesis: in the drainer-kit category, *service-infrastructure persistence is a stronger attribution signal than operator-name persistence*. The lineage runs Monkey Drainer (OAK-S04, retired March 2023) → Inferno (this entry, 2022 → November 2023 branded shutdown) → Angel Drainer (OAK-S02, present successor inheriting the largest share of Inferno affiliate continuity), with Pink (OAK-S03), Venom (OAK-S05), and newer entrants Vanilla (OAK-S06) and Chick (OAK-S07) operating in parallel.

For defenders, the operational implication is unchanged across the brand-retirement event: routing-contract bytecode, spender-cluster funder graphs, and 20%-take consolidation signatures remained valid signals into the Angel-branded continuation of the same infrastructure. Operator-name watchlists rotated; infrastructure-cluster watchlists did not. OAK's framing places Technique-level mitigations at the service layer, attribution-level language at the infrastructure-cluster layer, and OAK-G02 grouping at the category layer specifically because of this asymmetry.
