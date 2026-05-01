# Changelog

All notable changes to OAK are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and OAK's versioning is independent of any calendar cadence — minor versions ship when content reaches a coherent next state, not on a fixed schedule.

## [Unreleased / v0.1.0-draft] — pre-release

The initial public release. v0.1 expanded mid-draft from the original "operator-behaviour kill chain only" scope to also include the smart-contract-exploit Tactic (T9) and a Threat Actors axis (`actors/`), making the framework substantially more useful as a v0.1 deliverable rather than as a launching point that left the largest classes of public losses unaddressed. Content is complete and self-consistent against the v0.1 launch criteria; remaining work to land the v0.1 tag is non-content (visual identity, landing page, peer-review outreach, US trademark review).

### Phase U additions (parallel-agent run, 10 agents — partial completion before rate-limit)

Continuation of comprehensive coverage push. 9 of 10 agents hit Anthropic rate limit during the summary step but most had already written their files before failing; 38 new files landed.

- **3 new Threat Actors (`OAK-G15`–`OAK-G17`)** — RansomHub (post-ALPHV-exit-scam absorber; CISA AA24-242A); Akira (Conti-codebase-related RaaS; CISA AA24-109A; ~250+ confirmed victims); BlackByte (Conti splinter; CISA TA22-039A; San Francisco 49ers + critical-infrastructure targeting). Note: G18 Karakurt did not land before rate-limit; deferred to Phase V.
- **3 new Software entries (`OAK-S33`–`OAK-S35`)** — Akira ransomware (G16); RansomHub ransomware (G15); BlackByte ransomware (G17). Note: S36 Karakurt + S37 Cobalt Strike + S38 IcedID/Pikabot did not land before rate-limit; deferred to Phase V.
- **5 new Mitigations (`OAK-M32`–`OAK-M36`)** — Bug Bounty Programs (operational, ~$1.5B+ Immunefi cumulative payouts); Decentralized Insurance Protocols (Nexus Mutual / Sherlock Cover); Pause-by-Default + Emergency Pause (architecture; OpenZeppelin Pausable); Whitehat Rescue Coordination (operational; Euler / ParaSpace / Ronin / Tapioca canonical cases); Proof-of-Reserves Cryptographic Auditing (venue; FTX 2022 + Mt. Gox as anti-pattern anchors).
- **27 new worked examples** spanning 2014–2025:
  - Pre-2017 historical: Cryptsy 2014, MintPal 2014, BTER Feb 2015.
  - 2021-2022 bridge / NFT: THORChain Jul-Aug 2021 cluster, Qubit Bridge Jan 2022, Meter Bridge Feb 2022, Frosties NFT Jan 2022 rug + DOJ arrests, BAYC Discord wave Apr-Aug 2022, Premint Jul 2022 phishing, Pixelmon May 2022 reveal-rug, Ronin Discord followup Apr 2022.
  - 2023: Ledger Connect Kit Dec 2023 npm supply-chain, MEV-Boost equivocation Apr 2023 (DOJ Peraire-Bueno indictment Sep 2024).
  - 2024 H1: FixedFloat Feb 2024 (G01 inferred-strong), BitForex Feb 2024 exit-scam, Pike Finance Apr 2024.
  - 2024 H2: Compound Vote Takeover Jul 2024 (governance-attack non-flash-loan subclass), Nexera Aug 2024, Bittensor coldkey cohort Aug 2024, EigenLayer restaking airdrop dispute May 2024.
  - 2025 H1: ZKLend Feb 2025 (Starknet empty-market subclass), Infini Feb 2025 (HK arrest March 2025), 1inch resolver Mar 2025 (patch-not-propagated cohort), ERC-4337 paymaster Apr 2025, ZKsync airdrop Apr 2025, KiloEx Apr 2025, Loopscale Apr 2025.
- **~140 new BibTeX entries** added as auto-generated stubs (`OAK v0.1 — pending verification`); validator passes (888 entries / 866 cited / all resolved).
- **Total counts after Phase U partial**: 14 Tactics, 58 Techniques, 36 Mitigations, 35 Software, 17 Threat Actors, 12 Data Sources, 128 Worked Examples, 888 Citations, 338 Relationships. Validator + build clean.
- **Phase V** (rate-limit-blocked items to redispatch after reset): G18 Karakurt + S36 Karakurt + S37 Cobalt Strike + S38 IcedID/Pikabot + ~12 worked examples (2024 missed: Galxe DNS, Concentric, Curio, CoinStats, DEXX, Clipper Finance, Bithumb credentials companion + others).

### Phase T additions (parallel-agent run, 10 agents — comprehensive coverage push)

Largest single content phase to date — comprehensive coverage push toward "everything publicly known up to 2026" goal. 49 new files across Threat Actors, Software, and Worked Examples; ~280 new BibTeX stubs (most marked `pending verification` for pre-launch URL audit); validator clean.

- **4 new Threat Actors (`OAK-G11`–`OAK-G14`)** in `actors/`:
  - **G11 Black Basta** — Russian-language RaaS; Conti splinter post-ContiLeaks Feb-May 2022; **confirmed** via CISA AA24-131A (May 2024) + Mandiant UNC4393 + Microsoft Storm-1811 + ~$107M Bitcoin tracked by Elliptic; canonical Ascension Health May 2024 healthcare incident; February 2025 BlackBastaLeaks internal-chats archive structurally parallel to ContiLeaks 2022; **dormant** late-2024 → Q1 2025 with affiliate dispersal into RansomHub / Akira / Cactus.
  - **G12 Scattered Spider / UNC3944** — English-speaking financially-motivated affiliate-collective (distinct from G10 ALPHV operator-brand); **confirmed** via DOJ Nov 2024 five-defendant indictment + CISA AA23-352A + Mandiant UNC3944 + Microsoft Octo Tempest + Group-IB 0ktapus + Krebs reporting; rotating affiliate of multiple RaaS tooling (ALPHV 2023, RansomHub 2024, DragonForce/Qilin 2025); MGM/Caesars Sep 2023 + Twilio/0ktapus Aug 2022 + 2025 UK retail wave.
  - **G13 Iranian crypto operators** — composite cluster-set: MuddyWater (MOIS) + Charming Kitten / APT35 (IRGC-IO) + Pioneer Kitten / Fox Kitten / Lemon Sandstorm (IRGC-affiliated); **confirmed** via CISA AA22-055A + AA22-257A + AA20-259A + FBI Aug 2024 Pioneer Kitten Flash + multiple OFAC designations 2018-2024 (foundational Nov 2018 SamSam-laundering SDN designation introduced cryptocurrency-address SDN identifiers); canonical Pay2Key Nov-Dec 2020 Iranian-state-aligned ransomware-with-crypto-payment case.
  - **G14 Cl0p / Clop / TA505 / FIN11** — Russian-language mass-exploitation operator; signature managed-file-transfer-product zero-day cadence (Accellion 2020-21 → GoAnywhere Feb 2023 → MOVEit June 2023 = >2,500 victims → Cleo late-2024); **confirmed** via OFAC June 2023 + CISA AA23-158A + AA23-039A + Ukrainian Cyber Police arrests June 2021 + Mandiant FIN11; mid-2023 data-extortion-only operating-model pivot.
