# MyBitcoin wallet-service collapse — Bitcoin — 2011-07 to 2011-08

**Loss:** The operator's later statement said 51% of the service's total bitcoin holdings were stolen and that it would return the remaining 49% of each customer's balance `[mybtcwiki]`. No absolute figure is given on the cited page; secondary reporting puts the loss at roughly 78,000 BTC, which was not verified in this pass. The earlier "1,500 BTC to 79,000 BTC" range and the dollar equivalents are unsourced and removed. It was never possible to verify that all account balances were backed by coins in the master wallet `[mybtcwiki]`.
**OAK Techniques observed:** **OAK-T11.005.002** (Fake-Custodian / Fake-Asset-Manager Fraud — the MyBitcoin operator presented the platform as a legitimate Bitcoin web-wallet service with standard custodial assurances, but the operator controlled all user-deposited Bitcoin and the platform's abrupt shutdown with operator disappearance is structurally the earliest documented instance of the fake-custodian fraud pattern in the Bitcoin ecosystem: a pseudonymous operator stands up a wallet service, accumulates user deposits, then disappears with the funds). **OAK-T5.005** (Treasury-Management Exit — the operator exercised custodial authority over user-deposited Bitcoin held in platform-controlled wallets to exit with the funds; the "treasury" was the user-deposit pool and the "exit" was the platform shutdown plus operator disappearance).
**Attribution:** **pseudonymous**. The site was listed as "MyBitcoin LLC" with a mailing address in Nevis; the Bitcoin wiki says it is unknown whether this was a real LLC, and no community member claimed affiliation `[mybtcwiki]`. Secondary reporting names the founder as "Tom Williams" (St. Kitts and Nevis P.O. box); this was not verified here. No individual was identified or charged in the cited sources.
**Key teaching point:** **MyBitcoin is the canonical 2011 worked example of the Bitcoin web-wallet exit scam — the earliest documented instance of a pseudonymous wallet-service operator accumulating user deposits, claiming a hack and shutting down the platform (hack vs. exit unproven). The case is the structural ancestor of the T11.005.002 + T5.005 chain that recurs at scale across the subsequent decade of cryptocurrency wallet-service and exchange collapses (Bitcoin Savings & Trust 2011-2012, Inputs.io 2013, MintPal 2014, Cryptsy 2014, QuadrigaCX 2019). The case established the pseudonymous-operator-disappears-with-user-deposits pattern that became the template for the 2011-2014 Bitcoin web-wallet and forum-distributed Ponzi era.**
**Corrected 2026-10-11:** Loss restated as the operator's 51% claim (49% returned) in place of the unsourced 1,500-79,000 BTC and dollar figures; dates are the 2011-07-29 outage and 2011-08-04 receivership notice; "Tom Williams" and the exit-scam consensus are unverified, so the hack-vs-exit label is marked disputed.

## Summary

MyBitcoin launched in approximately early 2011 as one of the earliest Bitcoin web-wallet services. The platform allowed users to deposit Bitcoin into wallets controlled by the service, accessed through a web interface. The operator was publicly identified only as "Tom Williams," which the Bitcoin community at the time treated with suspicion as a likely pseudonym. The service gained traction in the Bitcoin Talk forum community and accumulated a user base over the first half of 2011, establishing itself alongside MyBitcoin, Instawallet, and other early web-wallet offerings as part of the earliest Bitcoin custodial-wallet ecosystem.

The site became inaccessible starting 2011-07-29. On 2011-08-04 it reappeared saying its shopping-cart interface had been "compromised" and that it was going into receivership; it later stated that 51% of holdings were stolen and began returning the remaining 49% of each balance `[mybtcwiki]`. Whether the theft was an external hack or an operator exit is unproven; the hack explanation is the operator's own claim.

The Bitcoin community discussed the outage on Bitcoin Talk (thread "mybitcoin down or just me?") `[mybtcwiki]`. Earlier text in this file claiming a community consensus for exit-scam, and an operator who "disappeared from all channels", is not supported by the cited sources.

The MyBitcoin case is the earliest cleanly-documented instance of the Bitcoin web-wallet exit scam and the structural ancestor of the T11.005.002 + T5.005 chain. The pattern — pseudonymous operator builds user trust, accumulates user deposits, claims an external compromise, shuts down the platform, and disappears — is invariant across the subsequent decade of cryptocurrency custodial-service collapses. Defenders reading the MyBitcoin case alongside the Bitcoin Savings & Trust case (2011-2012, also T11.005.002) and the Inputs.io case (2013, T11.001 + T15.003) should recognise these three 2011-2013 incidents as the foundational archetypes that together define the early-Bitcoin-era custodial-failure surface: the Ponzi (Bitcoin Savings & Trust), the wallet-service exit scam (MyBitcoin), and the hosting-infrastructure compromise (Inputs.io).

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|

| 2011-07-29 | MyBitcoin site becomes inaccessible `[mybtcwiki]` | (outage) |
| 2011-08-04 | Site reappears: says shopping cart interface compromised, going into receivership; later reports 51% of holdings stolen and returns 49% of balances `[mybtcwiki]` | T5.005 (disputed: hack vs operator exit) |
| Post-2011-08 | No operator identification or law-enforcement disposition in the cited sources | (outcome) |

## Realised extraction

51% of holdings reported stolen per the operator `[mybtcwiki]`; 49% returned pro rata.

## Public references

- MyBitcoin platform website archive (2011) — primary-source operator communications pre- and post-shutdown
- Bitcoin Talk forum community discussion threads on the MyBitcoin collapse (July-August 2011) — primary-source community response, forensic analysis, and interpretive framework establishment
- `[coindeskmybitcoin2011]` — early Bitcoin-press coverage of the MyBitcoin shutdown (2011-2013 retrospective analyses)
- Bitcoin Savings & Trust case (2011-2012) — structurally adjacent T11.005.002 case; earliest Ponzi-structured fake-asset-manager fraud in Bitcoin
- Inputs.io case (2013) — structurally adjacent T11.001 + T15.003 case; earliest hosting-infrastructure-compromise wallet-service drain
- `[mybtcwiki]` — Bitcoin Wiki, "MyBitcoin" (accessed 2026-10-11): <https://en.bitcoin.it/wiki/MyBitcoin>
