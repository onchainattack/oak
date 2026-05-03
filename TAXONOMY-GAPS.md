# OAK v0.1 — Taxonomy Gaps

This document explicitly enumerates what OAK v0.1 does *not* cover and why. It is published as part of the v0.1 release because a framework that quietly excludes large attack classes invites legitimate criticism, while a framework that documents its scope honestly invites contribution.

---

## Promoted to canonical (v0.x cycle)

Candidates from this file that have been promoted from `draft` to `emerging` and now live as canonical Technique files under `techniques/`. Each entry retains a one-line audit-trail pointer to the new file; substantive framing has moved to the technique file.

- **OAK-T1.006 — Honeypot-by-Design** — promoted; see [`techniques/T1.006-honeypot-by-design.md`](techniques/T1.006-honeypot-by-design.md). Anchored: 2024-Q4 cross-chain honeypot cohort.
- **OAK-T1.007 — Token-2022 Transfer-Hook Abuse** — promoted; see [`techniques/T1.007-token-2022-transfer-hook-abuse.md`](techniques/T1.007-token-2022-transfer-hook-abuse.md). Anchored: 2024–2025 Token-2022 transfer-hook class file.
- **OAK-T6.005 — Proxy-Upgrade Malicious Switching** — promoted; see [`techniques/T6.005-proxy-upgrade-malicious-switching.md`](techniques/T6.005-proxy-upgrade-malicious-switching.md). Anchored: Hyperbridge MMR-proof April 2026; Audius Jul 2022; Magnate Finance Aug 2023.
- **OAK-T6.006 — Counterfeit Token Impersonation** — promoted; see [`techniques/T6.006-counterfeit-token-impersonation.md`](techniques/T6.006-counterfeit-token-impersonation.md). Anchored: Hyperbridge MMR-proof April 2026 (sub-class c bridge-internal-mint).
- **OAK-T9.006 — Subjective-Oracle Resolution Manipulation** (parent) plus four sub-Techniques:
  - **OAK-T9.006.001 — DVM Vote Capture by Economically-Interested Holder** — see [`techniques/T9.006.001-dvm-vote-capture.md`](techniques/T9.006.001-dvm-vote-capture.md). Anchored: Polymarket UMA Ukraine mineral deal March 2025.
  - **OAK-T9.006.002 — Resolution-Spec Ambiguity Exploitation** — see [`techniques/T9.006.002-resolution-spec-ambiguity-exploitation.md`](techniques/T9.006.002-resolution-spec-ambiguity-exploitation.md). Anchored: Polymarket Zelenskyy-suit market July 2025.
  - **OAK-T9.006.003 — Off-chain Resolution-Source Coercion** — see [`techniques/T9.006.003-off-chain-resolution-source-coercion.md`](techniques/T9.006.003-off-chain-resolution-source-coercion.md). Anchored: Polymarket Iran-strike journalist coercion (Times of Israel / Fabian) March 2026.
  - **OAK-T9.006.004 — Operational-Insider Trading on Subjective-Resolution Prediction Markets** — see [`techniques/T9.006.004-operational-insider-trading.md`](techniques/T9.006.004-operational-insider-trading.md). Anchored: Polymarket / Van Dyke / Venezuela DOJ April 2026; Polymarket / IDF reservist / Iran-strike timing (Tel Aviv District Court) February 2026. **Note:** an earlier framing of T9.006.004 in this file used "platform-override of oracle outcome" (Barron Trump / DJT memecoin); that sub-pattern lacks an anchor at v0.1 and is held for a separate v0.x sub-Technique slot.
- **OAK-T11.005 — Operator-side Fake-Platform Fraud** (parent) — promoted; see [`techniques/T11.005-operator-side-fake-platform-fraud.md`](techniques/T11.005-operator-side-fake-platform-fraud.md). Anchored: OneCoin (T11.005.002 historical anchor); CryptoFX (T11.005.002 affinity-fraud); HyperVerse / HyperFund (T11.005.002 global-MLM). Sub-pattern files (T11.005.001 fake-CEX / pig-butchering; T11.005.002 fake-custodian; T11.005.003 compound-operated) remain candidate-only at v0.1 pending the v0.x worked-example pipeline (BeurAx-class, Chen Zhi / Prince Group, Philippines compound, Forsage, CoinDeal, JPEX, Southeast Asia compound cohort, Huione Group laundering substrate).
- **OAK-T13.004 — EIP-7702 Delegation Abuse** — promoted; see [`techniques/T13.004-eip7702-delegation-abuse.md`](techniques/T13.004-eip7702-delegation-abuse.md). Anchored: 2025-05 CrimeEnjoyor cohort.

