# DOJ/SEC Pig-Butchering Platform Enforcement Cohort — 2024–2025

**Loss:** FBI IC3 reported ~$5.8B in pig-butchering-class losses in the U.S. alone in 2024; global estimates exceed $10B+. Individual enforcement actions span tens of millions to hundreds of millions in victim losses per platform.
**OAK Techniques observed:** **OAK-T11.005.001** (Fake-CEX / Pig-Butchering Platform — primary; the fraud vehicle is a fake exchange/trading platform UI with no real backend, balance display entirely operator-controlled fiction). **OAK-T8.001** (Common-Funder Cluster Reuse — the on-chain deposit-destination cluster attribution that links multiple fake-platform domains to a single operator infrastructure). **OAK-T8.005** (Operational-Security Procedural Failure — the operator-side registration, hosting, and payment-rail infrastructure that enables cross-platform attribution).
**Attribution:** **pseudonymous** at the operator level across multiple jurisdictions (DOJ, SEC, FBI); Southeast Asian scam-compound infrastructure (Myanmar, Cambodia, Laos, Philippines) as the primary operator geography; Huione Group as the dominant financial-infrastructure provider.
**Key teaching point:** **The 2024–2025 enforcement wave documents pig-butchering at industrial scale — a vertically-integrated operation spanning fake-platform UI, romance-scam feeder narratives, and compound-based forced-labour staffing — and demonstrates that the T11.005.001 surface is the largest retail-aggregate-loss class in crypto by victim count, larger than all bridge exploits, lending-protocol hacks, and custody-exchange hacks combined in retail-victim-count terms. The FBI's "Operation Level Up" model (5,831+ victims notified, $359M+ saved by April 2025) is the canonical defender-side coordination primitive at the retail-bank layer.**

## Summary

The 2024–2025 period saw an unprecedented wave of U.S. federal enforcement actions against pig-butchering (Sha Zhu Pan) fake-investment-platform operations. Unlike the JPEX Hong Kong enforcement action (2023, ~$200M, ~2,600+ victims) which targeted a single platform operator, the 2024–2025 enforcement wave targeted the infrastructure layer: the scam compounds in Southeast Asia that house forced-labour victims coerced into operating romance-scam feeder narratives, the financial rails (Huione Group and affiliated payment infrastructure) that process victim deposits, and the domain-registration / hosting infrastructure that enables rapid platform rotation.

Key enforcement actions in the cohort:

- **DOJ Operation "Token Mirrors" (November 2024).** The DOJ unsealed indictments charging multiple defendants with operating pig-butchering platforms that defrauded U.S. victims of over $250M. The operation targeted the platform-creation infrastructure — domain registrars, hosting providers, and template-based fake-exchange UI kits — rather than individual scam operators.
- **SEC v. NanoBit (October 2024).** The SEC filed charges against NanoBit Limited, a fake trading platform that solicited investments through WhatsApp and Telegram romance-scam feeder narratives, falsely claiming SEC registration.
- **FBI Operation "Level Up" (ongoing, 2024–2025).** The FBI's proactive victim-notification program identified 5,831+ victims of pig-butchering schemes and notified them before they made additional deposits, saving an estimated $359M+ in prevented losses by April 2025. The program uses retail-bank-side debit-card transaction monitoring to identify deposits to known scam-platform destinations.
- **Treasury / OFAC actions (2024–2025).** OFAC designated multiple entities and individuals linked to Southeast Asian scam compounds, including Huione Group-affiliated payment infrastructure, under transnational organised crime sanctions authorities.

The enforcement wave established that pig-butchering operations are not atomised individual scammers but vertically-integrated industrial operations: a single compound may operate dozens of fake-platform domains simultaneously, each with a distinct brand identity but sharing common deposit-destination wallets, feeder-narrative templates, and payment-rail infrastructure. The on-chain deposit-cluster attribution (T8.001) that links these domains to a single operator infrastructure is the canonical forensic surface.

The FBI IC3 2024 report documented $5.8B in reported pig-butchering-class losses in the U.S. alone — making T11.005.001 the largest retail-aggregate-loss class in the OAK taxonomy by a wide margin.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2018–2020 | Pig-butchering (Sha Zhu Pan) model emerges in Southeast Asian scam compounds; fake-investment-platform UI kits commoditised | **T11.005.001 platform template emergence** |
| 2021–2023 | Pig-butchering scales to industrial operation; scam compounds in Myanmar, Cambodia, Laos, Philippines as primary operator geography; Huione Group emerges as dominant financial-infrastructure provider | **T11.005.001 at scale** |
| 2023-09 | JPEX Hong Kong enforcement action (~$200M, ~2,600+ victims) — the first major public enforcement action establishing the fake-CEX model in public record | T11.005.001 first major enforcement |
| 2024-10 | SEC v. NanoBit charges filed — fake trading platform, WhatsApp/Telegram feeder narratives, false SEC registration claim | **T11.005.001 SEC enforcement** |
| 2024-11 | DOJ Operation "Token Mirrors" — indictments for $250M+ pig-butchering platform operation targeting platform-creation infrastructure | **T11.005.001 DOJ enforcement** |
| 2024–2025 | FBI Operation "Level Up" — 5,831+ victims notified, $359M+ saved through retail-bank-side debit-card monitoring | (defender coordination) |
| 2024–2025 | OFAC designations of Southeast Asian scam-compound entities and Huione Group-affiliated payment infrastructure | **T11.005.001 + T8.001** |
| 2025-04 | FBI reports $359M+ saved via Operation Level Up proactive victim notification | (defender milestone) |

## Realised extraction

$5.8B in reported U.S. losses in 2024 alone (FBI IC3); individual platform operations in the tens to hundreds of millions. Near-zero on-chain recovery rate; law-enforcement seizure is the primary recovery path and remains limited relative to aggregate loss.

## Public references

- FBI IC3 2024 Internet Crime Report — $5.8B pig-butchering-class losses (U.S. only).
- DOJ Operation "Token Mirrors" indictments (November 2024) — $250M+ victim losses, platform-infrastructure targeting.
- SEC v. NanoBit Limited (October 2024) — fake-trading-platform charges with WhatsApp/Telegram feeder narratives.
- FBI Operation "Level Up" — proactive victim-notification program; 5,831+ victims notified, $359M+ saved.
- OFAC transnational organised crime designations (2024–2025) — Southeast Asian scam-compound entities.
- FinCEN 2023 pig-butchering alert — precursor regulatory guidance.
- Chainalysis 2025 Crypto Crime Report — pig-butchering revenue +40% YoY 2024.
- Cross-reference: T11.005.001 (Fake-CEX / Pig-Butchering Platform) at `techniques/T11.005.001-fake-cex-pig-butchering-platform.md`.
- [`examples/2023-09-jpex-hong-kong.md`](../examples/2023-09-jpex-hong-kong.md) — JPEX Hong Kong (canonical T11.005.001 anchor enforcement action).