- **6 new Software entries (`OAK-S27`–`OAK-S32`)** in `software/`:
  - **Ransomware binaries**: S27 Black Basta (used by G11; Conti-codebase lineage), S28 Royal/BlackSuit (defunct-operator; Conti-Zeon fork; rebrand Royal→BlackSuit June 2023; OFAC Dec 2023).
  - **DPRK Contagious Interview / Wagemole campaign**: S29 BeaverTail (G01/G08; npm/PyPI supply-chain malware; canonical Unit 42 July 2023); S30 InvisibleFerret (G01/G08; Python second-stage backdoor following BeaverTail loader).
  - **DPRK / Kimsuky persistence backdoors**: S31 TigerRAT (G09 Andariel; Windows; KrCERT/CC + AhnLab 2022); S32 AppleSeed (G07 Kimsuky; Windows; HWP-document-borne delivery; Talos / ESET / Mandiant / KISA tracking 2019-present).
- **39 new worked examples** in `examples/` spanning 2015–2025:
  - **2015-2019 historical exchange compromises (5)**: BitGrail Feb 2018 (~17M NANO; confirmed-by-court Florence ruling); Coinrail Jun 2018 (~$40M+; G01-cohort); Zaif Sep 2018 (~$60M; FSA Japan order; Fisco-absorbed); DragonEx Mar 2019 (~$7M; G01 inferred-strong); Upbit Nov 2019 (~342k ETH; confirmed-attribution Nov 2024 by Korean NPA + US extradition request).
  - **2020 DeFi (already covered Phase S)** — no additions this phase.
  - **2022 Solana ecosystem (5)**: Cashio Mar 2022 (~$48M; canonical Solana T9.004 input-validation case; ~$28M wealth-bracketed return); Crema Finance Jul 2022 (~$8.78M; 10% bounty + $7.18M return); Nirvana Finance Jul 2022 (~$3.5M; self-referential pricing T9.001 sub-class anchor); OptiFi Aug 2022 (~$661k locked; canonical operator-side T9.004 human-error case); Cypher Aug 2023 (~$1M; DOJ Jan 2025 arrest of "Hailey").
  - **2022 bridge expansion**: Binance BSC Token Hub Oct 2022 (~$586M extracted, ~$110M unrecovered; canonical T10.005 IAVL+ proof-soundness flaw); Wintermute-Profanity cohort Sep 2022 (cohort case alongside the canonical Wintermute single-incident).
  - **2023 DeFi (10)**: BonqDAO Feb 2023 (~$120M nominal; Tellor optimistic-oracle); Platypus Feb 2023 (~$8.5M; **confirmed-by-arrest** French police); Yearn V2 Feb 2023 (~$11.6M; configuration-rot subclass); Hope Finance Feb 2023 (~$2M rug); ParaSpace Mar 2023 (whitehat rescue ~$5M; **confirmed defender** BlockSec); Sentiment Apr 2023 (~$1M; read-only reentrancy; full recovery); Allbridge Apr 2023 (~$573k; partial recovery); Hundred Finance Apr 2023 (~$7.4M; canonical first-appearance of empty-market rounding-error cohort case for Hundred → Midas → Sonne → Onyx); Steadefi Aug 2023 (~$1.1M deployer-key compromise); KyberSwap Nov 2023 (~$48M tick-state manipulation + operator-extortion message).
  - **2023 cross-chain**: HTX/HECO Bridge Nov 2023 (~$110M+ pair; G01 inferred-strong via Chainalysis/SlowMist/Match Systems).
  - **2024 H1 (10)**: WOOFi Pro Mar 2024 (~$8.5M sPMM-curve manipulation); Prisma Mar 2024 (~$11.6M MigrateTroveZap delegatecall); Hedgey Apr 2024 (~$44.5M cross-protocol contagion via shared infrastructure); Sonne May 2024 (~$20M empty-market subclass; cohort with Hundred/Midas/Onyx); UwU Lend Jun 2024 (~$20M + ~$3.6M recurring-target); Gala Games May 2024 (~$200M reverse-mint recovery via former-employee key); Velocore Jun 2024 (~$6.8M zkSync underflow + L2-sequencer-pause as bounded-delay primitive); Holograph Jun 2024 (~$14M minter-key compromise); Loopring Jun 2024 (~$5M smart-wallet 2FA-bypass); Bittensor Jul 2024 (~$8M PyPI supply-chain compromise; cohort with 3CX 2023).
  - **2024 H2 incidents (5)**: DeltaPrime Sep 2024 (~$5.98M proxy-admin-key compromise multi-chain); Indodax Sep 2024 (~$22M; G01 inferred-strong); Banana Gun Sep 2024 (~$3M oracle-messenger info-leak); Tapioca Oct 2024 (~$4.7M; ~94% bounty-negotiated return); Thala Nov 2024 (~$25.5M Move-language farming-contract; **confirmed-by-arrest** Hong Kong police; ~100% Aptos validator-coordinated freeze).
  - **2024 bridge**: Orbit Bridge Jan 2024 (~$81.5M; 7-of-10 simultaneous signer compromise; G01 inferred-strong).
