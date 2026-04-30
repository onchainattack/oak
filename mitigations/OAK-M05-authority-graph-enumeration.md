# OAK-M05 — Authority-Graph Enumeration

**Class:** detection
**Audience:** custody-customer, risk-team, vendor

**Maps to Techniques:** OAK-T1.003, OAK-T1.004, OAK-T9.003, OAK-T9.004, OAK-T11.001, OAK-T11.002, OAK-T11.003

## Description

Authority-Graph Enumeration is the per-key inventory of every privilege a given signing key (or a given operator's set of signing keys) holds across the on-chain estate: every contract on which the key is `owner`, every role-bearing assignment (`DEFAULT_ADMIN_ROLE`, `MINTER_ROLE`, `PAUSER_ROLE`, `UPGRADER_ROLE`, custom roles) the key holds, every multisig of which the key is a signer, every proxy whose admin slot points at an address in the key's control, every Permit2 / `setApprovalForAll` allowance the key has been granted on user-side. The output is a single graph: nodes are addresses (keys, contracts, multisigs), edges are typed authority relations (signer-on, admin-of, role-bearer-on, allowance-from), and the graph is queryable by key.

The defensive principle is that the privilege held by a key is structural information about *what becomes exploitable if that key is disclosed*. Without an authority graph, "the key was compromised" is an under-specified incident: the responder doesn't know which contracts to pause, which multisigs to remove the key from, or which allowances to revoke before the attacker exercises them. With an authority graph, the response becomes an enumeration: walk every edge from the compromised key, rotate or revoke each privilege in priority order, watch each downstream contract for exercise during the window the rotation is in flight.

This mitigation is *load-bearing for rotate-on-disclosure* — the canonical Wintermute-2022 lesson, where a vanity-address key compromise was discoverable in advance, the privilege held by that key was knowable from chain state, but no operator-side authority graph existed to make the priority-order rotation legible until after the attacker had exercised it. The graph must exist before the disclosure event; reconstructing it under incident-response time pressure is too late.

## How it applies

- **OAK-T1.003 (Renounced-but-not-Really):** the authority graph for a token contract's deployer key surfaces every retained role and proxy-admin path *that survives surface-level renouncement claims*; this is the operator-side counterpart to OAK-M01's source-bytecode-binding approach to the same question.
- **OAK-T1.004 (Blacklist / Pausable Weaponisation):** the authority graph identifies who holds the blacklist-setter and pause-toggler roles; defender-side decisions to treat such roles as elevated risk hinge on the graph's correctness.
- **OAK-T9.003 (Governance Attack):** the authority graph of governance-token-holding keys (and the multisigs they sign on) surfaces the concentration that governance-attack analyses depend on; without the graph, the attack is invisible to per-address holding metrics.
- **OAK-T9.004 (Access-Control Misconfiguration):** the graph makes the misconfiguration legible at the *system* level — a key that holds `DEFAULT_ADMIN_ROLE` on a contract that should have been renounced is visible as a graph edge, regardless of whether the original deployment script intended to leave it.
- **OAK-T11.001 (Third-Party Signing Vendor Compromise):** when a custody vendor is breached, the authority graph for keys held in that vendor's infrastructure is the rotation playbook — *every privilege those keys hold must be rotated*, and the graph is what makes the enumeration possible. Wintermute is the canonical case study.
- **OAK-T11.002 (Wallet Software Distribution Compromise):** for end-user wallets compromised via the distribution channel, an authority graph at the user level (allowances held, smart-account permissions delegated, NFT `setApprovalForAll` grants) drives the revocation playbook in the same way the institutional authority graph drives institutional rotation.
- **OAK-T11.003 (Multisig Contract Manipulation):** the authority graph captures every multisig a given key is a signer on; on disclosure, the graph identifies which multisigs need a `removeOwner` proposal queued and on what priority order.

## Limitations

The authority graph is only as accurate as the role-discovery layer that built it: contracts using non-standard role patterns (custom modifiers without OpenZeppelin's `AccessControl`, opaque proxy delegations, off-chain-attested authority that influences on-chain behaviour) require per-pattern detector logic and are systematically under-represented in stock implementations. The graph also captures *current* authority and not *historical* authority — a key that held a role for one block during deployment and has since renounced is invisible, but the contract may still bear scars from that brief window (storage state set, immutable parameters chosen). For Permit2-class authority (off-chain signature-based grants), the graph cannot enumerate grants the user has signed but not yet had submitted on-chain, which is the canonical T4.001 evasion. Cross-chain authority graphs require chain-by-chain rebuild and a unified key-attribution layer that is not standardised at v0.1. Finally, the graph is necessary but not sufficient: rotate-on-disclosure is only as fast as the slowest privilege rotation in the priority list, and operational discipline (out-of-band signing for the rotation transactions, hardware-wallet confirmation, multisig coordination across geographically distributed signers) is the real cost driver of the response.

## Reference implementations

- OpenZeppelin Defender — admin-action automation with role inventory; suitable for institutional deployment.
- Safe Transaction Service / Safe API — signer enumeration across Safes a key participates in.
- Etherscan / Blockscout role-events surface — passive, per-contract; suitable for manual enumeration but not for at-scale graph maintenance.
- Tenderly — alert framework with role-grant / role-revoke watchers; complementary to the graph-building step.
- Revoke.cash — user-facing allowance / approval revocation tool; the consumer-side analogue of authority-graph enumeration for end-user keys.
- `mg-detectors-rs` — authority-graph enumeration over Solana program ownership and Token-2022 authority-set is a v0.1 in-scope capability; EVM authority-graph extension planned for v0.2.
- Custom subgraph / event-listener pipelines indexing `RoleGranted` / `RoleRevoked` / `OwnershipTransferred` events plus EIP-1967 admin-slot writes — the open-source baseline.

## Citations

- `[halbornwintermute2022]` — Wintermute 2022 retrospective; the canonical case for rotate-on-disclosure where authority-graph enumeration would have shortened the response window.
- `[1inchprofanity2022]` — Profanity vanity-address key compromise context; the upstream cause of the Wintermute incident and the structural reason authority graphs must exist before disclosure.
- `[ofac2022tornado]` — sanctions-listing context; relevant to authority-graph enumeration that includes off-chain attribution layers.
- `[chainalysisbadger2021]` — BadgerDAO 2021 retrospective; allowance-revocation as the consumer-side authority-graph analogue (T11.002 application).
- `[checkpoint2023drainers]` — drainer-services cohort; allowance / approval inventory at the user-key level is the relevant defence.
