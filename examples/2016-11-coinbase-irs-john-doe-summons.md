# IRS Coinbase John Doe Summons — 2016-11-30

**Loss:** No direct victim loss. The IRS John Doe summons to Coinbase was a regulatory-information-gathering action: the IRS sought records on all U.S. Coinbase customers who transacted in cryptocurrency between 2013 and 2015, arguing that cryptocurrency users were systematically underreporting capital gains.
**OAK Techniques observed:** **OAK-T6.007** (Trust-Substrate Shift / Vendor-Promise Revocation — the regulatory pressure on Coinbase to surrender customer records represented a trust-substrate shift: the exchange's user-facing promise of financial privacy was in tension with the exchange's legal obligation to comply with IRS information demands). **OAK-T14.005** (Regulatory / Legal-Action Targeting Crypto Infrastructure — the John Doe summons was an early milestone in the regulatory targeting of crypto on/off-ramp infrastructure). **OAK-T8.005** (Operational-Security Procedural Failure — the John Doe summons revealed that U.S. taxpayers who used Coinbase under the assumption that crypto transactions were not visible to tax authorities had fundamentally misunderstood the on-chain traceability and exchange-KYC intersection).
**Attribution:** **institutional** — the IRS as the regulatory actor; Coinbase as the compelled information custodian. No individual crypto-user attribution was at issue; the summons targeted the exchange's customer base as a class.
**Key teaching point:** **The 2016 IRS Coinbase John Doe summons is the canonical U.S. regulatory milestone marking the transition from crypto's "tax-free" perception era to the KYC/AML reporting era. The summons established the legal precedent that cryptocurrency exchanges operating in the U.S. are financial-institution-equivalent information custodians subject to broad IRS information demands — a structural shift that would later be reinforced by FinCEN's 2019 Travel Rule application to VASPs and the 2021 Infrastructure Bill's broker reporting requirements. For OAK, the case is the earliest T6.007 instance in the crypto-regulatory era: the trust substrate shifted from "Coinbase protects your financial privacy" to "Coinbase complies with IRS information demands."**

## Summary

On November 30, 2016, the U.S. Department of Justice, on behalf of the Internal Revenue Service, filed a petition for a "John Doe" summons against Coinbase, Inc. — the largest U.S.-based cryptocurrency exchange. The IRS sought records identifying all U.S. Coinbase customers who conducted cryptocurrency transactions between January 1, 2013 and December 31, 2015.

The IRS's argument: cryptocurrency users were systematically underreporting capital gains on cryptocurrency transactions. The IRS cited a dramatic gap between the number of Coinbase users (~5.9 million at the time) and the number of taxpayers reporting cryptocurrency gains on their tax returns (~800 to 900 individuals per year in 2013–2015). The summons was a "John Doe" summons — meaning it targeted an unidentified class of taxpayers rather than named individuals — under Internal Revenue Code Section 7609(f).

Coinbase initially resisted the summons, arguing that the IRS's request was overly broad and that it violated customer privacy. After a legal back-and-forth:
- **November 2017:** A federal court in California ordered Coinbase to produce records for customers with transactions exceeding $20,000 in any single year between 2013 and 2015 — a narrower set than the IRS's original request.
- **February 2018:** Coinbase notified ~13,000 affected customers that their records would be produced to the IRS.
- **2018–2020:** The IRS used the Coinbase data to issue warning letters (Letter 6173, 6174, 6174-A) to over 10,000 taxpayers identified through the Coinbase records, and initiated audits and criminal investigations against the most material non-reporters.

The John Doe summons is the canonical U.S. regulatory milestone marking the transition from crypto's "tax-free" public-perception era to the KYC/AML reporting era. It established that:
1. Cryptocurrency exchanges are financial-institution-equivalent information custodians subject to broad IRS information demands.
2. On-chain transactions are not "invisible" to tax authorities — the exchange on/off-ramp is a standing information chokepoint.
3. The exchange-user trust relationship includes tax-compliance reporting obligations that the user may not have anticipated at account-opening time.

For OAK, the case is the earliest T6.007 (Trust-Substrate Shift) instance in the crypto-regulatory era. Coinbase's user-facing value proposition included financial privacy and individual sovereignty; the IRS John Doe summons revealed that this promise was conditional on the exchange's legal compliance obligations — a trust-substrate shift that would be repeated at larger scale and with more severe consequences in the Tornado Cash OFAC sanctions (2022, T6.007 canonical anchor) and Ledger Recover trust-substrate shift (2023).

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2013–2015 | IRS reporting gap: ~800-900 taxpayers/year report crypto gains vs. ~5.9M Coinbase users — the data asymmetry that motivated the John Doe summons | **Pre-summons reporting gap** |
| 2016-11-30 | DOJ, on behalf of IRS, files John Doe summons petition against Coinbase under IRC § 7609(f) | **T6.007 trust-substrate shift filing** |
| 2017-11 | Federal court orders Coinbase to produce records for customers with >$20,000 in transactions in any single year 2013–2015 | **Narrowed summons order** |
| 2018-02 | Coinbase notifies ~13,000 affected customers of impending record production to IRS | **Customer notification** |
| 2018–2020 | IRS issues Letters 6173/6174/6174-A to 10,000+ taxpayers; initiates audits and criminal investigations | **T14.005 regulatory follow-through** |
| 2021 | Infrastructure Investment and Jobs Act — broker reporting requirements for digital assets (the legislative successor to the John Doe summons approach) | **Legislative expansion** |

## Realised extraction

No direct victim loss. The regulatory action compelled information production, not asset seizure. Downstream tax-audit liabilities and penalties for affected taxpayers are not centrally tabulated.

## Public references

- DOJ/IRS John Doe summons filing against Coinbase (November 30, 2016) — the primary legal document.
- Federal court order narrowing summons scope (November 2017) — U.S. District Court, Northern District of California.
- Coinbase customer notification (February 2018) — ~13,000 customers notified.
- IRS Letters 6173, 6174, 6174-A — warning letters to taxpayers identified through Coinbase data.
- Cross-reference: T6.007 (Trust-Substrate Shift / Vendor-Promise Revocation) at `techniques/T6.007-trust-substrate-shift-vendor-promise-revocation.md`.
- [`examples/2022-08-tornado-cash-ofac-sanctions.md`](../examples/2022-08-tornado-cash-ofac-sanctions.md) — Tornado Cash OFAC sanctions, 2022 (the larger-scale T6.007 canonical anchor).
- [`examples/2023-05-ledger-recover-trust-substrate-shift.md`](../examples/2023-05-ledger-recover-trust-substrate-shift.md) — Ledger Recover trust-substrate shift, 2023 (the hardware-wallet T6.007 instance).
