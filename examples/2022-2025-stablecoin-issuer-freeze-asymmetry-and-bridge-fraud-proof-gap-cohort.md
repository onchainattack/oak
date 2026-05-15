# Stablecoin Issuer Freeze-Asymmetry and Optimistic Bridge Fraud-Proof Gap Cohort — 2022–2025

**OAK Techniques observed:** OAK-T7.008, OAK-T10.004

**Attribution:** **unattributed** (aggregate cohort).
**Loss:** T7.008 aggregate undocumented at class level (the technique is a routing preference rather than an extraction event; loss is embedded in the downstream laundering chains that select USDT over USDC for pre-off-ramp holding); T10.004 aggregate undocumented at class level (the Nomad bridge exploit, August 2022, ~$190M, is the closest large-scale optimistic-verification failure, but it exploited a verification-predicate gap rather than a fraud-proof gap per se; smaller-scale fraud-proof-gap incidents are distributed across lesser-known optimistic bridges).

**Key teaching point:** Both Techniques exploit a gap between a **design assumption** and **operational reality** — but in fundamentally different domains. T7.008 exploits the gap between the assumption of uniform stablecoin-freeze policy and the operational reality of issuer-specific compliance postures (Circle froze Tornado Cash addresses August 2022; Tether did not, or did so on a materially different timeline). T10.004 exploits the gap between the 1-of-N honest-verifier assumption and the operational reality of absent, censored, or under-incentivised challengers. The structural parallel is that in both cases, the on-chain code behaves as designed — the freeze function exists and is exercised per the issuer's compliance posture (T7.008), and the bridge accepts messages because no valid challenge arrived (T10.004). The failure is at the *mechanism-design layer*, not the code-correctness layer.

## Summary

## Timeline

T7.008 from 2022-08 (OFAC Tornado Cash sanctions, the foundational event demonstrating real-world freeze-willingness divergence); T10.004 from 2022 onward (concept characterised in Connext/Nomad architecture write-ups).

## T7.008 — Stablecoin Issuer Freeze-Asymmetry Laundering

The launderer exploits divergence in freeze/block policies across stablecoin issuers — most notably between Circle (USDC, which froze Tornado Cash-sanctioned addresses August 2022 per OFAC SDN listing) and Tether (USDT, which historically applied freezes more selectively). Proceeds are routed into the stablecoin whose issuer is least likely to freeze for the holding-and-transit leg.

The foundational event: **Post-Tornado-Cash sanctions — August 2022.** OFAC added Tornado Cash contract addresses and associated wallets to the SDN list on 2022-08-08. Circle froze USDC held by listed addresses in compliance with the sanctions order. Tether did not freeze corresponding USDT held by the same addresses or did so on a materially different timeline. The resulting freeze-asymmetry demonstrated publicly, at the transaction-log level, that stablecoin-issuer freeze policy is not uniform.

Post-2022, laundering operators demonstrably shifted stablecoin-rail preference toward USDT for pre-off-ramp holding legs — consistent with route-around-the-freezer behaviour. Chainalysis 2024 Laundering Report documents that the share of laundering volume denominated in USDT exceeds the share in USDC by a margin wider than the legitimate-market stablecoin-mix would predict.

Key detection primitives: per-cluster stablecoin-issuer preference ratio (USDT-held to USDC-held over rolling windows); pre-off-ramp stablecoin holding duration by issuer; freeze-event-triggered conversion monitoring (clusters converting from frozen issuer's token to competitor's token within a configurable post-freeze window).

## T10.004 — Optimistic-Bridge Fraud-Proof Gap

The bridge architecture relies on a fraud-proof challenge window to detect invalid messages, but the challenge mechanism is incompletely operationalised. Sub-cases:

- **(a) Absent challenger network.** No economically-incentivised challenger actually monitors the bridge. The 1-of-N honest-verifier assumption reduces to 0-of-N.
- **(b) Inadequate challenge window.** The challenge window is too short for realistic challenger response time given reorg depth, mempool latency, and cross-chain proof-construction time.
- **(c) Fraud-proof system bugs.** The fraud-proof contract itself contains bugs that prevent valid challenges from being processed.
- **(d) Censorship / liveness defeat.** The challenger's fraud-proof transaction can be censored by the same operator whose messages it would dispute.

Canonical anchor: **Nomad bridge exploit — August 2022 — ~$190M.** While primarily a verification-predicate failure (T10.002), Nomad's optimistic-verification design surfaced the structural T10.004 question: who monitors the bridge and challenges invalid messages? The absence of a live challenger network was a contributing factor.

See `examples/2022-2025-optimistic-bridge-fraud-proof-cohort.md` for full cohort coverage.

Detection requires pre-deployment architecture review: verify that at least one independent challenger operator is funded and live; verify challenge-window duration via written response-time-budget analysis; require the operator to demonstrate a successful fraud-proof exercise on testnet.

## Public references

- `[ofac2022tornado]` — OFAC Tornado Cash SDN listing (August 8, 2022)
- `[circle2022freeze]` — Circle USDC Tornado Cash freeze action
- `[chainalysis2024laundering]` — Chainalysis 2024 Crypto Laundering Report (stablecoin-issuer preference analysis)
- `[nomad2022postmortem]` — Nomad bridge August 2022 exploit post-mortem
- `[connext2022architecture]` — Connext optimistic-bridge architecture write-up
