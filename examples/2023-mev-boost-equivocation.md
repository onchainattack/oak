# MEV-Boost relay equivocation attack surface — Ethereum — 2023

**Loss:** Over \$20M profit to a malicious proposer, taken from a sandwiching searcher, in slot 6137846 on 2023-04-02 `[neuder2023]`. Other analyses cited in secondary coverage give figures between \$20M and \$30M and date it 2023-04-02 or 04-03; the Flashbots disclosure refers to "\$20m+" in losses for sandwich bots `[flashbots2023]`.
**OAK Techniques observed:** **OAK-T14.002** (MEV-Boost Relay Attack) — canonical anchor. A malicious proposer exploited the proposer-relay trust boundary: the relay did not validate the proposer's signed header and returned the block body before it was published to the p2p layer, so the proposer could unbundle the searcher's transactions `[neuder2023]`.
**Attribution:** **pseudonymous** — the discloser later identified themselves to Flashbots-linked researchers as "low carb crusader" and said they were responsible for the earlier equivocations `[flashbots2023]`; no real-world identity is stated in the cited sources.
**Corrected 2026-10-11:** the file claimed no realized extraction and an unattributed, theoretical surface; sources document a realized attack in April 2023 (over \$20M) by a proposer who later self-identified pseudonymously, and a second strategy that was never used in production.

**Key teaching point:** MEV-Boost's proposer-builder separation introduces a relay trust boundary that did not exist in the base Ethereum protocol. The relay sees the builder's block body before the proposer's commitment is final, creating an equivocation surface: a malicious proposer can sign a header, obtain the body, and publish a different block that extracts the same value. The 2023-04-02 attack was patched at the relay, but the authors note a more general equivocation attack remains possible `[neuder2023]`.

## Summary

MEV-Boost is the dominant proposer-builder separation (PBS) architecture on Ethereum post-Merge. Builders construct blocks, relays withhold the block body and send the proposer a header, and after the proposer signs the header the relay reveals the body.

On 2023-04-02 (slot 6137846), a malicious proposer used the relay to unbundle a sandwiching searcher's transactions for a profit of over \$20M. Two relay weaknesses enabled it: the relay did not check that the proposer's signed header was valid, and it returned the block body to the proposer before publishing it to the p2p layer. Relay commits adding header-validity checks and reordering body release fixed the attack as executed `[neuder2023]`.

On 2023-04-21 the discloser ("low carb crusader") reported a second strategy: relays let proposers call getPayload before their slot began, letting a proposer see the block contents and race the relay's block (at the cost of being slashed). Flashbots deployed a patch to mainnet around 10:50 UTC on 2023-04-23, and its relay logs confirm the strategy was never used in production `[flashbots2023]`.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-04-02 | Malicious proposer unbundles a sandwiching searcher via the relay in slot 6137846; over \$20M profit `[neuder2023]` | T14.002 |
| 2023-04-18 | Francesco d'Amato and Mike Neuder publish their analysis of the attack and the relay fixes `[neuder2023]` | (public analysis) |
| 2023-04-21 | Discloser contacts Flashbots-linked researchers about a second equivocation strategy `[flashbots2023]` | T14.002 |
| 2023-04-23 | Flashbots deploys the early-getPayload mitigation to mainnet; other relays follow over the next hours to days `[flashbots2023]` | (mitigation) |

## Public references

- `[neuder2023]` — d'Amato and Neuder, "Analysis of equivocation attacks in Ethereum's mev-boost and ePBS systems" (2023-04-18): <https://notes.ethereum.org/@mikeneuder/B1VIDkXG2>
- `[flashbots2023]` — Flashbots Collective, "Disclosure: mitigation of block equivocation strategy with early getPayload() calls for proposers": <https://collective.flashbots.net/t/disclosure-mitigation-of-block-equivocation-strategy-with-early-getpayload-calls-for-proposers/1705>
- Cross-reference: `examples/2023-mev-boost-equivocation.md`.
