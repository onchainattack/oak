# Polymarket Zelenskyy-suit market — UMA resolution-spec ambiguity — 2025-07

**Loss:** ~$237M in disputed market volume (subsequently characterised at ~$160M in CoinDesk's secondary reporting). No funds drained; bettors who interpreted the market's stated rule one way (multiple credible outlets reported Zelenskyy in a suit at NATO June 24) lost their stakes when UMA voted otherwise.
**OAK Techniques observed:** **OAK-T9.006.002** — Resolution-Spec Ambiguity Exploitation. The canonical worked-example anchor for the sub-Technique. Parent Technique: OAK-T9.006 (Subjective-Oracle Resolution Manipulation).
**Attribution:** **inferred-strong**. The top 10 UMA voters held ~6.5M UMA (~30% of average vote). UMA's full market cap during the dispute window was ~$95M — less than half the disputed market's volume. Specific voter-bettor position-overlap analysis is in industry reporting; OAK does not name individual operators at v0.1.

## Timeline (UTC unless noted)

| When | Event | OAK ref |
|---|---|---|
| 2025-Q2 | Polymarket lists "Will Zelenskyy be photographed wearing a suit before June 30, 2025?" market; attracts ~$237M in volume during period of public attention to Ukrainian president's wardrobe | T9.006.002 (standing resolution-spec ambiguity surface — "wearing a suit" has no machine-checkable definition) |
| 2025-06-24 | Zelenskyy attends NATO summit in clothing described as a suit by multiple major media outlets (Reuters, AP, AFP) | (real-world event — resolution input triggers YES interpretation per major media) |
| 2025-06-24 → 2025-07-01 | YES probability stays elevated through dispute window; UMA voters prepare to adjudicate; top 10 voters hold ~6.5M UMA (~30% of average vote) | T9.006.002 (dispute window — voter-position correlation observable) |
| 2025-07-01 | UMA voters resolve market NO, citing lack of "credible reporting consensus" — despite multiple major outlets reporting Zelenskyy in a suit | T9.006.002 (resolution-spec ambiguity exploitation — "credible reporting consensus" itself a subjective interpretation) |
| 2025-07 onward | Industry coverage (CoinDesk "This Isn't Decentralized," Decrypt, The Defiant) documents the resolution as captured; market's volume ($237M) exceeded UMA market cap (~$95M) — oracle economically smaller than a single market it adjudicated | (public documentation — oracle-weight-vs-adjudicated-volume disequilibrium characterized) |
| Continuing | Canonical T9.006.002 anchor demonstrating resolution-spec ambiguity exploitation at the largest-volume subjective-oracle market on record at the time | (canonical reference — resolution-spec ambiguity) |

**Key teaching point:** **The Zelenskyy-suit market ($237M volume, July 2025) demonstrated that resolution-spec ambiguity is a structural attack surface, not an edge case — the oracle was economically smaller than a single market it adjudicated (UMA market cap ~$95M < $237M disputed volume).** "Wearing a suit" has no machine-checkable definition, and "credible reporting consensus" is itself a subjective claim that voters can adjudicate against the bettor majority's reading. The case established T9.006.002 as a first-class Technique sub-pattern: the spec is the vulnerability. Machine-checkable resolution criteria are the only structural mitigation — markets resolving on language are permanently exposed.

## Summary

The Polymarket market "Will Zelenskyy be photographed wearing a suit before June 30, 2025?" attracted ~$237M in volume during a period of public attention to the Ukrainian president's wardrobe choices. On June 24, 2025, Zelenskyy attended a NATO summit in clothing that multiple major media outlets — including Reuters, AP, and AFP — described as a suit.

Despite this reporting, UMA voters resolved the market NO on July 1, citing lack of "credible reporting consensus." The top 10 UMA voters held approximately 6.5M UMA tokens (~30% of the average vote) during the dispute window. UMA's market cap at the time (~$95M) was less than half the disputed market's volume — the oracle was economically smaller than a single market it adjudicated.

This is the canonical example of resolution-spec ambiguity being exploited at scale. The market's wording — "wearing a suit" — has no machine-checkable definition, and "credible reporting consensus" is itself a subjective claim that voters can adjudicate against the bettor majority's reading.

## Why this is structurally significant

The Zelenskyy-suit market made the structural disequilibrium visible: **the oracle's total economic weight (UMA market cap) was smaller than the prize available for corrupting it (the market's volume)**. This is not a transient mispricing — it is a stable property of any subjective oracle adjudicating economically meaningful prediction markets. The larger Polymarket grows, the more profitable each individual oracle-corruption opportunity becomes, while the cost of acquiring veto-equivalent UMA voting power stays bounded by UMA's market cap.

This is qualitatively different from price-oracle manipulation (OAK-T9.001), where the manipulation cost scales with pool depth and the attacker must continuously fund a position. UMA-class manipulation is a one-time governance vote with a long-tail bounty.

## What defenders observed

- **Pre-event:** the market specification did not include a machine-checkable resolution criterion. "Wearing a suit" requires a human judgment call. A defender designing a UMA-class oracle should treat any market title that includes a fashion / language / interpretive claim as elevated dispute risk.
- **At-event:** the YES probability stayed elevated through the dispute window, then dropped on resolution. Standard CLOB monitoring caught the divergence between media consensus (which leaned YES) and the oracle resolution (which went NO).
- **Post-event:** the case became a public reference for the "this isn't decentralised" critique of Polymarket's oracle layer. CoinDesk's follow-up "This Isn't Decentralized" piece quoted Polymarket power users describing the resolution as captured.

## What this example tells contributors

Contributors writing v0.x OAK-T9.006.002 (resolution-spec ambiguity exploitation) should use Zelenskyy-suit as the canonical case alongside the Ukraine mineral deal (T9.006.001) and the Iran-strike journalist coercion (T9.006.003).

The mitigation surface is structurally limited:

- **Machine-checkable resolution criteria** — markets resolving on cryptographically-verifiable inputs (block-height events, on-chain state, signed oracle attestations) are not exposed to T9.006.002. Markets resolving on language are.
- **Oracle-weight floor relative to adjudicated volume** — a UMA-class oracle should refuse to adjudicate markets whose volume exceeds some fraction of the oracle token's market cap. This is a structural change to UMA, not a Polymarket-side mitigation.
- **Voter-position disclosure with conflict-of-interest slashing** — voters with positions in the adjudicated market should be excluded or slashable. UMA does not currently enforce this.

## Public references

- [Decrypt — Polymarket Rules No on $237 Million Bet on Zelensky's Suit](https://decrypt.co/329210/polymarket-rules-no-237m-bet-zelenskyys)
- [CoinDesk — Polymarket Embroiled in $160M Controversy Over Whether Zelensky Wore a Suit at NATO](https://www.coindesk.com/markets/2025/07/07/polymarket-embroiled-in-usd160m-controversy-over-whether-zelensky-wore-a-suit-at-nato)
- [CoinDesk — "This Isn't Decentralized" Says Polymarket Power User As Zelenskyy's Suit Controversy Unfolds](https://www.coindesk.com/markets/2025/07/09/this-isnt-decentralized-says-polymarket-power-user-as-zelenskyys-suit-controversy-unfolds)
- [The Defiant — UMA Token Holders Vote on Polymarket Zelensky Suit Market](https://thedefiant.io/) — secondary coverage.
