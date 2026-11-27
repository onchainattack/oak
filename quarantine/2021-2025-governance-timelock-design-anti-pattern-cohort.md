> **MERGED 2026-11-27 into `examples/2022-04-beanstalk.md`** — the source pass left this cohort with one member that fits its Technique (Beanstalk); Compound Proposal 289 and Tornado Cash do not, per the pages opened. Not part of the OAK corpus; kept for the record.

**Merged into:** 2022-04-beanstalk

# Governance timelock cohort (no cohort supported) — Beanstalk's emergency path is the one sourced case of instant execution — 2022

**Loss:** No cohort total is given. The one member that fits, Beanstalk, lost about \$181M gross, of which the attacker kept about \$76M ([Rekt](https://rekt.news/beanstalk-rekt)); the team's post-mortem says about \$77M was stolen from the liquidity pools ([Beanstalk Farms](https://bean.money/blog/beanstalk-governance-exploit)). See [`examples/2022-04-beanstalk.md`](2022-04-beanstalk.md).

**OAK Techniques observed:** **OAK-T16.006** ([Timelock-Free Governance Execution](../techniques/T16.006-timelock-free-governance-execution.md)) for Beanstalk only, where [Rekt](https://rekt.news/beanstalk-rekt) says the attacker "immediately" executed an "emergency" governance proposal. No other member is claimed under it (see Members below).

**Attribution:** **unattributed** — this is a design pattern, not an actor. For Beanstalk, see the sibling file.

**Key teaching point:** **A delay on governance execution is only as strong as its emergency path.** [Rekt](https://rekt.news/beanstalk-rekt) quotes a developer saying there is a delay of about one day for all governance actions in the Bean contract, and also says "A delay on execution of on-chain governance proposals is one way to prevent this." The attack used an emergency execution call that ran the proposal right after the delay for submission had passed.

## Summary

This file was written as a cohort that compared Beanstalk (no timelock), Compound Proposal 289 (a timelock said to have prevented a delegation-cluster attack) and Tornado Cash (timelock present, payload review absent), with totals and an amplification factor. A 2026-11-27 source pass found that comparison unsupported and removed it.

### Members

| Incident | Fits T16.006 | Opened-page evidence |
|---|---|---|
| Beanstalk, 2022-04-17 | **yes** | [Rekt](https://rekt.news/beanstalk-rekt): "The attacker temporarily acquired sufficient voting power to immediately execute a malicious emergency governance proposal, draining the protocol." Step 8 of its breakdown reads "emergencyCommit(bip=18)". The delay did not stop it, so the execution path mattered. |
| Compound Proposal 289, 2024-07-28 | **no** | [The Block](https://www.theblock.co/post/307943/24-million-compound-finance-proposal-passed-by-whale-over-dao-objections), [Rekt](https://rekt.news/the-humpy-dance) and [Cointelegraph](https://cointelegraph.com/news/golden-boys-behind-compound-governance-attack-agree-to-rescind-proposal) say it passed the vote and was cancelled, with Humpy agreeing to rescind it for a staking product. No source says the timelock or a review in its window stopped it, and nothing was executed. See [`examples/2024-07-compound-vote-takeover.md`](2024-07-compound-vote-takeover.md). |
| Tornado Cash, 2023-05-20 | **no** | [The Block](https://www.theblock.co/post/231637) says the governance system approved on May 20 an upgrade purportedly the same as a previous one, with an extra function added. Neither it nor [Rekt](https://rekt.news/tornado-gov-rekt) mentions a timelock, delay or instant execution. The mechanism sourced is a disguised proposal (T16.005), not missing delay. See [`examples/2023-05-tornado-cash-governance.md`](2023-05-tornado-cash-governance.md). |

Only one member fits, so verdict `no_cohort`. Removed as unsupported: the three-numbers comparison, the claim that Compound's \$24M was fully prevented by a timelock, the claim that Tornado Cash had a timelock window that passed without payload review, the Proposal 21 drain account and the ~\$1M extracted figure, the fork-substrate tail-risk claim, and the 24-72 hour and flash-loan-infeasibility arguments. The sub-shape definitions live on the Technique page, not here.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-04-16 | Attacker submits two proposals the day before the exploit ([Rekt](https://rekt.news/beanstalk-rekt)). | T16.006 (preparation) |
| 2022-04-17, about 12:24 | Beanstalk attacked ([Beanstalk Farms](https://bean.money/blog/beanstalk-governance-exploit)); the attacker executes an emergency governance proposal with flash-loaned voting power ([Rekt](https://rekt.news/beanstalk-rekt)). | T16.006, T16.001 |
| 2022-04-17 onward | About 24,800 ETH goes to Tornado Cash ([Rekt](https://rekt.news/beanstalk-rekt)). | out of scope here; see sibling |
| 2022-04-19 | Team post-mortem; it says it shut off governance and paused the protocol ([Beanstalk Farms](https://bean.money/blog/beanstalk-governance-exploit)). | response |

Key addresses: none printed in full on the pages opened for this file; see the sibling file.

## Root-cause evidence

- **Technique:** OAK-T16.006 (Beanstalk only)
- **Source:** <https://rekt.news/beanstalk-rekt>; <https://bean.money/blog/beanstalk-governance-exploit>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** Rekt describes the emergency execution; the operator's post-mortem calls it "a previously-unknown issue with Beanstalk’s governance process" and does not mention the emergency path or any delay. The exact conditions of the emergency path are not on the pages opened.

## Public references

- Rekt, "Beanstalk - REKT" (2022-04-18): <https://rekt.news/beanstalk-rekt>
- Beanstalk Farms, "Beanstalk Governance Exploit" (2022-04-19): <https://bean.money/blog/beanstalk-governance-exploit>
- The Block, Tornado Cash governance (2023-05-21): <https://www.theblock.co/post/231637>
- Rekt, "Tornado Cash Governance - REKT" (2023-05-22): <https://rekt.news/tornado-gov-rekt>
- The Block, Compound Proposal 289 (2024-07-28): <https://www.theblock.co/post/307943/24-million-compound-finance-proposal-passed-by-whale-over-dao-objections>
- Rekt, "The Humpy Dance" (2024-07-30): <https://rekt.news/the-humpy-dance>
- Cointelegraph, Compound rescind (2024-07-30): <https://cointelegraph.com/news/golden-boys-behind-compound-governance-attack-agree-to-rescind-proposal>
