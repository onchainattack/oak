# OAK-M13 — Long Challenge Window with Economic Challenger Incentives

**Class:** architecture
**Audience:** protocol, designer (optimistic-bridge / rollup)
**Maps to Techniques:** OAK-T10.004

## Description

OAK-M13 is the canonical defensive control for optimistic-verification bridges and optimistic rollups: a fraud-proof challenge window long enough for both automated and human challengers to detect, construct, and submit a valid challenge against an invalid message, paired with an economically-incentivised, contractually-bonded challenger set whose payouts make honest watching profitable in expectation. The mitigation closes the OAK-T10.004 gap between architectural assumption ("a 1-of-N honest, live, economically-motivated challenger exists") and deployed reality ("challengers may be absent, censored, under-incentivised, or technically blocked"). It is canonical for optimistic-verification architectures because it is the only mitigation surface the architecture itself exposes — once the message is finalised, the on-chain code has behaved as designed, and the only available defence was the watchers who did not arrive.

The mitigation is operational rather than purely architectural: writing "30-minute window" into a bridge contract is necessary but not sufficient. The defender's question is *who actually challenges, with what bond, in what window, on what infrastructure?* M13 prescribes named challenger operators, published bond balances, liveness telemetry, and successful-challenge-or-no-fault attestations on a recurring cadence. The challenge window length must be derived from a written response-time-budget analysis covering reorg depth, transaction-inclusion latency under congestion, and cross-chain proof-construction time where applicable — not from convention.

Economic incentive design is the load-bearing component. A challenger's expected payoff for honest watching must exceed the operating cost of the watcher infrastructure plus the opportunity cost of the bonded capital, otherwise rational challengers exit and the 1-of-N assumption decays toward 0-of-N. Recent academic work characterises liveness-incentive insufficiency as a strategic-exploit surface in dispute games `[hollowvictory2025]`; M13 treats this insufficiency as a first-class operational risk to be measured and budgeted.

## How it applies

- **OAK-T10.004 (Optimistic-Bridge Fraud-Proof Gap):** size the window from a written response-time-budget analysis; name and fund at least one independent challenger operator; publish challenger-set membership, bond balances, and last-heartbeat metrics; commission periodic adversarial drills exercising the fraud-proof path end-to-end on mainnet or high-fidelity testnet; ensure censorship-resistance such that the entity producing messages cannot also exclude fraud-proof transactions.

## Limitations

- M13 does not protect against verification-predicate bugs that bypass the optimistic mechanism entirely (the Nomad 2022-08 `0x00` trusted-root case is OAK-T10.002, not T10.004; a longer window would not have helped because the optimistic check was structurally bypassed).
- M13 has no effect on cryptographic-light-client bridges (OAK-T10.005) where there is no challenger by construction; multi-prover redundancy (OAK-M14) is the analogous architectural control there.
- Economic incentives are bounded by the ratio of bond size to potential-loss size; a challenger whose bond is dwarfed by the message they would dispute is structurally under-incentivised regardless of window length.
- Censorship-resistance is hard to operationalise on chains where the message producer is also the dominant block builder; the mitigation degrades on such chains until builder-separation matures.
- Adversarial drills are themselves a meaningful operational expense and tend to be deferred; a fraud-proof system that has never processed a successful challenge in production is a standing T10.004 surface regardless of audit reputation.

## Reference implementations

- L2BEAT per-bridge "stage" classifications publish fraud-proof maturity assessments that operationalise parts of the M13 review (challenger-set membership, fraud-proof exercise history) at the public-dashboard layer.
- Optimism Cannon and Arbitrum BoLD dispute-game implementations provide reference fraud-proof-contract designs with bonded challenger sets; defenders integrating new optimistic bridges should compare against these as architectural baselines.
- No widely-deployed runtime detector specifically observes challenger-liveness as of v0.1; vendor coverage at the architecture-review layer lives at audit firms with bridge-specialist practice (Halborn, Trail of Bits, OpenZeppelin).

## Citations

- `[halbornnomadoptimistic2022]` — Halborn analysis of the Nomad bridge documents the optimistic-verification mechanism and its watcher-dependent security model.
- `[bhuptanioptbridges2022]` — Connext architectural write-up introducing optimistic-bridge design and the 1-of-N honest-verifier assumption.
- `[hollowvictory2025]` — academic analysis of dispute-game liveness-incentive insufficiency as a strategic-exploit surface.
- `[zhou2023sok]` — academic taxonomy classifying bridge-design assumption failures including optimistic-mechanism gaps.
