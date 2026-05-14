# Livecoin exchange infrastructure seizure and hot-wallet drain — Bitcoin / Ethereum / multi-asset (CEX) — 2020-12-23

**Loss:** approximately \$16M+ across multiple chains (Bitcoin, Ethereum, and ERC-20 tokens; the exact total is uncertain because the attacker also manipulated internal trading pairs to extreme prices, complicating asset-valuation reconciliation). Livecoin permanently ceased operations after the incident.
**OAK Techniques observed:** **OAK-T15.003** (Operator-Endpoint Compromise — the attacker gained administrative control of Livecoin's live production infrastructure, including the hot-wallet servers, trading engine, and web frontend, representing a full compromise of the operator's endpoint surface). **OAK-T15.004** (Operator-Credential Compromise — the initial access vector almost certainly involved compromised operator credentials, either administrative login credentials or infrastructure-provider account access, that allowed the attacker to seize control of the exchange's servers and hosting surface).
**Attribution:** **pseudonymous (no public attribution)**. The attacker's ransom message was in Russian, and Livecoin was a Russian-registered exchange, but no named individual or group was publicly identified by law enforcement. Russian authorities launched an investigation but did not publish findings.
**Key teaching point:** **Livecoin is the canonical worked example of a full infrastructure-takeover exchange compromise — the attacker did not merely drain hot wallets through a stealthy transfer but seized control of the exchange's entire live production surface (website, trading engine, withdrawal system) and weaponised the exchange's own price-oracle and trading infrastructure to maximise damage.** The post-compromise manipulation of internal trading pairs (BTC/USD set to \$450K, effectively nullifying the exchange's own valuation metrics) illustrates the structural risk of an attacker with admin-level access to a centralised exchange's trading engine — beyond simple wallet-draining — that is underexplored in exchange-threat-modelling frameworks.

## Summary

Livecoin was a Russian-registered cryptocurrency exchange that had operated since 2016, offering spot trading in Bitcoin, Ethereum, and a portfolio of altcoins. On 2020-12-23, an attacker — or attackers — gained administrative-level control of Livecoin's infrastructure, including its web servers, trading engine, hot-wallet signing infrastructure, and customer-facing frontend.

The attacker replaced Livecoin's homepage with a Russian-language ransom message demanding payment in Bitcoin, initially quoted at 10 BTC and later raised to 100 BTC. The message claimed the attackers had "broken" the exchange and would continue publishing internal data if the ransom was not paid. Simultaneously, the attacker systematically drained Livecoin's hot wallets across Bitcoin, Ethereum, and multiple ERC-20 tokens. Additionally, the attacker manipulated the exchange's internal trading pairs — setting BTC/USD to approximately \$450K and ETH/USD to approximately \$15K — creating a chaotic internal-valuation environment that made customer balance reconciliation effectively impossible.

Livecoin tweeted a warning from its verified Twitter account at approximately 12:00 UTC on 2020-12-24: "Dear clients, we are under a carefully planned attack that lost us control of our servers, nodes, and funds. Please stop using our services — depositing, trading, API." The exchange was unable to regain control of its infrastructure and announced permanent closure on or around 2020-12-25. Russian law enforcement launched an investigation; no public findings were released.

The Livecoin case sits in a narrow category of exchange-security failures where the attacker did not simply move through a hot-wallet signing surface (the Bybit / DMM / Coincheck pattern) but instead gained the ability to rewrite the exchange's own operational continuity — changing prices, altering the frontend, seizing the Twitter account — making it a **full-exchange-infrastructure-takeover** incident distinct from a hot-wallet drain.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2020-12-23 ~22:00 | Attacker gains administrative control of Livecoin infrastructure; frontend replaced with ransom message | T15.003 + T15.004 (credential-compromise entry → full endpoint takeover) |
| 2020-12-24 ~00:00 | Systematic hot-wallet draining begins; BTC, ETH, ERC-20 tokens transferred to attacker-controlled addresses | T15.003 (compromised signing infrastructure) |
| 2020-12-24 ~06:00 | Trading pairs manipulated: BTC/USD set to ~\$450K, ETH/USD to ~\$15K; exchange internal price feed corrupted | (weaponisation of exchange infrastructure) |
| 2020-12-24 ~12:00 | Livecoin tweets warning: "Stop using our services — depositing, trading, API" | (public crisis communication) |
| 2020-12-25 | Livecoin unable to recover infrastructure; permanent closure announced | (operator failure) |
| 2021-01-15 | Livecoin confirms closure; Russian authorities launch criminal investigation | (law-enforcement engagement) |

## Realised extraction

Approximately \$16M+ in Bitcoin, Ethereum, and ERC-20 tokens drained from hot wallets. The full extraction figure is complicated by the attacker's manipulation of the exchange's internal trading pairs, which distorted the notional USD valuation of altcoin assets held on the exchange at the time of compromise. Customer balances were not restored or compensated as of the closure date.

## T15.003 classification

Livecoin is the canonical OAK-T15.003 (Operator-Endpoint Compromise) worked example for the **full-exchange-infrastructure-takeover** sub-shape. The attacker's administrative access to Livecoin's live production surface — web servers, trading engine, wallet infrastructure, Twitter account — distinguishes this case from the more common hot-wallet-signing-surface-compromise pattern (Bitstamp 2015, Coincheck 2018, Zaif 2018, DMM 2024). In those cases, the endpoint compromise was limited to a signing host; at Livecoin, the entire operator surface was under attacker control, including the customer-facing frontend and the public-communication channel.

The Livecoin case also demonstrates the **defender-signal-failure mode** of a full-seizure event: the exchange's own communication channel (Twitter) was the primary vector through which customers learned of the compromise, and by the time the warning was broadcast, the hot-wallet drain was substantially complete. For defenders monitoring T15.003 events, the Livecoin case underscores the importance of off-band infrastructure monitoring (independent of the operator's own infrastructure, which may itself be under attacker control) and the structural need for exchange-side circuit-breakers on withdrawal volume that are externally enforced or contractually required.

## T15.004 classification

The Livecoin initial-access vector is classified under OAK-T15.004 (Operator-Credential Compromise) because the attacker's ability to seize the exchange's web servers, frontend, trading engine, and Twitter account indicates that the entry point was administrative-credential compromise — either at the hosting-provider / infrastructure-provider layer or at the exchange's internal admin-console layer. The full-seizure capability (frontend replacement, trading-pair manipulation, Twitter-takeover) is the operational fingerprint of privileged-credential access rather than a narrower single-wallet signing-key exfiltration.

## References

- Livecoin, Twitter (@Livecoin_net), December 24, 2020 — incident warning and closure announcement
- Livecoin, Twitter (@Livecoin_net), January 15, 2021 — final closure confirmation
- CoinDesk, "Russian Crypto Exchange Livecoin Hacked, Loses Control of Servers," December 24, 2020
- Russian-language outlets (forklog.com, bits.media) — incident coverage, December 2020
