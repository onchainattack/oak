# Safe {Wallet} ERC-4337 Module Integration Security Issues — 2024–2025 — $0 (audit disclosures)

**Loss:** $0 realised — the vulnerabilities were identified during security audits of the Safe 4337 Module before material exploitation. The theoretical loss was bounded by the total value held in Safe wallets that had enabled the ERC-4337 module. The module-boundary vulnerabilities could have allowed an attacker to bypass Safe's multisig signature verification through the ERC-4337 UserOp path, execute arbitrary transactions through the Safe wallet without the required multisig threshold, or permanently lock funds through reentrancy-induced state corruption.

**OAK Techniques observed:** **OAK-T13.001.002** (Paymaster Policy Bypass — the module's validation logic had to correctly enforce Safe's multisig invariants through the ERC-4337 validation path; the operation-hash computation mismatch and signature-aggregation gateway findings are canonical validation-bypass surfaces at the module boundary: a UserOp that passed validation with one hash could execute with a different hash, and a single-signer aggregated signature could masquerade as a multisig-authorised UserOp.) **OAK-T13.001.003** (Paymaster Reentrancy — the module's `validateUserOp` function interacted with external contracts before returning, creating a reentrancy surface through the ERC-4337 validation path that could corrupt UserOp validation state and allow execution-phase operations to bypass signature verification.) **OAK-T15** (Off-chain Entry-Vector / Pre-Positioning — structurally adjacent at the module-deployment layer; a compromised or malicious 4337 module could be deployed to a Safe wallet through social engineering or governance compromise, creating a persistent backdoor that bypasses the Safe's multisig security model.)

