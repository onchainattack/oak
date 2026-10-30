# Binance — a DevOps engineer's laptop led to a service container that could submit withdrawals, and the hot wallets were emptied — Binance / Ethereum, Bitcoin, Tron, XRP Ledger and others — 2026-10-29

**Loss:** **~\$6.3B** per Binance (Chainalysis ~\$5.91B, Elliptic ~\$6.43B at theft-time prices). About **\$3B frozen on-chain** by 2026-10-30, mostly stablecoins (Tether >1.567B USDT, Circle 800M USDC; Ripple and World Liberty Financial also froze, Arbitrum's Security Council froze ~\$30M). Elliptic counts ~\$3.33B the attacker still controls in assets no issuer can freeze, including ~511,861 ETH and 18,270 BTC. Binance says it will cover all losses from SAFU and company funds; deposits and withdrawals were suspended. The largest crypto theft on record, about four times Bybit. Per-chain at 20:24 UTC prices (Ondology Labs; Ethereum, Arbitrum and Avalanche verified by Ondology, the rest from CertiK): Ethereum \$3.74B, Bitcoin \$1.47B, Tron \$627.5M, XRP \$296.5M, Solana \$96.1M, Arbitrum \$31.8M, Avalanche \$24.3M, Optimism \$4.8M, about \$6.28B in total. Tether and Circle froze \$2.01B within an hour of the sweep.

**OAK Techniques observed:** **OAK-T15.003** (Operator-Endpoint Compromise — *primary, operator-stated preliminary finding*. Binance: a **compromised DevOps engineer's laptop** "allowed an attacker to gain access to a service container and submit unauthorized withdrawal transactions"; it found "no evidence of any wallet private key leak". Co-CEO Richard Teng later said it was not one engineer's permissions or a one-click action, and Binance said it had "uncovered additional points of breach". See [`techniques/T15.003-operator-endpoint-compromise.md`](../techniques/T15.003-operator-endpoint-compromise.md)). **OAK-T13.004** (EIP-7702 Delegation Abuse — *Ethereum leg, verified on-chain by Ondology Labs; TRM Labs reports the same*. **Binance 14** ([`0x28c6c06298d514db089934071355e5743bf21d60`](https://etherscan.io/address/0x28c6c06298d514db089934071355e5743bf21d60)) is a plain EOA. At 20:20:59 UTC the attacker's initiator submitted one transaction carrying **50 EIP-7702 authorizations, each recovered to the Binance 14 key**, for nonces 18,914,775–18,914,824, all delegating to an unverified sweep contract ([`0x63e842b054bd624a465454d533c33f573e9c6fae`](https://etherscan.io/address/0x63e842b054bd624a465454d533c33f573e9c6fae)) that only the initiator can call; nonce 18,914,809 matched. The lowest nonce equalled Binance 14's live nonce about three minutes earlier, which Ondology reads as signing in real time. At 20:24:23 the sweep moved **167,464 ETH and 63 tokens**. Binance 14 also controls the smart wallet **Hot Wallet 34**, which the attacker then directed to pay out **823M USDC**. Binance 16 sent nine ordinary signed transfers 24 seconds after the sweep, with no delegation needed. Binance 14 signed a 7702 revocation at 00:10:35 on 2026-10-30, 3 h 50 m after the takeover. See [`techniques/T13.004-eip7702-delegation-abuse.md`](../techniques/T13.004-eip7702-delegation-abuse.md)). Preparation and aftermath: **OAK-T7.001** (Tornado Cash funding of the initiator) and **OAK-T8.001** (proceeds share an address with the Bitget exploit). The other chains (XRP from 20:04:52 UTC, then Solana, Optimism, Bitcoin, Tron, Arbitrum and Avalanche) were drained by ordinary signed transfers. On Bitcoin, 18,270 BTC left in 11 transactions shaped like ordinary withdrawals and were split into 19 wallets (CoinDesk). The chain shows *what* Binance's keys signed, not *how* the attacker made them sign it. That gap is the service-container step.

**Attribution:** **inferred-strong** — by blockchain-analytics firms, not by Binance. TRM Labs ("high confidence") and Chainalysis tie it to DPRK / TraderTraitor ([OAK-G01](../actors/OAK-G01-lazarus.md)); stolen funds met [Bitget](2026-09-bitget-wallet-backend-spoofed-transfer-data-hot-warm-drain.md) exploit funds at the same address ([`0x15104a9ce0f08a8f0075a0869ae80e795fe0feb7`](https://etherscan.io/address/0x15104a9ce0f08a8f0075a0869ae80e795fe0feb7)). Elliptic agrees on DPRK but flags laundering that differs from the Bybit pattern. Binance says it is working with law enforcement to identify the attackers.

**Key teaching point:** **If a container can submit withdrawals, the key is wherever that container is.** No key leaked, and it did not need to: the signing service did what it was asked. Withdrawal paths need limits and approvals that the submitting service cannot satisfy by itself. An exchange hot wallet that is an EOA on a 7702 chain needs a signer that refuses `0x05` authorization payloads outright. Fifty pre-signed delegations were the only new primitive on the Ethereum leg. The rest was blast radius: a smart wallet (Hot Wallet 34) that took orders from the same EOA lost 823M USDC to the same takeover.

## Summary

Preparation is visible on-chain. The initiator was funded by three 0.1 ETH Tornado Cash withdrawals from 07:39 UTC on 2026-10-28, rehearsed 7702 delegate-and-sweep on its own test wallets between 13:51 and 16:47, and deployed the final sweep contract at 15:59. On 2026-10-29 the drain ran from 20:04 (XRP) to 20:36 UTC (Avalanche), with further Ethereum sweeps at 21:44 (after another Binance wallet topped Binance 14 up with 200M USDT) and 22:39. Tether froze the receiver at 21:01 and Binance 14 itself at 22:06. On 2026-10-30 Binance published preliminary findings (DevOps laptop → service container → unauthorized withdrawals), froze ~\$3B with issuers and chain partners, and suspended deposits and withdrawals pending "a security revamp of the withdrawal service and its related addresses". A full post-mortem is promised.

## Timeline (UTC)

Read it as three stages. **Get in**: a laptop, then the withdrawal service. **Prepare**: funding and a rehearsal. **Take**: the service signs what the attacker asks for, on every chain at once. Times are from Ondology Labs' on-chain reconstruction unless marked.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-28 (undisclosed) | A DevOps engineer's laptop is compromised. From it the attacker reaches a **service container that submits withdrawals**. How the laptop was compromised is not published. Binance says there were "additional points of breach". | **T15.003** entry |
| 10-28 07:39 → 10-29 08:23 | Three 0.1 ETH Tornado Cash withdrawals (10-28 07:39 and 08:53, 10-29 08:23; traced by OAK) fund the initiator [`0x7c8601d4645b93cea45f71e118a729332e6b5ca0`](https://etherscan.io/address/0x7c8601d4645b93cea45f71e118a729332e6b5ca0). | **T7.001** (funding) |
| 10-28 13:51–16:47 | Rehearsal: the initiator uses EIP-7702 to delegate its *own* test wallets to a sweep contract and drains small USDT/USDC balances. | T13.004 (rehearsal) |
| 10-28 15:59 | Final sweep contract [`0x63e842b054bd624a465454d533c33f573e9c6fae`](https://etherscan.io/address/0x63e842b054bd624a465454d533c33f573e9c6fae) deployed. Only the initiator can call it. | — |
| 10-29 20:04:52 | Drain starts on **XRP**. **Solana, Optimism, Bitcoin, Tron** follow before 20:22, all as ordinary signed transfers that look like Binance withdrawals (CertiK). Bitcoin: 18,270 BTC in 11 transactions (CoinDesk). | **T15.003** (the service signs) |
| 20:20:59 | [`0xad99264d5532ae0dd04b2004eebda05f25657e70dacb764f7ac8d4ccd051298b`](https://etherscan.io/tx/0xad99264d5532ae0dd04b2004eebda05f25657e70dacb764f7ac8d4ccd051298b): one transaction carries **50 EIP-7702 authorizations signed by Binance 14's key**, one for each of 50 consecutive nonces. One matches, and the Binance 14 EOA now runs the attacker's sweep code. | **T13.004** |
| 20:24:23 | Sweep [`0x53bd38b816c23e74134786c29a8c18d792777998a3b9326047b583100e88e2f3`](https://etherscan.io/tx/0x53bd38b816c23e74134786c29a8c18d792777998a3b9326047b583100e88e2f3): **167,464 ETH + 63 tokens** leave Binance 14 for the receiver [`0x5227f603c1ee34ce3c06efe6477003bdfccb2f8c`](https://etherscan.io/address/0x5227f603c1ee34ce3c06efe6477003bdfccb2f8c). Binance 16 sends nine ordinary transfers 24 s later. | T13.004 / T15.003 |
| 20:30–20:36 | **Arbitrum** and **Avalanche** hot wallets drained. | T15.003 |
| 20:41:23 and 20:59:47 | Through Binance 14 the attacker orders smart wallet **Hot Wallet 34** to pay out 780M + 43M **USDC** (first payout [`0xdc102dd89dded5a83f1008906883ffb7c81ff3b7d7965d8c7277d170b5e17481`](https://etherscan.io/tx/0xdc102dd89dded5a83f1008906883ffb7c81ff3b7d7965d8c7277d170b5e17481)). | T13.004 (blast radius) |
| 21:01:35 / 21:04:59 | **Tether** freezes the receiver; **Circle** freezes the 823M USDC. Tether and Circle together freeze \$2.01B within the hour. | response |
| 21:44:11 | Another Binance wallet tops Binance 14 up with 200M USDT, and the attacker sweeps it too, still delegated ([`0x55ba4dabc41b468e580751373ad31acdee6f5ba398682df2c93e5a8340870556`](https://etherscan.io/tx/0x55ba4dabc41b468e580751373ad31acdee6f5ba398682df2c93e5a8340870556)). | T13.004 |
| 22:06:23 | Tether freezes Binance 14 itself. A fourth sweep follows at 22:39 (128.5 ETH). | response |
| 10-30 00:10:35 | Binance 14 signs a 7702 **revocation** and is back under Binance control, **3 h 50 m** after the takeover. | response |
| 10-30 00:18 | Arbitrum Security Council freezes ~\$30M. | response |
| 10-30 02:25 | Binance publishes its preliminary findings: laptop → service container, no private key leaked, ~\$6.3B, deposits and withdrawals suspended. | — |
| 10-30 onward | Unfreezable assets are held or spread: BTC in 19 wallets, ~500K ETH in seven. Funds meet [Bitget](2026-09-bitget-wallet-backend-spoofed-transfer-data-hot-warm-drain.md) proceeds at one address, which is part of the DPRK attribution by TRM and Chainalysis. | T8.001 (cluster reuse) |

### Key addresses

Ethereum, from Ondology Labs' write-up, where each one is linked to Etherscan.

- Binance 14, the EOA taken over via EIP-7702 — [`0x28c6c06298d514db089934071355e5743bf21d60`](https://etherscan.io/address/0x28c6c06298d514db089934071355e5743bf21d60)
- Hot Wallet 34, a smart wallet that obeys Binance 14 — [`0xee7ae85f2fe2239e27d9c1e23fffe168d63b4055`](https://etherscan.io/address/0xee7ae85f2fe2239e27d9c1e23fffe168d63b4055)
- Binance 16, which sent ordinary transfers — [`0xdfd5293d8e347dfe59e90efd55b2956a1343963d`](https://etherscan.io/address/0xdfd5293d8e347dfe59e90efd55b2956a1343963d)
- Sweep contract, unverified, callable only by the initiator — [`0x63e842b054bd624a465454d533c33f573e9c6fae`](https://etherscan.io/address/0x63e842b054bd624a465454d533c33f573e9c6fae)
- Receiver of the sweeps — [`0x5227f603c1ee34ce3c06efe6477003bdfccb2f8c`](https://etherscan.io/address/0x5227f603c1ee34ce3c06efe6477003bdfccb2f8c)
- Largest attacker ETH holding (197,460 ETH as of 2026-10-30 06:25 UTC) — [`0x8532fa14acaf483729c449b8458aeddb900543d4`](https://etherscan.io/address/0x8532fa14acaf483729c449b8458aeddb900543d4)
- Address shared with Bitget exploit proceeds (TRM, via The Hacker News) — [`0x15104a9ce0f08a8f0075a0869ae80e795fe0feb7`](https://etherscan.io/address/0x15104a9ce0f08a8f0075a0869ae80e795fe0feb7)
- Initiator, full address traced by OAK — [`0x7c8601d4645b93cea45f71e118a729332e6b5ca0`](https://etherscan.io/address/0x7c8601d4645b93cea45f71e118a729332e6b5ca0)
- Six further attacker ETH wallets, the Avalanche receiver (`0x8035…c397`) and an RLUSD wallet (`0xe702…958d`) are published only in shortened form (full addresses not published). The 19 Bitcoin wallets are not listed in the sources.

### Where the funds are (as of 2026-10-30 06:25 UTC, Ondology Labs)

| What | Status |
|---|---|
| \$2.01B USDT/USDC | frozen by Tether and Circle within an hour; Binance puts total frozen near \$3B with other issuers and Arbitrum |
| ~500,938 ETH (~\$1.12B) | held across seven attacker wallets on Ethereum, not frozen |
| 18,270 BTC | split into 19 wallets, unmoved on 2026-10-30 (CoinDesk) |
| USDT that escaped freezes | split into hop wallets, sold for ETH on UniswapX / Uniswap, and used as collateral to borrow ETH on Aave (Ondology) |

### What is not known yet

- How the laptop was compromised, what the service container could reach, and what the "additional points of breach" were.
- How the container caused Binance's keys to sign. On-chain evidence shows what was signed, not how.
- Where the unfreezable ETH and BTC will move.
- Whether the DPRK attribution holds. Binance has not confirmed it, and Ondology did not verify it.

**Why two techniques.** T15.003 explains *how the attacker got the power to sign*. T13.004 explains *what they made Binance 14 sign on Ethereum*: a delegation, rather than a plain transfer, so that one EOA could be emptied of everything in one call and could then command Hot Wallet 34. On the other chains no 7702 step was needed; the compromised service just sent transfers.

## Fund flow

Ethereum leg, traced by OAK with `tools/explorer.py` (Blockscout, keyless) on 2026-10-30. Edges marked *traced by OAK* were checked on-chain; dashed edges are relayed from the cited source. Counterfeit-token transfers were excluded: within hours, address-poisoning bots sent the attacker's wallets fake "ETH", "USDT" and "USDC" Transfer events from lookalike addresses (for example `0x8537cce92e58b935874ddf03826030d7440543d4` imitating the real holding wallet `0x8532fa14acaf483729c449b8458aeddb900543d4`). The two share their first four and last six characters, which is exactly why OAK never shortens an address.

```oak-flow
as_of: 2026-10-30T11:40Z
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
edges:
  - {from: tc, to: init, asset: ETH, amount: 0.29, tx: 0xd9e59064d7681439e732a5eb0e2a167b9a23f161d3ce4c8ef111ca824fe59008, time: 2026-10-28T07:39:47Z, tx_count: 3, time_last: 2026-10-29T08:23:11Z, technique: T7.001, verified: oak}
  - {from: fund, to: init, asset: ETH, amount: 1.08221822, tx: 0x96cae1ec044b4b3e34c1f2113a7bcd1b0d3257370788f5d8a2b91e9c99c0ebe5, time: 2026-10-29T18:20:47Z, verified: oak}
  - {from: init, to: b14, asset: "EIP-7702 authorizations (50)", tx: 0xad99264d5532ae0dd04b2004eebda05f25657e70dacb764f7ac8d4ccd051298b, time: 2026-10-29T20:20:59Z, technique: T13.004, verified: oak}
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
- **Evidence:** Binance states the laptop → service container → unauthorized withdrawal path as its preliminary finding and says it has found additional points of breach. The T13.004 Ethereum leg is independently corroborated: Ondology Labs recovered the signer of all 50 authorizations as Binance 14 (delegation and sweep transactions linked in the timeline), and TRM Labs (via The Hacker News) reports the same pattern. Neither source is a Binance statement.

## Public references

- `[binanceincident2026]` — Binance on X, initial investigation (2026-10-30): <https://x.com/binance/status/2115993361517891592>
- `[binanceannouncement2026]` — Binance, security incident update: <https://www.binance.com/en/support/announcement/detail/c5a8729a97ac486d963784d96c5642d7>
- `[thnbinance2026]` — The Hacker News, "Binance Suffers Security Breach Affecting \$6.3 Billion in Assets, Nearly \$3 Billion Frozen": <https://thehackernews.com/2026/10/binance-suffers-security-breach.html>
- `[ondologybinance2026]` — Ondology Labs (P. Kattides), on-chain forensics of the Binance hot-wallet drain and the EIP-7702 takeover (2026-10-29, updated 2026-10-30): <https://ondologylabs.com/blog/binance-hot-wallet-hack-eip-7702>
- `[etherscanbinancedelegation2026]` — 50-authorization delegation transaction: <https://etherscan.io/tx/0xad99264d5532ae0dd04b2004eebda05f25657e70dacb764f7ac8d4ccd051298b>
- `[etherscanbinancesweep2026]` — sweep transaction: <https://etherscan.io/tx/0x53bd38b816c23e74134786c29a8c18d792777998a3b9326047b583100e88e2f3>
- `[coindeskbinancebtc2026]` — CoinDesk, Binance hacker splits \$1.4B of bitcoin into 19 wallets (2026-10-30): <https://www.coindesk.com/markets/2026/10/30/binance-hacker-splits-usd1-4-billion-of-bitcoin-into-19-wallets-that-no-one-can-freeze>
