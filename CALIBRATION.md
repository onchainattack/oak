# OAK Parameter Calibration Methodology v0.1.0

**Status:** draft  
**Maintainer:** @iZonex  
**Target audience:** detection-engine implementors, SOC analysts, spec authors  

This document defines how to calibrate OAK detection-spec parameters for a
specific deployment context. It is the normative methodology for achieving
**PLS Conformance Level L4 (Calibrated)** — the level at which a deployed
spec is tuned against known-positive incidents and produces an acceptable
false-positive rate.

A spec with default parameters is a **template**. Calibration turns it into
a **detector**.

---

## 1. Why calibration matters

OAK specs ship with **expert-heuristic defaults** — values chosen by domain
experts based on attack forensics, not on any specific chain's data
distribution. These defaults are intentionally conservative (erring toward
false positives over false negatives) and are **not tuned for any specific
deployment context**.

Three things make default parameters insufficient:

1. **Chain differences.** A 10-block window means ~120 seconds on Ethereum,
   ~4 seconds on Solana, and ~30 seconds on BSC. The same numeric default
   encodes different economic realities.
2. **Volume/TVL scaling.** A $10,000 extraction threshold is noise on
   Ethereum mainnet but is the entire TVL of a new Arbitrum protocol.
3. **Noise-floor variation.** Each chain, protocol, and asset class has its
   own background noise distribution — what's anomalous on one venue is
   routine on another.

Calibration is the process of adjusting spec parameters so that the detector
operates at a known, acceptable point on the precision-recall curve **for a
specific deployment context**.

---

## 2. Parameter taxonomy

OAK specs use ~620 unique parameter names across 134 specs. They group into
9 functional categories, each with its own calibration methodology:

| # | Category | Pattern | ~Count | Calibration approach |
|---|----------|---------|--------|---------------------|
| 1 | Temporal windows | `_window`, `_blocks`, `_lookback`, `_seconds`, `_days` | 130+ | Per-chain block→time conversion; ROC sweep |
| 2 | Thresholds | `_threshold`, `min_`, `max_`, `_floor` | 170+ | Percentile-from-baseline; z-score; MAD |
| 3 | Ratios & proportions | `_ratio`, `_share` | 40+ | Empirical distribution from benign data |
| 4 | Counts & cardinality | `_count`, `_n`, `_hops` | 30+ | Combinatorial significance; Poisson model |
| 5 | Factors & multipliers | `_factor`, `_multiplier` | 15+ | Sensitivity analysis; safety margin |
| 6 | Rates | `_rate` | 4 | Risk-free-rate anchoring; per-asset spread |
| 7 | Registries & allowlists | `_registry`, `_allowlist`, `_feed`, `_watchlist` | 51+ | Authoritative-source binding; coverage audit |
| 8 | Per-chain objects | chain-keyed mappings | 10+ | Per-chain measurement; cross-chain normalization |
| 9 | Durations & delays | `_delay`, `_lag`, `_duration` | 10+ | Protocol-level constraint; operational SLA |

---

## 3. Calibration methodology by category

### 3.1 Temporal windows

**What they control.** The observation horizon over which a detection PATH
aggregates events. Windows that are too short produce unstable estimates
(high variance); windows that are too long introduce detection latency and
dilute the signal with unrelated activity.

**Default derivation.** Expert heuristics based on attack timelines from
forensic post-mortems. For example, `donation_deposit_window: 10` (blocks)
in T9.011 reflects the observation that donation→victim-deposit sequences
typically complete within ~2 minutes on Ethereum mainnet.

**Step 1: Convert blocks to wall-clock time per chain.**

```
effective_seconds = parameter_blocks × chain_block_time

Chain block times (empirical average, 2024-2025):
  Ethereum:     12.0 s
  Solana:        0.4 s
  BSC:           3.0 s
  Polygon:       2.0 s
  Arbitrum:      0.25 s (L2 block; finality ~64 blocks on L1)
  Optimism:      2.0 s
  Avalanche:     2.0 s (C-chain)
  Base:          2.0 s
  zkSync:        1.0 s (approx; batch-dependent)
  StarkNet:      variable (app-chain block; ~6 min for L1 settlement)
```

**Step 2: Choose window based on detection objective.**

| Objective | Recommended window | Rationale |
|-----------|-------------------|-----------|
| Real-time alerting | 1–10 minutes | Must catch the attack before it completes |
| Batch/post-hoc detection | 1–24 hours | Can aggregate more evidence; lower FP rate |
| Campaign correlation | 7–90 days | Cross-attack pattern recognition |

**Step 3: Validate with a sweep.**

Run the detector across a labeled dataset with window sizes at 10+ points
spanning [0.5×, 5×] the default. Plot detection rate and FP rate against
window size. Choose the knee of the detection-rate curve — the smallest
window that achieves ≥90% of the asymptotic detection rate.