**Attribution:** **unattributed** — multiple audit firms (including OpenZeppelin, Spearbit, and Safe's internal security team) identified the module-boundary issues during pre-deployment and post-deployment security reviews. No attacker exploited the identified surfaces before remediation.

**Key teaching point:** **The Safe 4337 Module integration is the canonical "module-boundary" T13 anchor: the security of a battle-tested multisig wallet (Safe) interacting with a newer standard (ERC-4337) depends on the correctness of the interface between them — the module boundary.** The Safe wallet's multisig execution path had years of production hardening; the ERC-4337 UserOp path introduced a second execution entry point that had to independently enforce all the security invariants that the multisig path enforced. A vulnerability at the module boundary — in the translation from UserOp to Safe transaction, in the validation-phase signature verification that had to be compatible with Safe's multisig signature scheme, or in the fallback-handler interaction — could bypass Safe's security model entirely. The structural lesson is that **when a battle-tested system adds a new entry path (here, ERC-4337 UserOps alongside traditional multisig transactions), the security of the composite system is the minimum of the two paths, not the maximum — and the new path has none of the production hardening of the old one.**

## Summary

Safe (formerly Gnosis Safe) is the most widely-used multisig wallet on Ethereum and EVM chains, securing tens of billions of dollars in assets across DAO treasuries, institutional wallets, and individual high-value accounts. Safe's security model is built on multisig signature verification: a transaction is executed only after it has been signed by a threshold number of owner addresses, with signature verification performed by the Safe contract's `checkNSignatures` function and transaction execution routed through the Safe's `execTransaction` path.

The Safe 4337 Module was developed to enable Safe wallets to interact with the ERC-4337 account-abstraction ecosystem: submitting UserOps through bundlers, using paymasters for gas sponsorship, and receiving session-key-like delegations through ERC-4337 validation patterns. The module acts as a translation layer: it receives ERC-4337 UserOps from the EntryPoint, translates them into Safe-compatible transactions, verifies the UserOp signature against the Safe's owner set, and executes the transaction through the Safe's existing execution framework.

The module-boundary audit findings identified several security-relevant issues:

1. **Validation-phase reentrancy.** The module's `validateUserOp` function interacted with external contracts (token approvals, paymaster validation) before returning. A malicious ERC-4337 paymaster or token contract could re-enter the Safe wallet through the validation path, potentially corrupting the UserOp validation state and allowing a subsequent execution-phase operation to bypass signature verification.

2. **`getOperationHash` computation mismatch.** The module computed the UserOp hash differently from the EntryPoint's computation, creating a mismatch between the hash the module verified and the hash the EntryPoint expected. A UserOp that passed the module's signature verification with one hash could execute a different operation in the execution phase with a different hash.

3. **Fallback-handler compatibility.** Safe wallets use a fallback-handler pattern to delegate calls to module contracts. The ERC-4337 module's interaction with the fallback handler introduced cases where a UserOp could trigger execution through the fallback path without passing through the Safe's multisig signature verification — the fallback handler's `execTransaction` path was not fully constrained by the 4337 module's validation logic.

4. **Signature-aggregation gateway.** The module introduced a signature-aggregation path to support ERC-4337's aggregated-signature feature. The aggregation logic needed to correctly enforce the Safe's multisig threshold — requiring M-of-N signatures in an aggregated form — while remaining compatible with the EntryPoint's signature-aggregation interface. A mismatch could allow a single-signer UserOp to pass as a multisig-authorised UserOp.

All findings were addressed before material exploitation: the module's validation logic was hardened against reentrancy, the hash computation was aligned with the EntryPoint's computation, the fallback-handler path was constrained, and the signature-aggregation logic was corrected.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023–2024 | Safe 4337 Module developed to enable Safe wallets to interact with the ERC-4337 ecosystem | T13 (module design) |
| 2024 | Security audits of Safe 4337 Module conducted by OpenZeppelin, Spearbit, Safe internal team; module-boundary issues identified | T13 + T15 (audit disclosures) |
| 2024 | All identified issues resolved; module deployed with hardened validation logic, aligned hash computation, constrained fallback-handler path | (remediation) |
| 2024–2025 | Safe 4337 Module operational; no exploitation of the identified audit findings detected | T13 (operational phase) |
| Continuing | Module-boundary surface persists for any wallet that adds an ERC-4337 entry path alongside an existing execution framework | T13 (structurally open) |

## Public references

- Safe 4337 Module documentation and architecture specification
- Audit reports: OpenZeppelin, Spearbit, and Safe internal security team findings on Safe 4337 Module
- ERC-4337 EntryPoint specification and UserOp hash computation
- Safe wallet fallback-handler documentation and security considerations
- See `techniques/T13` account abstraction techniques for Technique definitions

## Discussion

The Safe 4337 Module integration anchors the **module-boundary sub-class** of T13: the security surface created when a new entry path (ERC-4337 UserOps) is added to an existing, battle-tested execution framework (Safe multisig). The module boundary is the load-bearing security interface — every invariant that the Safe wallet's existing execution path enforced (multisig threshold, signature verification, replay protection, nonce ordering) must be independently enforced by the 4337 module's validation and execution logic.

The module-boundary surface is structurally distinct from the per-paymaster exploitation surfaces (T13.001.001–.004) and the bundler-MEV surface (T13.002). The paymaster exploits attack the **gas-sponsorship** layer — the attacker manipulates the paymaster's accounting to extract gas-token deposits. The module-boundary surface attacks the **wallet security model** itself — the attacker exploits a mismatch between the two execution paths to bypass the wallet's signature-verification or threshold-enforcement logic. The module-boundary surface has a larger blast radius than the paymaster surface (it compromises the wallet, not just the gas sponsor) but a smaller attack surface (it requires a vulnerability at the module boundary, which is smaller code surface than the full paymaster contract).

The Safe 4337 Module case also demonstrates that **the security of a composite system (wallet + module) is a property of the module boundary, not of the individual components.** A Safe wallet without the 4337 module has production-hardened multisig security. An ERC-4337 module without Safe integration can be designed to the 4337 security model. The composite system's security depends on the correctness of the translation between the two — and the translation layer (the module boundary) is the newest, least-tested code in the stack. The defender lesson: when adding an ERC-4337 entry path to an existing wallet architecture, the module boundary should receive more security attention than either the wallet or the 4337 integration independently, because the boundary is where security invariants are most likely to be lost in translation.
