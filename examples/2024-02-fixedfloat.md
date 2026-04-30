# FixedFloat instant-swap hot-wallet drain — multi-chain — 2024-02-16

**Loss:** approximately \$26M, comprising approximately 409 BTC (~\$21M at the time) and approximately 1,728 ETH (~\$4.85M), drained from FixedFloat's operational hot wallets across the Bitcoin and Ethereum chains over the February 16–18, 2024 window. FixedFloat is a non-custodial-positioned instant-swap service (KYC-light, fast cross-asset rotation) with operations attributed to Estonian / EU jurisdiction in public reporting. **Recovery:** none of material consequence on the on-chain layer; FixedFloat absorbed the loss against operational reserves, paused the service for a "technical maintenance" window of approximately 48 hours, and resumed swap services with revised hot-wallet topology by February 19, 2024. No public DOJ civil-forfeiture action has been filed as of the date of this example.
**OAK Techniques observed:** **OAK-T11** broadly construed in the *operator-side custody-and-signing compromise* sub-class — the entry vector was operator-internal hot-wallet private-key compromise across the Bitcoin and Ethereum signing surfaces of FixedFloat's instant-swap pipeline. OAK v0.1 does not have an exact Technique-level entry for *operator-internal hot-wallet key compromise*; the case sits in the same unmapped-entry-vector gap as KuCoin (2020), Coincheck (2018), Stake.com (2023), Phemex (2025-01) at `/examples/2025-01-phemex.md`. Downstream Techniques observed on-chain: **OAK-T7.001** (Mixer-Routed Hop — Tornado Cash on Ethereum, eXch as a secondary mixer; on the Bitcoin side, the proceeds entered the standard OAK-G01 BTC laundering rail of subsequent 2024 cases), and **OAK-T8.001** (Common-Funder Cluster Reuse — the FixedFloat attacker cluster was subsequently linked by Chainalysis, SlowMist, and Match Systems to confirmed OAK-G01 / TraderTraitor laundering chains in the same window).
**Attribution:** **inferred-strong**. No FBI press release, U.S. Treasury OFAC designation, or DOJ indictment naming FixedFloat as an OAK-G01 case has been published as of the date of this example. Attribution is carried by industry forensic providers — Chainalysis, SlowMist, and Match Systems — who in independent post-event analyses traced the FixedFloat proceeds into wallet-cluster infrastructure already attributed to OAK-G01 / TraderTraitor laundering operations from the broader 2023–2024 wave (Atomic Wallet, Alphapo / CoinsPaid, Stake.com, CoinEx). By OAK convention this clears the `inferred-strong` bar: multiple independent industry forensics providers concur, and the wallet-cluster evidence ties FixedFloat into shared infrastructure with `confirmed`-grade OAK-G01 cases. Should the FBI or Treasury subsequently publish FixedFloat-specific attribution, this example should be upgraded to `confirmed`.
**OAK-Gnn:** [OAK-G01 Lazarus Group / DPRK-attributed](../actors/OAK-G01-lazarus.md) — `inferred-strong` via cluster-overlap with confirmed-grade laundering chains, per Chainalysis / SlowMist / Match Systems concurrence.
**Key teaching point:** **instant-swap services are a structurally high-value OAK-G01 target class**, sitting at the intersection of operator-internal hot-wallet key compromise (the entry vector) and the laundering rail (the service itself is normally used by other actors as a no-KYC swap rail). The FixedFloat case is the canonical 2024 worked example in this category: an instant-swap operator that itself becomes the victim of an OAK-G01-attributed drain, with the attacker's own laundering chain traversing similar instant-swap rails downstream. The teaching point for defenders is twofold — (a) instant-swap operators inherit the same hot-wallet operational surface as exchanges and are exposed to the same operator-internal compromise gap, and (b) the absence of operator-side public attribution does not equate to absence of OAK-G01 attribution; cluster-overlap evidence from competent forensics providers clears the `inferred-strong` bar even where the FBI publication surface has not fired.