**Common mistakes.**
- Using the same block count across chains without time-normalization
- Setting windows too wide for real-time alerting (adds latency without
  improving precision)
- Setting windows too narrow for low-activity protocols (no events in
  window → detector is blind)

### 3.2 Thresholds

**What they control.** The numeric boundary at which a measurement crosses
from "benign variation" to "suspicious deviation." This is the single most
impactful calibration dimension — a 2× change in a threshold can swing FP
rate by an order of magnitude.

**Default derivation.** Most OAK thresholds are expert heuristics drawn from
attack magnitudes observed in post-mortems. For example,
`deviation_threshold: 0.02` (2%) in T9.001 reflects the typical oracle
manipulation magnitude seen in Mango Markets (2022) and Cream Finance
(2021). Some have empirical anchors — `outflow_share_at_peak: 0.30` in
T3.003 notes "30-60% canonical" based on observed pump-and-dump patterns.

**Method A: Percentile-from-baseline (recommended for most specs).**

```
1. Collect N days of benign data (no known attacks) for the target protocol/chain.
2. Compute the detection metric (e.g., deviation, divergence, shortfall_ratio)
   for every observation in the benign dataset.
3. Set the threshold at the P99.9 or P99.99 percentile of the benign distribution.
   - P99.9: expect 1 FP per 1,000 observations (higher recall, moderate precision)
   - P99.99: expect 1 FP per 10,000 observations (higher precision, lower recall)
4. Validate against known positives: ensure all positive fixtures fire.
5. If positives don't fire, lower to the minimum percentile that catches them.
```

**Method B: Z-score from rolling mean (for volatile/trending metrics).**

```
1. Compute rolling μ and σ of the metric over a trailing window (≥30 days).
2. Set threshold at μ + k×σ where k ∈ [3, 6].
   - k=3: ~0.27% FP rate under normality (assumes normality — verify)
   - k=5: conservative, catches only extreme outliers
   - k=6: very conservative, for metrics with fat-tailed distributions
3. Validate the normality assumption with a QQ-plot or Anderson-Darling test.
   If the distribution is fat-tailed, use Method A instead.
```

**Method C: MAD-based (for skewed/heavy-tailed metrics).**

```
MAD = median(|X_i − median(X)|)

Set threshold at median(X) + k × MAD where k ∈ [5, 10].
- k=5: roughly equivalent to 3σ for normal data, robust to outliers
- k=10: catches only extreme deviations
```

**Choosing between methods:**

| Metric distribution | Method | Why |
|---------------------|--------|-----|
| Approximately normal | B (z-score) | Most intuitive, well-understood |
| Skewed, unimodal | A (percentile) | Distribution-free, interpretable |
| Heavy-tailed with outliers | C (MAD) | Robust to the outliers you're trying to detect |
| Bounded [0,1] | A (percentile) | Normality assumption violated |

**Common mistakes.**
- Using Method B without verifying normality (fat tails → FP explosion)
- Setting thresholds from attack magnitudes alone (optimizes for known
  attacks, misses unknown variants)
- Using the same threshold for protocols of vastly different size (a 2%
  deviation on a $100M pool ≠ 2% on a $10K pool)

### 3.3 Minimums and maximums

**What they control.** Bounds that filter out observations too small to be
meaningful (`min_*`) or too large to be plausible (`max_*`).

**`min_*` calibration — the noise floor.**

The purpose of a minimum is to suppress alerts on activity below the
economic significance threshold. A flash loan of $100 is not an attack; a
flash loan of $10M might be.

```
Method — Cost-of-attack floor:

  1. Estimate the minimum profitable attack size for the target protocol:
       min_profit = gas_cost × gas_price + MEV_bribe + contract_deployment_cost
       min_attack_size = min_profit / protocol_exploit_margin
  2. Set min_ parameter to 2-3× min_attack_size (safety margin).
  3. Alternative for low-information contexts: set at the 95th percentile
     of benign transaction values — suppresses the bottom 95% of routine
     activity while preserving the top 5% for analysis.
```

**`max_*` calibration — the plausibility ceiling.**

The purpose of a maximum is to filter out measurement errors and data-feed
artifacts. For example, `max_nav_divergence: 0.05` (T14.004) prevents
alerting on the ~100% divergence that occurs when a DEX pool has zero
liquidity.

```
Method — Distribution-tail cap:

  1. Plot the metric distribution from benign data.
  2. Identify the point where values become physically implausible
     (e.g., divergence > 1.0 implies negative price, which is impossible
     without a data error).
  3. Set max_ at the 99.999th percentile OR at the physical implausibility
     boundary, whichever is lower.
```

### 3.4 Ratios and proportions

**What they control.** Relative comparisons — stake/TVL, outflow share,
shortfall ratio, concentration share. Ratios are unitless and nominally
portable across chains, but their benign distributions are NOT.

