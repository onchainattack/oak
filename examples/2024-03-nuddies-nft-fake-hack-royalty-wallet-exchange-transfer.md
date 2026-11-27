# Nuddies NFT — project lead reported to have faked a wallet hack and moved 94 SOL from the project's royalty wallet to an exchange — Solana / Ethereum — 2024-03-03

**Loss:** **~\$12K** (94 SOL, per [ZachXBT's post](https://x.com/zachxbt/status/1775233644417741260)). [Coinlive](https://www.coinlive.com/news/zachxbt-uncovers-fabricated-hack-in-acquisition-of-degods-and-y00t) reports the project later announced it had put \$12K back into the creator wallet and handed the private keys to two community members; no opened page says whether holders lost anything else.

**OAK Techniques observed:** **OAK-T5.005** (Treasury-Management Exit — *primary*, per [ZachXBT's post](https://x.com/zachxbt/status/1775233644417741260). The post says the "Nuddies Royalty wallet" sent 94 SOL to an exchange deposit address on the day the project lead told the Discord server that "his wallets had been hacked"; the post says the lead then used the proceeds to buy two NFTs. Who held the keys to the royalty wallet and whether it was a single-signature wallet is undisclosed in the opened pages. See [`techniques/T5.005-treasury-management-exit.md`](../techniques/T5.005-treasury-management-exit.md)). The "I was hacked" message itself has no OAK Technique: none of the opened pages describes a separate access-acquisition step.

**Attribution:** **inferred-weak** — the attribution is ZachXBT's, an independent on-chain investigator, made in a post on 2024-04-02; the opened pages show no charge, lawsuit or conviction, so OAK does not name the person (the filename carries a name for historical reasons). The post links the funds to the project lead through timing analysis and the NFT purchases, not through a confession; no response from the person appears on an opened page.

**Key teaching point:** **When a project says its wallet was hacked, trace the outflow before accepting the story.** In this case the stolen-funds trail, per ZachXBT, ended in an exchange deposit and then in NFTs bought by the person who had reported the hack, and no external attacker address appears in the opened pages.

## Summary

On 2024-03-03 the lead of the Nuddies NFT project told the project's Discord server that his wallets had been hacked ([ZachXBT](https://x.com/zachxbt/status/1775233644417741260)). The same day, 94 SOL (~\$12K) moved from the Nuddies Royalty wallet to an exchange deposit address at 08:20 UTC. ZachXBT used timing analysis to find a matching 3.42 ETH (~\$11.7K) transaction at 08:21 UTC, and says the ETH received from the exchange was used to buy DeGods #2921 and y00t #10991, which were sent to the lead's public ENS address ([ZachXBT](https://x.com/zachxbt/status/1775233644417741260)). ZachXBT published the findings on 2024-04-02 at 18:47 UTC. [Coinlive](https://www.coinlive.com/news/zachxbt-uncovers-fabricated-hack-in-acquisition-of-degods-and-y00t) dates the finding 3 April 2024 and reports that the lead then deleted his X account and deactivated the project's accounts, the website went offline, and the project announced a \$12K replenishment of its creator wallet.

## Timeline (UTC)

**Entry and take** are not separated in the opened pages: the royalty wallet's key custody is undisclosed. **Money** and **response** come from ZachXBT's post and the Coinlive article.

| When | What happened | OAK |
|---|---|---|
| Before 2024-03-03 (undisclosed) | The "Nuddies Royalty" / creator wallet exists and holds the SOL; who held its keys is undisclosed | — |
| 2024-03-03 (time undisclosed) | The project lead posts in his Discord server that his wallets were hacked ([ZachXBT](https://x.com/zachxbt/status/1775233644417741260)) | none — a claim, not a Technique step |
| 2024-03-03 08:20 | 94 SOL (~\$12K) moves from the Nuddies Royalty wallet to an exchange deposit address, Solana transaction [`35DtCYYNmvxKHoD81kucWLBwQpKL3QTqrNKgvTyfjyafThbBfctyuDAaWdPF6UXEhmiHQ8tEknm7Y9fMHc7YRuRN`](https://solscan.io/tx/35DtCYYNmvxKHoD81kucWLBwQpKL3QTqrNKgvTyfjyafThbBfctyuDAaWdPF6UXEhmiHQ8tEknm7Y9fMHc7YRuRN) | **T5.005** |
| 2024-03-03 08:21 | Exit leg found by timing analysis: 3.42 ETH (~\$11.7K), Ethereum transaction [`0xea12717b6255fb86d2c6bec1ee3660275d5050f4431917c23c0de6a6599ea4df`](https://etherscan.io/tx/0xea12717b6255fb86d2c6bec1ee3660275d5050f4431917c23c0de6a6599ea4df) | — |
| After 2024-03-03 (dates undisclosed) | ETH received from the exchange is used to buy DeGods #2921 and y00t #10991, sent to the lead's public ENS address; the DeGod is later used as his X profile picture | — |
| 2024-04-02 18:47 | ZachXBT publishes the investigation | response |
| After 2024-04-02 | The lead's X account is deleted and the project's accounts deactivated; the project announces a \$12K top-up of the creator wallet and a key hand-over to two community members ([Coinlive](https://www.coinlive.com/news/zachxbt-uncovers-fabricated-hack-in-acquisition-of-degods-and-y00t)) | response |

Key addresses (all from [ZachXBT's post](https://x.com/zachxbt/status/1775233644417741260)):

- Nuddies creator wallet (Solana) — [`7hSAM4zeuWtLASXEDNcgM9Chw3DAWF6gcVZjUZvGzR3C`](https://solscan.io/account/7hSAM4zeuWtLASXEDNcgM9Chw3DAWF6gcVZjUZvGzR3C)
- Wallet the post labels as the lead's Magic Eden / SNS wallet (Solana) — [`7KH6jTSdz14Jv4ZQ2Gks6vQrKa4zi6J9xxafTPfESHex`](https://solscan.io/account/7KH6jTSdz14Jv4ZQ2Gks6vQrKa4zi6J9xxafTPfESHex)
- Exchange deposit address (Solana) — [`ueQ6naMU2dMZ918TicUY6eh4pYHXQZDBsWSMWq8fGpY`](https://solscan.io/account/ueQ6naMU2dMZ918TicUY6eh4pYHXQZDBsWSMWq8fGpY)

## Root-cause evidence

- **Technique:** OAK-T5.005
- **Source:** <https://x.com/zachxbt/status/1775233644417741260>; <https://www.coinlive.com/news/zachxbt-uncovers-fabricated-hack-in-acquisition-of-degods-and-y00t>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** ZachXBT's post gives the transaction signature, the exchange deposit address, the 3.42 ETH transaction and the NFT purchases; the Solana-to-Ethereum link is by timing analysis, which the post itself states. Coinlive repeats the post and adds the project's reaction. Not established in the opened pages: who held the royalty wallet's keys, whether any other funds left it, and any response from the person named by ZachXBT. Coinlive dates the finding 3 April; the post is timestamped 2 April 2024 18:47 UTC.

## Public references

- ZachXBT, X post (2024-04-02): <https://x.com/zachxbt/status/1775233644417741260>
- Coinlive, "ZachXBT Uncovers Fabricated Hack in Acquisition of DeGods and y00t": <https://www.coinlive.com/news/zachxbt-uncovers-fabricated-hack-in-acquisition-of-degods-and-y00t>
