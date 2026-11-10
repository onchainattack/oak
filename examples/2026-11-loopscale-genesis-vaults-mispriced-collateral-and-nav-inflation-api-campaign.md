# Loopscale — a week-long API probing campaign found two paths: collateral valued as a different asset (undercollateralized SOL loan) and a high-interest loan sold into a vault to inflate its NAV — Loopscale Genesis Vaults / Solana — 2026-11-05

**Loss:** **\$0 user loss** per Loopscale ("Affected vaults have been made whole and no user deposits have incurred a loss"). Attempted extraction per Loopscale's 2026-11-06 update: an undercollateralized loan of **~\$412K** from the SOL Genesis Vault, and a disproportionate redemption of **~\$521K** from the USDC Genesis Vault "which our systems halted within 30 seconds of transaction generation". Loopscale does not say how the vaults were made whole or by whom. The \$412K and \$521K figures are Loopscale's own; the 4,598.434180621 SOL in the unwind transaction below is traced by OAK.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*, operator-stated. Both paths made the protocol's own books wrong in the caller's favour: path 1 a misconfigured combination of asset-pricing parameters made deposited collateral be "valued as a different asset"; path 2 an atomic bundle sold a loan "carrying an extreme interest rate" into the USDC Genesis Vault, which inflated the vault's NAV and let a redemption take more than the redeemer's share. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). No separate Technique fits the API probing phase: Loopscale says the attacker targeted "publicly inspectable program logic and private transaction-building APIs" with more than 30,000 malicious requests a day, but does not say what the requests did; OAK records this as undisclosed rather than forcing a fit.

**Attribution:** **unattributed.** Loopscale calls the actor "sophisticated" and published four addresses (two Solana, two EVM) "identified in connection with this activity"; it has not named anyone and says it is working with federal law enforcement.

**Key teaching point:** **A lending vault must check, at the moment it accepts a loan or collateral, that the asset identity and the interest rate fall inside bounds the vault itself enforces, rather than trusting parameters assembled by an off-chain transaction builder.** Both paths used inputs the protocol accepted as valid (a pricing-parameter combination, a loan with an extreme rate) that no on-chain bound rejected. A cap on the rate of any loan a vault will buy, and a check that the pricing identifier matches the deposited mint, would have broken each path at its first step.

## Summary

Loopscale is a Solana lending protocol; its SOL and USDC Genesis Vaults hold depositors' funds that are lent to borrowers. On 2026-11-05 at 10:13 UTC it announced that it had been targeted "over the past week" by a sophisticated actor whose requests hit its APIs more than 30,000 times a day, that it had paused the protocol after an escalation, and that the vaults had been made whole. On 2026-11-06 it described the two paths. First, against the SOL Genesis Vault, a misconfigured combination of asset-pricing parameters caused deposited collateral to be valued as a different asset, enabling an undercollateralized loan of about \$412K. Later, an atomic bundle sold a loan with an extreme interest rate into the USDC Genesis Vault, inflating its NAV and enabling a redemption of about \$521K that Loopscale's systems halted within 30 seconds of transaction generation. Third-party coverage (Rektradar) gives the worked example as 1 kySOL treated as a zBTC identifier. OAK's own read of one Solana transaction shows 1 kySOL and 4,598.434180621 SOL moving on 2026-11-03, which is consistent with an unwind of the SOL loan. This is a different incident from the April 2025 RateX pricing exploit ([related: `2025-04-loopscale.md`](2025-04-loopscale.md)).

## Timeline (UTC)

**Flaw**: pricing parameters and loan purchases are accepted without on-chain bounds. **Preparation**: a week of API probing. **Take**: two paths, SOL vault then USDC vault. **Money**: the SOL loan is unwound; the USDC redemption is halted. **Response**: pause, statement, staged restore. Times for the statements are from the X posts; Solana times are from block times.