The promoted entries' substantive framing (definition, sub-classes, detection signals, mitigations, discussion) has moved to the canonical technique files. The expanded prose for each candidate that previously lived in this file has been deleted; the gap inventory below has been trimmed accordingly.

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
- **T1.006 Honeypot-by-Design** — **promoted** to `emerging`; see [`techniques/T1.006-honeypot-by-design.md`](techniques/T1.006-honeypot-by-design.md).
- **T1.007 Token-2022 Transfer-Hook Abuse** — **promoted** to `emerging`; see [`techniques/T1.007-token-2022-transfer-hook-abuse.md`](techniques/T1.007-token-2022-transfer-hook-abuse.md).

### T3 — Pump-and-Dump and Market Manipulation (additions for v0.x)

- **T3.x Influencer-Amplified Promotion-and-Dump** (proposed). Scope: pump-and-dump and rug-pull cases whose *distribution surface* is an external-to-crypto influencer's audience reach (YouTube, X / Twitter, Twitch, podcast, mainstream-celebrity press) rather than a within-crypto coordination channel. Sub-Technique of T3.003 — distinct from the Telegram-coordinated channel-administrator sub-pattern (BPS-class), the bundler-launch sub-pattern, and the DEX-screener-leaderboard sub-pattern enumerated in T3.003's existing discussion section. The structural primitive is *off-platform high-reach social-media-promoter status* — the operator's pre-existing audience is the demand-side amplifier. Two structurally-distinct accountability outcomes recur across the cohort: (a) the influencer / promoter is typically *insulated* from personal criminal liability through the marketing-fee / contractual-promoter framing or via judicial findings of "puffery" (CryptoZoo October 2025) or "non-security" (JENNER); (b) the launch operator (Sahil Arora for JENNER; Frazier Kay for KIDS; Martin Shkreli for DJT; partially-named CryptoZoo dev team) faces civil litigation but rarely produces federal criminal proceedings outside SafeMoon. Canonical cohort cases: CryptoZoo (Logan Paul, December 2021 NFT/ERC-20 dual-launch); Save the Kids / \$KIDS (FaZe Clan + RiceGum + Sommer Ray + Sam Pepper, June 2021); DADDY (Andrew Tate, June 2024 Pump.fun); JENNER (Caitlyn Jenner via Sahil Arora, May 2024 Pump.fun); MOTHER (Iggy Azalea, May 2024); DJT (Martin Shkreli + claimed Barron Trump association, June 2024). The 2021–2024 influencer cohort *predates* the 2024–2026 sovereign / political-endorsement memecoin cohort (HAWK / LIBRA / MELANIA / TRUMP) by 3+ years and is the structural precedent-substrate. The detection signal at the on-chain layer is shared with the existing T3.003 detector (joint-series alignment of price / volume / unique-holder-growth / top-cluster-outflow); the *novel detection axis* is the off-platform promoter-graph layer — promoter-account activity timestamps, promoter-cohort-cluster membership, marketing-contract-disclosure regimes, and influencer-platform monetisation-program participation. See `examples/2021-2026-influencer-amplified-non-memecoin-rug-cohort.md`.

### T4 — Access Acquisition (additions for v0.x)

