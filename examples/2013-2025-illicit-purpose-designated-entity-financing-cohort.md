# Illicit-Purpose and Designated-Entity Financing Cohort — 2013–2025

**OAK Techniques observed:** OAK-T7.009, OAK-T7.001, OAK-T7.002, OAK-T8.001
**Attribution:** **unattributed** (aggregate cohort of enforcement and designation actions by multiple actors).

**Loss:** No aggregate illicit-volume figure is sourced in this file (the earlier "tens of billions" estimate was unsourced). Individual designation actions and enforcement operations are the public-record artefacts; per-incident dollar figures are not systematically published due to the sensitive-law-enforcement-data constraint.

**Corrected 2026-10-11:** Silk Road seizure was ~144,000 BTC (not ~174,000); FATF travel-rule action was June 2019 (not October); SUEX was Czech-registered and Russia-linked; Tornado Cash address count and its March 2025 delisting noted; Binance penalties broken out.
**Key teaching point:** Illicit-purpose and designated-entity financing is the **purpose-based detection layer** of the OAK-T7 family: the laundering methods used (mixers, CEX layering, cross-chain bridges, privacy chains) are indistinguishable from other T7 Techniques, and the detection signal is entirely in the **destination-address labelling** maintained by blockchain-intelligence providers (Chainalysis, TRM Labs, Elliptic) and regulatory designation lists (OFAC SDN, EU, UN). T7.009 is therefore the technique that most cleanly illustrates the **method-vs-purpose distinction** in cryptocurrency compliance: a CEX screening a deposit from a mixer against its OFAC SDN and Chainalysis illicit-activity labelling feed is performing T7.009 detection at the purpose layer, even though the laundering method (mixer → CEX) is T7.001/T7.002 at the method layer. The compliance stack must operate at both layers simultaneously.

## Summary

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2013-10 | Silk Road Bitcoin seizure: the FBI reported seizing about 144,000 BTC in connection with the Silk Road takedown (`[wikisilkroadcohort]`); the claim that this anchored the later OFAC address framework is OAK interpretation, not sourced | **T7.009** (designated-entity asset seizure precedent) |
| 2018-11 | OFAC SDN cryptocurrency designations begin: U.S. Treasury OFAC designated two Iran-based men, Ali Khorashadizadeh and Mohammad Ghorbaniyan, who converted SamSam ransom bitcoin into rials, and published two bitcoin addresses tied to them (2018-11-28). Commentators describe it as the first time OFAC included digital currency addresses in SDN listings (`[wilmer2018]`) — the regulatory framework that makes T7.009 screening enforceable at the CEX/VASP compliance layer | **T7.009** |
| 2019-06 | FATF adopts an interpretive note to Recommendation 15 requiring originating VASPs to obtain, hold and send originator and beneficiary information to beneficiary VASPs (the virtual-asset travel rule) (`[fatfcc2019]`, `[fatfdp2019]`) | **T7.009** |
| 2021-09 | OFAC sanctions Suex OTC: U.S. Treasury OFAC designated SUEX OTC (2021-09-21), a Czech-registered, Russia-linked virtual currency exchange, under E.O. 13694 for facilitating transactions for ransomware actors; legal analyses call it the first designation of a virtual currency exchange (`[mofosuex]`, `[clearysuex]`) | **T7.009** |
| 2022-04 | OFAC sanctions Hydra market and Garantex: U.S. Treasury OFAC simultaneously designated the Hydra darknet market and the Garantex cryptocurrency exchange on 2022-04-05; Hydra under E.O. 13694 and Garantex under E.O. 14024. Reporting differs on whether the 100+ associated addresses were published that day or still being identified (`[nextgovhydra]`, `[merklehydra]`). The "two-tier architecture" framing is OAK interpretation | **T7.009** + T7.001 + T7.002 |
| 2022-08 | OFAC sanctions Tornado Cash: U.S. Treasury OFAC designated Tornado Cash on 2022-08-08 with associated Ethereum addresses (sources give 40+ and 44) (`[orricktornado]`). OFAC lifted the sanctions on 2025-03-21 (`[venabletornado]`) | **T7.009** + T7.001 |
| 2023-01 | Bitzlato takedown: U.S. DOJ, French authorities, and Europol took action against Bitzlato; its founder Anatoly Legkodymov was arrested in Miami on 2023-01-17, and prosecutors said it processed about \$700M in illicit funds including Hydra-related proceeds; sources differ on whether it was registered in Hong Kong or run from Shenzhen (`[kitcobitzlato]`, `[bnnbitzlato]`) | **T7.009** + T7.002 |
| 2023-11 | Binance OFAC/FinCEN settlement: Binance and founder Changpeng Zhao pleaded guilty and Binance agreed to pay about \$4.3B across agencies, including a \$3.4B FinCEN penalty and a \$968M OFAC penalty, over BSA and sanctions violations that Treasury tied to terrorist groups (`[reedbinance]`) | **T7.009** |
| 2024-present | Unverified: this row's claim of a sustained migration of illicit flows to mixer substitutes after the Tornado Cash designation is not backed by a source cited here. The migration is the structural signal that T7.009 detection must operate at the purpose layer (address labelling) rather than at the method layer (mixer screening), because the method layer adapts faster than the designation layer | **T7.009** + T7.005 |

