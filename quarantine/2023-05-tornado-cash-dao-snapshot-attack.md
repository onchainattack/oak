> **MERGED 2026-11-27 into `examples/2023-05-tornado-cash-governance.md`** — a duplicate entry for the same incident; its Snapshot vote, Sybil cluster and multisig execution are on no opened page. Not part of the OAK corpus; kept for the record.

**Merged into:** 2023-05-tornado-cash-governance

# Tornado Cash DAO — governance proposal swapped after approval, giving the attacker majority voting power — Tornado Cash DAO / Ethereum — 2023-05-20

**Loss:** about 483,000 TORN taken from the governance vault, per analyst EmberCN as relayed by [The Block](https://www.theblock.co/post/231637). [Rekt](https://rekt.news/tornado-gov-rekt) puts the attacker's profit at about 430 ETH (about $750,000). [Cointelegraph](https://cointelegraph.com/news/tornado-cash-governance-control-set-to-be-restored-as-token-votes-approve-proposal) says 485 ETH (about $890,000) with 39,000 TORN kept. No opened page says the stolen TORN was recovered.

**OAK Techniques observed:** **OAK-T9.003** (Governance Attack — *primary*): an approved proposal contract was replaced at the same address to grant the attacker 1.2 million votes ([Rekt](https://rekt.news/tornado-gov-rekt)). See [`techniques/T9.003-governance-attack.md`](../techniques/T9.003-governance-attack.md). Snapshot off-chain voting, Sybil wallet clusters and a multisig executing a Snapshot result are not described by any opened page, so no Technique for them is declared.

**Attribution:** **pseudonymous** — no opened page names the operator ([Rekt](https://rekt.news/tornado-gov-rekt)).

**Key teaching point:** **Treat a proposal contract that can be redeployed at its own address as unsafe to vote on; verify code at execution time, not only at proposal time.** ([Rekt](https://rekt.news/tornado-gov-rekt)).

## Summary

This file previously described a Snapshot vote, a 100-plus-wallet Sybil cluster, a multisig executing the result and a roughly 24-hour control window. None of that appears in the pages opened ([Rekt](https://rekt.news/tornado-gov-rekt), [The Block](https://www.theblock.co/post/231637), [Cointelegraph](https://cointelegraph.com/news/attacker-hijacks-tornado-cash-governance-via-malicious-proposal)). The sources describe the same on-chain governance incident as [`2023-05-tornado-cash-governance.md`](2023-05-tornado-cash-governance.md): on 2023-05-20 a proposal resembling an earlier passed one was approved, then its logic was changed to give the attacker 1.2 million votes against about 700,000 legitimate votes ([Rekt](https://rekt.news/tornado-gov-rekt)). The attacker withdrew and sold TORN. On 2023-05-26 a proposal to restore governance passed with 517,000 votes for and none against ([Cointelegraph](https://cointelegraph.com/news/tornado-cash-governance-control-set-to-be-restored-as-token-votes-approve-proposal)).

## Timeline (UTC)

**Entry** → **Execution** → **Money** → **Response**. See the sibling file for the full table and addresses; unstated times are undisclosed.

| When | What happened | OAK |
|---|---|---|
| 2023-05-20 | Proposal resembling an earlier one approved by voters ([The Block](https://www.theblock.co/post/231637)) | T9.003 (entry) |
| 2023-05-20 07:25:11 | Proposal logic changed; attacker holds 1.2M votes ([Cointelegraph](https://cointelegraph.com/news/attacker-hijacks-tornado-cash-governance-via-malicious-proposal)) | **T9.003** |
| 2023-05-20 to 21 | About 483,000 TORN taken; 10,000 TORN sold first for $25,600 ([The Block](https://www.theblock.co/post/231637)) | T9.003 (extraction) |
| 2023-05-26 | Restore proposal passes, 517,000 votes for, none against ([Cointelegraph](https://cointelegraph.com/news/tornado-cash-governance-control-set-to-be-restored-as-token-votes-approve-proposal)) | response |

Key addresses: see [`2023-05-tornado-cash-governance.md`](2023-05-tornado-cash-governance.md), taken from [Rekt](https://rekt.news/tornado-gov-rekt).

## Root-cause evidence

- **Technique:** OAK-T9.003
- **Source:** <https://rekt.news/tornado-gov-rekt>; <https://www.theblock.co/post/231637>; <https://cointelegraph.com/news/attacker-hijacks-tornado-cash-governance-via-malicious-proposal>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** Three news pages agree on an approved proposal being altered to grant 1.2M votes; none mentions Snapshot voting or a Sybil cluster. No operator post-mortem was opened.

## Public references

- Rekt, "Tornado Cash Governance" (2023-05-22): <https://rekt.news/tornado-gov-rekt>
- The Block (2023-05-21): <https://www.theblock.co/post/231637>
- Cointelegraph (2023-05-21): <https://cointelegraph.com/news/attacker-hijacks-tornado-cash-governance-via-malicious-proposal>
- Cointelegraph (2023-05-28): <https://cointelegraph.com/news/tornado-cash-governance-control-set-to-be-restored-as-token-votes-approve-proposal>
