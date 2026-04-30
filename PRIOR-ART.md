# OAK — Prior Art and Related Frameworks

OAK does not exist in a vacuum. This file documents the public frameworks, datasets, and bodies of work that OAK draws on, sits alongside, or differentiates from. Future contributors are expected to update this file when they introduce a citation or mapping that materially changes how OAK relates to a referenced project.

---

## MITRE ATT&CK

OAK's per-Technique structure (Description, Detection, Mitigations, identifier scheme `OAK-Tn` / `OAK-Tn.NNN`) is consciously modelled on the structural conventions of MITRE ATT&CK. The intent is for security and risk professionals already fluent in that structure to read OAK content with minimal context switching.

**OAK is not affiliated with MITRE Corporation or the ATT&CK framework.** This non-affiliation is explicit in `DISCLAIMER.md` and reiterated in the README banner. Specifically:

- OAK reuses **no** MITRE-copyrighted text, **no** MITRE identifier numbering, and **no** MITRE visual styling.
- The `OAK-` identifier prefix is intentional: it signals lineage (this is an attack-knowledge-base structure) without claiming the trademark.
- ATT&CK® is a registered trademark of MITRE Corporation. References to ATT&CK in OAK content are descriptive only.

What OAK takes from ATT&CK conceptually but does not yet have:

- **Threat-actor / Groups axis** — flagged in TAXONOMY-GAPS.md as the most consequential v0.1 omission.
- **Data Sources as a first-class axis** — also flagged in TAXONOMY-GAPS.md.

What OAK does differently:

- **Scope.** ATT&CK is general adversary behaviour across IT. OAK is on-chain-specific, with explicit chain-coverage labelling per Technique.
- **License.** OAK content is CC-BY-SA 4.0 — fully redistributable and adaptable. ATT&CK is licensed for reuse with restrictions specific to MITRE.
- **Governance.** OAK is, at v0.1, single-maintainer with PR-based community contribution; co-maintainers invited by v0.5; foundation incorporation considered in Y3 of the broader OAK strategy.

---

## OWASP Smart Contract Top 10

