# Nomad Bridge — a contract upgrade left the trusted root at 0x00, so any message counted as proven and hundreds of addresses copied the exploit — Nomad / Ethereum and other chains — 2022-08-01

**Loss:** **over \$190M** drained from the Nomad bridge ([Halborn post-mortem](https://halborn.com/the-nomad-bridge-hack-a-deeper-dive): TVL fell from \$190,740,000 to \$1,794 within hours; [Mandiant](https://cloud.google.com/blog/topics/threat-intelligence/dissecting-nomad-bridge-hack): "Over $190 million"). **Returned:** Halborn reports over \$33M returned to Nomad's wallet by whitehat hackers as of 2022-08-15; Mandiant, writing on 2022-11-29, reports "Ultimately $36 million of the $190 million stolen was returned." The two figures are from different dates and both are kept.

**OAK Techniques observed:** **OAK-T10.002** (Message-Verification Bypass — *primary*. After a contract upgrade the Replica contract accepted the zero root as valid, so unproven messages passed the check in `process`; see [`techniques/T10.002-message-verification-bypass.md`](../techniques/T10.002-message-verification-bypass.md)).

**Attribution:** **pseudonymous** for the exploitation as a whole: Mandiant describes many separate addresses and groups them by behaviour without naming anyone. [TRM Labs](https://www.trmlabs.com/resources/blog/key-suspect-in-190m-nomad-bridge-exploit-extradited-to-the-united-states) reports that Alexander Gurevich, a Russian-Israeli dual national, was arrested in Israel with US authorities and that he "now faces multiple federal charges in the US, including wire fraud, conspiracy, and money laundering." Charges are allegations; no source opened here reports a conviction.

**Key teaching point:** **Test the verification function against the zero value and every other default state after every upgrade, before the upgrade goes live.** The check that decides whether a message is proven treated the zero root as acceptable, and once one exploit transaction worked, anyone could replay it with their own address.

## Summary

A Nomad upgrade initialised the trusted root to `0x00`. [Halborn's explainer](https://www.halborn.com/blog/post/explained-the-nomad-hack-august-2022) says this "matches the value for an untrusted root, so all messages are automatically viewed as proven." Halborn's deeper dive, which cites Nomad's post-mortem, traces it to "an implementation bug in a June 21 smart contract upgrade." Once the flaw was used, [Halborn](https://www.halborn.com/blog/post/explained-the-nomad-hack-august-2022) reports that anyone could reuse a successful exploit transaction by submitting it with their own address, and [Mandiant](https://cloud.google.com/blog/topics/threat-intelligence/dissecting-nomad-bridge-hack) reports many addresses that took funds.

The bridge's message verification is described by Halborn as using an "optimistic mechanism" with a timer. Mandiant describes an off-chain agent, the Updater, that attests message data. None of the opened pages says that the Updater or any watcher failed, was offline or was censored: the zero root made the on-chain check accept messages.

## Timeline (UTC)

Stages: **Flaw** (upgrade) → **Take** (exploit and copies) → **Money** (returns, laundering) → **Response**. The block time comes from Halborn; other rows carry the date the source gives.

| When | What happened | OAK |
|---|---|---|
| 2022-06-21 (per Nomad's post-mortem as quoted by [Halborn](https://halborn.com/the-nomad-bridge-hack-a-deeper-dive)) | Smart contract upgrade with an implementation bug; replicas initialised with a zero committed root had `confirmAt[bytes32(0)]` set to 1, so `acceptableRoot(bytes32(0))` returned true. Other pages disagree on the date (see Root-cause evidence). | **T10.002** |
| 2022-08-01 21:32:31 | First exploit transactions in Ethereum block 15259101 ([Halborn](https://halborn.com/the-nomad-bridge-hack-a-deeper-dive)); unproven messages processed | **T10.002** |
| 2022-08-01, within hours | Other addresses copy the transaction with their own address; TVL falls from \$190,740,000 to \$1,794 ([Halborn](https://halborn.com/the-nomad-bridge-hack-a-deeper-dive)) | **T10.002** |
| 2022-08 to 2022-11 | Mandiant groups the taking addresses; some returned funds to a Nomad recovery address, others sent funds through Tornado Cash and other services ([Mandiant](https://cloud.google.com/blog/topics/threat-intelligence/dissecting-nomad-bridge-hack)). Individual transaction hashes: undisclosed on the pages opened. | — |
| After the exploit | Nomad offered a bounty of 10% of funds with no legal action if the rest was returned, plus a Whitehat NFT ([Mandiant](https://cloud.google.com/blog/topics/threat-intelligence/dissecting-nomad-bridge-hack)); over \$33M returned by 2022-08-15 ([Halborn](https://halborn.com/the-nomad-bridge-hack-a-deeper-dive)) | response |
| 2025-05 (page date) | TRM Labs reports arrest and extradition approval of a suspect, about \$88M traced to laundering wallets ([TRM Labs](https://www.trmlabs.com/resources/blog/key-suspect-in-190m-nomad-bridge-exploit-extradited-to-the-united-states)) | response |

Key addresses: none printed in full on the pages opened; undisclosed here.

## Root-cause evidence

- **Technique:** OAK-T10.002
- **Source:** <https://halborn.com/the-nomad-bridge-hack-a-deeper-dive>; <https://www.halborn.com/blog/post/explained-the-nomad-hack-august-2022>; <https://cloud.google.com/blog/topics/threat-intelligence/dissecting-nomad-bridge-hack>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** Halborn, citing Nomad's post-mortem, and Mandiant agree on the zero trusted root making all messages count as proven. Dates disagree: Halborn gives the faulty upgrade as June 21 (per Nomad) and the exploit as 2022-08-01; the Immunefi analysis (not opened: its page returned 403) is reported by a search summary to give April 21. Nomad's own root-cause post (Medium, 403, not opened) is also not read. Not established by an opened page: why no one stopped the exploit during the hours it ran.

## Public references

- [Halborn, "The Nomad Bridge Hack: A Deeper Dive"](https://halborn.com/the-nomad-bridge-hack-a-deeper-dive): upgrade date, block 15259101, over \$33M returned by 2022-08-15.
- [Halborn, "Explained: The Nomad Hack (August 2022)"](https://www.halborn.com/blog/post/explained-the-nomad-hack-august-2022): zero-root mechanism, replay by other addresses.
- [Mandiant / Google Cloud, "Decentralized Robbery: Dissecting the Nomad Bridge Hack and Following the Money"](https://cloud.google.com/blog/topics/threat-intelligence/dissecting-nomad-bridge-hack) (2022-11-29): \$36M returned, Updater, address groups.
- [TRM Labs, key suspect extradited](https://www.trmlabs.com/resources/blog/key-suspect-in-190m-nomad-bridge-exploit-extradited-to-the-united-states): charges, \$88M traced to laundering wallets.
