# Solana Token-2022 PermanentDelegate malicious-exercise cohort — Solana — 2024–2025

**Loss:** cohort-scale — Token-2022 tokens deploying the `PermanentDelegate` extension with the delegate set to a deployer-controlled address enabled post-mint burn, freeze, and transfer of any holder's tokens without holder consent. No aggregate cohort loss figure and no per-token dollar figure for the RED token are sourced; earlier figures of \$150M+ (cohort) and ~\$150K (RED) had no source and were removed. The canonical per-token case is the RED token: a Jupiter community member swapped for RED and the tokens were burned about seven seconds later (Cointelegraph, 2024-09-04), flagged by Jupiter Core Working Group member Slorg on X on 2024-09-03.

**OAK Techniques observed:** **OAK-T1.002** (Token-2022 Permanent Delegate Authority — primary; the `PermanentDelegate` extension was the enabling genesis-time primitive that gave the deployer permanent, non-renounceable authority to burn, freeze, or transfer any holder's tokens after launch). **OAK-T1.006** (Honeypot-by-Design — the PermanentDelegate authority was frequently combined with a burn-on-transfer mechanism that burned a percentage of tokens on every sell, effectively trapping holders while the deployer's permanent-delegate-held supply remained liquid). **OAK-T5.001** (Hard LP Drain — many PD-abuse tokens deployed an AMM pool seeded with deployer-supplied LP that was subsequently drained via the permanent-delegate burn path, converting the LP-side position into an exit without going through the standard LP-token-burn flow). **OAK-T6** (Defense Evasion — the PermanentDelegate extension is a legitimate Token-2022 feature designed for compliance use-cases; its presence alone does not distinguish malicious from legitimate deployment, and the standard SPL token-risk check at v0.1 required explicit PD-field inspection).

**Attribution:** **pseudonymous** at the per-token level; **cohort-level** at the aggregate extraction scale. The RED token pattern was surfaced by Slorg; the sources reviewed do not identify the deployer, and the size of the broader cohort is not quantified in them.

**Corrected 2026-10-11:** RED disclosure dated 2024-09-03/04 (not 09-06) with the burn ~7 seconds after the swap; unsourced \$150K RED loss, \$150M+ cohort figure and "hundreds of tokens" claims removed; Jupiter/RugCheck described as adding flags rather than as figure sources.

**Key teaching point:** **The Token-2022 PermanentDelegate extension is a genesis-time backdoor that survives renouncement of mint and freeze authorities.** A token that has renounced its mint and freeze authorities (the standard SPL token-safety check) can still be fully controlled by the permanent-delegate address through the PermanentDelegate extension. The standard Solana token-risk pipeline at v0.1 (check mint authority, check freeze authority, check mutability) misses the PD field entirely unless explicitly extended to cover Token-2022 extensions. Jupiter and RugCheck adding Permanent Delegate flags is the kind of community-side mitigation that matters most here, analogous to the GoPlus/TokenSniffer honeypot-detection integration on EVM.

## Summary

Solana's Token-2022 program (`TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb`) introduced a suite of extensions to the base SPL Token standard, including the `PermanentDelegate` extension. When enabled at token creation, the PD extension designates a permanent delegate address with the authority to burn, freeze, or transfer *any* holder's tokens — a power that is non-renounceable and survives the renouncement of the conventional mint and freeze authorities.

