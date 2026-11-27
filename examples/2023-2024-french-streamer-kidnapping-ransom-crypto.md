# TeufeurS — kidnapping of the streamer's father paid as a crypto ransom, ~\$800K frozen at Binance — France / chain undisclosed — 2023

**Loss:** **~\$2M** in crypto paid as a ransom, per [ZachXBT's post](https://x.com/zachxbt/status/2046911569532231725). [Dexerto](https://www.dexerto.com/kick/crypto-sleuth-zachxbt-helped-catch-kidnappers-after-streamer-targeted-in-2m-ransom-plot-3355253/) puts the transfer at around €1.7 million. **~\$800K** was frozen with the Binance Security team ([ZachXBT](https://x.com/zachxbt/status/2046911569532231725)). Which coin was paid is not stated on any page opened.

**OAK Techniques observed:** **OAK-T5.009** (Physical-Coercion Extraction — *primary*). The leverage was the abduction of the streamer's father, and the payment was the coerced on-chain transfer ([Dexerto](https://www.dexerto.com/kick/crypto-sleuth-zachxbt-helped-catch-kidnappers-after-streamer-targeted-in-2m-ransom-plot-3355253/), [Bitcoin.com News](https://news.bitcoin.com/zachxbt-freeze-800k-french-streamer-kidnapping-ransom/)). See [`techniques/T5.009-physical-coercion-extraction.md`](../techniques/T5.009-physical-coercion-extraction.md). No laundering path is described by any opened source.

**Attribution:** **unattributed** by name. ZachXBT says [six suspects tied to the incident were later arrested](https://x.com/zachxbt/status/2046911569532231725); [Bitcoin.com News](https://news.bitcoin.com/zachxbt-freeze-800k-french-streamer-kidnapping-ransom/) relays that they were arrested by French authorities. No opened page names them or gives charges.

**Key teaching point:** **When a ransom is paid in crypto, report the receiving addresses to the exchanges that hold the funds at once.** The freeze in this case came through the Binance Security team ([ZachXBT](https://x.com/zachxbt/status/2046911569532231725)).

## Summary

According to [Dexerto](https://www.dexerto.com/kick/crypto-sleuth-zachxbt-helped-catch-kidnappers-after-streamer-targeted-in-2m-ransom-plot-3355253/) and [Bitcoin.com News](https://news.bitcoin.com/zachxbt-freeze-800k-french-streamer-kidnapping-ransom/), the father of the French streamer TeufeurS was abducted in Sarthe in August 2023 by a group posing as Amazon delivery workers. Dexerto reports that around €1.7 million in crypto was transferred within hours and that the father was later found alive. [ZachXBT](https://x.com/zachxbt/status/2046911569532231725) dates the extortion to "late 2023" and says he helped lead efforts that led to an ~\$800K freeze with the Binance Security team after a \$2M ransom was paid. He disclosed it on 2026-04-22 and says he held off until then because of the sensitivity of the case.

## Timeline (UTC)

Stages: **Entry** (abduction), **Execution** (ransom payment), **Money** (freeze), **Response** (arrests, disclosure). Exact times are undisclosed.

| When | What happened | OAK |
|---|---|---|
| 2023-08 | The streamer's father is abducted in Sarthe by a group posing as Amazon delivery workers ([Dexerto](https://www.dexerto.com/kick/crypto-sleuth-zachxbt-helped-catch-kidnappers-after-streamer-targeted-in-2m-ransom-plot-3355253/), [Bitcoin.com News](https://news.bitcoin.com/zachxbt-freeze-800k-french-streamer-kidnapping-ransom/)). ZachXBT dates the extortion to late 2023. | **T5.009** |
| 2023 (date undisclosed) | A ransom of about \$2M in crypto is paid ([ZachXBT](https://x.com/zachxbt/status/2046911569532231725)); Dexerto says within hours of the abduction. Addresses and transaction hashes are undisclosed. | **T5.009** |
| 2023 (date undisclosed) | ~\$800K is frozen with the Binance Security team after on-chain tracing led by ZachXBT ([ZachXBT](https://x.com/zachxbt/status/2046911569532231725)). Where the other funds went is undisclosed. | response |
| Before 2026-04-22 (dates undisclosed) | Six suspects are arrested ([ZachXBT](https://x.com/zachxbt/status/2046911569532231725)). | response |
| 2026-04-22 | ZachXBT publicly discloses his role ([post](https://x.com/zachxbt/status/2046911569532231725)). | response |

Key addresses: undisclosed. No opened page prints the ransom or freeze addresses.

## Root-cause evidence

- **Technique:** OAK-T5.009
- **Source:** <https://x.com/zachxbt/status/2046911569532231725>; <https://www.dexerto.com/kick/crypto-sleuth-zachxbt-helped-catch-kidnappers-after-streamer-targeted-in-2m-ransom-plot-3355253/>; <https://news.bitcoin.com/zachxbt-freeze-800k-french-streamer-kidnapping-ransom/>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** ZachXBT, who took part in the tracing, says a family member was kidnapped and a \$2M ransom paid; two news outlets repeat his account and add the abduction details. No court or police document was opened. The coin, addresses and the date of the arrests are undisclosed.

## Public references

- ZachXBT, post on X (2026-04-22): <https://x.com/zachxbt/status/2046911569532231725>
- Dexerto, "Crypto sleuth ZachXBT helped catch kidnappers after streamer targeted in \$2M ransom plot": <https://www.dexerto.com/kick/crypto-sleuth-zachxbt-helped-catch-kidnappers-after-streamer-targeted-in-2m-ransom-plot-3355253/>
- Bitcoin.com News, "ZachXBT Helped Freeze \$800K After French Streamer's Dad Was Kidnapped in Crypto Ransom Plot" (2026-04-23): <https://news.bitcoin.com/zachxbt-freeze-800k-french-streamer-kidnapping-ransom/>
