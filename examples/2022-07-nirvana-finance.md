# Nirvana Finance — flash-loaned USDC used to manipulate the ANA price, treasury drained — Solana — 2022-07-28

**Loss:** **~\$3.5M** from the Nirvana treasury: [The Block](https://www.theblock.co/news/regulation/2022-07-28-solana-stablecoin-nirvana-sinks-90-amid-3-5-million-flash-loan-exploit-159975) and [Cointelegraph](https://cointelegraph.com/news/solana-based-stablecoin-nirv-drops-85-following-3-5m-exploit) report about \$3.49M, and [CertiK](https://www.certik.com/blog/nirvana-finance-incident-analysis) gives attacker profit figures between about \$3.55M and \$3.57M and cites Nirvana's post-mortem for a loss "of over ~10M in assets" (CertiK's wording, relayed). ANA and NIRV lost about 85-90% of their value (The Block, Cointelegraph). No recovery is reported in the opened sources.

**OAK Techniques observed:** **OAK-T9.002** (Flash-Loan-Enabled Exploit — *primary*). The attacker borrowed about \$10M of USDC from Solend's flash-loan facility ([Cointelegraph](https://cointelegraph.com/news/solana-based-stablecoin-nirv-drops-85-following-3-5m-exploit), [CertiK](https://www.certik.com/blog/nirvana-finance-incident-analysis)). See [`techniques/T9.002-flash-loan-enabled-exploit.md`](../techniques/T9.002-flash-loan-enabled-exploit.md). The price flaw inside Nirvana's program is mapped to **none — the opened sources disagree on how the price was moved (see Root-cause evidence), and no source gives the flawed function**; OAK does not force it into T9.001, whose page covers a price oracle. Bridging out through Wormhole is not mapped to a Technique.

**Attribution:** **unattributed.** [CertiK](https://www.certik.com/blog/nirvana-finance-incident-analysis) relays Nirvana's statement that it traced the originating wallet back to Huobi and was working with that exchange. No individual is named in the opened sources.

**Key teaching point:** **Price any mint or redemption in the same transaction against a value the caller cannot move in that transaction.** [Cointelegraph](https://cointelegraph.com/news/solana-based-stablecoin-nirv-drops-85-following-3-5m-exploit) (citing OtterSec) reports the attacker raised ANA's price from \$8 to \$24 with borrowed funds and then minted and sold ANA against the treasury; a same-transaction price-change limit on the program would have stopped that sequence. Nirvana itself said the exploit was of its own program, not of Solend.

## Summary

On 2022-07-28 an attacker took a flash loan of about \$10M USDC from Solend, used it against Nirvana's program to move the ANA price, took roughly \$3.5M of USDT out of the Nirvana treasury, repaid the loan and bridged the proceeds from Solana to Ethereum through Wormhole ([The Block](https://www.theblock.co/news/regulation/2022-07-28-solana-stablecoin-nirvana-sinks-90-amid-3-5-million-flash-loan-exploit-159975), [Cointelegraph](https://cointelegraph.com/news/solana-based-stablecoin-nirv-drops-85-following-3-5m-exploit), [CertiK](https://www.certik.com/blog/nirvana-finance-incident-analysis)). The Block reports that Solend said its own protocol was not affected. Nirvana asked the attacker to return the funds and offered a \$300,000 white-hat bounty ([Cointelegraph](https://cointelegraph.com/news/solana-based-stablecoin-nirv-drops-85-following-3-5m-exploit)).

## Timeline (UTC)

Stages: **Flaw** (price handling in Nirvana's program), **Take** (flash loan, price move, sale to treasury), **Money** (USDT to USDCet, Wormhole to Ethereum), **Response**. No source opened for this entry gives block times; rows carry dates only.

| When | What happened | OAK |
|---|---|---|
| Before 2022-07-28 (undisclosed) | Nirvana's program lets a caller move the ANA price inside one transaction. The exact flawed function is not given in the opened sources. | — |
| 2022-07-28 | The attacker borrows about \$10M USDC from the Solend main pool vault ([Cointelegraph](https://cointelegraph.com/news/solana-based-stablecoin-nirv-drops-85-following-3-5m-exploit); CertiK gives \$10,250,000 USDC) | **T9.002** |
| 2022-07-28 | Per OtterSec (relayed by Cointelegraph), an attacker program raises ANA from \$8 to \$24 using the borrowed funds; ANA is minted at that price and sold to the treasury for about \$3.49M USDT ([Cointelegraph](https://cointelegraph.com/news/solana-based-stablecoin-nirv-drops-85-following-3-5m-exploit), [CertiK](https://www.certik.com/blog/nirvana-finance-incident-analysis)). Exploit tx on Solana: [`LyUnvdY9KBQiVRFqmSzGUfCuPGqYX1xNHCWLWxWZ4MvgLcNis2Kui6T25Ayai5UzpTAFkSRSgriKb3pM8tAoeR5`](https://solscan.io/tx/LyUnvdY9KBQiVRFqmSzGUfCuPGqYX1xNHCWLWxWZ4MvgLcNis2Kui6T25Ayai5UzpTAFkSRSgriKb3pM8tAoeR5) | **T9.002** |
| 2022-07-28 | The attacker repays the flash loan, converts USDT to USDCet and moves it to Ethereum over Wormhole ([Cointelegraph](https://cointelegraph.com/news/solana-based-stablecoin-nirv-drops-85-following-3-5m-exploit), [CertiK](https://www.certik.com/blog/nirvana-finance-incident-analysis)). Solana conversion tx [`5yF3VH82Wa3TC4zxdzxmEq4jL3EvSPovHVLG3XASzjHNpiyeSt1t2FF6WrHN94hBJc4AAHb3sUWgsAsupSRuszF7`](https://solscan.io/tx/5yF3VH82Wa3TC4zxdzxmEq4jL3EvSPovHVLG3XASzjHNpiyeSt1t2FF6WrHN94hBJc4AAHb3sUWgsAsupSRuszF7); Ethereum tx [`0xb5a89c01da58ec7ec8a4b0d0361d8f1719966d4deceaa01efc1362601a76339c`](https://etherscan.io/tx/0xb5a89c01da58ec7ec8a4b0d0361d8f1719966d4deceaa01efc1362601a76339c) | — |
| 2022-07-28 | Nirvana says it was hacked, that the fault is its own program and not Solend's, and asks for the treasury back ([Cointelegraph](https://cointelegraph.com/news/solana-based-stablecoin-nirv-drops-85-following-3-5m-exploit)). Solend says it was in contact with Nirvana and not affected ([The Block](https://www.theblock.co/news/regulation/2022-07-28-solana-stablecoin-nirvana-sinks-90-amid-3-5-million-flash-loan-exploit-159975)). Nirvana offers a \$300,000 bounty and an end to the investigation into the attacker's identity (Cointelegraph; CertiK dates the thread to 21:00 UTC on 2022-07-28) | response |
| 2022-07-31 | Nirvana publishes an official statement on Medium (per [CertiK](https://www.certik.com/blog/nirvana-finance-incident-analysis); OAK could not open that page). CertiK relays that Nirvana says it fixed the code and flagged the wallets involved | response |
| At CertiK's writing (undated) | The funds remain in Ethereum wallet `0xB9AE2624Ab08661F010185d72Dd506E199E67C09` and no return is reported ([CertiK](https://www.certik.com/blog/nirvana-finance-incident-analysis)) | — |

Key addresses (as printed in full by [CertiK](https://www.certik.com/blog/nirvana-finance-incident-analysis)):

- Attacker (Solana) — [`76w4SBe2of2wWUsx2FjkkwD29rRznfvEkBa1upSbTAWH`](https://solscan.io/account/76w4SBe2of2wWUsx2FjkkwD29rRznfvEkBa1upSbTAWH)
- Nirvana treasury (Solana) — [`CxuuSEv67PzNkMxqCvHeDUr6HKaadoz8NhTfxbQSJnaG`](https://solscan.io/account/CxuuSEv67PzNkMxqCvHeDUr6HKaadoz8NhTfxbQSJnaG)
- Nirvana program (Solana) — [`nirkXSE28jCQoK8SmKWqxXz3L9vbSRGKS24iYJj8Aeo`](https://solscan.io/account/nirkXSE28jCQoK8SmKWqxXz3L9vbSRGKS24iYJj8Aeo)
- Solend main pool vault (flash-loan source) — [`DdZR6zRFiUt4S5mg7AV1uKB2z1f1WzcNYCaTEEWPAuby`](https://solscan.io/account/DdZR6zRFiUt4S5mg7AV1uKB2z1f1WzcNYCaTEEWPAuby)
- Receiving Ethereum wallet — [`0xB9AE2624Ab08661F010185d72Dd506E199E67C09`](https://etherscan.io/address/0xB9AE2624Ab08661F010185d72Dd506E199E67C09)

## Root-cause evidence

- **Technique:** OAK-T9.002
- **Source:** <https://www.certik.com/blog/nirvana-finance-incident-analysis>; <https://cointelegraph.com/news/solana-based-stablecoin-nirv-drops-85-following-3-5m-exploit>; <https://www.theblock.co/news/regulation/2022-07-28-solana-stablecoin-nirvana-sinks-90-amid-3-5-million-flash-loan-exploit-159975>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** All three sources agree on the Solend flash loan, the date, the roughly \$3.5M taken and the Wormhole bridge to Ethereum. They disagree on how the price was moved. CertiK says the attacker manipulated inputs to Nirvana's program and bought ANA at an artificially low price. Cointelegraph, citing OtterSec, says the price was raised from \$8 to \$24 and ANA was minted and sold at that price. The Block says the oracle feed was manipulated. Nirvana's own post-mortem was not opened, so the exact flawed function is undisclosed here and the mechanism is not settled.

## Public references

- CertiK, "Nirvana Finance Incident Analysis": <https://www.certik.com/blog/nirvana-finance-incident-analysis>
- Cointelegraph, "Solana-based stablecoin NIRV drops 85% following \$3.5M exploit" (2022-07-29): <https://cointelegraph.com/news/solana-based-stablecoin-nirv-drops-85-following-3-5m-exploit>
- The Block, "Solana stablecoin Nirvana sinks 90% amid \$3.5 million flash loan exploit" (2022-07-28): <https://www.theblock.co/news/regulation/2022-07-28-solana-stablecoin-nirvana-sinks-90-amid-3-5-million-flash-loan-exploit-159975>
