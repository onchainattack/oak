# Across Protocol — social engineering of the domain registrar (Namecheap) handed an attacker across.to, which served a wallet-drainer frontend — Across / Ethereum, Arbitrum, Base, BNB Chain, Optimism, Ink, Plasma — 2026-11-10

**Loss:** **~\$350K** per GoPlus (relayed by The Block: "total user losses are estimated at \$350,000"), and **~\$402K** (\$401,900) per Bitquery's own on-chain trace ("taken from 9 wallets on five chains between 19:02 and 21:53 UTC"). The two figures do not agree: Bitquery says the widely shared \$294K matches the drainer-kit seller's fee wallet balance, and its v1 total was \$348K before it found an ether sweep and raised it to \$402K. Across did not publish a total; it said "All affected users will be made whole." Nothing is recorded as frozen or returned in the sources read.

**OAK Techniques observed:** **OAK-T15.004** (Operator-Side Credential Compromise, registrar / DNS sub-shape — *primary*, operator-stated). Across: "a social engineering attack on @Namecheap (our domain registrar) gave a bad actor control of the Across domain." The pretext targeted the registrar's own staff or process, not Across personnel, and the control that would have stopped it sits at the registrar layer. See [`techniques/T15.004-operator-credential-compromise.md`](../techniques/T15.004-operator-credential-compromise.md). **OAK-T4.002** (Compromised Front-End Permit Solicitation — the hijacked domain served a phishing frontend that, per RektRadar, "prompted users to sign token approvals, Permit2 authorizations, or EIP-2612 permits"). See [`techniques/T4.002-compromised-frontend-permit-solicitation.md`](../techniques/T4.002-compromised-frontend-permit-solicitation.md). **OAK-T7.003** (Cross-Chain Bridge Laundering — Bitquery traces the thief's ETH through Relay, deBridge, LI.FI, Chainflip and THORChain). See [`techniques/T7.003-cross-chain-bridge-laundering.md`](../techniques/T7.003-cross-chain-bridge-laundering.md).

