# Binance KYC data leak — Binance (CEX) via alleged third-party KYC vendor — 2019-08

**Loss:** KYC images exposed; scale disputed. The extortionist claimed 60,000 pieces of KYC information (CoinDesk); Binance's statement referred to 10,000 photos; the first dump held 500 photos for 166 people, and CoinDesk confirmed at least two leaked profiles belonged to real customers. No on-chain funds were lost. The extortionist reportedly sought 300 BTC (about \$3.5M per The Hacker News; about \$3M per CoinDesk). Binance refused to pay.
**OAK Techniques observed:** **OAK-T15.003** (Operator-Endpoint Compromise — the alleged third-party KYC vendor's systems; the actual breach point and method were not established). **OAK-T11.001** (Third-Party Signing-Vendor Compromise — broadly construed beyond signing: a service provider holding operator-customer data). **OAK-T8.004** (Exchange Account Farming / Sybil Account Creation — leaked ID documents are raw material for synthetic-identity account creation; no such use is documented in the cited sources).
**Attribution:** **pseudonymous** The extortionist used the Telegram / Twitter handle "Bnatov Platon" (@BnatovP) and an earlier pseudonym "Guardian M." (CoinDesk), described himself as a white hat seeking a bounty, and was not identified publicly. Cointelegraph noted unconfirmed theories that Platon was behind the whole episode.
**Corrected 2026-10-11:** removed the unsourced "June 2019 breach date", "60,000 records exfiltrated" as fact, "Binance confirmed the breach on 08-07", the lifetime-VIP-membership remedy, and "multiple exchanges' data"; Binance's statement was that the images lacked its internal watermark, looked like they dated from February 2018 when it used a third-party KYC vendor, and were still under investigation.
**Key teaching point:** **The Binance 2019 KYC leak is a worked example of vendor-held identity data as an attack surface, and of the attribution ambiguity around it.** Binance's position was that the images did not carry its watermark and traced to a vendor it used from February 2018; critics questioned whether it was shifting blame. Either way, KYC documents held by processors outside the operator's perimeter are a standing extortion and identity-fraud risk governed by the weakest link.

## Summary

In July 2019 a person calling himself Platon contacted CoinDesk claiming to hold 60,000 pieces of KYC information on Binance customers, and negotiated with Binance for a "bounty"; talks broke down around 2019-07-22 over a demand of 300 BTC (CoinDesk). The first leak came on 2019-08-05, with a second posted to Telegram on 2019-08-07. The attacker's Telegram group drew over 10,000 members and shared more than 400 images of people holding passports and ID documents (The Hacker News).

Binance said an unidentified person had threatened and harassed it, demanding 300 BTC to withhold 10,000 photos. It said the images lacked its internal digital watermark and its initial review suggested they dated from February 2018, when it "contracted a third-party vendor for KYC verification"; the vendor was not named. Binance refused to pay, offered a 25 BTC bounty for information identifying the blackmailer, and said relevant agencies had been contacted. Changpeng Zhao urged users not to fall for "KYC leak" FUD, and the authenticity of the leak was not confirmed at the time.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2018-02 | Binance begins using a third-party KYC vendor (per Binance's statement) | (standing T11.001 surface) |
| 2019-07 | "Platon" contacts CoinDesk and negotiates with Binance; talks end ~07-22 | (extortion) |
| 2019-08-05 | First leak of KYC images (500 photos for 166 people) | T15.003 (vendor-endpoint compromise, alleged) |
| 2019-08-07 | Binance issues statement (10,000 photos, 300 BTC demand, no watermark, vendor theory, 25 BTC bounty); second leak on Telegram | (defender response) |

## Realised extraction

No on-chain loss. The monetisation attempt (300 BTC) failed. The value of the leaked data is off-chain identity-theft material; actual misuse is not documented in the sources cited.

## T11.001 cross-classification (data-compromise extension)

T11.001 is scoped at v0.1 to "Third-Party Signing-Vendor Compromise". The Binance 2019 KYC case extends its structural shape to the **data-processing vendor** sub-surface: a vendor with privileged access to operator-customer data is the alleged breach point and the operator's customers bear the downstream risk. The vendor theory is Binance's own and was not independently verified. This classification is subject to revision in v0.2.

## Public references

- `[coindesk2019kyc]` — CoinDesk, "An Extortion Gone Bad: Inside Binance's Negotiations With Its 'KYC Leaker'" (2019-08-07): <https://coindesk.com/markets/2019/08/07/an-extortion-gone-bad-inside-binances-negotiations-with-its-kyc-leaker>
- `[thn2019kyc]` — The Hacker News, "Binance KYC Data Leak" (2019-08-07): <https://thehackernews.com/2019/08/binance-kyc-data-leak.html>
- `[ct2019kyc]` — Cointelegraph, "Binance KYC breach: did it happen and if so who's to blame": <https://cointelegraph.com/features/binance-kyc-breach-did-it-happen-and-if-so-whos-to-blame>
