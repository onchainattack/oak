> **QUARANTINED 2026-11-27 — not part of the OAK corpus.** The 2026-11 source pass rewrote this file from the pages it could open and found no attack to record: the sources describe a governance vote in which four holders cast most of the winning side; the team called it an on-chain vote and no manipulation is alleged. It is kept here, outside `examples/`, and can return if a source documents an incident.

# MakerDAO / Sky brand poll — vote concentrated in four entities — 2024-11

**Loss:** none — no theft, exploit or manipulation is reported. The documented point is vote concentration: [The Block](https://www.theblock.co/post/325096/just-four-entities-account-for-nearly-all-the-votes-to-keep-makerdaos-rebranding-to-sky) reports that only four of the roughly 20 entities that voted accounted for almost all of the vote share.
**OAK Techniques observed:** none — the pages describe a governance poll with concentrated voting power, not an attack; no source reports a Snapshot (off-chain) vote, manipulation or a loss.
**Attribution:** **unattributed** — no attacker.

**Key teaching point:** A lopsided poll result can rest on very few voters. Report voter counts and top-holder shares next to outcome percentages when assessing DAO governance. This is a governance-design observation, not an incident.

## Summary

In November 2024 MakerDAO ran a poll on whether to keep the Sky brand as the backend protocol brand. [The Block](https://www.theblock.co/post/325096/just-four-entities-account-for-nearly-all-the-votes-to-keep-makerdaos-rebranding-to-sky) (2024-11-07, updated 2024-11-08) reports that nearly 80% of the vote share went to keeping the brand, that roughly 20 entities voted, that four of them each took roughly 20% of the vote, and that one large entity voted against. It says MakerDAO voted to maintain its recent rebrand. The Block does not say whether the poll ran on Snapshot or on-chain, or whether it was binding.

[Cointelegraph](https://cointelegraph.com/news/sky-whales-kill-plan-rebrand-defi-protocol-maker) describes the vote as dominated by a handful of whales and reports about 79% for keeping the Sky brand (63,874 MKR) and about 18.5% for a limited Maker brand refresh (14,864 MKR); it reports four whales held 62,452 MKR, about 98% of the MKR pledged for Sky. It quotes the Sky team calling it an onchain vote. Neither page alleges manipulation or an attack.

An earlier version of this file described a Snapshot signal vote treated as binding for an Endgame restructuring and a voter-eligibility dispute. No opened page supports that, and it was removed.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-11-04 | Poll on keeping the Sky brand opens ([Cointelegraph](https://cointelegraph.com/news/sky-whales-kill-plan-rebrand-defi-protocol-maker)) | none — governance poll, not an attack |
| 2024-11-07 | The Block reports the concentration: nearly 80% in favour, about 20 voters, four entities supply almost all of it ([The Block](https://www.theblock.co/post/325096/just-four-entities-account-for-nearly-all-the-votes-to-keep-makerdaos-rebranding-to-sky)) | none |
| 2024-11-08 | Result announced; the Sky brand is kept ([Cointelegraph](https://cointelegraph.com/news/sky-whales-kill-plan-rebrand-defi-protocol-maker)) | none |

Funds: none moved; no loss reported.

## Key addresses

None published on the opened pages.

## Root-cause evidence

- **Technique:** none — a governance poll with concentrated voting power; no attack reported
- **Source:** <https://www.theblock.co/post/325096/just-four-entities-account-for-nearly-all-the-votes-to-keep-makerdaos-rebranding-to-sky>; <https://cointelegraph.com/news/sky-whales-kill-plan-rebrand-defi-protocol-maker>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** both pages report voting power concentrated in a few large holders and neither alleges manipulation or an attack. The Block does not state the voting venue (Snapshot or on-chain) or binding status; Cointelegraph relays the team calling it an onchain vote.

## What defenders can take from it

- Voter-count and top-holder share are cheap metrics for any DAO poll; an outcome percentage alone says little about consensus.
- Confirm the voting venue before classifying a poll as off-chain voting.

## Public references

- The Block, "Just four entities account for nearly all the votes to keep MakerDAO's rebranding to Sky" (2024-11-07): <https://www.theblock.co/post/325096/just-four-entities-account-for-nearly-all-the-votes-to-keep-makerdaos-rebranding-to-sky>
- Cointelegraph, "Sky whales kill plan to rebrand DeFi protocol Maker" (2024-11-08): <https://cointelegraph.com/news/sky-whales-kill-plan-rebrand-defi-protocol-maker>
