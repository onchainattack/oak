# Chainalysis founding and Silk Road tracing — 2014

**Loss:** **Attribution event, not financial loss.** Chainalysis was founded in 2014 after its founders' research (Michael Grønager and Jan Møller) traced Bitcoin transactions from Silk Road seizure wallets to exchange accounts, demonstrating the commercial viability of blockchain forensic analysis. The company became the dominant blockchain forensic vendor, serving law enforcement, exchanges, and financial institutions.
**OAK Techniques observed:** **OAK-T8.003** (On-Chain Transaction Graph De-Anonymization) — canonical commercial anchor. Chainalysis operationalized the academic address-clustering techniques from Meiklejohn et al. (2013) into a commercial platform that enabled law enforcement and exchange compliance teams to trace illicit cryptocurrency transactions to KYC-verified exchange accounts.
**Attribution:** **confirmed** — Chainalysis founded by Michael Grønager (CEO), Jan Møller (CTO), and Jonathan Levin (CSO). The founding narrative is publicly documented by the company and independent media.

**Key teaching point:** Chainalysis represents the commercialization of T8.003: the academic de-anonymization techniques became a production forensic platform that powers the vast majority of law-enforcement cryptocurrency attribution operations. The company's existence demonstrates that T8.003 is not merely an academic possibility but a commercial reality with operational law-enforcement outcomes.

## Summary

Chainalysis was founded in 2014 by Michael Grønager (former COO of Kraken), Jan Møller (cryptographer), and Jonathan Levin (economist). The company's founding insight: the Bitcoin transaction graph is pseudonymous but structurally deanonymizable at scale, and law enforcement and financial institutions would pay for a commercial platform that operationalized academic address-clustering research.

The company's early work focused on tracing Silk Road-related Bitcoin flows — demonstrating that the marketplace's transaction volume could be mapped, that proceeds could be followed through the transaction graph, and that exchange deposit addresses receiving illicit funds could be identified and served with legal process. This tracing methodology became the operational template for cryptocurrency law-enforcement investigations and exchange compliance programs.

By v0.1 cutoff, Chainalysis is the dominant blockchain forensic vendor, serving the majority of U.S. federal law enforcement agencies, most major cryptocurrency exchanges, and financial institutions globally. The company's Reactor platform and KYT (Know Your Transaction) product are the industry-standard tools for T8.003-driven attribution.

## Public references

- Chainalysis company history and founding narrative.
- Chainalysis Reactor and KYT product documentation.
- Law-enforcement cryptocurrency tracing operations: the majority of U.S. federal crypto-crime indictments rely on Chainalysis or equivalent forensic-vendor tracing evidence.
