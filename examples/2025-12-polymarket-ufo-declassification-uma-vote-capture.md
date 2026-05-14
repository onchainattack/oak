# Polymarket UFO Declassification UMA Vote-Capture Dispute — 2025-12

**Loss:** ~$16M in disputed market volume. Bettors holding YES positions profited when UMA voters resolved YES despite no official U.S. government UFO declassification announcement during the market window.
**OAK Techniques observed:** **OAK-T9.006.001** (DVM Vote Capture by Economically-Interested Holder — primary; UMA whale vote-weight concentration drove resolution to YES despite absence of real-world signal). **OAK-T9.006** (Subjective-Oracle Resolution Manipulation — parent technique; the Polymarket/UMA oracle layer was the attack surface). **OAK-T9.006.002** (Resolution-Spec Ambiguity Exploitation — secondary; the market's resolution criterion "credible official announcement" was inherently ambiguous, enabling voters to rationalise the divergent ruling).
**Attribution:** **pseudonymous** at the individual-voter level; UMA tokenholder vote-log analysis identified a concentration of YES votes from wallets with material UMA holdings and positions in the YES outcome. No public named-individual attribution at v0.1.
**Key teaching point:** **The UFO declassification market is the second-confirmed T9.006.001 case after Ukraine mineral deal (March 2025, ~$7M), and the third in the broader 2025 Polymarket subjective-oracle dispute cohort. The case confirms the T9.006.001 pattern: a market whose volume exceeds the economically-rational cost of vote-capture, with voter-position overlap between UMA holdings and bettor-side outcomes. The structural disequilibrium — UMA market cap (~$95M during dispute window) smaller than combined disputed-market volume — is the stable property that makes each additional disputed market a standing T9.006.001 surface.**

## Summary

In December 2025, a Polymarket market on whether the U.S. government would "make a credible official announcement confirming the existence of UFOs/UAPs of non-human origin" in 2025 reached approximately $16M in volume. As the market approached its December 31, 2025 resolution deadline without any such announcement, NO held a strong probability advantage consistent with the absence of a real-world signal.

During the resolution window, UMA voters resolved the market to YES despite no U.S. government announcement matching the resolution criteria. Analysis of UMA vote logs identified vote-weight concentration from wallets associated with large UMA tokenholders who also held YES positions on the market.

The case shares the structural signature of the canonical Ukraine mineral deal case (March 2025, ~$7M, ~5M UMA cast by a single whale via 3 wallets, ~25% of resolution vote driving YES):

- **Voter-position overlap:** UMA voters with material UMA holdings also held bettor-side positions in the disputed market.
- **Vote-weight concentration:** A small number of large-UMA-holding wallets cast a disproportionate fraction of the resolution vote.
- **Real-world signal divergence:** The oracle resolution diverged from the consensus interpretation of the underlying real-world event.
- **Platform characterisation:** Polymarket publicly acknowledged the disputed nature of the resolution; the UMA vote was characterised by market participants as economically-motivated vote capture.

The case, alongside Ukraine mineral deal and Zelenskyy-suit, forms the core of the 2025 Polymarket subjective-oracle dispute cohort. The three cases span the T9.006 sub-Technique taxonomy: Ukraine mineral deal is the canonical T9.006.001 (vote capture), Zelenskyy-suit is the canonical T9.006.002 (spec ambiguity), and UFO declassification is the second T9.006.001 case confirming the vote-capture pattern as repeatable.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2025 | Polymarket market created: "U.S. government credible official announcement confirming UFOs/UAPs of non-human origin in 2025?" | (market creation) |
| 2025 | Market reaches ~$16M volume; no government announcement during market window | (market activity) |
| 2025-12 (resolution window) | UMA voters resolve YES despite absence of real-world signal; voter-position overlap analysis identifies UMA whale concentration driving YES outcome | **T9.006.001 vote capture** |
| 2025-12 to 2026-01 | Polymarket publicly acknowledges disputed resolution; market-participant discussion characterises outcome as vote-capture | (platform response) |

## Realised extraction

~$16M in disputed market volume resolved in favour of YES-position holders including UMA whales who voted the resolution. NO-position holders did not receive refunds (consistent with Polymarket's UMA-bound resolution policy).

## Public references

- Polymarket market page — UFO declassification 2025 market; resolution data and bettor-side position records.
- UMA DVM vote logs for the resolution window — voter-position overlap analysis.
- Polymarket public statements on the disputed resolution.
- Cross-reference: T9.006.001 (DVM Vote Capture by Economically-Interested Holder) at `techniques/T9.006.001-dvm-vote-capture.md`.
- [`examples/2025-03-polymarket-uma-ukraine-mineral-deal.md`](../examples/2025-03-polymarket-uma-ukraine-mineral-deal.md) — Ukraine mineral deal market, March 2025 (canonical T9.006.001 anchor, ~$7M).
- [`examples/2025-07-polymarket-zelenskyy-suit.md`](../examples/2025-07-polymarket-zelenskyy-suit.md) — Zelenskyy-suit market, July 2025 (canonical T9.006.002 anchor, ~$237M).
