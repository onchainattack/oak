# EigenLayer Restaking Deposit Caps and LRT NAV Dilution — Ethereum L1 — 2024–2025

**Loss:** structural / NAV-dilution — EigenLayer's deposit-cap regime (imposed at protocol launch and adjusted periodically through 2024–2025) created LRT supply/demand imbalances that caused LRT secondary-market prices to diverge from their restaked-ETH backing. When EigenLayer raised deposit caps or opened new restaking windows, LRT protocols raced to fill allocations before competitors, onboarding restaked ETH that diluted existing LRT holders' pro-rata claim on the underlying restaking yield. When deposit caps were binding, LRTs with allocation traded at a premium to NAV (reflecting the option value of future restaking-yield access); when caps lifted, the premium collapsed as supply expanded. The structural loss to LRT holders was the premium-to-NAV paid during cap-binding periods that was not recoverable when caps lifted and the premium compressed.

**OAK Techniques observed:** **OAK-T14.004** (Liquid Restaking Token Pricing Manipulation — the deposit-cap regime creates a structural mechanism for LRT NAV-to-DEX-price divergence: the cap constrains supply expansion, creating a scarcity premium that collapses when the cap lifts. The divergence is driven by protocol-level supply mechanics rather than by an active attacker, but the pricing surface — a DEX price that diverges from NAV due to a mechanism external to the LRT's own valuation — is structurally T14.004.) **OAK-T14.003** (Restaking Cascading Risk — LRTs that held allocation during cap-binding periods were subject to NAV dilution when caps lifted; the dilution event propagated through LRT/ETH pools and lending-market LRT-collateral valuations, structurally a T14.003 cascade through the restaking supply mechanics rather than through a slashing event.)

**Attribution:** **protocol-design** — EigenLayer protocol governance and LRT protocol deposit strategies. No adversary; the deposit-cap regime was a deliberate protocol-design choice to manage restaking growth and limit single-operator dominance risk. The NAV-dilution effect was an emergent property of the cap regime interacting with competitive LRT deposit dynamics.

**Key teaching point:** **Protocol-level supply controls — deposit caps, allocation limits, withdrawal queues — are first-class T14.004 primitives that induce LRT NAV-to-DEX-price divergence through supply/demand mechanics rather than through an active attacker.** The EigenLayer deposit-cap regime demonstrates that LRT pricing fragility is not limited to AVS-yield manipulation or slashing-event arbitrage; the cap-raise cycle itself creates a predictable pattern of premium accumulation during cap-binding periods followed by premium compression when caps lift. The structural lesson for T14.004 is that **any protocol-level supply control that constrains LRT minting or redemption creates a pricing surface: the constraint makes the LRT's DEX price a function of supply-access scarcity in addition to NAV fundamentals, and the scarcity premium is a T14.004 arbitrage surface when the cap-change schedule is known or predictable.**

## Summary

EigenLayer launched its restaking protocol with a phased deposit-cap regime designed to manage restaking growth, limit the concentration of restaked ETH under any single operator or AVS, and prevent the restaking market from absorbing too large a fraction of staked ETH before the protocol's risk parameters were battle-tested. The cap regime operated as follows:

1. **Global deposit caps.** EigenLayer imposed an aggregate cap on total restaked ETH across all operators and AVS. The cap was raised periodically (typically from one EigenLayer governance announcement to the next) as the protocol's risk assessment allowed.

2. **Per-LRT allocation.** LRT protocols (Renzo, Ether.fi, Kelp, Puffer) competed for allocation within the global cap. When the cap was binding, LRT protocols that had secured allocation could continue accepting deposits and minting LRTs; those without allocation could not.

3. **Cap-raise events.** When EigenLayer governance raised the global cap, all LRT protocols could resume deposit acceptance up to the new cap. The cap-raise events were announced in advance (typically days to weeks), creating a predictable timeline for supply expansion.

The cap regime created a structural pricing dynamic for LRTs:

- **During cap-binding periods:** LRTs with allocation traded at a premium to NAV on secondary markets. The premium reflected the "access value" of the LRT — a holder who wanted exposure to restaking yield but could not mint a new LRT (because the protocol's deposit cap was full) had to buy the LRT on the secondary market, bidding up the price above NAV.

- **At cap-raise events:** When EigenLayer announced a cap increase, the premium began to compress as the market anticipated new LRT supply. When the cap actually increased, LRT protocols could mint new LRTs against fresh restaked ETH deposits, expanding supply and compressing the premium toward NAV.

- **Post-cap-raise:** Existing LRT holders experienced NAV dilution — their pro-rata share of the LRT's underlying restaking yield decreased as new deposits joined the pool, while the premium they had paid for access (if they bought on the secondary market during the cap-binding period) was not recoverable.

The cap-raise cycle created a predictable arbitrage pattern:

1. Buy LRT at NAV (or below) during non-cap-binding periods when supply is ample.
2. Hold through the cap-binding period as the LRT accumulates a premium.
3. Sell LRT at NAV+premium before the announced cap-raise date.
4. After the cap raises and supply expands, the premium compresses; re-buy at the lower premium or at NAV.

This pattern is structurally T14.004: the LRT's DEX price diverges from NAV due to a protocol-level mechanism (the deposit cap), and the divergence is predictable (cap-raise schedule), creating an arbitrage window. The arbitrageur is not "attacking" the LRT — they are rationally trading on the cap-raise cycle — but the pricing surface is the same T14.004 surface that a malicious actor would exploit with AVS-event foreknowledge.

The deposit-cap regime was a temporary phase in EigenLayer's lifecycle (the protocol moved toward permissionless deposits in 2025), but the structural lesson applies to any restaking or staking protocol that imposes supply-side constraints: a cap, a rate-limit, or an allocation quota creates a scarcity premium and a predictable premium-compression event, both of which are T14.004 pricing surfaces.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-04 | EigenLayer restaking deposits open with initial global cap; LRT protocols launch and begin accepting deposits under allocation | T14.004 (cap regime begins) |
| 2024-04 to 2024-07 | Deposit caps binding; LRTs with allocation trade at premium to NAV; Renzo ezETH, Ether.fi weETH, Kelp rsETH see 5–15% premiums during peak cap-binding periods | T14.004 (premium accumulation) |
| 2024-05 to 2024-07 | Major LRT depegs (ezETH, weETH, rsETH, pufETH) occur during cap-binding periods; the depegs are triggered by governance announcements and airdrop-expectation shifts but are amplified by the cap-constrained supply environment | T14.003 + T14.004 |
| 2024-06 to 2024-12 | EigenLayer raises deposit caps in phases; each cap-raise event compresses LRT premiums toward NAV; existing LRT holders experience NAV dilution from new deposits | T14.004 (premium compression) |
| 2025 | EigenLayer moves toward permissionless deposits; the deposit-cap regime phases out; LRT premiums increasingly reflect AVS-yield expectations rather than supply-access scarcity | T14.004 (regime transition) |
| Continuing | The structural lesson — any protocol-level supply control is a T14.004 pricing surface — persists for any future restaking or staking protocol with capped or rate-limited deposits | T14.004 (structurally open) |

## Public references

- EigenLayer protocol documentation: deposit-cap parameters, cap-raise governance, and allocation mechanics
- LRT protocol (Renzo, Ether.fi, Kelp, Puffer) deposit-flow and NAV documentation
- DEX pool analytics showing LRT/ETH premium compression at cap-raise events (Uniswap V3, Curve)
- LRT issuer NAV methodology documentation: premium-to-NAV calculations during cap-binding and cap-raised periods
- See `techniques/T14.004-liquid-restaking-token-pricing-manipulation.md` and `techniques/T14.003-restaking-cascading-risk.md` for Technique definitions

## Discussion

The EigenLayer deposit-cap regime anchors the **protocol-supply-control sub-class** of T14.004: the LRT's DEX price diverges from NAV not because an attacker manipulated the price but because a protocol-level supply constraint created a scarcity premium, and the scarcity premium compressed when the constraint lifted. The mechanism is structurally different from the other T14.004 sub-classes:

- **AVS-yield manipulation** (active attacker influences yield to move LRT NAV) — attacker-driven
- **Slashing-event arbitrage** (attacker trades on foreknowledge of a slashing event) — attacker-driven
- **Withdrawal-queue gaming** (attacker exploits the withdrawal-queue escrow period) — attacker-driven
- **DEX-pool manipulation** (attacker manipulates the LRT/ETH pool directly) — attacker-driven
- **Protocol-supply-control pricing** (deposit caps create scarcity premiums that compress predictably) — **protocol-design-driven**, structurally T14.004 but without an active adversary

The deposit-cap-driven premium is the T14.004 surface in its "passive" form — the analogue of the cloud-provider-outage liveness-fault surface in T14.006 (passive griefing edge case). The surface exists whether or not an active adversary exploits it; the adversary's role is to amplify the surface (e.g., by accumulating LRTs during cap-binding periods and dumping at cap-raise events with foreknowledge of the raise timing), not to create it.

The defender lesson is that LRT pricing risk assessment should include protocol-level supply-control calendars as a first-class input. A lending market that accepts an LRT as collateral during a cap-binding period — when the LRT trades at a premium to NAV — is accepting collateral whose market price includes a scarcity premium that will predictably compress at the next cap-raise. If the lending market's oracle reports the DEX price (including the premium) rather than the NAV (excluding it), the LTV is effectively inflated by the premium, and the collateral's liquidation threshold is tighter than the NAV-based LTV would suggest. The mitigation is to use NAV-based or TWAP-based oracles for LRT collateral rather than spot DEX prices, and to apply an additional LTV haircut during cap-binding periods to account for the predictable premium compression.

The EigenLayer protocol's transition to permissionless deposits (2025) eliminates this specific cap-driven T14.004 surface, but the structural lesson — any supply control is a pricing surface — generalises to any restaking protocol that imposes deposit caps, rate limits, or allocation quotas. Future restaking protocols (Symbiotic, Karak, and EigenLayer competitors) that adopt similar cap regimes will recreate the same T14.004 surface.
