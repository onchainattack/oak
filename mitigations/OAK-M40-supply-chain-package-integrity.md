# OAK-M40 — Supply-Chain Package Integrity

**Class:** operational
**Audience:** protocol (engineering staff), designer, custody-customer, custody-vendor, wallet
**Maps to Techniques:** OAK-T11.001, OAK-T11.002, OAK-T1.003, OAK-T4.001, OAK-T4.002, OAK-T4.005, OAK-T4.006

## Description

Supply-chain package integrity is the operational discipline of verifying that every third-party software component running in a crypto-firm engineering pipeline, dApp frontend, wallet extension, or custody-vendor codebase is the cryptographically-attested artefact published by the canonical upstream maintainer, and not a tampered or trojaned version. The defensive principle is that supply-chain attacks against npm / PyPI / Cargo / VS Code Marketplace / Chrome Web Store / official-app-store packages bypass entirely the perimeter-and-endpoint controls that protect a crypto firm's own infrastructure; the malicious code arrives via the legitimate dependency-update workflow rather than via phishing-or-intrusion, and runs with the trust accorded to legitimate dependencies.

The canonical anti-pattern cases captured in OAK include: 3CX March 2023 supply-chain compromise (`software/OAK-S11-3cx-trojan.md`), where a trojaned 3CX Desktop App distributed binary affected crypto-industry employees of 3CX customer companies; Ledger Connect Kit December 2023 (`examples/2023-12-ledger-connect-kit.md`), where a former-employee-credential-reuse npm-publish-credential compromise produced a malicious version of `@ledgerhq/connect-kit` affecting many integrating dApps; Bittensor July-August 2024 (`examples/2024-06-uwu-bittensor.md` and `examples/2024-08-bittensor-coldkey-cohort.md`), where a malicious `bittensor` PyPI package version exfiltrated coldkey private keys; BeaverTail and InvisibleFerret 2023-present (`software/OAK-S29-beavertail.md`, `software/OAK-S30-invisibleferret.md`), where DPRK-attributed npm packages target crypto-engineering staff via fake-recruiter and fake-coding-test lures; and the CoinStats June 2024 MetaMask Snap incident (`examples/2024-06-coinstats-snap.md`), where a compromised iOS push-notification infrastructure delivered a trojaned MetaMask Snap to wallet users.

The mitigation has multiple layers operating in composition: (a) **lockfile pinning** (`package-lock.json`, `Pipfile.lock`, `Cargo.lock`, `pnpm-lock.yaml`) so that dependency versions are deterministic across environments and so that unattended version-bumps cannot silently introduce trojaned versions; (b) **signed-package verification and SBOM attestation** (npm provenance, sigstore / cosign attestations for OCI images, in-toto attestations for build-graph integrity); (c) **dependency-staleness monitoring** (Dependabot, Renovate, Snyk, Socket.dev) so that emergency security advisories are surfaced quickly without exposure to the parallel reverse-direction trojaning risk; (d) **publish-credential hardening at the upstream maintainer** (npm 2FA-required-for-publish, PyPI-trusted-publishers, OIDC-based publish workflows that eliminate static-credential reuse); (e) **runtime-integrity verification** of deployed UI artefacts and downloadable installer artefacts against signed reference (3CX-class lessons); (f) **out-of-band-distribution alternatives** (IPFS-pinned dApp frontends, multi-channel-distribution for wallet installers).

## How it applies

- **OAK-T11.002 (Wallet-Software Distribution Compromise).** This is the canonical Technique to which OAK-M40 applies. Lockfile pinning + signed-package verification + publish-credential hardening + runtime-integrity verification of installer artefacts compose to bound the wallet-software-distribution-compromise surface; Atomic Wallet (`examples/2023-06-atomic-wallet.md`), Ledger Connect Kit, and Bittensor are the canonical anchor cases.
- **OAK-T11.001 (Third-Party Signing/Custody-Vendor Compromise).** Custody-vendor and signing-infrastructure-vendor engineering pipelines are themselves package-supply-chain consumers; the BeaverTail / InvisibleFerret npm-package vector against DPRK-targeted crypto-firm engineering staff (Wagemole campaign, OAK-S29 / S30) is a vector that bypasses every other custody-vendor control if package-integrity is not enforced. M40 composes with OAK-M21 anti-phishing training and OAK-M37 HSM/MPC custody.
- **OAK-T1.003 (Compromised Front-End / Renounced-But-Not-Really).** The compromised-front-end class (Curve DNS hijack, Galxe DNS hijack, Ledger Connect Kit, CoinStats Snap) frequently has a supply-chain dimension; the front-end JavaScript that ends up serving a malicious wallet-connect prompt is often a npm-package-distribution compromise rather than a DNS-hijack-only compromise. M40 directly mitigates the former.
- **OAK-T4.x (Access Acquisition class).** When the supply-chain compromise produces a wallet-UX flow that solicits a malicious signature (Permit2, setApprovalForAll, EIP-712), M40 prevents the upstream root cause; OAK-M31 (EIP-712 permit display + signing-risk heuristics) is the downstream sign-time mitigation that catches what M40 fails to prevent.

