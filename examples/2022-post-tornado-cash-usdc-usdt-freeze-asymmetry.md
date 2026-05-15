# Post-Tornado-Cash USDC/USDT freeze-policy asymmetry laundering — 2022

**Loss:** **Infrastructure case, not a per-victim loss.** Following the OFAC sanction of Tornado Cash (2022-08), Circle (USDC issuer) froze USDC held by Tornado Cash-sanctioned addresses in compliance with U.S. sanctions obligations. Tether (USDT issuer) applied freezes more selectively, creating a structural divergence in freeze risk across the two dominant fiat-backed stablecoins. Launderers adapted by routing proceeds preferentially through USDT for the holding-and-transit leg of the laundering chain — exploiting the issuer-policy gap to reduce freeze risk during the pre-off-ramp transit window.
**OAK Techniques observed:** **OAK-T7.008** (Stablecoin Issuer Freeze-Asymmetry Laundering) — canonical anchor. The Tornado Cash sanctions event created a natural experiment: Circle's immediate and comprehensive freeze of sanctioned USDC vs. Tether's more selective freeze posture demonstrated to launderers that USDT carried lower freeze risk for the pre-off-ramp transit leg.
**Attribution:** **confirmed** — Circle and Tether freeze-event data is publicly observable on-chain; the freeze-policy divergence is documented in each issuer's public statements and enforcement actions.

**Key teaching point:** The post-Tornado-Cash USDC/USDT freeze asymmetry is the canonical T7.008 anchor: the two dominant fiat-backed stablecoins exhibit materially different freeze policies towards sanctioned addresses, and launderers route accordingly. The detection signal is the per-cluster USDT-to-USDC holding ratio and pre-off-ramp holding-duration divergence — clusters routing through USDT for transit and converting to USDC only at the point of off-ramp deposit.

## Summary

On 2022-08-08, OFAC added Tornado Cash to the SDN List, sanctioning the mixer's smart-contract addresses and associated Ethereum addresses. Circle, as the issuer of USDC (a U.S.-domiciled entity subject to OFAC regulations), froze USDC held by the sanctioned addresses within approximately 24 hours. Tether, as the issuer of USDT (domiciled outside the U.S.), applied freezes more selectively, focusing on addresses directly linked to law-enforcement requests rather than implementing blanket OFAC-compliance freezes across all Tornado Cash-interacting addresses.

This freeze-policy divergence created an immediate and persistent structural signal: launderers who route proceeds through USDC face a materially higher freeze risk during the pre-off-ramp transit window than those routing through USDT. The launderer's rational response is to hold proceeds in USDT during transit and convert to USDC only at the point of off-ramp deposit (where the exchange, not the issuer, is the counterparty).

On-chain data post-August 2022 showed a measurable shift: sanctioned and high-risk clusters' USDT holdings increased relative to USDC, and pre-off-ramp USDC holding durations shortened relative to USDT holding durations — consistent with issuer-policy-aware routing.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-08-08 | OFAC sanctions Tornado Cash; Circle freezes sanctioned USDC within ~24h | (sanctions / freeze event) |
| 2022-08–2023 | Observed shift: high-risk clusters increase USDT holdings relative to USDC; USDC pre-off-ramp holding duration shortens | T7.008 (freeze-asymmetry laundering) |
| Continuing | USDC/USDT freeze-policy divergence persists as a laundering-methodology signal at v0.1 cutoff | (ongoing) |

## Public references

- OFAC: Tornado Cash SDN List designation (2022-08-08).
- Circle: USDC freeze of Tornado Cash-sanctioned addresses announcement (2022-08).
- Tether: public statements on freeze policy and selective enforcement approach.
- Chainalysis / Elliptic: post-Tornado-Cash stablecoin-issuer routing analysis.
