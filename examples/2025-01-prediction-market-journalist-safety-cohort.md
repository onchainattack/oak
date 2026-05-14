# Prediction-market journalist safety / resolution-source intimidation cohort — global — 2025–2026

**Loss:** no direct financial extraction from individual journalists; the loss surface is the chilling effect on journalist participation as resolution inputs for subjective-oracle prediction markets. Journalists and publications whose reporting serves as resolution inputs for high-volume Polymarket markets report escalating harassment, doxxing threats, and intimidation from bettors with positions in the disfavoured resolution outcome.
**OAK Techniques observed:** **OAK-T9.006.003** (Off-chain Resolution-Source Coercion) — primary; the cohort documents the broader pattern of bettor-to-source pressure on off-chain human reporters whose published accounts determine subjective-oracle resolution outcomes. The pattern spans from lower-intensity harassment and doxxing threats (higher-frequency) to the explicit extortion documented in the Fabian / Iran-strike case (lower-frequency, higher-severity). **OAK-T9.006** (Subjective-Oracle Resolution Manipulation) — parent Technique.
**Attribution:** **inferred-strong** at the cohort-behaviour level. Individual threat actors are pseudonymous (social-media accounts, anonymous DMs); the pattern is attributable as a structural behaviour of bettor cohorts on high-volume subjective-resolution markets, not to a single operator cluster.
**Key teaching point:** **The journalist-safety cohort establishes that T9.006.003 (off-chain resolution-source coercion) is a spectrum — from lower-intensity social-media harassment (higher-frequency) to explicit extortion (Fabian-class, lower-frequency), all driven by the same structural property: when a prediction market's resolution depends on a human reporter's published account, the human reporter becomes an attack surface.** The defensive surface (source-multiplicity in resolution specifications, journalist-side awareness of the economic stakes in their reporting) is operationally real but is outside the technical-mitigation domain.

## Summary

Following the canonical T9.006.003 anchor — the Fabian / Iran-strike journalist coercion case of March 2026, where bettors with ~\$900K in YES-side positions issued explicit extortion threats against Times of Israel correspondent Emanuel Fabian — a broader pattern of bettor-to-reporter pressure was documented across the prediction-market ecosystem through 2025–2026.

The journalist-safety cohort spans a spectrum of intensity:

1. **Social-media harassment (high-frequency, lower-intensity):** Journalists whose reporting was cited in Polymarket resolution specs reported waves of hostile replies, quote-tweets, and DMs from Polymarket bettors during resolution windows. The harassment was not individually threatening but collectively intimidating — hundreds of messages demanding the journalist retract, clarify, or amend their reporting to favour a specific resolution outcome.

2. **Doxxing threats (medium-frequency, medium-intensity):** Several journalists reported that bettors had published or threatened to publish personal information (home addresses, family-member names, phone numbers) in response to reporting that was expected to determine a market's resolution. The threats were typically made from anonymous social-media accounts and were difficult to attribute to specific individuals.

3. **Explicit extortion threats (low-frequency, highest-intensity — Fabian class):** The Fabian / Iran-strike case (March 2026) is the canonical extreme of the spectrum: bettors directly threatened the journalist to rewrite their report to produce a YES resolution. Fabian preserved evidence, published a first-person account, and did not change his reporting. The market resolved against the threatening bettors' position.

The cohort's structural driver is the same across all intensity levels: a prediction market whose resolution depends on a single human reporter's published account creates an economic bounty for a specific reporting outcome. Bettors with positions in the disfavoured outcome translate that economic bounty into pressure on the reporter. The mechanism is not crypto-specific — extortion of journalists has a long history — but the prediction market's economic structure creates the incentive gradient that drives the behaviour.

The defensive surface is partly at the market-design layer (source-multiplicity in resolution specifications) and partly at the journalist-side awareness layer (reporters whose work is cited in prediction-market resolution specs should be informed that their reporting has economic stakes). The mitigation is not primarily technical — it requires market-design conventions, platform-level bettor-behaviour monitoring, and journalist-side threat-modelling that incorporates the prediction-market dimension.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2025–2026 | As Polymarket volume grows, more journalists and publications become de-facto resolution inputs for high-volume subjective-resolution markets | (surface expansion) |
| 2025–2026 | Journalists report escalating social-media harassment from Polymarket bettors during resolution windows; pattern documented across multiple markets and reporters | **T9.006.003** (lower-intensity cohort pattern) |
| 2025–2026 | Doxxing threats against journalists whose reporting determines resolution outcomes reported; pattern concentrated in markets with narrow reporting cohorts | **T9.006.003** (medium-intensity) |
| 2026-03 | Fabian / Iran-strike case: explicit extortion threats against Times of Israel correspondent demanding report rewrite to produce YES resolution; ~\$900K in bettor positions | **T9.006.003** (canonical high-intensity anchor) |
| 2026 | Washington Post, Haaretz, and other major publications cover the Fabian case; broader journalist-safety concerns in the prediction-market context enter public discourse | (public-record establishment) |
| Continuing | The journalist-safety surface grows with every subjective-oracle market whose resolution depends on a narrow human-reporter cohort; no systematic platform-level bettor-behaviour monitoring for T9.006.003 patterns exists at v0.1 | T9.006.003 (ongoing structural surface) |

## Realised extraction

No direct financial extraction from journalists. The loss surface is the chilling effect on journalist participation as resolution inputs — journalists who decline to report on matters that are the subject of prediction markets for fear of harassment or extortion, degrading the information quality of the resolution-input layer.

## Public references

- Cross-reference: T9.006.003 at `techniques/T9.006.003-off-chain-resolution-source-coercion.md`.
- Cross-reference: 2026-03-polymarket-iran-strike-journalist-coercion at `examples/2026-03-polymarket-iran-strike-journalist-coercion.md` (canonical T9.006.003 anchor, Fabian/Iran-strike case).
- Cross-reference: 2025-2026-prediction-market-source-harassment-cohort at `examples/2025-2026-prediction-market-source-harassment-cohort.md` (broader source-harassment cohort).

## Public References

See citations in corresponding technique file.
