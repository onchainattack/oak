# OAK-M18 — Out-of-Band Destination Verification

**Class:** operational
**Audience:** custody-customer, custody-vendor

**Maps to Techniques:** OAK-T11.001, OAK-T11.002, OAK-T11.003, OAK-T4.001, OAK-T4.002, OAK-T4.003, OAK-T4.004, OAK-T4.005, OAK-T4.006

## Description

OAK-M18 is the canonical operational defence against destination-substitution attacks at sign time: hardware-wallet display verification of the actual destination address read off the device screen at the moment of signing; multi-channel confirmation (separate device, separate communication path) for high-value transactions; and allowlisted destination registries that constrain the address space against which signing is permitted. The architectural insight is that signing-infrastructure compromise — whether at a third-party vendor (T11.001), via wallet-software distribution channel (T11.002), via in-use multisig modification (T11.003), or via end-user-facing phishing (T4.001 Permit2, T4.002 compromised frontends, T4.004 approve-pattern drainers, T4.005 setApprovalForAll NFT drainers, T4.006 WalletConnect session hijacks) — operates by *changing the transaction the signer believes they are signing*. The signature is valid; the signer's intent is what was attacked. The only defence that survives a compromised signing UI is a verification path the compromised UI does not control.

The Bybit / Safe{Wallet} 2025-02 incident (~$1.46B, the largest crypto-theft event on the public record) is the textbook M18 worked example. Safe{Wallet} (Bybit's third-party multisig signing UI) was compromised earlier in February 2025 via social-engineering of a Safe{Wallet} developer's workstation; malicious JavaScript was planted in the signing UI to alter the destination address of routine cold-to-warm transfers at sign time. The signers approved transfers to the displayed destination; the displayed destination was attacker-controlled; the underlying signed transaction reflected the attacker's destination, not the signers' intent. M18 prescribes that for transactions of this magnitude, the destination address shown on the signing UI is not the load-bearing artefact — the destination address shown on the *hardware-wallet display* (which the compromised UI cannot reach) is. A signer who verifies "send to 0xABC...123" on the hardware-wallet screen against the intended destination from a separate channel (out-of-band confirmation message, allowlisted registry entry) catches the substitution before signing.

M18 also covers the user-side T4 phishing classes. Address poisoning (T4.003) is structurally a destination-verification failure: the victim copy-pastes a lookalike from wallet history rather than verifying the full address against an out-of-band source. Permit2 misuse (T4.001) and approve-pattern drainers (T4.004) are spender-substitution rather than destination-substitution but the mitigation is structurally the same — verify what is being approved, against what spender, on a display the phishing site cannot manipulate. Lessons from the Bybit, Radiant (2024), and DMM Bitcoin (2024) incidents converge on the same operational discipline: hardware-wallet display verification at sign time is the highest-leverage single user-side mitigation in the OAK catalogue.

## How it applies

- **OAK-T11.001 (Third-Party Signing / Custody Vendor Compromise):** require out-of-band verification of high-value destinations at sign time (hardware-wallet display, multi-channel confirmation); air-gap signing for cold-wallet transfers; redundancy across signing-infrastructure vendors.
- **OAK-T11.002 (Wallet-Software Distribution Compromise):** prefer hardware-wallet integrations for high-balance holdings — T11.002 cannot extract from a hardware wallet that requires per-transaction user confirmation provided the hardware wallet's display shows the actual destination.
- **OAK-T11.003 (In-Use Multisig Smart-Contract Manipulation):** out-of-band verification of contract-modification transactions (the modification event itself is high-value and warrants the same scrutiny as treasury outflows); pause operations on modification-event detection pending out-of-band confirmation.
- **OAK-T4.001 (Permit2 Authority Misuse) / T4.004 (Allowance-Approve Drainer) / T4.005 (setApprovalForAll NFT Drainer):** verify the spender address and approval scope on hardware-wallet display before signing; never approve unfamiliar spenders or `uint256.max` allowances without out-of-band confirmation.
- **OAK-T4.002 (Compromised Frontend Permit Solicitation) / T4.006 (WalletConnect Session Hijack):** treat any signing prompt arriving via dApp frontend or WalletConnect session as untrusted-by-default; verify the underlying intent on hardware-wallet display rather than relying on the requesting site's framing.
- **OAK-T4.003 (Address Poisoning):** verify the *full* destination address on hardware-wallet display (not just the first/last six characters) before sending; maintain an address-book of known counterparties and prefer the address-book entry over wallet-history lookup.

## Limitations

- M18 requires the signer to actually look at the hardware-wallet display and verify the destination — the canonical operator-discipline failure mode is "click-through fatigue" where signers approve hardware-wallet prompts without reading them. Bybit's signers reportedly did not catch the destination-swap because the substituted destination was visually plausible; the mitigation degrades against attackers who pre-position a destination-similar address.
- Hardware-wallet display verification is bounded by what the device can render: complex transactions (contract calls with many parameters, EIP-712 typed data) are often summarised on small screens such that the security-relevant field (destination, spender, scope) is not the prominent rendered field. Hardware-wallet vendors are improving "clear signing" support but coverage is uneven.
- Allowlisted destination registries impose operational friction (every new counterparty requires an out-of-band update) and are commonly bypassed for "one-off" transactions which themselves become the highest-risk category.
- Multi-channel confirmation depends on the second channel being out-of-reach of the attacker; if the attacker has compromised both the signing UI and the confirmation channel (e.g., both hosted at the same vendor), the redundancy collapses.
- M18 does not protect against compromised-firmware hardware wallets (a separate failure mode adjacent to T11.002). The mitigation assumes the hardware wallet's display is trustworthy; supply-chain compromise of the hardware-wallet vendor itself is out of scope and requires distinct controls.
- For end users (T4 classes), hardware-wallet adoption is uneven: the highest-leverage mitigation requires hardware the user does not always own and a verification discipline they do not always follow. Wallet-vendor warning UX (Rabby, MetaMask transaction simulation, Pocket Universe) provides partial coverage for software-wallet users but is a weaker substitute.

## Reference implementations

- Hardware wallets with clear-signing support: Ledger, Trezor, GridPlus Lattice1, Keystone — all provide on-device display of destination, contract call data summary, and EIP-712 typed-data fields with varying completeness; defenders integrating new signing flows should test clear-signing coverage for the specific dApp / contract surface.
- Safe (Gnosis Safe) — multisig contracts with on-chain proposal verification; M18 application requires the customer's signers to verify the displayed proposal hash against the hardware-wallet-rendered hash before signing.
- Allowlisted-destination tooling: Fireblocks AML / address-allowlist features, Coinbase Custody allowlist, BitGo allowlist; coverage is vendor-specific and customer-side configuration discipline is the binding constraint.
- Wallet-vendor warning systems: Rabby (transaction simulation + spender warnings), MetaMask transaction simulation, Pocket Universe extension, Coinbase Wallet warning system — partial substitutes for hardware-wallet verification at the software-wallet layer.
- revoke.cash and similar — outstanding-allowance management tooling for T4.001 / T4.004 / T4.005 retroactive cleanup; complementary to but not a substitute for at-sign-time verification.

## Citations

- `[chainalysis2024dprk]` — DPRK / OAK-G01-attributed bridge and custody incidents at scale; covers Bybit and adjacent T11.001 incidents.
- `[crystalwazirx2024]` — WazirX / Liminal 2024 forensic analysis (T11.001 entry vector + T11.003 in-use multisig modification).
- `[wazirxwiki2024]` — Wikipedia summary of the WazirX hack including the multisig-modification mechanism.
- `[ellipticatomic2023]` — Atomic Wallet primary forensic write-up; T11.002 worked example where hardware-wallet integration was the prescribed mitigation for high-balance holdings.
- `[chainalysis2024poisoning]` — Chainalysis $68M WBTC address-poisoning case study + campaign metrics; canonical T4.003 worked example.
- `[tsuchiya2025poisoning]` — USENIX Security 2025 academic cohort characterisation of ~17.3M poisoning transfers.
- `[checkpoint2023drainers]` — Check Point research on drainer service families (T4.004 / T4.005 cluster).
- `[slowmist2024report]` — 2024 ecosystem aggregate; ~$494M in user losses across wallet-drainer activity.
