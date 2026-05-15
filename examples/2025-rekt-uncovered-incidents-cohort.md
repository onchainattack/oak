# 2025 Rekt.Uncovered Incidents Cohort — 23 Incidents — Aggregate ~$14.2B (incl. Lubian $14.8B legacy) / ~$297M excl. Lubian

**OAK Techniques observed:** OAK-T9.004, OAK-T9.001, OAK-T9.011, OAK-T11.001, OAK-T15.002, OAK-T5.003, OAK-T5.005, OAK-T16.002, OAK-T12.002

**Attribution:** **unattributed** (aggregate cohort).
**Loss:** Aggregate ~$14.2B across 23 incidents spanning 2025. The Lubian BTC mining-pool disappearance ($14.8B at 2025 valuation, 127,426 BTC event from December 2020) dominates the dollar figure; excluding Lubian, the remaining 22 incidents aggregate ~$297M. Loss range (ex-Lubian): $170K to $27M.

**Key teaching point:** These 23 incidents, sourced from rekt.news but not present in DeFiLlama, fill coverage gaps across CEX security (BigONE $27M supply-chain attack, Woo X $14M), DeFi protocol exploits at mid-range scale (AlexLab II $16.18M, Cork Protocol $12M, Bunni $8.4M rounding bug, Zoth $8.4M admin-key, Ionic Money $6.9M, BetterBank $5M reward-logic flaw, Credix $4.5M Sonic admin-key, ArcadiaFi $3.6M), admin-key and privilege-escalation exploits (GANA Payment $3.1M, GriffinAI $3M, LNDFi $1.18M DPRK), cold-case retroactives (BrincFi $1.1M, Lubian $14.8B), NFT scams (The Idols NFT $324K), and DPRK-linked operations (LNDFi, Moby Trade, Orange Finance). The cohort reinforces the structural pattern: **admin-privilege exploits and private-key compromises remain the dominant attack vectors at all scales, and CEX security incidents are systematically underrepresented in DeFi-focused databases.**

## Summary

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2020-12-20 | Lubian: 127,426 BTC (~$3.5B at time) vanishes from Lubian's BTC mining pool; discovered by Arkham Intelligence in 2025; funds untouched on-chain — $14.8B at 2025 valuation | **T11.005** (operator-side platform fraud — mining-pool operator disappearance), **T5.005** (treasury-management exit) |
| 2025-01-08 | Moby Trade: private key leak on Arbitrum; $1M extracted | **T11.001** (private key compromise) |
| 2025-01-07 | Orange Finance: private key leak; $843K extracted (event dated 2024-01-07 per rekt) | **T11.001** (private key compromise — cold-case surfacing) |
| 2025-01-14 | The Idols NFT: NFT project exploit; $324K extracted | **T12.002** (fake-mint / counterfeit collection) |
| 2025-02-04 | Ionic Money: DeFi exploit on Mode Network; $6.94M extracted | **T9.004** (access-control misconfiguration) |
| 2025-03-21 | Zoth: admin-privilege exploit; $8.4M extracted | **T9.004** (admin-key compromise / privilege escalation) |
| 2025-03-25 | Abracadabra II: MIM stablecoin exploit; $12.9M extracted; audited by Guardian Audits | **T9.004** (access-control misconfiguration), **T9.011** (potential rounding/arithmetic) |
| 2025-05-09 | LNDFi: admin-privilege exploit; $1.18M extracted; DPRK OAK-G01 attributed (event dated 2021-05-09 — cold case surfaced 2025) | **T9.004** (admin-key compromise), **OAK-G01** (DPRK) |
| 2025-05-11 | MobiusDAO: DAO exploit; $2.15M extracted | **T16** (governance attack), **T9.004** (access-control misconfiguration) |
| 2025-05-28 | Cork Protocol: DeFi exploit; $12M extracted | **T9.004** (access-control misconfiguration) |
| 2025-06-06 | AlexLab II: DeFi exploit (second AlexLab incident); $16.18M extracted | **T9.004** (access-control misconfiguration) |
| 2025-06-20 | Hacken: bridge key compromise; $170K extracted | **T11.001** (bridge validator key compromise) |
| 2025-07-15 | ArcadiaFi: DeFi exploit; $3.6M extracted; audited by Pashov Audit Group | **T9.004** (access-control misconfiguration) |
| 2025-07-15 | BigONE: CEX supply-chain attack; $27M extracted | **T11.001** (signing-vendor compromise), **T15.002** (supply-chain vendor-pipeline compromise) |
| 2025-07-28 | Woo X: CEX exploit; $14M extracted | **T11.001** (CEX key compromise) |
| 2025-08-04 | Credix: admin-privilege exploit on Sonic; $4.5M extracted | **T9.004** (admin-key compromise) |
| 2025-08-12 | Odin.Fun: DeFi exploit on ICP (Internet Computer Protocol) / Bitcoin DeFi; $7M extracted | **T9.004** (access-control misconfiguration on non-EVM chain) |
| 2025-08-13 | Drained By Design: Coinbase-linked MEV + ERC-20 approval exploit; $550K extracted | **T9.004** (ERC-20 approval surface), **T5.004** (MEV extraction) |
| 2025-08-26 | BetterBank: reward-logic flaw; $5M extracted; audit classification: "Out of Scope" | **T9.004** (reward-logic access-control gap), **T6.004** (audit-scope exclusion) |
| 2025-09-01 | Bunni: rounding-bug exploit; $8.4M extracted | **T9.011** (precision-loss rounding attack) |
| 2025-09-17 | New Gold Protocol: price-manipulation exploit; $2M extracted | **T9.001** (oracle price manipulation) |
| 2025-09-24 | GriffinAI: admin-privilege exploit; $3M extracted | **T9.004** (admin-key compromise) |
| 2025-10-04 | Abracadabra III: MIM logic bug (third Abracadabra incident); $1.8M extracted | **T9.004** (access-control / logic-bug chain) |
| 2025-11-20 | GANA Payment: admin-privilege exploit; $3.1M extracted | **T9.004** (admin-key compromise) |
| 2025-12-14 | BrincFi: cold-case exploit surfaced (event from 2021-12-14); $1.1M extracted | **T9.004** (access-control misconfiguration — cold-case surfacing) |

