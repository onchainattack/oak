# Lazarus Group — ZachXBT traces over \$200M from 25+ hacks through mixers, bridges and P2P platforms to fiat — 2020-2023

**Loss:** over \$200M of hacked crypto laundered from 25+ hacks, August 2020 to October 2023, per ZachXBT's analysis ([Decrypt](https://decrypt.co/228606/north-koreas-lazarus-group-laundered-200m-in-crypto-says-blockchain-sleuth-heres-how), [Cointelegraph](https://cointelegraph.com/news/lazarus-group-laundered-200m-crypto-since-2020)). Frozen: Cointelegraph reports Tether blacklisted over \$374,000 in November 2023 and that three of four stablecoin issuers blacklisted \$3.4M across Lazarus-linked addresses; it does not name the issuers.

**OAK Techniques observed:** **OAK-T7.001** (Mixer-Routed Hop — primary; Decrypt reports Tornado Cash on Ethereum and ChipMixer on Bitcoin, see [`techniques/T7.001-mixer-routed-hop.md`](../techniques/T7.001-mixer-routed-hop.md)). **OAK-T7.003** (Cross-Chain Bridge Laundering — Decrypt reports repeated bridging of tokens across chains). **OAK-T7.002** (CEX Deposit-Address Layering — Decrypt reports accounts that received about \$44M and converted it to fiat). Not mapped: the Noones and Paxful peer-to-peer fiat off-ramp, which no existing Technique covers.

**OAK-Gnn:** [OAK-G01 Lazarus Group / DPRK-attributed](../actors/OAK-G01-lazarus.md).

**Attribution:** **inferred-strong** — ZachXBT's attribution of the laundering to Lazarus Group; Decrypt reports that the FBI attributed one of the hacks (Stake.com) to Lazarus and describes the laundering finding as ZachXBT's analysis. No government statement about this investigation was opened.

**Key teaching point:** **Put P2P-marketplace and OTC deposit accounts inside the same screening as exchange deposit addresses, and share a flagged address with every stablecoin issuer.** Cointelegraph reports that the P2P accounts "EasyGoatfish351" and "FairJunco470" at Paxful and Noones handled at least \$44M whose deposits and volumes matched the stolen funds.

## Summary

On 2024-04-29 ZachXBT announced an investigation of how Lazarus Group laundered about \$200M from 25+ hacks to fiat between 2020 and 2023 ([post](https://x.com/zachxbt/status/1784935501935390930); the full write-up is on his Mirror page, which returned 403 to the fetch). Decrypt reports the hacks ran from August 2020 to October 2023 across multiple blockchains, naming Stake.com (\$41M) and Ronin, and that funds went through Tornado Cash and ChipMixer, were bridged repeatedly, and ended at Bitcoin P2P platforms Noones and Paxful and at centralized exchange accounts ([Decrypt](https://decrypt.co/228606/north-koreas-lazarus-group-laundered-200m-in-crypto-says-blockchain-sleuth-heres-how)). Cointelegraph reports the funds were converted to USDT and then to cash, and notes that the group has historically used China-based OTC traders ([Cointelegraph](https://cointelegraph.com/news/lazarus-group-laundered-200m-crypto-since-2020)); Cointelegraph does not describe bridges or exchanges in the path, so the two outlets differ on that detail.

Decrypt reports that Binance and MetaMask helped ZachXBT identify accounts he believes are linked to Lazarus. Both outlets describe the findings as ZachXBT's analysis, not a legal conclusion.

## Timeline (UTC)

Stages: **Entry** (the hacks, not detailed here), **Preparation** (mixing), **Execution** (bridging, P2P), **Funds** (fiat), **Response** (freezes, disclosure). No times are published.

| When | What happened | OAK |
|---|---|---|
| 2020-08 to 2023-10 | 25+ hacks across multiple chains, analysed by ZachXBT ([Decrypt](https://decrypt.co/228606/north-koreas-lazarus-group-laundered-200m-in-crypto-says-blockchain-sleuth-heres-how)) | — |
| Undisclosed | Proceeds mixed through Tornado Cash (Ethereum) and ChipMixer (Bitcoin) ([Decrypt](https://decrypt.co/228606/north-koreas-lazarus-group-laundered-200m-in-crypto-says-blockchain-sleuth-heres-how)) | T7.001 |
| Undisclosed | Tokens bridged repeatedly across chains (Decrypt) | T7.003 |
| Undisclosed | Accounts at Noones and Paxful handle at least \$44M, converted to USDT then cash ([Cointelegraph](https://cointelegraph.com/news/lazarus-group-laundered-200m-crypto-since-2020)) | none — P2P off-ramp |
| Undisclosed | Exchange accounts convert funds to fiat (Decrypt) | T7.002 |
| 2023-11 | Tether blacklists over \$374,000 ([Cointelegraph](https://cointelegraph.com/news/lazarus-group-laundered-200m-crypto-since-2020)) | response |
| Undisclosed | Three of four stablecoin issuers blacklist \$3.4M (Cointelegraph) | response |
| 2024-04-29 | ZachXBT publishes the investigation ([post](https://x.com/zachxbt/status/1784935501935390930)) | response |

Key addresses: undisclosed. None is printed in full on a page opened for this pass.

## Root-cause evidence

- **Technique:** OAK-T7.001
- **Source:** <https://x.com/zachxbt/status/1784935501935390930>; <https://decrypt.co/228606/north-koreas-lazarus-group-laundered-200m-in-crypto-says-blockchain-sleuth-heres-how>; <https://cointelegraph.com/news/lazarus-group-laundered-200m-crypto-since-2020>
- **Source type:** independent-researcher
- **Confidence:** corroborated
- **Evidence:** Two outlets independently relay ZachXBT's analysis and agree on the \$200M, 25+ hacks and the P2P platforms; they differ on whether bridges and exchanges were part of the path. The primary write-up could not be opened. No address-level evidence was reviewed.

## Public references

- ZachXBT, announcement post (2024-04-29): <https://x.com/zachxbt/status/1784935501935390930>
- Decrypt, "North Korea's Lazarus Group Laundered \$200M in Crypto, Says Blockchain Sleuth" (2024-04-29): <https://decrypt.co/228606/north-koreas-lazarus-group-laundered-200m-in-crypto-says-blockchain-sleuth-heres-how>
- Cointelegraph, "Lazarus Group laundered \$200M in crypto since 2020" (2024-04-29): <https://cointelegraph.com/news/lazarus-group-laundered-200m-crypto-since-2020>
