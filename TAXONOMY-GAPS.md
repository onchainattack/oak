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
- **OAK-T11.006 — Cold-storage Seed-phrase Exfiltration at Rest** — promoted; see [`techniques/T11.006-cold-storage-seed-phrase-exfiltration-at-rest.md`](techniques/T11.006-cold-storage-seed-phrase-exfiltration-at-rest.md). Anchored: 2022-12 LastPass encrypted-vault cohort (T11.006.001 user-initiated plaintext-equivalent storage); 2022-04 iCloud-backup MetaMask cohort (T11.006.002 implicit cloud-custody via default-on cloud-backup).
- **OAK-T11.007 — Hardware-wallet Supply-chain / Physical-access Compromise** — promoted; see [`techniques/T11.007-hardware-wallet-supply-chain-physical-access-compromise.md`](techniques/T11.007-hardware-wallet-supply-chain-physical-access-compromise.md). Anchored: 2025 counterfeit Ledger Nano S Plus cohort (T11.007.001 deployed-attack); 2020-01 Trezor RDP-downgrade Kraken disclosure (T11.007.002 capability); 2023–2026 fake-firmware-update / recovery-app phishing cohort (T11.007.003 active phishing).
- **OAK-T11.008 — Embedded-Wallet Identity-Provider Compromise** — promoted; see [`techniques/T11.008-embedded-wallet-identity-provider-compromise.md`](techniques/T11.008-embedded-wallet-identity-provider-compromise.md). Anchored: 2024-09 Polymarket Magic-Labs takeover.
- **OAK-T11.009 — Trader-Tooling Supply-Chain Compromise targeting `.env` Private Keys** — promoted; see [`techniques/T11.009-trader-tooling-supply-chain-env-key-compromise.md`](techniques/T11.009-trader-tooling-supply-chain-env-key-compromise.md). Anchored: 2026-01 Polymarket trader-tooling cohort (npm `polymarket-clob` + `dev-protocol` GitHub-org hijack).
- **OAK-T13.004 — EIP-7702 Delegation Abuse** — promoted; see [`techniques/T13.004-eip7702-delegation-abuse.md`](techniques/T13.004-eip7702-delegation-abuse.md). Anchored: 2025-05 CrimeEnjoyor cohort.
- **OAK-T6.007 — Trust-substrate Shift / Vendor-side Promise Revocation** — promoted; see [`techniques/T6.007-trust-substrate-shift-vendor-promise-revocation.md`](techniques/T6.007-trust-substrate-shift-vendor-promise-revocation.md). Anchored: 2023-05 Ledger Recover seed-recovery service announcement.
- **OAK-T4.007 — Native-app Social Phishing on Engagement-Weighted Platforms** — promoted; see [`techniques/T4.007-native-app-social-phishing-engagement-weighted-platforms.md`](techniques/T4.007-native-app-social-phishing-engagement-weighted-platforms.md). Anchored: 2025-11 Polymarket comment-section phishing campaign.
- **OAK-T4.008 — Fake-DEX Clone-Frontend Phishing** — promoted; see [`techniques/T4.008-fake-dex-clone-frontend-phishing.md`](techniques/T4.008-fake-dex-clone-frontend-phishing.md). Anchored: 2023–2026 fake-DEX clone-frontend cohort (MS Drainer, Inferno / Angel / AngelFerno, Cyble Play Store cohort).
- **OAK-T5.007 — Third-party Brand-impersonation Custodial Soft-rug** — promoted; see [`techniques/T5.007-third-party-brand-impersonation-custodial-soft-rug.md`](techniques/T5.007-third-party-brand-impersonation-custodial-soft-rug.md). Anchored: 2026-01 Polycule trading bot Polymarket-branded soft-rug.
- **OAK-T3.004 — Influencer-Amplified Promotion-and-Dump** — promoted; see [`techniques/T3.004-influencer-amplified-promotion-and-dump.md`](techniques/T3.004-influencer-amplified-promotion-and-dump.md). Anchored: 2021–2026 influencer-amplified non-memecoin rug cohort (CryptoZoo, $KIDS, DADDY, JENNER, MOTHER, DJT).
- **OAK-T14.001 — Slashing-Condition Exploit** — promoted from `speculative` to `emerging` on the strength of the operator-side correlated-self-slashing sub-surface (sub-case (e)) anchor; see [`techniques/T14.001-slashing-condition-exploit.md`](techniques/T14.001-slashing-condition-exploit.md). Anchored: 2025-09 SSV-Network correlated mass-slashing event (39 validators / Ankr maintenance-window error). Adversarial sub-cases (a)–(d) remain forward-looking surfaces without field-confirmed external-attacker anchors.
- **OAK-T14.003.001 — LST/LRT Depeg-Cascade as Constrained-Primitive Sub-class** — promoted as sub-Technique of T14.003; see [`techniques/T14.003.001-lst-lrt-depeg-cascade-constrained-primitive.md`](techniques/T14.003.001-lst-lrt-depeg-cascade-constrained-primitive.md). Anchored: 2022-06 Lido stETH (i chain-level redemption-absence); 2024-04 Renzo ezETH (ii operator-blocked redemption); 2025-07 Lido stETH / Aave cascade (iii withdrawal-queue-depth saturation).

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

