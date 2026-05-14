# Solana Token-2022 Multi-Extension Scam Token Cohort — 2024–2025 — Aggregate $150M+

**Loss:** Aggregate extraction estimated at $150M+ across the combined Token-2022 extension-abuse sub-cohorts spanning 2024–2025. The PermanentDelegate (T1.002) sub-cohort alone accounts for an estimated $150M+ in the first 12 months of industrial-scale exploitation (RugCheck.xyz reporting, 2025). The TransferHook (T1.007) and TransferFee (T1.005 secondary on Solana) sub-cohorts are smaller in dollar terms but structurally significant as emerging attack surfaces. Per-incident named forensic write-ups are sparse relative to extraction volume — the pattern is documented primarily at cohort scale through scanner-side (RugCheck, Jupiter) and industry-report (`[neodyme2024token2022]`) coverage.

**OAK Techniques observed:** **OAK-T1.002** (Token-2022 Permanent Delegate Authority — the SPL Token-2022 mint is deployed with the `PermanentDelegate` extension granting a designated address standing authority to move or burn any holder's balance without holder consent. The presence of the extension alone is the signal; detection is a binary check on mint metadata. Industrial-scale exploitation since Q3 2024 in the form of "burn-on-buy" rug-pulls.) **OAK-T1.007** (Token-2022 Transfer-Hook Abuse — the SPL Token-2022 mint is configured with the `TransferHook` extension invoking an attacker-controlled program on every `transfer_checked` invocation. Reintroduces the callback-based vulnerability class — reentrancy, mid-transfer state mutation, attacker-controlled CPI — into Solana's runtime. The hook program is specified by the token creator and can be upgraded post-deployment via `BPFLoaderUpgradeable`.) **OAK-T1.005** (Hidden Fee-on-Transfer — the token contract embeds a conditionally-triggered fee in its transfer logic. On Solana, the Token-2022 `TransferFee` extension provides the standard fee primitive; hidden or asymmetric fee configurations at the extension level constitute the T1.005 Solana-side sub-pattern, distinct from EVM-side conditional-fee-branch implementations.)

**Attribution:** **multi-actor, industrial-scale** — The Token-2022 extension-abuse surface is exploited at industrial scale by independent operators launching scam tokens on Solana. No single operator dominates; the PermanentDelegate sub-cohort alone constitutes a significant fraction of new Solana Token-2022 launches per RugCheck.xyz reporting. The Jupiter/RugCheck community-mitigation response (swap-UI PD flag integration within ~48h of the Slorg/RED disclosure in September 2024) is the canonical venue-side defence model.

**Key teaching point:** **Solana Token-2022 extensions are a composable attack surface — a single mint can combine multiple extensions (PermanentDelegate + TransferHook + TransferFee + MintCloseAuthority + unrenounced freeze authority) to produce a token whose holder-facing behaviour is indistinguishable from a legitimate SPL token at the wallet UI layer but whose authority structure grants the deployer a comprehensive set of holder-extraction primitives.** The defender's detection surface is structurally different for each extension class: PermanentDelegate and TransferFee are binary-detectable at the mint-config layer (extension TLV parsing yields a deterministic boolean); TransferHook requires program-level static analysis or simulation to determine whether the hook program's behaviour is malicious. The asymmetry between binary-detectable extensions (T1.002, T1.005 Solana-side) and behaviour-requiring extensions (T1.007) is the binding constraint on detection-tool maturity at v0.1.

## Summary

The Solana Token-2022 standard (`TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb`) introduced a suite of mint extensions that provide token creators with granular control over transfer semantics, authority delegation, and fee structures. Each extension serves a legitimate business purpose — compliance authority delegation, royalty enforcement, transfer-restriction policies, on-transfer accounting — and each is documented in the SPL standard with clear semantics.

The industrial-scale scam-token exploitation of these extensions, beginning in earnest in Q3 2024, demonstrates that the same properties that make extensions useful for legitimate purposes also make them powerful scam primitives. The defining characteristic of the multi-extension scam token is that it combines multiple extensions to produce a compound attack surface that is more than the sum of its parts.

