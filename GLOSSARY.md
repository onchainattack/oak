# OAK Glossary

Defender-perspective definitions of recurring terms across OAK content. This file is intended to bring a newcomer up to speed on the vocabulary used in `tactics/`, `techniques/`, `actors/`, `examples/`, and `data-sources/` without forcing them to read the relevant pages first. Definitions here are **operational**, not exhaustive — they cover what the term means *for OAK's purposes*, not the full taxonomic / academic definition.

For terms that have a dedicated Technique or Data Source page, the entry here is short and points to the canonical page.

---

**Address poisoning** — a class of attacks (OAK-T4.003) in which an attacker plants a transaction in a victim's wallet history involving a lookalike address (visually similar to one of the victim's known counterparties), aiming to induce a future copy-paste error. See `techniques/T4.003-address-poisoning.md`.

**Approval / Allowance** — the on-chain authority artefact for ERC-20 token transfers by a third party. A holder calls `approve(spender, value)` to grant `spender` the right to transfer up to `value` of the holder's tokens via `transferFrom`. The approve-pattern drainer (OAK-T4.004) abuses this with `value = uint256.max`. See `data-sources/OAK-DS-03-erc20-approvals.md`.

**ApprovalForAll** — the on-chain authority artefact for ERC-721 / ERC-1155 transfers by a third party. A holder calls `setApprovalForAll(operator, true)` to grant `operator` total transfer authority over the holder's NFTs of that collection. Abused by OAK-T4.005. See `data-sources/OAK-DS-03-erc20-approvals.md`.

**Atomic launch** — a token launch where deployment, liquidity provision, and buy-side acquisition all occur in the same block (or even the same transaction). Used by sniper bots (legitimate) and bundlers (often abusive — see OAK-T3.001).

**Bridge / cross-chain bridge** — a protocol that moves value between blockchains. Bridge-specific attack classes are catalogued under OAK-T10.

**Bundler bot** — software that pairs a token launch with multiple buy transactions across operator-controlled wallets in the same block. Legitimate use exists (market-making) but bundlers are often used to execute OAK-T3.001 sybil-bundled launches.

**CEX / Centralized Exchange** — a custodial cryptocurrency exchange (Binance, Coinbase, Kraken, etc.). The off-ramp surface for laundering operations described in OAK-T7.002.

**Chain-hop / cross-chain laundering** — routing proceeds across multiple blockchains via bridges and swap protocols to break the single-chain forensic trail. See OAK-T7.003.

**Counterfeit token** — an ERC-20 contract that emits `Transfer` events naming a victim's address as sender / receiver without an actual authorised transfer. Used as a sub-pattern of OAK-T4.003 to plant fake history when zero-value direct transfers do not propagate to the wallet UI.

**Deployer cluster** — the set of addresses controlled by a token's deployer, identified via funder-graph analysis on the deployment transaction's funding history. See `data-sources/OAK-DS-09-funder-graph.md`.

**Drainer / wallet drainer / drainer-as-a-service** — a class of phishing service operators (OAK-G02) that supply affiliates with ready-made wallet-draining infrastructure (cloned UIs, signature-phishing flows, laundering-route packaging). See `actors/OAK-G02-drainer-services.md`.

**EIP-2612 Permit** — an Ethereum standard allowing token holders to authorise transfers via off-chain EIP-712 signed payloads rather than on-chain `approve` transactions. See `data-sources/OAK-DS-04-permit-signatures.md`.

**Flash loan** — a loan that is borrowed and repaid within a single transaction. Enabling precondition for OAK-T9.002 and frequently chained with OAK-T9.001 and T9.003.

**Funder graph** — derived data structure tracking per-address upstream funding sources. The core attribution surface for OAK-T3.001, T8.001, and Threat Actors (`actors/`). See `data-sources/OAK-DS-09-funder-graph.md`.

**Guardian / VAA (Validator Action Approval)** — Wormhole-bridge-specific terminology for the cross-chain authority validators and the signed payloads they produce. The Wormhole-specific term for a more general bridge-validator-message pattern; see `data-sources/OAK-DS-08-bridge-validator-messages.md`.

**Hard rug / hard LP drain** — a single-event removal of substantial pool liquidity by the LP-controlling party (OAK-T5.001). Distinguished from slow rug / OAK-T5.002.

**Honeypot (token-level)** — colloquial umbrella term for tokens whose transfer logic prevents holders from selling (or sells at attacker-favourable rates). OAK splits "honeypot" by mechanic across several Techniques because detection signals differ:

- OAK-T1.001 **Modifiable Tax Function** — settable sell-tax can be raised to 99% by deployer (the canonical "honeypot tax" pattern).
- OAK-T1.002 **Token-2022 Permanent Delegate Authority** — Solana SPL Token-2022 burn-on-buy / drain-on-sell via the permanent-delegate extension.
- OAK-T1.004 **Blacklist / Pausable Transfer Weaponization** — admin-controlled blacklist or pausable predicate gates transfers per-address.
- OAK-T1.005 **Hidden Fee-on-Transfer** — asymmetric fee branching (low buy fee, high sell fee), the "honeypot-lite" pattern.
- Adjacent: OAK-T9.005 **Reentrancy** sub-cases where the contract reverts on sell.

Detection tools (Token Sniffer, GoPlus, Honeypot.is, RugCheck) typically test all variants together via simulation; OAK distinguishes them by mechanic so detector-side coverage and per-pattern indicators can be specified precisely.

