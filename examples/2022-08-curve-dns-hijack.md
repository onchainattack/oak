# Curve Finance — front-end DNS hijack served a cloned site that asked users to approve a malicious contract — curve.fi / Ethereum — 2022-08-09

**Loss:** **~\$570K** per user reports ([Chain Bulletin](https://chainbulletin.com/curve-finance-finds-and-resolves-site-exploit): about $570,000; [Cointelegraph](https://cointelegraph.com/news/breaking-curve-finance-team-warns-users-to-avoid-using-site-until-further-notice): over $573,000). Curve made no official statement of the amount on the Chain Bulletin page. Recovery: undisclosed.

**OAK Techniques observed:** **OAK-T4.002** (Compromised Front-End Permit Solicitation — *primary*). The curve.fi domain was pointed at a cloned site that asked visitors to approve a malicious contract ([Chain Bulletin](https://chainbulletin.com/curve-finance-finds-and-resolves-site-exploit), [AiCoin](https://www.aicoin.com/en/article/310093?lang=en)). Curve's smart contracts were not reported as affected. See [`techniques/T4.002-compromised-frontend-permit-solicitation.md`](../techniques/T4.002-compromised-frontend-permit-solicitation.md). An operator-credential Technique is not declared: where the DNS control was lost is disputed (see Root-cause evidence). A mixer laundering Technique is not declared: no opened page mentions the route of the funds.

**Attribution:** **unattributed** — no opened page names an actor.

**Key teaching point:** **Lock the domain and the DNS path of your front-end the way you lock a contract: registry lock on the domain, change alerts on nameserver and A-record changes, and a published list of the canonical contract addresses wallets can check against.** Curve's second domain, curve.exchange, stayed up because it used a different DNS provider ([Cointelegraph](https://cointelegraph.com/news/breaking-curve-finance-team-warns-users-to-avoid-using-site-until-further-notice)); a user could not tell the cloned site from the real one without checking the contract they were approving.

## Summary

On 2022-08-09 Curve warned on Twitter not to use its front-end and said the nameserver was compromised ([Cointelegraph](https://cointelegraph.com/news/breaking-curve-finance-team-warns-users-to-avoid-using-site-until-further-notice)). Per [Chain Bulletin](https://chainbulletin.com/curve-finance-finds-and-resolves-site-exploit), the attacker redirected curve.fi to a cloned site at an IP the attacker controlled, and the clone added an approval request to a malicious contract. Curve told anyone who had approved contracts in the previous few hours to revoke them, and said the issue was found and reverted about an hour after the first warning ([Chain Bulletin](https://chainbulletin.com/curve-finance-finds-and-resolves-site-exploit)). Curve said its DNS provider iwantmyname was likely hacked and that it changed its nameserver ([Cointelegraph](https://cointelegraph.com/news/breaking-curve-finance-team-warns-users-to-avoid-using-site-until-further-notice)); another source quotes TCPshield's Steven Ferguson as saying early investigation suggested this did not appear to be a hijack at the registrar level ([AiCoin](https://www.aicoin.com/en/article/310093?lang=en)).

## Timeline (UTC)

Stages: **Entry** (DNS) → **Execution** (cloned site, approvals) → **Money** → **Response**. Times are not given on the opened pages; only the date is.

| When | What happened | OAK |
|---|---|---|
| Before 2022-08-09 (undisclosed) | The point where DNS control was lost is undisclosed; Curve said the nameserver was compromised and its provider iwantmyname was likely hacked ([Cointelegraph](https://cointelegraph.com/news/breaking-curve-finance-team-warns-users-to-avoid-using-site-until-further-notice)) | **T4.002** |
| 2022-08-09 | curve.fi resolves to an attacker-controlled IP serving a clone that asks for approval of a malicious contract ([Chain Bulletin](https://chainbulletin.com/curve-finance-finds-and-resolves-site-exploit)) | **T4.002** |
| 2022-08-09 | Users who signed grant approvals to the contract [`0x9eb5f8e83359bb5013f3d8eee60bdce5654e8881`](https://etherscan.io/address/0x9eb5f8e83359bb5013f3d8eee60bdce5654e8881), which Curve told users to revoke ([AiCoin](https://www.aicoin.com/en/article/310093?lang=en)); users reported about $570K taken ([Chain Bulletin](https://chainbulletin.com/curve-finance-finds-and-resolves-site-exploit)) | **T4.002** |
| After 2022-08-09 | Where the stolen funds went: undisclosed on the opened pages | — |
| 2022-08-09 | Curve warns users off the front-end, points them to curve.exchange (different DNS provider), tells them to revoke recent approvals, switches nameservers and says the issue was found and reverted about an hour after the first warning ([Chain Bulletin](https://chainbulletin.com/curve-finance-finds-and-resolves-site-exploit), [Cointelegraph](https://cointelegraph.com/news/breaking-curve-finance-team-warns-users-to-avoid-using-site-until-further-notice)) | response |

Key addresses:

- Malicious contract users were told to revoke — [`0x9eb5f8e83359bb5013f3d8eee60bdce5654e8881`](https://etherscan.io/address/0x9eb5f8e83359bb5013f3d8eee60bdce5654e8881) (as printed by [AiCoin](https://www.aicoin.com/en/article/310093?lang=en))

## Root-cause evidence

- **Technique:** OAK-T4.002
- **Source:** <https://chainbulletin.com/curve-finance-finds-and-resolves-site-exploit>; <https://cointelegraph.com/news/breaking-curve-finance-team-warns-users-to-avoid-using-site-until-further-notice>; <https://www.aicoin.com/en/article/310093?lang=en>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** The pages relay Curve's own same-day posts: the front-end and nameserver were affected, the issue was reverted, and users should revoke approvals. That the front-end was replaced by a clone asking for approvals is consistent across the three pages. Disputed: where DNS control was lost. Curve said iwantmyname was likely hacked; one source quotes TCPshield saying it did not appear to be a registrar-level hijack. Not established on the opened pages: the exact amount, the receiving addresses, and the laundering route.

## Public references

- Chain Bulletin, "Curve Finance Finds and Resolves Site Exploit" (2022-08-10): <https://chainbulletin.com/curve-finance-finds-and-resolves-site-exploit>
- Cointelegraph, Curve Finance team warns users to avoid the site (2022-08-09): <https://cointelegraph.com/news/breaking-curve-finance-team-warns-users-to-avoid-using-site-until-further-notice>
- AiCoin, "Here's What Happened During Curve Finance's Hijacking That Put Funds at Risk": <https://www.aicoin.com/en/article/310093?lang=en>
