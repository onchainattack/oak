# Honeypot-by-design token cohort — Ethereum / BNB Chain / Base — 2024-02 onward

**Loss:** **\~$3.2M** in the publicly-named CertiK February 2024 nine-honeypot single-operator cohort. **\~$45.2M** in cross-chain rug-pull losses on Ethereum + BNB Chain in Q4 2024 per TenArmor (cited by GoPlus), of which a majority is honeypot-class extraction. **67,241** honeypot tokens detected by GoPlus across Ethereum, BNB Chain, and Base in Q4 2024 alone (54,000 on Base, 12,000 on BNB, ~1,200 on Ethereum), with ~92.8% of honeypot deployments concentrated on BNB Chain across the broader 2023-2024 window. The cohort is the single largest cross-chain malicious-token class by deployment count at v0.1.
**OAK Techniques observed:** **OAK-T1.006** *(proposed)* — Honeypot-by-Design: buy-able-but-not-sellable token contracts via hidden transfer-restriction logic, malicious approve handlers, malicious `_beforeTokenTransfer` hooks, or sell-side-gated revert predicates. Distinct from T1.004 (Blacklist / Pausable Weaponization, where the gate is an authority-mutable mapping) because T1.006's gate is hard-coded into the immutable bytecode at deployment. **OAK-T1.005** (Hidden Fee-on-Transfer) frequently co-occurs as a contributing primitive — sell-side fees set to 99% achieve sell-prevention via a quantitative gate equivalent to the binary T1.006 revert. **OAK-T6.001** (Source-Verification Mismatch) appears as a layered modifier in the proxy-pattern sub-cohort.
**Attribution:** **pseudonymous at cohort scale; partially clustered in named cases.** The CertiK February 2024 nine-honeypot incidents were attributed to a single operator running 5 Telegram channels across 9 deployments; per-incident operator EOAs are observable on-chain but rarely publicly named beyond the deployer cluster fingerprint. Cohort-scale attribution to a single super-operator has not been publicly established at v0.1; the templated re-deployment pattern (commodity honeypot-generator templates from CryptoKoki and similar services) is consistent with multiple distinct operator clusters reusing the same primitive rather than a single operator scaling. Snibbb (mid-2023, BNB Chain) is the canonical publicly-named per-incident case.
**Key teaching point:** The honeypot-by-design class is the **highest-volume malicious-token class by deployment count across the 2023-2026 window**, and the detection surface is mature (Honeypot.is matrix simulation; GoPlus token-security API; Token Sniffer; CertiK Skynet; SlowMist guidance). The binding constraint at the cohort scale is **the discovery-surface latency**: malicious mints are detected within hours of deployment by commodity scanners, but retail buyers reach them through Telegram channels, X memecoin accounts, and aggregator listings within minutes. The cohort persists not because detection is unsolved but because the *time-to-discovery* differential favours the operator across the buy-window-then-rug economic shape.

## Summary

The honeypot-by-design class encompasses smart-contract token deployments where the transfer logic is immutably structured at deployment to permit purchases but block sales — typically via:

- **Sell-side-gated revert predicate** in `_transfer`: `require(to != pair || isExcluded[from], "...")` where the only addresses excluded are the deployer cluster.
- **Malicious `_beforeTokenTransfer` hook** in OZ-derived contracts that reverts on conditions designed to block all retail sells while permitting deployer-cluster operations.
- **Asymmetric extreme fee-on-transfer**: sell-tax set to 99% in the immutable constructor, achieving quantitative sell-prevention indistinguishable from a binary revert.
- **Malicious `approve` handler** that rewrites allowance state to redirect spender authority to a deployer-controlled address rather than the requested spender.

Each sub-pattern is structurally distinct from T1.004 (Blacklist / Pausable Weaponization, where the gate is an authority-mutable mapping that the deployer can flip post-launch) because T1.006's gate is **hard-coded into the immutable bytecode at deployment**. From a defender's perspective, T1.006 is therefore detectable at deployment time via static analysis of the transfer-logic predicates plus dynamic simulation across a synthesised matrix of caller / counterparty / size / time conditions — the exact methodology Honeypot.is implements at vendor scale.

The cohort spans 2023 onward at industrial scale. Three publicly-anchored framings:

1. **Snibbb (mid-2023, BNB Chain)** — One of the few publicly-named per-incident T1.006 cases. The contract permitted purchases but blocked sells via the sell-side-gated revert predicate; the deployer subsequently drained liquidity, leaving holders with unsellable tokens. Snibbb was hyped on social media to attract significant investment before the liquidity drain. The case is canonical for the "buy-then-cannot-sell, then liquidity drain" T1.006 → T5.001 chain.

