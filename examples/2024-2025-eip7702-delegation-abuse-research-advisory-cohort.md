# EIP-7702 delegation abuse research and advisory cohort — Ethereum / multi-chain — 2024–2025 (pre-deployment and post-deployment advisory class)

**Loss:** structural — the class is documented at the pre-fork advisory, post-fork research, and audit-finding layer. The realised dollar-loss from EIP-7702 delegation abuse is captured in the CrimeEnjoyor cohort example (`examples/2025-05-eip7702-crimeenjoyor-delegation-phishing-cohort.md`, ~$12M+ across 15,000+ wallets) and the Inferno Drainer pivot case. This example documents the broader research and advisory context — the security-community warnings, academic measurements, and ecosystem response — that frames the T13.004 class beyond the specific CrimeEnjoyor cluster.

**OAK Techniques observed:** **OAK-T13.004** (EIP-7702 Delegation Abuse) — primary; the class covers the persistent-execution-authority delegation primitive and its four sub-patterns: (a) malicious-delegator phishing (CrimeEnjoyor cluster), (b) batch-transaction signing-prompt abuse (Inferno Drainer pivot), (c) chain-agnostic-replay amplification, and (d) future-deposit-trapping optionality. **OAK-T4.001** (Permit2 Authority Misuse) — structurally adjacent; the closest existing-Technique analogue for the signed-authority-artefact phishing pattern.

**Attribution:** **unattributed** The research and advisory responses to EIP-7702 delegation abuse span multiple independent security researchers, audit firms, wallet vendors, and academic groups. No single threat-actor attribution is applicable to the advisory class.

**Key teaching point:** **The EIP-7702 delegation abuse class is distinguished from prior EVM signed-authority phishing classes by the convergence of pre-fork warning literature, post-fork empirical measurement, and coordinated wallet-vendor response within a compressed timeline (~7 months from pre-fork advisory to wallet-UX warning deployment) — a defender-coordination shape that materially outperforms the multi-year response lag on T4.001 Permit2 phishing.** The structural difference is the existence of substantial pre-fork security advisories (Cyfrin, ThreeSigma, OpenZeppelin) that primed the wallet-vendor ecosystem for coordination before mass adoption, demonstrating that high-blast-radius protocol primitives can achieve faster defender-coordination timelines when pre-launch warning literature is produced and consumed.

## Summary

EIP-7702 (set-code transaction type) was introduced as part of Ethereum's Pectra hard fork, which activated on mainnet on 2025-05-07. The EIP permits a vanilla EOA to sign a single authorisation tuple that registers a delegator contract address whose bytecode is treated as the EOA's own code for purposes of execution — effectively converting the EOA's static-code execution model into a smart-account-equivalent dynamic-code execution model under a single signed authorisation.

The security-community response to EIP-7702 unfolded in three phases:

**Phase 1 — Pre-fork warnings (2024-Q4 to 2025-Q1).** As the Pectra specification stabilised, security researchers at Cyfrin, ThreeSigma, and OpenZeppelin published pre-fork advisories flagging the delegation primitive's structural risk profile. The central warning: EIP-7702 delegation removes all four bounds that constrained prior EVM signed-authority artefacts (Permit2, ERC-20 approvals, NFT setApprovalForAll) — the delegator's bytecode is unbounded in scope (arbitrary logic), unbounded in time (persistent until re-delegated), unbounded in target (any future counterparty), and unbounded in asset class (any token, NFT, or contract interaction). The advisory literature explicitly identified phishing-as-a-service (drainer) operators as the most likely first adopters, predicting the CrimeEnjoyor-class delegation-phishing pattern before it materialised on-chain.

**Phase 2 — Post-fork empirical measurement (2025-Q2 to 2025-Q4).** Within weeks of Pectra activation, the pre-fork warnings were validated by on-chain data. Wintermute's research (published 2025-06-02) tagged the CrimeEnjoyor cluster as the dominant malicious-delegator family, reporting >80% of observed EIP-7702 delegations were malicious. GoPlus Security reported >90% of delegations were linked to malicious contracts. The arXiv paper "EIP-7702 Phishing Attack" (Yan et al., 2025-12) provided the first academic empirical measurement: 150,000+ authorisation and execution events, 26,000+ delegated addresses, and a canonical taxonomy of three trigger pathways (user-driven, attacker-driven, protocol-triggered).

**Phase 3 — Wallet-vendor and ecosystem response (2025-Q2 onward).** MetaMask, Trust Wallet, Rabby, and Frame shipped pre-signing delegation-warning UX as a structurally distinct prompt class separate from generic transaction-approval prompts. Wintermute published a public Dune dashboard for ongoing CrimeEnjoyor cohort tracking. GoPlus launched a delegation-state API. The DEV-community published an on-chain detection regex matching the CrimeEnjoyor bytecode template. The defender-response timeline — less than seven months from the first substantive pre-fork advisory to wallet-UX deployment — is materially faster than the multi-year response lag on T4.001 Permit2 phishing, where the Inferno Drainer cohort matured for two-plus years before vendor-side wallet warnings shipped at scale.

