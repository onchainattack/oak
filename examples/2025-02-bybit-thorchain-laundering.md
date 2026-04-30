# Bybit aftermath — \$1.4B THORChain laundering — Ethereum → BTC / DAI — 2025-02 to 2025-03

**Volume laundered:** \~\$1.4B (the full Bybit-extracted ETH amount).
**Time-to-launder:** approximately 10 days from extraction to full conversion.
**THORChain operator economics:** node operators collectively earned at least \~\$12M in fees from the laundering operation. The figure originates with Chainalysis (`[chainalysisbybitthorchain]`), with CoinDesk's reporting (`[coindeskthorchainlazarus2025]`) wrapping the Chainalysis number; cite Chainalysis as the primary source and CoinDesk as secondary. As of v0.1 the \~\$12M figure rests primarily on the Chainalysis attribution; corroboration from Elliptic / TRM Labs has been published at the broader-volume level but not at the precise \$12M-fee-accrual level. **Status: verified-with-caveat** — single primary source for the precise dollar figure, multi-source for the surrounding facts (Bybit attribution, ETH → BTC / DAI chain-hop pattern, ~10-day window).
**OAK Techniques observed:** OAK-T7.003 (Cross-Chain Bridge Laundering) — primary; OAK-T7.001 (Mixer-Routed Hop) — partial / earlier-stage hops where applicable.
**OAK-Gnn:** [OAK-G01 Lazarus Group / DPRK-attributed](../actors/OAK-G01-lazarus.md). **Confirmed** attribution: FBI IC3 PSA published 2025-02-26; corroborating industry forensic provider attributions.
**Predicate:** [`examples/2025-02-bybit.md`](./2025-02-bybit.md) — the original \~\$1.46B Bybit extraction event.

## Summary

This worked example covers the *laundering chain* downstream of the Bybit February 2025 extraction (the largest single crypto-theft event on the public record; see `examples/2025-02-bybit.md` for the extraction itself). Per Chainalysis (`[chainalysisbybitthorchain]`) — wrapped by CoinDesk's investigative reporting in `[coindeskthorchainlazarus2025]` — the OAK-G01 Lazarus Group laundered approximately \$1.4B in Bybit-extracted ETH through THORChain over roughly 10 days following the February 21, 2025 extraction. The operational pattern is the canonical T7.003 cross-chain laundering chain: ETH on Ethereum was swapped through THORChain to Bitcoin or to bridge-redeemed stablecoins (DAI, USDC), with the canonical chain-hop being ETH → BTC → DAI within hours-to-days windows.

The case is OAK's modern canonical T7.003 example because the volume is unambiguous, the speed metric is published, the protocol-economics impact (\$12M in fees to THORChain node operators) is on the public record, and the OAK-G01 attribution is confirmed at the FBI / Treasury / industry-corroboration level.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2025-02-21 | Bybit extraction event (\~\$1.46B ETH); see `examples/2025-02-bybit.md` for the on-chain manifestation and off-chain entry vector | (predicate event — see linked example) |
| 2025-02-21 onward (hours) | Initial outbound hops from extraction-recipient addresses; some early-stage T7.001 mixer-routed hops where geographic / operational considerations applied | T7.001 (partial) |
| 2025-02-21 to 2025-03-03 (~10 days) | Bulk of the \~\$1.4B routed through THORChain in the canonical ETH → BTC → DAI / USDC chain-hop pattern | **T7.003 primary** |
| 2025-02-26 | FBI IC3 PSA attributing the extraction to OAK-G01 Lazarus Group (which catalysed accelerated forensic attribution of the laundering chain) | **G01 confirmed attribution** |
| 2025-03-03 onward | Downstream T7.002 CEX-deposit-address layering for the off-ramp from settlement assets back to fiat; outside the scope of this example but documented in industry tracking | T7.002 (downstream) |

## What defenders observed

