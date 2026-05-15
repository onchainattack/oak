# Andariel Maui ransomware — healthcare-sector targeting — 2021–2024

**Loss:** **Per-victim loss, not a single-incident total.** Andariel (OAK-G09), a DPRK Reconnaissance General Bureau (RGB) sub-element, deployed the Maui ransomware family against U.S. and international healthcare-sector entities from approximately 2021 onward. The operational pattern — documented in the July 2022 CISA/FBI/Treasury joint advisory AA22-187A — is a DPRK-attributed ransomware operation with Bitcoin-denominated ransom payments that structurally overlaps with the cluster's cryptocurrency-mining intrusions on compromised DIB and engineering systems. The Rim Jong Hyok indictment (DOJ, July 2024) named a specific Andariel operator and detailed the multi-year healthcare-sector ransomware campaign.
**OAK Techniques observed:** **OAK-T5.008** (Ransomware Extortion Payment) — Maui ransomware deployments with Bitcoin-denominated ransom demands against healthcare targets. **OAK-T15.001** (Social Engineering of Operator Personnel) — the initial-access vector for Andariel intrusions against healthcare and DIB targets. **OAK-T8.001** (Cluster Reuse / Operator Fingerprinting) — Andariel's distinctive TTP fingerprint (Maui encryptor, xmrig cryptocurrency-mining deployments on compromised systems, DTrack reconnaissance tooling) enables cluster attribution distinct from both Lazarus Group (G01) and Kimsuky (G07).
**OAK-Gnn:** [OAK-G09 Andariel](../actors/OAK-G09-andariel.md).
**Attribution:** **confirmed** at the cluster-and-state-attribution level — OFAC SDN designation alongside Lazarus and BlueNoroff (September 2019, `[ofac2019dprkcyber]`); CISA/FBI/Treasury joint advisory AA22-187A (July 2022, `[cisa2022aa22187a]`); DOJ indictment of Rim Jong Hyok (July 2024, `[doj2024rimjonghyok]`); CISA/FBI/NSA/ROK NIS joint advisory (July 2024, `[cisa2024andarieladvisory]`).

**Key teaching point:** Andariel demonstrates the DPRK "ransomware-as-revenue-and-disruption" sub-cluster type: the cluster's primary missions are healthcare-sector ransomware for financial extraction and DIB/engineering intrusion for intelligence collection, with cryptocurrency-mining on compromised systems as a supplementary monetisation channel. This distinguishes G09 from G01 (Lazarus — crypto-exchange and DeFi-protocol theft as primary regime-revenue mission), G07 (Kimsuky/APT43 — strategic espionage with crypto as self-funding), and G08 (BlueNoroff — macOS-engineering-led crypto-firm financial theft).

## Summary

Andariel has been tracked as a distinct DPRK RGB sub-element since at least the mid-2010s, with the cluster's ransomware-and-cryptocurrency-mining operational pattern crystallising from approximately 2021 onward with the deployment of the Maui ransomware family against healthcare-sector targets.

The July 2022 CISA/FBI/Treasury joint advisory AA22-187A characterised the Maui ransomware operation: Andariel operators deployed Maui against U.S. healthcare and public-health (HPH) sector entities, encrypting systems and demanding Bitcoin-denominated ransom payments. The advisory noted that the HPH-sector targeting was consistent with DPRK state priorities (the DPRK healthcare system was under severe stress during the COVID-19 pandemic) and with the regime's broader cyber-enabled revenue-generation strategy.

The July 2024 DOJ indictment of Rim Jong Hyok named a specific Andariel operator and detailed a multi-year campaign of: (a) healthcare-sector ransomware attacks (Maui); (b) DIB-intrusion espionage against U.S. defence contractors and aerospace entities; (c) cryptocurrency-mining deployments (xmrig) on compromised engineering and manufacturing systems, with mined cryptocurrency routed to DPRK-controlled wallets. The accompanying \$10M State Department reward is the largest reward offered for a named DPRK cyber operator.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| ~2017 | Andariel DTrack / pre-Maui intrusion tooling observed; DIB targeting documented | (pre-crypto phase) |
| 2021 | Maui ransomware family deployed; healthcare-sector targeting pattern crystallises | T5.008 |
| 2022-07 | CISA/FBI/Treasury joint advisory AA22-187A — Maui ransomware characterised as DPRK-attributed HPH-sector threat | (attribution milestone) |
| 2024-07 | DOJ indictment of Rim Jong Hyok unsealed; \$10M State Department reward announced | (attribution milestone) |
| Continuing | Andariel ransomware and cryptocurrency-mining operations remain active at v0.1 cutoff | (ongoing) |

## Public references

- CISA/FBI/Treasury: AA22-187A — North Korean State-Sponsored Cyber Actors Use Maui Ransomware to Target the Healthcare and Public Health Sector, July 6, 2022 (`[cisa2022aa22187a]`).
- DOJ: indictment of Rim Jong Hyok, July 25, 2024 (`[doj2024rimjonghyok]`).
- CISA/FBI/NSA/ROK NIS/NPA/DSA/NCSC: joint advisory — North Korea state-sponsored cyber group conducts global espionage campaign, July 25, 2024 (`[cisa2024andarieladvisory]`).
- OFAC: Lazarus, BlueNoroff, and Andariel SDN designation, September 13, 2019 (`[ofac2019dprkcyber]`).
