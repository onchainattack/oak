# Exactly Protocol cross-contract reinitialization exploit — Optimism — 2023-08-18

**Loss:** approximately \$7.3M extracted from Exactly Protocol's Optimism deployment via a cross-contract reinitialization attack on the DebtManager contract.
**OAK Techniques observed:** **OAK-T9.009** (Cross-Contract Reinitialization Attack — primary; the attacker exploited a missing reinitialization guard on the DebtManager contract via a cross-contract callback pattern during the initialisation flow, allowing the attacker to reinitialize the contract with attacker-controlled parameters). **OAK-T9.004** (Access-Control Misconfiguration — secondary; the reinitialization succeeded because the DebtManager's initialisation function lacked proper access-control gating for the cross-contract callback path; the `initializer` modifier's guard flag had not yet been set at the point of the external call, allowing the callback to re-enter the initialisation path with attacker-supplied parameters).
**Attribution:** **pseudonymous** — no public named-individual or state-actor attribution at OAK v0.1 cutoff.
**Key teaching point:** **The Exactly Protocol reinitialization exploit is the 2023 operational anchor for the cross-contract reinitialization class (T9.009) — the DebtManager's initialisation path made an external call before the reinitialization guard flag was committed, creating a callback window that allowed the attacker to reinitialize the contract with malicious parameters.** The incident demonstrates the structural parallel between T9.009 (reinitialization) and T9.005 (reentrancy): in T9.005, the defence is checks-effects-interactions; in T9.009, the defence is initialise-then-interact — performing all external calls after the initialisation state flag has been set.

## Summary

Exactly Protocol is a cross-chain lending protocol on Optimism and Ethereum. On August 18, 2023, an attacker exploited a missing cross-contract reinitialization guard on the DebtManager contract. The DebtManager's `initialize` function made an external call to a peer contract during the initialisation flow, before the OpenZeppelin `initializer` modifier's guard flag had been committed to storage. The peer contract, under attacker control, called back into the DebtManager's initialisation entrypoint — and because the reinitialization guard had not yet been set, the callback succeeded. The attacker was able to execute the initialisation logic a second time with attacker-supplied parameters, setting privileged roles and bypassing the protocol's debt-ceiling enforcement.

The structural vulnerability was the ordering of operations in the initialisation function: the external call to the peer contract preceded the storage write that would have set the `initialized` flag. This is the canonical T9.009 pattern — the `initializer` modifier protects against direct re-calls of `initialize` from outside the contract, but it does not protect against a peer contract's callback during the initialisation external-call window because the guard flag has not been committed yet. The OpenZeppelin `Initializable` contract's `initializer` modifier sets the flag at the end of the `initialize` function's execution via the modifier's post-execution hook; any external call made during the function body occurs before that hook, creating the callback window.

The incident is structurally parallel to the Paraspace / BlockSec case (2023-03) — the canonical OAK v0.1 T9.009 anchor — where a whitehat demonstrated the same cross-contract reinitialization vector on Paraspace's upgradeable proxy. The Exactly Protocol case is the adversarial-exploit counterpart: an actual attacker (not a whitehat) exploited the same reinitialization callback window to extract approximately \$7.3M.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-2023-08-18 | Exactly Protocol operates on Optimism with DebtManager contract; initialisation path includes external call to peer contract before reinitialization guard flag is committed | T9.009 surface (latent) |
| 2023-08-18 | Attacker deploys malicious peer contract and triggers DebtManager's `initialize` function; during external call, peer contract calls back into DebtManager's initialisation entrypoint | **T9.009** (cross-contract reinitialization — callback via external call during init) |
| 2023-08-18 | Attacker reinitializes DebtManager with attacker-controlled parameters; sets privileged roles; extracts ~$7.3M | T9.004 (privilege escalation via reinitialisation) |
| 2023-08-18 | Exactly Protocol team pauses affected contracts; incident disclosed | (incident response) |

## Realised extraction

Approximately \$7.3M.

## OAK technique classification rationale

T9.009 (Cross-Contract Reinitialization Attack) is the primary classification because the load-bearing exploit primitive was the reinitialization callback — the attacker re-entered the initialisation path via a cross-contract call during the initialiser's external call window, before the `initializer` modifier's guard flag had been committed.

T9.004 (Access-Control Misconfiguration) is the secondary classification because the reinitialization succeeded in setting privileged roles that the protocol's access-control design did not intend to be settable via a reinitialization path. The T9.009→T9.004 chain (reinitialisation creates the privilege; missing access-control check permits its subsequent use) is a canonical composition pattern for this class.

## Public references

- PeckShield on-chain analysis of the Exactly Protocol exploit transaction traces
- BlockSec function-level walkthrough of the reinitialization callback path
- OpenZeppelin `Initializable` contract documentation (for the `initializer` modifier's guard-flag-commitment timing)
- See `examples/2023-08-exactly-protocol.md` for the cross-chain debt-ceiling-bypass framing of the same incident under T10.002
