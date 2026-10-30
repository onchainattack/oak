# MetaMask Staking — a node-operator infrastructure compromise redirected block rewards, and ~17,000 validators were exited as a precaution — MetaMask non-custodial staking / Ethereum — 2026-09-30

**Loss:** **~0.36 ETH** in diverted block rewards per researcher Kaden (unconfirmed by MetaMask). ~523,000 ETH across ~17,000 validators was exited as a precaution; that is exposure, not loss. MetaMask says no wallets or customer funds were affected.

**OAK Techniques observed:** **OAK-T15.003** (Operator-Endpoint Compromise — *primary, operator-stated at the access layer*. MetaMask disclosed "a security incident affecting part of our infrastructure" in its non-custodial staking operations and exited affected validators with partners; Lido's disclosure describes the same precautionary out-of-order exits. See [`techniques/T15.003-operator-endpoint-compromise.md`](../techniques/T15.003-operator-endpoint-compromise.md)). Kaden's on-chain read: 18 of 19 MetaMask validators that won blocks paid rewards to a Tornado-funded address (`0x98B9…24A3`) instead of the configured fee recipient, i.e. the attacker could change validator client configuration. Whether signing keys were reachable — and so slashing risk — is unknown.

**Attribution:** **unattributed.**

**Key teaching point:** **Validator configuration access is signing-adjacent.** The attacker took dust, but access that can change a fee recipient may also be able to make validators sign; the mass exit was priced on that, not on the 0.36 ETH.

## Summary

MetaMask announced the incident at 23:38 UTC on 2026-09-30 and updated on 2026-10-01. No root-cause analysis has been published.

## Root-cause evidence

- **Technique:** OAK-T15.003
- **Source:** <https://x.com/MetaMask/status/2105442300335620460>; <https://research.lido.fi/t/security-disclosure-metamask-staking-precautionary-out-of-order-exits/11961>
- **Source type:** operator
- **Confidence:** reported
- **Evidence:** MetaMask confirms an infrastructure compromise and the exits but not the vector; the fee-recipient redirect is one researcher's on-chain reading.

## Public references

- `[metamaskstaking2026]` — MetaMask on X (2026-09-30): <https://x.com/MetaMask/status/2105442300335620460>
- `[metamaskupdate2026]` — MetaMask, user update: <https://metamask.io/news/user-update>
- `[lidometamask2026]` — Lido research forum, security disclosure: <https://research.lido.fi/t/security-disclosure-metamask-staking-precautionary-out-of-order-exits/11961>
- `[kadenmetamask2026]` — Kaden on X, on-chain analysis: <https://x.com/0xKaden/status/2105530184103563620>
