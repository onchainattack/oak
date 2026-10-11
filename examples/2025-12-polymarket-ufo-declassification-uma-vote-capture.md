# Polymarket UFO Declassification UMA Vote-Capture Dispute — 2025-12

**Loss:** ~\$16M market (CryptoSlate). Bettors holding YES positions were paid when the UMA vote finalized YES on 2025-12-10 despite no new U.S. government UFO declassification notice being found; the only related release was AARO's posting of 2022 "unresolved" UAP imagery, which the market rules did not count.
**OAK Techniques observed:** **OAK-T9.006.001** (DVM Vote Capture by Economically-Interested Holder — primary; the alleged mechanism is token-weighted voting overriding trader consensus; this is community allegation, not shown by vote data). **OAK-T9.006** (Subjective-Oracle Resolution Manipulation — parent technique; the Polymarket/UMA oracle layer was the attack surface). **OAK-T9.006.002** (Resolution-Spec Ambiguity Exploitation — secondary; the market's resolution criterion "credible official announcement" was inherently ambiguous, enabling voters to rationalise the divergent ruling).
**Attribution:** **unattributed**. No source seen identifies UMA voters, links voter wallets to YES positions, or gives vote tallies; the earlier claim of vote-log analysis showing YES-position whales is unverified.
**Key teaching point:** **The UFO declassification market is a suspected, not confirmed, T9.006.001 case, following the Ukraine mineral deal market (March 2025, ~\$7M). It resolved YES through a two-dispute UMA escalation with no evidence of a real-world declassification, and community commenters alleged whales bought near par and that token-weighted voting overrode trader consensus. No voter-position data is public in the sources seen, so vote capture is an allegation. The structural point stands: a token-weighted subjective oracle can finalize against trader consensus on a market large relative to the cost of influencing a vote, and the market's own rules decide what counts.**

**Corrected 2026-10-11:** the market finalized YES on 2025-12-10 00:27 UTC after two disputes (not near the Dec 31 deadline); the ~\$16M figure is CryptoSlate's; the UMA market-cap comparison and vote-log concentration claims were removed and voter-position vote capture is stated as unverified allegation.

## Summary

A Polymarket market created 2025-04-17 asked whether the Trump administration would declassify UFO files in 2025 and reached ~\$16M. Per CryptoSlate, it closed just after midnight on 2025-12-10 and went through two proposals and two disputes, escalating to a UMA tokenholder vote that finalized **YES at 00:27:58 UTC on 2025-12-10**, not at the December 31 deadline. No new public declassification notice was found; the only related release was AARO's posting of 2022 "unresolved" UAP imagery, which the market rules did not count as a White House order.

Community commenters alleged that whales bought near par (99–99.9 cents) before finalization and that token-weighted voting overrode trader consensus. CryptoSlate reports these claims but does not verify them: it gives no vote tallies, does not identify UMA voters, and does not link any wallet to a vote. One ~\$615,000 late trade is noted but is not tied to any voter. Earlier versions of this file stated UMA vote-log concentration and a ~\$95M UMA market cap comparison; neither is supported and both are removed.

Relation to the Polymarket subjective-oracle cohort: the case is a plausible T9.006.001 (vote capture) instance by outcome, but the voter-position overlap that defines the pattern is unverified, so it should be treated as a disputed-resolution case until vote data surfaces.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2025-04-17 | Polymarket market created on whether the Trump administration declassifies UFO files in 2025 | (market creation) |
| 2025-12-10 (just after 00:00) | Market closes; two proposals and two disputes follow, escalating to UMA governance | (dispute escalation) |
| 2025-12-10 00:27:58 | UMA vote finalizes YES; no new declassification notice found | T9.006.001 (suspected; voter data unverified) |
| 2025-12-10 onward | CryptoSlate and community commenters allege whale vote-capture; no vote-level evidence published | (market discussion) |

## Realised extraction

The ~\$16M market resolved in favour of YES-position holders. Whether any UMA voters were among them is unverified. NO-position holders did not receive refunds (consistent with Polymarket's UMA-bound resolution policy).

## Public references

- Cross-reference: T9.006.001 (DVM Vote Capture by Economically-Interested Holder) at `techniques/T9.006.001-dvm-vote-capture.md`.
- [`examples/2025-03-polymarket-uma-ukraine-mineral-deal.md`](../examples/2025-03-polymarket-uma-ukraine-mineral-deal.md) — Ukraine mineral deal market, March 2025 (canonical T9.006.001 anchor, ~\$7M).
- [`examples/2025-07-polymarket-zelenskyy-suit.md`](../examples/2025-07-polymarket-zelenskyy-suit.md) — Zelenskyy-suit market, July 2025 (canonical T9.006.002 anchor, ~\$237M).
- `[cryptoslateufo2025]` — CryptoSlate, "Polymarket faces major credibility crisis after whales forced a \"YES\" UFO vote without evidence" (2025-12-10): <https://cryptoslate.com/polymarket-faces-major-credibility-crisis-after-whales-forced-a-yes-ufo-vote-without-evidence/>
