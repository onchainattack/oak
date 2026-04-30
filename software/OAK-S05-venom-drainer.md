# OAK-S05 — Venom Drainer

**Type:** drainer-kit
**Aliases:** Venom, Venom DaaS.
**Active:** yes — in market since approximately mid-2023.
**First observed:** approximately mid-2023.
**Used by Groups:** OAK-G02 (Drainer-as-a-Service)
**Observed Techniques:** OAK-T4.001 (Permit2 Authority Misuse), OAK-T4.004 (Allowance / Approve-Pattern Drainer), OAK-T4.005 (setApprovalForAll NFT Drainer), OAK-T7.001 (Mixer-Routed Hop), OAK-T7.003 (Cross-Chain Bridge Laundering, increasing share through 2024), OAK-T8.001 (Common-Funder Cluster Reuse).
**Targets:** primarily EVM-chain wallet holders; the kit's marketing materials and affiliate-channel posts have additionally claimed Solana and Tron support, though independent forensic confirmation of non-EVM execution at scale is weaker than for the EVM side. Both fungible-token and NFT drains within scope.

## Description

Venom Drainer is a category peer of Inferno (OAK-S01), Angel (OAK-S02), and Pink (OAK-S03), in market since approximately mid-2023. It is consistently characterised in industry forensic posts as a lower-market-share kit relative to the Inferno / Angel / Pink top tier, but is distinguished within OAK-G02 by its multichain-claim profile: the kit has been marketed to affiliates with claimed support for Solana and Tron in addition to canonical EVM execution, making it one of the more aggressive claimed-multichain entries in the category through 2024.

The independent forensic confirmation of Venom's non-EVM execution at scale is weaker than for its EVM activity. EVM-side Venom spender clusters are observable in the same wallet-vendor warning lists and exchange-side deposit-screening rules that track the rest of OAK-G02 (per `[checkpoint2023drainers]` baseline characterisation and `[slowmist2024report]` 2024 share decomposition). Solana / Tron Venom-attributed activity is industry-claimed but less consistently published per-cluster.

The commercial model tracks the rest of the category: a take-of-proceeds rental kit (cloned-UI signature-phishing pages, routing contract, multichain support, laundering-route packaging), with affiliate distribution via compromised Discord servers and impersonated protocol UIs.

## Observed examples

- 2023-baseline characterisation of Venom-era spender addresses alongside Inferno, Angel, and Pink in `[checkpoint2023drainers]`.
- 2024 category-level share decomposition in `[slowmist2024report]` (Venom as a lower-tier entry alongside the Inferno / Angel / Pink top tier).
- No dedicated per-incident example in [`examples/`](../examples/) as of v0.1; future contributors writing a Venom per-incident example should explicitly mark the chain (EVM vs Solana / Tron) at the head of the write-up because of the multichain-claim caveat below.

## Detection / attribution signals

- **EVM-side spender-cluster fingerprint.** Per `[checkpoint2023drainers]`, Venom's EVM on-chain spender re-use is observable as a distinct cluster from Inferno / Angel / Pink.
- **Take-percentage signature.** Affiliate-driven Venom flows show the canonical two-output split (affiliate hop + operator hop), consistent with the rest of the category.
- **Cluster-funder pattern.** Canonical OAK-T8.001 funder-graph pattern, shared with the broader category.
- **Multichain-claim caveat.** The Venom kit is marketed as supporting Solana and Tron in addition to EVM; defenders consuming Venom-attributed reports should treat non-EVM attributions as **inferred-weak** at v0.1 unless a published forensic source establishes the cluster. The OAK framework does not currently have separate Solana / Tron technique IDs that map cleanly onto SPL-token-approval or TRC-20-allowance flows, and Venom-attributed Solana / Tron incidents should be filed under the closest EVM-canonical OAK-T4.x ID with an explicit chain note.

## Citations

- `[checkpoint2023drainers]` — 2023-baseline EVM Venom-spender characterisation alongside category peers.
- `[slowmist2024report]` — 2024 category-level share decomposition; Venom as a lower-tier category peer.

## Discussion

Venom Drainer is the canonical OAK-G02 case for the *aggressively-multichain-marketed* lower-tier entry. Its EVM-side activity is unremarkable within the category — recognisable spender clusters, canonical take-percentage, canonical OAK-T8.001 funder graph — but the kit's marketed Solana / Tron support is the distinguishing feature in industry forensic posts.

For OAK contributors, the practical implication is that Venom's lineage entry sits at the boundary of the v0.1 Technique catalogue: the canonical OAK-T4.001 / T4.004 / T4.005 IDs are EVM-flavoured, and Venom-attributed Solana / Tron activity exposes a TAXONOMY-GAPS edge (see [`TAXONOMY-GAPS.md`](../TAXONOMY-GAPS.md)) that the framework will need to address as the broader category's multichain footprint expands. Venom does not appear to have been part of the October 2024 Inferno → Angel handover; its lineage is parallel to the Monkey → Inferno → Angel chain rather than upstream or downstream of it.
