# MetaMask Staking — a node-operator infrastructure compromise redirected block rewards, and ~17,000 validators were exited as a precaution — MetaMask non-custodial staking / Ethereum — 2026-09-30

**Loss:** **~0.36 ETH** in diverted block rewards per researcher Kaden (unconfirmed by MetaMask). ~523,000 ETH across ~17,000 validators was exited as a precaution; that is exposure, not loss. MetaMask says no wallets or customer funds were affected.

**OAK Techniques observed:** **OAK-T15.003** (Operator-Endpoint Compromise — *primary, operator-stated at the access layer*. MetaMask disclosed "a security incident affecting part of our infrastructure" in its non-custodial staking operations and exited affected validators with partners; Lido's disclosure describes the same precautionary out-of-order exits. See [`techniques/T15.003-operator-endpoint-compromise.md`](../techniques/T15.003-operator-endpoint-compromise.md)). Kaden's on-chain read: 18 of 19 MetaMask validators that won blocks paid rewards to a Tornado-funded address ([`0x98B9231de84334c1d48BA0b72CF13f92484924A3`](https://etherscan.io/address/0x98B9231de84334c1d48BA0b72CF13f92484924A3)) instead of the configured fee recipient, i.e. the attacker could change validator client configuration. Whether signing keys were reachable — and so slashing risk — is unknown.

**Attribution:** **unattributed.**

**Key teaching point:** **Validator configuration access is signing-adjacent.** The attacker took dust, but access that can change a fee recipient may also be able to make validators sign; the mass exit was priced on that, not on the 0.36 ETH.

## Summary

MetaMask announced the incident at 23:38 UTC on 2026-09-30 and updated on 2026-10-01. No root-cause analysis has been published.

## Timeline (UTC)

Read it as three stages. **Get in**: an infrastructure compromise at MetaMask's staking operation, vector not published. **Take**: block rewards of MetaMask validators go to the wrong address. **Contain**: validators exited, Lido stops new deposits. Times are from MetaMask's posts and the Lido forum unless marked.

| When | What happened | OAK |
|---|---|---|
| Before 2026-09-30 (undisclosed) | Attackers gain access to part of MetaMask's infrastructure for its non-custodial staking operation. The vector and the start date are not published. Kaden infers from on-chain data that the attacker could change validator client configuration. | **T15.003** |
| Before 2026-10-01 (undisclosed) | The attacker address [`0x98B9231de84334c1d48BA0b72CF13f92484924A3`](https://etherscan.io/address/0x98B9231de84334c1d48BA0b72CF13f92484924A3) is funded through Tornado Cash (Kaden). | — |
| Before 2026-10-01 (dates undisclosed) | 18 of the 19 MetaMask validators that won block rewards pay them to [`0x98B9231de84334c1d48BA0b72CF13f92484924A3`](https://etherscan.io/address/0x98B9231de84334c1d48BA0b72CF13f92484924A3) instead of the configured fee recipient. About 0.36 ETH is diverted (Kaden, unconfirmed by MetaMask). | **T15.003** |
| 2026-09-30 23:38 | MetaMask posts that it is responding to "a security incident affecting part of our infrastructure", sees no immediate threat to wallets, and is exiting affected validators in its non-custodial staking operations. | response |
| 2026-09-30 23:40 | Lido posts a disclosure: MetaMask Staking is exiting its validators in the Lido protocol. The last exits are expected by the end of 2026-10-07. | response |
| 2026-10-01 | MetaMask updates: the affected validators were exited with partners, and there is no indication that wallets or customer funds were affected. Containment and verification continue. | response |
| 2026-10-01 05:28 | Kaden reports about 17,000 validators (about 523,000 ETH) were exited as a precaution. He says 3 of the validators he considers exploited had not yet exited and 821 potentially affected validators in total had not. Fund movement after the diversion is not published. | — |
| 2026-10-05 to 2026-10-23 | Lido proposes, votes on (vote #206, enacted 2026-10-19) and enacts (2026-10-23, Dual Governance Proposal #15) a target validator limit of 0 for the MetaMask Staking node operator in both staking modules, so no new deposits go to it. | response |

Key addresses:

- Attacker-funded address that received the diverted block rewards (Tornado-funded): [`0x98B9231de84334c1d48BA0b72CF13f92484924A3`](https://etherscan.io/address/0x98B9231de84334c1d48BA0b72CF13f92484924A3)
- Lido staking module contract where operator ID 21 is set to limit 0 (CMv1): [`0x55032650b14df07b85bF18A3a3eC8E0Af2e028d5`](https://etherscan.io/address/0x55032650b14df07b85bF18A3a3eC8E0Af2e028d5)
- Lido staking module contract where operator ID 6 is set to limit 0 (CMv2): [`0xDa5F930cE326EB5205085D66c72A4E79d60cB8C1`](https://etherscan.io/address/0xDa5F930cE326EB5205085D66c72A4E79d60cB8C1)

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
