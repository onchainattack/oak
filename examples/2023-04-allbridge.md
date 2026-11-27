# Allbridge — BNB Chain pool payout miscalculated under a large liquidity skew, drained by flash-loan-funded swaps — Allbridge / BNB Chain — 2023-04-01

**Loss:** **~\$573K** (\$282,889 in BUSD and \$290,868 in USDT), per PeckShield as relayed by [Cointelegraph](https://cointelegraph.com/news/allbridge-exploiter-returns-most-of-the-573k-stolen-in-attack); CertiK put it at "close to \$550,000" in the same article. [The Block](https://www.theblock.co/news/ecosystems/2023-04-03-allbridge-exploiter-identified-bnb-chain-224521) says \$570,000. Co-founder Andrey Velikiy gives about \$570,000 taken by the first attacker plus about \$160,000 by a second, unidentified attacker ([Forklog](https://forklog.com/en/allbridge-co-founder-reveals-real-losses-and-the-attack-vector-on-the-protocol/)). The first attacker returned 1,500 BNB (about \$465,000); Allbridge said "The remaining funds will be considered a white hat bounty to this person" ([Cointelegraph](https://cointelegraph.com/news/allbridge-exploiter-returns-most-of-the-573k-stolen-in-attack)).

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*). The co-founder said the liquidity calculation formula was flawed: at edge values the permitted volume was far above pool liquidity, and the team "miscalculated, at the mathematical level, how much to give him in the face of such a large liquidity skew" ([Forklog](https://forklog.com/en/allbridge-co-founder-reveals-real-losses-and-the-attack-vector-on-the-protocol/)). PeckShield described it as swap-price manipulation by one party acting as both liquidity provider and swapper ([Cointelegraph](https://cointelegraph.com/news/allbridge-exploiter-returns-most-of-the-573k-stolen-in-attack)). See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md). **OAK-T9.002** (Flash-Loan-Enabled Exploit): CertiK said the attacker took a \$7.5 million BUSD flash loan ([Cointelegraph](https://cointelegraph.com/news/allbridge-offers-bounty-to-exploiter-who-stole-570k-in-flashloan-attack)). **OAK-T7.001** (Mixer-Routed Hop): the first attacker sent funds to Tornado Cash ([Forklog](https://forklog.com/en/allbridge-co-founder-reveals-real-losses-and-the-attack-vector-on-the-protocol/)). The earlier version of this file filed the case under T9.001 (oracle manipulation); the operator describes a pool payout miscalculation, not an external price feed.

**Attribution:** **unattributed.** [BNB Chain said](https://www.theblock.co/news/ecosystems/2023-04-03-allbridge-exploiter-identified-bnb-chain-224521) it identified the attacker through on-chain analysis and declined to share details; no name or address is public in the opened pages. A second address used the same exploit ([Cointelegraph](https://cointelegraph.com/news/allbridge-exploiter-returns-most-of-the-573k-stolen-in-attack)).

**Key teaching point:** **Payout math on a pool must be bounded against the pool's actual liquidity, including at extreme skew.** Here the formula allowed a payout far above pool liquidity at edge values ([Forklog](https://forklog.com/en/allbridge-co-founder-reveals-real-losses-and-the-attack-vector-on-the-protocol/)), and a flash loan supplied the skew.

## Summary

PeckShield flagged an attack on Allbridge's BNB Chain BUSD and USDT pools on 2023-04-01 ([Cointelegraph](https://cointelegraph.com/news/allbridge-offers-bounty-to-exploiter-who-stole-570k-in-flashloan-attack)); [Forklog](https://forklog.com/en/allbridge-co-founder-reveals-real-losses-and-the-attack-vector-on-the-protocol/) dates it 2023-04-02. Per CertiK, the attacker took a \$7.5 million BUSD flash loan, swapped into USDT, then deposited into the BUSD and USDT pools, and swapped \$40,000 of BUSD for \$789,632 of USDT ([Cointelegraph](https://cointelegraph.com/news/allbridge-offers-bounty-to-exploiter-who-stole-570k-in-flashloan-attack)). Allbridge suspended the bridge and offered the attacker a bounty for return, with no legal action ([The Block](https://www.theblock.co/news/ecosystems/2023-04-03-allbridge-exploiter-identified-bnb-chain-224521)). The first attacker returned 1,500 BNB and the rest was treated as a bounty; a second address then used the same exploit, and Allbridge asked it to reach out ([Cointelegraph](https://cointelegraph.com/news/allbridge-exploiter-returns-most-of-the-573k-stolen-in-attack)).

## Timeline (UTC)

Stages: **Flaw** (payout formula), **Take** (flash-loan-funded swaps), **Money** (Tornado Cash, partial return), **Response** (pause, bounty offer). No opened source gives times of day or transaction hashes; they are undisclosed here.

| When | What happened | OAK |
|---|---|---|
| Before 2023-04-01 (undisclosed) | The liquidity calculation allows payouts far above pool liquidity at edge values ([Forklog](https://forklog.com/en/allbridge-co-founder-reveals-real-losses-and-the-attack-vector-on-the-protocol/)) | **T9.016** |
| 2023-04-01 or 2023-04-02 (sources differ) | Attacker takes a \$7.5M BUSD flash loan and swaps for USDT ([CertiK via Cointelegraph](https://cointelegraph.com/news/allbridge-offers-bounty-to-exploiter-who-stole-570k-in-flashloan-attack)) | T9.002 |
| same window | Attacker deposits into the pools and swaps \$40,000 BUSD for \$789,632 USDT, as one party acting as liquidity provider and swapper; net about \$573K ([Cointelegraph](https://cointelegraph.com/news/allbridge-offers-bounty-to-exploiter-who-stole-570k-in-flashloan-attack)) | **T9.016** |
| 2023-04-02 to 2023-04-04 | First attacker sends funds to Tornado Cash ([Forklog](https://forklog.com/en/allbridge-co-founder-reveals-real-losses-and-the-attack-vector-on-the-protocol/)); a second attacker later takes about \$160,000 in stablecoins, reportedly unmoved at the time of writing | T7.001 |
| 2023-04-03 | Allbridge suspends the bridge and offers a white-hat bounty for return ([Cointelegraph](https://cointelegraph.com/news/allbridge-offers-bounty-to-exploiter-who-stole-570k-in-flashloan-attack)); BNB Chain says it identified the attacker ([The Block](https://www.theblock.co/news/ecosystems/2023-04-03-allbridge-exploiter-identified-bnb-chain-224521)) | response |
| By 2023-04-04 | 1,500 BNB (about \$465,000) is returned; Allbridge converts it to BUSD as compensation ([Cointelegraph](https://cointelegraph.com/news/allbridge-exploiter-returns-most-of-the-573k-stolen-in-attack)) | response |

Key addresses: attacker addresses, pool contracts and transaction hashes are undisclosed (none is printed in full on an opened page).

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://forklog.com/en/allbridge-co-founder-reveals-real-losses-and-the-attack-vector-on-the-protocol/>; <https://cointelegraph.com/news/allbridge-offers-bounty-to-exploiter-who-stole-570k-in-flashloan-attack>; <https://cointelegraph.com/news/allbridge-exploiter-returns-most-of-the-573k-stolen-in-attack>
- **Source type:** news
- **Confidence:** corroborated
- **Evidence:** The co-founder's statement (relayed by Forklog) names a flaw in the liquidity calculation under large skew; PeckShield and CertiK (relayed by Cointelegraph) describe the flash-loan-funded price manipulation. The function-level flaw and transaction hashes are not published in the opened pages; Allbridge's own post-mortem was not opened.

## Public references

- Cointelegraph, "Allbridge offers bounty to exploiter who stole \$570K in flashloan attack" (2023-04-03): <https://cointelegraph.com/news/allbridge-offers-bounty-to-exploiter-who-stole-570k-in-flashloan-attack>
- Cointelegraph, "Allbridge exploiter returns most of the \$573K stolen in attack" (2023-04-04): <https://cointelegraph.com/news/allbridge-exploiter-returns-most-of-the-573k-stolen-in-attack>
- The Block, "BNB Chain claims to have identified Allbridge's \$570,000 exploiter" (2023-04-03): <https://www.theblock.co/news/ecosystems/2023-04-03-allbridge-exploiter-identified-bnb-chain-224521>
- Forklog, "Allbridge co-founder reveals real losses and the attack vector on the protocol" (2023-04-04): <https://forklog.com/en/allbridge-co-founder-reveals-real-losses-and-the-attack-vector-on-the-protocol/>
