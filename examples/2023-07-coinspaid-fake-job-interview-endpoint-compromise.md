# CoinsPaid — fake job interview malware led to forged hot-wallet withdrawal requests — CoinsPaid / multi-chain — 2023-07-22

**Loss:** **\$37.3M** per the operator ([CoinsPaid](https://coinspaid.com/company-updates/coinspaid-is-back-to-processing-after-being-hit-by-hackers-attack/)); more than \$37M per [Cointelegraph](https://cointelegraph.com/news/coinspaid-claims-north-korean-hacking-group-fake-job-interview-theft). CoinsPaid says client funds were not affected ([CoinsPaid](https://coinspaid.com/company-updates/coinspaid-is-back-to-processing-after-being-hit-by-hackers-attack/)); [DL News](https://www.dlnews.com/articles/defi/how-north-korea-lazarus-group-stole-crypto-from-coinspaid/) says the hack only affected its revenue.

**OAK Techniques observed:** **OAK-T15.001** (Social Engineering of Operator Personnel — *primary*; an employee was targeted by fake recruiters and downloaded software for a supposed technical task that was malicious, per [Cointelegraph](https://cointelegraph.com/news/coinspaid-claims-north-korean-hacking-group-fake-job-interview-theft). See [`techniques/T15.001-social-engineering-of-operator-personnel.md`](../techniques/T15.001-social-engineering-of-operator-personnel.md)). **OAK-T15.003** (Operator Endpoint Compromise — the downloaded software gave access to CoinsPaid's systems ([DL News](https://www.dlnews.com/articles/defi/how-north-korea-lazarus-group-stole-crypto-from-coinspaid/)). See [`techniques/T15.003-operator-endpoint-compromise.md`](../techniques/T15.003-operator-endpoint-compromise.md)). Laundering: most funds went to the SwftSwap bridge, some to SunSwap and SimpleSwap, some to the Sinbad mixer ([DL News](https://www.dlnews.com/articles/defi/how-north-korea-lazarus-group-stole-crypto-from-coinspaid/)); see **OAK-T7.003** ([`techniques/T7.003-cross-chain-bridge-laundering.md`](../techniques/T7.003-cross-chain-bridge-laundering.md)) and **OAK-T7.001** ([`techniques/T7.001-mixer-routed-hop.md`](../techniques/T7.001-mixer-routed-hop.md)).

**Attribution:** **inferred-strong** — CoinsPaid says it suspects Lazarus Group is responsible ([CoinsPaid](https://coinspaid.com/company-updates/coinspaid-is-back-to-processing-after-being-hit-by-hackers-attack/)); DL News reports that CoinsPaid and Match Systems cite similar techniques, blockchains, exchanges, mixers and some of the same wallet addresses ([DL News](https://www.dlnews.com/articles/defi/how-north-korea-lazarus-group-stole-crypto-from-coinspaid/)). OAK's own record cites an FBI release of 2023-08-22 naming CoinsPaid among DPRK thefts (`citations.bib` key `fbidprkfunds2023`); the FBI page returned 403 and was not opened, so it is not relied on here. Actor: [OAK-G01 Lazarus Group](../actors/OAK-G01-lazarus.md).

**Key teaching point:** **Treat an unsolicited job interview that asks an engineer to run software as an endpoint-intrusion attempt, and keep systems that can create withdrawal requests out of reach of such endpoints.** CoinsPaid says the attackers could not reach private keys directly but exploited a software vulnerability to fake authorised withdrawal requests ([DL News](https://www.dlnews.com/articles/defi/how-north-korea-lazarus-group-stole-crypto-from-coinspaid/)).

## Summary

CoinsPaid, an Estonia-based crypto payments firm, lost \$37.3M on 2023-07-22 and filed a report with Estonian law enforcement on 2023-07-25 ([CoinsPaid](https://coinspaid.com/company-updates/coinspaid-is-back-to-processing-after-being-hit-by-hackers-attack/)). Per [Cointelegraph](https://cointelegraph.com/news/coinspaid-claims-north-korean-hacking-group-fake-job-interview-theft), attackers tried to infiltrate its infrastructure directly from March 2023, and after repeated failures shifted to "highly sophisticated and vigorous social engineering techniques" aimed at individual workers. An employee downloaded malicious software during a fake job interview; the attackers exploited a vulnerability in the cluster, opened a backdoor, reproduced legitimate requests to blockchain interaction interfaces and withdrew from the operational storage vault (same source). [DL News](https://www.dlnews.com/articles/defi/how-north-korea-lazarus-group-stole-crypto-from-coinspaid/) adds an unsuccessful attack involving 150,000 IP addresses on 2023-07-07, and reports fake job offers to other staff aimed at getting them to install JumpCloud Agent.

## Timeline (UTC)

Stages: **Entry**, **Preparation**, **Execution**, **Money**, **Response**. Times of day, transaction hashes and addresses are undisclosed on the opened pages.

| When | What happened | OAK |
|---|---|---|
| 2023-03 | Attackers begin trying to infiltrate infrastructure directly; later shift to social engineering of workers ([Cointelegraph](https://cointelegraph.com/news/coinspaid-claims-north-korean-hacking-group-fake-job-interview-theft)) | — |
| 2023-06 to 2023-07 | Fake job offers reach engineers ([DL News](https://www.dlnews.com/articles/defi/how-north-korea-lazarus-group-stole-crypto-from-coinspaid/)); an employee downloads malicious software in a fake interview | **T15.001**, **T15.003** |
| 2023-07-07 | Attack involving 150,000 IP addresses; unsuccessful ([DL News](https://www.dlnews.com/articles/defi/how-north-korea-lazarus-group-stole-crypto-from-coinspaid/)) | — |
| 2023-07-22 | \$37.3M withdrawn via forged authorised withdrawal requests ([CoinsPaid](https://coinspaid.com/company-updates/coinspaid-is-back-to-processing-after-being-hit-by-hackers-attack/)) | none — post-access withdrawal forging; no Technique page matches |
| After 2023-07-22 | Most funds to SwftSwap; some to SunSwap, SimpleSwap and Sinbad ([DL News](https://www.dlnews.com/articles/defi/how-north-korea-lazarus-group-stole-crypto-from-coinspaid/)) | **T7.003**, **T7.001** |
| 2023-07-25 | Report filed with Estonian law enforcement ([CoinsPaid](https://coinspaid.com/company-updates/coinspaid-is-back-to-processing-after-being-hit-by-hackers-attack/)) | response |
| 2023-07-26 | CoinsPaid post-mortem suspects Lazarus; services restored in a new secured environment | response |

Key addresses: undisclosed — no opened page prints an address in full.

## Root-cause evidence

- **Technique:** OAK-T15.001
- **Source:** <https://cointelegraph.com/news/coinspaid-claims-north-korean-hacking-group-fake-job-interview-theft>; <https://www.dlnews.com/articles/defi/how-north-korea-lazarus-group-stole-crypto-from-coinspaid/>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** The operator's 2023-07-26 page does not describe the mechanism; the entry vector comes from CoinsPaid's later account relayed by Cointelegraph (2023-08-07) and DL News (2023-08-07). Attribution is the operator's suspicion plus Match Systems.

## Public references

- CoinsPaid, "Coinspaid is back to processing after being hit by hackers attack" (2023-07-26): <https://coinspaid.com/company-updates/coinspaid-is-back-to-processing-after-being-hit-by-hackers-attack/>
- Cointelegraph, "CoinsPaid claims North Korean hacking group used fake job interview to steal \$37M" (2023-08-07): <https://cointelegraph.com/news/coinspaid-claims-north-korean-hacking-group-fake-job-interview-theft>
- DL News, "How North Korea's Lazarus Group used a fake job offer to steal \$37m from CoinsPaid" (2023-08-07): <https://www.dlnews.com/articles/defi/how-north-korea-lazarus-group-stole-crypto-from-coinspaid/>
