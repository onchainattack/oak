# EchoProtocol eBTC Bridge Signature-Verification Bypass and Unbounded Mint — Monad — 2026-05-19

**OAK Techniques observed:** OAK-T10.002 (Message Verification Bypass — primary: the bridge's committee multisig threshold validation accepted forged or replayed signatures as legitimate, triggering `grantRole(DEFAULT_ADMIN_ROLE)` on the eBTC token contract. The Hacken audit report previously documented the bridge's reliance on M-of-N validator signatures; the attacker bypassed this validation to forge a cross-chain message that the contract treated as authentic), OAK-T9.004 (Access Control Misconfiguration — dual failure: no mint cap (`totalSupply + amount <= MAX_SUPPLY`) and no rate limit on the eBTC bridge contract, converting a single forged message into an unbounded 1,000 eBTC mint), OAK-T7.003 (Cross-Chain Bridge Laundering — WBTC bridged from Monad to Ethereum via Relay/LiFi), OAK-T7.001 (Mixer Routed Hop — 384 ETH sent to Tornado Cash)

**Attribution:** **pseudonymous** — attacker address `0x6A0109...3415` identified on-chain; no attribution to a named group at time of writing.

**Loss:** **notional ~\$76.64M** (1,000 eBTC minted at prevailing BTC price of ~\$76,640/BTC); **realised ~\$867.7K** (11.29 WBTC borrowed against deposited unbacked eBTC via Curvance's eBTC lending market, bridged to Ethereum, swapped for ~384 ETH, routed into Tornado Cash). The notional-to-realised ratio (~88:1) reflects Curvance's collateral factor and WBTC market liquidity constraints — the attacker could only extract what the lending market would advance against the unbacked collateral. No recovery announced.

**Key teaching point:** EchoProtocol is the **14th bridge attack in May 2026** and the canonical 2026 **signature-validation-bypass → unbounded-mint** chain on a non-EVM L1. Three structural failures chained: (1) the bridge's committee multisig threshold validation did not strictly verify *whether the signer is a current committee member* and *whether the signed content exactly matches the message hash* — the same signature-verification gap that enabled Wormhole 2022; (2) the mint function had no cap — no `require(totalSupply() + amount <= MAX_SUPPLY)`, no per-transaction limit, no per-address ceiling; (3) the bridge had no rate limiting on the outflow channel. Monad CEO Keone Hon publicly cited the April 2026 KelpDao rsETH incident as a reference point: with rate limits in place, the ~$200M in losses could have been significantly reduced. The incident anchors the T10.002 + T9.004 intersection on Monad, extending OAK's non-EVM bridge coverage beyond the Polkadot/Hyperbridge and Ethereum/LayerZero cases.

## Summary

EchoProtocol is a cross-chain BTC bridge operating on Monad, issuing eBTC (bridged BTC) under a "lock-and-mint" model — users lock real BTC on Bitcoin, a committee of validators signs a cross-chain message attesting to the lock event, and the bridge contract on Monad mints equivalent eBTC. The security guarantee rests entirely on the cross-chain message verification: the bridge contract must confirm that the mint instruction is endorsed by signatures from a sufficient number of current committee members.

On May 19, 2026, an attacker exploited a vulnerability in the bridge's signature-validation logic to forge a cross-chain message that the contract accepted as legitimate. The forged message executed `grantRole(DEFAULT_ADMIN_ROLE, attacker)` on the eBTC token contract on Monad. From there, the attacker followed a seven-step chain:

1. **Forge cross-chain message** — submit a crafted message with signatures that pass the committee threshold check without satisfying the *current committee member* or *message-hash* binding requirements.
2. **Capture DEFAULT_ADMIN_ROLE** — the bridge executed `grantRole(DEFAULT_ADMIN_ROLE, 0x6A0109...3415)` on the eBTC contract.
3. **Remove original admin** — `revokeRole(DEFAULT_ADMIN_ROLE, 0xA338...9A3B)`, locking the legitimate team out.
4. **Escalate to MINTER_ROLE** — `grantRole(MINTER_ROLE, self)`.
5. **Unbounded mint** — `mint(attacker, 1,000 eBTC)`, creating ~$76.64M notional with zero BTC backing.
6. **Monetize via Curvance** — deposit 45 eBTC (~$3.45M notional) as collateral → borrow 11.29 WBTC (~$867.7K) against it.
7. **Exit** — bridge WBTC to Ethereum via Relay/LiFi → swap for ETH → route 384 ETH (~$821.7K) into Tornado Cash.

The attack executed end-to-end in a handful of transactions within a single day.

## Why this is structurally significant

The EchoProtocol case extends OAK's cross-chain-message-forgery class to Monad — the third distinct L1 ecosystem to produce a high-impact bridge-message-forgery incident in Q2 2026, following KelpDao (Ethereum/LayerZero, April 18) and Hyperbridge (Polkadot, April 13). The class is now unambiguously cross-chain, not EVM-specific.

Two structural features distinguish the EchoProtocol case:

1. **Committee-signature-validation bypass, not infrastructure compromise.** KelpDao was a LayerZero infrastructure compromise (the messaging provider was breached); Hyperbridge was an MMR-proof-reuse flaw (an outdated valid proof accepted for a different message). EchoProtocol is the **signature-validation** variant: the attacker manipulated or replayed validator signatures to bypass the M-of-N threshold, targeting the committee-verification logic itself. This is the Wormhole 2022 pattern recurring on a new L1 in 2026 — the same vulnerability class, the same downstream effect, a different chain.

2. **The notional-to-realised gap as a defender signal.** The attacker minted 1,000 eBTC ($76.64M notional), deposited only 45 eBTC (4.5%) into Curvance, and walked away with $867.7K realised. The remaining 955 unbacked eBTC sit stranded — the attacker abandoned 95.5% of the notional mint because the lending market's WBTC liquidity was the binding constraint. This is structurally identical to Hyperbridge ($1.2B notional, $2.5M realised) and reinforces the pattern: **bridge-message-forgery exploits scale infinitely on the mint side but are bounded on the cash-out side by destination-chain liquidity.** The structural defender takeaway: rate limiting on the outflow channel (as Monad CEO Keone Hon recommended post-incident) directly caps realised loss regardless of notional mint scale.

## Context: Bridge attacks in May 2026

The EchoProtocol incident is the **14th bridge-related attack in May 2026**, with cumulative bridge-attack losses reaching $328.6M across the month. It is the **third major DeFi security incident in a 5-day window** (following the THORChain Router exploit on May 15 and the TrustedVolumes RFQ drain on May 7). The pattern is consistent: lock high-value cross-chain channels → exploit validation-logic flaws → drain in one shot.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-2026-05 | EchoProtocol bridge deployed on Monad; lock-and-mint model with committee multisig threshold validation; Hacken audit documents M-of-N signature requirement; mint function has no cap and no rate limit | T10.002 + T9.004 (standing vulnerability) |
| 2026-05-19 | Attacker forges cross-chain message with synthetic/replayed signatures that pass the committee threshold check; bridge executes `grantRole(DEFAULT_ADMIN_ROLE, 0x6A0109...3415)` on eBTC contract | **T10.002** (signature-validation bypass) |
| 2026-05-19 (same tx/bundle) | Attacker calls `revokeRole(DEFAULT_ADMIN_ROLE, 0xA338...9A3B)` — original admin removed; attacker is sole DEFAULT_ADMIN_ROLE holder | **T9.004** (admin-role capture) |
| 2026-05-19 (same tx/bundle) | Attacker calls `grantRole(MINTER_ROLE, self)` — now authorised to mint eBTC | **T9.004** (role escalation) |
| 2026-05-19 (same tx/bundle) | Attacker calls `mint(attacker, 1,000 eBTC)` — $76.64M notional minted with zero BTC backing, no cap triggered, no rate limit hit | **T9.004** (unbounded mint) |
| 2026-05-19 | Attacker deposits 45 eBTC ($3.45M notional) into Curvance's eBTC lending market; receives ceBTC collateral tokens | (monetization — lending-market collateralization) |
| 2026-05-19 | Attacker borrows ~11.29 WBTC (~$867.7K) from Curvance's WBTC market against ceBTC collateral | (monetization — borrow against unbacked collateral) |
| 2026-05-19 | Attacker bridges WBTC from Monad to Ethereum via Relay/LiFi; swaps for ETH; routes 384 ETH (~$821.7K) into Tornado Cash | **T7.003 + T7.001** (cross-chain laundering + mixer) |
| 2026-05-19 | On-chain analyst dcfgod flags the anomaly; PeckShieldAlert publishes alert; EchoProtocol pauses all cross-chain transactions | (third-party detection) |
| 2026-05-19 | Curvance detects anomaly in Echo eBTC market; pauses affected market; confirms isolated market design — no other markets impacted, no Curvance smart-contract compromise | (defender containment — lending protocol) |
| 2026-05-19 | Monad team clarifies mainnet unaffected — incident is application-layer, not chain-layer; Keone Hon recommends all bridge and lending protocols implement supply rate limits on collateral and outflow channels | (ecosystem response) |

## Realised extraction

~$867.7K realised (11.29 WBTC → 384 ETH → Tornado Cash). Notional mint: 1,000 eBTC (~$76.64M). The notional-to-realised ratio (~88:1) is structurally informative — the mint primitive scales infinitely, but cash-out is bounded by lending-market liquidity and the WBTC collateral factor. The attacker deposited 4.5% of the notional mint (45 of 1,000 eBTC) — enough to borrow the available WBTC without crashing the collateral price signal inside Curvance's oracle window. The remaining 955 unbacked eBTC (95.5% of the mint) sit stranded in the attacker's address on Monad.

## What defenders observed

- **Pre-event (bridge message-verification layer):** The committee multisig threshold validation did not enforce strict membership or message-hash binding. This was a standing T10.002 condition — the vulnerability existed from deployment, documented in Hacken's audit. Defender lesson: bridge audits must verify that signature validation checks (a) the signer is a *current* committee member at the time of verification, (b) the signed payload matches the *exact* message hash (not an aliased or replayed hash), and (c) the threshold count is satisfied by *distinct* signers.
- **At-event (on-chain signal):** A single EOA minted 1,000 eBTC with no corresponding BTC lock event — trivially detectable in real time by a bridge-monitoring indexer correlating mint events with source-chain deposit events. dcfgod flagged it manually; automated monitoring was absent.
- **At-event (Curvance containment):** Curvance's isolated market design meant the eBTC market pause affected only that market — no contagion to other lending pools. This validates the defender argument for per-market isolation in lending protocols: a single compromised collateral type does not cascade.
- **At-event (Monad response):** Monad's team confirmed the mainnet was unaffected. The incident is purely application-layer — the bridge contract's signature verification, not the L1 consensus or execution environment.

## Public references

- [PeckShieldAlert — May 19, 2026](https://x.com/PeckShieldAlert) — first responder: @dcfgod reports @EchoProtocol_ hacked on @monad, 1K eBTC minted, Curvance exit, 384 ETH to Tornado Cash
- [EchoProtocol — official pause announcement](https://x.com/EchoProtocol_) — all cross-chain transactions paused; investigation ongoing
- [Curvance — market pause](https://x.com/Curvance) — Echo eBTC market paused; isolated market design; no other markets affected; no Curvance smart-contract compromise
- [Monad / Keone Hon — ecosystem response](https://x.com/monad) — mainnet unaffected; recommends rate limits on bridge outflow channels and lending-market collateral supply; cites April 2026 rsETH incident as reference
- Hacken audit report — Echo bridge contract committee multisig threshold validation documented (pre-incident)
- Attacker address: `0x6A0109...3415` on Monad
- Original admin address: `0xA338...9A3B` on Monad
- Curvance protocol — eBTC and WBTC isolated lending markets on Monad
- Relay / LiFi — Monad-to-Ethereum bridge infrastructure
- Tornado Cash — ETH mixer on Ethereum (OFAC-sanctioned)
- Cross-reference: T10.002 at `techniques/T10.002-message-verification-bypass.md`, T9.004 at `techniques/T9.004-access-control-misconfiguration.md`

## Discussion

The EchoProtocol case anchors the **Monad-native T10.002** cell in OAK's chain-coverage matrix, joining KelpDao (Ethereum/LayerZero, April 2026) and Hyperbridge (Polkadot MMR, April 2026) to form a cross-chain triptych of bridge-message-forgery incidents in Q2 2026. The three cases share the same downstream primitive (forged message → unbounded mint) but differ in the upstream mechanism: infrastructure-provider compromise (KelpDao), proof-reuse flaw (Hyperbridge), and signature-validation bypass (EchoProtocol). Together, they establish that the bridge-message-forgery class is not a single-chain or single-mechanism phenomenon — it is the dominant bridge exploit class of 2026.

The EchoProtocol case is also the **canonical 2026 DEFAULT_ADMIN_ROLE capture** incident. The attacker's target was not the mint function, the bridge contract's asset custody, or the oracle — it was the root administrative privilege in the RBAC hierarchy. Once DEFAULT_ADMIN_ROLE was obtained, every other role and function was reachable. The RBAC hierarchy's design makes DEFAULT_ADMIN_ROLE "the role that administers roles" — granting it to an untrusted address is equivalent to surrendering the entire contract. The structural defender lesson: **cross-chain messages that modify RBAC roles on destination-chain contracts must require multi-signature authorisation and a timelock — a single forged message must never be sufficient to transfer DEFAULT_ADMIN_ROLE.**

The Curvance monetization path is tactically notable: the attacker deposited only 4.5% of the mint and borrowed against it. The WBTC liquidity constraint in Curvance's isolated market meant the attacker could only extract $867.7K against a $76.64M notional mint — the isolated market design contained the cash-out at the cost of that market's WBTC liquidity. Keone Hon's post-incident recommendation (supply rate limits on collateral, analogous to outflow-channel rate limits on bridges) addresses this directly: if Curvance's eBTC market had a deposit-rate limit — e.g., max 5 eBTC per block — the attacker could have deposited at most 5 eBTC, and the borrow ceiling would have been proportionally lower.

The Tornado Cash exit on Ethereum is commodity privacy infrastructure — the attacker did not need custom laundering tooling. The exit chain (Monad → Ethereum via Relay/LiFi → Tornado Cash) compresses the full laundering latency within a single day, consistent with the broader 2025-2026 trend of pre-staged laundering pipelines that execute faster than incident-response coordination can mobilise.

For OAK's broader coverage, the case + Hyperbridge + KelpDao collectively motivate a dedicated T10.002 sub-technique or Technique-page expansion covering the three sub-classes: infrastructure-provider compromise, proof-reuse forgery, and committee-signature-validation bypass — distinct detection surfaces, distinct mitigation surfaces, shared downstream primitive.
