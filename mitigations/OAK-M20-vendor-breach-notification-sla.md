# OAK-M20 — Vendor Breach-Notification SLA

**Class:** operational
**Audience:** custody-customer, risk-team, venue
**Maps to Techniques:** OAK-T11.001, OAK-T11.002

## Description

A vendor breach-notification SLA is a contractually-binding, time-bounded commitment from a custody-vendor, signing-infrastructure vendor, or wallet-software vendor to disclose, to its customers, any incident touching the vendor's signing surface, build pipeline, hosting infrastructure, or developer endpoints — within a window short enough that the customer can act before the customer's own on-chain artefacts settle. M20 is paired with a pre-defined customer-side incident-response playbook that converts the disclosure into specific operational actions (pause cold-to-warm transfers, rotate authorities held by keys handled at the vendor surface, switch to a redundant signing path) without requiring an ad-hoc decision under time pressure.

From a defender's perspective, M20 addresses the structural asymmetry in T11.001 / T11.002 incidents: the *vendor* knows about the compromise first (often days or weeks before the customer's on-chain extraction) but has no contractual obligation, and frequently no commercial incentive, to surface the disclosure to its customers in a window that lets the customer act. The Bybit-Feb-2025 case is the canonical illustration — the Safe{Wallet} developer-workstation compromise predated the on-chain extraction by an unspecified window during which the disclosure surface, had it existed, would have been the highest-leverage defence. M20 converts the vendor's pre-existing private knowledge of compromise into a customer-side actionable signal.

The SLA's value is structural rather than punitive: the contractual breach-notification clause is a procurement instrument that selects for vendors with mature internal IR and detection capability (a vendor that cannot detect its own compromise within the SLA window cannot meet the SLA, and is filtered out at procurement). It also disciplines the vendor's internal IR escalation paths — once the SLA exists, the vendor's IR team must be operationally capable of triggering customer notification on the same timeline as its own internal containment, not after.

## How it applies

- **T11.001 (Third-Party Signing / Custody Vendor Compromise):** the entry vector for Bybit-Feb-2025, WazirX-Jul-2024, Radiant-Oct-2024 (vendor-adjacent — developer-laptop compromise rather than vendor-platform compromise, but the disclosure structure is the same). M20 is the customer-side mitigation that converts the vendor's internal IR signal into a customer-actionable trigger. Pair with M19 (air-gap signing) for the residual cold-wallet flow surface; pair with M22 (rotate-on-disclosure discipline) so that the customer's IR playbook actually results in authority rotation rather than partial response.
- **T11.002 (Wallet-Software Distribution Compromise):** the Atomic Wallet June 2023 cohort. End-user customers do not typically have contractual leverage over wallet vendors, but institutional customers and venue-side integrators (exchanges supporting a given wallet, custody platforms supporting wallet-side key import) do. M20 at the institutional layer creates a propagation path: institutional vendor contracts → vendor-side IR triggers → end-user-facing communication channels (in-app notification, vendor-push notification). Without M20, the canonical disclosure path is class-action litigation post-loss, which is structurally too slow to be a defensive control.

## Limitations

- **The SLA is only as fast as the vendor's detection capability.** A vendor with poor internal monitoring may not detect a developer-laptop compromise for weeks; an SLA that triggers from the vendor's detection time, rather than from the actual compromise time, can be technically met while still leaving the customer exposed. Procurement-side vendor-security questionnaires — covering the vendor's mean-time-to-detect for its own infrastructure — are the necessary complement.
- **Contractual disclosure does not equal public disclosure.** M20 typically obligates customer-facing disclosure under NDA-bound channels; broader market disclosure (which protects non-customer counterparties) lives at a different regulatory layer. A customer learning of a vendor compromise via M20 has actionable customer-side defence but may not legally surface the disclosure to its own counterparties (other exchanges, OTC desks) until the vendor permits.
- **SLAs concentrate around a small number of major vendors.** The custody-and-signing vendor market is concentrated; customers may not have meaningful negotiating leverage to demand short SLAs from a sole-source vendor whose product they cannot replace. M20's effective adoption tracks the maturity of the vendor market rather than the customer's preference.
- **Vendor-self-detection blind spots.** A vendor compromised at a level the vendor's own monitoring does not cover (e.g., a build-pipeline compromise that produces signed binaries the vendor's own attestation chain accepts as valid) cannot self-trigger M20. External attestation infrastructure (third-party reproducible-build verification, supply-chain attestation registries) is the structural complement.
- **Adversary-aware delay.** A sophisticated attacker who has compromised the vendor may attempt to delay the vendor's internal disclosure by maintaining persistence below the detection threshold while extracting on the customer side. M20 cannot bound an SLA tighter than the vendor's worst-case detection latency; calibration of customer-side defensive posture (e.g., elevated-risk windowing for all vendor-customer relationships during disclosed cohort exploitation) is the temporal complement.

## Reference implementations

- **Insurance-driven model:** crypto-custody insurance underwriters (e.g., Lloyd's syndicate-backed policies, Coincover) increasingly require breach-notification clauses in vendor sub-contracts as a precondition for coverage; this externalises the SLA-enforcement function from individual customer procurement to insurance-side underwriting.
- **Regulated-venue model:** institutional custody platforms operating under NYDFS BitLicense, MAS, MiCA, or equivalent regulatory regimes bear regulator-side disclosure obligations that the platform passes through to its sub-contractors. M20-style customer-facing SLAs are increasingly required as a flow-down clause.
- **DeFi-protocol model:** DAOs and treasury-management protocols holding institutional balances at custody vendors increasingly include breach-notification clauses in custody-service-agreement templates (e.g., the post-WazirX template revisions across major restructured custody arrangements).
- v0.1 OAK observation: M20 is structurally available but unevenly enforced. Customers of major custody vendors who did not contractually bind disclosure SLAs at procurement time have no leverage post-incident; the post-Bybit market shift is toward making M20 a procurement default.

## Citations

- `[chainalysis2024dprk]` — broader DPRK / OAK-G01 context where vendor-side compromise is the recurring entry vector and disclosure-window asymmetry is the recurring defensive gap.
- `[radiantpostmortem2024]` — Radiant Capital October 2024; canonical case where the vendor-adjacent surface (developer laptops at the protocol team itself) bore the compromise for weeks before on-chain extraction. Illustrates the disclosure-window value without requiring a separate-vendor structure.
- `[ellipticatomic2023]` — Atomic Wallet 2023; T11.002 disclosure-window failure at end-user scale (5,500+ wallets compromised, no vendor-side timely disclosure).
- `[crystalwazirx2024]` — WazirX July 2024; vendor-adjacent custody-surface compromise where M20-class disclosure would have been the highest-leverage customer-side defensive surface.
