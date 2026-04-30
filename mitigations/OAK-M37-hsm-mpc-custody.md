# OAK-M37 — HSM and MPC Custody Architectures

**Class:** operational
**Audience:** custody-customer, custody-vendor, protocol (treasury), risk-team
**Maps to Techniques:** OAK-T11.001, OAK-T11.002, OAK-T11.003, OAK-T10.001

## Description

Hardware Security Module (HSM) and Multi-Party Computation (MPC) custody architectures are the two cryptographic-key-isolation classes that separate signing-key operations from any single host's filesystem and runtime memory. HSMs (AWS CloudHSM, Thales / nCipher, Utimaco, Yubico HSM) execute signing operations inside dedicated tamper-resistant hardware whose private-key material never crosses an untrusted boundary; MPC architectures (Fireblocks, Fordefi, Copper, BitGo MPC, Coinbase Custody MPC, Safeheron) split key material across multiple cooperating parties using threshold-cryptographic protocols (TSS / FROST / GG18-and-derivatives) so no single party ever reconstructs the full key.

The defensive principle is **single-host compromise is no longer sufficient to extract signing authority**. In contrast to OAK-M19 air-gap signing — which is a workflow-level mitigation that depends on operator discipline at sign time — HSM and MPC architectures are cryptographic-architecture-level mitigations that are robust to a much broader class of operator-side compromise events. An attacker who gains full root on an HSM-attached host obtains the ability to request signatures from the HSM under whatever access-control policy the HSM enforces, but does not obtain the ability to extract the private key for off-host use; an attacker who gains full root on a single MPC party's host obtains the ability to participate in threshold protocol execution under the local party's policy, but does not obtain the ability to construct signatures unilaterally.

The two architectures are complementary rather than mutually exclusive: many production custody stacks (Fireblocks, BitGo) compose HSM-backed key shares with MPC threshold execution, combining hardware-level key-isolation with multi-party trust-distribution. The OAK-relevance is that the Bybit February 2025 incident (`examples/2025-02-bybit.md`) and the Radiant Capital September 2024 incident (`examples/2024-10-radiant-capital.md`) both demonstrate that the *signing-flow user-interface* layer is a separate attack surface from the cryptographic-key-storage layer; HSM and MPC custody mitigates the latter but does not mitigate the former without the additional out-of-band-destination-verification controls captured in OAK-M18.

## How it applies

- **OAK-T11.001 (Third-Party Signing/Custody Vendor Compromise).** HSM and MPC architectures, properly deployed, mean that a compromised vendor employee or workstation cannot exfiltrate raw signing keys; the attacker is constrained to whatever signing operations the access-control policy permits. The Bybit February 2025 case is an instance where the signing-policy layer was the load-bearing failure surface (compromised UI presenting a forged transaction for signing) rather than the cryptographic-key-storage layer; HSM/MPC alone would not have prevented that incident, but the combination with OAK-M18 out-of-band destination verification would have.
- **OAK-T11.002 (Wallet-Software Distribution Compromise).** For institutional-and-protocol-treasury custody, HSM and MPC stacks substantially raise the cost of wallet-software-distribution-compromise extraction; the attacker must compromise the signing-flow rather than just exfiltrate a private key from an end-user wallet file. For end-user wallets the relevant mitigation is OAK-M40 supply-chain integrity rather than HSM/MPC.
- **OAK-T11.003 (Multisig Contract Manipulation).** HSM and MPC are typically deployed as the underlying signer infrastructure for multisig wallets, so the OAK-T11.003 class (manipulation of the multisig contract itself) and the OAK-M37 class (cryptographic isolation of each signer's key material) compose; both are needed for end-to-end signing-flow integrity.
- **OAK-T10.001 (Bridge Validator/Signer Key Compromise).** Cross-chain bridge validator-set deployments increasingly use MPC for threshold-signing across geographically-and-administratively-separated nodes; the Ronin Bridge March 2022 incident (`examples/2022-03-ronin-bridge.md`) and the Harmony Horizon June 2022 incident (`examples/2022-06-harmony-horizon.md`) are canonical cases where insufficient operator-separation across the validator key-share holders was the load-bearing failure surface.

## Limitations

- **HSM/MPC does not mitigate signing-flow UI compromise.** Bybit Feb 2025 demonstrates that a compromised UI presenting a forged transaction to a legitimate HSM/MPC signing flow is a separate attack class. OAK-M18 (out-of-band destination verification) is the canonical compositional mitigation.
- **Operator-separation is workflow-dependent.** MPC threshold-signing across N parties under a single corporate operator is no stronger against insider-action than a single-key custody under that operator. Threshold meaningful-trust-distribution requires operational separation across distinct geographic, administrative, and incentive boundaries.
- **HSM key-loading and recovery procedures are themselves attack surfaces.** The HSM's key-generation-and-recovery workflow (key ceremonies, backup-and-recovery procedures) are out-of-band events; compromise during these events is rarer but high-impact.
- **MPC threshold-protocol implementations have non-trivial cryptographic-engineering attack surface.** Multiple academic and industry-disclosed vulnerabilities in TSS / GG18 / FROST implementations through 2022–2024 demonstrate that MPC-implementation correctness is itself an audit surface; defenders deploying MPC stacks should track the academic literature and the vendor-disclosure record.
- **End-user crypto-wallet adoption is limited.** HSM and MPC are predominantly institutional-and-protocol-treasury deployment classes; end-user wallets remain dominantly private-key-on-device with hardware-wallet add-ons. OAK-M19 (air-gap signing) and OAK-M29 / M30 / M31 (wallet-UX mitigations) are the appropriate end-user-class compositional mitigations.

## Reference implementations

- **HSM platforms.** AWS CloudHSM, Thales / nCipher Luna, Utimaco SecurityServer, Yubico YubiHSM 2, IBM Cloud HSM, Securosys Primus.
- **MPC custody platforms.** Fireblocks (institutional MPC + HSM-backed key shares), Fordefi (Web3-native MPC custody), Copper (institutional MPC), BitGo MPC, Coinbase Custody MPC, Safeheron (open-source MPC for institutional custody), Anchorage Digital (HSM-and-MPC hybrid for federally-chartered crypto-custody).
- **MPC academic protocol references.** GG18 (Gennaro–Goldfeder), CMP (Canetti–Makriyannis–Peled), FROST (Komlo–Goldberg). Defenders evaluating MPC implementations should map deployed protocols to academic protocol-of-record references and to the vendor-disclosed audit record.

## Citations

- `[fbidmm2024]` — FBI announcement on DMM Bitcoin May 2024; documents the custody-vendor-engineer-workstation compromise context where HSM-and-MPC mitigation is structurally relevant.
- `[mandiantradiant2024]` — Mandiant Radiant Capital writeup; documents the HSM-and-MPC-relevant signing-infrastructure compromise context.
- `[chainalysis2024dprk]` — Chainalysis 2024 DPRK report; documents aggregate stolen-from-custody-vendor totals that motivate HSM-and-MPC investment at the sector level.
- `[ellipticatomic2023]` — Elliptic Atomic Wallet 2023 writeup; demonstrates the end-user wallet-software-compromise class where HSM-and-MPC is not the appropriate mitigation.
- `[halbornwintermute2022]` — Halborn Wintermute writeup; documents the cryptographic-weakness key-generation context where HSM hardware key-generation would have prevented the underlying vulnerability.
