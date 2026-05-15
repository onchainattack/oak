# Bitcoin Fog Roman Sterlingov exchange-funding de-anonymization — 2021

**Loss:** **Attribution event, not financial loss.** Roman Sterlingov was identified as the operator of Bitcoin Fog — one of the longest-operating Bitcoin mixers (2011–2021, ~$400M in cumulative mixing volume) — via exchange-account KYC trace and server-payment attribution. The IRS-CI investigation linked the Bitcoin Fog server's domain-registration and hosting payments to exchange accounts registered under Sterlingov's verified identity.
**OAK Techniques observed:** **OAK-T8.005** (Operational Security Procedural Failure) — canonical anchor. Sterlingov paid for the Bitcoin Fog domain and hosting infrastructure using cryptocurrency transactions traceable to exchange accounts registered in his verified name, creating a cryptofinance-to-identity trace that survived the passage of time. **OAK-T7.001** (Mixer-Routed Hop) — Bitcoin Fog was itself a mixer; the attribution of its operator is the structural counterpoint to the T7.001 laundering surface (the mixer operator is as attribution-sensitive as the mixer user).
**Attribution:** **confirmed** — Roman Sterlingov was arrested (2021, Los Angeles), convicted (2024, U.S. District Court for D.C.), and sentenced. The IRS-CI traced domain-registration and hosting payments for Bitcoin Fog infrastructure to exchange accounts registered under Sterlingov's name and verified by KYC records.

**Key teaching point:** The Bitcoin Fog attribution demonstrates the structural attribution asymmetry of mixers: the mixer conceals the user's transaction graph but the mixer operator's own operational payments (domain registration, hosting, infrastructure) leave a distinct financial trace that is not mixed. The operator's own payment rail — infrastructure procurement — is the attribution surface that law enforcement exploited.

## Summary

Bitcoin Fog was a Bitcoin mixing service operating from 2011 to 2021 — one of the longest-running mixers of the pre-Tornado-Cash era. It processed approximately $400 million in cumulative Bitcoin mixing volume over its operational lifetime. The service was the canonical mixer of the Bitcoin era, preceding the Ethereum-based mixer ecosystem (Tornado Cash) by nearly a decade.

The IRS-CI investigation identified Roman Sterlingov as the operator through two converging attribution paths: (1) domain-registration payments for the bitcoin-fog.com domain were traced to cryptocurrency accounts registered under Sterlingov's verified identity at exchanges with KYC records; (2) server-hosting payments for the Bitcoin Fog infrastructure were similarly traced. The payments were made in cryptocurrency but the exchange accounts receiving the payments were KYC-verified — the infrastructure-payment trail did not pass through the mixer itself and therefore retained its identity trace.

The operational lesson is the attribution asymmetry of mixing infrastructure: the mixer processes user deposits and withdrawals opaquely, but the mixer operator must provision infrastructure (domain, hosting, TLS certificates) using unmixed payment rails. The infrastructure-procurement trail is the structural T8.005 surface for mixer-operator attribution.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2011-10 | Bitcoin Fog domain registered; mixing service launched | (service launch) |
| 2011–2021 | Bitcoin Fog operates for ~10 years; ~$400M cumulative mixing volume | T7.001 (mixer surface) |
| 2021-04 | IRS-CI traces domain-registration and hosting payments to exchange accounts under Sterlingov's KYC-verified identity | T8.005 (attribution via infrastructure payments) |
| 2021-04 | Roman Sterlingov arrested in Los Angeles | (arrest) |
| 2024-03 | Sterlingov convicted on money-laundering and unlicensed-money-transmission charges; sentencing follows | (conviction) |

## Public references

- U.S. Department of Justice indictment and press releases (2021, 2024).
- U.S. v. Roman Sterlingov, D.C. District Court docket.
- IRS-CI Bitcoin Fog investigation methodology.
- Chainalysis: Bitcoin tracing used to link infrastructure payments to exchange accounts.
