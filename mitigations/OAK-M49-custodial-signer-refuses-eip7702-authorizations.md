# OAK-M49 — Custodial Signers Refuse EIP-7702 Authorizations, and Watch Their Own EOAs for Code

**Class:** custody-operational
**Audience:** custodian, exchange, venue, institutional-treasury

**Maps to Techniques:** OAK-T13.004, OAK-T15.003, OAK-T11.014

## Description

An EIP-7702 authorization (a signed message with the `0x05` magic prefix) tells the chain to make an externally owned account run some contract's code. Once one such authorization is on-chain, whoever controls that contract controls everything the EOA holds and everything that obeys the EOA. A custodial hot wallet has no business reason to sign one.

The control has two parts:

1. **The signer refuses.** The service that holds or uses a custodial hot-wallet key rejects any payload that is an EIP-7702 authorization (`0x05 || rlp(chain_id, address, nonce)`), whatever the requesting service says. The refusal sits in the signer or HSM policy, not in the service that asks for signatures. That service is exactly what an attacker controls in this technique.
2. **Watch the code.** Every custodial EOA is polled for code (`eth_getCode(address) != 0x`). An EOA that suddenly has code is in an incident. The alert fires on the delegation, before the sweep. A revocation runbook is prepared in advance: sign an authorization to the zero address and send it from a safe path.

## How it applies

- **OAK-T13.004 (EIP-7702 Delegation Abuse), custodial variant:** [Binance, 2026-10-29](../examples/2026-10-binance-devops-laptop-service-container-hot-wallet-drain.md).
  - The attacker submitted one transaction carrying **50 authorizations, each signed by the Binance 14 key**. 3 min 24 s later a sweep took **167,464 ETH and 1.615B USDT**. Binance 14 then directed Hot Wallet 34 to pay out **823M USDC**.
  - Part 1 would have stopped the whole Ethereum takeover: no authorization, no delegated code, no sweep.
  - Part 2 would have raised an alert at 20:20:59 UTC, when the delegation landed. Binance 14 signed the revocation at 00:10:35 UTC, **3 h 50 m** after the takeover. During that window it was swept three more times.
  - The other chains in the same theft were drained by ordinary signed transfers. This control does not cover them; [OAK-M50](OAK-M50-withdrawal-approval-independent-of-submitter.md) does.
- **OAK-T15.003 (Operator-Endpoint Compromise):** the control limits what a compromised internal service can make the signer do. It is the 7702-specific case of "the signer has its own policy".
- **OAK-T11.014 (Operator Privileged-Key Compromise):** partial. If the key itself is stolen, the attacker signs outside the policy and part 1 does nothing. Part 2 still detects the delegation.

## Limitations

- This control is for custodial and treasury EOAs, where no legitimate 7702 use exists. A retail wallet that wants 7702 features cannot refuse every authorization. For retail, see T13.004's wallet-UX mitigations.
- Part 1 holds only if the refusal is enforced by a component the requesting service cannot reconfigure. In Binance's case, a policy that lived in the compromised service would not have helped.
- Part 2 detects but does not prevent. Its value is the 3 h 50 m it could have saved, which is bounded by how fast the revocation path works.
- A wallet that is already a smart contract (Hot Wallet 34) is outside the 7702 question. The lesson there is blast radius: a contract that obeys one EOA inherits that EOA's compromise.

## Reference implementations

- Signer and HSM policy engines that parse the payload type before signing. Custody stacks that support transaction-type allowlists can express "never sign type `0x05`".
- Code-presence polling: one `eth_getCode` call per custodial address per block, or per minute. `tools/explorer.py info <chain> <address>` reports `is_contract` for spot checks.

## Citations

- [`examples/2026-10-binance-devops-laptop-service-container-hot-wallet-drain.md`](../examples/2026-10-binance-devops-laptop-service-container-hot-wallet-drain.md): the 50 authorizations, the signer recovered on-chain, the 3 h 50 m to revocation, and the Hot Wallet 34 blast radius, all traced by OAK.
- Ondology Labs, "The \$6.3B Binance Hack: How Binance 14's Own Key Signed the Takeover" (2026-10-29/30). It recommends that custodians refuse `0x05`-prefixed authorization payloads for hot wallets, monitor code presence, and keep revocation runbooks: <https://ondologylabs.com/blog/binance-hot-wallet-hack-eip-7702>
- [`techniques/T13.004-eip7702-delegation-abuse.md`](../techniques/T13.004-eip7702-delegation-abuse.md)
