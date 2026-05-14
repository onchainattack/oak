# Bybit $1.5B Hack Laundering Continuation into 2026 — DPRK / Lazarus — 2026

**Loss:** none incremental — this example documents the laundering continuation of the February 2025 Bybit hack ($1.5B), the largest cryptocurrency theft in history. Through 2026, Lazarus Group (OAK-G01) continued to launder the remaining unrecovered proceeds through THORChain, cross-chain bridges, DEX swaps, and mixer protocols. The laundering operation was the most extensive in cryptocurrency history in both dollar volume and duration, spanning 16+ months from the initial hack through mid-2026.

**OAK Techniques observed:** **OAK-T7.001** (CEX Deposit Layering — Lazarus Group routed laundered funds through centralised exchanges with KYC/AML gaps, structuring deposits across multiple accounts to avoid triggering withdrawal thresholds.) **OAK-T7.002** (Cross-Chain Bridge / Swap Laundering — THORChain was the primary laundering rail, converting ETH to BTC and other assets across chains without KYC. The THORChain volume spike during the Bybit laundering window was the largest single-event laundering throughput in the protocol's history.) **OAK-T7.005** (Mixer / Anonymity Set Laundering — remaining ETH proceeds were routed through Tornado Cash analogues, privacy pools, and DEX-based mixing patterns.) **OAK-T8.001** (Cluster Reuse — Lazarus Group reused known wallet clusters and laundering infrastructure from previous operations, linking the Bybit laundering to the broader Lazarus laundering ecosystem.)

**Attribution:** **OAK-G01** (Lazarus Group / DPRK). Confirmed by FBI, TRM Labs, Chainalysis, and Elliptic. The laundering operation's scale and sophistication were consistent with Lazarus's established tradecraft.

**Key teaching point:** **The Bybit laundering continuation into 2026 is the canonical "multi-year laundering campaign" anchor: the largest crypto theft in history required a laundering operation of corresponding scale, spanning 16+ months and consuming a material fraction of THORChain's total swap volume during the active laundering windows.** The structural lesson is that **the laundering capacity of the crypto ecosystem — THORChain throughput, mixer pool depth, cross-chain bridge volume — is the load-bearing constraint on large-scale theft. An attacker who steals $1.5B cannot launder it in a week; they must pace laundering to avoid overwhelming the available laundering rails, extending the laundering operation across years and giving investigators an extended detection window.**

## Summary

The Bybit hack (February 21, 2025) resulted in the theft of approximately $1.5B in ETH and staked ETH derivatives from Bybit's cold wallet infrastructure. Lazarus Group (OAK-G01) compromised Bybit's Safe{Wallet} multisig signing infrastructure through a social-engineering supply-chain attack on the Safe{Wallet} frontend, tricking Bybit signers into approving a malicious contract upgrade that redirected funds to Lazarus-controlled addresses.

The laundering operation — converting $1.5B in stolen ETH into clean assets — was the largest laundering campaign in cryptocurrency history. Lazarus Group employed a layered laundering architecture:

1. **THORChain swap laundering (primary rail).** THORChain's cross-chain swap protocol allowed Lazarus to convert ETH to BTC without KYC. THORChain's swap volume spiked to multiples of its baseline during the active laundering windows, with Lazarus transactions accounting for a material fraction of total protocol volume. THORChain's decentralised design meant there was no central entity that could freeze or censor the swaps.

2. **DEX and aggregator swaps.** Lazarus used DEX aggregators (1inch, CoWSwap, Odos) to swap ETH for USDC, USDT, DAI, and other stablecoins, spreading swaps across multiple pools to minimise per-pool price impact.

3. **CEX deposit layering.** Lazarus deposited laundered funds on centralised exchanges with KYC/AML gaps, structuring deposits across multiple accounts, jurisdictions, and time windows to avoid triggering automated AML thresholds.

4. **Mixer / privacy-protocol routing.** Remaining ETH proceeds were routed through Tornado Cash analogues, Railgun privacy pools, and DEX-based mixing patterns.

The laundering operation continued through 2026 because the sheer volume of stolen assets ($1.5B) exceeded the throughput capacity of any single laundering rail. Lazarus had to pace the laundering to avoid saturating THORChain's pools (which would cause extreme slippage on large swaps), avoid triggering exchange AML freezes (which would lock funds), and avoid mixer pool exhaustion (which would reduce anonymity-set effectiveness).

By mid-2026, TRM Labs and Chainalysis estimated that approximately $900M–$1.1B of the stolen funds had been laundered, with $400M–$600M remaining in known Lazarus addresses awaiting laundering capacity. The pace of laundering was expected to continue through 2026–2027.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2025-02-21 | Bybit hacked; ~$1.5B in ETH and staked ETH derivatives stolen by Lazarus Group (OAK-G01) | T15 + T11 |
| 2025-02 to 2025-04 | Initial laundering phase: Lazarus converts stolen ETH through THORChain, DEXes, and CEX deposits | T7.001 + T7.002 |
| 2025-04 to 2025-12 | Mid-phase laundering: Lazarus paces laundering across multiple rails; THORChain volume remains elevated | T7.001 + T7.002 + T7.005 |
| 2026-01 to 2026-05 | Continued laundering: ~$900M–$1.1B estimated laundered; ~$400M–$600M remaining in known Lazarus addresses | T7.001 + T7.002 + T7.005 + T8.001 |
| 2026–2027 (projected) | Laundering expected to continue as remaining funds are paced through available rails | T7 (ongoing) |

## Public references

- FBI, TRM Labs, Chainalysis, and Elliptic laundering-tracking reports (2025–2026)
- THORChain swap-volume analytics showing Bybit-laundering-window volume spikes
- On-chain forensic analysis of Lazarus laundering address clusters and fund-flow graphs
- See `examples/2025-02-bybit.md` for the initial hack and `examples/2025-02-bybit-thorchain-laundering.md` for the initial THORChain laundering phase

## Discussion

The Bybit laundering continuation into 2026 anchors the T7 × 2026 matrix cell and provides the canonical "multi-year laundering campaign" example for the OAK taxonomy. The incident demonstrates that laundering is not an instantaneous post-exploit step but a paced operation whose duration is determined by available laundering-rail throughput.

The structural insight for T7 is that **laundering capacity is a measurable property of the crypto ecosystem**: the aggregate daily throughput of all no-KYC swap protocols (THORChain, Maya, Chainflip), the pool depth of all mixer/privacy protocols (Tornado Cash analogues, Railgun, privacy pools), and the deposit limits of all weak-KYC exchanges collectively define the maximum daily laundering rate for a large-scale theft. A $1.5B theft against a $10M/day laundering-capacity ceiling requires 150+ days of sustained laundering — a constraint that forces the attacker to maintain operational security over an extended window and gives investigators an extended detection opportunity.

The Lazarus Group's laundering tradecraft — pacing, multi-rail distribution, exchange-deposit structuring — is the state-of-the-art reference for T7. Future T7 incident entries should reference the Bybit 2025–2026 laundering timeline as the baseline for large-scale laundering duration and throughput analysis.
