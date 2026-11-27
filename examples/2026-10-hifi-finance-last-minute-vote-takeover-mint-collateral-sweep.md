# Hifi Finance — four last-minute votes took over the DAO, 25M governance tokens were minted and user collateral was swept — Hifi Finance / Ethereum — 2026-10-28

**Loss:** **~\$1M** in user collateral per the on-chain researcher spreekaway ([post](https://x.com/spreekaway/status/2115570707463868782)), most of it an RWA token. The Hifi team's own estimate is **~\$20,000**, final figure unconfirmed ([TokenPost](https://www.tokenpost.com/news/technology/45256)). The two figures are unreconciled.

**OAK Techniques observed:** **OAK-T16.002** (Hostile Vote / Treasury Drain — *primary*. Per [spreekaway](https://x.com/spreekaway/status/2115570707463868782) the DAO "has been taken over by 4 last minute votes funded by tornado cash"; the attacker then minted 25M new governance tokens and swept user collateral. See [`techniques/T16.002-hostile-vote-treasury-drain.md`](../techniques/T16.002-hostile-vote-treasury-drain.md)). The proposal and contract path are not published. Funding of the voting wallets through Tornado Cash is preparation, not a laundering hop, so no mixer-hop Technique is declared.

**Attribution:** **pseudonymous**; the address that voted was funded through Tornado Cash, per [spreekaway](https://x.com/spreekaway/status/2115570707463868782) and [CryptoTicker](https://cryptoticker.io/en/hifi-finance-governance-attack/).

**Key teaching point:** **A low-turnout DAO is for sale at the price of its quorum.** The [TOP](2026-06-token-of-power-top-low-float-governance-takeover-mint.md) takeover in June had the same shape; late-vote monitoring and a timelock long enough for depositors to exit are the controls.

## Summary

On 2026-10-28 spreekaway reported that Hifi Finance had been taken over by four votes cast late, funded through Tornado Cash; the attacker minted 25M governance tokens and swept user collateral ([post](https://x.com/spreekaway/status/2115570707463868782)). CryptoTicker describes the votes as landing in the closing phase of a ballot already under way and says the loss figure rests on a single analyst's assessment ([CryptoTicker](https://cryptoticker.io/en/hifi-finance-governance-attack/)). On 2026-10-30 the Hifi team said the DAO had suffered a governance takeover, that holders had no practical control of the lending system, governance contract or token supply, that it had not detected or stopped it in time, and that it estimated losses at about \$20,000; it urged users to withdraw collateral and said the core team would manage the outstanding RWA-collateral debt directly ([TokenPost](https://www.tokenpost.com/news/technology/45256)).

## Timeline (UTC)

No source gives transaction hashes, addresses or times for the votes.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-28 (undisclosed) | Governance is exposed to a late-vote takeover; the proposal and contract path are not published. | — |
| Before the vote (undisclosed) | An address is funded through four transfers financed via Tornado Cash ([TokenPost](https://www.tokenpost.com/news/technology/43138), [CryptoTicker](https://cryptoticker.io/en/hifi-finance-governance-attack/)). | — |
| 2026-10-28 (time undisclosed) | Four last-minute votes pass a proposal and give the attacker control of the DAO ([spreekaway](https://x.com/spreekaway/status/2115570707463868782)). | **T16.002** |
| 2026-10-28 (time undisclosed) | The attacker mints 25M governance tokens and moves user collateral, about \$1M per spreekaway, most of it an RWA token ([spreekaway](https://x.com/spreekaway/status/2115570707463868782)). | **T16.002** |
| After the sweep | Where the collateral went is undisclosed; no addresses or hashes are given in the opened sources. | — |
| 2026-10-28 22:25 | spreekaway posts the first public report ([post](https://x.com/spreekaway/status/2115570707463868782)). | response |
| 2026-10-30 | Hifi team statement: takeover acknowledged, loss estimated at about \$20,000, users urged to withdraw collateral, DAO-owned DEX liquidity withdrawn, core team to manage RWA-backed debt directly and issue no new loans, repayment expected at maturity on 2027-03-26 ([TokenPost](https://www.tokenpost.com/news/technology/45256)). | response |

Key addresses:

- None published in the opened sources (full addresses undisclosed). The team asked controllers of two related addresses to withdraw WETH from the protocol, per a search summary of its post; the post itself returned 403 and the addresses are not on an opened page.

## Root-cause evidence

- **Technique:** OAK-T16.002
- **Source:** <https://x.com/spreekaway/status/2115570707463868782>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** spreekaway's post describes the late votes, Tornado funding, the 25M mint and the collateral sweep. The Hifi team confirms a governance takeover but gives no mechanism detail and a much lower loss estimate; a full investigation report was promised and is not yet opened.

## Public references

- spreekaway on X (2026-10-28): <https://x.com/spreekaway/status/2115570707463868782>
- CryptoTicker (2026-10-30): <https://cryptoticker.io/en/hifi-finance-governance-attack/>
- TokenPost, spreekaway's account (2026-10-28): <https://www.tokenpost.com/news/technology/43138>
- TokenPost, Hifi team statement (2026-10-30): <https://www.tokenpost.com/news/technology/45256>