- **~280 new BibTeX entries** in `citations.bib`. Government anchors (CISA AA22-055A / AA22-257A / AA20-259A / AA22-321A / AA23-039A / AA23-061A / AA23-158A / AA23-352A / AA24-131A; OFAC SamSam 2018 + APT39 2020 + IRG cyber 2022 + Cl0p affiliates 2023 + Royal/BlackSuit 2023; FBI Pioneer Kitten Flash 2024; DOJ Scattered Spider Nov 2024 indictments; HHS Ascension 2024; Hong Kong Police Thala 2024; Korean NPA Upbit 2024; Ukrainian Cyber Police Cl0p 2021; Tribunale di Firenze BitGrail civil + bankruptcy 2019; Japan FSA Zaif 2018) verified manually. Vendor / industry forensic sources (BlockSec / Halborn / PeckShield / SlowMist / Cyfrin / OtterSec / Mandiant / Microsoft / Sophos / Trend Micro / SentinelOne / Unit 42 / CrowdStrike / Talos / ESET / AhnLab / KrCERT/CC / Kaspersky / Group-IB / Check Point / ClearSky / Recorded Future / Stairwell / Verichains / MoveBit / ReversingLabs / Jamf / Merkle Science / Hacken / ChainLight / Inspex / ConsenSys / OpenZeppelin / Trail of Bits / Coveware / TRM Labs / Elliptic / Chainalysis / Match Systems / Cyvers / Hypernative / ZachXBT / ScamSniffer / Rekt News / The Block / CoinDesk / Decrypt / Cointelegraph / BleepingComputer / Wired / Reuters / Krebs / Korea Herald / Korea Times / Stuff NZ / RNZ / SCMP / Japan Times) marked `OAK v0.1 — pending verification` and require URL audit before public launch.
- **Total counts** after Phase T: 14 Tactics, 58 Techniques, 31 Mitigations, 32 Software, 14 Threat Actors, 12 Data Sources, 101 Worked Examples, 751 Citations (~280 pending verification), 266 machine-readable Relationships.
- **Validator clean** (`tools/check_citations.py` passes: 751 entries / 726 cited / all resolved). **Site rebuild clean.**

### Phase S additions (parallel-agent run, 8 agents — content-depth expansion)

Major content-depth expansion across Threat Actors, Software, and Worked Examples. Brings the framework from foundational to substantive across the three biggest base-data dimensions.

- **3 new Threat Actors (`OAK-G08`–`OAK-G10`)** in `actors/`:
  - **G08 BlueNoroff** — DPRK Lazarus financial-targeting macOS sub-cluster, distinct from G01 TraderTraitor cluster; **confirmed** via OFAC SM-774 (2019) + Park Jin Hyok DOJ indictment (2018) + Mandiant APT38 + Kaspersky GReAT SnatchCrypto + Jamf RustBucket + Elastic KandyKorn + SentinelOne Hidden Risk; external Group ID G0082 cross-anchor.
  - **G09 Andariel** — DPRK Lazarus ransomware/ICS sub-cluster; **confirmed** via OFAC SM-774 (2019) + CISA AA22-187A Maui ransomware (2022) + DOJ Rim Jong Hyok indictment + AA24-207A multi-government joint advisory (2024) + Mandiant APT45 + Microsoft Onyx Sleet + Symantec Stonefly; external Group ID G0138 cross-anchor.
  - **G10 ALPHV/BlackCat** — Russian-language Rust RaaS; **confirmed** via FBI Dec 2023 disruption + multiple CISA/FBI/HHS advisories + DOJ Scattered Spider indictments (2024); SEC-filing pressure-tactic novelty (MeridianLink Nov 2023) and Change Healthcare exit-scam (Feb-Mar 2024) as canonical markers; structural sibling to G05 LockBit.
- **8 new Software entries (`OAK-S19`–`OAK-S26`)** in `software/`:
  - **DPRK macOS family**: S19 KandyKorn (G01, Elastic Nov 2023); S20 RustBucket (G08, Jamf Apr 2023); S21 SwiftLoader (G01+G08 cross-cluster, SentinelOne 2023-2024); S22 ObjCShellz (G08 primary, SentinelOne Nov 2023).
  - **Ransomware binaries**: S23 LockBit (used by G05; primary RaaS tool through Operation Cronos Feb 2024); S24 BlackCat/ALPHV (used by G10; first major Rust ransomware; exit-scam Mar 2024); S25 Maui (used by G09 Andariel; healthcare-sector targeting; CISA AA22-187A); S26 Conti (defunct lineage anchor for Black Basta / Royal-BlackSuit / Karakurt / BlackByte successors).
- **16 new worked examples** in `examples/`:
  - **2015-2019 historical exchange compromises**: Bitstamp Jan 2015 (~19,000 BTC; canonical pre-DeFi T11 spear-phishing → signing-infra access pattern); Bithumb Jun 2017 (~$1M+ phishing wave + DPRK-cohort attribution); NiceHash Dec 2017 (~4,700 BTC; T11.002 engineer-workstation compromise; full repayment by Dec 2020); Cryptopia Jan 2019 (NZ$23M+; multi-week sustained drain; foundational T5.002 + T11; Ruscoe v Cryptopia [2020] NZHC 728 NZ digital-asset insolvency precedent).
  - **2020 DeFi protocol incidents**: Lendf.me/dForce Apr 2020 (~$25M; first major ERC-777 callback-hook reentrancy; full recovery in 4 days); Akropolis Delphi Nov 2020 (~$2M; first yield-aggregator-targeting flash-loan reentrancy); Origin Dollar Nov 2020 (~$7M; same-day post-mortem template that Euler/Mango later mirrored); Cred Inc. Nov 2020 (~$140M+ counterparty-fraud insolvency; weak OAK fit, flagged for `TAXONOMY-GAPS.md` off-chain-counterparty-risk class).
  - **2022 DeFi/governance incidents**: Saddle Finance Apr 2022 (~$10M; canonical T9.001 virtual-price subclass); Inverse Finance Apr+Jun 2022 (~$15.6M+$1.2M; recurring-target pattern within 75 days); Audius Jul 2022 (~$6M; canonical T9.003 storage-collision subclass); Ankr Dec 2022 (~$5M direct + ~$50M+ contagion; canonical T11.002 deployer-key compromise + ROK arrest Jan 2023).
  - **2024-2025 incidents**: Cetus Sui May 2025 (~$220M; Sui validator-coordinated freeze recovery primitive — L1-level recovery class with no EVM precedent); Onyx Sep 2024 (~$3.8M; known-vulnerability-not-fixed pattern + cohort with Hundred Finance / Midas Capital); Ronin Bridge Aug 2024 rescue (~$12M whitehat MEV-bot front-run rescue; mempool-watcher MEV bots as defensive primitive); Li.Fi Jul 2024 (~$11.6M diamond-pattern facet exploit; ~150 victims; T9.004 + T4.004 amplification).
