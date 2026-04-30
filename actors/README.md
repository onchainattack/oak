# OAK Threat Actors / Groups

OAK's third top-level axis, alongside Tactics (`tactics/`) and Techniques (`techniques/`). A **Group** is a tracked operator or operator family whose activity has been attributed across multiple incidents to a sustained identity — whether nation-state, organised commercial criminal service, or persistent operator cluster.

The Groups axis exists because per-Technique pages alone do not give defenders, investigators, or risk teams the *attribution* surface they need. The largest single class of public crypto theft in recent years is DPRK-attributed activity (`[chainalysis2024dprk]` reports \$1.34B / 47 incidents in 2024 = 61% of all attacker-stolen value; \$2.02B in 2025). A framework that does not provide a stable identifier system for that category is implicitly choosing not to engage with the largest threat in the space.

## Identifier scheme

- Group IDs use the format `OAK-Gnn` (two-digit), parallel to `OAK-Tn` for Tactics.
- IDs are stable for v0.x; deprecated Groups remain in the directory with a pointer to a superseding entry.
- IDs are never reused.

## Per-Group page structure

Each Group page follows this template:

```markdown
# OAK-Gnn — <Group Name>

**Aliases:**
**First observed in crypto:**
**Attribution status:** confirmed-by / inferred-by
**Active:** yes | dormant | inactive (with last-observed date)

## Description
2–3 paragraphs.

## Targeting profile
- target type 1
- target type 2

## Observed Techniques
- OAK-Tn.NNN — short note
- ...

## Observed Examples
- examples/<incident>.md — short note
- ...

## Citations
- bibkey
- ...

## Discussion
Operator-profile evolution, TTPs over time, attribution caveats.
```

## Attribution standards

OAK distinguishes three attribution levels:

- **confirmed** — multiple credible national-government or law-enforcement bodies have publicly attributed the activity (e.g., FBI press release, Treasury OFAC designation, multiple national CERTs).
- **inferred-strong** — major industry forensic providers have published consistent attributions with technical evidence (e.g., wallet-cluster analysis, malware fingerprints, tactical fingerprints).
- **inferred-weak** — speculation or single-source attribution; OAK does not publish single-source attributions at v0.1.

Attribution levels are explicit in the per-Group page header. When attribution evolves (de-listings, new public attributions), pages are updated and the change recorded in `CHANGELOG.md`.

## Relationship to OAK-T8 (Operational Reuse)

There is intentional overlap between OAK-T8 (a *Tactic* describing infrastructure reuse across incidents) and OAK-Gnn (an *axis entry* identifying a specific operator). T8 is the *defender capability* that produces Group attributions; OAK-Gnn entries are the *outputs* of that capability when the attribution is stable enough to publish. Per-Technique pages may reference both — for instance, an incident attributed to OAK-G01 Lazarus Group typically also exhibits OAK-T8.001 (Common-Funder Cluster Reuse) as a contributing detection signal.

## v0.1 Groups in this directory