## Summary

FixedFloat is a non-custodial-positioned instant-swap service that, in standard operational mode, accepts user deposits, executes the swap leg via operationally-controlled hot wallets across multiple chains (Bitcoin, Ethereum, Litecoin, USDT-Tron, others), and disburses the swap output to the user's destination address. The service positions itself as KYC-light and fast — typical use cases include legitimate cross-asset rotation as well as the laundering use-cases that any KYC-light swap rail picks up by structural property of the offering. Across February 16–18, 2024, FixedFloat's operational hot wallets on the Bitcoin and Ethereum chains were drained of approximately 409 BTC (~\$21M) and 1,728 ETH (~\$4.85M) in a sequence of attacker-controlled outflows.

The proximate cause — per SlowMist's incident analysis and corroborating on-chain forensics from Chainalysis and Match Systems — is operator-internal compromise of hot-wallet signing material across the Bitcoin and Ethereum signing pipelines. FixedFloat's own public framing characterised the incident initially as a "technical issue" requiring service-pause for maintenance; subsequent acknowledgement (under industry-press pressure) was that an external attack had occurred and the proceeds had been moved off the operator-controlled wallets. The operator-side public statement did not commit to a specific named compromise-vector classification (social-engineering of an operator employee, internal-IT compromise via malware, supply-chain compromise of a signing dependency); OAK records the entry-vector attribution accordingly as `pseudonymous-operator-internal` (no named-individual claim) within the broader `inferred-strong OAK-G01` attribution that the cluster-overlap evidence supports.

The OAK-G01 attribution is the load-bearing finding for this example. In the days following the incident, on-chain forensic teams traced the FixedFloat proceeds into laundering infrastructure — Tornado Cash on the Ethereum side, eXch as a secondary mixer, and on the Bitcoin side a sequence of consolidation wallets that overlapped, by independent analyses from Chainalysis, SlowMist, and Match Systems, with wallet clusters already attributed to OAK-G01 / TraderTraitor laundering operations from the 2023 cohort (Atomic Wallet, Alphapo / CoinsPaid, Stake.com, CoinEx). The attribution rests on infrastructure-overlap rather than on operator-side admission or U.S. government public statement; OAK records this as the `inferred-strong` grade by convention.

For OAK's purposes the entry vector is **off-chain and operator-internal**, structurally identical to KuCoin (2020), Coincheck (2018), Stake.com (2023), and Phemex (2025-01). OAK v0.1 does not have an on-chain Technique that captures this entry vector; the case is documented here in the worked-example layer because the on-chain manifestation, the laundering chain, and the cluster-level OAK-G01 attribution are all on the public record. The novel OAK contribution of the worked example is twofold: documenting the *instant-swap operator as victim* sub-class (distinct from the *exchange operator as victim* sub-class that dominates the unmapped-entry-vector gap) and anchoring the February 2024 entry-point of the late-2023 / 2024 OAK-G01 hot-wallet wave that runs into Phemex and Bybit in 2025.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-event | Operator-internal compromise of FixedFloat hot-wallet key material across Bitcoin and Ethereum signing pipelines; specific compromise-vector classification not publicly committed by FixedFloat | (off-chain entry vector — no exact OAK v0.1 match; T11 broadly construed) |
| 2024-02-16 | First wave of attacker-controlled outflows from FixedFloat Bitcoin and Ethereum hot wallets begin landing on-chain | T5-equivalent (extraction event) |
| 2024-02-16 — 2024-02-17 | Cumulative outflows reach approximately 409 BTC + 1,728 ETH (~\$26M) across attacker-controlled addresses | T5-equivalent (extraction event continues) |
| 2024-02-17 | FixedFloat pauses service; public framing characterises the pause as a "technical issue" requiring maintenance | (operator response — initial framing) |
| 2024-02-18 | On-chain analysts (notably SlowMist, then ZachXBT and others) publicly identify the outflow pattern as an attack rather than maintenance | (industry / community detection) |
| 2024-02-18 onward | Stage-1 laundering: Ethereum-side proceeds routed through Tornado Cash; secondary mixer routing through eXch | **T7.001** (Mixer-Routed Hop) |
| 2024-02-18 onward | Stage-1 laundering: Bitcoin-side proceeds enter consolidation-wallet sequence overlapping with OAK-G01 / TraderTraitor cluster infrastructure from 2023 cohort | **T8.001** (Common-Funder Cluster Reuse) |
| 2024-02-19 | FixedFloat resumes operations under revised hot-wallet topology; acknowledges attack rather than maintenance in updated public statement | (operator response — revised framing) |
| 2024-02 onward | Chainalysis, SlowMist, Match Systems publish independent analyses converging on cluster-overlap with OAK-G01 / TraderTraitor laundering infrastructure | **G01 attribution (inferred-strong)** |
| 2024-03 onward | No FBI / Treasury public attribution; no DOJ civil-forfeiture action; no public on-chain recovery | (recovery state) |
| 2025-01 — 2025-02 | Subsequent OAK-G01 hot-wallet wave events (Phemex, then Bybit) anchor the case temporally as the early-2024 entry-point of the wave | (cohort framing) |

