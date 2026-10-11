# Cryptsy exchange collapse and operator-side theft — Bitcoin / altcoins — 2016-01-14

**Loss:** Cryptsy's own account was a 2014 theft of about 13,000 BTC and 300,000 LTC via a backdoored altcoin `[cs16]``[sa16]`; the DOJ indictment alleges Vernon actually stole over \$1 million from customers between May 2013 and May 2015 and concealed a claimed \$5M+ "hack" for about six months `[irs22]`. The true total is not established in the cited sources. **Recovery:** a receiver was appointed in April 2016 `[sa16]`; no recovery figure is verified (the earlier "\$1.4M" figure is removed).
**OAK Techniques observed:** **OAK-T11.001** (Exchange Hot-Wallet / Key-Management Compromise — the operator's privileged-access position enabled the theft; the exchange's hot-wallet architecture was operator-controlled and the theft was executed via operator-side fund movement rather than external compromise). **OAK-T11.005** (Operator-side Fake-Platform Fraud — the operator represented Cryptsy as a legitimate, solvent exchange for 18+ months while actively siphoning user deposits; the platform facade was maintained through falsified balance ledgers, delayed withdrawal processing, and bogus customer-support responses attributing delays to "wallet maintenance" or "technical issues"). **OAK-T6.007** (Trust-Substrate Shift / Vendor-Promise Revocation — the operator exploited the trust users placed in Cryptsy's public representations of solvency and security; the 18-month fraud window demonstrates the extended duration over which operator-side trust-substrate abuse can persist before the withdrawal-suspension event forces disclosure).
**Attribution:** **confirmed** (charged) — Paul E. Vernon, founder and CEO of Project Investors Inc. (Cryptsy), was named in a 17-count indictment unsealed in federal court in Miami, announced 2022-01-26, alleging wire fraud, money laundering, computer fraud, tampering with and destruction of records, and tax evasion; these are allegations `[irs22]`. He allegedly moved to China around November 2015 `[irs22]`; a 2022 report says he remained at large `[cs16]`. Not shown to have been convicted.
**Key teaching point:** **Cryptsy shows how an operator can conceal a loss, or his own theft, from customers for months: the DOJ alleges that after claiming a hacker took over \$5M in July 2014 he kept operating and soliciting customers for about six months without disclosure `[irs22]`.** Exchange solvency cannot be verified from front-end balances alone.

**Corrected 2026-10-11:** the indictment was announced January 2022 (not April 2021) and charges Vernon with theft of over \$1M plus concealment of a claimed 2014 hack; removed the unsourced 18-month falsified-ledger siphoning story, the \$1.4M receiver figure, "Brandon v. Vernon" (the case is Leidel and Wilson v. Project Investors, Vernon and Nettles), the Shenzhen detail, and the comparison claims to QuadrigaCX/Thodex/FTX.

## Summary

Cryptsy was an altcoin exchange run by Paul Vernon. Cryptsy announced in January 2016 that trading and withdrawals were suspended indefinitely and claimed a theft, saying malicious code in an altcoin (Lucky7Coin) had backdoored the exchange and let someone steal 13,000 BTC and 300,000 LTC `[cs16]`. The DOJ indictment says Vernon told employees on about 2014-07-29 that a hacker had stolen over \$5 million and then, for about six months, kept operating and soliciting customers without disclosure; it separately alleges he used his control of the wallets to steal over \$1 million between May 2013 and May 2015 and moved the funds to personal wallets and bank accounts `[irs22]`.

Per the indictment, Vernon moved abruptly to China around November 2015, shortly afterwards publicly reported the 2014 hack, and in April 2016, after learning of the receivership, allegedly hacked into the servers remotely and destroyed the customer database `[irs22]`. In April 2016 a Florida federal court appointed a receiver in a class action brought by Brandon Leidel and Michael Wilson against Project Investors Inc., Vernon and Lorie Ann Nettles; plaintiffs alleged he transferred a Palm Beach County mansion to Nettles to hide assets and that 13,000 BTC (about \$5.38M then) were lost `[sa16]`. In March 2022 about 11,325 BTC moved from long-dormant wallets that Whale Alert said were possibly linked to the Cryptsy theft; that link is unconfirmed `[cs16]`.

## Timeline (UTC unless noted)

| When | Event | OAK ref |
|---|---|---|
| 2013-05 to 2015-05 | DOJ alleges Vernon stole over \$1M using control of Cryptsy wallets `[irs22]` | T11.005 |
| 2014-07-29 | Vernon tells employees a hacker stole over \$5M; customers not told for about six months `[irs22]` | T6.007 |
| ~2015-11 | Vernon allegedly moves to China `[irs22]` | |
| 2016-01 | Cryptsy suspends trading and withdrawals, claims 13,000 BTC / 300,000 LTC theft `[cs16]` | T11.005 |
| 2016-04 | Receiver appointed (S.D. Fla.); Vernon allegedly destroys customer database `[sa16]``[irs22]` | |
| 2022-01-26 | 17-count indictment announced `[irs22]` | |

## Realised extraction

Not established. Cryptsy claimed 13,000 BTC and 300,000 LTC `[cs16]`; the DOJ alleges over \$1M stolen by Vernon `[irs22]`.

## Public references

- `[irs22]` — IRS Criminal Investigation, "CEO of major online cryptocurrency exchange company indicted for defrauding company's customers, destroying evidence and tax evasion" (2022-01-26): <https://www.irs.gov/compliance/criminal-investigation/ceo-of-major-online-cryptocurrency-exchange-company-indicted-for-defrauding-companys-customers-destroying-evidence-and-tax-evasion>
- `[sa16]` — SiliconANGLE, "Court appoints receiver in ongoing case against failed bitcoin exchange Cryptsy" (2016-04-05): <https://siliconangle.com/2016/04/05/court-appoints-receiver-in-ongoing-case-against-failed-bitcoin-exchange-cryptsy/>
- `[cs16]` — Bitcoin.com News, "Cryptsy bitcoin exchange announces massive theft, shuts indefinitely" (2016-01; seen in search results, page not fetched): <https://news.bitcoin.com/cryptsy-bitcoin-exchange-announces-massive-theft-shuts-indefinitely/>
