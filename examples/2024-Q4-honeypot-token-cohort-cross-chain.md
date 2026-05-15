# Honeypot token cohort — cross-chain — 2024 Q4

**Loss:** **Distributed across hundreds to thousands of individual honeypot token deployments across EVM chains and Solana.** Individual victim losses range from hundreds to tens of thousands of USD-equivalent per token contract. The aggregate loss across all honeypot tokens deployed in Q4 2024 is material but distributed — no single headline-grabbing loss figure anchors the class.
**OAK Techniques observed:** **OAK-T1.004** (Blacklist/Pausable Transfer Weaponization), **OAK-T1.005** (Hidden Fee-on-Transfer), **OAK-T1.006** (Honeypot-by-Design) — the three canonical Token Genesis honeypot variants observed concurrently across chains.
**Attribution:** **pseudonymous** — deployer addresses are on-chain attributable per token contract. Token-deployment patterns and funding-source clustering link multiple honeypot tokens to shared deployer clusters.

**Key teaching point:** Q4 2024 saw a surge in honeypot token deployment activity across multiple chains, driven by the memecoin launch wave on Solana (pump.fun/Raydium) and the continued low-barrier-to-entry token deployment environment on EVM chains. The structural pattern — deployer creates a token with a hidden transfer-restriction or fee mechanism, seeds initial liquidity, promotes the token to attract buyers, then activates the restriction or extracts via the fee — is the canonical T1-class honeypot surface.

## Summary

Honeypot tokens are token contracts that appear to be normal tradable ERC-20/SPL tokens but contain hidden mechanisms that prevent buyers from selling (T1.004/T1.006) or extract disproportionate value from every transfer (T1.005). Q4 2024 saw a concentration of such deployments across Ethereum, BSC, Base, Arbitrum, and Solana, riding the broader memecoin speculation wave.

The three structural variants observed in Q4 2024:

1. **Blacklist/Pausable (T1.004):** The token contract includes a `blacklist` or `pause` function accessible only to the owner/deployer. After sufficient buyer liquidity accumulates, the owner blacklists all non-owner addresses or pauses transfers, preventing sellers from exiting. The token appears tradable at DEX scan tools because the contract function calls are not surfaced at the scanner UI layer.
2. **Hidden Fee-on-Transfer (T1.005):** The token contract applies a transfer fee (e.g., 50–99%) hidden in the `transfer` implementation, not declared in standard ERC-20 metadata. Each sell transaction returns only a fraction of the token value to the seller; the remainder accrues to the fee-recipient address controlled by the deployer. Buyers discover the fee only after attempting to sell.
3. **Honeypot-by-Design (T1.006):** The token contract contains logic that permits buys but reverts on sells for all addresses except those in an owner-controlled allowlist. The contract may use complex conditional logic (block-number gates, balance thresholds, external oracle checks) to make the sell-revert less obvious under static analysis.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-10 | Solana memecoin launch wave creates high-volume token-deployment environment; pump.fun/Raydium surface attracts honeypot deployers | T1.004/T1.005/T1.006 |
| 2024-10/12 | Token-scanner vendors (GoPlus, RugCheck, Token Sniffer) report elevated honeypot detection rates across EVM chains and Solana | (defender observation) |
| 2024-Q4 | Honeypot token deployment clusters linked by funding-source analysis to shared deployer addresses; automated token-scanner services update detection heuristics | T1.004/T1.005/T1.006 (clustered) |

## What defenders observed

- **Token-scanner detection lag.** Honeypot tokens deployed with novel transfer-hook implementations or conditional sell-revert logic sometimes evaded scanner detection for hours to days post-deployment — the detection window during which buyers were exposed.
- **Cross-chain deployer clustering.** Funding-source analysis linked honeypot token deployers across Ethereum, BSC, and Base — the same operator cluster deploying honeypot tokens on multiple chains simultaneously.
- **Rapid deployer rotation.** Honeypot deployers rotated addresses rapidly (often per-token or per-chain) to evade deployer-address watchlisting. Funding sources were more stable — the same CEX withdrawal address funded multiple deployer addresses across chains.

## Public references

- GoPlus Token Security API: honeypot detection heuristics for EVM and Solana tokens.
- RugCheck: Solana-focused token-scanner with honeypot-signature detection.
- Token Sniffer: EVM token-scanner with transfer-restriction and fee-anomaly detection.
- Cross-reference: T1.004, T1.005, T1.006 technique files for per-variant detection signals.
