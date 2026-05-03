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
- **T1.006 Honeypot-by-Design** (proposed). Scope: smart-contract token deployments whose immutable bytecode at deployment encodes hostile transfer-logic that permits purchases but blocks sales — sell-side-gated revert predicates in `_transfer`, malicious `_beforeTokenTransfer` hooks, asymmetric extreme fee-on-transfer (sell-tax 99% as quantitative sell-prevention), or malicious `approve` handlers that redirect allowance to attacker-controlled spenders. **Distinct from T1.004 (Blacklist / Pausable Weaponization)** because T1.006's gate is hard-coded into the immutable bytecode at deployment rather than being an authority-mutable mapping. **Distinct from T1.001 (Modifiable Tax)** because the failure mode is at-deployment hostile bytecode, not post-launch authority abuse. **Distinct from T4.001 (Permit2 Authority Misuse)** because the trap is in the contract itself, not the signing surface. Canonical cohort: GoPlus Q4 2024 detection of 67,241 honeypot tokens across Ethereum / BNB Chain / Base; CertiK February 2024 nine-honeypot single-operator cohort (~$3.2M); Snibbb (BNB Chain, 2023); BNB Chain 979-EOA fan-out August-October 2023. See `examples/2024-Q4-honeypot-token-cohort-cross-chain.md`. Detection methodology: Honeypot.is matrix-simulation across (size × direction × time) condition matrix; static-analysis enumeration of fee-branch predicates and exemption mappings. Mitigation: pre-trade UX-layer enforcement of detected signals (wallet pre-trade simulation; aggregator route-blocking; venue / launchpad listing-time gates). Legitimate-use overlap: structurally null — the immutable buy-not-sell pattern has no legitimate token-economic purpose.
- **T1.007 Token-2022 Transfer-Hook Abuse** (proposed; `Maturity: emerging`). Scope: SPL Token-2022 mints with the `TransferHook` extension configured to invoke an attacker-controlled program on every `transfer_checked` invocation. Reintroduces the callback-based vulnerability class (reentrancy, mid-transfer state mutation, attacker-controlled CPI) into Solana's runtime. **Distinct from T1.002 (PermanentDelegate)** because the failure mode is hook-program-controlled execution rather than standing burn / transfer authority. **Distinct from T1.005 (Hidden Fee-on-Transfer / TransferFee extension)** because the hook's behaviour is not bounded by the fee-arithmetic primitive. The hook *program* is itself upgradable via `BPFLoaderUpgradeable`, creating a residual T6.005-style mutable-implementation sub-surface. Closest cross-standard analogues: ERC-777 reentrancy (imBTC 2020, Lendf.Me 2020 ~$25M), ERC-1363 transfer-and-call, ERC-4626 vault hooks. v0.1 status: `emerging` because the threat-class characterisation is mature (Halborn pre-production audit, dev.to writeup, RareSkills specification, Solana Foundation documentation, April 2025 ZK-ElGamal proof zero-day disclosure-and-patch cycle) but the field-confirmed externally-attributed-exploit anchor is empty. See `examples/2024-2025-token-2022-transfer-hook-class-vulnerability.md`. Promotion to `observed` awaits the first per-incident exploit with public on-chain forensic disclosure.

### T4 — Access Acquisition (additions for v0.x)

- **Native-app social phishing on engagement-weighted platforms** (proposed). Scope: phishing campaigns whose distribution surface is a paid-for or engagement-weighted in-platform mechanic that the attacker manipulates to occupy visibility (e.g., comment-pinning, reply-ranking). Distinct from generic phishing because the platform's own mechanics fund the distribution surface. Canonical: Polymarket comment-section campaign Nov 2025 (≥$500K cumulative loss; attackers bought YES+NO shares to anchor pinned phishing comments). See `examples/2025-11-polymarket-comment-section-phishing.md`. Generalises to any engagement-weighted platform (Friend.tech, pump.fun, Farcaster).
- **Pre-token brand-anticipation phishing** (proposed). Scope: phishing campaigns exploiting *the absence* of a token from a high-trust platform — the lure is the official-channel-amplified ambiguity ("airdrop coming soon" → fake claim sites). Distinct from T6.002 (Fake Audit Claim) because no false audit is claimed; the ambiguity is around a future event the platform itself has hinted at. Canonical: Polymarket "POLY airdrop claim" typosquat cohort, accelerating after Polymarket's CMO confirmed future token plans October 2025.

