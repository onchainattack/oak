# IRS Coinbase John Doe Summons — 2016-11-30

**Loss:** No direct victim loss. The IRS John Doe summons to Coinbase was a regulatory-information-gathering action: the IRS sought records on all U.S. Coinbase customers who transacted in cryptocurrency between 2013 and 2015; the IRS's concern was that only 800 to 900 taxpayers a year electronically filed returns reporting bitcoin-related property in those years `[fox17]`.
**OAK Techniques observed:** **OAK-T6.007** (Trust-Substrate Shift / Vendor-Promise Revocation — the regulatory pressure on Coinbase to surrender customer records represented a trust-substrate shift: the exchange's user-facing promise of financial privacy was in tension with the exchange's legal obligation to comply with IRS information demands). **OAK-T14.005** (Regulatory / Legal-Action Targeting Crypto Infrastructure — the John Doe summons was an early milestone in the regulatory targeting of crypto on/off-ramp infrastructure). **OAK-T8.005** (Operational-Security Procedural Failure — the John Doe summons revealed that U.S. taxpayers who used Coinbase under the assumption that crypto transactions were not visible to tax authorities had fundamentally misunderstood the on-chain traceability and exchange-KYC intersection).
**Attribution:** **unattributed** — the IRS as the regulatory actor; Coinbase as the compelled information custodian. No individual crypto-user attribution was at issue; the summons targeted the exchange's customer base as a class.
**Corrected 2026-10-11:** the summons was authorized in late 2016 (the exact filing date is not in the cited sources); the November 2017 order of 28 November narrowed it to roughly 14,355 account holders; removed unverified statements about IRS letter counts, the 2019 Travel Rule and the 2021 Infrastructure Act as consequences, and "legal precedent" language.
**Key teaching point:** **The 2016 IRS Coinbase John Doe summons is an early U.S. regulatory milestone in the transition from crypto's "tax-free" perception era to the KYC/AML reporting era. The summons established the legal precedent that cryptocurrency exchanges operating in the U.S. are financial-institution-equivalent information custodians subject to broad IRS information demands — a structural shift that would later be reinforced by FinCEN's 2019 Travel Rule application to VASPs and the 2021 Infrastructure Bill's broker reporting requirements. For OAK, the case is the earliest T6.007 instance in the crypto-regulatory era: the trust substrate shifted from "Coinbase protects your financial privacy" to "Coinbase complies with IRS information demands."**

## Summary

A federal judge authorized an IRS "John Doe" summons to Coinbase, Inc. in late 2016, seeking records on U.S. customers who transacted in cryptocurrency from 2013 to 2015 `[fox17]`. The IRS's stated basis was that only 800 to 900 taxpayers a year electronically filed returns reporting bitcoin-related property in 2013-2015, against a far larger Coinbase customer base `[fox17]`.

Coinbase resisted. On November 28, 2017 a federal court in San Francisco ordered a narrowed summons: records for accounts with at least \$20,000 in a single transaction type (buy, sell, send or receive) in any one year of 2013-2015, which Coinbase estimated covered up to 14,355 account holders and 8.9 million transactions, down from more than 480,000 users in the original request; the court rejected categories such as account-opening records, copies of ID and all wallet addresses `[reg17]``[fox17]`. Coinbase said it would notify affected users before producing documents `[fox17]`; a February 2018 report says it notified about 13,000 customers (headline only, article body not reviewed).

The case illustrates that exchange on/off-ramps are an information chokepoint. Earlier text claiming it was the first T6.007 instance and the origin of later regimes (Travel Rule, broker reporting, Tornado Cash sanctions) is interpretive and unsourced.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2016 (late) | Judge authorizes IRS John Doe summons to Coinbase `[fox17]` | **T6.007** |
| 2017-11-28 | Court orders narrowed summons: \$20,000 threshold, up to 14,355 accounts `[reg17]``[fox17]` | **Narrowed order** |
| 2018-02 | Coinbase reported to have notified ~13,000 customers `[fox17]` | |

## Realised extraction

No direct victim loss. The action compelled information production, not asset seizure.

## Public references

- `[fox17]` — Fox Rothschild Tax Controversy blog, "Coinbase ordered to turn over bitcoin trading records of 14,000 customers to the IRS" (2017-11): <https://taxcontroversy.foxrothschild.com/2017/11/coinbase-ordered-turn-bitcoin-trading-records-14000-customers-internal-revenue-service/>
- `[reg17]` — Regulation Tomorrow, "Coinbase ordered to give IRS information on 14,355 account holders" (2017-11; seen via search snippet): <https://www.regulationtomorrow.com/us/coinbase-ordered-to-give-irs-information-on-14355-account-holders/>
- Cross-reference: T6.007 (Trust-Substrate Shift / Vendor-Promise Revocation) at `techniques/T6.007-trust-substrate-shift-vendor-promise-revocation.md`.
- [`examples/2022-08-tornado-cash-ofac-sanctions.md`](../examples/2022-08-tornado-cash-ofac-sanctions.md) — Tornado Cash OFAC sanctions, 2022.
- [`examples/2023-05-ledger-recover-trust-substrate-shift.md`](../examples/2023-05-ledger-recover-trust-substrate-shift.md) — Ledger Recover trust-substrate shift, 2023.
