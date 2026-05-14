# DPRK IT-worker program exchange-account farming — multi-chain — 2023–2025

**Loss:** aggregate non-financial at the individual-account level; the structural loss is the laundering-enablement surface — thousands of KYC-verified exchange accounts opened under synthetic or stolen identities, used to receive cryptocurrency proceeds from DPRK-attributed operations (OAK-G01) and convert them to fiat or transfer them to further laundering layers. The US DOJ, FBI, and Treasury have publicly estimated that the DPRK IT-worker program involves thousands of personnel generating hundreds of millions of dollars annually in revenue, with a material share flowing through exchange accounts opened under false identities.
**OAK Techniques observed:** **OAK-T8.004** (Exchange Account Farming / Sybil Account Creation — primary; DPRK IT workers used synthetic identity documents, stolen PII, and front companies to open verified exchange accounts across multiple jurisdictions, evading per-account withdrawal limits and per-exchange KYC thresholds). **OAK-T8.001** (Common-Funder Cluster Reuse — the on-chain clusters funding the farmed accounts exhibited the T8.001 co-spend and common-funder heuristics documented in the broader DPRK laundering infrastructure). **OAK-T8.005** (Operational Security Procedural Failure — the IT-worker program exhibited device-fingerprint reuse, IP-geolocation mismatch with claimed residence, document-template reuse, and temporal clustering of account creation across nominally-independent identities, enabling cross-account correlation by exchange compliance teams and law enforcement).
**Attribution:** **OAK-G01 (DPRK / Lazarus Group)** — confirmed at the named-operator-cluster level by the US DOJ (multiple indictments 2023–2025), FBI (public service announcements), OFAC (SDN designations of DPRK IT worker front companies and facilitators), and the South Korean NPA Cyber Bureau.

**Key teaching point:** **The DPRK IT-worker program is the largest and most sophisticated T8.004 operation on the public record — a state-level operator's systematic conversion of the KYC barrier from a detection surface into a scaling surface, using thousands of synthetic identities to create MORE verified exchange accounts rather than avoiding verification. The program demonstrates T8.004 at state scale: synthetic identity generation, document forgery, front-company establishment, and multi-jurisdiction exchange-account management operating as a structured business process rather than an ad-hoc cybercriminal operation. The US DOJ's 2024–2025 indictments of DPRK IT-worker facilitators provide the most detailed public forensic record of a T8.004 operation at any scale.**

## Summary

The DPRK IT-worker program is a state-sponsored operation in which North Korean nationals, operating under synthetic or stolen identities and often facilitated by China- and Russia-based intermediaries, obtain remote-work contracts with Western technology companies. The workers receive salaries in cryptocurrency and fiat, with a material share of the proceeds flowing to DPRK state coffers. The revenue from the IT-worker program is estimated by the US Treasury to constitute a significant fraction of DPRK's foreign-currency income, alongside cryptocurrency theft operations (see OAK-G01 Lazarus Group actor profile).

The T8.004 dimension of the program is the exchange-account-farming infrastructure. To convert cryptocurrency salaries and stolen funds into usable fiat currency, the IT-worker program operators maintain a large inventory of KYC-verified accounts across multiple cryptocurrency exchanges — Binance, KuCoin, OKX, Bybit, Coinbase, and regional exchanges in Southeast Asia, the Middle East, and Eastern Europe. These accounts are opened using synthetic identity documents (forged passports, manipulated utility bills, stolen PII) and maintained through coordinated IP-routing (VPN exit nodes matched to claimed residence jurisdictions) and device-fingerprint rotation (separate virtual machines or burner devices per account cluster).

The structural T8.004 insight is that the KYC barrier, which is designed to make it harder for illicit actors to access exchange infrastructure, is instead exploited as a scaling primitive: the DPRK operator creates MORE verified accounts, not fewer, using the KYC process to gain access to higher withdrawal limits, fiat on/off-ramp services, and reduced per-transaction scrutiny (KYC-verified accounts receive lower risk scores in exchange compliance systems than unverified or basic-verified accounts).

Exchange compliance teams identified the pattern through device-fingerprint correlation (the same laptop fingerprint used across multiple accounts with different KYC identities), IP-geolocation mismatch (VPN exit node in Poland for identity documents claiming residence in Singapore), temporal clustering (batches of 20-50 accounts created within hours using sequentially-numbered document scans), and document-template reuse (the same utility-bill template with modified name and address fields used across dozens of applications).

The US DOJ unsealed multiple indictments against DPRK IT-worker facilitators in 2024 and 2025, providing the most detailed public forensic record of a T8.004 operation. The FBI issued public service announcements warning technology companies about the IT-worker hiring pattern. OFAC designated multiple DPRK front companies and facilitators involved in the account-farming infrastructure.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2018–2020 | DPRK IT-worker program begins at modest scale; early exchange accounts opened under borrowed identities | T8.004 (early-stage) |
| 2021–2022 | Program scales; facilitators in China and Russia systematize identity-document forgery and account-creation workflows | T8.004 (scaling phase) |
| 2023 | Exchange compliance teams identify cross-account device-fingerprint and document-template reuse patterns; first internal SARs filed | T8.005 (opsec-failure detection) |
| 2024–2025 | US DOJ unseals multiple indictments of DPRK IT-worker facilitators; OFAC designates front companies; FBI issues PSA | T8.004 + T8.001 (law-enforcement attribution) |
| 2025 | Exchange consortium (Crypto Defenders Alliance, TRM Labs, Chainalysis) publishes cross-exchange T8.004 detection heuristics | (industry-standardisation) |

## Realised extraction

Non-financial at the individual-account level. The structural extraction is the laundering-enablement value of the account-farming infrastructure — thousands of KYC-verified exchange accounts that can receive, convert, and off-ramp cryptocurrency proceeds from DPRK-attributed theft and IT-worker operations, estimated at hundreds of millions of dollars annually by the US Treasury.

## References

- US DOJ indictments of DPRK IT-worker facilitators (2024–2025)
- FBI Public Service Announcements on DPRK IT-worker hiring patterns
- OFAC SDN designations of DPRK front companies and facilitators
- US Treasury illicit finance risk assessments (2024–2025)
- See `techniques/T8.004-exchange-account-farming-sybil-accounts.md` for the Technique definition
