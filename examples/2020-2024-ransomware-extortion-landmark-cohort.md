# Landmark Ransomware Extortion Cohort — 2020–2024 — 12 Incidents

**OAK Techniques observed:** OAK-T5.008, OAK-T7.001, OAK-T7.002
**Attribution:** **unattributed** (aggregate cohort of 12 ransomware incidents by multiple operators).

**Corrected 2026-10-11:** Removed the unsourced "~$225M+" aggregate and the Chainalysis "30–50%" figure; marked payment amounts that are press reports or demands rather than confirmed payments (Garmin, CNA, Brenntag, Travelex); fixed Optus (data extortion, demand retracted), Kronos (no ransom-payment source), Kaseya (decryptor provenance) and Cognizant (attribution disputed).

**Loss:** No reliable aggregate. Reported ransom payments range from \$1.14M (UCSF, `[ucsf]`) to a reported \$40M (CNA Financial, `[cna]`, a Bloomberg report that CNA did not confirm). Several incidents (Colonial Pipeline, JBS Foods, Kaseya) had economic impact far exceeding the ransom payment due to operational disruption of critical infrastructure. The 2021 cluster — Colonial Pipeline, JBS Foods, Kaseya VSA, CNA Financial, Brenntag — within a six-month window (March–July 2021) marked the inflection point where ransomware transitioned from a corporate nuisance to a national-security priority, triggering the U.S. government's whole-of-government ransomware response (the specific policy measures originally listed here are not sourced in this file).

**Key teaching point:** The 2021 ransomware inflection — five landmark incidents in six months against critical infrastructure and Fortune 500 targets — is commonly treated as a turning point for ransomware policy; that framing is editorial and not sourced here. The Colonial Pipeline partial recovery (about 63.7 BTC, roughly \$2.3M, seized under a warrant approved in the Northern District of California `[colonial]`) demonstrated that blockchain traceability applies to ransomware proceeds, contradicting the "Bitcoin is anonymous" misperception that had previously emboldened ransomware operators. The RaaS (ransomware-as-a-service) model, where a core operator develops malware and infrastructure while affiliates conduct intrusions and split proceeds, produces a characteristic two-hop on-chain payment structure (victim → affiliate → operator) that is the primary T5.008 detection signal at the address-clustering layer.

## Summary

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2020-01 | Travelex: Sodinokibi/REvil ransomware encrypts Travelex currency-exchange systems on New Year's Eve; reported \$2.3M (about 285 BTC) payment per a WSJ report `[travelex]`; Travelex forced into administration in August 2020 — early REvil operation before the group's 2021 escalation | **T5.008** |
| 2020-04 | Cognizant: Maze ransomware group compromises Cognizant IT services; Cognizant's CFO put the Q1 revenue and margin hit at \$50–70M `[cognizant]`; the company cited Maze's signature but Maze reportedly denied responsibility | **T5.008** |
| 2020-06 | UCSF: NetWalker ransomware encrypts UCSF School of Medicine servers; \$1.14M payment negotiated from an initial \$3M demand `[ucsf]`; NetWalker was later disrupted by a DOJ-led international operation in January 2021 | **T5.008** |
| 2020-07 | Garmin: WastedLocker (Evil Corp) ransomware encrypts Garmin's navigation, fitness, and aviation systems worldwide, grounding Garmin aviation services; a "multi-million dollar" payment was reported via Arete IR (the \$10M figure is a reported demand, not a confirmed payment) `[garmin]`; the incident made ransomware tangible to consumers as Garmin watches and apps went offline for days | **T5.008** |
| 2021-03 | CNA Financial: Phoenix ransomware group encrypts one of the largest U.S. cyber-insurance carriers; reported \$40M payment after an initial \$60M demand, ransomware tied to Phoenix Locker; CNA declined to comment on the ransom `[cna]` | **T5.008** |
| 2021-05 | Brenntag: DarkSide ransomware group encrypts the chemical-distribution giant's North American division; reported \$4.4M Bitcoin payment on 2021-05-11 (Brenntag did not confirm it in sources found) `[brenntag]`; same DarkSide group as Colonial Pipeline | **T5.008** |
| 2021-05 | Colonial Pipeline: DarkSide ransomware encrypts the billing and scheduling systems of the largest U.S. refined-oil-products pipeline; Colonial reported paying about 75 BTC; the DOJ seized about 63.7 BTC (~\$2.3M) on 2021-06-07 under a warrant approved in the Northern District of California `[colonial]` | **T5.008** + **T7.001** + **T7.002** |
| 2021-06 | JBS Foods: REvil ransomware encrypts JBS meat-processing infrastructure across the U.S., Canada, and Australia, JBS USA confirmed paying the equivalent of \$11M after an initial \$22.5M demand `[jbs]` | **T5.008** |
| 2021-07 | Kaseya VSA: REvil exploits a zero-day in Kaseya's VSA remote-management platform to deploy ransomware to an estimated ~1,500 downstream businesses; REvil demanded \$70M for a universal decryptor `[kaseya]`; Kaseya never paid and said it received a decryptor from a "trusted third party"; the Washington Post reported (relayed by MSSP Alert) that the FBI held a REvil decryption key for nearly three weeks `[kaseyafbi]` | **T5.008** |
| 2021-12 | Kronos: ransomware encrypts Ultimate Kronos Group's HR/payroll SaaS platform, UKG became aware of unusual activity in the Kronos Private Cloud late on 2021-12-11, later determined to be ransomware, with restoration expected to take weeks `[kronos]`; no source located for a ransom payment, so the original claim that one was paid is removed | **T5.008** |
| 2022-09 | Optus: Australian telecom Optus suffers a data breach (not an encryption attack); the actor "optusdata" demanded US\$1M and withdrew the demand on 2022-09-27 after releasing a sample of customer records; neither Optus nor the AFP verified the demand `[optus]` | **T5.008** |
| 2022-10 | Medibank: Australian health insurer Medibank suffers a data breach; the attackers demanded \$10M, Medibank refused and data was published; in January 2024 Australia sanctioned Russian national Aleksandr Ermakov, tied to REvil, the first sanction imposed under that 2011 statute, with the UK and US following `[medibank]` | **T5.008** |

