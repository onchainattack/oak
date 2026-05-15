# Inputs.io web-wallet hack — Bitcoin — 2013-10

**Loss:** approximately 4,100 BTC stolen from the Inputs.io Bitcoin web-wallet service. At the 2013-10 Bitcoin price of approximately \$130-\$200/BTC, the loss equated to approximately \$530K-\$820K at the time of the breach. The amount represented nearly the entirety of user deposits held on the Inputs.io platform at the time of the compromise. No material on-chain recovery.
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing Vendor Compromise — broadly construed; Inputs.io was the custodial wallet vendor for its users, and the compromise of the platform's hosting infrastructure gave the attacker access to the Bitcoin wallet private keys that controlled all user-deposited funds. The wallet-service-as-vendor compromise shape is structurally T11.001: a third-party wallet provider whose signing-infrastructure compromise produces customer-side loss). **OAK-T15.003** (Operator Endpoint/Infrastructure Compromise — the attacker gained access to Inputs.io's hosting infrastructure, compromised the server environment where wallet private keys were stored, and drained the Bitcoin wallet balances; the proximate enabler was the operator's hosting-infrastructure security failure).
**Attribution:** **pseudonymous**. The Inputs.io operator was a pseudonymous individual operating under the online handle "TradeFortress" (later identified in community sources as an Australian resident operating under the pseudonym). No criminal charges, indictment, or law-enforcement disposition independently names any individual in connection with the Inputs.io compromise at the OAK v0.1 cutoff. The attacker was never publicly identified.
**Key teaching point:** **Inputs.io is the canonical 2013 worked example of the web-wallet compromise class — the pattern in which a pseudonymous operator's wallet service is compromised at the hosting-infrastructure layer and all user-deposited funds are drained. The case is the earliest cleanly-documented instance of the T11.001 + T15.003 chain in the web-wallet context: the wallet provider is the de-facto "signing vendor," the hosting-infrastructure compromise is the off-chain entry vector (T15.003), and the downstream on-chain extraction is the T11.001 event. The case illustrates the complete dependence of web-wallet security on the operator's hosting-infrastructure operational security, and it established the template for T11.001-class wallet-service compromises that recurred at scale across the 2014-2024 record (MintPal 2014, Bitfinex 2016, NiceHash 2017, Binance 2019, KuCoin 2020, Bybit 2025).**

## Summary

Inputs.io operated as a Bitcoin web-wallet service from approximately mid-2013, allowing users to deposit Bitcoin into wallets controlled by the platform. The service was operated by a pseudonymous individual under the online handle "TradeFortress," who had built a reputation in the Bitcoin Talk forum community as a developer of Bitcoin-related services and as the operator of an associated Bitcoin dice-game site.

In late October 2013, an attacker gained access to Inputs.io's hosting infrastructure and compromised the server environment where the platform's Bitcoin wallet private keys were stored. The attacker drained approximately 4,100 BTC — representing nearly the entirety of user deposits held by the platform — to attacker-controlled Bitcoin addresses. The operator "TradeFortress" publicly disclosed the breach on Bitcoin Talk and through community channels, acknowledging that the hosting-infrastructure compromise had enabled the attacker to access the wallet's private-key material and drain the balances. The operator stated that no user funds remained and that the platform would not be able to reimburse affected users.

The Inputs.io case is significant as the earliest cleanly-documented instance of the wallet-service compromise class where both the operator and the attacker were pseudonymous, the loss was total (no funds remained in the operator's control), and the attack vector was a hosting-infrastructure compromise rather than a social-engineering or phishing entry. The structural shape — pseudonymous operator, total-loss hosting-compromise, no reimbursement, no law-enforcement disposition — recurs across multiple subsequent wallet-service compromise incidents in the 2013-2017 record and is the canonical early-instance reference for the T11.001 + T15.003 chain in the web-wallet context.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2013 mid | Inputs.io launches as a Bitcoin web-wallet service operated by pseudonymous "TradeFortress" | (platform stand-up) |
| 2013-07 to 2013-10 | Users deposit ~4,100 BTC into Inputs.io platform-controlled wallets | T11.001 (wallet-service custody accumulation) |
| 2013-10-23 to 2013-10-25 | Attacker compromises Inputs.io hosting infrastructure; gains access to server environment storing wallet private keys | T15.003 (operator infrastructure compromise) |
| 2013-10-25 to 2013-10-26 | Attacker drains ~4,100 BTC from Inputs.io wallets to attacker-controlled addresses | T11.001 (wallet-service signing-infrastructure compromise) |
| 2013-10-26 to 2013-10-28 | "TradeFortress" publicly discloses the breach on Bitcoin Talk; states no user funds remain and no reimbursement will be possible | (operator disclosure) |
| Post-2013-10 | No material on-chain recovery; no law-enforcement disposition; attacker and operator both remain pseudonymous | (outcome) |

## Realised extraction

Approximately 4,100 BTC (~\$530K-\$820K at 2013-10 prices). No material on-chain recovery; no user reimbursement; no law-enforcement seizure.

## Public references

- "TradeFortress" Bitcoin Talk forum disclosure thread (October 2013) — primary-source operator disclosure of the Inputs.io compromise
- `[coindeskinputsio2013]` — CoinDesk. *Inputs.io Hacked: 4,100 BTC Stolen from Bitcoin Web Wallet Service.* October 2013; contemporaneous English-language press coverage
- Bitcoin Talk forum community discussion threads on the Inputs.io compromise and the operator's post-breach statements (October-November 2013)
- `[githubinputsio2013]` — TradeFortress GitHub repository and Inputs.io operational-archive materials (2013)
