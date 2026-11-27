# Polymarket — "Ukraine agrees to Trump mineral deal before April?" resolved YES by UMA vote, alleged whale vote capture — 2025-03

**Loss:** About \$7M wagered on the market ([The Block](https://www.theblock.co/post/348171/polymarket-says-governance-attack-by-uma-whale-to-hijack-a-bets-resolution-is-unprecedented), [CoinDesk](https://www.coindesk.com/markets/2025/03/27/polymarket-uma-communities-lock-horns-after-usd7m-ukraine-bet-resolves)). No funds were drained. Holders of NO lost their stakes, and Polymarket declined refunds because the outcome "wasn't a market failure" ([The Block](https://www.theblock.co/post/348171/polymarket-says-governance-attack-by-uma-whale-to-hijack-a-bets-resolution-is-unprecedented)).

**OAK Techniques observed:** **OAK-T9.006.001** (DVM vote capture), as an allegation. Named analysts with figures say one large UMA holder swung the vote ([Cointelegraph](https://cointelegraph.com/news/polymarket-trump-ukraine-bet-whale-governance-attack), [crypto.news](https://crypto.news/polymarket-suffers-governance-attack-due-to-uma-whale-intervention)). Polymarket did not confirm it, and a Polymarket user disputes it (see Root-cause evidence).

**Attribution:** **unattributed.** No opened page identifies the voter or ties the voter's wallets to a position in the market.

**Key teaching point:** **When a market on a government act is settled by token-weighted vote, the vote tally and the voters' positions in the market need to be public before settlement.** Here the vote tally rests on figures posted by two accounts, which the operator did not confirm, and no page shows who voted or what they held.

## Summary

The market asked "Ukraine agrees to Trump mineral deal before April?" Its price moved from 9% to 100% yes between March 24 and 25, 2025, and it resolved yes although Ukraine had not officially agreed to the deal ([The Block](https://www.theblock.co/post/348171/polymarket-says-governance-attack-by-uma-whale-to-hijack-a-bets-resolution-is-unprecedented)). Polymarket had earlier said it was too early to resolve the market (same page). A dispute is settled by a vote of UMA token holders ([CoinDesk](https://www.coindesk.com/markets/2025/03/27/polymarket-uma-communities-lock-horns-after-usd7m-ukraine-bet-resolves)).

Two named accounts gave figures. Crypto threat researcher Vladimir S. (X handle @officer_cia), on March 26, said the whale "cast 5 million tokens through three accounts, accounting for 25% of the total votes" ([Cointelegraph](https://cointelegraph.com/news/polymarket-trump-ukraine-bet-whale-governance-attack)). Wu Blockchain posted the same numbers: "The tycoon cast 5 million tokens through three accounts, accounting for 25% of the total votes"; the crypto.news article itself describes the share as 25% of the "YES" votes, so the base differs between the post and the article ([crypto.news](https://crypto.news/polymarket-suffers-governance-attack-due-to-uma-whale-intervention)). [CryptoSlate](https://cryptoslate.com/polymarket-faces-backlash-over-resolving-disputed-7-million-trump-ukraine-market/) attributes the concentration claim to Wu Blockchain and calls it unverified. [CoinDesk](https://www.coindesk.com/markets/2025/03/27/polymarket-uma-communities-lock-horns-after-usd7m-ukraine-bet-resolves) and [The Block](https://www.theblock.co/post/348171/polymarket-says-governance-attack-by-uma-whale-to-hijack-a-bets-resolution-is-unprecedented) give no token, wallet or vote-share figures. No opened page gives wallet addresses.

Polymarket's moderator said the market "resolved against the expectations of our users and our clarification" and "because this wasn't a market failure, we are not able to issue refunds" ([Cointelegraph](https://cointelegraph.com/news/polymarket-trump-ukraine-bet-whale-governance-attack)). The Block's body says Polymarket was aware of the alleged governance attack and called it an unprecedented situation; the headline attributes the words "governance attack" to Polymarket, which the body does not support ([The Block](https://www.theblock.co/post/348171/polymarket-says-governance-attack-by-uma-whale-to-hijack-a-bets-resolution-is-unprecedented)).

A Polymarket user, Tenadome, disputed that anyone manipulated the oracle: the voters were "the same UMA whales who vote in every dispute", largely affiliated with the UMA team and not trading on Polymarket, and the outcome came from negligence ([Cointelegraph](https://cointelegraph.com/news/polymarket-trump-ukraine-bet-whale-governance-attack)). The earlier version of this file said the three wallets also held large YES positions, that Polymarket and CoinDesk had run a voter-position analysis, and that UMA's market cap was about \$95M; none of that is on an opened page, so it is removed. A search snippet that said top NO voters were deeply exposed was not opened and is not used.

Other Polymarket markets settled by UMA vote are in [`2025-07-polymarket-zelenskyy-suit.md`](2025-07-polymarket-zelenskyy-suit.md) and [`2025-12-polymarket-ufo-declassification-disputed-uma-resolution.md`](2025-12-polymarket-ufo-declassification-disputed-uma-resolution.md); neither opened source for those shows vote tallies.

## Timeline (UTC)

| When | What happened | OAK |
|---|---|---|
| 2025-03 (date undisclosed) | Market "Ukraine agrees to Trump mineral deal before April?" is open; Polymarket says it is too early to resolve the market ([The Block](https://www.theblock.co/post/348171/polymarket-says-governance-attack-by-uma-whale-to-hijack-a-bets-resolution-is-unprecedented)) | none: standing market |
| 2025-03-24 to 2025-03-25 | Price moves from 9% to 100% yes ([The Block](https://www.theblock.co/post/348171/polymarket-says-governance-attack-by-uma-whale-to-hijack-a-bets-resolution-is-unprecedented), [CoinDesk](https://www.coindesk.com/markets/2025/03/27/polymarket-uma-communities-lock-horns-after-usd7m-ukraine-bet-resolves)); a holder allegedly casts 5 million UMA through three accounts, 25% of votes ([Cointelegraph](https://cointelegraph.com/news/polymarket-trump-ukraine-bet-whale-governance-attack)). Hour and wallets undisclosed | OAK-T9.006.001 (alleged) |
| 2025-03-25 | Market settles yes ([Cointelegraph](https://cointelegraph.com/news/polymarket-trump-ukraine-bet-whale-governance-attack), [CryptoSlate](https://cryptoslate.com/polymarket-faces-backlash-over-resolving-disputed-7-million-trump-ukraine-market/)) | OAK-T9.006.001 (alleged) |
| 2025-03-26 | Researcher and Wu Blockchain post the vote figures; Polymarket posts in Discord that it will not refund and will build monitoring ([Cointelegraph](https://cointelegraph.com/news/polymarket-trump-ukraine-bet-whale-governance-attack), [crypto.news](https://crypto.news/polymarket-suffers-governance-attack-due-to-uma-whale-intervention)) | response |

Key addresses:

- None published on the opened pages. Funds were not stolen; no fund flow applies.

## Root-cause evidence

- **Technique:** OAK-T9.006.001 (alleged)
- **Source:** <https://cointelegraph.com/news/polymarket-trump-ukraine-bet-whale-governance-attack>; <https://crypto.news/polymarket-suffers-governance-attack-due-to-uma-whale-intervention>; <https://www.theblock.co/post/348171/polymarket-says-governance-attack-by-uma-whale-to-hijack-a-bets-resolution-is-unprecedented>
- **Source type:** news
- **Confidence:** disputed
- **Evidence:** Two named accounts report that one holder cast 5 million UMA through three accounts, 25% of votes, and used it to settle the market. Neither shows vote logs or wallets, CryptoSlate calls the claim unverified, Polymarket confirmed only that the result went against its own clarification, and a Polymarket user says the voters were the usual UMA voters. The mechanism is alleged, not established.

## Public references

- [The Block, "Polymarket says governance attack by UMA whale to hijack a bet's resolution is 'unprecedented'"](https://www.theblock.co/post/348171/polymarket-says-governance-attack-by-uma-whale-to-hijack-a-bets-resolution-is-unprecedented) (2025-03-26, updated 2025-03-27).
- [CoinDesk, "Polymarket, UMA Communities Lock Horns After $7M Ukraine Bet Resolves 'Incorrectly'"](https://www.coindesk.com/markets/2025/03/27/polymarket-uma-communities-lock-horns-after-usd7m-ukraine-bet-resolves) (2025-03-27).
- [Cointelegraph, "Polymarket faces scrutiny over $7M Ukraine mineral deal bet"](https://cointelegraph.com/news/polymarket-trump-ukraine-bet-whale-governance-attack) (2025-03-26).
- [crypto.news, "Polymarket suffers governance attack due to UMA whale intervention"](https://crypto.news/polymarket-suffers-governance-attack-due-to-uma-whale-intervention) (2025-03-26).
- [CryptoSlate, "Polymarket faces backlash over resolving disputed $7 million Trump-Ukraine market"](https://cryptoslate.com/polymarket-faces-backlash-over-resolving-disputed-7-million-trump-ukraine-market/) (2025-03-26).