### T1.002: Permanent Delegate — The Burn-on-Buy Surface

The `PermanentDelegate` extension grants a designated address standing authority to move or burn any holder's balance without holder consent or a per-call delegation. From a defender's perspective, this is the most binary of the Token-2022 surfaces: the extension's presence alone is the signal. There is no behavioural dynamic to simulate — by the time the trader sees a transfer succeed, the delegate authority has already been embedded in the mint config and cannot be revoked except via the delegate's own keys.

Industrial-scale exploitation of PermanentDelegate emerged in Q3 2024 in the "burn-on-buy" pattern: the delegate burns the buyer's tokens within seconds of purchase, leaving them with no recourse. The Slorg/RED token disclosure in September 2024 brought the pattern to broad community attention; Jupiter and RugCheck integrated PD-extension presence flags into their swap UIs within approximately 48 hours, providing the canonical venue-side mitigation model.

The PermanentDelegate sub-cohort is the highest-volume T1.002 surface at v0.1, with RugCheck.xyz reporting in 2025 that PD-bearing mints constitute a significant fraction of new Solana Token-2022 launches. The extraction volume — estimated at $150M+ in the first 12 months — reflects the industrial scale of the exploitation, not the sophistication of individual operators.

### T1.007: Transfer Hook — The Callback-Based Surface

The `TransferHook` extension configures a mint to invoke an attacker-controlled program on every `transfer_checked` invocation. This reintroduces the callback-based vulnerability class — reentrancy, mid-transfer state mutation, attacker-controlled CPI — into Solana's runtime, which had previously precluded callback-based attack surfaces by design.

Three properties make T1.007 structurally significant:
1. The hook program is specified by the token creator, not the caller — the caller has no say in which program is invoked.
2. The hook program can perform arbitrary CPI calls of its own and can return execution to the Token-2022 program in a state mutated by the hook's actions.
3. The hook program is upgradable via `BPFLoaderUpgradeable` — a benign hook at deployment can be upgraded to a malicious hook post-deployment.

At v0.1, T1.007 has mature class-level characterisation (Halborn pre-production audit November 2022; Solana Foundation April 2025 ZK-ElGamal proof zero-day disclosure-and-patch cycle) but no externally-attributed per-incident exploit in the public forensic record. The technique is classified as `Maturity: emerging` — the threat-class characterisation outpaces the per-incident anchor cohort.

### T1.005: Transfer Fee — The Hidden-Cost Surface

On Solana, the Token-2022 `TransferFee` extension provides the standard fee primitive. While the extension's fee parameters are visible in the mint config, the fee can be configured asymmetrically (e.g., sell-side fee materially higher than buy-side fee, or fee applied only to transfers routed through specific AMM programs) in ways that are not surfaced to the trader at swap-time. The Solana-side T1.005 sub-pattern is the TransferFee extension configured with hidden or misleading fee semantics — structurally analogous to the EVM-side conditional-fee-branch pattern but implemented through the standard extension rather than custom transfer-logic bytecode.

### Multi-Extension Stacking: The Compound Surface

The most dangerous scam tokens combine multiple extensions. A mint deployed with PermanentDelegate + TransferHook + TransferFee + MintCloseAuthority + unrenounced freeze authority grants the deployer:
- Standing authority to burn any holder's tokens (PermanentDelegate)
- A callback program invoked on every transfer that can perform arbitrary state mutation (TransferHook)
- A fee structure that may be asymmetric or hidden (TransferFee)
- Authority to close the mint and prevent further transfers (MintCloseAuthority)
- Authority to freeze individual holder accounts (freeze authority)

No single extension is inherently malicious — each has legitimate use cases. But the combination of multiple extensions, each controlled by the deployer with no governance-gated or allowlisted authority, is the fingerprint of a deliberately malicious multi-extension scam token.

### The Jupiter/RugCheck Mitigation Model

