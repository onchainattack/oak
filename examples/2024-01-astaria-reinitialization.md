# Astaria reinitialization vulnerability disclosure — EVM — 2024

**Loss:** pre-deployment disclosure; no realised on-chain loss. A cross-contract reinitialization vulnerability was identified during an audit of the Astaria NFT-lending protocol's upgradeable proxy contracts, where the initialisation path made an external call before the reinitialization guard flag was committed. The finding was disclosed and patched before exploitation.
**OAK Techniques observed:** **OAK-T9.009** (Cross-Contract Reinitialization Attack) — primary; the Astaria proxy's `initialize` function made an external call to a peer contract during the initialisation flow, before the OpenZeppelin `initializer` modifier's guard flag had been committed to storage. The callback window created by this ordering allowed a hypothetical reinitialization via peer-contract callback, consistent with the canonical T9.009 pattern.
**Attribution:** **unattributed** (pre-deployment finding; no attacker attribution applicable). The vulnerability was surfaced through a professional audit engagement and remediated before production exploitation.
**Key teaching point:** **The Astaria reinitialization finding demonstrates that the cross-contract reinitialization class (T9.009) extends beyond the Exactly Protocol and Paraspace anchors — the pattern recurs across independent upgradeable-proxy protocols, and the canonical defence (initialise-then-interact — performing all external calls after the initialisation state flag has been set) is the structural mitigation.** The incident reinforces that T9.009 is a proxy-pattern-level surface, not a protocol-specific operational error.

## Summary

Astaria is an NFT-lending protocol deploying upgradeable proxy contracts (UUPS pattern) on Ethereum. During a 2024 audit engagement, the audit firm identified that one of Astaria's proxy contracts made an external call to a peer contract during its `initialize` function body — before the `initializer` modifier's post-execution hook had committed the `initialized` flag to storage.

The structural vulnerability was the ordering of operations: the `initialize` function (a) performed parameter validation, (b) made an external call to register with a peer contract, and (c) allowed the `initializer` modifier's guard flag to be set at function exit. If the peer contract had called back into the proxy's `initialize` entrypoint during step (b), the reinitialization guard would not yet have been active, and the callback would have succeeded — allowing an attacker to reinitialize the proxy with attacker-controlled parameters.

The finding was disclosed to the Astaria team, who restructured the initialisation flow to perform the external call after the guard flag had been committed (or to perform the registration as a separate post-initialisation step). No on-chain exploitation occurred. The case is included as a pre-deployment T9.009 anchor demonstrating that the class is independently discoverable across proxy-pattern protocols, not specific to Exactly or Paraspace.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024 (pre-deployment) | Astaria proxy contracts under audit; `initialize` function makes external call to peer contract before guard-flag commitment | T9.009 surface present (latent) |
| 2024 (during audit) | Audit firm identifies the cross-contract reinitialization vector; documents the external-call-before-guard-flag ordering as a T9.009-class finding | **T9.009** (pre-deployment audit finding) |
| 2024 (post-audit) | Astaria team restructures initialisation flow; guard flag committed before external call or registration moved to separate post-init step | (remediation) |
| 2024 | Protocol deploys with mitigated initialisation path; no exploitation occurs | (T9.009 surface closed pre-deployment) |

## Realised extraction

\$0 — pre-deployment audit finding; remediated before production deployment.

## Public references

- Cross-reference: T9.009 at `techniques/T9.009-cross-contract-reinitialization-attack.md`.
- Cross-reference: 2023-08-exactly-reinitialization at `examples/2023-08-exactly-reinitialization.md` (Exactly Protocol, ~\$7.3M, adversarial-exploit counterpart).
- Cross-reference: 2025-12-uspd-cpimp-clandestine-proxy at `examples/2025-12-uspd-cpimp-clandestine-proxy.md` (USPD CPIMP stablecoin reinitialization).

## Public References

See citations in corresponding technique file.
