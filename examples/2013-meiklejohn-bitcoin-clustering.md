# Meiklejohn Bitcoin address clustering research — 2013

**Loss:** **Research artifact, not a financial loss.** Sarah Meiklejohn et al.'s 2013 paper "A Fistful of Bitcoins: Characterizing Payments Among Men with No Names" was the foundational academic work demonstrating that Bitcoin's transaction graph could be deanonymized via address clustering — the technique that underlies all modern cryptocurrency attribution.
**OAK Techniques observed:** **OAK-T8.003** (On-Chain Transaction Graph De-Anonymization) — canonical academic anchor. The Meiklejohn paper introduced two address-clustering heuristics, the multi-input (shared-input) heuristic and a change-address heuristic, which later work still builds on (`[acolyermeik]`, `[spiralclustering]`).
**Attribution:** **unattributed** — academic research by Sarah Meiklejohn, Marjori Pomarole, Grant Jordan, Kirill Levchenko, Damon McCoy, Geoffrey M. Voelker, and Stefan Savage, published at IMC 2013 (`[acolyermeik]`). The institutional affiliations (UC San Diego / George Mason University) are not stated in the cited sources.

**Corrected 2026-10-11:** Heuristics restated as two (multi-input and change); affiliations and fraction-of-graph claim not sourced; the line that the paper underlies all modern attribution is OAK commentary.
**Key teaching point:** The Meiklejohn paper established that Bitcoin's privacy model is not anonymity but pseudonymity — addresses are pseudonymous, but the transaction graph encodes structural relationships (shared inputs, change outputs, exchange-deposit patterns) that cluster addresses into de facto identity-linked sets. This is the academic foundation upon which Chainalysis, TRM Labs, Elliptic, and all modern blockchain forensic platforms are built.

## Summary

Meiklejohn et al. (2013) clustered Bitcoin addresses using two heuristics: (1) the multi-input heuristic — addresses spent together as inputs to one transaction are probably controlled by the same entity, because the sender must hold the keys for every input; (2) a change-address heuristic — the output that returns leftover coins to the sender is identified by conditions such as appearing for the first time on the ledger as the only such output, in a non-coinbase transaction (`[acolyermeik]`, `[spiralclustering]`). Earlier drafts listed "one-time-change" as a separate third heuristic; the cited sources describe it as part of the change heuristic.

The paper's method of validating the clusters by transacting with services is described in the cited summaries as part of the full IMC version (`[acolyermeik]`); the specific claim in earlier drafts about the fraction of graph activity captured is not verified here.

## Public references

- Meiklejohn, S. et al. "A Fistful of Bitcoins: Characterizing Payments Among Men with No Names." ACM IMC 2013.
- Whether these heuristics remain the core primitives of all major forensic platforms is OAK commentary, not verified in the cited sources.
- `[acolyermeik]` — The Morning Paper, "A fistful of bitcoins: characterizing payments among men with no names" (2017-02-20): <https://blog.acolyer.org/2017/02/20/a-fistful-of-bitcoins-characterizing-payments-among-men-with-no-names/>
- `[spiralclustering]` — Spiral, "The Scroll #3: A Brief History of Wallet Clustering": <https://spiralbtc.substack.com/p/the-scroll-3-a-brief-history-of-wallet>
- `[cacmfistful]` — CACM, "A Fistful of Bitcoins" (video): <https://cacm.acm.org/videos/a-fistful-of-bitcoins>