The community response to the September 2024 PermanentDelegate disclosure established the canonical venue-side defence pattern: Jupiter integrated PD-extension presence flags into its swap UI within approximately 48 hours, and RugCheck surfaced PD presence as a discrete risk attribute in its scanner. The model is significant because it demonstrates that **venue-side, pre-trade, mint-config-parsing mitigation can close a Token-2022 extension surface at the UX layer without requiring protocol-level changes to the SPL standard.** The extension remains available for legitimate use cases; the venue-side flag ensures that traders are aware of its presence before executing a swap.

The limitation of the model at v0.1 is that it covers only the binary-detectable extensions (PermanentDelegate, TransferFee). TransferHook requires program-level analysis that is not yet standardised in commodity scanner tooling, creating a detection asymmetry: a PD-bearing mint is flagged at the swap UI, while a TransferHook-bearing mint with a malicious hook program may pass through the same UI without a warning. Closing this asymmetry is the primary T1.007 detection-tool gap at v0.1.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-11 | Halborn pre-production audit of Token-2022; transfer-hook and permanent-delegate extension surfaces characterised at the class level | T1.002 + T1.007 (class characterisation) |
| 2024-Q3 | Industrial-scale PermanentDelegate exploitation begins on Solana; "burn-on-buy" rug-pulls emerge as a distinct scam-token sub-class | T1.002 (exploitation begins) |
| 2024-09 | Slorg/RED token disclosure brings PermanentDelegate burn-on-buy to broad community attention; Jupiter and RugCheck integrate PD flags within ~48h | T1.002 (community response) |
| 2024–2025 | PermanentDelegate exploitation continues at industrial scale; RugCheck.xyz reports PD-bearing mints constitute significant fraction of new Solana Token-2022 launches | T1.002 (ongoing) |
| 2024–2025 | TransferHook class characterisation matures (Solana Foundation documentation, developer guides, security advisories); no externally-attributed per-incident exploit in public record | T1.007 (class maturation) |
| 2025-04 | Solana Foundation ZK-ElGamal proof zero-day disclosure-and-patch cycle; T1.007 threat class validated at the runtime level | T1.007 (class validation) |
| 2025 | Multi-extension stacking documented as the fingerprint of deliberately malicious Token-2022 scam tokens; RugCheck and Jupiter coverage expands | T1.002 + T1.005 + T1.007 (compound surface) |

## Public references

- `[neodyme2024token2022]` — Neodyme audit-firm class-level characterisation of Token-2022 extension attack surfaces
- `[solana2024permdelegate]` — Solana Foundation PermanentDelegate extension documentation
- `[halborntoken2022audit]` — Halborn pre-production audit of Token-2022 (November 2022)
- RugCheck.xyz — primary scanner-side coverage for Solana Token-2022 extension risk attributes at v0.1
- Jupiter aggregator — swap-UI-integrated PD-extension presence flagging
- See `techniques/T1.002-token-2022-permanent-delegate.md`, `techniques/T1.007-token-2022-transfer-hook-abuse.md`, and `techniques/T1.005-hidden-fee-on-transfer.md` for Technique definitions
- Cross-reference: `techniques/T1.004-pausable-blacklist-token.md` (freeze authority retention as the Solana-side analogue of EVM pausable/blacklist mechanics)

## Discussion

The Solana Token-2022 multi-extension scam token cohort is the canonical illustration of a **composable-standard attack surface**: a standard designed with legitimate composability as a feature (mint creators can combine extensions to build sophisticated token behaviours) produces, as a direct consequence, a composable attack surface (scam-token operators can combine extensions to build sophisticated holder-extraction primitives). The defender's challenge is not to ban extensions — each has legitimate use cases — but to surface extension presence and combination at the venue layer so that traders can make informed decisions before executing a swap.

The detection asymmetry between binary-detectable extensions (PermanentDelegate, TransferFee — parse the mint config and emit a boolean) and behaviour-requiring extensions (TransferHook — simulate the hook program's behaviour against a matrix of caller/counterparty/amount conditions) is the binding constraint on detection-tool maturity at v0.1. Closing the TransferHook detection gap — through program-level static analysis standards, hook-behaviour simulation infrastructure, and commodity-scanner integration — is the primary T1.007 v0.x improvement target.
