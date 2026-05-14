# Binance API-key phishing campaign — Binance (CEX) — 2018-03-07

**Loss:** approximately \$10K equivalent in BTC effect from irregular VIA/BTC trades; all anomalous trades reversed by Binance's risk engine; no net customer loss after trade reversal.
**OAK Techniques observed:** **OAK-T4.008** (Fake-DEX / Fake-CEX Clone Frontend Phishing — attackers created a convincing clone of the Binance web frontend to harvest user API keys and login credentials). **OAK-T15.003** (Operator-Endpoint Compromise — broadly construed; the harvested API keys granted the attacker trade-execution authority on the compromised accounts, making each phished account a compromised "endpoint" from which the exchange-facing trading action was launched).
**Attribution:** **pseudonymous (no public attribution)**. Binance did not publicly name an individual or group. The sophistication of the coordinated VIA/BTC pump — multi-account orchestration with pre-positioned sell-side inventory — suggested an organised actor with exchange-trading expertise.
**Key teaching point:** **The Binance March 2018 API phishing incident is the canonical worked example of CEX clone-frontend phishing chained with API-key abuse for market manipulation.** The attack did not seek to drain user accounts directly (the withdrawal function was disabled for API-only keys at Binance) but instead weaponised the trading authority of the phished API keys to create an artificial price dislocation on an illiquid trading pair, profiting from pre-positioned opposite-side positions. The incident drove Binance's SAFU (Secure Asset Fund for Users) creation and remains the reference case for exchange-side API-key scoping and the structural risk of API-trading keys held by exchange users without IP-whitelisting or trade-size limits.

## Summary

In early March 2018, attackers registered a domain visually similar to `binance.com` and constructed a phishing frontend that replicated the Binance login and API-key management interface. Users who arrived at the phishing domain (via typosquatting, search-engine ad poisoning, or direct-message links on Telegram/Discord) entered their Binance credentials and, in some cases, their API-key secrets. The phishing frontend relayed these credentials to the attacker in real time.

On 2018-03-07, the attacker used the harvested API keys to execute a coordinated pump on the VIA/BTC trading pair — a low-liquidity market at the time. The attacker placed large, simultaneous buy orders for VIA from the compromised accounts, driving the VIA/BTC exchange rate from approximately 0.000225 BTC to 0.025 BTC (a ~100x intra-session spike). The attacker had pre-positioned sell orders for VIA at elevated prices from accounts under their own control, profiting from the artificial price dislocation.

Binance's automated risk engine detected the anomalous volume pattern on VIA/BTC within minutes and automatically suspended withdrawals across affected accounts. All irregular trades were identified and reversed within hours. The attack's realised extraction was near-zero because the sell-side BTC proceeds from the attacker's own accounts were frozen before they could be withdrawn.

The incident prompted Binance to (a) launch the SAFU fund (10% of trading fees allocated to an emergency insurance pool), (b) strengthen API-key security controls (mandatory IP-whitelisting for trading-enabled API keys, withdrawal-disabled-by-default for API keys), and (c) invest in phishing-domain detection and takedown partnerships. The Binance API-phishing pattern was subsequently replicated by multiple threat actors targeting other exchanges throughout 2018-2020, establishing the "clone-frontend → API-key harvest → unauthorised trade" chain as a recognised CEX attack class.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| pre-2018-03-07 | Phishing domain registered; clone of Binance login/API-key UI deployed; victim credentials harvested over days/weeks | T4.008 (clone-frontend phishing) |
| 2018-03-07 ~14:00 | Coordinated VIA buy orders placed via harvested API keys on ~20+ compromised accounts; VIA/BTC price spikes from ~0.000225 to ~0.025 BTC | T15.003 (compromised-account trade execution) |
| 2018-03-07 ~14:05 | Binance risk engine detects anomalous VIA/BTC volume; auto-suspends withdrawals on affected accounts | (defender response) |
| 2018-03-07 ~14:30 | Binance CEO CZ tweets incident notice; confirms API-key phishing as root cause; all irregular trades marked for reversal | (defender response) |
| 2018-03-07 ~18:00 | All anomalous trades reversed; customer balances restored to pre-incident state | (remediation) |
| 2018-03-08 | Binance announces SAFU fund creation; API-key security hardening (IP-whitelisting push) | (architectural remediation) |

## Realised extraction

Effectively zero. The sell-side BTC proceeds from the attacker's own VIA sell orders — the extraction vehicle — were frozen before withdrawal. A small amount of BTC may have been withdrawn from non-flagged accounts before the freeze propagated, but the primary extraction mechanism (VIA dump into the pumped price) was neutralised by trade reversal. No customer suffered a net loss after the reversal.

## T4.008 classification

The phishing infrastructure — a near-perfect clone of the Binance login and API-key management UI served from a typosquatted domain — is the canonical early-exchange instance of OAK-T4.008 (Fake-DEX / Fake-CEX Clone Frontend). The 2018 Binance API case anchors the CEX branch of T4.008 in the OAK taxonomy: the clone frontend did not drain wallets directly (the DeFi variant, T4.002 / T4.004) but harvested exchange-side API credentials that were then used to execute unauthorised trades on the centralised order book, creating the extraction profit at the exchange layer rather than at the wallet layer.

## References

- Binance, "Summary of the Phishing and Attempted Theft Incident," March 7, 2018
- CZ (Changpeng Zhao), Twitter thread (@cz_binance), March 7, 2018 — incident notice and SAFU announcement
- Binance, SAFU (Secure Asset Fund for Users) announcement, March 8, 2018
- Binance API documentation — post-incident IP-whitelisting requirement for trading-enabled API keys (March 2018 changelog)
