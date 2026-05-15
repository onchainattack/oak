# DPRK-attributed multi-stage chain-hop laundering via privacy-chain conversions — cross-chain — 2024

**Loss:** aggregate laundering volume in the hundreds-of-millions USD across DPRK-attributed thefts in 2024, with the privacy-chain conversion leg serving as the terminal-hop obfuscation rail within larger laundering chains. Specific per-incident XMR-conversion volumes are not publicly quantifiable at the single-incident level due to the privacy-chain opacity, but Chainalysis and TRM Labs have documented that DPRK-attributed laundering chains in 2024 routinely included cross-chain bridge hops (T7.003) as the volume-movement layer followed by privacy-chain conversions (T7.005) as the terminal-obfuscation layer for a subset of the extracted proceeds.

**OAK Techniques observed:** **OAK-T7.005** (Privacy-Chain Hops — the privacy-chain conversion leg, predominantly Bitcoin → Monero via instant-swap services or residual XMR-supporting CEXes, broke the on-chain attribution trail for the terminal share of proceeds) + **OAK-T7.003** (Cross-Chain Bridge Laundering — the primary volume-movement layer, routing proceeds across multiple transparent chains via bridges and DEX aggregators before the privacy-chain terminal hop) + **OAK-T7.001** (Mixer-Routed Hop — the pre-Tornado-sanctions-era baseline; partially replaced by the T7.003 + T7.005 chain post-2022).

**OAK-Gnn:** [OAK-G01 Lazarus Group / DPRK-attributed](../actors/OAK-G01-lazarus.md).
**Attribution:** **inferred-strong** at the nation-state-actor level — the laundering chains are attributed to OAK-G01 (DPRK / Lazarus Group) by Chainalysis, TRM Labs, and multiple government advisories (FBI, CISA, Treasury). The privacy-chain conversion leg prevents on-chain confirmation of the terminal-operator share, making the attribution at that specific hop inferential rather than directly observable.

**Key teaching point:** DPRK-attributed laundering chains in the post-Tornado-Cash-sanctions era (2022 onward) restructured from T7.001-primary (Tornado Cash) to a **T7.003 + T7.005 composite chain**, where cross-chain bridge hops handle the volume-movement layer (observable, probabilistically attributable) and privacy-chain conversions handle the terminal-obfuscation layer (unobservable, defeating on-chain attribution). The composite chain exploits the defender asymmetry between the two layers: T7.003 detection scales with forensic-provider cross-chain graph investment; T7.005 detection does not scale regardless of investment. The structural lesson for defenders is that the privacy-chain terminal hop converts the attribution problem from one of *tracing sufficiency* (T7.003 — invest more in cross-chain forensic graphs, get better results) to one of *off-chain inference* (T7.005 — build venue-compliance and re-emergence-watchlist infrastructure; the on-chain trail is terminal at the privacy-chain entry point).

## Summary

DPRK-attributed cryptocurrency theft operations (OAK-G01 / Lazarus Group) are the largest single-actor laundering challenge in the OAK-tracked period, with aggregate thefts exceeding $3 billion across 2017-2024. Through 2022, the dominant Lazarus laundering rail was Tornado Cash (T7.001) — mixer deposits on Ethereum constituted the terminal obfuscation layer. Following the Tornado Cash OFAC sanctions (August 2022), Lazarus materially restructured its laundering chains.

By 2024, the mature DPRK laundering chain had stabilised into a multi-layer structure:

1. **T7.003 layer (cross-chain bridge hops, 2-5 transparent-chain hops, observable):** Thefts proceeds from the source chain (Ethereum, BNB Chain, others) are routed through cross-chain bridges (THORChain, Stargate, Wormhole, Chainflip) and DEX aggregators across 2-5 transparent chains, fragmenting the on-chain trail across per-chain attribution graphs. This layer is the volume-movement layer — it handles the bulk extraction-to-laundering transition and is observable and probabilistically attributable through cross-chain forensic graph investment.

2. **T7.005 layer (privacy-chain terminal hop, 1 hop, unobservable):** A subset of the laundered proceeds — typically the operator-side terminal share destined for DPRK-controlled wallets — is routed through a privacy-chain conversion, predominantly Bitcoin → Monero via instant-swap services (ChangeNOW, FixedFloat, and post-eXch residual services) or through residual XMR-supporting CEXes. The Bitcoin side of the conversion is observable on the transparent chain; the Monero side defeats on-chain attribution by construction (ring signatures, RingCT, stealth addresses). The privacy-chain conversion is the terminal obfuscation layer — it converts the remaining attribution problem from on-chain-traceable to off-chain-inferable.

