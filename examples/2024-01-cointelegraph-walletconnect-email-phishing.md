# Cointelegraph, WalletConnect, Token Terminal and De.Fi — fake-airdrop phishing emails sent through a third-party email provider — Multichain — 2024-01-23

**Loss:** **~\$580K** drained to one address, per [ZachXBT's alert](https://x.com/zachxbt/status/1749758932095205638) (2024-01-23). [Cointelegraph](https://cointelegraph.com/news/coordinated-crypto-investor-phishing-campaign-email-alert) reports the figure as a running total held at one multichain address across 280 tokens, about 86% of it in ETH (227 ETH). Recovery: none reported on the opened pages.

**OAK Techniques observed:** **OAK-T15.002** (Supply-Chain / Vendor-Pipeline Compromise — *primary*, *reported*, not confirmed by the vendor). The emails went out under the real sender addresses of several projects, and the projects and Cointelegraph point to a breach at a shared upstream vendor, the email service provider MailerLite, rather than to lookalike domains alone ([Protos](https://protos.com/nearly-580k-drained-with-cointelegraph-wallet-connect-fake-airdrop/), [Cointelegraph](https://cointelegraph.com/news/coordinated-crypto-investor-phishing-campaign-email-alert)). MailerLite had not confirmed the breach when these pages were written. See [`techniques/T15.002-supply-chain-vendor-pipeline-compromise.md`](../techniques/T15.002-supply-chain-vendor-pipeline-compromise.md). The on-chain drain method (approval, permit or plain transfer) is not described on the opened pages, so no on-chain Technique is declared; Blockaid links the drainer to Angel Drainer ([Cointelegraph](https://cointelegraph.com/news/coordinated-crypto-investor-phishing-campaign-email-alert)).

**Attribution:** **pseudonymous** — receiving address [`0xe7D13137923142A0424771E1778865b88752B3c7`](https://etherscan.io/address/0xe7D13137923142A0424771E1778865b88752B3c7) ([ZachXBT](https://x.com/zachxbt/status/1749758932095205638)). No actor is named on the opened pages.

**Key teaching point:** **Treat the email service provider as part of your security perimeter: put hardware-backed MFA and API-key rotation on the provider account, and publish in advance that you never run airdrops by email.** The recipients' mail filters could not help, because the messages came from addresses the projects really use ([Cointelegraph](https://cointelegraph.com/news/coordinated-crypto-investor-phishing-campaign-email-alert)); the one reliable check for a reader is the rule that a project's announced channels, not an email link, are where an airdrop is claimed.

## Summary

On 2024-01-23 ZachXBT posted a [community alert](https://x.com/zachxbt/status/1749758932095205638) that phishing emails were being sent that appeared to come from CoinTelegraph, Wallet Connect, Token Terminal and DeFi team emails, with about $580K stolen so far. [Cointelegraph](https://cointelegraph.com/news/coordinated-crypto-investor-phishing-campaign-email-alert) names the impersonated senders as Cointelegraph, WalletConnect, Token Terminal and De.Fi, and says the emails promoted token airdrops. [Protos](https://protos.com/nearly-580k-drained-with-cointelegraph-wallet-connect-fake-airdrop/) lists the lures: a tenth-anniversary airdrop for Cointelegraph, a customer reward for WalletConnect, and staking options for De.Fi. Both outlets say the sender access came through a third-party email provider; Cointelegraph names MailerLite and says Hudson Rock reported finding CRYPTBOT infostealer malware on a MailerLite employee's computer. MailerLite said it was investigating. WalletConnect said the email was not issued by it or its affiliates. De.Fi said it was moving its databases to another provider.

## Timeline (UTC)

Stages: **Entry** (email provider) → **Execution** (phishing emails, drain) → **Money** → **Response**. Only the date is public; no times are given on the opened pages.

| When | What happened | OAK |
|---|---|---|
| Before 2024-01-23 (undisclosed) | Attackers gain the ability to send mail as the four projects. Reported route: a breach of MailerLite, which MailerLite had not confirmed ([Protos](https://protos.com/nearly-580k-drained-with-cointelegraph-wallet-connect-fake-airdrop/)); Hudson Rock reported infostealer malware on a MailerLite employee's computer ([Cointelegraph](https://cointelegraph.com/news/coordinated-crypto-investor-phishing-campaign-email-alert)) | **T15.002** |
| 2024-01-23 (time undisclosed) | Emails with fake airdrop links reach recipients under the Cointelegraph, WalletConnect, Token Terminal and De.Fi names ([Cointelegraph](https://cointelegraph.com/news/coordinated-crypto-investor-phishing-campaign-email-alert)) | **T15.002** |
| 2024-01-23 (time undisclosed) | Victims' funds are drained to [`0xe7D13137923142A0424771E1778865b88752B3c7`](https://etherscan.io/address/0xe7D13137923142A0424771E1778865b88752B3c7); about $580K by the time of ZachXBT's post ([Protos](https://protos.com/nearly-580k-drained-with-cointelegraph-wallet-connect-fake-airdrop/)) | none — drain method undisclosed |
| After 2024-01-23 | Movement of the funds from that address: undisclosed on the opened pages | — |
| 2024-01-23 | ZachXBT posts the alert; WalletConnect warns users; MailerLite says it is investigating; Cointelegraph's page was updated at 14:45 UTC ([Cointelegraph](https://cointelegraph.com/news/coordinated-crypto-investor-phishing-campaign-email-alert)) | response |

Key addresses:

- Receiving address (multichain) — [`0xe7D13137923142A0424771E1778865b88752B3c7`](https://etherscan.io/address/0xe7D13137923142A0424771E1778865b88752B3c7)

## Root-cause evidence

- **Technique:** OAK-T15.002
- **Source:** <https://cointelegraph.com/news/coordinated-crypto-investor-phishing-campaign-email-alert>; <https://protos.com/nearly-580k-drained-with-cointelegraph-wallet-connect-fake-airdrop/>; <https://x.com/zachxbt/status/1749758932095205638>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** Both news pages say the senders' access came through a third-party email provider and name MailerLite as the likely one; neither shows a statement from MailerLite confirming it. The same-day reporting is the only evidence. Not established: how the attackers got into the provider, which accounts they reached, how many emails went out, and how the drain transaction worked.

## Public references

- ZachXBT, community alert (X, 2024-01-23): <https://x.com/zachxbt/status/1749758932095205638>
- Cointelegraph, coordinated phishing campaign alert (2024-01-23, updated 14:45 UTC): <https://cointelegraph.com/news/coordinated-crypto-investor-phishing-campaign-email-alert>
- Protos, "Nearly $580K drained with Cointelegraph, Wallet Connect fake airdrop" (2024-01-23): <https://protos.com/nearly-580k-drained-with-cointelegraph-wallet-connect-fake-airdrop/>