2. **CertiK February 2024 nine-honeypot operator cohort** — A single operator running at least 5 Telegram channels executed 9 separate honeypot deployments, cumulatively extracting approximately **$3.2M**. The contracts were designed to either block withdrawals entirely or drain a user's wallet as soon as they interacted with it. The cohort is canonical for the **single-operator templated-redeployment** sub-pattern: per-incident loss is moderate (~$355K avg), aggregate operator profit is significant.

3. **GoPlus Q4 2024 cross-chain prevalence (Ethereum / BNB Chain / Base)** — GoPlus team detected over 67,241 honeypot tokens across Ethereum, BNB Chain, and Base during Q4 2024 alone. Distribution: 54,000 on Base, 12,000 on BNB Chain, ~1,200 on Ethereum. TenArmor reports total Rugpull losses on Ethereum + BSC at $45,247,045 in the same quarter ($44M Ethereum, $1.2M BNB), of which a majority is T1.006-class extraction. The cohort scale is the canonical evidence that T1.006 is the highest-volume malicious-token class by deployment count.

The class-level forensic surface is well-developed: SlowMist's honeypot avoidance guide (`[slowmistguidetohp]`-proposed); CertiK's broader Honeypot Scams advisory (`[certikhoneypot]`-proposed); GoPlus's Q4 2024 detection cohort report (`[goplusq42024honeypot]`-proposed); academic work on honeypot detection (`[torres2019]`); per-token risk-scoring cohorts (Honeypot.is, Token Sniffer, GoPlus token-security API, RugCheck for Solana).

## Why this is structurally significant

T1.006 (proposed) sits between T1.001 and T1.004 in OAK's existing genesis-time Technique surface, and the failure-mode-versus-detection asymmetry is structurally distinct from both:

- **T1.001 (Modifiable Tax)**: fee parameter is mutable; failure mode is post-launch authority abuse; detection requires authority-graph enumeration.
- **T1.004 (Blacklist / Pausable Weaponization)**: gate predicate state is mutable; failure mode is post-launch authority abuse; detection requires authority-graph enumeration.
- **T1.006 (Honeypot-by-Design)**: gate predicate is **immutable at deployment**; failure mode is operator-favourable transfer-logic structure that was never benign; detection requires static analysis + simulation matrix at deployment time.

The detection asymmetry is structurally important: T1.001 and T1.004 require *post-launch behavioural confirmation* (the authority-mutation event must be observed) while T1.006 is **decidable at deployment time** with sufficient simulation matrix coverage. The vendor-tooling surface reflects this — Honeypot.is's matrix-simulation methodology is calibrated specifically for the T1.006 detection surface; Token Sniffer / GoPlus / CertiK Skynet surface T1.006-class detections under labels like "Cannot sell," "Sell tax 99%," "Honeypot-like behavior detected."

Three structural features distinguish the cohort:

1. **The deployment-and-discovery race is the operator's leverage.** Commodity scanners (Honeypot.is, Token Sniffer, GoPlus) detect malicious mints within minutes-to-hours of deployment, but retail buyers route to the mints through Telegram channel announcements, X memecoin trader accounts, and DEX-aggregator listings within seconds-to-minutes. The cohort persists because the time-to-buy is shorter than the time-to-detect at the user-decision layer. The defender intervention surface is necessarily *pre-trade UX-layer enforcement*, not post-deployment cohort accounting.

2. **The chain-distribution gradient (Base 54k / BNB 12k / Ethereum 1.2k in Q4 2024) reflects gas-cost economics, not detection-tooling gaps.** Base's per-deployment cost in Q4 2024 was a small fraction of Ethereum's, making the templated-redeployment economic shape viable at higher deployment volumes. The structural implication is that *cross-chain detection coverage* (not chain-specific tooling depth) is the binding defender intervention; per-chain tooling investment yields diminishing returns once the operator can cross-deploy.

