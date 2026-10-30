# Polymarket — a performance-monitoring vendor's script, loaded on the site, hijacked logged-in sessions and sold or moved users' positions — Polymarket (international) / Polygon — 2026-10-29

**Loss:** **~\$2.5–2.7M.** DefiLlama tracks ~\$2.7M; BleepingComputer traced ~28.6M POL (~\$2.57M) out of the attacker wallet `0x3F99…Fc18`. Polymarket says affected users "will be made whole"; it has not published a user count or total. Polymarket US was not affected.

**OAK Techniques observed:** **OAK-T15.002** (Supply-Chain / Vendor-Pipeline Compromise — *primary*. Polymarket: "One of our 3rd party providers was compromised." Hudson Rock and BleepingComputer found the malicious JavaScript at `cdn.debugbear[.]com`, served through **DebugBear's Real User Monitoring embed**, and talking to `data.debugbear.com` for instructions. DebugBear confirmed "an ongoing security incident" and told customers to remove the embed. See [`techniques/T15.002-supply-chain-vendor-pipeline-compromise.md`](../techniques/T15.002-supply-chain-vendor-pipeline-compromise.md)). The script used the visitor's **authenticated trading session**: it checked balances and positions, auto-sold positions for some users and transferred outcome tokens straight to the attacker for others, using Polymarket's normal transaction functions. No user signature prompt was needed, which separates it from the [June 2026 Polymarket vendor injection](2026-06-polymarket-frontend-vendor-js-injection-approval-drain.md) (T4.002 approval prompts).

**Attribution:** **unattributed.** Referred to law enforcement.

**Key teaching point:** **A monitoring script runs with the user's session.** Third-party analytics on a page where a session can trade and withdraw is a signing path. Polymarket's second frontend-vendor drain in four months argues for no third-party script on authenticated trading pages, or strict CSP/SRI pinning where one is unavoidable.

## Summary

Between 13:50 and 13:56 ET on 2026-10-29 the attacker wallet made many transactions against Polymarket's outcome-token contract. A build removing the DebugBear script went live at 13:59, the exchange went cancel-only at 14:05, and Polymarket announced the halt at 14:37. Trading resumed about an hour later.

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
