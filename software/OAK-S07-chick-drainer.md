# OAK-S07 — Chick Drainer

**Type:** drainer-kit
**Aliases:** Chick, Chick DaaS.
**Active:** yes — in market since approximately 2024; recent entrant in the OAK-G02 category cited in SlowMist's cohort tracking.
**First observed:** approximately 2024.
**Used by Groups:** OAK-G02 (Drainer-as-a-Service)
**Observed Techniques:** OAK-T4.001 (Permit2 Authority Misuse), OAK-T4.004 (Allowance / Approve-Pattern Drainer), OAK-T4.005 (setApprovalForAll NFT Drainer), OAK-T7.001 (Mixer-Routed Hop), OAK-T7.003 (Cross-Chain Bridge Laundering), OAK-T8.001 (Common-Funder Cluster Reuse).
**Targets:** EVM-chain wallet holders at scale; both fungible-token and NFT drains within scope. Affiliate-distribution pattern tracks the rest of OAK-G02.

## Description

Chick Drainer is a 2024-emergent category peer in OAK-G02, cited in SlowMist's cohort tracking as part of the lower-tier residual alongside Vanilla (OAK-S06) and other newer entrants. Public per-incident reconstruction of Chick-attributed activity is thinner than for the top-tier Inferno / Angel / Pink trio and the established lower-tier Venom (OAK-S05); the kit's primary public visibility is via aggregate cohort-level mentions in `[slowmist2024report]` and contemporaneous SlowMist / ScamSniffer threat-intel posts rather than via per-incident forensic write-ups.

The commercial model tracks the rest of the category: a take-of-proceeds rental kit (cloned-UI signature-phishing pages, routing contract, multichain support, laundering-route packaging). Affiliate distribution patterns are consistent with the broader category — compromised Discord servers, impersonated protocol UIs, X / Twitter promo posts.

For OAK attribution work, Chick sits at the lower bound of public visibility within OAK-G02: the kit is named in industry forensic cohort tracking but does not yet have the per-incident or per-spender-cluster forensic depth that Inferno, Angel, Pink, Monkey, or Venom carry. Per-incident attribution is **inferred-weak** at v0.1; service-level attribution at the named-cohort layer is **inferred-strong** to the extent that SlowMist's cohort tracking is treated as the canonical industry-forensic source for the category.

## Observed examples

- 2024 category-level cohort tracking in `[slowmist2024report]` (Chick as a named lower-tier entry alongside the Inferno / Angel / Pink top tier and the Venom / Vanilla lower tier).
- No dedicated per-incident example in [`examples/`](../examples/) as of v0.1.

## Detection / attribution signals

- **Chick-specific spender-cluster fingerprint.** Chick's on-chain spender re-use is observable as a distinct 2024-emergent cluster, but per-cluster forensic depth is thinner in the public record than for top-tier kits. Defenders maintaining wallet-vendor warning lists should treat Chick as a watch-list entry pending fuller per-cluster characterisation.
- **Take-percentage signature.** Affiliate-driven Chick flows show the canonical two-output split, consistent with the rest of the category.
- **Cluster-funder pattern.** Canonical OAK-T8.001 funder-graph pattern. As with Vanilla (OAK-S06), the open question is whether Chick's funder graph overlaps with any pre-2024 lower-tier kit, which would suggest a rebrand or spin-off rather than a fully novel kit.
- **Cohort-level attribution caveat.** Industry forensic cohort tracking (e.g., `[slowmist2024report]`) names Chick alongside category peers without per-incident reconstruction; defenders consuming Chick-attributed reports should preserve that distinction and not over-extrapolate from the cohort name to per-incident attribution.

## Citations

- `[slowmist2024report]` — Chick named in the 2024 cohort tracking as a lower-tier entry alongside Vanilla and the broader category.
- `[checkpoint2023drainers]` — 2023-baseline G02 cluster characterisation; Chick is not a 2023-active named entry in this baseline.

## Discussion

Chick Drainer is the canonical OAK-G02 case for the *cohort-tracked-but-thinly-reconstructed newer entrant*. The kit is named in industry forensic cohort tracking but does not yet have the per-incident or per-spender-cluster forensic depth that older category entries carry. For OAK contributors, that means Chick's lineage entry in this corpus is structurally a *placeholder for future contribution*: the kit's profile will sharpen as forensic sources publish per-incident reconstructions, and the OAK entry should be updated to reflect that depth as it appears.

The broader pattern Chick illustrates is that OAK-G02 is a category with a long tail of named lower-tier kits. The top-tier handover dynamics (Monkey → Inferno → Angel) dominate the public-record narrative, but the lower tier is where most newer entrants enter and either consolidate up (Pink's trajectory from 2023) or remain in the residual (the likely Chick / Vanilla profile through 2025). Defender controls operating at the spender-cluster and routing-contract layer are well-positioned to track the lower tier as it evolves; defender controls operating at the operator-name layer are not.