The advisory class is included as a standalone T13.004 example because the research and advisory response is a load-bearing component of the technique's defender story. The CrimeEnjoyor cohort example documents the on-chain extraction. This example documents the security-community response that made the extraction class visible, measurable, and actionable for defenders — the pre-fork warnings, the post-fork measurement, and the coordinated wallet-UX response.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-Q4 | EIP-7702 specification stabilises through Pectra-fork client implementations; Cyfrin publishes initial pre-fork security analysis flagging the delegation primitive's structural risk profile | **T13.004 pre-fork advisory phase** |
| 2025-Q1 | ThreeSigma and OpenZeppelin publish complementary pre-fork advisories; wallet vendors (MetaMask, Trust Wallet, Rabby, Frame) begin internal review of EIP-7702 signing-prompt UX | **T13.004 pre-fork advisory phase** |
| 2025-05-07 | Pectra hard fork activates on Ethereum mainnet; EIP-7702 set-code transaction type becomes available | (primitive deployment) |
| 2025-05 (within first weeks) | First malicious delegations observed on-chain; Wintermute begins telemetry tracking | **T13.004 cohort onset** |
| 2025-05-24 | Inferno Drainer drains ~$146K from a MetaMask-delegated EOA via fake DeFi-frontend phishing; SlowMist publishes forensic disclosure | **T13.004 first named-cluster extraction** |
| 2025-06-02 | Wintermute publishes CrimeEnjoyor research note; >80% of delegations malicious; public Dune dashboard launched | (cohort transparency anchor) |
| 2025-Q2–Q3 | GoPlus Security delegation-state API launched; Hacken, Cyfrin, ThreeSigma publish defender-oriented analyses | (research and advisory phase) |
| 2025-Q3 | DEV-community publishes on-chain CrimeEnjoyor bytecode detection regex | (community detection tooling) |
| 2025-Q4 onward | MetaMask, Trust Wallet, Rabby, Frame ship pre-signing EIP-7702 delegation-warning UX as a structurally distinct prompt class | (wallet-UX response — ~7 months from pre-fork advisory) |
| 2025-12 | Yan et al. publish "EIP-7702 Phishing Attack" arXiv paper — first academic empirical measurement; 150,000+ authorisation events, 26,000+ delegated addresses | (academic measurement anchor) |
| 2026-04 | Quant-network EIP-7702 delegation-flaw incident drains 1,988 QNT (~$60K) from a contract counterparty's EOA — cohort transitions to protocol-counterparty-victim phase | **T13.004 class evolution** |

## Realised extraction

$0 attributable to the advisory class specifically. The realised extraction from EIP-7702 delegation abuse is documented in the CrimeEnjoyor cohort example (~$12M+, 15,000+ wallets).

## Public references

- Cyfrin pre-Pectra EIP-7702 security analysis (2024-Q4) — initial pre-fork advisory on the delegation primitive's risk profile.
- ThreeSigma "Inside Wallet Drainers and EIP-7702 Exploits" — pre-fork and post-fork defender analysis.
- OpenZeppelin account-abstraction security review — EIP-7702 surface characterisation.
- `[wintermute7702crimeenjoyor2025]` — Wintermute CrimeEnjoyor research note (2025-06-02).
- `[goplus7702malicious2025]` — GoPlus Security delegation-state telemetry.
- `[eip7702phishingarxiv]` — Yan et al. arXiv 2512.12174 (2025-12) — first academic empirical measurement.
- `[devohmygodcrimeenjoyor2025]` — DEV-community detection regex and 450,000+ delegated-wallets cohort framing.
- Cross-reference: T13.004 at `techniques/T13.004-eip7702-delegation-abuse.md`.
- Cross-reference: [`examples/2025-05-eip7702-crimeenjoyor-delegation-phishing-cohort.md`](2025-05-eip7702-crimeenjoyor-delegation-phishing-cohort.md) — CrimeEnjoyor delegation-phishing cohort (~$12M+, 2025-05 onward).
- Cross-reference: [`examples/2023-2025-walletconnect-phishing-campaigns-cohort.md`](2023-2025-walletconnect-phishing-campaigns-cohort.md) — WalletConnect session-hijack to EIP-7702 delegation phishing.

## Discussion

The EIP-7702 delegation abuse research and advisory class is the companion framing to the CrimeEnjoyor cohort example — the former documents the security-community response, the latter documents the on-chain extraction. Together, they establish T13.004 as a structurally characterised technique with both an empirical extraction anchor and a defender-response timeline.

Three structural observations:

- **Pre-fork advisory literature is the load-bearing pre-deployment T13.004 mitigation.** The Cyfrin / ThreeSigma / OpenZeppelin pre-Pectra advisories correctly predicted the delegation-phishing pattern before it materialised on-chain. The prediction accuracy — phishing-as-a-service operators as first adopters, batch-transaction signing-prompt abuse, chain-agnostic replay amplification — demonstrates that pre-fork security analysis of protocol-level primitives can identify the likely attack surface before exploitation begins. Future high-blast-radius protocol primitives should default to pre-fork advisory publication as the defender-preparation baseline.

- **The defender-response timeline (~7 months) demonstrates that pre-fork coordination compresses post-fork response time.** The EIP-7702 response timeline — from the first substantive pre-fork advisory (Cyfrin, 2024-Q4) to wallet-UX deployment (MetaMask, 2025-Q4) — is ~7 months, compared with the ~2+ year response lag on T4.001 Permit2 phishing. The structural difference is the pre-fork warning literature that primed wallet-vendor coordination from before mass adoption. The defender lesson: treat the pre-fork advisory window as the primary opportunity to coordinate wallet-UX, detection-tooling, and cohort-monitoring infrastructure; post-fork response is a catch-up exercise.

- **Academic empirical measurement is a first-class T13.004 detection instrument.** The Yan et al. arXiv paper (2025-12) provides the first academic taxonomy of EIP-7702 delegation abuse trigger pathways and the first empirical measurement of the cohort's scale (150,000+ authorisation events, 26,000+ delegated addresses). The academic measurement layer — independent, reproducible, peer-reviewed — provides a defender-side signal that commercial forensic-provider telemetry (Wintermute, GoPlus) does not: a methodological baseline that other researchers can replicate and extend. Defender practice for future protocol-level primitives should include academic empirical measurement as a standard component of the post-deployment detection surface.
