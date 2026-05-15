# Black Basta Ransomware-as-a-Service — 2022–2024

**Loss:** **Aggregate: ~$107M in confirmed Bitcoin ransom payments** across the cluster's first 18 months of operation (April 2022 – October 2023, per Elliptic 2024 retrospective). Black Basta (OAK-G11) is a closed Ransomware-as-a-Service operation that emerged in April 2022 from the Conti-organisational dispersal following the February–May 2022 ContiLeaks event. The cluster targeted hundreds of victim organisations — with disproportionate impact on the healthcare and critical-infrastructure sectors — and demanded Bitcoin-denominated ransom payments with Monero-conversion as a downstream norm.
**OAK Techniques observed:** **OAK-T5.008** (Ransomware Extortion Payment) — Bitcoin-denominated ransom payments with Monero-conversion as the laundering-first-step default. **OAK-T7.005** (Privacy-Chain Hops) — Monero conversion post-payment as a structural laundering signal. **OAK-T8.001** (Cluster Reuse / Operator Fingerprinting) — Black Basta's Conti-organisational-continuity lineage, QakBot loader chain, and Cobalt Strike post-exploit tooling enable cluster attribution distinct from other Conti-successor brands (Akira, BlackByte, Karakurt).
**OAK-Gnn:** [OAK-G11 Black Basta](../actors/OAK-G11-black-basta.md).
**Attribution:** **confirmed** at the cluster-and-tooling level — CISA/FBI/HHS/MS-ISAC joint advisory AA24-131A "StopRansomware: Black Basta" (May 2024, `[cisa2024aa24131ablackbasta]`); multi-vendor industry-forensic corroboration (Mandiant UNC4393, Microsoft Storm-1811, Elliptic $107M aggregate tracing, `[elliptic2024blackbasta]`). The Conti-organisational-continuity claim is **inferred-strong**. Attribution that *specific ransom-payment flows* trace to specific Black Basta affiliate wallets is **inferred-strong** from industry forensic providers.

**Key teaching point:** Black Basta is the canonical post-ContiLeaks RaaS anchor in OAK: the cluster represents the structurally largest (by confirmed ransom-payment volume) of the Conti-successor RaaS brands tracked in OAK v0.1. The cluster's operational profile — closed RaaS with vetted affiliates, Bitcoin-denominated ransom payments with Monero-conversion as the default laundering first step, and healthcare-sector targeting as a disproportionate pattern — is the structural template for the post-2022 Russian-language RaaS ecosystem.

## Summary

Black Basta emerged in April 2022 on Russian-language criminal forums, approximately two months into the ContiLeaks dispersal event that scattered the Conti/Wizard Spider operator-cohort into multiple successor brands (Black Basta, Akira, BlackByte, Royal, Karakurt, and others). The cluster operates as a closed RaaS — affiliates are vetted rather than openly recruited, and the operator core maintains tighter control over the encryptor codebase and negotiation infrastructure than open RaaS operations (e.g., LockBit).

The cluster's TTPs: (1) initial access via QakBot (QBot) loader chain, spear-phishing, and exploitation of public-facing vulnerabilities (particularly unpatched VMware ESXi hypervisors); (2) post-exploit tooling including Cobalt Strike, Empire, and BloodHound for lateral movement; (3) double-extortion model — data exfiltration to the "Basta News" Tor leak site prior to encryption, with the threat of public disclosure as a secondary extortion lever; (4) Bitcoin ransom demands with recommended Monero conversion.

The CISA AA24-131A advisory (May 2024) characterised Black Basta as having affected over 500 organisations across 16 critical-infrastructure sectors, with healthcare as the most frequently targeted sector. Elliptic's 2024 retrospective traced approximately $107M in confirmed Bitcoin ransom payments to Black Basta-attributable wallet clusters across the first 18 months of operation.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-02–05 | ContiLeaks dispersal; Conti/Wizard Spider operator-cohort fragments into successor brands | (organisational event) |
| 2022-04 | Black Basta RaaS launches on Russian-language criminal forums; "Basta News" leak site goes live | (cluster emergence) |
| 2022–2024 | 500+ victim organisations across 16 critical-infrastructure sectors; ~$107M in confirmed Bitcoin payments | T5.008 |
| 2024-05 | CISA/FBI/HHS/MS-ISAC joint advisory AA24-131A — formal Black Basta cluster characterisation | (attribution milestone) |
| 2024-late | Black Basta internal wind-down; successor activity continues under related brands | (organisational event) |

## Public references

- CISA/FBI/HHS/MS-ISAC: AA24-131A — StopRansomware: Black Basta, May 10, 2024 (`[cisa2024aa24131ablackbasta]`).
- Elliptic: Black Basta ransomware retrospective — $107M in confirmed Bitcoin payments, 2024 (`[elliptic2024blackbasta]`).
- Mandiant: UNC4393 tracking — Black Basta cluster characterisation.
- Microsoft: Storm-1811 / Storm-0506 sub-cluster attribution.
