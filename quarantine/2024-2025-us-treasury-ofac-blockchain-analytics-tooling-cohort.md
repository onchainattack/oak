> **QUARANTINED 2026-11-27 — not part of the OAK corpus.** The 2026-11 source pass rewrote this file from the pages it could open and found no attack to record: it describes government procurement of analytics tools and sanctions designations; no attack is on an opened page. It is kept here, outside `examples/`, and can return if a source documents an incident.

# US Treasury and IRS-CI use of blockchain analytics — procurement and sanctions actions, not an attack — United States / chain-agnostic — 2022–2025

**Loss:** **none — not an attack.** This file earlier described state use of deanonymization tooling as a loss of privacy. The opened pages show government procurement and sanctions actions, with no theft, fraud, exploit or manipulation. No loss figure applies.

**OAK Techniques observed:** none — the opened pages describe defender-side tooling purchases and sanctions designations, not an attack. The earlier file declared the transaction-graph de-anonymization and sanctioned-entity financing Techniques for a claim of institutional deployment that no opened page supports; sanctioned-entity screening itself is covered in [`2022-08-tornado-cash-ofac-sanctions.md`](2022-08-tornado-cash-ofac-sanctions.md) and the forensics background in [`2013-2015-blockchain-forensics-emergence.md`](2013-2015-blockchain-forensics-emergence.md).

**Attribution:** **unattributed** — no adversary.

**Key teaching point:** **A sanctions or tracing workflow depends on listed addresses, so screen against the designation record itself.** The two Treasury releases opened here name no analytics vendor and print no addresses in the release text ([2022-11-08](https://home.treasury.gov/news/press-releases/jy1087), [2023-11-29](https://home.treasury.gov/news/press-releases/jy1933)); a defender screening deposits has to read the SDN entry for the identifiers.

## Summary

This file was a "cohort" claiming that OFAC and IRS-CI had integrated blockchain analytics into designation and tax-enforcement workflows. After a source pass, the cohort does not hold: fewer than two members remain, and none is an attack. The claim that OFAC designation packages cite analytics firms' cluster attribution as primary evidence is not on any opened page, and neither opened Treasury release mentions analytics firms. The 2024 claim that IRS-CI integrated real-time analytics and the Meiklejohn and Chainalysis report citations are removed as unsourced.

What the opened pages do show:

- **IRS-CI procurement.** Federal contract records list a Chainalysis Government Solutions award for a Chainalysis tool subscription, training and support for IRS criminal investigations with cyber or cryptocurrency components, starting 2023-09-30, potential value up to \$26,769,479 after an amendment from \$21,665,583, sole source ([HigherGov 205AE923C00010](https://highergov.com/contract/205AE923C00010)). A separate record shows a TRM Labs award of up to \$3,765,800 for blockchain analytics, tracing, data and training, period of performance from 2025-09-28, sole source ([HigherGov 2023H225C00135](https://www.highergov.com/contract/2023H225C00135)). These are aggregator pages, not IRS publications; the competition fields on both pages contradict their own descriptions.
- **OFAC mixer actions.** On 2022-08-08 OFAC sanctioned Tornado Cash, stating it had been used to launder more than \$7 billion since 2019 and over \$455 million stolen by the Lazarus Group ([Treasury](https://home.treasury.gov/news/press-releases/jy0916)). On 2022-11-08 it delisted and redesignated Tornado Cash under additional authorities ([Treasury](https://home.treasury.gov/news/press-releases/jy1087)). On 2023-11-29 it sanctioned the Sinbad.io mixer, describing it as a key laundering tool for the Lazarus Group ([Treasury](https://home.treasury.gov/news/press-releases/jy1933)).

Remainder: the mixer designations belong in [`2022-08-tornado-cash-ofac-sanctions.md`](2022-08-tornado-cash-ofac-sanctions.md) (Tornado Cash) and, for Sinbad, a possible separate file if one is wanted.

## Timeline (UTC)

Stages: not an attack, so no flaw, take or money stage. Dates come from the cited pages.

| When | What happened | OAK |
|---|---|---|
| 2022-08-08 | OFAC sanctions Tornado Cash ([Treasury](https://home.treasury.gov/news/press-releases/jy0916)) | — |
| 2022-11-08 | OFAC delists and redesignates Tornado Cash with additional authorities ([Treasury](https://home.treasury.gov/news/press-releases/jy1087)) | — |
| 2023-09-30 | Start of the IRS-CI Chainalysis subscription contract period ([HigherGov](https://highergov.com/contract/205AE923C00010)) | — |
| 2023-11-29 | OFAC sanctions the Sinbad.io mixer ([Treasury](https://home.treasury.gov/news/press-releases/jy1933)) | — |
| 2025-09-28 | Start of the IRS-CI TRM Labs contract period ([HigherGov](https://www.highergov.com/contract/2023H225C00135)) | — |

Key addresses: none — the opened pages print none.

## Root-cause evidence

- **Technique:** none — not an attack
- **Source:** <https://home.treasury.gov/news/press-releases/jy1933>; <https://highergov.com/contract/205AE923C00010>
- **Source type:** government
- **Confidence:** reported
- **Evidence:** Treasury releases establish the designations. The contract facts come from an aggregator that republishes federal procurement data; the underlying federal records were not opened. No opened page connects the contracts to any specific designation.

## Public references

- U.S. Treasury, press release on the Tornado Cash designation (2022-08-08): <https://home.treasury.gov/news/press-releases/jy0916>
- U.S. Treasury, press release on the Tornado Cash redesignation (2022-11-08): <https://home.treasury.gov/news/press-releases/jy1087>
- U.S. Treasury, press release on the Sinbad.io designation (2023-11-29): <https://home.treasury.gov/news/press-releases/jy1933>
- HigherGov, IRS Criminal Investigation Chainalysis Enterprise Subscription Support, contract 205AE923C00010: <https://highergov.com/contract/205AE923C00010>
- HigherGov, IRS-CI TRM Labs contract 2023H225C00135: <https://www.highergov.com/contract/2023H225C00135>
