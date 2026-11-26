# Web3Auth — infrastructure flaw exposed private keys of Keplr wallets created with Google or Apple login, mechanism undisclosed — Web3Auth embedded wallets in Keplr / Cosmos chains, Ethereum, Hyperliquid — 2026-11-01

**Loss:** **at least ~\$1.82M** taken by the attacker, per Bitquery's investigation of 2026-11-12 (low case \$1.68M counting only transfers signed with victim keys; \$1.01M gone before Web3Auth's first rescue sweep began on 2026-11-06). GoPlus put it at "at least about \$1 million" on 2026-11-09 (paraphrased from its Chinese post). Victims counted by Bitquery: 7,842 Cosmos wallets, 52 Ethereum wallets and 13 Hyperliquid accounts. Keplr and Web3Auth had not published a theft total in the sources OAK read. **Separate from the loss:** Web3Auth moved assets from at least 44,041 Keplr wallets into its own recovery wallets (\$6.0M held there at 15:38 UTC on 2026-11-07, per Bitquery). That is a rescue, not a theft. One affected party is CALC (a DCA protocol), which said it lost 99.9888% of its operational treasury; SlowMist's tracker lists \$26,900.

**OAK Techniques observed:** **OAK-T11.008** (Embedded-Wallet Identity-Provider Compromise — *primary, operator-stated class*). Web3Auth said it had "identified a security issue in Web3Auth infrastructure affecting certain embedded wallets used by Keplr", and Keplr described "Web3Auth's infrastructure vulnerability leading to private key breach" for some users who signed in with Google or Apple. The wallet's key path ran through the social-login provider's infrastructure, not through a seed phrase the user held. **What leaked, how, and since when are undisclosed.** See [`techniques/T11.008-embedded-wallet-identity-provider-compromise.md`](../techniques/T11.008-embedded-wallet-identity-provider-compromise.md). **OAK-T7.003** (Cross-chain Bridge Laundering — *laundering step*: Bitquery reports Squid bridge and THORChain payouts to Ethereum attacker addresses; OAK's own reads on Ethereum match this).

**Attribution:** **unattributed.** Bitquery says its wallet attribution rests on wallet behaviour and not on confirmed identity (relayed, not a verbatim quote); no source names an actor. Compare the earlier Polymarket / Magic Labs cases under the same Technique: [`examples/2024-09-polymarket-magic-labs-takeover.md`](2024-09-polymarket-magic-labs-takeover.md), and the cohort page [`examples/2024-2026-embedded-wallet-and-trader-tooling-supply-chain-cohort.md`](2024-2026-embedded-wallet-and-trader-tooling-supply-chain-cohort.md).

**Key teaching point:** **A "log in with Google" wallet is only as safe as the provider's key infrastructure, and an app that keeps working money in one has no second control.** Keplr's own guidance after the event was to move liquid assets to a recovery-phrase or hardware-wallet account. Treasuries and recurring payment wallets should not sit on a social-login wallet, and a provider that can sweep wallets in an emergency can also be the party that must prove it has no shared key path.

## Summary

Web3Auth supplies key management for the Google and Apple login option in the Keplr wallet. Bitquery found the first theft on 2026-11-01 at 17:13 UTC: a Keplr wallet on Celestia sent TIA through the Squid bridge to an Ethereum address the attacker controls. Theft grew from 2026-11-05. On 2026-11-06 at 21:13 UTC Web3Auth said it was "aware of a security issue affecting Web3Auth's services used by some third parties" and paused its embedded wallet service. Keplr warned users at 04:38 UTC on 2026-11-07 and paused Google/Apple login. Web3Auth swept at-risk wallets into recovery wallets using the same path as the attacker, which Bitquery first read as theft and then corrected. The attacker was still active at 12:05 UTC on 2026-11-12, the latest transaction Bitquery saw. Neither company has explained how the flaw worked, when it was first used, or whether the route is closed (The Hacker News, relayed).

## Timeline (UTC)

Stages: **Flaw** (undisclosed), **Take** (theft from social-login wallets), **Money** (bridges, THORChain payouts, hub address), **Response** (pause, rescue sweeps, warnings). Times for rows marked "traced by OAK" are from OAK's own Ethereum reads on 2026-11-26; "relayed" rows are from a page summarised by a fetch tool that OAK could not quote and are paraphrased.

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-01 17:13 (undisclosed) | A flaw in Web3Auth infrastructure exposes private keys, or the ability to sign, for Keplr wallets created with Google or Apple login. What leaked and how are not published. Keplr's co-founder said on 2026-11-07 that "This was not a hack of Keplr's code. The incident originated at Web3Auth, a provider Keplr uses." and that about 20% of Google/Apple accounts looked affected. | **T11.008** |
| Undisclosed | Attacker preparation (how the flaw was found or used, funding) is not published. | — |
| 2026-11-01 17:13 | First theft found by Bitquery: a Keplr wallet on Celestia sends TIA to an Ethereum attacker-controlled address via the Squid bridge. Within two hours the same wallet sends more TIA to an exchange with a memo (relayed from Bitquery; exchange not named). | **T11.008**, T7.003 |
| 2026-11-05 01:18 | The attacker's Celestia wallet begins collecting funds. Bitquery names 2026-11-05 and the next day as the worst before the rescue (relayed). | **T11.008** |
| 2026-11-05 07:43 – 07:54 | Ethereum: THORChain's router pays out ETH to attacker address [`0xeaaa5fca4c7daa7bb99b3ece6da68040f916d857`](https://etherscan.io/address/0xeaaa5fca4c7daa7bb99b3ece6da68040f916d857), including 6.73429616 ETH in tx [`0x75ba64aa1b709855311f080539f9322b27b58a07de579702b1dffca2f02ca95b`](https://etherscan.io/tx/0x75ba64aa1b709855311f080539f9322b27b58a07de579702b1dffca2f02ca95b) and 11.14340232 ETH in tx [`0xc0340504087734bf01adc2a325fcb628b97d380f3aaba7f8254b53684abc6dec`](https://etherscan.io/tx/0xc0340504087734bf01adc2a325fcb628b97d380f3aaba7f8254b53684abc6dec). 22.555491 ETH arrives from the router in 9 transfers in the data the tool returned. Traced by OAK. | **T7.003** |
| 2026-11-05 08:01 – 12:00 | the address above forwards ETH to Bitquery's "main hub" [`0x531f1d541fec4a6a6439e7651620f66f8d854c1d`](https://etherscan.io/address/0x531f1d541fec4a6a6439e7651620f66f8d854c1d): 30.7 ETH in tx [`0xdbe9cf45e381527d2d7b76df5a01c7775f14cf98be8906d6b3e9321a8de13ca3`](https://etherscan.io/tx/0xdbe9cf45e381527d2d7b76df5a01c7775f14cf98be8906d6b3e9321a8de13ca3) and 7.05 ETH in tx [`0x4944125003867435f52e2b4d6d1fffa4cb402888b39b780bb1f3713f70e368ef`](https://etherscan.io/tx/0x4944125003867435f52e2b4d6d1fffa4cb402888b39b780bb1f3713f70e368ef), then 0.85 and 0.1035 ETH. A 78 ETH transfer goes hub to the address above and straight back at 12:07 (a round trip, not counted). Traced by OAK. | — |
| 2026-11-05 15:48 – 2026-11-07 | Many small ETH deposits (typically about 0.2 ETH each) from the contract named `SquidMulticall` ([`0xad6cea45f98444a922a2b4fe96b8c90f0862d2f4`](https://etherscan.io/address/0xad6cea45f98444a922a2b4fe96b8c90f0862d2f4)) reach GoPlus-listed addresses [`0xeeb6a049c69eb1ffe98745260b563b8edd1af29c`](https://etherscan.io/address/0xeeb6a049c69eb1ffe98745260b563b8edd1af29c) (first: tx [`0x70f5b8e5da43ecb95be281c59567e1815a335c5024ff4e15dab81e124ad50171`](https://etherscan.io/tx/0x70f5b8e5da43ecb95be281c59567e1815a335c5024ff4e15dab81e124ad50171) at 15:48:11 on 11-05), [`0x08b7173a877e2ac83727550a5a355ae89aaf3e23`](https://etherscan.io/address/0x08b7173a877e2ac83727550a5a355ae89aaf3e23) and [`0x191679e0cbce09216383255a2a6e90eea59dea6d`](https://etherscan.io/address/0x191679e0cbce09216383255a2a6e90eea59dea6d). Each of the three sends ETH on to the hub (for example 4.9455 ETH in 9 transfers from the first address named in this row). Traced by OAK; that the Squid deposits are bridge fills for stolen Cosmos assets is Bitquery's description, not read in the transactions. | **T7.003** |
| 2026-11-06 20:52 | Web3Auth's first rescue sweep begins, per Bitquery (relayed). | response |
| 2026-11-06 21:13:33 | Web3Auth posts that it is "aware of a security issue affecting Web3Auth's services used by some third parties", has "temporarily paused the embedded wallet service" and has "found no evidence that MetaMask users are impacted". | response |
| 2026-11-07 04:38:41 | Keplr posts that it has "received reports of unauthorized transactions on some Keplr accounts created with Google or Apple login", pauses Google/Apple login, and says recovery-phrase and hardware-wallet accounts are not affected. | response |
| 2026-11-07 (status page) | Web3Auth's status page logs that the Login Service was put into maintenance mode "due to a security incident" (relayed; the page gives no root cause). | response |
| 2026-11-07 08:29:22 | Keplr's co-founder posts that this is not a hack of Keplr's code, estimates about 20% of Google/Apple accounts affected, and writes "only a fraction of that 20% has actually been exploited". | response |
| 2026-11-07 15:38 | Per Bitquery, Web3Auth's recovery wallets hold \$6.0M from at least 44,041 Keplr wallets on seven Cosmos chains plus Injective, swept over about 18 hours (relayed). Bitquery says about 86% of the swept wallets were emptied after Keplr's warning (via The Hacker News, relayed). | response |
| 2026-11-07 16:53:17 | Web3Auth posts: "Following our earlier update, we have identified a security issue in Web3Auth infrastructure affecting certain embedded wallets used by Keplr." | response |
| 2026-11-07 17:06:36 | Web3Auth: "We are aware that some of these transactions have been mistaken for activity by the attacker. Funds recovered through this process are safe". Its quoted post of 17:06:35 says it began "whitehat recovery activities targeting vulnerable but not yet impacted wallets utilizing the same path of the original attacker." | response |
| 2026-11-07 17:17:34 | Keplr: "In response to Web3Auth's infrastructure vulnerability leading to private key breach some Keplr users who signed in with Google or Apple, we are assisting the Web3Auth team's effort to secure and protect assets from affected users." Some accounts "may already show a reduced or empty balance" from these mitigation efforts. | response |
| 2026-11-08 06:23:55 | Web3Auth: "we have been transferring assets into secure recovery wallets, with assistance from Keplr." Keplr's 06:31:35 post lists the recovery addresses Web3Auth verified (below). | response |
| 2026-11-09 04:49 | GoPlus (Chinese post) lists five attacker EVM addresses and says at least about \$1M was stolen and about \$6M was moved to official recovery addresses (paraphrased). | — |
| 2026-11-10 20:00 | Web3Auth sweeps Hyperliquid accounts; that evening a recovery-address twin receives from 31 accounts, six already drained by the attacker (relayed from Bitquery). | response |
| 2026-11-11 – 2026-11-26 | Hub [`0x531f1d541fec4a6a6439e7651620f66f8d854c1d`](https://etherscan.io/address/0x531f1d541fec4a6a6439e7651620f66f8d854c1d) keeps receiving and sending ETH, including 3.30162776 ETH to [`0xe221edb737c3c21e7a012e202dee1d5e538b3828`](https://etherscan.io/address/0xe221edb737c3c21e7a012e202dee1d5e538b3828) in tx [`0xfbf56ec02e2c9bddfc719e9f7edaa3cfbb3020e202dba93957e6853f4928dbf6`](https://etherscan.io/tx/0xfbf56ec02e2c9bddfc719e9f7edaa3cfbb3020e202dba93957e6853f4928dbf6) on 11-11 and a 14.43050173 ETH Squid deposit on 11-20. Whether this is new theft or old funds is undisclosed. Traced by OAK; the tool returned only the latest 86 transfers. | — |
| 2026-11-12 12:05 | Latest attacker transaction Bitquery saw; its investigation is dated 2026-11-12 (relayed). | — |
| 2026-11-19 12:16 | CALC says it "lost 99.9888% of our operational treasury via the @Web3Auth hack with only 0.0112% being recovered", and that using "a @keplrwallet hot wallet" was needed "to make regular payment for our offchain infra". SlowMist's tracker lists \$26,900 (relayed). | **T11.008** |

Key addresses (attacker, as published by GoPlus 2026-11-09; first four also checked on Ethereum by OAK):

- Attacker EVM, Bitquery "main hub" — [`0x531f1d541fec4a6a6439e7651620f66f8d854c1d`](https://etherscan.io/address/0x531f1d541fec4a6a6439e7651620f66f8d854c1d)
- Attacker EVM — [`0xeaaa5fca4c7daa7bb99b3ece6da68040f916d857`](https://etherscan.io/address/0xeaaa5fca4c7daa7bb99b3ece6da68040f916d857)
- Attacker EVM — [`0x08b7173a877e2ac83727550a5a355ae89aaf3e23`](https://etherscan.io/address/0x08b7173a877e2ac83727550a5a355ae89aaf3e23)
- Attacker EVM — [`0xeeb6a049c69eb1ffe98745260b563b8edd1af29c`](https://etherscan.io/address/0xeeb6a049c69eb1ffe98745260b563b8edd1af29c)
- Attacker EVM — [`0x191679e0cbce09216383255a2a6e90eea59dea6d`](https://etherscan.io/address/0x191679e0cbce09216383255a2a6e90eea59dea6d)
- Further EVM addresses Bitquery lists (not read by OAK): `0x6fdf784a9d67a3e07b406cf1d84ee268285d17e0`, `0x52f9105cce507825890cefe8aeafd6f02c9ed5ff`, `0x01a969169e3e01d371b5283d7162229df7516bfd` (Arbitrum)
- Attacker Cosmos (Bitquery, Osmosis; not checkable with OAK's tool): `osmo1qpxdzl5hcu8qjk6g5yfyr2mr7079zlsx6hnx29`, `osmo1msjpr3kdzymxrsfce3tlhzhjujxkna7qse2qjm`, `osmo19tzwf85z433xx20h0xksuq66xrfp0kq8zfxdk8`, `osmo1njt4xwv4k8a3ucngxvz405gvc29y4t3jfyk92m`, `osmo189t7qnpl88ghqxru8t6tjsl4j0uwrhq0a2zqhn`, `osmo1pu6a24nleg297je6azm8sffetknjwyrn0hqnu0`, `osmo1w05lm0ng2y6wfthhwtqsmuc7xx83j7r4q43dxa`. Bitquery says the attacker also holds addresses on Akash, Celestia, Cosmos Hub, Noble, THORChain and Injective that it does not list.
- Bridge or router the attacker's funds passed through (traced by OAK) — SquidMulticall [`0xad6cea45f98444a922a2b4fe96b8c90f0862d2f4`](https://etherscan.io/address/0xad6cea45f98444a922a2b4fe96b8c90f0862d2f4); THORChain Router [`0xd37bbe5744d730a1d98d8dc97c42f0ca46ad7146`](https://etherscan.io/address/0xd37bbe5744d730a1d98d8dc97c42f0ca46ad7146)

Web3Auth recovery wallets, **not attacker addresses** (verified by Web3Auth per Keplr's 2026-11-08 06:31:35 post; Cosmos addresses not checkable with OAK's tool): EVM `0x413e4F4De7E5FF010913488F781E679e76f706dA`; Cosmos Hub `cosmos1atuap9kfnt6y8ykvn3437e7j3z8qffh3qtnmwu`; Osmosis `osmo1atuap9kfnt6y8ykvn3437e7j3z8qffh3gsqtcw`; Celestia `celestia1atuap9kfnt6y8ykvn3437e7j3z8qffh33pzt53`; Akash `akash1atuap9kfnt6y8ykvn3437e7j3z8qffh3ds7uhx`; Noble `noble1atuap9kfnt6y8ykvn3437e7j3z8qffh3ggxnkj`; Injective `inj1lqmdmuczn5rxn5jkc34wwrqdeh70etpf5wvt7g`; dYdX `dydx1atuap9kfnt6y8ykvn3437e7j3z8qffh3fjalwt`; Babylon `bbn1atuap9kfnt6y8ykvn3437e7j3z8qffh3h4z239`; Axelar `axelar1atuap9kfnt6y8ykvn3437e7j3z8qffh3y99n9a`; Saga `saga1atuap9kfnt6y8ykvn3437e7j3z8qffh37c2ff6`; Agoric `agoric1atuap9kfnt6y8ykvn3437e7j3z8qffh3jk3y72`. Bitquery also lists recovery addresses on Atone, ZetaChain and Terra, not repeated here. Do not treat transfers into these as theft.

Address-poisoning warning: OAK saw fake "ETH" tokens and zero-value transfers between the hub and lookalike addresses such as `0x5318d51b3a88212e928abe9a2a0836679f854c1d` (against `0x531f1d541fec4a6a6439e7651620f66f8d854c1d`). OAK dropped counterfeit-token transfers from the trace; check the full address before using any of the above.

## Fund flow

Traced by OAK on 2026-11-26 with `tools/explorer.py`. Ethereum edges are `verified: oak` and are a sample of the first large movements, not the full flow. Cosmos, Hyperliquid and recovery-wallet edges relay Bitquery and are not traced by OAK.

```oak-flow
as_of: 2026-11-26T13:00Z
nodes:
  - {id: vic, chain: cosmos, role: victim, label: "Keplr Google/Apple-login wallets (7,842 Cosmos wallets per Bitquery)"}
  - {id: rec, chain: cosmos, role: returned, label: "Web3Auth recovery wallets (rescue, not attacker; 44,041+ wallets swept)"}
  - {id: sq, chain: ethereum, address: 0xad6cea45f98444a922a2b4fe96b8c90f0862d2f4, role: bridge, label: "SquidMulticall"}
  - {id: tcr, chain: ethereum, address: 0xd37bbe5744d730a1d98d8dc97c42f0ca46ad7146, role: bridge, label: "THORChain Router"}
  - {id: a1, chain: ethereum, address: 0xeaaa5fca4c7daa7bb99b3ece6da68040f916d857, role: attacker-receiver, label: "Attacker address (GoPlus, Bitquery)"}
  - {id: a2, chain: ethereum, address: 0xeeb6a049c69eb1ffe98745260b563b8edd1af29c, role: attacker-receiver, label: "Attacker address (GoPlus)"}
  - {id: hub, chain: ethereum, address: 0x531f1d541fec4a6a6439e7651620f66f8d854c1d, role: attacker-holding, label: "Attacker main hub (Bitquery)"}
  - {id: w1, chain: ethereum, address: 0xe221edb737c3c21e7a012e202dee1d5e538b3828, role: intermediary, label: "Onward wallet"}
  - {id: w2, chain: ethereum, address: 0x9b7a1a8cb43deaf2715e1ce6ca08f7829f05cd52, role: intermediary, label: "Onward wallet"}
edges:
  - {from: vic, to: sq, asset: TIA, verified: source, source: bitquery2026}
  - {from: vic, to: rec, asset: ATOM, verified: source, source: bitquery2026}
  - {from: tcr, to: a1, asset: ETH, amount: 6.73429616, tx: 0x75ba64aa1b709855311f080539f9322b27b58a07de579702b1dffca2f02ca95b, time: 2026-11-05T07:53:47Z, technique: T7.003, verified: oak}
  - {from: tcr, to: a1, asset: ETH, amount: 11.14340232, tx: 0xc0340504087734bf01adc2a325fcb628b97d380f3aaba7f8254b53684abc6dec, time: 2026-11-05T07:54:47Z, technique: T7.003, verified: oak}
  - {from: a1, to: hub, asset: ETH, amount: 30.7, tx: 0xdbe9cf45e381527d2d7b76df5a01c7775f14cf98be8906d6b3e9321a8de13ca3, time: 2026-11-05T08:01:35Z, verified: oak}
  - {from: a1, to: hub, asset: ETH, amount: 7.05, tx: 0x4944125003867435f52e2b4d6d1fffa4cb402888b39b780bb1f3713f70e368ef, time: 2026-11-05T09:07:11Z, verified: oak}
  - {from: sq, to: a2, asset: ETH, amount: 0.20540005, tx: 0x70f5b8e5da43ecb95be281c59567e1815a335c5024ff4e15dab81e124ad50171, time: 2026-11-05T15:48:11Z, technique: T7.003, verified: oak}
  - {from: hub, to: w1, asset: ETH, amount: 3.30162776, tx: 0xfbf56ec02e2c9bddfc719e9f7edaa3cfbb3020e202dba93957e6853f4928dbf6, time: 2026-11-11T14:44:23Z, verified: oak}
  - {from: hub, to: w2, asset: ETH, amount: 1.76564957, tx: 0x5c4ce4b14de5015a0b596a56c7786c3a5bf20be5f83a08f730e9abfcb908ae4b, time: 2026-11-11T14:58:11Z, verified: oak}
```

## What is not known yet

- What leaked (key shares, session material, a signing path), how, and since when: **undisclosed.** Neither Web3Auth nor Keplr has published a post-mortem in the sources OAK read; Web3Auth's status page gives no root cause (relayed).
- Whether the route is closed and Google/Apple login is restored: not stated in the sources read.
- Which other Web3Auth integrators were affected: Web3Auth says other services are affected but has named only Keplr (The Hacker News, relayed).
- Final loss: GoPlus (about \$1M floor) and Bitquery (\$1.82M floor, \$1.68M low case) are not reconciled, and the attacker was still active when Bitquery stopped counting. The CALC figure (\$26,900) is SlowMist's tracker entry and is probably already inside the wallet counts.
- The exchange that received memo-tagged deposits on 2026-11-01 and 11-02 is not named by Bitquery.
- Whether returned or recovered funds will be paid back to users: Web3Auth says it is working with Keplr "on a path to recovery"; no date or method is given.

## Root-cause evidence

- **Technique:** OAK-T11.008
- **Source:** <https://x.com/Web3Auth/status/2119110953975635985>; <https://x.com/keplrwallet/status/2119117067500806350>; <https://bitquery.io/investigations/keplr-wallet-hack>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** Confirmed for the class only. Web3Auth (the provider) states a security issue in its infrastructure affecting embedded wallets used by Keplr, and Keplr (the wallet operator) states an infrastructure vulnerability at Web3Auth led to a private key breach for Google/Apple-login users; Keplr's co-founder says Keplr's own code was not hacked. That fits T11.008, where the provider's key path is the custody surface. The flaw itself, the data that leaked, and the first-exploit date are undisclosed, so the mechanism is not established. Bitquery's on-chain counts and GoPlus's addresses are third-party analysis, so figures and attacker attribution are `reported`, never `confirmed`.

## Public references

- `[web3authx2026]` — Web3Auth on X, posts of 2026-11-06 21:13, 2026-11-07 16:53 and 17:06, 2026-11-08 06:23: <https://x.com/Web3Auth/status/2118814067359969745>, <https://x.com/Web3Auth/status/2119110953975635985>, <https://x.com/Web3Auth/status/2119114305475854345>, <https://x.com/Web3Auth/status/2119314957057871935>
- `[keplrx2026]` — Keplr on X, posts of 2026-11-07 04:38 and 17:17: <https://x.com/keplrwallet/status/2118926087615045807>, <https://x.com/keplrwallet/status/2119117067500806350>
- `[keplrcofounderx2026]` — Keplr co-founder on X (cited by role), 2026-11-07: <https://x.com/dogemos/status/2118984142151196677>
- `[goplusx2026]` — GoPlus (Chinese) on X, 2026-11-09, attacker addresses; embeds Keplr's 2026-11-08 06:31 recovery-address post: <https://x.com/GoPlusZH/status/2119653595234832716>
- `[calcx2026]` — CALC Finance on X, 2026-11-19: <https://x.com/CALC_Finance/status/2123389827576123413>
- `[bitquery2026]` — Bitquery, "Keplr wallet hack" investigation (2026-11-12): <https://bitquery.io/investigations/keplr-wallet-hack>
- `[thehackernews2026]` — The Hacker News, "Web3Auth flaw exploited to steal Keplr wallet funds" (2026-11-09): <https://thehackernews.com/2026/11/web3auth-flaw-exploited-to-steal-keplr.html>
- `[web3authstatus2026]` — Web3Auth status page, event log: <https://status.web3auth.io/events.md>
- `[slowmist2026]` — SlowMist Hacked, CALC entry (2026-11-19): <https://hacked.slowmist.io/>
