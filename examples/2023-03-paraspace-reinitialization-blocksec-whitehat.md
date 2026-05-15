# ParaSpace cross-contract reinitialization attack (BlockSec whitehat rescue) — 2023-03

**Loss:** **$0 — whitehat intervention prevented loss.** BlockSec, a blockchain security firm, identified and preemptively blocked a cross-contract reinitialization vulnerability in ParaSpace (an NFT lending protocol on Ethereum) on 2023-03-17. The vulnerability existed in ParaSpace's upgradeable-proxy architecture: the protocol's initialize function performed an external call to a peer contract before writing the initializer guard flag (`initialized = true`) to storage. An attacker could trigger reinitialization via a callback from the peer contract during the external call, resetting the protocol's privileged roles (owner, admin) to attacker-controlled addresses.
**OAK Techniques observed:** **OAK-T9.009** (Cross-Contract Reinitialization Attack) — canonical whitehat-prevention anchor. The structural vulnerability — external call before initializer guard SSTORE, creating an instruction-level gap exploitable via callback — is the defining T9.009 pattern. BlockSec's detection and preemptive blocking demonstrates PATH B (per-transaction call-trace monitoring detecting the initialize function selector appearing more than once, with the inner call originating from a peer contract).
**Attribution:** **confirmed** — BlockSec's whitehat intervention is publicly documented; the vulnerability disclosure and preemptive blocking were confirmed by both BlockSec and ParaSpace/Parallel Finance. No attacker was identified.

**Key teaching point:** ParaSpace is the canonical T9.009 anchor demonstrating that cross-contract reinitialization is a structural vulnerability detectable via pre-deployment static analysis (PATH A: flag any initialize function with an external call before the initializer guard's SSTORE) and per-transaction call-trace monitoring (PATH B: detect duplicate initialize-function-selector invocation with inner call from peer contract). The whitehat intervention proves the detection signal works before exploitation — the vulnerability was real and exploitable; the call-trace monitoring caught it pre-exploitation.

## Summary

ParaSpace, an NFT lending protocol on Ethereum (later rebranded to Parallel Finance), used an upgradeable proxy architecture (UUPS or transparent proxy pattern) with an initialize function that set the protocol's privileged roles (owner, admin, guardian).

BlockSec's security researchers identified a cross-contract reinitialization vulnerability in the protocol's initialize function: the function performed an external call (e.g., a token transfer, oracle query, or peer-protocol interaction) before writing the `initialized` flag to storage via SSTORE. The instruction-level gap between the external call (CALL/DELEGATECALL opcode) and the guard SSTORE meant that a callback from the peer contract executing during the external call could re-enter the initialize function — which, because the guard flag had not yet been written, would see the contract as uninitialized and execute the full initialization logic a second time.

The attacker's intended exploitation path: trigger reinitialization via a callback, reset the owner/admin roles to attacker-controlled addresses, then use the acquired roles to drain the protocol's assets. BlockSec detected the in-progress attack via call-trace monitoring (PATH B) and preemptively blocked the transaction, preventing loss.

## Public references

- BlockSec: ParaSpace reinitialization vulnerability disclosure and whitehat intervention report (2023-03-17).
- ParaSpace / Parallel Finance: vulnerability acknowledgement and remediation announcement (2023-03).
- OpenZeppelin: Initializable contract pattern documentation — external-call-before-guard anti-pattern.
