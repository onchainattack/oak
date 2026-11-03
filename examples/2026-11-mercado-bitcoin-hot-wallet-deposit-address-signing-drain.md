# Mercado Bitcoin — signing access to hot wallets and customer deposit addresses on 10+ chains, entry undisclosed — Mercado Bitcoin (Brazilian exchange) / Ethereum, Bitcoin, Solana, Tron, Stellar and others — 2026-11-02

**Loss:** the range depends on the source. The operator said on 2026-11-03 that "o valor dos ativos envolvidos é de cerca de US\$ 38 milhões" (about \$38M of assets involved) and that it had already blocked \$11M. Bitquery counts **\$48.6M** taken from wallets on 10 chains at transfer-time prices, of which issuers froze \$11.4M. Chainalysis says **~\$49M** across 17 blockchains and "nearly \$10 million" frozen. The operator says customers will have no loss of assets. The figures are not reconciled by any source; they are different counting bases, not corrections of each other.

**OAK Techniques observed:** **OAK-T11.011** (Multi-chain Key-store Co-location — *primary, inferred from the extraction pattern, not stated by any source*). Transfers left hot wallets on 10 chains in about 25–30 minutes, and later customer deposit addresses were emptied in bulk. That pattern points to one signing layer reachable from one intrusion, as in [Gamdom](2026-10-gamdom-automation-server-intrusion-multi-chain-hot-wallet-drain.md). See [`techniques/T11.011-multi-chain-key-store-co-location.md`](../techniques/T11.011-multi-chain-key-store-co-location.md). **OAK-T7.003** (Cross-chain Bridge Laundering — *laundering step*: Bitquery reports Mayan, Bridgers and MetaMask-bridge use). **How the attacker got signing access is undisclosed**, so no entry Technique (T15.x) is claimed: nothing published says an endpoint, vendor or credential was the way in.

**Attribution:** **unattributed.** Arkham labels an entity "Mercado Bitcoin Hacker" for tracking; no source attributes the attack to a named actor.

**Key teaching point:** **If the same signing layer can move hot wallets on ten chains and also sweep tens of thousands of customer deposit addresses, one intrusion empties all of it.** Per-chain and per-wallet-class signing isolation, with per-transaction limits enforced outside the signer, bounds what one compromise can take. **Inference, not a published finding:** deposit-address transfers were signed too, so the attacker could sign for deposit-address keys (or the master secret they derive from), not only for hot wallets.

## Summary