## What defenders observed

- **Instant-swap operators inherit the same hot-wallet operational surface as exchanges, and the operator-internal compromise gap fires on the same shape.** FixedFloat is structurally a multi-chain operator running hot wallets across Bitcoin, Ethereum, Litecoin, and other chains in order to execute the swap leg in normal operations. The compromise pattern that produced the February 2024 drain — operator-internal compromise of key material across multiple chains' signing pipelines — is the same shape as the KuCoin (2020), Coincheck (2018), Stake.com (2023), and Phemex (2025-01) cases. Defender runbooks for instant-swap operators should treat the hot-wallet surface with the same severity as exchange hot-wallet surfaces; the lower-public-profile of instant-swap operators relative to top-tier exchanges does not extend to the OAK-G01 threat-model dimension.
- **Operator-side public framing as "technical issue / maintenance" should not be taken at face value during the first 24–48 hours.** FixedFloat's initial public statement characterised the incident as a maintenance event; the actual situation — an attack with funds already moved off the operator-controlled wallets — was reflected in updated framing only after on-chain analysts and the industry press had publicly identified the outflow pattern. The defender / risk-team lesson is that operator-side public framing in the first 24–48 hours of a hot-wallet incident is unreliable as a primary signal; the on-chain pattern (large sequential outflows to non-operator-controlled addresses) is the load-bearing primary signal and is observable to any analyst with mempool / explorer access.
- **Cluster-overlap-via-confirmed-case is the strongest grade of `inferred-strong` attribution available.** No FBI / Treasury / DOJ statement explicitly names FixedFloat. The OAK-G01 attribution rests on (a) industry-forensic concurrence (Chainalysis, SlowMist, Match Systems) and (b) wallet-cluster overlap with the broader OAK-G01 / TraderTraitor laundering infrastructure from the 2023 cohort, which itself is `confirmed`-grade in multiple cases. By OAK convention this clears the `inferred-strong` bar; contributors should not treat absence of an FBI release as evidence against attribution.
- **The instant-swap rail is bidirectional: operators are both used by OAK-G01 actors (downstream laundering) and targeted by them (upstream extraction).** The dimension is structurally important. FixedFloat had been used in 2023 as a downstream laundering rail in OAK-G01 cases (per Chainalysis cohort analyses) before being targeted as a victim in February 2024. The defender lesson is that the use-as-rail history of an instant-swap operator does not provide protection against being-targeted-as-victim; if anything, the same operational properties that make the service useful as a laundering rail (KYC-light, fast cross-asset rotation, multi-chain hot-wallet topology) make it operationally similar to the exchange-victim shape.
- **Pre-laundering window matters and was operator-acceptable but recovery-effectively-infinite.** FixedFloat detected the outflow pattern within hours of the on-chain manifestation and paused the service within the same day; by that time the Ethereum-side proceeds were already on path to Tornado Cash and the Bitcoin-side proceeds were already in consolidation sequence. The operator-pause primitive protected against further drains but did not unwind completed extraction; on EVM mainnet, once funds reach a public mixer in the same transaction window, on-chain recovery is structurally foreclosed. The contrast with the Cetus 2025 case at `/examples/2025-05-cetus.md` (validator-coordinated freeze on Sui) is instructive: no analogous primitive was operationally available to FixedFloat across Bitcoin and Ethereum at scale.

