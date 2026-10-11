# DOJ/SEC Pig-Butchering Platform Enforcement Cohort — 2024–2025

**Loss:** FBI IC3 reported more than \$5.8B in cryptocurrency investment-fraud losses (the category that contains pig-butchering) in the U.S. in 2024, within \$9.3B of total crypto-related fraud losses. The SEC's NanoBit/CoinW6 action involved roughly \$3.2M. No global or per-platform aggregate is sourced here.
**OAK Techniques observed:** **OAK-T11.005.001** (Fake-CEX / Pig-Butchering Platform — primary; the fraud vehicle is a fake exchange/trading platform UI with no real backend, balance display entirely operator-controlled fiction). **OAK-T8.001** (Common-Funder Cluster Reuse — the on-chain deposit-destination cluster attribution that links multiple fake-platform domains to a single operator infrastructure). **OAK-T8.005** (Operational-Security Procedural Failure — the operator-side registration, hosting, and payment-rail infrastructure that enables cross-platform attribution).
**Attribution:** **pseudonymous** at the operator level across multiple jurisdictions (DOJ, SEC, FBI); Southeast Asian scam-compound infrastructure (Myanmar, Cambodia, Laos, Philippines) as the primary operator geography; Huione Group as a major financial-infrastructure provider (FinCEN named it a primary money laundering concern).

**Corrected 2026-10-11:** SEC NanoBit/CoinW6 dated 2024-09-17 (~\$3.2M); "Operation Token Mirrors" re-described as an Oct 2024 FBI market-manipulation sting (NexFundAI), not a Nov 2024 \$250M pig-butchering indictment; Huione action corrected to FinCEN §311 (proposed May 2025, final Oct 2025), not OFAC; Operation Level Up figures replaced with the sourced 4,300+ victims / ~\$285M (early 2025); IC3 \$5.8B relabelled as crypto investment fraud.
**Key teaching point:** **The 2024–2025 enforcement wave documents pig-butchering at industrial scale — a vertically-integrated operation spanning fake-platform UI, romance-scam feeder narratives, and compound-based forced-labour staffing — and shows that the fake-platform surface is a very large retail-loss class (IC3 reports \$5.8B+ in crypto investment fraud in 2024). The FBI's "Operation Level Up" model (4,300+ victims notified, an estimated \$285M saved by early 2025) is a defender-side coordination primitive: contacting victims before further deposits.**

## Summary

The 2024–2025 period saw an unprecedented wave of U.S. federal enforcement actions against pig-butchering (Sha Zhu Pan) fake-investment-platform operations. Unlike the JPEX Hong Kong enforcement action (2023, ~$200M, ~2,600+ victims; figures as previously filed, not re-verified here) which targeted a single platform operator, the 2024–2025 enforcement wave targeted the infrastructure layer: the scam compounds in Southeast Asia that house forced-labour victims coerced into operating romance-scam feeder narratives, the financial rails (Huione Group and affiliated payment infrastructure) that process victim deposits, and the domain-registration / hosting infrastructure that enables rapid platform rotation.

Key enforcement actions in the cohort:

- **FBI Operation "Token Mirrors" (announced October 2024).** The FBI created a token and company called NexFundAI as a sting; the DOJ charged 18 individuals and entities in a crypto market-manipulation (wash-trading) case involving market makers such as Gotbit, ZM Quant, CLS Global and MyTrade, and seized over \$25M in digital assets. This is a market-manipulation action, not a pig-butchering indictment; it is retained only as context for the enforcement wave.
- **SEC v. NanoBit and CoinW6 (filed 2024-09-17).** The SEC's first pig-butchering-related action charged NanoBit and CoinW6 over fake trading platforms that solicited investors through romance-style feeder narratives; roughly \$3.2M was involved.
- **FBI Operation "Level Up" (2024–2025).** The FBI's proactive victim-notification program had notified over 4,300 victims by early 2025 (about 76% unaware they were being scammed) and estimated more than \$285M saved (Nextgov). Later, less authoritative figures are higher.
- **FinCEN action on Huione Group (2025).** FinCEN proposed a section 311 special measure against Huione Group as a foreign financial institution of primary money laundering concern in May 2025 and finalised it in October 2025.

