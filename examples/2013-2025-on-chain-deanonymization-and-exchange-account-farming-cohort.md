# On-Chain De-Anonymization and Exchange Account-Farming Cohort — 2013–2025

**OAK Techniques observed:** OAK-T8.003, OAK-T8.004

**Attribution:** **unattributed** (aggregate cohort).
**Loss:** T8.003 is a dual-use surface — the same graph-analysis techniques that compliance vendors use to attribute illicit activity are used by adversaries to identify high-value targets. Loss attributable specifically to T8.003 deanonymization is embedded in the downstream extraction events that follow target identification. T8.004 aggregate loss undocumented at class level; the technique converts KYC from a detection surface into a scaling surface — each account individually passes KYC, and the per-account withdrawal limits are the structural constraint being circumvented.

**Key teaching point:** Both T8.003 and T8.004 are operational-security failure surfaces that operate at the *identity layer* rather than the *transaction layer*. T8.003 collapses the pseudonymous-address-per-transaction privacy model through transaction-graph clustering; T8.004 collapses the per-account KYC barrier through synthetic-identity scaling. Both surfaces are load-bearing for the blockchain forensics industry — Chainalysis, Elliptic, TRM Labs, and CipherTrace were all founded on T8.003 primitives — and are simultaneously exploited by adversaries for target identification and compliance circumvention.

## Summary

## Timeline

T8.003 from 2013–2015 (Chainalysis/Elliptic/CipherTrace founding era; academic literature on Bitcoin transaction graph clustering); T8.004 from 2011–2013 (BTC-e era account-farming infrastructure) through 2025.

## T8.003 — On-Chain Transaction Graph De-Anonymization

Five canonical clustering heuristics:

- **Co-spend heuristic (multi-input clustering).** Multiple input addresses in a single transaction are controlled by the same entity — the foundational UTXO-model heuristic.
- **Change-address detection.** The output address receiving "change" back from a spend is controlled by the sender.
- **Exchange-deposit address clustering.** Addresses depositing to the same exchange deposit-address pattern are likely controlled by the same user.
- **Cross-chain address correlation (behavioural fingerprinting).** Same transaction timing patterns, counterparty graphs, and amount-rounding conventions across chains.
- **Off-chain data integration.** Exchange KYC data, public address labels (Etherscan, Solscan, OXT.me, Arkham Intelligence), forum/social-media disclosures, and law-enforcement subpoena returns.

Dual-use nature: compliance vendors use these techniques to attribute illicit activity; adversaries use them to identify and target high-value addresses (exchange hot wallets, protocol treasuries, whale addresses) by tracing on-chain flows to known entity labels.

## T8.004 — Exchange Account Farming / Sybil Account Creation

The attacker creates and maintains multiple exchange accounts — each with a distinct but synthetic, stolen, or fabricated identity — to circumvent per-account withdrawal limits, KYC thresholds, and per-account velocity checks. The structural insight is that T8.004 converts the KYC barrier from a detection surface into a scaling surface.

Key sub-patterns:

- **Document forgery / synthetic identity creation.** Fabricated identity documents using template-manipulation tooling and (post-2022) generative-image models. Documents satisfy automated KYC but exhibit template-level artefacts when compared across accounts.
- **Withdrawal-limit circumvention via account rotation.** N verified accounts × per-account daily limit X = N×X daily throughput, with per-account activity staying under velocity triggers.
- **Same-device / same-IP correlation across nominally-distinct KYC identities.** Browser-fingerprint hash, device-ID, IP range/ASN, user-agent string reused across account-onboarding sessions.
- **Deposit-source clustering (T8.001 × T8.004 cross-layer).** Multiple nominally-distinct exchange accounts receiving deposits from the same on-chain source clusters — the highest-signal detection primitive.
- **Cross-exchange manifestation.** Verified accounts distributed across multiple exchanges, with the same identity-document templates and device fingerprints reused per exchange.

Detection requires cross-layer correlation: a single on-chain deposit-source cluster depositing to multiple exchange accounts with disjoint KYC identities confirms account farming rather than coincidental shared-IP usage.

## Public references

- `[meiklejohn2013]` — Meiklejohn et al. 2013, "A Fistful of Bitcoins" (foundational multi-input clustering paper)
- `[chainalysis2023reactor]` — Chainalysis Reactor transaction-graph clustering methodology
- `[elliptic2023forensics]` — Elliptic Navigator forensic attribution methodology
- `[trm2024forensics]` — TRM Labs forensics platform
- `[btce2017indictment]` — BTC-e indictment (account-farming infrastructure documentation)
