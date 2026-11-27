# CoinStats — attacker reached the services that held wallet keys and took the private keys of 1,590 CoinStats Wallets — CoinStats Wallet / multi-chain — 2024-06-22

**Loss:** **~\$2.2M** in crypto from **1,590 CoinStats Wallets**, about 1.3% of all CoinStats Wallets, per CoinStats' incident report as relayed by [DL News](https://www.dlnews.com/articles/people-culture/coinstats-issues-security-incident-report-on-june-attack/) and [The Block](https://www.theblock.co/post/305167/coinstats-says-2-2-million-worth-of-crypto-was-stolen-in-june-hack-by-sophisticated-attacker). CoinStats' first count of 1,590 wallets was posted on 2024-06-22 ([CoinStats on X](https://x.com/CoinStats/status/1804633869372559788)); [Security Affairs](https://securityaffairs.com/164895/cyber-crime/coinstats-crypto-wallets-security-breach.html) notes that some users reported thefts from wallets not on that list. No recovery is reported in DL News. On reimbursement, The Block says CoinStats declined to share specifics; affected users were asked to fill in a form by 2024-08-15 to be eligible for "any future support".

**OAK Techniques observed:** **OAK-T15.004** (Operator-Side Credential Compromise — *primary, operator-stated*). CoinStats says the attacker got in through "a combination of unauthorized intrusions across multiple services – including outside of CoinStats" ([The Block](https://www.theblock.co/post/305167/coinstats-says-2-2-million-worth-of-crypto-was-stolen-in-june-hack-by-sophisticated-attacker)), including a HashiCorp Vault instance in its own infrastructure and a third-party wallet-as-a-service provider ([CoinStats report](https://coinstats.app/blog/security-incident-report/), relayed). See [`techniques/T15.004-operator-credential-compromise.md`](../techniques/T15.004-operator-credential-compromise.md). **OAK-T4.011** (Push-Notification Infrastructure Compromise — *secondary, reported by one outlet only*): The Block says the attacker hijacked the platform and sent fraudulent notifications to mobile users. CoinStats' own report as relayed does not describe notifications, and no source says a MetaMask Snap was involved. See [`techniques/T4.011-push-notification-infrastructure-compromise.md`](../techniques/T4.011-push-notification-infrastructure-compromise.md).

**Attribution:** **inferred-weak** — CoinStats says it believes the attacker is the Lazarus Group or a similar nation-state-backed group ([DL News](https://www.dlnews.com/articles/people-culture/coinstats-issues-security-incident-report-on-june-attack/)). Its CEO linked the attack to the FBI-described TraderTraitor activity ([CEO on X, 2024-06-23](https://x.com/narek_gevorgyan/status/1804768718557266207)). CoinStats has not published the evidence, and no government source is cited.

**Key teaching point:** **Keep the keys of a non-custodial wallet out of reach of the operator's own cloud accounts, and treat the secrets that gate a wallet-as-a-service provider (2FA PINs, API credentials) as key material.** CoinStats says private keys were supposed to stay outside its control, yet the attacker obtained them for 1,590 wallets after reaching a vault and a third-party provider ([CoinStats report](https://coinstats.app/blog/security-incident-report/), relayed).

## Summary

CoinStats is a crypto portfolio tracker that also offers its own wallet, the CoinStats Wallet. On 2024-06-22 CoinStats told users that the attack was mitigated, that it had shut the application down to isolate the incident, and that 1,590 wallets were affected ([CoinStats on X](https://x.com/CoinStats/status/1804633869372559788)). Connected wallets and exchanges tracked read-only were not affected, because CoinStats does not import their keys ([CoinStats report](https://coinstats.app/blog/security-incident-report/), relayed). Its incident report followed on 2024-07-12 and put the loss at about \$2.2M. It describes intrusions into CoinStats' infrastructure and into third-party providers, and says the investigation continues ([DL News](https://www.dlnews.com/articles/people-culture/coinstats-issues-security-incident-report-on-june-attack/)). The report as relayed names a HashiCorp Vault instance that held wallet 2FA PINs and API credentials for a third-party wallet-as-a-service provider. How the intruders first got in is undisclosed.

## Timeline (UTC)

**Entry** is undisclosed. **Execution** is the key theft and drain of 1,590 wallets. **Money**: no tracing is public. **Response** is the shutdown, the affected-wallet list and the rebuild. Times are from CoinStats' own X post (read directly) and from its report (relayed through a summarising fetch).

| When | What happened | OAK |
|---|---|---|
| Before 2024-06-22 (undisclosed) | The attacker gains access to CoinStats infrastructure and third-party providers, including a HashiCorp Vault instance and a wallet-as-a-service provider's API credentials ([CoinStats report](https://coinstats.app/blog/security-incident-report/), relayed). How access was first obtained is undisclosed. | **T15.004** |
| 2024-06 (date undisclosed) | Fraudulent notifications reach mobile users, per [The Block](https://www.theblock.co/post/305167/coinstats-says-2-2-million-worth-of-crypto-was-stolen-in-june-hack-by-sophisticated-attacker). CoinStats' own report as relayed does not mention them. | T4.011 |
| 2024-06-22, about 18:00 (relayed) | CoinStats sees abnormal transfers from its non-custodial wallet, takes the whole platform offline and contacts the wallet provider ([CoinStats report](https://coinstats.app/blog/security-incident-report/), relayed). Private keys of 1,590 wallets were accessed. | **T15.004** |
| 2024-06-22 | Where the stolen funds went: undisclosed. CoinStats says SEAL, ZachXBT and MetaMask's head of security were tracing them as of the report ([DL News](https://www.dlnews.com/articles/people-culture/coinstats-issues-security-incident-report-on-june-attack/)). No addresses or hashes are published on the pages opened. | — |
| 2024-06-22 21:53 | CoinStats posts that the attack is mitigated, the app is shut down, and 1,590 wallets are affected, with a list of affected addresses in a [spreadsheet it links](https://docs.google.com/spreadsheets/d/1Lwxpy2T6W7aptjBJUio0Z01zihsqknXn6KPhzawQLVI/) ([post](https://x.com/CoinStats/status/1804633869372559788)). | response |
| 2024-06-23 06:49 | CoinStats' CEO says there is evidence the attack belongs to the group of hacks the FBI report ties to North Korea ([post](https://x.com/narek_gevorgyan/status/1804768718557266207)). | response |
| 2024-07-03 (relayed) | CoinStats restores all functions after rebuilding its production environment from scratch and moving to new cloud accounts ([CoinStats report](https://coinstats.app/blog/security-incident-report/), relayed). | response |
| 2024-07-12 | CoinStats publishes its incident report: about \$2.2M, 1,590 wallets, attribution to Lazarus or a related group; reports to local police and the FBI ([DL News](https://www.dlnews.com/articles/people-culture/coinstats-issues-security-incident-report-on-june-attack/)). | response |

Key addresses: none are printed in full on the pages opened. The affected wallets are listed in the spreadsheet CoinStats linked, which was not opened.

## Root-cause evidence

- **Technique:** OAK-T15.004
- **Source:** <https://coinstats.app/blog/security-incident-report/>; <https://www.theblock.co/post/305167/coinstats-says-2-2-million-worth-of-crypto-was-stolen-in-june-hack-by-sophisticated-attacker>; <https://www.dlnews.com/articles/people-culture/coinstats-issues-security-incident-report-on-june-attack/>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** CoinStats' own incident report states that the attacker got into CoinStats infrastructure and third-party providers, including a Vault instance holding wallet 2FA PINs and wallet-as-a-service API credentials, and obtained private keys of 1,590 wallets. The Block and DL News carry the same account. The first point of entry, and the way keys were read from the provider, are not public. The report page was read through a summarising fetch, so its wording is relayed here, not quoted.

## Public references

- CoinStats, "Update on the Security Incident" (2024-06-22): <https://x.com/CoinStats/status/1804633869372559788>
- CoinStats CEO post on attribution (2024-06-23): <https://x.com/narek_gevorgyan/status/1804768718557266207>
- CoinStats, security incident report (2024-07-12): <https://coinstats.app/blog/security-incident-report/>
- DL News, "CoinStats says \$2.2m stolen in June attack, Lazarus Group likely culprit" (2024-07-14): <https://www.dlnews.com/articles/people-culture/coinstats-issues-security-incident-report-on-june-attack/>
- The Block, "CoinStats says \$2.2 million worth of crypto was stolen in June hack by 'sophisticated attacker'" (2024-07-13): <https://www.theblock.co/post/305167/coinstats-says-2-2-million-worth-of-crypto-was-stolen-in-june-hack-by-sophisticated-attacker>
- Security Affairs, "Threat actors compromised 1,590 CoinStats crypto wallets" (2024-06-24): <https://securityaffairs.com/164895/cyber-crime/coinstats-crypto-wallets-security-breach.html>