**Default derivation.** Economic rationality bounds. For example,
`stake_tvl_ratio_critical: 0.1` in T10.007 encodes the condition where
validators have 10% as much at stake as the bridge custodies — a
rational-attacker breakeven condition.

**Calibration method — empirical ratio distribution.**

```
1. Collect the ratio for a reference population (e.g., all bridges, all
   validators, all vaults) at regular intervals over ≥30 days.
2. Fit a Beta distribution if the ratio is bounded [0,1] (most OAK ratios
   are). If unbounded [0,∞), fit a log-normal.
3. Set the threshold at the α-quantile of the fitted distribution where
   α is chosen based on the alert budget for that detection path.
4. Per-chain adjustment: repeat steps 1-3 per chain. Ratios that are
   "normal" on Ethereum (many validators, deep liquidity) may be
   "extreme" on a smaller chain.
```

**Common mistakes.**
- Assuming ratios are chain-portable without verification
- Not accounting for ratio volatility at low denominators (a vault with
  totalSupply=100 has much noisier share-price ratios than one with 10^6)

### 3.5 Factors and multipliers

**What they control.** Scaling coefficients applied to threshold computations.
Example: `spread_multiplier: 3.0` in T14.004 means alert when DEX-vs-redemption
spread exceeds 3× the risk-free return.

**Default derivation.** Safety margins. A multiplier of 3.0 means "the signal
must be 3× the background noise before we alert." Lower → higher recall, higher
FP. Higher → lower recall, lower FP.

**Calibration method — sensitivity analysis.**

```
1. Choose a base value from economic first principles (e.g., the risk-free
   rate spread that an arbitrageur would capture).
2. Run the detector at multiplier values [1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0].
3. For each value, record: TP count, FP count, detection latency.
4. Choose the multiplier that maximizes F_beta score for the deployment's
   beta preference:
     - beta=1: equal weight to precision and recall (balanced)
     - beta=0.5: precision matters 2× more than recall (conservative)
     - beta=2: recall matters 2× more than precision (aggressive)
```

### 3.6 Counts and cardinality

**What they control.** "At least N occurrences" thresholds — `min_queue_actions`,
`min_cascade_liqs`, `concentration_n`, `trace_hops`.

**Default derivation.** Combinatorial significance. `min_queue_actions: 3` means
"3 queue operations timed against AVS events are unlikely to be random chance
(p < 0.05 under a Poisson model with the observed base rate)."

**Calibration method — Poisson significance.**

```
1. Measure the base rate λ of the event in benign data (events per unit time).
2. Choose min_count such that P(X ≥ min_count | λ, window) < α
   where α is the acceptable false-positive probability per observation window.
3. Under Poisson: P(X ≥ k) = 1 − Σ_{i=0}^{k−1} (λt)^i × e^{−λt} / i!
4. α selection:
     - α = 0.01: 1% chance of FP per window (higher recall)
     - α = 0.001: 0.1% chance of FP per window (higher precision)
     - α = 0.0001: conservative, for high-cost alert responses
```

**Common mistakes.**
- Not accounting for multiple testing: if you test 100 independent windows
  per day at α=0.01, expect ~1 FP/day from this path alone
- Using the same λ across chains with different activity levels

### 3.7 Rates

**What they control.** Annualized rates used as benchmarks — `risk_free_rate`,
`cost_of_capital_benchmark`.

**Default derivation.** Macro-financial anchors. `risk_free_rate: 0.05` (5%)
approximates the US Treasury yield + crypto risk premium.

**Calibration method — rate anchoring.**

```
1. Set risk_free_rate to the current DeFi risk-free rate:
     - Ethereum: stETH yield (~3-4% annual, 2024-2025 range)
     - Solana: native staking yield (~5-7%)
     - Cross-chain: use the US 3-month T-bill rate as the risk-free floor
2. Set cost_of_capital_benchmark to risk_free_rate + protocol_risk_premium
   where protocol_risk_premium is:
     - 2-5% for established protocols (Aave, Lido, Uniswap)
     - 5-15% for mid-tier protocols
     - 15-50% for new/experimental protocols
3. Update rates quarterly — stale risk-free rates misprice economic incentives.
```

### 3.8 Registries and allowlists

**What they control.** Curated lists that classify addresses, domains, or
entities as trusted or known-malicious.

**Default derivation.** The default `[]` means "no pre-populated data." The
spec functions correctly without registry data but with reduced precision
(more FPs from unclassified benign actors).

**Calibration method — authoritative-source binding.**

