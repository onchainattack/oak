# Pump.fun / Solana token sandwiching — sandwich bundles against swaps in new pump.fun tokens — Solana — 2024–2025

**Loss:** no loss figure for pump.fun tokens alone is published. [Helius](https://www.helius.dev/blog/solana-mev-report) measured one sandwich program, labelled Vpe, over 2024-12-07 to 2025-01-05: 1.55 million sandwich transactions, an 88.9% success rate, and a profit of 65,880 SOL (\$13.43 million at the report's conversion). That figure covers every token the program sandwiched, not only pump.fun launches. Helius gives an average of 0.0425 SOL (\$8.67) per sandwich.

**OAK Techniques observed:** **OAK-T5.004** (Sandwich / MEV Extraction — *primary*). Per [Helius](https://www.helius.dev/blog/solana-mev-report), a searcher submits an atomic Jito bundle of three transactions: it buys the token, the victim's swap executes, and the searcher sells the same token. The middle transaction has a different signer from the first and last. The technique page lists EVM as its chain; the mechanism described by Helius is the same three-transaction shape on Solana. Helius does not describe any sandwich of the Raydium liquidity-addition at pump.fun graduation, so no initial-liquidity-sandwich Technique is declared.

**Attribution:** **pseudonymous.** [Helius](https://www.helius.dev/blog/solana-mev-report) analyses the Vpe program by its on-chain behaviour and does not name an operator; no full program or searcher address is printed in the text read here.

**Key teaching point:** **Cap slippage and route swaps in new, thin tokens through a protected path.** [Helius](https://www.helius.dev/blog/solana-mev-report) reports that 16 of the 20 most-sandwiched tokens were created on pump.fun, that most victim swaps went through Raydium, and that memecoin traders often set high slippage tolerances, which makes sandwiching profitable. It also describes mitigations: Jupiter's dynamic slippage (introduced August 2024), "MEV Protect" modes that send transactions only to Jito block engines, and validator-side filtering.

## Summary

Pump.fun is a Solana launch platform; Helius identifies its tokens by mint addresses ending in "pump". In its Solana MEV report, [Helius](https://www.helius.dev/blog/solana-mev-report) describes sandwich attacks as the most notorious form of toxic MEV on Solana, and reports that among the top 20 sandwiched tokens, 16 were created on pump.fun. It reports that the Vpe program accounted for nearly half of all sandwich attacks on Solana, per Jito's internal analysis.

Helius walks through one example from 2024-12-16 on a new pump.fun token, Komeko. A searcher paid 14.63 SOL for 32.9 million tokens, the victim swapped 0.33 SOL for 624 thousand tokens, and the searcher sold the 32.9 million tokens for 14.65 SOL, for a net profit of about 0.01678 SOL (about \$3.35). The bundle tip was 0.000148 SOL. Helius does not reconcile the gap between the 0.02 SOL price difference and the stated profit.

Helius also records that Jito suspended its mempool in March 2024, and that much of Solana's sandwiching reportedly comes from a private mempool run by DeezNode.

## Timeline (UTC)

The sources give dates but not times. Stages without public detail are marked undisclosed.

| When | What happened | OAK |
|---|---|---|
| 2024-03 | Jito suspends its mempool, whose 200 ms preview window had often been used for sandwiches ([Helius](https://www.helius.dev/blog/solana-mev-report)) | — |
| Before 2024-12 (undisclosed) | Searcher operators build sandwich programs that watch for victim swaps in new, illiquid tokens; setup and funding undisclosed | — |
| 2024-12-07 to 2025-01-05 | The Vpe program executes 1.55 million sandwich transactions at an 88.9% success rate ([Helius](https://www.helius.dev/blog/solana-mev-report)) | **T5.004** |
| 2024-12-16 | Example sandwich of a victim swap in the pump.fun token Komeko, submitted as an atomic Jito bundle; transaction hashes are not in the text read here ([Helius](https://www.helius.dev/blog/solana-mev-report)) | **T5.004** |
| Window above | Profit of 65,880 SOL (\$13.43 million), against 22,760 SOL (\$4.63 million) paid in Jito tips ([Helius](https://www.helius.dev/blog/solana-mev-report)); where the profit went is undisclosed | — |
| 2025-01 or later | Helius publishes the report and its mitigation guidance (publication date not shown in the text read) | response |

Key addresses: none. No full searcher, program or transaction address is printed in the source text read here.

## Root-cause evidence

- **Technique:** OAK-T5.004
- **Source:** <https://www.helius.dev/blog/solana-mev-report>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** Helius, an infrastructure provider, analysed on-chain data and describes the three-transaction sandwich pattern, the Vpe figures and the pump.fun share of victim tokens. It is one non-operator source. Not independently confirmed: the pump.fun-only share of losses, the operator, and where the profit went.

## Public references

- Helius, "Solana MEV Report: Trends, Insights, and Challenges" (publication date not shown; covers through 2025-01-05): <https://www.helius.dev/blog/solana-mev-report>
