# Polymarket Subjective-Oracle Resolution Manipulation Cohort — 2025–2026

**OAK Techniques observed:** OAK-T9.006.001, OAK-T9.006.002, OAK-T9.006.003, OAK-T9.006.004

**Attribution:** **unattributed** (aggregate cohort).
**Loss:** ~\$258M+ in disputed market volume across the three cases with sourced volume (Ukraine mineral deal ~\$7M per CoinDesk, Zelenskyy-suit ~\$237M, Iran-strike >\$14M per The Block). Van Dyke / Operation Absolute Resolve has no verified market-volume figure; the sources report alleged insider profit of >\$404K (CFTC). Realised extraction is bounded by attacker-position-size in each market.

**Key teaching point:** Prediction markets whose resolution depends on a subjective oracle (UMA DVM, Kleros, Reality.eth) expose four structurally distinct attack surfaces — vote capture by economically-interested tokenholders (T9.006.001), resolution-spec ambiguity exploitation (T9.006.002), off-chain resolution-source coercion (T9.006.003), and operational-insider trading on classified-information access (T9.006.004). Each surface is load-bearing independently; a market can be defended against three and still fall to the fourth.

**Corrected 2026-10-11:** Ukraine mineral deal volume is ~\$7M (not ~\$12M); Iran-strike market is >\$14M (not ~\$5M); the unverified Van Dyke ~\$91M volume was replaced by the sourced ~\$404K alleged profit; no US–Iran ceasefire UMA case is used as an anchor (it is quarantined).

## Summary

## Timeline

2025-03 (Ukraine mineral deal — DVM vote capture) → 2025-07 (Zelenskyy-suit — spec-ambiguity exploitation) → 2025-12 to 2026-01 (Van Dyke / Operation Absolute Resolve — operational-insider trading) → 2026-03 (Iran-strike / Fabian — off-chain resolution-source coercion). The four canonical cases span 12 months, demonstrating that the subjective-oracle resolution surface is systematically exposed, not incidentally.

## Public references

- `[umadvm2025]` — UMA DVM documentation and tokenomics
- `[polymarket2025mineral]` — Polymarket "Ukraine mineral deal" market resolution and community dispute
- `[polymarket2025zelenskyy]` — Polymarket "Zelenskyy wears suit to White House" market resolution and spec-ambiguity dispute
- `[fabian2026iran]` — Emanuel Fabian / Times of Israel first-person account of off-chain coercion attempt (Iran-strike market)
- `[doj2026vandyke]` — DOJ SDNY indictment + CFTC parallel civil action (Van Dyke / Operation Absolute Resolve)
- `[acdc2026polymarket]` — ACDC analytics on longshot-win rates in military/defense prediction markets
- `[telaviv2026idf]` — Tel Aviv District Court indictment of IDF reservist (2026-02)
- `[coindeskukraine2025]` — CoinDesk, "Polymarket, UMA Communities Lock Horns After \$7M Ukraine Bet Resolves" (2025-03-27): <https://www.coindesk.com/markets/2025/03/27/polymarket-uma-communities-lock-horns-after-usd7m-ukraine-bet-resolves>
- `[decryptzelenskyy2025]` — Decrypt, "Polymarket Rules 'No' on \$237M Controversial Bet Over Zelenskyy's Suit" (2025-07-09): <https://decrypt.co/329210/polymarket-rules-no-237m-controversial-bet-over-zelenskyys-suit> (Zelenskyy-suit market)
- `[theblockfabian2026]` — The Block, "Polymarket bettors send death threats to reporter over missile report tied to \$14 million prediction market pool" (2026-03-16): <https://www.theblock.co/post/393790/polymarket-bettors-death-threats-reporter-missile-report-prediction-market> (Iran-strike market)
- `[cftcvandyke2026]` — CFTC, "CFTC Charges U.S. Service Member with Insider Trading in Nicolás Maduro-Related Event Contracts" (2026-04): <https://www.cftc.gov/PressRoom/PressReleases/9217-26> (Van Dyke)
- `[dojvandyke2026]` — U.S. Department of Justice (SDNY), "U.S. Soldier Charged With Using Classified Information To Profit On Prediction Market Bets" (2026-04): <https://www.justice.gov/usao-sdny/pr/us-soldier-charged-using-classified-information-profit-prediction-market-bets> (Van Dyke)
