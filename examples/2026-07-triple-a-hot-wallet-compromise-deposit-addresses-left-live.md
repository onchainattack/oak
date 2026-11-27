# Triple-A — unauthorised access to a payment processor's own wallets, with new deposits still swept for more than 31 hours — Triple-A (Singapore) / Ethereum, TRON, Polygon, Arbitrum, Solana, TON, Bitcoin — 2026-07-24

**Loss:** **~\$11.8M**, an on-chain estimate by the investigator Specter, revised up from \$9.3M; PeckShield's interim figure was above \$9.7M ([The Block](https://theblock.co/news/defi/2026-07-26-triple-a-hot-wallet-losses-climb-to-11-8-million-as-new-deposits-keep-being-swept-report-409678)). Triple-A has not disclosed the amount ([Cointelegraph](https://cointelegraph.com/news/triple-a-treasury-wallet-breach-11-8-million-loss)). It says the loss falls on its own operational accounts, that it will absorb the cost from treasury reserves, and that client funds are not affected ([Fintech News Singapore](https://fintechnews.sg/134885/crypto/triple-a-treasury-wallet-breach-11-8-million/)).

**OAK Techniques observed:** none — Triple-A has not disclosed how the wallets were accessed or what they held ([The Block](https://theblock.co/news/defi/2026-07-26-triple-a-hot-wallet-losses-climb-to-11-8-million-as-new-deposits-keep-being-swept-report-409678), [Cointelegraph](https://cointelegraph.com/news/triple-a-treasury-wallet-breach-11-8-million-loss)), so no entry vector or key-compromise Technique can be matched. The earlier version of this file declared an operator-credential Technique and a liquidity-pool drain Technique; the sources support neither.

**Attribution:** **unattributed.** No source opened names an actor. Proceeds were swapped across chains and consolidated into one Ethereum address, per PeckShield as relayed by [Fintech News Singapore](https://fintechnews.sg/134885/crypto/triple-a-treasury-wallet-breach-11-8-million/); the address is not printed in full in any opened page.

**Key teaching point:** **When an operator's wallets are compromised, securing infrastructure is not containment while published deposit addresses still route new funds into those wallets.** Specter reports that the compromised wallets kept receiving deposits that were swept for more than 31 hours after the first exploit ([Fintech News Singapore](https://fintechnews.sg/134885/crypto/triple-a-treasury-wallet-breach-11-8-million/)), while Triple-A says services were in maintenance mode for about three hours ([Cointelegraph](https://cointelegraph.com/news/triple-a-treasury-wallet-breach-11-8-million-loss)). Whether the deposit addresses were deliberately left live is not stated by Triple-A.

## Summary

Triple-A is a Singapore payment firm holding a Major Payment Institution licence from the Monetary Authority of Singapore ([The Block](https://theblock.co/news/defi/2026-07-26-triple-a-hot-wallet-losses-climb-to-11-8-million-as-new-deposits-keep-being-swept-report-409678)). Specter first flagged a drain of more than \$9.3M on 2026-07-24, with assets swapped and bridged to Ethereum. Triple-A said on 2026-07-25 that it had identified unauthorised access to wallets holding the company's own assets, and announced the incident on 2026-07-27 ([Cointelegraph](https://cointelegraph.com/news/triple-a-treasury-wallet-breach-11-8-million-loss)). By 2026-07-26 Specter put the loss near \$11.8M, including a further \$1.8M across Bitcoin and TRON, with new deposits still being drained ([The Block](https://theblock.co/news/defi/2026-07-26-triple-a-hot-wallet-losses-climb-to-11-8-million-as-new-deposits-keep-being-swept-report-409678)).

## Timeline (UTC)

Stages: **Entry**, **Execution**, **Money**, **Response**. Times are as the sources give them; The Block gives the first alert as 17:18 ET on Friday 2026-07-24.

| When | What happened | OAK |
|---|---|---|
| Undisclosed | Entry vector and the wallets' contents are not disclosed ([Cointelegraph](https://cointelegraph.com/news/triple-a-treasury-wallet-breach-11-8-million-loss)) | none |
| 2026-07-24 (17:18 ET first alert) | Specter flags a drain above \$9.3M; assets are swapped and bridged to Ethereum ([The Block](https://theblock.co/news/defi/2026-07-26-triple-a-hot-wallet-losses-climb-to-11-8-million-as-new-deposits-keep-being-swept-report-409678)) | none |
| About 4.5 hours later | PeckShield raises the figure to more than \$9.7M | none |
| 2026-07-24 20:35 to 2026-07-25 03:03 | The consolidation Ethereum address receives eight incoming transfers, the largest about 4,140 ETH ([The Block](https://theblock.co/news/defi/2026-07-26-triple-a-hot-wallet-losses-climb-to-11-8-million-as-new-deposits-keep-being-swept-report-409678)) | none |
| 2026-07-25 | Triple-A identifies unauthorised access, puts some services in maintenance for about three hours, then restores them ([Fintech News Singapore](https://fintechnews.sg/134885/crypto/triple-a-treasury-wallet-breach-11-8-million/)); it states on X that customer funds are not impacted | response |
| 2026-07-26 (early) | Specter: about \$11.8M lost; new deposits still arriving and drained 31 hours after the first large outflows; the Ethereum address holds 5,226.67 ETH ([The Block](https://theblock.co/news/defi/2026-07-26-triple-a-hot-wallet-losses-climb-to-11-8-million-as-new-deposits-keep-being-swept-report-409678)) | none |
| 2026-07-27 | Triple-A announces the incident; says it works with cybersecurity experts, forensics firms and the Singapore Police Force ([Cointelegraph](https://cointelegraph.com/news/triple-a-treasury-wallet-breach-11-8-million-loss)) | response |
| Undisclosed | Recovery or onward movement of the consolidated funds | undisclosed |

Key addresses: no attacker, victim or consolidation address is printed in full on any opened page; the consolidation address is undisclosed here.

## Root-cause evidence

- **Technique:** none
- **Source:** <https://theblock.co/news/defi/2026-07-26-triple-a-hot-wallet-losses-climb-to-11-8-million-as-new-deposits-keep-being-swept-report-409678>; <https://cointelegraph.com/news/triple-a-treasury-wallet-breach-11-8-million-loss>; <https://fintechnews.sg/134885/crypto/triple-a-treasury-wallet-breach-11-8-million/>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** Triple-A confirms unauthorised access to wallets holding its own assets; the loss size, duration and consolidation come from Specter and PeckShield as relayed by news outlets. The access method is undisclosed. The Crypto Times article the earlier file cited returned HTTP 403 and was not read, so claims that only it carried (a "key management" characterisation, the 20,000-merchant base, "deposit addresses never disabled") are dropped.

## Public references

- The Block, "Triple-A hot wallet losses climb to \$11.8 million as new deposits keep being swept: report" (2026-07-26): <https://theblock.co/news/defi/2026-07-26-triple-a-hot-wallet-losses-climb-to-11-8-million-as-new-deposits-keep-being-swept-report-409678>
- Cointelegraph, "Triple-A confirms treasury-wallet breach after losses reach \$11.8M" (2026-07-27): <https://cointelegraph.com/news/triple-a-treasury-wallet-breach-11-8-million-loss>
- Fintech News Singapore, "Triple-A treasury wallet breach, \$11.8 million" (2026-07-27): <https://fintechnews.sg/134885/crypto/triple-a-treasury-wallet-breach-11-8-million/>
