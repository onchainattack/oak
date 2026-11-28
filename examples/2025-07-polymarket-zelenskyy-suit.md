# Polymarket Zelenskyy-suit market — UMA resolves "No" over a "consensus of credible reporting" rule — 2025-07

**Loss:** No funds were stolen or drained. [Decrypt](https://decrypt.co/329210/polymarket-rules-no-237m-bet-zelenskyys) reports more than \$237M in trading volume on the market. [CoinDesk](https://www.coindesk.com/markets/2025/07/07/polymarket-embroiled-in-usd160m-controversy-over-whether-zelensky-wore-a-suit-at-nato) (2025-07-07) says more than \$160M in the headline and article and over \$150M in its summary, and a [second CoinDesk piece](https://www.coindesk.com/markets/2025/07/09/this-isnt-decentralized-says-polymarket-power-user-as-zelenskyys-suit-controversy-unfolds) calls it a market of about \$200 million. The pages disagree and none gives a loss to "Yes" holders. CoinDesk reports the Yes price fell from \$0.19 to \$0.04.

**OAK Techniques observed:** **OAK-T9.006.002** (Resolution-Spec Ambiguity Exploitation): the market resolved on a "consensus of credible reporting" standard and the oracle found that consensus not established. No opened page shows any voter acting for gain on a position; manipulation is alleged by critics only. See [`techniques/T9.006.002-resolution-spec-ambiguity-exploitation.md`](../techniques/T9.006.002-resolution-spec-ambiguity-exploitation.md).

**Attribution:** **unattributed**. [CoinDesk](https://www.coindesk.com/markets/2025/07/07/polymarket-embroiled-in-usd160m-controversy-over-whether-zelensky-wore-a-suit-at-nato) quotes an X user saying whales are trying to rig the vote and reports that Yes supporters allege manipulation; it names no voter. The earlier version said attribution was inferred-strong from top-10 voter holdings (~6.5M UMA, ~30% of the vote) and a ~\$95M UMA market cap. No opened page carries either figure, so both are removed. [Decrypt](https://decrypt.co/329210/polymarket-rules-no-237m-bet-zelenskyys) gives no vote counts, voter counts or top-holder data.

**Key teaching point:** **A market that resolves on a subjective phrase is only as clear as its wording.** The question asked whether Zelenskyy would be "photographed or videotaped wearing a suit" and resolved on a "consensus of credible reporting" ([Decrypt](https://decrypt.co/329210/polymarket-rules-no-237m-bet-zelenskyys)); the outfit was a black jacket, matching trousers and a collared shirt, which many outlets called a suit. A market designer should name the evidence and the tie-break in the rule text before trading opens.

## Summary

Per [Decrypt](https://decrypt.co/329210/polymarket-rules-no-237m-bet-zelenskyys) (2025-07-09), the Polymarket market asked whether Zelenskyy would be "photographed or videotaped wearing a suit" between March 22 and June 30, and drew over \$237M in volume. On June 24 he appeared at a NATO event in the Netherlands in a black jacket, matching trousers and a collared shirt, which "numerous media outlets" described as a suit. An initial Yes outcome was challenged; after a second review it was overturned to No, and on July 1 UMA's oracle finalised No. Critics said this conflicted with media reports and visual evidence, and argued that token-weighted voting let large holders sway outcomes.

[CoinDesk](https://www.coindesk.com/markets/2025/07/07/polymarket-embroiled-in-usd160m-controversy-over-whether-zelensky-wore-a-suit-at-nato) wrote on 2025-07-07 that the final resolution was scheduled for 00:00 UTC on 2025-07-08 and did not state the outcome, which differs from Decrypt's July 1 finalisation; the pages do not reconcile this. A [second CoinDesk article](https://www.coindesk.com/markets/2025/07/09/this-isnt-decentralized-says-polymarket-power-user-as-zelenskyys-suit-controversy-unfolds) says the market was set to resolve "No" although outlets including the BBC and New York Post described the outfit as a suit, cites IntotheBlock data that about 95% of UMA tokens are held by large holders, and quotes a Polymarket bettor on UMA's incentives to vote with the perceived majority. That page gives the outfit date as June 25, Decrypt as June 24; both are noted.

Related sibling files: [`2024-2025-polymarket-spec-ambiguity-dispute-cohort.md`](2024-2025-polymarket-spec-ambiguity-dispute-cohort.md) and [`2025-03-polymarket-uma-ukraine-mineral-deal.md`](2025-03-polymarket-uma-ukraine-mineral-deal.md).

## Timeline (UTC)

Times of day are undisclosed on the opened pages.

| When | What happened | OAK |
|---|---|---|
| 2025-03-22 | Start of the period the market covers ([Decrypt](https://decrypt.co/329210/polymarket-rules-no-237m-bet-zelenskyys)); listing date undisclosed | **T9.006.002** (rule wording) |
| 2025-06-24 | Zelenskyy at a NATO event in the Netherlands in the outfit described as a suit ([Decrypt](https://decrypt.co/329210/polymarket-rules-no-237m-bet-zelenskyys)); CoinDesk gives June 25 | none — real-world event |
| Undisclosed | Initial Yes outcome challenged; after a second review overturned to No ([Decrypt](https://decrypt.co/329210/polymarket-rules-no-237m-bet-zelenskyys)) | **T9.006.002** |
| 2025-07-01 | UMA's oracle finalises "No" per Decrypt; community proposals for reassessment rejected | **T9.006.002** |
| 2025-07-07 | CoinDesk: "Yes" price down from \$0.19 to \$0.04; final resolution scheduled 2025-07-08 00:00 UTC | response |
| 2025-07-09 | Decrypt and a second CoinDesk article report the controversy | response |

Key addresses: none printed on any opened page. Fund flow: no funds moved illicitly.

## Root-cause evidence

- **Technique:** OAK-T9.006.002
- **Source:** <https://decrypt.co/329210/polymarket-rules-no-237m-bet-zelenskyys>; <https://www.coindesk.com/markets/2025/07/07/polymarket-embroiled-in-usd160m-controversy-over-whether-zelensky-wore-a-suit-at-nato>; <https://www.coindesk.com/markets/2025/07/09/this-isnt-decentralized-says-polymarket-power-user-as-zelenskyys-suit-controversy-unfolds>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** Three news pages describe the rule, the outfit and the resolution. They do not show who voted or on what basis, so a market-design failure rather than deliberate manipulation is all that is established.

## Public references

- Decrypt, [Polymarket Rules No on $237 Million Bet on Zelensky's Suit](https://decrypt.co/329210/polymarket-rules-no-237m-bet-zelenskyys) (2025-07-09).
- CoinDesk, [Polymarket Embroiled in $160M Controversy Over Whether Zelensky Wore a Suit at NATO](https://www.coindesk.com/markets/2025/07/07/polymarket-embroiled-in-usd160m-controversy-over-whether-zelensky-wore-a-suit-at-nato) (2025-07-07, updated 2025-07-09).
- CoinDesk, ["This Isn't Decentralized" Says Polymarket Power User](https://www.coindesk.com/markets/2025/07/09/this-isnt-decentralized-says-polymarket-power-user-as-zelenskyys-suit-controversy-unfolds) (2025-07-09).