## Limitations

- **Maintainer-credential compromise is the unsolved root cause.** The canonical anti-pattern cases (Ledger Connect Kit, Bittensor) all involved compromise of the upstream maintainer's publish credentials. M40 prevents downstream silent ingestion but does not prevent upstream compromise; that requires the upstream to deploy publish-credential-hardening (npm 2FA, sigstore, OIDC-based workflows).
- **Lockfile pinning does not solve the typo-squatting class.** A malicious package published under a similar name to a legitimate package will still be ingested if a developer mis-types the dependency name; defenders need supplementary code-review-and-package-name-allowlist controls.
- **SBOM attestation adoption is uneven.** As of v0.1, only a minority of npm and PyPI packages publish provenance attestations; defenders relying on cryptographic-attestation-based detection have incomplete coverage.
- **Runtime-integrity verification of frontend bundles is rare.** Most dApp deployments do not implement subresource-integrity or runtime-bundle-hash verification; the Ledger Connect Kit incident's blast radius could have been bounded by per-integrator subresource-integrity-pinning, but in practice this is not done.
- **Mobile app-store distribution is opaque.** Apple App Store and Google Play distribution do not surface package-level provenance to end users; trojaned-update detection at the end-user level is structurally limited.

## Reference implementations

- **Lockfile and dependency-management.** npm + npm 2FA-for-publish; Yarn / pnpm with strict-peer-dependencies; Pipenv / Poetry with `Pipfile.lock` / `poetry.lock`; Cargo with `Cargo.lock`; Bundler / Composer for non-JavaScript ecosystems.
- **Signed-package verification.** npm provenance (introduced 2023, OIDC-based), sigstore / cosign for OCI images, in-toto attestations for build-graph integrity, PyPI-trusted-publishers (introduced 2023, OIDC-based).
- **Dependency-staleness and security-advisory monitoring.** Dependabot, Renovate, Snyk, Socket.dev, GitHub Advanced Security dependency review.
- **Publish-credential hardening.** npm 2FA-required-for-publish, PyPI 2FA-required-for-uploads-to-projects-with-100k+-downloads, OIDC-based publish workflows that eliminate static-credential reuse (npm publishing from GitHub Actions via OIDC).
- **Runtime-integrity verification.** Subresource Integrity (SRI) for browser-loaded JavaScript, code-signing verification at app-installer launch, sigstore-cosign verification for OCI image deployments.
- **Out-of-band-distribution alternatives.** IPFS-pinned dApp frontends (Uniswap, Aave deploy IPFS-pinned versions for resilience), multi-channel installer distribution, hardware-wallet firmware verification via vendor-published reference hashes.

## Citations

- `[mandiant3cx2023]` — Mandiant 3CX writeup; canonical supply-chain compromise of distributed binary; cross-references OAK-S11.
- `[mandiantucsx2023]` — Mandiant UNC4736 / X_Trader → 3CX cascade analysis; documents the upstream-of-supply-chain dependency surface.
- `[unit42beavertail2023]` — Palo Alto Unit 42 Contagious Interview / BeaverTail writeup; canonical npm-package-supply-chain DPRK-attributed campaign.
- `[ellipticatomic2023]` — Elliptic Atomic Wallet 2023 writeup; relevant for wallet-software-distribution-compromise context.
- `[chainalysis2024dprk]` — Chainalysis 2024 DPRK report; documents the supply-chain-compromise-as-monetisation-substrate aggregate context.