- **Native-app social phishing on engagement-weighted platforms** (proposed). Scope: phishing campaigns whose distribution surface is a paid-for or engagement-weighted in-platform mechanic that the attacker manipulates to occupy visibility (e.g., comment-pinning, reply-ranking). Distinct from generic phishing because the platform's own mechanics fund the distribution surface. Canonical: Polymarket comment-section campaign Nov 2025 (≥$500K cumulative loss; attackers bought YES+NO shares to anchor pinned phishing comments). See `examples/2025-11-polymarket-comment-section-phishing.md`. Generalises to any engagement-weighted platform (Friend.tech, pump.fun, Farcaster).
- **Pre-token brand-anticipation phishing** (proposed). Scope: phishing campaigns exploiting *the absence* of a token from a high-trust platform — the lure is the official-channel-amplified ambiguity ("airdrop coming soon" → fake claim sites). Distinct from T6.002 (Fake Audit Claim) because no false audit is claimed; the ambiguity is around a future event the platform itself has hinted at. Canonical: Polymarket "POLY airdrop claim" typosquat cohort, accelerating after Polymarket's CMO confirmed future token plans October 2025.
- **T4.x Fake-DEX Clone-Frontend Phishing** (proposed). Scope: phishing campaigns whose distribution surface is *paid-for inventory on a legitimate ad platform* (Google Search ads, X / Twitter promoted posts, Telegram bot traffic, Apple App Store / Google Play Store listings) and whose lure is a *counterfeit deployment of a popular DEX UI* — Uniswap, PancakeSwap, Curve, Raydium, Lido, Stargate, Orbiter, DefiLlama, Zapper, Radiant. The attacker-controlled UI is hosted on a typosquatted / near-miss / homoglyph domain controlled by the attacker from the moment of deployment. **Distinct from T4.002 (Compromised Front-End Permit Solicitation)** at the *substrate* level: T4.002 compromises a real platform's user-facing surface (DNS, registrar, supply-chain JS, BGP); the fake-DEX class **never had a real platform to compromise**. **Distinct from T4.001 / T4.004 / T4.005** in *distribution surface* but not in *on-chain extraction primitive* — the same drainer-kit substrate (Inferno → Angel → AngelFerno; MS Drainer; PhishLab) chains into the existing on-chain Techniques. Four distinguishable distribution sub-surfaces: **(a) Google Search paid ads** (highest-volume; calibration: MS Drainer December 2023, \$59M / 63,210 victims / 10,000+ phishing websites); **(b) X / Twitter paid promoted posts** (calibration: 2025-07-21 Polymarket-using DeFi user \$1.23M loss to fake Uniswap clone); **(c) Telegram bot-driven traffic** (calibration: 2,000\% surge in phishing-bot volume late 2024 per Kaspersky / Group-IB); **(d) App Store fake-DEX wrapper apps** (calibration: Cyble Research and Intelligence Labs 2024 cohort — 22+ counterfeit Android apps impersonating PancakeSwap / SushiSwap / Raydium / Hyperliquid; Median-framework WebView wrapping; 50+ phishing-domain infrastructure). Detection-and-mitigation surface lives at the *ad-platform-side enforcement layer* (Google Ads tracking-template-misuse; X promoted-post review; App Store / Play Store binary review; Telegram bot / channel takedown) rather than at the legitimate-platform infrastructure-hardening layer that resolves T4.002. Aggregate 2024 wallet-drainer ecosystem: \~\$494M per ScamSniffer (67\% YoY increase; 332,000 victim addresses); fake-DEX clone-frontend distribution sub-class is the dominant per-incident shape across the cohort. See `examples/2023-2026-fake-dex-clone-frontend-cohort.md`.

- QR-code phishing as an entry vector — relevant across T4 generally; merits a standalone Technique stub if the QR-specific surface (mobile-wallet UX, malicious WalletConnect QR codes) warrants one.
- iOS / Android push-notification compromise as a wallet-extension distribution-channel surface (CoinStats Jun 2024 is the canonical case; OAK-T11.002 broadly construed at v0.1).

### T5 — Value Extraction (additions for v0.x)

- **Third-party brand-impersonation custodial soft-rug** (proposed). Scope: an off-platform service that brands itself in a legitimate platform's name without contractual basis, accumulates user deposits in operator-controlled custody, and exits citing an unverifiable "hack." Distinct from T5.005 (Treasury-Management Exit) — the operator never had a fiduciary relationship with the platform whose brand they used. Distinct from T4 phishing — users deposited willingly. Canonical: Polycule trading bot Jan 2026 ($230K, Polymarket-branded but unaffiliated, exit-via-"hack" announcement followed by communication blackout). Detection signal at the platform layer: monitoring for off-platform brand-impersonation services through trademark / domain / Telegram-handle surveillance + authoritative third-party-service registry publication. See `examples/2026-01-polymarket-polycule-bot.md`.

### T6 — Defense Evasion (additions for v0.x)

