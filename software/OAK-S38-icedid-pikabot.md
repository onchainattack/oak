# OAK-S38 — IcedID + Pikabot loaders

**Type:** malware / commodity loader (initial-access broker class)
**Aliases:** IcedID — also tracked as BokBot (CrowdStrike) and as TA551-and-derivatives (Proofpoint historical naming for some delivery cohorts). Pikabot — successor-and-overlap loader to Qakbot (OAK-S40), tracked by Trend Micro, Elastic, and Zscaler from early 2023. The two are combined into a single OAK-S entry because they share the Russian-cybercrime-ecosystem operator substrate, the initial-access-broker operating role, and the May 2024 Operation Endgame disruption-event scope.
**Active:** IcedID — yes (2017 → present, with reduced post-Operation-Endgame tempo). Pikabot — yes (2023 → present, with reduced post-Operation-Endgame tempo).
**First observed:** IcedID — 2017 (originally a banking-trojan; pivoted to ransomware-loader role from approximately 2020 onward). Pikabot — early 2023 (post-Qakbot-takedown gap-filling role established by Q2 2023).
**Used by Groups:** ecosystem-wide. Both loaders fed into the kill chains of OAK-G05 LockBit, OAK-G10 ALPHV/BlackCat, OAK-G11 Black Basta, OAK-G14 Cl0p, OAK-G16 Akira, OAK-G17 BlackByte, OAK-G18 Karakurt, plus the historical OAK-S26 Conti operator cohort. The Russian-speaking operator cohort that runs these loaders is the same substrate that runs the encryptors-and-extortion-only-brands described in OAK-G05 through OAK-G18.
**Host platforms:** Windows (primary, all variants).
**Observed Techniques:** OAK-T11.001 / OAK-T11.002 broadly construed (initial-access into custody-and-signing-infrastructure organisations as the precursor to post-exploitation lateral movement), OAK-T8.001 (common-funder cluster-reuse documenting operator-cohort continuity across loader-and-encryptor combinations).

## Description

IcedID and Pikabot are Russian-cybercrime-ecosystem commodity loaders that occupy the **initial-access-broker** role in the OAK-relevant ransomware kill chain. Both are delivered via phishing-email campaigns (the dominant vector since 2020) and via malvertising-driven download chains; both establish persistence on the victim host and deliver follow-on payloads — most commonly Cobalt Strike Beacon (OAK-S37) for post-exploitation, then operator-of-record-specific encryptors (LockBit / ALPHV / Black Basta / Akira) for the encryption-and-extortion event.

**IcedID** originated as a banking trojan in 2017, with credential-theft against banking-portal sessions as its initial monetisation surface. By approximately 2020, the operator cohort had pivoted IcedID to the loader role, increasingly delivering ransomware payloads as the banking-trojan return-on-effort declined relative to ransomware. Through 2022–2023, IcedID was the single most commonly-observed initial-access loader feeding the OAK-S26 Conti / OAK-G11 Black Basta operator-cohort intrusions per Mandiant and Microsoft Threat Intelligence reporting.

**Pikabot** emerged in early 2023 as a structural successor to Qakbot (OAK-S40) following the August 2023 Qakbot takedown (Operation Duck Hunt). The Pikabot operator persona inventory overlaps materially with the historical Qakbot operator inventory per Trend Micro, Elastic, and Zscaler analysis, suggesting cohort-level continuity rather than independent provenance. Pikabot's distribution shifted toward ClickFix-style fake-CAPTCHA social-engineering chains in 2024, mirroring the broader Russian-cybercrime-ecosystem distribution-vector evolution captured in OAK-S14 Lumma Stealer's notes.

**Operation Endgame (May 2024)** was the canonical disruption event for both loaders: a Europol-coordinated operation across the Netherlands, Germany, France, Denmark, the U.K., and the U.S. that disrupted IcedID, Pikabot, Bumblebee, SmokeLoader, SystemBC, and TrickBot infrastructure simultaneously. Operation Endgame is, alongside the August 2023 Qakbot Operation Duck Hunt and the July 2024 Cobalt Strike Operation MORPHEUS, one of the three largest government-and-industry actions against the Russian-cybercrime-ecosystem commodity-tooling substrate in the OAK reference period. Post-Operation-Endgame both loaders show reduced operating-tempo through late 2024 and early 2025, but the operator cohorts have substantially shifted to alternatives (notably Latrodectus and renewed Bumblebee variants).