## Incident summaries by technique family

### T9.004 — Access-Control Misconfiguration / Admin-Key Compromise (13 incidents, ~$90M aggregate ex-Lubian)

The dominant class among the 2025 uncovered incidents. Admin-key and privilege-escalation exploits span the full range of DeFi protocol types:

**DeFi protocol admin-key / privilege escalation:** Zoth ($8.4M), Cork Protocol ($12M), AlexLab II ($16.18M), ArcadiaFi ($3.6M), Ionic Money ($6.94M), Credix ($4.5M), GANA Payment ($3.1M), GriffinAI ($3M), Odin.Fun ($7M), BetterBank ($5M — reward-logic gap classified as out-of-scope by auditors)

**Stablecoin protocol exploits:** Abracadabra II ($12.9M, audited by Guardian Audits), Abracadabra III ($1.8M — third incident, suggesting systemic security gaps)

**DPRK-linked cold case:** LNDFi ($1.18M, DPRK OAK-G01 attributed) — incident originally from May 2021, surfaced in 2025

**Cold-case retroactive:** BrincFi ($1.1M) — incident from December 2021, surfaced in 2025

### T11.001 / T15.002 — CEX and Infrastructure Compromise (4 incidents, ~$42.8M aggregate)

**BigONE ($27M)** — the largest non-Lubian incident in this cohort. CEX supply-chain attack: the attacker compromised the exchange's signing infrastructure via a third-party vendor pipeline (T15.002). This is the canonical 2025 CEX supply-chain attack case — the exchange itself was not directly compromised; the vendor that supplied software to the exchange was.

**Woo X ($14M)** — CEX key compromise. Second major CEX incident of 2025, reinforcing the pattern that centralised exchange security remains a load-bearing surface independent of DeFi protocol security.

**Moby Trade ($1M)** and **Orange Finance ($843K)** — smaller-scale private-key-leak incidents at the protocol level.

**Hacken ($170K)** — bridge key compromise at a security-auditing firm's own bridge infrastructure — an ironic T11.001 case where the victim was itself a security auditor.

### T9.011 — Precision-Loss / Rounding Attacks (1 incident, $8.4M)

**Bunni ($8.4M)** — rounding-bug exploit on a DeFi protocol. The incident is structurally similar to the Hundred Finance / Sonne Finance T9.011 class: integer-arithmetic rounding direction exploited for extraction.

### T9.001 — Oracle / Price Manipulation (1 incident, $2M)

**New Gold Protocol ($2M)** — price-manipulation exploit, canonical T9.001 at mid-range scale.

### T16 — Governance Attack (1 incident, $2.15M)

