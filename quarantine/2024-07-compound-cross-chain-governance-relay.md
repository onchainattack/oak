> **QUARANTINED 2026-11-27 — not part of the OAK corpus.** The 2026-11 source pass rewrote this file from the pages it could open and found no attack to record: its one source is a 2023 pre-deployment audit of Compound's Polygon bridge receiver, which reports no exploit. It is kept here, outside `examples/`, and can return if a source documents an incident.

# Compound — pre-deployment audit of the Polygon bridge receiver that relays governance from Ethereum — Compound / Ethereum, Polygon — 2023-02-17 (audit, no incident)

**Loss:** **\$0.** This is an audit, not an incident. [OpenZeppelin's report](https://www.openzeppelin.com/news/compound-polygon-bridge-receiver-audit) does not report any exploit against the contracts.

**OAK Techniques observed:** none — no theft, exploit or fraud is described. The audit covers `BaseBridgeReceiver.sol`, `PolygonBridgeReceiver.sol`, `FxChild.sol`, `Timelock.sol` and `ITimelock.sol` at a commit of `compound-finance/comet` and lists no critical or high finding ([OpenZeppelin](https://www.openzeppelin.com/news/compound-polygon-bridge-receiver-audit)). The cross-chain governance relay Technique is not claimed.

**Attribution:** **unattributed** — no attacker.

**Key teaching point:** **When governance is relayed to another chain, check before deployment that a queued action can still be cancelled on the destination chain.** The audit's medium finding is that proposals cannot be cancelled once enqueued on the L2, and the Compound team wrote that it accepted this ([OpenZeppelin](https://www.openzeppelin.com/news/compound-polygon-bridge-receiver-audit)).

## Summary

OpenZeppelin Security published on 2023-02-17 a pre-deployment review of Compound's Polygon Bridge Receiver, which relays governance proposals from Ethereum mainnet to Polygon. It lists 14 issues: 0 critical, 0 high, 2 medium, 7 low and 5 notes. One medium issue is that `localTimelock` can be set incorrectly and make the receiver inoperable (resolved in PR 665). The other is that proposals cannot be cancelled once enqueued on the L2, which the Compound team acknowledged without resolving. The report cites a 2022 Polygon Heimdall outage only as an example of bridge downtime blocking corrective action ([OpenZeppelin](https://www.openzeppelin.com/news/compound-polygon-bridge-receiver-audit)).

The filename and earlier text point at July 2024. The July 2024 Compound governance event, Proposal 289 on goldCOMP, is a different matter: a vote on a treasury allocation, not a cross-chain relay ([2024-07-compound-vote-takeover](2024-07-compound-vote-takeover.md)). No page opened ties it to the receiver audit.

## Timeline (UTC)

**Flaw**: design risk found in review. **Take**, **Money**: none. **Response**: fixes and acknowledgement. The page gives a date, not a time.

| When | What happened | OAK |
|---|---|---|
| Before 2023-02-17 (undisclosed) | Compound's Polygon receiver is under review before deployment ([OpenZeppelin](https://www.openzeppelin.com/news/compound-polygon-bridge-receiver-audit)). | none — audit |
| 2023-02-17 | OpenZeppelin publishes the audit: 14 issues, 2 medium ([OpenZeppelin](https://www.openzeppelin.com/news/compound-polygon-bridge-receiver-audit)). | none — audit |
| 2023-02-17 | Compound resolves the `localTimelock` issue in PR 665 and accepts that enqueued L2 transactions cannot be cancelled ([OpenZeppelin](https://www.openzeppelin.com/news/compound-polygon-bridge-receiver-audit)). | response |
| after 2023-02-17 | Funds: none lost; no address or transaction involved. | — |

Key addresses: none. The audit is of source code at a repository commit, and no deployed address is printed on the page opened.

## Root-cause evidence

- **Technique:** none — audit finding, no attack.
- **Source:** <https://www.openzeppelin.com/news/compound-polygon-bridge-receiver-audit>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** OpenZeppelin's report lists the findings and the Compound team's responses and reports no exploit. Nothing opened ties the audit to any 2024 event.

## Public references

- OpenZeppelin, "Compound Polygon Bridge Receiver Audit" (2023-02-17): <https://www.openzeppelin.com/news/compound-polygon-bridge-receiver-audit>
- Sibling entry for the July 2024 vote: [2024-07-compound-vote-takeover](2024-07-compound-vote-takeover.md)