- **Speed metric:** 10 days for \$1.4B through a single primary laundering rail is operationally extraordinary. The pre-event THORChain compliance integration was minimal; post-event, the protocol-level reaction was constrained both by THORChain's decentralised architecture and by node-operator economic incentives (the \$12M in fees was earned by the operators *during* the laundering, not penalised after).
- **Protocol-economics signal:** the fee-accrual-correlated-with-attribution detection signal flagged in the OAK-T7.003 page is unambiguously visible here. A protocol-level monitoring posture that watched THORChain fee accrual against a known illicit-cluster watchlist would have surfaced the laundering activity within hours of extraction; the forensic attribution to OAK-G01 was already confirmed by day 5 (FBI IC3 PSA).
- **Post-event:** industry reporting and academic write-ups on this case are still being published as of OAK v0.1 publication; the consolidated record is expected to be documented further in the Chainalysis 2026 Crypto Crime Report and in subsequent TRM and Elliptic investigative releases.

## What this example tells contributors writing future Technique pages

- **T7.003 is now the dominant Lazarus laundering rail.** Contributors writing post-2022 OAK-G01-attributed examples should expect cross-chain bridge laundering as the primary post-extraction path, with T7.001 mixer-routed hops as a partial / earlier-stage component rather than the dominant rail. The OAK-T7.001 page reflects this shift in its Discussion section.
- **Protocol-economics signals are real detection signals.** When a laundering rail processes \$1.4B in 10 days and the node operators earn \$12M, the protocol-economics impact is itself an attribution-grade indicator that the protocol is being used as a laundering rail at the present moment. Contributors writing T7.003 examples should make the protocol-economics-signal angle explicit when the data is available.
- **OAK-Gnn attribution accelerates downstream forensic tracking.** The five-day FBI attribution of Bybit to OAK-G01 catalysed accelerated forensic attribution of the laundering chain across forensic providers; without the attribution, per-transaction tracing would have been substantially slower. The compounding effect — confirmed attribution at the predicate event accelerates attribution at the downstream laundering events — is a structural argument for the Threat Actors axis.

## Public references

- `[chainalysisbybitthorchain]` — Chainalysis primary attribution for the ~\$12M THORChain node-operator fee-accrual figure during the Bybit-laundering window. Cite Chainalysis directly for the precise dollar figure rather than relying on the secondary CoinDesk wrap-up.
- `[coindeskthorchainlazarus2025]` — CoinDesk investigative reporting on THORChain as Lazarus's preferred post-Bybit laundering rail; documents the 10-day full-laundering metric. CoinDesk wraps Chainalysis's underlying numbers; cite as secondary corroborating source for narrative facts.
- `[chainalysis2024laundering]` — broader 2023–2024 evolution context (cross-chain bridges as a laundering category).
- [Cointelegraph — Crypto laundering evolves with Lazarus Group's bridge tactics](https://cointelegraph.com/news/lazarus-group-crypto-laundering-bridge-tactics) — companion industry framing.

## Discussion

This case operationalises several of OAK's structural design choices. The Threat Actors axis (`actors/OAK-G01-lazarus.md`) lets the laundering case study link cleanly back to the predicate-extraction case study (`examples/2025-02-bybit.md`); the OAK-T7.003 Technique page captures the cross-chain bridge laundering pattern at the methodology layer; this worked example documents the headline-magnitude operational deployment of the methodology. Contributors writing future T7.003 cases should expect to follow the same predicate-event → Group-attribution → laundering-chain template, particularly for OAK-G01 cases where the same operator profile recurs across many predicate events.

The unresolved policy question — whether T7.003 mitigation responsibility lives at the cross-chain bridge protocol layer or at the receiving-venue layer — is illustrated starkly by this case. THORChain's decentralised architecture meaningfully constrains protocol-level intervention; the dollar-loss-prevented metric in this case is bounded primarily by what the receiving CEXes did at off-ramp time. OAK does not opine; it documents that both layers had defensive surface and that whichever layer would have moved first would have prevented some fraction of the laundering.
