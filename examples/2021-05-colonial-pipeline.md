# Colonial Pipeline ransomware extortion payment — 2021-05

**Loss:** Colonial Pipeline paid approximately 75 BTC (~$4.4M at time of payment) to the DarkSide ransomware-as-a-service group on 2021-05-07, following the encryption of Colonial's corporate IT network. The operational-technology (OT) pipeline-control network was not directly compromised, but Colonial preemptively shut down pipeline operations — disrupting ~45% of the U.S. East Coast's refined-product supply. The FBI recovered approximately 63.7 BTC of the payment (~$2.3M at recovery) via a seizure warrant executed against the private key of a DarkSide-controlled Bitcoin address (2021-06-07).
**OAK Techniques observed:** **OAK-T5.008** (Ransomware Extortion Payment) — canonical PATH A + PATH C anchor. The payment was made to a DarkSide operator address on a known ransomware threat-intelligence feed, and the DarkSide affiliate-split structure (victim → affiliate 75-85% → DarkSide operator 15-25%) matches the RaaS two-hop fingerprint. The FBI's seizure of 63.7 BTC from a DarkSide-controlled address confirms the attribution chain.
**Attribution:** **confirmed** — FBI attributed the attack to DarkSide, a RaaS operation believed to be based in Russia. The FBI's affidavit for the seizure warrant detailed the Bitcoin tracing methodology and private-key recovery.
**OAK-G19:** DarkSide is the canonical ransomware-as-a-service cluster whose operational impact — triggering the U.S. whole-of-government ransomware response architecture, the Colonial Pipeline FBI seizure precedent, and the presidential cybersecurity executive order (EO 14028) — makes it one of the most structurally significant ransomware actors in the OAK taxonomy despite its brief 9-month operating window (August 2020–May 2021). See [`actors/OAK-G19-darkside.md`](../actors/OAK-G19-darkside.md).

**Key teaching point:** Colonial Pipeline is the canonical T5.008 anchor demonstrating detection PATH A (known-address hit against a ransomware-operator feed) + PATH C (RaaS affiliate-split two-hop structure). The FBI's ability to trace and seize the extortion payment — despite the victim's cryptographic authorisation — demonstrates that T5.008 is a post-payment detection and recovery domain, not a pre-payment prevention domain.

## Summary

On 2021-05-07, Colonial Pipeline Company — operator of the largest refined-products pipeline system in the United States (~5,500 miles, ~2.5M barrels/day) — was hit by a DarkSide ransomware attack that encrypted its corporate IT network. Colonial proactively shut down pipeline operations, causing a multi-day disruption to East Coast fuel supply.

Colonial's CEO authorised a 75 BTC payment (~$4.4M) to a DarkSide-provided Bitcoin address. The FBI's New York Field Office, working with the DOJ's Ransomware and Digital Extortion Task Force, traced the payment through the Bitcoin transaction graph and identified a DarkSide-controlled address whose private key was recovered via an undisclosed method. On 2021-06-07, the FBI executed a seizure warrant and recovered 63.7 BTC.

The DarkSide group operated under a RaaS model: affiliates deployed the ransomware and received 75-85% of payments; the DarkSide core team received 15-25% and provided the ransomware infrastructure, payment infrastructure, and negotiation support. The affiliate-split structure leaves a detectable on-chain two-hop fingerprint.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021-05-07 | Colonial Pipeline corporate IT network encrypted by DarkSide ransomware | (incident) |
| 2021-05-07 | Colonial Pipeline shuts down operations (~45% East Coast refined-product supply affected) | (operational impact) |
| 2021-05-07 | Colonial pays ~75 BTC (~$4.4M) to DarkSide-controlled address | T5.008 (ransomware extortion payment) |
| 2021-06-07 | FBI seizes 63.7 BTC from DarkSide-controlled address via private-key recovery | T5.008 (post-payment seizure) |
| 2021-06-08 | DOJ announces seizure; Deputy AG Monaco confirms FBI traced and recovered the payment | (law enforcement) |

## Public references

- FBI affidavit for seizure warrant: In re: Seizure of 63.770168 Bitcoin (E.D. Cal., June 2021).
- DOJ press release: "Department of Justice Seizes $2.3 Million in Cryptocurrency Paid to the Ransomware Extortionists Darkside" (2021-06-07).
- CISA Alert AA21-131A: DarkSide Ransomware — Best Practices for Preventing Business Disruption from Ransomware Attacks.