- **156 new BibTeX entries** in `citations.bib`: government advisories (CISA AA22-187A / AA24-207A / AA22-046A / AA21-265A / AA23-061A / AA23-165A / AA24-061A; OFAC SM-774; DOJ Rim Jong Hyok 2024 / DOJ ALPHV 2023 / DOJ Park Jin Hyok 2018 / DOJ Scattered Spider 2024 / FBI ALPHV disruption / FBI Flash CU-000167-MW; HHS Change Healthcare); industry-forensic posts (Mandiant APT45 / UNC2165 / UNC3944 / Conti leaks; Microsoft Onyx Sleet / Sapphire Sleet / Storm-0539 / BlackCat; Symantec Stonefly / Noberus; Jamf RustBucket; Elastic KandyKorn; SentinelOne ObjCShellz / Hidden Risk / SwiftLoader; Stairwell Maui; Kaspersky SnatchCrypto; CrowdStrike Wizard Spider; Sophos LockBit; Trend Micro / Unit 42 LockBit; Recorded Future Conti HSE / DPRK financial 2018; OtterSec Cetus; BlockSec Cetus / Onyx / Ronin / Li.Fi / Saddle / Akropolis / Origin / Inverse / Saddle / Audius / Ankr; Halborn Hundred / Midas / Onyx / Li.Fi / Saddle / Inverse / Audius / Ankr; Cyfrin Onyx / Li.Fi; SlowMist Cetus / Lendf.me / Onyx / Li.Fi; PeckShield Cetus / Onyx / Li.Fi / Akropolis / OUSD / Saddle / Inverse / Ankr; Hypernative Ronin; ZachXBT Ronin; Rekt Ronin / Li.Fi); industry coverage (Krebs Bitstamp; Reuters Bitstamp / NiceHash / MeridianLink SEC; CoinDesk Bitstamp / NiceHash / Lendf.me / Akropolis / OUSD / Cred; The Block Akropolis / Cred / dForce / OUSD / Alexander; Korea Herald / Korea Times Bithumb; Stuff NZ / RNZ Cryptopia; BleepingComputer / Wired Change Healthcare); legal/regulatory (Korea Communications Commission Bithumb fine 2018; Grant Thornton Cryptopia liquidator reports; Ruscoe v Cryptopia [2020] NZHC 728; In re Cred Inc. Case 20-12836; United States v Alexander; Witty testimony to House Energy and Commerce Committee; State Department Conti reward; Stroz Friedberg Bitstamp incident report; ContiLeaks insider disclosure); cross-framework anchors (external Group IDs G0082 BlueNoroff / G0138 Andariel); academic-adjacent (OpenZeppelin / ConsenSys Diligence ERC-777; Trail of Bits diamond pattern); industry-side analytics (Chainalysis Conti / DPRK-Korea 2019 / NiceHash / Andariel-Maui / Change Healthcare / ALPHV exit / Cetus / 2021 Crime Report; Elliptic Cryptopia; TRM Change Healthcare; Mandiant DPRK financial 2019).
- **Total counts** after Phase S: 14 Tactics, 58 Techniques, 31 Mitigations, 26 Software, 10 Threat Actors, 12 Data Sources, 62 Worked Examples, 469 Citations, 243 machine-readable Relationships.
- **`tools/oak.json`** regenerated; site rebuild verified clean. Validator (`tools/check_citations.py`) passes (469 entries / 442 cited / all resolved).

### Phase R additions (parallel-agent run, 8 agents — major axis expansion)

Two new top-level axes, with reusable Mitigations / Software / Data-Components / Relationships object types. The framework now emits a machine-readable relationship graph alongside the markdown corpus, materially closing the data-model gap with mature adversary-behaviour frameworks.

- **31 Mitigations (`OAK-M01`–`OAK-M31`)** in `mitigations/`. Reusable defences mapped many-to-many to Techniques. Five classes:
  - **detection** (M01-M07): source-bytecode verification, static-analysis pre-deployment, continuous bytecode-diff monitoring, funder-graph clustering, authority-graph enumeration, mempool/pre-block telemetry, cross-chain attribution-graph.
  - **architecture** (M09-M17): TWAP+multi-venue oracle with deviation circuit-breaker, checks-effects-interactions+ReentrancyGuard, rate-limiting+per-block caps, per-message replay binding, long challenge window with economic challenger incentives, multi-prover redundancy, threshold signing with operator separation, pre-deployment audit+formal verification, time-locked governance+multi-block quorum.
  - **operational** (M18-M22): out-of-band destination verification, air-gap cold-wallet signing, vendor breach-notification SLA, anti-phishing training for privileged staff, rotate-on-disclosure discipline.
  - **venue** (M23-M28): audit-attestation public-registry verification, out-of-band audit-engagement verification, listing-time source-verification+audit-status gate, wash-trade-rate metrics at marketplace layer, Travel Rule+KYC at privacy-chain boundary, token-unlock calendar integration.
  - **wallet-UX** (M08, M29-M31): per-spender approval audit+revocation, full-address verification+lookalike detection, per-dApp domain+app-store-package allowlist, EIP-712 permit display+signing-risk heuristics.
