# Cosmos-SDK Validator Downtime Jailing and Slashing-Evasion Patterns — 2022–2025

**Loss:** structural / economic — Cosmos-SDK validators that incur downtime jailing (temporary removal from the active validator set due to excessive missed blocks) forfeit staking rewards for the jailing duration and incur a downtime-slash penalty (typically 0.01% of staked tokens on Cosmos Hub, variable across Cosmos-SDK chains). Validators that self-unbond to evade a pending slash forego the unbonding-period rewards and lock their tokens for the unbonding period (typically 21 days on Cosmos Hub). Aggregate downtime-slash-and-jailing losses across Cosmos-SDK chains are estimated in the low-to-mid seven figures annually across the ecosystem's ~$50B+ in staked assets, but no single incident dominates — the losses are distributed across thousands of validator-downtime events.

**OAK Techniques observed:** **OAK-T14.001** (Slashing-Condition Exploit — Cosmos-SDK chains implement a distinct slashing-parameter regime: downtime slashing (typically 0.01% for extended downtime) is separate from equivocation slashing (typically 5% for double-signing). The downtime-jailing mechanism is the Cosmos-SDK analogue of Ethereum's inactivity-leak penalty, but with a discrete jail/unbond event rather than a continuous quadratic penalty.) **OAK-T14.006** (Validator/Proposer Liveness-Fault Griefing — the Cosmos-SDK downtime-jailing mechanism is a T14.006 surface at the protocol-parameter layer. An adversary who can induce downtime in a target validator causes the validator to be jailed, losing staking rewards and incurring the downtime-slash. The economic asymmetry mirrors Ethereum T14.006: the attacker's cost (inducing downtime) is low relative to the victim's loss (jailed rewards + downtime-slash + reputation damage).

**Attribution:** **protocol-design** — the Cosmos-SDK slashing and jailing parameters define the surface. Individual downtime events are attributed to validator-infrastructure failures (cloud-provider outages, key-management errors, node-software crashes) rather than to active attackers, though the surface is exploitable by an active adversary.

**Key teaching point:** **The Cosmos-SDK downtime-jailing mechanism is the cross-chain T14.006/T14.001 anchor: it demonstrates that liveness-fault penalties and slashing conditions are chain-specific parameter choices, not universal constants, and the parameter values determine the economic attractiveness of liveness-fault griefing on each chain.** The Cosmos-SDK parameter regime — a discrete jail event with a fixed downtime-slash percentage, followed by a manual unjail transaction — creates a different griefing surface than Ethereum's continuous quadratic inactivity leak. The structural lesson is that **liveness-fault penalty design is a first-class security parameter: a chain's downtime-slash percentage, jail duration, and unjail mechanics collectively define the T14.006 griefing surface that the chain presents to adversaries and to passive infrastructure-failure events.**

## Summary

Cosmos-SDK chains implement a validator accountability system that combines slashing (for equivocation / double-signing) and jailing (for downtime / missed blocks). The mechanism operates as follows:

1. **Missed-block threshold.** A validator is expected to sign blocks during its assigned rounds. If the validator misses a configurable threshold of blocks within a configurable window (on Cosmos Hub: 95% of blocks within a sliding window of 10,000 blocks), the validator is "jailed" — removed from the active validator set.

2. **Downtime-slash penalty.** Upon jailing, the validator's staked tokens are slashed by a configurable percentage (typically 0.01% on Cosmos Hub, varying across chains: Osmosis 0.01%, Injective 0.01%, Terra Classic 0.01%, Juno 0.01%, Evmos 0.05%, Celestia 0.01%, dYdX 0.05%).

3. **Jailing period.** The validator remains jailed for a configurable minimum period (typically 10 minutes on Cosmos Hub). During the jailing period, the validator earns no staking rewards, and any tokens delegated to the validator also earn no rewards — the delegator impact amplifies the validator's loss.

4. **Unjail transaction.** After the jail period expires, the validator must submit an `unjail` transaction to rejoin the active set. If the validator fails to unjail (e.g., because the operator's key infrastructure is still down), it remains jailed indefinitely — a self-reinforcing penalty.

5. **Slashing-evasion via self-unbonding.** A validator that anticipates a slash (e.g., because it knows it will miss the block-signing threshold) can preemptively unbond its stake. Once unbonded, the stake cannot be slashed — but the validator exits the active set and foregoes rewards during the unbonding period (typically 21 days on Cosmos Hub).

The Cosmos-SDK slashing-parameter regime differs structurally from Ethereum's in ways that affect the T14.001 and T14.006 surfaces:

| Parameter | Ethereum Beacon Chain | Cosmos-SDK (Cosmos Hub) |
|---|---|---|
| Downtime penalty | Continuous quadratic inactivity leak | Discrete 0.01% slash at jail event |
| Penalty accumulation | Grows with offline duration (quadratic) | One-time slash per jail event |
| Equivocation slash | 1 ETH + stake reduction (effective ~0.5–1 ETH) | 5% of staked tokens |
| Jail concept | Validator exits active set if offline; no explicit "jail" | Validator is jailed after threshold; must unjail manually |
| Slashing-evasion surface | Validator can exit voluntarily (no slash for voluntary exit) | Validator can self-unbond to evade pending slash |

The Cosmos-SDK parameter regime makes downtime griefing (T14.006) economically distinct from Ethereum:

- **On Ethereum,** an attacker must sustain DDoS to accumulate penalties quadratically — a long-duration attack is required for material damage. The continuous penalty structure incentives the victim to restore connectivity quickly to stop the penalty accumulation.

- **On Cosmos-SDK,** an attacker need only push the validator below the missed-block threshold once to trigger the jail event and the downtime slash. The penalty is binary (jailed/not-jailed) rather than continuous, meaning a short-duration but well-timed DDoS that causes the validator to miss just over the threshold is sufficient to impose the full downtime penalty.

- **The Cosmos-SDK jail mechanism amplifies delegator impact:** when a validator is jailed, all tokens delegated to it stop earning rewards, including tokens delegated by third parties who had no role in the validator's infrastructure decisions. The delegator impact creates reputational pressure on the validator beyond the direct economic penalty.

- **The manual unjail requirement** creates an additional surface: a jailed validator whose operator is asleep, away, or otherwise unavailable cannot unjail until the operator manually submits the transaction, extending the reward-loss period beyond the minimum jail duration.

The slashing-evasion sub-pattern (self-unbonding to evade a slash) is structurally T14.001: the validator exploits the protocol's voluntary-exit mechanism to avoid a pending slash, shifting from an active-validator position (exposed to the slash) to an unbonding position (sheltered from the slash). The evasion is not a smart-contract exploit per se but an exploitation of the exit-before-slash window that exists when the slash is triggered by on-chain evidence submission rather than by an automated protocol mechanism.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2019-03 | Cosmos Hub launches; slashing and jailing parameters defined at genesis | T14.001 + T14.006 (surface definition) |
| 2020–2022 | Multiple Cosmos-SDK validators jailed for downtime due to infrastructure failures; downtime-slash and jailing mechanics battle-tested operationally | T14.006 (passive liveness-fault surface) |
| 2022–2023 | Cosmos-SDK security advisories: ASA-2024-005 addresses slashing-evasion class via equivocation-evidence submission window; slashing-evasion surface characterised across Cosmos-SDK chains | T14.001 (slashing-evasion surface) |
| 2023–2024 | Validator-infrastructure concentration on specific cloud providers and validators-as-a-service (Figment, Chorus One, stake.fish, P2P.org) creates correlated-downtime-jailing risk across multiple Cosmos-SDK chains | T14.006 (correlated-jailing surface) |
| 2024–2025 | Cross-chain comparison of slashing/jailing parameter regimes (Ethereum vs. Cosmos-SDK vs. Polkadot vs. Solana) becomes a standard security-assessment dimension for institutional staking operators | T14.001 + T14.006 (ecosystem comparison) |
| Continuing | Cosmos-SDK downtime-jailing and slashing-evasion surfaces persist through v0.1; chain-specific parameter variations create a standing differential-griefing surface | T14.001 + T14.006 (ongoing) |

## Public references

- Cosmos-SDK slashing module documentation: `github.com/cosmos/cosmos-sdk/x/slashing`
- Cosmos-SDK security advisory ASA-2024-005: slashing-evasion class characterisation and mitigation
- Cosmos Hub, Osmosis, Injective, Celestia, dYdX slashing and jailing parameter configurations
- Validator-as-a-service provider (Figment, Chorus One, P2P.org) downtime-jailing incident post-mortems
- Cosmos-SDK blockchain explorer data: validator jail/unbond events, downtime-slash distributions
- See `techniques/T14.001-slashing-condition-exploit.md` and `techniques/T14.006-validator-proposer-liveness-fault-griefing.md` for Technique definitions

## Discussion

The Cosmos-SDK downtime-jailing mechanism anchors the **cross-chain parameter-differentiation sub-class** of T14.001 and T14.006: the slashing and jailing parameters are chain-specific governance decisions, and the parameter values directly determine the economic attractiveness of liveness-fault griefing on each chain. A chain with a 0.01% downtime slash and a 10-minute jail period presents a smaller griefing surface than a chain with a 0.05% downtime slash and a 1-hour jail period — the parameter values are the surface.

The parameter-differentiation surface is structurally different from the "single-chain, single-parameter-regime" framing that dominates Ethereum-centric T14 discussion. In the Cosmos-SDK ecosystem, every chain chooses its own slashing and jailing parameters at genesis and can modify them through governance. The result is a **slashing-parameter landscape** across ~50+ economically-significant Cosmos-SDK chains, where each chain's parameter choices reflect its governance's risk assessment and where the parameter values create a differential T14.006 surface that sophisticated validators can compare when deciding which chains to validate on.

The slashing-evasion sub-pattern (self-unbonding to evade a pending slash) is instructive for the broader T14.001 surface because it demonstrates that the exit mechanism is itself a slashing-condition surface. A validator that can exit before being slashed has an incentive to exit; the protocol's exit-to-slash timing relationship determines whether that incentive is exploitable. Cosmos-SDK's unbonding period and evidence-submission window collectively define the evasion window; Ethereum's voluntary-exit mechanism (no slash for voluntary exit, but the exit queue may delay the exit) defines a different evasion window. The structural T14.001 lesson is that the exit mechanism is not neutral — it is an input to the slashing-condition surface.

The Cosmos-SDK case also demonstrates that T14.006 is chain-agnostic: any PoS chain with liveness-fault penalties has a T14.006 surface, and the penalty parameterisation determines the surface's economic magnitude. The cross-chain comparison framework (Ethereum quadratic inactivity leak vs. Cosmos-SDK discrete jail/slash vs. Polkadot offline-slash with chill-and-unstake vs. Solana downtime-slash with manual unjail) is a standing research item that future v0.x expansions should develop into a formalised cross-chain T14.001/T14.006 parameter reference.

The Cosmos-SDK ecosystem's ASA-2024-005 advisory addressing the slashing-evasion class is the closest thing to an ecosystem-wide T14.001 acknowledgement: it characterises the slashing-evasion surface at the SDK level rather than at the chain level, recognising that the surface is a property of the SDK's slashing-module design rather than of any individual chain's parameter choices. SDK-level vulnerability disclosure is the Cosmos-SDK analogue of Ethereum's consensus-layer bug-bounty programme — both address protocol-layer T14.001 surfaces that are not chain-specific but infrastructure-wide.