The enforcement wave established that pig-butchering operations are not atomised individual scammers but vertically-integrated industrial operations: a single compound may operate dozens of fake-platform domains simultaneously, each with a distinct brand identity but sharing common deposit-destination wallets, feeder-narrative templates, and payment-rail infrastructure. The on-chain deposit-cluster attribution (T8.001) that links these domains to a single operator infrastructure is the canonical forensic surface.

The FBI IC3 2024 report documented more than \$5.8B in crypto investment-fraud losses in the U.S.; pig-butchering is the main driver of that category, though IC3 does not break it out here.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2018–2020 | Pig-butchering (Sha Zhu Pan) model emerges in Southeast Asian scam compounds; fake-investment-platform UI kits commoditised | **T11.005.001 platform template emergence** |
| 2021–2023 | Pig-butchering scales to industrial operation; scam compounds in Myanmar, Cambodia, Laos, Philippines as primary operator geography; Huione Group emerges as dominant financial-infrastructure provider | **T11.005.001 at scale** |
| 2023-09 | JPEX Hong Kong enforcement action (~$200M, ~2,600+ victims) — the first major public enforcement action establishing the fake-CEX model in public record | T11.005.001 first major enforcement |
| 2024-09-17 | SEC v. NanoBit and CoinW6 filed (~$3.2M) | **T11.005.001 SEC enforcement** |
| 2024-10 | FBI Operation Token Mirrors (NexFundAI) market-manipulation charges (context) | (adjacent enforcement) |
| 2025-02 | FBI reports 4,300+ victims notified and ~$285M saved via Operation Level Up | (defender milestone) |
| 2025-05 | FinCEN proposes section 311 measure against Huione Group; finalised 2025-10-16 | **T11.005.001 + T8.001** |

## Realised extraction

More than \$5.8B in reported U.S. crypto investment-fraud losses in 2024 (FBI IC3). Near-zero on-chain recovery rate; law-enforcement seizure is the primary recovery path and remains limited relative to aggregate loss.

## Public references

- `[trmnanobit2024]` — TRM Labs, "SEC Files Charges Against NanoBit and CoinW6 in First Pig Butchering Related Action" (2024-09-17): <https://www.trmlabs.com/resources/blog/sec-files-charges-against-nanobit-and-coinw6-in-first-pig-butchering-related-action> (NanoBit)
- `[fincenhuione2025]` — Federal Register / FinCEN, "Imposition of Special Measure Regarding Huione Group as a Foreign Financial Institution of Primary Money Laundering Concern" (2025-10-16): <https://www.federalregister.gov/documents/2025/10/16/2025-19571/imposition-of-special-measure-regarding-huione-group-as-a-foreign-financial-institution-of-primary> (Huione)
- `[theblockic3_2025]` — The Block, "FBI says Americans over 60 lost nearly \$3 billion to crypto scams in 2024" (2025-04): <https://www.theblock.co/post/351746/fbi-says-americans-over-60-lost-nearly-3-billion-to-crypto-scams-in-2024> (IC3 2024 report)
- `[nextgovlevelup2025]` — Nextgov, "FBI notified over 4,300 victims of 'pig butchering' crypto scams in past year" (2025-02): <https://www.nextgov.com/cybersecurity/2025/02/fbi-notified-over-4300-victims-pig-butchering-crypto-scams-past-year/402988>
- `[cointelegraphnexfundai2024]` — Cointelegraph, "What is NexFundAI, the FBI's crypto trap?": <https://cointelegraph.com/explained/nexfundai-the-fbis-trap-token-explained>
- `[kitcotokenmirrors2024]` — Kitco, "Crypto fraud exposed: FBI, DOJ and SEC charge 18 in market manipulation" (2024-10-10): <https://www.kitco.com/news/article/2024-10-10/crypto-fraud-exposed-fbi-doj-and-sec-charge-18-market-manipulation>
- `[yahooic32024]` — Yahoo News, "FBI Says Americans Lost $9.3B to Crypto Scams in 2024": <https://www.yahoo.com/news/fbi-says-americans-lost-9-121501978.html> (IC3 2024: $9.3B crypto-related, $5.8B+ investment fraud)
- Cross-reference: T11.005.001 (Fake-CEX / Pig-Butchering Platform) at `techniques/T11.005.001-fake-cex-pig-butchering-platform.md`.
- [`examples/2023-09-jpex-hong-kong.md`](../examples/2023-09-jpex-hong-kong.md) — JPEX Hong Kong (canonical T11.005.001 anchor enforcement action).
