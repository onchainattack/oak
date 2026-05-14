# Polymarket UMA vote capture — US-Iran ceasefire market — 2026-04

**Loss:** ~\$11M in disputed market volume resolved against the underlying real-world outcome. A coordinated UMA-tokenholder cohort voted to drive resolution to the outcome that maximised their bettor-side payoff, overriding the market's stated resolution criteria.
**OAK Techniques observed:** **OAK-T9.006.001** (DVM Vote Capture by Economically-Interested Holder) — primary. **OAK-T16.004** (Governance/DAO Voting Capture — the UMA DVM vote capture is a governance-attack primitive: a whale cluster controlling ~7M UMA tokens (~30% of resolution vote weight) voted YES on the ceasefire market to capture the market's outcome in favour of their YES-side positions. The vote-capture mechanism is structurally a T16.004 governance-attack surface operating at the oracle-resolution layer.)
**Attribution:** **inferred-strong** at the whale-cluster level; the voting wallets were identifiable on-chain and correlated with large YES-side positions on the same market. No named-individual identification at v0.1.
**Key teaching point:** **The US-Iran ceasefire market is the third independent T9.006.001 case — following Ukraine mineral deal (March 2025) and UFO declassification (December 2025) — confirming that DVM vote capture is a recurring structural class, not a one-off governance anomaly.** The pattern now meets the multi-independent-anchor threshold for promotion from `emerging` to `stable` maturity.

## Summary

The Polymarket market "US and Iran agree to ceasefire before July 2026?" accumulated approximately \$11M in volume. The market's resolution criteria required an official announcement from the US or Iranian governments confirming a ceasefire agreement. As of the market's resolution date in April 2026, no such announcement had been made.

Despite the absence of a real-world ceasefire announcement, the market resolved YES after a coordinated UMA-tokenholder voting campaign. Analysis of the UMA DVM vote logs identified a whale cluster controlling approximately 7 million UMA tokens across 5 wallets (~30% of the total resolution vote weight). The same wallets held large YES-side positions on the Polymarket market, establishing the voter-bettor identity overlap that is the canonical T9.006.001 signature.

Polymarket's public response reiterated the platform's structural constraint: under UMA's decentralised dispute-resolution architecture, Polymarket cannot override a DVM vote outcome. The platform acknowledged the resolution was inconsistent with the stated criteria but, consistent with its response to the Ukraine mineral deal and UFO declassification cases, declined to issue refunds.

The US-Iran ceasefire case is the third independent T9.006.001 incident, following the Ukraine mineral deal (March 2025, ~\$7M) and UFO declassification (December 2025, ~\$16M). The three cases together establish the vote-capture pattern as a recurring structural class on Polymarket/UMA:

- **Case 1 (Ukraine mineral deal, March 2025):** ~5M UMA, ~25% vote weight, ~\$7M volume.
- **Case 2 (UFO declassification, December 2025):** whale vote-weight concentration, ~\$16M volume.
- **Case 3 (US-Iran ceasefire, April 2026):** ~7M UMA, ~30% vote weight, ~\$11M volume.

The cohort pattern is consistent: a whale or small cluster of tokenholders with material bettor-side positions votes to drive resolution to the payoff-maximising outcome, overriding the market's stated resolution criteria. The oracle market cap remains below the disputed-market volume in all three cases, making the economic cost of vote corruption a fraction of the prize.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2025–2026 | US-Iran ceasefire market accumulates ~\$11M in volume; whale cluster accumulates YES-side positions and UMA voting power | (market activity) |
| 2026-04 (resolution window) | UMA DVM vote triggered; whale cluster casts ~7M UMA (~30% vote weight) for YES resolution | **T9.006.001** (DVM vote capture) |
| 2026-04 | Market resolves YES despite absence of real-world ceasefire announcement; YES-side bettors (including whale cluster) collect payouts | **T9.006.001** extraction |
| 2026-04 | Polymarket acknowledges resolution inconsistency but declines refunds, citing UMA's decentralised structure | (platform response) |
| 2026-04 | Industry coverage (CoinDesk, The Block) documents the third T9.006.001 incident; vote-capture pattern now established as recurring structural class | (cohort recognition) |

## Realised extraction

~\$11M in disputed market volume. Aggrieved NO-side bettors lost their stakes; YES-side bettors (including the voting whale cluster) collected payouts. No refunds.

## Public references

- Cross-reference: T9.006.001 at `techniques/T9.006.001-dvm-vote-capture.md`.
- Cross-reference: 2025-03-polymarket-uma-ukraine-mineral-deal at `examples/2025-03-polymarket-uma-ukraine-mineral-deal.md` (canonical T9.006.001 case 1).
- Cross-reference: 2025-12-polymarket-ufo-declassification-uma-vote-capture at `examples/2025-12-polymarket-ufo-declassification-uma-vote-capture.md` (T9.006.001 case 2).

## Public References

See citations in corresponding technique file.
