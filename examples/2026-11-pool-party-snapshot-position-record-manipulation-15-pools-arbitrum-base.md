# Pool Party — an attacker changed a recorded position in a pool's snapshot contract, deposited 10 USDC and withdrew the pool's funds, across 15 pools — Pool Party / Arbitrum and Base — 2026-11-13

**Loss:** **~\$215,000** (Pool Party: "The total loss is approximately \$215k."). Pool Party offered a 10% bounty and asked for "approximately \$193,500 in USDC or ETH" back (on-chain message). No return is documented in the sources OAK read. Reimbursement of users is undisclosed.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*, per RektRadar's paraphrase of the operator: each pool has a snapshot contract that records user positions, and the attacker "changed their recorded position, deposited 10 USDC, and withdrew the funds from the pool". The caller used public entrypoints; what failed was the record of how much they were owed, not who could call. The exact flawed function and condition are undisclosed by the operator. A secondary tracer's sequence is Add Liquidity (10 USDC) → `syncInvestor()` → Withdraw.) See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md). **OAK-T7.002** (CEX Deposit Layering — only as far as Defimon states that an instant exchange, CCE Cash, paid out Pool Party funds to a third address). **OAK-T7.003** (Cross-Chain Bridge Laundering — inferred and unconfirmed: a Base transfer and a similar-sized Arbitrum receipt two seconds apart). **OAK-T7.005** (Privacy-Chain Hops — only as RektRadar reports "funds converted toward XMR"; OAK did not trace this leg).

