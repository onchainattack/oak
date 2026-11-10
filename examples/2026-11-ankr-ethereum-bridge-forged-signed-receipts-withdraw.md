# Ankr — Ethereum bridge released funds against five forged but validly signed receipts that reused one Optimism deposit — Ankr cross-chain bridge / Ethereum (source chain Optimism) — 2026-11-09

**Loss:** **~\$304.5K** per SlowMist (other monitors differ: PeckShield ~\$286K, Blockaid ~\$292K, The Defiant ~\$303.6K). Assets released by the bridge: ankrETH (82.91110563), ANKR (7,982,766.47849233), ankrMATIC (515,206.2557414), aPOLb (5,372.24876584) and aETHb (0.81962323), traced by OAK in the five attack transactions. Most of it was swapped to ETH and sent on to Tornado Cash. Recovery: none reported. Ankr reimbursement: no statement found as of 2026-11-10.

**OAK Techniques observed:** **OAK-T10.002** (Message-Verification Bypass — *primary*, per SlowMist. `withdraw()` on the Ethereum bridge accepted receipts whose recipient, token and amounts did not match the source-chain event, because it trusted a consensus-signer signature and did not check the receipt against the real Optimism event. See [`techniques/T10.002-message-verification-bypass.md`](../techniques/T10.002-message-verification-bypass.md)). **OAK-T7.007** (DEX Aggregator Routing Laundering — ankrETH and ANKR sold through a MetaMask swap router in about 30 small swaps). **OAK-T7.001** (Mixer-Routed Hop — 113.7 ETH deposited into Tornado Cash in 12 deposits, traced by OAK). **OAK-T10.001** (Validator / Signer Key Compromise) is *not established*: SlowMist says the origin of the signatures is under investigation.