- QR-code phishing as an entry vector — relevant across T4 generally; merits a standalone Technique stub if the QR-specific surface (mobile-wallet UX, malicious WalletConnect QR codes) warrants one.
- iOS / Android push-notification compromise as a wallet-extension distribution-channel surface (CoinStats Jun 2024 is the canonical case; OAK-T11.002 broadly construed at v0.1).

### T5 — Value Extraction (additions for v0.x)

- **Third-party brand-impersonation custodial soft-rug** (proposed). Scope: an off-platform service that brands itself in a legitimate platform's name without contractual basis, accumulates user deposits in operator-controlled custody, and exits citing an unverifiable "hack." Distinct from T5.005 (Treasury-Management Exit) — the operator never had a fiduciary relationship with the platform whose brand they used. Distinct from T4 phishing — users deposited willingly. Canonical: Polycule trading bot Jan 2026 ($230K, Polymarket-branded but unaffiliated, exit-via-"hack" announcement followed by communication blackout). Detection signal at the platform layer: monitoring for off-platform brand-impersonation services through trademark / domain / Telegram-handle surveillance + authoritative third-party-service registry publication. See `examples/2026-01-polymarket-polycule-bot.md`.

### T6 — Defense Evasion (additions for v0.x)

- **T6.005 Proxy-Upgrade Malicious Switching** (proposed). Scope: contracts verified at deployment with a benign implementation, then proxy-upgraded to a malicious implementation post-verification. Two structurally distinct sub-classes: **(a) operator-key-compromise sub-class** — the upgrade authority is reached via stolen / compromised operator keys (canonical: Steadefi Aug 2023, ~$1.14M, internal-key compromise; Audius Jul 2022 storage-collision, ~$6M, see `examples/2022-07-audius.md`); **(b) on-chain-message-forgery sub-class** — the upgrade authority is reached via forged cryptographic proof or message-verification flaw without any pre-stolen keys (canonical: Hyperbridge Apr 2026, ~$2.5M realised / ~$1.2B notional, MMR-proof-reuse forgery; Wormhole Feb 2022 white-hat-disclosed uninitialised-implementation pattern; AllianceBlock Aug 2024 re-initialisation flaw). The detection-signal locus differs entirely between the two sub-classes: (a) lives at the off-chain key-handling-monitoring layer; (b) lives at the on-chain message-verification correctness layer. T6.005 is the canonical generic modifier on T1 / T9 / T10 classes when the upgrade itself is the attack vector. See `examples/2026-04-hyperbridge-merkle-proof-counterfeit-mint.md`.
- **T6.x Trust-substrate shift / vendor-side promise revocation** (proposed). Scope: *non-attack* defender-credibility events in which a vendor-policy decision (or, in adjacent variants, a regulatory action, infrastructure-level policy change, or oracle-resolution-policy change) revokes a load-bearing trust-substrate claim that previously informed user-side threat-model construction. The realised loss is **non-financial** (trust-substrate revocation, cohort-level effect on the broader category's trust posture, competing-vendor user-acquisition opportunities) but structurally significant — the user's effective security posture depends on both (a) the absence of attacks and (b) the persistence of vendor-side trust-substrate claims. Canonical: 2023-05-16 Ledger Recover seed-recovery service announcement collapsing the "seed never leaves the device" trust-substrate claim that had informed Ledger users' threat-model construction since 2016; see `examples/2023-05-ledger-recover-trust-substrate-shift.md`. The case structurally generalises beyond hardware-wallet vendor-policy: (a) vendor-policy decisions that revoke trust-substrate claims (Ledger Recover at v0.1; potential future custodial-services policy changes; potential future wallet-as-a-service policy changes), (b) regulatory / legal-process events that change the operational threat model (sanctions enforcement against mixers; KYC / AML rule changes affecting custody surface), (c) infrastructure-level changes that reshape the defender's mental model (L2 sequencer policy changes; oracle-resolution-policy changes — adjacent to the T9.006.004 platform-override sub-pattern at `examples/2025-03-polymarket-uma-ukraine-mineral-deal.md` and adjacent Polymarket cases). **Distinct from T6.001-T6.004** (defense-evasion-by-attacker-action — fake audit claims, source-verification mismatches). The structural feature is *defense-evasion-by-vendor-policy-change* rather than defense-evasion-by-attacker-action. The framework's credibility depends on documenting how user trust gets revoked even in the absence of a deployed attack. Contributors writing future T6.x trust-substrate-shift worked examples should preserve (a) the non-attack structure, (b) the realised-non-financial-loss dimension, (c) the vendor-communications-during-trust-substrate-shift dimension (the deleted-tweet pattern), (d) the custodian-set jurisdiction footprint dimension where third-party-custodian shapes are introduced, and (e) the cohort-level effect on the broader category's trust posture.
- **T6.006 Counterfeit Token Impersonation** (proposed). Scope: contracts that share the symbol of a legitimate token (USDC / USDT / WETH / WBTC / DOT) but are unrelated at the contract identity layer, used in dust-attack lures, fake LP-token deposit drains, bridge-token impersonation on non-mainnet chains, and counterfeit-mint via compromised bridge admin authority. Three structurally distinct sub-classes: **(a) fake-symbol-matching deployment** — separate, unrelated contract sharing the symbol; canonical for dust-attack lures and fake LP-token deposit drains; ScamSniffer 2023-2024 cohort coverage. **(b) Bridge-impersonation via fake-bridge-token deployment** — counterfeit deployment masquerading as a legitimate bridged token. **(c) Bridge-internal-mint** — the *legitimate* bridge contract mints counterfeit tokens via attacker-acquired admin authority, indistinguishable from legitimate at the contract identity layer (worst-case shape; canonical: Hyperbridge Apr 2026 — see `examples/2026-04-hyperbridge-merkle-proof-counterfeit-mint.md`). The notional-versus-realised loss gap is structurally informative across the cohort and should be recorded explicitly. T6.006 chains with T6.005 when the upgrade-authority transfer is the mechanism by which the impersonation surface is opened (Hyperbridge canonical case).
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
- **T9.006 Subjective-Oracle Resolution Manipulation** (proposed). Distinct from T9.001 (price-feed oracle manipulation): the "oracle" is a token-weighted vote over a natural-language claim (UMA DVM, Kleros, Reality.eth, Augur REP), not a numeric price feed. Sub-patterns identified from the Polymarket cohort 2025-2026:
  - **T9.006.001** — DVM vote capture by economically-interested holder. Canonical: Ukraine mineral deal market March 2025 ($7M, single whale ~25% of vote); UFO declassification December 2025 ($16M); Zelenskyy-suit market July 2025 ($237M). See `examples/2025-03-polymarket-uma-ukraine-mineral-deal.md`.
  - **T9.006.002** — Resolution-spec ambiguity exploitation. Canonical: Zelenskyy-suit market — "wearing a suit" had no machine-checkable definition; voters resolved against the bettor-majority interpretation. See `examples/2025-07-polymarket-zelenskyy-suit.md`.
  - **T9.006.003** — Off-chain resolution-source coercion. Canonical: Times of Israel correspondent threatened with death by Polymarket bettors over Iran-strike market March 2026. **First publicly documented case of physical coercion of a human reporter as an oracle attack vector in crypto.** See `examples/2026-03-polymarket-iran-strike-journalist-coercion.md`.
  - **T9.006.004** — Platform-override of oracle outcome. Canonical: Barron Trump / DJT memecoin market — UMA voted NO, Polymarket overrode. Establishes precedent that platform discretion is a backstop on top of the "decentralised" oracle, collapsing the trust model. Structural finding: oracle-token market cap (UMA ~$95M) is less than the volume of single adjudicated markets ($237M Zelenskyy) — stable disequilibrium that worsens as Polymarket scales.

### T11 — Custody and Signing Infrastructure (additions for v0.x)

- T11.004 Insufficient-Entropy Key Generation (proposed; canonical case is Wintermute Sep 2022 / Profanity vanity-address generator).
- Multi-chain key-store co-location (canonical case is Poloniex Nov 2023; the simultaneous-multi-chain extraction pattern as architectural anti-pattern).
- Custodial-private-key-storage trading-bot anti-pattern (canonical case is DEXX Sep-Nov 2024).
- Legacy-version-maintenance attack-surface (canonical case is GMX V1 Jul 2025; the operator-side decision to maintain deprecated protocol versions as residual exploitable surface).
- **Embedded-wallet identity-provider compromise** (proposed). Scope: any wallet whose key derivation runs through a third-party authentication service (email magic-link, OAuth federation, MPC-backed social login — Magic Labs / Privy / Dynamic / Web3Auth). The attack surface is the auth provider's security posture; the on-chain transaction is correctly signed by the provider's key. Canonical: Polymarket account-takeover incidents Sep 2024 + Dec 2025 (both attributed by Polymarket to "third-party login tool"). The widespread "non-custodial" claim collapses back to "as custodial as the auth provider's security posture." See `examples/2024-09-polymarket-magic-labs-takeover.md`.
- **Trader-tooling supply-chain compromise targeting `.env` private keys** (proposed). Adjacent to T11.002 (Wallet-Software Distribution Compromise) but distinct in target cohort: end-user wallet binaries vs. developer-environment plaintext key storage. Canonical: malicious npm `polymarket-clob` package + `dev-protocol` GitHub-org hijack distributing trojan "polymarket-copytrading-bot" repos, Dec 2025 - Apr 2026 (Vidar Stealer infrastructure overlap, DPRK-cohort-fingerprint similarity). Detection signals are off-chain at the package-registry level. See `examples/2026-01-polymarket-trader-tooling-supply-chain.md`.
- **T11.x Cold-storage seed-phrase exfiltration at rest** (proposed). Scope: third-party storage services (password managers, cloud-backup services, plaintext or weakly-encrypted at-rest seed-phrase storage) whose compromise produces seed-phrase material to attackers without any direct user-action signing or wallet-software compromise. Two structurally-distinct sub-patterns: **(a) user-initiated plaintext-equivalent storage** — the user explicitly stores seed-phrase material in a third-party service (LastPass Secure Notes; 1Password / Bitwarden Secure-Notes-equivalent; password-protected notes in productivity tools), with vault encryption bound to a master password whose strength varies across users. Canonical: 2022-12 LastPass encrypted-vault exfiltration → 2023-2025 multi-year crypto-drain cohort, \~\$35M+ aggregated across \~150+ victims plus \~\$150M Larsen heist (federal-record-attested via March 2025 NDCA forfeiture filing); see `examples/2022-12-lastpass-vault-cohort.md`. **(b) Implicit-cloud-custody via default-on cloud-backup** — the wallet vendor's mobile app does not opt out of OS-level cloud-backup defaults, auto-syncing the encrypted vault to a cloud surface tied to a separate-identity security posture (Apple ID for iOS / iCloud; Google account for Android; Microsoft account for Windows). Canonical: 2022-04 iCloud-backup MetaMask seed-phrase cohort (Iacovone case \~\$650K plus broader 2022–2024 cohort); see `examples/2022-04-icloud-metamask-seed-phrase-cohort.md`. **Distinct from T11.001** (signing-vendor UI compromise — organisational-customer victim shape). **Distinct from T11.002** (wallet-software distribution compromise — vendor-side build-pipeline / update-channel surface). **Distinct from T11.003** (in-use multisig contract manipulation). **Distinct from T4 phishing** (no on-chain authority signing required; the substrate-of-extraction is the seed phrase itself). The structural feature is *seed-phrase material at rest in a third-party storage surface* — a custody surface the user did not realise they had created. Defender-side mitigation surface: cold-storage on physical media (paper, metal); no third-party-service storage; no auto-synced cloud-storage of wallet-app data; seed-phrase rotation if seed material was ever stored in a third-party service whose vaults have been exfiltrated.
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
