# Fusionist — a privileged bridge-minter EOA minted unbacked ACE on BNB Chain, and the still-open bridge then paid real ACE to traders — Fusionist ACE bridge (Endurance ↔ BNB Chain) / BNB Chain, Endurance — 2026-11-22

**Loss:** **~\$5.7M combined**, per Rekt Radar, in two separate legs. (1) The minter's own sales: **~\$2M** in USDT/ETH per The Block and Rekt Radar; Blockaid's earlier figure was ~\$1.04M "so far", and Defimon's figure for one 15,000,000 ACE mint was ~\$1.29M. (2) Opportunistic redemptions: **~53.7M real ACE (~\$3.7M)** paid out of the Endurance-side bridge reserves to about 24 addresses, per The Block. Recovery: none reported. Gate rolled back ACE/USDT spot trades for a window and other exchanges paused ACE deposits and withdrawals, per The Block and Fusionist. Rekt Radar says the final net loss is not yet published.

**OAK Techniques observed:** **OAK-T11.014** (Operator Privileged-Key Compromise — *primary*, per Defimon's reading; unconfirmed by the operator). The bridge's `mint()` on the BNB Chain `RemoteTokenBridge` is role-gated and was not changed. An EOA holding the `FINANCE_VALIDATOR` role called it with valid authority, in sizes far outside its history. Whether the key was stolen or abused by someone with legitimate access is undisclosed. See [`techniques/T11.014-operator-privileged-key-compromise.md`](../techniques/T11.014-operator-privileged-key-compromise.md). **OAK-T7.001** (Mixer-Routed Hop) and **OAK-T7.003** (Cross-Chain Bridge Laundering) for the proceeds, per Onchain Lens and The Block. The second leg (traders redeeming cheap unbacked ACE for real ACE) maps to no OAK Technique: it is not an attacker action but the bridge paying out one-for-one on tokens that the mint had made worthless as backing. OAK does not stretch a Technique over it.

**Attribution:** **unattributed.** The minting EOA is [`0x3f1045210a80a375d6C7CBAD57800D5e8f30F34E`](https://bscscan.com/address/0x3f1045210a80a375d6C7CBAD57800D5e8f30F34E) (Defimon; OAK confirmed it sent the mint transactions). No firm has named an actor. The redeeming traders are pseudonymous and are not alleged to have had any link to the minter.

**Key teaching point:** **A mint key must not be able to create more supply than the bridge holds in backing, and the bridge must stop redeeming when supply and backing diverge.** Two controls were missing: a per-window mint cap enforced in the token contract so one role cannot mint 10 quintillion units, and a circuit breaker on the Endurance side that halts releases when BNB Chain supply exceeds the locked reserve. The second would have kept the ~\$3.7M of reserves in place after the first mint.

## Summary

On 2026-11-22 an EOA holding the `FINANCE_VALIDATOR` role on Fusionist's BNB Chain `RemoteTokenBridge` began minting ACE with no matching deposit on the Endurance side. OAK's trace shows the first mint at 17:55:40 UTC and a final mint of 10,000,000,000,000,000,000 ACE at 20:28:02 UTC. The minter sold each batch into BNB Chain pools for USDT, then moved ETH through SwftSwap and Relay toward Tornado Cash. Meanwhile the bridge stayed open. Traders bought the collapsing BNB Chain ACE for a fraction of a cent, sent it back through the bridge, and received real ACE from the Endurance-side reserves: about 53.7M ACE to about 24 addresses, per The Block. Blockaid flagged the exploit at 19:08 UTC and Fusionist posted its alert at 19:30 UTC. How the minter key was reached is undisclosed.

## Timeline (UTC)

**Flaw** is the single-key mint authority; **preparation** is the 2-year routine-mint history; **execution** is the mint burst; **take** is the sale and the separate redemption wave; **money** is the proceeds; **response** is the pause and exchange actions. Mint times are from OAK's on-chain check; other times are from the cited posts. The Block's times are in US Eastern (EST, UTC−5) and are converted here.

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-22 (undisclosed) | The BNB Chain `RemoteTokenBridge` (proxy [`0x9d0698d9a6d01f1409ac56c5adf62547b0055915`](https://bscscan.com/address/0x9d0698d9a6d01f1409ac56c5adf62547b0055915)) lets one EOA holding `FINANCE_VALIDATOR` mint wrapped ACE with no on-chain cap tied to bridge backing. The EOA was funded by the project's deployer nearly three years earlier (The Block) and made small routine mints for about two years (Defimon). | **T11.014** |
| Before 2026-11-22 17:55 (undisclosed) | The key is stolen or misused. The method is unconfirmed (Rekt Radar). | **T11.014** |
| 2026-11-22 17:55:40 | First mint in the burst: 3,461,538.46153846 ACE to [`0x5d66ea1d453630ad28469d3bc6e26fd039e96c00`](https://bscscan.com/address/0x5d66ea1d453630ad28469d3bc6e26fd039e96c00), tx [`0x4dfe4bc1bf011cd02e1119ae04341c605c4880c9c807a3f044c5917cbd3964ec`](https://bscscan.com/tx/0x4dfe4bc1bf011cd02e1119ae04341c605c4880c9c807a3f044c5917cbd3964ec). | **T11.014** |
| 2026-11-22 17:55:43 | 15,000,000 ACE minted to [`0x34254f54572480f7c38ee7c5639b068262549cf6`](https://bscscan.com/address/0x34254f54572480f7c38ee7c5639b068262549cf6), tx [`0xa2509eb48412184ba4bce5995fd1731ae308c22e6f2bba69daf04c3891d9cb1f`](https://bscscan.com/tx/0xa2509eb48412184ba4bce5995fd1731ae308c22e6f2bba69daf04c3891d9cb1f). Defimon counts about 60M ACE to 14 fresh wallets in about 9 blocks (13 × 3,461,538 plus this one). | **T11.014** |
| 2026-11-22 17:55 → 20:28 | Mints grow from billions to trillions to quadrillions (The Block, as returned by a summarising fetch; OAK could not open the page directly, HTTP 403); each batch is sold into BNB Chain DEX pools for USDT as it is minted. Blockaid at 19:08: "~\$1.04M extracted in USDT so far across dozens of txs". | **T11.014** |
| 2026-11-22 20:28:02 | Largest mint: 10,000,000,000,000,000,000 ACE to [`0x1029aa6abbb46c88c3b1f668757184f64d9e12c5`](https://bscscan.com/address/0x1029aa6abbb46c88c3b1f668757184f64d9e12c5), tx [`0xb5dccc1d7c4c4dd6ebdadb544e6bd21bc29852c56cc0aff22fcac30751f3c3b5`](https://bscscan.com/tx/0xb5dccc1d7c4c4dd6ebdadb544e6bd21bc29852c56cc0aff22fcac30751f3c3b5). | **T11.014** |
| 2026-11-22 18:13 → 20:05 | Opportunistic leg: the Endurance bridge contract [`0xf3310e3f0D46FF5EE7daB69C73452D0ff3979Bed`](https://explorer.endurance.fusionist.io/address/0xf3310e3f0D46FF5EE7daB69C73452D0ff3979Bed) (explorer URL not given by the source; address per The Block) pays about 53.7M real ACE to 24 addresses, one receiving 26.1M. Traders had bought BNB Chain ACE at about \$0.0001 against about \$0.04 on exchanges (The Block). The bridge ended with 0.08 ACE; 27 further transfers of about 1.36B ACE failed. | — (no OAK Technique fits) |
| 2026-11-22 (after the sales) | Proceeds move BNB Chain → Ethereum via SwftSwap and Relay; Onchain Lens reports 1,091.5 ETH (~\$1.87M) laundered through Tornado Cash, The Block traces about 1,150 ETH (~\$2M). Addresses not published; OAK did not trace this leg. | **T7.003**, **T7.001** |
| 2026-11-22 17:55 → 19:15 | Gate rolls back ACE/USDT spot trades for this window, sets ACE perpetuals to reduce-only and plans to delist (The Block, Rekt Radar). | response |
| 2026-11-22 19:30:20 | Fusionist: "We're investigating an apparent ongoing exploit involving ACE on BSC. Please pause ACE transfers, trades, and bridging on BSC" ([post](https://x.com/fusionistio/status/2124586293812461578)). | response |
| 2026-11-23 08:26:36 | Fusionist: working with CEXs to trace funds; "Exchanges that support ACE have temporarily paused ACE deposits and withdrawals" ([post](https://x.com/fusionistio/status/2124781651737841784)). No post-mortem or key-rotation statement found. | response |

Key addresses:

- Minter EOA, holder of `FINANCE_VALIDATOR` (sender of all three checked mint txs) — [`0x3f1045210a80a375d6C7CBAD57800D5e8f30F34E`](https://bscscan.com/address/0x3f1045210a80a375d6C7CBAD57800D5e8f30F34E)
- `RemoteTokenBridge` proxy (BNB Chain) — [`0x9d0698d9a6d01f1409ac56c5adf62547b0055915`](https://bscscan.com/address/0x9d0698d9a6d01f1409ac56c5adf62547b0055915). Defimon says the implementation (short form 0x25d3 to dc10, full address not published) is unchanged.
- ACE token (BNB Chain) — [`0xc27A719105A987b4c34116223CAE8bd8F4B5def4`](https://bscscan.com/address/0xc27A719105A987b4c34116223CAE8bd8F4B5def4)
- Mint recipients checked by OAK — see timeline.
- Endurance-side bridge contract — [`0xf3310e3f0D46FF5EE7daB69C73452D0ff3979Bed`](https://explorer.endurance.fusionist.io/address/0xf3310e3f0D46FF5EE7daB69C73452D0ff3979Bed)
- Example trader wallet (The Block, one of the redeemers) — [`0x307701862b5fB61ba8a4c792BE8eF49aF0E73494`](https://bscscan.com/address/0x307701862b5fB61ba8a4c792BE8eF49aF0E73494)

## Fund flow

BNB Chain mints traced by OAK with `tools/explorer.py` on 2026-11-26, three transactions only. Each shows ACE minted from the zero address to the recipient in a call that `0x3f1045210a80a375d6C7CBAD57800D5e8f30F34E` sent to the bridge proxy; the edges are drawn from the proxy for that reason. OAK did not trace the sales, the Ethereum leg, the Tornado Cash deposits or the Endurance-side redemptions: addresses for those are not in the sources read and the Endurance explorer is not covered by `tools/explorer.py`.

```oak-flow
as_of: 2026-11-26T12:00Z
nodes:
  - {id: atk, chain: bsc, address: 0x3f1045210a80a375d6c7cbad57800d5e8f30f34e, role: attacker-eoa, label: "Minter EOA (FINANCE_VALIDATOR)"}
  - {id: vic, chain: bsc, address: 0x9d0698d9a6d01f1409ac56c5adf62547b0055915, role: vulnerable-contract, label: "RemoteTokenBridge proxy"}
  - {id: r1, chain: bsc, address: 0x5d66ea1d453630ad28469d3bc6e26fd039e96c00, role: attacker-receiver, label: "Mint recipient 1"}
  - {id: r2, chain: bsc, address: 0x34254f54572480f7c38ee7c5639b068262549cf6, role: attacker-receiver, label: "Mint recipient 2"}
  - {id: r3, chain: bsc, address: 0x1029aa6abbb46c88c3b1f668757184f64d9e12c5, role: attacker-receiver, label: "Mint recipient 3"}
edges:
  - {from: vic, to: r1, asset: ACE, amount: 3461538.46153846, tx: 0x4dfe4bc1bf011cd02e1119ae04341c605c4880c9c807a3f044c5917cbd3964ec, time: 2026-11-22T17:55:40Z, technique: T11.014, verified: oak}
  - {from: vic, to: r2, asset: ACE, amount: 15000000, tx: 0xa2509eb48412184ba4bce5995fd1731ae308c22e6f2bba69daf04c3891d9cb1f, time: 2026-11-22T17:55:43Z, technique: T11.014, verified: oak}
  - {from: vic, to: r3, asset: ACE, amount: 10000000000000000000, tx: 0xb5dccc1d7c4c4dd6ebdadb544e6bd21bc29852c56cc0aff22fcac30751f3c3b5, time: 2026-11-22T20:28:02Z, technique: T11.014, verified: oak}
```

## Root-cause evidence

- **Technique:** OAK-T11.014
- **Source:** <https://x.com/DefimonAlerts/status/2124693273897746461>; <https://x.com/blockaid_/status/2124580794144322035>; <https://www.theblock.co/news/defi/2026-11-22-a-2-million-exploit-leads-to-a-3-7-million-free-for-all-as-traders-empty-fusionists-ace-bridge-444838>; <https://x.com/fusionistio/status/2124586293812461578>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** Defimon says the bridge's authorised minter EOA `0x3f1045210a80a375d6C7CBAD57800D5e8f30F34E`, holder of `FINANCE_VALIDATOR`, minted after about two years of small routine mints, that the implementation is unchanged and `mint()` is still role-gated, and so reads the event as a compromised or abused minter key. Blockaid independently says "A privileged token-bridge minter minted unbacked ACE and sold it for USDT". OAK's own check confirms the minter EOA sent the three mint transactions it looked at, and that the 10-quintillion mint came at 20:28:02 UTC. The operator's posts confirm an exploit and the pause, but do not state the mechanism. These are same-day third-party analyses, so this is not `confirmed`. Not established: how the key was reached (theft, insider use or other), the total minted, and why the Endurance side kept paying out. Sources disagree on mint scale: Defimon describes about 60M ACE in the first burst; Onchain Lens says over 6 trillion and The Block says up to 10 quintillion. OAK's check supports the larger single mint.

## Public references

- `[fusionistalert2026]` — Fusionist (operator), security alert (2026-11-22 19:30 UTC): <https://x.com/fusionistio/status/2124586293812461578>
- `[fusionistupdate2026]` — Fusionist (operator), security update (2026-11-23 08:26 UTC): <https://x.com/fusionistio/status/2124781651737841784>
- `[blockaidfusionist2026]` — Blockaid, exploit alert (2026-11-22 19:08 UTC): <https://x.com/blockaid_/status/2124580794144322035>
- `[defimonfusionist2026]` — Defimon, loss alert: <https://x.com/DefimonAlerts/status/2124693273897746461>
- `[onchainlensfusionist2026]` — Onchain Lens (2026-11-22 19:52 UTC): <https://x.com/OnchainLens/status/2124591924938162389>
- `[theblockfusionist2026]` — The Block, "A \$2 million exploit leads to a \$3.7 million free-for-all as traders empty Fusionist's ACE bridge" (2026-11-22): <https://www.theblock.co/news/defi/2026-11-22-a-2-million-exploit-leads-to-a-3-7-million-free-for-all-as-traders-empty-fusionists-ace-bridge-444838>
- `[rektradarfusionist2026]` — Rekt Radar, "Web3 Daily Exploits, 23 Nov 2026" (2026-11-23): <https://www.rektradar.xyz/web3-daily-exploits-23-nov-2026-fusionist-ace-5-7m-bridge-mint/>
