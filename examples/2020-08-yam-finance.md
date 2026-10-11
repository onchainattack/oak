# Yam Finance rebase-bug governance lockup — Ethereum — 2020-08-12 to 2020-08-13

**Loss:** approximately \$750K in Curve (yCRV) tokens locked in the YAM treasury by a rebase bug `[cointelegraph1]``[register1]`; no external attacker extracted funds. YAM balances and staking contracts were not directly affected `[register1]`. The incident is a **governance-speed-vs-bug-window** case: the bug disabled the governance needed to fix it.

**OAK Techniques observed:** **OAK-T9.001** (Smart-Contract Logic Error — primary; a missing division in the rebase function's scaling-factor line minted far more YAM than intended into the treasury, making governance quorum unattainable `[register1]``[cointelegraph1]`). **OAK-T3.001** (Sybil-Bundled Launch — structurally adjacent; mapping retained from the original classification; not supported by the cited sources). **OAK-T16.001** (Flash-Loan / Rapid-Deployment Vote Takeover — structurally adjacent, though no hostile takeover occurred; the governance quorum became unattainable due to the rebase bug rather than due to an attacker action).

**Attribution:** **unattributed** The bug was introduced by the Yam Finance team during rapid development; the project's README said the code had not been audited, only "spot checked by just a few pairs of eyes" `[register1]`. No hostile actor exploited it.

**Key teaching point:** **A governance mechanism whose quorum depends on a token supply that a bug can corrupt is structurally inoperable — the governance surface and the token-contract surface are a single failure domain.** The rebase over-minted YAM into the treasury contract, which held most tokens and could not vote, so the quorum could not be met and the treasury was "bricked" `[cointelegraph1]``[register1]`.

**Corrected 2026-10-11:** Bug description corrected (a missing `.div(BASE)` in the supply-scaling line, not divide-before-multiply); removed the unsourced ~\$600M TVL, 1% / 175,000 YAM quorum figures, "~13% of required quorum", the failed-vote narrative, and the V2 snapshot migration claim (the team only floated a "YAM 2.0"); discovery time corrected to about 18:00 UTC on 2020-08-12.

## Summary

Yam Finance was a DeFi yield-farming project launched in August 2020 with an elastic-supply (rebase) token, YAM. The Register reports that a single line in the rebasing contract, `totalSupply = initSupply.mul(yamsScalingFactor);`, was meant to include `.div(BASE)`; the omission made the contracts "mint far far more tokens than intended" `[register1]`. Andre Cronje said each call after the first would exponentially increase supply `[cointelegraph1]`.

The rebase also sold into the yCRV/YAM pool with up to 10% slippage, with proceeds and remaining YAM going to the treasury `[cointelegraph1]`. Governance proposals needed a percentage of tokens committed for 12.5 hours; the treasury held most of the tokens and could not vote, so quorum was unreachable and both governance and treasury were described as "bricked" `[cointelegraph1]``[register1]`. The bug was discovered at about 18:00 UTC on 2020-08-12; Yam posted a post-mortem on 2020-08-13 `[register1]`. The token price fell from a peak theoretical \$183.44 to \$1.04 `[register1]`. The team planned a Gitcoin-funded community audit and a possible "YAM 2.0" `[register1]`.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2020-08-11/12 | YAM launches; yield farming begins | (launch) |
| 2020-08-12 ~18:00 UTC | Rebase bug discovered | **T9.001 discovery** |
| 2020-08-12/13 | Over-minted YAM sits in the treasury; governance quorum unreachable; ~\$750K yCRV locked | **T9.001 terminal** |
| 2020-08-13 | Yam posts post-mortem; "YAM 2.0" floated | (post-incident) |

## What this example tells contributors writing future Technique pages

- **T9.001 (Smart-Contract Logic Error) is the load-bearing classification** for protocol-self-destruction by a supply-arithmetic bug; no oracle manipulation or hostile governance was involved.
- **Governance quorum and token supply should be validated as a coupled system at deploy time**; an unaudited, fast-shipped contract put both in one failure domain `[register1]`.

## Public references

- `[register1]` — The Register, "Single-line software bug causes fledgling Yam cryptocurrency to implode two days after launch" (2020-08-13): <https://www.theregister.com/2020/08/13/yam_cryptocurrency_bug_governance/>
- `[cointelegraph1]` — Cointelegraph, "Rebase bug permanently breaks YAM governance" (2020-08-13): <https://cointelegraph.com/news/rebase-bug-permanently-breaks-yam-governance>
- Cross-reference: T9.001 (Oracle Price Manipulation) at `techniques/T9.001-oracle-price-manipulation.md` — the YAM case is T9.001 by integer-arithmetic-logic-error, not by oracle-input-manipulation.
- Cross-reference: T16.001 (Flash-Loan / Rapid-Deployment Vote Takeover) at `techniques/T16.001-flash-loan-vote-takeover.md` — governance-quorum-unattainability-by-token-supply-corruption is structurally distinct from hostile-vote-by-loan.
