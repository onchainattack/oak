# OAK v0.1 — Taxonomy Gaps

This document explicitly enumerates what OAK v0.1 does *not* cover and why. It is published as part of the v0.1 release because a framework that quietly excludes large attack classes invites legitimate criticism, while a framework that documents its scope honestly invites contribution.

---

## What v0.1 does cover

OAK v0.1 covers six populated axes:

- **Tactics × Techniques** (the matrix): 14 Tactics covering the operator-behaviour kill chain (T1-T8), smart-contract exploits (T9), bridge and cross-chain (T10), custody and signing infrastructure (T11), NFT-specific patterns (T12), account abstraction (T13), and validator/staking/restaking (T14). 62 Techniques across the matrix.
- **Mitigations** (`OAK-MNN`): 40 reusable defences across five classes (detection, architecture, operational, venue, wallet-UX), each mapping many-to-many to Techniques.
- **Software** (`OAK-SNN`): 40 named tools, kits, and malware families (drainer kits, DPRK macOS family, ransomware binaries, commodity loaders and post-exploitation, infostealers, crypto-specific tooling).
- **Threat Actors / Groups** (`OAK-Gnn`): 18 tracked operator clusters with explicit attribution-strength language (DPRK clusters, Russian-cybercrime ecosystem, drainer-as-a-service, Iranian financially-motivated, affiliate-collectives).
- **Data Sources** (`OAK-DS-NN`): 12 telemetry-input identifiers covering on-chain telemetry, mempool/pre-block telemetry, and off-chain CTI feeds.
- **Worked Examples**: 142 per-incident and operator-profile write-ups spanning 2011-2025; every Tactic pillar has canonical worked-example anchors.

The relationship graph (`mitigates`, `uses`, `targets`, `subtechnique-of` edges; 416 edges at v0.1) connects entries across axes and is emitted machine-readably in `tools/oak.json` schema v2.

The largest classes of public crypto-theft losses are within v0.1 scope: T11 (custody compromise; the off-chain entry vector behind Bybit Feb 2025 ~$1.5B, DMM Bitcoin May 2024 ~$305M, Radiant Capital Sep 2024 ~$50M, Phemex Jan 2025 ~$73M, Indodax Sep 2024 ~$22M, Poloniex Nov 2023 ~$120M, WazirX Jul 2024 ~$235M); T9 (smart-contract exploits; Euler Mar 2023 ~$197M, Mango Markets Oct 2022 ~$117M, KyberSwap Nov 2023 ~$48M, Hedgey Apr 2024 ~$44.5M, Sonne May 2024 ~$20M, UwU Jun 2024 ~$20M, Cetus May 2025 ~$220M); T10 (bridge incidents; Wormhole Feb 2022 ~$325M, Ronin Mar 2022 ~$625M, Harmony Jun 2022 ~$100M, Nomad Aug 2022 ~$190M, BSC Token Hub Oct 2022 ~$586M, Multichain Jul 2023 ~$126M, HTX/HECO Nov 2023 ~$110M, Orbit Jan 2024 ~$81.5M).

---

## Whole pillars still out of scope at v0.1

The following attack categories are **not** covered by any v0.1 Tactic.

### 1. Severity / loss scaling

OAK v0.1 has no formal severity dimension. Combining federal-record cases (Bybit ~$1.5B, Ronin ~$625M, Mt. Gox ~850k BTC, Plus Token ~$2B+) with per-victim drainer events (~thousands per victim at high volume) into a single matrix loses information. A `severity:` field with documented bands could be added in v0.x without breaking schema.

### 2. Timing dimension

When in a token's or protocol's lifetime does each Technique typically fire? Day 0? Day 30? Year 2? This is a useful predictive signal for defenders and is recoverable from the cited datasets but not encoded in the v0.1 schema.

### 3. Chain coverage

The `Chains:` header in each Technique covers EVM, Solana, Sui, Aptos, and cross-chain at v0.1. Not yet covered: Bitcoin (especially Ordinals, BRC-20, Runes), Cosmos chains beyond bridge cases, Tron beyond passing references, TON, Polkadot ecosystem beyond Acala. Each will need at minimum a chain-specific Technique mapping pass when the framework expands.

