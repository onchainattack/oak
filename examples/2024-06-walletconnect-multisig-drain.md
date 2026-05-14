# WalletConnect multisig-drain via fake MEV-bot session — EVM/multi-chain — 2024-06

**Loss:** approximately **$480,000** drained from 12 identified multisig wallets and 40+ individual victims over a ~3-week campaign. The attacker ran impersonating Twitter/X accounts and Telegram channels posing as a legitimate MEV-bot / sandwich-bot service that required WalletConnect session establishment for "strategy configuration." Once the session was established, the attacker solicited ERC-20 `approve()` grants and drained assets from both multisig signers and individual yield-farming wallets. Per-victim losses ranged from $3,000 to $120,000.

**OAK Techniques observed:** **OAK-T4.006** (WalletConnect Session Hijack — primary; the victim was induced to establish a WalletConnect session with a fake MEV-bot dApp under the guise of "configuring MEV protection strategy parameters," after which the session was used to solicit malicious approval transactions) + **OAK-T4.004** (Allowance/Approve-Pattern Drainer — chained extraction; once the session was established, the attacker prompted the victim to sign `approve()` transactions granting unlimited spend authority to attacker-controlled addresses, typically paired with fake UI messages claiming the approval was for "bot operation gas optimization").

**Attribution:** **pseudonymous** — the operator used rotating Telegram handles and purchased Twitter/X accounts. The C2 infrastructure (domain `mevshield[.]io` and subdomains) was registered through Njalla. No individual operator has been publicly identified at v0.1. The campaign's drainer-kit fingerprint matched the Inferno Drainer family.

**Key teaching point:** The campaign demonstrates the **T4.006 session-establishment sub-pattern targeting technical users** — rather than impersonating a wallet or DeFi protocol, the attacker impersonated a developer-focused MEV-bot tool, exploiting the target demographic's self-perception as technically sophisticated and therefore less susceptible to phishing. The session-establishment step was framed as a standard developer-integration flow (connect wallet → configure parameters → sign deployment transaction), normalising the WalletConnect pairing as a legitimate software-development interaction rather than a financial transaction.

## Summary

In June 2024, an attacker launched a campaign targeting experienced DeFi users and multisig wallet operators through fake MEV-bot and sandwich-bot services. The attacker created Twitter/X accounts (with purchased follower counts and engagement) and Telegram channels presenting as "MEV Shield" — a purported MEV-protection bot that would "sandwich-attack the sandwich attackers" and return a share of extracted MEV to users.

The technical framing was deliberately developer-oriented: the landing page at `mevshield[.]io` displayed a smart-contract architecture diagram, gas-optimisation benchmarks, and a "strategy configuration panel" that required a WalletConnect session to "link your wallet to the MEV-shield relay network." Users who initiated the WalletConnect session were then prompted to sign a series of transactions presented as "bot configuration approvals" — in reality, unlimited ERC-20 `approve()` grants to attacker-controlled spenders.

The campaign specifically targeted multisig wallet operators — users who managed protocol treasuries, DAO vaults, and LP positions — by advertising in developer Telegram groups, MEV-research Discord servers, and blockchain-infrastructure forums. The attacker exploited the technical demographic's confidence: users who would have recognised a standard "airdrop claim" phishing page as fraudulent accepted the MEV-bot framing as a legitimate software-integration flow.

Once the WalletConnect session was established, the Inferno Drainer backend instructed victims to sign `approve()` transactions, typically with a fake UI overlay claiming "signing bot deployment transaction — this authorises the relay to submit transactions on your behalf for MEV extraction only." The approval grants were unlimited, giving the attacker standing withdrawal authority over the victim's token balances. After approval, the drainer executed `transferFrom` calls to route tokens to consolidation addresses, with proceeds ultimately bridged to Ethereum and routed through Tornado Cash.

The campaign was identified by ScamSniffer in late June 2024 after a multisig signer for a DAO treasury flagged an anomalous approval that had been granted from the DAO's operational wallet. On-chain analysis revealed 12 multisig wallets affected alongside 40+ individual victims, with aggregate losses of approximately $480,000. The C2 domain was suspended, but the operator had already pivoted to new infrastructure by the time of takedown.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-06-01 (approx.) | Fake "MEV Shield" Twitter/X account and Telegram channel launched; operator purchases followers and engagement to establish credibility | T4.006 (distribution surface deployment) |
| 2024-06-05 to 2024-06-25 | Campaign operational; victims establish WalletConnect sessions via `mevshield[.]io`; Inferno Drainer backend solicits unlimited `approve()` transactions | **T4.006 execution → T4.004 extraction** |
| 2024-06-18 | First multisig wallet compromise detected — DAO treasury signer grants unlimited USDC approval to attacker spender | **T4.006 + T4.004 (multisig-class victim)** |
| 2024-06-22 | On-chain investigator (ScamSniffer) flags the Inferno Drainer fingerprint; Twitter/X account suspended; domain flagged | (defender-side detection) |
| 2024-06-25 | C2 domain `mevshield[.]io` suspended by Njalla; operator infrastructure pivoted; estimated $480,000 aggregate loss | (takedown — partial disruption) |
| 2024-06 onward | Victims with unrevoked approvals remain exposed; DAO treasury implements emergency revocation via remaining signers | (standing-approval surface) |

## Realised extraction

Approximately $480,000 in aggregate across USDC, USDT, WETH, and various ERC-20 tokens. Twelve multisig wallets were affected, with the largest single-compromise being a DAO treasury wallet that lost approximately $120,000 in USDC. The Inferno Drainer backend forwarded extracted tokens through a series of consolidation addresses, with final proceeds bridged to Ethereum and routed through Tornado Cash.

## Public references

- Cross-reference: T4.006 at `techniques/T4.006-walletconnect-session-hijack.md`.
- Cross-reference: T4.004 at `techniques/T4.004-allowance-approve-pattern-drainer.md`.
- Cross-reference: `examples/2024-09-walletconnect-google-play-drainer.md` — canonical mobile-app-distribution sub-pattern for T4.006.
- Cross-reference: `examples/2023-2025-walletconnect-phishing-campaigns-cohort.md` — browser-and-social-media entry vector cohort.
- `[scamsniffermevbot2024]` — ScamSniffer, "Fake MEV-Bot Services Exploit WalletConnect Sessions to Drain Multisig Wallets" (June 2024).
- `[slowmistmevbot2024]` — SlowMist, "MEV-Bot Impersonation Phishing Campaign — WalletConnect Session Hijack Analysis" (2024-07).

## Public References

See citations in corresponding technique file.
