# Inputs.io web-wallet hack — Bitcoin — 2013-10

**Loss:** 4,100 BTC stolen from Inputs.io in two attacks on 2013-10-23 and 2013-10-26, reported at more than \$1 million at the time (`[ctinputs]`). A small amount of bitcoin from the operator's associated CoinLenders bank was also taken. The operator said he would repay what he could: clients holding more than 1 BTC were to be repaid from his own funds and cold storage, totalling just over 1,500 BTC, far less than the loss (`[ctinputs]`).
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing Vendor Compromise — broadly construed; Inputs.io was the custodial wallet vendor for its users, and the compromise of the platform's hosting infrastructure gave the attacker access to the Bitcoin wallet private keys that controlled all user-deposited funds. The wallet-service-as-vendor compromise shape is structurally T11.001: a third-party wallet provider whose signing-infrastructure compromise produces customer-side loss). **OAK-T15.003** (Operator Endpoint/Infrastructure Compromise — the attacker compromised old operator email accounts not linked to phone numbers, used them to reach the hosting-account information, and bypassed multi-factor authentication after a failure on the host server (`[ctinputs]`); the proximate enabler was the operator's account and hosting security failure).
**Attribution:** **pseudonymous**. The Inputs.io operator was an Australian developer known as "TradeFortress" who wished to remain anonymous (`[ctinputs]`). He said he would not report the incident to police (`[ctinputs]`). The attacker was never publicly identified.
**Corrected 2026-10-11:** Loss was \$1M+ (not \$530K-\$820K), in two attacks on 2013-10-23 and 2013-10-26; entry was takeover of the operator's email and hosting-account (with an MFA bypass caused by a host-server fault), not a direct server-side key theft; partial repayment was attempted.
**Key teaching point:** **Inputs.io is the canonical 2013 worked example of the web-wallet compromise class — the pattern in which a pseudonymous operator's wallet service is compromised at the hosting-infrastructure layer and the wallet is drained. The case is the earliest cleanly-documented instance of the T11.001 + T15.003 chain in the web-wallet context: the wallet provider is the de-facto "signing vendor," the hosting-infrastructure compromise is the off-chain entry vector (T15.003), and the downstream on-chain extraction is the T11.001 event. The case illustrates the complete dependence of web-wallet security on the operator's hosting-infrastructure operational security, and it established the template for T11.001-class wallet-service compromises that recurred at scale across the 2014-2024 record (MintPal 2014, Bitfinex 2016, NiceHash 2017, Binance 2019, KuCoin 2020, Bybit 2025).**

## Summary

Inputs.io operated as a Bitcoin web-wallet service (the launch date is not stated in the cited sources), allowing users to deposit Bitcoin into wallets controlled by the platform. The service was operated by a pseudonymous individual under the online handle "TradeFortress," an Australian developer who also ran the CoinChat chat room and the CoinLenders bitcoin bank (`[ctinputs]`).

In late October 2013, attackers compromised email accounts that were old and not linked to phone numbers, which made them easy to reset, then reached the operator's hosting-account information and bypassed multi-factor authentication because of a failure on the host server (`[ctinputs]`). They drained 4,100 BTC in two attacks, on 23 and 26 October (`[ctinputs]`). The operator waited until the following week to tell clients (`[ctinputs]`) and said the platform could not fully reimburse users, though he committed to repaying part of the loss (`[ctinputs]`).

The Inputs.io case is an early instance of the wallet-service compromise class; the cited reporting describes an account-takeover entry (old email accounts, host-account access, MFA bypass), not a direct server-side key theft. The structural shape — pseudonymous operator, total-loss hosting-compromise, no reimbursement, no law-enforcement disposition — recurs across multiple subsequent wallet-service compromise incidents in the 2013-2017 record and is the canonical early-instance reference for the T11.001 + T15.003 chain in the web-wallet context.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2013-10-23 | First attack; operator email/hosting-account takeover (`[ctinputs]`) | T15.003 (operator infrastructure compromise) |
| 2013-10-26 | Second attack; 4,100 BTC stolen across the two attacks (`[ctinputs]`) | T11.001 (wallet-service signing-infrastructure compromise) |
| Following week | Operator informs clients (`[ctinputs]`) | (operator disclosure) |
| Post-2013-10 | Operator says he will not report to police (`[ctinputs]`); partial repayment attempted; attacker unidentified | (outcome) |

## Realised extraction

4,100 BTC (more than \$1M per `[ctinputs]`). Partial repayment to larger holders attempted by the operator from ~1,500 BTC of own funds and cold storage; no law-enforcement seizure.

## Public references

- `[ctinputs]` — Cointelegraph, "Bitcoin website Inputs.io lost \$1M when hackers attacked two times" (2013-11-10): <https://cointelegraph.com/news/bitcoin-website-inputs-io-lost-1m-when-hackers-attacked-two-times>
- `[techcentralinputs]` — TechCentral, "Bitcoin 'bank' loses \$1.3m after hack" (2013-11-11): <https://www.techcentral.ie/bitcoin-bank-loses-1-3m-after-hack/>
- `[malwarebytesinputs]` — Malwarebytes, "Bitcoins, Pools and Thieves" (2013-11-12): <https://www.malwarebytes.com/blog/news/2013/11/bitcoins-pools-and-thieves>
