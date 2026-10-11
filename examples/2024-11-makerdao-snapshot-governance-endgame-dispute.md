# MakerDAO / Sky brand-retention poll — vote dominated by four entities — Ethereum — 2024-11

**Loss:** structural — no direct dollar extraction. The documented issue is governance concentration: in the November 2024 poll on whether to keep the Sky brand for the backend protocol, nearly 80% of the vote share favoured keeping it, and four entities (each with roughly 20% of the vote) accounted for almost all of that support, out of about 20 voting entities (The Block, 2024-11-07).
**OAK Techniques observed:** **OAK-T16.004** (Snapshot / Off-chain Voting Exploitation — retained as filed, but the fit is weak: the sources describe a MakerDAO governance poll, not a Snapshot vote, and do not report any exploit, voter-eligibility dispute, or binding-vs-signal controversy; it is better read as a vote-concentration observation).
**Attribution:** **unattributed** — structural / governance-design-level. No attacker is involved.

**Corrected 2026-10-11:** Removed the unsupported claim that a Snapshot signal-vote was treated as binding for a multi-billion-dollar Endgame restructuring and the voter-eligibility dispute; the documented Nov 2024 event is a poll to keep the Sky brand that passed with ~80% and was dominated by four entities.

**Key teaching point:** **A governance poll can show a lopsided result while resting on very few voters.** In the Sky brand-retention poll, a handful of large holders delivered nearly all of the support, so the headline percentage said little about broad community consensus. Evaluators of DAO governance should report voter counts and top-holder shares alongside outcome percentages.

## Summary

In September 2024 MakerDAO rebranded its backend protocol toward Sky. After community backlash, a poll in November 2024 asked whether to keep "the Sky brand as the backend protocol brand." The Block reported on 2024-11-07 (updated 2024-11-08) that nearly 80% of the vote share favoured keeping the brand, that roughly 20 entities voted, and that four entities each held about 20% of the vote and accounted for almost all the support; one large entity opposed. MakerDAO voted to maintain the rebrand. Founder Rune Christensen said the focus would be growing USDS adoption, and proposed making SKY deflationary; there were no plans to permanently deprecate DAI or MKR. The sources reviewed do not state whether the poll was binding.

Earlier versions of this file described a Snapshot signal-vote treated as binding for the multi-billion-dollar Endgame restructuring, with a voter-eligibility dispute. None of the sources reviewed support that framing, and it has been removed.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-09 | MakerDAO rebrand toward Sky voted through | (context) |
| 2024-11 | Poll on keeping the Sky brand; ~80% in favour, ~20 voting entities, four entities supply nearly all support | T16.004 (concentration; weak fit) |
| 2024-11-07 | The Block reports the vote concentration | (disclosure) |

## What defenders observed

- **Concentration is visible on-chain.** The four-entity dominance was reported from public voting data, so voter-count and top-holder metrics are cheap monitoring signals for any DAO poll.
- **Outcome percentage alone misleads.** An ~80% result from about 20 voters, four of whom decide the outcome, is a governance-capture signal rather than evidence of consensus.

## What this example tells contributors writing future Technique pages

- **Do not file ordinary governance polls as Snapshot exploitation without evidence of manipulation.** This case documents concentration, not an attack.
- **Source the voting venue.** Confirm whether a vote ran on Snapshot or on the protocol's own governance system before applying T16.004.

## Public references

- `[theblockmaker2024]` — The Block, "Just four entities account for nearly all the votes to keep MakerDAO's rebranding to Sky" (2024-11-07): <https://www.theblock.co/post/325096/just-four-entities-account-for-nearly-all-the-votes-to-keep-makerdaos-rebranding-to-sky>
- `[cointelegraphsky2024]` — Cointelegraph, "Sky whales kill plan to rebrand DeFi protocol Maker" (2024-11): <https://cointelegraph.com/news/sky-whales-kill-plan-rebrand-defi-protocol-maker> (title as reported; The Block reports the rebrand was maintained)

## Discussion

This example is retained as a low-confidence T16.004 anchor: it shows vote concentration in a high-profile DAO poll, but it is not evidence of a Snapshot-specific exploit or a binding-status dispute.