```
For each registry/allowlist parameter:

1. Identify the authoritative source:
     - Token addresses: chain-specific token lists (Uniswap, Jupiter, 1inch)
     - Exchange wallets: Nansen, Arkham, Chainalysis attribution data
     - Sanctioned addresses: OFAC SDN, EU consolidated list, UN sanctions
     - MEV builders: mevboost.pics, libmev, eigenphi
     - Audit reports: solodit.xyz, code4rena, sherlock, immunefi
2. Measure coverage: what fraction of known-bad addresses does this source
   capture? What fraction of flagged addresses are false matches?
3. Set refresh cadence:
     - Sanctions lists: daily (regulatory changes)
     - Token registries: weekly (new deployments)
     - MEV builders: monthly (relatively stable)
     - Audit reports: per-publication
4. Version-pin the registry: include a retrieval timestamp or commit hash
   so that detection results are reproducible.
```

**Common mistakes.**
- Using a single CEX as the sole source of "reference price" (downtime →
  all detection paths blind)
- Not refreshing sanction lists (new designations missed)
- Including the protocol's own contracts in allowlists without verifying
  they are not attacker-controlled proxies

### 3.9 Per-chain objects

**What they control.** Parameters whose value is a mapping from chain name to
a chain-specific value. Example from T10.006:

```yaml
finality_blocks_by_chain:
  type: object
  default:
    ethereum: 12
    polygon: 256
    arbitrum: 64
    optimism: 64
    bsc: 48
    avalanche: 12
    base: 64
    solana: 32
```

**Default derivation.** Protocol-level constants. Finality depth comes from
each chain's consensus mechanism (Ethereum: 2 epochs = 64 blocks for
finality; 12 blocks is a lighter "safe" threshold).

**Calibration method — per-chain measurement.**

```
1. For each chain in the deployment scope:
   a. Measure the empirical chain property (block time, finality depth,
      gas cost, TVL) from recent data (last 30 days).
   b. Do NOT copy-paste chain parameters from documentation — measure them.
      Documented block times are targets; empirical block times drift.
2. Normalize temporal parameters:
     chain_blocks = ceiling(default_wall_clock_seconds / chain_block_time)
3. Normalize economic parameters:
     chain_threshold_usd = default_threshold_usd × (chain_tvl / reference_chain_tvl)
   where reference_chain_tvl is typically Ethereum mainnet TVL.
4. For chains without empirical data, use the most similar chain's values
   and mark the calibration as "inherited, unvalidated."
```

---

## 4. Per-chain calibration framework

### 4.1 Block time normalization

Any parameter suffixed `_blocks` or documented as "blocks" must be converted
to wall-clock time for cross-chain consistency.

```
# Per-chain effective time for a 10-block window:
ethereum:  10 × 12.0s  = 120s
solana:    10 × 0.4s   =   4s   ← 30× shorter!
polygon:   10 × 2.0s   =  20s
bsc:       10 × 3.0s   =  30s
arbitrum:  10 × 0.25s  =   2.5s ← 48× shorter! (but see L2 finality note)
```

**L2 finality caveat.** Arbitrum/Optimism/Base block times are fast, but L2
finality is gated by L1 settlement. For detection purposes, use the L2 block
time for event ordering but the L1 finality depth for confirmation. An
Arbitrum transaction in block N is reorg-safe only after the containing L1
batch is finalized (~64 L1 blocks = ~12.8 minutes).

### 4.2 Economic parameter scaling

USD-denominated parameters (`min_vault_tvl`, `min_extracted_usd`,
`min_flashloan_usd`) must be scaled to the chain's economic magnitude.

```
Scale factor = chain_TVL / ethereum_mainnet_TVL

Example (2025-03 approximate):
  Ethereum:    TVL ~$50B  → scale factor 1.00
  Arbitrum:    TVL ~$3B   → scale factor 0.06
  Solana:      TVL ~$4B   → scale factor 0.08
  Polygon:     TVL ~$1B   → scale factor 0.02
  Base:        TVL ~$2B   → scale factor 0.04

A $10,000 min_extracted_usd on Ethereum becomes:
  Arbitrum: $10,000 × 0.06 = $600
  Polygon:  $10,000 × 0.02 = $200
```

Be cautious: linear TVL scaling can over-adjust. A $200 theft on Polygon may
not be worth the investigation cost regardless of TVL. Set a **global floor**
(typically $100-500) below which alerts are suppressed regardless of chain.

### 4.3 Calibration ordering

Calibrate parameters in this order — each step depends on the previous:

```
1. Registries & allowlists (§3.8)      — populate first; everything depends on classification
2. Temporal windows (§3.1)             — define the observation window
3. Per-chain objects (§3.9)            — normalize for deployment chains
4. Minimums & maximums (§3.3)         — set the noise floor and plausibility ceiling
5. Thresholds (§3.2)                  — the core detection boundary
6. Counts & cardinality (§3.6)        — combinatorial significance
7. Ratios & proportions (§3.4)        — relative comparisons
8. Factors & multipliers (§3.5)       — final sensitivity trim
9. Rates (§3.7)                       — economic benchmarks
```

---

