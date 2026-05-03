# Polymarket UMA governance attack — Ukraine mineral deal market — 2025-03

**Loss:** ~$7M in market volume resolved against the underlying real-world outcome. No funds drained; aggrieved YES-side bettors lost their stakes to a coordinated UMA-tokenholder vote that overrode the market's stated resolution criteria.
**OAK Techniques observed:** **OAK-T9.006.001** — DVM Vote Capture by Economically-Interested Holder. The canonical worked-example anchor for the sub-Technique. Parent Technique: OAK-T9.006 (Subjective-Oracle Resolution Manipulation).
**Attribution:** **confirmed at the structural level** (Polymarket itself publicly described this as an "unprecedented governance attack"); **inferred-strong at the operator level** — a single UMA whale cast ~5M UMA tokens via 3 wallets representing ~25% of the resolution vote.

## Summary

The Polymarket market "Ukraine agrees to Trump mineral deal before April?" had stated resolution rules requiring "official information from the US and Ukrainian governments" confirming a deal. As of March 25, 2025, no such deal had been announced or signed. Despite this, the market resolved YES on March 24-25 after the YES probability surged from ~9% to 100% in the resolution window.

Investigation by Polymarket and CoinDesk identified a single UMA whale who cast approximately 5 million UMA tokens across 3 wallets (~25% of the total resolution vote), driving the YES outcome. Polymarket publicly conceded that the resolution was "incorrect" and described the event as an "unprecedented governance attack" — but, citing the decentralised structure of UMA's optimistic oracle, refused refunds.

This is the first documented case of a Polymarket market resolved against its stated rules through coordinated UMA tokenholder voting. It is also the first time Polymarket itself publicly acknowledged that its oracle layer had been corrupted.

## Why this is structurally novel

Spot-AMM oracle manipulation (Mango Markets, BonqDAO, Vee Finance — all canonical OAK-T9.001 cases) is a *liquidity attack*: the attacker borrows or accumulates capital, moves a thin pool, and books the price reading. Mitigations are mechanical — TWAP, multi-venue feeds, deviation halts (OAK-M09).

Polymarket-class subjective-oracle manipulation has no mechanical mitigation. The "oracle" is a token-weighted vote over a natural-language claim. Four properties make it qualitatively different:

1. **The oracle adjudicates language, not numbers.** "Agrees to a deal" has no TWAP. Spec-ambiguity is the attack surface; the spec itself is the vulnerability.
2. **Oracle market cap < adjudicated volume.** UMA's market cap was ~$95M during this period; subsequent disputed markets (e.g., the Zelenskyy-suit market at $237M) had volume larger than the oracle's market cap. The economic cost of corrupting the vote is a fraction of the prize. This is a stable disequilibrium that gets *worse* as Polymarket scales.
3. **Voter–bettor identity overlap.** UMA tokenholders are not a separate pool from market participants; nothing prevents a whale from voting on a market they hold a position in. Classical oracle defenses assume voter neutrality, which is structurally absent here.
4. **The resolution source itself is attackable off-chain.** When a market resolves on a real-world claim ("a deal was announced"), the resolution input — news headlines, official statements — can be manipulated upstream of the oracle.

OAK's existing T9.001 (price-feed oracle manipulation) does not cover this attack class. v0.x should add T9.006 as a first-class Technique with sub-patterns .001 (DVM vote capture), .002 (resolution-spec ambiguity exploitation), .003 (off-chain resolution-source coercion), .004 (platform-override of oracle outcome).

## What defenders observed

- **Pre-event:** the market's resolution criteria were ambiguous in a way that voters could exploit ("official information" — published where? authoritative as of when?). Spec-tightening would have raised the cost of dispute but not eliminated the vote-capture vector.
- **At-event:** the YES surge from 9% to 100% in the resolution window is observable on-chain in the Polymarket CLOB. Voter–position correlation analysis (the 3 wallets that cast 5M UMA also held large YES positions) was performed retrospectively by Polymarket and CoinDesk.
- **Post-event:** Polymarket's public characterisation as a "governance attack" is the strongest available admission that the oracle layer is not mechanically defensible against economically-rational voters. The platform's refusal to refund — citing UMA's decentralised structure — exposes the trust gap that subsequent markets (Zelenskyy suit, US-Iran ceasefire, UFO declassification) only widened.

## What this example tells contributors

The Ukraine mineral deal market is the canonical *first* of a now-documented cohort of Polymarket-UMA resolution-manipulation cases. Subsequent cases (Zelenskyy suit July 2025, UFO declassification December 2025, US-Iran ceasefire April 2026, Iran-strike journalist coercion March 2026) belong to the same Technique class.

Contributors writing the v0.x T9.006 entry should anchor on this incident as the structural-novelty proof and use the Zelenskyy and Iran cases as cohort evidence. The journalist-coercion case (March 2026) is the most unsettling sub-pattern (.003) because it extends the attack vector into physical coercion of off-chain humans.

## Public references

- [CoinDesk — Polymarket, UMA Communities Lock Horns After $7M Ukraine Bet Resolves "Incorrectly"](https://www.coindesk.com/markets/2025/03/27/polymarket-uma-communities-lock-horns-after-usd7m-ukraine-bet-resolves)
- [The Block — Polymarket says "governance attack" by UMA whale to hijack a bet's resolution is "unprecedented"](https://www.theblock.co/post/348171/polymarket-says-governance-attack-by-uma-whale-to-hijack-a-bets-resolution-is-unprecedented)
- [CoinMarketCap Academy — Polymarket Faces Backlash As $7M Ukraine Mineral Deal Bet Resolves Incorrectly](https://coinmarketcap.com/academy/article/polymarket-faces-backlash-as-dollar7m-ukraine-mineral-deal-bet-resolves-incorrectly-raising-manipulation-concerns)
- [Webopedia — Why UMA is controversial: Polymarket's UMA Oracle Controversy](https://www.webopedia.com/crypto/learn/polymarkets-uma-oracle-controversy/)
- [Orochi Network — Oracle Manipulation in Polymarket 2025](https://orochi.network/blog/oracle-manipulation-in-polymarket-2025)
- [UMA documentation — What is a prediction market dispute](https://blog.uma.xyz/articles/what-is-a-prediction-market-dispute)
