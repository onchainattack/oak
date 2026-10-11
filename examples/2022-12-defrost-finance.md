# Defrost Finance exit scam — Avalanche — 2022-12-23

**Loss:** approximately \$12M (drained from Defrost Finance's leveraged-lending protocol on Avalanche C-Chain, per PeckShield's estimate relayed by CoinDesk; Defrost itself did not disclose an amount). The team described a flash-loan re-entrancy attack on its V2 contract followed by a larger attack on V1 that used a private key to add a fake collateral token and price oracle. Security firms (PeckShield, CertiK, DeFiYieldSec) alleged an inside job / exit scam; the team denied this and said the V1 attacker returned the funds on 2022-12-26. The operator-exit classification below is therefore an allegation, not an established finding.
**OAK Techniques observed:** **OAK-T5.005** (Treasury Management / Operator Exit — alleged use of administrative authority to add a fake collateral token and oracle and drain user deposits) as the *extraction mechanism*; **OAK-T5.001** (Hard LP Drain — the extraction emptied the pools users had deposited into).
**Attribution:** **unattributed** The team attributes the larger attack to an external party who obtained a private key; DeFiYieldSec alleged the creator of Defrost's multi-sig was the address that requested the oracle replacement before the exploit. Neither claim is independently confirmed in the cited reporting. No law-enforcement action is documented.
**Key teaching point:** **Defrost Finance is a worked example of how a key-controlled collateral/oracle configuration path lets one party, insider or intruder, drain a lending protocol without exploiting any code bug, and of how hard it is for outsiders to tell "key compromise" from "operator exit" from the outside.** The structural risks are: (i) an administrative key that can add collateral tokens and swap oracles is a single point of failure for all user deposits, (ii) a "hack" announcement and a rug pull can look identical at the moment of loss, and (iii) the distinction only emerges, if at all, from post-hoc on-chain provenance analysis.

**Corrected 2026-10-11:** the original text asserted a confirmed operator exit via malicious contract upgrade, a debunked cover story, operator abandonment and no fund return; sources instead report two attacks (flash-loan re-entrancy on V2, key-based fake-collateral/oracle attack on V1), an unproven rug-pull allegation denied by the team, and the team's claim that funds were returned on 2022-12-26.

## Summary

Defrost Finance was an Avalanche DeFi protocol offering leveraged trading/lending, with the H2O stablecoin and MELT token. Per CoinDesk, a first attack (the week before 2022-12-30; around 2022-12-23) was described by a Defrost spokesperson as a flash-loan re-entrancy exploit against the V2 contract. A second, larger attack (around 2022-12-24/25) was described by Defrost as the work of someone who obtained a private key, added a fake collateral token and price oracle, minted 100 million H2O, liquidated existing vaults by manipulating their oracles and drained the funds.

PeckShield, citing community intel, estimated the loss at about \$12M and said it might be a rug pull; CertiK said it could not reach the team. DeFiYieldSec alleged the multi-sig creator address also requested the oracle replacement before the exploit. Defrost called the accusations "slanderous and inaccurate", said it paid the attacker a bounty and that all funds were returned on 2022-12-26, and planned to reimburse users by on-chain balance snapshot. The team had previously run FinNexus, whose May 2021 "hack" was also widely suspected of being a rug pull. This file does not establish which reading is correct.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| ~2022-12-23 | First attack on V2 contract, described by the team as flash-loan re-entrancy | (first incident) |
| ~2022-12-24/25 | Larger attack on V1: fake collateral token and oracle added via a key, 100M H2O minted, vaults liquidated, funds drained | **T5.005 + T5.001 extraction (alleged)** |
| 2022-12-25 | Defrost announces V1 and V2 were exploited; PeckShield estimates ~\$12M and raises rug-pull possibility; CertiK cannot reach team | (public disclosure) |
| 2022-12-26 | Defrost says the V1 attacker returned the funds; plans on-chain balance snapshot for reimbursement | (claimed recovery) |
| 2022-12-30 | DeFiYieldSec's inside-job allegation reported; Defrost denies it | (dispute) |

## What defenders observed

- **A key-gated collateral and oracle path is a drain path.** The larger attack needed no code vulnerability: adding a fake collateral token and an oracle that overvalues it lets minted tokens be treated as real collateral and existing positions be liquidated. Controls that matter are who can add collateral or oracles and whether a timelock or multi-party approval applies.
- **Outsiders cannot cleanly tell hack from exit.** Security firms disagreed with the team in real time, and the one on-chain provenance claim (multi-sig creator address also requested the oracle change) was reported as an allegation by a single firm.
- **Returned funds do not settle the classification.** Fund return is neutral metadata; it neither makes the event more nor less of an attack.

## What this example tells contributors writing future Technique pages

- **Administrative-authority concentration is the load-bearing risk factor.** Multi-signature authority with independent parties, timelocks on collateral and oracle changes, and public notice of such changes each act as mitigations whether the key holder is an intruder or an insider.
- **State the evidentiary status.** Where an operator-exit reading rests on third-party allegations and the team denies it, the example should say so rather than treat the exit as established.

## Public references

- `[coindesk20221225]` — CoinDesk, "Defrost Finance Hacked in Attack Some Say May Have Been a Rug Pull" (2022-12-25): <https://www.coindesk.com/business/2022/12/25/defrost-finance-hacked-in-attack-some-say-may-have-been-a-rug-pull>
- `[coindesk20221226]` — CoinDesk, "Defrost Finance Says Hacked Funds Have Been Returned" (2022-12-26): <https://www.coindesk.com/business/2022/12/26/defrost-finance-says-hacked-funds-have-been-returned>
- `[coindesk20221230]` — CoinDesk, "Defrost Finance Denies Rug Pull Allegations Amid \$12M Exploit" (2022-12-30): <https://www.coindesk.com/business/2022/12/30/defrost-finance-denies-rug-pull-allegations-amid-12m-exploit>
- `[web3defrost]` — Web3 Is Going Great, "Defrost Finance fails to rug pull": <https://www.web3isgoinggreat.com/?id=defrost-finance-fails-to-rug-pull>

## Discussion

Defrost Finance is useful to OAK as an example of an incident where the operator-exit versus key-compromise question is open. The mechanism (key-controlled fake collateral and oracle, mass liquidation) is documented by the team and by PeckShield's analysis as relayed in the press; the intent is disputed. Contributors should keep the T5.005 mapping marked as alleged unless stronger on-chain provenance is published.
