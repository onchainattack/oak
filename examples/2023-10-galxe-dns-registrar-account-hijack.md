# Galxe — registrar (Dynadot) account breach redirected galxe.com to a wallet-drainer page — Galxe / multi-chain — 2023-10-06

**Loss:** about \$148,000 per a FIP Crypto post and about \$160,000 held by the linked wallet at 17:15 UTC per DeBank, both relayed by [Cointelegraph](https://cointelegraph.com/news/galxe-protocol-experiences-dns-attack-october-6); [The Block](https://www.theblock.co/amp/post/255260/web3-platform-galxe-hit-by-dns-attack-on-front-end-website) reports "over \$160,000" received by the address ZachXBT linked to the attacker. Galxe then announced a refund of just over \$396,000 to more than 980 affected users plus 10% on the lost funds, paid in USDT on Polygon from the project treasury ([The Block](https://www.theblock.co/news/ecosystems/2023-10-11-galxe-announces-396000-refund-to-affected-users-following-dns-attack-255827)). The \$396K is the refund figure, not a separate theft total; the sources disagree on the stolen amount and do not reconcile it with the refund.

**OAK Techniques observed:** **OAK-T15.004** (Operator-Side Credential Compromise — *primary*; Galxe says the breach was through its Dynadot account). **OAK-T4.002** (Compromised-Frontend Permit Solicitation — the redirected site solicited approvals that drain wallets, per BlockFence quoted by Cointelegraph). See [`techniques/T15.004-operator-credential-compromise.md`](../techniques/T15.004-operator-credential-compromise.md).

**Attribution:** **pseudonymous.** ZachXBT linked the wallet below to the exploit and suggested a link to the 2023-09 Balancer DNS attack; Cointelegraph states this is a suggestion, not a confirmed finding.

**Key teaching point:** **Lock the domain at the registrar so a single account login cannot change DNS records.** Galxe's contracts were untouched; the breach of one registrar account was enough to serve a drainer from the real domain. Galxe says it regained the domain and strengthened account security with Dynadot.

## Summary

On 2023-10-06 Galxe reported a security breach affecting the DNS record for galxe.com through its Dynadot account (relayed by [The Block](https://www.theblock.co/amp/post/255260/web3-platform-galxe-hit-by-dns-attack-on-front-end-website)). Visitors were redirected to a phishing site that drains wallets, per BlockFence ([Cointelegraph](https://cointelegraph.com/news/galxe-protocol-experiences-dns-attack-october-6)). Galxe restored the domain and, per the refund notice, only users who authenticated transactions on the phishing site were affected. How the Dynadot account was breached is not stated in the sources opened; a community hacks database attributes it to social engineering, which is not a primary source.

## Timeline (UTC)

Stages: **Entry**, **Take**, **Money**, **Response**. Times are those given by Cointelegraph.

| When | What happened | OAK |
|---|---|---|
| Before 2023-10-06 (undisclosed) | Attacker gains access to Galxe's Dynadot registrar account; method undisclosed | **T15.004** |
| Before 2023-10-06 (undisclosed) | Drainer contract [`0x0000d38a234679F88dd6343d34E26DCB50C30000`](https://etherscan.io/address/0x0000d38a234679F88dd6343d34E26DCB50C30000) prepared; FIP Crypto says it was used across 10 networks (six named: Ethereum, Optimism, Arbitrum, BNB Chain, Base, Polygon) | — |
| 2023-10-06 14:44 | Galxe website goes offline; DNS records point to a phishing site that prompts wallet approvals | **T4.002** |
| 2023-10-06 ~15:24 | Galxe confirms the breach (about 40 minutes later, Cointelegraph); tells users to avoid the site | response |
| 2023-10-06 17:15 | Linked wallet [`0x4103babcfa68e97b4a29fa0b3c94d66afcf6163d`](https://etherscan.io/address/0x4103babcfa68e97b4a29fa0b3c94d66afcf6163d) holds about \$160,000 (DeBank, per Cointelegraph); onward movement of funds undisclosed in the sources opened | — |
| 2023-10-06 | Galxe regains domain ownership and hardens the account with Dynadot; says it engaged law enforcement | response |
| 2023-10-11 | Galxe announces refunds of just over \$396,000 to 980+ users plus 10% | response |

Key addresses:

- Attacker-linked wallet (ZachXBT) — [`0x4103babcfa68e97b4a29fa0b3c94d66afcf6163d`](https://etherscan.io/address/0x4103babcfa68e97b4a29fa0b3c94d66afcf6163d)
- Malicious contract — [`0x0000d38a234679F88dd6343d34E26DCB50C30000`](https://etherscan.io/address/0x0000d38a234679F88dd6343d34E26DCB50C30000)

## Root-cause evidence

- **Technique:** OAK-T15.004
- **Source:** <https://www.theblock.co/amp/post/255260/web3-platform-galxe-hit-by-dns-attack-on-front-end-website>; <https://cointelegraph.com/news/galxe-protocol-experiences-dns-attack-october-6>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** Both articles relay Galxe's own statement that the DNS record was changed through its Dynadot account. Neither gives the account-breach method. I did not open Galxe's original post.

## Public references

- The Block, "Web3 platform Galxe hit by DNS attack on front-end website" (2023-10-06): <https://www.theblock.co/amp/post/255260/web3-platform-galxe-hit-by-dns-attack-on-front-end-website>
- Cointelegraph, "Galxe protocol experiences DNS attack October 6": <https://cointelegraph.com/news/galxe-protocol-experiences-dns-attack-october-6>
- The Block, "Galxe announces \$396,000 refund to affected users following DNS attack" (2023-10-11): <https://www.theblock.co/news/ecosystems/2023-10-11-galxe-announces-396000-refund-to-affected-users-following-dns-attack-255827>
