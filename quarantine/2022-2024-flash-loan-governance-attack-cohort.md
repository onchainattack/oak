> **MERGED 2026-11-27 into `examples/2022-04-beanstalk.md`** — of its three members only Beanstalk is a flash-loan governance attack; Fortress (bought votes plus an open oracle setter) and Elephant Money (price manipulation, no vote) are not, per Rekt. Not part of the OAK corpus; kept for the record.

**Merged into:** 2022-04-beanstalk

# Flash-loan governance attacks — Beanstalk is the one sourced flash-loan governance case; Fortress and Elephant Money are not — 2022

**Loss:** no cohort total is supported. Beanstalk: Rekt reports about \$181M drained, of which the attacker kept about \$76M ([Rekt, Beanstalk](https://rekt.news/beanstalk-rekt)); see [the Beanstalk file](2022-04-beanstalk.md). Fortress: about \$3M ([Rekt, Fortress](https://www.rekt.news/fortress-rekt/)). Elephant Money: the project's post-mortem says about \$11.2M, PeckShield about \$22.2M ([Rekt, Elephant Money](https://www.rekt.news/elephant-money-rekt)). The earlier \$200M+ aggregate and \$190M+ realised figures and the 2023–2024 cases have no opened source and are removed.

**OAK Techniques observed:** **OAK-T16.001** (Flash-Loan Governance Vote Manipulation — Beanstalk only: Rekt reports that flash loans funded Curve liquidity that gave the attacker voting power to pass a malicious proposal, see [`techniques/T16.001-vote-takeover-via-flash-loan.md`](../techniques/T16.001-vote-takeover-via-flash-loan.md)). The other two cases are not mapped here: the sources describe oracle manipulation (Fortress) and flash-loan price manipulation with no governance vote (Elephant Money).

**Attribution:** **unattributed** — no source opened names or attributes any of the three attackers.

**Key teaching point:** **Do not count voting power from tokens or liquidity that can be borrowed within the proposal window, and do not give any path (such as an emergency commit) that skips the execution delay.** Rekt reports that Beanstalk had about a one-day delay on governance actions and that the malicious proposal was executed through the emergency commit path, which skipped it ([Rekt, Beanstalk](https://rekt.news/beanstalk-rekt)). The claim that these protocols had "no timelock" is wrong for Beanstalk.

## Summary

This file previously presented Beanstalk, Elephant Money and Fortress Protocol as one flash-loan governance cohort. Opened sources support only one of them.

**Beanstalk (Ethereum, 2022-04-17).** Rekt reports the attacker submitted two proposals the day before, then took flash loans from Aave, Uniswap v2 and SushiSwap, added liquidity to Curve pools with BEAN to gain voting power, voted for the malicious BIP-18 and executed it ([Rekt, Beanstalk](https://rekt.news/beanstalk-rekt)). Full detail is in [2022-04-beanstalk.md](2022-04-beanstalk.md), which carries the corrected account.

**Fortress Protocol (BNB Chain, 2022-05-08).** Rekt reports the attacker funded the attack from Tornado Cash, swapped ETH for large quantities of FTS to reach quorum, passed a proposal adding FTS as collateral (active for 3 days), then used the publicly callable price `submit()` function to inflate collateral value and drain the platform. Rekt does not mention a flash loan ([Rekt, Fortress](https://www.rekt.news/fortress-rekt/)). The governance vote used purchased tokens, not borrowed voting power, and the drain was an oracle manipulation. Sibling file: [2022-05-fortress-protocol-flash-loan-governance-attack.md](2022-05-fortress-protocol-flash-loan-governance-attack.md), whose title and mechanism (flash-loaned FTS, single-transaction proposal, mint authority) the opened sources do not support.

**Elephant Money (BNB Chain, April 2022).** Rekt (dated 2022-04-13) reports flash loans of about 131k WBNB and 91M BUSD used to push ELEPHANT's price while minting and redeeming TRUNK, and does not mention a governance vote ([Rekt, Elephant Money](https://www.rekt.news/elephant-money-rekt)). This is price manipulation, not governance. No Elephant Money file exists in `examples/`.

## Timeline (UTC)

Dates from the cited pages; no times are published for the Fortress or Elephant Money cases.

| When | What happened | OAK |
|---|---|---|
| 2022-04-12 / 04-13 | Elephant Money: flash-loan price manipulation around TRUNK minting; Rekt dates its article 2022-04-13 ([Rekt](https://www.rekt.news/elephant-money-rekt)) | none — price manipulation, no governance vote |
| 2022-04-16 | Beanstalk: two proposals submitted a day before the attack ([Rekt](https://rekt.news/beanstalk-rekt)) | T16.001 |
| 2022-04-17 | Beanstalk: flash loans fund voting power, BIP-18 executed via the emergency commit path ([Rekt](https://rekt.news/beanstalk-rekt)); funds: proceeds to WETH, about 24,830 WETH to Tornado Cash | T16.001 |
| 2022-05-08 | Fortress: after a 3-day proposal and an oracle price manipulation, platform drained ([Rekt](https://www.rekt.news/fortress-rekt/)); funds: 1048 ETH and 400k DAI deposited into Tornado Cash | none — governance step with purchased tokens plus oracle manipulation |
| 2022-04-17 onward | Response: Beanstalk paused governance, per the sibling file | response |

Key addresses: undisclosed in this file; see the sibling files for each incident.

## Root-cause evidence

- **Technique:** OAK-T16.001 (Beanstalk only)
- **Source:** <https://rekt.news/beanstalk-rekt>; <https://www.rekt.news/fortress-rekt/>; <https://www.rekt.news/elephant-money-rekt>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** Rekt, a single outlet, describes each mechanism. For Beanstalk the team's post-mortem exists (see the sibling file). For Fortress and Elephant Money no operator statement was opened. Fewer than two members fit the cohort definition, so the cohort claim is not supported.

## Public references

- Rekt, "Beanstalk - REKT": <https://rekt.news/beanstalk-rekt>
- Rekt, "Fortress Protocol - REKT": <https://www.rekt.news/fortress-rekt/>
- Rekt, "Elephant Money - REKT": <https://www.rekt.news/elephant-money-rekt>
- [Beanstalk example](2022-04-beanstalk.md); [Fortress example](2022-05-fortress-protocol-flash-loan-governance-attack.md)
