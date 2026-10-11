# Cosmos-SDK Validator Downtime Jailing and Slashing-Evasion Patterns — 2022–2025

**Loss:** structural / economic — Cosmos-SDK validators that miss too many blocks are jailed (removed from the active set) and slashed by a chain-configured downtime fraction; no aggregate loss figure is sourced (the original's "low-to-mid seven figures annually" and "~\$50B+ staked" were unsourced and removed). No single incident is asserted.

**OAK Techniques observed:** **OAK-T14.001** (Slashing-Condition Exploit — Cosmos-SDK chains implement separate downtime and double-sign slashing; the evasion sub-pattern is the redelegation/unbond path described below.) **OAK-T14.006** (Validator/Proposer Liveness-Fault Griefing — the downtime-jailing mechanism is a T14.006 surface at the protocol-parameter layer: an adversary who can induce downtime in a target validator causes it to be jailed and slashed.)

**Attribution:** **unattributed** — the SDK slashing and jailing parameters define the surface. No attacker, campaign or specific incident is identified in this file.

**Key teaching point:** **Liveness-fault penalty design is a first-class security parameter: the downtime-slash fraction, window, minimum-signed fraction, jail duration and unjail mechanics are chain-configured and collectively define the T14.006 griefing surface a chain presents.** A discrete jail-and-slash event differs from Ethereum's continuous inactivity leak, so a short, well-timed outage that crosses the missed-block threshold can trigger the full penalty.

**Corrected 2026-10-11:** the original attached specific Cosmos Hub and per-chain parameter values (window of 10,000 blocks, per-chain slash fractions, 21-day unbonding) and a 2022-2023 date for ASA-2024-005, and said an unbonded stake "cannot be slashed"; those values are unsourced here, ASA-2024-005 was published 2024-02-27 and concerns redelegation, and the Solana/Polkadot comparison row and provider-concentration claims are removed as unsourced.

## Summary

Per the Cosmos SDK slashing module documentation, validator liveness is tracked over a sliding window of `SignedBlocksWindow` blocks. When the missed-block count exceeds the window minus `MinSignedPerWindow` times the window, the validator is slashed by `SlashFractionDowntime`, jailed for `DowntimeJailDuration`, and its missed-block counters are reset. A jailed validator must send `MsgUnjail`, which fails unless the validator exists, has nonzero self-delegation, is jailed, is not tombstoned and has passed its `JailedUntil` time. The docs' example values are a 100-block window, 0.5 minimum signed fraction, 600s jail and 0.01 downtime slash; these are examples, and each chain sets its own. Double-signing is a separate consensus fault with its own fraction (0.05 in the docs' example), tombstoning the validator, which then cannot unjail; liveness slashes do not tombstone.

The delegator impact and the manual unjail requirement follow from this design: delegations to a jailed validator earn nothing while it is out, and a jailed operator who cannot send the unjail transaction stays out longer than the minimum jail time.

The sourced slashing-evasion item is Cosmos SDK advisory ASA-2024-005, "Potential slashing evasion during re-delegation" (severity Low, CWE-372): if a delegation contributed to a validator's byzantine behaviour and the validator had not yet been slashed, the delegator could use re-delegation to evade the pending slash. It was reported to the Cosmos Bug Bounty Program on 2023-12-06, published 2024-02-27 and fixed in 0.50.5 and 0.47.10 (affects 0.50.4 and earlier, 0.47.9 and earlier). The original draft's claim that a validator can self-unbond and thereby be beyond slashing is not supported by the cited sources; the SDK docs describe slashing code that handles unbonding delegations and redelegations by height.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-12-06 | Redelegation slashing-evasion issue reported to the Cosmos Bug Bounty Program | T14.001 |
| 2024-02-27 | ASA-2024-005 published; fixed in SDK 0.50.5 and 0.47.10 | T14.001 (slashing-evasion class, redelegation) |
| Continuing | Chain-specific downtime parameters keep a standing T14.006 surface | T14.006 |

## Public references

- `[cosmosslashingdocs]` — Cosmos SDK documentation, "x/slashing": <https://docs.cosmos.network/sdk/latest/modules/slashing/README>
- `[asa2024005]` — Cosmos SDK GitHub advisory, "ASA-2024-005: Potential slashing evasion during re-delegation" (2024-02-27): <https://github.com/cosmos/cosmos-sdk/security/advisories/GHSA-86h5-xcpx-cfqc>
- See `techniques/T14.001-slashing-condition-exploit.md` and `techniques/T14.006-validator-proposer-liveness-fault-griefing.md` for Technique definitions.

## Discussion

The Cosmos-SDK downtime-jailing mechanism anchors the cross-chain parameter-differentiation sub-class of T14.001 and T14.006: slashing and jailing parameters are chain-specific, so a chain's choices determine how attractive liveness-fault griefing is. The surface is a property of the SDK's slashing module and of each chain's configuration. A cross-chain comparison of penalty regimes remains a research item; exact per-chain values should be taken from each chain's on-chain parameters rather than from this file.
