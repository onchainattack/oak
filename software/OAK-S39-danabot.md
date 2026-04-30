# OAK-S39 — DanaBot

**Type:** malware / banking trojan + commodity loader
**Aliases:** DanaBot (the canonical industry naming since 2018); MITRE ATT&CK ID S0634. Some early 2018 reporting tracked DanaBot under the placeholder name "Trojan.Win32.Spy" before family-level naming stabilised.
**Active:** yes through May 2024 (Operation Endgame target). Post-Operation-Endgame the operating-tempo has been significantly reduced; activity continues through 2025 at lower volume.
**First observed:** 2018-05.
**Used by Groups:** ecosystem-wide. Documented in the kill chains feeding OAK-G05 LockBit, OAK-G10 ALPHV/BlackCat, OAK-G11 Black Basta, OAK-G16 Akira, plus the historical OAK-S26 Conti operator-cohort era. Operator-cohort substrate is Russian-cybercrime-ecosystem.
**Host platforms:** Windows (primary, all variants).
**Observed Techniques:** OAK-T11.001 / OAK-T11.002 broadly construed (initial-access into custody and signing-infrastructure organisations as the precursor to post-exploitation), OAK-T8.001 (common-funder cluster-reuse documenting operator-cohort continuity).

## Description

DanaBot is a Russian-cybercrime-ecosystem banking trojan and commodity loader operationally analogous to OAK-S38 IcedID. It originated in 2018 as a banking-credential-theft trojan distributed via malvertising and phishing; by approximately 2020 the operator cohort had pivoted DanaBot to the loader role (mirroring IcedID's earlier pivot), increasingly delivering ransomware payloads as banking-trojan returns declined relative to ransomware. Through 2022–2024, DanaBot was a consistent — though typically lower-volume than IcedID — initial-access loader for the Russian-speaking operator cohort.

DanaBot's distinguishing characteristics relative to IcedID and Pikabot are (a) longer continuous operating history at family level (2018 → 2024 unbroken before Operation Endgame), (b) modular plugin architecture supporting both banking-credential-theft and ransomware-loader operations from a shared codebase, and (c) a small but persistent legitimate-banking-trojan deployment surface against Australian, German, Italian, and Polish banking-customer cohorts that distinguished its targeting profile from purely-ransomware-loader-class peers.

**Operation Endgame (May 2024)** disrupted DanaBot infrastructure alongside IcedID, Pikabot, Bumblebee, SmokeLoader, SystemBC, and TrickBot in the Europol-coordinated multi-jurisdictional operation. Post-Operation-Endgame DanaBot's operating tempo has been observably softer through late 2024 and 2025, though the family has not been declared definitively dormant.

## Observed examples

- **2018–2020 banking-trojan cohort.** DanaBot's historical core operating role was credential-theft against Australian, German, Italian, and Polish banking customers; significant academic and industry literature documented this period including Proofpoint, ESET, and CrowdStrike.
- **2020–2024 ransomware-loader pivot.** DanaBot observed delivering Cobalt Strike Beacon (OAK-S37) and operator-of-record ransomware payloads across the Russian-speaking operator-cohort substrate.
- **Operation Endgame (May 2024) target scope.** DanaBot was a named-and-targeted infrastructure component of the Europol-coordinated operation.

## Detection / attribution signals

- **Distribution chain fingerprints.** Malvertising-driven SocGholish-and-similar fake-update-page chains; phishing-email Office-macro-armed and PDF-with-embedded-LNK delivery; HTML-smuggling-armed attachments in 2023–2024.
- **Plugin architecture markers.** DanaBot's modular plugin design produces characteristic process-injection and persistence-mechanism patterns documented across Proofpoint, ESET, and CrowdStrike threat-intelligence reporting.
- **C2-network signatures.** HTTP / HTTPS C2 with characteristic URI patterns and TLS fingerprint clustering; sophisticated post-2022 variants rotate infrastructure aggressively.
- **Cohort-attribution via post-loader payload selection.** As with IcedID and Pikabot, the choice of post-loader payload is a load-bearing cohort-attribution surface; the same operator cohort can run DanaBot in parallel with IcedID-and-Pikabot campaigns from a single personnel substrate.

Note: omit specific file hashes; behavioural patterns and distribution-chain fingerprints are the appropriate detection variables.

## Citations

- `[cisaaa24131a]` — CISA / FBI / HHS / MS-ISAC advisory AA24-131A on Black Basta; relevant for the initial-access-loader substrate context.
- `[microsoftstorm1811]` — Microsoft Threat Intelligence Storm-1811 / Black Basta tracking; relevant for the broader loader-cohort role.
- `[chainalysis2024lockbit]` — Chainalysis LockBit on-chain tracking; relevant for the loader-fed LockBit-affiliate cohort.

## Discussion

DanaBot's framework-level role for OAK is structurally identical to OAK-S38 IcedID + Pikabot: an initial-access-loader-and-banking-trojan substrate that feeds the Russian-speaking operator-cohort encryptor-and-extortion brands documented in OAK-G05 through OAK-G18. The decision to give DanaBot its own OAK-S entry rather than absorbing it into S38 reflects (a) its longer continuous operating history at family level, (b) the persistent legitimate-banking-trojan-of-record deployment surface that distinguishes its targeting profile from purely-ransomware-loader peers, and (c) the cleanly-separable Operation Endgame-target-scope inclusion that warrants per-family disruption-tracking.

A v0.x update may revisit this decomposition if the post-Operation-Endgame operating-tempo data continues to suggest substantial cohort-level overlap with the IcedID-and-Pikabot operating substrate; for v0.1 the per-family entry framing reflects the family-naming convention used by the canonical CTI vendors (Proofpoint, ESET, CrowdStrike, Microsoft Threat Intelligence).

Defenders working operator-cohort-attribution should treat DanaBot, IcedID, and Pikabot as substantially-overlapping initial-access-loader-substrates feeding the same operator cohort; cohort-level attribution from any one loader's presence is generally weaker than cohort-level attribution from the post-loader payload selection (Cobalt Strike Beacon configuration → operator-specific encryptor) plus on-chain laundering route.