The closest existing public framework, by audience and intent, is the [OWASP Smart Contract Top 10](https://scs.owasp.org/sctop10/), developed under the OWASP Foundation's Smart Contract Security project (2025/2026 edition: `[owaspscstop10]`). The 2025/2026 list is derived from \~122 deduplicated smart-contract incidents totalling \~\$905.4M in tracked losses, with categories including access-control vulnerabilities, price oracle manipulation, and flash-loan attacks.

**OAK and OWASP SC Top 10 are orthogonal and complementary.** Specifically:

- OWASP SC Top 10 occupies the **contract-vulnerability layer**: what makes a contract exploitable.
- OAK occupies the **operator-behaviour layer**: what an adversary does with a contract once deployed, what they do to capture holders, how they extract value, how they launder.
- The two layers overlap at oracle manipulation and flash-loan attacks (OAK plans to add these as Techniques per TAXONOMY-GAPS.md), but OWASP describes them as protocol-vulnerability *classes* whereas OAK describes them as adversary *behaviours* with attribution and mitigation framing.

A contributor mapping their detector should expect to claim coverage in **both** frameworks, not one or the other. v0.5 of OAK plans to publish a cross-walk between OAK Techniques and OWASP SC Top 10 categories so vendors can produce coverage statements without translation overhead.

OWASP SC Top 10 also provides an indirect prior-art baseline for how OAK's coverage matrix should evolve: OWASP's empirical sourcing methodology (deduplicate, categorise, count) is consistent with what `COVERAGE.md` aspires to at v0.5.

---

## Academic taxonomy: SoK papers

The single most important academic prior-art reference for OAK is `[zhou2023sok]` — *SoK: Decentralized Finance (DeFi) Attacks* by Liyi Zhou, Xihan Xiong, Jens Ernstberger, Stefanos Chaliasos, Zhipeng Wang, Ye Wang, Kaihua Qin, Roger Wattenhofer, Dawn Song, and Arthur Gervais (arXiv:2208.13035, latest revision 2023). The paper systematises 7 prior surveys, 29 security tools, and 42 attack papers, documenting \~\$3.24B in DeFi-protocol-layer losses from April 2018 through April 2022.

OAK uses Zhou et al. 2023 as the canonical academic taxonomy of **DeFi-protocol-layer attacks** — a category that OAK v0.1 specifically does not cover. When OAK v0.3 introduces a Smart-Contract Exploit Tactic, Zhou et al.'s threat-model taxonomy (utilities, goals, knowledge, capabilities) will be the canonical reference frame for the new Techniques.

Other academic prior art used directly in OAK Technique pages:

- `[torres2019]` — honeypot detection (foundational for OAK-T1.001).
- `[victor2021washtrade]` — wash-trade detection (foundational for OAK-T3.002).
- `[xia2021mintdump]` — Uniswap scam-token characterisation (foundational for OAK-T5.003).
- `[daian2019flashboys]` — MEV characterisation (foundational for OAK-T5.004).
- `[liu2025sybil]` — sybil-detection methodology (with airdrop-vs-launch caveat, applied to OAK-T3.001 and T8.001).
- `[karbalaii2025]`, `[bolz2024]` — pump-and-dump cohorts (foundational for OAK-T3.003).
- `[solrpds]`, `[tmrugpull2026]`, `[frp2025]` — rug-pull datasets (foundational for OAK-T2.001 / T2.002 / T5.001 / T5.002).
- `[tsuchiya2025poisoning]` — address poisoning at scale (driver for the missing T4 sub-Technique called out in TAXONOMY-GAPS.md).

---

## Industry intelligence sources

OAK draws on industry reports for incident attribution and aggregate context. These are not academic in the peer-reviewed sense, but they are the canonical operational record of the events that OAK Techniques describe:

- **Chainalysis** — `[chainalysis2025rug]` (2025 Crypto Crime Report market-manipulation chapter), `[chainalysis2021scams]` (2021 rug-pull retrospective), `[chainalysis2024dprk]` (DPRK attribution scale).
- **TRM Labs** — `[trmsquid2021]` (SQUID-cluster cross-incident attribution).
- **SlowMist** — `[slowmist2024report]` (2024 Blockchain Security and Anti-Money Laundering Annual Report).
- **EigenPhi** — `[eigenphijared2023]` (sandwich-MEV operator profiling).
- **Elliptic** — `[ellipticronin2022]` (Ronin Bridge forensic write-up).
- **rekt.news** — `[rektcurve2022]` (Curve DNS hijack write-up).

OAK treats these as primary sources when they document specific incidents with public on-chain artefacts. Vendor reports that re-state aggregate statistics without primary-source attribution are not citation candidates.

---

## Regulatory and government sources

OAK preferentially cites regulatory and government records when they are available, because they are the strongest possible source for claims about specific incidents:

- **U.S. SEC** — `[secsafemoon2023]` (SafeMoon civil enforcement action and complaint).
- **U.S. CFTC** — `[cftcmango2023]` (Mango Markets oracle-manipulation enforcement).
- **U.S. Treasury (OFAC)** — `[ofac2022tornado]` (Tornado Cash SDN designation, August 2022; partially delisted 2025 following Fifth Circuit ruling).

Out-of-scope-at-v0.1 government sources OAK has not yet pulled but plans to in v0.2: FBI IC3 cryptocurrency annual reports, FinCEN advisories, NCSC (UK) cryptocurrency alerts, CISA DPRK-related alerts.

---

## Vendor-side frameworks not yet pulled

Several vendor-published frameworks and methodologies are on OAK's radar but not yet integrated as references at v0.1. They will be pulled into v0.2's PRIOR-ART expansion as the framework matures and as vendor mappings begin landing via PR:

- Halborn's own attack methodology and incident retrospectives.
- Trail of Bits' security frameworks and audit-finding retrospectives.
- OpenZeppelin's smart-contract security frameworks.
- PeckShield, CertiK Skynet, Beosin annual retrospectives.
- Smart Contract Security Verification Standard (SCSVS).

OAK does not endorse any of these by listing them; the policy in `CONTRIBUTING.md` is that vendors submit Reference-implementation entries via PR, with public-verifiability requirements. Vendor frameworks are listed here only as prior art for the methodology layer, not as endorsed coverage providers.

---

## How OAK positions itself

The 30-second elevator pitch with prior art surfaced:

- **MITRE ATT&CK** is the structural inspiration (per-Technique format, identifier scheme); OAK is independent and on-chain-specific.
- **OWASP Smart Contract Top 10** is the closest existing framework; it occupies the contract-vulnerability layer; OAK occupies the orthogonal operator-behaviour layer; the two are complementary, not competing.
- **Zhou et al. 2023 SoK** is the academic taxonomy of DeFi-protocol-layer attacks; v0.3 of OAK will build on it for the Smart-Contract Exploit Tactic.
- **Chainalysis / TRM / SlowMist / EigenPhi / Elliptic / rekt.news** are the industry intelligence sources OAK draws on for incident-level attribution.
- **U.S. SEC / CFTC / Treasury** records are preferentially cited for incidents with regulatory action because they are the strongest available source.

OAK adds: a stable identifier system for vendor-coverage claims; a defender-perspective per-Technique template that is shorter and more contributor-friendly than the academic SoK; and an explicit honest-coverage convention (`COVERAGE.md`) that comparable frameworks do not formally publish.

---

## How this file evolves

When OAK adds a new Tactic or major axis (Threat Actors, Data Sources), the corresponding section in this file is expanded with the prior-art references that informed the new content. When a vendor or framework is integrated as an authoritative reference (rather than as prior art), it migrates to the appropriate Technique page or to a new `IMPLEMENTATIONS.md` registry document.