3. **T7.006 layer (DeFi yield-protocol cover, 1-2 protocol hops, observable):** On some chains in the multi-hop transparent-chain path, Lazarus uses DeFi yield protocols (lending markets, LSTs, LP pools) as cover-crowd staging — depositing into Aave or Lido, holding for a period, and withdrawing, to make the deposit/withdraw flow resemble legitimate yield-seeking behaviour. This layer operates within the transparent-chain portion of the chain and is observable but statistically crowded.

The structural defender challenge is the asymmetry between the T7.003 layer (where increased forensic investment produces better attribution) and the T7.005 layer (where increased forensic investment has zero marginal return because the Monero ledger is opaque by design). DPRK's laundering operators understand this asymmetry and allocate the terminal-operator share to the T7.005 layer while leaving the volume-movement layers on transparent chains where attribution may be partially achieved but cannot reach the terminal beneficiary.

Chainalysis and TRM Labs have documented the T7.003 + T7.005 composite chain as the dominant DPRK laundering structure through 2024 in their annual crypto-crime reports. The FBI, CISA, and Treasury have issued advisories flagging the same structural pattern. Per-incident XMR-conversion volumes are not publicly quantifiable at the single-incident level; the privacy-chain opacity that makes XMR the effective terminal-rail also makes per-incident volume attribution imprecise.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-08 | Tornado Cash OFAC sanctions; Lazarus T7.001 rail disrupted; restructuring toward T7.003 + T7.005 composite chain begins | (laundering-rail repositioning event) |
| 2023 | Lazarus laundering chains transition from T7.001-primary to T7.003-primary + T7.005-terminal; cross-chain bridge volume from DPRK-attributed wallets spikes | T7.003 (volume-movement layer transition) |
| 2024 | Mature composite chain stabilised: 2-5 transparent-chain hops (T7.003) → DeFi yield cover (T7.006 on selected chains) → privacy-chain terminal conversion (T7.005) | **T7.005 + T7.003 + T7.006 composite laundering chain** |
| 2024-Q1 | Binance XMR delisting effective February 20; instant-swap-service-mediated XMR conversion grows as CEX-mediated XMR access contracts | T7.005 (venue-surface contraction — CEX → instant-swap shift) |
| 2024-Q4 | Chainalysis and TRM Labs publish 2024 crypto-crime reports documenting the T7.003 + T7.005 composite chain as the dominant DPRK laundering structure | (forensic-publication baseline) |

## Realised extraction

Aggregate DPRK-attributed thefts in 2024 exceeded $1 billion (per Chainalysis 2025 Crypto Crime Report). The privacy-chain terminal-hop volume is a subset of total laundered proceeds — the operator-side terminal share — and is not precisely quantifiable at the single-incident level due to Monero's ledger opacity. Forensic vendors estimate the XMR-conversion share of Lazarus laundering throughput at a material but non-majority fraction of total laundered volume (the T7.003 transparent-chain share is the dominant volume layer; the T7.005 share is the terminal-operator-share layer).

## Public references

- Cross-reference: T7.005 at `techniques/T7.005-privacy-chain-hops.md`.
- Cross-reference: T7.003 at `techniques/T7.003-cross-chain-bridge-laundering.md`.
- Cross-reference: T7.001 at `techniques/T7.001-mixer-routed-hop.md`.
- Cross-reference: `examples/2024-02-change-healthcare-ransom.md` — Change Healthcare ALPHV ransom (ransom operator XMR conversion, 2024).
- Cross-reference: `examples/2025-04-exch-shutdown.md` — eXch instant-exchange shutdown (T7.005 venue-closure event, 2025).
- `[chainalysis2024laundering]` — Chainalysis 2024 Money Laundering Report (DPRK laundering chain structure).
- `[chainalysis2024dprk]` — Chainalysis DPRK-attributed cryptocurrency theft retrospective (Lazarus laundering-rail evolution).
- `[fbidprkcrypto2024]` — FBI / CISA / Treasury joint advisory, "DPRK Cyber Operations — Laundering and Cashout Methodologies" (2024).

## Public References

See citations in corresponding technique file.
