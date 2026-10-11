# Poloniex withdrawal-race exploit — Bitcoin — 2014-03-04

**Loss:** 12.3% of the bitcoin held by the exchange (absolute figures differ between outlets; one reports roughly \$50K / 76.69 BTC).
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing-Vendor UI / Signing-Flow Compromise — broadly construed; the exchange as custodian to its users held signing authority over the hot wallet, and the compromise of that signing infrastructure is structurally T11.001). **OAK-T15.003** (Operator-Endpoint Compromise — the attacker gained access to the exchange's hot-wallet server infrastructure, constituting an operator-endpoint state that enabled the signing-flow manipulation, though the exact entry vector was not publicly detailed at forensic granularity).
**Attribution:** **confirmed** The operator (posting as "Busoni") publicly disclosed the loss and accepted responsibility.
**Key teaching point:** **The Poloniex March 2014 incident is an early exchange loss from a withdrawal-processing race condition.** An exchange's accounting layer must serialise withdrawals; concurrent withdrawal requests drove a balance negative while payouts were still authorised. The operator disclosed quickly and socialised the loss across all user balances rather than failing outright.
**Corrected 2026-10-11:** the incident was a concurrent-withdrawal (negative-balance) flaw dated 2014-03-04, not a hot-wallet server compromise; the loss was spread across user balances rather than repaid wholly from personal funds.

## Summary

Poloniex, a cryptocurrency exchange launched in 2014, lost 12.3% of the bitcoin it held on 2014-03-04. Per contemporaneous reporting, the attacker exploited a flaw that allowed many withdrawals to be entered at the same moment; the database showed a negative balance but the withdrawals were still authorised and paid out `[fmag]``[ctele]`. Poloniex attributed the cause to design errors in its accounting and security features that allowed simultaneous rather than sequential withdrawal processing `[fmag]`.

The operator (posting as "Busoni"; one outlet names him as Tristan D'Agosta `[spalmer]`) accepted responsibility and said the debt would be repaid. To prevent a run, all customer balances were reduced by 12.3%; trading was halted and resumed after fixes, with a check added that halts withdrawals from accounts with negative balances `[fmag]``[ctele]`. Repayment was to come partly from the operator's own pocket and partly from raising trading fees from 0.2% to 1.5%, which users criticised `[ctele]`.

Absolute loss figures are not consistent across outlets (97 BTC in one infographic, 76.69 BTC / roughly \$50,000 in another) `[spalmer]``[btcmag]`. Earlier text in this file about a hot-wallet server compromise, a Circle acquisition price, full reimbursement and cold-storage architecture is unverified and has been removed.

## Timeline (UTC)

| When | Event |
|---|---|
| 2014-03-04 | Concurrent withdrawals exploit negative-balance flaw; 12.3% of held BTC lost `[fmag]` |
| 2014-03-04/05 | Trading halted; all balances reduced 12.3%; withdrawals resume 2014-03-05 `[ctele]` |
| 2014-03 | Negative-balance check added to withdrawals `[ctele]` |

## Realised extraction

12.3% of exchange-held bitcoin; no recovery reported in the cited sources.

## Public references

- `[fmag]` — Finance Magnates, "Poloniex Hacked, Bitcoins Stolen and Trading Halted" (2014-03-04): <https://www.financemagnates.com/cryptocurrency/exchange/poloniex-hacked-bitcoins-stolen-and-trading-halted/>
- `[ctele]` — Cointelegraph, "Poloniex spreads its bitcoin loss among all users" (2014-03-10): <https://cointelegraph.com/news/poloniex-spreads-its-bitcoin-loss-among-all-users>
- `[spalmer]` — Shelly Palmer, "Bitcoin Exchange Poloniex Hacked, Loses Around \$50,000" (2014-03): <https://shellypalmer.com/2014/03/poloniex-hacked/>
- `[btcmag]` — Bitcoin Magazine, "Infographic: Overview of Compromised Bitcoin Exchange Events": <https://bitcoinmagazine.com/culture/infographic-overview-compromised-bitcoin-exchange-events>