## What this example tells contributors writing future Technique pages

- **The operator-internal hot-wallet key compromise gap is now five worked examples deep in OAK v0.1** — KuCoin (2020), Coincheck (2018), Stake.com (2023), FixedFloat (2024-02), Phemex (2025-01). This is the single most-exploited entry-vector gap in the OAK v0.1 taxonomy. A future v0.x update should add a T11.x sub-Technique covering operator-internal key compromise, with sub-sub-Techniques for (a) social-engineered employee access (Stake.com, Atomic Wallet), (b) internal-IT compromise via malware (KuCoin, Coincheck candidate vectors), (c) insider misuse, (d) multi-chain key-store co-location amplification (Phemex), and (e) instant-swap operator surface (FixedFloat). The FixedFloat case in particular anchors the *instant-swap operator as victim* sub-class as a distinct line within the broader gap.
- **`inferred-strong` is the right marker for FixedFloat, not `confirmed`.** No FBI / Treasury / DOJ statement explicitly names FixedFloat. The attribution rests on industry-forensic concurrence and wallet-cluster overlap with the confirmed-grade 2023 OAK-G01 cohort. Per OAK convention, cluster-overlap-via-confirmed-case is the strongest grade of `inferred-strong` available — a downstream contributor should upgrade FixedFloat to `confirmed` if and only if a U.S. government public statement explicitly names FixedFloat.
- **The 2023–2025 OAK-G01 wave should be modelled as a single sustained campaign with shared address infrastructure.** FixedFloat (February 2024) sits temporally between the 2023 cohort (Atomic Wallet, Alphapo / CoinsPaid, Stake.com, CoinEx) and the late-2024 / early-2025 cohort (DMM Bitcoin May 2024, WazirX July 2024, Radiant October 2024, Phemex January 2025, Bybit February 2025). Cluster-overlap evidence ties FixedFloat backwards into the 2023 cohort and forwards (via shared laundering rails — Tornado Cash, eXch, OAK-G01 BTC consolidation infrastructure) into the late-2024 / 2025 cohort. Contributors writing the OAK-G01 actor page and any cohort-level Discussion should treat the 2023–2025 OAK-G01 hot-wallet wave as a single sustained campaign rather than as a sequence of independent events.
- **Operator-side framing-vs-reality divergence in the first 24–48 hours is a recurring 2024–2025 pattern and deserves its own framing as a defender / risk-team operational discipline.** FixedFloat's initial "technical maintenance" framing is one of multiple cases in the 2024–2025 cohort where operator-side public framing in the first 24–48 hours diverged materially from the on-chain reality. Contributors writing the Mitigations layer should consider a cross-cutting Mitigation entry covering *operator-side framing-vs-on-chain-reality monitoring* — i.e., the discipline of treating operator public statements as one signal among several rather than as primary, and of weighting the on-chain pattern (large sequential outflows to non-operator-controlled addresses) as the primary detection surface during the first 24–48 hours of any candidate hot-wallet incident.

## Public references

