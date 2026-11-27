# Compound — Proposal 289 passed a 499,000 COMP treasury allocation to the Golden Boys' goldCOMP vault over DAO objections, then was cancelled before any transfer — Compound / Ethereum — 2024-07-28

**Loss:** **\$0.** Proposal 289 would have allocated **499,000 COMP (about \$24M at the time, 5% of the Compound treasury)** to a yield-bearing vault run by the "Golden Boys" for one year ([The Block](https://www.theblock.co/post/307943/24-million-compound-finance-proposal-passed-by-whale-over-dao-objections)). It passed on 2024-07-28 and was cancelled, so nothing moved ([Rekt](https://rekt.news/the-humpy-dance)). [Cointelegraph](https://cointelegraph.com/news/golden-boys-behind-compound-governance-attack-agree-to-rescind-proposal) puts the amount at about \$25M. COMP fell nearly 7% in the 24 hours after the vote ([The Block](https://www.theblock.co/post/307943/24-million-compound-finance-proposal-passed-by-whale-over-dao-objections)).

**OAK Techniques observed:** **OAK-T16.002** (Hostile-Vote Treasury Drain — *primary, reported; whether this was an attack is disputed*). A voting bloc that bought COMP on the open market, according to Compound security advisor Michael Lewellen as relayed by [The Block](https://www.theblock.co/post/307943/24-million-compound-finance-proposal-passed-by-whale-over-dao-objections), pushed through a proposal sending treasury COMP to a vault whose divestment only the bloc's multisig controls ([Rekt](https://rekt.news/the-humpy-dance)). The proponents deny stealing and say the funds move through a "Trust Setup" with constrained actions. See [`techniques/T16.002-hostile-vote-treasury-drain.md`](../techniques/T16.002-hostile-vote-treasury-drain.md). No source shows a flash loan, a delegation-cluster takeover or a flaw in the Governor contract, so T9.003, T16.001 and T16.003 are not claimed.

**Attribution:** **pseudonymous** — the proposals came from the on-chain identity known as Humpy and the Golden Boys group ([Rekt](https://rekt.news/the-humpy-dance), [The Block](https://www.theblock.co/post/307943/24-million-compound-finance-proposal-passed-by-whale-over-dao-objections)). No source documents wrongdoing beyond the contested governance conduct, and no legal action is reported.

**Key teaching point:** **A DAO that lets a bloc of voters pass a transfer of treasury funds to a vault only that bloc can recall needs a veto or a cancel path that does not depend on the same voters.** Here the vote passed 682,191 to 633,636 with 57 voting addresses ([Rekt](https://rekt.news/the-humpy-dance)), and the exit was a negotiated cancellation, not a protocol control.

## Summary

Humpy first proposed putting 5% of the Compound treasury (92,000 COMP) into goldCOMP in Proposal 247 on 2024-05-06. It failed after community rejection and was cancelled on 2024-05-10 with a promise of a "Trust Setup". Proposal 279, carrying that setup, failed on 2024-07-19 ([Rekt](https://rekt.news/the-humpy-dance)). Proposal 289 raised the request to 499,000 COMP and passed on Sunday 2024-07-28, 682,191 to 633,636 ([The Block](https://www.theblock.co/post/307943/24-million-compound-finance-proposal-passed-by-whale-over-dao-objections)). Lewellen said the Golden Boys' conduct could be considered a governance attack if they persisted in taking funds against the will of other delegates. Wintermute Governance said only the GoldenBoyzMultisig controls divestment. The Compound side answered with Proposal 290, which would transfer the Timelock Admin to a community multisig. On 2024-07-29 Proposals 289 and 290 were both cancelled and a staking product was launched ([Rekt](https://rekt.news/the-humpy-dance)). Cointelegraph reports that as of 2024-07-30 Humpy had agreed to rescind 289 in exchange for a staking product that would distribute 30% of existing and future market reserves to COMP stakers ([Cointelegraph](https://cointelegraph.com/news/golden-boys-behind-compound-governance-attack-agree-to-rescind-proposal)).

## Timeline (UTC)

**Entry**: a failed proposal and a repeat attempt. **Preparation**: delegations and COMP purchases the sources describe. **Execution**: the vote. **Money**: nothing moved. **Response**: the counter-proposal and the cancellation. The sources give dates, not times, except where stated.

| When | What happened | OAK |
|---|---|---|
| 2024-04-29 to 05-02 | Suspicious COMP delegations from Bybit hot wallets are identified; Rekt says they are not directly linked to the Golden Boys ([Rekt](https://rekt.news/the-humpy-dance)). | — |
| 2024-05-06 | Humpy proposes investing 92,000 COMP (5% of the treasury) in goldCOMP, Proposal 247; it fails. Cancelled 2024-05-10 with a promise of a Trust Setup ([Rekt](https://rekt.news/the-humpy-dance)). | T16.002 |
| 2024-07-19 | Proposal 279, carrying the Trust Setup, is submitted and fails ([Rekt](https://rekt.news/the-humpy-dance)). | T16.002 |
| 2024-07-25 or 07-28 | Proposal 289 voting starts: The Block says voting began on Thursday at 11:40 PM and ran through the weekend; Rekt says the proposal was submitted on 07-28 ([The Block](https://www.theblock.co/post/307943/24-million-compound-finance-proposal-passed-by-whale-over-dao-objections), [Rekt](https://rekt.news/the-humpy-dance)). The sources disagree and the Thursday date is not printed. | T16.002 |
| 2024-07-28 | Proposal 289 passes 682,191 to 633,636; only 57 addresses vote ([Rekt](https://rekt.news/the-humpy-dance)). Lewellen links accounts that bought COMP on the open market to the goldCOMP proposals ([The Block](https://www.theblock.co/post/307943/24-million-compound-finance-proposal-passed-by-whale-over-dao-objections)). | **T16.002** |
| 2024-07-28 | Proposal 290, to move the Timelock Admin to a Compound community multisig, is submitted ([Rekt](https://rekt.news/the-humpy-dance)). | response |
| after 2024-07-28 | Funds: none transferred. No transaction hashes or addresses for any treasury movement exist, because none occurred. | — |
| 2024-07-29 | Proposals 289 and 290 are cancelled and the staking product launched ([Rekt](https://rekt.news/the-humpy-dance)). | response |
| 2024-07-30 | Humpy reported to have agreed to rescind 289 for the staking product; the offer was posted by the Compound growth team CEO ([Cointelegraph](https://cointelegraph.com/news/golden-boys-behind-compound-governance-attack-agree-to-rescind-proposal)). | response |

Key addresses (full, as printed by [Rekt](https://rekt.news/the-humpy-dance)):

- Trust Setup contract — [`0xb9259d9f2249eb7fb44140926bfd376b63c4925e`](https://etherscan.io/address/0xb9259d9f2249eb7fb44140926bfd376b63c4925e)
- Donation address given in the article — [`0x3C5c2F4bCeC51a36494682f91Dbc6cA7c63B514C`](https://etherscan.io/address/0x3C5c2F4bCeC51a36494682f91Dbc6cA7c63B514C)

The GoldenBoyzMultisig address is not printed on the pages opened.

## Root-cause evidence

- **Technique:** OAK-T16.002
- **Source:** <https://www.theblock.co/post/307943/24-million-compound-finance-proposal-passed-by-whale-over-dao-objections>; <https://rekt.news/the-humpy-dance>; <https://cointelegraph.com/news/golden-boys-behind-compound-governance-attack-agree-to-rescind-proposal>
- **Source type:** news
- **Confidence:** disputed
- **Evidence:** The Block, Rekt and Cointelegraph agree on the vote, the amount and the cancellation. They do not agree on whether it was an attack: Lewellen and Wintermute call it a possible governance attack, while Humpy says the funds move under a constrained Trust Setup. No on-chain proof of how the votes were assembled is on the pages opened (Rekt names only suspicious Bybit-wallet delegations in spring 2024, not linked to the bloc). The Compound governance page for the proposal was not opened.

## Public references

- The Block, "\$24 million Compound Finance proposal passed by whale over DAO objections" (2024-07-28): <https://www.theblock.co/post/307943/24-million-compound-finance-proposal-passed-by-whale-over-dao-objections>
- Rekt, "The Humpy Dance" (2024-07-30): <https://rekt.news/the-humpy-dance>
- Cointelegraph, "'Golden Boys' behind Compound 'governance attack' agree to rescind proposal" (2024-07-30): <https://cointelegraph.com/news/golden-boys-behind-compound-governance-attack-agree-to-rescind-proposal>