## Detection architecture

The T7.009 detection stack is a **purpose-layer overlay** on the T7 method-layer detection architecture:

1. **Regulatory designation lists** (OFAC SDN, EU Consolidated, UN) provide the definitive set of sanctioned addresses — screening against these lists is a legal obligation, not just a risk decision.
2. **Blockchain-intelligence labelling feeds** (Chainalysis, TRM Labs, Elliptic) extend detection to addresses not yet on designation lists but linked via cluster analysis to designated entities or illicit-purpose networks.
3. **NGO and law-enforcement coordination** (IWF, ICMEC, INTERPOL) provides the operational referral pathway for CSAM-related and terrorism-financing address labelling.
4. **CEX/VASP compliance screening** (KYT, blockchain-intelligence API integration, SAR filing workflow) is the operational detection-and-reporting layer.

## Public references

- U.S. Treasury OFAC — SDN List cryptocurrency designations, 2018–present
- FATF — Updated Guidance for a Risk-Based Approach to Virtual Assets and VASPs, October 2021
- Chainalysis — annual illicit-activity reports, 2020–2025
- TRM Labs — illicit-activity categorisation methodology and annual reports
- `[wikisilkroadcohort]` — Wikipedia, "Silk Road (marketplace)": <https://en.wikipedia.org/wiki/Silk_Road_(marketplace)>
- `[fatfcc2019]` — Clifford Chance, "Crypto exchanges have 12 months to implement FATF anti-money laundering" (2019-07): <https://www.cliffordchance.com/insights/resources/blogs/regulatory-investigations-financial-crime-insights/2019/07/crypto-exchanges-have-12-months-to-implement-fatf-anti-money-laundering.html>
- `[fatfdp2019]` — Davis Polk via CLS Blue Sky Blog, "Financial Action Task Force's Virtual-Asset Guidance" (2019-07-30): <https://clsbluesky.law.columbia.edu/2019/07/30/davis-polk-discusses-financial-action-task-forces-virtual-asset-guidance>
- `[wilmer2018]` — WilmerHale, "OFAC identifies digital currency addresses in sanctions designations and provides FAQs on digital currency compliance" (2018-11-30): <https://wilmerhale.com/insights/client-alerts/20181130-ofac-identifies-digital-currency-addresses-in-sanctions-designations-and-provides-faqs-on-digital-currency-compliance>
- `[mofosuex]` — Morrison Foerster, "OFAC Issues New Ransomware Guidance and First Sanctions Designation Against Virtual Currency Exchange" (2021-09-22): <https://mofo.com/resources/insights/210922-ofac-ransomware-guidance-sanctions-virtual-currency>
- `[clearysuex]` — Cleary Gottlieb, "OFAC updates ransomware advisory and sanctions virtual currency exchange" (2021-09): <https://www.clearytradewatch.com/2021/09/ofac-updates-ransomware-advisory-and-sanctions-virtual-currency-exchange/>
- `[nextgovhydra]` — Nextgov, "Treasury Sanctions Russian 'Hydra' Dark Net, Major Crypto Trading Platform" (2022-04): <https://nextgov.com/policy/2022/04/treasury-sanctions-russian-hydra-dark-net-major-crypto-trading-platform/364075>
- `[merklehydra]` — Merkle Science, "The U.S. Department of Treasury Imposes Sanctions on Russian Darknet Market Hydra and Crypto Exchange Garantex": <https://www.merklescience.com/blog/the-u-s-department-of-treasury-imposes-sanctions-on-russian-darknet-market-hydra-and-crypto-exchange-garantex>
- `[orricktornado]` — Orrick, "5 Things to Know About OFAC Sanctioning Crypto Mixer Tornado Cash" (2022-08): <https://orrick.com/Insights/2022/08/5-Things-to-Know-About-OFAC-Sanctioning-Crypto-Mixer-Tornado-Cash>
- `[venabletornado]` — Venable, "A Legal Whirlwind Settles: Treasury Lifts Sanctions on Tornado Cash" (2025-04): <https://www.venable.com/insights/publications/2025/04/a-legal-whirlwind-settles-treasury-lifts-sanctions>
- `[kitcobitzlato]` — Kitco, "DoJ moves against the criminal exchange Bitzlato, arrests its founder Anatoly Legkodymov" (2023-01-18): <https://www.kitco.com/news/article/2023-01-18/doj-moves-against-criminal-exchange-bitzlato-arrests-its-founder-anatoly>
- `[bnnbitzlato]` — BNN Bloomberg, "Crypto exchange head gets no more jail in \$700 million scam" (2024-07-18): <https://bnnbloomberg.ca/business/international/2024/07/18/crypto-exchange-head-gets-no-more-jail-in-700-million-scam>
- `[reedbinance]` — Reed Smith, "Binance and founder Changpeng Zhao plead guilty and pay more than \$4 billion in penalties": <https://www.reedsmith.com/our-insights/blogs/viewpoints/102ita1/binance-and-founder-changpeng-zhao-plead-guilty-and-pay-more-than-4-billion-in-p/>
