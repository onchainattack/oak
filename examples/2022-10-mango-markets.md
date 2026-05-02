# Mango Markets oracle manipulation — Solana — 2022-10-11

**Loss:** \~\$110M extracted; \~\$67M subsequently returned to Mango Markets under a public agreement; \~\$47M retained.
**OAK Techniques observed:** OAK-T9.001 (Oracle Price Manipulation) — primary; OAK-T7.001 framing does **not** apply because the proceeds were not routed through a mixer, instead the actor publicly identified and litigated.
**Attribution:** **confirmed** — Avraham Eisenberg (publicly self-identified). U.S. CFTC civil enforcement action filed January 9, 2023. Criminal trial in S.D.N.Y. before U.S. District Judge **Arun Subramanian** ended in April 2024 with jury convictions on commodities fraud, commodities manipulation, and wire fraud. **On May 23, 2025**, Judge Subramanian granted Eisenberg's post-trial motions under Federal Rules of Criminal Procedure 29 (judgment of acquittal) and 33 (new trial), **vacating all three convictions**. The order's grounds, taken together, are (1) improper venue for the wire-fraud count (the prosecution failed to establish that the alleged conduct's situs supported S.D.N.Y. venue under the *Foreign Commerce Clause* venue analysis the court applied) and (2) insufficient evidence of materiality on the commodities-fraud / commodities-manipulation counts (the court found the government had not adequately established that any specific misrepresentation to Mango Markets was material to a reasonable counterparty in the on-chain trading context). The market-manipulation factual record (oracle-input venue concentration, the price move, the borrow event, the public negotiation) stands; the criminal *legal* record was vacated. Contributors citing this case for legal-status purposes should cite the May 2025 Subramanian order directly rather than paraphrasing.

## Summary

On October 11, 2022, Avraham Eisenberg executed an oracle-manipulation exploit against Mango Markets, a Solana-based perpetual-futures and lending protocol. Eisenberg used two accounts to open offsetting long and short MNGO perpetual positions on Mango, then purchased large quantities of MNGO on the venues feeding Mango's price oracle (FTX, AscendEX, Serum). The reported MNGO oracle price moved approximately 13× over a 30-minute window, inflating the notional value of Eisenberg's long position. He then used the inflated collateral value to borrow approximately \$110M in other assets from Mango — the actual extraction event. The borrowed assets were withdrawn; Eisenberg then negotiated a public agreement with Mango DAO to return approximately \$67M in exchange for a non-pursuit commitment. He retained approximately \$47M.

The case became the modern canonical T9.001 example because Eisenberg publicly identified, the CFTC litigated, and the technical mechanism is unambiguous from the public record. The 2025 vacatur of criminal convictions raised live legal questions about how "code is law" arguments interact with traditional market-manipulation statutes — a question OAK does not opine on, but contributors should preserve the legal-status nuance when citing this case.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-10-11 (T+0) | Two Mango accounts open offsetting MNGO perp long and short positions | T9.001 setup |
| 2022-10-11 T+0 to T+30min | Large MNGO buys on FTX, AscendEX, Serum drive oracle-input price ~13× | **T9.001 oracle move** |
| 2022-10-11 T+~30min | Inflated long-position collateral used to borrow \~\$110M from Mango lending pools | **T9.001 extraction** |
| 2022-10-11 T+~30min | Borrowed assets withdrawn from Mango | T5 outflow |
| 2022-10-15 to 2022-10-22 | Public negotiation with Mango DAO; \~\$67M returned | (post-event) |
| 2023-01-09 | CFTC files civil complaint (Press Release 8647-23) | (regulatory) |
| 2025-05-23 | U.S. District Judge Arun Subramanian (S.D.N.Y.) grants Eisenberg's Rule 29 / Rule 33 post-trial motions and vacates all three criminal convictions (commodities fraud, commodities manipulation, wire fraud) on improper-venue (wire-fraud count) and insufficient-materiality-evidence (commodities counts) grounds | (legal status — vacatur order) |

## What defenders observed

- **Pre-event (oracle-resilience layer):** Mango's price oracle for MNGO took its inputs from a small set of venues (FTX, AscendEX, Serum) without TWAP windows, deviation circuit breakers, or wider-liquidity reference checks. This was a standing T9.001 surface from the day the oracle integration was deployed.
- **At-event (oracle-side signal):** the MNGO oracle price diverged sharply from the price observable on deeper-liquidity venues over the 30-minute window. A multi-venue deviation monitor would have fired well before the extraction transaction.
- **At-event (protocol-side signal):** the same actor (or tightly-related cluster) was both the marginal buyer on the input venues and the borrower against the resulting inflated collateral. A cross-action correlation detector applied to Mango would have produced the second independent signal.
- **Post-event (legal status):** Eisenberg's "code is law" defence and the 2025 vacatur of criminal convictions did not affect the oracle-manipulation factual record; the CFTC's civil case proceeded on a separate basis.

## What this example tells contributors writing future Technique pages

- **T9.001 detection has two complementary signals.** The oracle-side deviation signal and the protocol-side cross-action signal are independent — combining them produces high-confidence detection. T9.001 pages should describe both.
- **Mitigation lives at oracle-design.** Protocols can prevent T9.001 entirely by using TWAP-windowed oracles with deviation circuit-breakers and multi-venue inputs requiring quorum. The Mitigations section of T9.001 reflects this.
- **Legal status and OAK status are separate.** OAK classifies the *behaviour*; courts adjudicate *whether the behaviour was illegal under a specific statute*. The 2025 vacatur of criminal convictions does not change the OAK classification of this incident; it does change what contributors should claim about *legal* status of the behaviour. Worked examples should preserve this distinction.

## Public references

- [CFTC Press Release 8647-23 — CFTC Charges Avraham Eisenberg with Manipulative and Deceptive Scheme](https://www.cftc.gov/PressRoom/PressReleases/8647-23) (`[cftcmango2023]`).
- [TRM Labs — Federal Judge Overturns All Criminal Convictions in Mango Markets Case Against Avraham Eisenberg](https://www.trmlabs.com/resources/blog/breaking-federal-judge-overturns-all-criminal-convictions-in-mango-markets-case-against-avraham-eisenberg).
- [Cointelegraph — How low liquidity led to Mango Markets losing over \$116 million](https://www.tradingview.com/news/cointelegraph:210a96e88:0/).

## Discussion

Mango Markets is OAK's modern canonical T9.001 example because the technical mechanism, the regulatory record, and the legal-status evolution are all on the public record. Contributors writing other T9.001 examples should:

- Prefer cases where the oracle-input venue concentration is documented (single venue or thin-input set).
- Include the specific oracle-architecture facts (TWAP / no-TWAP, deviation breaker, input quorum) since these are the design-level facts T9.001 mitigation depends on.
- Preserve regulatory-status nuance when citing — many T9.001 cases have civil-but-not-criminal regulatory action (or vice versa), and conflating the two is a common downstream-distortion failure.

The Chainalysis 2022 retrospective `[chainalysis2025rug]` (and the broader Chainalysis 2024/2025 reports) place oracle-manipulation incidents at the multi-hundred-million-USD-per-year scale across the industry, with Mango as one of the largest single events.