---

## Sub-Techniques missing inside already-covered Tactics

These are Techniques that fit cleanly inside an existing v0.1 Tactic but are flagged as v0.x targets.

### T1 — Token Genesis (additions for v0.x)

- Hidden owner-equivalent functions implemented in assembly to evade source-level static analysis.
- Maximum-wallet / maximum-transaction restrictions weaponised to prevent specific addresses from exiting.
- Initial-liquidity-providing-and-removing patterns where the deployer operator-substrate provides initial liquidity then removes during specific market windows.

### T4 — Access Acquisition (additions for v0.x)

- QR-code phishing as an entry vector — relevant across T4 generally; merits a standalone Technique stub if the QR-specific surface (mobile-wallet UX, malicious WalletConnect QR codes) warrants one.
- iOS / Android push-notification compromise as a wallet-extension distribution-channel surface (CoinStats Jun 2024 is the canonical case; OAK-T11.002 broadly construed at v0.1).

### T7 — Laundering (additions for v0.x)

- DEX-aggregator routing-based laundering (using DEX aggregators with sufficient routing complexity to obscure transaction provenance).
- Restaking / liquid-staking laundering (deposit-as-restaker, withdraw-via-AVS).
- Stablecoin-issuer-coordination patterns where the laundering chain depends on freezing or non-freezing decisions by stablecoin issuers (USDC, USDT, BUSD historical, etc.).

### T8 — Operational Reuse (additions for v0.x)

- Off-chain operator fingerprinting (TLS, hosting, code-style, social-handle-pattern reuse).
- Time-of-day / geographic operator profiling.

### T9 — Smart-Contract Exploit (additions for v0.x)

- Cross-contract logic flaws / re-initialisation attacks (the structural class beyond simple delegatecall flaws).
- Diamond-pattern-specific facet-audit-incomplete cases (Li.Fi Jul 2024 is the canonical 2024 worked example; more cases anticipated as diamond-pattern adoption grows).
- Fork-substrate-vulnerability-not-mitigated-at-fork-time as a recurring meta-class (Hundred → Midas → Sonne → Onyx → Resupply cohort; Curio fork of MakerDAO; multiple Uniswap-V2-fork rugs; the meta-class is documented across multiple worked examples but not yet articulated as a standalone Technique).

### T11 — Custody and Signing Infrastructure (additions for v0.x)

- T11.004 Insufficient-Entropy Key Generation (proposed; canonical case is Wintermute Sep 2022 / Profanity vanity-address generator).
- Multi-chain key-store co-location (canonical case is Poloniex Nov 2023; the simultaneous-multi-chain extraction pattern as architectural anti-pattern).
- Custodial-private-key-storage trading-bot anti-pattern (canonical case is DEXX Sep-Nov 2024).
- Legacy-version-maintenance attack-surface (canonical case is GMX V1 Jul 2025; the operator-side decision to maintain deprecated protocol versions as residual exploitable surface).

### T12 — NFT-Specific Patterns (additions for v0.x)

- NFT-collateral lending exploits (the broader class beyond the foundational T12 trio).
- Marketplace listing manipulation beyond OpenSea front-running stale-listing.
- Real-world-asset (RWA) NFT bridge surfaces.

### T13 — Account Abstraction Attacks (additions for v0.x)

- Specific paymaster-vulnerability subclasses as the ERC-4337 deployment substrate matures.
- Smart-wallet recovery-flow exploitation (Loopring Jun 2024 was a related case at OAK-T11.002 broadly construed, but the smart-wallet-recovery-flow class deserves explicit T13 coverage).
- Cross-bundler MEV variants beyond T13.002.

### T14 — Validator/Staking/Restaking Attacks (additions for v0.x)

- Specific AVS slashing-condition exploitation cases as EigenLayer and similar restaking platforms mature.
- LRT (liquid restaking token) pricing manipulation (Bedrock Apr 2025 is a related case at OAK-T9.001; restaking-protocol-specific subclass deserves explicit T14 coverage).
- Bridge-validator-set economic-incentive misalignment.

---

## Speculative Techniques pending field anchor

