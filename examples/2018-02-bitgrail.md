# BitGrail — 17 million Nano missing from an Italian exchange, owner held responsible by court — Nano exchange — 2018-02-09

**Loss:** **17 million Nano (XRB)**, about \$170M at early-February 2018 prices, per BitGrail's own notice as relayed by [TechCrunch (2018-02-12)](https://techcrunch.com/2018/02/12/bitgrail-hack-nano/) and by [Decrypt (2019-01-28)](https://decrypt.co/4679/court-rules-against-bitgrail). The owner said only about 4 million XRB had been recovered and that the coins could not be returned in full ([TechCrunch](https://techcrunch.com/2018/02/12/bitgrail-hack-nano/)). A court later seized assets of the owner totalling about \$1M and took control of crypto assets from the exchange ([Decrypt](https://decrypt.co/4679/court-rules-against-bitgrail)).

**OAK Techniques observed:** none — the sources place the loss in the Custody and Signing Infrastructure tactic (OAK-T11) but do not establish the exploit path, so no Technique is claimed. BitGrail's notice cited "unauthorized transactions" behind a shortfall ([TechCrunch](https://techcrunch.com/2018/02/12/bitgrail-hack-nano/)); the court found the owner failed to provide safeguards against repeated withdrawals ([Decrypt](https://decrypt.co/4679/court-rules-against-bitgrail)). The exact exploit path is undisclosed in these sources, so no sub-technique is claimed.

**Attribution:** **unattributed** for the theft itself. In a ruling made public 2019-01-21 an Italian bankruptcy court and its technical expert found the owner, Francesco Firano, responsible for the loss of funds, and not the Nano team he had blamed ([Decrypt](https://decrypt.co/4679/court-rules-against-bitgrail)). That is a finding of responsibility, not an identification of who took the coins.

**Key teaching point:** **An exchange must enforce withdrawal limits against its own ledger and reconcile balances against the chain continuously.** The court's finding was that safeguards against repeated withdrawals were missing and that the owner waited months after learning of the problem ([Decrypt](https://decrypt.co/4679/court-rules-against-bitgrail)).

## Summary

On Friday 2018-02-09 BitGrail posted a notice that "internal checks revealed unauthorized transactions" leading to a 17 million Nano shortfall, suspended transactions, and said it had reported the matter to the authorities ([TechCrunch](https://techcrunch.com/2018/02/12/bitgrail-hack-nano/)). The account of owner Francesco Firano blamed the Nano developers and suggested modifying the ledger to cover the losses; the Nano team said that was not possible and not a direction it would pursue ([TechCrunch](https://techcrunch.com/2018/02/12/bitgrail-hack-nano/)). A user reported trying to withdraw for about a month, limited by a daily cap, with support tickets unanswered ([TechCrunch](https://techcrunch.com/2018/02/12/bitgrail-hack-nano/)). A ruling made public on 2019-01-21 found Firano responsible, said he waited for months after becoming aware of the hack, and noted he has declared personal bankruptcy ([Decrypt](https://decrypt.co/4679/court-rules-against-bitgrail)).

## Timeline (UTC)

Dates only; no times in the sources. Stages: flaw, execution, funds, response.

| When | What happened | OAK |
|---|---|---|
| Before 2018-02-09 (undisclosed) | Missing safeguards against repeated withdrawals, per the court ([Decrypt](https://decrypt.co/4679/court-rules-against-bitgrail)); start date undisclosed | **T11** |
| Before 2018-02-09 (undisclosed) | Unauthorized transactions produce a 17M XRB shortfall; transactions and addresses undisclosed ([TechCrunch](https://techcrunch.com/2018/02/12/bitgrail-hack-nano/)) | **T11** |
| Undisclosed | Where the coins went: undisclosed; owner says about 4M XRB recovered ([TechCrunch](https://techcrunch.com/2018/02/12/bitgrail-hack-nano/)) | — |
| 2018-02-09 | BitGrail notice, transactions suspended, authorities informed ([TechCrunch](https://techcrunch.com/2018/02/12/bitgrail-hack-nano/)) | response |
| 2018-02-09 onward | Nano team rejects a ledger modification ([TechCrunch](https://techcrunch.com/2018/02/12/bitgrail-hack-nano/)) | response |
| 2019-01-21 | Bankruptcy court ruling made public, owner held responsible ([Decrypt](https://decrypt.co/4679/court-rules-against-bitgrail)) | response |

Key addresses: undisclosed (none printed in the sources).

## Root-cause evidence

- **Technique:** OAK-T11 (family only)
- **Source:** <https://techcrunch.com/2018/02/12/bitgrail-hack-nano/>; <https://decrypt.co/4679/court-rules-against-bitgrail>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** the operator notice names unauthorized transactions and the court names missing safeguards against repeated withdrawals. Neither source gives the exploit mechanism, and the court ruling itself was not opened.

## Public references

- TechCrunch, "Italian cryptocurrency exchange gets hacked for \$170 million in Nano" (2018-02-12): <https://techcrunch.com/2018/02/12/bitgrail-hack-nano/>
- Decrypt, "Court Rules Against BitGrail's 'The Bomber'" (2019-01-28): <https://decrypt.co/4679/court-rules-against-bitgrail>
