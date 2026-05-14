# Solana Token-2022 PermanentDelegate malicious-exercise cohort — Solana — 2024–2025

**Loss:** cohort-scale — Token-2022 tokens deploying the `PermanentDelegate` extension with the delegate set to a deployer-controlled address enabled post-mint burn, freeze, and transfer of any holder's tokens without holder consent. Aggregate cohort extraction across the first 12 months of Token-2022 PD-abuse deployment (September 2024 → August 2025) is estimated at $150M+ by Jupiter and RugCheck community reporting. The canonical per-token case (RED token, 2024-09-06) extracted ~$150K before being flagged by Jupiter Core Working Group member Slorg.

**OAK Techniques observed:** **OAK-T1.002** (Token-2022 Permanent Delegate Authority — primary; the `PermanentDelegate` extension was the enabling genesis-time primitive that gave the deployer permanent, non-renounceable authority to burn, freeze, or transfer any holder's tokens after launch). **OAK-T1.006** (Honeypot-by-Design — the PermanentDelegate authority was frequently combined with a burn-on-transfer mechanism that burned a percentage of tokens on every sell, effectively trapping holders while the deployer's permanent-delegate-held supply remained liquid). **OAK-T5.001** (Hard LP Drain — many PD-abuse tokens deployed an AMM pool seeded with deployer-supplied LP that was subsequently drained via the permanent-delegate burn path, converting the LP-side position into an exit without going through the standard LP-token-burn flow). **OAK-T6** (Defense Evasion — the PermanentDelegate extension is a legitimate Token-2022 feature designed for compliance use-cases; its presence alone does not distinguish malicious from legitimate deployment, and the standard SPL token-risk check at v0.1 required explicit PD-field inspection).

**Attribution:** **pseudonymous** at the per-token level; **cohort-level** at the aggregate extraction scale. The RED token deployer cluster was identified by Slorg and the Jupiter community; the broader PD-abuse cohort spans hundreds of independently-deployed tokens across multiple deployer clusters. Per-cluster attribution is sparse at v0.1.

**Key teaching point:** **The Token-2022 PermanentDelegate extension is a genesis-time backdoor that survives renouncement of mint and freeze authorities.** A token that has renounced its mint and freeze authorities (the standard SPL token-safety check) can still be fully controlled by the permanent-delegate address through the PermanentDelegate extension. The standard Solana token-risk pipeline at v0.1 (check mint authority, check freeze authority, check mutability) misses the PD field entirely unless explicitly extended to cover Token-2022 extensions. The Jupiter/RugCheck PD-detection integration (September 2024) was the most operationally-impactful community-side mitigation, analogous to the GoPlus/TokenSniffer honeypot-detection integration on EVM.

## Summary

Solana's Token-2022 program (`TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb`) introduced a suite of extensions to the base SPL Token standard, including the `PermanentDelegate` extension. When enabled at token creation, the PD extension designates a permanent delegate address with the authority to burn, freeze, or transfer *any* holder's tokens — a power that is non-renounceable and survives the renouncement of the conventional mint and freeze authorities.