**Attribution:** **unattributed** (the operator published the attacker address [`0x2075c17abbd077cf6406736bb7047ed446ab7f8f`](https://arbiscan.io/address/0x2075c17abbd077cf6406736bb7047ed446ab7f8f); no source attributes it to a named actor).

**Key teaching point:** **A position record that decides how much a user may withdraw must be written only by the pool's own deposit and withdraw paths, and the pool must check on every withdrawal that the amount does not exceed what that user's deposits actually funded.** Here a 10 USDC deposit was enough to withdraw a pool's funds, so a per-withdrawal bound or a solvency check on the recorded position would have stopped the first pool. The exact write path that let the record be changed is undisclosed.

## Summary

Pool Party said on X that "between 01:34 and 03:38 UTC, an attacker drained 15 pools: 12 on Arbitrum and 3 on Base" on 2026-11-13, at about \$215k total, and that pools on Polygon and Robinhood Chain were not affected. The post is timestamped 18:23:10 UTC on 2026-11-13. Earlier, at 18:13:27 UTC, Defimon relayed an on-chain message from the Pool Party team to the exploiter offering a 10% bounty. RektRadar (secondary) reports that a fix was deployed on all four chains the same day. The operator thread OAK could read carries no technical post-mortem. OAK traced the attacker's USDC movements on Arbitrum and Base (below): repeated 10 USDC outflows from the attacker followed by large USDC inflows from a few addresses, and one 202,705.465993 USDC transfer at 03:37:59 to a relay wallet.

## Timeline (UTC)

**Flaw** (undisclosed when introduced) → **Take** (2026-11-13 01:34–03:38 per the operator; OAK's earliest USDC transfer on the attacker address is 01:36:30) → **Money** (relay wallet, then reported conversion toward XMR) → **Response** (bounty message, fix). All times 2026-11-13 and from the operator, Defimon or OAK's explorer pull; stated per row.

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-13 01:34 (undisclosed) | Each pool has a snapshot contract recording user positions; the record could be altered in a way that inflated what the attacker could withdraw. Exact flaw and when deployed are undisclosed. | **T9.016** |
| 2026-11-13 before 01:34 | No funding transaction for the attacker address was found by OAK in the pulled window (native-ETH sends were not listable; the RPC returned a state error). Attacker funding is undisclosed. | — |
| 2026-11-13 01:34–03:38 (operator window) | Attacker drains 15 pools: 12 on Arbitrum and 3 on Base. RektRadar's secondary tracer describes the loop Add Liquidity (10 USDC) → `syncInvestor()` → Withdraw. | **T9.016** |
| 2026-11-13 01:36:30 | First USDC transfer on the attacker address on Arbitrum (traced by OAK): 10.000592 USDC from [`0x6f38e884725a116c9c7fbf208e79fe8828a2595f`](https://arbiscan.io/address/0x6f38e884725a116c9c7fbf208e79fe8828a2595f), tx [`0x13fffc93cbcadc9f8a9ddd47150a31cd4c5d3371d543f966f7e67f3a1334ab40`](https://arbiscan.io/tx/0x13fffc93cbcadc9f8a9ddd47150a31cd4c5d3371d543f966f7e67f3a1334ab40). At 01:37:46 the attacker sends 10 USDC to [`0x90b5f4d2aeca515d368bb73e4b3cd4155dcb42d3`](https://arbiscan.io/address/0x90b5f4d2aeca515d368bb73e4b3cd4155dcb42d3), tx [`0x6a4682d7def57a090ddab9f74b2611be6e7f14381cd89bc203e6f08aecde2250`](https://arbiscan.io/tx/0x6a4682d7def57a090ddab9f74b2611be6e7f14381cd89bc203e6f08aecde2250); the same 10 USDC pattern repeats many times. OAK did not decode these as pool calls. | **T9.016** |
| 2026-11-13 02:22:47 | Representative large payout on Arbitrum (traced by OAK): 72,050.680047 USDC from [`0xc6962004f452be9203591991d15f6b388e09e8d0`](https://arbiscan.io/address/0xc6962004f452be9203591991d15f6b388e09e8d0) to the attacker, tx [`0xa871632b699a0bf53d4801662c9bd0bd93781b27afe8db3f9f81661251566e3b`](https://arbiscan.io/tx/0xa871632b699a0bf53d4801662c9bd0bd93781b27afe8db3f9f81661251566e3b). That address paid the attacker in many transactions; no source names it as a Pool Party pool. | **T9.016** |
| 2026-11-13 03:15:35 | Representative Base payout (traced by OAK): 4,140.516045 USDC from [`0xd0b53d9277642d899df5c87a3966a349a798f224`](https://basescan.org/address/0xd0b53d9277642d899df5c87a3966a349a798f224) to the attacker, tx [`0x23788769fc6200756b71e2c26ac9f09a0bebc691a047d7e04529105a4042fee7`](https://basescan.org/tx/0x23788769fc6200756b71e2c26ac9f09a0bebc691a047d7e04529105a4042fee7). | **T9.016** |
| 2026-11-13 03:34:21–03:34:23 | Base: attacker sends 12,026.219482 USDC to [`0x50cfe7c1938db66a1a6d2e86d36f39fbef3d5c4a`](https://basescan.org/address/0x50cfe7c1938db66a1a6d2e86d36f39fbef3d5c4a), tx [`0xfea3550aae89039b8e48517bd8537400cbc4fe9be21e1e40cfff03f56e0ad720`](https://basescan.org/tx/0xfea3550aae89039b8e48517bd8537400cbc4fe9be21e1e40cfff03f56e0ad720). Two seconds later on Arbitrum the attacker receives 11,996.153934 USDC from [`0x8b5d51af4c4542f241c4e54cfd903ceed145f082`](https://arbiscan.io/address/0x8b5d51af4c4542f241c4e54cfd903ceed145f082), tx [`0xa676217692dd76627b62608fc9eab33ab663c7e1230f51af957c836a5dbdc7fd`](https://arbiscan.io/tx/0xa676217692dd76627b62608fc9eab33ab663c7e1230f51af957c836a5dbdc7fd). The timing and size suggest a cross-chain move of the Base proceeds; no source confirms it and OAK did not identify the bridge. | T7.003 (inferred, unconfirmed) |
| 2026-11-13 03:37:59 | Exit on Arbitrum (traced by OAK): attacker sends 202,705.465993 USDC to the relay wallet [`0x4bf62a3da5c8d8488bc7b5bb3856940c026a15ac`](https://arbiscan.io/address/0x4bf62a3da5c8d8488bc7b5bb3856940c026a15ac) named by RektRadar, tx [`0xa42ce4bc063fde9ab2af3cbb0ede58cad599d9a90fa2fef8d5e1098846f28eae`](https://arbiscan.io/tx/0xa42ce4bc063fde9ab2af3cbb0ede58cad599d9a90fa2fef8d5e1098846f28eae). Onward path from the relay is not traced by OAK; RektRadar says funds went toward XMR and cites a secondary tracer's USDC leg of \$212,705 (a different figure from the transfer above). | T7.005 (per RektRadar, untraced) |
| 2026-11-13 04:58 | Defimon: [`0xd40b1c59f3f0f17203cb443fddd6b92c4734233b`](https://etherscan.io/address/0xd40b1c59f3f0f17203cb443fddd6b92c4734233b) "received 115,056.36 DAI from CCE Cash", which "paid it with funds stolen in the Pool Party exploit" (citing an FBI IC3 report). Per the message, the recipient may be an ordinary counterparty; it is not stated to be the attacker. | T7.002 (per Defimon) |
| 2026-11-13 18:13:27 | On-chain message from the Pool Party team to the attacker address: 10% bounty, return the rest to [`0x524d0A20EDFD36adD3a5eF5f5939958dF098B149`](https://arbiscan.io/address/0x524d0A20EDFD36adD3a5eF5f5939958dF098B149) within 24 hours, no legal action if returned; tx [`0x991c1766f529d44de7700e06b7e219cd07612faae76b1c64eedfc6dcf195f950`](https://arbiscan.io/tx/0x991c1766f529d44de7700e06b7e219cd07612faae76b1c64eedfc6dcf195f950). | response |
| 2026-11-13 18:23:10 | Pool Party discloses the incident on X (12 Arbitrum and 3 Base pools; Polygon and Robinhood Chain not affected). RektRadar reports the fix was deployed across all four chains the same day; OAK did not find that statement in the operator post it could read. | response |
| 2026-11-14 05:58:22 | Defimon relays a second on-chain message to [`0xd40b1c59f3f0f17203cb443fddd6b92c4734233b`](https://etherscan.io/address/0xd40b1c59f3f0f17203cb443fddd6b92c4734233b), tx [`0x7dee32d62b118e29865d1886b2dda5e64ba8594c6415195201434459ff431bc5`](https://etherscan.io/tx/0x7dee32d62b118e29865d1886b2dda5e64ba8594c6415195201434459ff431bc5), asking the owner to come forward. | response |

Key addresses:

- Attacker (published by the operator) — [`0x2075c17abbd077cf6406736bb7047ed446ab7f8f`](https://arbiscan.io/address/0x2075c17abbd077cf6406736bb7047ed446ab7f8f)
- Relay wallet (RektRadar; received 202,705.465993 USDC, traced by OAK) — [`0x4bf62a3da5c8d8488bc7b5bb3856940c026a15ac`](https://arbiscan.io/address/0x4bf62a3da5c8d8488bc7b5bb3856940c026a15ac)
- Base transfer destination (12,026.219482 USDC, traced by OAK) — [`0x50cfe7c1938db66a1a6d2e86d36f39fbef3d5c4a`](https://basescan.org/address/0x50cfe7c1938db66a1a6d2e86d36f39fbef3d5c4a)
- Recipient of DAI from CCE Cash (per Defimon; role unknown) — [`0xd40b1c59f3f0f17203cb443fddd6b92c4734233b`](https://etherscan.io/address/0xd40b1c59f3f0f17203cb443fddd6b92c4734233b)
- Operator's bounty return address — [`0x524d0A20EDFD36adD3a5eF5f5939958dF098B149`](https://arbiscan.io/address/0x524d0A20EDFD36adD3a5eF5f5939958dF098B149)
- Pool and snapshot contract addresses — undisclosed (not published in the sources read)

OAK's pull of the attacker's USDC transfers on Arbitrum (2026-11-13 01:36:30 to 04:20:04) sums to 203,010.47 USDC in and 203,010.47 out; the Base pull (01:00–05:00) shows about 12,056 USDC of larger inbound payouts. These do not add to the operator's \$215k (and the Base proceeds appear to have been moved to Arbitrum, so would be double-counted); other assets, addresses or valuation differences are possible and unresolved.

## Fund flow

```oak-flow
as_of: 2026-11-17T00:00Z
nodes:
  - {id: payer, chain: arbitrum, address: 0xc6962004f452be9203591991d15f6b388e09e8d0, role: unknown, label: "Address paying large USDC to attacker (not named as a pool by any source)"}
  - {id: bpay, chain: base, address: 0xd0b53d9277642d899df5c87a3966a349a798f224, role: unknown, label: "Base address paying USDC to attacker (not named as a pool by any source)"}
  - {id: atk, chain: arbitrum, address: 0x2075c17abbd077cf6406736bb7047ed446ab7f8f, role: attacker-eoa, label: "Attacker (operator-published)"}
  - {id: batk, chain: base, address: 0x2075c17abbd077cf6406736bb7047ed446ab7f8f, role: attacker-eoa, label: "Attacker, Base"}
  - {id: bdst, chain: base, address: 0x50cfe7c1938db66a1a6d2e86d36f39fbef3d5c4a, role: intermediary, label: "Base transfer destination"}
  - {id: relay, chain: arbitrum, address: 0x4bf62a3da5c8d8488bc7b5bb3856940c026a15ac, role: attacker-holding, label: "Relay wallet (RektRadar)"}
edges:
  - {from: payer, to: atk, asset: USDC, amount: 72050.680047, tx: 0xa871632b699a0bf53d4801662c9bd0bd93781b27afe8db3f9f81661251566e3b, time: 2026-11-13T02:22:47Z, technique: T9.016, verified: oak}
  - {from: bpay, to: batk, asset: USDC, amount: 4140.516045, tx: 0x23788769fc6200756b71e2c26ac9f09a0bebc691a047d7e04529105a4042fee7, time: 2026-11-13T03:15:35Z, technique: T9.016, verified: oak}
  - {from: batk, to: bdst, asset: USDC, amount: 12026.219482, tx: 0xfea3550aae89039b8e48517bd8537400cbc4fe9be21e1e40cfff03f56e0ad720, time: 2026-11-13T03:34:21Z, verified: oak}
  - {from: atk, to: relay, asset: USDC, amount: 202705.465993, tx: 0xa42ce4bc063fde9ab2af3cbb0ede58cad599d9a90fa2fef8d5e1098846f28eae, time: 2026-11-13T03:37:59Z, verified: oak}
```

Only the representative payouts, the Base outflow and the exit are drawn. The onward path from the relay (reported toward XMR) is not traced by OAK.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/PoolParty_xyz/status/2121307902430359906>; <https://www.rektradar.xyz/web3-daily-exploits-14-nov-2026-poolparty-215k-snapshot/>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** The operator's post states the incident, the 15 pools, the window and the loss; it does not describe the mechanism in the text OAK read. The mechanism (per-pool snapshot contracts recording user positions; a changed recorded position, a 10 USDC deposit, then a withdrawal; sequence Add Liquidity → `syncInvestor()` → Withdraw) comes from RektRadar, which paraphrases the team and a secondary tracer on 2026-11-14. A same-day secondary source cannot make this `confirmed`. Unknown: the flawed function, why the record could be changed, whether the 15 pools share one contract version, and the fix. No operator post-mortem was found.

## Public references

- `[poolparty2026x]` — Pool Party (@PoolParty_xyz), "Security incident at Pool Party" (2026-11-13): <https://x.com/PoolParty_xyz/status/2121307902430359906>
- `[defimon2026bounty]` — Defimon (@DefimonAlerts), relay of on-chain bounty message (2026-11-13): <https://x.com/DefimonAlerts/status/2121305457885053280>
- `[defimon2026cce]` — Defimon (@DefimonAlerts), on-chain message on CCE Cash DAI payout (2026-11-14): <https://x.com/DefimonAlerts/status/2121482855398215788>
- `[rektradar2026pp]` — RektRadar, "Web3 Daily Exploits — 14 Nov 2026: Pool Party ~\$215K Snapshot" (2026-11-14): <https://www.rektradar.xyz/web3-daily-exploits-14-nov-2026-poolparty-215k-snapshot/>
