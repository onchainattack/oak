# OAK-M15 — Threshold Signing with Operator Separation

**Class:** architecture
**Audience:** custody-customer, custody-vendor, protocol (bridge)

**Maps to Techniques:** OAK-T10.001, OAK-T11.001, OAK-T11.003

## Description

OAK-M15 is the canonical custody-and-signing-infrastructure defence against single-signer compromise: threshold-signature schemes (TSS, FROST, GG18, or EVM-native multisig contracts) instantiated such that the co-signers reside in **distinct operational, geographic, and trust domains**. The architectural insight is that threshold signing only delivers the security premium implied by its threshold predicate when the co-signers are not subject to common-mode failure — when no single phishing campaign, supply-chain compromise, jurisdictional seizure, or insider event can simultaneously reach a threshold of signers. A 5-of-9 multisig whose nine signers all run the same operating-system image, share the same vendor's signing UI, and report to the same parent organisation is operationally a 1-of-1 compromise from the attacker's perspective.

For bridges (OAK-T10.001), M15 prescribes raising validator thresholds, broadening geographic and organisational distribution, requiring HSM enforcement, rotating keys on a published cadence, and integrating off-chain phishing-detection telemetry — particularly for engineering personnel routinely contacted via LinkedIn-style recruiting channels (the canonical Lazarus / OAK-G01 entry vector through 2022–2024 across Ronin, Harmony, and adjacent incidents). For custody customers (OAK-T11.001), M15 prescribes redundancy across signing-infrastructure vendors for the highest-balance accounts so that compromise of any single vendor's UI or build pipeline cannot reach a threshold of signers. For custodial multisig contracts (OAK-T11.003), M15 prescribes that modification authority — signer-set changes, proxy upgrades, threshold changes — be removed from the multisig itself and delegated to a separate, slower-pace governance contract with a mandatory delay, so that a sufficient-signer compromise cannot collapse the threshold predicate by altering the contract.

M15 is the structural complement to OAK-M18 (Out-of-Band Destination Verification): M15 ensures that no single compromise reaches the signing threshold; M18 ensures that even when the threshold is reached the signed transaction's destination matches the intended one. The two are designed to compose because the canonical large-loss incidents (Bybit / Safe{Wallet} 2025, WazirX / Liminal 2024) involved compromises that *did* reach the signing surface — M15 would have prevented or contained the reach; M18 would have caught the destination swap downstream.

## How it applies

- **OAK-T10.001 (Validator / Signer Key Compromise):** raise validator thresholds; distribute signers across distinct operational, geographic, and organisational domains; require HSM enforcement; rotate keys on a published cadence; treat low-threshold (≤3-of-N for small N) bridges as elevated risk regardless of operator reputation.
- **OAK-T11.001 (Third-Party Signing / Custody Vendor Compromise):** require redundancy across signing-infrastructure vendors for the highest-balance accounts; air-gap signing for cold-wallet transfers; vendor-relationship contractual requirements for breach-notification SLAs.
- **OAK-T11.003 (In-Use Multisig Smart-Contract Manipulation):** delegate multisig modification authority to a separate governance contract with a mandatory delay; runtime-invariant monitoring that pauses operations on modification-event detection; mandatory governance review for any contract-modification event before execution.

## Limitations

- Threshold-signing schemes do not protect against compromises that capture a *threshold* of signers via correlated entry vector (e.g., the same phishing campaign successful against multiple personnel at the same organisation; supply-chain compromise of a tool used by all signers). Operator-separation mitigates but does not eliminate this risk.
- "Distinct operational domain" is hard to operationalise: signers at the same bridge organisation share SOC, dev tooling, build pipeline, recruiting channels. Genuine separation requires multi-organisation custody, which adds coordination cost and is rarely the path of least resistance commercially.
- TSS / FROST / GG18 instantiations introduce their own implementation-bug surface (key-share-generation flaws, signing-protocol-replay flaws); cryptographic threshold schemes are not strictly safer than EVM-native multisig contracts in v0.1, only differently failure-mode'd.
- M15 has no effect against insider events that reach a threshold by design (key-share custodian wind-down, jurisdictional seizure of multiple signers within the same jurisdiction); M15 explicitly assumes signers can be separated, which fails when all are subject to the same legal authority.
- The Multichain July 2023 incident (~$126M loss following CEO arrest and confiscation of MPC-key-share hardware) is a worked example of M15 limitations under jurisdictional consolidation: the threshold-signing posture was nominally robust but the operator structure was not separated across jurisdictions.

## Reference implementations

- Safe (Gnosis Safe) — canonical EVM-native multisig contract with broad ecosystem adoption; modification-authority delegation per M15's T11.003 guidance is a configuration discipline, not a default.
- Fireblocks, Copper, Cobo, BitGo — third-party custody vendors offering TSS / MPC signing with varying degrees of operator separation; M15 application requires customer-side review of where the vendor's co-signers physically and operationally reside.
- Threshold-signing libraries (binance-chain/tss-lib, ZenGo's gg18 / GG20 implementations, Coinbase's kryptology) — open-source TSS implementations; circuit-audit and formal-verification status varies by library and is itself subject to OAK-M16.
- Bridge validator-set architectures: post-Ronin, several bridge operators raised thresholds and broadened geographic distribution; per-bridge implementations vary and L2BEAT-equivalent published reviews surface threshold and distribution metrics.

## Citations

- `[ellipticronin2022]` — Ronin forensic write-up (T10.001 canonical case; 5-of-9 validator-key compromise).
- `[ellipticharmony2022]` — Harmony Horizon Bridge forensic analysis (T10.001 case; 2-of-5 multisig compromise).
- `[chainalysis2024dprk]` — DPRK / OAK-G01-attributed bridge and custody incidents at scale through 2022–2024.
- `[crystalwazirx2024]` — WazirX / Liminal 2024 forensic analysis (T11.001 entry vector + T11.003 in-use multisig modification).
- `[wazirxwiki2024]` — Wikipedia summary of the WazirX hack including the multisig-modification mechanism.
- `[halbornharmony2022]` — Halborn explainer on the Harmony Horizon Bridge hack.
- `[halbornmultichain2023]` — Halborn analysis of the Multichain July 2023 incident; worked example of threshold-signing under jurisdictional consolidation.
- `[fbiharmony2023]` — FBI confirmation of OAK-G01 attribution to the Harmony Horizon incident.
