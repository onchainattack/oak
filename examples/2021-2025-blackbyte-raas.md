# BlackByte Ransomware-as-a-Service — 2021–2025

**Loss:** **Aggregate ransom-payment volume not publicly quantified at cluster level at v0.1.** BlackByte (OAK-G17) is the earliest-launching of the major Conti-codebase-related successor brands tracked in OAK v0.1, emerging in July 2021 — approximately seven months before the February–May 2022 ContiLeaks dispersal of the parent Conti/Wizard Spider organisation. The cluster's high-profile attacks include the February 2022 encryption of the San Francisco 49ers professional sports franchise and sustained targeting of U.S. critical-infrastructure entities across manufacturing, government facilities, and financial services. Bitcoin-denominated ransom payments with Monero-conversion downstream.
**OAK Techniques observed:** **OAK-T5.008** (Ransomware Extortion Payment) — Bitcoin-denominated ransom payments across the cluster's July 2021–present operating window. **OAK-T7.005** (Privacy-Chain Hops) — downstream Monero conversion. **OAK-T8.001** (Cluster Reuse / Operator Fingerprinting) — BlackByte's multi-language encryptor lineage (.NET / C++ / Go) and the Trustwave-disclosed symmetric-key-reuse cryptographic flaw in the original BlackByte encryptor are cluster-distinctive TTP signals.
**OAK-Gnn:** [OAK-G17 BlackByte](../actors/OAK-G17-blackbyte.md).
**Attribution:** **confirmed** at the cluster-and-tooling level — joint FBI/U.S. Secret Service advisory on BlackByte Ransomware (February 2022 Flash, `[fbi2022blackbyteflash]`); multi-vendor industry-forensic corroboration (Mandiant, Microsoft, Sophos, Trustwave SpiderLabs, Symantec, `[trustwave2021blackbyte]`). The Conti-splinter lineage claim is **inferred-strong**.

**Key teaching point:** BlackByte is the structurally earliest-launching Conti-successor RaaS brand in OAK v0.1: the cluster's July 2021 emergence predates the ContiLeaks dispersal (February–May 2022), meaning BlackByte represents a pre-dispersal Conti-side-channel spin-off rather than a post-dispersal brand formation. The Trustwave-disclosed symmetric-key-reuse implementation flaw in the original BlackByte encryptor — which allowed publication of a free decryptor — is a structural reminder that RaaS encryptor code-quality varies widely, producing defender-actionable cryptographic errors.

## Summary

BlackByte emerged in July 2021 as one of the earliest Conti-side-channel successor operations, predating the ContiLeaks dispersal by approximately seven months. The cluster's encryptor lineage spans .NET, C++, and Go — with the Go variant serving as a defender-relevant fingerprint tracked through 2022–2023 industry-forensic write-ups.

The February 2022 San Francisco 49ers attack was the highest-profile BlackByte-attributed incident: the NFL franchise's corporate IT network was encrypted, with data exfiltrated to the BlackByte leak site. The same month, the FBI and U.S. Secret Service issued a joint Flash advisory characterising BlackByte's TTPs against U.S. critical-infrastructure entities.

Trustwave SpiderLabs' late-2021 analysis of the BlackByte encryptor identified a symmetric-key-reuse implementation flaw: the encryptor used a single symmetric key for all victim operations, allowing Trustwave to publish a free decryptor. BlackByte subsequently redeveloped the encryptor to address the cryptographic flaw.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021-07 | BlackByte RaaS launches on Russian-language criminal forums — earliest Conti-side-channel successor brand | (cluster emergence) |
| 2021-late | Trustwave SpiderLabs publishes free BlackByte decryptor following symmetric-key-reuse flaw discovery | (encryptor vulnerability) |
| 2022-02 | San Francisco 49ers encrypted; FBI/U.S. Secret Service joint Flash advisory issued | T5.008 |
| 2022–2023 | Go-language BlackByte encryptor variant documented; cross-platform development continues | (encryptor evolution) |
| Continuing | BlackByte RaaS remains active at v0.1 cutoff | (ongoing) |

## Public references

- FBI / U.S. Secret Service: Joint Flash advisory on BlackByte Ransomware, February 11, 2022 (`[fbi2022blackbyteflash]`).
- Trustwave SpiderLabs: BlackByte encryptor symmetric-key-reuse analysis and free decryptor publication, late 2021 (`[trustwave2021blackbyte]`).
- NFL / San Francisco 49ers: BlackByte attack disclosure, February 2022.
- Mandiant / Microsoft / Sophos / Symantec: multi-vendor BlackByte cluster tracking.