The extension was designed for legitimate compliance use-cases: regulated stablecoins that need to enforce sanctions compliance (analogous to USDC's freeze authority), securities tokens with transfer restrictions, and institutional custody setups requiring recovery paths. The design intent is explicitly documented in the Solana Foundation's Token Extensions documentation.

Malicious deployers adopted the PD extension at scale beginning in mid-2024. The pattern:

1. **Deployer creates a Token-2022 token with PermanentDelegate set to a deployer-controlled address.** The conventional mint and freeze authorities may be renounced (passing standard token-safety checks), but the PD authority remains in perpetuity.
2. **Token is marketed as a standard memecoin or community token.** Standard SPL token-risk checks (mint authority, freeze authority) pass because those authorities are renounced.
3. **Buyers enter the AMM pool.** The token may accumulate genuine volume and holder count.
4. **At a deployer-chosen moment, the PD authority exercises its permanent power** — burning holder tokens (value destruction), freezing holder addresses (liquidity trap), or transferring holder tokens to the deployer (direct drain). The extraction may be immediate or staged across multiple blocks.

The RED token (2024-09-06) was the canonical early case surfaced by Jupiter Core Working Group member Slorg. The RED deployer set PermanentDelegate to a deployer-controlled address, renounced conventional mint and freeze authorities, and deployed an AMM pool. After holders entered, the PD authority was exercised against non-deployer holders. The Slorg thread on X identified the pattern and the Jupiter CWG integrated PD detection into the Jupiter swap UI within days, flagging PD-enabled tokens with a prominent warning.

The Jupiter/RugCheck integration (September 2024) was the primary community-side mitigation, followed by RugCheck adding PD-extension detection to its standard token-risk pipeline and Jupiter extending the flag to the strict-list path. Despite these mitigations, PD-abuse deployment continued at scale through 2025, with the tactic migrating across deployer clusters and token-naming conventions.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2024-Q1 to Q2 | Token-2022 extensions gain developer traction; legitimate PD use-cases documented by Solana Foundation | (pre-incident) |
| 2024-09-06 | RED token PD-abuse surfaced by Slorg on X; Jupiter CWG integrates PD detection into swap UI within days | **T1.002 disclosure** |
| 2024-09 onward | RugCheck adds PD-extension detection; broader community awareness of the PD surface | (mitigation deployment) |
| 2024-Q4 to 2025-Q3 | Cohort-scale PD-abuse continues across hundreds of independent deployer clusters; aggregate extraction estimated at $150M+ | **T1.002 cohort** |

## What defenders observed

- **Renounced mint and freeze authorities are not sufficient on Token-2022.** The standard SPL token-safety check (mint authority = None, freeze authority = None) misses the PD field entirely. A token that passes all conventional checks can still be fully controlled by the PD address. The detector pipeline must explicitly enumerate Token-2022 extensions and flag PD presence.
- **PD is not a binary "malicious" flag — the discriminator is PD-address resolution.** A legitimate compliance-bearing token may deploy PD with the delegate set to a known regulated-entity or governance-controlled address. The malicious pattern is PD set to a deployer-clustered EOA with no governance gate. The resolution requires per-PD-address attribution (deployer-cluster membership, governance-contract verification, regulated-entity allowlist), not just PD-presence detection.
- **The Jupiter/RugCheck response is the canonical community-side T1.002 mitigation model.** Within days of the RED disclosure, Jupiter integrated PD detection and flagged PD-enabled tokens in the swap UI. This is the operational template for how a venue-side warning surface can close a T1.002 surface without requiring protocol-level changes.

## What this example tells contributors writing future Technique pages

- **This example is the 2024–2025 cohort complement to the Slorg/RED per-token anchor.** The existing T1.002 example (`examples/2024-09-solana-permanent-delegate-burn-on-buy-cohort.md`) documents the Slorg/RED disclosure and the broader burn-on-buy cohort. This example anchors the *aggregate extraction scale* and the *community-mitigation response* at the venue layer.
- **T1.002 and T1.006 are structural companions on Token-2022.** The PD extension is the genesis-time enabling primitive (T1.002); the burn-on-transfer or freeze-on-transfer mechanism combined with PD is the honeypot-by-design primitive (T1.006). Contributors writing per-incident T1.002 cases should check whether the token also deployed transfer-hook abuse (T1.007) or burn-on-transfer mechanics (T1.006), since malicious Token-2022 deployments frequently compound multiple extensions.

## Public references

- Solana Foundation. *"Token-2022 Extensions: Permanent Delegate."* 2024.
- Jupiter Core Working Group. *"Token-2022 PermanentDelegate Risk Flag."* September 2024 (Slorg disclosure and UI integration).
- RugCheck. *"Token-2022 Extension Detection."* September 2024.
- Cross-reference: T1.002 (Token-2022 Permanent Delegate Authority) at `techniques/T1.002-token-2022-permanent-delegate.md`.
- Cross-reference: T1.007 (Token-2022 Transfer-Hook Abuse) at `techniques/T1.007-token-2022-transfer-hook-abuse.md`.
- Cross-reference: T1.006 (Honeypot-by-Design, proposed) — PD + burn-on-transfer is the canonical T1.006 sub-pattern on Solana.

### Proposed new BibTeX entries

```bibtex
@misc{solana2024permdelegate,
  author = {{Solana Foundation}},
  title = {Token-2022 Extensions: Permanent Delegate},
  year = {2024},
  note = {Legitimate compliance use-case for the PermanentDelegate extension; the same feature is the T1.002 enabling primitive when deployed maliciously}
}

@misc{jupiterslorg2024pd,
  author = {{Slorg \& Jupiter Core Working Group}},
  title = {Token-2022 PermanentDelegate Risk Disclosure and Jupiter UI Flag Integration},
  year = {2024},
  month = sep,
  note = {RED token PD-abuse surfaced 2024-09-06; Jupiter swap UI PD flag integrated within ~48h}
}
```