- **T3.004 Influencer-Amplified Promotion-and-Dump** — **promoted** to `emerging`; see [`techniques/T3.004-influencer-amplified-promotion-and-dump.md`](techniques/T3.004-influencer-amplified-promotion-and-dump.md).

### T4 — Access Acquisition (additions for v0.x)

- **T4.007 Native-app Social Phishing on Engagement-Weighted Platforms** — **promoted** to `emerging`; see [`techniques/T4.007-native-app-social-phishing-engagement-weighted-platforms.md`](techniques/T4.007-native-app-social-phishing-engagement-weighted-platforms.md).
- **T4.008 Fake-DEX Clone-Frontend Phishing** — **promoted** to `emerging`; see [`techniques/T4.008-fake-dex-clone-frontend-phishing.md`](techniques/T4.008-fake-dex-clone-frontend-phishing.md).
- **Pre-token brand-anticipation phishing** (proposed). Scope: phishing campaigns exploiting *the absence* of a token from a high-trust platform — the lure is the official-channel-amplified ambiguity ("airdrop coming soon" → fake claim sites). Distinct from T6.002 (Fake Audit Claim) because no false audit is claimed; the ambiguity is around a future event the platform itself has hinted at. Canonical: Polymarket "POLY airdrop claim" typosquat cohort, accelerating after Polymarket's CMO confirmed future token plans October 2025. Held v0.x candidate pending a worked-example anchor in `examples/`.
- QR-code phishing as an entry vector — relevant across T4 generally; merits a standalone Technique stub if the QR-specific surface (mobile-wallet UX, malicious WalletConnect QR codes) warrants one.
- iOS / Android push-notification compromise as a wallet-extension distribution-channel surface (CoinStats Jun 2024 is the canonical case; OAK-T11.002 broadly construed at v0.1).

### T5 — Value Extraction (additions for v0.x)

- **T5.007 Third-party Brand-impersonation Custodial Soft-rug** — **promoted** to `emerging`; see [`techniques/T5.007-third-party-brand-impersonation-custodial-soft-rug.md`](techniques/T5.007-third-party-brand-impersonation-custodial-soft-rug.md).

### T6 — Defense Evasion (additions for v0.x)

- **T6.005 Proxy-Upgrade Malicious Switching** — **promoted** to `emerging`; see [`techniques/T6.005-proxy-upgrade-malicious-switching.md`](techniques/T6.005-proxy-upgrade-malicious-switching.md).
- **T6.006 Counterfeit Token Impersonation** — **promoted** to `emerging`; see [`techniques/T6.006-counterfeit-token-impersonation.md`](techniques/T6.006-counterfeit-token-impersonation.md).
- **T6.007 Trust-substrate Shift / Vendor-side Promise Revocation** — **promoted** to `emerging`; see [`techniques/T6.007-trust-substrate-shift-vendor-promise-revocation.md`](techniques/T6.007-trust-substrate-shift-vendor-promise-revocation.md).
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

