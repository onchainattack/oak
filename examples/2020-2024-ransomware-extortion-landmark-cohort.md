# Landmark Ransomware Extortion Cohort — 2020–2024 — 12 Incidents — Aggregate ~$225M+

**OAK Techniques observed:** OAK-T5.008, OAK-T7.001, OAK-T7.002
**Attribution:** **unattributed** (aggregate cohort of 12 ransomware incidents by multiple operators).

**Loss:** Aggregate ~$225M+ across 12 landmark ransomware incidents spanning 2020–2024. Individual ransom payments range from $1.14M (UCSF) to $40M (CNA Financial). Several incidents (Colonial Pipeline, JBS Foods, Kaseya) had economic impact far exceeding the ransom payment due to operational disruption of critical infrastructure. The 2021 cluster — Colonial Pipeline, JBS Foods, Kaseya VSA, CNA Financial, Brenntag — within a six-month window (March–July 2021) marked the inflection point where ransomware transitioned from a corporate nuisance to a national-security priority, triggering the U.S. government's whole-of-government ransomware response (OFAC advisory, CISA JCDC, DOJ task forces, international Counter-Ransomware Initiative).

**Key teaching point:** The 2021 ransomware inflection — five landmark incidents in six months against critical infrastructure and Fortune 500 targets — established ransomware as the highest-volume crypto-crime category by extorted dollar value and drove the regulatory and law-enforcement architecture that now governs ransomware payment compliance. The Colonial Pipeline partial recovery (63.7 of 75 BTC seized by FBI) demonstrated that blockchain traceability applies to ransomware proceeds, contradicting the "Bitcoin is anonymous" misperception that had previously emboldened ransomware operators. The RaaS (ransomware-as-a-service) model, where a core operator develops malware and infrastructure while affiliates conduct intrusions and split proceeds, produces a characteristic two-hop on-chain payment structure (victim → affiliate → operator) that is the primary T5.008 detection signal at the address-clustering layer.

## Summary

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2020-01 | Travelex: Sodinokibi/REvil ransomware encrypts Travelex currency-exchange systems on New Year's Eve; $2.3M Bitcoin payment; Travelex forced into administration in August 2020 — early REvil operation before the group's 2021 escalation | **T5.008** |
| 2020-04 | Cognizant: Maze ransomware group compromises Cognizant IT services; $50-70M estimated total impact (service disruption, client notification, remediation); Maze pioneered the double-extortion model (encrypt + threaten to leak) that became the dominant ransomware TTP in 2020–2024 | **T5.008** |
| 2020-06 | UCSF: NetWalker ransomware encrypts UCSF School of Medicine servers; $1.14M Bitcoin payment negotiated from an initial $3M demand; NetWalker was later disrupted by a DOJ-led international operation in January 2021 | **T5.008** |
| 2020-07 | Garmin: WastedLocker (Evil Corp) ransomware encrypts Garmin's navigation, fitness, and aviation systems worldwide, grounding Garmin aviation services; ~$10M payment via Arete IR (ransomware negotiator); the incident made ransomware tangible to consumers as Garmin watches and apps went offline for days | **T5.008** |
| 2021-03 | CNA Financial: Phoenix ransomware group encrypts one of the largest U.S. cyber-insurance carriers; $40M Bitcoin payment — the largest confirmed single ransomware payment at the time; the irony of a cyber-insurance underwriter paying a record ransom drove significant industry reform in ransomware payment disclosure and cyber-insurance underwriting | **T5.008** |
| 2021-05 | Brenntag: DarkSide ransomware group encrypts the chemical-distribution giant's North American division; $4.4M Bitcoin payment ($4.4M in BTC) — the same DarkSide group and the same week as Colonial Pipeline; the dual DarkSide attacks on critical infrastructure within days of each other accelerated the U.S. government ransomware response | **T5.008** |
| 2021-05 | Colonial Pipeline: DarkSide ransomware encrypts the billing and scheduling systems of the largest U.S. refined-oil-products pipeline; 75 BTC ($4.4M) paid; FBI subsequently seized 63.7 BTC from a DarkSide address via a seizure warrant filed in the Northern District of California — the first high-profile U.S. government seizure of ransomware proceeds, proving blockchain follow-the-money works against ransomware | **T5.008** + **T7.001** + **T7.002** |
| 2021-06 | JBS Foods: REvil ransomware encrypts JBS meat-processing infrastructure across the U.S., Canada, and Australia, disrupting ~20% of U.S. beef production; $11M Bitcoin payment; the incident, alongside Colonial Pipeline, established critical infrastructure as a priority ransomware target class | **T5.008** |
| 2021-07 | Kaseya VSA: REvil exploits a zero-day in Kaseya's VSA remote-management platform to deploy ransomware to ~1,500 downstream organisations in a single supply-chain attack; $70M universal-decryptor demand — the largest known single ransomware demand; REvil infrastructure went dark shortly after; FBI obtained REvil decryption keys through a separate operation | **T5.008** |
| 2021-12 | Kronos: ransomware encrypts Ultimate Kronos Group's HR/payroll SaaS platform, disrupting payroll processing for thousands of organisations during the holiday season; Kronos paid an undisclosed ransom; the incident's timing (December holiday payroll) maximised leverage — a structural T5.008 pattern of operational-timing extortion | **T5.008** |
| 2022-09 | Optus: Australian telecom Optus suffers a data breach followed by an extortion demand of $1M in cryptocurrency for non-publication of the exfiltrated data; the incident intensified Australia's data-breach notification laws and raised the regulatory penalty ceiling | **T5.008** |
| 2022-10 | Medibank: Australian health insurer Medibank suffers a data breach of 9.7M customer records; the REvil-related group demands $10M in cryptocurrency for non-publication; Medibank refuses to pay; the Australian government subsequently designates the attacker under cyber-sanctions (the first use of Australia's autonomous cyber-sanctions framework) | **T5.008** |

## Coverage note

These 12 incidents are the landmark ransomware cases whose on-chain payment footprint is either publicly confirmed (ransom payment acknowledged by the victim), law-enforcement-disclosed (FBI seizure, DOJ indictment), or industry-report-confirmed (blockchain-intelligence firm attribution). They complement the existing individual OAK ransomware examples (Change Healthcare, Caesars Entertainment, MGM Resorts, MOVEit/Cl0p, LockBit Operation Cronos, Ethereum Validator DDoS Extortion) which document the operational-chronology, laundering-chain, and attribution details of each specific incident.

Ransomware payments are systematically undercounted: many victims pay without public disclosure, and attribution of on-chain payments to specific ransomware incidents depends on victim cooperation with blockchain-intelligence firms. The gap between publicly-confirmed payments and total payments is estimated at 30–50% by Chainalysis. OAK's T5.008 coverage is therefore a **documented-floor** rather than a comprehensive enumeration.

## Public references

- U.S. Department of Justice — Colonial Pipeline Bitcoin seizure press release, June 2021
- CISA — Kaseya VSA supply-chain ransomware advisory, July 2021
- FBI IC3 — annual Internet Crime Reports, 2020–2024
- OFAC — advisory on potential sanctions risks for facilitating ransomware payments, October 2021
- Chainalysis — ransomware annual reports, 2021–2025
- Each incident's SEC 8-K or equivalent regulatory filing where applicable
