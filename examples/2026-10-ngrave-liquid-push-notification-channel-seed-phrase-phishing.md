# Ngrave — attackers took over the third-party service that sends LIQUID push notifications and used it to send a fake security alert that harvested recovery phrases — Ngrave LIQUID / Bitcoin, XRP Ledger, Ethereum, Stellar (Bitquery also lists Solana, Dogecoin) — 2026-10-17

**Loss:** **~\$2.56M** per [Ngrave's own incident report](https://www.ngrave.io/en/blog/incident-report-fake-liquid-security-alert-17-october) (relayed through a summarising fetch), from about 70 wallet addresses on four networks at 17 October prices, described there as a minimum: Bitcoin \$1.77M, XRP \$454k, Ethereum \$316k (the report's flow chart says \$313k), Stellar \$18k. [Crowdfund Insider](https://www.crowdfundinsider.com/2026/10/319770-phishing-campaign-hijacks-ngrave-push-notifications-drains-about-2-56-million-from-users/) repeats \$2.56M. [CryptoSlate](https://cryptoslate.com/crypto-wallet-security-crisis-deepens-as-ngrave-users-face-2-65-million-phishing-attack/) gives about \$2.65M across 84 wallets, citing [Bitquery](https://bitquery.io/investigations/ngrave-liquid-hack), estimates that CryptoSlate labels "suspected"; some wallets may belong to victims of another scam, per CryptoSlate. Recovery: none reported; at 09:00 UTC on 2026-10-19 Bitquery found about \$2.16M held as XMR1 on Hyperliquid, not sold or withdrawn. Reimbursement: undisclosed in the pages opened.

**OAK Techniques observed:** **OAK-T4.011** (Push-Notification Infrastructure Compromise — *primary*, per Ngrave). The attacker took over the notification channel the vendor itself uses to reach its app users, and used that trusted channel to send a phishing alert. See [`techniques/T4.011-push-notification-infrastructure-compromise.md`](../techniques/T4.011-push-notification-infrastructure-compromise.md). **OAK-T11.007.003** (Brand-Trust-Leveraged Active Phishing for Seed-Phrase Exfiltration — the payload step: a counterfeit vendor site asked for the 24-word recovery phrase or the "Perfect Key", while the hardware devices themselves were not touched). See [`techniques/T11.007.003-brand-trust-active-phishing-seed-exfiltration.md`](../techniques/T11.007.003-brand-trust-active-phishing-seed-exfiltration.md). No laundering Technique is declared: the sources describe swaps, bridges and exchange deposits, but this file does not trace them.

**Attribution:** **unattributed** (no source opened names an actor).

**Key teaching point:** **A vendor's notification credentials must be able to do nothing except what the vendor approved.** Ngrave's own remediation list is two-person approval for notifications and in-app messages, least-privilege keys, rotation at least every 90 days and a single kill switch ([Ngrave report](https://www.ngrave.io/en/blog/incident-report-fake-liquid-security-alert-17-october)). The CEO says the attackers "used access keys with far more power than they needed". Users cannot detect this at the alert; the standing rule is that a wallet vendor never asks for the recovery phrase.

## Summary

Ngrave says attackers hijacked a third-party provider that sends push notifications for its LIQUID companion app, used one access key to obtain a second, more powerful key, and at 21:30 UTC on 2026-10-17 sent a fake security alert by push notification and in-app banner ([Ngrave report](https://www.ngrave.io/en/blog/incident-report-fake-liquid-security-alert-17-october)). The alert claimed a portfolio had synced with a Pixel 9 device in Moscow ([Crowdfund Insider](https://www.crowdfundinsider.com/2026/10/319770-phishing-campaign-hijacks-ngrave-push-notifications-drains-about-2-56-million-from-users/); [CryptoSlate](https://cryptoslate.com/crypto-wallet-security-crisis-deepens-as-ngrave-users-face-2-65-million-phishing-attack/)). It led to a copycat site with a "Was this you?" screen and a countdown; Deny led to a page asking for the Perfect Key or 24-word phrase, and scripts emptied wallets within minutes of entry. Ngrave says LIQUID's app code and ZERO secrets were not breached and private keys never left ZERO devices. Ngrave published its report on 2026-10-19.

## Timeline (UTC)

Stages: **Entry** (provider access, from 2026-10-11) → **Execution** (fake alerts and phishing site) → **Money** (drains and onward movement) → **Response**. Times are from the [Ngrave report](https://www.ngrave.io/en/blog/incident-report-fake-liquid-security-alert-17-october) unless stated; Crowdfund Insider gives matching times for the events it covers.

| When | What happened | OAK |
|---|---|---|
| 2026-10-11 | Earliest sign of the attacker using the notification provider's access. How the first key was obtained: undisclosed in the pages opened. | **T4.011** |
| 2026-10-17 (before 21:30) | Attacker uses one key to obtain a second, more powerful key; it could send messages and read and change some LIQUID analytics data. Ngrave is still checking whether anything was changed. | **T4.011** |
| 2026-10-17 21:30 | Fake security alert sent to LIQUID users by push notification and in-app banner. | **T4.011** |
| 2026-10-17 21:31 | Ngrave spots the alert and starts shutting it down. | response |
| 2026-10-17 21:36 | First wallet emptied after phrase or Perfect Key entered on the fake site. | **T11.007.003** |
| 2026-10-17 21:40 | First stolen key cut off; alerts continue through the second key. | response |
| 2026-10-17 22:30 / 22:40 | Warning posted on X; warning email sent to customers. | response |
| 2026-10-17 22:45 | All notification sending shut down. | response |
| 2026-10-17 23:14 | Fake website reported to the company that registered its domain. | response |
| 2026-10-17 23:28 to 2026-10-18 04:20 | Attacker moves funds to an exchange, a bridge service and new addresses. Bitcoin collected in one address then split across 12 new addresses; XRP into ChangeNOW in 54 deposits; Ethereum tokens sold for ETH and 130.47 ETH moved via LI.FI (Ngrave). Bitquery adds 12 Chainflip swaps for Bitcoin, Mayan and Arbitrum for Solana, and 39 Hyperliquid accounts holding XMR1. | — |
| 2026-10-18 03:51 | Last theft traced. | **T11.007.003** |
| 2026-10-18 09:37 | Every key used by live systems replaced. | response |
| 2026-10-19 | Ngrave publishes its incident report; Bitquery reads balances at 09:00. | response |

Key addresses (all from [Bitquery](https://bitquery.io/investigations/ngrave-liquid-hack); Ngrave's report and both news articles print no addresses or transaction hashes; Bitquery prints no transaction hashes, so those are undisclosed). Each address below was checked character by character against the raw text of the Bitquery page on 2026-11-27:

- Bitcoin collecting address — [`bc1qtsp4s6mv8536lwnc7zjz87p66k6ldt0g88nl60`](https://mempool.space/address/bc1qtsp4s6mv8536lwnc7zjz87p66k6ldt0g88nl60) (\$1.76M)
- Ethereum collecting address — [`0x17b79d57824f6b902bf36562efb4e861bcc5f4b4`](https://etherscan.io/address/0x17b79d57824f6b902bf36562efb4e861bcc5f4b4) (\$315k)
- XRP collecting address — [`rpDQgRrAxTVqJ31WpAMDKf2SKgRUynyBoK`](https://xrpscan.com/account/rpDQgRrAxTVqJ31WpAMDKf2SKgRUynyBoK) (\$453k)
- Stellar collecting address — [`GCB7GXPFC3NLXT6MWLD2GCGH7ADX6NTST6EQKCIAAOSDEL7AJBPGARV5`](https://stellar.expert/explorer/public/account/GCB7GXPFC3NLXT6MWLD2GCGH7ADX6NTST6EQKCIAAOSDEL7AJBPGARV5) (\$19k)
- Solana, Dogecoin and the 39 Hyperliquid accounts: listed in full on the Bitquery page, not repeated here.

## Root-cause evidence

- **Technique:** OAK-T4.011
- **Source:** <https://www.ngrave.io/en/blog/incident-report-fake-liquid-security-alert-17-october>; <https://www.crowdfundinsider.com/2026/10/319770-phishing-campaign-hijacks-ngrave-push-notifications-drains-about-2-56-million-from-users/>; <https://cryptoslate.com/crypto-wallet-security-crisis-deepens-as-ngrave-users-face-2-65-million-phishing-attack/>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** The operator's own report, two days after the event, states the mechanism: a hijacked third-party notification provider, a second more powerful key, a fake alert and a phrase-harvesting site. The CEO is quoted as saying the "internal notification system was infiltrated" and that Ngrave "absolutely and utterly failed". Two news outlets repeat it. Still unknown: how the first key was obtained, what the second key changed, and the exact victim count (Ngrave about 70 addresses, Bitquery 84 wallets on six chains, with possible overlap with other scams). Loss figures are Ngrave's minimum traced figure and Bitquery's estimate, not audited totals. Technique fit: T4.011's present text centres on a MetaMask Snap case; this incident matches the class of taking over a vendor's own notification channel to phish its users, not the Snap payload.

## Public references

- `[ngrave2026]` — Ngrave, "Incident report: fake LIQUID security alert, 17 October" (2026-10-19): <https://www.ngrave.io/en/blog/incident-report-fake-liquid-security-alert-17-october>
- `[crowdfundinsider2026ngrave]` — Crowdfund Insider, "Phishing campaign hijacks Ngrave push notifications, drains about \$2.56 million from users" (2026-10-21): <https://www.crowdfundinsider.com/2026/10/319770-phishing-campaign-hijacks-ngrave-push-notifications-drains-about-2-56-million-from-users/>
- `[cryptoslate2026ngrave]` — CryptoSlate, "Crypto wallet security crisis deepens as Ngrave users face \$2.65 million phishing attack" (2026-10-20): <https://cryptoslate.com/crypto-wallet-security-crisis-deepens-as-ngrave-users-face-2-65-million-phishing-attack/>
- `[bitquery2026ngrave]` — Bitquery, "Ngrave LIQUID hack" investigation: <https://bitquery.io/investigations/ngrave-liquid-hack>
