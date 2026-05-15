# Compound cross-chain governance relay misconfiguration — Ethereum / multi-chain — 2023–2024 (audit-finding class)

**Loss:** approximately \$0 realised at the named-exploit level as of v0.1; the class is documented at the architectural-review and audit-finding layer. The Compound governance relay misconfiguration on cross-chain deployments and the broader class of cross-chain governance message-verification gaps identified by Trail of Bits, OpenZeppelin, and Spearbit constitute the T10.006 surface as a design-and-audit class — pre-exploitation detection rather than post-exploitation forensics.
**OAK Techniques observed:** **OAK-T10.006** (Cross-Chain Governance Relay Attack) — primary; the class covers governance-relay message-verification gaps where the target-chain executor contract accepts governance messages without verifying source-chain finality, source-chain governance contract address, replay protection, or relayer authorisation.
**Attribution:** **pseudonymous** — no named attacker; the class is documented at the audit-finding level. Attribution is to the audit firms that characterised the class (Trail of Bits, OpenZeppelin, Spearbit) and the protocols that remediated findings pre-exploitation.
**Key teaching point:** **Cross-chain governance relay misconfigurations are the canonical example of a technique class detected and mitigated at the audit layer before a named exploit at extraction scale.** The class demonstrates that OAK technique coverage at the audit-finding / architectural-review layer is structurally important for defender preparation: the technique is real, well-characterised, and repeatedly identified in audits, even though the public named-exploit record is sparse.

## Summary

Compound Finance's cross-chain governance deployment on non-Ethereum chains (via Compound's Governor Bravo → bridge relay → target-chain executor pattern) and the broader class of protocols deploying governance via LayerZero, Wormhole, Chainlink CCIP, Hyperlane, and Axelar each face a structurally identical security surface: the target-chain executor contract must verify that (a) the governance message was emitted by the legitimate source-chain governance contract (not a look-alike or attacker-deployed contract), (b) the message includes a nonce or proposal-ID for replay protection, (c) the source-chain block containing the governance event has reached finality before the target-chain executor acts on it, and (d) the relayer address delivering the message is authorised to do so.

Between 2023 and 2025, audit firms identified misconfigurations across this surface in multiple protocol deployments. The findings included:

1. Target-chain executors that trusted a broader set of source addresses than the legitimate governance contract — e.g., accepting messages from any contract on the source chain rather than only from the verified governance contract address.
2. Missing or incorrectly implemented nonce/replay protection — a valid governance message from the source chain could be replayed on the target chain with modified parameters or after the original proposal had been superseded.
3. Missing source-chain finality requirements — the executor accepted messages from source-chain blocks that had not yet reached finality, opening a reorg-based governance-injection window (structurally analogous to T10.003 optimistic-bridge finality gaps).
4. Overly permissive relayer authorisation — any address could deliver governance messages rather than only the designated cross-chain relayer set.

No named protocol suffered a material loss from a T10.006 exploit at the time of v0.1 — the findings were remediated at the audit stage. The class is included because the detection surface is well-characterised and the structural conditions for exploitation (cross-chain governance expansion, standard bridge SDK defaults, permissive executor configuration) are expanding, not contracting.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2020–2022 | Compound deploys Governor Bravo governance on Ethereum mainnet; cross-chain governance via bridge relays begins to be adopted across DeFi | (pre-surface) |
| 2022–2023 | Trail of Bits, OpenZeppelin, Spearbit each publish audit findings flagging cross-chain governance-relay misconfigurations as a distinct audit class | T10.006 (audit-finding characterisation) |
| 2023–2024 | Protocols deploying cross-chain governance via LayerZero OFT, Wormhole generic message passing, and Chainlink CCIP undergo security reviews; governance-relay message-verification gaps identified and remediated pre-exploitation | T10.006 (pre-exploitation remediation) |
| 2024–2025 | Cross-chain governance deployment accelerates as DAOs expand to L2s and alt L1s; the T10.006 surface expands with each new governance-relay deployment | (surface expansion) |

## Realised extraction

\$0 at the named-exploit level as of v0.1. The class is documented at the audit-finding layer.

## Public references

- Trail of Bits, OpenZeppelin, Spearbit — cross-chain governance-relay audit findings (2023–2025)
- Compound Finance cross-chain governance architecture (Governor Bravo → bridge relay → target-chain executor pattern)
- LayerZero OFT governance-relay documentation and security considerations
- Wormhole generic message-passing governance-relay patterns
- See `techniques/T10.006-cross-chain-governance-relay-attack.md` for the full surface characterisation
