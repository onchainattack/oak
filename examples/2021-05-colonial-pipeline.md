# Colonial Pipeline ransomware extortion payment — 2021-05

**Loss:** Colonial Pipeline paid approximately 75 BTC (~\$4.4M at time of payment) to the DarkSide ransomware-as-a-service group on 2021-05-08 `[secsysnews]`, following the encryption of Colonial's corporate IT network. CISA reported no indication that the actor moved laterally into the operational-technology (OT) network; the pipeline company proactively disconnected certain OT systems `[cisaaa21131a]`. The DOJ announced on 2021-06-07 the seizure of 63.7 BTC (~\$2.3M) of the payment under a warrant authorised in the Northern District of California; the FBI held the private key for the receiving address `[secsysnews]` `[cyberscoop]`.
**OAK Techniques observed:** **OAK-T5.008** (Ransomware Extortion Payment) — canonical PATH A + PATH C anchor. The payment was made to a DarkSide operator address on a known ransomware threat-intelligence feed, and the DarkSide affiliate-split structure (victim → affiliate → DarkSide operator; split percentages unverified) is consistent with the RaaS two-hop fingerprint. The seizure of 63.7 BTC traced from the ransom payment supports the attribution chain.
**Attribution:** **confirmed** — the FBI, per Deputy Director Abbate at the 2021-06-07 press conference, identified a wallet that "the DarkSide actors used to collect a payment from a victim" `[cyberscoop]`; DarkSide is described by CyberScoop as believed to be Russia-based `[cyberscoop]`. Reporting says the seizure affidavit did not explain how the FBI came to hold the private key `[jurist]`.
**OAK-G19:** DarkSide is the canonical ransomware-as-a-service cluster whose operational impact — triggering the U.S. whole-of-government ransomware response architecture, the Colonial Pipeline FBI seizure precedent, and the presidential cybersecurity executive order (EO 14028) — makes it one of the most structurally significant ransomware actors in the OAK taxonomy despite its short operating window (CISA: targeting large organisations since August 2020 `[cisaaa21131a]`). See [`actors/OAK-G19-darkside.md`](../actors/OAK-G19-darkside.md).

**Corrected 2026-10-11:** Payment date is 2021-05-08 (not 05-07), warrant was N.D. Cal., and unsourced East Coast supply share, pipeline size, FBI New York Field Office and 75-85% affiliate split were removed.

**Key teaching point:** Colonial Pipeline is the canonical T5.008 anchor demonstrating detection PATH A (known-address hit against a ransomware-operator feed) + PATH C (RaaS affiliate-split two-hop structure). The FBI's ability to trace and seize the extortion payment — despite the victim's cryptographic authorisation — demonstrates that T5.008 is a post-payment detection and recovery domain, not a pre-payment prevention domain.

## Summary

On 2021-05-07, Colonial Pipeline Company was hit by a DarkSide ransomware attack that encrypted its corporate IT network (attack dated 2021-05-06 in `[secsysnews]`). Colonial proactively shut down pipeline operations. The pipeline-size, throughput and East Coast supply-share figures previously stated here were unsourced and have been removed.

Colonial reported paying approximately 75 BTC (~\$4.4M) to DarkSide. Investigators traced the payment on the public Bitcoin ledger to an address for which the FBI held the private key; the method by which it obtained the key was not explained in the affidavit as reported `[jurist]`. On 2021-06-07 the DOJ announced the seizure of 63.7 BTC, authorised by a magistrate judge of the Northern District of California `[secsysnews]`.

The DarkSide group operated under a RaaS model: affiliates deployed the ransomware and the developers received a share of the proceeds `[cisaaa21131a]`. The specific split percentages previously stated here (75-85% / 15-25%) are not stated in the cited sources and are unverified.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021-05-06 | Colonial Pipeline corporate IT network attacked by DarkSide ransomware (date per `[secsysnews]`) | (incident) |
| 2021-05 | Colonial proactively shuts down pipeline operations | (operational impact) |
| 2021-05-08 | Colonial pays ~75 BTC (~\$4.4M) to DarkSide-controlled address | T5.008 (ransomware extortion payment) |
| 2021-06-07 | DOJ announces seizure of 63.7 BTC (~\$2.3M); Deputy AG Monaco: "Following the money remains one of the most basic, yet powerful tools we have" | T5.008 (post-payment seizure) |

## Public references

- FBI affidavit for seizure warrant: In re: Seizure of 63.770168 Bitcoin (E.D. Cal., June 2021). Unverified; reporting places the warrant in the Northern District of California.
- DOJ press release: "Department of Justice Seizes \$2.3 Million in Cryptocurrency Paid to the Ransomware Extortionists Darkside" (2021-06-07). Title not independently confirmed here; see the news reports below.
- `[secsysnews]` — Security Systems News, "DOJ seizes \$2.3 million in cryptocurrency paid by Colonial Pipeline to hackers" (2021-06): <http://www.securitysystemsnews.com/article/doj-seizes-2-3-million-in-cryptocurrency-paid-by-colonial-pipeline-to-hackers>
- `[cyberscoop]` — CyberScoop, DOJ DarkSide / Colonial cryptocurrency seizure (2021-06-07): <https://cyberscoop.com/doj-darkside-colonial-cryptocurrency-seizure/>
- `[jurist]` — Jurist, "DOJ announces recovery of millions paid in ransom to pipeline hackers" (2021-06-09): <https://www.jurist.org/news/2021/06/doj-announces-recovery-of-millions-paid-in-ransom-to-pipeline-hackers/>
- `[cisaaa21131a]` — CISA, Alert AA21-131A, DarkSide Ransomware: Best Practices for Preventing Business Disruption from Ransomware Attacks (2021-05-11, rev. 2021-07-08): <https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-131a>
