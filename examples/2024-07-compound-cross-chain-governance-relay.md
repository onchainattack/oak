# Compound cross-chain governance relay misconfiguration — Ethereum / multi-chain — 2023–2024 (audit-finding class)

**Corrected 2026-10-11:** the claims that Trail of Bits and Spearbit reported this class and that findings were remediated pre-exploitation are removed (only the OpenZeppelin Feb 2023 audit of Compound's Polygon bridge receiver was found); the case is restated as a conceptual attack-surface description with \$0 loss.

**Loss:** approximately \$0 realised at the named-exploit level as of v0.1; the class is documented at the architectural-review and audit-finding layer. This entry is a conceptual attack-surface description, not a documented incident: no specific Compound misconfiguration or exploit is established. The only directly relevant public source found is OpenZeppelin's February 2023 audit of Compound's Polygon bridge receiver. The T10.006 surface is described here as a design class.
**OAK Techniques observed:** **OAK-T10.006** (Cross-Chain Governance Relay Attack) — primary; the class covers governance-relay message-verification gaps where the target-chain executor contract accepts governance messages without verifying source-chain finality, source-chain governance contract address, replay protection, or relayer authorisation.
**Attribution:** **pseudonymous** — no named attacker; the class is documented at the audit-finding level. There is no attributable actor, and no audit-firm characterisation of the class beyond the OpenZeppelin Compound audit has been verified.
**Key teaching point:** **Cross-chain governance relay misconfigurations are the canonical example of a technique class a conceptual attack surface with no verified named exploit.** The class illustrates why audit and architectural review of governance-relay receivers matters for defender preparation, but this file does not claim the technique has been repeatedly identified in audits or remediated pre-exploitation; only the OpenZeppelin Compound Polygon-receiver audit is cited.

## Summary

Compound Finance's cross-chain governance deployment on non-Ethereum chains (via Compound's Governor Bravo → bridge relay → target-chain executor pattern) and the broader class of protocols deploying governance via LayerZero, Wormhole, Chainlink CCIP, Hyperlane, and Axelar each face a structurally identical security surface: the target-chain executor contract must verify that (a) the governance message was emitted by the legitimate source-chain governance contract (not a look-alike or attacker-deployed contract), (b) the message includes a nonce or proposal-ID for replay protection, (c) the source-chain block containing the governance event has reached finality before the target-chain executor acts on it, and (d) the relayer address delivering the message is authorised to do so.

The following are the failure modes the surface can exhibit (a design-level checklist, not a list of verified audit findings):

1. Target-chain executors that trusted a broader set of source addresses than the legitimate governance contract — e.g., accepting messages from any contract on the source chain rather than only from the verified governance contract address.
2. Missing or incorrectly implemented nonce/replay protection — a valid governance message from the source chain could be replayed on the target chain with modified parameters or after the original proposal had been superseded.
3. Missing source-chain finality requirements — the executor accepted messages from source-chain blocks that had not yet reached finality, opening a reorg-based governance-injection window (structurally analogous to T10.003 optimistic-bridge finality gaps).
4. Overly permissive relayer authorisation — any address could deliver governance messages rather than only the designated cross-chain relayer set.

No named protocol suffered a material loss from a T10.006 exploit at the time of v0.1, and no remediation of specific findings is documented here. The class is included because the detection surface is well-characterised and the structural conditions for exploitation (cross-chain governance expansion, standard bridge SDK defaults, permissive executor configuration) are expanding, not contracting.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2020–2022 | Compound deploys Governor Bravo governance on Ethereum mainnet; cross-chain governance via bridge relays begins to be adopted across DeFi | (pre-surface) |
| 2023-02-17 | OpenZeppelin publishes its audit of Compound's Polygon bridge receiver (Governor-to-L2 path) | T10.006 (audit of the relay surface) |
| 2024–2025 | Cross-chain governance deployment is described as expanding as DAOs move to L2s and alt L1s (general trend; unsourced here) | (surface expansion) |

## Realised extraction

\$0 at the named-exploit level as of v0.1. The class is conceptual; the only cited source is the OpenZeppelin Compound audit.

## Public references

- `[ozcompoundpolygon2023]` — OpenZeppelin, "Compound Polygon Bridge Receiver Audit" (2023-02-17): <https://www.openzeppelin.com/news/compound-polygon-bridge-receiver-audit> (audit of Compound's Governor-to-L2 bridge receiver path; the only directly relevant public audit found)
- Compound Finance cross-chain governance architecture (Governor Bravo → bridge relay → target-chain executor pattern)
- LayerZero OFT governance-relay documentation and security considerations
- Wormhole generic message-passing governance-relay patterns
- See `techniques/T10.006-cross-chain-governance-relay-attack.md` for the full surface characterisation
