# Karakurt encryption-free data-theft extortion operation — 2021–2025

**Loss:** **Aggregate extortion-payment volume not publicly quantified at cluster level at v0.1.** Karakurt (OAK-G18) is a Conti-side-channel data-extortion-only operation — the cluster steals data from victim organisations and threatens public disclosure, but does not deploy a ransomware encryptor. The absence of encryption makes Karakurt the prototype of the "data-extortion-without-encryption" operating model that OAK-G14 Cl0p adopted at scale from mid-2023 onward. The cluster emerged in mid-2021 from the broader Conti/Wizard Spider operator-cohort substrate and survived the May 2022 Conti dissolution as a standalone brand.
**OAK Techniques observed:** **OAK-T5.008** (Ransomware Extortion Payment) — cryptocurrency-denominated extortion payments under threat of data disclosure. Karakurt demonstrates the "encryption-free" sub-pattern of T5.008: the extortion lever is exclusively the threatened disclosure of stolen data, not the denial-of-access-to-encrypted-data that characterises traditional ransomware. **OAK-T15.001** (Social Engineering of Operator Personnel) — the initial-access vector for Karakurt intrusions. **OAK-T8.001** (Cluster Reuse / Operator Fingerprinting) — Karakurt's Conti-side-channel lineage and encryption-free TTP fingerprint distinguish it from encryptor-deploying Conti-successor brands.
**OAK-Gnn:** [OAK-G18 Karakurt](../actors/OAK-G18-karakurt.md).
**Attribution:** **confirmed** at the cluster-and-tooling level — multi-vendor industry-forensic corroboration (Mandiant, Microsoft, CrowdStrike, SentinelOne, Recorded Future, Chainalysis). The Conti-side-channel lineage claim is **inferred-strong** — overlap of operator personas and TTP fingerprint signal across the Conti-organisational substrate is documented but the cluster has not been individually OFAC-designated or DOJ-indicted at the principal-operator level as of v0.1.

**Key teaching point:** Karakurt is the prototype of the "data-extortion-only" T5.008 sub-pattern: the threat actor's extortion lever is exclusively the threatened public disclosure of exfiltrated data — there is no ransomware encryptor deployed. This operational model eliminates the encryption-implementation risk (no decryptor-quality variance, no cryptographic flaws for defenders to exploit), reduces operational complexity (no encryptor development/maintenance overhead), and produces a structurally different victim-to-attacker negotiation surface. The Cl0p group's adoption of the same encryption-free model from mid-2023 onward (OAK-G14) validated the Karakurt prototype at scale.

## Summary

Karakurt emerged in mid-2021 as a data-extortion sub-team within the broader Conti/Wizard Spider operator-cohort substrate. The cluster's name — Karakurt, the Central Asian black-widow spider — and its black-and-red leak-site visual identity ("Karakurt Lair") have been consistent across the cluster's 2021–present operating window.

The cluster's signature operational pattern: (1) initial access via exploitation of public-facing vulnerabilities, spear-phishing, and purchased network access; (2) lateral movement and data exfiltration to attacker-controlled infrastructure; (3) victim notification and negotiation via the Karakurt Lair Tor leak site, with cryptocurrency-denominated extortion payments demanded under threat of data disclosure; (4) no ransomware encryptor deployed — the extortion lever is exclusively the threat of leaked-data publication.

Karakurt survived the May 2022 Conti dissolution as a standalone operating brand, distinguishing it from Conti-successor brands that were catalysed (rather than merely pre-existing) by the ContiLeaks dispersal. The cluster's encryption-free model was subsequently adopted at scale by Cl0p (OAK-G14) from mid-2023 onward in the MOVEit, GoAnywhere, and Cleo data-theft campaigns — the Karakurt prototype became the dominant post-2023 data-extortion operational model.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021-mid | Karakurt emerges as Conti-side-channel data-extortion sub-team; Karakurt Lair leak site goes live | (cluster emergence) |
| 2021–2022 | Karakurt operates within the Conti/Wizard Spider substrate; data-theft extortion operations against U.S. and European targets | T5.008 |
| 2022-05 | Conti dissolution; Karakurt survives as standalone operating brand | (organisational event) |
| 2023–2025 | Cl0p adopts the Karakurt prototype encryption-free model at scale (MOVEit, GoAnywhere, Cleo campaigns) | (model diffusion) |
| Continuing | Karakurt data-extortion operation remains active at v0.1 cutoff | (ongoing) |

## Public references

- Mandiant / Microsoft / CrowdStrike / SentinelOne: multi-vendor Karakurt cluster tracking and TTP characterisation.
- Recorded Future: Karakurt Conti-side-channel lineage analysis.
- Chainalysis: Karakurt extortion-payment flow tracking and downstream laundering analysis.
