> **QUARANTINED 2026-11-27 — not part of the OAK corpus.** The 2026-11 source pass rewrote this file from the pages it could open and found no attack to record: it describes a product launch (slashing going live on EigenLayer); the opened page reports no slashing event and no loss. It is kept here, outside `examples/`, and can return if a source documents an incident.

# EigenLayer mainnet slashing launch — a protocol milestone, not an incident — Ethereum — 2025-04-17

**Loss:** none. No theft, exploit or slashing event is reported on the opened page ([EigenLayer, "Slashing Goes Live"](https://www.eigenlabs.org/blog/slashing-goes-live/)). An earlier version of this file gave a "\$15B+" restaked-ETH figure; the opened page carries no dollar figure, so it is removed.

**OAK Techniques observed:** none — the opened source describes a protocol release (slashing enabled on mainnet), not an attack. A slashing-related Technique would apply only to a later incident in which a slashing condition is exploited, and no such incident is described here.

**Attribution:** **unattributed** — there is no adversary. The source is the protocol team's own announcement.

**Key teaching point:** **Treat a protocol release that makes stake slashable as a change to your risk model on the day it ships.** After the launch, an operator's staked funds can be burned if the operator fails commitments made to an AVS, so anyone holding or lending against restaked positions should re-check exposure then, not after the first slash.

## Summary

On 2025-04-17 EigenLayer announced that slashing was live on Ethereum mainnet ([EigenLayer blog](https://www.eigenlabs.org/blog/slashing-goes-live/)). Per the post, an Operator's staked funds can be burned if they fail to meet commitments made to an AVS, and Operators and Stakers share rewards and penalties. Participation is opt-in: slashing applies only when an Operator joins a slashable Operator Set. The post describes two new primitives: Unique Stake Allocation, where Operators earmark portions of delegated stake and only one AVS can slash a given earmarked portion, so an Operator can join several services without compounding slashing exposure; and Operator Sets, which let an AVS group Operators by responsibility with their own slashing conditions. The post reports no slashing event. It cites ecosystem figures of 190 AVSs in development (40 on mainnet), over 2,000 registered Operators and over 80,000 unique staking addresses.

This file is kept as a record of a milestone that changes risk, not as an attack. No other page was opened, so claims about liquid restaking token pricing, lending-market parameter changes or later slashing events are not made here.

## Timeline (UTC)

Times are dates only; the source gives no hour.

| When | What happened | OAK |
|---|---|---|
| 2025-04-17 | EigenLayer announces slashing live on Ethereum mainnet, with Unique Stake Allocation and Operator Sets ([source](https://www.eigenlabs.org/blog/slashing-goes-live/)) | — |
| After 2025-04-17 | Any slashing event or exploit: undisclosed in the opened source | — |

Key addresses: none published on the opened page.

## Root-cause evidence

- **Technique:** none — a protocol release, not an attack
- **Source:** <https://www.eigenlabs.org/blog/slashing-goes-live/>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** The operator's own post establishes that slashing was enabled and what it does. It establishes no loss. Whether any AVS later slashed an Operator is not covered by an opened source.

## Public references

- EigenLayer (EigenCloud blog), "Slashing Goes Live on Mainnet" (2025-04-17): <https://www.eigenlabs.org/blog/slashing-goes-live/>
