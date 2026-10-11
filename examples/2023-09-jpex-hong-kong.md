# JPEX Hong Kong unlicensed-exchange fraud — Hong Kong — 2023-09-13 onward

**Loss:** about HK\$1.3 billion across 2,086 alleged victims as of 2023-09-21 `[hkfpjpex]` `[fintechhkjpex]`; reported as potentially Hong Kong's largest financial fraud case `[hkfpjpex]`. Figures kept growing after that date and later totals are not sourced in this file.

**Corrected 2026-10-11:** loss restated to the sourced HK\$1.3B / 2,086 victims (21 Sept 2023) instead of ~\$200M / HK\$1.6B / 2,600+; arrests stated as 11 by 2023-09-20 instead of 70+ (later total unsourced here); the Seychelles incorporation, the HK\$100M+ asset freeze, the 999 USDT withdrawal-fee escalation, and the SFC joint task-force claims are removed as unverified; the SFC had warned about JPEX earlier (inquiries from March 2022, alert list in July 2022), so 2023-09-13 was a public statement, not the first listing.

**OAK Techniques observed:** **OAK-T11.005.001** (Fake-CEX / Pig-Butchering Platform — primary; JPEX promoted itself as licensed, but the SFC said it had not applied for a licence and had no wish to `[hkfpjpex]`). **OAK-T11.005** (Operator-side Fake-Platform Fraud — parent class). **OAK-T11** (Custody and Signing Infrastructure — the victim deposit surface; users deposited crypto believing they were trading on a licensed exchange; the SFC said many could not withdraw or found balances "reduced and altered" `[hkfpjpex]`). **OAK-T15** (Off-chain Entry-Vector / Pre-Positioning — secondary; the SFC said JPEX used influencer (KOL) and OTC-store promotion to look licensed `[hkfpjpex]`; the MTR advertising and media-sponsorship claims in earlier drafts are unverified).

**Attribution:** **pseudonymous** (no operator-level attribution is established in the cited sources). Police arrested 11 people by 2023-09-20, including social-media influencers Joseph Lam and Chan Yee `[hkfpjpex]`; the SFC said JPEX partnered with key opinion leaders and OTC crypto stores to promote itself as licensed `[hkfpjpex]`. The primary operator cohort is not named in the cited sources.

**Key teaching point:** **An unlicensed exchange whose regulatory-registry check fails, and whose users cannot withdraw is a fake-exchange fraud until proven otherwise.** The JPEX case demonstrates the full lifecycle of a fake-CEX laundering surface: influencer-promoted brand building → deposits → withdrawal failures → regulator warning and website blocking.

## Summary

JPEX was a crypto exchange platform marketed to Hong Kong retail investors. The SFC said JPEX, registered in 2019, partnered with key opinion leaders and OTC crypto stores to promote itself as licensed, had not applied for a licence, and used "suspicious" promotion methods through influencers; some products advertised an annual percentage yield above 20 per cent `[hkfpjpex]`.

The SFC began inquiring into JPEX in March 2022, placed it on its investor alert list in July 2022, issued warnings at least nine times, and made a public statement on 2023-09-13 `[fintechhkjpex]`. On 2023-09-15 JPEX asked the SFC for guidance and the SFC referred the matter to police `[fintechhkjpex]`. On 2023-09-19 the SFC said many investors could not withdraw virtual assets or found their balances reduced and altered `[hkfpjpex]`. Police arrested six people on 2023-09-18 and three more on 2023-09-20, bringing the total to 11, including influencers Joseph Lam and Chan Yee, and searched OTC stores `[hkfpjpex]`. Telecom operators blocked JPEX's website and app at the SFC's request (JPEX said so on 2023-09-20) `[fintechhkjpex]`. By 2023-09-21 there were 2,086 alleged victims and about HK\$1.3 billion in losses `[hkfpjpex]`.