- **18 Software entries (`OAK-S01`–`OAK-S18`)** in `software/`. Named tools, kits, and malware families separated from Threat Actor Groups (kept distinct from operator Groups). Drainer kits (S01-S07: Inferno, Angel, Pink, Monkey, Venom, Vanilla, Chick — all OAK-G02). DPRK malware families (S08-S11: TraderTraitor, AppleJeus, Manuscrypt, 3CX trojan — all OAK-G01). APT43/Kimsuky (S12 JADESNOW — OAK-G07). Commodity infostealers (S13-S15: RedLine, Lumma, AsyncRAT — ecosystem-wide). Crypto-specific tooling with documented weaknesses (S16 Profanity, S17 jaredfromsubway, S18 Pump.fun-style bundlers).
- **209 machine-readable relationships** emitted in `tools/oak.json` schema v2: 127 `mitigates` edges (M→T), 70 `uses` edges (S→T), 12 `uses` edges (G→S). Lets vendors and risk teams query OAK programmatically.
- **`tools/oak.json` schema bumped to v2.** Tactics + Techniques retain v1 shape; new top-level keys: `mitigations`, `software`, `relationships`.
- **`tools/export_json.py` extended.** Parses the two new axes and emits the relationship graph; backward compatible with consumers of the v1 Tactic/Technique slice.
- **Website MVP extended** (`src/App.tsx`, `scripts/build-site-data.mjs`, `src/styles.css`): new `Mitigations` and `Software` workspace views with hash routes (`#/mitigations`, `#/software`); navigation menu, list grids, and document viewer integration; siteData.stats bumped with `mitigations`, `software`, `relationships` counts.
- **21 new BibTeX entries** in `citations.bib`: drainer-kit forensic sources (zachxbtmonkey2023, scamsniffer2024pink, scamsniffer2024lineage); DPRK malware-family advisories and vendor reports (cisaaa22108a, cisaaa21048a, chainalysisdprktradertraitor, chainalysiskucoinlazarus, mandiant3cx2023, mandiantucsx2023, mandiantcoincheck2018); commodity-infostealer + Pump.fun bundler sources (redlineflashpoint2021, opmagnus2024, lummasekoia2023, lummatakedown2025, clickfixproofpoint2024, asyncratorigingithub2019, asyncratmandiant2023, pumpfunbundlerbubblemaps2024, jitobundlepolicies2024, pumpfunlaunchruganalytics2024).

### Phase Q additions (parallel-agent run, 6 agents)

- 1 new Technique: T6.004 Audit-Pending Marketing Claim (4th standalone T6 entry) — operator markets a deployment as having an audit "in progress" / "scheduled" / "pending publication" without a verifiable engagement, then ships exploit-class code under the social cover the marketing claim provides.
- 4 new worked examples (total 46): Mt. Gox 2014 (~850k BTC; T11 foundational case; transaction-malleability-narrative reframed by 2015–2020 WizSec on-chain forensics; DOJ Vinnik 2017 indictment + 2024 plea + Karpeles 2019 Japanese court verdict; 2024 trustee distributions to creditors); Bitfinex 2016 (119,756 BTC / ~$72M-at-time / ~$4.5B-at-recovery; T11.001 broadly construed via BitGo 2-of-3 multisig co-signing API compromise; DOJ Lichtenstein/Morgan 2022 arrest + 2023 guilty plea + 2024 sentencing — confirmed attribution chain; canonical socialised-loss recovery via BFX-token); Phemex January 2025 (~$73M; T11 hot-wallet drain; G01-inferred-strong via Chainalysis / SlowMist / Merkle Science / ZachXBT laundering-fingerprint analysis); Vee Finance September 2021 (~$35M; T9.001 + T9.002 Avalanche Pangolin-pair oracle/flash-loan exploit on a thin-input price source).
- 1 new Threat Actor: OAK-G07 APT43 / Kimsuky (DPRK financial-funding sub-cluster, distinct from G01 TraderTraitor and G04 IT-worker scheme). **Confirmed** attribution: OFAC JY1938 (Nov 2023) + Mandiant March 2023 attribution report + ROK MOFA 2023 independent sanctions + BfV/NIS 2023 joint German-Korean cybersecurity advisory. external Group ID G0094 cross-anchor.
- 39 new citations across Mt. Gox (9), Bitfinex (10), Phemex (6), Vee Finance (9), and G07 Kimsuky (5) contexts.

### Phase K additions (parallel-agent run, 6 agents)

- 1 new Technique: T2.004 Initial-Liquidity Backdoor (operator-retained backdoor authority embedded at pool-creation transaction; distinct from T2.001/T2.002/T2.003).
- 4 worked examples (total 25): The DAO June 2016 (T9.005 historical foundational case; ~$60M / ~$5B at 2024 ETH; Ethereum hard fork July 2016); KuCoin September 2020 (T11 + G01-attributed; ~$281M; ~84% recovered via coordinated industry response — high-water mark for exchange-hack recovery rate); Wintermute September 2022 (T11 broadly construed; ~$160M via Profanity vanity-address vulnerability disclosed by 1inch 5 days prior — known-vulnerability-not-rotated failure mode); Mixin Network September 2023 (T11.001 broadly construed; ~$200M via cloud-database compromise; flagged for v0.x T11.001 sub-classification).
- 1 new Threat Actor: OAK-G04 DPRK IT-Worker Placement Scheme. **Confirmed** attribution: 2022 joint advisory (Treasury/State/FBI), 2023 OFAC designation of Chinyong IT Cooperation Company, 2024 DOJ conviction of Christina Marie Chapman (laptop farm; 102-month sentence Jul 2025), 2026 OFAC designation of six individuals + two entities for ~$800M in 2024 DPRK IT-worker fraud. Distinct from OAK-G01 (direct cyber attacks).
- 24 new citations added across The DAO, KuCoin, Wintermute, Mixin, G04, T2.004 contexts.

### Phase J additions (parallel-agent run, 6 agents)

