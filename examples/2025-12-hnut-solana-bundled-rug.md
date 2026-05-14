# HNUT (Holly The Squirrel) bundled-rug Pull — Solana / Pump.fun — 2025-12-30

**Loss:** approximately **99% price collapse** from an all-time high near $0.007 to effectively zero within hours of launch. Remaining liquidity approximately $29,000; market capitalization under $1,400 post-collapse. Approximately 78% of early trading activity involved bundled transactions. Exact retail loss cannot be quantified from public data but the rapid drawdown wiped out nearly all value for late buyers.

**OAK Techniques observed:** **OAK-T3.001** (Sybil-Bundled Launch — primary; approximately 78% of early trading volume was bundled transactions, with multiple wallets coordinating to concentrate tokens before the coordinated sell-off) + **OAK-T2.004** (Initial-Liquidity Backdoor — the Pump.fun bonding-curve LP model embeds creation-time LP-control retention by the deployer cluster; the pre-graduation curve is structurally controlled by the deployer rather than constrained by an LP-token-burn flow) + **OAK-T5.001** (Hard LP Drain — the deployer executed a rapid LP-position exit after the bundled-holder cohort's sell-off, draining the remaining quote-side liquidity) + **OAK-T1.004** (Blacklist / Pausable Weaponization — boundary case; the SPL token retained freeze authority at deployment as a non-renounced contract, structurally equivalent to the T1.004 blacklist/pausable surface on EVM chains; the retained authority was the standing adversarial property even if freeze was not actively invoked during the extraction window).

**Attribution:** **pseudonymous** — the deployer address is observable on-chain and the bundled-wallet cluster is identifiable via transaction-graph analysis (78% bundled volume). Crypto Scam Hunter issued a pre-collapse scam alert flagging the bundled on-chain behavior and supply concentration. PeckShield flagged the 99% collapse as a bundled rug pull. No named-individual attribution at v0.1.

**Key teaching point:** HNUT is the 2025 anchor for the **Pump.fun bundled-launch → graduation → instant rug** sub-pattern where the adversarial properties are visible on-chain before the collapse. The 78% bundled-transaction ratio, non-renounced contract with retained freeze/mint authority, and supply concentration were all observable at launch. The case reinforces that **Pump.fun tokens with >50% bundled early volume and non-renounced contracts are T3.001 + T2.004 exposed by construction** — the detection signal is available at deployment but requires pre-trade simulation and authority-enumeration tooling.

## Summary

On December 30, 2025, HNUT ("Holly The Squirrel"), a Solana-based meme coin themed after a squirrel character, launched via Pump.fun and collapsed approximately 99% within hours. The token was deployed under the standard Pump.fun bonding-curve model with the deployer retaining mint and freeze authority (non-renounced contract).

On-chain analysis by Specter and Crypto Scam Hunter revealed that approximately 78% of early trading activity involved bundled transactions — a pattern where multiple wallets under coordinated control acquire the majority of token supply before executing a rapid, coordinated sell-off. Crypto Scam Hunter issued a scam alert before the collapse, flagging the bundled on-chain behavior and supply concentration as red flags and urging traders to stay away.

The collapse followed the standard Pump.fun rug-pull template: bundled-sniper acquisition during the bonding-curve phase → graduation to Raydium → coordinated insider sell-off → LP drain. Post-collapse, multiple phishing-style airdrop scams circulated on X impersonating recovery tools or claim links — a secondary exploitation pattern targeting affected traders.

PeckShield flagged the incident as a bundled rug pull. The token's price fell from approximately $0.007 to effectively zero, with remaining liquidity of ~$29,000 and market capitalization under $1,400.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2025-12-30 (pre-launch) | HNUT token deployed on Pump.fun (Solana) with non-renounced contract; deployer retains mint and freeze authority | T1.004 (retained freeze authority), T2.004 (bonding-curve LP backdoor) |
| 2025-12-30 (launch window) | ~78% of early trades are bundled transactions; insider wallets accumulate majority supply via coordinated sniper buys | T3.001 (Sybil-Bundled Launch) |
| 2025-12-30 (pre-collapse) | Crypto Scam Hunter issues scam alert flagging bundled behavior and supply concentration | (defender-side signal) |
| 2025-12-30 (collapse) | Coordinated insider sell-off; price collapses ~99%; LP drained | T5.001 (Hard LP Drain) |
| 2025-12-30 (post-collapse) | PeckShield flags HNUT as bundled rug pull; phishing airdrop scams target affected traders | (post-event forensics + secondary exploitation) |

## What defenders observed

- **Pre-event (Pump.fun deployment):** The token was deployed with a non-renounced contract — the deployer retained mint and freeze authority on the SPL token. This is the standard adversarial Pump.fun deployment template and is the on-chain equivalent of T1.004's retained-blacklist-authority surface.
- **Pre-event (bundled-transaction ratio):** Approximately 78% of early trading activity was bundled — multiple wallets under coordinated control acquiring supply at the bonding-curve launch price. The bundled-transaction ratio was visible on-chain in the per-slot transaction trace and was the load-bearing pre-collapse signal.
- **Pre-event (Crypto Scam Hunter alert):** The scam alert was issued before the collapse, demonstrating that the detection signal (bundled volume + supply concentration + non-renounced contract) was actionable at the pre-trade layer. The alert was issued but the speed of the collapse (~hours) limited its defensive impact.
- **At-event (coordinated sell-off):** The coordinated insider dump followed the standard pattern: multiple bundled wallets sold into the same liquidity window, producing the characteristic 99% price collapse.
- **Post-event (secondary phishing):** Phishing airdrop scams appeared within hours, impersonating recovery tools — a recurring post-rug exploitation pattern.

## What this example tells contributors writing future Technique pages

- **HNUT is a clean 2025 per-incident anchor for the T3.001 + T2.004 + T5.001 Pump.fun chain.** The case demonstrates the full adversarial template: deploy with retained authority → bundled-sniper acquisition on the bonding curve → graduate → coordinated dump → LP drain. Each Technique in the chain has a specific, observable on-chain signal.
- **The bundled-transaction ratio is the load-bearing T3.001 detection metric.** HNUT's ~78% bundled-volume ratio at launch is the quantitative signal that discriminates a bundled launch from organic early interest. Future T3.001 detection guidance should calibrate bundled-volume thresholds against the broader Pump.fun cohort baseline.
- **T1.004 on Solana: retained freeze authority is the structural equivalent of EVM blacklist/pausable.** Pump.fun tokens with non-renounced contracts retain freeze authority by default. Even when freeze is not actively invoked during the extraction window, the retained authority is the standing adversarial property. Future T1.004 examples covering non-EVM chains should explicitly map Solana freeze-authority retention to the T1.004 surface.

## Public references

- `[beincryptohnut2025]` — BeInCrypto, "99% Nuke on This Meme Coin Raises Fresh Rug Pull Concerns" (2025-12-30).
- `[peckshieldhnut2025]` — PeckShield, X post flagging HNUT 99% collapse as bundled rug pull (2025-12-30).
- `[cryptoscamhunterhnut2025]` — Crypto Scam Hunter, X scam alert pre-collapse flagging bundled behavior and supply concentration (2025-12-29).

## Citations

- `[beincryptohnut2025]` — primary contemporaneous press; 99% collapse, 78% bundled-transaction ratio, Pump.fun launch mechanism, Specter on-chain analysis, phishing aftermath.
- `[peckshieldhnut2025]` — PeckShield on-chain flagging; bundled rug pull classification.

## Discussion

HNUT is the 2025 canonical per-incident anchor for the **Pump.fun bundled-launch → graduation → instant rug** sub-pattern. The case is structurally significant for OAK because it provides a clean single-incident worked example where all three techniques in the chain (T2.004 → T3.001 → T5.001) are observable on-chain from the launch transaction, and the pre-collapse warning (Crypto Scam Hunter) confirms the detection signal was actionable before the extraction.

The case is a per-incident instantiation of the broader Pump.fun bonding-curve rug cohort documented at `examples/2024-2025-pump-fun-bonding-curve-rug-cohort.md`. Where the cohort-scale example provides the platform-level framing (98.6% rug-pull rate, $4-5.5B aggregate retail loss), HNUT provides the per-incident worked-example granularity: a named token, a specific date, quantified metrics (78% bundled ratio), and a pre-collapse defender-side alert.

The T1.004 reference is a boundary case. HNUT's SPL token retained freeze authority at deployment — the Solana structural equivalent of the EVM blacklist/pausable surface. The freeze authority was not actively invoked during the extraction window (no addresses were frozen), but the retained authority was the standing adversarial property that made the extraction possible. This is consistent with T1.004's scope: the blacklist/pausable *capability* is the adversarial signal, not necessarily its active invocation.

The case's principal limitation at v0.1 is pseudonymous attribution and the small per-incident dollar figure. The deployer address is observable but unnamed; the per-incident retail loss is small relative to headline-scale incidents. The case earns its place in the OAK corpus as the clean 2025 per-incident demonstration of the T2.004 + T3.001 + T5.001 chain on Pump.fun, a pattern that accounts for the majority of the cohort-scale $4-5.5B aggregate loss.
