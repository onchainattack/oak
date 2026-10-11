# Post-Tornado-Cash USDC/USDT freeze-policy asymmetry laundering — 2022

**Loss:** **Infrastructure case, not a per-victim loss.** Following the OFAC sanction of Tornado Cash (2022-08), Circle (USDC issuer) froze USDC held by Tornado Cash-sanctioned addresses (over 75,000 USDC across 81 addresses per Dune data cited by Forkast). Tether (USDT issuer) did not freeze the sanctioned addresses and publicly argued that unilaterally freezing secondary-market addresses would be "highly disruptive and reckless", creating a structural divergence in freeze risk across the two dominant fiat-backed stablecoins. The hypothesis that launderers adapted by routing the holding-and-transit leg preferentially through USDT is the OAK analytic inference; no primary analytics report quantifying such a shift was found (see Corrected note).
**OAK Techniques observed:** **OAK-T7.008** (Stablecoin Issuer Freeze-Asymmetry Laundering) — canonical anchor. The Tornado Cash sanctions event created a natural experiment: Circle's freeze of sanctioned USDC vs. Tether's refusal to freeze the sanctioned addresses created an incentive structure suggesting to launderers that USDT carried lower freeze risk for the pre-off-ramp transit leg.
**Attribution:** **confirmed** — Circle and Tether freeze-event data is publicly observable on-chain; the freeze-policy divergence is documented in press coverage of Circle's compliance and Tether's public statement.

**Corrected 2026-10-11:** Tether did not freeze the sanctioned addresses (rather than freezing "selectively"), and the claimed on-chain USDT/USDC shift in laundering clusters and the "~24h" freeze timing were removed as unsourced.

**Key teaching point:** The post-Tornado-Cash USDC/USDT freeze asymmetry is the canonical T7.008 anchor: the two dominant fiat-backed stablecoins exhibit materially different freeze policies towards sanctioned addresses, and launderers route accordingly. The detection signal is the per-cluster USDT-to-USDC holding ratio and pre-off-ramp holding-duration divergence — clusters routing through USDT for transit and converting to USDC only at the point of off-ramp deposit.

## Summary

On 2022-08-08, OFAC added Tornado Cash to the SDN List, sanctioning the mixer's smart-contract addresses and associated Ethereum addresses. Circle, as a U.S.-based issuer of USDC, confirmed compliance with OFAC's measures and froze USDC in the sanctioned addresses, including Tornado Cash's USDC pool. Tether did not freeze the sanctioned addresses and, responding to criticism, pointed to a blog post arguing that unilaterally freezing secondary-market addresses could be highly disruptive.

This freeze-policy divergence created an immediate and persistent structural signal: launderers who route proceeds through USDC face a materially higher freeze risk during the pre-off-ramp transit window than those routing through USDT. The launderer's rational response is to hold proceeds in USDT during transit and convert to USDC only at the point of off-ramp deposit (where the exchange, not the issuer, is the counterparty).

Cointelegraph noted USDT's market cap grew by almost \$2 billion in the days after the sanctions while USDC's shrank, but called any user shift from USDC to USDT speculation. A launderer-specific routing shift is an unverified inference; Elliptic data cited in secondary reporting shows about three-quarters of the roughly \$2.5B held in frozen addresses by late 2025 was USDT, which is a share of frozen balances, not evidence of migration.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-08-08 | OFAC sanctions Tornado Cash; Circle (via Centre) blacklists the sanctioned addresses | (sanctions / freeze event) |
| 2022-08 onward | Hypothesised (unverified) launderer preference for USDT transit | T7.008 (freeze-asymmetry laundering) |
| Continuing | USDC/USDT freeze-policy divergence persists as a laundering-methodology signal at v0.1 cutoff | (ongoing) |

## Public references

- `[tcfblock]` — The Block, "Circle freezes USDC funds in Tornado Cash's US Treasury-sanctioned wallets" (2022-08-08): <https://www.theblock.co/post/162172/security>
- `[tcfforkast]` — Forkast, "Circle freezes blacklisted Tornado Cash" (2022-08): <https://forkast.news/circle-freezes-blacklisted-tornado-cash/>
- `[tcfcointel]` — Cointelegraph, "USDC whale holdings percentage lowest in almost two years": <https://cointelegraph.com/news/usdc-whale-holdings-percentage-lowest-in-almost-two-years>
