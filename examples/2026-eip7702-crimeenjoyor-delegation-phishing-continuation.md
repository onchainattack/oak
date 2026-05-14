# EIP-7702 Delegation Phishing — Continued 2026 CrimeEnjoyor Cluster Operations — 2026 — ~$3M+

**Loss:** approximately $3M+ in additional extraction through 2026 (January–May), incremental to the ~$12M+ cohort loss documented through 2025-Q4. The 2026 continuation reflects the persistent-execution-authority surface: EIP-7702 delegations registered in 2025 remain active through 2026, and newly-compromised EOAs continue to be added to the delegated set. The addressable surface (450,000+ delegated wallets across the broader malicious-delegator ecosystem per Wintermute / GoPlus telemetry) remains materially larger than the realised extraction.

**OAK Techniques observed:** **OAK-T4.007** (Native-app Social Phishing on Engagement-Weighted Platforms — CrimeEnjoyor operators adapted distribution surfaces to 2026 platform mechanics, exploiting engagement-weighted ranking on emerging prediction-market and social-fi platforms beyond the original Polymarket comment-section vector.) **OAK-T13.004** (EIP-7702 Delegation Abuse — the on-chain extraction primitive remained the persistent-execution-authority delegation registered via set-code transactions; the 2026 continuation demonstrates the permanent-recovery posture for compromised EOAs whose delegation remains active across the Pectra-activated chain surface.)

**Attribution:** **OAK-G02** (Drainer-as-a-Service ecosystem). CrimeEnjoyor is the Wintermute-assigned tag for the dominant EIP-7702 sweeper-template family. The 2026 continuation exhibits the same bytecode-signature cluster, the same Relay Protocol cross-chain consolidation infrastructure, and the same future-deposit-trapping optionality model as the 2025 cohort. The operational continuity confirms that the CrimeEnjoyor cluster is a persistent DaaS affiliate operation, not a one-off opportunist.

**Key teaching point:** **The EIP-7702 delegation surface is permanent — compromised EOAs from 2025 remain sweepable through 2026, and the CrimeEnjoyor cluster's continued operations demonstrate that the delegation-abuse primitive is a standing extraction surface, not a post-Pectra window-limited event.** The structural lesson is that **protocol-level primitives that introduce persistent-execution-authority artefacts (EIP-7702 set-code delegations) create a permanent attack surface whose blast radius does not decay over time — every EOA delegated in 2025 is still delegated in 2026, and every future deposit to those EOAs is still auto-routed to attacker-controlled infrastructure.** The defender takeaway is that **wallet-UX hardening (pre-signing delegation warnings), cohort-level monitoring (Wintermute Dune dashboard, GoPlus delegation-state API), and high-balance custody segregation from interactive-signing surfaces are the only load-bearing mitigations — there is no post-event recovery surface for a delegated EOA.**

## Summary

The EIP-7702 set-code transaction type shipped with Ethereum's Pectra hard fork on 2025-05-07, introducing a persistent-execution-authority delegation primitive. Within weeks, Wintermute and GoPlus Security telemetry showed >90% of EIP-7702 delegations linked to malicious contracts, dominated by the CrimeEnjoyor sweeper-template family. Through 2025-Q4, the cohort extracted ~$12M+ across 15,000+ wallets, with 450,000+ wallets in the addressable delegated set.

The 2026 continuation (January–May 2026) demonstrates that:

1. **The CrimeEnjoyor cluster remains operationally active.** The same bytecode-signature template, the same Relay Protocol cross-chain consolidation infrastructure, and the same future-deposit-trapping optionality model persisted through early 2026. Additional extraction of ~$3M+ was documented across newly-compromised EOAs and newly-triggered sweeps of previously-delegated EOAs that received material inbound deposits in 2026.

2. **The distribution surface diversified.** While the original 2025 vector concentrated on Polymarket comment-section phishing (T4.007), the 2026 continuation showed adaptation to additional engagement-weighted platforms — social-fi comment sections, prediction-market clones, and fake-frontend lure UIs distributed through emerging platform mechanics. The distribution-surface diversification is consistent with DaaS affiliate marketplace dynamics: the on-chain extraction primitive (EIP-7702 delegation) remains constant while the distribution surface rotates to exploit whichever platform mechanic currently offers the best visibility-to-cost ratio.

3. **The permanent-recovery posture is confirmed.** EOAs delegated in 2025 that received material inbound deposits in 2026 (from airdrops, staking rewards, protocol distributions, or returned deposits) were swept by the still-active delegator bytecode. There is no on-chain revocation primitive for EIP-7702 delegations — the only recovery path is re-delegation to a benign implementation, which requires the same wallet-UX surface that was originally phished.