- **T11.004 Insufficient-Entropy Key Generation** — **promoted** to `stable`; see [`techniques/T11.004-insufficient-entropy-key-generation.md`](techniques/T11.004-insufficient-entropy-key-generation.md). Canonical anchor: Wintermute / Profanity vanity-address generator (September 2022); paired with the Profanity cohort case at [`examples/2022-09-wintermute-profanity-cohort.md`](examples/2022-09-wintermute-profanity-cohort.md).
- Multi-chain key-store co-location (canonical case is Poloniex Nov 2023; the simultaneous-multi-chain extraction pattern as architectural anti-pattern).
- Custodial-private-key-storage trading-bot anti-pattern (canonical case is DEXX Sep-Nov 2024).
- Legacy-version-maintenance attack-surface (canonical case is GMX V1 Jul 2025; the operator-side decision to maintain deprecated protocol versions as residual exploitable surface).
- **T11.005 Operator-side Fake-Platform Fraud** (parent) — **promoted** to `emerging`; see [`techniques/T11.005-operator-side-fake-platform-fraud.md`](techniques/T11.005-operator-side-fake-platform-fraud.md). Sub-pattern status:
  - **T11.005.001 Fake-CEX / pig-butchering platform** — held v0.x candidate; documented in the parent technique file's sub-class enumeration. Pipeline anchor targets: BeurAx-class fake-trading-platform cohort (2020–2026); Philippines compound 144-account $225M USDT seizure (DOJ June 2025); Chen Zhi / Prince Group $15B Bitcoin seizure (DOJ October 2025).
  - **T11.005.002 Fake-custodian / fake-asset-manager fraud** — anchored at OneCoin, CryptoFX, HyperVerse / HyperFund within the parent technique file. Pipeline anchor targets: PlusToken (existing example at `examples/2019-06-plus-token.md`); Forsage (Lado Okhotnikov, SEC August 2022); CoinDeal (Neil Chandran, SEC + DOJ January 2023).
  - **T11.005.003 Compound-operated investment-fraud platforms** — held v0.x candidate. Pipeline anchor targets: Prince Group / Chen Zhi (DOJ October 2025); Ly Yong Phat / O-Smach Resort cohort (OFAC September 2024); Huione Group laundering substrate (FinCEN section 311 October 2025); Southeast Asia compound cohort (2020–2026).
  - **JPEX (Hong Kong, September 2023, ~$200M)** — borderline case between T11.005.001 and unlicensed-offshore-exchange; pipeline target.
- **T11.006 Cold-storage Seed-phrase Exfiltration at Rest** — **promoted** to `emerging`; see [`techniques/T11.006-cold-storage-seed-phrase-exfiltration-at-rest.md`](techniques/T11.006-cold-storage-seed-phrase-exfiltration-at-rest.md).
- **T11.007 Hardware-wallet Supply-chain / Physical-access Compromise** — **promoted** to `emerging`; see [`techniques/T11.007-hardware-wallet-supply-chain-physical-access-compromise.md`](techniques/T11.007-hardware-wallet-supply-chain-physical-access-compromise.md).
- **T11.008 Embedded-Wallet Identity-Provider Compromise** — **promoted** to `emerging`; see [`techniques/T11.008-embedded-wallet-identity-provider-compromise.md`](techniques/T11.008-embedded-wallet-identity-provider-compromise.md).
- **T11.009 Trader-Tooling Supply-Chain Compromise targeting `.env` Private Keys** — **promoted** to `emerging`; see [`techniques/T11.009-trader-tooling-supply-chain-env-key-compromise.md`](techniques/T11.009-trader-tooling-supply-chain-env-key-compromise.md).

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
- **T14.003.001 LST/LRT Depeg-Cascade as Constrained-Primitive Sub-class** — **promoted** to `emerging` as sub-Technique under T14.003; see [`techniques/T14.003.001-lst-lrt-depeg-cascade-constrained-primitive.md`](techniques/T14.003.001-lst-lrt-depeg-cascade-constrained-primitive.md).
- **Mass-slashing via DVT-failover / operator-procedural error** — **promoted** as sub-case (e) within T14.001; see [`techniques/T14.001-slashing-condition-exploit.md`](techniques/T14.001-slashing-condition-exploit.md). T14.001 is now `emerging` on the strength of this operator-side anchor; the adversarial sub-cases (a)–(d) remain forward-looking surfaces.

---

## Speculative Techniques pending field anchor

Techniques published in v0.1 with `Maturity: speculative` because the threat surface is well-characterised in academic / protocol-research literature but no field-confirmed external-attacker incident anchors the Technique. Each is held in this section until a primary-source-anchored externally-attributed incident is catalogued, at which point it is promoted to `emerging` or `observed` and removed from this list.

- *(empty at v0.x)* — OAK-T14.001 was promoted to `emerging` via the operator-side correlated-self-slashing sub-case (e) anchor (2025-09 SSV-Network event). Adversarial sub-cases (a)–(d) within T14.001 remain forward-looking surfaces tracked in the Technique file's discussion section but the Technique as a whole is no longer `speculative`.

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
