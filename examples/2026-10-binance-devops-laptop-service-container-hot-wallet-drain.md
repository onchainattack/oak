# Binance — a DevOps engineer's laptop led to a service container that could submit withdrawals, and the hot wallets were emptied — Binance / Ethereum, Bitcoin, Tron, XRP Ledger and others — 2026-10-29

**Loss:** **~\$6.3B** per Binance (Chainalysis ~\$5.91B, Elliptic ~\$6.43B at theft-time prices). About **\$3B frozen on-chain** by 2026-10-30, mostly stablecoins (Tether >1.567B USDT, Circle 800M USDC; Ripple and World Liberty Financial also froze, Arbitrum's Security Council froze ~\$30M). Elliptic counts ~\$3.33B the attacker still controls in assets no issuer can freeze, including ~511,861 ETH and 18,270 BTC. Binance says it will cover all losses from SAFU and company funds; deposits and withdrawals were suspended. The largest crypto theft on record, about four times Bybit. Per-chain at 20:24 UTC prices (Ondology Labs; Ethereum, Arbitrum and Avalanche verified by Ondology, the rest from CertiK): Ethereum \$3.74B, Bitcoin \$1.47B, Tron \$627.5M, XRP \$296.5M, Solana \$96.1M, Arbitrum \$31.8M, Avalanche \$24.3M, Optimism \$4.8M, about \$6.28B in total. Tether and Circle froze \$2.01B within an hour of the sweep.

**OAK Techniques observed:** **OAK-T15.003** (Operator-Endpoint Compromise — *primary, operator-stated preliminary finding*. Binance: a **compromised DevOps engineer's laptop** "allowed an attacker to gain access to a service container and submit unauthorized withdrawal transactions"; it found "no evidence of any wallet private key leak". Co-CEO Richard Teng later said it was not one engineer's permissions or a one-click action, and Binance said it had "uncovered additional points of breach". See [`techniques/T15.003-operator-endpoint-compromise.md`](../techniques/T15.003-operator-endpoint-compromise.md)). **OAK-T13.004** (EIP-7702 Delegation Abuse — *Ethereum leg, verified on-chain by Ondology Labs; TRM Labs reports the same*. **Binance 14** (`0x28C6…1d60`) is a plain EOA. At 20:20:59 UTC the attacker's initiator submitted one transaction carrying **50 EIP-7702 authorizations, each recovered to the Binance 14 key**, for nonces 18,914,775–18,914,824, all delegating to an unverified sweep contract (`0x63e8…6fae`) that only the initiator can call; nonce 18,914,809 matched. The lowest nonce equalled Binance 14's live nonce about three minutes earlier, which Ondology reads as signing in real time. At 20:24:23 the sweep moved **167,464 ETH and 63 tokens**. Binance 14 also controls the smart wallet **Hot Wallet 34**, which the attacker then directed to pay out **823M USDC**. Binance 16 sent nine ordinary signed transfers 24 seconds after the sweep, with no delegation needed. Binance 14 signed a 7702 revocation at 00:10:35 on 2026-10-30, 3 h 50 m after the takeover. See [`techniques/T13.004-eip7702-delegation-abuse.md`](../techniques/T13.004-eip7702-delegation-abuse.md)). Preparation and aftermath: **OAK-T7.001** (Tornado Cash funding of the initiator) and **OAK-T8.001** (proceeds share an address with the Bitget exploit). The other chains (XRP from 20:04:52 UTC, then Solana, Optimism, Bitcoin, Tron, Arbitrum and Avalanche) were drained by ordinary signed transfers. On Bitcoin, 18,270 BTC left in 11 transactions shaped like ordinary withdrawals and were split into 19 wallets (CoinDesk). The chain shows *what* Binance's keys signed, not *how* the attacker made them sign it. That gap is the service-container step.

**Attribution:** **inferred-strong** — by blockchain-analytics firms, not by Binance. TRM Labs ("high confidence") and Chainalysis tie it to DPRK / TraderTraitor ([OAK-G01](../actors/OAK-G01-lazarus.md)); stolen funds met [Bitget](2026-09-bitget-wallet-backend-spoofed-transfer-data-hot-warm-drain.md) exploit funds at the same address (0x15104a9c…feb7). Elliptic agrees on DPRK but flags laundering that differs from the Bybit pattern. Binance says it is working with law enforcement to identify the attackers.

**Key teaching point:** **If a container can submit withdrawals, the key is wherever that container is.** No key leaked, and it did not need to: the signing service did what it was asked. Withdrawal paths need limits and approvals that the submitting service cannot satisfy by itself, An exchange hot wallet that is an EOA on a 7702 chain needs a signer that refuses `0x05` authorization payloads outright. Fifty pre-signed delegations were the only new primitive on the Ethereum leg. The rest was blast radius: a smart wallet (Hot Wallet 34) that took orders from the same EOA lost 823M USDC to the same takeover.

## Summary

Preparation is visible on-chain. The initiator was funded by three 0.1 ETH Tornado Cash withdrawals from 07:39 UTC on 2026-10-28, rehearsed 7702 delegate-and-sweep on its own test wallets between 13:51 and 16:47, and deployed the final sweep contract at 15:59. On 2026-10-29 the drain ran from 20:04 (XRP) to 20:36 UTC (Avalanche), with further Ethereum sweeps at 21:44 (after another Binance wallet topped Binance 14 up with 200M USDT) and 22:39. Tether froze the receiver at 21:01 and Binance 14 itself at 22:06. On 2026-10-30 Binance published preliminary findings (DevOps laptop → service container → unauthorized withdrawals), froze ~\$3B with issuers and chain partners, and suspended deposits and withdrawals pending "a security revamp of the withdrawal service and its related addresses". A full post-mortem is promised.

## Timeline (UTC)

Read it as three stages. **Get in**: a laptop, then the withdrawal service. **Prepare**: funding and a rehearsal. **Take**: the service signs what the attacker asks for, on every chain at once. Times are from Ondology Labs' on-chain reconstruction unless marked.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-28 (undisclosed) | A DevOps engineer's laptop is compromised. From it the attacker reaches a **service container that submits withdrawals**. How the laptop was compromised is not published. Binance says there were "additional points of breach". | **T15.003** entry |
| 10-28 07:39 → | Three 0.1 ETH Tornado Cash withdrawals fund the attacker's initiator wallet. | T7.001 (funding) |
| 10-28 13:51–16:47 | Rehearsal: the initiator uses EIP-7702 to delegate its *own* test wallets to a sweep contract and drains small USDT/USDC balances. | T13.004 (rehearsal) |
| 10-28 15:59 | Final sweep contract (`0x63e8…6fae`) deployed. Only the initiator can call it. | — |
| 10-29 20:04:52 | Drain starts on **XRP**. **Solana, Optimism, Bitcoin, Tron** follow before 20:22, all as ordinary signed transfers that look like Binance withdrawals (CertiK). Bitcoin: 18,270 BTC in 11 transactions (CoinDesk). | **T15.003** (the service signs) |
| 20:20:59 | One transaction carries **50 EIP-7702 authorizations signed by Binance 14's key**, one for each of 50 consecutive nonces. One matches, and the Binance 14 EOA now runs the attacker's sweep code. | **T13.004** |
| 20:24:23 | Sweep: **167,464 ETH + 63 tokens** leave Binance 14. Binance 16 sends nine ordinary transfers 24 s later. | T13.004 / T15.003 |
| 20:30–20:36 | **Arbitrum** and **Avalanche** hot wallets drained. | T15.003 |
| 20:41:23 and 20:59:47 | Through Binance 14 the attacker orders smart wallet **Hot Wallet 34** to pay out 780M + 43M **USDC**. | T13.004 (blast radius) |
| 21:01:35 / 21:04:59 | **Tether** freezes the receiver; **Circle** freezes the 823M USDC. Tether and Circle together freeze \$2.01B within the hour. | response |
| 21:44:11 | Another Binance wallet tops Binance 14 up with 200M USDT, and the attacker sweeps it too (still delegated). | T13.004 |
| 22:06:23 | Tether freezes Binance 14 itself. A fourth sweep follows at 22:39 (128.5 ETH). | response |
| 10-30 00:10:35 | Binance 14 signs a 7702 **revocation** and is back under Binance control, **3 h 50 m** after the takeover. | response |
| 10-30 00:18 | Arbitrum Security Council freezes ~\$30M. | response |
| 10-30 02:25 | Binance publishes its preliminary findings: laptop → service container, no private key leaked, ~\$6.3B, deposits and withdrawals suspended. | — |
| 10-30 onward | Unfreezable assets are held or spread: BTC in 19 wallets, ~500K ETH in seven. Funds meet [Bitget](2026-09-bitget-wallet-backend-spoofed-transfer-data-hot-warm-drain.md) proceeds at one address, which is part of the DPRK attribution by TRM and Chainalysis. | T8.001 (cluster reuse) |

**Why two techniques.** T15.003 explains *how the attacker got the power to sign*. T13.004 explains *what they made Binance 14 sign on Ethereum*: a delegation, rather than a plain transfer, so that one EOA could be emptied of everything in one call and could then command Hot Wallet 34. On the other chains no 7702 step was needed; the compromised service just sent transfers.

## Root-cause evidence

- **Technique:** OAK-T15.003
- **Source:** <https://x.com/binance/status/2115993361517891592>; <https://www.binance.com/en/support/announcement/detail/c5a8729a97ac486d963784d96c5642d7>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** Binance states the laptop → service container → unauthorized withdrawal path as its preliminary finding and says it has found additional points of breach. The T13.004 Ethereum leg is independently corroborated: Ondology Labs recovered the signer of all 50 authorizations as Binance 14 (delegation tx `0xad99…298b`, sweep tx `0x53bd…e2f3`), and TRM Labs (via The Hacker News) reports the same pattern. Neither source is a Binance statement.

## Public references

- `[binanceincident2026]` — Binance on X, initial investigation (2026-10-30): <https://x.com/binance/status/2115993361517891592>
- `[binanceannouncement2026]` — Binance, security incident update: <https://www.binance.com/en/support/announcement/detail/c5a8729a97ac486d963784d96c5642d7>
- `[thnbinance2026]` — The Hacker News, "Binance Suffers Security Breach Affecting \$6.3 Billion in Assets, Nearly \$3 Billion Frozen": <https://thehackernews.com/2026/10/binance-suffers-security-breach.html>
- `[ondologybinance2026]` — Ondology Labs (P. Kattides), on-chain forensics of the Binance hot-wallet drain and the EIP-7702 takeover (2026-10-29, updated 2026-10-30): <https://ondologylabs.com/blog/binance-hot-wallet-hack-eip-7702>
- `[etherscanbinancedelegation2026]` — 50-authorization delegation transaction: <https://etherscan.io/tx/0xad99264d5532ae0dd04b2004eebda05f25657e70dacb764f7ac8d4ccd051298b>
- `[etherscanbinancesweep2026]` — sweep transaction: <https://etherscan.io/tx/0x53bd38b816c23e74134786c29a8c18d792777998a3b9326047b583100e88e2f3>
- `[coindeskbinancebtc2026]` — CoinDesk, Binance hacker splits \$1.4B of bitcoin into 19 wallets (2026-10-30): <https://www.coindesk.com/markets/2026/10/30/binance-hacker-splits-usd1-4-billion-of-bitcoin-into-19-wallets-that-no-one-can-freeze>