## Observed examples

- **OAK-S26 Conti / OAK-G11 Black Basta initial-access cohort (2021–2024).** IcedID documented as the dominant initial-access loader for Conti-and-Black-Basta-affiliate intrusions per `[mandiantcontileaks2022]` and `[cisaaa24131a]`.
- **OAK-G16 Akira / OAK-G17 BlackByte initial-access cohort (2023–2024).** IcedID and Pikabot both observed as initial-access loaders per the respective CISA advisories.
- **Operation Endgame (May 2024) target scope.** Both IcedID and Pikabot were named-and-targeted infrastructure components of the Europol-coordinated operation; canonical disruption-event reference.

## Detection / attribution signals

- **Phishing-email and malvertising distribution patterns.** IcedID has historically been delivered via Microsoft Office macro-armed documents and via PDF-with-embedded-LNK chains; Pikabot's 2023–2024 distribution leaned toward ClickFix-style fake-CAPTCHA chains and HTML-smuggling-armed email attachments.
- **Process-tree fingerprints (host-layer).** Both loaders inject into legitimate Windows processes (svchost, explorer, browser processes); both maintain persistence via scheduled tasks and registry-Run keys with characteristic naming patterns documented per `[unit42beavertail2023]` and the broader Russian-loader-cohort tracking.
- **C2-network signatures.** Both loaders use HTTP / HTTPS C2 with characteristic URI patterns; sophisticated variants encrypt traffic and rotate C2 infrastructure. Microsoft Threat Intelligence and Trend Micro maintain continuous tracking of C2-infrastructure changes.
- **Cohort-attribution via post-loader payload selection.** The choice of post-loader payload (Cobalt Strike Beacon configuration → operator-specific encryptor) is itself a load-bearing cohort-attribution surface; the same operator cohort can run multiple loaders simultaneously in parallel campaigns.

Note: omit specific file hashes; both loader families produce many variants per week and hash-based detection is operationally insufficient.

## Citations

- `[mandiantcontileaks2022]` — Mandiant analysis of the ContiLeaks corpus; documents IcedID's role in Conti operator-cohort initial access.
- `[cisaaa24131a]` — CISA / FBI / HHS / MS-ISAC advisory AA24-131A on Black Basta; IcedID + Pikabot named as initial-access loaders.
- `[microsoftstorm1811]` — Microsoft Threat Intelligence Storm-1811 / Black Basta tracking; documents loader-cohort role.
- `[chainalysis2024lockbit]` — Chainalysis LockBit on-chain tracking; relevant for the loader-fed LockBit-affiliate cohort.

## Discussion

IcedID and Pikabot are framework-level important to OAK as the **initial-access-broker substrate** that connects Russian-cybercrime-ecosystem phishing-and-malvertising distribution infrastructure to the operator-of-record encryptor and extortion brands documented in OAK-G05 through OAK-G18. Defenders working detection for any of those operator cohorts must treat the loader layer as an upstream signal — operator-cohort-attribution from the encryptor event alone is decision-too-late if the goal is to interrupt the kill chain before encryption.

The combined-entry framing (IcedID + Pikabot in one OAK-S entry rather than two) reflects the cohort-level rather than family-level structure of the Russian-cybercrime-ecosystem loader substrate; OAK-S40 Qakbot is similarly a single-family entry but its successor-relationship to Pikabot is the dominant tracking observation of late 2023. A v0.x update may decompose this entry if the cohort substrate fragments materially (e.g., if Latrodectus stabilises as a third major Russian-cohort loader, OAK would add it as a separate entry and possibly split IcedID and Pikabot into independent entries).

Operation Endgame's measurable but transient effect on both loaders is the canonical case study for the "takedown-as-temporary-disruption" framing: the Russian-speaking operator cohort retains the personnel and operating substrate, and rebuilds infrastructure on a quarters-not-years timescale post-takedown. The takedown-vs-attribution-vs-prosecution chain remains structurally limited at the prosecution step for Russian-jurisdiction operators, which is the load-bearing constraint on durable disruption.