3. **The legitimate-use overlap is structurally null.** Unlike T1.001 / T1.004 (where governance-gated tax / pause authority on regulated stablecoins is a legitimate use of the same primitive), T1.006's failure mode has no legitimate analogue: an immutably-deployed contract that permits purchases but blocks sales has no legitimate token-economic purpose. The vetted-allowlist mitigation pattern that resolves T1.001 / T1.002 / T1.004 false positives does not apply to T1.006; flagged contracts are *always* malicious or grossly misconfigured.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-2023 | Honeypot-by-design pattern documented in academic literature (`[torres2019]` Demystifying Honeypots in Ethereum Smart Contracts, USENIX Security 2019); commodity scanners (Honeypot.is, Token Sniffer) operational by 2020 | (foundational) |
| Mid-2023 | **Snibbb token (BNB Chain)** — meme coin permits buy / blocks sell; developer subsequently drains LP; canonical publicly-named per-incident case | **T1.006 → T5.001 chain** |
| 2023-08-24 to 2023-10-31 | Single EOA `0xC5535F839071b854a8deC65d3b30E36AB91229AB` funds 979 EOAs each of which deploys a honeypot token on BNB Chain; cohort attribution at single-funder granularity | **T1.006 cohort + M04 (funder-graph)** |
| 2024-02 | **CertiK nine-honeypot operator cohort** — single operator runs 9 honeypot deployments across 5 Telegram channels; cumulative extraction ~$3.2M; primary chains Ethereum + BNB Chain | **T1.006 single-operator-templated sub-pattern** |
| 2024-Q4 | **GoPlus / TenArmor Q4 2024 cross-chain prevalence** — 67,241 honeypot tokens detected across Ethereum / BNB Chain / Base; Base is dominant chain (54k); $45.2M Rugpull losses on Ethereum + BNB Chain | **T1.006 cohort scale-out to Base** |
| 2025-01 onward | New wave of honeypot tokens specifically targeting Base users (per CryptoRank coverage); cohort persistence into 2025-2026 | T1.006 continuing surface |

## What defenders observed

- **Pre-event (deployment-time layer):** Honeypot.is matrix-simulation across (small / medium / large) amounts × (EOA-to-EOA / EOA-to-pool / pool-to-EOA) directions × (early / late) block conditions surfaces T1.006 at deployment time with high recall. GoPlus token-security API exposes `is_honeypot`, `cannot_sell_all`, `slippage_modifiable` as discrete risk attributes. Detection signal latency: minutes-to-hours from deployment. Defender lesson: detection is solved; the gap is *user-layer enforcement* of the detected signal.
- **At-event (buy-side layer):** the honeypot's buy-side leg is structurally observable on-chain — successful swaps into the pool followed by reverted sell attempts produce a characteristic Etherscan / BscScan transaction-pair signature. Per-token-volume-versus-holder-count divergence (high cumulative buy volume, low cumulative sell volume relative to expected token-economic distribution) is a behavioural confirmation signal usable by chain analytics.
- **At-event (UX-layer signal):** wallet pre-trade simulation (MetaMask / Rabby / Phantom / OKX Wallet) increasingly surfaces honeypot warnings. Aggregator-side surfacing (1inch, Matcha, Jupiter) varies. The UX surface has matured significantly through 2024-2025; the cohort's persistence reflects both UX-coverage gaps and user-side dismissal of warnings under FOMO conditions.
- **Post-event:** unsellable tokens are not recoverable; the contract was designed at deployment to block holder exits. Operator-side response is limited to publishing the contract address as a known-bad and propagating the signal across wallet / venue / aggregator blocklists. Recovery on the LP-side ETH / WBNB requires the operator to be identified and prosecuted, which is rare at the per-incident scale ($300K-$500K) and bounded only at the cohort scale ($3.2M for the CertiK 2024 operator).

## What this example tells contributors writing future Technique pages

- **T1.006 is detectable at deployment; the binding constraint is UX-layer enforcement.** Future T1.006 contributors should focus on the *enforcement surface* (which wallets surface honeypot warnings, which aggregators block routes through honeypot pools, which venues / launchpads gate listings) rather than re-deriving the detection signal. The Honeypot.is methodology is the canonical detection pattern; the wallet pre-trade simulation surface is the canonical enforcement pattern.
- **Cohort-scale prevalence dominates per-incident severity.** Per-incident T1.006 losses are typically moderate ($100K-$500K range); cohort-scale operator profitability and aggregate retail loss are the operative concerns. Defender modelling should be cohort-first, not incident-first.
- **The Base 2024-Q4 spike is a chain-economics signal, not a tooling gap.** Cross-chain honeypot deployment scales with gas-cost economics; per-chain tooling investment yields diminishing returns once the operator can cross-deploy. Defender investments should prioritise *cross-chain* detection coverage over per-chain depth.
- **The legitimate-use overlap is structurally null.** Unlike T1.001 / T1.002 / T1.004, T1.006 has no legitimate analogue. Flagged contracts are always malicious or grossly misconfigured, which simplifies the false-positive analysis and operationalises the listing-time gate.
- **Templated-redeployment is the operator's leverage; cluster-attribution is the defender's leverage.** The CertiK February 2024 cohort and the August-October 2023 BNB Chain 979-EOA fan-out are the canonical funder-graph (M04) attribution cases. Future T1.006 examples should record the funder-graph fingerprint where the public record permits.

