> **QUARANTINED 2026-11-28 — not part of the OAK corpus.** No source documents a cryptocurrency payment or a crypto loss at MGM, so by OAK's scope rule this general-IT breach is outside the corpus (the Caesars file, where a payment is reported, stays). The earlier text also said a November 2024 indictment named MGM, which its source does not say. It is kept here, outside `examples/`, and can return if a source documents an incident.

# MGM Resorts cybersecurity incident — systems shut down, customer data taken, no crypto payment or loss documented — 2023-09

**Loss:** MGM's [Form 8-K](https://www.sec.gov/Archives/edgar/data/789570/000119312523251667/d461062d8k.htm) (report date 2023-10-05) estimates "approximately $100 million" negative impact to Adjusted Property EBITDAR for the Las Vegas Strip Resorts, and less than \$10M in one-time expenses in the third quarter. [TechTarget](https://www.techtarget.com/cybersecurity/news/366554695/MGM-faces-100M-loss-from-ransomware-attack) (2023-10-06) says MGM expects cyber insurance to cover the financial impact, with the full cost not yet determined. No cryptocurrency amount appears on any opened page.

**Scope note:** OAK files a general-IT breach only when it took part in a crypto loss or is crypto-adjacent. No opened page documents a cryptocurrency payment or a crypto loss in the MGM incident. The 8-K does not mention a ransom or cryptocurrency. TechTarget says it "remains unclear if MGM received a ransom demand or made any kind of payment". The earlier version of this file said MGM refused a ransom; that rests on a Wall Street Journal report relayed by a Decipher article that could not be opened (the URL redirected to the site home page), so it is not carried. The MGM 8-K was readable by machine on sec.gov.

**OAK Techniques observed:** none — no theft, payment or laundering of crypto is documented on an opened page. The earlier version declared the ransomware-extortion-payment Technique, and two attribution-side Techniques (common-funder cluster reuse and cross-chain operator continuity). No opened page shows a payment or a wallet cluster, so all three are removed.

**Attribution:** **inferred-weak**. [TechTarget](https://www.techtarget.com/cybersecurity/news/366554695/MGM-faces-100M-loss-from-ransomware-attack) reports that the Alphv/BlackCat ransomware gang claimed responsibility. The 8-K names no actor. The earlier version said a November 2024 DOJ indictment named MGM and Caesars as predicate intrusions with confirmed attribution. That is contradicted by the pages read: [TechTarget on the charges](https://www.techtarget.com/cybersecurity/news/366616392/DOJ-charges-5-alleged-Scattered-Spider-members) says the five defendants were charged over activity "from at least September 2021 to April 2023" and does not say they were charged for the MGM or Caesars attacks. A Reuters report relayed in a search result, not opened, says MGM said the defendants did not appear to be related to the attack on its network. The earlier confirmed attribution is removed.

**Key teaching point:** **An outage of customer-facing systems can cost far more than any ransom, and the 8-K shows the cost is booked as business interruption, not as a crypto loss.** MGM shut down its systems to mitigate risk to customer information, per its [8-K](https://www.sec.gov/Archives/edgar/data/789570/000119312523251667/d461062d8k.htm); a defender planning for this class should rehearse isolation and manual fallback, which is outside OAK's crypto Techniques.

## Summary

On 2023-09-12 MGM Resorts International issued a statement about a cybersecurity issue affecting certain of its U.S. systems, per its [8-K](https://www.sec.gov/Archives/edgar/data/789570/000119312523251667/d461062d8k.htm). The filing says the company shut down its systems, and that customer personal information was obtained; for a limited number of customers, Social Security and passport numbers were also obtained. It says MGM does not believe customer passwords, bank account numbers or payment card information were obtained.

[TechTarget](https://www.techtarget.com/cybersecurity/news/366554695/MGM-faces-100M-loss-from-ransomware-attack) reports that guests hit problems with room access, amenities and casino games that lasted days, that Alphv/BlackCat claimed responsibility, and that MGM's entry point was not stated. It notes Okta confirmed MGM was among many customers hit by a social-engineering campaign, presented as context rather than a confirmed path. The earlier help-desk vishing entry and "10-day outage" are not on an opened page and are removed.

Caesars, a separate victim in the same month, has a reported crypto payment and is covered in [`2023-09-caesars-entertainment.md`](2023-09-caesars-entertainment.md), rewritten from its 8-K.

## Timeline (UTC)

Dates as the pages give them; times undisclosed.

| When | What happened | OAK |
|---|---|---|
| Undisclosed, before 2023-09-12 | Intrusion into MGM systems; entry vector undisclosed ([TechTarget](https://www.techtarget.com/cybersecurity/news/366554695/MGM-faces-100M-loss-from-ransomware-attack)) | none — off-chain intrusion |
| 2023-09-12 | MGM issues a statement on a cybersecurity issue and shuts down systems ([8-K](https://www.sec.gov/Archives/edgar/data/789570/000119312523251667/d461062d8k.htm)) | response |
| September 2023 | Guests report room-access, amenity and casino-game problems lasting days ([TechTarget](https://www.techtarget.com/cybersecurity/news/366554695/MGM-faces-100M-loss-from-ransomware-attack)) | none — off-chain impact |
| Undisclosed | Alphv/BlackCat claims responsibility ([TechTarget](https://www.techtarget.com/cybersecurity/news/366554695/MGM-faces-100M-loss-from-ransomware-attack)) | none |
| Undisclosed | Any ransom demand, payment, wallet or transaction: undisclosed; TechTarget says unclear | — |
| 2023-10-05 | 8-K reports about \$100M EBITDAR impact and under \$10M one-time expenses | response |

Key addresses: none; no wallet or transaction is printed on any opened page.

## Root-cause evidence

- **Technique:** none — no crypto mechanism documented
- **Source:** <https://www.sec.gov/Archives/edgar/data/789570/000119312523251667/d461062d8k.htm>; <https://www.techtarget.com/cybersecurity/news/366554695/MGM-faces-100M-loss-from-ransomware-attack>
- **Source type:** government
- **Confidence:** reported
- **Evidence:** The company's SEC filing establishes the shutdown, the data taken and the cost. The entry vector, ransom demand and any payment are not established by any opened page.

## Public references

- MGM Resorts International, [Form 8-K](https://www.sec.gov/Archives/edgar/data/789570/000119312523251667/d461062d8k.htm), report date 2023-10-05 (sec.gov opened directly).
- TechTarget, [MGM faces $100M loss from ransomware attack](https://www.techtarget.com/cybersecurity/news/366554695/MGM-faces-100M-loss-from-ransomware-attack) (2023-10-06).
- TechTarget, [DOJ charges 5 alleged Scattered Spider members](https://www.techtarget.com/cybersecurity/news/366616392/DOJ-charges-5-alleged-Scattered-Spider-members) (2024-11).
- Related case: [`2023-09-caesars-entertainment.md`](2023-09-caesars-entertainment.md).