## Coverage note

These 12 incidents are the landmark ransomware cases whose on-chain payment footprint is either publicly confirmed (ransom payment acknowledged by the victim), law-enforcement-disclosed (FBI seizure, DOJ indictment), or industry-report-confirmed (blockchain-intelligence firm attribution). They complement the existing individual OAK ransomware examples (Change Healthcare, Caesars Entertainment, MGM Resorts, MOVEit/Cl0p, LockBit Operation Cronos, Ethereum Validator DDoS Extortion) which document the operational-chronology, laundering-chain, and attribution details of each specific incident.

Ransomware payments are systematically undercounted: many victims pay without public disclosure, and attribution of on-chain payments to specific ransomware incidents depends on victim cooperation with blockchain-intelligence firms. The size of the gap between publicly-confirmed and total payments is not quantified here. OAK's T5.008 coverage is therefore a **documented-floor** rather than a comprehensive enumeration.

## Public references

- `[travelex]` — BankInfoSecurity, "Travelex Paid \$2.3 Million to Ransomware Gang: Report" (2020-04): <https://www.bankinfosecurity.com/travelex-paid-23-million-to-ransomware-attackers-report-a-14094>
- `[cognizant]` — Infosecurity Magazine, "Cognizant: Ransomware Costs Could Reach \$70m" (2020-05): <https://www.infosecurity-magazine.com/news/cognizant-ransomware-costs-could/>
- `[ucsf]` — Dark Reading, "University of California SF Pays Ransom After Medical Servers Hit" (2020-06): <https://www.darkreading.com/attacks-breaches/university-of-california-sf-pays-ransom-after-medical-servers-hit>
- `[garmin]` — Silicon UK, "Garmin Paid Millions Of Dollars In Ransom After Attack – Report" (2020-08): <https://www.silicon.co.uk/e-regulation/garmin-paid-millions-ransomware-346793>
- `[cna]` — Computing, "CNA Financial paid \$40 million to hackers" (2021-05): <https://computing.co.uk/news/4031845/cna-financial-paid-usd-million-hackers>
- `[brenntag]` — Business Insurance, "Brenntag pays over \$4 million ransom to retrieve stolen data" (2021-05-14): <https://www.businessinsurance.com/article/20210514/STORY/912341837/Brenntag-pays-over-$4-million-ransom-to-retrieve-stolen-data>
- `[colonial]` — Dark Reading, "DoJ Seizes \$2.3M in Bitcoin Paid to Colonial Pipeline Attackers" (2021-06): <https://www.darkreading.com/cyberattacks-data-breaches/doj-seizes-2-3m-in-bitcoin-paid-to-colonial-pipeline-attackers>
- `[jbs]` — Security Affairs, "JBS paid \$11 million to REvil ransomware out of \$22.5M requested" (2021-06): <https://securityaffairs.com/118814/cyber-crime/jbs-revil-ransomware-2.html>
- `[kaseya]` — Infosecurity Magazine, "REvil Group Demands \$70 Million for 'Universal Decryptor'" (2021-07): <https://www.infosecurity-magazine.com/news/revil-70-million-universal/>
- `[kaseyafbi]` — MSSP Alert, "FBI Withheld REvil Ransomware Decryptor Key as Some MSPs Suffered Encryption": <https://www.msspalert.com/cybersecurity-news/fbi-withheld-revil-ransomware-decryptor-key-as-some-msps-suffered-encryption/>
- `[kronos]` — Help Net Security, "Ransomware hits HR solutions provider Kronos, locking customers out of vital services" (2021-12-14): <https://www.helpnetsecurity.com/2021/12/14/kronos-ransomware/>
- `[optus]` — TechRadar, "Optus data hacker backflips on ransom demand, apologises to users" (2022-09-27): <https://www.techradar.com/news/breaking-optus-data-hacker-backflips-on-ransom-demand-apologises-to-users>
- `[medibank]` — The Record, "Aleksandr Ermakov" sanctions by UK, US, Australia (2024-01): <https://therecord.media/uk-us-australia-sanction-russian-ermakov-medibank>
