# Cypher — contributor withdrew from the post-exploit redemption contract 36 times and gambled the funds — Cypher / Solana — 2024-05-14

**Loss:** about **\$260,000** by The Block's count at then-current prices (36 withdrawals of ETH, WSOL, BONK and other assets; [The Block](https://www.theblock.co/news/ecosystems/2024-05-14-cypher-protocol-contributor-admits-to-taking-and-gambling-funds-recovered-from-exploit-294459)). Other outlets give more: about \$300,000 sent to Binance ([CoinDesk](https://www.coindesk.com/business/2024/05/14/insider-at-solanas-cypher-protocol-admits-to-stealing-300k)), and \$314,674 sent to Binance plus \$184,077 more of assets in the same wallet ([Decrypt](https://decrypt.co/230757/solana-developer-confession-theft-cypher-protocol)). The sources differ on the total. No opened page reports any recovery. The redemption contract existed to repay users of the August 2023 Cypher exploit ([`2023-08-cypher.md`](2023-08-cypher.md)).

**OAK Techniques observed:** **OAK-T5.005** (Treasury-Management Exit — *primary, closest fit*). A core contributor withdrew from the redemption contract in 36 transactions ([The Block](https://www.theblock.co/news/ecosystems/2024-05-14-cypher-protocol-contributor-admits-to-taking-and-gambling-funds-recovered-from-exploit-294459)); this is operator-side abuse of retained authority rather than an external compromise. How the contributor held signing or withdrawal authority over the contract is undisclosed in the opened pages, so the fit is approximate. See [`techniques/T5.005-treasury-management-exit.md`](../techniques/T5.005-treasury-management-exit.md). The earlier T11 and T8.001 mappings had no source and are removed.

**Attribution:** **confirmed by the actor's own statement.** The contributor, a pseudonymous core developer, posted on X on 2024-05-14: "To address the elephant in the room, the allegations are true, I took the funds and gambled them away." ([The Block](https://www.theblock.co/news/ecosystems/2024-05-14-cypher-protocol-contributor-admits-to-taking-and-gambling-funds-recovered-from-exploit-294459), [Decrypt](https://decrypt.co/230757/solana-developer-confession-theft-cypher-protocol)). Another core contributor said he had contacted law enforcement ([The Block](https://www.theblock.co/news/ecosystems/2024-05-14-cypher-protocol-contributor-admits-to-taking-and-gambling-funds-recovered-from-exploit-294459)). None of The Block, Decrypt or CoinDesk reports an arrest, a charge or Department of Justice involvement, so none is claimed. This file does not name the individual.

**Key teaching point:** **A restitution fund needs the same controls as a treasury: withdrawals that need a second signer or a time delay, and an alert on every outflow.** Per [The Block](https://www.theblock.co/news/ecosystems/2024-05-14-cypher-protocol-contributor-admits-to-taking-and-gambling-funds-recovered-from-exploit-294459), the 36 withdrawals were found only after a user reported being unable to withdraw.

## Summary

After the August 2023 exploit, Cypher froze about \$600,000 of stolen funds on centralized exchanges and created a redemption contract for users ([The Block](https://www.theblock.co/news/ecosystems/2024-05-14-cypher-protocol-contributor-admits-to-taking-and-gambling-funds-recovered-from-exploit-294459)). A Discord user reported being unable to withdraw, and a core contributor then found the withdrawals (same article). On 2024-05-13 the contributor made the accusation public, saying the drain began in December and ran over several months ([CoinDesk](https://www.coindesk.com/business/2024/05/14/insider-at-solanas-cypher-protocol-admits-to-stealing-300k)). On 2024-05-14 the accused contributor confirmed it and attributed it to a gambling addiction ([The Block](https://www.theblock.co/news/ecosystems/2024-05-14-cypher-protocol-contributor-admits-to-taking-and-gambling-funds-recovered-from-exploit-294459), [CoinDesk](https://www.coindesk.com/business/2024/05/14/insider-at-solanas-cypher-protocol-admits-to-stealing-300k)).

## Timeline (UTC)

Stages: **Entry** (authority over the fund), **Take**, **Money**, **Response**. The opened pages give dates, not times, and no transaction hash or address; those are undisclosed.

| When | What happened | OAK |
|---|---|---|
| 2023-08 (after the exploit; date undisclosed) | Cypher freezes about \$600,000 on centralized exchanges and creates the redemption contract ([The Block](https://www.theblock.co/news/ecosystems/2024-05-14-cypher-protocol-contributor-admits-to-taking-and-gambling-funds-recovered-from-exploit-294459)). How withdrawal authority over it was set up is undisclosed | — |
| From December 2023 (per the accusing contributor, as relayed by CoinDesk) to 2024-05 | 36 withdrawals from the redemption contract of ETH, WSOL, BONK and other assets ([The Block](https://www.theblock.co/news/ecosystems/2024-05-14-cypher-protocol-contributor-admits-to-taking-and-gambling-funds-recovered-from-exploit-294459), [CoinDesk](https://www.coindesk.com/business/2024/05/14/insider-at-solanas-cypher-protocol-admits-to-stealing-300k)) | **T5.005** |
| Before 2024-05-14 (dates undisclosed) | Funds sent from a wallet associated with the contributor to Binance, per on-chain data cited by the accusing contributor ([CoinDesk](https://www.coindesk.com/business/2024/05/14/insider-at-solanas-cypher-protocol-admits-to-stealing-300k), [Decrypt](https://decrypt.co/230757/solana-developer-confession-theft-cypher-protocol)). The earlier claim that the proceeds went to a Solana gambling platform is not on these pages; the contributor says only that the funds were gambled away | — |
| Before 2024-05-13 | A Discord user reports being unable to withdraw; the team finds the withdrawals ([The Block](https://www.theblock.co/news/ecosystems/2024-05-14-cypher-protocol-contributor-admits-to-taking-and-gambling-funds-recovered-from-exploit-294459)) | response |
| 2024-05-13 | The accusation is made public ([CoinDesk](https://www.coindesk.com/business/2024/05/14/insider-at-solanas-cypher-protocol-admits-to-stealing-300k)) | response |
| 2024-05-14 | The contributor confirms it on X; the accusing contributor says he has contacted law enforcement ([The Block](https://www.theblock.co/news/ecosystems/2024-05-14-cypher-protocol-contributor-admits-to-taking-and-gambling-funds-recovered-from-exploit-294459)) | response |

Key addresses: none of the opened pages prints the redemption contract, the contributor's wallets or the Binance deposit address in full; undisclosed.

## Root-cause evidence

- **Technique:** OAK-T5.005
- **Source:** <https://www.theblock.co/news/ecosystems/2024-05-14-cypher-protocol-contributor-admits-to-taking-and-gambling-funds-recovered-from-exploit-294459>; <https://www.coindesk.com/business/2024/05/14/insider-at-solanas-cypher-protocol-admits-to-stealing-300k>; <https://decrypt.co/230757/solana-developer-confession-theft-cypher-protocol>
- **Source type:** news
- **Confidence:** corroborated
- **Evidence:** Three outlets report the same accusation and the actor's own public confirmation. They differ on the total (about \$260,000 to about \$500,000 depending on how it is counted). The contract's authority model and the transaction hashes are not published in the opened pages, and Cypher issued no post-mortem there.

## Public references

- The Block, "Cypher Protocol contributor admits to taking and gambling funds recovered from exploit" (2024-05-14): <https://www.theblock.co/news/ecosystems/2024-05-14-cypher-protocol-contributor-admits-to-taking-and-gambling-funds-recovered-from-exploit-294459>
- CoinDesk, "Insider at Solana's Cypher Protocol Admits to Stealing \$300K" (2024-05-14): <https://www.coindesk.com/business/2024/05/14/insider-at-solanas-cypher-protocol-admits-to-stealing-300k>
- Decrypt, "Solana Developer Confesses to Stealing, Gambling Away Cypher User Funds" (2024-05-14): <https://decrypt.co/230757/solana-developer-confession-theft-cypher-protocol>
