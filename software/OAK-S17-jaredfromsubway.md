# OAK-S17 — jaredfromsubway.eth

**Type:** mev-bot
**Aliases:** Jared, jaredfromsubway, "Jared 2.0" (2024 iteration tracked by EigenPhi)
**Active:** yes (operating since 2023-02-27; continuously tracked publicly through 2024 and beyond)
**First observed:** 2023-02-27 (first publicly-tracked transactions on Ethereum mainnet)
**Used by Groups:** ecosystem-wide / single-operator (the operator is pseudonymous; not affiliated with any OAK-G group)
**Host platforms:** Ethereum mainnet (sandwich-MEV operation); off-chain searcher infrastructure not publicly characterised
**Observed Techniques:** OAK-T5.004 (Sandwich / MEV Extraction)

## Description

`jaredfromsubway.eth` is a long-running, single-operator Ethereum sandwich-MEV bot first publicly tracked in February 2023. It is one of the most-characterised public MEV operators on Ethereum, with EigenPhi providing continuous performance dashboards through 2023–2024 and a documented "Jared 2.0" iteration tracked in 2024. Per EigenPhi tracking, the bot recorded approximately 254K transactions in its first three months (~98.31% identified as front/back-runs), ~106K victim swaps, ~$40.6M revenue / ~$6.3M profit in that window, with cumulative MEV revenue later reported at ~82,679 ETH against ~76,850 ETH in gas spend.

The operator's transactions match the canonical sandwich pattern that OAK-T5.004 names: a three-transaction shape (front-run → victim swap → back-run) ordered such that the front+back pair captures the price difference produced by the victim, with concentration at specific block builders / relayers and a stable per-block / per-slot extraction profile against a known set of liquidity pools. Distinctive contract bytecode and the Subway / Ethereum-themed naming are the recognisable surface artefacts; the operator's pool-target distribution is reportable, predictable, and broadly stable, which is why a public dashboard can characterise the operation continuously without speculation.

`jaredfromsubway.eth` is included in the OAK corpus because it pushes back against the implicit assumption that incidents are discrete, dated events with named victims and named amounts. T5.004 in particular is a cumulative, ongoing extraction at venue scale that does not fit that frame — it is most usefully discussed in terms of operator profiles. See `examples/2023-jaredfromsubway-mev.md` for the full worked example.

## Observed examples

- **Continuous operation since 2023-02-27** — EigenPhi's public dashboard provides the canonical empirical record (transaction counts, victim counts, revenue, profit, gas spend) updated through 2024 and beyond.
- **Sustained ~$1M+ daily volume periods** — high-water-mark periods documented across 2023–2024; the operator has been at or near the top of public sandwich-MEV extraction rankings throughout this window.
- **"Jared 2.0" 2024 iteration** — EigenPhi documented an updated bot version in 2024; operational continuity but distinct contract / strategy fingerprint relative to the 2023 build.
- **Pool-target distribution** — specific high-liquidity Uniswap V2/V3 pairs and similar venues recur as targets, with the distribution stable enough to support per-pool calibration of the extraction surface.

## Detection / attribution signals

- **At-event (per-transaction):** standard sandwich-pattern detection — three-transaction ordering with related-actor brackets around a victim swap, realised extraction value per pattern, position concentration at specific block builders / relayers.
- **Cumulative (per-operator):** per-actor extraction-volume tracking over weeks-to-months windows; sustained-profile characterisation rather than per-incident detection. Public analytics dashboards (EigenPhi, Flashbots, libMEV) are the dominant source.
- **Contract / bytecode fingerprint:** distinctive contract bytecode patterns and the Subway / Ethereum naming theme are recognisable surface artefacts; the operator does not attempt to obscure attribution at the contract level.
- **Pool-side calibration:** per-pool detection of recurring sandwich targets gives liquidity-provider and routing-protocol operators a calibration signal for MEV-protection routing decisions.
- **Mitigation, not detection, is the actionable layer:** per-victim recovery is impractical at sandwich-volume scale; mitigations live at the routing/venue layer (MEV-protected relays such as MEV Blocker / Flashbots Protect, batch auctions such as CoW Protocol, slippage discipline at the wallet layer).

## Citations

- `[eigenphijared2023]` — EigenPhi performance appraisal of `jaredfromsubway.eth` (transactions, victims, revenue, profit, gas spend).
- `[daian2019flashboys]` — foundational MEV characterisation under which OAK-T5.004 is classified.

## Discussion

`jaredfromsubway.eth` is a useful Software-axis entry precisely because it is **not malware and not a Group-attributed artefact** — it is a single-operator MEV bot whose entire operation is on the public record. Its inclusion documents that the OAK Software axis admits ecosystem-wide / single-operator MEV operations alongside malware and tooling, when the operator is sufficiently public and continuously tracked to be worth a Software-axis pointer.

Ecosystem position: `jaredfromsubway.eth` is one of several public MEV operator profiles (others tracked across Flashbots and EigenPhi data products), and it is the cleanest pedagogical example because of EigenPhi's continuous public characterisation. The operator's pseudonymous identity has not been resolved to a real-world entity; OAK does not speculate.

Attribution caveats: the operator brand and the contract addresses are public; the off-chain searcher infrastructure (signing keys, builder relationships, capital flow) is not. Treating `jaredfromsubway.eth` as a single coherent operator is supported by sustained on-chain profile consistency, but OAK does not assert single-natural-person identity behind the brand — the visible artefact is the on-chain operation.

Lineage: there is no claimed lineage between `jaredfromsubway.eth` and earlier MEV operators. The operator is part of the broader post-Flashboys-2.0 sandwich-MEV ecosystem on Ethereum and operates within the standard MEV-Boost auction infrastructure of that period; it does not represent a novel extraction class. Its OAK relevance is empirical density, not novelty.
