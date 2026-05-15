# Chainalysis laundering report — stablecoin issuer-selection laundering — 2024

**Loss:** **Research/reporting artifact, not a per-victim loss.** Chainalysis's 2024 Crypto Crime Report documented launderers' stablecoin-issuer selection as a structural methodology: sanctioned and high-risk clusters systematically preferred USDT over USDC for the pre-off-ramp transit leg, exploiting the divergence in freeze policies between Tether and Circle. The report established issuer-selection as a measurable laundering-methodology signal distinct from general stablecoin usage.
**OAK Techniques observed:** **OAK-T7.008** (Stablecoin Issuer Freeze-Asymmetry Laundering) — industry-report evidential anchor. The Chainalysis report provides the primary third-party evidence base for stablecoin-issuer selection as a laundering methodology, documenting per-cluster USDT/USDC holding ratios, pre-off-ramp holding-duration divergence, and per-issuer freeze-event data.
**Attribution:** **confirmed** — Chainalysis reporting, corroborated by TRM Labs and Elliptic stablecoin-laundering methodology research.

**Key teaching point:** The Chainalysis stablecoin-issuer-selection analysis provides the industry evidential anchor for T7.008: launderers' selection of stablecoin issuer is not random or convenience-driven — it is a systematic methodology exploiting measurable divergence in issuer freeze policies. The report's per-issuer freeze-event and per-cluster holding-ratio metrics establish the baselines against which T7.008's detection logic is calibrated.

## Summary

Chainalysis's 2024 Crypto Crime Report devoted specific analysis to stablecoin-issuer selection as a distinct laundering methodology dimension. Key findings: (1) sanctioned and high-risk clusters held a significantly higher ratio of USDT to USDC than the overall market average, indicating systematic issuer preference; (2) pre-off-ramp USDC holding durations were significantly shorter than USDT holding durations for the same clusters, suggesting rapid conversion through USDC only at the point of off-ramp deposit; (3) the issuer-preference signal was strongest for clusters associated with sanctioned entities (DPRK, Russian ransomware operators) that face the highest freeze risk from U.S.-jurisdiction issuers.

The report also documented the complementary pattern of "multi-rail" laundering: the same cluster that uses DEX-aggregator routing (T7.007) for within-chain obfuscation and cross-chain bridges (T7.003) for cross-chain obfuscation also applies stablecoin-issuer selection (T7.008) to minimise freeze risk during transit — the laundering methodology is a composite of structural signals, not a single-rail choice.

The 2025 report updated the analysis with 2024 full-year data, showing that the USDT/USDC preference ratio among high-risk clusters remained elevated, indicating that issuer-policy-aware routing is a persistent rather than transitory adaptation.

## Public references

- Chainalysis: 2024 Crypto Crime Report — stablecoin-issuer selection and laundering methodology.
- Chainalysis: 2025 Crypto Crime Report — updated issuer-selection analysis.
- TRM Labs: stablecoin laundering risk typology (2024).
- Circle and Tether: respective freeze-policy documentation and public enforcement data.
