# MORE Markets — flash-loan self-liquidation cleared the attacker's collateral without clearing the matching WFLOW debt, so WFLOW could be withdrawn — MORE Markets / Flow EVM — 2026-11-16

**Loss:** **~\$308,000** (SlowMist Hacked tracker: "approximately \$308,000"). The assets taken, the split between WFLOW and other tokens, and any recovery are undisclosed. Flow Foundation says impact is "limited to users supplying WFLOW to the MORE Markets ankrFLOW/WFLOW market". No reimbursement plan had been published when this entry was written.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*, per Flow Foundation: the attacker used the public borrow and liquidation path with their own positions, and "a flaw in how MORE's contracts handled these liquidations cleared the collateral without clearing the matching WFLOW debt". The books were wrong after the liquidation, not the access control. The exact function and branch are undisclosed. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). **OAK-T9.004** was considered and not used: no source says a caller, role or counterparty was accepted that should have been rejected. Flash-loan funding is stated by the operator-side source, but OAK has no technique row for flash-loan capital alone, so it is recorded in the timeline without a separate tag.

**Attribution:** **unattributed**. The attacker address, exploit contract and transaction hashes were not found in any source OAK could reach (see Root-cause evidence). Flow Foundation says only "an attacker".

**Key teaching point:** **A liquidation must reduce the borrower's debt and collateral together, and the protocol must refuse any liquidation that leaves debt outstanding against zero collateral, including when borrower and liquidator are the same actor.** A post-liquidation solvency check on the market (total supplied WFLOW covers total owed plus withdrawable balances) enforced in the contract, and invariant tests of the liquidation path against self-liquidation inside a flash-loan transaction, would have stopped the withdrawal step. Detail of the flaw is undisclosed, so this is the control implied by the operator's description.

## Summary

At about 17:30 UTC on 2026-11-16 an attacker used flash loans to open and then liquidate their own positions in the ankrFLOW/WFLOW market of MORE Markets, a lending protocol on Flow EVM. Per Flow Foundation, the contracts' liquidation handling cleared the collateral but not the matching WFLOW debt, and WFLOW was then withdrawn. MORE paused the protocol, Ankr paused ankrFLOW, and some exchanges paused FLOW deposits and withdrawals. Flow Foundation states that the Flow network, Flow EVM and Cadence were not exploited. SlowMist's tracker lists the loss as about \$308,000.

## Timeline (UTC)

Stages: **Flaw** (the liquidation accounting), **Take** (flash-loaned self-liquidation, then withdrawal), **Money** (undisclosed), **Response** (pauses). Times come from the Flow Foundation statement (posted 22:31:05 UTC on 2026-11-16); the exploit time is "approximately".

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-16 (date undisclosed) | MORE Markets' lending contracts handle liquidations so that collateral is cleared while the matching WFLOW debt is not. Whether this was in the original deployment or an upgrade is undisclosed. | **T9.016** |
| Before ~17:30 (undisclosed) | Preparation: funding of the attacker and any contract deployment are undisclosed. | — |
| ~17:30 | The attacker uses flash loans to open positions in the ankrFLOW/WFLOW market and liquidate them. Collateral is cleared, the WFLOW debt is not, and WFLOW is withdrawn. Transaction hashes: undisclosed. | **T9.016** |
| After ~17:30 | Where the WFLOW and any other assets went: undisclosed. Flow Foundation says "security experts have been informed and are tracing the funds". | — |
| 2026-11-16, before 22:31 | MORE Markets pauses its protocol. Ankr pauses ankrFLOW "as a precaution". Some exchanges temporarily pause FLOW deposits and withdrawals. | response |
| 2026-11-16 22:31 | Flow Foundation publishes its statement and says further updates will come from @MORE_DeFi and @AnkrLabsTeam. | response |

Key addresses:

- Attacker EOA: undisclosed
- Exploit contract: undisclosed
- MORE Markets ankrFLOW/WFLOW market contracts: undisclosed (no source gives an address)

## Fund flow

OAK has no on-chain data for this incident: no source gives an address or transaction, and `tools/chains.json` has no Flow EVM entry, so OAK did not trace it. The block below records the one edge the operator-side source states.

```oak-flow
as_of: 2026-11-17T00:00Z
nodes:
  - {id: mkt, chain: flow-evm, role: vulnerable-contract, label: "MORE Markets ankrFLOW/WFLOW market (address undisclosed)"}
  - {id: atk, chain: flow-evm, role: attacker-eoa, label: "Attacker (address undisclosed)"}
edges:
  - {from: mkt, to: atk, asset: WFLOW, time: 2026-11-16T17:30:00Z, technique: T9.016, verified: source, source: flow2026more}
```

Amount, transaction and onward movement are undisclosed.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/flow_blockchain/status/2122457454726312274>; <https://hacked.slowmist.io/>
- **Source type:** operator
- **Confidence:** reported
- **Evidence:** Flow Foundation, which is adjacent to the operator and not MORE itself, states that the attacker used flash loans to open and liquidate their own positions and that the contracts cleared collateral without clearing the matching WFLOW debt. It says "the issue was specific to MORE's contract logic". Only this one account of the mechanism was found, and no post-mortem from MORE or Ankr, no firm analysis, and no address or transaction was reachable, so the status is preliminary. The vulnerable function and the exact branch are unknown. The \$308K figure is SlowMist's alone.

## Public references

- `[flow2026more]` — Flow Foundation (@flow_blockchain), "Statement on the MORE Markets incident" (2026-11-16): <https://x.com/flow_blockchain/status/2122457454726312274>
- `[slowmist2026hacked]` — SlowMist Hacked tracker, MORE Markets entry (2026-11): <https://hacked.slowmist.io/>
