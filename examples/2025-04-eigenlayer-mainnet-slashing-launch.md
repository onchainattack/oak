# EigenLayer Mainnet Slashing Launch and AVS Slashing-Condition Activation — Ethereum L1 — 2025-04-17

**Loss:** structural / risk-activation — the EigenLayer protocol enabled mainnet slashing on 2025-04-17, transforming the restaking-slashing surface from a design-level theoretical risk to an operational risk. No slashing event occurred on the launch date; the "loss" is the activation of a standing economic surface: AVS-level slashing conditions can now impose stake-reduction penalties on restaked ETH, and those penalties propagate through LRT NAV calculations, lending-market collateral valuations, and secondary-market LRT prices. The aggregate restaked ETH at risk was approximately $15B+ across EigenLayer, Symbiotic, and Karak at the time of slashing enablement.

**OAK Techniques observed:** **OAK-T14.001** (Slashing-Condition Exploit — the slashing-enablement event makes operational all T14.001 sub-classes at the restaking layer: AVS-defined slashing conditions, operator-side correlated slashing, and cross-AVS slashing propagation). **OAK-T14.003** (Restaking Cascading Risk — slashing-enablement is the load-bearing prerequisite for the T14.003 slashing-cascade surface; a slashing event on one AVS can propagate through restaked ETH to affect other AVS and LRT NAV). **OAK-T14.004** (Liquid Restaking Token Pricing Manipulation — the slashing-event-arbitrage sub-primitive of T14.004 was theoretical until slashing went live; post-2025-04-17, an attacker with foreknowledge of an AVS slashing event can trade LRTs before the NAV oracle reflects the slash).

**Attribution:** **unattributed** — EigenLayer core development team and EigenDA AVS governance. No adversary; the event is a protocol milestone that activates the slashing surface for all AVS, operators, and LRT holders.

**Key teaching point:** **The EigenLayer mainnet slashing launch is the canonical event that transforms restaking-slashing risk from a design-review theoretical surface into an operational risk surface.** Before 2025-04-17, T14.001/T14.003/T14.004 at the restaking layer were "design-characterised but operationally untested" — slashing conditions were specified in AVS contracts but not enforceable. The launch activates every restaking-slashing sub-primitive: AVS-level slashing events affecting LRT NAV, slashing-event-arbitrage against stale LRT oracles, cross-AVS slashing propagation through shared operator sets, and operator-side correlated slashing across multiple AVS. The structural lesson is that **protocol milestones — not just attacks — can expand the attack surface**: the slashing-enablement event didn't cause a loss but made a class of losses materially possible for the first time, and defender readiness should track protocol-milestone calendars as closely as incident calendars.

## Summary

EigenLayer launched its mainnet restaking protocol in stages throughout 2024: restaking deposits opened in mid-2024, LRT protocols (Renzo, Ether.fi, Kelp, Puffer) launched their LRT products, AVS operators registered and began receiving delegations, and AVS protocols deployed their service contracts. Through all of 2024, however, AVS-level slashing was **not yet enabled on mainnet** — AVS contracts could define slashing conditions but could not execute them. The EigenLayer protocol operated under a "slashing-is-coming" covenant: operators, AVS, and LRT holders knew slashing would eventually be enabled but could not be slashed in the interim.

On 2025-04-17, EigenLayer enabled mainnet slashing. The enablement activated the protocol's Unique Stake Allocation mechanism and slashing execution logic, making AVS-defined slashing conditions enforceable against operator-restaked ETH for the first time. The launch included:

1. **Unique Stake Allocation.** Each AVS could allocate a portion of an operator's restaked ETH to its own slashing condition, ensuring that the same ETH was not slashed twice for different AVS faults — a design constraint that bounds the cross-AVS slashing-propagation surface.

2. **Slashing condition execution.** AVS contracts could now execute slashing penalties against operators that violated AVS-specific conditions (e.g., double-signing an AVS data-attestation, liveness-fault violations, data-withholding violations).

3. **Operator-set slashing exposure.** Operators registered across multiple AVS became simultaneously exposed to slashing conditions on all AVS they served — a single operator key-management error could trigger correlated slashing across multiple AVS.

The enablement had immediate implications for LRT pricing and risk assessment:

- **LRT NAV now included a non-zero slashing-risk discount.** LRT issuers adjusted their NAV calculation methodologies to incorporate a slashing-risk parameter that was previously zero. The magnitude of the discount varied by LRT's underlying AVS composition and operator-set diversity.

- **Slashing-event arbitrage became operationally possible.** The T14.004 sub-primitive in which an attacker trades on foreknowledge of an AVS slashing event before the LRT's NAV oracle reflects the slash became viable — previously, the attacker had only theoretical ground to trade on, because slashing was not yet executable.

