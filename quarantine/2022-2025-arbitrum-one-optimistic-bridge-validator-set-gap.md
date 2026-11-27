> **QUARANTINED 2026-11-27 — not part of the OAK corpus.** The 2026-11 source pass rewrote this file from the pages it could open and found no attack to record: it describes a design property of Arbitrum's validation (a permissioned validator set before BoLD), with no attack and no loss. It is kept here, outside `examples/`, and can return if a source documents an incident.

# Arbitrum One — permissioned validator set before BoLD, a design risk with no incident — Ethereum / Arbitrum One — 2022–2025

**Loss:** none. No source opened for this file reports a theft or exploit on the Arbitrum One bridge.

**OAK Techniques observed:** none — the opened sources describe a validator-permissioning design and its change, not an attack. The earlier version of this file claimed Offchain Labs was the sole validator operator, a "cold" fraud-proof path and sequencer censorship risk; none of that is on an opened page, so it is removed.

**Attribution:** **unattributed** — no adversary.

**Key teaching point:** **When you assess an optimistic rollup, check who is allowed to validate, not only that a challenge window exists.** Arbitrum's own proposal says validation was restricted to a permissioned set of validators, and the change to permissionless validation went live in February 2025.

## Summary

Arbitrum's documentation says an assertion is confirmed as correct if the challenge period (6.4 days) passes with no challenge ([Arbitrum docs](https://docs.arbitrum.io/how-arbitrum-works/inside-arbitrum-nitro)). The BoLD proposal posted 2024-04-16 says validation was restricted to a permissioned set of validators, to prevent delay attacks, and that with BoLD's fixed time bound reliance on a permissioned set is no longer necessary ([Arbitrum DAO forum, AIP: BOLD](https://forum.arbitrum.foundation/t/aip-bold-permissionless-validation-for-arbitrum/23232)). The proposal does not name who was in that set. The same thread's 2024-04-28 update recommends removing the allowlist for Arbitrum One and keeping Nova permissioned with a DAO-controlled allowlist.

The Block reported on 2025-02-12 that BoLD became active on Arbitrum One and Nova after a governance vote, replacing allow-listed validation with a permissionless mechanism ([The Block](https://www.theblock.co/post/340278/offchain-labs-releases-arbitrum-bold-on-mainnet-for-permissionless-validation), relayed from a summarised read; The Block cannot be read by `check_quotes.py`). Current Arbitrum documentation says that with BoLD, validation is permissionless, and that a chain may still keep an optional validator allowlist as a safety measure ([Arbitrum docs](https://docs.arbitrum.io/how-arbitrum-works/inside-arbitrum-nitro)).

A paper on optimistic-rollup dispute games cites Arbitrum's documentation as setting a low guaranteed payout for a dispute winner (1% of the confiscated asset), with the DAO able to reward more ([Hollow Victory, arXiv:2504.05094](https://arxiv.org/html/2504.05094v1)). That is the authors' reading of the docs and was not checked against them.

## Timeline (UTC)

Dates only; the sources give no hours.

| When | What happened | OAK |
|---|---|---|
| Before 2024-04-16 | Validation restricted to a permissioned set of validators ([AIP: BOLD](https://forum.arbitrum.foundation/t/aip-bold-permissionless-validation-for-arbitrum/23232)) | — |
| 2024-04-16 | BoLD proposal posted for permissionless validation | — |
| 2024-04-28 | Proposal update: remove allowlist for Arbitrum One, keep Nova allowlisted | — |
| 2025-02-12 | BoLD reported active on Arbitrum One and Nova after governance vote ([The Block](https://www.theblock.co/post/340278/offchain-labs-releases-arbitrum-bold-on-mainnet-for-permissionless-validation)) | response |

Key addresses: none published on the opened pages beyond Infura's validator address for Nova, which the forum thread mentions without it being used here.

## Root-cause evidence

- **Technique:** none — design risk, no attack
- **Source:** <https://forum.arbitrum.foundation/t/aip-bold-permissionless-validation-for-arbitrum/23232>; <https://docs.arbitrum.io/how-arbitrum-works/inside-arbitrum-nitro>
- **Source type:** operator
- **Confidence:** reported
- **Evidence:** The operator-side proposal and docs establish that validation was permissioned and later opened. They establish no loss, and no source opened says how many independent validators ran.

## Public references

- Arbitrum DAO forum, "AIP: BOLD - permissionless validation for Arbitrum" (2024-04-16, updated): <https://forum.arbitrum.foundation/t/aip-bold-permissionless-validation-for-arbitrum/23232>
- Arbitrum docs, "Inside Arbitrum Nitro": <https://docs.arbitrum.io/how-arbitrum-works/inside-arbitrum-nitro>
- The Block, "Offchain Labs releases Arbitrum BoLD on mainnet for permissionless validation" (2025-02-12): <https://www.theblock.co/post/340278/offchain-labs-releases-arbitrum-bold-on-mainnet-for-permissionless-validation>
- arXiv:2504.05094, "Hollow Victory": <https://arxiv.org/html/2504.05094v1>
- Related OAK files: [`2022-07-nomad-optimistic-verification-gap.md`](2022-07-nomad-optimistic-verification-gap.md), [`2022-2025-optimistic-bridge-fraud-proof-cohort.md`](2022-2025-optimistic-bridge-fraud-proof-cohort.md)
