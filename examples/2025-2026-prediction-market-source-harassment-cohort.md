# Prediction-Market Resolution-Source Harassment Cohort — 2025–2026

**Loss:** The economic loss to bettors is the resolution outcome going against their positions when sources resist the pressure. The structural harm is to the resolution-source ecosystem — journalists and off-chain reporters increasingly declining to serve as resolution inputs for prediction markets.
**OAK Techniques observed:** **OAK-T9.006.003** (Off-Chain Resolution-Source Coercion — primary; bettors with positions in disfavoured outcomes translate their economic bounty into pressure on human resolution sources). **OAK-T9.006** (Subjective-Oracle Resolution Manipulation — parent technique; the prediction-market oracle layer creates the economic incentive that drives the coercion).
**Attribution:** **pseudonymous-to-unattributed** at the individual-actor level; bettor-to-source social-media harassment is typically conducted from anonymous or pseudonymous accounts. Attribution for T9.006.003 incidents is structurally hard (threats come from individual anonymous accounts with no single operator-cluster signature).
**Key teaching point:** **The Fabian / Iran-strike case (March 2026, ~$900,000 in threatened-bettor positions) is the first publicly documented case of explicit extortion against a named journalist as an attack vector against a prediction market's resolution layer. But the case sits within a broader pattern of bettor-to-source social-media pressure that includes harassment, doxxing threats, and coordinated social-media campaigns against journalists and publications whose reporting influences prediction-market outcomes. The cohort-level observation is that any prediction market whose resolution depends on a narrow cohort of human reporters creates an economic bounty for influencing those reporters — and the methods for exerting that influence range from social-media harassment (the lower-intensity, higher-frequency pattern) to explicit extortion (the Fabian-class pattern).**

## Summary

The Fabian / Iran-strike case (March 2026) — in which Polymarket bettors holding ~$900,000 in YES positions on an Iran-strike market issued threats against Times of Israel correspondent Emanuel Fabian demanding he rewrite his strike report — is the canonical T9.006.003 anchor because it is the first publicly documented case of explicit extortion against a named journalist in crypto-prediction-market history. But the case is the high-intensity anchor of a broader pattern that was observable before and after:

- **Pre-Fabian social-media harassment (2025–2026):** Polymarket bettors whose positions were threatened by a journalist's reporting engaged in social-media harassment — coordinated replies, quote-tweets, DMs accusing the journalist of market manipulation, demands that the journalist "clarify" or "correct" their reporting. These interactions fell short of explicit extortion but represented the same structural dynamic: the prediction market had created an economic bounty for a specific reporting outcome, and bettors attempted to influence the reporter through pressure.

- **The Fabian case (March 2026):** The threats escalated to explicit extortion — bettors demanded Fabian rewrite his report so the market would resolve in their favour. Fabian preserved evidence, published a first-person account in Times of Israel, and the market resolved against the threatening bettors' position. Washington Post and Haaretz provided independent corroboration.

- **Post-Fabian chilling effect (2026):** Journalists and publications whose reporting had been cited in Polymarket resolution specs began evaluating whether accepting that role exposed them to Fabian-class harassment. The broader structural effect is that human reporters may decline to serve as resolution inputs for prediction markets — a market-design constraint that pushes toward machine-checkable resolution criteria.

The T9.006.003 class is structurally generalisable: any prediction market whose resolution depends on a narrow cohort of human reporters creates an economic incentive for influencing those reporters. The methods span a spectrum from social-media pressure (high-frequency, low-intensity, difficult to classify as criminal) to explicit extortion (low-frequency, high-intensity, clearly criminal). The Fabian case anchors the explicit-extortion end of the spectrum; the broader harassment pattern fills in the lower-intensity band that is structurally the same class operating at lower amplitude.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024–2025 | Polymarket scales; journalists and publications cited in resolution specs begin receiving bettor-side social-media pressure around resolution windows | **T9.006.003 low-intensity pattern** |
| 2026-03 | Times of Israel correspondent Emanuel Fabian receives explicit extortion demands from Polymarket bettors holding ~$900,000 in YES positions on Iran-strike market; Fabian publishes first-person account; Washington Post and Haaretz corroborate | **T9.006.003 canonical anchor (explicit extortion)** |
| 2026-03 | Market resolves against threatening bettors' position; no public identification or prosecution of perpetrators at v0.1 | **T9.006.003 resolution** |
| 2026 | Journalist-side awareness of prediction-market-driven harassment risk increases; newsroom threat-model guidance begins incorporating prediction-market exposure | (ecosystem response) |

## Realised extraction

~$900,000 in threatened bettors' positions on the Iran-strike market went to $0 when the market resolved against their position (Fabian did not change his reporting). The structural extraction is the chilling effect on resolution-source participation rather than a direct on-chain loss.

## Public references

- Cross-reference: T9.006.003 (Off-Chain Resolution-Source Coercion) at `techniques/T9.006.003-off-chain-resolution-source-coercion.md`.
- [`examples/2026-03-polymarket-iran-strike-journalist-coercion.md`](../examples/2026-03-polymarket-iran-strike-journalist-coercion.md) — Iran-strike market / Fabian journalist coercion (canonical T9.006.003 anchor; March 2026).
- Times of Israel — Emanuel Fabian first-person account (March 2026).
- Washington Post — independent corroboration of Fabian coercion case (March 17, 2026).
- Haaretz — independent corroboration of Fabian coercion case (March 2026).
- Journalist threat-model guidance — prediction-market exposure as an emerging journalist-safety concern (2026).
