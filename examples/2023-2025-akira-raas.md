# Akira Ransomware-as-a-Service — 2023–2025

**Loss:** **Aggregate: ~$42M in confirmed ransom-payment proceeds** across the cluster's first 10 months of operation (March 2023 – January 2024, per CISA AA24-109A). Akira (OAK-G16) is a Conti-codebase-related Ransomware-as-a-Service operation that launched in March 2023 with a distinctive retro-1980s-terminal leak-site aesthetic. The cluster had approximately 250 confirmed victim organisations through January 2024, with Bitcoin-denominated ransom payments and a cross-platform encryptor lineage (C++ and Rust/Megazord variants) targeting Windows, Linux, and VMware ESXi.
**OAK Techniques observed:** **OAK-T5.008** (Ransomware Extortion Payment) — Bitcoin-denominated ransom payments across 250+ victim organisations. **OAK-T7.005** (Privacy-Chain Hops) — downstream Monero conversion consistent with the broader post-Conti RaaS laundering profile. **OAK-T8.001** (Cluster Reuse / Operator Fingerprinting) — Akira's Conti-codebase-related lineage, Cisco-VPN-without-MFA initial-access vector preference, and Megazord Rust encryptor variant distinguish the cluster from other Conti-successor brands.
**OAK-Gnn:** [OAK-G16 Akira](../actors/OAK-G16-akira.md).
**Attribution:** **confirmed** at the cluster-and-tooling level — CISA/FBI/Europol EC3/Netherlands NCSC-NL joint advisory AA24-109A "StopRansomware: Akira Ransomware" (April 2024, `[cisa2024aa24109aakira]`); multi-vendor industry-forensic corroboration (Mandiant, Microsoft Storm-1567, Sophos X-Ops, `[sophos2023akira]`). The Conti-codebase-related lineage claim is **inferred-strong**.

**Key teaching point:** Akira represents the second-largest Conti-successor RaaS brand (after Black Basta) by confirmed ransom-payment volume tracked at v0.1. The cluster's Megazord Rust-based encryptor redevelopment in late-2023 is a structural signal: the encryptor-codebase evolution from C++ to Rust is a defender-relevant fingerprint for tracking Conti-successor RaaS codebase convergence-vs-divergence across the post-ContiLeaks operator diaspora.

## Summary

Akira launched in March 2023 on Russian-language criminal forums, approximately 11 months after the Black Basta launch (April 2022), representing a later wave of Conti-successor brand formation from the post-ContiLeaks operator dispersal. The cluster's distinctive operational branding — a retro-1980s-terminal aesthetic on the leak site, with green-on-black text and command-line-interface styling — has been used as a low-fidelity operator-self-identification signal in industry-forensic tracking.

TTPs: (1) initial access primarily via exploitation of unpatched Cisco VPN appliances without multi-factor authentication, plus external-facing RDP and spear-phishing; (2) double-extortion model with data exfiltration to the Akira leak site prior to encryption; (3) cross-platform encryptor development across the cluster's operating window — initial C++ encryptor (Windows, Linux, ESXi) followed by the Megazord Rust-based redevelopment in late 2023 that maintained the cross-platform footprint; (4) Bitcoin-denominated ransom payments with Monero conversion as the downstream default.

The CISA AA24-109A advisory (April 2024) characterised Akira as having affected approximately 250 organisations across manufacturing, education, financial-services, and other sectors through January 2024. The cluster's preference for Cisco-VPN-without-MFA as an initial-access vector is a distinctive TTP fingerprint relative to other Conti-successor brands.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-03 | Akira RaaS launches on Russian-language criminal forums; leak site goes live | (cluster emergence) |
| 2023-03–2024-01 | 250+ victim organisations; ~$42M in confirmed ransom-payment proceeds | T5.008 |
| 2023-late | Megazord Rust-based encryptor variant released; cross-platform Windows/Linux/ESXi coverage maintained | (encryptor evolution) |
| 2024-04 | CISA/FBI/Europol/NCSC-NL joint advisory AA24-109A — formal Akira cluster characterisation | (attribution milestone) |
| Continuing | Akira RaaS remains active at v0.1 cutoff | (ongoing) |

## Public references

- CISA/FBI/Europol EC3/Netherlands NCSC-NL: AA24-109A — StopRansomware: Akira Ransomware, April 18, 2024 (`[cisa2024aa24109aakira]`).
- Sophos X-Ops: Megazord — The Rust-based Akira encryptor, late 2023 (`[sophos2023akira]`).
- Mandiant: Akira cluster tracking and FBI Flash corroboration.
- Microsoft: Storm-1567 — Akira-affiliated sub-cluster characterisation.