## 5. Severity calibration

### 5.1 The four-tier severity model

OAK uses four severity levels. Calibration maps parameter thresholds to
severity boundaries:

| Severity | Meaning | Operational response | Expected FP tolerance |
|----------|---------|---------------------|----------------------|
| **critical** | Attack in progress; definitive signal | Immediate human escalation (<5 min) | Near-zero (1/month or less) |
| **high** | Strong attack signal; likely true positive | Human review within 1 hour | Very low (1/day or less) |
| **medium** | Anomaly detected; requires triage | Queued for analyst review (24h SLA) | Low (a few/day) |
| **low** | Weak signal; informational | Dashboard; no alert | Moderate |

### 5.2 Severity boundary calibration

Most specs compute severity in the pseudocode with conditions like:

```
severity="critical" if (is_front_runnable and divergence > 0.5) else
         "high"     if divergence > share_price_divergence_threshold * 3 else
         "medium"
```

These boundaries are **multiplicative offsets from the calibrated
threshold**, not absolute values. When you calibrate the base threshold
(`share_price_divergence_threshold`), the severity boundaries move with it.

**Calibration method — severity boundary validation.**

```
1. Calibrate the base threshold to the P99.9 of benign data (§3.2 Method A).
2. Set severity boundaries as multiples of the calibrated threshold:
     critical_multiple × calibrated_threshold
     high_multiple     × calibrated_threshold
   where the multiples are spec-defined (e.g., 3× for high, 0.5 for the
   front-runnable + high-divergence conjunction → critical).
3. Validate: collect all known positive incidents. Plot their maximum metric
   value against severity. All critical incidents should produce ≥ critical
   severity. Adjust multiples if not.
4. Validate FP severity: collect all FPs from benign data. None should be
   critical. If any are, increase the critical multiple.
```

### 5.3 Severity consistency across PATHs

When multiple PATHs within a spec fire simultaneously, the overall alert
severity is `max(path_severities)` — the most severe path wins. Calibrate so
that:

- A single PATH firing at "high" is not escalated to "critical" by a
  second PATH firing at "low"
- PATH E (cross-correlation) should only upgrade severity, never downgrade
- Cross-spec correlation (T14.004 PATH E discriminating from T14.003) uses
  severity downgrade: "this depeg is systemic, not idiosyncratic → medium"

---

## 6. Calibration data pipeline

### 6.1 Required datasets

| Dataset | Purpose | Minimum size | Collection period |
|---------|---------|-------------|-------------------|
| **Benign baseline** | Derive thresholds, measure FP rate | 10,000+ observations per metric | ≥ 30 days |
| **Known positives** | Validate detection rate | All available post-mortems for the spec | Historical |
| **Labeled mixed** | Measure precision/recall | ≥100 positives + ≥10,000 negatives | Historical |

### 6.2 Benign baseline collection

```
For each protocol/chain/asset combination in deployment scope:

1. Select a recent 30+ day period with NO known attacks on the target.
2. For each PATH in the spec:
   a. Run the PATH's metric computation at the spec's default observation
      cadence (e.g., every block, every share_price_check_interval blocks).
   b. Record every computed metric value + metadata (block, timestamp, TVL,
      volume context).
   c. Store as (timestamp, metric_name, value, context_json).
3. Tag the dataset with:
     - Chain
     - Protocol name and address
     - Asset/underlying
     - Collection date range
     - Data source provider (e.g., "Alchemy", "QuickNode", "Dune")
4. Version the dataset. Re-collect if the protocol upgrades, the chain forks,
   or market regime changes substantially.
```

### 6.3 Known-positive collection

```
For each positive fixture listed in the spec's test_fixtures section:

1. Retrieve the post-mortem report (Rekt, BlockSec, Phalcon, Peckshield,
   official protocol report).
2. Extract:
     - Attack transaction hash(es)
     - Block range
     - Attacker address(es)
     - Victim address(es)
     - Total extracted (USD)
     - Attack sequence timeline
3. Reconstruct the on-chain state at each relevant block.
4. Run the spec's PATHs against the reconstructed state.
5. Record which PATHs fired, at which severity, at which block (detection
   latency in blocks from attack initiation).
```

### 6.4 Train/validation split

Do NOT calibrate on the same data used for validation. Split known positives:

```
- Calibration set: 70% of known positives (randomly selected)
- Holdout set: 30% of known positives (used only for final validation)

Plus:
- A "future" holdout: the most recent 3 positive incidents by date,
  regardless of count. These test whether calibration generalizes forward
  in time.
```

---

## 7. Calibration validation

### 7.1 Backtesting protocol