- 4 new Techniques: T1.005 Hidden Fee-on-Transfer (gradient extractive cost via static-but-conditional fee logic), T6.003 Audit-of-Different-Bytecode-Version (audit-firm certificate exists but for a different bytecode than deployed), T7.006 DeFi Yield-Strategy Laundering (yield-user persona as cover), T10.005 Light-Client Verification Bypass (cryptographic-primitive layer flaws in zk-bridge / light-client architectures; canonical example: Verichains "Dragonberry" Cosmos-SDK ICS-23 disclosure 2022).
- 1 worked example: examples/2024-10-inferno-drainer-handover.md — service-level operator-profile of the Inferno Drainer ecosystem and its October 2024 transfer of operations to Angel Drainer (~22-43% drainer-service market share through 2024 per SlowMist).
- 1 new Threat Actor: OAK-G03 Russian-attributed crypto-laundering-infrastructure cluster (Garantex / Grinex / A7A5 lineage). **Confirmed** attribution: OFAC designations Apr 2022 + Aug 2025; DOJ EDVA indictment Feb 2025 naming Aleksej Besciokov and Aleksandr Mira Serda; multinational coordinated takedown March 2025; arrest in Kerala India March 12 2025. Distinct from OAK-G01 (DPRK-state-aligned) and OAK-G02 (drainer-as-a-service).
- 9 new citations: verichainsdragonberry2022, soksnarkvulns2024, xie2022zkbridge, zkbugtracker (T10.005); ofac2022garantex, doj2025garantex, treasury2025garantexnetwork, chainalysis2025garantex, trmlabs2025grinex (G03).

### Added — taxonomy

- 10 Tactics: T1 Token Genesis, T2 Liquidity Establishment, T3 Holder Capture, T4 Access Acquisition, T5 Value Extraction, T6 Defense Evasion, T7 Laundering, T8 Operational Reuse (operator-behaviour kill chain); T9 Smart-Contract Exploit (protocol-layer attacks); T10 Bridge and Cross-Chain (bridge-infrastructure attacks). T9 and T10 collectively cover the two largest classes of public DeFi losses by aggregate dollar value.
- 43 Techniques across the 11 Tactics, each with the full per-Technique template populated (Description, Observed indicators, Detection signals, Real-world examples, Reference implementations, Mitigations, Citations, Discussion).
- T2.003 Cross-Chain Locked-Liquidity Spoof — extends T2.002 to setups where the lock receipt is on a different chain from the actual liquidity pool; cohort-scale framing per TM-RugPull / SolRPDS / Chainalysis (no canonical headline incident at v0.1).
- T5.005 Treasury-Management Exit — substantive misuse of legitimate team-multisig authority. Canonical regulatory-record case: SafeMoon (cross-referenced from `examples/2023-11-safemoon-charges.md`); cohort reference: Polywhale Finance soft-rug pattern.
- T5.006 Vesting Cliff Dump — coordinated team / investor token sales at scheduled vesting unlock events. Cohort framing per token-unlock-tracker data (TokenUnlocks/Tokenomist, CryptoRank, DefiLlama Unlocks).

Worked examples added (3, total 20):

- examples/2021-10-cream-finance.md — Cream Finance Oct 27 2021 incident (~$130M); canonical T9.001 + T9.002 chain via yUSDVault book-value oracle manipulation. Cream's three 2021 incidents (Feb $37M, Aug $19M, Oct $130M) form a recurring-target pattern noted in the Discussion.
- examples/2022-06-harmony-horizon.md — Harmony Horizon Jun 23-24 2022 (~$100M); canonical T10.001 + G01 case (2-of-5 multisig key compromise; ~$96M Tornado Cash laundering; FBI Lazarus attribution Jan 2023). Together with Ronin forms the "2022 Lazarus bridge wave".
- examples/2023-07-multichain.md — Multichain Jul 6 2023 (~$126M); canonical T10.001 broadly construed; attribution explicitly marked **inferred-weak** (external-compromise vs insider-action vs wind-down hypotheses publicly debated, Singapore court ruling fanned insider suspicions).
- T9.005 Reentrancy — historical-anchor Technique (The DAO 2016 origin reference) with modern variants documented (cross-protocol reentrancy, ERC-777 / ERC-721 / ERC-1155 hook-based reentrancy). Most post-2021 variants chain with T9.002.
- T10.004 Optimistic-Bridge Fraud-Proof Gap — architecture-class Technique covering watcher-network insufficiency, challenge-window-too-short, and dispute-game incentive failures (`[hollowvictory2025]` arXiv ref).
- T7.005 Privacy-Chain Hops — third orthogonal laundering rail alongside T7.001 (mixers) and T7.003 (cross-chain bridges). Defender asymmetry is highest of the T7 class — privacy-chain leg is not on-chain-traceable by design; mitigation concentrated at venue compliance + Travel Rule + post-emergence inferential heuristics.

Worked examples added (2, total 17):

- examples/2023-03-euler-finance.md — canonical T9.002 + T9.004 chain (~$197M; missing solvency check on `donateToReserves`; full recovery via on-chain message-channel negotiation with self-identified attacker "Jacob").
- examples/2021-08-poly-network.md — canonical T9.004 case (~$611M; inter-contract privilege-boundary failure; full return within ~15 days; "Mr. White Hat" framing controversy as a teaching point on attacker-return outcomes).
- T1.004 Blacklist / Pausable Transfer Weaponization — generic T1 + T6 modifier; admin-controlled blacklist or pausable predicate gates the transfer-logic path.
- T4.006 WalletConnect Session Hijack — entry-vector-specific framing distinct from T4.001/T4.002; canonical case the September 2024 fake "WalletConnect" Google Play campaign (~$70K stolen via 150+ victims).
- T6.002 Fake Audit-Claim — second standalone T6 Technique; ATMA and Lymex cases per CertiK brand-misuse advisory; adjacent reference to the Swaprum CertiK-audited rug pull illustrating the limits of audit-coverage-of-record.
- T8.002 Cross-Chain Operator Continuity — multi-chain operator-profile attribution surface; canonical reference for modern OAK-G01 attribution methodology.

Worked example added (1, total 15):

