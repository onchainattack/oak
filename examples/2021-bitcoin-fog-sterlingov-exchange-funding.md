# Bitcoin Fog Roman Sterlingov exchange-funding de-anonymization — 2021

**Corrected 2026-10-11:** The identification chain was restated per the affidavit as reported (2011 Liberty Reserve payment for hosting, bitcoin bought on Mt. Gox, Mt. Gox accounts tied to his address and phone, plus blockchain analysis); the unsourced "domain-registration and hosting payments to KYC exchange accounts" framing, the 2024-03 / Los Angeles / 2011-10 specifics and the sentence status were corrected or marked.

**Loss:** **Attribution event, not financial loss.** Roman Sterlingov was identified as the alleged operator of Bitcoin Fog — a Bitcoin mixer operating 2011–2021 that processed about 1.2 million BTC, roughly \$400M at the time it was shuttered `[bitdefenderfog]` — via blockchain analysis combined with conventional records. IRS special agent Devon Beckett's affidavit said analysis of bitcoin transactions, financial records, ISP records and e-mail records identified him as principal operator `[decryptfog]`.
**OAK Techniques observed:** **OAK-T8.005** (Operational Security Procedural Failure) — canonical anchor. Per the IRS account, Sterlingov paid for Bitcoin Fog's 2011 server hosting with Liberty Reserve funds bought with bitcoin that traced back to euro purchases on Mt. Gox; the Mt. Gox accounts were tied to his home address and phone number `[schneierfog]`. Decrypt reports the IP addresses used to pay for the domain matched his Mt. Gox logins `[decryptfog]`. **OAK-T7.001** (Mixer-Routed Hop) — Bitcoin Fog was itself a mixer; the attribution of its operator is the structural counterpoint to the T7.001 laundering surface (the mixer operator is as attribution-sensitive as the mixer user).
**Attribution:** **confirmed** — Roman Sterlingov was charged in April 2021, found guilty by a jury in March 2024 of money laundering conspiracy, money laundering and operating an unlicensed money transmitting business in the District of Columbia, and sentenced in November 2024 to 12.5 years (150 months), with restitution of about \$395.6M and forfeiture `[bitdefenderfog]` `[nobsfog]`. The defence argued the evidence was circumstantial and that blockchain-tracing software (Chainalysis Reactor) was unreliable; the judge found it sufficiently reliable `[nobsfog]`.

**Key teaching point:** The Bitcoin Fog attribution demonstrates the structural attribution asymmetry of mixers: the mixer conceals the user's transaction graph but the operator's own early payments (per the IRS account, hosting paid via Liberty Reserve funds bought with bitcoin from a Mt. Gox account tied to his address and phone) sit outside the mixer and, combined with other records, supported attribution `[schneierfog]`.

## Summary

Bitcoin Fog was a Bitcoin mixing service operating from 2011 to 2021. Coverage puts its volume at about 1.2 million BTC, roughly \$400M at the time it was shuttered `[bitdefenderfog]`.

The IRS-CI investigation (with the FBI Washington Field Office `[bitdefenderfog]`) identified Roman Sterlingov as the alleged operator. As reported from the affidavit: he paid for Bitcoin Fog's server hosting in 2011 using Liberty Reserve funds; investigators traced the bitcoin used to buy those funds back to euro purchases on Mt. Gox and tied the Mt. Gox accounts to his home address and phone number; they also found a Russian-language Google Drive document on obscuring bitcoin payments `[schneierfog]`. Coverage differs on whether the 2011 payments covered hosting, the domain, or both `[decryptfog]`.

The operational lesson is the attribution asymmetry of mixing infrastructure: the mixer processes user deposits and withdrawals opaquely, but the mixer operator must provision infrastructure (domain, hosting, TLS certificates) using unmixed payment rails. The infrastructure-procurement trail is the structural T8.005 surface for mixer-operator attribution.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2011 | Bitcoin Fog launched; hosting paid via Liberty Reserve funds (per IRS account) `[schneierfog]` | (service launch) |
| 2011–2021 | Bitcoin Fog operates; ~1.2M BTC (~\$400M at shutdown) `[bitdefenderfog]` | T7.001 (mixer surface) |
| 2021-04 | Sterlingov charged; IRS-CI affidavit public `[nobsfog]` `[decryptfog]` | T8.005 (attribution via early payments) |
| 2024-03 | Jury convicts Sterlingov `[bitdefenderfog]` | (conviction) |
| 2024-11-08 | Sentenced to 150 months; forfeiture of about \$395M and 1,345 BTC `[nobsfog]` | (sentencing) |

## Public references

- `[schneierfog]` — Schneier on Security, "Identifying the Person Behind Bitcoin Fog" (2021-05-03): <https://www.schneier.com/blog/archives/2021/05/identifying-the-person-behind-bitcoin-fog.html>
- `[decryptfog]` — Decrypt, "Alleged operator of \$336 million Bitcoin mixing service arrested in US" (2021-04): <https://decrypt.co/69318/alleged-operator-of-336-million-bitcoin-mixing-service-arrested-in-us>
- `[nobsfog]` — NoBS Bitcoin, "Bitcoin Fog User Roman Sterlingov Gets 12.5 Years for Allegedly Running It Based on 'Junk Science'" (2024-11-10): <https://www.nobsbitcoin.com/bitcoin-fog-user-roman-sterlingov-gets-12-5-years-for-allegedly-running-it-based-on-junk-science/>
- `[bitdefenderfog]` — Bitdefender, "Crypto Mixer Operator Gets 12.5 Years in Prison in Bitcoin Fog Money-Laundering Case" (2024-11): <https://www.bitdefender.com/en-us/blog/hotforsecurity/crypto-mixer-operator-gets-12-5-years-in-prison-in-bitcoin-fog-money-laundering-case>