```
For each deployable spec, before production:

1. Load the calibrated parameters.
2. Replay the benign baseline dataset. Count FPs:
     - Total FP count
     - FP rate = FP_count / total_observations
     - FP rate per severity tier
     - Maximum consecutive FPs (alert fatigue metric)
3. Replay the holdout positive set. Count:
     - Detection rate = TP_count / total_positives
     - Mean detection latency (blocks from attack initiation)
     - Minimum severity assigned to each TP
4. Report:
     - Precision = TP / (TP + FP) at each severity tier
     - Recall = TP / total_positives
     - F0.5 score (precision-weighted) for critical+high
     - F2 score (recall-weighted) for critical+high
5. Acceptance criteria (suggested):
     - Critical FP rate: 0 (hard requirement — no false criticals)
     - High+critical recall: ≥90% of known positives
     - Detection latency: ≤50% of the attack's total duration
```

### 7.2 False-positive rate measurement

The FP rate must be measured in context — alerts per (protocol × day) not
alerts per observation. A 0.1% FP rate per observation block equals ~86
FPs/day if the detector runs every block on Ethereum (7,200 blocks/day).

```
FP_rate_per_day = FP_rate_per_observation × observations_per_day

Example:
  T9.001 PATH A runs every 50 blocks (share_price_check_interval: 50).
  Ethereum: 7,200 blocks/day → 144 observations/day.
  If FP_rate_per_observation = 0.001 (P99.9 threshold):
    Expected FPs = 144 × 0.001 = 0.144/day ≈ 1 FP per week. ← acceptable

  But if the same spec runs every block (min_blocks: 1) on Solana
  (216,000 blocks/day):
    Expected FPs = 216,000 × 0.001 = 216/day. ← unacceptable

Mitigation: calibrate per-observation FP rate against observation frequency.
High-frequency paths need tighter thresholds (P99.99 or P99.999).
```

### 7.3 Detection latency measurement

```
Detection latency = (first_alert_block − attack_initiation_block) × block_time

Measure across all holdout positives:
  - P50 latency (median): the typical case
  - P95 latency: worst-case within normal operation
  - Maximum latency: detection miss if > attack duration

If P95 latency exceeds the operational SLA for the severity tier:
  - Widen the observation window (reduces latency for batch detectors)
  - Increase the observation cadence (more frequent checks)
  - Lower the threshold (may increase FP rate — check the tradeoff)
```

### 7.4 Minimum viable calibration

A calibration is **minimum viable** when:

1. All registries are bound to concrete data sources with documented coverage.
2. All temporal parameters are normalized to the deployment chain's block time.
3. All economic parameters are scaled to the deployment chain's TVL.
4. Base thresholds are set from ≥30 days of benign baseline data.
5. Zero critical-severity false positives in ≥30 days of benign replay.
6. ≥80% of known positive fixtures produce an alert at high or critical severity.

Until these 6 conditions are met, the deployment is at **L3 (Bound)**, not
**L4 (Calibrated)**.

---

## 8. Calibration drift and maintenance

### 8.1 Triggers for recalibration

Recalibrate when any of these events occur:

| Trigger | Action | Urgency |
|---------|--------|---------|
| Protocol upgrade (new version, new features) | Re-collect benign baseline; re-validate | Before upgrade deploys |
| Chain fork/hard fork | Re-measure block time, finality; update per-chain params | At fork block |
| Market regime change (e.g., >50% TVL change in 30 days) | Re-scale economic parameters; re-run FP measurement | Within 1 week |
| New attack variant discovered (not caught by current calibration) | Add to holdout set; re-optimize thresholds | Within 48 hours |
| FP rate drift: >2× expected FP rate sustained for 7 days | Investigate cause; recalibrate affected PATHs | Within 1 week |
| Quarterly review | Update rates (§3.7); re-validate against latest positives | Quarterly |
| New data source provider (replacing deprecated provider) | Re-collect baseline from new provider; compare distributions | Before cutover |

### 8.2 Monitoring calibration health

Instrument the deployed detector with:

```
Metrics to emit per PATH per protocol per chain:

  observation_count{path, protocol, chain}          — total observations
  alert_count{path, severity, protocol, chain}      — alerts emitted
  metric_value{path, protocol, chain}               — histogram of metric values
  threshold_value{path, protocol, chain}            — current threshold (gauge)
  fp_count{path, severity, protocol, chain}         — analyst-confirmed FPs
  tp_count{path, severity, protocol, chain}         — analyst-confirmed TPs
  detection_latency_blocks{path, protocol, chain}   — histogram

Dashboards:
  1. Alert rate per PATH per day (sparkline, 90-day view)
  2. FP rate per PATH per week (bar chart, with severity stack)
  3. Metric value distribution vs threshold (overlaid histogram + vertical line)
  4. Detection latency P50/P95 (time series, 90-day view)
```

### 8.3 A/B testing calibration changes

