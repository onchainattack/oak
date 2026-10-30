# CoinDCX — a fake part-time job offer put malware on an engineer's work laptop, which reached the exchange's internal liquidity account — CoinDCX / Solana, Ethereum — 2025-07-19

**Corrected 2026-10-30:** the earlier version recorded the entry vector as a "server breach" and built its teaching point on back-end infrastructure as a separate attack surface. Indian police reporting and the operator's own words from 2025-07-31 trace the breach to social engineering of an employee and malware on his company laptop. See `CORRECTIONS.md`.

**Loss:** **~\$44M** in USDT and USDC from an internal CoinDCX account used for liquidity provisioning with a partner exchange. It was not a customer-custody wallet. CoinDCX says no user funds were affected and it absorbed the loss from treasury. It offered a bounty of up to 25% of recovered funds (~\$11M).

**OAK Techniques observed:** **OAK-T15.001** (Social Engineering of Operator Personnel — *entry, per Bengaluru police via The Indian Express*. Attackers posing as recruiters offered a CoinDCX software engineer part-time work and induced him to install malware on his company-issued laptop. CEO Sumit Gupta: "Based on our internal preliminary findings, this appears to be a sophisticated social engineering attack." See [`techniques/T15.001-social-engineering-of-operator-personnel.md`](../techniques/T15.001-social-engineering-of-operator-personnel.md)). **OAK-T15.003** (Operator-Endpoint Compromise — per the complaint by Neblio Technologies, CoinDCX's operator, the engineer's credentials were compromised through the work laptop. That gave access to company servers and to the internal liquidity account. See [`techniques/T15.003-operator-endpoint-compromise.md`](../techniques/T15.003-operator-endpoint-compromise.md)). Laundering: a receiving address pre-funded with 1 ETH from Tornado Cash (**OAK-T7.001**), assets rotated on Solana via Jupiter and bridged to Ethereum via Wormhole (**OAK-T7.003**), per Merkle Science.

**Attribution:** **inferred-strong** — DPRK / Lazarus ([OAK-G01](../actors/OAK-G01-lazarus.md)). The basis is the recruiter-lure entry, which is the TraderTraitor pattern, together with analysts' reading of the Tornado pre-funding and the Solana → Ethereum laundering. Bengaluru police reportedly linked it to Lazarus by similarity to Bybit. No government has formally attributed it. The engineer was detained on 2025-07-31. He denies involvement, and OAK records no finding about him.

**Key teaching point:** **One employee laptop reached the liquidity account.** The lure was a side job and the payload was installed by the employee. What failed afterwards was that the laptop's credentials alone could move \$44M. Customer custody was segregated, and that bounded the loss. The operational account had no comparable second control.

## Summary

The account was drained in the early hours of 2025-07-19; ZachXBT identified the affected wallet as CoinDCX's before the exchange announced it. CoinDCX first described a server breach. After a complaint from Neblio Technologies, Bengaluru police detained a staff engineer on 2025-07-31 and seized his laptop. Police said hackers had tricked him into installing malware through a part-time job offer. The engineer said he worked for up to four private clients while employed and denied involvement in the theft.

## Timeline (UTC)

Read it as four stages. **Get in**: a recruiter lure, malware on a work laptop, then company servers. **Prepare**: a Tornado-funded address. **Take**: the internal liquidity account is drained. **Move**: Solana to Ethereum. The sources give dates, and clock times only in local time, so rows carry dates.

| When | What happened | OAK |
|---|---|---|
| Before 2025-07-19 (date undisclosed) | Attackers posing as recruiters offer a CoinDCX staff engineer part-time work and induce him to install malware on his company-issued laptop (Bengaluru police, via The Indian Express). The malware family is not published. | **T15.001** |
| Before 2025-07-19 (date undisclosed) | The engineer's credentials are compromised through the laptop, which gives access to company servers and to an internal account used for liquidity provisioning on a partner exchange (Neblio complaint, via Cointelegraph). | **T15.003** |
| Shortly before the first outflow | The attacker's receiving address is funded with 1 ETH withdrawn from Tornado Cash (ZachXBT; Merkle Science). | **T7.001** (funding) |
| 2025-07-19, early hours | A test transfer of 1 USDT leaves the account. Later that morning about \$44.2M in USDT and USDC is moved to six wallets (Cointelegraph, Ondology). | **T15.003** |
| 2025-07-19 onward | The attacker converts the proceeds to SOL through Jupiter in batches, then bridges them from Solana to Ethereum via Wormhole (Merkle Science). | **T7.003** |
| By 2025-07-21 | The funds are consolidated into one Ethereum address holding about 4,443 ETH and 155,830 SOL, dormant as of CoinDCX's statement (TechCrunch; Merkle Science). | — |
| 2025-07-19 | CoinDCX CEO Sumit Gupta discloses the incident, says the affected account was isolated, that no customer funds are involved, and that CoinDCX will absorb the loss from treasury. ZachXBT had already linked the wallet to CoinDCX. | response |
| 2025-07-21 | CoinDCX offers up to 25% of recovered funds as a bounty and says it is working with CERT-In and partner exchanges (TechCrunch). | response |
| 2025-07-31 | Bengaluru police detain a staff engineer and seize his laptop after Neblio's complaint. He denies involvement in the theft (Cointelegraph). | response |

Key addresses:

- Attacker receiving address (funded with 1 ETH from Tornado Cash) — full address not published
- Compromised internal liquidity account (Solana) — full address not published
- Final Ethereum holding address (about 4,443 ETH) — full address not published

## Root-cause evidence

- **Technique:** OAK-T15.001
- **Source:** <https://cointelegraph.com/news/coindcx-hack-employee-arrested-44m-crypto-theft>; <https://www.coinspeaker.com/scam-alert-here-is-real-reason-coindcx-was-hacked-for-44-million/>
- **Source type:** news
- **Confidence:** corroborated
- **Evidence:** Bengaluru police, as reported by The Indian Express and relayed by Cointelegraph and Coinspeaker, describe the recruiter lure and the malware on the work laptop. Neblio's complaint says the credentials were compromised through the laptop. The CEO calls it social engineering. The malware family has not been published.

## Public references

- `[cointelegraphcoindcxarrest2025]` — Cointelegraph, CoinDCX employee arrested over \$44M theft (2025-07-31): <https://cointelegraph.com/news/coindcx-hack-employee-arrested-44m-crypto-theft>
- `[coinspeakercoindcx2025]` — Coinspeaker, the reason CoinDCX was hacked (2025-07-31): <https://www.coinspeaker.com/scam-alert-here-is-real-reason-coindcx-was-hacked-for-44-million/>
- `[ondologycoindcx2025]` — Ondology Labs, CoinDCX \$44M hack: <https://ondologylabs.com/blog/coindcx-44-million-hack>
- `[techcrunchcoindcx2025]` — TechCrunch, CoinDCX confirms \$44 million stolen: <https://techcrunch.com/2025/07/21/indian-crypto-exchange-coindcx-confirms-44-million-stolen-during-hack/>
- `[merklecoindcx2025]` — Merkle Science, Hack Track: Inside the CoinDCX exploit: <https://www.merklescience.com/blog/hack-track-inside-the-coindcx-exploit>
- `[coindeskcoindcx2025]` — CoinDesk, CoinDCX suffers \$44M hack: <https://www.coindesk.com/web3/2025/07/19/indian-crypto-exchange-coindcx-suffers-44m-hack>