- examples/2024-07-wazirx.md — canonical OAK-T11.001 + T11.003 + G01 chain (~$234.9M; multisig contract modification mechanism; ~85% recovery via 2025-10 restructuring scheme).
- T11 (Custody and Signing Infrastructure) added as a new top-level Tactic — the Bybit / WazirX / Atomic Wallet incident class. >$1.8B in losses across the three canonical cases alone. T11 elevates this attack category from off-chain footnote (in earlier v0.1 drafts) to a first-class Tactic with three Techniques: T11.001 Third-Party Signing/Custody Vendor Compromise (Bybit, WazirX), T11.002 Wallet-Software Distribution Compromise (Atomic Wallet), T11.003 In-Use Multisig Smart-Contract Manipulation (WazirX-specific contract-modification mechanism).
- T1 expanded with T1.003 Renounced-But-Not-Really (Proxy-Upgrade Backdoor) — generic T1 + T6 modifier covering proxy-pattern, EIP-1967 admin-slot, AccessControl-role, and dependency-contract authority retention sub-patterns. Canonical case: Shido staking-contract incident (~4.3B SHIDO drained via post-renouncement proxy upgrade).
- T6 (Defense Evasion) populated with its first standalone Technique: T6.001 Source-Verification Mismatch — generic evasion pattern that modifies T1 / T9 source-readable Techniques; deterministic-recompile-against-verified-source is the canonical detection methodology; tooling-mature for contributor implementation.
- T4 expanded with three high-frequency sub-Techniques: T4.003 Address Poisoning (Tsuchiya et al. 2025 USENIX Security cohort: ~17.3M poisoning transfers on Ethereum since Apr 2023; canonical $68M WBTC case May 2024 per Chainalysis), T4.004 Allowance/Approve-Pattern Drainer (distinct from T4.001 Permit2-specific; on-chain `Approval` event is the authority artefact), T4.005 setApprovalForAll NFT Drainer (canonical: Lawliet $2.7M Bored Ape phishing Jan 2022; Discord-server-compromise as dominant entry vector).
- T7 expanded with three high-frequency sub-Techniques: T7.002 CEX Deposit-Address Layering (canonical: 109 deposit addresses received >$10M each in illicit funds in 2023 per Chainalysis 2024 Money Laundering report), T7.003 Cross-Chain Bridge Laundering (canonical: Lazarus Group laundered the full $1.4B Bybit aftermath through THORChain in ~10 days with $12M in fees accruing to THORChain node operators per CoinDesk reporting; T7.003 is now the dominant post-Tornado-Cash-sanctions Lazarus laundering rail), T7.004 NFT Wash-Laundering (cohort: 262 users with >25 self-financed NFT sales each in 2021 per Chainalysis; ~$8.9M operator profit; <1% of total crypto-wide laundering by volume but high per-transaction value).
- T9 Techniques: T9.001 Oracle Price Manipulation (Mango Markets canonical), T9.002 Flash-Loan-Enabled Exploit (Beanstalk and Euler canonical), T9.003 Governance Attack (Beanstalk canonical), T9.004 Access-Control Misconfiguration (Wormhole canonical).
- T10 Techniques: T10.001 Validator/Signer Key Compromise (Ronin, Harmony Horizon, Multichain), T10.002 Message-Verification Bypass (Nomad canonical; Wormhole cross-classified), T10.003 Cross-Chain Replay (pattern characterisation).
- T6 (Defense Evasion) intentionally has no standalone Techniques in v0.1; evasion patterns are listed as parent tactics on the Technique they modify (e.g., OAK-T2.002 lists T2 + T6). Standalone T6 entries are scheduled for a v0.x update — see ROADMAP.

### Added — sources

- 31 BibTeX entries in `citations.bib`. Mix of academic citations (USENIX Security, IEEE S&P, ACM SIGMETRICS, ACM CODASPY, ACM WWW, arXiv preprints, including Zhou et al. 2023 SoK as the academic taxonomy of DeFi-protocol-layer attacks), federal-court records (U.S. SEC press release and complaint, U.S. CFTC press release on Mango Markets), regulatory designations (U.S. Treasury OFAC press release on Tornado Cash), and authoritative industry references (Chainalysis, Mandiant, SlowMist, TRM Labs, EigenPhi, Elliptic, Neodyme, Solana Foundation, Cointelegraph, Decrypt, rekt.news, dYdX). No live attacker infrastructure is linked.
- Two arXiv-tracked papers integrated as primary citations for slow-extraction and operator-cluster analysis: Tran et al. 2025 ("Fragmented Rug Pull") for OAK-T5.002 and Liu et al. 2025 (subgraph-based sybil detection, with explicit caveat about its airdrop-domain origin) for OAK-T3.001 / T8.001.

### Added — worked examples

8 full case studies under `examples/`, each cross-linking to the relevant Technique pages:

Operator-behaviour incidents:

- `2021-10-anubisdao.md` — T5.001 → T7.001 chain (Ethereum, ~13,556 ETH / ~$60M).
- `2021-11-squid.md` — T1.001 + T5.001 + T8.001 chain (BNB Chain, ~$3.38M direct / ~$19.3M cumulative cluster).
- `2022-08-curve-dns-hijack.md` — T4.002 → T7.001 chain (Ethereum, ~$575K).
- `2023-jaredfromsubway-mev.md` — T5.004 ongoing operator profile (Ethereum, EigenPhi-tracked).
- `2023-11-safemoon-charges.md` — T2.002 (BNB Chain, U.S. SEC complaint).

Smart-contract-exploit incidents:

- `2022-04-beanstalk.md` — T9.002 + T9.003 + T7.001 chain (Ethereum, ~$182M, governance attack via $1B Aave flash loan).
- `2022-10-mango-markets.md` — T9.001 (Solana, ~$110M, oracle price manipulation; CFTC enforcement, 2025 vacatur of criminal convictions on venue/materiality grounds).

Bridge incidents:

- `2022-02-wormhole.md` — T9.004 / T10.002 boundary case (Ethereum ↔ Solana, ~$325M, missing guardian-account validation; loss replaced by Jump Crypto).
- `2022-03-ronin-bridge.md` — T10.001 + G01 (Ethereum ↔ Ronin, ~$625M, validator-key compromise via LinkedIn-delivered social-engineering payload; FBI/Treasury Lazarus attribution; >$468M laundered through Tornado Cash).
- `2022-08-nomad-bridge.md` — T10.002 (multi-chain, ~$190M, post-upgrade trusted-root vs untrusted-root collision; canonical "mob attack" multi-actor exploitation pattern; ~$22M recovered).