```
When proposing a parameter change:

1. Run current calibration (A) and proposed calibration (B) in parallel
   on the same data stream for ≥7 days.
2. Compare:
     - Alert counts per severity tier (B should not produce >20% more alerts
       unless they are true positives)
     - FP rate (B should not increase FP rate)
     - Detection latency (B should not increase latency)
3. If B improves recall without degrading precision, promote B to production.
4. Archive A's parameters with the date range they were active — every alert
   emitted during A's tenure must be reproducible.
```

---

## 9. Calibration profiles

Different deployment contexts demand different points on the precision-recall
curve. Apply one of these profiles to the calibrated baseline:

### 9.1 Conservative profile (precision-optimized)

**Use when:** alert fatigue is the primary concern; SOC team is small; false
positives erode trust in the detector.

```
Adjustments from calibrated baseline:
  - Thresholds: baseline × 1.5 (wider margin)
  - Minimums: baseline × 2.0 (higher noise floor)
  - Multipliers: baseline × 1.5 (stronger signal required)
  - Severity: downgrade by one tier if only a single PATH fires

Expected: ~50% reduction in FP rate; ~10-20% reduction in recall.
```

### 9.2 Aggressive profile (recall-optimized)

**Use when:** missing an attack is costlier than investigating false leads;
SOC team has capacity to triage; the protocol is a high-value target.

```
Adjustments from calibrated baseline:
  - Thresholds: baseline × 0.7 (tighter margin)
  - Minimums: baseline × 0.5 (lower noise floor)
  - Multipliers: baseline × 0.8 (weaker signal accepted)
  - Severity: upgrade by one tier if two or more PATHs fire

Expected: ~10-20% improvement in recall; ~2-3× increase in FP rate.
```

### 9.3 Balanced profile (default)

**Use when:** deploying for the first time; no strong reason to skew.

```
No adjustments from calibrated baseline.
Use the empirical percentile thresholds directly.
Re-assess after 30 days of production data.
```

---

## 10. Worked example: T9.001 PATH A on Ethereum

### 10.1 Context

- **Spec:** T9.001 (Oracle Price Manipulation)
- **PATH:** A — deviation monitoring
- **Parameter:** `deviation_threshold` (default: 0.02)
- **Chain:** Ethereum mainnet
- **Protocol:** Aave V3 USDC market
- **Oracle:** Chainlink USDC/ETH

### 10.2 Benign baseline collection

```
Period: 2025-03-01 to 2025-04-01 (31 days)
Oracle: 0xA338e0492B2F01bA2A5d4E5E5a2d8b5B2E75D79F (Chainlink USDC/ETH)
Reference: Binance USDC/ETH mid-price (via Kaiko)
Observation cadence: every 50 blocks (~10 minutes)
Total observations: 8,928

Metric: deviation = abs(oracle_price − reference_price) / max(reference_price, 1)
```

### 10.3 Benign distribution

```
Percentile    Deviation
P50           0.0008
P90           0.0031
P95           0.0056
P99           0.0124
P99.9         0.0187
P99.99        0.0241
Max           0.0312 (during a single CEX flash crash, lasted 2 blocks)
```

### 10.4 Threshold selection

```
Default threshold: 0.02 (2%)

The default falls between P99.9 (0.0187) and P99.99 (0.0241).
At 0.02: expected ~0.05% FP rate → ~4.5 FPs/month at 144 obs/day.

Option A — conservative: threshold = P99.99 = 0.024
  Expected FPs: ~0.0045/day → ~1 FP per 7 months
  Risk: may miss oracle manipulations <2.4%

Option B — balanced: threshold = P99.9 = 0.019
  Expected FPs: ~0.14/day → ~4 FPs/month
  Catches: all oracle manipulations ≥1.9%

Option C — aggressive: threshold = P99 = 0.012
  Expected FPs: ~1.4/day → ~42 FPs/month
  Catches: subtle manipulations down to 1.2%

Validate against known positives:
  - 2022-10 Mango Markets: MNGOperp oracle deviation reached 0.35
    → All options catch this.
  - 2021-10 Cream Finance: yUSD oracle deviation reached 0.18
    → All options catch this.
  - 2023-02 BonqDAO: WALBT oracle deviation reached 0.96
    → All options catch this.

Decision: Option B (balanced, threshold=0.019) for initial deployment.
All known positives are ≥10× this threshold, so recall is not at risk.
Re-assess after 30 days of production.
```

### 10.5 Severity boundary calibration

The spec defines `deviation > deviation_threshold × 3` as "high" (non-critical
without additional factors). This is spec-internal logic, not a separate parameter.

```
At threshold=0.019:
  - deviation ≥ 0.019 → medium (above threshold)
  - deviation ≥ 0.057 → high (3× threshold)
  - deviation ≥ 0.50 + front_runnable → critical (conjunction with vault condition)

Known positives:
  Mango Markets: 0.35 → high (not critical — no vault front-running involved)
  Cream Finance: 0.18 → high
  BonqDAO: 0.96 → high

Severity boundaries validated — all known positives are "high," none incorrectly
classified as "medium" or "critical."
```

