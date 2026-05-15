# Terra/Luna / UST algorithmic-stablecoin collapse — Terra — 2022-05-07 to 2022-05-13

**Loss:** ~$40B–$60B in aggregate market-cap destruction across LUNA and UST; the single largest crypto-asset collapse event in dollar terms prior to the FTX November 2022 bankruptcy. LUNA declined from ~$80 to below $0.01 across the depeg week; UST declined from its $1.00 target to a low of ~$0.05. Terra 2.0 (Phoenix-1 chain) was launched on May 28, 2022 as a LUNA-airdrop-based restart excluding the UST stablecoin entirely.

**OAK Techniques observed:** **OAK-T9.001** (Oracle / Price-Manipulation Surface — primary in the structural sense; the mint-burn swap mechanism that maintained UST's peg relied on on-chain price feeds and the arbitrage path between LUNA market price and UST redemption value; the mechanism's failure mode is structurally a price-feed-arbitrage collapse). **OAK-T3.001** (Holder-Capture via Yield — Anchor Protocol's ~20% fixed yield on UST deposits was the dominant retail-acquisition surface that produced the UST holder base; the yield was sustained by Terraform Labs (TFL) treasury subsidies rather than by organic lending demand, making the Anchor-deposited UST a structurally encumbered liability). **OAK-T2.001** (Single-Sided Liquidity — the UST mint-burn swap constituted a single-sided liquidity surface: LUNA was minted to absorb UST redemptions, but the mint had no cap, converting a UST-depeg event into unbounded LUNA dilution). **OAK-T5.003** (Hidden-Mint / Supply Dilution — the LUNA supply expanded from ~345M pre-depeg to ~6.5T by May 13, 2022 as the mint-burn swap minted LUNA to absorb UST redemptions, diluting existing LUNA holders to near-zero). **OAK-T14.001** (Validator-Set Attack — the Terra validator set halted the chain at block 7603700 on May 12, 2022 after LUNA hyperinflation rendered on-chain governance and staking-security inoperable; the halt was an operational necessity but constitutes a validator-set-level intervention against the protocol's stated immutability). **OAK-T17** (Market Manipulation — structurally adjacent; post-collapse analyses alleged coordinated attack on the UST peg through Curve pool imbalance exploitation, though the dominant analytical consensus attributes the collapse to mechanism-design failure rather than to a single-attacker extraction; the "attack" framing is contested).

**Attribution:** **unattributed** (Do Kwon, Terraform Labs CEO/co-founder, publicly identified throughout; Kwon was arrested in Montenegro on March 23, 2023 on falsified-travel-documents charges; U.S. SEC filed civil fraud charges against Kwon and TFL in February 2023; Kwon and TFL settled with the SEC in April 2025 for ~$4.5B in disgorgement and penalties; U.S. SDNY criminal charges remain pending at v0.1). The per-attacker extraction framing is structurally difficult for Terra/Luna because the collapse was predominantly a mechanism-design failure rather than a single-attacker extraction — the distinction matters for OAK classification.

**Key teaching point:** **An algorithmic stablecoin whose mint-burn redemption mechanism is uncapped and whose demand-side is sustained by subsidised yield rather than organic economic demand is a standing T9.001 surface.** The Terra/Luna collapse is the canonical mechanism-design-failure class — not a smart-contract exploit (no bug was exploited), not an access-control bypass (no admin key was stolen), but a design in which the mint-burn redemption path had no capacity limit, converting a loss-of-confidence depeg into a death spiral that the mechanism itself amplified.

## Summary

The Terra blockchain, developed by Terraform Labs (TFL) and co-founded by Do Kwon and Daniel Shin, operated the TerraUSD (UST) algorithmic stablecoin paired with the LUNA governance/volatility-absorption token. The core mechanism-design was:

1. **Mint-burn swap:** 1 UST could always be redeemed for $1.00 worth of LUNA at the prevailing on-chain oracle price, and $1.00 worth of LUNA could always be minted into 1 UST. This swap was the sole peg-maintenance mechanism — there was no exogenous collateral, no central-bank-style reserve, and no redemption cap.

2. **Anchor Protocol yield:** Anchor, a Terra-native lending protocol, offered ~20% fixed annual yield on UST deposits. The yield was the dominant UST demand driver — at its peak, Anchor held ~72% of all UST in circulation (~$14B of ~$18.7B UST supply). The yield was structurally subsidised: Anchor's organic lending revenue (from LUNA borrowers) covered only a fraction of the deposit yield; TFL topped up the Anchor yield reserve from the Luna Foundation Guard (LFG) treasury.