**Attribution:** **unattributed.** Attacker EOA [`0x9A88Dd45AE846A979705c9cFdfD0f229e592D703`](https://etherscan.io/address/0x9A88Dd45AE846A979705c9cFdfD0f229e592D703) (tx sender) and recipient [`0x119D250b82C1cf5345dF5912EFb4B1a4107a1Aa6`](https://etherscan.io/address/0x119D250b82C1cf5345dF5912EFb4B1a4107a1Aa6), per SlowMist. No firm has named an actor.

**Key teaching point:** **A bridge release must be bound to the source-chain event, not only to a signature.** `withdraw()` should recompute the receipt fields (recipient, token, amount, source tx hash and log index) from a proof of the source-chain event, or from an independent second attester, and mark the source tx as consumed once. Here five receipts with different recipients, tokens and amounts all pointed to one small, already-redeemed Optimism deposit; a one-time consume check on the source tx hash, or a per-token and per-window release cap, would have stopped the second call.

## Summary

On 2026-11-09 an attacker sent five `withdraw` calls to the Ethereum side of Ankr's cross-chain bridge. Each call carried a receipt that referenced the same legitimate Optimism transaction (a small 0.0044 ankrETH deposit dated 2026-11-03 that had already been redeemed), but with the recipient, token and amount changed. All five receipts carried valid signatures from the bridge's trusted consensus signer, so the contract released the bridge's locked inventory of five tokens to one new wallet. Blockaid flagged the exploit as ongoing at 08:42 UTC, SlowMist published the root cause and addresses, and PeckShield reported most of the funds swapped to about 103 ETH by 09:55 UTC.

The part nobody has published is how the signer produced signatures over receipts that do not match any real deposit: SlowMist says signer compromise is not confirmed, and Ankr has published no post-mortem that OAK could find. This file is therefore `reported`, not `confirmed`. Ankr's 2022 bridge-adjacent incident ([2022-12 Ankr deployer-key compromise](2022-12-ankr.md)) is a different mechanism and is linked as related only.

## Timeline (UTC)

**Entry** is the undisclosed point where the signer signed forged receipts; **preparation** is funding of the receiver; **execution** is five `withdraw` transactions; **funds** are swaps and Tornado deposits traced by OAK; **response** is what the public record shows. Transaction times are from OAK's on-chain trace; later times are from the cited posts.

| When | What happened | OAK |
|---|---|---|
| 2026-11-03 (source tx time not verified by OAK) | A legitimate 0.0044 ankrETH deposit is made on Optimism in [`0x02e805b51beb4ed39e6a66ffcbdf9060cf008b3c3f0e827d0d357dfa115e7d4a`](https://optimistic.etherscan.io/tx/0x02e805b51beb4ed39e6a66ffcbdf9060cf008b3c3f0e827d0d357dfa115e7d4a) and redeemed on Ethereum. This is the deposit later reused. | — |
| Before 2026-11-09 08:09 (undisclosed) | The bridge's consensus signer signs five receipts that do not match the source event. How is undisclosed; signer compromise is not confirmed. | **T10.002** (T10.001 not established) |
| 2026-11-09 05:13:11 | The receiver is funded with 110.35897066 POL from [`0x9846c1f06d2f0e7c4678aeea56eb826efe41bb9a`](https://etherscan.io/address/0x9846c1f06d2f0e7c4678aeea56eb826efe41bb9a) in [`0x139e3e30b2993b96aec206e168d299d1678cf05a57c58d90593cf6c7b5f6d3e8`](https://etherscan.io/tx/0x139e3e30b2993b96aec206e168d299d1678cf05a57c58d90593cf6c7b5f6d3e8). Funder of that address not traced. | — |
| 2026-11-09 08:09:35 | `withdraw` releases 82.91110563 ankrETH: [`0x7310af5d53e08259915bc3547daf343d188b9c36db8dd6b3ff3b5e70565e88df`](https://etherscan.io/tx/0x7310af5d53e08259915bc3547daf343d188b9c36db8dd6b3ff3b5e70565e88df) | **T10.002** |
| 2026-11-09 08:09:47 | `withdraw` releases 7,982,766.47849233 ANKR: [`0x90c563360cc343a640721662abe762e9ab9665aee0c22820b1656ff23bcfc891`](https://etherscan.io/tx/0x90c563360cc343a640721662abe762e9ab9665aee0c22820b1656ff23bcfc891) | **T10.002** |
| 2026-11-09 08:09:59 | `withdraw` releases 515,206.2557414 ankrMATIC: [`0xde2d5b455c0071698fec9c23a9c50f9ecdfd8efa96b4fbb48ed0620bd4c29b5c`](https://etherscan.io/tx/0xde2d5b455c0071698fec9c23a9c50f9ecdfd8efa96b4fbb48ed0620bd4c29b5c) | **T10.002** |
| 2026-11-09 08:11:23 | `withdraw` releases 5,372.24876584 aPOLb: [`0x91ba1a9c81a1bb67ce7a2779d5b2de54b7aece166f67d9e3a31e29e4e13c2886`](https://etherscan.io/tx/0x91ba1a9c81a1bb67ce7a2779d5b2de54b7aece166f67d9e3a31e29e4e13c2886) | **T10.002** |
| 2026-11-09 08:11:59 | `withdraw` releases 0.81962323 aETHb: [`0x46e20d4c8cd43dece94f7a2a890a348fefcb0dc8310279658c8f836e758bdad0`](https://etherscan.io/tx/0x46e20d4c8cd43dece94f7a2a890a348fefcb0dc8310279658c8f836e758bdad0) | **T10.002** |
| 2026-11-09 08:42 | Blockaid reports an ongoing exploit, about \$292K drained across about 5 txs. | response |
| 2026-11-09 09:12 to 09:35 | Receiver sells 77.91110563 ankrETH (26 swaps) and 7,982,766.47849233 ANKR (4 swaps) through a MetaMask swap router, plus 7,367.998466 mUSD (1 swap), receiving 103.26 ETH in 30 swaps (first: [`0x05f3d8109ca5bbc9e4d51697667ba9013dac5a476f1e2c6e695fffdfa2f0368c`](https://etherscan.io/tx/0x05f3d8109ca5bbc9e4d51697667ba9013dac5a476f1e2c6e695fffdfa2f0368c)). | T7.007 |
| 2026-11-09 09:55 | PeckShield reports about 103 ETH (~\$217K) already swapped. | response |
| 2026-11-09 11:36:59 | 104.71578342 ETH is sent to [`0x92b2a947551d780f94dda2ef7ec566accdbd796d`](https://etherscan.io/address/0x92b2a947551d780f94dda2ef7ec566accdbd796d) in [`0x560715bdd7f6eb59907395f6c6b519c489c2e7d1a13a22580079866a8c0799a8`](https://etherscan.io/tx/0x560715bdd7f6eb59907395f6c6b519c489c2e7d1a13a22580079866a8c0799a8). | — |
| 2026-11-09 11:39:59 to 11:44:35 | That address makes 12 deposits to the Tornado Cash router, 113.7 ETH in total (100, 10, 1, 1, 1 and seven of 0.1; first: [`0x393524106e749e57086c5b67e27cdbfabad4b30087dbe85c11e5b11099ff6bf3`](https://etherscan.io/tx/0x393524106e749e57086c5b67e27cdbfabad4b30087dbe85c11e5b11099ff6bf3)). The 9 ETH above the 104.7 received is not explained by OAK's trace. | T7.001 |
| 2026-11-09 and after | ankrMATIC, aPOLb and aETHb: OAK did not follow them past the receiver. Ankr pause and statement: undisclosed (rektradar notes the bridge pause flag was still false in early reports). | undisclosed |

Key addresses:

- Attacker EOA (tx sender) — [`0x9A88Dd45AE846A979705c9cFdfD0f229e592D703`](https://etherscan.io/address/0x9A88Dd45AE846A979705c9cFdfD0f229e592D703); sent 1.49985138 ETH to the receiver at 09:48:35 ([`0xfb4288a47f0146a534c17480b9eca017994fa587c25f022b051abb70c8e38e53`](https://etherscan.io/tx/0xfb4288a47f0146a534c17480b9eca017994fa587c25f022b051abb70c8e38e53)).
- Receiver — [`0x119D250b82C1cf5345dF5912EFb4B1a4107a1Aa6`](https://etherscan.io/address/0x119D250b82C1cf5345dF5912EFb4B1a4107a1Aa6)
- Vulnerable contract (Ankr Bridge, TransparentUpgradeableProxy) — [`0xc437DF90B37C1db6657339E31BfE54627f0e7181`](https://etherscan.io/address/0xc437DF90B37C1db6657339E31BfE54627f0e7181)
- Swap router used — [`0x881d40237659c251811cec9c364ef91dc08d300c`](https://etherscan.io/address/0x881d40237659c251811cec9c364ef91dc08d300c) (MetaSwap router)
- Onward ETH holder — [`0x92b2a947551d780f94dda2ef7ec566accdbd796d`](https://etherscan.io/address/0x92b2a947551d780f94dda2ef7ec566accdbd796d)
- Tornado Cash router — [`0xd90e2f925da726b50c4ed8d0fb90ad053324f31b`](https://etherscan.io/address/0xd90e2f925da726b50c4ed8d0fb90ad053324f31b)
- ANKR token contract — [`0x8290333cef9e6d528dd5618fb97a76f268f3edd4`](https://etherscan.io/address/0x8290333cef9e6d528dd5618fb97a76f268f3edd4)

Watch-out: after the theft, address-poisoning bots sent spoofed zero-value "ETH" transfers from the receiver to lookalike addresses that copy the first and last characters of the holder address (for example `0x92bb1f958a8aeb971227fba643b18cee5abd796d`). Those are fake-token events, not fund movement; only the 11:36:59 transaction above moved real ETH. Check the full address, never the ends.

## Fund flow

Ethereum leg traced by OAK with `tools/explorer.py` (Blockscout, keyless) on 2026-11-10. The swap edges are aggregates of the receiver's transfers to the router. ankrMATIC, aPOLb and aETHb were not followed past the receiver. The 113.7 ETH Tornado edge includes about 9 ETH whose origin OAK did not trace.

```oak-flow
as_of: 2026-11-10T12:00Z
nodes:
  - {id: vic, chain: ethereum, address: 0xc437df90b37c1db6657339e31bfe54627f0e7181, role: vulnerable-contract, label: "Ankr Bridge (Ethereum)"}
  - {id: atk, chain: ethereum, address: 0x9a88dd45ae846a979705c9cfdfd0f229e592d703, role: attacker-eoa, label: "Attacker EOA (tx sender)"}
  - {id: rcv, chain: ethereum, address: 0x119d250b82c1cf5345df5912efb4b1a4107a1aa6, role: attacker-receiver, label: "Receiver"}
  - {id: fund, chain: ethereum, address: 0x9846c1f06d2f0e7c4678aeea56eb826efe41bb9a, role: unknown, label: "POL funder"}
  - {id: rtr, chain: ethereum, address: 0x881d40237659c251811cec9c364ef91dc08d300c, role: dex, label: "MetaSwap router"}
  - {id: hold, chain: ethereum, address: 0x92b2a947551d780f94dda2ef7ec566accdbd796d, role: attacker-holding, label: "ETH holder"}
  - {id: tc, chain: ethereum, address: 0xd90e2f925da726b50c4ed8d0fb90ad053324f31b, role: mixer, label: "Tornado Cash router"}
edges:
  - {from: fund, to: rcv, asset: POL, amount: 110.35897066, tx: 0x139e3e30b2993b96aec206e168d299d1678cf05a57c58d90593cf6c7b5f6d3e8, time: 2026-11-09T05:13:11Z, verified: oak}
  - {from: vic, to: rcv, asset: ankrETH, amount: 82.91110563, tx: 0x7310af5d53e08259915bc3547daf343d188b9c36db8dd6b3ff3b5e70565e88df, time: 2026-11-09T08:09:35Z, technique: T10.002, verified: oak}
  - {from: vic, to: rcv, asset: ANKR, amount: 7982766.47849233, tx: 0x90c563360cc343a640721662abe762e9ab9665aee0c22820b1656ff23bcfc891, time: 2026-11-09T08:09:47Z, technique: T10.002, verified: oak}
  - {from: vic, to: rcv, asset: ankrMATIC, amount: 515206.2557414, tx: 0xde2d5b455c0071698fec9c23a9c50f9ecdfd8efa96b4fbb48ed0620bd4c29b5c, time: 2026-11-09T08:09:59Z, technique: T10.002, verified: oak}
  - {from: vic, to: rcv, asset: aPOLb, amount: 5372.24876584, tx: 0x91ba1a9c81a1bb67ce7a2779d5b2de54b7aece166f67d9e3a31e29e4e13c2886, time: 2026-11-09T08:11:23Z, technique: T10.002, verified: oak}
  - {from: vic, to: rcv, asset: aETHb, amount: 0.81962323, tx: 0x46e20d4c8cd43dece94f7a2a890a348fefcb0dc8310279658c8f836e758bdad0, time: 2026-11-09T08:11:59Z, technique: T10.002, verified: oak}
  - {from: atk, to: rcv, asset: ETH, amount: 1.49985138, tx: 0xfb4288a47f0146a534c17480b9eca017994fa587c25f022b051abb70c8e38e53, time: 2026-11-09T09:48:35Z, verified: oak}
  - {from: rcv, to: rtr, asset: ankrETH, amount: 77.91110563, tx: 0x05f3d8109ca5bbc9e4d51697667ba9013dac5a476f1e2c6e695fffdfa2f0368c, time: 2026-11-09T09:12:11Z, tx_count: 26, time_last: 2026-11-09T09:35:47Z, technique: T7.007, verified: oak}
  - {from: rcv, to: rtr, asset: ANKR, amount: 7982766.47849233, tx: 0x604820e86bc0eff1c85f4cbc2a4cc34d0c17f7254903e8623776359a8e042b90, time: 2026-11-09T09:13:47Z, tx_count: 4, time_last: 2026-11-09T09:25:11Z, technique: T7.007, verified: oak}
  - {from: rtr, to: rcv, asset: ETH, amount: 103.25910224, tx: 0x05f3d8109ca5bbc9e4d51697667ba9013dac5a476f1e2c6e695fffdfa2f0368c, time: 2026-11-09T09:12:11Z, tx_count: 30, time_last: 2026-11-09T09:35:47Z, technique: T7.007, verified: oak}
  - {from: rcv, to: hold, asset: ETH, amount: 104.71578342, tx: 0x560715bdd7f6eb59907395f6c6b519c489c2e7d1a13a22580079866a8c0799a8, time: 2026-11-09T11:36:59Z, verified: oak}
  - {from: hold, to: tc, asset: ETH, amount: 113.7, tx: 0x393524106e749e57086c5b67e27cdbfabad4b30087dbe85c11e5b11099ff6bf3, time: 2026-11-09T11:39:59Z, tx_count: 12, time_last: 2026-11-09T11:44:35Z, technique: T7.001, verified: oak}
```

## Root-cause evidence

- **Technique:** OAK-T10.002
- **Source:** <https://x.com/SlowMist_Team/status/2119720284093890615>; <https://x.com/blockaid_/status/2119712260184527262>; <https://x.com/PeckShieldAlert/status/2119730625695662322>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** SlowMist states the attacker submitted five forged cross-chain receipts that referenced the same legitimate Optimism transaction while changing recipient, token and amounts, all bearing valid signatures from the bridge's trusted consensus signer, and that `withdraw()` released assets without checking the receipts against source-chain events. Blockaid independently describes five `withdraw` calls using a tiny Optimism deposit to unlock the bridge's locked inventory. OAK's own trace matches five `withdraw` calls from one sender to one recipient. Not established: how the signer came to sign the receipts (SlowMist: signer compromise not confirmed). The operator has not published a post-mortem that OAK found, so this is not `confirmed`.

## Public references

- `[slowmistankr2026]` — SlowMist, TI Alert on Ankr (2026-11-09): <https://x.com/SlowMist_Team/status/2119720284093890615>
- `[blockaidankr2026]` — Blockaid, exploit alert (2026-11-09 08:42 UTC): <https://x.com/blockaid_/status/2119712260184527262>
- `[peckshieldankr2026]` — PeckShield, loss and swap summary (2026-11-09 09:55 UTC): <https://x.com/PeckShieldAlert/status/2119730625695662322>
- `[defiantankr2026]` — The Defiant, "Ankr Ethereum Bridge Loses More Than \$303,000 in Five-Transaction Exploit": <https://thedefiant.io/news/hacks/ankr-ethereum-bridge-loses-more-than-303-000-in-five-transaction-exploit>
- `[rektradarankr2026]` — Rekt Radar, "Web3 Daily Exploits, 9 Nov 2026": <https://www.rektradar.xyz/web3-daily-exploits-09-nov-2026-ankr-304k-bridge-zenji-5k-oracle/>
- Related, different incident: [2022-12 Ankr deployer-key compromise](2022-12-ankr.md)
