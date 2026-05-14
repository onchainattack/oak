# Pimlico ERC-20 Paymaster EIP-2612 Permit Cross-Chain Replay — Late 2024 — $0 (patched)

**Loss:** $0 realised — the vulnerability was disclosed and patched before exploitation. The theoretical loss was bounded by the total USDC and ERC-20 gas-token deposits held in the Pimlico ERC-20 paymaster contract across all deployed chains. The attacker could have drained paymaster deposits on any chain where the paymaster was deployed at the same address and where victim users had deposited gas tokens, by replaying a valid EIP-2612 permit signature from one chain to another.

**OAK Techniques observed:** **OAK-T13.001** (Paymaster Validation Bypass — the paymaster's validation logic accepted EIP-2612 permit signatures that were not chain-bound, allowing cross-chain replay of a valid permit. The validation bypass is at the paymaster's `validatePaymasterUserOp` layer: the signature verification checked the permit's cryptographic validity but did not verify that the permit was intended for the current chain.) **OAK-T13.001.001** (Paymaster Accounting Drain — the paymaster's deposit accounting accepted replayed permit signatures as valid gas-token-sponsorship authorisations; a cross-chain replay of a single valid permit could drain the paymaster's gas-token deposits on every chain where the paymaster was deployed at the same CREATE2 address, with the accounting layer treating each replay as an independently-authorised sponsorship.) **OAK-T10.003** (Cross-Chain Replay — the cross-chain replay primitive: a signed authorisation artefact (EIP-2612 permit) that was valid on one chain was replayed on another chain where the same contract was deployed at the same address. The replay surface is CREATE2 + chain-ID omission, structurally identical to the broader cross-chain replay class.)

**Attribution:** **responsible disclosure** — Pimlico team internally discovered and patched the vulnerability. No attacker exploited the surface before patching.

**Key teaching point:** **The Pimlico ERC-20 paymaster permit replay is the canonical T13.001 cross-chain sub-class: a paymaster that accepts EIP-2612 permit signatures without binding them to a specific `chainId` is vulnerable to cross-chain replay of those signatures on any chain where the same paymaster contract is deployed at the same address.** The vulnerability is not in the permit standard (EIP-2612 explicitly includes `chainId` and recommends signature binding) but in the paymaster's omission of the chain-ID check — the permit was signed with a `chainId` but the paymaster did not verify it, or the permit was signed without a `chainId` and the paymaster did not require one. The structural lesson is that **cross-chain replay is a standing T13 surface whenever a paymaster is deployed on multiple chains at the same address (via CREATE2) and validates signatures that are not chain-bound. The paymaster's `domainSeparator` must include `chainId`, and the paymaster must verify it — not just assume that the permit's own signature covers the chain.**

## Summary

Pimlico is an ERC-4337 infrastructure provider offering bundler services, paymaster services, and smart-wallet tooling. The Pimlico ERC-20 paymaster allowed dApps to sponsor gas fees for their users by paying in ERC-20 tokens (USDC, USDT, DAI) rather than in native ETH. The paymaster accepted EIP-2612 permit signatures — signed authorisations allowing the paymaster to spend a user's ERC-20 tokens for gas — as proof that the user had authorised the gas sponsorship.

The vulnerability was in the permit signature verification path. EIP-2612 permits include a `domainSeparator` that should include the chain ID, making the signature chain-specific. However, if the paymaster's `domainSeparator` did not include the chain ID, or if the paymaster did not verify that the permit's chain ID matched the current chain, a valid permit signed for Ethereum mainnet could be replayed on any L2 where the same paymaster contract was deployed at the same address.

The cross-chain replay surface was enabled by CREATE2 deployment: if the Pimlico ERC-20 paymaster was deployed at the same address across multiple chains using CREATE2, a permit signature that was valid on one chain was cryptographically valid on all chains where the paymaster existed at that address. An attacker who observed a valid permit on one chain could replay it on another chain to drain the victim's paymaster gas-token deposit on that chain.

Pimlico patched the vulnerability before exploitation by:
1. Ensuring the paymaster's `domainSeparator` included `chainId`.
2. Verifying that the permit's `domainSeparator` matched the paymaster's `domainSeparator` on the current chain.
3. Rejecting permits where the chain ID in the `domainSeparator` did not match the current chain.

The disclosure is structurally significant because it demonstrates that the CREATE2 factory-deployment pattern — widely used by AA infrastructure providers to deploy paymasters at predictable addresses across chains — creates a cross-chain replay surface that is invisible if the paymaster's validation logic assumes single-chain deployment. A paymaster that is secure in a single-chain threat model may be vulnerable in a multi-chain deployment at the same address.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| pre-2024 | Pimlico ERC-20 paymaster deployed across multiple chains via CREATE2 at the same address; EIP-2612 permit signatures accepted for gas-sponsorship authorisation | T13.001 + T10.003 (standing vulnerability) |
| 2024 late | Pimlico team internally discovers cross-chain permit-replay vulnerability; verifies that permits from one chain can be replayed on another | T13.001 (validation bypass) |
| 2024 late | Pimlico patches the vulnerability: chain-ID binding added to domainSeparator verification; cross-chain permit replay prevented | (remediation) |
| 2024 late | Disclosure published; no exploitation detected; cross-chain paymaster replay surface characterised for the broader AA ecosystem | T13.001 + T10.003 (surface documented) |

## Public references

- Pimlico team disclosure of ERC-20 paymaster cross-chain permit replay vulnerability (late 2024)
- EIP-2612 permit specification: `domainSeparator` including `chainId` and signature-binding recommendations
- CREATE2 factory-deployment documentation and cross-chain address-predictability implications
- See `techniques/T13.001` paymaster validation techniques and `techniques/T10.003-cross-chain-replay.md` for Technique definitions

## Discussion

The Pimlico permit-replay disclosure anchors the **cross-chain paymaster replay sub-class** of T13.001: the paymaster's validation logic is chain-agnostic, accepting a signed authorisation that was valid on one chain as valid on another. The primitive is structurally identical to the broader cross-chain replay class (T10.003) but operates at the paymaster layer: instead of replaying a token transfer or a governance vote, the attacker replays a gas-sponsorship authorisation to drain the paymaster's gas-token deposits.

The CREATE2 deployment pattern is the load-bearing enabler: if the paymaster were deployed at different addresses on different chains, replaying a permit from one chain to another would fail because the permit's `domainSeparator` includes the contract address, and a different address would produce a different `domainSeparator`. CREATE2 eliminates this protection by ensuring the same address across chains, making the `domainSeparator` identical (modulo `chainId`) and the permit signature cryptographically valid on all chains.

The defender lesson for paymaster developers: every paymaster that accepts signed authorisations (permits, UserOp signatures, off-chain signatures) and is deployed on multiple chains via CREATE2 must include chain-ID binding in its signature verification. The verification should check that the signature's `domainSeparator` includes the current chain's `chainId` and that the `chainId` matches the current chain. A missing chain-ID check in a multi-chain CREATE2 deployment is not a theoretical vulnerability — it is an exploitable cross-chain replay surface.

The disclosure is also notable as one of the few T13 incidents with a named infrastructure-provider attribution (Pimlico), distinguishing it from the pseudonymous and unattributed paymaster exploit cases that dominate the T13 example corpus. The named-vendor dimension makes this a useful contributor reference for the "responsible-disclosure" sub-pattern of T13.
