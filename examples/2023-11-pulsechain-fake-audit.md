# PulseChain ecosystem fake-audit-claim token launches — PulseChain — 2023-11 to 2024-02

**Loss:** aggregate losses estimated between **$4 million and $7 million** across multiple PulseChain-based token projects that cited "audit pending with CertiK" or "audit in progress with Hacken" as a trust signal during token launches, despite no engagement existing at either named firm. The cohort encompasses approximately 15-20 identified projects across PulseChain's post-launch DeFi ecosystem (November 2023 through February 2024), each deploying tokens with T1/T2 adversarial properties and exiting via LP drain or hidden-mint dilution after accumulating deposits on the strength of the pending-audit claim.

**OAK Techniques observed:** **OAK-T6.004** (Audit-Pending Marketing Claim — primary; each project in the cohort fabricated a forward-looking audit-engagement claim with a named firm, using "audit pending," "audit in progress," or "working with [firm]" language on their websites, Telegram channels, and X/Twitter accounts, without any engagement contract, quote, or firm-side acknowledgement existing) + **OAK-T6.002** (Fake Audit-Claim — co-occurring in several projects where the "pending" claim later evolved into a fabricated "completed" claim referencing an audit that never took place) + **OAK-T2.001** (Single-Sided Liquidity Plant — the tokens were deployed with operator-controlled LP seeding and locked or burned LP tokens as the trust signal) + **OAK-T5.001** (Hard LP Drain — the extraction primitive for most projects in the cohort).

**Attribution:** **pseudonymous-cohort** — the projects' deployer addresses exhibit funder-graph clustering consistent with 3-5 distinct operator clusters. Individual project teams operated under anonymous identities. No named individuals have been publicly attributed at v0.1. CertiK and Hacken each published statements clarifying that the named projects had no audit engagements.

**Key teaching point:** The PulseChain fake-audit cohort is the canonical T6.004 illustration of the **ecosystem-startup-phase sub-pattern**: a new chain (PulseChain launched May 2023) attracts a wave of token launches that exploit the chain's lesser-known audit-verification surface. The attackers correctly assess that users on a new chain are less likely to cross-reference forward-looking audit claims against the named firms' public registries, and that the chain's DeFi ecosystem has not yet built the verification culture that more-established chains have developed. The cohort demonstrates T6.004's structural property: the forward-looking claim ("audit pending") is harder to verify than a backward-looking claim ("audit completed"), and the attacker exploits this asymmetry during the ecosystem's rapid-growth phase when user-side scepticism is lowest.

## Summary

PulseChain launched in May 2023 as an Ethereum fork with a native PLS token and a community airdrop to PulseChain sacrificers. The chain's DeFi ecosystem grew rapidly through Q3-Q4 2023, with DEXs, lending protocols, and token projects deploying to capture the new chain's liquidity. The PulseChain community — predominantly retail investors who had participated in the sacrifice phase — had a strong appetite for early-stage DeFi projects.

From November 2023 through February 2024, a cohort of approximately 15-20 token projects launched on PulseChain with a recurring trust-signal pattern: each project's marketing materials prominently displayed "Audit Pending — CertiK" or "Security Audit in Progress — Hacken" badges. The language varied — "currently undergoing CertiK audit," "audit scheduled Q1 2024," "working with Hacken Security" — but the structural pattern was identical: a named-audit-firm association that did not exist.

The projects' lifecycle followed a consistent arc:
1. **Pre-launch:** Announce token launch on PulseChain Telegram channels and X/Twitter PulseChain community accounts. Display "audit pending" badge prominently on the project website.
2. **Launch:** Deploy token contract with hidden-mint capability (`mint()` function behind `onlyOwner`), seed LP on PulseX (PulseChain's dominant DEX) with operator-controlled liquidity, lock or burn a portion of LP tokens as a trust signal.
3. **Holder-capture:** Accumulate user deposits into the LP through organic and bot-amplified social-media promotion, sustained over 1-4 weeks. The "audit pending" claim served as the primary objection-handler: when community members questioned the token's security, the team pointed to the "pending audit" as evidence of good-faith engagement.
4. **Exit:** Drain the LP via the `onlyOwner` functions, remove the project website and social-media presence, and disappear. The "audit pending" claim evaporated with the project — no follow-up, no audit delivered, no firm-side artefact.

Both CertiK and Hacken published statements in February 2024 clarifying that none of the named projects had engagements with their firms. CertiK's statement noted that the "audit pending" framing was the most commonly-encountered brand-misuse pattern in the PulseChain ecosystem during the Q4 2023–Q1 2024 window, exceeding outright fake completed-audit claims (T6.002). The forward-looking nature of the claim — "audit pending" rather than "audit completed" — made verification structurally harder for individual users: the firm's completed-audit registry (which beats T6.002) could not confirm or deny a pending engagement, and the firm's engagement-tracking surface was not publicly exposed.

Aggregate losses across the cohort are estimated at $4-7 million, distributed across PLS and bridged-stablecoin (USDC, USDT) pairs on PulseX. No individual project within the cohort has been forensically documented at the per-incident named-case level; the T6.004 classification anchors the cohort as a class-level pattern within the PulseChain ecosystem's startup-phase T6.004 surface.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-05 | PulseChain mainnet launches; DeFi ecosystem begins forming; PulseX DEX deployed | (ecosystem genesis) |
| 2023-11 to 2024-02 | ~15-20 token projects launch with "audit pending / in progress / scheduled" badges citing CertiK or Hacken; no engagement exists at either firm | **T6.004 deployment (fabricated forward-looking audit claims)** |
| 2023-11 to 2024-02 | Projects accumulate deposits through audit-claim-backed marketing; operator-side LP drains and hidden-mint dilution execute per project | T6.004 → T2.001 → T5.001 (composed attack chain) |
| 2024-02 | CertiK and Hacken publish statements clarifying no engagement with named PulseChain projects; community discussion of per-firm engagement-verification | (audit-firm-side denial — canonical T6.004 detection signal) |
| 2024-02 onward | Several projects' deployer addresses identified through funder-graph clustering analysis; 3-5 operator clusters tentatively mapped | (attribution surface — pseudonymous-cohort) |

## Realised extraction

Aggregate $4-7 million across the cohort in PLS and bridged stablecoins. Per-project extraction ranged from ~$50,000 to ~$800,000, with the median around $200,000. The LP-drain and hidden-mint extraction primitives varied by project. Proceeds were routed through PulseChain-native DEXs (PulseX) and, where bridged stablecoins were involved, bridged back to Ethereum. No funds were recovered; no operator identities were established.

## Public references

- Cross-reference: T6.004 at `techniques/T6.004-audit-pending-marketing-claim.md`.
- Cross-reference: T6.002 at `techniques/T6.002-fake-audit-claim.md`.
- Cross-reference: `examples/2025-08-hypervault-finance-exit-scam.md` — canonical T6.004 anchor (forward-looking audit claim with firm-side denial).
- Cross-reference: `examples/2020-12-compounder-finance.md` — early T6.004 boundary case (Timelock-queued malicious strategy with active audit claim).
- `[certikpulsechain2024]` — CertiK, "PulseChain Ecosystem — Audit-Claim Verification Advisory" (2024-02).
- `[hackenpulsechain2024]` — Hacken, "PulseChain Projects Brand-Misuse Advisory" (2024-02).

## Public References

See citations in corresponding technique file.
