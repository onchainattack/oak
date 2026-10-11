# Puffer pufETH LRT depeg — redemption-constrained discount — Ethereum — 2024-08

**Loss:** structural — per LlamaRisk, pufETH's maximum depeg against ETH was −5.46% on 2024-08-05. No aggregate dollar loss figure is sourced; the cost was borne by holders who sold (or were liquidated against pufETH collateral) during the discount window. The sources reviewed report no protocol insolvency or bad debt.
**OAK Techniques observed:** **OAK-T14.004** (Liquid Restaking Token Pricing Manipulation / Depeg — LlamaRisk attributes the discount mainly to the difficulty of redeeming pufETH for ETH: Puffer did not enable withdrawals until 2024-10-14, so holders needing ETH could only sell on secondary markets at a discount). Renzo ezETH (2024-04-24) is a separate LRT depeg of the same year; whether ether.fi weETH and Kelp rsETH also depegged in sequence is unverified here and is not asserted.
**Attribution:** **unattributed** — structural / protocol-design-level. No attacker is involved.

**Corrected 2026-10-11:** Depeg date moved from July to 2024-08-05 with the sourced −5.46% maximum (not 4–7%); cause restated as difficulty of redeeming pufETH (withdrawals only enabled 2024-10-14) rather than an EigenLayer withdrawal queue; the unsourced "fourth in a sequence" framing, queue-depth claims and proposed-only references were removed.

**Key teaching point:** **A liquid restaking token that cannot be redeemed at par trades at a discount when holders want out.** pufETH had no withdrawal path until October 2024, so the secondary-market price was the only exit and the discount reflected that illiquidity, not a solvency problem. Redemption availability, not just backing, is the variable to monitor for any LRT.

## Summary

Puffer Finance launched pufETH as a liquid restaking token in 2024, letting holders earn restaking yield while keeping a liquid token for DeFi use. Users deposit ETH, Puffer restakes it, and pufETH is minted as a receipt for the underlying ETH plus accrued yield.

LlamaRisk's collateral risk assessment records a maximum depeg of −5.46% on 2024-08-05 and links the discount to the difficulty of redeeming pufETH for ETH (low secondary-market liquidity may also have contributed). Puffer only enabled withdrawals on 2024-10-14, after which two routes existed: an instant redemption with a 1% fee limited by PufferVault ETH liquidity, and a fee-free two-step withdrawal taking at least 14 days. LlamaRisk reports the peg has since recovered to roughly 0.1%.

This file previously described the discount as caused by an EigenLayer withdrawal-queue backlog that cleared in late July. No source supports that mechanism or timing, so it has been removed.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-04-24 | Renzo ezETH depegs (separate LRT event) | T14.004 (context) |
| 2024-08-05 | pufETH reaches its maximum depeg of −5.46% against ETH (LlamaRisk) | **T14.004** |
| 2024-10-14 | Puffer enables pufETH withdrawals | (redemption path opens) |

## What defenders observed

- **Redemption availability drives LRT pricing.** With no withdrawal path, pufETH holders could exit only by selling at the market price; a redemption route (even a fee-bearing one) gives arbitrageurs a floor.
- **Peg recovery is not documented in detail.** LlamaRisk reports the peg later improved to about 0.1%; the sources reviewed do not describe the recovery path day by day.

## What this example tells contributors writing future Technique pages

- **Separate redemption-constraint depegs from oracle or collateral-failure depegs.** The pufETH discount was a liquidity/redeemability effect.
- **Verify cohort claims.** Sequences of "same-mechanism" depegs across LRTs should be sourced per event before being cited as a class.

## Public references

- `[llamariskpufeth2025]` — LlamaRisk, "Collateral Risk Assessment - pufETH" (2025-03-27): <https://llamarisk.com/research/collateral-risk-assessment-pufeth> (reports max depeg of −5.46% on 2024-08-05 and links the discount to difficulty of redeeming pufETH)
- `[pufferwithdrawals2024]` — Puffer Finance on X, "PufETH Withdrawals" (2024-10-14): <https://x.com/puffer_finance/status/1846553523179393213> (withdrawals only launched Oct 2024)

## Discussion

The pufETH episode illustrates T14.004 as a redemption-constraint discount rather than an exploit. OAK's wider LRT-depeg cohort claims (ether.fi, Kelp) should be verified individually before being relied on.
