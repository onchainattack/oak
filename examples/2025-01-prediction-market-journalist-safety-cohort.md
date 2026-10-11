# Prediction-market journalist safety / resolution-source intimidation cohort — global — 2026

**Loss:** no direct financial extraction from individual journalists; the loss surface is the chilling effect on journalist participation as resolution inputs for subjective-oracle prediction markets. The one confirmed case is the March 2026 Fabian / Iran-strike case, in which a Times of Israel correspondent reported death threats from Polymarket bettors. A wider cohort of harassment against other reporters in 2025–2026 is plausible but is not documented by any source in this file.
**OAK Techniques observed:** **OAK-T9.006.003** (Off-chain Resolution-Source Coercion) — primary; the cohort documents the broader pattern of bettor-to-source pressure on off-chain human reporters whose published accounts determine subjective-oracle resolution outcomes. Only the explicit-threat end of the spectrum, the Fabian / Iran-strike case, is documented; lower-intensity harassment and doxxing are hypothesised extensions with no cited source. **OAK-T9.006** (Subjective-Oracle Resolution Manipulation) — parent Technique.
**Attribution:** **inferred-strong** at the cohort-behaviour level (kept as filed). Individual threat actors in the Fabian case were anonymous or pseudonymous messengers; the wider cohort is not independently documented.
**Key teaching point:** **The journalist-safety cohort establishes that T9.006.003 (off-chain resolution-source coercion) is a real pattern, evidenced by the Fabian case; a wider spectrum of harassment is plausible but undocumented here, and the driver is the same structural property: when a prediction market's resolution depends on a human reporter's published account, the human reporter becomes an attack surface.** The defensive surface (source-multiplicity in resolution specifications, journalist-side awareness of the economic stakes in their reporting) is operationally real but is outside the technical-mitigation domain.

**Corrected 2026-10-11:** Narrowed to the one confirmed case (Fabian / Iran-strike, 2026-03); the 2025 harassment/doxxing cohort and the resolution-outcome claim are marked unverified, and a truncated reference URL was replaced with seen sources.

## Summary

Following the canonical T9.006.003 anchor — the Fabian / Iran-strike journalist coercion case of March 2026, where Polymarket bettors (a ~\$900K position is reported by the case's anchor source; other outlets cite a \$14M+ market) sent death threats to Times of Israel correspondent Emanuel Fabian — a broader pattern of bettor-to-reporter pressure is plausible, but no source documents it; the sections below that describe it are hypothesised and unverified.

The cohort is described as a spectrum of intensity; only item 3 is sourced:

1. **Social-media harassment (high-frequency, lower-intensity) — unverified:** Journalists whose reporting was cited in Polymarket resolution specs reported waves of hostile replies, quote-tweets, and DMs from Polymarket bettors during resolution windows. The harassment was not individually threatening but collectively intimidating — hundreds of messages demanding the journalist retract, clarify, or amend their reporting to favour a specific resolution outcome.

2. **Doxxing threats (medium-frequency, medium-intensity) — unverified:** Several journalists reported that bettors had published or threatened to publish personal information (home addresses, family-member names, phone numbers) in response to reporting that was expected to determine a market's resolution. The threats were typically made from anonymous social-media accounts and were difficult to attribute to specific individuals.

3. **Explicit extortion threats (low-frequency, highest-intensity — Fabian class):** The Fabian / Iran-strike case (March 2026) is the canonical extreme of the spectrum: bettors sent dozens of messages and threats demanding that he rewrite his report to say the missile was intercepted, which would have favoured their positions. Fabian published a first-person account and did not change his reporting. Reports differ on how the market was settled (the Block-era coverage says Polymarket settled it as Yes, which bettors disputed), so this file makes no claim about the resolution outcome.

The cohort's structural driver is the same across all intensity levels: a prediction market whose resolution depends on a single human reporter's published account creates an economic bounty for a specific reporting outcome. Bettors with positions in the disfavoured outcome translate that economic bounty into pressure on the reporter. The mechanism is not crypto-specific — extortion of journalists has a long history — but the prediction market's economic structure creates the incentive gradient that drives the behaviour.

The defensive surface is partly at the market-design layer (source-multiplicity in resolution specifications) and partly at the journalist-side awareness layer (reporters whose work is cited in prediction-market resolution specs should be informed that their reporting has economic stakes). The mitigation is not primarily technical — it requires market-design conventions, platform-level bettor-behaviour monitoring, and journalist-side threat-modelling that incorporates the prediction-market dimension.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2025–2026 | Hypothesised: as Polymarket volume grows, more journalists become de-facto resolution inputs | (surface expansion) |
| 2025–2026 | Hypothesised (unsourced): wider social-media harassment of reporters cited in resolution specs | **T9.006.003** (lower-intensity cohort pattern) |
| 2025–2026 | Hypothesised (unsourced): doxxing threats against other reporters | **T9.006.003** (medium-intensity) |
| 2026-03 | Fabian / Iran-strike case: death threats against Times of Israel correspondent demanding a rewrite of his 2026-03-10 report; ~\$900K threat figure per anchor source | **T9.006.003** (canonical high-intensity anchor) |
| 2026-03 | The Block, Cointelegraph, Asia Times and Bloomberg Law cover the Fabian case | (public-record establishment) |
| Continuing | The journalist-safety surface grows with every subjective-oracle market whose resolution depends on a narrow human-reporter cohort; no systematic platform-level bettor-behaviour monitoring for T9.006.003 patterns exists at v0.1 | T9.006.003 (ongoing structural surface) |

## Realised extraction

No direct financial extraction from journalists. The loss surface is the chilling effect on journalist participation as resolution inputs — journalists who decline to report on matters that are the subject of prediction markets for fear of harassment or extortion, degrading the information quality of the resolution-input layer.

## Public references

- `[blockfabian2026]` — The Block, "Polymarket bettors send death threats to reporter over missile report tied to \$14 million prediction market pool" (2026-03): <https://www.theblock.co/post/393790/polymarket-bettors-death-threats-reporter-missile-report-prediction-market>
- `[cointelegraphfabian2026]` — Cointelegraph, "Polymarket users threaten journalist, change Iran missile report" (2026-03): <https://cointelegraph.com/news/polymarket-users-threaten-journalist-change-iran-missile-report>
- `[asiatimesfabian2026]` — Asia Times, "Polymarket death threat raises stakes of reporting Iran war" (2026-03): <https://asiatimes.com/2026/03/polymarket-death-threat-raises-stakes-of-reporting-iran-war/>
- `[bgovfabian2026]` — Bloomberg Law, "Missile Dispute, Reporter Threats Expose Prediction Market Risk" (2026-03): <https://news.bgov.com/crypto/missile-dispute-reporter-threats-expose-prediction-market-risk>
- Times of Israel original (Emanuel Fabian, 2026-03-16) was seen only via a Slashdot summary: <https://tech.slashdot.org/story/26/03/16/210211/>

## Public References

See citations in corresponding technique file.
