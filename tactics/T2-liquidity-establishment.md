# OAK-T2 — Liquidity Establishment

**Phase:** Pre-launch / Launch
**Adjacent tactics:** T1 (Token Genesis), T3 (Holder Capture), T5 (Value Extraction)

## Scope

Liquidity Establishment covers the way a token's tradable liquidity is set up after deployment. From a defender's perspective, the structure of the initial liquidity pool — who provided it, what assets are paired, what locking or vesting is claimed, and how concentrated control is over LP tokens — is one of the most predictive signals about whether the token is set up for adversarial value extraction later.

## What defenders observe

- Initial pool creation events on DEX factories, with the LP token mint going to addresses controlled (directly or indirectly) by deployment-related clusters.
- Pool composition signals: single-sided liquidity, very low quote-asset depth, or unusual pairings that constrain natural price discovery.
- Claims of "locked liquidity" that, on inspection, point to short-duration locks, locks with administrative override roles, or locks on a small fraction of the LP supply.

## Relationship to other tactics

T2 sets the conditions under which T5 (Value Extraction) becomes feasible. Many T5 Techniques are only operationally meaningful when paired with a specific T2 setup — defenders who classify the liquidity-establishment pattern early can predict the extraction Techniques the token is "configured for."

## Techniques in this Tactic (v0.1)

- OAK-T2.001 — Single-Sided Liquidity Plant
- OAK-T2.002 — Locked-Liquidity Spoof

## Maintainer notes

Coverage gap to track: cross-chain bridged-liquidity setups where the LP-control surface is split across chains and conventional locker contracts do not apply.