Early on 2026-11-02 UTC, assets began leaving Mercado Bitcoin, which Chainalysis calls Brazil's largest crypto exchange, "in waves" across 17 blockchains. OAK's own check shows the Ethereum hot wallet [`0x5cc7787778b4d20a947dcc53b41f593cfd27d548`](https://etherscan.io/address/0x5cc7787778b4d20a947dcc53b41f593cfd27d548) sent 2,852.06743526 ETH to [`0xe485e7a70b1131216cb47ca4555c4bbb2c742478`](https://etherscan.io/address/0xe485e7a70b1131216cb47ca4555c4bbb2c742478) at 06:24:47 UTC, followed by USDC, USDT and WBTC and a long tail of tokens. Bitcoin and Tron transfers followed within minutes. Hours later, customer deposit addresses were swept: Bitquery counts 36,042 Ethereum addresses emptied between 12:27 and 16:56 UTC, after the exchange's 12:56 UTC containment statement. Chainalysis was phoned at 2:30 am ET and helped Tether and others freeze stablecoins. The operator suspended services and said customers would lose nothing. The cause is not public.

## Timeline (UTC)

Stages: **Entry** (undisclosed), **Take** (hot wallets, then deposit addresses), **Money** (consolidation, bridges, freezes), **Response**. Times for rows marked "traced by OAK" come from OAK's own on-chain reads on 2026-11-03; others are from the cited sources.

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-02 (undisclosed) | The attacker obtains the ability to sign for Mercado Bitcoin hot wallets and for customer deposit addresses. How is not published: no source states whether an endpoint, a vendor, a credential or a key store was the way in. | — |
| Undisclosed | Preparation (funding, tooling, earlier access) is not published. Bitquery notes thefts of about \$298k from wallets on Base, Arbitrum and Optimism that began 53 minutes before the first exchange coins moved, and that old Bitcoin addresses were emptied late Sunday night Brazil time. | — |
| 2026-11-02 06:19:20 | First of the Bitcoin transfers into [`19qGpsHvzh1t6pVi526XNNkh6hW6prDZp`](https://mempool.space/address/19qGpsHvzh1t6pVi526XNNkh6hW6prDZp) seen in the window: 1.26952011 BTC, tx [`aa9bc710f06286911921acf778e0010ed98b3e5032abe553470b9e09e9e96239`](https://mempool.space/tx/aa9bc710f06286911921acf778e0010ed98b3e5032abe553470b9e09e9e96239). Traced by OAK; that the sender belongs to the exchange is inferred from timing, not from a source label. | **T11.011** |
| 2026-11-02 06:24:47 | Ethereum hot wallet sends 2,852.06743526 ETH to the attacker address, tx [`0xf447ad5114dd01d78847799bf82b34f9b2ac04b97bbc5a81370eb753fa81ff68`](https://etherscan.io/tx/0xf447ad5114dd01d78847799bf82b34f9b2ac04b97bbc5a81370eb753fa81ff68). A 0.0001 ETH transfer from the same wallet preceded it at 06:24:23, tx [`0xe8959bb67a6c0b73730c8fd1df7d754ce122ebd190e63f069c50b9374d20fedb`](https://etherscan.io/tx/0xe8959bb67a6c0b73730c8fd1df7d754ce122ebd190e63f069c50b9374d20fedb). Traced by OAK. | **T11.011** |
| 2026-11-02 06:26:11 | Same wallet sends 2,236,100.704728 USDC (tx [`0x5caca820a2aaafb3e3dfaa8679d4dd2cdc8b3255797afa15ddceaeb15951a3b3`](https://etherscan.io/tx/0x5caca820a2aaafb3e3dfaa8679d4dd2cdc8b3255797afa15ddceaeb15951a3b3)) and 2,990,643.17845 USDT (tx [`0x041caa2acecd6c7629d4406b18b4c794846ca9d244db14a9b8886cd477b7db75`](https://etherscan.io/tx/0x041caa2acecd6c7629d4406b18b4c794846ca9d244db14a9b8886cd477b7db75)). At 06:32:11 it sends 2.21778976 WBTC, tx [`0x0d04626baf2f59a6522d2091eefa08a559ac0e173e965dcf359a4fe17f898607`](https://etherscan.io/tx/0x0d04626baf2f59a6522d2091eefa08a559ac0e173e965dcf359a4fe17f898607). Plain transfers, one token per transaction. Traced by OAK. | **T11.011** |
| 2026-11-02 06:27:09 – 06:28:09 | On Tron, [`TTLzhvB7JsEgaB4rpphzGBB1YFkA2gqPTp`](https://tronscan.org/#/address/TTLzhvB7JsEgaB4rpphzGBB1YFkA2gqPTp) sends 708,228.145074 USDT, tx [`859f5b630a9fbcce9f9eaa609ea5158506b70c025a87634688c2b71d3691503e`](https://tronscan.org/#/transaction/859f5b630a9fbcce9f9eaa609ea5158506b70c025a87634688c2b71d3691503e), and 1,708,727.724137 TRX, tx [`49f21cdfa5d15d435e122758c787e3e8fc05cfb64b6777e818ff0187ab19d5d5`](https://tronscan.org/#/transaction/49f21cdfa5d15d435e122758c787e3e8fc05cfb64b6777e818ff0187ab19d5d5), to [`TEX3HuDRHRa3tnYpy96M4UfSx62VhDyA5L`](https://tronscan.org/#/address/TEX3HuDRHRa3tnYpy96M4UfSx62VhDyA5L). Traced by OAK. | **T11.011** |
| 2026-11-02 06:41:47 | 104.42787649 BTC arrives at the Bitcoin address in one transaction, [`ada3bb2304be5de8dd7e67bf9be8c765c5f020a34508bd248f345a1205c5fcf9`](https://mempool.space/tx/ada3bb2304be5de8dd7e67bf9be8c765c5f020a34508bd248f345a1205c5fcf9), from `bc1qqxu9yyeumd7n73z495n5q230sas5rw933av379`. Traced by OAK. | **T11.011** |
| 2026-11-02 06:24 – 06:50 | Per Bitquery, hot wallets on 10 chains paid the attacker "within roughly 25–30 minutes": Ethereum \$29.72M, Bitcoin \$8.30M, Solana \$3.22M, Stellar \$2.12M, Arbitrum \$1.53M, Tron \$1.51M, Polygon \$1.21M, Avalanche \$659k, BNB Chain \$221k, XDC \$96k. Relayed from Bitquery; OAK verified the Ethereum, Bitcoin and Tron rows above only. | **T11.011** |
| 2026-11-02 12:27 – 16:56 | Customer deposit addresses are swept: Bitquery reports 36,042 Ethereum deposit addresses emptied (\$266k in total), 53 on Bitcoin, and 143 on BNB Chain from 14:26. About 91% of sampled addresses held under \$10. The sweep continues about four hours after the exchange's 12:56 UTC containment statement. Deposit-address transfers being signed implies the attacker could sign for deposit-address keys (inference). Relayed from Bitquery; OAK saw the 16:55–16:56 inbound dust-size transfers to the attacker address. | **T11.011** |
| 2026-11-02 10:21 – 21:28 | Issuers freeze stablecoins and gold tokens in turn (Bitquery): Tether on Polygon, Tron, Ethereum and Solana, Agora, Paxos, Circle (Polygon, Ethereum, then Stellar at 21:28), Ripple (RLUSD). Bitquery totals: Tether about \$5.9M, Circle \$3.9M, Paxos \$1.5M. | response |
| 2026-11-02 13:12 – 15:38 | The attacker address moves tokens onward to fresh Ethereum wallets, among them 2,236,100 USDC to [`0x3ce76d2d27cc80e44c7d9532423633c7f940c779`](https://etherscan.io/address/0x3ce76d2d27cc80e44c7d9532423633c7f940c779) at 13:12:11, tx [`0xc0005e84ea8e8750879066cee5ce2a5f69ae32114c5814a199014a3f90b90e0d`](https://etherscan.io/tx/0xc0005e84ea8e8750879066cee5ce2a5f69ae32114c5814a199014a3f90b90e0d) (Bitquery: later frozen by Circle). On Tron, 1,708,600 TRX goes to [`TJiRoqF9BqxT89CmFk1QxzQzGumckYWAmh`](https://tronscan.org/#/address/TJiRoqF9BqxT89CmFk1QxzQzGumckYWAmh) at 13:30:24, tx [`7a07ce2ba79bdea26154cfb55ce30de0a128228a7a9d464c6ea7ff9e4cf76708`](https://tronscan.org/#/transaction/7a07ce2ba79bdea26154cfb55ce30de0a128228a7a9d464c6ea7ff9e4cf76708). Traced by OAK. | — |
| 2026-11-02 12:07 – 2026-11-03 | Bitquery: \$19.5M had moved into 10 new Ethereum wallets by the afternoon; 3,649 ETH (about \$8.2M) was consolidated overnight into two wallets that had sent nothing as of 08:49 UTC on 11-03; Mayan swapped Solana funds into about \$1.15M of ETH; Bridgers received 1.71M TRX; about 76,000 AVAX went through MetaMask's bridge. Bitquery found no deposit into a crypto exchange. The 106.07 BTC had not moved. | **T7.003** |
| 2026-11-02 early, 12:56 | Mercado Bitcoin suspends services. Its containment statement is dated 12:56 UTC (as reported by Bitquery and RektRadar; the post itself was not read by OAK). Chainalysis's account: a Mercado Bitcoin director phoned its in-country expert at 2:30 am ET (07:30 UTC), and within 30 minutes it had contacted law enforcement with freezable addresses. | response |
| 2026-11-03 00:44 | Mercado Bitcoin posts that customers will have no asset loss, services are temporarily suspended, about \$38M is involved and \$11M is blocked with Tether, Circle, Paxos, BRL1 and Chainalysis, with more identified and containment continuing. | response |
| 2026-11-03 00:47 | Chainalysis posts that it helped freeze nearly \$10M and that Tether froze over \$9M. | response |

Key addresses:

- Exchange Ethereum hot wallet (source of the drain, traced by OAK) — [`0x5cc7787778b4d20a947dcc53b41f593cfd27d548`](https://etherscan.io/address/0x5cc7787778b4d20a947dcc53b41f593cfd27d548)
- Attacker main address, Ethereum and EVM chains (Bitquery, RektRadar; OAK confirmed it receives the hot-wallet transfers) — [`0xe485e7a70b1131216cb47ca4555c4bbb2c742478`](https://etherscan.io/address/0xe485e7a70b1131216cb47ca4555c4bbb2c742478)
- Attacker Ethereum onward wallets (Bitquery) — [`0x8419e7824e785c4ac8d9d94a0093c437ab1ff320`](https://etherscan.io/address/0x8419e7824e785c4ac8d9d94a0093c437ab1ff320), [`0x0110b9a13aa40a9186cacd9e45d860cd4ee53b51`](https://etherscan.io/address/0x0110b9a13aa40a9186cacd9e45d860cd4ee53b51), [`0x3ce76d2d27cc80e44c7d9532423633c7f940c779`](https://etherscan.io/address/0x3ce76d2d27cc80e44c7d9532423633c7f940c779), [`0x3c6daf929ff36e50ceb66807ebe8abe83653e051`](https://etherscan.io/address/0x3c6daf929ff36e50ceb66807ebe8abe83653e051), [`0x59a919e8d0582ce62c8de9431b3ebc6fa121731e`](https://etherscan.io/address/0x59a919e8d0582ce62c8de9431b3ebc6fa121731e), [`0x071f8366375fdd21423bb23ae19e4b91f03f9270`](https://etherscan.io/address/0x071f8366375fdd21423bb23ae19e4b91f03f9270), [`0x4d5f3758938df94a76bfd19652f118ccd7a72c9d`](https://etherscan.io/address/0x4d5f3758938df94a76bfd19652f118ccd7a72c9d)
- Bitcoin (holds about 106 BTC, Bitquery and RektRadar; inflows traced by OAK) — [`19qGpsHvzh1t6pVi526XNNkh6hW6prDZp`](https://mempool.space/address/19qGpsHvzh1t6pVi526XNNkh6hW6prDZp)
- Solana main address, USDT frozen (Bitquery; OAK did not trace it) — [`3YX6WHncP1Ra4AotE9YLawFt4nPmxyux288FWXkEW97J`](https://solscan.io/account/3YX6WHncP1Ra4AotE9YLawFt4nPmxyux288FWXkEW97J)
- Tron attacker address (Bitquery; traced by OAK) — [`TEX3HuDRHRa3tnYpy96M4UfSx62VhDyA5L`](https://tronscan.org/#/address/TEX3HuDRHRa3tnYpy96M4UfSx62VhDyA5L); Tron source of the USDT and TRX transfers — [`TTLzhvB7JsEgaB4rpphzGBB1YFkA2gqPTp`](https://tronscan.org/#/address/TTLzhvB7JsEgaB4rpphzGBB1YFkA2gqPTp)
- Stellar address holding 6.71M XLM (Bitquery; not traced by OAK) — `GDXYRI6IONQA5YTGRLQ6O3FGJ2BWXPJTTQPUXFPSEXSRKBZLFKMZSOLP`
- Avalanche address holding 76,000 AVAX (Bitquery; not traced by OAK) — [`0x71ddbdd9b865d74b3c21068d71b3a11e110db728`](https://snowtrace.io/address/0x71ddbdd9b865d74b3c21068d71b3a11e110db728)

Address-poisoning warning: the attacker's Ethereum address receives and emits fake "ETH" and token transfers to lookalike addresses (for example `0x841f4179ad002803a56160b933d74351341ff320` against Bitquery's `0x8419e7824e785c4ac8d9d94a0093c437ab1ff320`). OAK dropped these from the trace; check the full address before using any of the above.

## Fund flow

Traced by OAK on 2026-11-03 with `tools/explorer.py`. Ethereum, Bitcoin and Tron edges are `verified: oak`; the freeze edges relay Bitquery. Solana, Stellar, Avalanche and the bridge hops are not traced.

```oak-flow
as_of: 2026-11-03T16:00Z
nodes:
  - {id: hw, chain: ethereum, address: 0x5cc7787778b4d20a947dcc53b41f593cfd27d548, role: victim-hot-wallet, label: "Mercado Bitcoin Ethereum hot wallet"}
  - {id: atk, chain: ethereum, address: 0xe485e7a70b1131216cb47ca4555c4bbb2c742478, role: attacker-receiver, label: "Attacker main address (EVM)"}
  - {id: w2, chain: ethereum, address: 0x3ce76d2d27cc80e44c7d9532423633c7f940c779, role: intermediary, label: "Onward wallet (USDC later frozen by Circle, per Bitquery)"}
  - {id: w3, chain: ethereum, address: 0x3c6daf929ff36e50ceb66807ebe8abe83653e051, role: intermediary, label: "Onward wallet (PAXG)"}
  - {id: w4, chain: ethereum, address: 0x59a919e8d0582ce62c8de9431b3ebc6fa121731e, role: attacker-holding, label: "Consolidation wallet"}
  - {id: snx, chain: ethereum, address: 0xeb3107117fead7de89cd14d463d340a2e6917769, role: intermediary, label: "Synthetix protocolDAO Safe (received SNX)"}
  - {id: frz, chain: ethereum, role: issuer-freeze, label: "Stablecoin issuer freezes (Tether, Circle, Paxos, others)"}
  - {id: btcs, chain: bitcoin, address: bc1qqxu9yyeumd7n73z495n5q230sas5rw933av379, role: unknown, label: "Sender of 104.42787649 BTC (ownership not published)"}
  - {id: btca, chain: bitcoin, address: 19qGpsHvzh1t6pVi526XNNkh6hW6prDZp, role: attacker-holding, label: "Bitcoin holding address (about 106 BTC)"}
  - {id: trs, chain: tron, address: TTLzhvB7JsEgaB4rpphzGBB1YFkA2gqPTp, role: unknown, label: "Tron source of USDT and TRX transfers"}
  - {id: tra, chain: tron, address: TEX3HuDRHRa3tnYpy96M4UfSx62VhDyA5L, role: attacker-receiver, label: "Tron attacker address"}
  - {id: trn, chain: tron, address: TJiRoqF9BqxT89CmFk1QxzQzGumckYWAmh, role: intermediary, label: "Tron onward address (TRX)"}
edges:
  - {from: hw, to: atk, asset: ETH, amount: 2852.06743526, tx: 0xf447ad5114dd01d78847799bf82b34f9b2ac04b97bbc5a81370eb753fa81ff68, time: 2026-11-02T06:24:47Z, technique: T11.011, verified: oak}
  - {from: hw, to: atk, asset: USDC, amount: 2236100.704728, tx: 0x5caca820a2aaafb3e3dfaa8679d4dd2cdc8b3255797afa15ddceaeb15951a3b3, time: 2026-11-02T06:26:11Z, technique: T11.011, verified: oak}
  - {from: hw, to: atk, asset: USDT, amount: 2990643.17845, tx: 0x041caa2acecd6c7629d4406b18b4c794846ca9d244db14a9b8886cd477b7db75, time: 2026-11-02T06:26:11Z, technique: T11.011, verified: oak}
  - {from: hw, to: atk, asset: WBTC, amount: 2.21778976, tx: 0x0d04626baf2f59a6522d2091eefa08a559ac0e173e965dcf359a4fe17f898607, time: 2026-11-02T06:32:11Z, technique: T11.011, verified: oak}
  - {from: atk, to: w2, asset: USDC, amount: 2236100, tx: 0xc0005e84ea8e8750879066cee5ce2a5f69ae32114c5814a199014a3f90b90e0d, time: 2026-11-02T13:12:11Z, verified: oak}
  - {from: w2, to: frz, asset: USDC, verified: source, source: bitquery2026}
  - {from: atk, to: w3, asset: PAXG, amount: 369, tx: 0x213951303f3a6424b188c735f236cc9361eec3336ff4428c0bb59bf44c078547, time: 2026-11-02T13:41:11Z, tx_count: 2, time_last: 2026-11-02T13:42:11Z, verified: oak}
  - {from: w3, to: frz, asset: PAXG, verified: source, source: bitquery2026}
  - {from: atk, to: w4, asset: ETH, amount: 50, tx: 0xc173147b4dd60f52171377df4cf53ec530e3692ad4a9e18de298a15c74f4bc32, time: 2026-11-02T23:21:59Z, verified: oak}
  - {from: atk, to: snx, asset: SNX, amount: 428167.52498771, tx: 0x7ae7be77eb1eef7212087dc6a8ea39840311a43df00d14e79686e20b1efccbba, time: 2026-11-03T00:26:23Z, verified: oak}
  - {from: btcs, to: btca, asset: BTC, amount: 104.42787649, tx: ada3bb2304be5de8dd7e67bf9be8c765c5f020a34508bd248f345a1205c5fcf9, time: 2026-11-02T06:41:47Z, technique: T11.011, verified: oak}
  - {from: trs, to: tra, asset: USDT, amount: 708228.145074, tx: 859f5b630a9fbcce9f9eaa609ea5158506b70c025a87634688c2b71d3691503e, time: 2026-11-02T06:27:09Z, technique: T11.011, verified: oak}
  - {from: trs, to: tra, asset: TRX, amount: 1708727.724137, tx: 49f21cdfa5d15d435e122758c787e3e8fc05cfb64b6777e818ff0187ab19d5d5, time: 2026-11-02T06:28:09Z, technique: T11.011, verified: oak}
  - {from: tra, to: trn, asset: TRX, amount: 1708600, tx: 7a07ce2ba79bdea26154cfb55ce30de0a128228a7a9d464c6ea7ff9e4cf76708, time: 2026-11-02T13:30:24Z, verified: oak}
  - {from: tra, to: frz, asset: USDT, verified: source, source: bitquery2026}
```

## What is not known yet

- How the attacker got signing access (endpoint, vendor, credential, key store, insider): **undisclosed**.
- Whether deposit-address keys are individually stored or derived from one secret: undisclosed. That the attacker could sign for them is OAK's inference from the sweep.
- The exchange's own 2026-11-02 posts (the 12:56 UTC containment statement and any published destination addresses) were not reachable; the 12:56 time is relayed by Bitquery and RektRadar.
- Final loss: sources give \$38M, \$48.6M and \$49M on different bases.
- Chainalysis's thread says Tether froze "over \$9 million" while its blog says "over \$4 million" and "\$9 million in total freezes"; Bitquery counts Tether at about \$5.9M. Not reconciled.
- Where the unfrozen funds end up: as of Bitquery's reads on 2026-11-03 morning, no deposit into a crypto exchange was found and the 106.07 BTC had not moved.

## Root-cause evidence

- **Technique:** OAK-T11.011
- **Source:** <https://bitquery.io/investigations/mercado-bitcoin-hack>; <https://x.com/MercadoBitcoin/status/2117417663966150718>; <https://x.com/chainalysis/status/2117418348447158559>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** The operator confirms a security incident, the suspension and the freezes, but does not disclose the mechanism. Bitquery documents the on-chain pattern: hot wallets on 10 chains paid the attacker within about 25–30 minutes, then tens of thousands of deposit addresses were emptied, and Bitquery's page does not say how the attacker got in. RektRadar (secondary) describes it as "unauthorized signing access" consistent with no smart-contract exploit. T11.011 is OAK's inference from simultaneous multi-chain outflows, and the claim that deposit-address keys were signable is a further inference; neither is a finding by any source. Same-day third-party analysis is never `confirmed`.

## Public references

- `[mercadobitcoinx2026]` — Mercado Bitcoin on X, incident update (2026-11-03): <https://x.com/MercadoBitcoin/status/2117417663966150718>
- `[chainalysisx2026]` — Chainalysis on X, thread on the Mercado Bitcoin response (2026-11-03): <https://x.com/chainalysis/status/2117418348447158559>
- `[chainalysisblog2026]` — Chainalysis, "Chainalysis response: Mercado Bitcoin": <https://www.chainalysis.com/blog/chainalysis-response-mercado-bitcoin/>
- `[bitquery2026]` — Bitquery, "Mercado Bitcoin hack" investigation: <https://bitquery.io/investigations/mercado-bitcoin-hack>
- `[arkhammercado2026]` — Arkham on X, tracking entity (2026-11-02): <https://x.com/arkham/status/2117286574111269271>
- `[rektradarmercado2026]` — RektRadar, "Web3 daily exploits 03 Nov 2026" (secondary): <https://www.rektradar.xyz/web3-daily-exploits-03-nov-2026-mercado-46m-signing-drain/>
