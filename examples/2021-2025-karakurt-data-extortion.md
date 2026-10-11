# Karakurt encryption-free data-theft extortion operation — 2021–2025

**Corrected 2026-10-11:** Replaced the unsourced multi-vendor attribution list (Mandiant, Microsoft, CrowdStrike, SentinelOne, Recorded Future) with the sources actually found (CISA, Arctic Wolf/Chainalysis research, DOJ case coverage); initial-access description corrected to CISA's list; the Cl0p "prototype" and Conti-dissolution-survival claims are marked unverified.

**Loss:** **Aggregate extortion-payment volume not publicly quantified at cluster level at v0.1.** CISA reports demands from \$25,000 to \$13,000,000 in Bitcoin `[cisakarakurt]`; one victim paid more than \$1.3M and another \$250,000 `[bleepkarakurt]`. Karakurt (OAK-G18) is a Conti-side-channel data-extortion-only operation — the cluster steals data from victim organisations and threatens public disclosure, but does not deploy a ransomware encryptor. Karakurt used no encryption `[cisakarakurt]`; the claim that it was the "prototype" for the model OAK-G14 Cl0p later adopted at scale is OAK-internal framing and not established by the sources found. The cluster has been active since mid-2021 `[bleepkarakurt]` and was reported in April 2022 by Arctic Wolf (with Tetra Defense, Chainalysis and Northwave) to be a data-extortion arm of Conti `[arcticwolfkarakurt]`. Whether it survived the Conti wind-down as a standalone brand is unverified here: CISA notes the Karakurt leak-site domain and IP went offline in spring 2022 `[cisakarakurt]`.
**OAK Techniques observed:** **OAK-T5.008** (Ransomware Extortion Payment) — cryptocurrency-denominated extortion payments under threat of data disclosure. Karakurt demonstrates the "encryption-free" sub-pattern of T5.008: the extortion lever is exclusively the threatened disclosure of stolen data, not the denial-of-access-to-encrypted-data that characterises traditional ransomware. **OAK-T15.001** (Social Engineering of Operator Personnel) — as classified in OAK; CISA lists initial access mainly via purchased stolen credentials, access brokers, unpatched VPN/firewall appliances, Log4Shell and some phishing `[cisakarakurt]`, so this mapping is only partial. **OAK-T8.001** (Cluster Reuse / Operator Fingerprinting) — Karakurt's Conti-side-channel lineage and encryption-free TTP fingerprint distinguish it from encryptor-deploying Conti-successor brands.
**OAK-Gnn:** [OAK-G18 Karakurt](../actors/OAK-G18-karakurt.md).
**Attribution:** **confirmed** at the cluster-and-tooling level — CISA advisory AA22-152A `[cisakarakurt]`, Arctic Wolf research with Chainalysis `[arcticwolfkarakurt]`, and the US prosecution of alleged Karakurt negotiator Deniss Zolotarjovs (arrested in Georgia in December 2023; charged with money laundering, wire fraud and extortion) `[bleepkarakurt]`. The Conti link is **inferred-strong**: Arctic Wolf reported a Conti-left Cobalt Strike backdoor used in a Karakurt intrusion and shared wallets between Conti and Karakurt payment addresses `[arcticwolfkarakurt]`. The earlier statement that no one had been DOJ-indicted is superseded by the Zolotarjovs charges.

**Key teaching point:** Karakurt is an example of the "data-extortion-only" T5.008 sub-pattern: the threat actor's extortion lever is exclusively the threatened public disclosure of exfiltrated data — there is no ransomware encryptor deployed. This operational model eliminates the encryption-implementation risk (no decryptor-quality variance, no cryptographic flaws for defenders to exploit), reduces operational complexity (no encryptor development/maintenance overhead), and produces a structurally different victim-to-attacker negotiation surface. Cl0p's later data-theft campaigns (OAK-G14) used the same encryption-free approach; a causal "prototype" relationship is unverified.

## Summary

Karakurt has been active since mid-2021 `[bleepkarakurt]` and was linked by Arctic Wolf in April 2022 to Conti as its data-extortion arm `[arcticwolfkarakurt]`. The cluster's name — Karakurt, the Central Asian black-widow spider — and its black-and-red leak-site visual identity ("Karakurt Lair") have been consistent across the cluster's 2021–present operating window.

The cluster's signature operational pattern: (1) initial access via purchased stolen credentials and broker access, unpatched VPN/firewall appliances, Log4Shell, phishing and stolen VPN/RDP credentials `[cisakarakurt]`; (2) lateral movement and data exfiltration to attacker-controlled infrastructure; (3) victim notification and negotiation via the Karakurt Lair Tor leak site, with cryptocurrency-denominated extortion payments demanded under threat of data disclosure; (4) no ransomware encryptor deployed — the extortion lever is exclusively the threat of leaked-data publication.

Whether Karakurt survived the Conti wind-down as a standalone brand, and the claim that Cl0p's MOVEit, GoAnywhere and Cleo campaigns adopted a Karakurt "prototype", were unsourced and are marked unverified.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021-mid | Karakurt active (per DOJ-case coverage); leak site published 40 victims between September and November 2021, 95% in North America `[bleepkarakurt]` | (cluster emergence) |
| 2021-08 to 2023-11 | FBI links Zolotarjovs to at least six US extortion cases `[bleepkarakurt]` | T5.008 |
| 2022-04 | Arctic Wolf et al. report Karakurt as Conti's data-extortion arm `[arcticwolfkarakurt]` | (attribution research) |
| 2022-06-01 | CISA advisory AA22-152A published `[cisakarakurt]` | (government advisory) |
| 2023-12 | Zolotarjovs arrested in Georgia; reported 2024-08-22 `[bleepkarakurt]` | (law enforcement) |

## Public references

- `[cisakarakurt]` — CISA, Advisory AA22-152A, Karakurt Data Extortion Group (2022-06-01, rev. 2023-12-12): <https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-152a>
- `[bleepkarakurt]` — BleepingComputer, "US charges Karakurt extortion gang's cold case negotiator" (2024-08-22): <https://www.bleepingcomputer.com/news/legal/us-charges-karakurt-extortion-gangs-cold-case-negotiator>
- `[arcticwolfkarakurt]` — Arctic Wolf, "The Karakurt Web: Threat Intel and Blockchain Analysis Reveals Extension of Conti Business Model" (2022-04): <https://arcticwolf.com/?p=50853>
