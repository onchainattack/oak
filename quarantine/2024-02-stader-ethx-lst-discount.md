> **QUARANTINED 2026-11-27 — not part of the OAK corpus.** The 2026-11 source pass rewrote this file from the pages it could open and found no attack to record: the risk assessment it rests on says ETHx had no significant depeg event, and no cascade, redemption failure or attacker appears in either source. It is kept here, outside `examples/`, and can return if a source documents an incident.

# Stader ETHx — liquid staking token trades at a small discount to ETH on thin, Curve-concentrated liquidity — Ethereum — 2024-01 to 2024-04

**Loss:** none reported. [LlamaRisk](https://hackmd.io/@LlamaRisk/ETHx-addendum) says ETHx "still trades at a marginal discount to ETH", with peg accuracy of 97.3%–100.15% over 2024-01-22 to 2024-04-21 per Staking Rewards, and concludes ETHx had no significant depeg event since December 2023. No opened page reports a dollar loss, an attacker or an incident.

**OAK Techniques observed:** none — the opened pages describe a persistent marginal secondary-market discount, which LlamaRisk explicitly does not classify as a depeg event, with no cascade, no redemption failure and no attacker. The earlier mapping to the LST/LRT depeg-cascade technique is withdrawn because no opened page shows a constrained redemption path or a liquidation cascade.

**Attribution:** **unattributed** — no attack.

**Key teaching point:** **Before onboarding a thinly traded LST as collateral, measure its market price against its exchange rate and its pool depth, and size the haircut to that, not to the redemption rate.** LlamaRisk's own caution on ETHx is that liquidity is concentrated in Curve pools, so a liquidation would have price impact.

## Summary

[PrismaRisk's December 2023 assessment](https://hackmd.io/@PrismaRisk/ETHx) records that ETHx, Stader's Ethereum liquid staking token, ran a launch-month incentive program from 2023-07-10 to 2023-08-09 UTC and had historically traded at a slight discount to ETH, generally 0.15%–0.35%; it also says withdrawals may involve a queue and can take up to 7–10 days for large amounts. [LlamaRisk's addendum](https://hackmd.io/@LlamaRisk/ETHx-addendum), covering data to May 2024, reports that ETHx still traded at a marginal discount, with Staking Rewards peg accuracy of 97.3%–100.15% over 2024-01-22 to 2024-04-21 and a generally ~99% range over the 90 days observed. It reports that, per Dex Guru on 2024-04-20, about 99% of ETHx liquidity sat in Curve pools, and that over 85% of ETHx was deposited into EigenLayer. It rates volatility "good" because there was no significant depeg. Neither page attributes the discount to a cause such as liquidity moving to restaking tokens; that explanation earlier in this file has no source and is removed.

## Timeline (UTC)

**Flaw** is not applicable (no flaw is reported); the rows are the market conditions both reports describe.

| When | What happened | OAK |
|---|---|---|
| 2023-07-10 to 2023-08-09 | ETHx launch-month staker incentive program ([PrismaRisk](https://hackmd.io/@PrismaRisk/ETHx)) | — |
| 2023-12-12 | PrismaRisk publishes its collateral risk assessment; ETHx has generally traded at a 0.15%–0.35% discount ([PrismaRisk](https://hackmd.io/@PrismaRisk/ETHx)) | none — no attack |
| 2024-01-22 to 2024-04-21 | Peg accuracy 97.3%–100.15% per Staking Rewards, as cited by [LlamaRisk](https://hackmd.io/@LlamaRisk/ETHx-addendum) | none — no attack |
| 2024-04-20 | About 99% of ETHx liquidity in Curve pools per Dex Guru ([LlamaRisk](https://hackmd.io/@LlamaRisk/ETHx-addendum)) | — |
| 2024-05-01 | LlamaRisk addendum, as of this date: no significant depeg event | response |

No address or transaction is given in full on an opened page for this event; the ETHx token contract is cited by LlamaRisk as [`0xA35b1B31Ce002FBF2058D22F30f95D405200A15B`](https://etherscan.io/token/0xA35b1B31Ce002FBF2058D22F30f95D405200A15B).

## Root-cause evidence

- **Technique:** none — no attack
- **Source:** <https://hackmd.io/@LlamaRisk/ETHx-addendum>; <https://hackmd.io/@PrismaRisk/ETHx>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** both reports are risk assessments, not incident reports. They show a small, persistent discount and concentrated liquidity, and say there was no significant depeg. The cause of the discount is not stated.

## Public references

- LlamaRisk, "Addendum to Collateral Risk Assessment - Stader ETHx" (data as of 2024-05-01): <https://hackmd.io/@LlamaRisk/ETHx-addendum>
- PrismaRisk, "Collateral Risk Assessment - Stader ETHx" (2023-12-12): <https://hackmd.io/@PrismaRisk/ETHx>
