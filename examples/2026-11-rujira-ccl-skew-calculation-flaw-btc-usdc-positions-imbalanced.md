# Rujira Trade — flaw in the CCL skew calculation let an attacker imbalance BTC/USDC concentrated-liquidity positions and take their value — Rujira AMM Strategies / THORChain App Layer (CosmWasm) — 2026-11-10

**Loss:** **~\$200K** (BTC/USDC CCL positions; "roughly \$175k from Liquidy Finance's CCL positions and \$25k from user funds", per the operator). Recovered or frozen: undisclosed. The operator states "All losses will be fully reimbursed."

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*, operator-stated). The operator says the attacker "exploited an issue with the CCL skew calculations, allowing them to imbalance existing BTC/USDC CCL positions". The contract's own skew computation, not a key or a role check, left the positions mispriced, so the caller was entitled to every call it made. The exact function and arithmetic are undisclosed. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md). The operator describes a "sharp price spike in the BTC/USDC market" followed by a "surge in trading activity across the orderbook"; no source states that an external oracle was manipulated or that a flash loan was used, so OAK-T9.001 and OAK-T9.002 are not claimed.

**Attribution:** **unattributed** (no attacker address or identity published).

**Key teaching point:** **A strategy parameter that shifts how liquidity is quoted (here, "skew") needs an on-chain bound, so one trader sequence cannot unbalance a position holding other people's funds.** The operator's fix is to remove the skew parameter from the contract entirely, which removes the flawed calculation instead of patching it.

## Summary

On the evening of 2026-11-10 (exact time undisclosed), Rujira Trade, the trading app on THORChain's CosmWasm app layer, showed suspicious activity: a sharp price spike in the BTC/USDC market and then a surge of orderbook trading. The operator's investigation found that an attacker exploited an issue in the concentrated-liquidity (CCL) skew calculations to imbalance existing BTC/USDC CCL positions. The estimated loss is around \$200K, about \$175K from Liquidy Finance's CCL positions and about \$25K from user funds. CosmWasm was halted on the app layer while recovery is worked out. The operator published its update on 2026-11-11 13:30:56 UTC. No attacker address or transaction hash has been published by the operator or by RektRadar.

## Timeline (UTC)

**Flaw** → **Take** → **Money** → **Response**. Only the operator's update (2026-11-11 13:30:56 UTC, which says "yesterday evening") gives timing; no exact times or transactions are published.

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-10 (undisclosed) | The CCL contract's skew calculation was flawed. Whether it was audited, and since when it was live, is undisclosed. | **T9.016** |
| Before 2026-11-10 evening (undisclosed) | Preparation and funding of the attacker: undisclosed. | — |
| 2026-11-10, evening (exact time and tx undisclosed) | "suspicious activity was spotted on Rujira Trade, causing a sharp price spike in the BTC/USDC market, followed by a surge in trading activity across the orderbook." The attacker imbalanced existing BTC/USDC CCL positions. | **T9.016** |
| 2026-11-10 to 11-11 (undisclosed) | Where the proceeds went: undisclosed. No chain, address, swap, bridge or laundering path is published. | — |
| 2026-11-11 (time undisclosed) | CosmWasm halted on the app layer: "CosmWasm is now halted while we work out the details of the recovery process". | response |
| 2026-11-11 13:30:56 | Operator update: loss about \$200K, "All losses will be fully reimbursed", the skew parameter will be removed "entirely from the contract", and recovery is estimated at "1–2 days", after which Nodes are asked to resume the App Layer. | response |

Key addresses:

- Attacker — undisclosed
- Vulnerable CCL / strategy contract — undisclosed
- Liquidy Finance CCL positions — undisclosed
- Receiving / holding wallet — undisclosed

No follow-up post-mortem or CosmWasm resumption notice was found in the sources reached (see Root-cause evidence).

## Fund flow

No address, transaction or destination has been published, so no edge can be traced. The block records the known endpoints without addresses and marks the movement as undisclosed.

```oak-flow
as_of: 2026-11-17T00:00Z
nodes:
  - {id: vic, chain: thorchain, role: vulnerable-contract, label: "Rujira BTC/USDC CCL positions (address undisclosed)"}
  - {id: atk, chain: thorchain, role: attacker-eoa, label: "Attacker (undisclosed)"}
edges:
  - {from: vic, to: atk, asset: "BTC/USDC CCL position value (~$200K total, split undisclosed)", time: 2026-11-10T00:00:00Z, technique: T9.016, verified: source, source: rujira2026}
```

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/RujiraNetwork/status/2120509584553259366>; <https://www.rektradar.xyz/web3-daily-exploits-12-nov-2026-rujira-200k-skew-ccl/>
- **Source type:** operator
- **Confidence:** reported
- **Evidence:** The operator says "an attacker exploited an issue with the CCL skew calculations, allowing them to imbalance existing BTC/USDC CCL positions" and that its "investigation indicates" this. That is a preliminary operator statement published about a day after the event, not a post-mortem, so OAK holds it at reported until a technical write-up or the contract diff that removes the skew parameter is published. RektRadar repeats the operator's figures and classifies it as a protocol logic flaw rather than a key compromise; it is not independent. Still unknown: the function and arithmetic that were wrong, the attacker's transactions, how the price spike was produced, and where funds went.

## Public references

- `[rujira2026]` — Rujira (@RujiraNetwork), "Update on Rujira Trade, BTC/USDC CCL and the current CosmWasm pause" (2026-11-11): <https://x.com/RujiraNetwork/status/2120509584553259366>
- `[rektradar2026]` — RektRadar, "Web3 daily exploits 12 Nov 2026: Rujira \$200K skew CCL" (2026-11-12): <https://www.rektradar.xyz/web3-daily-exploits-12-nov-2026-rujira-200k-skew-ccl/>
