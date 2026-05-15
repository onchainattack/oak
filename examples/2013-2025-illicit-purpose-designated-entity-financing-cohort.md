# Illicit-Purpose and Designated-Entity Financing Cohort — 2013–2025

**OAK Techniques observed:** OAK-T7.009, OAK-T7.001, OAK-T7.002, OAK-T8.001
**Attribution:** **unattributed** (aggregate cohort of enforcement and designation actions by multiple actors).

**Loss:** Aggregate illicit-purpose cryptocurrency transaction volume is estimated in the tens of billions of dollars across all categories (sanctions evasion, terrorism financing, CSAM commercial monetisation) by Chainalysis, TRM Labs, and Elliptic annual reports. Individual designation actions and enforcement operations are the public-record artefacts; per-incident dollar figures are not systematically published due to the sensitive-law-enforcement-data constraint.

**Key teaching point:** Illicit-purpose and designated-entity financing is the **purpose-based detection layer** of the OAK-T7 family: the laundering methods used (mixers, CEX layering, cross-chain bridges, privacy chains) are indistinguishable from other T7 Techniques, and the detection signal is entirely in the **destination-address labelling** maintained by blockchain-intelligence providers (Chainalysis, TRM Labs, Elliptic) and regulatory designation lists (OFAC SDN, EU, UN). T7.009 is therefore the technique that most cleanly illustrates the **method-vs-purpose distinction** in cryptocurrency compliance: a CEX screening a deposit from a mixer against its OFAC SDN and Chainalysis illicit-activity labelling feed is performing T7.009 detection at the purpose layer, even though the laundering method (mixer → CEX) is T7.001/T7.002 at the method layer. The compliance stack must operate at both layers simultaneously.

## Summary

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2013-10 | Silk Road Bitcoin seizure: FBI seized ~174,000 BTC from Ross Ulbricht's laptop during the Silk Road takedown. The seizure established Bitcoin as a traceable asset class for law-enforcement forfeiture and anchored the OFAC-designated-address framework that would follow | **T7.009** (designated-entity asset seizure precedent) |
| 2018-11 | OFAC SDN cryptocurrency designations begin: U.S. Treasury OFAC designated two Iranian nationals and their Bitcoin addresses under the SDN program (SDN List identifiers). First time cryptocurrency addresses were explicitly listed on the SDN List — the regulatory framework that makes T7.009 screening enforceable at the CEX/VASP compliance layer | **T7.009** |
| 2019-10 | FATF Travel Rule (Recommendation 16) extended to virtual assets: FATF published updated guidance requiring VASPs to exchange originator and beneficiary information for virtual-asset transfers above a de minimis threshold, extending the wire-transfer Travel Rule framework to cryptocurrency and creating the compliance-infrastructure obligation that underlies T7.009 screening | **T7.009** |
| 2021-09 | OFAC sanctions Suex OTC: U.S. Treasury OFAC designated SUEX OTC, a Russia-based OTC broker, for facilitating ransomware payments, sanctions evasion, and darknet-market proceeds laundering. First OFAC designation of a cryptocurrency OTC broker as a sanctions-evasion enabler | **T7.009** |
| 2022-04 | OFAC sanctions Hydra market and Garantex: U.S. Treasury OFAC simultaneously designated the Hydra darknet market and the Garantex cryptocurrency exchange (also designating 100+ cryptocurrency addresses associated with each) for facilitating illicit transactions, including ransomware proceeds and darknet-market commerce. The coordinated designation of a darknet market and a CEX in the same action established the two-tier T7.009 enforcement architecture | **T7.009** + T7.001 + T7.002 |
| 2022-08 | OFAC sanctions Tornado Cash: U.S. Treasury OFAC designated the Tornado Cash Ethereum mixer and 44 associated Ethereum and USDC addresses under the SDN program. First OFAC designation of open-source smart-contract infrastructure — the watershed event for the mixer-compliance surface in the T7 family | **T7.009** + T7.001 |
| 2023-01 | Bitzlato takedown: U.S. DOJ, French authorities, and Europol coordinated the takedown of Bitzlato, a Hong Kong-registered CEX that processed ~$700M in illicit proceeds including Hydra-market-related flows and ransomware payments. The takedown is the canonical case of the post-Hydra CEX-enforcement architecture that operationalises T7.009 at the off-ramp | **T7.009** + T7.002 |
| 2023-11 | Binance OFAC/FinCEN settlement: Binance agreed to pay $4.3B in penalties and to implement comprehensive KYC/AML reforms after FinCEN, OFAC, and CFTC actions alleging failures to screen against OFAC SDN-listed addresses, including addresses associated with terrorist organisations. The largest compliance-enforcement action in cryptocurrency history — the penalty magnitude reflects the regulatory priority placed on T7.009 screening compliance | **T7.009** |
| 2024-present | Post-Tornado-Cash mixer-substitute evolution: OFAC-designation of Tornado Cash triggered a sustained migration of illicit-purpose flows to non-designated mixer substitutes (privacy-chain routing via Monero, cross-chain bridge layering, DeFi yield-protocol routing as de facto mixers) documented by Chainalysis and TRM Labs. The migration is the structural signal that T7.009 detection must operate at the purpose layer (address labelling) rather than at the method layer (mixer screening), because the method layer adapts faster than the designation layer | **T7.009** + T7.005 |

## Detection architecture

The T7.009 detection stack is a **purpose-layer overlay** on the T7 method-layer detection architecture:

1. **Regulatory designation lists** (OFAC SDN, EU Consolidated, UN) provide the definitive set of sanctioned addresses — screening against these lists is a legal obligation, not just a risk decision.
2. **Blockchain-intelligence labelling feeds** (Chainalysis, TRM Labs, Elliptic) extend detection to addresses not yet on designation lists but linked via cluster analysis to designated entities or illicit-purpose networks.
3. **NGO and law-enforcement coordination** (IWF, ICMEC, INTERPOL) provides the operational referral pathway for CSAM-related and terrorism-financing address labelling.
4. **CEX/VASP compliance screening** (KYT, blockchain-intelligence API integration, SAR filing workflow) is the operational detection-and-reporting layer.

## Public references

- U.S. Treasury OFAC — SDN List cryptocurrency designations, 2018–present
- FATF — Updated Guidance for a Risk-Based Approach to Virtual Assets and VASPs, October 2021
- U.S. DOJ — Bitzlato takedown press release, January 2023
- FinCEN — Binance consent order, November 2023
- Chainalysis — annual illicit-activity reports, 2020–2025
- TRM Labs — illicit-activity categorisation methodology and annual reports
