# Meiklejohn Bitcoin address clustering research — 2013

**Loss:** **Research artifact, not a financial loss.** Sarah Meiklejohn et al.'s 2013 paper "A Fistful of Bitcoins: Characterizing Payments Among Men with No Names" was the foundational academic work demonstrating that Bitcoin's transaction graph could be deanonymized via address clustering — the technique that underlies all modern cryptocurrency attribution.
**OAK Techniques observed:** **OAK-T8.003** (On-Chain Transaction Graph De-Anonymization) — canonical academic anchor. The Meiklejohn paper introduced the core address-clustering heuristics (shared-input heuristic, change-address detection, one-time-change) that remain the foundation of blockchain forensic attribution a decade later.
**Attribution:** **unattributed** — academic research by Sarah Meiklejohn, Marjori Pomarole, Grant Jordan, Kirill Levchenko, Damon McCoy, Geoffrey M. Voelker, and Stefan Savage (UC San Diego / George Mason University). Published at ACM IMC 2013.

**Key teaching point:** The Meiklejohn paper established that Bitcoin's privacy model is not anonymity but pseudonymity — addresses are pseudonymous, but the transaction graph encodes structural relationships (shared inputs, change outputs, exchange-deposit patterns) that cluster addresses into de facto identity-linked sets. This is the academic foundation upon which Chainalysis, TRM Labs, Elliptic, and all modern blockchain forensic platforms are built.

## Summary

Meiklejohn et al. (2013) demonstrated that Bitcoin addresses could be clustered into identity-linked sets using three primary heuristics: (1) the shared-input heuristic — addresses used as inputs to the same transaction are controlled by the same entity; (2) change-address detection — one output of a transaction is the "change" returning to the sender, and its address can be identified by structural properties (fresh address, no prior transaction history); (3) one-time-change — for transactions with exactly two outputs where one is a fresh address, the fresh address is the change.

The paper validated these heuristics by interacting with Bitcoin exchanges and services, then tracing the resulting transactions through the graph. The researchers demonstrated that a small set of "seed" addresses linked to known entities could be expanded via clustering to capture a meaningful fraction of the Bitcoin transaction graph's activity.

## Public references

- Meiklejohn, S. et al. "A Fistful of Bitcoins: Characterizing Payments Among Men with No Names." ACM IMC 2013.
- The shared-input, change-address, and one-time-change heuristics remain the core primitives of all major blockchain forensic platforms (Chainalysis, TRM Labs, Elliptic).