3. **LFG BTC reserve:** In early 2022, the Luna Foundation Guard accumulated ~$3.5B in BTC (plus smaller AVAX and UST positions) as an "exogenous reserve" to backstop the peg in a depeg scenario. The reserve was deployed during the May 2022 depeg but was exhausted without restoring the peg.

The depeg cascade began on May 7, 2022 when a series of large UST sales on Curve's UST-3CRV pool (and simultaneously on Binance) pushed UST below its $1.00 peg. The specific trigger remains contested — theories range from a coordinated attack on the Curve pool to a large depositor's risk-management exit during broader market turmoil. Regardless of trigger, the mechanism's response was the same: as UST traded below $1.00, arbitrageurs bought discounted UST and redeemed it for $1.00 worth of LUNA via the mint-burn swap, selling the newly-minted LUNA on the open market. The LUNA sell-pressure drove LUNA's price down, which in turn required minting more LUNA per UST redeemed, amplifying the sell-pressure in a feedback loop.

The death spiral unfolded across May 9–12:

- **May 9:** UST drops to ~$0.62; LUNA falls from ~$60 to ~$25.
- **May 10:** UST drops to ~$0.30; LUNA falls below $5. LFG BTC reserves deployed to defend the peg; reserves exhausted without restoring parity.
- **May 11:** LUNA falls below $0.50; LUNA supply triples from ~350M to ~1.1B.
- **May 12:** UST at ~$0.05; LUNA supply exceeds 6.5T. Terra validators halt the chain at block 7603700. Major exchanges delist LUNA and UST pairs.
- **May 13:** LUNA and UST trading suspended or restricted across most major exchanges. Terra 2.0 (Phoenix-1) governance proposal published.

On May 28, 2022, Terra 2.0 launched as a LUNA-airdrop-based restart. UST was excluded entirely from the new chain — the algorithmic-stablecoin experiment was permanently abandoned across both Terra Classic and Terra 2.0.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2018–2022 | Terra blockchain launches; UST algorithmic stablecoin and Anchor Protocol operate; UST supply grows to ~$18.7B by May 2022, with ~72% deposited in Anchor | **T3.001 surface created** (Anchor yield as holder-capture) |
| 2022-05-07 | Large UST sales on Curve UST-3CRV pool and Binance push UST below $1.00; depeg cascade begins | **T9.001 execution** |
| 2022-05-09 | UST ~$0.62; LUNA ~$25; LFG begins BTC reserve deployment | (death-spiral onset) |
| 2022-05-10 | UST ~$0.30; LUNA < $5; LFG BTC reserves exhausted | (reserve exhaustion) |
| 2022-05-11 | LUNA supply triples; LUNA < $0.50 | **T5.003 execution** (supply dilution) |
| 2022-05-12 | LUNA supply exceeds 6.5T; Terra validators halt chain at block 7603700 | **T14.001** (validator-set intervention) |
| 2022-05-13 | Major exchanges delist LUNA and UST; Terra 2.0 governance proposal published | (exchange response) |
| 2022-05-28 | Terra 2.0 launches (Phoenix-1); LUNA airdrop to pre-depeg and post-depeg holders; UST excluded | (restart) |
| 2023-02 | SEC files civil fraud charges against Do Kwon and Terraform Labs | (regulatory action) |
| 2023-03-23 | Do Kwon arrested in Montenegro on falsified-travel-documents charges | (law-enforcement) |
| 2025-04 | Kwon and TFL settle with SEC for ~$4.5B in disgorgement and penalties | (settlement) |

## What defenders observed