The extension was designed for legitimate compliance use-cases: regulated stablecoins that need to enforce sanctions compliance (analogous to USDC's freeze authority), securities tokens with transfer restrictions, and institutional custody setups requiring recovery paths. The design intent is explicitly documented in the Solana Foundation's Token Extensions documentation.

Malicious deployers adopted the PD extension at scale beginning in mid-2024. The pattern:

1. **Deployer creates a Token-2022 token with PermanentDelegate set to a deployer-controlled address.** The conventional mint and freeze authorities may be renounced (passing standard token-safety checks), but the PD authority remains in perpetuity.
2. **Token is marketed as a standard memecoin or community token.** Standard SPL token-risk checks (mint authority, freeze authority) pass because those authorities are renounced.
3. **Buyers enter the AMM pool.** The token may accumulate genuine volume and holder count.
4. **At a deployer-chosen moment, the PD authority exercises its permanent power** — burning holder tokens (value destruction), freezing holder addresses (liquidity trap), or transferring holder tokens to the deployer (direct drain). The extraction may be immediate or staged across multiple blocks.

The RED token (disclosed 2024-09-03) was the canonical early case surfaced by Jupiter Core Working Group member Slorg on X. A Jupiter community member swapped for RED, which carried the Permanent Delegate extension, and the tokens were burned about seven seconds after the transaction (Cointelegraph, 2024-09-04). Slorg suggested the motives could include creating chaos or manipulating circulating supply. Jupiter and RugCheck subsequently added Permanent Delegate flags to their token-risk surfaces; the exact dates of those changes are not confirmed in the sources reviewed.

Community-side mitigation consisted of Jupiter and RugCheck adding Permanent Delegate flags. Whether PD abuse continued at scale through 2025 is not quantified in the sources reviewed.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2024-Q1 to Q2 | Token-2022 extensions gain developer traction; legitimate PD use-cases documented by Solana Foundation | (pre-incident) |
| 2024-09-03 | RED token PD-abuse surfaced by Slorg on X (Cointelegraph report 2024-09-04); tokens burned ~7 seconds after the swap | **T1.002 disclosure** |
| 2024-09 onward | Jupiter and RugCheck add PD flags (dates unconfirmed); broader community awareness of the PD surface | (mitigation deployment) |

## What defenders observed

- **Renounced mint and freeze authorities are not sufficient on Token-2022.** The standard SPL token-safety check (mint authority = None, freeze authority = None) misses the PD field entirely. A token that passes all conventional checks can still be fully controlled by the PD address. The detector pipeline must explicitly enumerate Token-2022 extensions and flag PD presence.
- **PD is not a binary "malicious" flag — the discriminator is PD-address resolution.** A legitimate compliance-bearing token may deploy PD with the delegate set to a known regulated-entity or governance-controlled address. The malicious pattern is PD set to a deployer-clustered EOA with no governance gate. The resolution requires per-PD-address attribution (deployer-cluster membership, governance-contract verification, regulated-entity allowlist), not just PD-presence detection.
- **The Jupiter/RugCheck response is a community-side T1.002 mitigation model.** After the RED disclosure, Jupiter and RugCheck added PD flags. This is the operational template for how a venue-side warning surface can close a T1.002 surface without requiring protocol-level changes.

## What this example tells contributors writing future Technique pages

- **This example is the 2024–2025 cohort complement to the Slorg/RED per-token anchor.** The existing T1.002 example (`examples/2024-09-solana-permanent-delegate-burn-on-buy-cohort.md`) documents the Slorg/RED disclosure and the broader burn-on-buy cohort. This example anchors the *community-mitigation response* at the venue layer; no aggregate extraction scale is sourced.
- **T1.002 and T1.006 are structural companions on Token-2022.** The PD extension is the genesis-time enabling primitive (T1.002); the burn-on-transfer or freeze-on-transfer mechanism combined with PD is the honeypot-by-design primitive (T1.006). Contributors writing per-incident T1.002 cases should check whether the token also deployed transfer-hook abuse (T1.007) or burn-on-transfer mechanics (T1.006), since malicious Token-2022 deployments frequently compound multiple extensions.

## Public references

- `[cointelegraphred2024]` — Cointelegraph, "New Solana scam burns tokens from inside SOL wallets" (2024-09-04): <https://cointelegraph.com/news/new-solana-scam-burn-tokens-from-inside-sol-wallets> (RED token, Slorg's post of 2024-09-03; tokens burned ~7 seconds after the swap)
- `[cryptotimesred2024]` — Crypto Times, "Scammers burn Solana tokens seconds after purchase" (2024-09-04): <https://www.cryptotimes.io/2024/09/04/scammers-burn-solana-tokens-seconds-after-purchase/>
- `[coinpaperpd2024]` — Coinpaper, "Scammers Exploit Solana Token Feature to Burn Users' Crypto" (2024-09): <https://coinpaper.com/5295/scammers-exploit-solana-token-feature-to-burn-users-crypto>
- Solana Foundation. *"Token-2022 Extensions: Permanent Delegate."* 2024.
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
  note = {RED token PD-abuse surfaced 2024-09-03}
}
```
