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

**Not traced by OAK.** On 2026-10-30 the keyless Polygon provider (`polygon.blockscout.com`) answered every request from `tools/explorer.py` with HTTP 403 (a Cloudflare challenge), and the other keyless sources tried also failed (Routescan: chain not supported; the public `polygon-rpc.com` endpoint: API key disabled). OAK did not work around the challenge. No edge is therefore checked on-chain, and the block below holds only the one relayed fact, a total with an undisclosed destination.

```oak-flow
as_of: 2026-10-30T12:30Z
nodes:
  - {id: atk, chain: polygon, address: 0x3F99139F1C5854bb628c2e576Aaf638e99dFfc18, role: attacker-eoa, label: "Attacker wallet"}
  - {id: dest, chain: polygon, role: unknown, label: "Destination not published"}
edges:
  - {from: atk, to: dest, asset: POL, amount: 28600000, time: 2026-10-29T18:00:00Z, verified: source, source: bleepingpolymarket2026}
```

What the trace adds beyond the sources:

- Nothing yet. The only fund-flow fact is BleepingComputer's: about 28.6M POL (about \$2.57M) left the attacker wallet [`0x3F99139F1C5854bb628c2e576Aaf638e99dFfc18`](https://polygonscan.com/address/0x3F99139F1C5854bb628c2e576Aaf638e99dFfc18) (`[bleepingpolymarket2026]`). Its destination, the outcome-token transfers into the wallet, the sold positions and the wallet's funding are not published.
- The loss figures are not reconciled: DefiLlama's about \$2.7M and BleepingComputer's about \$2.57M differ by about \$0.1M, and the basis of neither is public. The 28.6M POL figure is the wallet's outflow, which may not equal the victims' loss, because some positions were sold for USDC rather than transferred.
- To finish the trace, re-run `python3 tools/explorer.py trace polygon 0x3F99139F1C5854bb628c2e576Aaf638e99dFfc18 --hops 1 --before 2026-11-02T00:00:00Z --yaml` from a network the provider accepts, or with a Blockscout API key.

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
