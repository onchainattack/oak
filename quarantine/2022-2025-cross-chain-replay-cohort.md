> **QUARANTINED 2026-11-27 — not part of the OAK corpus.** The 2026-11 source pass rewrote this file from the pages it could open and found no attack to record: it names no incident: its one opened source, a general survey, does not mention replay or bridges. It is kept here, outside `examples/`, and can return if a source documents an incident.

# Cross-chain replay — no sourced incident members found — 2022–2025 (cohort)

**Loss:** none recorded. No incident of cross-chain replay was found on any opened page, so no total is given. An earlier version of this file described smaller-scale replay incidents without naming one; none is sourced and the claim is removed.

**OAK Techniques observed:** none — no opened page describes a cross-chain replay event. The Technique page for cross-chain replay holds the mechanism; this file has no incident to add to it.

**Attribution:** **unattributed** — no incident.

**Key teaching point:** **Bind every signed cross-chain message to its destination chain and contract, and reject a nonce already used.** This is the general control for replay; no incident in this file demonstrates it.

## Summary

This file was written as a cohort of cross-chain replay cases, but it names no member incident. The one academic source it cites, the DeFi attacks survey [SoK: Decentralized Finance (DeFi) Attacks](https://arxiv.org/abs/2208.13035), has an abstract that does not mention cross-chain replay or bridges (read through a summarising fetch; the body text was not opened). The audit-firm methodology pages the earlier version cited have no URL and were not opened.

With no sourced member, this is not a cohort. Related files in `examples/` concern replay of signed payloads on a single chain, not across chains, and are not retold here: [Aramid bridge signature replay](2026-11-aramid-bridge-base-contract-signature-replay-unbacked-avoi-redemption.md), [Argent-style recovery payload replay](2026-10-argent-style-wallet-recovery-deadline-wrap-signed-payload-replay.md), [Alpscon reward replay](2026-10-alpscon-hardhat-default-account-whitelisted-eip7702-reward-replay.md). Their fit to this class was not checked here.

## Timeline (cohort-scale)

| When | What happened | OAK |
|---|---|---|
| 2022–2025 | No cross-chain replay incident found on an opened page | — |

## Root-cause evidence

- **Technique:** none — no incident
- **Source:** <https://arxiv.org/abs/2208.13035>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** The cited survey's abstract does not mention cross-chain replay. No page establishes a replay incident, so nothing here is confirmed.

## Public references

- Zhou et al., "SoK: Decentralized Finance (DeFi) Attacks" (2022, arXiv:2208.13035): <https://arxiv.org/abs/2208.13035>
