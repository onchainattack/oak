# Aave wstETH Oracle Misconfiguration Liquidation Cascade — Mar 2026 — $27.78M

**Loss:** approximately $27.78M in healthy-position liquidations. An Aave oracle configuration error caused the reported price of wstETH (wrapped stETH) to diverge from its actual market price, triggering liquidations of wstETH-collateralised borrowing positions that were adequately collateralised at the true market price. The liquidated positions were "healthy" — their collateral-to-debt ratios were above the liquidation threshold under the correct market price — but the misconfigured oracle reported a lower price, pushing them below the threshold and allowing liquidators to acquire the wstETH collateral at a discount. The liquidated value was ~\$27.78M (10,938 wstETH across 34 accounts), but that is gross liquidation volume, not net loss: Chaos Labs and the Aave DAO reimbursed affected users, liquidators kept roughly 499–512 ETH in bonuses/arbitrage, recoveries of ~155 ETH (141.6 ETH from Titan Builder plus fees) offset part of it, and the net cost to the DAO was reported at ~345–358 ETH. No bad debt was created.

**OAK Techniques observed:** **OAK-T14.003** (Restaking Cascading Risk — structurally adjacent at the lending-market cascade layer. The incident is not a restaking or LRT depeg per se but exercises the same lending-market cascade mechanism that T14.003 characterises: an oracle-reporting error triggers liquidations that propagate through collateral positions, creating a cascade of forced selling.) **OAK-T17.001** (Cross-Venue Arbitrage Price Distortion — structurally adjacent at the price-discovery layer. The oracle misconfiguration created a price dislocation between Aave's lending market (where wstETH was valued at the oracle-reported price) and external DEX markets (where wstETH traded at the true market price). Liquidators arbitraged this dislocation, acquiring wstETH at the oracle-discounted price via liquidations and selling it at the true market price on DEXes.)

**Attribution:** **unattributed** — the oracle misconfiguration was a parameter-setting error, not a malicious attack. The liquidators who profited from the liquidations were acting rationally within Aave's protocol rules — they did not cause the oracle error but exploited the resulting price dislocation. No single entity was the "attacker"; the liquidators were MEV searchers and arbitrage bots (one builder, Titan, was among the parties from which ETH was later recovered).

**Key teaching point:** **The Aave wstETH liquidation event is the canonical "oracle-misconfiguration cascade" anchor: a protocol-level parameter-setting error — not an attacker manipulating an oracle, not a market-wide depeg, but a misconfigured oracle feed — triggered material liquidations of healthy positions.** The incident demonstrates that oracle risk in lending markets is not limited to price-manipulation attacks (T9.001) or market-wide depegs (T14.003); a simple parameter-setting error in the oracle's configuration — here a CAPO snapshot ratio/timestamp mismatch under a rate limiter — can produce the same liquidation-cascade outcome without any adversary. The structural lesson is that **oracle configuration is a governance-risk surface: a governance vote or a multisig parameter update that sets an oracle feed incorrectly can impose losses on all users of the lending market, and, in this case, the losses were made whole by the risk provider's recoveries and the DAO treasury rather than falling on position holders.**

**Corrected 2026-10-11:** cause restated as a CAPO snapshot ratio/timestamp mismatch under a 3%-per-3-days rate limiter (executed by an automated agent from a Chaos Labs update), figures set to 10,938 wstETH / 34 accounts, and the "loss borne by position holders" claim replaced with Chaos Labs/Aave DAO reimbursement and ~499–512 ETH liquidator take; the unsupported second-wave cascade was removed.

## Summary

Aave is the largest DeFi lending protocol on Ethereum, with billions of dollars in collateral deposits across multiple asset markets. Each collateral asset in Aave has an associated oracle feed that reports the asset's market price; the oracle price determines the maximum borrow amount for collateralised positions and triggers liquidations when a position's health factor falls below 1.0 (collateral value < borrow value × liquidation threshold).

On March 10, 2026 (~11:46 UTC), Chaos Labs' Edge Risk engine submitted a `snapshotRatio` update for Aave's wstETH CAPO (correlated-asset price oracle) adapter, and an automated agent executed it one block later with no manual review (rekt). The ratio was set to ~1.2282, but the contract's rate limiter (a 3% cap per 3 days) only allowed ~1.1919; the snapshot timestamp was not limited the same way, so the two parameters fell out of sync. The resulting ceiling (~1.1939) sat below the market exchange rate (~1.2285), so Aave priced wstETH about 2.85% too low, and E-Mode leverage turned that small gap into liquidations. Chaos Labs described it as a mismatch in stored parameters (an outdated exchange-rate reference and timestamp).

The misconfigured oracle caused a cascade of liquidations:

1. **Oracle reports incorrect price.** The wstETH oracle feed reports a price below the true market price. The oracle understated wstETH by ~2.85%, which was enough to push high-leverage E-Mode positions under 1.0.

2. **Positions fall below liquidation threshold.** Thin-margin E-Mode positions that were healthy at the true market price became liquidatable at the oracle-reported price.

3. **Liquidators acquire discounted collateral.** Liquidators repaid debt and received the borrowers' wstETH collateral at the liquidation bonus on top of the understated oracle price. Rekt puts liquidator take at ~512 ETH (~116 ETH bonuses, ~13 ETH fees, ~382 ETH arbitrage selling at market); other outlets say ~499 ETH.

4. **No second-wave cascade is established.** Earlier versions of this file described DEX sell pressure triggering a second wave; the sources seen do not document that. The liquidations are attributed to the single oracle understatement.

5. **Containment and reimbursement.** Chaos Labs cut the wstETH borrow cap and realigned the snapshot parameters the same day, and said affected users would be fully reimbursed. TokenLogic's 2026-03-11 proposal set the refund at 512.19 ETH from the Aave DAO treasury, with recoveries (141.6 ETH from Titan Builder, 13.3 ETH of fees) offsetting part; net cost to the DAO was reported at ~357.56 ETH (Chaos Labs cited 345 ETH). A governance challenge asking the service provider to repay the treasury was pending.

Total liquidation volume was approximately \$27.78M (10,938 wstETH, 34 accounts). Unlike a typical market-driven liquidation cascade (where positions become undercollateralised because the collateral asset's true market price falls), these positions would have remained healthy at the true market price — they were liquidated because the oracle misreported the price, not because the price actually fell below the liquidation threshold.

The incident is structurally distinct from Aave's July 2025 stETH cascade (`2025-07-lido-steth-aave-cascade.md`), which was triggered by a genuine market event (stETH withdrawal-queue depth saturation causing a secondary-market discount). The March 2026 event was triggered by an oracle parameter error — a governance/operations failure rather than a market event.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2026-03-10 ~11:46 | Chaos Labs' risk engine submits a wstETH CAPO `snapshotRatio` update; an automated agent executes it one block later; the 3%-per-3-days rate limiter leaves ratio and timestamp out of sync | T14.003 (oracle-configuration surface) |
| 2026-03-10 | Oracle prices wstETH ~2.85% low; 10,938 wstETH (~\$27.78M) liquidated across 34 accounts | T14.003 + T17.001 |
| 2026-03-10 | Liquidators capture ~499–512 ETH of bonuses/arbitrage; Chaos Labs cuts the wstETH borrow cap and realigns parameters; official post-mortem the same day | T17.001 (cross-venue price dislocation) |
| 2026-03-11 | TokenLogic files a 512.19 ETH reimbursement proposal paid by the Aave DAO treasury; Chaos Labs says users will be fully reimbursed | (remediation) |

## Public references

- Comparison with July 2025 Lido stETH/Aave cascade (market-driven) vs. March 2026 wstETH/Aave cascade (oracle-configuration-driven)
- See `techniques/T14.003-restaking-cascading-risk.md` and `techniques/T17.001-cross-venue-arbitrage-price-distortion.md` for Technique definitions
- `[cryptobriefingaave2026]` — Crypto Briefing, "Aave users lose \$26M after wstETH oracle misconfiguration triggers liquidations" (2026-03-10): <https://cryptobriefing.com/aave-wsteth-oracle-misconfiguration/>
- `[cryptonewsaave2026]` — CryptoNews, "Aave Oracle Glitch Causes \$27M Liquidations" (2026-03): <https://cryptonews.com/news/aave-oracle-glitch-wsteth-liquidations-capo/>
- `[rektaave2026]` — rekt, "Aave" (2026-03): <https://rekt.news/aave-rekt> (snapshotRatio/timestamp mismatch under 3%-per-3-days cap, 10,938 wstETH, 34 accounts, ~512 ETH liquidator take, 512.19 ETH reimbursement proposal)
- `[parameteraave2026]` — Parameter, "Aave Oracle Malfunction Triggers \$27M in Wrongful Crypto Liquidations" (2026-03): <https://parameter.io/aave-oracle-malfunction-triggers-27m-in-wrongful-crypto-liquidations/>
- `[coincentralaave2026]` — CoinCentral, "Aave Oracle Glitch Causes \$27 Million in Crypto Liquidations" (2026-03): <https://coincentral.com/aave-oracle-glitch-causes-27-million-in-crypto-liquidations/> (~499 ETH liquidator profit; full reimbursement)

## Discussion

The Aave wstETH oracle-misconfiguration liquidation event anchors the **oracle-configuration-risk sub-class** of T14.003 and T17.001: the lending market's liquidation cascade was triggered not by a market event (genuine depeg), not by an attacker (oracle manipulation), but by a governance/operations error (incorrect oracle parameter). The three triggers — market event, attacker manipulation, governance error — produce the same liquidation-cascade outcome but have different defender mitigation surfaces:

- **Market-event-driven cascade** (July 2025 stETH) → mitigated by conservative LTV parameters, liquidation-threshold buffers, and withdrawal-queue-depth monitoring.
- **Attacker-manipulation-driven cascade** (T9.001 oracle manipulation) → mitigated by oracle-manipulation resistance (TWAP feeds, multi-source aggregation, manipulation-detection circuits).
- **Governance-error-driven cascade** (March 2026 wstETH) → mitigated by oracle-configuration governance safeguards: timelocks on oracle parameter changes, automated sanity checks on oracle-reported prices (deviation from external market price exceeds threshold → reject the oracle update), and circuit-breakers that pause liquidations when the oracle price deviates from an independent reference price by more than a configurable threshold.

The configuration-error surface is the most insidious of the three because it bypasses both market-based defenses (the positions were healthy at the true market price) and attacker-based defenses (there was no attacker to detect or block). The "attacker" was the oracle configuration itself, and the liquidators were rational arbitrageurs who had no way to distinguish a governance-error price dislocation from a genuine market price decline — they saw liquidatable positions and liquidated them, as the protocol's incentive structure rewards them to do.

The defender lesson for lending-market governance: every oracle parameter change should pass through a timelock with automated sanity checks — compare the new oracle price against an independent reference price (e.g., a Chainlink feed, a TWAP from a deep DEX pool) and reject the update if the deviation exceeds a threshold. The sanity check is a governance-circuit-breaker that prevents a single parameter-setting error from cascading into systemic liquidations.

The incident also demonstrates that "healthy-position liquidation" is a distinct loss category from "undercollateralised-position liquidation." In a market-driven cascade, positions become undercollateralised first (the collateral asset's price genuinely falls), and then they are liquidated — the liquidation is the protocol working as designed. In a governance-error cascade, positions are healthy but liquidated anyway because the oracle misreports their health — the liquidation is the protocol malfunctioning. The distinction matters for recourse: treasury-funded reimbursement is plausible for protocol malfunctions but not for market-driven liquidations; here the DAO treasury did fund the refund. The March 2026 wstETH event falls on the protocol-malfunction side of the line.