- `[chainalysisfixedfloat2024]` — Chainalysis on the FixedFloat cluster and OAK-G01 / TraderTraitor laundering-infrastructure overlap.
- `[slowmistfixedfloat2024]` — SlowMist incident analysis covering the multi-chain drain pattern, the laundering chain through Tornado Cash and eXch, and the BTC-side cluster-overlap evidence.
- `[matchsystemsfixedfloat2024]` — Match Systems forensic analysis tracing the FixedFloat Bitcoin-side proceeds into OAK-G01 cluster infrastructure.
- `[fixedfloatpostmortem2024]` — FixedFloat operator-side public statement on the February 2024 incident (revised from initial "technical issue" framing).
- `[zachxbtfixedfloat2024]` — ZachXBT public on-chain analysis identifying the outflow pattern as an attack during the operator-side initial-framing window.
- `[chainalysis2024dprk]` — Chainalysis 2024 DPRK / TraderTraitor cumulative-totals retrospective providing cohort context.
- `[cisa2022tradertraitor]` — CISA AA22-108A Joint Cybersecurity Advisory introducing the TraderTraitor cluster (canonical confirmed-attribution anchor for the OAK-G01 actor surface).

## Citations

Existing citation keys reused: `[chainalysis2024dprk]`, `[cisa2022tradertraitor]`.

Proposed new BibTeX entries (do NOT add to citations.bib in this task; for contributor review):

```bibtex
@misc{chainalysisfixedfloat2024,
  author       = {{Chainalysis}},
  title        = {{FixedFloat} Hot-Wallet Drain (February 2024) and {DPRK} / {TraderTraitor} Laundering-Infrastructure Overlap},
  year         = {2024},
  howpublished = {Industry forensic analysis, Chainalysis blog},
  url          = {https://www.chainalysis.com/blog/fixedfloat-attack-2024/},
  note         = {OAK v0.1 — pending verification. Industry-forensic anchor for the inferred-strong OAK-G01 attribution of the FixedFloat February 2024 incident via wallet-cluster overlap with the 2023 OAK-G01 cohort.}
}

@misc{slowmistfixedfloat2024,
  author       = {{SlowMist}},
  title        = {{FixedFloat} Hack Analysis: Multi-Chain Hot-Wallet Drain and Laundering Chain},
  year         = {2024},
  howpublished = {Industry incident analysis, SlowMist Inc.},
  url          = {https://slowmist.medium.com/fixedfloat-hack-analysis-2024},
  note         = {OAK v0.1 — pending verification. SlowMist incident analysis of the FixedFloat February 2024 multi-chain drain, laundering through Tornado Cash and eXch, and BTC-side cluster-overlap evidence.}
}

@misc{matchsystemsfixedfloat2024,
  author       = {{Match Systems}},
  title        = {{FixedFloat} Bitcoin-Side Proceeds Tracking and {OAK-G01} Cluster Attribution},
  year         = {2024},
  howpublished = {Industry forensic analysis, Match Systems},
  url          = {https://matchsystems.com/research/fixedfloat-2024},
  note         = {OAK v0.1 — pending verification. Match Systems forensic analysis tracing the FixedFloat BTC-side proceeds into OAK-G01 / TraderTraitor cluster infrastructure shared with the 2023 OAK-G01 cohort.}
}

@misc{fixedfloatpostmortem2024,
  author       = {{FixedFloat}},
  title        = {Service Status Update — February 2024 Incident},
  year         = {2024},
  howpublished = {Operator-side public statement, X (formerly Twitter)},
  url          = {https://twitter.com/FixedFloat/status/1758577864276598807},
  note         = {OAK v0.1 — pending verification. FixedFloat operator-side public statement, revised from initial "technical issue" framing to acknowledgement of an external attack.}
}

@misc{zachxbtfixedfloat2024,
  author       = {{ZachXBT}},
  title        = {{FixedFloat} Outflow Pattern — On-Chain Analysis},
  year         = {2024},
  howpublished = {Public on-chain analysis, X (formerly Twitter)},
  url          = {https://twitter.com/zachxbt/status/1758533487000000000},
  note         = {OAK v0.1 — pending verification. ZachXBT public on-chain analysis identifying the FixedFloat February 2024 outflow pattern as an attack during the operator-side initial-framing window.}
}
```

