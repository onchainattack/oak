# OAK-S36 — Karakurt extortion-only kit

**Type:** tool / extortion-only operation tooling
**Aliases:** Karakurt extortion kit; Karakurt Lair (operator leak-site branding); part of the Conti-spinoff cohort tracked by Mandiant and CrowdStrike under the Wizard Spider successor-brand umbrella.
**Active:** yes (continuous May 2021 → present, with periodic operating-tempo dips). Activity tracked through 2024–2025.
**First observed:** 2021-05.
**Used by Groups:** OAK-G18 Karakurt (the operator brand-of-record). Operational continuity to the OAK-S26 Conti operator cohort at the personnel level (Karakurt is documented as Conti's data-extortion-only sub-team that became standalone after the May 2022 Conti dissolution; the earlier May–November 2021 activity overlaps with active Conti operations and predates the brand split).
**Host platforms:** Cross-platform-by-tool-stack — Karakurt does not develop or deploy a custom encryptor and is not, in the strict sense, a "ransomware family." Its operating tooling is a curated configuration of commodity post-exploitation and exfiltration utilities: Cobalt Strike (OAK-S37), Mimikatz, AnyDesk, rclone (the dominant Karakurt-fingerprint exfiltration utility), Filezilla / WinSCP, Mega.io's MEGAsync, and a custom set of automated victim-data-publication scripts running against the Karakurt Lair leak site.
**Observed Techniques:** OAK-T7.001 (mixer-routed-hop laundering of paid extortion proceeds), OAK-T7.002 (CEX deposit-address layering with Russian-speaking-cluster venues including the OAK-G03 Garantex chain inferred-strong by cohort-continuity analysis), OAK-T8.001 (common-funder cluster-reuse linking Karakurt to the broader Conti-cohort wallet substrate), OAK-T8.002 (cross-chain operator continuity from Conti through the post-May-2022 dispersal).

## Description

Karakurt is the data-theft-and-extortion-only operating model that the Wizard Spider / Conti cohort spun out as a standalone brand from approximately May 2021 onward, with full standalone-brand operation cementing after the May 2022 Conti dissolution. The defining characteristic that distinguishes Karakurt from every other entry in OAK's `software/` directory in the ransomware-and-malware class: **Karakurt does not encrypt victim data**. It exfiltrates data, then extorts the victim under threat of public publication on the Karakurt Lair leak site. The operating model is structurally parallel to the Cl0p (OAK-S38, OAK-G14) mid-2023 pivot to data-extortion-only and is one of the earliest large-scale instances of the model on the public record.

The CISA / FBI / Treasury / FinCEN joint advisory `[cisaaa22152a]` of June 2022 (with a March 2023 update) is the canonical attribution and TTP document for Karakurt and for OAK-G18. The advisory is unusual in the OAK citation base in that it explicitly addresses ransom-payment legality and OFAC sanctions-violation exposure for U.S. organisations contemplating payment to Karakurt, reflecting the cohort's documented continuity to OFAC-sanctioned-adjacent Conti-cohort persona inventory.

The kit's dependence on commodity tooling (rather than custom malware development) is itself diagnostically important. Defenders working ransomware-detection programs that rely on hash-based encryptor fingerprints will not see Karakurt as a "ransomware event"; the detection surface is at the data-exfiltration-velocity-and-destination layer (rclone-to-Mega.io is the most distinctive single signal) and at the operator-side communication-channel (the Karakurt Lair leak-site posting cycle). This makes Karakurt a useful framework-level case for the proposition that the encryptor-vs-extortionist distinction is operationally orthogonal to the operator-attribution problem; the same Wizard Spider cohort runs both encryptor-based brands (OAK-S26 Conti, OAK-S27 Black Basta) and the extortion-only Karakurt brand from a single personnel substrate.

## Observed examples

- **CISA AA22-152A campaign cohort (through June 2022).** The advisory documents Karakurt-attributable victim activity across U.S. critical-infrastructure and broader commercial sectors; canonical confirmed-grade aggregate.
- **CISA AA22-152A March 2023 update.** Continued Karakurt activity post-Conti-dissolution; documents the standalone-brand-after-dissolution operating dynamic.
- **OAK on-chain example surface.** No existing OAK `examples/` entry directly covers a Karakurt incident — the OAK-relevant on-chain angle is the laundering tail of paid extortions through the Russian-speaking-cluster substrate (Garantex / OAK-G03) rather than a direct crypto-firm-intrusion event of the OAK-G01 / OAK-G08 type.

## Detection / attribution signals

- **Host-layer pre-extortion tradecraft.** Cobalt Strike post-exploitation (OAK-S37), Mimikatz credential dumping, AnyDesk persistence, and the Karakurt-fingerprint rclone-to-Mega.io exfiltration utility chain. The rclone-to-Mega.io signature is the single highest-confidence Karakurt host-layer detection signal per `[cisaaa22152a]`.
- **Operator communication channels.** Karakurt Lair leak-site posting cycle and the operator's documented preference for Tox messenger over Telegram.
- **Wallet-cluster continuity (the OAK-relevant signal).** OAK-T8.001 cluster-reuse with the broader Wizard-Spider / Conti operator-cohort wallet substrate per Chainalysis and Mandiant tracking; this is the load-bearing on-chain attribution surface.

Note: omit specific file hashes; Karakurt's reliance on commodity tooling means hash-based detection is not the appropriate variable. Behavioural patterns and operator-side communication-channel fingerprints are.

## Citations

- `[cisaaa22152a]` — CISA / FBI / Treasury / FinCEN joint advisory AA22-152A on Karakurt extortion operations (June 2022, with March 2023 update). Canonical confirmed-grade attribution and TTP document.
- `[contileaks2022]` — ContiLeaks corpus; documents the operator-cohort continuity to Conti and the Karakurt-as-Conti-data-extortion-sub-team framing.
- `[mandiantcontileaks2022]` — Mandiant analysis of the ContiLeaks corpus and successor-brand dispersal including Karakurt.
- `[crowdstrikewizardspider2022]` — CrowdStrike Wizard Spider continuity tracking through Karakurt.
- `[chainalysis2022conti]` — Chainalysis Conti-cohort wallet-cluster tracking applicable to Karakurt operator-continuity attribution.

## Discussion

Karakurt's framework-level importance for OAK is the proof-by-existence that the same operator cohort can run encryptor-deployment brands and extortion-only brands in parallel from a shared personnel substrate; the encryptor-vs-extortion distinction is a deployment-time configuration choice, not an operator-identity boundary. This has direct consequences for OAK-T8.001 cluster-reuse-as-detection-surface: defenders tracking only encryptor-event-driven detection will miss the Karakurt operating tempo entirely, while wallet-cluster-and-operator-persona tracking captures both classes in a single attribution view.

The May 2021 → May 2022 overlap window with Conti is doctrinally interesting: Karakurt was operating publicly under its own brand for approximately twelve months while Conti was simultaneously operating publicly under its own brand, with operator continuity at the cohort level the entire time. The brand-multiplexing pattern recurs in the post-Conti dispersal (the operator cohort runs Black Basta, Royal/BlackSuit, Karakurt, and BlackByte simultaneously across 2022–2024), making single-brand-only attribution methodology systematically misleading for this operator class.

The mid-2023 Cl0p (OAK-S38, OAK-G14) pivot to extortion-only is a structural copy of the Karakurt operating model two years later; defenders writing extortion-only-as-a-class detection should treat Karakurt and Cl0p-post-2023 as cohort cases and not as separate phenomena.