- [`OAK-G01-lazarus.md`](./OAK-G01-lazarus.md) — Lazarus Group / DPRK-attributed crypto theft.
- [`OAK-G02-drainer-services.md`](./OAK-G02-drainer-services.md) — Drainer-as-a-Service operators (Inferno, Angel, Pink, Monkey, Venom drainer services and their successors).
- [`OAK-G03-russian-laundering-infrastructure.md`](./OAK-G03-russian-laundering-infrastructure.md) — Russian-attributed crypto-laundering-infrastructure cluster (Garantex / Grinex / A7A5 lineage; OFAC- and DOJ-confirmed).
- [`OAK-G04-dprk-it-worker-scheme.md`](./OAK-G04-dprk-it-worker-scheme.md) — DPRK IT-worker placement scheme; FBI/Treasury/DOJ-confirmed; distinct from G01 (direct cyber attacks).
- [`OAK-G05-lockbit.md`](./OAK-G05-lockbit.md) — LockBit ransomware-as-a-service operation; NCA / FBI / OFAC / DOJ-confirmed (Operation Cronos Feb 2024, Khoroshev indictment May 2024).
- [`OAK-G06-evil-corp.md`](./OAK-G06-evil-corp.md) — Evil Corp Russian cybercriminal group; OFAC 2019 + DOJ 2019 + October 2024 trilateral (US/UK/AU) sanctions; documented Russian state-intelligence linkage.
- [`OAK-G07-apt43-kimsuky.md`](./OAK-G07-apt43-kimsuky.md) — APT43 / Kimsuky; DPRK financial-funding cluster; OFAC JY1938 (Nov 2023) + Mandiant March 2023 attribution report + ROK MOFA 2023 sanctions + BfV/NIS 2023 joint advisory; distinct from G01 (TraderTraitor cluster) and G04 (IT-worker placement).
- [`OAK-G08-bluenoroff.md`](./OAK-G08-bluenoroff.md) — BlueNoroff; DPRK Lazarus financial-targeting macOS sub-cluster; OFAC SM-774 (2019) + Park Jin Hyok DOJ indictment (2018) + Mandiant APT38 + Kaspersky GReAT SnatchCrypto + Jamf RustBucket + Elastic KandyKorn + SentinelOne Hidden Risk; macOS-engineering-pipeline focus distinct from G01's trojanized-trading-app vector.
- [`OAK-G09-andariel.md`](./OAK-G09-andariel.md) — Andariel; DPRK Lazarus ransomware/ICS sub-cluster; OFAC SM-774 (2019) + CISA AA22-187A Maui ransomware (2022) + DOJ Rim Jong Hyok indictment + AA24-207A multi-government joint advisory (2024) + Mandiant APT45 + Microsoft Onyx Sleet + Symantec Stonefly; healthcare/DIB targeting + cryptojacking-on-compromised-infra monetization distinct from G01/G08.
- [`OAK-G10-alphv-blackcat.md`](./OAK-G10-alphv-blackcat.md) — ALPHV / BlackCat; Russian-language Rust ransomware-as-a-service; FBI Dec 2023 disruption + multiple CISA/FBI/HHS advisories + DOJ Scattered Spider indictments (2024); SEC-filing pressure-tactic novelty (MeridianLink Nov 2023) and Change Healthcare exit-scam (Feb-Mar 2024) as defining operator-behaviour markers; structural sibling to G05 LockBit on tooling/affiliate-management/exit-dynamic axes.
- [`OAK-G11-black-basta.md`](./OAK-G11-black-basta.md) — Black Basta; Russian-language ransomware-as-a-service; Conti splinter (post-ContiLeaks Feb-May 2022); CISA AA24-131A (May 2024) + ~$107M Bitcoin via Elliptic + Mandiant UNC4393 + Microsoft Storm-1811; canonical Ascension Health May 2024 incident; February 2025 BlackBastaLeaks internal-chats archive; dormant late-2024 → Q1 2025 with affiliate dispersal into RansomHub/Akira/Cactus.
- [`OAK-G12-scattered-spider.md`](./OAK-G12-scattered-spider.md) — Scattered Spider / UNC3944; English-speaking financially-motivated affiliate-collective (not RaaS operator); DOJ Nov 2024 indictments (Elbadawy/Urban/Osiebo/Evans/Buchanan) + CISA AA23-352A + Mandiant UNC3944 + Microsoft Octo Tempest + Group-IB 0ktapus; rotating affiliate of multiple RaaS (ALPHV 2023, RansomHub 2024, DragonForce/Qilin 2025); MGM/Caesars Sep 2023 + Twilio/0ktapus + 2025 UK retail wave (M&S/Co-op/Harrods).
- [`OAK-G13-iranian-crypto-operators.md`](./OAK-G13-iranian-crypto-operators.md) — Iranian financially-motivated cluster set (MuddyWater MOIS + Charming Kitten/APT35 IRGC-IO + Pioneer Kitten/Fox Kitten/Lemon Sandstorm IRGC-affiliated); confirmed-cluster-set via CISA AA22-055A + AA22-257A + AA20-259A + FBI Aug 2024 Pioneer Kitten Flash + multiple OFAC designations 2018-2024; canonical Pay2Key Nov-Dec 2020 Israeli-target Iranian-state-aligned ransomware-with-crypto-payment case.
- [`OAK-G14-clop-cl0p.md`](./OAK-G14-clop-cl0p.md) — Cl0p / Clop / TA505 / FIN11; Russian-language; mass-exploitation-of-MFT-products signature (Accellion 2020-21 → GoAnywhere Feb 2023 → MOVEit June 2023 = >2,500 victims → Cleo late-2024); OFAC June 2023 affiliate designations + CISA AA23-158A + AA23-039A + Ukrainian Cyber Police arrests June 2021; mid-2023 data-extortion-only operating-model pivot; most operationally durable Russian-language cluster.
- [`OAK-G15-ransomhub.md`](./OAK-G15-ransomhub.md) — RansomHub; Russian-language ransomware-as-a-service active February 2024; **confirmed** via CISA AA24-242A (August 2024); largest 2024 RaaS post-ALPHV-exit-scam absorber per Mandiant; Change Healthcare data leak Apr 2024 (post-ALPHV exit-scam) + Christie's auction May 2024 + Frontier Communications Apr 2024.
- [`OAK-G16-akira.md`](./OAK-G16-akira.md) — Akira ransomware operator; Russian-language; active March 2023; **confirmed** via CISA AA24-109A (April 2024) + Mandiant + Sophos tracking; ~250+ confirmed victims through early 2024; ESXi + Windows multi-platform variants.
- [`OAK-G17-blackbyte.md`](./OAK-G17-blackbyte.md) — BlackByte ransomware operator; active July 2021; **confirmed** via FBI IC3 BlackByte alert + CISA Joint Cybersecurity Advisory TA22-039A Feb 2022 + Mandiant + Sophos; Conti splinter (post-ContiLeaks dispersal); San Francisco 49ers + US critical-infrastructure targeting; multi-platform Go-language ransomware variants tracked through 2024.

## Roadmap

Additional Groups in v0.x: notable persistent operator clusters from rug-pull and exchange-hack ecosystems where stable forensic attribution exists. Specific candidates are tracked in `ROADMAP.md`. Submissions via the `[Group]` issue template (planned) are encouraged for v0.x cycles.

## License and use

Group attributions in this directory are CC-BY-SA 4.0 like the rest of OAK content. Reuse is permitted with attribution and share-alike. Attribution claims in derived works should preserve the attribution-strength language (`confirmed` / `inferred-strong`) used here, since misrepresenting an `inferred-strong` attribution as `confirmed` is a common downstream-distortion failure.