**Attribution:** **unattributed.** No source names an actor. Bitquery tracks a thief wallet ([`0x2846e69d3298e99eddf2fd8116e952844da11fde`](https://etherscan.io/address/0x2846e69d3298e99eddf2fd8116e952844da11fde)) and a separate drainer-kit fee wallet ([`0x0c7c656126aa62625fdd8051eb69dc14aee8d37b`](https://etherscan.io/address/0x0c7c656126aa62625fdd8051eb69dc14aee8d37b)); the kit is a rented service, so the seller and the operator of the hijack are different parties. Bitquery says the thief wallet "was busy only during the hijack", which is its inference.

**Key teaching point:** **Put registrar-level change control on every domain that serves a wallet-connecting app: a registry lock, so that nameserver and record changes need an out-of-band confirmation the registrar's support staff cannot waive, plus alerts on any NS or A-record change.** Across says its domain "was fully locked down with best-in-class security practices" and that the takeover "should not have been possible", so the weak point was the registrar's process, which the protocol could not inspect. Until that is shown to be closed, treat the registrar as part of your trust boundary and keep a fast path (SEAL 911, wallet blocklists, DNS provider) to take the domain out of service.

Unrelated prior incident: OAK already holds a different Across event, the July 2026 Solana relayer forgery of Anchor deposit events ([`examples/2026-07-across-solana-relayer-anchor-event-discriminator-forgery.md`](2026-07-across-solana-relayer-anchor-event-discriminator-forgery.md)). That was an off-chain relayer verification flaw. This incident did not touch Across's contracts, relayers or API; the two share only the protocol name.

## Summary

At about 18:45 UTC on 2026-11-10, per Across, a social engineering attack on its registrar Namecheap gave a bad actor control of across.to. For about three hours the domain led to a copy of the app that asked connecting wallets to sign approvals and permits. Across's first alert is dated 19:05:59 UTC. Across says it was alerted within 15 minutes of the attack, that SEAL 911 marked the site as phishing with major wallets, and that Cloudflare marked the domain at risk and later pulled its DNS records. It says no third-party integrations or API users were affected. Across also says Namecheap "has been unresponsive" while the domain was down. Across restored the domain at 01:16:45 UTC on 2026-11-11 with help from the Namecheap founder. Bitquery traced nine drained wallets from 19:02 to 21:53 UTC, an 80/20 split of each token drain between a thief wallet and a drainer-kit fee wallet, and a cash-out of the thief's ETH into Hyperliquid XMR1, Solana and Bitcoin. The registrar-side mechanism (which account, which staff process, which pretext) is undisclosed; Across promised a post-mortem.

## Timeline (UTC)

Stages: **Entry** (registrar), **Execution** (phishing frontend and signatures), **Money** (split, consolidation, cash-out), **Response**. Times for Across's posts come from the fxtwitter API; drain and cash-out times are Bitquery's, except the rows marked "traced by OAK".

| When | What happened | OAK |
|---|---|---|
| ~2026-11-10 18:45 (Across's stated time; exact method undisclosed) | Social engineering of Namecheap gives the attacker control of the across.to domain. Across: "a social engineering attack on @Namecheap (our domain registrar) gave a bad actor control of the Across domain." The registrar staff or process involved, and the pretext, are undisclosed. | **T15.004** |
| 2026-11-10 from ~18:45 | across.to is pointed at a copy of the app that runs a wallet drainer. Per RektRadar it prompted signatures for "token approvals, Permit2 authorizations, or EIP-2612 permits"; per The Block, "fake token approvals or permits designed to drain wallets". Bitquery says the fake site asked for each chain where a wallet held money in turn. | **T4.002** |
| 2026-11-10 19:02 | First drain in Bitquery's window (the window runs 19:02 to 21:53, nine wallets, Ethereum, Arbitrum, Base, BNB Chain, Optimism). The first drain Bitquery found landed on Arbitrum. GoPlus lists Ink and Plasma as well; Bitquery has no transfer data for chains it does not cover. | **T4.002** |
| 2026-11-10 19:05:59 | [Across](https://x.com/AcrossProtocol/status/2120231513459433747): "We're currently investigating an issue with the Across domain. Do NOT visit the app, connect your wallet, or sign any transaction or approval there until further notice." | response |
| 2026-11-10 19:56:59 | Ether sweep, traced by OAK: [`0xdd40b19abb1a00862aa443dc1d674b80c08a9b084094236bffce747243ad7f0e`](https://etherscan.io/tx/0xdd40b19abb1a00862aa443dc1d674b80c08a9b084094236bffce747243ad7f0e), an ERC-4337 `handleOps` bundle, moves 26.37531849 ETH from [`0xdbd7fbe5b7cd56f99c059dc24052009d2626125c`](https://etherscan.io/address/0xdbd7fbe5b7cd56f99c059dc24052009d2626125c) to the collector [`0x3ef438c34ce51a697a24247fe033c4562c94f0fd`](https://etherscan.io/address/0x3ef438c34ce51a697a24247fe033c4562c94f0fd). Bitquery: the collector kept 5% and passed the rest to payout address [`0xa0e6c7d79b74d1a6d366dd11309b6faafda05ac5`](https://etherscan.io/address/0xa0e6c7d79b74d1a6d366dd11309b6faafda05ac5), which sent 20.95 ETH to the thief by 20:06. | **T4.002** |
| 2026-11-10 20:09:23 | Aave pull, traced by OAK: [`0x2610f11fd3cde7113f83e7137853972ba98d8360b3d91eed6d5807f947a8bd38`](https://etherscan.io/tx/0x2610f11fd3cde7113f83e7137853972ba98d8360b3d91eed6d5807f947a8bd38) moves aWETH from the victim [`0x42e7AB48D5ae0ED6941A89492D1c5Dfb06B8483c`](https://etherscan.io/address/0x42e7AB48D5ae0ED6941A89492D1c5Dfb06B8483c): 115.23141856629925 aWETH to the thief and 28.807854641574814 aWETH to the fee wallet (exactly 80/20). Bitquery: the depositor signed a permit and the pull was repeated in four steps over three minutes; it counts \$304.5K for 148.60 aWETH, 76% of its total. | **T4.002** |
| 2026-11-10 20:11 to 20:17 | Per Bitquery the thief swaps aWETH for ETH through UniswapX (20:11), brings tokens from the other chains to Ethereum via Relay and deBridge, and gathers ~\$299K of ETH in a new splitting wallet. Traced by OAK, 20:17:59: [`0x19c5460db37f5cc2bde6f8f644892a5348a1519d2aa97f720091e982134a8ae1`](https://etherscan.io/tx/0x19c5460db37f5cc2bde6f8f644892a5348a1519d2aa97f720091e982134a8ae1) sends 146.26868582 ETH from the thief to the splitting wallet [`0x38d7e8b3c9561caf096c06c62c7561f8ab6e514c`](https://etherscan.io/address/0x38d7e8b3c9561caf096c06c62c7561f8ab6e514c). | **T7.003** |
| 2026-11-10 20:48 to 21:57 | Per Bitquery the ETH leaves Ethereum by three routes: about \$100K via LI.FI to Arbitrum and then USDC into Hyperliquid, bought as XMR1 (21:06, 21:31); about \$100K into Chainflip at 21:11, arriving on Solana as SOL at 21:14, held about two and a half hours, then sent shortly before midnight in two parts to a Solana wallet Bitquery's labels mark as the Rainbet casino hot wallet (an inference; "No public record names it"); about \$96K into THORChain at 20:51, paid out as 1.305 BTC at 22:36 to a new Bitcoin address, unspent when checked. | **T7.003** |
| 2026-11-10 21:37 to 22:13:54 | SolanaFloor's \$294K post (21:37, per Bitquery's chart). [Across](https://x.com/AcrossProtocol/status/2120278803318489362) states the takeover time, the SEAL 911 and Cloudflare actions, and that the domain remains down because Namecheap "has been unresponsive". | response |
| 2026-11-11 01:16:45 | [Across](https://x.com/AcrossProtocol/status/2120324818385912082): "Across is fully restored, and all systems are operational." The Namecheap founder helped secure the account and opened an investigation; "All affected users will be made whole"; a post-mortem is to follow. | response |

Key addresses:

- Thief wallet (80% of each token drain; funded the splitting wallet) — [`0x2846e69d3298e99eddf2fd8116e952844da11fde`](https://etherscan.io/address/0x2846e69d3298e99eddf2fd8116e952844da11fde)
- Drainer-kit fee wallet (20% of each token drain; active since 25 September per Bitquery) — [`0x0c7c656126aa62625fdd8051eb69dc14aee8d37b`](https://etherscan.io/address/0x0c7c656126aa62625fdd8051eb69dc14aee8d37b)
- Splitting wallet (received 146.27 ETH at 20:17) — [`0x38d7e8b3c9561caf096c06c62c7561f8ab6e514c`](https://etherscan.io/address/0x38d7e8b3c9561caf096c06c62c7561f8ab6e514c)
- Largest victim, Aave depositor (aWETH) — [`0x42e7AB48D5ae0ED6941A89492D1c5Dfb06B8483c`](https://etherscan.io/address/0x42e7AB48D5ae0ED6941A89492D1c5Dfb06B8483c)
- Ether-sweep victim — [`0xdbd7fbe5b7cd56f99c059dc24052009d2626125c`](https://etherscan.io/address/0xdbd7fbe5b7cd56f99c059dc24052009d2626125c)
- Ether-sweep collector (kept 5%) — [`0x3ef438c34ce51a697a24247fe033c4562c94f0fd`](https://etherscan.io/address/0x3ef438c34ce51a697a24247fe033c4562c94f0fd)
- Ether-sweep payout address (sent the thief 20.95 ETH) — [`0xa0e6c7d79b74d1a6d366dd11309b6faafda05ac5`](https://etherscan.io/address/0xa0e6c7d79b74d1a6d366dd11309b6faafda05ac5)
- Side wallet (holds 11.64 ETH per Bitquery) — [`0xa490cde73adcd40475025ee8710f3a5ab7393194`](https://etherscan.io/address/0xa490cde73adcd40475025ee8710f3a5ab7393194)
- Sent ETH to the two Hyperliquid wallets — [`0xf10a482fbc02195f2dafca5d9dfd19c871b0f4a5`](https://etherscan.io/address/0xf10a482fbc02195f2dafca5d9dfd19c871b0f4a5)
- Sent ETH to Chainflip — [`0x0f67a21780699bb5c5e6b5f986c0bab26bfffe5c`](https://etherscan.io/address/0x0f67a21780699bb5c5e6b5f986c0bab26bfffe5c)
- Hyperliquid wallets holding XMR1 — [`0x09360fe2e18fdfa49beb7592b9f24f94c5465533`](https://etherscan.io/address/0x09360fe2e18fdfa49beb7592b9f24f94c5465533) and [`0xf229f808fe21911f8bcc24ebb30a85bd2e4c00f0`](https://etherscan.io/address/0xf229f808fe21911f8bcc24ebb30a85bd2e4c00f0)
- Got 3.43 ETH from the thief at 01:20 UTC on 11 November — [`0xbca05d20dbb271fd607e69fdc8d955be3bfc8120`](https://etherscan.io/address/0xbca05d20dbb271fd607e69fdc8d955be3bfc8120)
- Solana wallet that got 1,197 SOL — [`G47n6dbUor1WFweLvKPrUi5beW4yjRoFG3cJZU6a4uSa`](https://solscan.io/account/G47n6dbUor1WFweLvKPrUi5beW4yjRoFG3cJZU6a4uSa)
- Bitcoin address that got 1.305 BTC from THORChain, unspent when checked — [`3EQ9Rqrtvco4nKmskv2jQRXvWKkpUGfAQs`](https://mempool.space/address/3EQ9Rqrtvco4nKmskv2jQRXvWKkpUGfAQs)

Bitquery also lists a Solana "likely Rainbet deposit address" and a "Rainbet hot wallet, by our labels"; these are Bitquery's labels and are not reproduced as confirmed addresses here. The other seven victim wallets are given by Bitquery only in shortened form and are omitted rather than shortened.

## Fund flow

Traced by OAK: the three Ethereum transactions above. Relayed from Bitquery (`[bitquery2026]`): the onward routes and amounts. Bitquery's balances were read on 11 November and "Later moves are not covered."

```oak-flow
as_of: 2026-11-12T00:00Z
nodes:
  - {id: vic, chain: ethereum, address: 0x42e7AB48D5ae0ED6941A89492D1c5Dfb06B8483c, role: victim, label: "Aave depositor (largest victim)"}
  - {id: vic2, chain: ethereum, address: 0xdbd7fbe5b7cd56f99c059dc24052009d2626125c, role: victim, label: "Ether-sweep victim"}
  - {id: col, chain: ethereum, address: 0x3ef438c34ce51a697a24247fe033c4562c94f0fd, role: intermediary, label: "Collector (5%)"}
  - {id: thief, chain: ethereum, address: 0x2846e69d3298e99eddf2fd8116e952844da11fde, role: attacker-eoa, label: "Thief wallet"}
  - {id: fee, chain: ethereum, address: 0x0c7c656126aa62625fdd8051eb69dc14aee8d37b, role: attacker-receiver, label: "Drainer-kit fee wallet"}
  - {id: split, chain: ethereum, address: 0x38d7e8b3c9561caf096c06c62c7561f8ab6e514c, role: attacker-holding, label: "Splitting wallet"}
  - {id: cf, chain: ethereum, role: bridge, label: "Chainflip"}
  - {id: tc, chain: ethereum, role: bridge, label: "THORChain"}
  - {id: sol, chain: solana, address: G47n6dbUor1WFweLvKPrUi5beW4yjRoFG3cJZU6a4uSa, role: attacker-holding, label: "Solana wallet (1,197 SOL)"}
  - {id: btc, chain: bitcoin, address: 3EQ9Rqrtvco4nKmskv2jQRXvWKkpUGfAQs, role: attacker-holding, label: "Bitcoin address (unspent)"}
edges:
  - {from: vic, to: thief, asset: aWETH, amount: 115.23141856629925, tx: 0x2610f11fd3cde7113f83e7137853972ba98d8360b3d91eed6d5807f947a8bd38, time: 2026-11-10T20:09:23Z, technique: T4.002, verified: oak}
  - {from: vic, to: fee, asset: aWETH, amount: 28.807854641574814, tx: 0x2610f11fd3cde7113f83e7137853972ba98d8360b3d91eed6d5807f947a8bd38, time: 2026-11-10T20:09:23Z, technique: T4.002, verified: oak}
  - {from: vic2, to: col, asset: ETH, amount: 26.37531849, tx: 0xdd40b19abb1a00862aa443dc1d674b80c08a9b084094236bffce747243ad7f0e, time: 2026-11-10T19:56:59Z, technique: T4.002, verified: oak}
  - {from: thief, to: split, asset: ETH, amount: 146.26868582, tx: 0x19c5460db37f5cc2bde6f8f644892a5348a1519d2aa97f720091e982134a8ae1, time: 2026-11-10T20:17:59Z, technique: T7.003, verified: oak}
  - {from: split, to: cf, asset: ETH, amount: 48.81, time: 2026-11-10T21:11:00Z, technique: T7.003, verified: source, source: bitquery2026}
  - {from: split, to: tc, asset: ETH, amount: 47.00, time: 2026-11-10T20:51:00Z, technique: T7.003, verified: source, source: bitquery2026}
  - {from: cf, to: sol, asset: SOL, amount: 1197, time: 2026-11-10T21:14:00Z, technique: T7.003, verified: source, source: bitquery2026}
  - {from: tc, to: btc, asset: BTC, amount: 1.305, time: 2026-11-10T22:36:00Z, technique: T7.003, verified: source, source: bitquery2026}
```

Not drawn as edges: about \$100K as XMR1 on the two Hyperliquid wallets above (Bitquery: "179.4 XMR1"; "still held XMR1 worth about \$101K" early on 11 November), the Solana-to-casino step, about \$35K still on Ethereum, and the 3.43 ETH sent at 01:20 UTC on 11 November. The 1,197 SOL is the amount Bitquery's address list gives for the Solana wallet; its route from the Chainflip step is Bitquery's reading.

## Root-cause evidence

- **Technique:** OAK-T15.004 (primary); OAK-T4.002; OAK-T7.003
- **Source:** <https://x.com/AcrossProtocol/status/2120278803318489362>; <https://x.com/AcrossProtocol/status/2120324818385912082>; <https://www.theblock.co/news/defi/2026-11-11-crosschain-protocol-across-restores-systems-after-domain-hijack-437843>; <https://www.rektradar.xyz/web3-daily-exploits-11-nov-2026-across-350k-domain-hijack/>; <https://bitquery.io/investigations/across-protocol-domain-hijack>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** Confidence applies to the hijack and its entry point as the operator states them; the loss figures, the permit and Permit2 mechanics and the cash-out are only reported. Across states the entry point ("a social engineering attack on @Namecheap (our domain registrar) gave a bad actor control of the Across domain") and the response. That settles the vector at the operator level. Not established: who at Namecheap or which process was deceived, what the pretext was, and why a domain Across calls "fully locked down" could be moved; Across promised a post-mortem that OAK has not seen. The permit and Permit2 detail is from RektRadar (secondary) and The Block ("fake token approvals or permits"); Bitquery adds that the largest victim signed a permit on aWETH. Loss is disputed between GoPlus (~\$350K) and Bitquery (\$401,900). OAK traced three Ethereum transactions itself; Bitquery's onward routes and its labels (including the casino) are not independently re-traced.

## Public references

- `[acrossalert2026]` — Across (@AcrossProtocol), initial alert (2026-11-10 19:05:59 UTC): <https://x.com/AcrossProtocol/status/2120231513459433747>
- `[acrossdetail2026]` — Across (@AcrossProtocol), domain takeover statement (2026-11-10 22:13:54 UTC): <https://x.com/AcrossProtocol/status/2120278803318489362>
- `[acrossrestored2026]` — Across (@AcrossProtocol), restoration (2026-11-11 01:16:45 UTC): <https://x.com/AcrossProtocol/status/2120324818385912082>
- `[theblock2026]` — The Block, "Crosschain protocol Across restores systems after domain hijack" (2026-11-11): <https://www.theblock.co/news/defi/2026-11-11-crosschain-protocol-across-restores-systems-after-domain-hijack-437843>
- `[rektradar20261111]` — RektRadar (secondary), "Web3 daily exploits 11 Nov 2026: Across \$350K domain hijack": <https://www.rektradar.xyz/web3-daily-exploits-11-nov-2026-across-350k-domain-hijack/>
- `[bitquery2026]` — Bitquery, "Across Protocol Domain Hijack: \$402K Drained From 9 Wallets" (2026-11-10, on-chain figures verified 2026-11-12): <https://bitquery.io/investigations/across-protocol-domain-hijack>