- **T6.005 Proxy-Upgrade Malicious Switching** — **promoted** to `emerging`; see [`techniques/T6.005-proxy-upgrade-malicious-switching.md`](techniques/T6.005-proxy-upgrade-malicious-switching.md).
- **T6.x Trust-substrate shift / vendor-side promise revocation** (proposed). Scope: *non-attack* defender-credibility events in which a vendor-policy decision (or, in adjacent variants, a regulatory action, infrastructure-level policy change, or oracle-resolution-policy change) revokes a load-bearing trust-substrate claim that previously informed user-side threat-model construction. The realised loss is **non-financial** (trust-substrate revocation, cohort-level effect on the broader category's trust posture, competing-vendor user-acquisition opportunities) but structurally significant — the user's effective security posture depends on both (a) the absence of attacks and (b) the persistence of vendor-side trust-substrate claims. Canonical: 2023-05-16 Ledger Recover seed-recovery service announcement collapsing the "seed never leaves the device" trust-substrate claim that had informed Ledger users' threat-model construction since 2016; see `examples/2023-05-ledger-recover-trust-substrate-shift.md`. The case structurally generalises beyond hardware-wallet vendor-policy: (a) vendor-policy decisions that revoke trust-substrate claims (Ledger Recover at v0.1; potential future custodial-services policy changes; potential future wallet-as-a-service policy changes), (b) regulatory / legal-process events that change the operational threat model (sanctions enforcement against mixers; KYC / AML rule changes affecting custody surface), (c) infrastructure-level changes that reshape the defender's mental model (L2 sequencer policy changes; oracle-resolution-policy changes — adjacent to the T9.006.004 platform-override sub-pattern at `examples/2025-03-polymarket-uma-ukraine-mineral-deal.md` and adjacent Polymarket cases). **Distinct from T6.001-T6.004** (defense-evasion-by-attacker-action — fake audit claims, source-verification mismatches). The structural feature is *defense-evasion-by-vendor-policy-change* rather than defense-evasion-by-attacker-action. The framework's credibility depends on documenting how user trust gets revoked even in the absence of a deployed attack. Contributors writing future T6.x trust-substrate-shift worked examples should preserve (a) the non-attack structure, (b) the realised-non-financial-loss dimension, (c) the vendor-communications-during-trust-substrate-shift dimension (the deleted-tweet pattern), (d) the custodian-set jurisdiction footprint dimension where third-party-custodian shapes are introduced, and (e) the cohort-level effect on the broader category's trust posture.
- **T6.006 Counterfeit Token Impersonation** — **promoted** to `emerging`; see [`techniques/T6.006-counterfeit-token-impersonation.md`](techniques/T6.006-counterfeit-token-impersonation.md).
- **Verified-but-malicious frontends** — phishing UIs that bind to real contract addresses but route through attacker-owned helper contracts. SwapKit / Uniswap router impersonators are the canonical 2024-2025 cohort; distinct from T4.002 (Compromised Frontend) because the *frontend* may not be compromised — the malicious helper-contract routing is the load-bearing primitive. v0.x candidate; relationship with T4 surface to be articulated.

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
- **T9.006 Subjective-Oracle Resolution Manipulation** (parent) — **promoted** to `emerging`; see [`techniques/T9.006-subjective-oracle-resolution-manipulation.md`](techniques/T9.006-subjective-oracle-resolution-manipulation.md). Sub-Techniques:
  - **T9.006.001 DVM Vote Capture by Economically-Interested Holder** — promoted; see [`techniques/T9.006.001-dvm-vote-capture.md`](techniques/T9.006.001-dvm-vote-capture.md).
  - **T9.006.002 Resolution-Spec Ambiguity Exploitation** — promoted; see [`techniques/T9.006.002-resolution-spec-ambiguity-exploitation.md`](techniques/T9.006.002-resolution-spec-ambiguity-exploitation.md).
  - **T9.006.003 Off-chain Resolution-Source Coercion** — promoted; see [`techniques/T9.006.003-off-chain-resolution-source-coercion.md`](techniques/T9.006.003-off-chain-resolution-source-coercion.md).
  - **T9.006.004 Operational-Insider Trading on Subjective-Resolution Prediction Markets** — promoted (with the operational-insider definition anchored at Van Dyke / Venezuela DOJ April 2026 + IDF reservist / Iran-strike Tel Aviv District Court February 2026); see [`techniques/T9.006.004-operational-insider-trading.md`](techniques/T9.006.004-operational-insider-trading.md).
  - **T9.006.x — Platform-override of oracle outcome** (held v0.x candidate). Earlier framing of T9.006.004 reserved this slot for the platform-override sub-pattern (Barron Trump / DJT memecoin — UMA voted NO, Polymarket overrode). The sub-pattern lacks a worked-example anchor at v0.1 and is held for a separate v0.x sub-Technique slot (proposed: T9.006.005). The case establishes that platform discretion is a backstop on top of the "decentralised" oracle.

### T11 — Custody and Signing Infrastructure (additions for v0.x)

- T11.004 Insufficient-Entropy Key Generation (proposed; canonical case is Wintermute Sep 2022 / Profanity vanity-address generator).
- Multi-chain key-store co-location (canonical case is Poloniex Nov 2023; the simultaneous-multi-chain extraction pattern as architectural anti-pattern).
- Custodial-private-key-storage trading-bot anti-pattern (canonical case is DEXX Sep-Nov 2024).
- Legacy-version-maintenance attack-surface (canonical case is GMX V1 Jul 2025; the operator-side decision to maintain deprecated protocol versions as residual exploitable surface).
- **Embedded-wallet identity-provider compromise** (proposed). Scope: any wallet whose key derivation runs through a third-party authentication service (email magic-link, OAuth federation, MPC-backed social login — Magic Labs / Privy / Dynamic / Web3Auth). The attack surface is the auth provider's security posture; the on-chain transaction is correctly signed by the provider's key. Canonical: Polymarket account-takeover incidents Sep 2024 + Dec 2025 (both attributed by Polymarket to "third-party login tool"). The widespread "non-custodial" claim collapses back to "as custodial as the auth provider's security posture." See `examples/2024-09-polymarket-magic-labs-takeover.md`.
- **Trader-tooling supply-chain compromise targeting `.env` private keys** (proposed). Adjacent to T11.002 (Wallet-Software Distribution Compromise) but distinct in target cohort: end-user wallet binaries vs. developer-environment plaintext key storage. Canonical: malicious npm `polymarket-clob` package + `dev-protocol` GitHub-org hijack distributing trojan "polymarket-copytrading-bot" repos, Dec 2025 - Apr 2026 (Vidar Stealer infrastructure overlap, DPRK-cohort-fingerprint similarity). Detection signals are off-chain at the package-registry level. See `examples/2026-01-polymarket-trader-tooling-supply-chain.md`.
- **T11.x Cold-storage seed-phrase exfiltration at rest** (proposed). Scope: third-party storage services (password managers, cloud-backup services, plaintext or weakly-encrypted at-rest seed-phrase storage) whose compromise produces seed-phrase material to attackers without any direct user-action signing or wallet-software compromise. Two structurally-distinct sub-patterns: **(a) user-initiated plaintext-equivalent storage** — the user explicitly stores seed-phrase material in a third-party service (LastPass Secure Notes; 1Password / Bitwarden Secure-Notes-equivalent; password-protected notes in productivity tools), with vault encryption bound to a master password whose strength varies across users. Canonical: 2022-12 LastPass encrypted-vault exfiltration → 2023-2025 multi-year crypto-drain cohort, \~\$35M+ aggregated across \~150+ victims plus \~\$150M Larsen heist (federal-record-attested via March 2025 NDCA forfeiture filing); see `examples/2022-12-lastpass-vault-cohort.md`. **(b) Implicit-cloud-custody via default-on cloud-backup** — the wallet vendor's mobile app does not opt out of OS-level cloud-backup defaults, auto-syncing the encrypted vault to a cloud surface tied to a separate-identity security posture (Apple ID for iOS / iCloud; Google account for Android; Microsoft account for Windows). Canonical: 2022-04 iCloud-backup MetaMask seed-phrase cohort (Iacovone case \~\$650K plus broader 2022–2024 cohort); see `examples/2022-04-icloud-metamask-seed-phrase-cohort.md`. **Distinct from T11.001** (signing-vendor UI compromise — organisational-customer victim shape). **Distinct from T11.002** (wallet-software distribution compromise — vendor-side build-pipeline / update-channel surface). **Distinct from T11.003** (in-use multisig contract manipulation). **Distinct from T4 phishing** (no on-chain authority signing required; the substrate-of-extraction is the seed phrase itself). The structural feature is *seed-phrase material at rest in a third-party storage surface* — a custody surface the user did not realise they had created. Defender-side mitigation surface: cold-storage on physical media (paper, metal); no third-party-service storage; no auto-synced cloud-storage of wallet-app data; seed-phrase rotation if seed material was ever stored in a third-party service whose vaults have been exfiltrated.
- **T11.005 Operator-side Fake-Platform Fraud** (parent) — **promoted** to `emerging`; see [`techniques/T11.005-operator-side-fake-platform-fraud.md`](techniques/T11.005-operator-side-fake-platform-fraud.md). Sub-pattern status:
  - **T11.005.001 Fake-CEX / pig-butchering platform** — held v0.x candidate; documented in the parent technique file's sub-class enumeration. Pipeline anchor targets: BeurAx-class fake-trading-platform cohort (2020–2026); Philippines compound 144-account $225M USDT seizure (DOJ June 2025); Chen Zhi / Prince Group $15B Bitcoin seizure (DOJ October 2025).
  - **T11.005.002 Fake-custodian / fake-asset-manager fraud** — anchored at OneCoin, CryptoFX, HyperVerse / HyperFund within the parent technique file. Pipeline anchor targets: PlusToken (existing example at `examples/2019-06-plus-token.md`); Forsage (Lado Okhotnikov, SEC August 2022); CoinDeal (Neil Chandran, SEC + DOJ January 2023).
  - **T11.005.003 Compound-operated investment-fraud platforms** — held v0.x candidate. Pipeline anchor targets: Prince Group / Chen Zhi (DOJ October 2025); Ly Yong Phat / O-Smach Resort cohort (OFAC September 2024); Huione Group laundering substrate (FinCEN section 311 October 2025); Southeast Asia compound cohort (2020–2026).
  - **JPEX (Hong Kong, September 2023, ~$200M)** — borderline case between T11.005.001 and unlicensed-offshore-exchange; pipeline target.
- **T11.x Hardware-wallet supply-chain / physical-access compromise** (proposed). Scope: brand-impersonation-driven hardware substitution, pre-seeded-recovery-card scams, physical-access seed-extraction attacks against hardware-wallet microcontrollers, and brand-trust-leveraged phishing targeting hardware-wallet users for seed-phrase exfiltration. Three structurally-distinct sub-patterns: **(a) Counterfeit-hardware substitution** — counterfeit devices distributed through informal retail channels (Chinese marketplaces, Telegram resellers, in-person counterfeit-product markets) that brand-impersonate legitimate Ledger / Trezor / similar products and either pre-seed the recovery phrase or replace the secure element with an attacker-controlled microcontroller storing seeds in plaintext flash with embedded radio for exfiltration. Canonical (deployed-attack anchor): 2025 counterfeit Ledger Nano S Plus cohort (\~\$9.5M+ across \~50+ victims, 20+ blockchain ecosystems, ESP32-S3 microcontroller substitution); see `examples/2025-counterfeit-ledger-nano-s-plus-cohort.md`. Adjacent: 2021 mailed-fake-hardware-wallet replacement leveraging the 2020 Ledger data leak. **(b) Physical-access hardware-side seed extraction** — voltage-glitching, side-channel, or chip-tampering attacks against the wallet's microcontroller / secure element, requiring physical access to the device. Canonical (capability anchor): 2020-01-31 Trezor One / Model T RDP-downgrade voltage-glitch attack disclosed by Kraken Security Labs; vendor-acknowledged structural vulnerability; BIP39 passphrase as defender-side mitigation primitive that bounds realised loss to passphrase strength rather than preventing the attack outright; see `examples/2020-01-trezor-kraken-rdp-downgrade.md`. **(c) Brand-trust-leveraged active-phishing for seed-phrase exfiltration** — phishing campaigns impersonating legitimate hardware-wallet vendor communications via email, physical mail, in-app prompts (via trojanised companion apps), and unsolicited mailed-hardware-replacement letters, leveraging the 2020 Ledger data leak as ongoing operational substrate for personalisation data. Canonical: 2023–2026 fake-firmware-update / recovery-app phishing cohort (Kaspersky 85,000+ scam-email-quarterly tabulation; physical-mail-letter campaign 2025–2026; trojanised-Ledger-Live / Trezor-Suite companion-app cohort 2023 onward); see `examples/2023-2026-fake-firmware-update-phishing-cohort.md`. **Distinct from T11.002** (wallet-software distribution compromise — software substitution on a legitimate device). **Distinct from T4 phishing** (the substrate-of-extraction is the seed phrase itself, not an on-chain authority grant). The structural feature is *brand-impersonation-driven trust transferred to a structurally-compromised hardware / channel surface*. Defender-side mitigation surface: authorised-retailer-purchase verification; tamper-evident-packaging inspection; vendor-side authenticity verification via the vendor's official Ledger Live / Trezor Suite app's device-genuineness check; user-side enforcement of the *legitimate-vendor-never-asks-for-seed-phrase* invariant across all communication channels; subscription to vendor-side continuous-update threat-intelligence (Ledger's "Ongoing phishing campaigns" page; Trezor's parallel advisories).

### T12 — NFT-Specific Patterns (additions for v0.x)

- NFT-collateral lending exploits (the broader class beyond the foundational T12 trio).
- Marketplace listing manipulation beyond OpenSea front-running stale-listing.
- Real-world-asset (RWA) NFT bridge surfaces.

### T13 — Account Abstraction Attacks (additions for v0.x)

- Specific paymaster-vulnerability subclasses as the ERC-4337 deployment substrate matures.
- Smart-wallet recovery-flow exploitation (Loopring Jun 2024 was a related case at OAK-T11.002 broadly construed, but the smart-wallet-recovery-flow class deserves explicit T13 coverage).
- Cross-bundler MEV variants beyond T13.002.
- **T13.004 EIP-7702 Delegation Abuse** (proposed). Scope: persistent-execution-authority delegation under the EIP-7702 set-code transaction type (Pectra fork, 2025-05-07), covering (a) malicious-delegator phishing (CrimeEnjoyor cluster — Wintermute / GoPlus telemetry shows >90\% of EIP-7702 delegations linked to malicious contracts; ~79{,}000 delegations registered for ~2.88 ETH against typically near-zero residual EOAs), (b) batch-transaction signing-prompt abuse (Inferno Drainer 2025-05-24 ~\$146K MetaMask-delegated-EOA drain; the 2025-08-24 \$1.54M single-victim wstETH/cbBTC drain), (c) chain-agnostic-replay amplification, and (d) future-deposit-trapping optionality. **Distinct from T4.001 (Permit2 Authority Misuse)** at the artefact level: Permit2 delegates token-spending authority within the EOA's static-code execution model; EIP-7702 *replaces* the EOA's execution model entirely with attacker-supplied bytecode. **Distinct from T13.003 (Session-Key Hijacking)** at the artefact level: session keys are smart-account-issued ephemeral signers; EIP-7702 delegations are EOA-issued persistent execution-context replacements. Canonical anchor: `examples/2025-05-eip7702-crimeenjoyor-delegation-phishing-cohort.md` (>\$12M cumulative across 15{,}000+ wallets through 2025-Q4; addressable surface 450{,}000+ delegated wallets); academic measurement in Qi et al. arXiv 2512.12174 `[eip7702phishingarxiv]`. Promote to `emerging` once the sub-Technique page lands.

### T14 — Validator/Staking/Restaking Attacks (additions for v0.x)

- Specific AVS slashing-condition exploitation cases as EigenLayer and similar restaking platforms mature.
- LRT (liquid restaking token) pricing manipulation (Bedrock Apr 2025 is a related case at OAK-T9.001; restaking-protocol-specific subclass deserves explicit T14 coverage).
- Bridge-validator-set economic-incentive misalignment.
- **LST/LRT depeg-cascade as a structural sub-class within T14.003 (b)** (proposed refinement of existing scope). Scope: the depeg-and-liquidation cascade pattern operates through three constrained-primitive sub-classes — (i) chain-level redemption-absence (canonical: 2022-05/06 Lido stETH cascade pre-Shapella, see `examples/2022-06-lido-steth-depeg.md`), (ii) operator-blocked redemption (canonical: 2024-04 Renzo ezETH cascade, see `examples/2024-04-renzo-ezeth-depeg.md`), (iii) withdrawal-queue-depth saturation (canonical: 2025-07 Lido stETH / Aave / Justin-Sun-driven cascade, see `examples/2025-07-lido-steth-aave-cascade.md`). All three share the cascade structure (secondary-market sell pressure → bottlenecked redemption → lending-market oracle propagation → looped-leverage liquidation cascade) but each fires through a different constrained primitive. Detection methodology: monitor (1) constrained-primitive's current depth/capacity, (2) cascade-demand scenario that would saturate it, (3) queue-clearing time under saturation. Cross-references T9.001 (DEX-spot-anchored lending-market oracles propagate the secondary-market discount into liquidation triggers without redemption-rate / queue-depth-aware buffer).
- **Mass-slashing via DVT-failover / operator-procedural error** (proposed sub-surface within T14.001). Scope: correlated self-slashing across operator-family / DVT cluster driven by infrastructure-maintenance-window key-management errors that violate the single-active-signer invariant. Canonical anchor: `examples/2025-09-ssv-network-mass-slashing.md` (39 validators, ~12 ETH cumulative loss, Ankr maintenance-window error). Distinct from the *adversarial* T14.001 primary scope (slashing-as-griefing, slashing-as-MEV, mass-slashing-via-consensus-client-exploit) which remains the dominant *characterised-in-academic-literature* surface but lacks field-confirmed worked examples at v0.1. The dominant *observed* failure mode for slashing in 2024–2025 is operator-side correlated self-slashing; promotion to `observed` for T14.001 occurs through this sub-surface.

---

## Speculative Techniques pending field anchor

Techniques published in v0.1 with `Maturity: speculative` because the threat surface is well-characterised in academic / protocol-research literature but no field-confirmed external-attacker incident anchors the Technique. Each is held in this section until a primary-source-anchored externally-attributed incident is catalogued, at which point it is promoted to `emerging` or `observed` and removed from this list.

- **OAK-T14.001 — Slashing-Condition Exploit.** Adversarial use of PoS slashing predicates (slashing-as-griefing, slashing-as-MEV, mass-slashing via consensus-client exploit, slashing-claim race). The dominant observed failure mode at v0.1 is operator-side self-slashing (validator misconfiguration, DVT failover bugs, infrastructure maintenance — e.g., Ethereum 2025-09 SSV-Network correlated event). Adversarial-causation cases exist in academic literature (`[neuder2021posattacks]`, `[a16zslashingecon]`, `[polkadotoffenses]`) but the verified-external-attacker-causation worked-example catalogue is empty. Promote to `emerging` once such an incident is anchored.

---

## Missing methodological axes

Beyond Techniques themselves, OAK v0.1 lacks several first-class concepts that comparable frameworks treat as separate axes.

### STIX 2.1 export

Tactics × Techniques × Mitigations × Software × Groups × Data Sources × Relationships are emitted as an OAK-native machine-readable bundle at `tools/oak.json` (schema v2). A STIX 2.1 export at `tools/oak-stix.json` is delivered at v0.1 (601 SDOs/SROs). Onward integration with TIPs, SIEMs, and threat-intel platforms is a v0.x adoption-paced work item.

### Campaigns axis

A discrete first-class object class for multi-incident threads (an operator running a coherent operation across multiple targets in a discrete operational period). OAK Worked Examples cover individual incidents; cross-incident Campaign aggregation (e.g., the 2022-2024 OAK-G01 TraderTraitor cohort of exchange-vendor compromises) is documented in cross-references but not as a discrete first-class object. v0.x candidate.

### Assets axis

A discrete first-class object class for what is being attacked: token contracts, AMM pools, oracle contracts, multisig wallets, bridge contracts, validator key sets, custody-vendor signing infrastructure. OAK Techniques reference assets in prose but not as a discrete first-class object. v0.x candidate.

### Data-component decomposition

Sub-entities of Data Sources representing specific event types (e.g., DS "On-chain transaction" → "Token transfer event", "Approval event", "Pool-creation transaction"). OAK Data Sources are flat at v0.1; sub-component decomposition is a v0.x candidate.

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
