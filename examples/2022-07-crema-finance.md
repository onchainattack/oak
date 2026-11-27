# Crema Finance — a fake tick account passed the owner check, so flash-loaned liquidity claimed fees the pool never earned — Crema Finance / Solana — 2022-07-02

**Loss:** **~\$8.78M** per [CertiK](https://www.certik.com/blog/crema-finance-exploit) (its own rough estimate; [Rekt](https://rekt.news/crema-finance-rekt) says about \$8.8M and The Block roughly \$9 million), taken as 69,422.9 SOL and 6,497,738 USDCet ([Rekt](https://rekt.news/crema-finance-rekt); [The Block](https://theblock.co/post/156250/crema-finance-hacker-returns-7-6-million-worth-of-stolen-crypto)). **Returned:** after negotiation the exploiter returned 6,064 ETH and 23,967.9 SOL and kept 45,455 SOL as a "white hat" bounty, per Crema's message quoted by [The Block](https://theblock.co/post/156250/crema-finance-hacker-returns-7-6-million-worth-of-stolen-crypto).

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary*, counterfeit-object acceptance). Rekt reports the cause as "faulty owner validation on one of the protocol's accounts storing price tick data" used to calculate LP fees; the attacker supplied a fake tick account with false data ([Rekt](https://rekt.news/crema-finance-rekt); [Halborn](https://halborn.com/explained-the-crema-finance-hack-july-2022/)). See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md). **OAK-T9.002** (Flash-Loan-Enabled Exploit — *secondary*): the attacker took a Solend flash loan and used it to add liquidity ([Halborn](https://halborn.com/explained-the-crema-finance-hack-july-2022/); [CertiK](https://www.certik.com/blog/crema-finance-exploit)). **OAK-T7.003** (Cross-Chain Bridge Laundering — *secondary*): 6,497,735 USDC was sent to Ethereum over the Wormhole bridge and swapped ([CertiK](https://www.certik.com/blog/crema-finance-exploit)).

**Attribution:** **pseudonymous** (Solana address [`Esmx2QjmDZMjJ15yBJ2nhqisjEt7Gqro4jSkofdoVsvY`](https://solscan.io/account/Esmx2QjmDZMjJ15yBJ2nhqisjEt7Gqro4jSkofdoVsvY) and Ethereum address [`0x8021b2962dB803b73Aa874030B0B42c202E8458F`](https://etherscan.io/address/0x8021b2962dB803b73Aa874030B0B42c202E8458F) per [Rekt](https://rekt.news/crema-finance-rekt)). No source opened names a person.

**Key teaching point:** **Every account an instruction reads fee or price data from must be checked against the program that owns it, on every instruction that reads it, not only the ones an audit covered.** Rekt reports that an earlier Bramah Systems audit found the same weakness in Crema's swap method and it "was fixed", while the same issue remained in the claim method ([Rekt](https://rekt.news/crema-finance-rekt)).

## Summary

Crema Finance is a concentrated-liquidity protocol on Solana ([Halborn](https://halborn.com/explained-the-crema-finance-hack-july-2022/)). Its LP fee calculation reads price-tick data from a tick account, and the owner check on that account could be bypassed. The attacker created a fake tick account with false data, took a flash loan from Solend, added liquidity to Crema pools, withdrew that liquidity and claimed fees computed from the fake data ([Rekt](https://rekt.news/crema-finance-rekt); [Halborn](https://halborn.com/explained-the-crema-finance-hack-july-2022/)). CertiK lists the calls used as `DepositFixTokenType()`, `Claim()` and `WithdrawAllTokenTypes()` and says the bug likely sits in `Claim()` and/or `WithdrawAllTokenTypes()`, which it could not confirm because the code is private ([CertiK](https://www.certik.com/blog/crema-finance-exploit)). The proceeds were swapped into SOL and USDCet, the USDCet bridged to Ethereum and swapped to ETH ([Rekt](https://rekt.news/crema-finance-rekt); [Halborn](https://halborn.com/explained-the-crema-finance-hack-july-2022/)). Crema suspended the protocol, offered a bounty, and after negotiation the exploiter returned most of the funds ([The Block](https://theblock.co/post/156250/crema-finance-hacker-returns-7-6-million-worth-of-stolen-crypto)).

## Timeline (UTC)

**Flaw**, **Take**, **Money**, **Response**. The first-attack time is CertiK's; the announcement time is Rekt's. Preparation transactions (funding, deployment) are undisclosed in the sources opened. Note a date conflict: The Block says the exploit happened on a Sunday (3 July 2022), CertiK says 2 July 20:08 UTC; Rekt says the attack "took place the day before" the Sunday 04:07 UTC announcement, which agrees with CertiK.

| When | What happened | OAK |
|---|---|---|
| Before 2022-07-02 | The tick-account owner check can be bypassed with a fake account; a Bramah Systems audit found the same issue in the swap method, which was fixed, while the claim method kept it ([Rekt](https://rekt.news/crema-finance-rekt)). | **T9.004** |
| 2022-07-02 20:08 | CertiK: "the first of multiple malicious flashloan attacks" ([CertiK](https://www.certik.com/blog/crema-finance-exploit)). The attacker uses a fake tick account and a Solend flash loan to add liquidity, then claims fees and withdraws ([Rekt](https://rekt.news/crema-finance-rekt)). | **T9.004**, **T9.002** |
| 2022-07-02 (time undisclosed) | Proceeds swapped via Jupiter into 69,422.9 SOL and 6,497,738 USDCet ([Halborn](https://halborn.com/explained-the-crema-finance-hack-july-2022/)). | — |
| 2022-07-02/03 (time undisclosed) | 6,497,735 USDC is sent to Ethereum over the Wormhole bridge; 6,064 ETH ends up at the Ethereum address ([CertiK](https://www.certik.com/blog/crema-finance-exploit)). | **T7.003** |
| 2022-07-03 04:07 | Crema announces the theft ([Rekt](https://rekt.news/crema-finance-rekt)); it suspends protocol activity ([CertiK](https://www.certik.com/blog/crema-finance-exploit)). | response |
| 2022-07-03 or after (time undisclosed) | Crema sends on-chain messages to the exploiter: Solana [`2p355auu27oGfS96aipnmPkq2V7PZjMXSKVpTWD6mH8fRRcZauyPeHqjfUZx8WFhjTGnBJr1Vzfoasct19KzEzYX`](https://solscan.io/tx/2p355auu27oGfS96aipnmPkq2V7PZjMXSKVpTWD6mH8fRRcZauyPeHqjfUZx8WFhjTGnBJr1Vzfoasct19KzEzYX) and Ethereum [`0xa38b894b2bb1c8a3eaf816d879a542e080443f7bf5a84214a00e6e509f9f6130`](https://etherscan.io/tx/0xa38b894b2bb1c8a3eaf816d879a542e080443f7bf5a84214a00e6e509f9f6130) ([Rekt](https://rekt.news/crema-finance-rekt)). The message blacklists the addresses and offers a whitehat bounty of \$800k valid for 72 hours ([Rekt](https://rekt.news/crema-finance-rekt)); Halborn gives the first offer as \$700,000 ([Halborn](https://halborn.com/explained-the-crema-finance-hack-july-2022/)). | response |
| By 2022-07-06 | After a long negotiation the exploiter takes 45,455 SOL as bounty; Crema confirms receipt of 6,064 ETH and 23,967.9 SOL in four transactions ([The Block](https://theblock.co/post/156250/crema-finance-hacker-returns-7-6-million-worth-of-stolen-crypto)). Return transaction hashes are not given in the sources opened. | response |
| After the return | Crema proposes a user compensation plan funded by 1.5% of the CRM hard cap (15,000,000 CRM) from the team allocation ([Halborn](https://halborn.com/explained-the-crema-finance-hack-july-2022/)). | response |

Key addresses:

- Exploiter (Solana) — [`Esmx2QjmDZMjJ15yBJ2nhqisjEt7Gqro4jSkofdoVsvY`](https://solscan.io/account/Esmx2QjmDZMjJ15yBJ2nhqisjEt7Gqro4jSkofdoVsvY) ([Rekt](https://rekt.news/crema-finance-rekt))
- Exploiter (Ethereum) — [`0x8021b2962dB803b73Aa874030B0B42c202E8458F`](https://etherscan.io/address/0x8021b2962dB803b73Aa874030B0B42c202E8458F) ([Rekt](https://rekt.news/crema-finance-rekt))
- Contract-update-authority address the team asked the exploiter to return funds to — [`DR1tLcKEmiNFxF5dxgdWCANdeBMNu9FjuHur2i4vAPHV`](https://solscan.io/account/DR1tLcKEmiNFxF5dxgdWCANdeBMNu9FjuHur2i4vAPHV) ([Rekt](https://rekt.news/crema-finance-rekt))

## Root-cause evidence

- **Technique:** OAK-T9.004 (with OAK-T9.002 as the capital source)
- **Source:** <https://www.certik.com/blog/crema-finance-exploit>; <https://rekt.news/crema-finance-rekt>; <https://halborn.com/explained-the-crema-finance-hack-july-2022/>; <https://theblock.co/post/156250/crema-finance-hacker-returns-7-6-million-worth-of-stolen-crypto>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** Rekt, Halborn and CertiK all describe a fake tick account with false fee data and a Solend flash loan; Rekt and Halborn attribute it to faulty owner validation on the tick account, relaying Crema's account. CertiK says the exact faulty function cannot be confirmed because the code is private. Crema's own post-mortem was not opened.

## Public references

- CertiK, "Crema Finance Exploit": <https://www.certik.com/blog/crema-finance-exploit>
- Rekt, "Crema Finance - REKT" (2022-07-04): <https://rekt.news/crema-finance-rekt>
- Halborn, "Explained: The Crema Finance Hack (July 2022)" (2022-07-19): <https://halborn.com/explained-the-crema-finance-hack-july-2022/>
- The Block, "Crema Finance hacker returns most of the stolen funds" (2022-07-06, updated 2022-10-01): <https://theblock.co/post/156250/crema-finance-hacker-returns-7-6-million-worth-of-stolen-crypto>
