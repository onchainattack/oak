# Wagyu / XMR1 — the deployer account's main key moved 5.2M XMR1 to a fresh address, which dumped them into the Hyperliquid order book — Wagyu (wrapped Monero on Hyperliquid) / Hyperliquid, Arbitrum, Ethereum — 2026-11-20

**Loss:** **~\$13.3-13.5M of buyers' USDC** paid into the order book for XMR1 (GoPlus, CertiK and Scam Sniffer: ~\$13.3M; Bitquery: \$13.51M for 369,623 XMR1 from 420 buyers). The founder says holders will be refunded personally; as of Bitquery's last read (13:16 UTC) no top-10 buyer had received a refund transfer. The price fell from ~\$494 to ~\$1 (GoPlus), and Bitquery says the Monero side of the bridge is not visible, so backing for the remaining XMR1 cannot be assessed.

**OAK Techniques observed:** **OAK-T11.014** (Operator Privileged-Key Compromise, *primary*). The deployer account of XMR1, which held the full fixed supply, signed three user-signed transfers to a fresh address. Bitquery says these were signed by the account's main key, not by its API wallet "wagyu", which can trade but cannot transfer. Nothing on Hyperliquid was bypassed; the key was valid. See [`techniques/T11.014-operator-privileged-key-compromise.md`](../techniques/T11.014-operator-privileged-key-compromise.md). **OAK-T15.002** (Supply-Chain / Vendor-Pipeline Compromise, *entry vector, operator-stated and unverified*): the founder says the key sat on a deleted server whose logs or files the hosting provider 1984.hosting kept, and that the provider was breached. This is a third-party hosting provider, not a build pipeline, so T15.002 is a loose fit; the vector is not independently established. **OAK-T7.001** (Tornado Cash funding of the attacker address, per Bitquery and traced by OAK). **OAK-T7.003** (USDC bridged off Hyperliquid, then ETH bridged Arbitrum to Ethereum, per Bitquery) and **OAK-T7.007** (USDC swapped to ETH on CoW Protocol, per Bitquery).

