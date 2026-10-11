# DPRK IT worker exchange account farming — 2018–2025

**Loss:** **Infrastructure case, not a per-victim loss.** DPRK IT workers, operating under the OAK-G04 (DPRK IT Worker Scheme) actor designation, have used fabricated and stolen identities to obtain remote-work employment at cryptocurrency exchanges, DeFi protocols, and technology companies. The employment provides internal-system access and a salary that is paid to the regime. The sources cited here put one DOJ-charged slice of the scheme at at least \$88 million over six years (December 2024 indictment of 14 DPRK nationals); no aggregate across all employers is sourced.
**OAK Techniques observed:** **OAK-T8.004** (Exchange Account Farming / Sybil Accounts) — carried over from the earlier draft. The cited sources document false, stolen and borrowed identities used to get remote jobs; they do not document exchange-account creation or exchange KYC evasion, so this mapping is weak. **OAK-T15.001** (Social Engineering of Operator Personnel) — the fake-recruiter and fake-applicant social-engineering chain that positions IT workers inside targeted organizations. **OAK-T11.001** (Third-Party Signing Vendor Compromise) — once employed, IT workers with access to exchange infrastructure or hot-wallet signing systems become an internal T11.001 threat.
**OAK-Gnn:** [OAK-G01 Lazarus Group / DPRK-attributed](../actors/OAK-G01-lazarus.md).
**Attribution:** **confirmed** — the US Department of Justice has indicted DPRK nationals (14 charged in December 2024, working for DPRK-controlled firms Yanbian Silverstar and Volasys Silver Star) and US-based facilitators; the State Department offers rewards of up to \$5 million (The Hacker News, SecurityWeek).
**Corrected 2026-10-11:** removed the unsourced "hundreds of millions" aggregate, the "since ~2018" start, forged-passport / AI-photo specifics, the claim that workers create exchange accounts, and the named threat-intel vendors; added DOJ-sourced figures. Technique mapping (T8.004) fits poorly; see the report note.

**Key teaching point:** The DPRK IT worker scheme is an insider-access pattern: a fabricated or borrowed identity passes a hiring process, and the employment relationship itself provides access, salary and, in some cases, a route to theft or extortion. The T8.004 "employment-as-account-farming" framing from the earlier draft is not supported by the cited sources.

## Summary

DPRK-directed IT workers obtain remote jobs at US companies using false, stolen and borrowed identities, pseudonymous accounts, proxy computers and VPNs, and US "laptop farms" in which US-based facilitators receive company laptops so the workers appear to be in the US (The Hacker News, SecurityWeek). A December 2024 indictment charged 14 DPRK nationals employed by Yanbian Silverstar (China) and Volasys Silver Star (Russia), which employed at least 130 IT workers, with IEEPA violations, wire fraud, money laundering and identity theft; the scheme allegedly generated at least \$88 million for North Korea over six years. Some workers stole source code and threatened to leak it unless paid.

On 2025-06-30 the DOJ announced coordinated action across 16 states: searches of 29 laptop farms, seizure of 29 financial accounts and 21 websites, one arrest and two indictments. One case alleged more than \$5 million in revenue using over 80 compromised identities affecting over 100 US companies; North Korean workers were also reported to have stolen over \$900,000 in cryptocurrency from an Atlanta blockchain firm and a Serbian token company, with proceeds laundered through Tornado Cash (SecurityWeek).

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-10 | Radiant Capital \$50M theft is attributed by Radiant to Citrine Sleet (a Lazarus sub-cluster); related to DPRK crypto theft generally, not to the IT-worker scheme | (context) |
| 2024-12 | DOJ indicts 14 DPRK nationals; \$88M over six years alleged; 29 domains and \$2.26M seized | (law enforcement) |
| 2025-06-30 | DOJ action across 16 states: 29 laptop-farm searches, arrest of Zhenxing "Danny" Wang, indictments of 9 and of 4 DPRK nationals | (law enforcement) |
| 2018-2025 | The scheme's start date and FBI public-service-announcement history are not verified here | (unverified) |

## Public references

- `[thn2024itworkers]` — The Hacker News, "DoJ Indicts 14 North Koreans for \$88M IT Worker Fraud Scheme Over Six Years" (2024-12-13): <https://thehackernews.com/2024/12/doj-indicts-14-north-koreans-for-88m-it.html>
- `[secweek2025laptopfarms]` — SecurityWeek, "US Storms 29 Laptop Farms in Crackdown on North Korean IT Worker Schemes" (2025-07-01): <https://www.securityweek.com/us-storms-29-laptop-farms-in-crackdown-on-north-korean-it-worker-schemes/>
