# GMX-brand-impersonation Telegram copy-trading bot soft rug — Arbitrum — 2024-07 to 2024-09

**Loss:** approximately **$180,000** in user-deposited funds across approximately 350 depositors. The Telegram-distributed "GMX Algo Trader" bot branded itself as a GMX-integrated algorithmic copy-trading service and accumulated user deposits in a custodial wallet controlled by the bot operator. The operator exited in September 2024, citing an unverifiable "smart-contract exploit" in the bot's trade-execution module before deleting all communication channels.

**OAK Techniques observed:** **OAK-T5.007** (Third-party Brand-impersonation Custodial Soft-rug — primary; the bot branded itself with GMX's name and logo, implying an integration or affiliation that did not exist; users deposited USDC into a bot-controlled wallet on the assumption of GMX association) + **OAK-T6.001** (Source-Verification Mismatch — boundary; the bot's marketing claimed "smart-contract-audited strategies" and "GMX-verified integration," but no audit report existed and GMX had no third-party-bot verification programme).

**Attribution:** **pseudonymous** — the bot's Telegram channel was operated under the handle "GMXAlgoTrader" and associated X/Twitter account "@gmxalgobot." After the exit, the Telegram channel and X account were deleted. No individual operator has been publicly identified at v0.1. The on-chain outflow was a single coordinated transfer to a consolidation address, consistent with operator exit rather than external compromise.

**Key teaching point:** GMX Algo Trader is the canonical illustration of T5.007's **trader-tooling-ecosystem sub-pattern**: a DeFi protocol with a large, active, retail-trader user base (GMX on Arbitrum) becomes the brand target for off-platform custodial services that exploit the protocol's brand-trust to accumulate deposits. The structural parallel to the Polymarket Polycule case (2026-01) demonstrates that T5.007 is a cross-protocol class — any protocol whose trader-tooling ecosystem involves off-platform custodial flows is exposed.

## Summary

GMX is a leading decentralised perpetuals and spot exchange on Arbitrum and Avalanche with a large retail-trader user base. A third-party ecosystem of trading bots, analytics dashboards, and copy-trading services had grown around GMX through 2023-2024. In July 2024, a Telegram bot named "GMX Algo Trader" launched, branding itself as a GMX-integrated algorithmic copy-trading service.

The bot's marketing claimed it used "GMX-verified smart-contract integration" to mirror trades from a proprietary algorithm across user accounts. Users were instructed to deposit USDC into a bot-controlled wallets on Arbitrum; the bot would then execute GMX trades on their behalf and distribute profits via the Telegram interface. The bot shared a leaderboard of purported trading results, displayed real-time "profit" notifications in the Telegram channel, and used GMX's logo and branding throughout the interface.

In reality, the bot had no GMX integration. The USDC deposits accumulated in a single EOA wallet controlled by the operator. The trading results were fabricated — the operator posted screenshots of simulated or third-party trades. The "algorithm" did not execute any on-chain transactions on GMX's contracts. The entire operation was a custodial-deposit collection vehicle branded with GMX's name and logo to exploit the protocol's brand-trust.

In late September 2024, the operator posted a final Telegram announcement stating that the bot's "trade-execution smart contract" had been "exploited by an external attacker" and that all user funds were lost. The announcement provided no transaction hashes, no audit trail, and no attacker-address attribution. Within hours, the Telegram channel, X/Twitter account, and associated website were deleted. The on-chain outflow showed a single coordinated transfer from the bot's custodial wallet to a consolidation address, followed by routing through a cross-chain bridge to Ethereum — a pattern consistent with operator exit rather than external-attacker exfiltration.

GMX's team clarified publicly that the bot was unaffiliated and that GMX had no third-party-bot verification programme at the time. The incident prompted community discussion about the need for GMX to publish an authoritative registry of authorised third-party services — the canonical T5.007 mitigation (platform-side authoritative-third-party-service registry).

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-07 | "GMX Algo Trader" Telegram bot launches; brands itself as GMX-integrated algorithmic copy-trading service; begins accumulating USDC deposits | T5.007 (brand-impersonation deployment) |
| 2024-07 to 2024-09 | Bot operates publicly; posts fabricated trading-results leaderboard; accumulates ~$180,000 from ~350 depositors; GMX community members begin questioning bot's legitimacy on Discord | T5.007 (deposit-accumulation window) |
| 2024-09-22 | Operator posts final Telegram announcement citing unverifiable "smart-contract exploit"; deletes Telegram channel, X account, and website within hours | **T5.007 execution (exit-as-hack primitive)** |
| 2024-09-22 to 2024-09-23 | On-chain outflow: single coordinated transfer from custodial wallet to consolidation address; funds bridged Arbitrum → Ethereum | T5.007 outflow (coordinated single-transfer pattern) |
| 2024-09-24 | GMX team publicly clarifies no affiliation with bot; community discussion of third-party-service registry proposal | (platform-side response) |

## Realised extraction

Approximately $180,000 in user-deposited USDC across approximately 350 depositors. The median deposit was approximately $300; the largest single depositor contributed approximately $15,000. Funds were transferred in a single coordinated outflow from the operator-controlled wallet and bridged to Ethereum. No funds were recovered; no operator identity was established.

## Public references

- Cross-reference: T5.007 at `techniques/T5.007-third-party-brand-impersonation-custodial-soft-rug.md`.
- Cross-reference: `examples/2026-01-polymarket-polycule-bot.md` — canonical T5.007 anchor (Polymarket-branded bot exit).
- Cross-reference: `examples/2025-01-hyperliquid-dex-brand-impersonation-custodial-soft-rug-cohort.md` — Hyperliquid DEX brand-impersonation cohort.
- `[gmxcommunity2024]` — GMX Discord and community forum discussions (2024-09) — primary source for the no-affiliation clarification.
- `[defisafetygmxbot2024]` — DeFi Safety community advisory, "GMX-Branded Telegram Bot Exit Scam — September 2024" (2024-10).

## Public References

See citations in corresponding technique file.
