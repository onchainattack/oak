# Gatecoin exchange hot-wallet compromise — Bitcoin / Ethereum — 2016-05-13

**Loss:** about \$2M (250 BTC and 185,000 ETH), which Gatecoin put at 15% of its total crypto-asset deposits `[sa16]`. Per Gatecoin, an external attacker altered the system so that ETH and BTC deposits bypassed multi-signature cold storage and went to the hot wallet during the breach period `[sa16]`.
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing Vendor Compromise — primary; the exchange's hot-wallet server infrastructure was the signing surface; Gatecoin was the custodian, and the custodial hot-wallet operational security was the failure surface — multi-asset signing keys co-located on a single server). **OAK-T15.003** (Operator Endpoint / Infrastructure Compromise — the entry vector involved a compromised server hosting the hot-wallet signing keys for both Bitcoin and Ethereum).
**Attribution:** **pseudonymous**. Gatecoin described a "malicious external party" `[sa16]`; no named individual or group was publicly identified. The incident shares structural methodology with the broader 2014-2016 exchange-hack cohort (Bitstamp 2015, Bter 2015, Bitfinex 2016) but predates the 2017-2020 DPRK exchange-compromise campaign.
**Corrected 2026-10-11:** replaced the claim of co-located signing keys stolen from a single server with Gatecoin's own account that deposits were redirected around multisig cold storage into hot wallets; CoinDesk reported the breach began earlier than 13 May; removed the unsourced 2019 banking-dispute reason (a court wound the company up in March 2019) and ETH price detail.
**Key teaching point:** **Gatecoin 2016 is a worked example of an exchange whose deposit routing was altered so funds bypassed cold storage into hot wallets, exceeding its own 5% hot-wallet limit for ETH `[sa16]`.**

## Summary

Gatecoin, a Hong Kong-based exchange, detected suspicious transactions on Friday night 13 May 2016 (HKT) and suspended services `[sa16]`. It reported losing about 185,000 ETH and 250 BTC (roughly \$2M), which it said was 15% of total crypto-asset deposits; 95% of BTC funds remained in cold wallets `[sa16]`. The company said an external attacker altered the system so that ETH and BTC deposits bypassed multi-signature cold storage and went directly to the hot wallet, pushing ETH losses past its 5% hot-wallet limit `[sa16]`. Another report says the breach began on 9 May and continued over three days `[gc16]`. The specific entry vector was not published.

Gatecoin raised \$500,000 in equity from a Japanese listed investor in June 2016 `[fm16]`. In March 2019 a court granted a winding-up order against the company, and the 2016 theft was still unresolved `[tnw19]`. Earlier text here about key co-location on one server and per-asset key segregation as industry response was not in the cited sources and is removed.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2016-05-09 to 12 | Per CoinDesk, breach begins and continues (company said discovered 13 May) `[gc16]` | T15.003 |
| 2016-05-13 | Suspicious transactions detected; services suspended `[sa16]` | T11.001 |
| 2016-06 | \$500,000 equity investment `[fm16]` | |
| 2019-03-13 | Winding-up order `[tnw19]` | |

## Realised extraction

250 BTC and 185,000 ETH, about \$2M `[sa16]`. No recovery reported in the cited sources.

## Public references

- `[sa16]` — SiliconANGLE, "Cryptocurrency exchange Gatecoin hacked: \$2M in bitcoin and ethereum stolen" (2016-05-17): <https://siliconangle.com/2016/05/17/cryptocurrency-exchange-gatecoin-hacked-2m-in-bitcoin-and-ethereum-stolen/>
- `[gc16]` — CoinDesk, "Gatecoin Claims \$2 Million in Bitcoins and Ethers Lost in Security Breach" (2016-05-16; seen via search result, page not retrievable): <https://coindesk-coindesk-prod.cdn.arcpublishing.com/markets/2016/05/16/gatecoin-claims-2-million-in-bitcoins-and-ethers-lost-in-security-breach/>
- `[fm16]` — Finance Magnates, "Gatecoin Raised \$500,000 to Recover from Ethereum Cyber Hack" (2016-06): <https://www.financemagnates.com/cryptocurrency/exchange/gatecoin-raised-500000-to-recover-from-ethereum-cyber-hack/>
- `[tnw19]` — The Next Web, Gatecoin exchange shutdown (2019-03-14): <https://thenextweb.com/news/gatecoin-cryptocurrency-exchange-dead>
- See `techniques/T11.001-third-party-signing-vendor-compromise.md`, `techniques/T15.003-*.md`