4. **The cohort transitioned to protocol-counterparty victims.** The 2026-04 Quant-network incident (~$60K, 1,988 QNT drained from an ETH pool via delegation-abuse on a protocol counterparty's EOA) marks the transition from individual-user-victim to protocol-counterparty-victim phase — an operational escalation consistent with the CrimeEnjoyor cluster's continued refinement of the delegation-abuse surface.

The 2026 continuation confirms that EIP-7702 delegation abuse is not a post-Pectra-window event but a standing extraction surface that persists for the lifetime of the delegation primitive. The addressable surface (450,000+ delegated EOAs) will continue to produce realised extraction as long as delegated EOAs receive inbound deposits and the CrimeEnjoyor infrastructure remains operational.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2025-05-07 | Pectra hard fork activates EIP-7702 set-code transaction type on Ethereum mainnet | T13.004 surface opens |
| 2025-05 to 2025-12 | CrimeEnjoyor cohort extracts ~$12M+ across 15,000+ wallets; 450,000+ wallets delegated to malicious contracts | T13.004 + T4.007 |
| 2025-06-02 | Wintermute publishes CrimeEnjoyor bytecode-signature tagging; GoPlus confirms >90% of delegations malicious | (defender coordination) |
| 2025-Q4 | MetaMask, Trust Wallet, Rabby, Frame ship pre-signing delegation-warning UX | (wallet-vendor mitigation) |
| 2026-01 to 2026-05 | CrimeEnjoyor cluster continues operations; ~$3M+ additional extraction; distribution surface diversifies to additional engagement-weighted platforms | T13.004 + T4.007 (2026 continuation) |
| 2026-04 | Quant-network EIP-7702 delegation-flaw drain (~$60K, 1,988 QNT) — cohort transition to protocol-counterparty victim phase | T13.004 |
| Continuing | ~450,000+ delegated EOAs remain sweepable; future-deposit-trapping optionality persists for lifetime of delegation | T13.004 (standing surface) |

## What defenders observed

- **Pre-2026:** the Wintermute CrimeEnjoyor Dune dashboard, GoPlus delegation-state API, and community detection regex provided the cohort-tracking surface. Wallet-vendor pre-signing warning UX shipped in 2025-Q4. The 2025-12 Yan et al. arXiv paper established the academic measurement baseline.
- **2026 continuation:** the same bytecode-signature cluster remained active; the same Relay Protocol cross-chain consolidation infrastructure processed sweeps; new delegations continued to be registered at a reduced but non-zero rate. The distribution-surface diversification to additional engagement-weighted platforms was observable through affiliate-kit pattern matching across platform-specific phishing campaigns.
- **Protocol-counterparty transition:** the 2026-04 Quant-network incident demonstrated that protocol-owned EOAs with interactive-signing surfaces are also exposed — the delegation-abuse surface is not confined to retail users.

## Public references

- Wintermute CrimeEnjoyor Dune dashboard (ongoing)
- GoPlus Security delegation-state API (ongoing)
- Yan et al. arXiv 2512.12174 (`[eip7702phishingarxiv]`) — academic measurement baseline
- `[cryptotimes7702quant2026]` — Quant-network EIP-7702 delegation-flaw drain coverage
- Cross-reference: `examples/2025-05-eip7702-crimeenjoyor-delegation-phishing-cohort.md` (canonical 2025 T13.004 case)
- Cross-reference: `examples/2024-2025-eip7702-delegation-abuse-research-advisory-cohort.md` (pre-fork advisory and defender coordination)

## Discussion

The 2026 EIP-7702 continuation example anchors the T13.004 × 2026 matrix cell and demonstrates that protocol-level primitives introducing persistent-execution-authority artefacts create permanent attack surfaces. The CrimeEnjoyor cluster's continued operations through 2026 confirm that the delegation-abuse primitive is not bounded by a post-fork window — the blast radius of every EIP-7702 delegation registered since Pectra activation persists indefinitely.

The structural insight for OAK is that **realised-loss aggregation systematically understates the harm of option-shaped artefacts**. The ~$3M in 2026 incremental extraction reflects only the subset of delegated EOAs that received material inbound deposits during the observation window. The addressable surface (450,000+ delegated EOAs) will continue to produce extraction events for as long as delegated EOAs receive inbound deposits and the CrimeEnjoyor infrastructure remains operational. Future T13.004 examples should record both the incremental realised extraction and the standing addressable surface.

The defender posture for 2026 and beyond is permanent-monitoring rather than incident-response: the Wintermute dashboard, GoPlus API, and community detection regex constitute the cohort-tracking surface; wallet-vendor pre-signing warnings constitute the prevention surface; and there is no recovery surface for delegated EOAs beyond re-delegation to a benign implementation (which requires the same wallet-UX surface that was originally phished). The realistic ceiling for defender intervention is exposure-mitigation — segregating high-balance EOAs from interactive-signing surfaces and refusing EIP-7702 set-code transactions from custody wallets.