Techniques published in v0.1 with `Maturity: speculative` because the threat surface is well-characterised in academic / protocol-research literature but no field-confirmed external-attacker incident anchors the Technique. Each is held in this section until a primary-source-anchored externally-attributed incident is catalogued, at which point it is promoted to `emerging` or `observed` and removed from this list.

- **OAK-T14.001 — Slashing-Condition Exploit.** Adversarial use of PoS slashing predicates (slashing-as-griefing, slashing-as-MEV, mass-slashing via consensus-client exploit, slashing-claim race). The dominant observed failure mode at v0.1 is operator-side self-slashing (validator misconfiguration, DVT failover bugs, infrastructure maintenance — e.g., Ethereum 2025-09 SSV-Network correlated event). Adversarial-causation cases exist in academic literature (`[neuder2021posattacks]`, `[a16zslashingecon]`, `[polkadotoffenses]`) but the verified-external-attacker-causation worked-example catalogue is empty. Promote to `emerging` once such an incident is anchored.

---

## Missing methodological axes

Beyond Techniques themselves, OAK v0.1 lacks several first-class concepts that comparable frameworks treat as separate axes.

### MITRE ATT&CK STIX 2.1 export

Tactics × Techniques × Mitigations × Software × Groups × Data Sources × Relationships are emitted in OAK-native `tools/oak.json` schema v2 at v0.1. STIX 2.1 export (compatible with TIPs, SIEMs, and other ATT&CK-aware tooling) is a v0.x post-launch work item.

### MITRE-style Campaigns

MITRE ATT&CK has Campaigns as a discrete object class (multi-incident threads attributed to a Group operating in a discrete operational period). OAK Worked Examples cover individual incidents; cross-incident Campaign aggregation (e.g., the 2022-2024 OAK-G01 TraderTraitor cohort of exchange-vendor compromises) is documented in cross-references but not as a discrete first-class object. v0.x candidate.

### MITRE-style Assets

MITRE ATT&CK ICS has Assets as a discrete object class (what is being attacked). For crypto: token contracts, AMM pools, oracle contracts, multisig wallets, bridge contracts, validator key sets, custody-vendor signing infrastructure, etc. OAK Techniques reference assets in prose but not as a discrete first-class object. v0.x candidate.

### MITRE-style Data Components

MITRE ATT&CK has Data Components as sub-entities of Data Sources representing specific event types. OAK Data Sources are flat at v0.1. Sub-component decomposition (e.g., DS "On-chain transaction" → "Token transfer event", "Approval event", "Pool-creation transaction") is a v0.x candidate.

### False-positive characterisation

The per-Technique template includes "false-positive notes" but at v0.1 these are mostly placeholders. Real FP analysis (rates, root causes, mitigations) is a v0.x work item.

### Detection-test corpus

The cited datasets (`[solrpds]`, `[tmrugpull2026]`, `[frp2025]`, `[xia2021mintdump]`, `[victor2021washtrade]`) collectively contain enough labelled examples that an evaluation harness could ship as a separate `oak-eval/` repo. This is one of the highest-leverage post-v0.1 work items, because it operationalises every "Detection signal" claim across the framework.

---

## Pre-launch verification debt

Tracked at the repository level rather than the per-axis level:

- ~~**~520 vendor-side citation stubs** marked `OAK v0.1 — pending verification`~~ — **resolved at v0.1**. Bulk URL audit completed via `tools/verify_citations.py`; all 964 entries now carry an explicit status (`verified` / `verified-with-caveat` / `url-not-pinned` / `url-broken`); 0 entries remain in `pending verification`. The residual `url-not-pinned` set (entries where the canonical URL was not findable at v0.1 audit) is community-paced post-launch sweep work.
- ~~**Site MVP per-Technique detail page** rendering the relationship graph~~ — **delivered at v0.1**. See `src/App.tsx`.
- **README / CONTRIBUTING / COVERAGE / CHANGELOG** kept current with each phase commit.

---

## How this file evolves

When a v0.x update closes an item, that item is deleted from this file (not crossed-out — the document tracks current scope, not history; history lives in `CHANGELOG.md`). Items remaining are the live gap inventory at all times. Contributors are encouraged to file proposals against any item using the relevant template in `.github/ISSUE_TEMPLATE/` (issue templates pending v0.x).
