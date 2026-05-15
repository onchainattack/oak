# DPRK IT worker exchange account farming — 2018–2025

**Loss:** **Infrastructure case, not a per-victim loss.** DPRK IT workers, operating under the OAK-G04 (DPRK IT Worker Scheme) actor designation, have used fabricated and stolen identities to obtain remote-work employment at cryptocurrency exchanges, DeFi protocols, and technology companies. The employment provides exchange-account access, internal-system access, and a salary paid in cryptocurrency — a multi-dimensional T8.004/T15.001/T11.001 threat surface. The aggregate value of salaries and access obtained through this scheme is estimated in the hundreds of millions of USD across all affected employers.
**OAK Techniques observed:** **OAK-T8.004** (Exchange Account Farming / Sybil Accounts) — the IT workers use fabricated identity documentation (forged passports, fabricated work histories, AI-generated profile photos) to create exchange accounts and pass KYC verification as legitimate employees. **OAK-T15.001** (Social Engineering of Operator Personnel) — the fake-recruiter and fake-applicant social-engineering chain that positions IT workers inside targeted organizations. **OAK-T11.001** (Third-Party Signing Vendor Compromise) — once employed, IT workers with access to exchange infrastructure or hot-wallet signing systems become an internal T11.001 threat.
**OAK-Gnn:** [OAK-G01 Lazarus Group / DPRK-attributed](../actors/OAK-G01-lazarus.md).
**Attribution:** **confirmed** — FBI, DOJ, and U.S. Department of State have publicly attributed the DPRK IT worker scheme to DPRK government-directed operations. Multiple indictments have been unsealed naming individual IT workers and facilitators.

**Key teaching point:** The DPRK IT worker scheme is the canonical T8.004 anchor for the "employment-as-account-farming" sub-pattern: the exchange account is not created via a fabricated identity applied through a web form — it is created via a fabricated identity that passes a multi-round employment interview, background check, and KYC process. The employment relationship itself is the sybil mechanism.

## Summary

Since approximately 2018, DPRK-directed IT workers have sought and obtained remote-work employment at cryptocurrency exchanges, DeFi protocols, and technology companies using fabricated identity documentation. The workers are typically based in China, Russia, or Eastern Europe, posing as citizens of those countries or as U.S.-based remote workers. Their salaries — paid in cryptocurrency — are remitted to DPRK government accounts, functioning as both a revenue-generation mechanism and a sanctions-evasion rail.

The scheme has been documented by the FBI (multiple public-service announcements), the U.S. Department of Justice (multiple indictments), the U.S. Department of State (DPRK cyber-threat advisories), and private-sector threat-intelligence firms (Mandiant, CrowdStrike, Recorded Future). The FBI's 2022–2025 public-service announcements provide detailed operational indicators: AI-generated profile photos, fabricated work histories with non-verifiable prior employers, use of U.S.-based laptop farms and address-rental services to simulate U.S. residency, and salary payments requested in cryptocurrency.

The scheme extends beyond account farming: IT workers with access to exchange internal systems, custody infrastructure, or hot-wallet signing processes become an internal T11.001 threat. The 2024–2025 FBI advisories explicitly warn that DPRK IT workers have attempted to introduce malicious code into employer systems and have leveraged their access for insider-enabled extraction events.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| ~2018 | DPRK IT worker scheme begins; first documented cases of fabricated-identity remote employment at crypto firms | T8.004 (employment-as-account-farming) |
| 2020–2022 | Scheme scales; FBI issues first public-service announcements warning of DPRK IT worker threat | T15.001 (social engineering) |
| 2022–2023 | DOJ indictments unsealed naming individual IT workers and facilitators; U.S. Treasury sanctions facilitators | (law enforcement) |
| 2024–2025 | FBI warns that DPRK IT workers have escalated from passive employment to active insider-threat activity (malicious code insertion, access brokering for external intrusion) | T11.001 (insider threat) |
| Continuing | Scheme remains active at v0.1 cutoff; FBI public-service announcements updated periodically with new indicators | (ongoing) |

## Public references

- FBI Public Service Announcements: DPRK IT Worker Scheme (2022, 2023, 2024, 2025).
- U.S. DOJ indictments: multiple unsealed cases naming DPRK-linked IT workers and facilitators.
- U.S. Department of State: DPRK cyber-threat advisory and Rewards for Justice program.
- Mandiant / CrowdStrike / Recorded Future: DPRK IT worker threat-intelligence reporting.
