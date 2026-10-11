# Bithumb exchange hack — Multi-asset (BTC, ETH, XRP, others) — 2018-06-20

**Loss:** 35 billion won (about \$31.6M) in cryptocurrencies stolen from Bithumb between 2018-06-19 and 2018-06-20 (Security Affairs); Elliptic reports BTC, ether, Golem and other assets, with 1,993 BTC traced leaving Bithumb.
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing-Vendor UI / Signing-Flow Compromise — broadly construed; the exchange's internal hot-wallet signing infrastructure was the compromise surface, enabling the multi-asset drain). **OAK-T7.001** (Mixer-Routed Laundering — retained from the earlier draft; Elliptic's tracing shows the stolen BTC sat dormant for over a month and then moved to the YoBit exchange in 68 transactions on 2018-08-02 to 08-06, with no mixer mentioned, so exchange-based laundering fits better than a mixer hop).
**OAK-Gnn:** [OAK-G01 Lazarus Group / DPRK-attributed](../actors/OAK-G01-lazarus.md).
**Attribution:** **inferred-strong** A UN Panel of Experts report leaked in 2019 (reported by AP via Decrypt) lists the \$31M June 2018 Bithumb theft among North Korean thefts; Elliptic reports the theft was linked to Lazarus on the basis of AlienVault's finding that the malware and delivery method matched earlier Lazarus use, and itself calls this "linked" rather than confirmed. Bithumb's own initial assessment, per Security Affairs, was an "accident involving insiders". Claims of South Korean police attribution in the earlier draft are unsourced and removed.
**Corrected 2026-10-11:** removed the unsourced ~\$14M recovery / ~\$17M net loss, the Korean-authority attribution, the "largest DPRK-attributed theft of 2017-18" claim (Coincheck was larger) and the Yapizon-collapse claim; laundering is documented as dormancy then YoBit, not mixers.

**Key teaching point:** **The June 2018 Bithumb hack is a large hot-wallet theft, linked (not formally confirmed in the sources cited) to Lazarus, that shows two things: the same exchange was hit repeatedly (the UN panel report counts at least four Bithumb attacks, in 2017, 2018 and 2019), and the stolen funds were held dormant for weeks before being cashed through another exchange.** Bithumb said it would make up the lost coins from its own holdings and moved user assets to cold wallets (Security Affairs, Elliptic).

## Summary

Bithumb, a major South Korean exchange, confirmed that hackers stole 35 billion won (about \$31.6M) between 2018-06-19 and 2018-06-20. Elliptic reports deposits were suspended at about 00:53 UTC on 2018-06-20 and that Bithumb moved its assets to cold wallets. Elliptic separated the theft from normal withdrawals by an unusual pattern: about 400 transactions on June 19-20 with a fixed 0.1 BTC fee sent to a single 70-address wallet. The coins sat dormant for over a month; between 2018-08-02 and 2018-08-06 the full 1,993 BTC moved to the Russia-based YoBit exchange in 68 transactions.

Bithumb said it would make up for the lost coins with its own and worked with other exchanges on recovery; Elliptic says it is unclear whether recovery succeeded for funds sent to YoBit, and Security Affairs reports no recovered funds.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2018-06-19 to 2018-06-20 | Hot-wallet theft of ~35 billion won; ~400 transactions with a fixed 0.1 BTC fee to one 70-address wallet | T11.001 (signing-flow compromise; method not disclosed) |
| 2018-06-20 | Deposits suspended ~00:53 UTC; remaining assets moved to cold wallets; theft disclosed | (defender response) |
| 2018-08-02 to 2018-08-06 | 1,993 BTC moves to YoBit in 68 transactions | T7.001 (exchange-routed laundering; no mixer documented) |
| 2019 | Leaked UN panel report lists the \$31M Bithumb 2018 theft among DPRK thefts | (attribution record) |

## Realised extraction

About 35 billion won (~\$31.6M) stolen. Net recovery is not established in the sources cited; Security Affairs reports none and Elliptic calls it unclear. Bithumb said it would cover the loss from its own coins.

## Distinction from earlier and later Bithumb incidents

The earlier draft cited a June 2017 employee-laptop data breach (`examples/2017-06-bithumb.md`); that file's dating and scope are not verified here (the UN panel report counts attacks on Bithumb in 2017, 2018 and 2019). A separate March 2019 Bithumb theft of about \$20M in EOS and XRP, which Bithumb suspected was an insider job, is a different incident and should not be conflated with June 2018.

## Public references

- `[secaff2018bithumb]` — Security Affairs, "Hackers stole \$19 Million from Bithumb cryptocurrency exchange" (2019; background on Bithumb's repeated hacks and the 2018 \$31.6M figure): <https://securityaffairs.com/83091/hacking/bithumb-hack-2.html>
- `[elliptic2018bithumb]` — Elliptic, "Following the money from the Bithumb hack" (2018-10-03): <https://www.elliptic.co/our-thinking/following-money-from-bithumb-hack>
- `[decrypt2019unpanel]` — Decrypt, "North Korea denies expert UN report linking it to \$2 billion hacking campaign" (2019-09-02): <https://decrypt.co/8858/north-korea-denies-expert-un-report-linking-it-to-2-billion-hacking-campaign>