## Public references

- `[torres2019]` — academic foundational reference: Torres, Steichen, State, "The Art of The Scam: Demystifying Honeypots in Ethereum Smart Contracts," USENIX Security 2019.
- `[slowmistguidetohp]` *(proposed)* — SlowMist, "Guide to Avoiding HoneyPot Scams": <https://slowmist.medium.com/slowmist-guide-to-avoiding-honeypot-scams-3fb89a53906a>
- `[certikhoneypot]` *(proposed)* — CertiK, "Honeypot Scams" advisory: <https://www.certik.com/resources/blog/honeypot-scams>
- `[certikhoneypotproliferation]` *(proposed)* — CertiK, "The Proliferation of Honeypot Contracts in Web3": <https://www.certik.com/resources/blog/VRiiQwezlkHMeJO4fK5lz-the-proliferation-of-honeypot-contracts-in-web3>
- `[goplusq42024honeypot]` *(proposed)* — GoPlus Security, "Major Chains detected 67,000 HoneyPot Tokens in Q4, with Rugpull Incidents Leading to Losses of Up to $45M": <https://goplussecurity.medium.com/major-chains-detected-67-000-honeypot-tokens-in-q4-with-rugpull-incidents-leading-to-losses-of-up-to-75fe3e66c8d7>
- `[goplushoneypotcode]` *(proposed)* — GoPlus, "Unveiling Honeypot Scams. Dive into token code and safeguard Web3": <https://goplussecurity.medium.com/dive-into-token-code-and-safeguard-web3-security-b7960a34a8fe>
- `[hackenhoneypotscam]` *(proposed)* — Hacken, "Honeypot Crypto Scam Techniques Explained": <https://hacken.io/discover/honeypot-scam/>
- `[mediumsnibbb2023]` *(proposed)* — Coinmonks coverage of Snibbb and adjacent honeypot cases: <https://medium.com/coinmonks/meme-coins-and-the-crypto-honeypot-scam-how-to-protect-yourself-w-alpha-pick-c002d6f3cfa2>
- `[dipprofithoneypot2024]` *(proposed)* — Dipprofit honeypot scam guide; aggregate cohort coverage including the February 2024 nine-honeypot operator: <https://www.dipprofit.com/honeypot-crypto-scam-memecoin-rugpull-guide/>
- `[cryptorankhoneypotbase2025]` *(proposed)* — CryptoRank coverage of the new wave targeting Base in early 2025: <https://cryptorank.io/news/feed/4302b-new-wave-honeypot-tokens-base-users>
- `[chainalysis2025rug]` — broader cohort retrospective.
- `[slowmist2024report]` — broader 2024 cohort retrospective.

## Discussion

The honeypot-by-design cohort is the **highest-volume malicious-token class by deployment count** at v0.1, and yet OAK does not yet have a clean Technique slot for it. T1.001 / T1.004 / T1.005 each capture adjacent failure modes but none captures the immutable-bytecode-at-deployment hostile-transfer-logic class cleanly. The proposal in `TAXONOMY-GAPS.md` to introduce **T1.006 (Honeypot-by-Design)** is motivated by this gap.

The structural distinction matters because the detection surface and the mitigation surface diverge across T1.001 / T1.004 / T1.006:

- T1.001 / T1.004 mitigations rely on *authority-graph enumeration* + *post-launch monitoring for authority-mutation events* — the failure mode is post-deployment.
- T1.006 mitigations rely on *deployment-time static analysis* + *matrix simulation* — the failure mode is at-deployment.

The detection-tooling cohort (Honeypot.is, Token Sniffer, GoPlus, CertiK Skynet, RugCheck) maps imperfectly onto the OAK Technique split at v0.1 because the vendor categories collapse T1.001 / T1.004 / T1.006 under labels like "Honeypot" or "Cannot sell." Defender-tooling alignment with OAK would benefit from the T1.006 split because the operational mitigation pipelines diverge.

For OAK's broader cohort coverage, this case + the Solana PD burn-on-buy cohort (`examples/2024-09-solana-permanent-delegate-burn-on-buy-cohort.md`) + the Hyperbridge counterfeit-mint case (`examples/2026-04-hyperbridge-merkle-proof-counterfeit-mint.md`) collectively establish that the **fake / honeypot / malicious-by-design smart contract cohort** is a cross-chain pattern with structurally distinct sub-surfaces per chain ecosystem. The cohort is the v0.x-priority gap that motivates the T1.006 / T1.007 / T6.005 / T6.006 sub-Technique proposals in `TAXONOMY-GAPS.md`.
