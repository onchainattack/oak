# Socket / Bungee bridge infinite-approval call-injection exploit — Ethereum — 2024-01-16

**Loss:** ~$3.3M (~1,993 ETH) extracted from wallets that had previously granted token approvals to the SocketGateway contract. The exploit was a call-injection vulnerability in the bridge's user-verification path: the `SocketGateway` contract's `performAction` function accepted a `swapExtraData` bytes parameter that was forwarded to an arbitrary external call, and the validation logic treated the call as user-initiated when it was attacker-injected.

**OAK Techniques observed:** **OAK-T9.005** (Smart-Contract Exploit via Reentrancy / Call Injection — primary; the attacker exploited a missing validation gate on the `swapExtraData` parameter in the SocketGateway contract to inject a call that transferred previously-approved tokens from victim addresses to the attacker). **OAK-T4.001** (Permit2 / Signature-Based Authority Misuse — structurally adjacent; the exploit depended on victim wallets having pre-existing `approve` grants to the SocketGateway contract, converting static approvals into a persistent vulnerability surface). **OAK-T10** (Bridge and Cross-Chain — the affected contract was the Socket cross-chain bridge gateway, and the exploit's blast radius was gated by the set of users who had bridged via Socket and retained active approvals).

**Attribution:** **pseudonymous** (the attacker address was identified on-chain; Socket team publicly acknowledged the exploit and paused affected contracts within hours). The attacker returned approximately ~$1.7M (just over half) to the Socket team within days following on-chain and off-chain negotiation.

**Key teaching point:** **A bridge gateway contract that accepts user-supplied calldata for external calls without validating the call target against an approved route registry allows an attacker to redirect previously-granted user approvals to an attacker-controlled destination.** The Socket exploit is the canonical example of the "pre-existing approval → call-injection exploitation of the approval grantee" pattern at the bridge layer, structurally distinct from Permit2 phishing (where the victim signs the approval at the attacker's request) and from front-end compromise (where the legitimate dApp's UI is hijacked).

## Summary

Socket (formerly Bungee) operated a cross-chain bridge aggregation protocol that allowed users to swap assets across chains via a unified gateway contract. The `SocketGateway` contract on Ethereum handled inbound bridge transactions and user swaps. The contract's architecture accepted a `swapExtraData` parameter that was forwarded to an external call as part of the bridge-message execution path.

On January 16, 2024, an attacker discovered that:

1. **The `swapExtraData` parameter was insufficiently validated** — the contract forwarded the calldata to an external address without verifying that the call target was an approved bridge route or whitelisted integration contract.
2. **Users who had previously granted `approve` to the SocketGateway contract** (a routine step in using the bridge) retained active approvals that the gateway could exercise on their behalf.
3. **By injecting a `transferFrom` call** via the `swapExtraData` parameter, the attacker could drain approved tokens from any wallet with an active SocketGateway approval to the attacker's address.

The exploit loop was: enumerate on-chain wallets with active SocketGateway approvals → construct a malicious `swapExtraData` payload containing a `transferFrom` to the attacker's address → call `performAction` on the SocketGateway contract with the victim as the `from` parameter → the gateway forwarded the `transferFrom` to the token contract, which honoured it because the victim had approved the SocketGateway contract.

The Socket team paused affected contracts within approximately 3 hours of the first exploit transaction. Approximately ~$3.3M was extracted across ~200 victim wallets. The attacker subsequently returned ~$1.7M (approximately half) to the Socket team following on-chain negotiation, reducing the net loss to ~$1.6M.

The vulnerability class — user-supplied calldata forwarded to an unvalidated external call in a contract that holds standing user approvals — is structurally analogous to the LI.FI exploit (July 2024, `examples/2024-07-li-finance.md`) and recurred across multiple bridge-aggregation architectures through 2023–2025.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2024-01-16 14:45 UTC (approx) | First exploit transaction; attacker begins draining victim wallets with active SocketGateway approvals | **T9.005 + T10 execution** |
| 2024-01-16 ~17:30 UTC | Socket team detects anomalous activity; pauses affected contracts and revokes compromised gateway routes | (protocol response) |
| 2024-01-16 to 01-19 | Socket publishes post-mortem; notifies affected users; recommends approval revocation for all SocketGateway users | (user notification) |
| 2024-01-20 (approx) | Attacker returns ~$1.7M to Socket team via on-chain transfer | (partial recovery) |
| 2024-01 onward | Socket migrates to new gateway contracts with whitelisted-route validation and discontinues the unvalidated `swapExtraData` forwarding path | (mitigation deployment) |

## What defenders observed

- **User-supplied calldata forwarding without destination validation is a standing T9.005 surface in any contract that holds standing user approvals.** The Socket `swapExtraData` path was intended to allow flexible integration with third-party swap protocols, but the flexibility came at the cost of unvalidated destination routing. The canonical mitigation is a whitelist of approved route destinations, enforced at the gateway contract, rejecting any external call whose target is not on the whitelist.
- **Pre-existing approvals convert a contract vulnerability into a multi-victim blast radius.** The SocketGateway contract's approval surface was the vector that converted a single-contract call-injection bug into a multi-victim extraction event. Users who had bridged once and never revoked the approval remained vulnerable indefinitely — the approval persistence is the T4.001 structural adjacency.
- **The Socket exploit is the mid-point in a recurring call-injection pattern across bridge aggregators (2022–2025).** The pattern — user-supplied calldata forwarded to an unvalidated external call in a gateway contract with standing user approvals — appeared at LI.FI (July 2024), Socket (January 2024), and in a detected-and-patched form at multiple pre-deployment bridge audits. The recurrence validates the class as a structural bridge-aggregation-architecture surface rather than a one-off implementation bug.

## What this example tells contributors writing future Technique pages

- **Socket is a clean T9.005 + T10 dual-classification case.** T9.005 covers the call-injection vulnerability in the `performAction` path; T10 covers the bridge-specific blast-radius dimension (cross-chain user base, gateway-contract approval surface, cross-chain message path).
- **The T4.001 adjacency is structural but the primary classification is T9.005.** While the exploit depended on pre-existing approvals (T4.001 surface), the load-bearing vulnerability was the unvalidated call injection (T9.005), not the approval-acquisition mechanism. The T4.001 adjacency informs the blast-radius analysis but not the primary classification.
- **The partial-return outcome is a recurring pattern in bridge-exploit cases.** The Socket attacker returned approximately half the extracted funds, consistent with the white-hat-negotiation / partial-return pattern observed at Poly Network (2021) and in several smaller bridge exploits. Contributors should document the return amount and mechanism explicitly as a first-class observable.

## Public references

- Socket Protocol. *"Socket Gateway Exploit Post-Mortem."* January 2024.
- PeckShield. *"Socket / Bungee Exploit On-Chain Analysis."* January 2024.
- Cross-reference: T9.005 (Smart-Contract Exploit — Reentrancy / Call Injection) at `techniques/T9.005-reentrancy-call-injection.md`.
- Cross-reference: T10 (Bridge and Cross-Chain) at `techniques/` (T10 family).
- Cross-reference: `examples/2024-07-li-finance.md` — LI.FI bridge-aggregation exploit (July 2024); structurally parallel call-injection vulnerability in a different bridge aggregation gateway.

### Proposed new BibTeX entries

```bibtex
@misc{socketpostmortem2024,
  author = {{Socket Protocol}},
  title = {Socket Gateway Exploit Post-Mortem — January 2024},
  year = {2024},
  month = jan,
  note = {~1,993 ETH (~$3.3M) extracted via call-injection in unvalidated swapExtraData path; ~$1.7M returned}
}

@misc{peckshieldsocket2024,
  author = {{PeckShield}},
  title = {Socket / Bungee Exploit On-Chain Analysis},
  year = {2024},
  month = jan
}
```
