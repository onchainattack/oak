# Indodax — hot-wallet withdrawals drained across several chains, mechanism disputed — Indodax / multi-chain — 2024-09-11

**Loss:** about \$22M in several assets on 2024-09-11 ([Cointelegraph](https://cointelegraph.com/news/indodax-crypto-exchange-hacked-22-million-loss)). Cointelegraph breaks it out as roughly \$1.42M BTC, \$2.4M TRX, over \$14.6M in ERC-20 tokens, \$2.58M POL and \$900,000 ETH on Optimism. The Crypto Basic lists 25 BTC, 1,047 ETH, \$6.14M USDT, 2.2M MATIC and 1.4M ARB, plus an unquantified Tron loss ([The Crypto Basic](https://thecryptobasic.com/2024/09/11/indonesian-exchange-indodax-loses-25-btc-1047-eth-and-6-14m-usdt-worth-22m-to-hackers/)). The two breakdowns differ and neither is reconciled here. Indodax said user funds were safe; no reimbursement or recovery figure appears in the sources read.

**OAK Techniques observed:** none — the sources disagree on the entry vector (a weakness in the withdrawal system per SlowMist; a leaked hot-wallet private key, possibly via the signing machine, per Cyvers), so no Technique can be matched without guessing ([Cointelegraph](https://cointelegraph.com/news/indodax-crypto-exchange-hacked-22-million-loss)).

**Attribution:** **inferred-weak.** Cyvers' head of AI said the pattern highly resembled North Korea's Lazarus Group; Cointelegraph presents this as a suspicion, not a confirmed attribution ([Cointelegraph](https://cointelegraph.com/news/indodax-crypto-exchange-hacked-22-million-loss); [The Crypto Basic](https://thecryptobasic.com/2024/09/11/indonesian-exchange-indodax-loses-25-btc-1047-eth-and-6-14m-usdt-worth-22m-to-hackers/)). No government attribution appears in the sources read.

**Key teaching point:** **Make the hot wallet unable to pay out on its own: cap per-chain withdrawal totals and require an independently held approval above the cap.** Whichever of SlowMist's or Cyvers' explanations holds, the attacker could withdraw from the hot wallet on several chains in one window.

## Summary

On 2024-09-11 PeckShield, Cyvers and SlowMist flagged suspicious outflows from Indodax hot wallets ([Cointelegraph](https://cointelegraph.com/news/indodax-crypto-exchange-hacked-22-million-loss)); Lookonchain was also reported as first to flag the loss ([The Crypto Basic](https://thecryptobasic.com/2024/09/11/indonesian-exchange-indodax-loses-25-btc-1047-eth-and-6-14m-usdt-worth-22m-to-hackers/)). Indodax confirmed on X that it had halted operations for maintenance and later said user funds were safe; on-chain data shows it moved funds from the affected hot wallet to its cold wallet ([The Crypto Basic](https://thecryptobasic.com/2024/09/11/indonesian-exchange-indodax-loses-25-btc-1047-eth-and-6-14m-usdt-worth-22m-to-hackers/)). SlowMist's independent review pointed to a breach in the withdrawal system that let the attacker pull funds from the hot wallet; Cyvers believed other systems such as the signature machine were attacked ([Cointelegraph](https://cointelegraph.com/news/indodax-crypto-exchange-hacked-22-million-loss)). Where the stolen funds went is undisclosed in the sources read.

## Timeline (UTC)

Stages: **Take**, **Money**, **Response**. Sources give a date, not times; entry and preparation are undisclosed.

| When | What happened | OAK |
|---|---|---|
| Before 2024-09-11 (undisclosed) | How the attacker gained withdrawal ability: disputed between a withdrawal-system breach (SlowMist) and a leaked hot-wallet key or compromised signing machine (Cyvers) ([Cointelegraph](https://cointelegraph.com/news/indodax-crypto-exchange-hacked-22-million-loss)) | — |
| 2024-09-11 | Hot-wallet outflows across BTC, Tron, Ethereum/ERC-20, Polygon and Optimism assets, about \$22M in total ([Cointelegraph](https://cointelegraph.com/news/indodax-crypto-exchange-hacked-22-million-loss)). Transaction hashes: not published in the sources read | — |
| 2024-09-11 | Where the funds went: undisclosed | — |
| 2024-09-11 | PeckShield, Cyvers and SlowMist raise the alert; Indodax takes its web and app offline for maintenance and says user assets are safe ([Cointelegraph](https://cointelegraph.com/news/indodax-crypto-exchange-hacked-22-million-loss)) | response |
| 2024-09-11 | Indodax moves funds from the affected hot wallet to its cold wallet ([The Crypto Basic](https://thecryptobasic.com/2024/09/11/indonesian-exchange-indodax-loses-25-btc-1047-eth-and-6-14m-usdt-worth-22m-to-hackers/)) | response |

Key addresses: none printed in full on the pages read (undisclosed here).

## Root-cause evidence

- **Technique:** none — mechanism disputed
- **Source:** <https://cointelegraph.com/news/indodax-crypto-exchange-hacked-22-million-loss>; <https://thecryptobasic.com/2024/09/11/indonesian-exchange-indodax-loses-25-btc-1047-eth-and-6-14m-usdt-worth-22m-to-hackers/>
- **Source type:** news
- **Confidence:** disputed
- **Evidence:** SlowMist (withdrawal-system weakness) and Cyvers (hot-wallet key leak, possibly through the signing machine) give different explanations the same day, and The Crypto Basic gives a third (bugs planted on the platform). Indodax published no post-mortem in the sources read.

## Public references

- Cointelegraph, "Indonesian crypto exchange Indodax goes offline after suspected \$22M hack" (2024-09-11): <https://cointelegraph.com/news/indodax-crypto-exchange-hacked-22-million-loss>
- The Crypto Basic, Indodax loses 25 BTC, 1,047 ETH and 6.14M USDT (2024-09-11): <https://thecryptobasic.com/2024/09/11/indonesian-exchange-indodax-loses-25-btc-1047-eth-and-6-14m-usdt-worth-22m-to-hackers/>
