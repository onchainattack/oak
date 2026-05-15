# Aave wstETH Oracle Misconfiguration Liquidation Cascade — Mar 2026 — $27.78M

**Loss:** approximately $27.78M in healthy-position liquidations. An Aave oracle configuration error caused the reported price of wstETH (wrapped stETH) to diverge from its actual market price, triggering liquidations of wstETH-collateralised borrowing positions that were adequately collateralised at the true market price. The liquidated positions were "healthy" — their collateral-to-debt ratios were above the liquidation threshold under the correct market price — but the misconfigured oracle reported a lower price, pushing them below the threshold and allowing liquidators to acquire the wstETH collateral at a discount. The loss was borne by the position holders, not by Aave's protocol reserves.

**OAK Techniques observed:** **OAK-T14.003** (Restaking Cascading Risk — structurally adjacent at the lending-market cascade layer. The incident is not a restaking or LRT depeg per se but exercises the same lending-market cascade mechanism that T14.003 characterises: an oracle-reporting error triggers liquidations that propagate through collateral positions, creating a cascade of forced selling.) **OAK-T17.001** (Cross-Venue Arbitrage Price Distortion — structurally adjacent at the price-discovery layer. The oracle misconfiguration created a price dislocation between Aave's lending market (where wstETH was valued at the oracle-reported price) and external DEX markets (where wstETH traded at the true market price). Liquidators arbitraged this dislocation, acquiring wstETH at the oracle-discounted price via liquidations and selling it at the true market price on DEXes.)

**Attribution:** **unattributed** — the oracle misconfiguration was a parameter-setting error, not a malicious attack. The liquidators who profited from the liquidations were acting rationally within Aave's protocol rules — they did not cause the oracle error but exploited the resulting price dislocation. No single entity was the "attacker"; the liquidators were a distributed set of MEV searchers and arbitrage bots.

**Key teaching point:** **The Aave wstETH liquidation event is the canonical "oracle-misconfiguration cascade" anchor: a protocol-level parameter-setting error — not an attacker manipulating an oracle, not a market-wide depeg, but a misconfigured oracle feed — triggered material liquidations of healthy positions.** The incident demonstrates that oracle risk in lending markets is not limited to price-manipulation attacks (T9.001) or market-wide depegs (T14.003); a simple parameter-setting error in the oracle's configuration — a wrong contract address, a stale price feed, an incorrect decimals conversion — can produce the same liquidation-cascade outcome without any adversary. The structural lesson is that **oracle configuration is a governance-risk surface: a governance vote or a multisig parameter update that sets an oracle feed incorrectly can impose losses on all users of the lending market, and the losses are not recoverable through protocol insurance (which typically covers smart-contract exploits, not governance-parameter errors).**

## Summary

Aave is the largest DeFi lending protocol on Ethereum, with billions of dollars in collateral deposits across multiple asset markets. Each collateral asset in Aave has an associated oracle feed that reports the asset's market price; the oracle price determines the maximum borrow amount for collateralised positions and triggers liquidations when a position's health factor falls below 1.0 (collateral value < borrow value × liquidation threshold).

On March 10, 2026, an Aave governance parameter update (or an automated oracle-configuration update, details dependent on Aave's governance process at the time) introduced a misconfiguration in the wstETH oracle feed. The misconfiguration caused the oracle to report a wstETH price that was lower than the true market price — the specific technical cause was not fully detailed in available public sources at the time of writing but is consistent with an incorrect price-feed address, an erroneous decimals conversion, or a stale-price fallback being triggered.

The misconfigured oracle caused a cascade of liquidations:

1. **Oracle reports incorrect price.** The wstETH oracle feed reports a price below the true market price. For example, if wstETH's true market price is $3,500 and the oracle reports $3,200, every wstETH-collateralised position's health factor is understated by ~9%.

2. **Positions fall below liquidation threshold.** Positions that were healthy at the true market price (e.g., collateral value $35,000, borrow value $25,000, health factor 1.12) become undercollateralised at the oracle-reported price (collateral value $32,000, borrow value $25,000, health factor 1.02 — and if below the liquidation threshold, liquidatable).

3. **Liquidators acquire discounted collateral.** Liquidators call Aave's liquidation function, repaying a portion of the borrower's debt and receiving the borrower's wstETH collateral at a discount (typically 5-10% below the oracle-reported price on Aave, which is already below the true market price).

4. **Cascade amplifies.** The first wave of liquidations adds wstETH sell pressure on DEX markets (as liquidators sell the acquired wstETH to realise their profit), pushing the true wstETH price down further. The declining true price interacts with the still-misconfigured oracle to push more positions below the liquidation threshold, triggering a second wave.

5. **Oracle correction.** Aave governance or the oracle operator corrects the misconfiguration. The oracle feed returns to reporting the accurate market price. By this point, the liquidations have already occurred, and the affected position holders have lost their collateral.

The total liquidation volume was approximately $27.78M in wstETH-collateralised positions. Unlike a typical market-driven liquidation cascade (where positions become undercollateralised because the collateral asset's true market price falls), these positions would have remained healthy at the true market price — they were liquidated because the oracle misreported the price, not because the price actually fell below the liquidation threshold.

The incident is structurally distinct from Aave's July 2025 stETH cascade (`2025-07-lido-steth-aave-cascade.md`), which was triggered by a genuine market event (stETH withdrawal-queue depth saturation causing a secondary-market discount). The March 2026 event was triggered by an oracle parameter error — a governance/operations failure rather than a market event.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2026-03-10 | Aave wstETH oracle misconfiguration introduced (via governance parameter update or automated oracle-configuration process) | T14.003 (oracle-configuration surface) |
| 2026-03-10 | Oracle reports wstETH price below true market price; healthy positions become liquidatable at oracle-reported price | T14.003 + T17.001 |
| 2026-03-10 | First wave of liquidations; liquidators acquire wstETH collateral at oracle-discounted price; sell on DEX markets for arbitrage profit | T17.001 (cross-venue price dislocation) |
| 2026-03-10 | wstETH sell pressure from liquidations pushes true market price down; interacts with misconfigured oracle to trigger second wave of liquidations | T14.003 (cascade amplification) |
| 2026-03-10 to 2026-03-11 | Oracle misconfiguration identified and corrected; liquidation cascade subsides | (incident response) |
| 2026-03-11 onward | Affected position holders seek recourse; Aave governance discusses whether protocol treasury should compensate governance-parameter-error losses | (remediation discussion) |

## Public references

- Aave governance forum: wstETH oracle misconfiguration incident report and post-mortem (March 2026)
- On-chain liquidation-transaction data: wstETH-collateralised position liquidations during the misconfiguration window
- DEX price data: wstETH/ETH and wstETH/USDC pool prices during the liquidation cascade
- Comparison with July 2025 Lido stETH/Aave cascade (market-driven) vs. March 2026 wstETH/Aave cascade (oracle-configuration-driven)
- See `techniques/T14.003-restaking-cascading-risk.md` and `techniques/T17.001-cross-venue-arbitrage-price-distortion.md` for Technique definitions

## Discussion

The Aave wstETH oracle-misconfiguration liquidation event anchors the **oracle-configuration-risk sub-class** of T14.003 and T17.001: the lending market's liquidation cascade was triggered not by a market event (genuine depeg), not by an attacker (oracle manipulation), but by a governance/operations error (incorrect oracle parameter). The three triggers — market event, attacker manipulation, governance error — produce the same liquidation-cascade outcome but have different defender mitigation surfaces:

- **Market-event-driven cascade** (July 2025 stETH) → mitigated by conservative LTV parameters, liquidation-threshold buffers, and withdrawal-queue-depth monitoring.
- **Attacker-manipulation-driven cascade** (T9.001 oracle manipulation) → mitigated by oracle-manipulation resistance (TWAP feeds, multi-source aggregation, manipulation-detection circuits).
- **Governance-error-driven cascade** (March 2026 wstETH) → mitigated by oracle-configuration governance safeguards: timelocks on oracle parameter changes, automated sanity checks on oracle-reported prices (deviation from external market price exceeds threshold → reject the oracle update), and circuit-breakers that pause liquidations when the oracle price deviates from an independent reference price by more than a configurable threshold.

The governance-error surface is the most insidious of the three because it bypasses both market-based defenses (the positions were healthy at the true market price) and attacker-based defenses (there was no attacker to detect or block). The "attacker" was the oracle configuration itself, and the liquidators were rational arbitrageurs who had no way to distinguish a governance-error price dislocation from a genuine market price decline — they saw liquidatable positions and liquidated them, as the protocol's incentive structure rewards them to do.

The defender lesson for lending-market governance: every oracle parameter change should pass through a timelock with automated sanity checks — compare the new oracle price against an independent reference price (e.g., a Chainlink feed, a TWAP from a deep DEX pool) and reject the update if the deviation exceeds a threshold. The sanity check is a governance-circuit-breaker that prevents a single parameter-setting error from cascading into systemic liquidations.

The incident also demonstrates that "healthy-position liquidation" is a distinct loss category from "undercollateralised-position liquidation." In a market-driven cascade, positions become undercollateralised first (the collateral asset's price genuinely falls), and then they are liquidated — the liquidation is the protocol working as designed. In a governance-error cascade, positions are healthy but liquidated anyway because the oracle misreports their health — the liquidation is the protocol malfunctioning. The distinction matters for recourse: protocol insurance (safety modules, treasury funds) typically covers protocol malfunctions but not market-driven liquidations. The March 2026 wstETH event falls on the protocol-malfunction side of the line.