**Attribution:** **unattributed** (the recipient and seller is [`0x1464dacaceb0d511f9964cdac5eba50ea42220bf`](https://etherscan.io/address/0x1464dacaceb0d511f9964cdac5eba50ea42220bf), named by Lookonchain, PeckShield, GoPlus, CertiK and Bitquery; no source names the person behind it). Bitquery says Tornado Cash funding "fits an outside attacker but does not prove one".

**Key teaching point:** **A token's entire supply must not sit under one hot, server-stored main key.** One user-signed transfer from the deployer account moved 5.2M tokens, and the only brake was the market. Keep supply and issuer authority in a multisig or hardware-held key that was never placed on a rented server, and delete keys from a host before the host is released.

## Summary

XMR1 is a Hyperliquid spot token that stands in for Monero; GoPlus says it is "not native XMR on the Monero network" and is bridged via Wagyu. On 2026-11-20 the XMR1 deployer account sent 5.2M XMR1 to [`0x1464dacaceb0d511f9964cdac5eba50ea42220bf`](https://etherscan.io/address/0x1464dacaceb0d511f9964cdac5eba50ea42220bf) in three transfers (04:46:58, 05:14:30 and 05:16:10 UTC, from the Hyperliquid ledger, traced by OAK). The recipient, funded with 0.098 ETH from Tornado Cash at 03:30 UTC, sold into the order book, which held resting buy orders. Scam Sniffer reported it at 05:50 UTC. The proceeds were sent off Hyperliquid, swapped to ETH and bridged to Ethereum; Bitquery counts 7,467 ETH bought. At 09:36 UTC the founder wrote that he did not yet know what had happened. At 12:48 UTC he wrote a post-mortem saying the deployer key was held on a deleted server at 1984.hosting whose logs or files were still kept, and that the whole provider had been hacked. That statement is the operator's own and Bitquery says it cannot confirm how the key was obtained.

## Timeline (UTC)

**Entry** (key exposure, per the operator) → **Preparation** (attacker funding) → **Execution** (three transfers and the dump) → **Money** (Arbitrum, CoW, Ethereum) → **Response** (statements). Times are from the Hyperliquid info API ledger (`userNonFundingLedgerUpdates`) and Blockscout, traced by OAK, and from Bitquery.

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-20 (undisclosed) | Per the founder, the XMR1 deployer key was held on an old server at 1984.hosting that he had deleted; the host kept logs or files and was itself breached. When the key was copied is undisclosed. Operator-stated only | **T15.002** |
| 2026-11-16 | Deployer sends 20,000 and 100,000 XMR1 to [`0x048b75dc11fd31bc38808478fee0c08d4cc05eb3`](https://etherscan.io/address/0x048b75dc11fd31bc38808478fee0c08d4cc05eb3) ([`0x7222a02dacb2f9b7739c0448ea95aa020209001347b6188915eb4b806bb6d3a2`](https://app.hyperliquid.xyz/explorer/tx/0x7222a02dacb2f9b7739c0448ea95aa020209001347b6188915eb4b806bb6d3a2), [`0x39a0702ce399776a3b1a0448eaa6a60203bb00127e9c963cdd691b7fa29d5154`](https://app.hyperliquid.xyz/explorer/tx/0x39a0702ce399776a3b1a0448eaa6a60203bb00127e9c963cdd691b7fa29d5154)). Bitquery lists this as earlier context; who signed is undisclosed | — |
| 2026-11-20 03:30:23 | Attacker address receives 0.09788293 ETH from Tornado Cash ([`0x33513047a342ea41bbcc6503aa8c889a8b5d05a4ef332354fba682fdc60b53ee`](https://etherscan.io/tx/0x33513047a342ea41bbcc6503aa8c889a8b5d05a4ef332354fba682fdc60b53ee)) | T7.001 |
| 2026-11-20 04:46:58 | First transfer: 100,000 XMR1 deployer to attacker ([`0x328fc4efdff6c881340904492f4b780201d700d57af9e753d65870429efaa26b`](https://app.hyperliquid.xyz/explorer/tx/0x328fc4efdff6c881340904492f4b780201d700d57af9e753d65870429efaa26b)) | **T11.014** |
| 2026-11-20 04:47-04:53 | Attacker sends 6,000 XMR1 in seven transfers to seven other accounts, purpose undisclosed (Bitquery: inferred from behaviour) | — |
| 2026-11-20 04:49 onward | Attacker starts selling into the order book; Bitquery: 76% of proceeds (about \$10.2M) came in before 05:00 UTC, most from buy orders already resting on the book | **T11.014** |
| 2026-11-20 05:14:30 and 05:16:10 | Second transfer, 100,000 XMR1 ([`0xfe18b36928ccc7ecff9204492fa62e0208de004ec3cfe6bfa1e15ebbe7c0a1d7`](https://app.hyperliquid.xyz/explorer/tx/0xfe18b36928ccc7ecff9204492fa62e0208de004ec3cfe6bfa1e15ebbe7c0a1d7)), then third, 5,000,000 XMR1 ([`0x8453d81d6945e81885cd04492fab940204a80003044906ea281c83702849c203`](https://app.hyperliquid.xyz/explorer/tx/0x8453d81d6945e81885cd04492fab940204a80003044906ea281c83702849c203)). Total 5.2M | **T11.014** |
| 2026-11-20 04:54:40-05:20:25 | Attacker sends 11 USDC transfers totalling \$13,281,001.73 to the Hyperliquid system address `0x2000000000000000000000000000000000000000` (first: [`0x09c132ddd91dbcd10b3a04492f64e402011d00c37410dba3ad89de30981196bb`](https://app.hyperliquid.xyz/explorer/tx/0x09c132ddd91dbcd10b3a04492f64e402011d00c37410dba3ad89de30981196bb), 7,474,206.546009 USDC). Bitquery says \$13.28M reached Arbitrum in 11 transfers and \$13.22M was swapped on CoW Protocol for 7,467 ETH | T7.003 / T7.007 |
| 2026-11-20 05:03-05:13 | 6,929 ETH goes through Socket, Mayan and Stargate (Bitquery); 6,810 ETH arrives on Ethereum at the attacker address in seven transfers, traced by OAK. One Arbitrum leg: [`0x1b6f68247603d6c3d1754680d9f73aee87d1791a8e51ec92bea1dfa58a47733e`](https://arbiscan.io/tx/0x1b6f68247603d6c3d1754680d9f73aee87d1791a8e51ec92bea1dfa58a47733e), 1,013.04352016 ETH to Socket | T7.003 |
| 2026-11-20 05:05-05:19 | Attacker moves 4,835.66959472 ETH in four transfers to [`0xF32D7842611a5d63b875075dadd19c55f3f1dc59`](https://etherscan.io/address/0xF32D7842611a5d63b875075dadd19c55f3f1dc59) (see Fund flow). Not moved onward as of 2026-11-26 (balance 4,835.66959472 ETH, traced by OAK) | — |
| 2026-11-20 05:20 onward | Price about \$1 from 05:20 (Bitquery). Attacker pauses sales at 06:35, resumes 07:38-10:28; about 309,000 XMR1 still listed at 13:00 (Bitquery) | — |
| 2026-11-20 09:36 | Founder: "Not completely sure what happened yet"; MMs "got hit primarily"; "I'm open to negotiations of course" | response |
| 2026-11-20 12:48 | Founder post-mortem: key was on an old deleted server at 1984.hosting, logs/files kept, the whole provider hacked; promises personal refunds and a later relaunch | response |

Key addresses:

- XMR1 deployer (source) — [`0x207700bd207df757825f9193ef9c648c1c65e06a`](https://etherscan.io/address/0x207700bd207df757825f9193ef9c648c1c65e06a) (Hyperliquid account; [Hyperliquid explorer](https://app.hyperliquid.xyz/explorer/address/0x207700bd207df757825f9193ef9c648c1c65e06a))
- Recipient, seller and ETH holder — [`0x1464dacaceb0d511f9964cdac5eba50ea42220bf`](https://etherscan.io/address/0x1464dacaceb0d511f9964cdac5eba50ea42220bf) (1,974.55647414 ETH on Ethereum as of 2026-11-26, traced by OAK)
- ETH holding address — [`0xF32D7842611a5d63b875075dadd19c55f3f1dc59`](https://etherscan.io/address/0xF32D7842611a5d63b875075dadd19c55f3f1dc59)
- Socket contract on Arbitrum (per Bitquery) — [`0x50c4e75a512f2a14a7b304787adf79c4531a5909`](https://arbiscan.io/address/0x50c4e75a512f2a14a7b304787adf79c4531a5909)
- Mayan contract on Ethereum — [`0xc1062b7c5dc8e4b1df9f200fe360cdc0ed6e7741`](https://etherscan.io/address/0xc1062b7c5dc8e4b1df9f200fe360cdc0ed6e7741)
- Mayan Swift contract on Ethereum — [`0xd78d199f8c402e7b5cc2abe278df0412400a3bae`](https://etherscan.io/address/0xd78d199f8c402e7b5cc2abe278df0412400a3bae)
- Stargate ETH pool on Ethereum — [`0x77b2043768d28e9c9ab44e1abfc95944bce57931`](https://etherscan.io/address/0x77b2043768d28e9c9ab44e1abfc95944bce57931)
- CoW Protocol settlement on Arbitrum (per Bitquery) — [`0x9008d19f58aabd9ed0d60971565aa8510560ab41`](https://arbiscan.io/address/0x9008d19f58aabd9ed0d60971565aa8510560ab41)

## Fund flow

Hyperliquid legs traced by OAK from the public Hyperliquid info API ledger for the two accounts, and Ethereum legs traced with `tools/explorer.py` (Blockscout) on 2026-11-26. Arbitrum Blockscout was not reachable (HTTP 403), so the USDC-to-ETH swap on Arbitrum is relayed from Bitquery and not drawn, apart from one Socket transaction read over RPC. The XMR1 sales themselves and the 11 USDC sends after the first are not drawn; the first send is. Seven inbound ETH transfers (Mayan, Mayan Swift, Stargate) and four outbound ones are drawn. After the incident the attacker address sends many "1000 ETH" and similar transfers to lookalike `0xf32...` addresses; these are counterfeit-name token transfers (the asset name is spoofed, the address balances do not change) and are excluded. Native balances match the drawn edges.

```oak-flow
as_of: 2026-11-26T12:00Z
nodes:
  - {id: dep, chain: hyperliquid, address: 0x207700bd207df757825f9193ef9c648c1c65e06a, role: victim, label: "XMR1 deployer account"}
  - {id: atk, chain: hyperliquid, address: 0x1464dacaceb0d511f9964cdac5eba50ea42220bf, role: attacker-eoa, label: "Recipient / seller (Hyperliquid)"}
  - {id: sys, chain: hyperliquid, address: 0x2000000000000000000000000000000000000000, role: bridge, label: "Hyperliquid USDC system address"}
  - {id: atke, chain: ethereum, address: 0x1464dacaceb0d511f9964cdac5eba50ea42220bf, role: attacker-eoa, label: "Same address on Ethereum"}
  - {id: tc, chain: ethereum, role: mixer, label: "Tornado Cash"}
  - {id: may, chain: ethereum, address: 0xc1062b7c5dc8e4b1df9f200fe360cdc0ed6e7741, role: bridge, label: "Mayan"}
  - {id: sw, chain: ethereum, address: 0xd78d199f8c402e7b5cc2abe278df0412400a3bae, role: bridge, label: "Mayan Swift"}
  - {id: stg, chain: ethereum, address: 0x77b2043768d28e9c9ab44e1abfc95944bce57931, role: bridge, label: "Stargate ETH pool"}
  - {id: hold, chain: ethereum, address: 0xf32d7842611a5d63b875075dadd19c55f3f1dc59, role: attacker-holding, label: "ETH holding address"}
edges:
  - {from: tc, to: atke, asset: ETH, amount: 0.09788293, tx: 0x33513047a342ea41bbcc6503aa8c889a8b5d05a4ef332354fba682fdc60b53ee, time: 2026-11-20T03:30:23Z, technique: T7.001, verified: oak}
  - {from: dep, to: atk, asset: XMR1, amount: 100000, tx: 0x328fc4efdff6c881340904492f4b780201d700d57af9e753d65870429efaa26b, time: 2026-11-20T04:46:58Z, technique: T11.014, verified: oak}
  - {from: dep, to: atk, asset: XMR1, amount: 100000, tx: 0xfe18b36928ccc7ecff9204492fa62e0208de004ec3cfe6bfa1e15ebbe7c0a1d7, time: 2026-11-20T05:14:30Z, technique: T11.014, verified: oak}
  - {from: dep, to: atk, asset: XMR1, amount: 5000000, tx: 0x8453d81d6945e81885cd04492fab940204a80003044906ea281c83702849c203, time: 2026-11-20T05:16:10Z, technique: T11.014, verified: oak}
  - {from: atk, to: sys, asset: USDC, amount: 7474206.546009, tx: 0x09c132ddd91dbcd10b3a04492f64e402011d00c37410dba3ad89de30981196bb, time: 2026-11-20T04:54:40Z, technique: T7.003, verified: oak}
  - {from: may, to: atke, asset: ETH, amount: 1335.32524489, tx: 0xa13ee486a6d2fc2624c11c36174b6a6208774eef4116e4aa9f2ffd9621055673, time: 2026-11-20T05:03:35Z, technique: T7.003, verified: oak}
  - {from: may, to: atke, asset: ETH, amount: 1000.34444354, tx: 0x3a93c0cb9085ed6d73d6f0e2a8bcfafc942d8d4af7b42b9d34abc10576b07240, time: 2026-11-20T05:04:11Z, technique: T7.003, verified: oak}
  - {from: may, to: atke, asset: ETH, amount: 1662.59315526, tx: 0x76527c370c2b1706fb18d5e2729128f309cc100542dc24e7ab74ae22f2655f7f, time: 2026-11-20T05:07:23Z, technique: T7.003, verified: oak}
  - {from: may, to: atke, asset: ETH, amount: 1229.54304447, tx: 0x7023ad60ee036d7acf109f20e4db0c9da7dd34388820e285eb8d35b499fd36d2, time: 2026-11-20T05:09:35Z, technique: T7.003, verified: oak}
  - {from: may, to: atke, asset: ETH, amount: 926.72074365, tx: 0xc7da8fb824f7beee60873e21bd2ea9bbd6d1ab22afb993475fe7852fcdfb5aab, time: 2026-11-20T05:09:59Z, technique: T7.003, verified: oak}
  - {from: stg, to: atke, asset: ETH, amount: 314.476251, tx: 0x0bfc2ba99ba1640f2de5d9f26141d683083b8b0ed3c69eca6718de721ead4706, time: 2026-11-20T05:12:11Z, technique: T7.003, verified: oak}
  - {from: sw, to: atke, asset: ETH, amount: 341.2233445, tx: 0x896d657026b01b670439daada506b4574825023e3d3fc565e8792a33fa625a3a, time: 2026-11-20T05:13:47Z, technique: T7.003, verified: oak}
  - {from: atke, to: hold, asset: ETH, amount: 10, tx: 0x43e61634dd6a8c01e8fc9fad0d04b56ec602f42f4a37e3080d32d6f69e1d892a, time: 2026-11-20T05:05:35Z, verified: oak}
  - {from: atke, to: hold, asset: ETH, amount: 2325.66959472, tx: 0x74a704c0b00bd9cb6c671e339f361718c7d885d5776d13074ecb0ed17edf4752, time: 2026-11-20T05:06:11Z, verified: oak}
  - {from: atke, to: hold, asset: ETH, amount: 1500, tx: 0xf5820bca522aeff14766a66ad939a25d447837f544371e6fff2597804c401b62, time: 2026-11-20T05:10:23Z, verified: oak}
  - {from: atke, to: hold, asset: ETH, amount: 1000, tx: 0x9380c8291ae4e4dfad92a704a6bb8f97d6f70d5b97edff6b887b318ffd05cd66, time: 2026-11-20T05:18:59Z, verified: oak}
```

## Root-cause evidence

- **Technique:** OAK-T11.014 (primary); OAK-T15.002 (entry vector, operator-stated, unverified)
- **Source:** <https://x.com/PerpetualCow/status/2123760480061718801>; <https://x.com/PerpetualCow/status/2123711967055458711>; <https://bitquery.io/investigations/xmr1-hyperliquid-hack>; <https://x.com/GoPlusSecurity/status/2123694304959021131>; <https://x.com/PeckShieldAlert/status/2123717364827267434>
- **Source type:** operator
- **Confidence:** reported
- **Evidence:** Confidence is `reported` for the key-compromise mechanism and lower for the hosting-provider vector, which is the operator's own statement and not independently confirmed. The founder's post-mortem says "The XMR1 deployer key was held on an OLD server on there that I DELETED, but somehow the logs/files were still kept" and that the hosting provider "got hacked". Bitquery reads the transfers as user-signed actions from the deployer's main key and says Wagyu "says that key was stolen", and that it "cannot confirm how the key was obtained". The Hyperliquid ledger shows the three transfers, which OAK read directly. All five forensic sources are same-day, so none is `confirmed`. Not established: how and when the key was copied, whether 1984.hosting's breach is the cause (Bitquery cites a report that 1984.hosting disclosed a cyberattack on 2026-11-20; OAK did not check it), and who holds [`0x1464dacaceb0d511f9964cdac5eba50ea42220bf`](https://etherscan.io/address/0x1464dacaceb0d511f9964cdac5eba50ea42220bf).

## Mitigations

- **Hold issuer and supply authority in a multisig or hardware-held key, never on a rented server** (enforced by the account's signer set on Hyperliquid, so one leaked file cannot move supply): the deployer account held 18.6M XMR1 (93% of supply, Bitquery) and one key signed all three transfers. A 2-of-3 signer set would have required a second approval for the 5.0M-token transfer at 05:16:10.
- **Remove keys from a host before releasing it, and rotate them**: the founder says a deleted server's retained logs or files exposed the key. Rotating the deployer key to a hardware-held one when the old server was retired would have left the copy useless.
- **Alert on supply-holder transfers to fresh addresses**: the deployer's first transfer to the fresh address (100,000 XMR1 at 04:46:58) came about 29 minutes before the 5,000,000-token transfer at 05:16:10. A monitor on the deployer account that pages the team and pauses Wagyu bridge redemptions on any transfer to a first-seen address would have fired on that first transfer.

## Open questions

- How and when the deployer key was copied from 1984.hosting, and whether 1984.hosting has published its own account; only the founder's statement is available.
- Whether the earlier 2026-11-16 transfers of 120,000 XMR1 from the deployer to [`0x048b75dc11fd31bc38808478fee0c08d4cc05eb3`](https://etherscan.io/address/0x048b75dc11fd31bc38808478fee0c08d4cc05eb3) were by the same key holder (Bitquery lists this as earlier context only).
- The attacker's off-ramp for 6,810 ETH: as of 2026-11-26 the ETH had not moved on Ethereum. The Arbitrum balance (538 ETH per Bitquery) was not re-read.
- What backs the remaining XMR1: the Monero side of the bridge is not visible (Bitquery). Bitquery lists Lighter (2026-11-16) among sources of XMR1 purchases; see [`examples/2026-11-lighter-api-key-signing-nonce-reuse-public-pool-withdrawal.md`](2026-11-lighter-api-key-signing-nonce-reuse-public-pool-withdrawal.md). Wagyu is also named as an XMR off-ramp in [`examples/2026-11-credit-mutuel-arkea-service-provider-platform-own-account-transfers-cex-cashout.md`](2026-11-credit-mutuel-arkea-service-provider-platform-own-account-transfers-cex-cashout.md); OAK has no source tying the two incidents together.

## Public references

- `[perpetualcowpm2026]` — PerpetualCow (@PerpetualCow), post-mortem (2026-11-20): <https://x.com/PerpetualCow/status/2123760480061718801>
- `[perpetualcow2026]` — PerpetualCow (@PerpetualCow), first reply (2026-11-20): <https://x.com/PerpetualCow/status/2123711967055458711>
- `[bitquery2026]` — Bitquery, "XMR1 Hyperliquid hack" investigation (2026-11-20): <https://bitquery.io/investigations/xmr1-hyperliquid-hack>
- `[lookonchain2026]` — Lookonchain (@lookonchain) (2026-11-20): <https://x.com/lookonchain/status/2123656301561667859>
- `[peckshield2026]` — PeckShield (@PeckShieldAlert) (2026-11-20): <https://x.com/PeckShieldAlert/status/2123717364827267434>
- `[goplus2026]` — GoPlus Security (@GoPlusSecurity) (2026-11-20): <https://x.com/GoPlusSecurity/status/2123694304959021131>
- `[certik2026]` — CertiK (@CertiKAlert) (2026-11-20): <https://x.com/CertiKAlert/status/2123670663416459435>
- `[scamsniffer2026]` — Scam Sniffer (@realScamSniffer) (2026-11-20): <https://x.com/realScamSniffer/status/2123655111650197654>
- `[rektradar2026]` — RektRadar, "Web3 Daily Exploits 20 Nov 2026" (2026-11-20): <https://www.rektradar.xyz/web3-daily-exploits-20-nov-2026-xmr1-13m-hyperliquid-deployer/>
