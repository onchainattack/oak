# Ledger customer-data breach and follow-on phishing campaign — e-commerce / multi-chain — 2020-06 (disclosed 2020-07, dumped 2020-12)

**Loss:** no direct on-chain dollar extraction from the data breach itself. The primary harm was **privacy compromise at scale**. Ledger's marketing and e-commerce database was accessed in June 2020 through a misconfigured third-party API key `[decrypt1]`. Ledger's July 2020 disclosure said about 1 million email addresses were involved and phone numbers, postal addresses and purchase details of about 9,500 customers were exposed `[decrypt1]`. In December 2020 the data was posted on RaidForums: over 1,000,000 email addresses and over 270,000 records with names, physical addresses and phone numbers `[decrypt1]`. The leaked data was followed by scam attempts, including fake Ledger devices mailed to customers `[bigwhale1]`.

**OAK Techniques observed:** **OAK-T15.004** (Operator Credential Compromise — the breach of Ledger's e-commerce database exposed customer PII that Ledger, as the hardware-wallet vendor and custodian of order-fulfillment records, was the sole steward of; the compromise was at the vendor-operations layer, not at the hardware-wallet firmware or device-security layer). **OAK-T4.002** (Compromised-Frontend Permit Solicitation — the follow-on phishing campaign exploited the exfiltrated PII to send convincingly-personalised phishing emails that impersonated Ledger's official communications, directing recipients to fake Ledger Live download pages and seed-phrase harvesting forms; the exfiltrated customer data made the phishing emails unusually convincing because they included the recipient's full name, physical address, and knowledge that the recipient was a Ledger customer — information only the vendor possessed). **OAK-T4.001** (Permit2 Authority Misuse — a subset of the follow-on phishing attacks delivered malicious smart-contract interactions crafted to obtain token-approval signatures from victims who believed they were interacting with a legitimate Ledger security update).

**Attribution:** **confirmed** (vendor-side acknowledgment). Ledger disclosed the breach and attributed access to a misconfigured API key, deactivated on 2020-07-14 after a bug-bounty report `[decrypt1]`. In a 2024 report on the CNIL fine, two people were said to have been arrested for a separate May-June 2020 theft of a file of about 290,000 customers via the Shopify e-commerce platform; the 1-million-person API-key incident was attributed to no arrested actor `[bigwhale1]`. In October 2024 CNIL fined Ledger €750,000 for GDPR breaches concerning data retention duration and its security `[bigwhale1]`.

**Key teaching point:** **A hardware-wallet vendor's customer database is a single point of privacy failure that is orthogonal to the security properties of the device.** The reported exposure was in the e-commerce and marketing layer; Ledger stated its products were never exposed `[bigwhale1]``[decrypt1]`. Customers' physical addresses and purchase history became the raw material for convincing impersonation and phishing.

**Corrected 2026-10-11:** Breach counts and chronology fixed (July 2020 disclosure: ~1M emails and ~9,500 detailed records; the ~272K full-record figure is the December 2020 RaidForums dump, not the July disclosure); the CNIL fine is €750,000 reported October 2024, not 2023; removed unsourced claims of a bucket misconfiguration, a Shopify "rogue support" attribution to Ledger, SIM-swap and intimidation campaigns, civil litigation, and the Permit2/dApp phishing variants.

## Summary

Ledger SAS, the French hardware-wallet maker, had its marketing and e-commerce database accessed in June 2020 via a misconfigured third-party API key; a researcher reported the key through Ledger's bug bounty and it was deactivated on 2020-07-14 `[decrypt1]`. Ledger notified CNIL on 2020-07-16 and, in July, said about 9,500 customers' phone numbers, postal addresses and purchase details were exposed `[decrypt1]`. In December 2020 the larger dataset appeared on RaidForums, showing the July figure had understated the exposure `[decrypt1]`. Ledger said hardware wallets, recovery phrases and private keys were not exposed `[decrypt1]``[bigwhale1]`.

Ledger's marketing VP warned the data could be used to impersonate Ledger and pressure customers into revealing recovery phrases `[decrypt1]`. Scam attempts followed, including fake Ledger Nano devices sent by post `[bigwhale1]`.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2020-06 | Ledger's marketing/e-commerce database accessed via a misconfigured API key | **T15.004 (vendor-operations data breach)** |
| 2020-07-14 | Bug-bounty report; key deactivated | (detection) |
| 2020-07-16 | Ledger notifies CNIL | (regulatory notification) |
| 2020-07 | Ledger discloses ~1M emails and ~9,500 detailed customer records | (vendor disclosure) |
| 2020-12-20 | Database dumped on RaidForums: >1M emails, >270K name/address/phone records | (public leak) |
| 2020-12 onward | Impersonation and scam attempts against customers, including mailed fake devices | **T4.002 (PII-amplified phishing)** |
| 2024-10 | CNIL fines Ledger €750,000 | (regulatory enforcement) |

## What this example tells contributors writing future Technique pages

- **Vendor e-commerce PII breach is a T15.004 sub-pattern distinct from vendor software supply-chain compromise** (compare `examples/2023-12-ledger-connect-kit-library-supply-chain-compromise.md`).
- **Initial disclosures can understate scope:** the July 2020 figure (~9,500 detailed records) was far below the December leak (>270K), so cases should cite both dates.
- **"No on-chain extraction from the breach itself" does not mean "no follow-on extraction"**, but aggregate follow-on loss is not quantified in the cited sources.

## Public references

- `[decrypt1]` — Decrypt, "Hacked Ledger Database Dumped On Raidforums" (2020-12-20): <https://decrypt.co/52118/hacked-ledger-database-dumped-on-raidforums>
- `[bigwhale1]` — The Big Whale, "Exclusive. Ledger fined €750,000 by CNIL" (2024-10-23): <https://www.thebigwhale.io/articles-en/exclusive-ledger-fined-750-000-by-cnil>
- Cross-reference: Ledger Connect Kit supply-chain compromise (2023-12-14) at `examples/2023-12-ledger-connect-kit-library-supply-chain-compromise.md`.