**MobiusDAO ($2.15M)** — DAO governance exploit, likely a hostile-vote or proposal-manipulation attack.

### T12.002 / NFT (1 incident, $324K)

**The Idols NFT ($324K)** — NFT project exploit, likely a fake-mint or counterfeit-collection pattern.

### T5.003 / T5.005 — Exit / Mining Pool (1 incident, $14.8B)

**Lubian ($14.8B at 2025 valuation)** — 127,426 BTC (~$3.5B in December 2020) vanished from Lubian's BTC mining pool in one of the largest single-event crypto thefts ever. Arkham Intelligence discovered the funds sitting untouched on-chain in 2025 — the mining pool operator disappeared with the assets, which remain unmoved five years later. This is simultaneously a T11.005 (operator-side platform fraud) and T5.005 (treasury-management exit) case — the mining pool was the platform, and the operator's disappearance constituted the exit.

### Special categories (2 incidents)

**Drained By Design ($550K)** — Coinbase-linked MEV + ERC-20 approval exploit. This case bridges T9.004 (standing-approval surface) and T5.004 (MEV extraction), illustrating how ERC-20 approvals interact with MEV infrastructure to create novel extraction surfaces.

**BetterBank ($5M)** — reward-logic flaw classified as "Out of Scope" by auditors. This is a T6.004 (audit-scope exclusion) case structurally identical to Makina (2026): the attack vector that killed the protocol was explicitly listed as not covered by the audit.

## Discussion

The 2025 uncovered cohort fills a significant gap in the OAK taxonomy's incident coverage. These 23 incidents were present in rekt.news but absent from DeFiLlama, which explains why they were missed in earlier coverage passes. The cohort spans several categories that DeFiLlama systematically underrepresents:

1. **CEX security incidents** (BigONE $27M, Woo X $14M): DeFiLlama focuses on DeFi protocols; CEX hacks are a distinct category tracked more comprehensively by rekt.news. BigONE's supply-chain attack is the canonical 2025 case of T15.002 — the attacker did not compromise BigONE directly but compromised a software vendor whose product BigONE relied on.

2. **Mid-range DeFi exploits ($1M–$16M)**: DeFiLlama's coverage is comprehensive above ~$5M but becomes spottier in the $1M–$5M range. The rekt.news data fills this gap with AlexLab II ($16.18M), Cork Protocol ($12M), Bunni ($8.4M), Zoth ($8.4M), Odin.Fun ($7M), Ionic Money ($6.94M), BetterBank ($5M), Credix ($4.5M), ArcadiaFi ($3.6M), and others.

3. **Cold-case surfacings**: LNDFi (2021 event surfaced 2025), BrincFi (2021 event surfaced 2025), Lubian (2020 event surfaced 2025). These are incidents whose forensic analysis was published years after the event — a pattern that will continue as blockchain analytics tools improve and historical exploits are retroactively attributed.

4. **DPRK-linked operations**: LNDFi ($1.18M, OAK-G01) demonstrates that DPRK threat actors are active at the sub-$2M scale as well as the headline-grabbing $100M+ operations.

5. **NFT-specific exploits**: The Idols NFT ($324K) is one of the few NFT-project-specific exploits in the dataset, reflecting the NFT market's reduced activity in 2025 relative to 2021–2022.

The Abracadabra series (II at $12.9M, III at $1.8M) is the cohort's most striking illustration of **recurring exploitation at the same protocol**: three separate incidents (I in the main DeFiLlama dataset, II and III in this cohort) across 2025, suggesting that post-incident remediation after the first exploit did not close the full exploit surface. The Guardian Audits audit on Abracadabra II did not prevent a third incident — a pattern consistent with the audit-scope-gap and remediation-incompleteness problems observed across the taxonomy.

## Public references

- All incidents sourced from [Rekt.news leaderboard](https://rekt.news/leaderboard/) — 295 articles covering DeFi and CEX exploits through May 2026
- Cross-reference: T9.004 at `techniques/T9.004-access-control-misconfiguration.md`; T9.001 at `techniques/T9.001-oracle-price-manipulation.md`; T9.011 at `techniques/T9.011-precision-loss-rounding-attack.md`; T11.001 at `techniques/T11.001-third-party-signing-vendor-compromise.md`; T15.002 at `techniques/T15.002-supply-chain-vendor-pipeline-compromise.md`; T5.005 at `techniques/T5.005-treasury-management-exit.md`; T16 at `techniques/`; T12.002 at `techniques/T12.002-fake-mint-counterfeit-collection.md`
