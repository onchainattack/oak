# Binance — a DevOps engineer's laptop led to a service container that could submit withdrawals, and the hot wallets were emptied — Binance / Ethereum, Bitcoin, Tron, XRP Ledger and others — 2026-10-29

**Loss:** **~\$6.3B** per Binance (Chainalysis ~\$5.91B, TRM ~\$6.36B, Elliptic ~\$6.43B at theft-time prices). About **\$3B frozen on-chain** by 2026-10-30, mostly stablecoins (Tether >1.567B USDT, Circle 800M USDC; Ripple and World Liberty Financial also froze, Arbitrum's Security Council froze ~\$30M). Elliptic counts ~\$3.33B the attacker still controls in assets no issuer can freeze, including ~511,861 ETH and 18,270 BTC. Binance says it will cover all losses from SAFU and company funds; deposits and withdrawals were suspended. By 2026-10-31 14:30 UTC Binance said 90% of the stolen assets had been replenished (SAFU, part of the Futures insurance fund, corporate treasury), with withdrawals to reopen on 2026-11-01 ([`binanceupdate3_2026`]). The largest crypto theft on record, about four times Bybit. Per-chain at 20:24 UTC prices (Ondology Labs; Ethereum, Arbitrum and Avalanche verified by Ondology, the rest from CertiK): Ethereum \$3.74B, Bitcoin \$1.47B, Tron \$627.5M, XRP \$296.5M, Solana \$96.1M, Arbitrum \$31.8M, Avalanche \$24.3M, Optimism \$4.8M, about \$6.28B in total. Tether and Circle froze \$2.01B within an hour of the sweep.

**OAK Techniques observed:** **OAK-T15.003** (Operator-Endpoint Compromise — *primary, operator-stated preliminary finding*. Binance: a **compromised DevOps engineer's laptop** "allowed an attacker to gain access to a service container and submit unauthorized withdrawal transactions"; it found "no evidence of any wallet private key leak". Co-CEO Richard Teng (2026-10-30 07:37 UTC): "the attacker did not simply use one engineer's permissions, and this was not a single 'one-click' action. It involved a more complex attack process. Our investigation has not attributed responsibility to any individual." The laptop is the reported starting point; no employee is blamed. Binance's own update (2026-10-30 08:47 UTC): "our initial investigation suggested that the security incident may have involved a compromised laptop, however our subsequent investigation has uncovered additional points of breach. This was a complex attack." Teng later said the EIP-7702 delegation "did not pass through our normal approval controls" and that the attacker used a self-destruct mechanism that destroyed its tooling and traces as it ran (as reported by Elliptic and Decrypt). See [`techniques/T15.003-operator-endpoint-compromise.md`](../techniques/T15.003-operator-endpoint-compromise.md)). **OAK-T13.004** (EIP-7702 Delegation Abuse — *Ethereum leg, verified on-chain by Ondology Labs; TRM Labs reports the same*. **Binance 14** ([`0x28c6c06298d514db089934071355e5743bf21d60`](https://etherscan.io/address/0x28c6c06298d514db089934071355e5743bf21d60)) is a plain EOA. At 20:20:59 UTC the attacker's initiator submitted one transaction carrying **50 EIP-7702 authorizations, each recovered to the Binance 14 key**, for nonces 18,914,775–18,914,824, all delegating to an unverified sweep contract ([`0x63e842b054bd624a465454d533c33f573e9c6fae`](https://etherscan.io/address/0x63e842b054bd624a465454d533c33f573e9c6fae)) that only the initiator can call; nonce 18,914,809 matched. The lowest nonce equalled Binance 14's live nonce about three minutes earlier, which Ondology reads as signing in real time. At 20:24:23 the sweep moved **167,464 ETH and 63 tokens**. Binance 14 also controls the smart wallet **Hot Wallet 34**, which the attacker then directed to pay out **823M USDC**. Blockaid read the sweep contract: only the hardcoded operator (the initiator) can call `sweep()`, which pulls every ERC-20 and all ETH except 1 ETH left for gas, so anything arriving later "stay[s] stealable" ([`blockaidsweeper2026`]). That is why the 200M USDT top-up at 21:44 was swept too. Binance 16 sent nine ordinary signed transfers 24 seconds after the sweep, with no delegation needed. Binance 14 signed a 7702 revocation at 00:10:35 on 2026-10-30, 3 h 50 m after the takeover. See [`techniques/T13.004-eip7702-delegation-abuse.md`](../techniques/T13.004-eip7702-delegation-abuse.md)). Preparation and aftermath: **OAK-T7.001** (Tornado Cash funding of the initiator) and **OAK-T8.001** (proceeds share an address with the Bitget exploit; the Tron bridge route ends at an address the Phemex hacker used before), **OAK-T7.003** (cross-chain hops: THORChain, Bitget Wallet's swap bridge, Circle CCTP from Avalanche), and **OAK-T7.007** (DEX routing: tokens that can be frozen or are illiquid are sold for ETH through single-use wallets and Uniswap pools, traced by OAK). The other chains (XRP from 20:04:52 UTC, then Solana, Optimism, Bitcoin, Tron, Arbitrum and Avalanche) were drained by ordinary signed transfers. On Bitcoin, 18,270 BTC left in 11 transactions shaped like ordinary withdrawals and were split into 19 wallets (CoinDesk). The chain shows *what* Binance's keys signed, not *how* the attacker made them sign it. That gap is the service-container step.

**Attribution:** **inferred-strong** — by blockchain-analytics firms, not by Binance. TRM Labs ("high confidence") and Chainalysis tie it to DPRK / TraderTraitor ([OAK-G01](../actors/OAK-G01-lazarus.md)); ZachXBT reported at 04:51 UTC on 10-30 that Binance and [Bitget](2026-09-bitget-wallet-backend-spoofed-transfer-data-hot-warm-drain.md) proceeds had been commingled at the same address ([`0x15104a9ce0f08a8f0075a0869ae80e795fe0feb7`](https://etherscan.io/address/0x15104a9ce0f08a8f0075a0869ae80e795fe0feb7)) about 45 minutes earlier, after arriving via THORChain ([`zachxbtbinancebitget2026`]). Elliptic says only about \$39K of Binance funds reached it and calls the overlap small. Chainalysis calls the commingling the direct on-chain link behind its TraderTraitor assessment. MistTrack separately found that the Tron route bridges out to an address the Phemex hacker used before ([`misttrackbinancetron2026`]). OAK has not yet traced either side to `0x15104a9ce0f08a8f0075a0869ae80e795fe0feb7`. Chainalysis (04:31 UTC 10-30): "a high degree of confidence that DPRK is responsible" ([`chainalysisdprk2026`]). No government has confirmed the attribution (Elliptic). Asked about it on 10-30, President Trump said "we don't know" (as relayed by Coin Bureau), and Reuters reported that the FBI and US Secret Service are working with Binance ([`coinbureautrump2026`]). Elliptic agrees on DPRK but flags laundering that differs from the Bybit pattern. Binance says it is working with law enforcement to identify the attackers.

**Key teaching point:** **If a container can submit withdrawals, the key is wherever that container is.** No key leaked, and it did not need to: the signing service did what it was asked. Withdrawal paths need limits and approvals that the submitting service cannot satisfy by itself. An exchange hot wallet that is an EOA on a 7702 chain needs a signer that refuses `0x05` authorization payloads outright. Fifty pre-signed delegations were the only new primitive on the Ethereum leg. The rest was blast radius: a smart wallet (Hot Wallet 34) that took orders from the same EOA lost 823M USDC to the same takeover.

## Summary

Preparation is visible on-chain. The initiator was funded by three 0.1 ETH Tornado Cash withdrawals from 07:39 UTC on 2026-10-28, rehearsed 7702 delegate-and-sweep on its own test wallets between 13:51 and 16:47, and deployed the final sweep contract at 15:59. On 2026-10-29 the drain ran from 20:04 (XRP) to 20:36 UTC (Avalanche), with further Ethereum sweeps at 21:44 (after another Binance wallet topped Binance 14 up with 200M USDT) and 22:39. Tether froze the receiver at 21:01 and Binance 14 itself at 22:06. On 2026-10-30 Binance published preliminary findings (DevOps laptop → service container → unauthorized withdrawals), froze ~\$3B with issuers and chain partners, and suspended deposits and withdrawals pending "a security revamp of the withdrawal service and its related addresses". A full post-mortem is promised.

## Timeline (UTC)

Read it as three stages. **Get in**: a laptop, then the withdrawal service. **Prepare**: funding and a rehearsal. **Take**: the service signs what the attacker asks for, on every chain at once. Times are from Ondology Labs' on-chain reconstruction unless marked.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-28 (undisclosed) | A DevOps engineer's laptop is compromised. From it the attacker reaches a **service container that submits withdrawals**. How the laptop was compromised is not published. Binance says the attack was a "more complex attack process" than one engineer's permissions and blames no individual (Teng). Binance (08:47 UTC 10-30): "subsequent investigation has uncovered additional points of breach". | **T15.003** entry |
| 10-28 07:39 → 10-29 08:23 | Three 0.1 ETH Tornado Cash withdrawals (10-28 07:39 and 08:53, 10-29 08:23; traced by OAK) fund the initiator [`0x7c8601d4645b93cea45f71e118a729332e6b5ca0`](https://etherscan.io/address/0x7c8601d4645b93cea45f71e118a729332e6b5ca0). | **T7.001** (funding) |
| 10-28 13:51–16:47 | Rehearsal: the initiator uses EIP-7702 to delegate its *own* test wallets to a sweep contract and drains small USDT/USDC balances. | T13.004 (rehearsal) |
| 10-28 15:59 | Final sweep contract [`0x63e842b054bd624a465454d533c33f573e9c6fae`](https://etherscan.io/address/0x63e842b054bd624a465454d533c33f573e9c6fae) deployed. Only the initiator can call it. | — |
| 10-29 20:04:52 | Binance's own clock: "At around 2026-10-29 20:05 (UTC), our hot wallets were compromised" ([`binanceupdate2_2026`]). Drain starts on **XRP**. **Solana, Optimism, Bitcoin, Tron** follow before 20:22, all as ordinary signed transfers that look like Binance withdrawals (CertiK). Bitcoin: 18,270 BTC in 11 transactions (CoinDesk). | **T15.003** (the service signs) |
| 20:20:59 | [`0xad99264d5532ae0dd04b2004eebda05f25657e70dacb764f7ac8d4ccd051298b`](https://etherscan.io/tx/0xad99264d5532ae0dd04b2004eebda05f25657e70dacb764f7ac8d4ccd051298b): one transaction carries **50 EIP-7702 authorizations signed by Binance 14's key**, one for each of 50 consecutive nonces. One matches, and the Binance 14 EOA now runs the attacker's sweep code. | **T13.004** |
| 20:24:23 | Sweep [`0x53bd38b816c23e74134786c29a8c18d792777998a3b9326047b583100e88e2f3`](https://etherscan.io/tx/0x53bd38b816c23e74134786c29a8c18d792777998a3b9326047b583100e88e2f3): **167,464 ETH + 63 tokens** leave Binance 14 for the receiver [`0x5227f603c1ee34ce3c06efe6477003bdfccb2f8c`](https://etherscan.io/address/0x5227f603c1ee34ce3c06efe6477003bdfccb2f8c). Binance 16 sends nine ordinary transfers 24 s later. | T13.004 / T15.003 |
| 20:30–20:36 | **Arbitrum** and **Avalanche** hot wallets drained. | T15.003 |
| 20:41:23 and 20:59:47 | Through Binance 14 the attacker orders smart wallet **Hot Wallet 34** to pay out 780M + 43M **USDC** (first payout [`0xdc102dd89dded5a83f1008906883ffb7c81ff3b7d7965d8c7277d170b5e17481`](https://etherscan.io/tx/0xdc102dd89dded5a83f1008906883ffb7c81ff3b7d7965d8c7277d170b5e17481)). | T13.004 (blast radius) |
| 21:01:35 / 21:04:59 | **Tether** freezes the receiver; **Circle** freezes the 823M USDC. Tether and Circle together freeze \$2.01B within the hour. | response |
| 21:11–22:15 | First public reports. Blockaid flags the outflows at 21:11 and names `0x5227…` as the collection address "same across the affected chains" ([`blockaidfirst2026`]). Binance acknowledges "a potential security issue" at 21:29 and pauses withdrawals at 22:15. | response |
| 21:44:11 | Another Binance wallet tops Binance 14 up with 200M USDT, and the attacker sweeps it too, still delegated ([`0x55ba4dabc41b468e580751373ad31acdee6f5ba398682df2c93e5a8340870556`](https://etherscan.io/tx/0x55ba4dabc41b468e580751373ad31acdee6f5ba398682df2c93e5a8340870556)). | T13.004 |
| 22:01–22:26 | **Ripple** freezes 40.5M RLUSD (22:01); **World Liberty Financial** freezes 27.8M USD1 (22:10) and the USD1 left in the hot wallet (22:26) (TRM). | response |
| 22:06:23 | Tether freezes Binance 14 itself. A fourth sweep follows at 22:39 (128.5 ETH). | response |
| 10-30 00:08–00:18 | **Arbitrum Security Council** freezes ~\$30.5M (TRM: 8,426 ETH and 74.6M ARB) held at the attacker's Arbitrum address [`0x3e2bf1ac6bf0934bbba6456c341c2ecbced632d5`](https://arbiscan.io/address/0x3e2bf1ac6bf0934bbba6456c341c2ecbced632d5); freeze transaction [`0xb69c81774f507d46ce776aeaed8b4d31df96dd66ce6fd05073481011835355d6`](https://arbiscan.io/tx/0xb69c81774f507d46ce776aeaed8b4d31df96dd66ce6fd05073481011835355d6) (ZachXBT). | response |
| 10-30 00:10:35 | Binance 14 signs a 7702 **revocation** and is back under Binance control, **3 h 50 m** after the takeover. | response |
| 10-30 00:13 | Binance suspends all deposits and withdrawals and "works with law enforcement". | response |
| 10-30 02:25 | Binance publishes its preliminary findings: laptop → service container, no private key leaked, ~\$6.3B, deposits and withdrawals suspended. | — |
| 10-30 ~04:06 | Binance and Bitget proceeds are commingled at [`0x15104a9ce0f08a8f0075a0869ae80e795fe0feb7`](https://etherscan.io/address/0x15104a9ce0f08a8f0075a0869ae80e795fe0feb7) after arriving via **THORChain** (ZachXBT, 04:51). | T7.003 / T8.001 |
| 10-30 before 04:17 | **Tron → EVM bridge-out** (MistTrack): [`TG5iBMQPrDzJJAUM8GMVBf1hRaJ1wvzsGi`](https://tronscan.org/#/address/TG5iBMQPrDzJJAUM8GMVBf1hRaJ1wvzsGi) → [`TRBdWqHnDVSZCVGfgHdKFLQPirQcA2PRki`](https://tronscan.org/#/address/TRBdWqHnDVSZCVGfgHdKFLQPirQcA2PRki) → [`TUoVsNvkSbCQFty1tLViCgvMjNRGGEK6eM`](https://tronscan.org/#/address/TUoVsNvkSbCQFty1tLViCgvMjNRGGEK6eM) → [`TMfBqjTDEAd2HpeeSNtaAGzWixpQCAyQxY`](https://tronscan.org/#/address/TMfBqjTDEAd2HpeeSNtaAGzWixpQCAyQxY) → Bitget Wallet Swap Bridge → `0xcd684d22e8c3600e6ee93b5a57923c3b517f3396` (EVM; chain not stated). The same destination was used before by the Phemex hacker. | T7.003 / T8.001 |
| 10-30 04:17 | Yi He (Binance): deposits work normally, and the team is "working on enhancements to the withdrawal service and related address controls". Withdrawals are expected to resume "in the next 48 hours". | response |
| 10-30, during the day | Small test transfers (0.2–0.5 ETH) from attacker wallets through MetaMask's bridge router, LI.FI and a swap aggregator (Ondology). No large bridge-out yet. | — |
| 10-30 10:15–10:20 | **Tron split** (traced by OAK). Collector [`TSpe5HC3PRD2svJcr1YoGszhHk2mtkyZ8A`](https://tronscan.org/#/address/TSpe5HC3PRD2svJcr1YoGszhHk2mtkyZ8A), which took 638.2M TRX from hop wallet [`TPBkSjkCMn2ckrMuAP8n2J1jdjbw76bKN4`](https://tronscan.org/#/address/TPBkSjkCMn2ckrMuAP8n2J1jdjbw76bKN4) on 10-29, splits it into five fresh wallets: four of 120M and one of 158.2M TRX. | — |
| 10-30 ~10:54 | Reuters (relayed): the FBI and US Secret Service are working with Binance on the investigation. | response |
| 10-30 11:38–12:29 | **Avalanche → Ethereum** (Elliptic): stolen AVAX sold for USDC, bridged with Circle **CCTP**, and swapped for 7,242.8 ETH. | T7.003 |
| 10-30 ~13:25 | About \$3.32M of altcoins sent by mistake to the NEWT token contract `0xd0ec028a3d21533fdd200838f39c85b03679285d` and lost (Lookonchain; not traced by OAK). | — |
| 10-30 17:00 | OAK check: the two main ETH holdings (197,460 and 17,260 ETH) have still never sent a transaction. | — |
| 10-30 19:58 | Binance Recovery Update #2: more than \$6.34B set aside, \$5B of it in the exact stolen tokens (~80% covered); ~\$3B frozen; deposits say operational (the 00:13 post had suspended them); phased withdrawal restart targeted in ~34 h; further technical findings promised "within about 48 hours"; a post-mortem to follow ([`binanceupdate2_2026`]). | response |
| 10-30 onward | Unfreezable assets are held or spread: BTC in 19 wallets, ~500K ETH in seven. Funds meet [Bitget](2026-09-bitget-wallet-backend-spoofed-transfer-data-hot-warm-drain.md) proceeds at one address, which is part of the DPRK attribution by TRM and Chainalysis. | T8.001 (cluster reuse) |
| 10-31 01:01–07:58 | Three of the five Tron wallets forward 120M TRX each into [`TRBdWqHnDVSZCVGfgHdKFLQPirQcA2PRki`](https://tronscan.org/#/address/TRBdWqHnDVSZCVGfgHdKFLQPirQcA2PRki), which had already received one 120M lot at 10-30 10:20 (traced by OAK). | — |
| 10-31 04:39–05:16 | **ETH-side sell-off, new round** (traced by OAK). The receiver funds fresh wallets with 0.05 ETH of gas plus one token each. [`0x73ee90554fd0954490b072ca11e6422642ab4593`](https://etherscan.io/address/0x73ee90554fd0954490b072ca11e6422642ab4593) gets 53.3M ZAMA and sells it through the Uniswap router for about 1,104 ETH; [`0xa3e1a5b5ec04907932101962a2fbec614b1cbb04`](https://etherscan.io/address/0xa3e1a5b5ec04907932101962a2fbec614b1cbb04) gets 1.69B SOPH and sells it for about 932 ETH. Both keep the ETH. | T7.007 |
| 10-31 05:55–09:14+ | **Tron peel** (traced by OAK). [`TRBdWqHnDVSZCVGfgHdKFLQPirQcA2PRki`](https://tronscan.org/#/address/TRBdWqHnDVSZCVGfgHdKFLQPirQcA2PRki) sends 124 lots of 0.1–2M TRX (61.2M TRX in the first 200 transfers OAK read) to about 30 intermediaries, which pass them on in further lots; still running at 09:37. | — |
| 10-31 06:20:20 | **First BTC exit** (traced by OAK). 10 BTC leaves the 18,304 BTC cluster from [`bc1qqjvps2qe8tva6zjev0un4qrwhv62pxghgnj9we`](https://mempool.space/address/bc1qqjvps2qe8tva6zjev0un4qrwhv62pxghgnj9we) to a new address, which has not moved it. | — |
| 10-31 14:30 | Binance update #3: 90% of stolen assets replenished; the outstanding 10% is less liquid tokens being bought on market and OTC; Proof of Reserves snapshot at 10-31 00:00 UTC, zero-knowledge proof by 11-03; withdrawals to reopen 11-01. | response |
| 10-31 15:24–15:33 | [`TSUUVjysXV8YqHytSNjfkNXnnB49QDvZpx`](https://tronscan.org/#/address/TSUUVjysXV8YqHytSNjfkNXnnB49QDvZpx), which took ~199M USDT from the Tron hop wallet on 10-29, is active again, swapping WTRX and USDT with dozens of counterparties in nine minutes (traced by OAK). | — |

### Key addresses

Ethereum, from Ondology Labs' write-up, where each one is linked to Etherscan.

- Binance 14, the EOA taken over via EIP-7702 — [`0x28c6c06298d514db089934071355e5743bf21d60`](https://etherscan.io/address/0x28c6c06298d514db089934071355e5743bf21d60)
- Hot Wallet 34, a smart wallet that obeys Binance 14 — [`0xee7ae85f2fe2239e27d9c1e23fffe168d63b4055`](https://etherscan.io/address/0xee7ae85f2fe2239e27d9c1e23fffe168d63b4055)
- Binance 16, which sent ordinary transfers — [`0xdfd5293d8e347dfe59e90efd55b2956a1343963d`](https://etherscan.io/address/0xdfd5293d8e347dfe59e90efd55b2956a1343963d)
- Sweep contract, unverified, callable only by the initiator — [`0x63e842b054bd624a465454d533c33f573e9c6fae`](https://etherscan.io/address/0x63e842b054bd624a465454d533c33f573e9c6fae)
- Receiver of the sweeps — [`0x5227f603c1ee34ce3c06efe6477003bdfccb2f8c`](https://etherscan.io/address/0x5227f603c1ee34ce3c06efe6477003bdfccb2f8c)
- Largest attacker ETH holding (197,460 ETH as of 2026-10-30 06:25 UTC) — [`0x8532fa14acaf483729c449b8458aeddb900543d4`](https://etherscan.io/address/0x8532fa14acaf483729c449b8458aeddb900543d4)
- Address that received both Binance and Bitget proceeds, per Elliptic citing ZachXBT (about \$39K of Binance funds; not yet traced by OAK) — [`0x15104a9ce0f08a8f0075a0869ae80e795fe0feb7`](https://etherscan.io/address/0x15104a9ce0f08a8f0075a0869ae80e795fe0feb7)
- Initiator, full address traced by OAK — [`0x7c8601d4645b93cea45f71e118a729332e6b5ca0`](https://etherscan.io/address/0x7c8601d4645b93cea45f71e118a729332e6b5ca0)
- Second Ethereum receiver (Bitquery) — [`0xa97bf7836f8a08f9ed91d41453d371493fae8d10`](https://etherscan.io/address/0xa97bf7836f8a08f9ed91d41453d371493fae8d10)
- Further destination wallet holding a large share, per Blockaid (shortened by Bitquery) — [`0x8d53903625b8e839b9df4bd28b0efb1cd6b8639a`](https://etherscan.io/address/0x8d53903625b8e839b9df4bd28b0efb1cd6b8639a)
- Binance hot wallets drained on Arbitrum (Blockaid) — [`0x1b5b4e441f5a22bfd91b7772c780463f66a74b35`](https://arbiscan.io/address/0x1b5b4e441f5a22bfd91b7772c780463f66a74b35), [`0xf92402bb795fd7cd08fb83839689db79099c8c9c`](https://arbiscan.io/address/0xf92402bb795fd7cd08fb83839689db79099c8c9c), [`0x3931dab967c3e2dbb492fe12460a66d0fe4cc857`](https://arbiscan.io/address/0x3931dab967c3e2dbb492fe12460a66d0fe4cc857)
- Binance hot wallets drained on Avalanche (Blockaid; 1.81M AVAX and 8.4M USDT) — [`0x9f8c163cba728e99993abe7495f06c0a3c8ac8b9`](https://snowtrace.io/address/0x9f8c163cba728e99993abe7495f06c0a3c8ac8b9), [`0x6d8be5cdf0d7dee1f04e25fd70b001ae3b907824`](https://snowtrace.io/address/0x6d8be5cdf0d7dee1f04e25fd70b001ae3b907824), [`0xaba2d404c5c41da5964453a368aff2604ae80a14`](https://snowtrace.io/address/0xaba2d404c5c41da5964453a368aff2604ae80a14), [`0x3bce63c6c9abf7a47f52c9a3a7950867700b0158`](https://snowtrace.io/address/0x3bce63c6c9abf7a47f52c9a3a7950867700b0158)
- Attacker address on Arbitrum, frozen by the Security Council (ZachXBT, Bitquery; Blockaid instead names `0x5227f603c1ee34ce3c06efe6477003bdfccb2f8c` as the collector on Arbitrum and Avalanche too) — [`0x3e2bf1ac6bf0934bbba6456c341c2ecbced632d5`](https://arbiscan.io/address/0x3e2bf1ac6bf0934bbba6456c341c2ecbced632d5)
- End of the Tron bridge route, used before by the Phemex hacker (MistTrack; EVM chain not stated, so not linked) — `0xcd684d22e8c3600e6ee93b5a57923c3b517f3396`
- NEWT token contract that received ~\$3.32M by mistake (Lookonchain) — `0xd0ec028a3d21533fdd200838f39c85b03679285d`
- The Avalanche receiver (`0x8035…c397`) and an RLUSD wallet (`0xe702…958d`) are published only in shortened form (full addresses not published).

Bitcoin (Bitquery; balances checked by OAK on mempool.space, 2026-10-31):

- Binance Bitcoin hot wallet — [`bc1qm34lsc65zpw79lxes69zkqmk6ee3ewf0j77s3h`](https://mempool.space/address/bc1qm34lsc65zpw79lxes69zkqmk6ee3ewf0j77s3h)
- First receiver of the 18,270 BTC, now empty — [`bc1q0mtc2f5agpkvlq6hhahmfr3hlr55kyfjhl2mnm`](https://mempool.space/address/bc1q0mtc2f5agpkvlq6hhahmfr3hlr55kyfjhl2mnm)
- The 19 lots, all unmoved (17 × 1,000 BTC, plus 832.5 and 437.7): [`bc1qxrxujwxfnvz040jw76d26zhjdg5jura7hs968s`](https://mempool.space/address/bc1qxrxujwxfnvz040jw76d26zhjdg5jura7hs968s), [`bc1qepc70u3u476vgvg3hfcwjgu4mecxe2uchs4lag`](https://mempool.space/address/bc1qepc70u3u476vgvg3hfcwjgu4mecxe2uchs4lag), [`bc1qdfhmlrdvg4tm87zjl0vyf0xflp5ql50q3g88gw`](https://mempool.space/address/bc1qdfhmlrdvg4tm87zjl0vyf0xflp5ql50q3g88gw), [`bc1qnq6jj9jmlf3945m3l8s0kxnqehrsga300k8t3s`](https://mempool.space/address/bc1qnq6jj9jmlf3945m3l8s0kxnqehrsga300k8t3s), [`bc1qz8hdwv8gmml0u96dsvnzsagz6krjyzxmgxupdp`](https://mempool.space/address/bc1qz8hdwv8gmml0u96dsvnzsagz6krjyzxmgxupdp), [`bc1q42flhayrzy3zh8lkyevw8qcjduurt9a35wlsyx`](https://mempool.space/address/bc1q42flhayrzy3zh8lkyevw8qcjduurt9a35wlsyx), [`bc1q63qrfrpsg5hh0zzn3kp2xx9vljl7dq7tatsjxp`](https://mempool.space/address/bc1q63qrfrpsg5hh0zzn3kp2xx9vljl7dq7tatsjxp), [`bc1q0ts8gaf9ht0rr4u02hr56f8thndqsc4kmkmfv3`](https://mempool.space/address/bc1q0ts8gaf9ht0rr4u02hr56f8thndqsc4kmkmfv3), [`bc1q2wvz0kcsn4hqmajwtey30ud27fl25w8pveznn6`](https://mempool.space/address/bc1q2wvz0kcsn4hqmajwtey30ud27fl25w8pveznn6), [`bc1qalwnl7dtaa73fsq5tyn0ghfy3fgfpqkt69tca8`](https://mempool.space/address/bc1qalwnl7dtaa73fsq5tyn0ghfy3fgfpqkt69tca8), [`bc1qjwdw6vrzq4vf6hckutvx4ucj86awwv99mxnz7w`](https://mempool.space/address/bc1qjwdw6vrzq4vf6hckutvx4ucj86awwv99mxnz7w), [`bc1qs3aej5tmcdz0vctz8y9rjcxtxg8v5385577s56`](https://mempool.space/address/bc1qs3aej5tmcdz0vctz8y9rjcxtxg8v5385577s56), [`bc1qm2j6v3247khlwzxl7p9vqnfkghcllyhv9wjaat`](https://mempool.space/address/bc1qm2j6v3247khlwzxl7p9vqnfkghcllyhv9wjaat), [`bc1qs6xnmhar38z44g2za93pv8ygdcwurrh8l87w3v`](https://mempool.space/address/bc1qs6xnmhar38z44g2za93pv8ygdcwurrh8l87w3v), [`bc1qf5cyvv9w50tx9xx9s3xwsne0z87wvjj9l8a35u`](https://mempool.space/address/bc1qf5cyvv9w50tx9xx9s3xwsne0z87wvjj9l8a35u), [`bc1qg3nrzpuvq2pxqx74tcrywr09dc208ze96n3t53`](https://mempool.space/address/bc1qg3nrzpuvq2pxqx74tcrywr09dc208ze96n3t53), [`bc1qm8v88m5fy6kuq9myva2eemwycxqd3e0zcrs2l8`](https://mempool.space/address/bc1qm8v88m5fy6kuq9myva2eemwycxqd3e0zcrs2l8), [`bc1qrg025e2pgx0rwya2kpgtj30972p64jt0hn6zyt`](https://mempool.space/address/bc1qrg025e2pgx0rwya2kpgtj30972p64jt0hn6zyt), [`bc1qxg0l4p6xc50zuv9cl5f0l0wmaxjpg8wcy7s9ra`](https://mempool.space/address/bc1qxg0l4p6xc50zuv9cl5f0l0wmaxjpg8wcy7s9ra)

Tron:

- Binance Tron hot wallet (Bitquery) — [`TDqSquXBgUCLYvYC4XZgrprLK589dkhSCf`](https://tronscan.org/#/address/TDqSquXBgUCLYvYC4XZgrprLK589dkhSCf)
- First Tron receiver, 312.7M USDT frozen — [`TG5iBMQPrDzJJAUM8GMVBf1hRaJ1wvzsGi`](https://tronscan.org/#/address/TG5iBMQPrDzJJAUM8GMVBf1hRaJ1wvzsGi)
- Hop wallet that sent USDT on and TRX to the collector — [`TPBkSjkCMn2ckrMuAP8n2J1jdjbw76bKN4`](https://tronscan.org/#/address/TPBkSjkCMn2ckrMuAP8n2J1jdjbw76bKN4)
- USDT/WTRX swap wallet, still active on 10-31 — [`TSUUVjysXV8YqHytSNjfkNXnnB49QDvZpx`](https://tronscan.org/#/address/TSUUVjysXV8YqHytSNjfkNXnnB49QDvZpx)
- TRX collector (638.2M TRX) — [`TSpe5HC3PRD2svJcr1YoGszhHk2mtkyZ8A`](https://tronscan.org/#/address/TSpe5HC3PRD2svJcr1YoGszhHk2mtkyZ8A)
- Peel source — [`TRBdWqHnDVSZCVGfgHdKFLQPirQcA2PRki`](https://tronscan.org/#/address/TRBdWqHnDVSZCVGfgHdKFLQPirQcA2PRki)
- Bridge route hops (MistTrack) — [`TUoVsNvkSbCQFty1tLViCgvMjNRGGEK6eM`](https://tronscan.org/#/address/TUoVsNvkSbCQFty1tLViCgvMjNRGGEK6eM), [`TMfBqjTDEAd2HpeeSNtaAGzWixpQCAyQxY`](https://tronscan.org/#/address/TMfBqjTDEAd2HpeeSNtaAGzWixpQCAyQxY)

Solana (Bitquery):

- Binance Solana hot wallet — [`5tzFkiKscXHK5ZXCGbXZxdw7gTjjD1mBwuoFbhUvuAi9`](https://solscan.io/account/5tzFkiKscXHK5ZXCGbXZxdw7gTjjD1mBwuoFbhUvuAi9)
- Solana receiver — [`AffzFDKZbyMiU11zmVBoAqD25ugpr7xoWWyRyGigBEaU`](https://solscan.io/account/AffzFDKZbyMiU11zmVBoAqD25ugpr7xoWWyRyGigBEaU)

### Where the funds are (as of 2026-10-30 17:00 UTC; Ethereum checked by OAK at block 26306931, the rest per sources)

| What | Status |
|---|---|
| \$2.01B USDT/USDC | Tether and Circle froze it within an hour. Binance puts the total frozen near \$3B with other issuers and Arbitrum; Elliptic verified \$2.84B. |
| ETH holding 1 [`0x8532fa14acaf483729c449b8458aeddb900543d4`](https://etherscan.io/address/0x8532fa14acaf483729c449b8458aeddb900543d4) | **197,460.01 ETH, unmoved.** Nonce 0, so it has never sent a transaction (traced by OAK). |
| ETH holding 2 [`0x03b0ee5d82990cff1bda48651ac3e436d1a020ea`](https://etherscan.io/address/0x03b0ee5d82990cff1bda48651ac3e436d1a020ea) | **17,260.10 ETH, unmoved.** Nonce 0 (traced by OAK). |
| Receiver [`0x5227f603c1ee34ce3c06efe6477003bdfccb2f8c`](https://etherscan.io/address/0x5227f603c1ee34ce3c06efe6477003bdfccb2f8c) | **4.50 ETH left after 703 outgoing transactions** (traced by OAK). The rest went to the holdings, hop wallets and DEX sales shown in Fund flow. |
| ~500,938 ETH (~\$1.12B) in total | Held across seven attacker wallets on Ethereum, not frozen (Ondology, 06:25 UTC). Elliptic counts 511,861 ETH. |
| 18,270 BTC | split into 19 wallets, unmoved on 2026-10-30 (CoinDesk) |
| USDT that escaped freezes | split into hop wallets, sold for ETH on UniswapX / Uniswap, and used as collateral to borrow ETH on Aave (Ondology) |

### Laundering status (as of 2026-10-31 09:40 UTC; traced by OAK)

OAK checked every address on Elliptic's published blocklist ([`ellipticblocklist2026`]): **2,598 addresses** (1,536 Tron, 1,009 EVM, 45 Bitcoin, plus XRP and others). That is thousands of wallets, not millions. Most hold dust and exist to split funds; the money still sits in a handful of them.

| Chain | Where it is | What is moving |
|---|---|---|
| **Ethereum** | **531,146 ETH** across the 1,009 EVM addresses. Eight wallets that have never sent a transaction (nonce 0) hold **~511,854 ETH**: [`0x8532fa14acaf483729c449b8458aeddb900543d4`](https://etherscan.io/address/0x8532fa14acaf483729c449b8458aeddb900543d4) 197,460.01; [`0xc887af690e0301cd4edbbce8f8d31b4ec65b286a`](https://etherscan.io/address/0xc887af690e0301cd4edbbce8f8d31b4ec65b286a) 137,602; [`0x897c80d1a9729e94460e2bd93178bd5215158df3`](https://etherscan.io/address/0x897c80d1a9729e94460e2bd93178bd5215158df3) 78,415.25; [`0x54401f80da97893a15d43566184635b6674bc942`](https://etherscan.io/address/0x54401f80da97893a15d43566184635b6674bc942) 40,600.67; [`0x79e70d139fc05aa75f75611fdf2680e9952b544a`](https://etherscan.io/address/0x79e70d139fc05aa75f75611fdf2680e9952b544a) 34,279.69; [`0x03b0ee5d82990cff1bda48651ac3e436d1a020ea`](https://etherscan.io/address/0x03b0ee5d82990cff1bda48651ac3e436d1a020ea) 17,260.1; [`0x8d4b8ee62124b7ee140a51ddd07390a56f1c9e19`](https://etherscan.io/address/0x8d4b8ee62124b7ee140a51ddd07390a56f1c9e19) 3,236.72; [`0xc2096a12ebe0944f4d39e59979f485afd92d850a`](https://etherscan.io/address/0xc2096a12ebe0944f4d39e59979f485afd92d850a) 3,000. | The receiver keeps turning leftover tokens into ETH through single-use wallets: [`0x73ee90554fd0954490b072ca11e6422642ab4593`](https://etherscan.io/address/0x73ee90554fd0954490b072ca11e6422642ab4593) (ZAMA → 1,100.45 ETH held) and [`0xa3e1a5b5ec04907932101962a2fbec614b1cbb04`](https://etherscan.io/address/0xa3e1a5b5ec04907932101962a2fbec614b1cbb04) (SOPH → 931.78 ETH held). No large ETH has reached a mixer or bridge yet. |
| **Tron, USDT** | **378.7M USDT** in two wallets, both blacklisted by Tether (`isBlackListed` = true on the USDT contract): [`TG5iBMQPrDzJJAUM8GMVBf1hRaJ1wvzsGi`](https://tronscan.org/#/address/TG5iBMQPrDzJJAUM8GMVBf1hRaJ1wvzsGi) 312,729,468 and [`TCzBTkqn66yApqbYoPezaEQosM5DAd7Y62`](https://tronscan.org/#/address/TCzBTkqn66yApqbYoPezaEQosM5DAd7Y62) 65,990,000. | Frozen. Before the freeze, `TG5iBMQPrDzJJAUM8GMVBf1hRaJ1wvzsGi` sent 300M USDT to hop wallet [`TPBkSjkCMn2ckrMuAP8n2J1jdjbw76bKN4`](https://tronscan.org/#/address/TPBkSjkCMn2ckrMuAP8n2J1jdjbw76bKN4), which passed it on in 2M–30M lots, mostly to [`TSUUVjysXV8YqHytSNjfkNXnnB49QDvZpx`](https://tronscan.org/#/address/TSUUVjysXV8YqHytSNjfkNXnnB49QDvZpx), and tested a 10,000 USDT JustLend deposit. |
| **Tron, TRX** | **~520M TRX** on listed addresses. Still held: [`TKkH2vH6kyi2QKcMbqym53WMuvdd1xvw6K`](https://tronscan.org/#/address/TKkH2vH6kyi2QKcMbqym53WMuvdd1xvw6K) 158.2M and [`TJajtPqDqUGh1Sr1j8ugHoSXBVpaFLLHKT`](https://tronscan.org/#/address/TJajtPqDqUGh1Sr1j8ugHoSXBVpaFLLHKT) 120M, both untouched since 10-30. | The other three 120M lots went to `TRBdWqHnDVSZCVGfgHdKFLQPirQcA2PRki`, which held 104.05M TRX at 09:37, so ~256M TRX has entered the peel network. The peel network is not yet traced to an exit by OAK. |
| **Bitcoin** | **18,304.23 BTC** on the 45 listed addresses. | One exit so far: 10 BTC in [`222e15e52f9f86a400ba16e5ffcebfd2ba5459926959045409a251044de4b057`](https://mempool.space/tx/222e15e52f9f86a400ba16e5ffcebfd2ba5459926959045409a251044de4b057) (block 973938) to [`bc1q5vwsdvjc6aue76x7u4hxpegzjt695hz02wryhr`](https://mempool.space/address/bc1q5vwsdvjc6aue76x7u4hxpegzjt695hz02wryhr), unmoved. |
| **XRP** | [`rK21t6nGLy4MNDqhvy3pGwcLFy25qgfzMx`](https://xrpscan.com/account/rK21t6nGLy4MNDqhvy3pGwcLFy25qgfzMx) holds **233,461,943.10 XRP**. | Untouched. |

**What other investigators report (relayed, not re-traced by OAK unless marked).**

- **Conversions before the freezes** (Elliptic, updated 10-31 05:00 UTC). About \$786M of stablecoins became ETH and TRX. 434M USDT went to 160,451 ETH via Uniswap, 1inch and market makers' RFQ, at 12–26% worse than market. 234M USDT went to 638M TRX on SunSwap; OAK traced the matching 638,190,941.68 TRX arriving at the Tron collector. About \$48M of RLUSD was sold, and about 150 other tokens were swapped to ETH. TRM counts 325M USDT → ~122,300 ETH via UniswapX, and Bitquery puts the cost of the rushed swaps at \$119M against market prices.
- **Aave.** A second wallet supplied 59.9M USDT and borrowed 19,762 ETH. Elliptic says the loan is still open and near liquidation.
- **Automation.** Chainalysis sees "exactly 1 TRX" seeding of new Tron addresses and thousands of transactions in short windows, with funds sometimes returning to earlier wallets. Elliptic sees randomised amounts, time-sliced selling (LINK in 89 pieces, PEPE in 94) and selling wallets funded with exactly 0.5 ETH; 546 TRX transfers from the main Tron wallet, median gap 96 seconds.
- **Still under attacker control** (Elliptic): about \$3.21B that no issuer can freeze, including 519,104 ETH, 18,270 BTC, 233M XRP and ~475M TRX.
- **Frozen**: Elliptic has verified \$2.85B (44%). Tether froze 11 attacker wallets on Ethereum and Tron, six of them already empty (Bitquery).

**What a defender watches now.** The eight nonce-0 ETH wallets and the two Tron TRX holdings: their first outgoing transaction is the start of the next phase. Deposits from any address that received TRX from `TRBdWqHnDVSZCVGfgHdKFLQPirQcA2PRki` or its intermediaries. A first-time deposit from a wallet funded with exactly 0.05 ETH by the receiver. The Bitcoin recipient `bc1q5vwsdvjc6aue76x7u4hxpegzjt695hz02wryhr`. Chainalysis describes "never-seen-before laundering patterns" ([`chainalysisbinance2026`]).

### What is not known yet

- How the laptop was compromised, what the service container could reach, and what the "additional points of breach" Binance reported on 10-30 were, and which further steps made up the "more complex attack process" Teng describes.
- How the container caused Binance's keys to sign. On-chain evidence shows what was signed, not how. Blockaid's CEO reads it as a compromised signing system rather than stolen keys (Cointelegraph); Binance promised further technical findings "within about 48 hours" of 10-30 19:58 UTC.
- Where the unfreezable ETH and BTC will move, and where the Tron peel network ends.
- Whether the DPRK attribution holds. TRM, Chainalysis and Elliptic all name TraderTraitor; Binance has not confirmed it, Ondology did not verify it, and no government has confirmed it.
- Where the THORChain hop and the Bitget Wallet bridge route lead on the EVM side.

**Why two techniques.** T15.003 explains *how the attacker got the power to sign*. T13.004 explains *what they made Binance 14 sign on Ethereum*: a delegation, rather than a plain transfer, so that one EOA could be emptied of everything in one call and could then command Hot Wallet 34. On the other chains no 7702 step was needed; the compromised service just sent transfers.

## Fund flow

Ethereum leg traced by OAK with `tools/explorer.py` (Blockscout, keyless) on 2026-10-30; the 10-31 hop wallets, the first Bitcoin exit and the Tron split chain (TronGrid) added on 2026-10-31. The Tron peel edge counts only the first 200 transfers OAK read. Edges marked *traced by OAK* were checked on-chain; dashed edges are relayed from the cited source. Counterfeit-token transfers were excluded: within hours, address-poisoning bots sent the attacker's wallets fake "ETH", "USDT" and "USDC" Transfer events from lookalike addresses (for example `0x8537cce92e58b935874ddf03826030d7440543d4` imitating the real holding wallet `0x8532fa14acaf483729c449b8458aeddb900543d4`). The two share their first four and last six characters, which is exactly why OAK never shortens an address.

```oak-flow
as_of: 2026-10-31T09:40Z
nodes:
  - {id: tc, chain: ethereum, address: 0x12d66f87a04a9e220743712ce6d9bb1b5616b8fc, role: mixer, label: "Tornado Cash 0.1 ETH pool"}
  - {id: fund, chain: ethereum, address: 0xe4f9070e1316de2988fc6f869fead8fb99cc74cd, role: unknown, label: "Unlabelled funder"}
  - {id: init, chain: ethereum, address: 0x7c8601d4645b93cea45f71e118a729332e6b5ca0, role: attacker-eoa, label: "Initiator"}
  - {id: sweep, chain: ethereum, address: 0x63e842b054bd624a465454d533c33f573e9c6fae, role: attack-contract, label: "Sweep contract (7702 delegate)"}
  - {id: b14, chain: ethereum, address: 0x28c6c06298d514db089934071355e5743bf21d60, role: victim-hot-wallet, label: "Binance 14"}
  - {id: hw34, chain: ethereum, address: 0xee7ae85f2fe2239e27d9c1e23fffe168d63b4055, role: victim-hot-wallet, label: "Hot Wallet 34"}
  - {id: rcv, chain: ethereum, address: 0x5227f603c1ee34ce3c06efe6477003bdfccb2f8c, role: attacker-receiver, label: "Receiver"}
  - {id: h1, chain: ethereum, address: 0x8532fa14acaf483729c449b8458aeddb900543d4, role: attacker-holding, label: "ETH holding 1"}
  - {id: h2, chain: ethereum, address: 0x03b0ee5d82990cff1bda48651ac3e436d1a020ea, role: attacker-holding, label: "ETH holding 2"}
  - {id: hopa, chain: ethereum, address: 0x9749292d74fd460982d0912ea9515ea24736c762, role: intermediary, label: "Hop wallet (USDT)"}
  - {id: hopb, chain: ethereum, address: 0x0ddf0480016e6bcb2c1f5d190d221fba1320697e, role: intermediary, label: "Hop wallet (USDT)"}
  - {id: hopc, chain: ethereum, address: 0x5c23023ca6633f91ded909b4a753a3ca00fea4fc, role: intermediary, label: "Hop wallet (RLUSD)"}
  - {id: hopd, chain: ethereum, address: 0x7f9dc988b46336ad536828fad50fa8fa1e5415e3, role: intermediary, label: "Hop wallet (WBETH, ENA)"}
  - {id: hope, chain: ethereum, address: 0xb3ddec0ccc5c3ba733fcdf5a15f98c95ec5a5fdb, role: intermediary, label: "Hop wallet (WBTC, USDe)"}
  - {id: hopf, chain: ethereum, address: 0x42cdf00c85005630cc8605731b9364f712077810, role: intermediary, label: "Hop wallet (UNI, ONDO)"}
  - {id: dex, chain: ethereum, role: dex, label: "64 Uniswap / SushiSwap pools"}
  - {id: tether, chain: ethereum, role: issuer-freeze, label: "Tether freeze"}
  - {id: circle, chain: ethereum, role: issuer-freeze, label: "Circle freeze"}
  - {id: bbtc, chain: bitcoin, role: victim-hot-wallet, label: "Binance BTC hot wallet"}
  - {id: abtc, chain: bitcoin, role: attacker-holding, label: "19 BTC wallets"}
  - {id: btc1, chain: bitcoin, address: bc1qqjvps2qe8tva6zjev0un4qrwhv62pxghgnj9we, role: attacker-holding, label: "BTC holding (first exit)"}
  - {id: btc2, chain: bitcoin, address: bc1q5vwsdvjc6aue76x7u4hxpegzjt695hz02wryhr, role: intermediary, label: "BTC exit recipient"}
  - {id: hopz, chain: ethereum, address: 0x73ee90554fd0954490b072ca11e6422642ab4593, role: intermediary, label: "Hop wallet (ZAMA)"}
  - {id: hops, chain: ethereum, address: 0xa3e1a5b5ec04907932101962a2fbec614b1cbb04, role: intermediary, label: "Hop wallet (SOPH)"}
  - {id: trcv, chain: tron, address: TPBkSjkCMn2ckrMuAP8n2J1jdjbw76bKN4, role: intermediary, label: "Tron hop wallet"}
  - {id: tusdt, chain: tron, address: TG5iBMQPrDzJJAUM8GMVBf1hRaJ1wvzsGi, role: attacker-receiver, label: "Tron USDT receiver (Tether-blacklisted)"}
  - {id: tspe, chain: tron, address: TSpe5HC3PRD2svJcr1YoGszhHk2mtkyZ8A, role: intermediary, label: "TRX collector"}
  - {id: tkkh, chain: tron, address: TKkH2vH6kyi2QKcMbqym53WMuvdd1xvw6K, role: attacker-holding, label: "TRX holding 158.2M"}
  - {id: tjaj, chain: tron, address: TJajtPqDqUGh1Sr1j8ugHoSXBVpaFLLHKT, role: attacker-holding, label: "TRX holding 120M"}
  - {id: tsplit, chain: tron, role: intermediary, label: "3 split wallets (120M TRX each)"}
  - {id: trbd, chain: tron, address: TRBdWqHnDVSZCVGfgHdKFLQPirQcA2PRki, role: intermediary, label: "TRX peel source"}
  - {id: tpeel, chain: tron, role: intermediary, label: "~30 peel intermediaries"}
  - {id: tsuu, chain: tron, address: TSUUVjysXV8YqHytSNjfkNXnnB49QDvZpx, role: intermediary, label: "USDT/WTRX swap wallet"}
  - {id: tuov, chain: tron, address: TUoVsNvkSbCQFty1tLViCgvMjNRGGEK6eM, role: intermediary, label: "Bridge route hop"}
  - {id: tmfb, chain: tron, address: TMfBqjTDEAd2HpeeSNtaAGzWixpQCAyQxY, role: intermediary, label: "Bridge route hop"}
  - {id: bgbridge, chain: tron, role: bridge, label: "Bitget Wallet Swap Bridge → address used by the Phemex hacker"}
edges:
  - {from: tc, to: init, asset: ETH, amount: 0.29, tx: 0xd9e59064d7681439e732a5eb0e2a167b9a23f161d3ce4c8ef111ca824fe59008, time: 2026-10-28T07:39:47Z, tx_count: 3, time_last: 2026-10-29T08:23:11Z, technique: T7.001, verified: oak}
  - {from: fund, to: init, asset: ETH, amount: 1.08221822, tx: 0x96cae1ec044b4b3e34c1f2113a7bcd1b0d3257370788f5d8a2b91e9c99c0ebe5, time: 2026-10-29T18:20:47Z, verified: oak}
  - {from: init, to: sweep, asset: "deploys sweep contract", time: 2026-10-28T15:59:00Z, verified: source, source: ondologybinance2026}
  - {from: init, to: b14, asset: "50 EIP-7702 authorizations → sweep contract", tx: 0xad99264d5532ae0dd04b2004eebda05f25657e70dacb764f7ac8d4ccd051298b, time: 2026-10-29T20:20:59Z, technique: T13.004, verified: oak}
  - {from: b14, to: rcv, asset: ETH, amount: 167464.24785656, tx: 0x53bd38b816c23e74134786c29a8c18d792777998a3b9326047b583100e88e2f3, time: 2026-10-29T20:24:23Z, technique: T13.004, verified: oak}
  - {from: b14, to: rcv, asset: USDT, amount: 1615409498.97324, tx: 0x53bd38b816c23e74134786c29a8c18d792777998a3b9326047b583100e88e2f3, time: 2026-10-29T20:24:23Z, technique: T13.004, verified: oak}
  - {from: hw34, to: rcv, asset: USDC, amount: 780000000, tx: 0xdc102dd89dded5a83f1008906883ffb7c81ff3b7d7965d8c7277d170b5e17481, time: 2026-10-29T20:41:23Z, technique: T13.004, verified: oak}
  - {from: hw34, to: rcv, asset: USDC, amount: 43000000, time: 2026-10-29T20:59:47Z, verified: source, source: ondologybinance2026}
  - {from: rcv, to: hopa, asset: USDT, amount: 500000000, tx: 0x68d7d69deaeb9750c38020b4f8d3728146ca8d2267eba1e38cf9b56722ad659a, time: 2026-10-29T20:30:11Z, verified: oak}
  - {from: rcv, to: hopb, asset: USDT, amount: 200000000, tx: 0x1fc0ef33a767132edad434834a5555b30fcb5a171206c03b86175ef6dafac81c, time: 2026-10-29T20:33:23Z, verified: oak}
  - {from: rcv, to: h1, asset: ETH, amount: 197460, tx: 0x551d7961652e6d9835b11988908adf86ebe480badb4ce2d7d52193b2b1b02c76, time: 2026-10-29T20:38:47Z, tx_count: 2, time_last: 2026-10-30T01:14:11Z, verified: oak}
  - {from: rcv, to: hopc, asset: RLUSD, amount: 88541065, tx: 0x1d3f0f9b56ef51d2ea54fc3e8db63d331c16befd292a743b71413caa70a600e4, time: 2026-10-29T21:22:59Z, verified: oak}
  - {from: rcv, to: hopf, asset: UNI, amount: 7018792.33215254, tx: 0x028bdd8b5f0bda6503a760b734090f1cdbc213e90b71394b8a089b3d66eada74, time: 2026-10-29T21:46:59Z, verified: oak}
  - {from: rcv, to: hopd, asset: WBETH, amount: 29934.01316315, tx: 0xc19a2dcc7508e45f2743558cebefa50140fe68d9450ab18d14fd34039eb4bce2, time: 2026-10-29T21:52:47Z, verified: oak}
  - {from: rcv, to: hopd, asset: ENA, amount: 217497348.01079366, tx: 0x8bcbacb34b4e49b3e86675b3bc2a988461ded1207cc7e3a23bfd2577deb35aee, time: 2026-10-29T22:02:11Z, verified: oak}
  - {from: rcv, to: hope, asset: WBTC, amount: 167.14, tx: 0x314928ff5fb72f708f77093c166dbb26a04709ac9c43ef19d2ed603d5543df66, time: 2026-10-29T22:41:35Z, verified: oak}
  - {from: rcv, to: hopf, asset: ONDO, amount: 21851870.65, tx: 0x6bf04dd89cd7fb70b2eb02762c8515f67dbdff0d9101507fa3cc01a7120ea023, time: 2026-10-29T22:53:47Z, verified: oak}
  - {from: rcv, to: hope, asset: USDE, amount: 9707546.77, tx: 0xfc5eefa601d35a9d004ed166c704ccfb65d92ebc45912ace23493ba8e4c4cc4f, time: 2026-10-29T22:56:47Z, verified: oak}
  - {from: rcv, to: dex, asset: "35 tokens (FET, PENDLE, CRV, SHIB, EIGEN, PLUME, COTI, IMX, OGN, …)", tx: 0x91f6eb26ea5500e202fe41362908ab21dc205d7ab317eee206804d92419b2fa9, time: 2026-10-30T01:17:35Z, tx_count: 529, time_last: 2026-10-30T11:08:35Z, verified: oak}
  - {from: rcv, to: h2, asset: ETH, amount: 17260.1, tx: 0x88e4bc31dc948ac5dedb3a9936d2e429494e0ae1ff3dfce70e673ac194b06b78, time: 2026-10-30T05:14:35Z, tx_count: 2, time_last: 2026-10-30T05:15:47Z, verified: oak}
  - {from: rcv, to: tether, asset: USDT, time: 2026-10-29T21:01:35Z, verified: source, source: ondologybinance2026}
  - {from: rcv, to: circle, asset: USDC, amount: 823000000, time: 2026-10-29T21:04:59Z, verified: source, source: ondologybinance2026}
  - {from: bbtc, to: abtc, asset: BTC, amount: 18270, time: 2026-10-29T20:20:00Z, verified: source, source: coindeskbinancebtc2026}
  - {from: btc1, to: btc2, asset: BTC, amount: 10, tx: 222e15e52f9f86a400ba16e5ffcebfd2ba5459926959045409a251044de4b057, time: 2026-10-31T06:20:20Z, verified: oak}
  - {from: rcv, to: hopz, asset: ZAMA, amount: 53329985, tx: 0x47ec3b081de772d5eaa6f2e29caa7c6c5b5a69d1508d89a2ecfb4c5ae24b2b96, time: 2026-10-31T04:39:11Z, verified: oak}
  - {from: hopz, to: dex, asset: ZAMA, amount: 53329985, time: 2026-10-31T04:44:35Z, technique: T7.007, verified: oak, tx: 0x5ba54d5cc420a65fb27a14085ab3fa59d7c89ca319f4c953cda57568a02ca42e}
  - {from: rcv, to: hops, asset: SOPH, amount: 1693247180, tx: 0x2d63f6f761ed12f95c7166574b00bac8ba8f049cc12e6c6666cca7a10df4f6f1, time: 2026-10-31T05:02:23Z, verified: oak}
  - {from: hops, to: dex, asset: SOPH, amount: 1693247180, time: 2026-10-31T05:04:23Z, technique: T7.007, verified: oak, tx: 0xb882fb062fcf3e012e1a85a5b97247277d672e7e26ffb7dbd5fac873ea46934f}
  - {from: tusdt, to: trcv, asset: USDT, amount: 300000000, tx: fd8061aaa787ce89d707184dbfdd436a578c7840d674505067725de727c06222, time: 2026-10-29T20:45:51Z, tx_count: 2, time_last: 2026-10-29T20:56:09Z, verified: oak}
  - {from: trcv, to: tspe, asset: TRX, amount: 638190941.684882, tx: 4b329d4495bcdd8df40117cd478f13c5027988147c7deb9add5e4aee3b8107c4, time: 2026-10-29T20:56:12Z, tx_count: 2, time_last: 2026-10-29T21:42:42Z, verified: oak}
  - {from: tspe, to: tsplit, asset: TRX, amount: 360000000, tx: 9d0904db84e640d37e9fee8badef0883043db77f5bf9c87ca76e220e0c35c487, time: 2026-10-30T10:15:21Z, tx_count: 3, time_last: 2026-10-30T10:18:42Z, verified: oak}
  - {from: tspe, to: tjaj, asset: TRX, amount: 120000000, tx: 3db47d891cc211c300f9ba1aec264bfca8f9e32fbe220c411f30789a31ac8370, time: 2026-10-30T10:19:24Z, verified: oak}
  - {from: tspe, to: tkkh, asset: TRX, amount: 158200900, tx: aff887c4be7cd52eb8905899fc9596eaaf9c49dea59129519ce25d7c69762334, time: 2026-10-30T10:20:18Z, verified: oak}
  - {from: tsplit, to: trbd, asset: TRX, amount: 360000000, tx: 0ae2b5a4e1c8849d09e16db5a4dd9d90f7224c3b996a80ccad113bd5b81acd39, time: 2026-10-30T10:20:48Z, tx_count: 3, time_last: 2026-10-31T07:58:48Z, verified: oak}
  - {from: trcv, to: tsuu, asset: USDT, amount: 199000000, tx: 60a924f797306df50e867c84173453587830aa533a82031019119840a44b0050, time: 2026-10-29T20:47:27Z, tx_count: 13, time_last: 2026-10-29T21:11:54Z, verified: oak}
  - {from: trbd, to: tuov, asset: TRX, amount: 517135.694139, tx: afb850be0622c013ac5e3d77533afc7b7ace1e1bebad701b5749b04447639a53, time: 2026-10-31T08:40:57Z, verified: oak}
  - {from: tuov, to: tmfb, asset: TRX, amount: 317400, tx: af2e91294e3a1fba0082733d7020582c3aa7dbbdfbae85a767ffcb97f629150c, time: 2026-10-30T03:06:48Z, tx_count: 3, time_last: 2026-10-30T04:04:00Z, verified: oak}
  - {from: tmfb, to: bgbridge, asset: USDT, verified: source, source: misttrackbinancetron2026}
  - {from: trbd, to: tpeel, asset: TRX, amount: 61181818.85, tx: 028eee8c8f722fc6ccf2c6e3feea4089cfa038c3d5eb713d92d2aa329c3db931, time: 2026-10-31T05:55:51Z, tx_count: 124, time_last: 2026-10-31T09:14:33Z, verified: oak}
```

What the trace adds beyond the sources:

- **The initiator** is `0x7c8601d4645b93cea45f71e118a729332e6b5ca0` (published only shortened). It was funded by **three** 0.1 ETH Tornado Cash withdrawals: on 2026-10-28 at 07:39 and 08:53, and on 2026-10-29 at 08:23. It also received 1.08 ETH from an unlabelled address on 2026-10-29 at 18:20.
- **The ETH holding wallet `0x8532…`** received 195,460 ETH at 20:38:47 and 2,000 ETH at 01:14:11 on 2026-10-30, a total of **197,460 ETH**. This resolves the 195,460 vs 197,460 discrepancy that Ondology flagged.
- **Hop wallets.** The receiver gave at least 14 fresh wallets about 0.5 ETH of gas each, then one large asset each: 500M and 200M USDT, 88.5M RLUSD, 29,934 WBETH, 217M ENA, 167 WBTC, 9.7M USDe, 7.0M UNI, 21.9M ONDO.
- **DEX dumping.** From 2026-10-30 01:17 UTC the receiver sold 35 long-tail tokens directly into 64 Uniswap and SushiSwap pools in 529 swaps.

## Root-cause evidence

- **Technique:** OAK-T15.003
- **Source:** <https://x.com/binance/status/2115993361517891592>; <https://www.binance.com/en/support/announcement/detail/c5a8729a97ac486d963784d96c5642d7>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** Binance states the laptop → service container → unauthorized withdrawal path as its preliminary finding. Teng adds that it was a more complex, multi-step process, not one engineer's permissions, and that no individual is held responsible. The T13.004 Ethereum leg is independently corroborated: Ondology Labs recovered the signer of all 50 authorizations as Binance 14 (delegation and sweep transactions linked in the timeline), and TRM Labs (via The Hacker News) reports the same pattern. Neither source is a Binance statement.

## Public references

- `[binanceincident2026]` — Binance on X, initial investigation (2026-10-30): <https://x.com/binance/status/2115993361517891592>
- `[binanceannouncement2026]` — Binance, security incident update: <https://www.binance.com/en/support/announcement/detail/c5a8729a97ac486d963784d96c5642d7>
- `[thnbinance2026]` — The Hacker News, "Binance Suffers Security Breach Affecting \$6.3 Billion in Assets, Nearly \$3 Billion Frozen": <https://thehackernews.com/2026/10/binance-suffers-security-breach.html>
- `[ellipticbinance2026]` — Elliptic (T. Robinson), Binance: the largest hack in history (2026-10-30): <https://www.elliptic.co/insights/binance-largest-hack-in-history/>
- `[binancebreachpoints2026]` — Binance on X, investigation update: additional points of breach (2026-10-30 08:47 UTC): <https://x.com/binance/status/2116089661408108712>
- `[tengbinance2026]` — Richard Teng on X (2026-10-30 07:37 UTC): <https://x.com/_RichardTeng/status/2116072080525656150>
- `[binancereserve2026]` — Binance on X, \$6.34B reserved; recovery begun (2026-10-30 10:55 UTC): <https://x.com/binance/status/2116121748555153621>
- `[yihebinance2026]` — Yi He on X, service update (2026-10-30 04:17 UTC): <https://x.com/heyibinance/status/2116021551262740985>
- `[trmbinance2026]` — TRM Labs, "North Korea steals USD 6.36 billion from Binance in the largest hack in history" (2026-10-29): <https://www.trmlabs.com/resources/blog/north-korea-steals-usd-6-36-billion-from-binance-in-the-largest-hack-in-history>
- `[ondologybinance2026]` — Ondology Labs (P. Kattides), on-chain forensics of the Binance hot-wallet drain and the EIP-7702 takeover (2026-10-29, updated 2026-10-30): <https://ondologylabs.com/blog/binance-hot-wallet-hack-eip-7702>
- `[etherscanbinancedelegation2026]` — 50-authorization delegation transaction: <https://etherscan.io/tx/0xad99264d5532ae0dd04b2004eebda05f25657e70dacb764f7ac8d4ccd051298b>
- `[etherscanbinancesweep2026]` — sweep transaction: <https://etherscan.io/tx/0x53bd38b816c23e74134786c29a8c18d792777998a3b9326047b583100e88e2f3>
- `[ellipticblocklist2026]` — Elliptic, Binance hack 2026: published blocklist of attacker addresses (downloaded 2026-10-31): <https://www.elliptic.co/binance-hack-2026-blocklist/>
- `[chainalysisbinance2026]` — Chainalysis, Binance exploit: latest findings and response: <https://www.chainalysis.com/blog/binance-exploit-latest-findings-and-response/>
- `[zachxbtbinancebitget2026]` — ZachXBT on X, Binance and Bitget proceeds commingled after THORChain (2026-10-30 04:51 UTC): <https://x.com/zachxbt/status/2116030284261179538>
- `[zachxbtarbitrum2026]` — ZachXBT on X, Arbitrum Security Council freeze, exploiter address and tx (2026-10-30 00:14 UTC): <https://x.com/zachxbt/status/2115960582230913357>
- `[misttrackbinancetron2026]` — MistTrack on X, Tron → Bitget Wallet Swap Bridge route ending at an address used by the Phemex hacker (2026-10-30 04:17 UTC): <https://x.com/MistTrack_io/status/2116021647279005841>
- `[lookonchainnewt2026]` — Lookonchain on X, ~\$3.32M sent to the NEWT token contract by mistake (2026-10-30 13:24 UTC): <https://x.com/lookonchain/status/2116159431679570229>
- `[binanceupdate3_2026]` — Binance on X, Security Incident Update #3: 90% of stolen assets replenished (2026-10-31 14:30 UTC): <https://x.com/binance/status/2116538196259684457>
- `[arkhambinance2026]` — Arkham on X, \$6.01B taken on nine chains, \$2.80B frozen (2026-10-30 04:20 UTC): <https://x.com/arkham/status/2116022327674810570>
- `[hypernativebinance2026]` — Hypernative, inside the \$6.3B Binance hot-wallet drain: <https://www.hypernative.io/insights/blog/inside-the-largest-crypto-theft-of-all-time-the-6-3b-binance-hot-wallet-drain>
- `[bitquerybinance2026]` — Bitquery, Binance hack investigation (full Bitcoin, Tron and Solana addresses): <https://www.bitquery.io/investigations/binance-hack>
- `[fireblocksbinance2026]` — Fireblocks, deconstructing the Binance exploit: <https://www.fireblocks.com/blog/binance-hack-eip-7702>
- `[decryptbinance2026]` — Decrypt, Binance sets aside \$6.34B; Teng on the delegation and self-destructing tooling (2026-10-30): <https://decrypt.co/382237/binance-sets-aside-6-34b-to-cover-hack-losses-ceo-says-your-assets-are-safe>
- `[cryptoslatebinance2026]` — CryptoSlate, Binance hackers deploy never-seen-before laundering tactics (2026-10-30): <https://cryptoslate.com/binance-hackers-deploy-never-seen-before-laundering-tactics-to-conceal-6-3-billion-theft/>
- `[binanceupdate2_2026]` — Binance on X, Security Incident Recovery Update #2 (2026-10-30 19:58 UTC): <https://x.com/binance/status/2116258356109496479>
- `[blockaidfirst2026]` — Blockaid on X, first report of the outflows with affected wallets on Ethereum, Arbitrum and Avalanche (2026-10-29 21:11 UTC): <https://x.com/blockaid_/status/2115914335512150480>
- `[blockaidsweeper2026]` — Blockaid on X, the sweeper contract and its operator (2026-10-29 21:25 UTC): <https://x.com/blockaid_/status/2115917919603306651>
- `[blockaidnonces2026]` — Blockaid on X, 50 authorizations for nonces 18914775–18914824, one hit (2026-10-29 21:50 UTC): <https://x.com/blockaid_/status/2115924317888495661>
- `[cointelegraphblockaid2026]` — Cointelegraph on X, Blockaid CEO: compromised signature system, not stolen keys (2026-10-30 00:28 UTC): <https://x.com/Cointelegraph/status/2115963948495519745>
- `[chainalysisdprk2026]` — Chainalysis on X, high confidence DPRK via Bitget commingling (2026-10-30 04:31 UTC): <https://x.com/chainalysis/status/2116025255965999217>
- `[chainalysisestimate2026]` — Chainalysis on X, ~\$5.912B at time of theft (2026-10-30 00:26 UTC): <https://x.com/chainalysis/status/2115963516884808078>
- `[coinbureautrump2026]` — Coin Bureau on X, Trump "we don't know"; FBI and Secret Service per Reuters (2026-10-30 20:19 UTC): <https://x.com/coinbureau/status/2116263696242819352>
- `[coindeskbinancebtc2026]` — CoinDesk, Binance hacker splits \$1.4B of bitcoin into 19 wallets (2026-10-30): <https://www.coindesk.com/markets/2026/10/30/binance-hacker-splits-usd1-4-billion-of-bitcoin-into-19-wallets-that-no-one-can-freeze>
