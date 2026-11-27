# Tornado Cash governance — proposal contract swapped after the vote passed, giving the attacker majority voting power — Tornado Cash DAO / Ethereum — 2023-05-20

**Loss:** about 483,000 TORN taken from the governance vault, per analyst EmberCN as relayed by [The Block](https://www.theblock.co/post/231637) and by [Cointelegraph](https://cointelegraph.com/news/tornado-cash-governance-control-set-to-be-restored-as-token-votes-approve-proposal). Proceeds are reported differently: [Cointelegraph](https://cointelegraph.com/news/tornado-cash-governance-control-set-to-be-restored-as-token-votes-approve-proposal) says most was swapped for 485 ETH (about $890,000) and 39,000 TORN was kept; [Rekt](https://rekt.news/tornado-gov-rekt) says about 430 ETH (about $750,000) from selling TORN. No page opened for this file says any stolen funds were returned. The Tornado Cash pools themselves could not be drained, per [Rekt](https://rekt.news/tornado-gov-rekt).

**OAK Techniques observed:** **OAK-T9.003** (Governance Attack — *primary*). A proposal that looked like an earlier, passed one was approved, then its logic was replaced at the same address, giving the attacker extra votes ([Rekt](https://rekt.news/tornado-gov-rekt), [Cointelegraph](https://cointelegraph.com/news/attacker-hijacks-tornado-cash-governance-via-malicious-proposal)). See [`techniques/T9.003-governance-attack.md`](../techniques/T9.003-governance-attack.md). **OAK-T16.005** (Malicious Proposal Snowballing — the approved text and the executed code diverged). **OAK-T7.001** (Mixer-Routed Hop — [Cointelegraph](https://cointelegraph.com/news/tornado-cash-governance-control-set-to-be-restored-as-token-votes-approve-proposal) says part of the ETH was routed through Tornado Cash).

**Attribution:** **pseudonymous** — addresses below are as listed by [Rekt](https://rekt.news/tornado-gov-rekt); no source opened names the operator. Rekt itself only speculates on motive.

**Key teaching point:** **Before voting, diff the deployed proposal bytecode against what the UI says, and reject proposal contracts that can `selfdestruct` or be redeployed at the same address.** Voters approved code that was later replaced at its address ([Rekt](https://rekt.news/tornado-gov-rekt)).

## Summary

On 2023-05-20 an attacker got a governance proposal approved that [Rekt](https://rekt.news/tornado-gov-rekt) says was disguised as a proposal to penalise "cheating" relayers, reusing an earlier proposal's logic with an added function allowing `selfDestruct`. The proposal was deployed through a contract combining CREATE and CREATE2, so that after approval the code at that address could be erased and different code deployed to it ([Rekt](https://rekt.news/tornado-gov-rekt)). Cointelegraph, citing the researchers, says the attacker used an `emergencyStop` function to update the proposal logic ([Cointelegraph](https://cointelegraph.com/news/attacker-hijacks-tornado-cash-governance-via-malicious-proposal)). The attacker granted themselves 1.2 million votes against about 700,000 legitimate votes ([Rekt](https://rekt.news/tornado-gov-rekt)), withdrew 10,000 TORN and sold it, and the community was told governance funds were potentially at risk. [Cointelegraph](https://cointelegraph.com/news/attacker-hijacks-tornado-cash-governance-via-malicious-proposal) credits samczsun with the first report.

The attacker later put up a proposal to undo the takeover. [Cointelegraph](https://cointelegraph.com/news/tornado-cash-governance-control-set-to-be-restored-as-token-votes-approve-proposal) reports it passed on 2023-05-26 with 517,000 token votes in favour and none against, restoring control to TORN holders. That article does not say any stolen tokens or ETH were returned.

## Timeline (UTC)

**Entry** (earlier attempt, malicious proposal) → **Execution** (code swap, votes) → **Money** (sales) → **Response** (restore proposal). Times are from the cited pages; unstated times are undisclosed.

| When | What happened | OAK |
|---|---|---|
| Week before 2023-05-20 | Several addresses locked 0 TORN in the governance vault, which Rekt describes as an earlier suspected attempt ([Rekt](https://rekt.news/tornado-gov-rekt)) | T9.003 (preparation) |
| 2023-05-20 | Proposal resembling an earlier passed one is approved by voters ([The Block](https://www.theblock.co/post/231637)) | **T16.005** |
| 2023-05-20 07:25:11 | Attacker replaces the proposal logic and gives themselves 1.2M votes ([Cointelegraph](https://cointelegraph.com/news/attacker-hijacks-tornado-cash-governance-via-malicious-proposal)); selfDestruct tx [`0xd3a570af795405e141988c48527a595434665089117473bc0389e83091391adb`](https://etherscan.io/tx/0xd3a570af795405e141988c48527a595434665089117473bc0389e83091391adb) per [Rekt](https://rekt.news/tornado-gov-rekt) | **T9.003** |
| 2023-05-20 | Attacker withdraws 10,000 TORN, sells it for $25,600 ([The Block](https://www.theblock.co/post/231637)) | T9.003 (extraction) |
| 2023-05-20 to 21 | About 483,000 TORN taken; roughly 6,000 TORN to Bitrue, 379,000 sold on-chain for about $680,000 in ether, just under 100,000 TORN left with the attacker ([The Block](https://www.theblock.co/post/231637)) | T9.003 (extraction) |
| Undisclosed | Part of the ETH routed through Tornado Cash ([Cointelegraph](https://cointelegraph.com/news/tornado-cash-governance-control-set-to-be-restored-as-token-votes-approve-proposal)) | **T7.001** |
| 2023-05-20 to 21 | Binance pauses TORN deposits and withdrawals; Huobi keeps them open ([The Block](https://www.theblock.co/post/231637)) | response |
| 2023-05-21 (just before midday) | Attacker publishes the revert proposal ([Rekt](https://rekt.news/tornado-gov-rekt), dated 2023-05-22) | — |
| 2023-05-26 | Revert proposal passes, 517,000 votes for, none against ([Cointelegraph](https://cointelegraph.com/news/tornado-cash-governance-control-set-to-be-restored-as-token-votes-approve-proposal)) | response |

Key addresses (all as printed by [Rekt](https://rekt.news/tornado-gov-rekt)):

- Exploiter address 1 — [`0x092123663804f8801b9b086b03b98d706f77bd59`](https://etherscan.io/address/0x092123663804f8801b9b086b03b98d706f77bd59)
- Exploiter address 2 — [`0x592340957ebc9e4afb0e9af221d06fdddf789de9`](https://etherscan.io/address/0x592340957ebc9e4afb0e9af221d06fdddf789de9)
- Proposal publisher — [`0x1FAd009aD35689B5a9B91486148F2F32AFE31e23`](https://etherscan.io/address/0x1FAd009aD35689B5a9B91486148F2F32AFE31e23)
- Malicious proposal contract — [`0xC503893b3e3c0C6b909222b45f2a3a259a52752D`](https://etherscan.io/address/0xC503893b3e3c0C6b909222b45f2a3a259a52752D)
- Destination of a transfer from exploiter 1 (onward flow not confirmed by Rekt) — [`0xd90e2f925da726b50c4ed8d0fb90ad053324f31b`](https://etherscan.io/address/0xd90e2f925da726b50c4ed8d0fb90ad053324f31b)

## Root-cause evidence

- **Technique:** OAK-T9.003
- **Source:** <https://rekt.news/tornado-gov-rekt>; <https://cointelegraph.com/news/attacker-hijacks-tornado-cash-governance-via-malicious-proposal>; <https://www.theblock.co/post/231637>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** All three are news pages, two dated within two days of the event, so the mechanism is not settled. They agree that an approved proposal was changed to grant 1.2M votes. They differ on the function (Rekt: `selfDestruct` plus CREATE/CREATE2 redeployment; Cointelegraph: `emergencyStop`). The Block says the added function was identified by samczsun. No operator post-mortem was opened. Loss and proceeds figures differ across pages as stated above.

## Public references

- Rekt, "Tornado Cash Governance" (2023-05-22): <https://rekt.news/tornado-gov-rekt>
- Cointelegraph, "Attacker hijacks Tornado Cash governance via malicious proposal" (2023-05-21): <https://cointelegraph.com/news/attacker-hijacks-tornado-cash-governance-via-malicious-proposal>
- Cointelegraph, "Tornado Cash governance control set to be restored as voters approve proposal" (2023-05-28): <https://cointelegraph.com/news/tornado-cash-governance-control-set-to-be-restored-as-token-votes-approve-proposal>
- The Block (2023-05-21): <https://www.theblock.co/post/231637>
