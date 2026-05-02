# `jaredfromsubway.eth` sandwich-MEV operator — Ethereum — operating since 2023-02-27

**Attribution:** **pseudonymous** — no public actor attribution at OAK v0.1 cutoff.

**Cumulative metrics (per EigenPhi tracking):** \~254K transactions in the first ~3 months (~98.31% identified as front/back-runs), \~106K victim swaps, \~\$40.6M revenue / \~\$6.3M profit in the first 3 months; cumulative MEV revenue later reported at \~82,679 ETH against \~76,850 ETH gas spent.
**OAK Techniques observed:** OAK-T5.004 (Sandwich / MEV Extraction).
**Status:** operator continues to be tracked publicly; "Jared 2.0" iteration documented by EigenPhi in 2024.

## Summary

`jaredfromsubway.eth` is a long-running Ethereum sandwich-MEV operator first publicly tracked in February 2023. Unlike most OAK case studies, this is not a single-event incident — it is a persistent, bot-mediated extraction operation observable across hundreds of thousands of transactions and tens of thousands of victim swaps. EigenPhi has provided continuous public tracking of the operator's revenue, profit, and gas-spend profile, making this one of the cleanest empirical references for the OAK-T5.004 Technique.

## OAK-T5.004 mapping

The operator's transactions match the canonical sandwich pattern OAK-T5.004 names:

- **Three-transaction shape:** front-run, victim swap, back-run, ordered such that the front+back pair captures the price difference produced by the victim.
- **Concentration at specific block builders / relayers:** EigenPhi's tracking attributes the bulk of the operator's transactions to a small set of block-construction venues, consistent with the per-block-builder concentration listed as an Observed indicator on the OAK-T5.004 page.
- **Stable per-block / per-slot extraction profile against a known set of pools:** the operator's pool-target distribution is reportable, predictable, and broadly stable over time — making this the kind of operation a public dashboard can characterise without speculation.

## What defenders observed

- **At-event (per-transaction):** standard sandwich-pattern detection — three-transaction ordering, related-actor brackets, realised extraction value per pattern.
- **Cumulative (per-operator):** per-actor extraction-volume tracking, sustained-profile characterisation across months.
- **Pool-side:** specific liquidity pools have been documented as recurring targets, providing a per-pool calibration signal.

## What this example tells contributors writing future Technique pages

- **Some Techniques are characterised by *operators* rather than by *incidents*.** OAK-T5.004 is most usefully discussed in terms of operator profiles — `jaredfromsubway.eth` is one of several public profiles (others tracked by Flashbots, EigenPhi). Examples for this Technique class should reference the operator and the analytics source rather than picking a single victim swap.
- **The mitigation layer is the actionable layer.** Per-victim recovery is impractical at sandwich-volume scale; mitigations live at the routing/venue layer (MEV-protected relays, batch auctions, slippage discipline). The OAK-T5.004 Mitigations section reflects this.
- **Public analytics are an acceptable primary source.** When the operator's behaviour is continuously characterised by a neutral analytics provider, OAK accepts the analytics report as a primary reference; the equivalent of a "forensic write-up" for a bot-mediated operation is the operator-tracking dashboard.

## Public references

- `[eigenphijared2023]` — EigenPhi performance appraisal of `jaredfromsubway.eth` (transactions, victims, revenue, profit).
- `[daian2019flashboys]` — foundational MEV characterisation under which this Technique is classified.

## Discussion

`jaredfromsubway.eth` is included in the OAK examples corpus because it pushes back against an implicit assumption that incidents are discrete, dated events with named victims and named amounts. T5.004 in particular is a cumulative, ongoing extraction at a venue scale that does not fit that frame. Future contributors writing OAK-T5.004 examples should plan to track operator profiles rather than per-swap incidents, and should be honest that mitigation lives at the MEV-protection layer rather than at the per-victim recovery layer.
