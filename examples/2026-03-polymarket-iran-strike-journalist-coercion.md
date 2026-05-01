# Polymarket Iran-strike market — physical coercion of resolution source — 2026-03

**Loss:** ~$900,000 in market positions held by Polymarket bettors who would have profited from a YES resolution. The "loss" here is bettor-stake forfeiture in a correctly-resolved market — not theft. The economically operative event is the **threats issued against the journalist whose reporting the market relied on**, which constitute the first publicly documented case of physical coercion of an off-chain resolution source as an oracle attack vector in a crypto-prediction-market context.
**OAK Techniques observed:** No clean v0.1 Technique. **Proposed v0.x candidate**: OAK-T9.006.003 — Off-chain resolution-source coercion. See `TAXONOMY-GAPS.md`.
**Attribution:** **confirmed at the action level** (Times of Israel correspondent Emanuel Fabian published a first-person account; Washington Post, Haaretz independently corroborated the threats). Specific bettor identification was not pursued by Polymarket or law enforcement at v0.1; the Washington Post account documents threats from multiple distinct anonymous accounts, consistent with a small bettor cohort acting individually rather than a coordinated operator.

## Summary

In March 2026, Polymarket ran a market on whether Iran would strike Israel within a defined window, with ~$14-23M in volume. The market's resolution depended in part on reporting by Times of Israel correspondent Emanuel Fabian, whose article described the events of an Iran missile launch in language that, under one interpretation, would have caused the market to resolve YES (favouring one side of bettors holding ~$900,000 in positions).

After Fabian's article was published, multiple Polymarket bettors who held the disfavoured side sent **death threats** to Fabian via direct messages and social media, **demanding that he rewrite his report** so the market would resolve in their favour. The threats were documented in a first-person account Fabian published in Times of Israel and corroborated by Washington Post reporting on March 17, 2026.

This is the first publicly documented case in crypto-prediction-market history of physical coercion of an off-chain human reporter as an attack vector against the resolution layer. The journalist did not change his reporting; the market resolved against the threatening bettors' position; the perpetrators were not publicly identified or prosecuted as of v0.1.

## What this incident establishes for OAK

The threat-against-Fabian case proves a structural property of subjective-oracle prediction markets that was previously theoretical: **when the resolution input is a single human reporter's published account, the human reporter becomes an attack surface**.

OAK-T9.001 (price-feed oracle manipulation) does not contemplate this attack class. The mitigations OAK lists for T9.001 (TWAP, multi-venue feeds, deviation halts — OAK-M09) are mechanical and apply to numerical price feeds. None of them apply to "the resolution depends on a journalist's interpretation of an event."

The attack vector is not crypto-specific in technique — extortion of journalists has a long history outside crypto. What is novel is that the *economic incentive* for the extortion is created by the prediction market itself. The market creates a bounty for a specific reporting outcome; bettors with positions translate that bounty into pressure on the human reporter.

This is a category-level new finding for OAK: an attack vector that operates entirely off-chain, against humans, but whose economic motivation is generated on-chain.

## What defenders observed

- **Pre-event:** the market specification included external reporting as a resolution input. The standard practice in subjective-oracle markets is to cite "credible reporting" without naming specific publishers — Polymarket markets routinely list multiple acceptable sources in their resolution criteria. The single-journalist exposure was a market-spec property the platform did not surface as a design risk before this incident.
- **At-event:** the threats were sent to Fabian privately (DMs and email) and via reply-spam on his social-media posts. Fabian preserved evidence and published a first-person account. The Washington Post followed up with corroborating coverage and quotes.
- **Post-event:** Polymarket did not publicly comment on the case in detail. No prosecutions were announced. The market resolved per Fabian's published account; bettors' threats did not influence the resolution. The incident has not (as of v0.1) prompted documented platform-side market-specification reform.

## What this example tells contributors

The Fabian case is the canonical citation for OAK-T9.006.003 (off-chain resolution-source coercion). Contributors writing v0.x defensive guidance should consider:

1. **Source-multiplicity in resolution specifications** — markets requiring two or more independently-published sources for resolution, with no single human reporter's account being load-bearing. This is a *market-design* mitigation, not a platform-design mitigation.

2. **Bettor-position disclosure to potential resolution sources** — journalists whose reporting is cited in a resolution spec should be informed before publication that their account may have economic influence. This is operationally awkward but is the only way to extend traditional journalistic threat-modeling into the crypto-prediction-market context.

3. **Platform-level threat-monitoring of high-volume markets where reporting cohorts are narrow** — Polymarket can identify markets where a single journalist or single publication is the dominant resolution input. Those markets warrant heightened monitoring of bettor behaviour around the resolution window.

4. **Attribution for T9.006.003 incidents is structurally hard** — the threats come from individual anonymous accounts with no single operator-cluster signature. OAK should expect future cases of this class to remain `inferred-strong` or `confirmed-without-attribution` rather than reaching the per-operator `confirmed` standard.

## Why this incident belongs in OAK

OAK's mission is to document the real adversary surface against on-chain assets — including the parts that are not technical exploits. The Fabian case is on the public record (Washington Post, Haaretz, Times of Israel), the technique is generalisable (any subjective-oracle prediction market with narrow resolution-source cohorts), and the defensive surface is real (market-spec design, source-multiplicity, journalist-side awareness). Documenting it explicitly is the only way an open framework can claim to cover the actual adversary surface rather than the comfortable subset of it.

Contributors writing future T9.006.003 entries should treat this as the structural reference case and document subsequent incidents as cohort cases.

## Public references

- [Washington Post — How Polymarket bettors threatened a journalist over an Iran-strike market](https://www.washingtonpost.com/technology/2026/03/17/israel-journalist-polymarket-iran-strike/) — primary investigative reporting.
- [Times of Israel — Emanuel Fabian's first-person account](https://www.timesofisrael.com/gamblers-trying-to-win-a-bet-on-polymarket-are-vowing-to-kill-me-if-i-dont-rewrite-an-iran-missile-story/) — primary first-person disclosure.
- [Haaretz — corroborating coverage of the Fabian threats](https://www.haaretz.com/) — secondary corroboration.