Off-chain entry vector with on-chain manifestation:

- `2025-02-bybit.md` — G01 Lazarus-attributed (~$1.46B, third-party-vendor supply-chain compromise of Safe{Wallet}; the single largest crypto-theft event on the public record; FBI IC3 attribution).

Coverage spans more than half of the v0.1 Techniques across 11 examples, exceeding the v0.1 launch criterion of "≥5 Techniques with named real-world example case studies."

### Added — community files and process

- `README.md` with prominent non-affiliation banner, scope summary, repository layout, dual-license declaration, and contribution path.
- `DISCLAIMER.md` — informational-use disclaimer; trademark notice.
- `LICENSE-content` (CC-BY-SA 4.0) for knowledge content; `LICENSE-code` (MIT) for tooling.
- `CONTRIBUTING.md` — PR-based submission process, defender's-eye-view per-Technique template, writing-style rules, 7-day first-response SLA.
- `CODE_OF_CONDUCT.md` — Contributor-Covenant-style; emphasises receipts over opinions and honest coverage claims.
- `SECURITY.md` — split disclosure policy (vulnerabilities in OAK itself vs sensitive incident intelligence); off-list contact via subject-line prefixes.
- `COVERAGE.md` — honest tactic-level + per-Technique coverage matrix against the first reference implementation. Single-implementation matrix at v0.1; expands to a two-dimensional matrix at v0.5.
- `.github/ISSUE_TEMPLATE/` — three templates for new-Technique proposals, real-world examples, and Reference-implementation coverage updates; plus a contact-link config pointing reporters to `SECURITY.md` and `CODE_OF_CONDUCT.md` for sensitive reports.
- `.github/PULL_REQUEST_TEMPLATE.md` — type checklist, coverage-impact prompt, DCO sign-off reminder.

### Added — tooling

- `tools/check_citations.py` — parses `citations.bib`, validates entry structure, and cross-references every `[key]` citation in `tactics/`, `techniques/`, and `examples/` against the bib.
- `tools/export_json.py` — parses Tactic and Technique markdown and emits a single schema-versioned JSON document at `tools/oak.json` for vendors and downstream consumers.
- `tools/oak.json` — machine-readable export of the v0.1 taxonomy (8 Tactics, 15 Techniques, parent-tactic relations, citation keys).

### Added — CI

Four GitHub Actions workflows:

- `markdown-lint.yml` — lints all `.md` files using `markdownlint-cli2`. Configuration in `.markdownlint.json` enables sensible defaults (line-length disabled, fenced code-block style, inline HTML allowed).
- `link-check.yml` — runs `lychee` over all markdown links, with caching; weekly schedule plus per-PR runs.
- `citation-format.yml` — runs `tools/check_citations.py`.
- `validate-export.yml` — regenerates `tools/oak.json` and fails CI if it drifts from the committed file.

### Added — Data Sources axis

OAK's fourth top-level axis, alongside Tactics, Techniques, and Threat Actors:

- 12 OAK-DS-NN entries documented in `data-sources/`. On-chain telemetry: DS-01 token deployment events, DS-02 LP pool events, DS-03 ERC-20 / ERC-721 / ERC-1155 approvals, DS-04 permit signatures, DS-05 oracle price feeds, DS-06 mint / burn events, DS-07 trade / swap events, DS-08 bridge validator messages, DS-09 funder graph (derived), DS-10 cross-chain bridge flows. Mempool / pre-block: DS-11 mempool order flow. Off-chain: DS-12 off-chain CTI feeds.
- Per-Technique pages will progressively add explicit `Data Sources:` references in their headers across v0.x updates; v0.1 introduces the axis without backfilling every Technique.

### Added — Glossary

`GLOSSARY.md` — defender-perspective vocabulary covering recurring terms across `tactics/`, `techniques/`, `actors/`, `examples/`, and `data-sources/`. Brings a newcomer up to speed on OAK terminology without requiring them to read the relevant pages first.

### Added — Threat Actors axis

A third top-level OAK axis alongside Tactics and Techniques, documented in `actors/README.md`:

- `OAK-Gnn` identifier scheme parallel to `OAK-Tn` for Tactics; IDs stable for v0.x and never reused.
- Explicit attribution-strength language (`confirmed` / `inferred-strong` / `inferred-weak`) on every Group page.
- v0.1 Groups: **OAK-G01 Lazarus Group / DPRK-attributed** (the largest single attribution category in modern crypto theft per `[chainalysis2024dprk]`: ~$1.34B / 47 incidents in 2024 = 61% of all attacker-stolen value globally; ~$2.02B in 2025; ~$6.75B all-time per Chainalysis), and **OAK-G02 Drainer-as-a-Service operators** (Inferno → Angel → successors; service-layer continuity-of-infrastructure framing per `[slowmist2024report]`).
- Intentional overlap with OAK-T8 (Operational Reuse) clarified: T8 is the *defender capability* that produces Group attributions; OAK-Gnn entries are the *outputs* of that capability when stable enough to publish.

### Decisions captured

- **Naming:** OAK = "OnChain Attack Knowledge". Pronounced "oak". Repo at `github.com/onchainattack/oak`. Domain `onchainattack.org` (acquired April 2026).
- **Identifier scheme:** `OAK-Tn` for Tactics, `OAK-Tn.NNN` for Techniques. Stable for v0.x; new top-level Tactics deferred to v1.0+. IDs never reused; deprecations marked `Maturity: deprecated` with pointers to superseding Techniques.
- **License split:** content under CC-BY-SA 4.0 to match Wikipedia / Creative Commons conventions for shared knowledge; tooling under MIT.
- **Detection-first framing:** the per-Technique template leads with Observed indicators and Detection signals. The repository documents observable patterns from the defender's perspective, not procedures. CONTRIBUTING.md's writing-style rules make this explicit.

---

Once the v0.1 tag lands, this entry will be renamed `[v0.1.0]` with the release date.