JPEX said it was "impacted by an event involving SFC" and that its attempts to seek guidance were dismissed `[hkfpjpex]`. Fintech News Hong Kong reports JPEX reportedly applied for deregistration with Australian regulator ASIC, stating no operations and no liabilities `[fintechhkjpex]`.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2022-03 | SFC begins inquiring into JPEX `[fintechhkjpex]` | (regulator awareness) |
| 2022-07 | JPEX placed on SFC investor alert list `[fintechhkjpex]` | (regulator warning) |
| 2023-09-13 | SFC public statement on JPEX `[fintechhkjpex]` | (regulator warning) |
| 2023-09-15 | JPEX asks SFC for guidance; SFC refers matter to police `[fintechhkjpex]` | (enforcement referral) |
| 2023-09-18 | Police arrest six people and search influencers' offices and OTC stores `[hkfpjpex]` | (enforcement response) |
| 2023-09-20 | Three more arrests (11 total); JPEX says telecoms blocked its app and website `[hkfpjpex]` `[fintechhkjpex]` | (enforcement response) |
| 2023-09-21 | 2,086 alleged victims, about HK\$1.3B losses `[hkfpjpex]` | (victim-cohort growth) |

## What defenders observed

- **Licensing-registry cross-reference is the highest-leverage pre-deposit check.** JPEX claimed to hold licences it had never applied for. Cross-referencing the SFC's published registers against the platform's licensing claims would have surfaced the discrepancy; the SFC had warned about JPEX repeatedly `[fintechhkjpex]`.
- **Withdrawal failure is the defining T11.005.001 signal at the victim-facing layer.** The SFC reported many investors could not withdraw `[hkfpjpex]`. The small-test-withdrawal-before-deposit invariant would have detected the surface at the pre-deposit stage.
- **Celebrity/KOL endorsement does not substitute for licensing-registry verification.** The JPEX case is the canonical T15 (pre-positioning) adjacency for T11.005.001: the off-chain brand-building surface (KOL and OTC-store promotion) was the load-bearing acquisition channel that produced victim trust. Defenders should treat celebrity/KOL endorsement as a T11.005.001 risk factor, not a legitimacy signal.
- **Regulator response.** The SFC warnings, police arrests and telecom blocking are documented in the cited sources; the earlier claim of a joint SFC–HKPF task force and 2024–2025 licensing hardening is unverified and removed.

## What this example tells contributors writing future Technique pages

- **T11.005.001 is the primary classification.** JPEX is the largest public-record T11.005.001 fake-CEX anchor at v0.1 — a platform promoted as licensed that the SFC said had not applied for a licence. The victim-deposit surface (T11) is the custody-side classification; the off-chain brand-building surface (T15) is the pre-positioning adjacency.
- **The JPEX case anchors the regulatory-response dimension for T11.005.001** (SFC warnings, HKPF arrests, telecom blocking). Future contributors should map the regulator-response dimension as a first-class observable in T11.005.001 worked examples.
- **The celebrity/KOL-as-acquisition-channel surface is structurally important for T11.005 coverage.** The JPEX acquisition model (KOL and OTC-store promotion) is structurally distinct from the romance-scam feeder narrative of the pig-butchering model and from the cold-call boiler-room model of earlier fake-exchange frauds. The sub-pattern deserves its own framing in a future v0.x update of T11.005.

## Public references

- `[hkfpjpex]` — Hong Kong Free Press, "Victims of JPEX crypto fraud rise to over 2,000, 3 more arrests as Hong Kong telecom firms block website" (2023-09-21): <https://hongkongfp.com/2023/09/21/victims-of-jpex-crypto-fraud-rise-to-over-2000-3-more-arrests-as-hong-kong-telecom-firms-block-website/>
- `[fintechhkjpex]` — Fintech News Hong Kong, "JPEX's ongoing saga: deregistration, telecom blocks and regulatory disputes" (2023-09-21): <https://fintechnews.hk/23395/blockchain/jpexs-ongoing-saga-deregistration-telecom-blocks-and-regulatory-disputes/>
- `[theblockjpex]` — The Block, "Hong Kong police receive 1,600 complaints involving \$152 million in alleged JPEX fraud": <https://www.theblock.co/post/251689/hong-kong-police-receive-1600-complaints-involving-152-million-in-alleged-jpex-fraud>
- Cross-reference: T11.005.001 (Fake-CEX / Pig-Butchering Platform) at `techniques/T11.005.001-fake-cex-pig-butchering-platform.md`.
- Cross-reference: T11.005 (Operator-side Fake-Platform Fraud) at `techniques/T11.005-operator-side-fake-platform-fraud.md`.
