# Flexcoin Bitcoin bank closure after hot-wallet hack — Bitcoin — 2014-03-02 to 2014-03-04

**Loss:** 896 BTC taken from Flexcoin's hot wallet on 2014-03-02, reported at about \$570,000 (`[welivesecflex]`). Cold-storage coins were offline and out of the attacker's reach; Flexcoin said holders would be contacted to verify identity and the coins transferred out free of charge (`[domainsflex]`). Flexcoin announced it was shutting down and "closing our doors immediately" (`[domainsflex]`). **Recovery:** the operator said it would attempt to work with law enforcement to trace the hack (`[domainsflex]`); no recovery of the 896 BTC is reported in the sources cited.
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing-Vendor Compromise — broadly construed; Flexcoin operated as a custodial "Bitcoin bank" where customer funds were held in operator-controlled hot wallets. The hot-wallet loss drained customer-deposited funds. The structural shape is a custodial service drained by an external attacker, which then closed). **OAK-T6.007** (Trust-Substrate Shift / Vendor-Promise Revocation — Flexcoin's closure in early March 2014 ("We have failed the Bitcoin community", `[welivesecflex]`) revoked the trust-substrate claim that the Bitcoin bank was a safe custody destination. Cold-storage holders were to be paid out, but hot-wallet balances were lost.). **OAK-T15.003** (Operator Endpoint/Infrastructure Compromise — the cited reporting describes a flaw in the transfer code exploited with many simultaneous requests, not a server compromise: `[welivesecflex]`; a different technique, such as an application-logic race condition, may fit better).
**Attribution:** **unattributed**. No attacker is named in the cited sources.
**Corrected 2026-10-11:** Entry was a race condition in transfer code (not a server compromise); the closure notice said cold-storage coins would be returned after identity verification (not withheld); the quoted "has been hacked and all funds have been stolen" and the terms-of-service claims are unsourced and removed.
**Key teaching point:** **Flexcoin is an early case of a small custodial "Bitcoin bank" closing after a hot-wallet loss: a transfer-code race condition let an attacker overdraw accounts and withdraw 896 BTC, while offline cold storage survived.** The framing of it as the earliest such case and as the template for later exchange closures is OAK's own and is not sourced.

## Summary

Flexcoin was a small Bitcoin "bank" (launch date not established in the cited sources) that operated a custodial wallet service where users could deposit Bitcoin for safekeeping. The service branded itself as a "Bitcoin bank" — a predecessor to the custodial-wallet and centralized-exchange custody models that would dominate later years. Flexcoin stored customer deposits in two wallet tiers: a hot wallet for day-to-day withdrawals (connected to the internet) and a cold-storage wallet for long-term holdings (offline).

Flexcoin's statement says that on 2014-03-02 it "was attacked and robbed of all coins in the hot wallet" and the attacker made off with 896 BTC (`[domainsflex]`). A flaw in the code for transfers between Flexcoin users let the attacker send many simultaneous requests, moving coins between accounts until the sending account was overdrawn before balances updated; the attacker repeated this across accounts and withdrew the coins (`[welivesecflex]`). Flexcoin then announced it was shutting down; cold-storage coins were offline and users would verify identity to have them transferred out free of charge (`[domainsflex]`).

The claims in earlier drafts that the operator invoked terms-of-service disclaimers, that it was widely criticised for abdicating responsibility, and that the case directly motivated licensing and proof-of-reserves rules are not supported by the cited sources and should be read as unverified commentary. The closure came about two weeks after the Mt. Gox collapse (`[welivesecflex]`).

## Timeline (UTC unless noted)

| When | Event | OAK ref |
|---|---|---|
| 2011–2014 | Flexcoin operates as a custodial "Bitcoin bank" with hot-wallet and cold-storage tiers; customer funds stored in operator-controlled wallets | (standing T11.001 surface) |
| 2014-03-02 | Transfer-code race condition exploited; 896 BTC withdrawn from hot wallet (`[welivesecflex]`, `[domainsflex]`) | T11.001 (custody compromise) |
| 2014-03-04 | Flexcoin announces it is shutting down; cold-storage coins to be returned after identity verification (`[domainsflex]`) | T6.007 (trust-substrate shift) |

## Realised extraction

896 BTC (~\$570K per `[welivesecflex]`) from the hot wallet. Cold-storage coins were unaffected and to be transferred out after identity verification (`[domainsflex]`). Recovery of the stolen coins is not reported.

## What defenders observed

- The cited sources show a transfer-code race condition: many simultaneous transfer requests moved coins until the sending account was overdrawn before balances updated (`[welivesecflex]`). Earlier drafts of this section drew broader lessons (terms-of-service disclaimers, licensing and proof-of-reserves reforms, a paired Mt. Gox template); those are unsourced commentary and have been removed.

## Public references

- `[welivesecflex]` — WeLiveSecurity, "Bitcoin bank Flexcoin shuts down after attackers loot \$570,000 from hot wallet" (2014-03-05): <https://welivesecurity.com/2014/03/05/bitcoin-bank-flexcoin-shuts-down-after-attackers-loot-570000-from-hot-wallet>
- `[domainsflex]` — TheDomains, "Flexcoin the Bitcoin bank shuts down after losing 896 bitcoins" (2014-03-04), quoting Flexcoin's statement: <https://www.thedomains.com/2014/03/04/flexcoin-the-bitcoin-bank-shuts-down-after-losing-896-bitcoins>