## Discussion

FixedFloat (February 2024) is the OAK example that anchors the early-2024 entry-point of the late-2023 / 2024–2025 OAK-G01 hot-wallet wave. The wave runs:

1. **2023 cohort** — Atomic Wallet (June 2023), Alphapo / CoinsPaid (July 2023), Stake.com (September 2023), CoinEx (September 2023). Cumulative attributed loss ~\$255M.
2. **FixedFloat (February 2024, ~\$26M)** — instant-swap operator as victim; `inferred-strong` attribution via cluster-overlap with 2023 cohort. **This document.**
3. **DMM Bitcoin (May 2024, ~\$305M)** — T11.001 third-party-vendor compromise via Ginco. `confirmed` attribution by FBI / DC3 / NPA in December 2024. See `/examples/2024-05-dmm-bitcoin.md`.
4. **WazirX (July 2024, ~\$234.9M)** — T11.001 + T11.003 third-party-vendor compromise via Liminal followed by in-use multisig manipulation. `confirmed` attribution. See `/examples/2024-07-wazirx.md`.
5. **Radiant Capital (October 2024, ~\$50M+)** — DeFi protocol-side compromise; OAK-G01-attributed. See `/examples/2024-10-radiant-capital.md`.
6. **Phemex (January 2025, ~\$73M)** — operator-internal hot-wallet key compromise with multi-chain key-store co-location amplification. `inferred-strong` attribution via wallet-cluster overlap with Bybit. See `/examples/2025-01-phemex.md`.
7. **Bybit (February 2025, ~\$1.46B)** — T11.001 third-party-vendor compromise via Safe{Wallet}. `confirmed` attribution within five days. See `/examples/2025-02-bybit.md`.

The temporal density and the cluster-overlap continuity are the analytically important features. FixedFloat's role in the wave is structural rather than headline: it is the case that demonstrates OAK-G01 was running operator-internal hot-wallet compromise as a productive workstream before the major late-2024 / 2025 escalations, with shared address infrastructure connecting it backwards to the 2023 cohort and forwards (via shared laundering rails — Tornado Cash, eXch, OAK-G01 BTC consolidation) to the late-2024 / 2025 cohort. Without FixedFloat in the corpus, the 2023 cohort reads as discontinuously separated from the 2024–2025 cohort; with FixedFloat, the wave is legible as a single sustained campaign.

The instant-swap-operator-as-victim sub-class is the FixedFloat-specific analytical contribution. The pre-FixedFloat OAK-G01 victim cohort was dominated by exchanges (centralised exchange shape, with KYC and operator-side regulatory exposure) and consumer-wallet apps (Atomic Wallet shape). FixedFloat is neither: it is a service that operates at the intersection of exchange-shaped hot-wallet topology and consumer-wallet-shaped no-KYC framing. The defender / Mitigations-layer lesson is that the operational properties that make a service useful as a laundering rail (KYC-light, fast cross-asset rotation, multi-chain hot-wallet topology) make it operationally similar to the exchange-victim shape from an OAK-G01 entry-vector perspective — and any future v0.x update of the OAK Software / Tooling axis should include instant-swap operator infrastructure as a discrete category alongside exchange and consumer-wallet categories.

For OAK's broader credibility, including FixedFloat in v0.1 closes two gaps: it adds a 2024 worked example to the corpus that anchors the early-2024 entry-point of the OAK-G01 hot-wallet wave (without it, the 2023 cohort reads as discontinuous from the late-2024 / 2025 cohort), and it documents the *instant-swap operator as victim* sub-class as a distinct line within the broader operator-internal-hot-wallet-compromise gap that remains the single most-exploited gap in the OAK v0.1 taxonomy.
