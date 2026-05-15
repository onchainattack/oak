# LABtrade — Insider OTC/Vesting/Supply Manipulation — 2026-05-14

**Loss:** Retail investors in $LAB token. Market cap crashed after insiders extracted via private OTC deals, vesting changes, and CEX deposits. FDV at peak: $6B.
**OAK Techniques observed:** OAK-T3.004 (Influencer Amplified Promotion and Dump) — primary; multi-mechanism insider extraction via OTC/loans, unilateral vesting changes, market maker coordination, and >95% supply control.
**Attribution:** **confirmed** — Vladimir "Vova" Sadkov (co-founder), Mark (co-founder), and connected insider wallets. On-chain links to RIVER token manipulation ($12M+ received by same insider).

**Key teaching point:** The LABtrade case demonstrates **multi-vector insider extraction** — the team deployed four simultaneous extraction mechanisms (private OTC/loans, vesting cliff changes, MM coordination, CEX deposit dumping) which individually appear as separate activities but collectively form a coordinated retail extraction strategy. Detection requires cross-referencing: (1) off-chain governance actions (vesting terms), (2) on-chain insider wallet clustering, (3) CEX deposit timing vs. price action.

## Summary

On May 14, 2026, ZachXBT published a 9-part investigation into LABtrade ($LAB), a trading platform co-founded by Vova Sadkov and Mark that TGE'd in October 2025. Despite reaching a $6B fully diluted valuation, the token exhibited a pattern of coordinated insider extraction across four vectors:

1. **Private OTC/Loan deals:** Loan contracts offered privately at 7.5%/month for 6 months via a BVI shell company (The Lab Management Ltd., signed by Vladimir Sadkov as director). On default, repayment was in $LAB at "market price" — allowing insiders to extract value regardless of token performance.

2. **Unilateral vesting changes:** The Legion public sale terms were changed from a 3-month cliff to a 9-month cliff without community consent. Other creators reported months-long delays in marketing campaign payouts.

3. **CEX deposit dumping:** 226M LAB (a large percentage of the float) was deposited to Bitget deposit addresses by insiders in March-April 2026. The deposits sat dormant until 100M LAB was withdrawn, generating significant social media coverage, then potentially dumped.

4. **Supply opacity:** No clear token distribution was available — CoinGecko, RootData, and CoinMarketCap all reported different supply figures. The team controlled >95% of supply.

5. **RIVER connection:** One of the signers for several LAB team multisigs (`0xcEA722a1A812EbDFA5BBD8130531cF1D1956eBC9`) was funded by an insider linked on-chain to RIVER token manipulation. The same insider received $12M+ of RIVER tokens to two CEX deposit addresses.

The borrower wallet from the LAB loan contract (`0xf09c`...) was the same wallet used for public LAB buybacks, blurring the line between treasury management and insider extraction.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2025-10 | LABtrade TGE. Vova Sadkov & Mark co-founders. Prior project Eesee ($ESE) abandoned — investors left with losses | (background) |
| 2025-10~2026-04 | Private OTC/loan deals offered via BVI shell. Vesting terms changed unilaterally (3-month → 9-month cliff). MM coordination established | **T3 insider positioning** |
| 2026-03~04 | 226M LAB deposited to Bitget deposit addresses by insiders. Deposits sit dormant | **T3 CEX staging** |
| 2026-04~05 | LAB price pumps to $6B FDV. Retail buys based on public information. Insiders, OTC buyers, and MMs have different (private) information sets | **T3 information asymmetry** |
| 2026-05-14 | ZachXBT publishes investigation: opaque loans/OTC, vesting changes, MM coordination, unknown float, >95% supply control | (public disclosure) |

## What defenders observed

- **Governance actions without community process:** Vesting terms changed from 3-month to 9-month cliff unilaterally. No governance vote, no community discussion. The change was discovered via leaked email screenshot.
- **BVI shell structure for insider loans:** The Lab Management Ltd., a BVI corporation, was the borrower on private LAB loan contracts. The director was Vladimir Sadkov (co-founder). Loan terms (7.5%/month, repayment in LAB at "market price") were structured to benefit insiders regardless of token performance.
- **Borrower wallet = buyback wallet:** The loan contract borrower address (`0xf09c`...) was the SAME wallet used for public LAB buybacks — making treasury outflows indistinguishable from insider extraction.
- **CEX deposit cluster:** 226M LAB deposited to Bitget from insider-linked addresses that sat dormant, then were withdrawn with social media amplification before potential dump.
- **Multi-project pattern:** The co-founders' prior project Eesee ($ESE) left investors "feeling abandoned after the team moved on" — the extraction pattern was not a one-off.

## What this example tells contributors writing future Technique pages

- **Multi-vector extraction is T3's most sophisticated form.** Individual vectors (OTC, vesting, MM, CEX dump) are each covered by existing T3 sub-techniques, but the coordinated use of all four simultaneously — with the structural opacity to hide each from investors seeing only one — is not yet explicitly modelled. A T3.006 (Insider Multi-Vector Supply Extraction) sub-technique may be warranted.
- **The borrower-wallet = buyback-wallet pattern is a specific detection signal.** When the address receiving loan proceeds is the same address executing buybacks, treasury and insider flows are commingled by design. This is detectable on-chain: the same address both receives from the protocol treasury and sends market-buy transactions.
- **CEX deposit dormancy + withdrawal + social amplification → dump is a timing signal.** 226M LAB sat dormant on Bitget for weeks, then 100M was withdrawn with significant CT coverage, enabling a dump while retail attention was on the "bullish" withdrawal narrative.
- **Cross-project pattern (Eesee → LABtrade) is an attribution signal.** Founders who abandoned a prior project with investor losses are more likely to repeat the pattern. OAK actor profiles should track serial founders across projects.

## Public references

- [ZachXBT — LABtrade Investigation Thread (X/Twitter)](https://twitter.com/zachxbt/status/2054898749923860819) — 9-part investigation of insider extraction.
- LABtrade website: `https://labtrade.io`
- Insider signer address: `0xcEA722a1A812EbDFA5BBD8130531cF1D1956eBC9`
- RIVER manipulation linked address: documented in ZachXBT thread.
- Legion public sale email screenshot: documented in investigation thread.
