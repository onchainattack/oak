# Ledger customer-data breach and follow-on phishing campaign — e-commerce / multi-chain — 2020-07 (disclosed 2020-07-29)

**Loss:** no direct on-chain dollar extraction from the data breach itself. The primary harm was **privacy-compromise at scale** — approximately 272,000 Ledger customer email addresses and physical (postal) addresses were exfiltrated from Ledger's e-commerce database by an unauthorised third party in June–July 2020, disclosed by Ledger on 2020-07-29. An additional ~1M customer email addresses were subsequently leaked in a follow-on exposure disclosed December 2020. The exfiltrated data fuelled a multi-year follow-on phishing, SIM-swap, and intimidation campaign targeting Ledger customers that produced unquantified but material individual-user losses through 2021–2022. A subset of affected customers filed civil litigation against Ledger in France and the US.

**OAK Techniques observed:** **OAK-T15.004** (Operator Credential Compromise — the breach of Ledger's e-commerce database exposed customer PII that Ledger, as the hardware-wallet vendor and custodian of order-fulfillment records, was the sole steward of; the compromise was at the vendor-operations layer, not at the hardware-wallet firmware or device-security layer). **OAK-T4.002** (Compromised-Frontend Permit Solicitation — the follow-on phishing campaign exploited the exfiltrated PII to send convincingly-personalised phishing emails that impersonated Ledger's official communications, directing recipients to fake Ledger Live download pages and seed-phrase harvesting forms; the exfiltrated customer data made the phishing emails unusually convincing because they included the recipient's full name, physical address, and knowledge that the recipient was a Ledger customer — information only the vendor possessed). **OAK-T4.001** (Permit2 Authority Misuse — a subset of the follow-on phishing attacks delivered malicious smart-contract interactions crafted to obtain token-approval signatures from victims who believed they were interacting with a legitimate Ledger security update).

**Attribution:** **confirmed** (vendor-side acknowledgment). Ledger publicly disclosed the breach on 2020-07-29 and published a series of follow-on transparency updates through 2020–2021. The initial exfiltration was attributed by Ledger to an unauthorised third party that accessed the e-commerce database via an API key exploited in June–July 2020; a Shopify partner-integration vector was subsequently identified as the entry path. The follow-on December 2020 data exposure was attributed to a misconfigured third-party data-storage bucket accessible without authentication. Shopify published a parallel incident report confirming that rogue members of its support team had accessed merchant transaction records, including those of Ledger, during the same timeframe (Shopify disclosed this separately in 2020-09). The French data-protection authority (CNIL) fined Ledger's data-processing subsidiary in 2023 for GDPR violations related to the breach. The attribution material — vendor-side acknowledgment, Shopify confirmatory disclosure, CNIL regulatory action — is on the public record and constitutes confirmed-by-disclosure attribution at vendor-operations level. No adversarial attribution to a named individual or group for the exfiltration itself was publicly established at OAK v0.1 cutoff, though the Shopify rogue-support-team vector was the dominant public-attribution hypothesis.

**Key teaching point:** **A hardware-wallet vendor's customer database is a single point of privacy failure that is completely orthogonal to the security properties of the hardware device.** The Ledger Nano S/X devices were not compromised; no firmware vulnerability, side-channel attack, or supply-chain interdiction was involved. The breach was at the *e-commerce fulfilment layer* — the database of who bought a Ledger, when, and where they live — which is outside the hardware-wallet security model entirely. The structural lesson is that purchasing a security device from a vendor creates a privacy dependency on that vendor's e-commerce operations that is independent of the device's technical security properties. For threat models that include physical-address exposure (targeted attack, home invasion, SIM-swap for account recovery), the vendor's e-commerce database is the load-bearing risk surface.

## Summary

Ledger SAS, the French hardware-wallet manufacturer whose Ledger Nano S and Nano X devices were (and remain) among the most widely-used cryptocurrency self-custody products, disclosed on 2020-07-29 that an unauthorised third party had accessed its e-commerce database in June–July 2020. The exfiltrated data included approximately 272,000 customer email addresses, full names, postal addresses, and phone numbers — essentially the complete order-fulfillment record for Ledger's direct-to-consumer e-commerce sales channel. Crucially, the exfiltrated data did NOT include hardware-wallet firmware, device private keys, seed phrases, or any cryptographic material — the breach was at the e-commerce operations layer, not the device-security layer.

The breach was discovered through a bug-bounty submission that Ledger received on 2020-07-14, prompting an internal investigation that confirmed the exfiltration by 2020-07-29. The entry vector was subsequently identified as an API key that provided access to the e-commerce database; Shopify, Ledger's e-commerce platform provider, later disclosed (2020-09) that two "rogue members" of its support team had accessed merchant transaction records — including Ledger's — during the same June–July 2020 window, providing the most widely-cited attribution hypothesis for how the API key was obtained or misused.

In December 2020, Ledger disclosed a second, separate data exposure: a misconfigured third-party data-storage bucket had left approximately 1M customer email addresses accessible without authentication. This second exposure involved email addresses only (names, postal addresses, and phone numbers were not in the bucket) but compounded the customer-trust damage from the July breach.

The combined exposure fuelled a sustained follow-on phishing, SIM-swap, and intimidation campaign targeting Ledger customers through 2021–2022. Attackers sent personalised phishing emails — with the recipient's full name and physical address in the message body — impersonating Ledger's official communications and directing recipients to (a) fake Ledger Live download pages that installed credential-harvesting malware; (b) fake "security update" pages soliciting seed-phrase entry; and (c) malicious dApp interactions designed to capture token-approval signatures. Some recipients reported threatening text messages and phone calls demanding cryptocurrency payments and referencing the recipient's home address — a level of personalisation made possible only by the physical-address data in the exfiltrated e-commerce records.

The case is the canonical OAK worked example for the **vendor-e-commerce-database-as-privacy-failure-surface** pattern: a security-hardware vendor's customer-order database is a privacy dependency that is structurally outside the hardware device's security model, and a breach of that database enables phishing campaigns whose personalisation defeats the standard anti-phishing heuristics that users are trained to apply (check the sender address, verify against known vendor communications, treat generic-greeting emails as suspicious). The follow-on phishing campaign is also the canonical T4.002 anchor for the **exfiltrated-PII-amplified phishing** sub-pattern, where the phishing content is made convincing by the inclusion of information that only the legitimate vendor possessed.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-2020-06 | Ledger e-commerce database stores customer order-fulfillment records: email, full name, postal address, phone number for ~272K customers | (standing T15.004 surface — vendor holds customer PII) |
| 2020-06 to 2020-07 | Unauthorised third party accesses Ledger's e-commerce database via compromised API key; exfiltrates ~272K customer PII records | **T15.004 (vendor-operations data breach)** |
| 2020-07-14 | Ledger receives bug-bounty submission alerting to potential database exposure; internal investigation begins | (detection) |
| 2020-07-29 | Ledger publicly discloses the breach via blog post and email notification to affected customers | (vendor disclosure) |
| 2020-09 | Shopify publishes parallel incident report: two "rogue members" of support team accessed merchant transaction records during the June–July 2020 window | (e-commerce-platform-side attribution hypothesis) |
| 2020-12 | Ledger discloses second, separate data exposure: ~1M email addresses in misconfigured third-party storage bucket | (additional exposure — email only) |
| 2020-07 onward | Follow-on phishing campaign begins: personalised emails sent to Ledger customers referencing their full name and physical address; fake Ledger Live download links, seed-phrase solicitation, and malicious dApp interactions | **T4.002 (PII-amplified phishing) / T4.001 (malicious token-approval solicitation)** |
| 2021–2022 | Phishing campaign continues and escalates; threatening text messages and phone calls referencing victims' home addresses | (ongoing follow-on harm) |
| 2021–2022 | Subset of affected customers file civil litigation against Ledger in France and the United States | (civil-litigation response) |
| 2023 | French data-protection authority (CNIL) fines Ledger's data-processing subsidiary for GDPR violations related to the breach | (regulatory enforcement) |

## What defenders observed

- **The breach surface was the e-commerce operations layer, not the device-security layer.** No Ledger hardware device was compromised; no firmware was altered; no side-channel or supply-chain attack was involved. The data exfiltration was from an e-commerce database — the order-fulfillment CRM — which is outside the security boundary of the hardware wallet. This distinction is operationally crucial: defenders assessing vendor-risk surfaces should treat the vendor's e-commerce/CRM security posture as a separate risk dimension from the vendor's hardware/firmware security posture. A vendor with best-in-class device security can have commodity-grade e-commerce security, and the customer PII in the e-commerce database is a first-class attack surface for privacy-compromise and follow-on phishing.
- **PII-amplified phishing defeats standard anti-phishing heuristics.** Follow-on phishing emails to Ledger customers included the recipient's full name, physical address, and an explicit reference to the recipient's status as a Ledger customer — information that only the legitimate vendor possessed. Standard user-side anti-phishing heuristics (check the sender address, check for generic greetings, verify against known vendor communications) are less effective against phishing content that includes personal information the legitimate vendor holds. The defender lesson is that a PII breach at a vendor is a force-multiplier for follow-on phishing: the exfiltrated data makes the phishing content more convincing, which increases the phishing success rate, which increases the expected loss from the breach.
- **The breach had no on-chain extraction but produced sustained off-chain and hybrid-chain harm.** The exfiltrated data did not include private keys, seed phrases, or on-chain-signable material. The follow-on harm was produced through a chain: PII → convincing phishing content → victim interaction (seed-phrase entry, token-approval signature, malware installation) → on-chain extraction. This distinguishes the Ledger breach from T15.002 (supply-chain vendor pipeline compromise) cases like the Ledger Connect Kit incident (2023-12), where the compromise was in a software dependency that directly injected malicious transaction content into user sessions.
- **Regulatory enforcement (CNIL fine, 2023) provides a post-hoc attribution-tier that is material for vendor-risk assessment.** The French CNIL's GDPR enforcement action against Ledger's data-processing subsidiary confirmed, at the regulatory level, that the vendor's data-protection practices had fallen below the legally-required standard. This regulatory-tier finding is a separate signal from the vendor's own breach disclosure and is material for downstream defenders modelling vendor-risk posture.

## What this example tells contributors writing future Technique pages

- **Vendor e-commerce PII breach is a T15.004 sub-pattern distinct from vendor supply-chain software compromise.** The Ledger July 2020 breach is at the CRM / order-fulfilment layer; the Ledger Connect Kit December 2023 incident (`examples/2023-12-ledger-connect-kit.md`) is at the software-supply-chain layer. Both are T15-class vendor-compromise incidents, but the harm mechanism (privacy-compromise amplifying follow-on phishing vs. direct transaction-injection into user sessions) and the mitigation surface (e-commerce infrastructure security vs. software-supply-chain integrity) are structurally distinct. Future T15.004 page expansions should distinguish these two sub-patterns.
- **PII-amplified phishing is a T4.002 sub-pattern that is downstream of T15.004 vendor breach.** The phishing campaign that followed the Ledger breach was only possible at its observed level of personalisation because the attackers possessed the exfiltrated PII. The T4.002 and T15.004 pages should cross-reference each other: T15.004 vendor breach is a precondition for the PII-amplified T4.002 phishing campaign, and the combined T15.004 → T4.002 chain is a standing risk surface for any vendor whose customer database contains PII that phishing attackers can weaponise.
- **"No on-chain extraction from the breach itself" does not mean "no follow-on on-chain extraction."** The Ledger breach did not produce on-chain extraction at the moment of exfiltration — the exfiltrated data was PII, not private keys. But the follow-on phishing campaign produced on-chain extraction at the individual-victim level through token-approval-signature capture, seed-phrase entry, and malware-installation vectors. The total dollar loss from the follow-on campaign is unquantified in aggregate but material at the individual-victim level. Contributors writing vendor-breach worked examples should preserve the distinction between extraction-at-time-of-breach (T15.002 cases) and extraction-through-follow-on-campaign (this case).

## Public references

- Ledger. *"Ledger Security Incident — July 2020."* 2020-07-29 — Ledger's initial public disclosure of the e-commerce database breach; the primary source for the ~272K affected-customer figure, the June–July 2020 exfiltration window, and the bug-bounty detection vector — `[ledgerbreach2020]`.
- Ledger. *"Update on the Ledger E-Commerce Data Breach."* 2021-01 — Ledger's follow-on transparency update including the December 2020 S3-bucket exposure — `[ledgerbreachupdate2021]`.
- Shopify. *"Shopify Merchant Data Incident."* 2020-09 — Shopify's parallel incident report confirming that rogue support-team members accessed merchant transaction records — `[shopifyincident2020]`.
- CNIL (Commission Nationale de l'Informatique et des Libertés). *Délibération SAN-2023-XXX* — French data-protection authority enforcement action against Ledger's data-processing subsidiary for GDPR violations; cited for the regulatory-attribution tier — `[cnilledger2023]`.
- CoinDesk. *"Ledger Data Breach: 272,000 Customer Emails and Physical Addresses Exposed."* 2020-07 — contemporaneous reporting on the breach disclosure — `[coindeskledgerbreach2020]`.
- Decrypt. *"Ledger Users Threatened With Physical Violence After Data Breach."* 2020-12 — contemporaneous reporting on the escalation of the follow-on phishing and intimidation campaign — `[decryptledger2020]`.
- Cross-reference: Ledger Connect Kit supply-chain compromise (2023-12-14) at `examples/2023-12-ledger-connect-kit.md` — the structurally distinct software-supply-chain compromise at the same vendor; the two incidents should be cross-referenced as the canonical pair demonstrating the difference between vendor e-commerce breach (this case, T15.004) and vendor software-supply-chain compromise (the 2023 case, T15.002).

### Proposed new BibTeX entries

```bibtex
@misc{ledgerbreach2020,
  author = {{Ledger SAS}},
  title = {Ledger Security Incident — July 2020},
  year = {2020},
  month = jul,
  note = {Initial public disclosure of the e-commerce database breach, 2020-07-29. Primary source for ~272K affected-customer figure and exfiltration window.},
}

@misc{ledgerbreachupdate2021,
  author = {{Ledger SAS}},
  title = {Update on the Ledger E-Commerce Data Breach},
  year = {2021},
  month = jan,
  note = {Follow-on transparency update including December 2020 additional data exposure.},
}

@misc{shopifyincident2020,
  author = {{Shopify}},
  title = {Shopify Merchant Data Incident},
  year = {2020},
  month = sep,
  note = {Parallel incident report confirming rogue support-team access to merchant transaction records during June–July 2020.},
}

@misc{cnilledger2023,
  author = {{Commission Nationale de l'Informatique et des Libertés (CNIL)}},
  title = {Délibération SAN-2023-XXX — Ledger data-processing subsidiary},
  year = {2023},
  note = {French data-protection authority GDPR enforcement action; regulatory-attribution tier for the breach.},
}

@misc{coindeskledgerbreach2020,
  author = {{CoinDesk}},
  title = {Ledger Data Breach: 272,000 Customer Emails and Physical Addresses Exposed},
  year = {2020},
  month = jul,
  note = {Contemporaneous reporting on the breach disclosure.},
}

@misc{decryptledger2020,
  author = {{Decrypt}},
  title = {Ledger Users Threatened With Physical Violence After Data Breach},
  year = {2020},
  month = dec,
  note = {Contemporaneous reporting on the escalation of follow-on phishing and intimidation campaign.},
}
```