| When | What happened | OAK |
|---|---|---|
| Before 2026-11 (since when: undisclosed) | Loan pricing parameters can be combined so that collateral is valued as another asset, and a vault will buy a loan with an extreme interest rate; neither is bounded on-chain. Loopscale calls both "publicly inspectable program logic" reached through "private transaction-building APIs". | **T9.016** |
| About 2026-10-29 to 2026-11-05 (exact start undisclosed) | Sustained campaign: more than 30,000 malicious API requests per day. What the requests did is undisclosed. | — |
| 2026-11-01 19:33:31 to 19:52:38 | Eight Solana transactions on a Loopscale-published address (`247Lk5YNH9URfBBvxVUtDruz8GvGX8gKGuYHVCZThpiR`), first [`2BzqTxMSha1HtURY7mMXssgPsyMb3xFiifataqzUUHh8kLbVXGPmKWh1qhQ92ypn6S4asvUgBp1zVWmpusSmHY6k`](https://solscan.io/tx/2BzqTxMSha1HtURY7mMXssgPsyMb3xFiifataqzUUHh8kLbVXGPmKWh1qhQ92ypn6S4asvUgBp1zVWmpusSmHY6k), last [`5r2GNcEpiJaNmzNB5QVR5wv1LsXa9gWMwJcnLmFigFd1XqaN4RKqtCvyGwpNhETWtKBvo7tzZLy55sgRpYTAkx7d`](https://solscan.io/tx/5r2GNcEpiJaNmzNB5QVR5wv1LsXa9gWMwJcnLmFigFd1XqaN4RKqtCvyGwpNhETWtKBvo7tzZLy55sgRpYTAkx7d). The last is a system-program-only transaction with no token movement. OAK did not decode the others; their purpose is undisclosed. This is the only activity on that address and is the best available preparation signal. | — |
| 2026-11 (date and time undisclosed) | Path 1: against the SOL Genesis Vault, collateral is valued as a different asset (Rektradar: 1 kySOL treated as a zBTC identifier) and an undercollateralized loan of about \$412K (reports: about 4,597 SOL) is taken. No transaction hash is published. | **T9.016** |
| 2026-11-03 13:43:50 | Traced by OAK: in [`47zp5i14ERm2soQQGLs5LKRk4Xi2Yigh6iuJ68URKe4VfzC9u2GpgWYbLG73fT4a645GBnUibZ5gP69kfaD7DbAo`](https://solscan.io/tx/47zp5i14ERm2soQQGLs5LKRk4Xi2Yigh6iuJ68URKe4VfzC9u2GpgWYbLG73fT4a645GBnUibZ5gP69kfaD7DbAo), a call to the Loopscale program `1oopBoJG58DgkUVKkEzKgyG9dvRmpgeEm1AVjoHkF78`, signer `rektbdF5r7HnWrPDRvD76pC1V9rVfaGmbSY3Dsrj8Kx` sends **4,598.434180621 SOL** into a wrapped-SOL account owned by `8oCX3kkgviLPxYGBfSt1kCKWVmHer1pHqutPTiBYnGpu`, and **1 kySOL** moves from escrow-side owner `Gb2qCYLs3dEy6D4TvdLYr7wRDMMWDCPR9oK5SzNa5Gtn` to the signer. The size matches Loopscale's "later liquidation returned roughly the same SOL amount" (Rektradar). That this is the path-1 loan, and that `8oCX…` is the SOL Genesis Vault, are inferences by OAK, not stated by a source. | **T9.016** |
| 2026-11 (later; date and time undisclosed) | Path 2: an atomic transaction bundle sells a loan with an extreme interest rate into the USDC Genesis Vault, inflating its NAV; a redemption of about \$521K is generated. Loopscale's systems halt it within 30 seconds of transaction generation, so it does not settle. | **T9.016** |
| 2026-11-05 (time of pause undisclosed) | Loopscale's systems detect "a significant escalation" and the protocol is paused. | response |
| 2026-11-05 10:13:27 | Loopscale announces the campaign, the pause, that vaults were "made whole", and publishes four addresses. | response |
| 2026-11-06 00:34:00 | Update: priority loan functions restored (collateral top-ups, repayments except for USDC Genesis Vault loans, collateral withdrawal for fully repaid loans). Vault withdrawals stay restricted. Loopscale says both paths are "identified and contained" and gives the \$412K and \$521K figures. | response |
| Not published | Post-mortem, fix details, how vaults were made whole, transaction hashes for the two paths, law-enforcement outcome. | undisclosed |

Key addresses (the four are Loopscale-published; the Solana role labels are OAK's):

- Loopscale-published Solana address — [`247Lk5YNH9URfBBvxVUtDruz8GvGX8gKGuYHVCZThpiR`](https://solscan.io/account/247Lk5YNH9URfBBvxVUtDruz8GvGX8gKGuYHVCZThpiR)
- Loopscale-published Solana address (no signatures found by OAK on 2026-11-10) — [`AzPh2dUV3duK9n8PWV6CxKMwWr9Rk7fxPNBZuv1CiwMr`](https://solscan.io/account/AzPh2dUV3duK9n8PWV6CxKMwWr9Rk7fxPNBZuv1CiwMr)
- Loopscale-published EVM address (balance 241.87400715 ETH on 2026-11-10, EOA) — [`0xb8959Aca4e4C796A3BaDA66833eAe60b1BC0bfb2`](https://etherscan.io/address/0xb8959Aca4e4C796A3BaDA66833eAe60b1BC0bfb2)
- Loopscale-published EVM address (balance 139.7131591 ETH on 2026-11-10, EOA) — [`0xB7Ec7eF24FD73f3000C651CA9D0Fa45b61DcF854`](https://etherscan.io/address/0xB7Ec7eF24FD73f3000C651CA9D0Fa45b61DcF854)
- Loopscale program — [`1oopBoJG58DgkUVKkEzKgyG9dvRmpgeEm1AVjoHkF78`](https://solscan.io/account/1oopBoJG58DgkUVKkEzKgyG9dvRmpgeEm1AVjoHkF78)
- Signer of the 2026-11-03 unwind transaction — [`rektbdF5r7HnWrPDRvD76pC1V9rVfaGmbSY3Dsrj8Kx`](https://solscan.io/account/rektbdF5r7HnWrPDRvD76pC1V9rVfaGmbSY3Dsrj8Kx) (not among the published addresses; whether it is the attacker is not stated)
- SOL account owner receiving the 4,598.434180621 SOL — [`8oCX3kkgviLPxYGBfSt1kCKWVmHer1pHqutPTiBYnGpu`](https://solscan.io/account/8oCX3kkgviLPxYGBfSt1kCKWVmHer1pHqutPTiBYnGpu)
- Token-account owner that released 1 kySOL — [`Gb2qCYLs3dEy6D4TvdLYr7wRDMMWDCPR9oK5SzNa5Gtn`](https://solscan.io/account/Gb2qCYLs3dEy6D4TvdLYr7wRDMMWDCPR9oK5SzNa5Gtn)
- The links between the two EVM addresses and the Solana activity are not published.

## Fund flow

Traced by OAK on 2026-11-10 with the Solana public RPC (`tools/explorer.py` does not read Solana transactions, so `getTransaction` was called directly). The one hop below was read from the transaction's parsed instructions. The loan itself, the USDC redemption, any proceeds and the EVM addresses carry no traced edges: no transaction hashes were published, the Blockscout address lookups for the two EVM addresses returned HTTP 500, and the two addresses only show balances.

```oak-flow
as_of: 2026-11-10T12:00Z
nodes:
  - {id: sig, chain: solana, address: rektbdF5r7HnWrPDRvD76pC1V9rVfaGmbSY3Dsrj8Kx, role: attacker-eoa, label: "Signer of 2026-11-03 unwind tx (attacker status not stated)"}
  - {id: vault, chain: solana, address: 8oCX3kkgviLPxYGBfSt1kCKWVmHer1pHqutPTiBYnGpu, role: lending, label: "Owner of wSOL account that received 4,598 SOL (likely SOL Genesis Vault, inferred)"}
edges:
  - {from: sig, to: vault, asset: SOL, amount: 4598.434180621, tx: 47zp5i14ERm2soQQGLs5LKRk4Xi2Yigh6iuJ68URKe4VfzC9u2GpgWYbLG73fT4a645GBnUibZ5gP69kfaD7DbAo, time: 2026-11-03T13:43:50Z, technique: T9.016, verified: oak}
```

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/Loopscale/status/2118502123705159769>; <https://x.com/Loopscale/status/2118285556123611378>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** Loopscale's own 2026-11-06 update states both mechanisms: collateral valued as a different asset via "a misconfigured combination of asset-pricing parameters" (SOL Genesis Vault, ~\$412K loan), and a loan "carrying an extreme interest rate" sold into the USDC Genesis Vault to inflate NAV (~\$521K redemption, halted). The operator source is why this is `confirmed`; the fine detail (which parameters, which program instruction, why the extreme-rate loan is accepted at its face value) is not published, and the kySOL/zBTC example comes from Rektradar, not Loopscale. The T9.016 label is OAK's classification of the operator's description.

## What is not known

- Dates and transaction hashes of the two paths, and exactly how the \$0-loss outcome was reached.
- What the 30,000-per-day API requests did, and whether the "private transaction-building APIs" were Loopscale's own endpoints.
- Whether the attacker held or received any funds; the EVM addresses' role.
- Total campaign scope: Loopscale said it would not resume normal operations until it had established it.

## Mitigation (for the Technique page)

Not added to `techniques/T9.016-contract-accounting-state-invariant-flaw.md` or the mitigation files in this run (single-file task). Proposed bullet: **On-chain bounds on what a vault will buy or accept** (new mitigation, in the form of [`OAK-M11`](../mitigations/OAK-M11-rate-limiting-and-per-block-caps.md) and [`OAK-M38`](../mitigations/OAK-M38-time-windowed-withdrawal-limits.md)). What: the vault program rejects a loan whose rate is above a configured maximum, and rejects collateral whose pricing identifier does not match the deposited mint; and caps single-transaction NAV change and redemption size. How: enforced inside the program the vault runs, not in the API that builds transactions, so a crafted transaction cannot skip it. Why: in this incident the attacker assembled parameters off-chain and the on-chain program accepted them; a rate ceiling stops the NAV inflation at the step the loan is sold into the vault, and an identity check stops kySOL being priced as zBTC. A redemption cap would also have bounded the \$521K attempt even if Loopscale's off-chain monitor had not halted it within 30 seconds.

## Public references

- `[loopscalestatement2026]` — Loopscale on X, campaign, pause and four addresses (2026-11-05): <https://x.com/Loopscale/status/2118285556123611378>
- `[loopscaleupdate2026]` — Loopscale on X, update with the two paths (2026-11-06): <https://x.com/Loopscale/status/2118502123705159769>
- `[rektradarloopscale2026]` — Rektradar, "Web3 daily exploits 06 Nov 2026" (2026-11-06): <https://www.rektradar.xyz/web3-daily-exploits-06-nov-2026-loopscale-floki-bot-pause/>
- `[solanacompassloopscale2026]` — Solana Compass, "Loopscale pauses protocol after week-long attack campaign on its SOL and USDC Genesis Vaults" (2026-11-05): <https://solanacompass.com/news/loopscale-pauses-protocol-after-week-long-attack-campaign-on-its-sol-and-usdc-genesis-vaults>
- `[cryptobriefingloopscale2026]` — Crypto Briefing, "Loopscale pauses operations after Genesis Vaults attack" (2026-11-05): <https://cryptobriefing.com/loopscale-pauses-operations-genesis-vaults-attack/>
