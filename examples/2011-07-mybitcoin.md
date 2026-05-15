# MyBitcoin wallet-service collapse — Bitcoin — 2011-07 to 2011-08

**Loss:** estimates vary across reporting sources from approximately 1,500 BTC to 79,000 BTC in user deposits lost when the MyBitcoin web-wallet service abruptly shut down in July-August 2011. At 2011 Bitcoin prices of approximately \$5-\$15/BTC, the loss equated to approximately \$7,500-\$1.2M USD at then-prevailing exchange rates. The most commonly cited figure in contemporaneous community discussion was approximately \$150K USD equivalent. The full magnitude of user deposits held by the platform at the time of its shutdown was never independently verified. No material on-chain recovery of user funds.
**OAK Techniques observed:** **OAK-T11.005.002** (Fake-Custodian / Fake-Asset-Manager Fraud — the MyBitcoin operator presented the platform as a legitimate Bitcoin web-wallet service with standard custodial assurances, but the operator controlled all user-deposited Bitcoin and the platform's abrupt shutdown with operator disappearance is structurally the earliest documented instance of the fake-custodian fraud pattern in the Bitcoin ecosystem: a pseudonymous operator stands up a wallet service, accumulates user deposits, then disappears with the funds). **OAK-T5.005** (Treasury-Management Exit — the operator exercised custodial authority over user-deposited Bitcoin held in platform-controlled wallets to exit with the funds; the "treasury" was the user-deposit pool and the "exit" was the platform shutdown plus operator disappearance).
**Attribution:** **pseudonymous**. The MyBitcoin service was operated by an individual using the name "Tom Williams," which the Bitcoin community at the time and subsequent historical analysis have treated as a pseudonym. The operator disappeared following the platform's shutdown and was never publicly identified. No criminal charges, indictment, or law-enforcement disposition independently names any individual in connection with MyBitcoin at the OAK v0.1 cutoff. The case sits in the genuinely-unattributed segment of the earliest Bitcoin-era record.
**Key teaching point:** **MyBitcoin is the canonical 2011 worked example of the Bitcoin web-wallet exit scam — the earliest documented instance of a pseudonymous wallet-service operator accumulating user deposits, claiming a hack, shutting down the platform, and disappearing with the funds. The case is the structural ancestor of the T11.005.002 + T5.005 chain that recurs at scale across the subsequent decade of cryptocurrency wallet-service and exchange collapses (Bitcoin Savings & Trust 2011-2012, Inputs.io 2013, MintPal 2014, Cryptsy 2014, QuadrigaCX 2019). The case established the pseudonymous-operator-disappears-with-user-deposits pattern that became the template for the 2011-2014 Bitcoin web-wallet and forum-distributed Ponzi era.**

## Summary

MyBitcoin launched in approximately early 2011 as one of the earliest Bitcoin web-wallet services. The platform allowed users to deposit Bitcoin into wallets controlled by the service, accessed through a web interface. The operator was publicly identified only as "Tom Williams," which the Bitcoin community at the time treated with suspicion as a likely pseudonym. The service gained traction in the Bitcoin Talk forum community and accumulated a user base over the first half of 2011, establishing itself alongside MyBitcoin, Instawallet, and other early web-wallet offerings as part of the earliest Bitcoin custodial-wallet ecosystem.

In late July 2011, the MyBitcoin service abruptly went offline. The operator claimed via the platform's website and through community channels that the service had been hacked and that user funds had been stolen. The initial public messaging stated that the operator was working to recover the lost funds, but within days the website displayed a revised message stating that recovery was not possible and that the operator was ceasing all efforts. The operator "Tom Williams" disappeared from all community forums and communication channels.

The Bitcoin community's response to the MyBitcoin collapse was structurally formative. Community discussion on Bitcoin Talk and early Bitcoin forums at the time established the interpretive framework that was subsequently applied to every Bitcoin wallet-service and exchange collapse of the 2011-2014 era: (a) the question of whether the shutdown was a genuine external hack or an operator-side exit scam (the community consensus at the time leaned strongly toward the exit-scam interpretation), (b) the pattern of a pseudonymous operator whose disappearance correlated perfectly with the platform's shutdown, and (c) the absence of any legal or regulatory recourse for affected users.

The MyBitcoin case is the earliest cleanly-documented instance of the Bitcoin web-wallet exit scam and the structural ancestor of the T11.005.002 + T5.005 chain. The pattern — pseudonymous operator builds user trust, accumulates user deposits, claims an external compromise, shuts down the platform, and disappears — is invariant across the subsequent decade of cryptocurrency custodial-service collapses. Defenders reading the MyBitcoin case alongside the Bitcoin Savings & Trust case (2011-2012, also T11.005.002) and the Inputs.io case (2013, T11.001 + T15.003) should recognise these three 2011-2013 incidents as the foundational archetypes that together define the early-Bitcoin-era custodial-failure surface: the Ponzi (Bitcoin Savings & Trust), the wallet-service exit scam (MyBitcoin), and the hosting-infrastructure compromise (Inputs.io).

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2011 early | MyBitcoin launches as one of the earliest Bitcoin web-wallet services; operator identified as "Tom Williams" (likely pseudonymous) | T11.005.002 (stand-up of fake-custodian platform) |
| 2011-01 to 2011-07 | MyBitcoin accumulates user base; users deposit Bitcoin into platform-controlled wallets | T11.005.002 (custodian-fraud accumulation phase) |
| 2011-07 late | MyBitcoin service abruptly goes offline; operator claims hack via platform website | (operator misdirection) |
| 2011-07 to 2011-08 | Operator updates platform message: recovery not possible, efforts ceasing; "Tom Williams" disappears from all community forums and communication channels | T5.005 (operator exit with user-deposit treasury) |
| Post-2011-08 | No material on-chain recovery; no operator identification; no law-enforcement disposition | (outcome) |

## Realised extraction

Estimates vary from ~1,500 to ~79,000 BTC (~\$7,500-\$1.2M at 2011 prices). Most commonly cited community estimate: approximately \$150K USD equivalent. No material on-chain recovery; no operator identification; no law-enforcement disposition.

## Public references

- MyBitcoin platform website archive (2011) — primary-source operator communications pre- and post-shutdown
- Bitcoin Talk forum community discussion threads on the MyBitcoin collapse (July-August 2011) — primary-source community response, forensic analysis, and interpretive framework establishment
- `[coindeskmybitcoin2011]` — early Bitcoin-press coverage of the MyBitcoin shutdown (2011-2013 retrospective analyses)
- Bitcoin Savings & Trust case (2011-2012) — structurally adjacent T11.005.002 case; earliest Ponzi-structured fake-asset-manager fraud in Bitcoin
- Inputs.io case (2013) — structurally adjacent T11.001 + T15.003 case; earliest hosting-infrastructure-compromise wallet-service drain