- **Lending-market LRT collateral parameters required recalibration.** Lending protocols that accepted LRTs as collateral (Morpho, Gearbox, Aave) re-evaluated their LTV ceilings, oracle methodologies, and liquidation thresholds to account for the newly-operational slashing risk.

The launch did not cause a mass-slashing event (none occurred on the launch date), but it activated the structural surface that makes slashing events possible and consequential for LRT pricing. The first actual AVS slashing events are expected to follow as AVS protocols operationalise their slashing conditions and as operator errors or adversarial activity trigger slashable conditions.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-04 to 2024-07 | EigenLayer restaking deposits open in stages; LRT protocols launch (Renzo ezETH, Ether.fi weETH, Kelp rsETH, Puffer pufETH); AVS operators register; AVS contracts deployed with slashing conditions specified but not executable | T14.003 + T14.004 (theoretical surface) |
| 2024-04 to 2024-07 | Four major LRT depeg events (ezETH, weETH, rsETH, pufETH) occur without slashing as a trigger — the depegs are governance-announcement-driven and withdrawal-cap-driven, demonstrating that LRT pricing is fragile even before slashing is live | T14.004 (non-slashing depegs as leading indicators) |
| 2025-04-17 | EigenLayer enables mainnet slashing; Unique Stake Allocation and slashing-condition execution go live; AVS slashing becomes enforceable against operator-restaked ETH | T14.001 + T14.003 + T14.004 (surface activation) |
| 2025-04 to 2025-12 (continuing) | AVS protocols operationalise slashing conditions; first AVS-level slashing events expected; LRT NAV methodologies incorporate non-zero slashing-risk parameters; lending markets recalibrate LRT collateral treatment | T14.001 + T14.003 (operational phase) |
| Continuing | Restaking-slashing surface remains structurally open through v0.1; AVS-level slashing events are the expected next-incident class | T14.001 + T14.003 + T14.004 (ongoing) |

## Public references

- EigenCloud blog, "Slashing Goes Live on Mainnet" (2025-04-17) — slashing-enablement announcement and Unique Stake Allocation documentation
- EigenLayer protocol documentation: slashing-condition specification, Unique Stake Allocation design, and operator-set slashing-exposure mechanics
- LRT issuer (Renzo, Ether.fi, Kelp, Puffer) NAV methodology updates post-slashing-enablement
- Lending-market (Morpho, Gearbox, Aave) LRT collateral-parameter recalibration post-slashing-enablement
- See `techniques/T14.001-slashing-condition-exploit.md`, `techniques/T14.003-restaking-cascading-risk.md`, `techniques/T14.004-liquid-restaking-token-pricing-manipulation.md` for Technique definitions

## Discussion

The EigenLayer mainnet slashing launch is structurally instructive for OAK because it illustrates a category of Technique-relevant event that is not an "attack" or "incident" in the conventional sense: **a protocol milestone that activates a previously-theoretical attack surface.** The defender corollary is that risk-assessment calendars should track protocol-milestone dates (slashing-enablement, withdrawal-enablement, upgrade-activation) as diligently as incident dates, because the milestone activates the surface that the next incident will exploit.

The launch also clarifies the relationship between T14.001 (slashing-condition exploit), T14.003 (cascading risk), and T14.004 (LRT pricing manipulation) at the restaking layer. Before slashing was live, T14.004's slashing-event-arbitrage sub-primitive was characterised in design-review literature but had no operational substrate. Post-launch, the three techniques form an operational stack: T14.001 is the slashing-execution layer (the AVS contract enforces the slash), T14.003 is the propagation layer (the slash cascades through restaked ETH to other AVS and LRTs), and T14.004 is the pricing layer (the slash affects LRT NAV and DEX price before the oracle updates). Each layer can be attacked independently, but they compound: a slashing event that triggers T14.001 becomes a T14.003 cascade event that creates a T14.004 arbitrage window.

A structural observation: the Unique Stake Allocation design bounds the cross-AVS slashing-propagation surface by ensuring that a given unit of restaked ETH is slashable by only one AVS at a time. This is a protocol-layer mitigation against the worst-case T14.003 scenario (a single slashing event draining an operator's entire restaked position across all AVS), but it does not eliminate the T14.003 surface — it constrains it. A slashing event on one AVS still reduces the operator's available restaked ETH for other AVS, and the NAV impact propagates to all LRTs backed by that operator's restaked ETH.

The launch is included in OAK at v0.1 as the canonical "surface activation" event for the restaking-slashing Techniques. Future v0.x expansions should add the first actual AVS-level slashing events (expected 2025–2026) as operational anchors, replacing the launch-date placeholder with post-slashing incident data.
