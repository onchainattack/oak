# Coinrail — ERC-20 tokens taken from the exchange's wallets, entry vector undisclosed — Coinrail / Ethereum — 2018-06-09 / 2018-06-10

**Loss:** over \$40M in altcoins per [TechCrunch](https://techcrunch.com/2018/06/10/korean-crypto-exchange-coinrail-loses-over-40m-in-tokens-following-a-hack), by the address identified as the alleged attacker's: NPXS (Pundi X) \$19.5M, Aston X \$13.8M, Dent \$5.8M, Tron over \$1.1M, and smaller amounts of five other tokens. [SecurityAffairs](https://securityaffairs.com/73426/cyber-crime/cryptocurrency-exchange-coinrail-hacked.html) repeats the same figures from TechCrunch. [CoinMarketCap](https://coinmarketcap.com/academy/article/crypto-hacks-the-coinrail-hack-resulted-in-a-loss-of-over-40-million) says about \$40M, mainly NPXS and "ATC", and that the owners gave no exact figures at first. TechCrunch says Pundi X put the affected amount at about 3% of its total token volume and that NPER had about \$860,000 taken. **Recovery:** Coinrail's website statement said about two-thirds of the stolen tokens were frozen ([TechCrunch](https://techcrunch.com/2018/06/10/korean-crypto-exchange-coinrail-loses-over-40m-in-tokens-following-a-hack)). Pundi X froze the stolen tokens, NPER froze its stolen funds and planned to burn them, and Aston froze its affected tokens, per the same article. CoinMarketCap adds that Coinrail, Pundi X and IDEX had the account that received NPXS frozen.

**OAK Techniques observed:** none — no source opened states how the attacker got access, so no Technique can be matched to a sourced mechanism. [CoinMarketCap](https://coinmarketcap.com/academy/article/crypto-hacks-the-coinrail-hack-resulted-in-a-loss-of-over-40-million) says police blamed weak security protocols, that network experts suspected help from an insider machine with admin-level access, and that phishing was an "educated guess"; none is confirmed. [TechCrunch](https://techcrunch.com/2018/06/10/korean-crypto-exchange-coinrail-loses-over-40m-in-tokens-following-a-hack) calls it "an apparent attack".

**Attribution:** **unattributed.** No page opened names an actor. CoinMarketCap says the attacker was unidentified. An earlier version of this file attributed the theft to North Korean actors (OAK-G01) on the strength of Korean intelligence, KISA, Chainalysis and Recorded Future reports; none of those is on a page opened in the 2026-11 source pass, and the attribution is removed.

**Key teaching point:** **Keep only what trading needs in hot wallets and rehearse the freeze path with token issuers and other exchanges before an incident.** Coinrail's website statement said two-thirds of the stolen tokens were frozen, and TechCrunch reports that it moved its remaining assets to cold storage afterwards, which it put at 70 percent of total holdings ([TechCrunch](https://techcrunch.com/2018/06/10/korean-crypto-exchange-coinrail-loses-over-40m-in-tokens-following-a-hack)).

## Summary

Coinrail, a South Korean exchange, announced on Sunday 2018-06-10 that it had been hit over the weekend ([SecurityAffairs](https://securityaffairs.com/73426/cyber-crime/cryptocurrency-exchange-coinrail-hacked.html)). Its statement said there had been a cyber intrusion in its system, and its tweet said it was confirming it and that some coins (Pundi X, NPXS) were confirmed ([TechCrunch](https://techcrunch.com/2018/06/10/korean-crypto-exchange-coinrail-loses-over-40m-in-tokens-following-a-hack)). It took its service offline and moved remaining assets to cold storage. The stolen tokens belonged to Coinrail users; the issuing projects were not hacked (same source). Pundi X stopped trading of its token on all exchanges and was cooperating with an investigation that includes Korean police. Coinrail asked other exchanges to freeze the attacker's addresses ([SecurityAffairs](https://securityaffairs.com/73426/cyber-crime/cryptocurrency-exchange-coinrail-hacked.html)). Whether customers were compensated was unclear when TechCrunch wrote.

An earlier version of this file said Coinrail resumed partial trading on 2018-07-15, that token issuers rolled back or reissued tokens, that Chainalysis and Recorded Future attributed the event to a DPRK cohort, and that the unrecovered third was laundered through mixers. None of this is on a page opened in the 2026-11 source pass, and it is removed.

## Timeline (UTC)

Stages: **Entry** (undisclosed), **Take**, **Money**, **Response**. The sources give no times of day; they are undisclosed.

| When | What happened | OAK |
|---|---|---|
| Before 2018-06-09 | Entry vector: undisclosed. Police blamed weak security protocols and experts suspected an insider machine with admin-level access, per [CoinMarketCap](https://coinmarketcap.com/academy/article/crypto-hacks-the-coinrail-hack-resulted-in-a-loss-of-over-40-million); unconfirmed | — |
| Weekend of 2018-06-09 / 2018-06-10 | Tokens worth over \$40M leave Coinrail's wallets to an Ethereum address identified as the alleged attacker's; transaction hashes are not given on the pages opened ([TechCrunch](https://techcrunch.com/2018/06/10/korean-crypto-exchange-coinrail-loses-over-40m-in-tokens-following-a-hack)) | — |
| 2018-06-10 | Coinrail announces the intrusion, takes the service offline and moves remaining assets to cold storage ([TechCrunch](https://techcrunch.com/2018/06/10/korean-crypto-exchange-coinrail-loses-over-40m-in-tokens-following-a-hack)) | response |
| 2018-06-10 | About two-thirds of stolen tokens frozen per Coinrail; Pundi X, NPER and Aston freeze their stolen tokens; Coinrail asks other exchanges to freeze the attacker's addresses ([TechCrunch](https://techcrunch.com/2018/06/10/korean-crypto-exchange-coinrail-loses-over-40m-in-tokens-following-a-hack), [SecurityAffairs](https://securityaffairs.com/73426/cyber-crime/cryptocurrency-exchange-coinrail-hacked.html)) | response |
| After 2018-06-10 (undisclosed) | Where the unfrozen third went: undisclosed in the sources opened. CoinMarketCap says police found an address receiving many tokens from fake accounts but gives no link to the attacker | — |

Key addresses: the attacker address is linked to Etherscan in the [TechCrunch](https://techcrunch.com/2018/06/10/korean-crypto-exchange-coinrail-loses-over-40m-in-tokens-following-a-hack) and [SecurityAffairs](https://securityaffairs.com/73426/cyber-crime/cryptocurrency-exchange-coinrail-hacked.html) articles, but it is not printed in full on the pages as read (full address not published in the text opened).

## Root-cause evidence

- **Technique:** none assigned
- **Source:** <https://techcrunch.com/2018/06/10/korean-crypto-exchange-coinrail-loses-over-40m-in-tokens-following-a-hack>; <https://securityaffairs.com/73426/cyber-crime/cryptocurrency-exchange-coinrail-hacked.html>; <https://coinmarketcap.com/academy/article/crypto-hacks-the-coinrail-hack-resulted-in-a-loss-of-over-40-million>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** Coinrail's statement, relayed by TechCrunch, says there was a cyber intrusion. No source gives the entry vector; CoinMarketCap reports police and expert suspicions without confirmation. The operator's statement and the Pundi X posts could not be opened (Pundi X on Medium returned 403).

## Public references

- TechCrunch, "Korean crypto exchange Coinrail loses over $40M in tokens following a hack" (2018-06-10): <https://techcrunch.com/2018/06/10/korean-crypto-exchange-coinrail-loses-over-40m-in-tokens-following-a-hack>
- Security Affairs, "Cryptocurrency exchange Coinrail hacked" (2018-06-11): <https://securityaffairs.com/73426/cyber-crime/cryptocurrency-exchange-coinrail-hacked.html>
- CoinMarketCap Academy, "Crypto Hacks: The Coinrail Hack Resulted in a Loss of Over $40 Million": <https://coinmarketcap.com/academy/article/crypto-hacks-the-coinrail-hack-resulted-in-a-loss-of-over-40-million>