**Inferno Drainer / Angel Drainer / Pink Drainer** — named drainer-as-a-service operators (OAK-G02). See `actors/OAK-G02-drainer-services.md`.

**Lazarus Group / DPRK-attributed** — North Korean state-aligned cyber-theft operator profile (OAK-G01). The largest single attribution category in modern crypto theft. See `actors/OAK-G01-lazarus.md`.

**Liquidity pool / LP / LP token** — a DEX-side pair of tokens facilitating swaps. The LP token represents proportional ownership of the pool's reserves; "locked liquidity" claims (OAK-T2.002) refer to LP-token escrow arrangements.

**Mixer / privacy service** — a protocol designed to break the on-chain linkage between deposit and withdrawal addresses (e.g., Tornado Cash). See OAK-T7.001.

**Mob attack** — the multi-actor copy-paste exploitation pattern observed when a templable verification flaw is discovered (Nomad bridge canonical case; see OAK-T10.002).

**MPC (Multi-Party Computation)** — a cryptographic scheme distributing private-key shares across multiple parties so that no single party holds the full key. Used by some cross-chain bridges (Multichain canonical case for MPC-key loss; see OAK-T10.001).

**Multisig** — a wallet or contract that requires N-of-M signatures from a designated key set to authorise transactions. Bridge validator sets (e.g., Ronin's 5-of-9, Harmony Horizon's 2-of-5) are operational multisigs.

**Oracle (price oracle)** — a protocol that reports the price of an asset to other on-chain protocols. Manipulated in OAK-T9.001. See `data-sources/OAK-DS-05-oracle-price-feeds.md`.

**Permit2** — Uniswap's universal token-approval protocol; allows signature-based approval flows similar to EIP-2612 but extended to all tokens. The dominant signature-based authority surface for OAK-T4.001.

**Reference implementation** — in OAK, a tool / detector / dataset that implements detection of one or more OAK Techniques and is publicly documented. The `Reference implementations` section of each Technique page lists known coverage. `mg-detectors-rs` is the first reference implementation; the `COVERAGE.md` matrix tracks coverage status per Technique.

**Rug pull / rug** — colloquial umbrella term for operator-driven exit-scam incidents. OAK splits "rug" by mechanic because mitigations differ:

- OAK-T5.001 **Hard LP Drain** — single-event removal of pool liquidity (the canonical "hard rug").
- OAK-T5.002 **Slow LP Trickle Removal** — gradual withdrawal designed to defeat threshold detectors ("soft rug" / "fragmented rug pull").
- OAK-T5.003 **Hidden Mint Dilution** — operator mints new supply post-launch to dump on holders.
- OAK-T5.005 **Treasury-Management Exit** — substantive misuse of legitimate team-multisig authority (SafeMoon canonical).
- OAK-T2.002 **Locked-Liquidity Spoof** — frequently chained: marketing claims locked LP that is in reality drainable.
- OAK-T1.x Honeypot variants chain into rug outcomes when sells are blocked rather than drained.

**Sandwich / sandwich-MEV** — the three-transaction front-run + victim + back-run pattern catalogued under OAK-T5.004.

**Signature-relay forgery** — bridge-specific T10 sub-pattern where a signed cross-chain message is constructed without the legitimate validator set's authorisation. Wormhole canonical case; bridges-T10 placeholder for v0.x sub-Technique splits.

**Slow rug / fragmented rug** — gradual liquidity withdrawal designed to defeat threshold-based detectors (OAK-T5.002). The fragmented-rug-pull (FRP) cohort `[frp2025]` is the canonical academic reference.

**Sniper bot** — software that detects new token launches and executes buy transactions immediately, typically within the first block(s). Distinct from bundler bots (legitimate-vs-abusive distinction is fuzzy in practice).

**Source-verification mismatch** — deployed bytecode that differs from the source claimed at the block explorer. A canonical OAK-T6 (Defense Evasion) pattern; covered by OAK-T6.001.

**Sybil-bundled launch** — a launch in which multiple operator-funded wallets atomically acquire token supply at deployment time, manufacturing the appearance of broad early demand. See OAK-T3.001.

**THORChain** — a decentralised cross-chain swap protocol; the dominant Lazarus Group laundering rail post-Tornado-Cash sanctions. See OAK-T7.003 and `examples/2025-02-bybit-thorchain-laundering.md`.

**Tornado Cash** — a privacy-protocol mixer on Ethereum; sanctioned by U.S. Treasury OFAC in August 2022 (`[ofac2022tornado]`); partially delisted in 2025. Heavily-used historical Lazarus laundering rail; see OAK-T7.001.

**TWAP (Time-Weighted Average Price)** — an oracle-resilience mechanism that averages prices over a window rather than reporting a spot price. The canonical OAK-T9.001 mitigation.

**Wash trade** — a trade between related counterparties that does not represent net beneficial-ownership change. Catalogued under OAK-T3.002 (price-discovery-targeting wash) and OAK-T7.004 (laundering wash); the same on-chain pattern serves two distinct operator goals.

---

## Format conventions for OAK content

- "OAK-Tn" identifies a Tactic (`OAK-T1` through `OAK-T10`).
- "OAK-Tn.NNN" identifies a Technique within a Tactic (`OAK-T4.003`).
- "OAK-Gnn" identifies a Threat Actor / Group (`OAK-G01`).
- "OAK-DS-NN" identifies a Data Source (`OAK-DS-09`).
- Citation keys appear in backticks with brackets: `\`[chainalysis2024dprk]\``.
- Technique pages cross-reference Data Sources via the planned `Data Sources:` header (rolling out across v0.x updates).
