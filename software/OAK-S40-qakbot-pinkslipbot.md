# OAK-S40 — Qakbot / Pinkslipbot / QBot

**Type:** malware / banking trojan + commodity loader
**Aliases:** Qakbot (the dominant industry naming since approximately 2010); QBot (CrowdStrike historical naming); Pinkslipbot (an earlier-era name from Symantec / Broadcom). external cyber-threat-intel taxonomy ID S0650. One of the longest-running individual malware families on the OAK-relevant timeline.
**Active:** sunset for original infrastructure post-August 2023 (Operation Duck Hunt). Cohort-level operating substrate persists in OAK-S38 Pikabot which is structurally a successor-and-overlap loader rebuilt by the same Russian-cybercrime-ecosystem operator cohort.
**First observed:** approximately 2008 (initial banking-trojan operation; some pre-2008 ancestor variants are documented but the family-level naming stabilises at 2008–2010).
**Used by Groups:** ecosystem-wide. Documented in the kill chains feeding OAK-G05 LockBit, OAK-G10 ALPHV/BlackCat, OAK-G11 Black Basta, OAK-G14 Cl0p, plus the historical OAK-S26 Conti operator-cohort era. Operator-cohort substrate is Russian-cybercrime-ecosystem.
**Host platforms:** Windows (primary, all variants).
**Observed Techniques:** OAK-T11.001 / OAK-T11.002 broadly construed (initial-access into custody and signing-infrastructure organisations as the precursor to post-exploitation), OAK-T8.001 (common-funder cluster-reuse documenting operator-cohort continuity).

## Description

Qakbot is the longest-running individual malware family in the OAK-relevant Russian-cybercrime-ecosystem loader substrate. Originally a banking trojan (the Pinkslipbot-era operating role), Qakbot pivoted to the commodity-loader role in approximately 2018–2019 as the Russian-speaking operator cohort consolidated initial-access tooling around the ransomware-affiliate substrate. Through 2020–2023 Qakbot was, alongside IcedID (OAK-S38), one of the two dominant initial-access loaders feeding the Conti / Black Basta / LockBit / Cl0p operator-of-record substrate per Mandiant, Microsoft Threat Intelligence, CrowdStrike, and Sophos tracking.

**Operation Duck Hunt (August 2023)** was the canonical disruption event: a U.S. Department of Justice + FBI + Europol-coordinated operation that seized Qakbot infrastructure across the U.S., the Netherlands, France, Germany, the U.K., Romania, and Latvia, redirected approximately 700,000 compromised hosts to FBI-controlled sinkholes, and pushed an FBI-developed uninstaller payload to those hosts. Operation Duck Hunt is one of the largest actively-pushed-uninstall operations on the public record and substantially eliminated the operating Qakbot deployment substrate as it existed in August 2023.

The post-Operation-Duck-Hunt Russian-cybercrime-ecosystem cohort response was to **rebuild equivalent operating substrate under the new family name Pikabot (OAK-S38)** within approximately 60–90 days. Pikabot's operator-persona inventory and infrastructure-bootstrap patterns overlap materially with the historical Qakbot operator inventory per Trend Micro, Elastic, and Zscaler analysis, which is why OAK-S38 documents IcedID and Pikabot as a combined entry rather than separating them. The Qakbot-to-Pikabot rebuild is one of the cleanest single-cohort disruption-and-recovery cases on the public record and is canonical for "operator-cohort-survives-takedown-by-rebuilding-under-new-family-name" framing in OAK-T8.001 / T8.002 cohort-continuity analysis.

## Observed examples

- **2018–2023 ransomware-loader cohort role.** Qakbot documented as a dominant initial-access loader for Conti / Black Basta / LockBit / Cl0p affiliate intrusions across the canonical CISA advisory corpus.
- **Operation Duck Hunt (August 2023) target scope.** Qakbot was the named-and-targeted infrastructure component of the DOJ + FBI + Europol-coordinated operation; canonical disruption-event reference; ~700,000 compromised hosts uninstalled via FBI-pushed uninstaller payload.
- **Post-takedown Pikabot rebuild (Q3-Q4 2023).** Cohort-level continuity to OAK-S38 Pikabot established by Q4 2023 per Trend Micro, Elastic, and Zscaler tracking.

## Detection / attribution signals

- **Historical-anchor framing.** Defenders should treat Qakbot as a historical-anchor entry rather than an active-detection target; Pikabot (OAK-S38) is the appropriate active-detection substrate for the Russian-cybercrime-ecosystem cohort that historically operated Qakbot.
- **Pre-takedown distribution chain fingerprints.** Phishing-email distribution with characteristic thread-hijacking-and-reply-chain-injection patterns; Office-macro-armed documents through approximately 2022; HTML-smuggling-armed attachments in 2022–2023.
- **CTI vendor coverage.** Microsoft Threat Intelligence, Mandiant, CrowdStrike, Sophos X-Ops, Trend Micro, Cisco Talos, and Recorded Future all maintain historical Qakbot tracking and continuous post-takedown cohort-continuity tracking through the Pikabot operating substrate.
- **Cluster-attribution via operator-cohort wallet substrate.** The Qakbot operator cohort's wallet substrate continuity into Pikabot is a load-bearing OAK-T8.001 cohort-continuity attribution signal for both Pikabot operating tempo and for the broader Russian-cybercrime-ecosystem ransomware-affiliate-cohort tracking.

Note: omit specific file hashes; the family is now historical from a hash-based-detection perspective, and the active operating substrate is OAK-S38 Pikabot.

## Citations

- `[cisaaa22046a]` — CISA / FBI / Secret Service advisory AA22-046A on Conti; documents Qakbot's role as a Conti-affiliate initial-access loader.
- `[cisaaa24131a]` — CISA / FBI / HHS / MS-ISAC advisory AA24-131A on Black Basta; documents Qakbot's historical role and Pikabot's successor-substrate continuity.
- `[mandiantcontileaks2022]` — Mandiant analysis of the ContiLeaks corpus; documents Qakbot as a dominant Conti-affiliate initial-access loader through 2022.
- `[microsoftstorm1811]` — Microsoft Threat Intelligence Storm-1811 / Black Basta tracking; documents Qakbot-to-Pikabot operator-cohort continuity.
- `[chainalysis2024lockbit]` — Chainalysis LockBit on-chain tracking; relevant for the Qakbot-fed LockBit-affiliate cohort.

## Discussion

Qakbot is the canonical OAK reference for the **takedown-as-temporary-disruption** framing: the August 2023 Operation Duck Hunt was one of the largest single actively-pushed-uninstall operations on the public record, and the operator cohort retained sufficient personnel and operating substrate to rebuild equivalent functionality under a new family name (Pikabot) within approximately 60–90 days. The Qakbot-to-Pikabot rebuild is, alongside the post-Cobalt-Strike-MORPHEUS shift to Sliver / Brute Ratel and the post-Operation-Endgame cohort recovery into Latrodectus, one of the three canonical 2023–2024 cases of operator-cohort-resilience-against-government-disruption.

Defenders writing operator-cohort-attribution should treat the Qakbot-to-Pikabot continuity as the load-bearing pattern: the personnel and operating substrate persist; only the family-of-record changes. The on-chain operator-cohort-wallet substrate (OAK-T8.001) is the canonical attribution surface that survives across the family rebrand.

The combined-entry framing in OAK-S38 Pikabot is the appropriate forward-looking detection target; this entry serves as the historical anchor for the family lineage and the disruption-event reference.