- **Uncapped mint-burn redemption converts a depeg into a death spiral.** The mechanism that maintained the peg during normal conditions (mint-burn arbitrage) was also the mechanism that amplified the depeg — because LUNA minting had no cap, a UST depeg triggered unbounded LUNA dilution that accelerated the depeg rather than correcting it. The mechanism-design lesson is that peg-maintenance mechanisms must have bounded capacity or exogenous backstop, not uncapped endogenous minting.
- **Subsidised yield is a structural holder-capture surface (T3.001).** Anchor's ~20% fixed yield was the dominant UST demand driver, but the yield was sustained by TFL treasury subsidies rather than by organic lending demand. When the subsidy ended (or when confidence in the subsidy ended), the demand-side collapsed. The Anchor yield was the T3.001 surface: holders were captured by the yield promise, but the yield's sustainability depended on a single-actor treasury.
- **LFG BTC reserves were a social-commitment backstop, not a contract-enforced backstop.** The LFG's $3.5B BTC reserve was deployed voluntarily by the LFG council — it was not contractually committed to the UST peg-maintenance mechanism. The distinction between social-commitment reserves and contract-enforced reserves is structurally important for algorithmic-stablecoin risk assessment.
- **Validator-set chain halt was an operational necessity that demonstrated the governance-surface risk of staking-security collapse.** When LUNA approached zero, the Terra validator set (whose staking collateral was LUNA-denominated) faced a security collapse — the cost to attack the chain fell below the chain's defended value. The halt was operationally correct but highlighted the via-staking-collapse attack surface (T14.001) that proof-of-stake chains face when the staking token enters hyperinflation.

## What this example tells contributors writing future Technique pages

- **Terra/Luna is primarily T9.001 (mechanism-design failure) and T3.001 (holder-capture via yield), not a single-attacker extraction case.** The OAK classification for mechanism-design failures where no specific attacker extracted via an on-chain exploit must be careful to distinguish (a) the mechanism-design surface that produced the loss from (b) the on-chain exploit surface that T9.001 more commonly maps to. Terra/Luna is best mapped to T9.001 for the mint-burn-swap mechanism's price-feed-surface failure, T3.001 for the Anchor-yield holder-capture surface, T5.003 for the LUNA-supply-dilution extraction vector, and T14.001 for the validator-set chain halt.
- **The collapse anchors the "mechanism-design-failure as T9.001 surface" sub-class.** Not all T9.001 incidents require a deliberate manipulator — the UST mint-burn swap's price-feed-surface failure was a design property, not an attacker action. Contributors writing future T9.001 pages should distinguish the mechanism-design sub-class (Terra/Luna, IRON Finance, Basis Cash-class) from the deliberate-manipulation sub-class (Mango Markets, Inverse Finance).
- **Anchor Protocol is the canonical T3.001 example at the protocol scale.** The Anchor yield was the structural acquisition surface for UST demand — depositors entered because of the yield, and the yield's sustainability depended on TFL treasury subsidies. When the subsidy's sustainability came into question, the demand-side collapsed. Anchor is the largest-scale T3.001 case on the public record.

## Public references

- SEC v. Terraform Labs Pte. Ltd. and Do Hyeong Kwon. Complaint filed February 16, 2023, S.D.N.Y. Case No. 1:23-cv-01346.
- SEC v. Terraform Labs Pte. Ltd. and Do Hyeong Kwon. Final judgment and settlement, April 2025 (~$4.5B in disgorgement, prejudgment interest, and civil penalties).
- Terra 2.0 governance proposal (Phoenix-1 chain launch). May 2022.
- LFG (Luna Foundation Guard). LFG reserve deployment and post-depeg transparency reports. May 2022.
- Nansen. *"On-Chain Data Reveals UST Depeg and LUNA Collapse."* May 2022.
- Jump Crypto. *"Terra/Luna Post-Mortem."* 2022.
- Cross-reference: T9.001 (Oracle / Price-Manipulation Surface) at `techniques/T9.001-oracle-price-manipulation.md`.
- Cross-reference: T3.001 (Sybil-Bundled Launch / Holder Capture) at `techniques/T3.001-sybil-bundled-launch.md`.
- Cross-reference: T5.003 (Hidden-Mint Dilution) at `techniques/T5.003-hidden-mint-dilution.md`.
- Cross-reference: T14.001 (Slashing-Condition Exploit / Validator-Set Attack) at `techniques/T14.001-slashing-condition-exploit.md`.

### Proposed new BibTeX entries

```bibtex
@misc{secvterraform2023,
  author = {{U.S. Securities and Exchange Commission}},
  title = {SEC v. Terraform Labs Pte. Ltd. and Do Hyeong Kwon — Complaint},
  year = {2023},
  month = feb,
  day = {16},
  note = {S.D.N.Y. Case No. 1:23-cv-01346; civil fraud charges against Kwon and TFL}
}

@misc{nansenterraluna2022,
  author = {{Nansen}},
  title = {On-Chain Data Reveals UST Depeg and LUNA Collapse},
  year = {2022},
  month = may
}

@misc{jumpcryptoterra2022,
  author = {{Jump Crypto}},
  title = {Terra/Luna Post-Mortem},
  year = {2022}
}
```
