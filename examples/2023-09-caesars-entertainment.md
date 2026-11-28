# Caesars Entertainment — social engineering of an IT support vendor, loyalty data stolen, ransom reportedly paid in crypto — 2023-09

**Loss:** Caesars' [Form 8-K](https://www.sec.gov/Archives/edgar/data/1590895/000119312523235015/d537840d8k.htm) says the unauthorized actor acquired a copy of its loyalty program database, which includes driver's license numbers and/or Social Security numbers for a significant number of members. The 8-K does not mention a ransom. [TechTarget](https://www.techtarget.com/searchsecurity/news/366552134/Caesars-Entertainment-breached-in-social-engineering-attack) (2023-09-14) relays a Wall Street Journal report that Caesars paid roughly \$15M to the threat actors, and says Bloomberg first reported a "multi-million dollar ransom payment". [Andy Greenberg of WIRED](https://x.com/a_greenberg/status/1849831809841799617) wrote on 2024-10-25 that Caesars paid \$15M to the Scattered Spider ransomware group and that ZachXBT and other investigators recovered \$12M of it; that recovery is relayed from the post only. The earlier version of this file gave an original demand of about \$30M; no opened page says so, so it is removed.

**Scope note:** OAK files a general-IT breach only when it took part in a crypto loss or is crypto-adjacent. The tie here is the ransom, reported as paid in cryptocurrency per the sources above. The intrusion itself is not a crypto attack, and the file records it only as the cause of the payment.

**OAK Techniques observed:** **OAK-T5.008** (Ransomware Extortion Payment, *primary*): the payment to the extortionists, reported by the Wall Street Journal and Greenberg. See [`techniques/T5.008-ransomware-extortion-payment.md`](../techniques/T5.008-ransomware-extortion-payment.md). The earlier version also declared cex deposit-address layering and common-funder cluster reuse. No opened page describes where the payment went or any wallet cluster, so both are removed.

**Attribution:** **inferred-weak** for the actor. [Greenberg](https://x.com/a_greenberg/status/1849831809841799617) names Scattered Spider as the recipient of the payment. The [8-K](https://www.sec.gov/Archives/edgar/data/1590895/000119312523235015/d537840d8k.htm) names no actor, and [TechTarget](https://www.techtarget.com/searchsecurity/news/366552134/Caesars-Entertainment-breached-in-social-engineering-attack) says it does not link Scattered Spider to the Caesars attack. No opened page ties the Caesars intrusion to the ALPHV / BlackCat ransomware brand, and the earlier claim of that is removed. The earlier claim that a November 2024 indictment named Caesars was not found on any opened page and is removed.

**Key teaching point:** **Treat help-desk and outsourced IT-support staff as the identity check that attackers will call, and require a call-back or ticket-bound verification before any credential or access change.** Per the [8-K](https://www.sec.gov/Archives/edgar/data/1590895/000119312523235015/d537840d8k.htm), the way in was a social-engineering attack on an outsourced IT support vendor.

## Summary

Caesars Entertainment disclosed in a [Form 8-K](https://www.sec.gov/Archives/edgar/data/1590895/000119312523235015/d537840d8k.htm), signed 2023-09-14, that it had found suspicious activity in its IT network that came from a social-engineering attack on an outsourced IT support vendor. The filing reports 2023-09-07 as the date of the earliest event. The actor acquired a copy of the loyalty program database. The company reports no evidence that member passwords or PINs, bank account information or payment card information were acquired, and says customer-facing operations were not impacted. It says it took steps to ensure the stolen data is deleted, that it cannot guarantee this result, notified law enforcement and state gaming regulators, and engaged cybersecurity firms. It does not expect a material effect on its financial condition or results.

The ransom is not in the filing. [TechTarget](https://www.techtarget.com/searchsecurity/news/366552134/Caesars-Entertainment-breached-in-social-engineering-attack) reports that the data-deletion wording suggests a payment and relays the Wall Street Journal figure of roughly \$15M. [Greenberg](https://x.com/a_greenberg/status/1849831809841799617) later put the payment at \$15M to Scattered Spider and the recovered part at \$12M. Caesars has not confirmed the payment on any opened page. The WSJ, Reuters and Bloomberg reports themselves were not opened.

## Timeline (UTC)

Stages: entry, data theft, payment, response. Dates are as the pages give them.

| When | What happened | OAK |
|---|---|---|
| Before 2023-09-07 | Social-engineering attack on an outsourced IT support vendor gives the actor access to Caesars' network, per the [8-K](https://www.sec.gov/Archives/edgar/data/1590895/000119312523235015/d537840d8k.htm); the vendor's name, the method and the date are undisclosed | none — off-chain help-desk-style social engineering, no matching Technique |
| 2023-09-07 | Earliest event the [8-K](https://www.sec.gov/Archives/edgar/data/1590895/000119312523235015/d537840d8k.htm) reports; the actor has acquired a copy of the loyalty database | none — off-chain data theft |
| Undisclosed, before 2023-09-14 | Caesars reportedly pays about \$15M in crypto, per [TechTarget](https://www.techtarget.com/searchsecurity/news/366552134/Caesars-Entertainment-breached-in-social-engineering-attack) relaying the WSJ and per [Greenberg](https://x.com/a_greenberg/status/1849831809841799617); date, addresses and hashes undisclosed | **T5.008** |
| 2023-09-14 | Caesars signs the 8-K ([TechTarget](https://www.techtarget.com/searchsecurity/news/366552134/Caesars-Entertainment-breached-in-social-engineering-attack) published the same day) | response |
| Undisclosed | Where the payment went and which services received it: undisclosed | — |
| 2024-10-25 | Greenberg writes that ZachXBT and other investigators recovered \$12M of the \$15M | response |

Key addresses:

- Ransom payment addresses and transaction hashes: undisclosed on every opened page.

## Root-cause evidence

- **Technique:** OAK-T5.008
- **Source:** <https://www.sec.gov/Archives/edgar/data/1590895/000119312523235015/d537840d8k.htm>; <https://www.techtarget.com/searchsecurity/news/366552134/Caesars-Entertainment-breached-in-social-engineering-attack>; <https://x.com/a_greenberg/status/1849831809841799617>
- **Source type:** government
- **Confidence:** reported
- **Evidence:** The company's own SEC filing establishes the entry (social engineering of an outsourced IT support vendor) and the data taken. The ransom payment rests on press reports relayed by TechTarget and on one journalist's post; Caesars' filing does not state it.

## Public references

- Caesars Entertainment, [Form 8-K](https://www.sec.gov/Archives/edgar/data/1590895/000119312523235015/d537840d8k.htm), signed 2023-09-14 (sec.gov opened directly).
- TechTarget, [Caesars Entertainment breached in social engineering attack](https://www.techtarget.com/searchsecurity/news/366552134/Caesars-Entertainment-breached-in-social-engineering-attack) (2023-09-14).
- Andy Greenberg (WIRED), [X post](https://x.com/a_greenberg/status/1849831809841799617) (2024-10-25).
