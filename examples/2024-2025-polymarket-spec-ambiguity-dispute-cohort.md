# Polymarket Spec-Ambiguity Resolution Dispute Cohort — 2024–2025

**Loss:** Disputed-market volume varies by market; the Zelenskyy-suit market (~$237M) is the largest, but smaller markets with spec-ambiguity disputes in the single-digit millions cumulatively represent material bettor-side losses.
**OAK Techniques observed:** **OAK-T9.006.002** (Resolution-Spec Ambiguity Exploitation — primary; natural-language market resolution criteria with unmachine-checkable predicates enabled divergent UMA voter interpretation). **OAK-T9.006** (Subjective-Oracle Resolution Manipulation — parent technique; the Polymarket/UMA oracle layer was the structural attack surface).
**Attribution:** **unattributed** — attribution is to the market-design layer (Polymarket's natural-language resolution specifications) and the oracle-design layer (UMA's voter discretion) rather than to an individual operator. Individual UMA voters acting on spec-ambiguity are voting consistent with one reasonable interpretation of an ambiguous spec.
**Key teaching point:** **T9.006.002 is not limited to the Zelenskyy-suit market. Any Polymarket market whose resolution criterion includes an unmachine-checkable predicate — "credible reporting," "official," "genuine," "agrees to," "confirmed by," "widely recognised as" — has spec-ambiguity as a standing surface. The Zelenskyy-suit market made the structural disequilibrium visible at scale ($237M); smaller markets with the same spec-language pattern are exposed to the same attack class at proportionally smaller volumes. The mitigation is at the market-spec design layer: markets resolving on language are exposed to T9.006.002 by construction; markets resolving on cryptographically-verifiable inputs are not.**

## Summary

The Zelenskyy-suit market (July 2025, ~$237M) is the canonical T9.006.002 anchor because its scale, press coverage, and the multi-outlet media consensus (Reuters, AP, AFP all reporting Zelenskyy in a suit) vs. UMA resolution (NO, citing "lack of credible reporting consensus") made the spec-ambiguity surface unambiguously visible. But the Zelenskyy-suit market was not the first Polymarket market with an ambiguous resolution spec, nor the first to produce a disputed resolution.

The broader 2024–2025 Polymarket spec-ambiguity cohort includes markets whose resolution criteria contain predicates that are structurally unmachine-checkable:

- **Fashion / wardrobe predicates:** "Wearing a suit," "wearing a tie," "wearing a specific garment." These predicates depend on photographic interpretation; there is no canonical authority on what constitutes "wearing a suit" (jacket only? jacket + tie? specific colour?).
- **Political-status predicates:** "Agrees to a deal," "announces," "confirms," "officially states." These predicates depend on interpreting political speech — a statement that one reasonable observer considers an announcement may be considered a non-announcement by another.
- **Subjective-adjudication predicates:** "Credible reporting consensus," "widely recognised as," "generally accepted that." These predicates are meta-subjective — the resolution spec asks voters to evaluate the subjective assessment of an unspecified cohort of observers.
- **Interpretive-framing predicates:** "Genuine," "official," "verified," "legitimate." These predicates embed an evaluative judgment into the resolution criterion.

The common structural feature: **each predicate embeds a natural-language interpretation step that cannot be reduced to a machine-checkable on-chain state transition.** The UMA DVM is asked to resolve a question that has no deterministic answer. Voters resolve consistent with their interpretation of the spec; bettors whose positions align with the resolution benefit.

The mitigation is at the market-design layer, not at the oracle or voter layer. Markets resolving on cryptographically-verifiable inputs (block-height events, on-chain state, signed oracle attestations with explicit source enumeration) are not exposed to T9.006.002. Markets resolving on natural-language predicates are exposed by construction.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2020–2024 | Polymarket launches and scales; natural-language market resolution specifications are the product default; spec-ambiguity as a standing surface from market-creation time | **T9.006.002 surface creation** |
| 2024–2025 | Smaller Polymarket markets with ambiguous specs produce disputed resolutions; bettor-side complaints cite spec-ambiguity as the divergence driver | **T9.006.002 pre-Zelenskyy cohort** |
| 2025-06-24 | Zelenskyy photographed in a suit at NATO; Reuters, AP, AFP publish confirming coverage | (real-world event) |
| 2025-07-01 | UMA voters resolve Zelenskyy-suit market NO citing "lack of credible reporting consensus" despite multi-outlet media consensus | **T9.006.002 canonical anchor** |
| 2025–2026 | Post-Zelenskyy market-spec review; Polymarket and other prediction-market platforms face pressure to tighten natural-language resolution specifications | (market-design response) |

## Realised extraction

Varies by market. Zelenskyy-suit at ~$237M is the largest; smaller markets in the single-digit millions cumulatively represent material bettor-side losses. No refund mechanism exists (UMA resolution is binding per Polymarket's terms).

## Public references

- Cross-reference: T9.006.002 (Resolution-Spec Ambiguity Exploitation) at `techniques/T9.006.002-resolution-spec-ambiguity-exploitation.md`.
- [`examples/2025-07-polymarket-zelenskyy-suit.md`](../examples/2025-07-polymarket-zelenskyy-suit.md) — Zelenskyy-suit market, July 2025 (canonical T9.006.002 anchor, ~$237M).
- Decrypt, CoinDesk ("This Isn't Decentralized"), The Defiant — Zelenskyy-suit market coverage.
- Polymarket market-listing guidelines — resolution-spec language standards (pre- and post-Zelenskyy).
- UMA DVM documentation — voter discretion in subjective-oracle resolution.