### 10.6 Calibration record

```yaml
calibration_record:
  spec_id: oak-detection-T9.001
  path: PATH_A
  parameter: deviation_threshold
  chain: ethereum
  protocol: aave_v3_usdc
  calibrated_value: 0.019
  default_value: 0.02
  calibration_method: percentile_from_baseline
  baseline:
    period: "2025-03-01 to 2025-04-01"
    observations: 8928
    cadence: "50 blocks"
    percentiles:
      p99: 0.0124
      p99_9: 0.0187
      p99_99: 0.0241
  validation:
    known_positives_tested: 3
    detection_rate: "3/3 (100%)"
    expected_fp_per_month: 4.3
  calibrated_by: "@analyst"
  calibrated_date: "2025-04-05"
  next_review: "2025-07-05"
```

---

## 11. Calibration tooling

### 11.1 Minimum toolset

A calibrator needs:

1. **Data lake** with historical event/state data for the deployment chain(s)
   at the spec's observation cadence (DSR §6 defines ingestion patterns).
2. **Replay harness** that runs the spec's PATHs against historical state
   and records metric values + alert decisions.
3. **Labeled incident database** with attack block ranges, addresses, and
   classifications (at minimum, the spec's `test_fixtures.positive` entries).
4. **Calibration notebook** (Python/Jupyter) that loads the replay output,
   computes percentiles, fits distributions, sweeps thresholds, and produces
   the calibration record in the format shown in §10.6.

### 11.2 Calibration automation

The calibration process (§3-7) can be semi-automated:

```
For each spec, for each deployment chain:

1. [AUTO] Run benign baseline collection for 30+ days.
2. [AUTO] Compute metric distributions and percentiles.
3. [AUTO] Sweep thresholds at 20 points spanning [P95, P99.999].
4. [AUTO] Plot precision-recall curve, F0.5 curve, detection latency curve.
5. [HUMAN] Choose the operating point based on deployment profile (§9).
6. [AUTO] Generate calibration record YAML.
7. [HUMAN] Review and sign off.
```

Steps 5 and 7 require human judgment because the cost of false positives
vs. false negatives is a business decision, not a statistical one.

---

## 12. Relationship to other OAK artifacts

| Artifact | Role in calibration |
|----------|-------------------|
| **PLS.md** | Defines L4 (Calibrated) conformance level (§13); parameter binding semantics (§12) |
| **DSR.md** | Defines data source schemas needed for baseline collection; ingestion patterns (§6); provider maturity tiers (§7) |
| **Spec YAML** | Provides default parameters, pseudocode, test_fixtures, false_positive_modes |
| **CALIBRATION.md** (this document) | Methodology for deriving calibrated values from the defaults |
| **Test Fixture Runner** (planned) | Automated replay harness for validation (§7) |

---

## Appendix A: Parameter type reference

OAK parameters use these types (from PLS.md §12):

| Type | Example | Calibration notes |
|------|---------|-------------------|
| `number` | `0.02` | Floating-point. Calibrate to appropriate significant digits (typically 2-4). |
| `integer` | `1800` | Whole number. Blocks, counts, indices. |
| `duration` | `90d`, `6h`, `30m`, `60s` | Time with unit suffix. Normalize across chains. |
| `list` | `[cex_mid, multi_venue_twap_30m]` | Ordered sequence. Registry/allowlist type. |
| `object` | `{ethereum: 12, polygon: 256}` | Key-value mapping. Per-chain or per-protocol. |

## Appendix B: Common calibration failure modes

| Failure | Symptom | Prevention |
|---------|---------|------------|
| **Default-as-calibrated** | Deploying with spec defaults and calling it "calibrated" | Require §7.4 minimum viable calibration evidence before accepting L4 claim |
| **Overfit to known positives** | 100% recall on calibration set, 0% on new attacks | Holdout set (§6.4); "future" holdout for temporal generalization |
| **Single-chain calibration** | Calibrated on Ethereum, deployed to 8 chains with same values | Per-chain normalization (§3.9, §4) for every deployment chain |
| **Stale baseline** | Calibrated once, never re-collected; market has changed | Quarterly re-baseline (§8.1); automated drift detection |
| **Percentile blind spot** | P99.9 calibrated from too-small sample (N=100: P99.9 is the max) | Require ≥10,000 observations for P99.9 calibration (§6.1) |
| **Alert budget exhaustion** | 10 PATHs each calibrated to 1 FP/day → 10 FPs/day total | Compute aggregate FP budget across all active PATHs; adjust per-PATH thresholds to stay within budget |
| **Severity inflation** | All alerts marked "high" because "medium" alerts are ignored | Enforce severity distribution targets: ~60% medium, ~30% high, ~10% critical in calibrated state |
