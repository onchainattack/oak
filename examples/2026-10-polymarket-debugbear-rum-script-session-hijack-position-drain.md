# Polymarket — a performance-monitoring vendor's script, loaded on the site, hijacked logged-in sessions and sold or moved users' positions — Polymarket (international) / Polygon — 2026-10-29

**Loss:** **~\$2.5–2.7M.** DefiLlama tracks ~\$2.7M; BleepingComputer traced ~28.6M POL (~\$2.57M) out of the attacker wallet [`0x3F99139F1C5854bb628c2e576Aaf638e99dFfc18`](https://polygonscan.com/address/0x3F99139F1C5854bb628c2e576Aaf638e99dFfc18). Polymarket says affected users "will be made whole"; it has not published a user count or total. Polymarket US was not affected.

**OAK Techniques observed:** **OAK-T15.002** (Supply-Chain / Vendor-Pipeline Compromise — *primary*. Polymarket: "One of our 3rd party providers was compromised." Hudson Rock and BleepingComputer found the malicious JavaScript at `cdn.debugbear[.]com`, served through **DebugBear's Real User Monitoring embed**, and talking to `data.debugbear.com` for instructions. DebugBear confirmed "an ongoing security incident" and told customers to remove the embed. See [`techniques/T15.002-supply-chain-vendor-pipeline-compromise.md`](../techniques/T15.002-supply-chain-vendor-pipeline-compromise.md)). The script used the visitor's **authenticated trading session**: it checked balances and positions, auto-sold positions for some users and transferred outcome tokens straight to the attacker for others, using Polymarket's normal transaction functions. No user signature prompt was needed, which separates it from the [June 2026 Polymarket vendor injection](2026-06-polymarket-frontend-vendor-js-injection-approval-drain.md) (T4.002 approval prompts).

**Attribution:** **unattributed.** Referred to law enforcement.

**Key teaching point:** **A monitoring script runs with the user's session.** Third-party analytics on a page where a session can trade and withdraw is a signing path. Polymarket's second frontend-vendor drain in four months argues for no third-party script on authenticated trading pages, or strict CSP/SRI pinning where one is unavoidable.

## Summary

Between 13:50 and 13:56 ET on 2026-10-29 the attacker wallet made many transactions against Polymarket's outcome-token contract. A build removing the DebugBear script went live at 13:59, the exchange went cancel-only at 14:05, and Polymarket announced the halt at 14:33 (18:33 UTC, its X post). Trading resumed about an hour later.

## Timeline (UTC)

Read it as three stages. **Get in**: a vendor script on the Polymarket site. **Prepare**: not published. **Take**: the script acts inside logged-in sessions. Polymarket's X post is fetched; the BleepingComputer and CoinDesk articles could not be fetched, so their details are as already summarised in this file. Reported ET times are converted to UTC (EDT, UTC-4).

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-29 (undisclosed) | Malicious JavaScript is served from `cdn.debugbear[.]com` through DebugBear's Real User Monitoring embed on Polymarket pages, and contacts `data.debugbear.com` for instructions. How DebugBear was compromised and since when are not published. | **T15.002** entry |
| 2026-10-29 (undisclosed) | Funding and preparation of the attacker wallet are not published. | — |
| 2026-10-29 17:50–17:56 (13:50–13:56 ET) | The attacker wallet makes many transactions against Polymarket's outcome-token contract. The script uses each visitor's authenticated trading session: it checks balances and positions, auto-sells positions for some users and transfers outcome tokens to the attacker for others, with no signature prompt. | **T15.002** |
| 2026-10-29 (undisclosed) | BleepingComputer traces about 28.6M POL (about \$2.57M) out of the attacker wallet. DefiLlama tracks about \$2.7M. Where it went next is not published. | — |
| 2026-10-29 17:59 (13:59 ET) | A Polymarket build removing the DebugBear script goes live. | response |
| 2026-10-29 18:05 (14:05 ET) | The exchange goes cancel-only. | response |
| 2026-10-29 18:33:12 | Polymarket posts that one of its third-party providers was compromised, that it has referred the matter to law enforcement, that trading is halted, and that affected users "will be made whole". DebugBear confirms an ongoing security incident and tells customers to remove the embed. | response |
| about an hour after the halt | Trading resumes. No user count or total loss is published. | response |

Key addresses:

- Attacker wallet (Polygon), embedded in the malicious script per BleepingComputer — [`0x3F99139F1C5854bb628c2e576Aaf638e99dFfc18`](https://polygonscan.com/address/0x3F99139F1C5854bb628c2e576Aaf638e99dFfc18)
- Script host — `cdn.debugbear[.]com`; instruction server — `data.debugbear.com`.

## Fund flow

**Traced by OAK (2026-10-30, public RPC with a nonce walk of the attacker wallet):** between 18:28 and 18:38 UTC on 2026-10-29 the attacker wallet sent **28,636,284.45 POL in three transfers** to three fresh wallets, which matches BleepingComputer's "about 28.6M POL to three wallets", now with addresses and txs. Before that it swapped small USDC and USDC.e amounts (16.7K USDC inbound from about 15 counterparties between 17:27 and 18:01) through the same shared swap executor seen in other incidents. The bulk of the value moved as pUSD and outcome tokens, which public-RPC tracing does not see, so the victim leg stays relayed from BleepingComputer.

```oak-flow
as_of: 2026-10-30T18:30Z
nodes:
  - {id: vic, chain: polygon, role: victim, label: "Polymarket users' sessions (pUSD and outcome tokens)"}
  - {id: atk, chain: polygon, address: 0x3f99139f1c5854bb628c2e576aaf638e99dffc18, role: attacker-eoa, label: "Attacker wallet (embedded in the script)"}
  - {id: swap, chain: polygon, address: 0x8f10b468b06c6fd214b65f87778827f7d113f996, role: dex, label: "Swap executor (shared, high-volume)"}
  - {id: w1, chain: polygon, address: 0xe4c4c39c1733e1c7c06b79f97ed442b68df41ec6, role: intermediary, label: "POL receiver 1"}
  - {id: w2, chain: polygon, address: 0x5392587814ce8c6af6789764f88e5e9ab0b9962c, role: intermediary, label: "POL receiver 2"}
  - {id: w3, chain: polygon, address: 0xc91ee0574a14446de200923729c349b9cae19b60, role: intermediary, label: "POL receiver 3"}
edges:
  - {from: vic, to: atk, asset: "pUSD / outcome tokens (sold or transferred via hijacked sessions)", time: 2026-10-29T17:50:00Z, technique: T15.002, verified: source, source: bleepingpolymarket2026}
  - {from: atk, to: swap, asset: USDC, amount: 6304.88628, tx: 0xa7519799ae329d220b9fe6fa5669b143a7c6047ac3808d2a709791649b44f00a, time: 2026-10-29T18:03:08Z, verified: oak}
  - {from: atk, to: swap, asset: USDC.e, amount: 513.417769, tx: 0x3f28afc8c4b113596fb2fd0698c86d6ec356b8d25b4d9085edefc224f54d3594, time: 2026-10-29T17:32:38Z, verified: oak}
  - {from: atk, to: w1, asset: POL, amount: 18613584, tx: 0x2629289569ea8be042b6706ba0a9e0d76f069247bb115f973fcedc556e8a4f88, time: 2026-10-29T18:28:32Z, verified: oak}
  - {from: atk, to: w2, asset: POL, amount: 4295442, tx: 0x69e1c3f6c3cc1cacbc145ba0a7b475532d0856522b112add36d4eeb5d84fc0c5, time: 2026-10-29T18:30:41Z, verified: oak}
  - {from: atk, to: w3, asset: POL, amount: 5727258.44500568, tx: 0xe8b8ee79a0e507b88027506f4098cbbcab6557272fb59becc42b53574b3e9f66, time: 2026-10-29T18:38:16Z, verified: oak}
```

What the trace adds beyond the sources:

- **Where the POL went:** three fresh wallets, 18,613,584 / 4,295,442 / 5,727,258.45 POL, with the txs in the table. The total of 28,636,284.45 POL matches BleepingComputer's figure.
- **Swaps before the split** ran through `0x8f10b468b06c6fd214b65f87778827f7d113f996`, a high-volume swap executor that also appears in the zkLink Nova and Autheo traces. It is shared infrastructure, not a link between the incidents.
- **Not reconciled:** DefiLlama's about \$2.7M against BleepingComputer's about \$2.57M. The victim-side pUSD and outcome-token flows are not visible to log-based RPC tracing. The three POL receivers were not followed further.

## Root-cause evidence

- **Technique:** OAK-T15.002
- **Source:** <https://x.com/PolymarketTrade/status/2115874609014726842>; <https://www.bleepingcomputer.com/news/security/polymarket-halts-trading-after-crypto-draining-script-breach-25m-traced/>
- **Source type:** operator
- **Confidence:** corroborated
- **Evidence:** Polymarket states a third-party provider was compromised; BleepingComputer and Hudson Rock identify the DebugBear-hosted script, its behaviour and the removal commit, and DebugBear acknowledges an incident.

## Public references

- `[polymarketoct2026]` — Polymarket on X (2026-10-29): <https://x.com/PolymarketTrade/status/2115874609014726842>
- `[bleepingpolymarket2026]` — BleepingComputer, "Polymarket halts trading after crypto-draining script breach, \$2.5M traced": <https://www.bleepingcomputer.com/news/security/polymarket-halts-trading-after-crypto-draining-script-breach-25m-traced/>
- `[coindeskpolymarketoct2026]` — CoinDesk, "Polymarket suspends trading after third-party breach leads to user losses": <https://www.coindesk.com/markets/2026/10/29/polymarket-suspends-trading-after-third-party-breach-leads-to-user-losses>
