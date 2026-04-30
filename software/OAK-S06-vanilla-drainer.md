# OAK-S06 — Vanilla Drainer

**Type:** drainer-kit
**Aliases:** Vanilla, Vanilla DaaS.
**Active:** yes — in market since approximately 2024; newer entrant in the OAK-G02 category.
**First observed:** approximately 2024 (industry forensic posts begin tracking the brand as a distinct kit in this period).
**Used by Groups:** OAK-G02 (Drainer-as-a-Service)
**Observed Techniques:** OAK-T4.001 (Permit2 Authority Misuse), OAK-T4.004 (Allowance / Approve-Pattern Drainer), OAK-T4.005 (setApprovalForAll NFT Drainer), OAK-T7.001 (Mixer-Routed Hop), OAK-T7.003 (Cross-Chain Bridge Laundering), OAK-T8.001 (Common-Funder Cluster Reuse), OAK-T8.002 (Service-Layer Operator Continuity, broadly construed — see lineage note below).
**Targets:** EVM-chain wallet holders at scale; both fungible-token and NFT drains within scope. Affiliate-distribution pattern tracks the rest of OAK-G02 (compromised Discord servers, impersonated protocol UIs, X / Twitter promo posts).

## Description

Vanilla Drainer is a 2024-emergent category peer in OAK-G02. It is consistently characterised as lower-tier in market share relative to the Inferno / Angel / Pink top tier, and is principally distinguished within OAK by a *contested-lineage* profile: industry forensic posts in 2024–2025 have debated whether Vanilla is a fully novel kit, a rebrand of an earlier lower-tier kit, or a spin-off of pre-existing tooling under a new operator brand. No single industry forensic source has produced a definitive lineage attribution as of v0.1.

The commercial model tracks the rest of the category: a take-of-proceeds rental kit (cloned-UI signature-phishing pages, routing contract, multichain support, laundering-route packaging). Vanilla's spender-cluster footprint and routing-contract patterns are observable in 2024 wallet-vendor warning lists alongside the rest of the category, but its share of the 2024 wallet-drainer ecosystem aggregate ($494M per `[slowmist2024report]`) is in the lower-tier residual rather than in the named top-tier breakdown.

For OAK attribution work, Vanilla is the canonical case of a *contested-lineage newer entrant*: the per-incident attribution-level language should be **inferred-weak** at the operator-of-record level (canonical for the category) and is additionally weak at the *predecessor-kit* level until forensic sources converge on a lineage.

## Observed examples

- 2024 category-level share decomposition in `[slowmist2024report]` (Vanilla in the lower-tier residual).
- Industry forensic posts on the contested-lineage question (`[scamsniffer2024lineage]` — BibTeX entry to be added in a v0.x update).
- No dedicated per-incident example in [`examples/`](../examples/) as of v0.1; future contributors writing a Vanilla per-incident example should explicitly cite the lineage debate and treat predecessor-kit attribution as **inferred-weak**.

## Detection / attribution signals

- **Vanilla-specific spender-cluster fingerprint.** Vanilla's on-chain spender re-use is observable as a distinct 2024-emergent cluster, separate from Inferno / Angel / Pink / Venom in the public record. Whether the cluster overlaps with any pre-2024 lower-tier kit's funder graph is the contested-lineage question.
- **Take-percentage signature.** Affiliate-driven Vanilla flows show the canonical two-output split, consistent with the rest of the category.
- **Cluster-funder pattern.** Canonical OAK-T8.001 funder-graph pattern. Defenders looking for lineage evidence should anchor on funder-graph overlap with pre-2024 lower-tier kits — that is the most defensible signal for the rebrand-vs-novel question.
- **Routing-contract bytecode pattern matching.** Where a Vanilla routing contract shares bytecode patterns or spender consolidation behaviour with a pre-existing kit, that is the canonical OAK-T8.002 service-layer-continuity signal in this category — the 2024 Inferno → Angel handover is the public-record reference for what such a pattern looks like, even though no single forensic source has yet established a Vanilla equivalent.

## Citations

- `[slowmist2024report]` — 2024 category-level share decomposition; Vanilla as a lower-tier residual entry.
- `[checkpoint2023drainers]` — 2023-baseline category characterisation; relevant for the contested-lineage question (whether Vanilla's spender clusters overlap with pre-2024 lower-tier kits tracked in this baseline).
- `[scamsniffer2024lineage]` — industry forensic posts discussing Vanilla's contested lineage and possible rebrand origin (BibTeX entry to be added in a v0.x update).

## Discussion

Vanilla Drainer is the canonical OAK-G02 case for the *contested-lineage newer entrant*. Its commercial model is unremarkable within the category, but its lineage status is the open forensic question, and the OAK framework is structured to accommodate that ambiguity: per-incident attribution remains **inferred-weak** by category default, and predecessor-kit attribution is additionally weak until forensic sources converge.

For OAK contributors, the operational lesson is that newer entrants in OAK-G02 should be assumed to share affiliate base, tooling, and laundering-route packaging with at least one pre-existing kit until forensic evidence establishes otherwise — the Monkey → Inferno → Angel chain and the broader infrastructure-persistence pattern documented in [`actors/OAK-G02-drainer-services.md`](../actors/OAK-G02-drainer-services.md) make a fully-novel-kit prior implausible without independent corroboration. Vanilla's eventual lineage resolution will likely move it into a clearer slot in the OAK-G02 family tree; until then, the contested-lineage framing is the honest one.
