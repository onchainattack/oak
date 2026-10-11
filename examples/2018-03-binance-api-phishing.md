# Binance API-key phishing campaign — Binance (CEX) — 2018-03-07

**Loss:** Not tabulated in the sources cited. Binance's risk system halted withdrawals so nothing left the platform, and the attackers' own pre-deposited VIA was frozen, leaving them at a loss; but some phished users lost money on the unauthorized VIA/BTC trades, which Binance said it could not reverse because they did not execute against the hackers' accounts (Trend Micro summary of Binance's statement).
**OAK Techniques observed:** **OAK-T4.008** (Fake-DEX / Fake-CEX Clone Frontend Phishing — a lookalike-domain phishing campaign harvested Binance user credentials). **OAK-T15.003** (Operator-Endpoint Compromise — retained from the earlier draft; the compromised accounts were customer accounts, not Binance operator endpoints, so this mapping is weak).
**Attribution:** **pseudonymous**. Binance did not name an individual or group; it offered a \$250,000-equivalent bounty (paid in BNB) for information leading to arrest (Help Net Security, WeLiveSecurity).
**Corrected 2026-10-11:** removed unsourced price figures (0.000225 to 0.025 BTC), the "~\$10K / all trades reversed" loss claim, intraday times, the CZ-tweet timeline, the SAFU-fund launch and API-hardening announcements, and the Telegram/search-ad delivery claim; the sourced mechanism is a months-long phishing campaign, API keys created on stolen logins, and a coordinated VIA buy with 31 pre-funded attacker accounts on the sell side.
**Key teaching point:** **The Binance March 2018 incident is a worked example of CEX credential phishing converted into market manipulation rather than withdrawal: with withdrawals blocked, the attackers used victims' trading authority (API keys created on stolen logins) to push an illiquid pair so that accounts they controlled could sell into it.** It is also a worked example of the exchange-side risk system doing its job: the withdrawal halt and freeze left the attackers with a loss.

## Summary

According to Binance's investigation as reported by Trend Micro, attackers ran a phishing campaign from January 2018 using a lookalike (unicode) domain, "bịnạnce.com", to collect user credentials. Rather than draining accounts, they created trading API keys on the compromised accounts and waited.

On 2018-03-07, within about a minute (14:58-14:59 UTC per Trend Micro), the API keys were used to convert victims' altcoins into bitcoin and then into Viacoin (VIA). Viacoin's price spiked. The sell side was 31 accounts that had been pre-deposited with VIA, apparently controlled by the attackers. Viacoin's developers denied involvement.

Binance's risk system detected the spike and halted withdrawals, so none of the attackers' withdrawals went out, and the 31 accounts were frozen. Binance said the trades "did not execute against any of the hackers' accounts as counterpart," so it could not reverse them, and some phishing victims lost money. Binance published a summary on 2018-03-08 (Trend Micro) and offered a \$250,000-equivalent bounty for information on the hackers (Help Net Security).

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2018-01 onward | Phishing campaign with lookalike domain collects Binance credentials; trading API keys created on compromised accounts | T4.008 (clone-frontend phishing) |
| 2018-03-07 14:58-14:59 | Victims' altcoins converted to BTC then VIA via API keys; VIA/BTC spikes; 31 pre-funded attacker accounts sell | T15.003 (compromised-account trade execution; weak mapping) |
| 2018-03-07 | Binance risk system halts withdrawals; the 31 accounts are frozen | (defender response) |
| 2018-03-08 | Binance publishes a summary of the incident | (disclosure) |
| 2018-03 | Binance offers a \$250,000 bounty for information on the attackers | (response) |

## Realised extraction

Per the cited reporting the attackers came out behind (their VIA was frozen and no withdrawals succeeded). Victim-side losses from the unauthorized trades occurred but are not quantified in the sources cited.

## T4.008 classification

The lookalike-domain phishing that harvested exchange credentials is the CEX branch of OAK-T4.008. The clone frontend did not drain wallets directly (the DeFi variant, T4.002 / T4.004); the harvested access was used to create API keys and execute trades on the centralised order book. The sources cited document the lookalike domain and credential theft; they do not document a cloned API-key management interface.

## Public references

- `[trend2018binance]` — Trend Micro, "Large-Scale Heist of Cryptocurrency Exchange Binance Fails": <https://www.trendmicro.com/vinfo/id/security/news/cybercrime-and-digital-threats/large-scale-heist-of-cryptocurrency-exchange-binance-fails>
- `[hns2018bounty]` — Help Net Security, "Binance offers \$250,000 for info about hackers who targeted its users" (2018-03-12): <https://www.helpnetsecurity.com/2018/03/12/binance-reward/>
- `[eset2018bounty]` — WeLiveSecurity, "Cryptocurrency exchange hackers bounty" (2018-03-13): <https://www.welivesecurity.com/2018/03/13/cryptocurrency-exchange-hackers-bounty/>
