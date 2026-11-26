# Moats App — a brute-forced hosting account gave an attacker the backend that held the automated-rewards admin keys, and Emergency Withdraw emptied every Moat that used them — Moats App / Avalanche, Robinhood Chain — 2026-11-19

**Loss:** **~\$600K** ("approximately \$600,000" per the Moats App post-mortem; SlowMist's tracker repeats "~\$600K"). The operator says "All Moats with automated rewards enabled on Avalanche and Robinhood were affected", and that the contents of each affected Moat were withdrawn. The post-mortem names two token amounts: "approximately 548.47 million \$ARENA and 84.13 million \$HEFE". "No funds have been frozen or recovered at this time." Compensation "has not yet been determined". The affected Moats are permanently closed because Emergency Withdraw cannot be undone.

**OAK Techniques observed:** **OAK-T11.014** (Operator Privileged-Key Compromise — *primary, operator-stated*. Moats App: the automated-rewards wallets held administrative permissions on each participating Moat, "including Emergency Withdraw, which removes all tokens held by a Moat, including rewards, staked tokens, and locked tokens", and their private keys sat on the backend server. The attacker took those keys and called the function as the contract allows. See [`techniques/T11.014-operator-privileged-key-compromise.md`](../techniques/T11.014-operator-privileged-key-compromise.md)). **OAK-T15.004** (Operator-Side Credential Compromise — the entry: "a brute-force attack on a team member's Hetzner account", a cloud-hosting account. See [`techniques/T15.004-operator-credential-compromise.md`](../techniques/T15.004-operator-credential-compromise.md)). Not mapped to T11.012: the post-mortem says the keys were "stored on the backend server" but does not say whether they were plaintext or encrypted.

**Attribution:** **unattributed.** The operator traces the activity to one VPS address and says this "does not, on its own, establish the identity of the individual responsible". Receiving address below.

**Key teaching point:** **A server that can run code must not hold keys that carry a "withdraw everything" permission over customer funds.** The contracts were not exploited; the single backend became the admin of every Moat that switched on automated rewards. A reward-depositing wallet that cannot touch staked or locked funds, and an emergency function that can only return funds to their owners and only by multisig, would have capped the loss. The operator now says its v4 design does exactly that.

## Summary

On 2026-11-19 an attacker gained access to the Moats App backend, which operated the automated-rewards system. Projects that enabled that feature had given its wallets admin rights on their Moat so rewards could be paid out automatically, and the keys of those wallets were on the backend server. The operator says the attacker got in by brute-forcing a team member's Hetzner account, ran code on the backend, escalated, and reached the wallets and their keys. They then called Emergency Withdraw on each affected Moat and sent the contents to an address they controlled. Moats without automated rewards were not affected. Most of the proceeds were sold for AVAX and USDC. SlowMist's tracker listed the incident; the operator's apology thread (2026-11-22 03:45 UTC) and its post-mortem (2026-11-22 03:39 UTC, on a Substack) came three days after the first withdrawal.

OAK's own trace covers Avalanche only; the explorer tool has no Robinhood Chain support, so the Robinhood leg of the loss is not traced here.

An earlier, separate incident hit the same "legacy automated reward wallet infrastructure" on Avalanche in May 2026. Its postmortem, on the same Substack, describes elevated permissions mistakenly granted during backend maintenance and states that "we no longer believe the incident was caused by a compromised deployer wallet or backend signer key". It is a different cause and is not documented as an OAK example here. See references.

## Timeline (UTC)

Stages: **Design** (backend holds admin keys), **Entry** (hosting-account brute force), **Take** (Emergency Withdraw on each Moat), **Money** (sold for AVAX and USDC), **Response**. Times for the take come from the operator's post-mortem. Times for the money legs are from OAK's trace of the receiving address on Avalanche (`verified: oak`).

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-19 (undisclosed) | Projects that enable automated rewards grant the feature's wallets admin permissions on their Moat, Emergency Withdraw included. The private keys of those wallets are stored on the Moats App backend, hosted on a Hetzner server. "Anyone who gained control of the backend would also gain the administrative permissions of every automated rewards wallet." | **T11.014** |
| Before 2026-11-19 (exact time undisclosed) | The attacker brute-forces a team member's Hetzner account, executes code in the backend server environment and escalates to the automated-rewards wallets and their keys. How the brute force succeeded (password strength, missing second factor, rate limits) is undisclosed. | **T15.004** |
| 2026-11-19 08:20:27 (operator) | First unauthorised withdrawal, from the first automated-rewards wallet. Over the "following hours" the remaining wallets and their Moats are withdrawn, to one address (below). | **T11.014** |
| 2026-11-20 00:25 to 03:32 (OAK trace) | The receiving address collects ARENA, WHEREMALEK, SWAMP, USDC, WAVAX, HEFE, GATOR, DISCLOSER, JUNE, BENSI and BTC.b from 11 sending addresses. The 548,472,045.9763284 ARENA arrives at 03:22:48 in [`0x08775294fdb26e384ed81829df5b113ec7688b409460ddfe148a90157c4cd7f7`](https://snowtrace.io/tx/0x08775294fdb26e384ed81829df5b113ec7688b409460ddfe148a90157c4cd7f7). The 84,127,713.1767257 HEFE arrives at 03:22:59 in [`0x149bc88193d9bfe2ad94f1d1b22ee58b7ef6cb54ad49a9436e5f56a09e5462b8`](https://snowtrace.io/tx/0x149bc88193d9bfe2ad94f1d1b22ee58b7ef6cb54ad49a9436e5f56a09e5462b8). See the date discrepancy under Root-cause evidence. | **T11.014** |
| 2026-11-20 04:50 to 05:40 (OAK trace) | 20 swaps of 13,739,724 ARENA each (274,794,480 ARENA) and six more single-token swaps go to [`0x8f10b468b06c6fd214b65f87778827f7d113f996`](https://snowtrace.io/address/0x8f10b468b06c6fd214b65f87778827f7d113f996), which returns 43,419.21 USDC across 26 transactions. 21 USDC transfers totalling 43,715.31 USDC then go to [`0x4494b8cbc69c794d82bd2d820a6ff6f62d7d841a`](https://snowtrace.io/address/0x4494b8cbc69c794d82bd2d820a6ff6f62d7d841a), starting with [`0xdc90ef2192ba279ba7de7335422a3f287bc891eab862007b621eab4eb52a1c23`](https://snowtrace.io/tx/0xdc90ef2192ba279ba7de7335422a3f287bc891eab862007b621eab4eb52a1c23). The operator's wording is "sold on-chain for AVAX and USDC". | — |
| 2026-11-20 04:09 to 10:30 (OAK trace) | 84,127,713.1767257 HEFE is sent unsold to [`0xc9d1fe7d3a90a9bca779303ae1f446ab5a32e545`](https://snowtrace.io/address/0xc9d1fe7d3a90a9bca779303ae1f446ab5a32e545) (04:09:28) and 274,794,497.40780467 ARENA to [`0x7823dfd918933224c3fa39edf242885429b1fdfb`](https://snowtrace.io/address/0x7823dfd918933224c3fa39edf242885429b1fdfb) (10:28:00). | — |
| Upon discovery (time undisclosed) | Operator secures the server, revokes compromised access and rotates credentials, secrets and tokens; opens an investigation; reports to IC3 and UK Report Fraud; asks Hosteons (the VPS provider of the attacking IP) for information. Affected Moats are withdrawn and permanently closed. | response |
| 2026-11-22 03:39 and 03:45 | Post-mortem published, then an apology thread asking users not to use the Moats App front end during review. | response |

Key addresses:

- Primary receiving address of the withdrawn funds (Avalanche, named by the operator) — [`0x8ADDbea8D2a404a1C21F53d3fc4835d2F81B6Ee4`](https://snowtrace.io/address/0x8ADDbea8D2a404a1C21F53d3fc4835d2F81B6Ee4)
- Swap counterparty that returned USDC for ARENA and other tokens (traced by OAK; type not confirmed, likely a DEX pool) — [`0x8f10b468b06c6fd214b65f87778827f7d113f996`](https://snowtrace.io/address/0x8f10b468b06c6fd214b65f87778827f7d113f996)
- Recipient of 43,715.31 USDC (traced by OAK) — [`0x4494b8cbc69c794d82bd2d820a6ff6f62d7d841a`](https://snowtrace.io/address/0x4494b8cbc69c794d82bd2d820a6ff6f62d7d841a). This address has older, unrelated 1inch activity (2026-07-06), so it may be a pre-existing wallet.
- Recipient of the HEFE (traced by OAK) — [`0xc9d1fe7d3a90a9bca779303ae1f446ab5a32e545`](https://snowtrace.io/address/0xc9d1fe7d3a90a9bca779303ae1f446ab5a32e545). Lookalike warning: the receiving address also sent 1 unit of token `0x7febcd576687661cb66ebe05c2c71a8bb6c4e5f7` to [`0xc9d9efa5769cff174e3721faaf3913703dd4e545`](https://snowtrace.io/address/0xc9d9efa5769cff174e3721faaf3913703dd4e545) at 05:14:55, which shares its first and last characters with the HEFE recipient. They are different addresses.
- Recipient of the ARENA remainder and 2.71 AVAX (traced by OAK) — [`0x7823dfd918933224c3fa39edf242885429b1fdfb`](https://snowtrace.io/address/0x7823dfd918933224c3fa39edf242885429b1fdfb)
- Attacking IP reported by the operator: `82.29.67.154` (VPS provider Hosteons).
- Individual Moat contract addresses, the automated-rewards wallets, and the Robinhood Chain receiving address: undisclosed.

## Fund flow

Avalanche legs were traced by OAK with `tools/explorer.py` as of 2026-11-26. The senders `0x42f33a4f…` and `0xcf65744c…` are the addresses that sent the ARENA and HEFE to the receiving address; that they are Moat contracts is OAK's inference, since the operator names no Moat addresses. The Robinhood Chain leg is not traced.

```oak-flow
as_of: 2026-11-26T12:00Z
nodes:
  - {id: moatA, chain: avalanche, address: 0x42f33a4f98bc5ba0af733c624683580a013d1c80, role: victim, label: "Sender of the 548M ARENA (inferred Moat)"}
  - {id: moatB, chain: avalanche, address: 0xcf65744c955a292d11de2a4184e9fabedbfc7b40, role: victim, label: "Sender of the 84M HEFE (inferred Moat)"}
  - {id: rcv, chain: avalanche, address: 0x8ADDbea8D2a404a1C21F53d3fc4835d2F81B6Ee4, role: attacker-receiver, label: "Primary receiving address (named by Moats App)"}
  - {id: pool, chain: avalanche, address: 0x8f10b468b06c6fd214b65f87778827f7d113f996, role: dex, label: "Swap counterparty (ARENA to USDC)"}
  - {id: usdc, chain: avalanche, address: 0x4494b8cbc69c794d82bd2d820a6ff6f62d7d841a, role: attacker-holding, label: "USDC recipient"}
  - {id: hefe, chain: avalanche, address: 0xc9d1fe7d3a90a9bca779303ae1f446ab5a32e545, role: attacker-holding, label: "HEFE recipient"}
  - {id: arena, chain: avalanche, address: 0x7823dfd918933224c3fa39edf242885429b1fdfb, role: attacker-holding, label: "ARENA remainder recipient"}
edges:
  - {from: moatA, to: rcv, asset: ARENA, amount: 548472045.9763284, tx: 0x08775294fdb26e384ed81829df5b113ec7688b409460ddfe148a90157c4cd7f7, time: 2026-11-20T03:22:48Z, technique: T11.014, verified: oak}
  - {from: moatB, to: rcv, asset: HEFE, amount: 84127713.1767257, tx: 0x149bc88193d9bfe2ad94f1d1b22ee58b7ef6cb54ad49a9436e5f56a09e5462b8, time: 2026-11-20T03:22:59Z, technique: T11.014, verified: oak}
  - {from: rcv, to: pool, asset: "ARENA (20 transfers of 13,739,724; first one shown)", amount: 13739724, tx: 0xf3027296b3e6c0499c15e00c0f4d5a77f906c1506302ebb42592341036b724ea, time: 2026-11-20T04:50:11Z, verified: oak}
  - {from: pool, to: rcv, asset: "USDC (first of 20 ARENA swaps)", amount: 4814.179723, tx: 0xf3027296b3e6c0499c15e00c0f4d5a77f906c1506302ebb42592341036b724ea, time: 2026-11-20T04:50:11Z, verified: oak}
  - {from: rcv, to: usdc, asset: "USDC (21 transfers totalling 43,715.309472; first one shown)", amount: 4814.179723, tx: 0xdc90ef2192ba279ba7de7335422a3f287bc891eab862007b621eab4eb52a1c23, time: 2026-11-20T04:54:39Z, verified: oak}
  - {from: rcv, to: hefe, asset: HEFE, amount: 84127713.1767257, tx: 0x00cccb0f56c0f80d7574931bc9e21fcd37a1897ea5904ae279e9ee6d4ec7728a, time: 2026-11-20T04:09:28Z, verified: oak}
  - {from: rcv, to: arena, asset: ARENA, amount: 274794497.40780467, tx: 0x71bae08e32f3134edd5ea99b09461b8a9b4487241f77358d426ee1acd3a2e7e9, time: 2026-11-20T10:28:00Z, verified: oak}
```

## Root-cause evidence

- **Technique:** OAK-T11.014
- **Source:** <https://minerxbt.substack.com/p/moats-app-security-incident-post>; <https://x.com/Moats_app/status/2124348472606531593>; <https://hacked.slowmist.io/>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** The operator's own post-mortem states the mechanism: "The attacker gained initial access through a brute-force attack on a team member's Hetzner account. From there, they executed code within the backend server environment and escalated their access, ultimately reaching the automated rewards wallets and their private keys." On the contract side: "No vulnerability in the Moats smart contracts was used." The thread says the same ("an attacker gained access to the Moats App backend") and SlowMist's tracker relays the same chain of events. The mechanism is operator-stated, with the root cause given as a design choice ("its wallets held administrative permissions, and their keys were stored on the backend server"), not a bug.
  Not published: how the brute force succeeded, whether the account had two-factor authentication, how the keys were stored on the server (plaintext or encrypted), how code execution and escalation worked, the Robinhood Chain receiving address, and the list of affected Moats or per-Moat losses. The loss is an estimate by the operator, not an audited total.
  **Date discrepancy (open):** the operator dates the first withdrawal 2026-11-19 08:20:27. OAK's trace of the receiving address on Avalanche shows the large inbound transfers on 2026-11-20 between 00:25 and 03:32 UTC, and no token inflow on 2026-11-19. The only transfer in at 08:20:27 is a 1.63735998 AVAX inflow on 2026-11-16 ([`0x5d0a3fa4cdbd97e3c02b35f42519df773a269bc2d37f74388bffe2fd6b53a686`](https://snowtrace.io/tx/0x5d0a3fa4cdbd97e3c02b35f42519df773a269bc2d37f74388bffe2fd6b53a686)). The ARENA and HEFE totals match the operator's figures to the quoted precision, so the address is the right one. The cause of the one-day offset (operator timestamp error, explorer time source, or an earlier Robinhood Chain withdrawal) is undetermined, so the timeline keeps both.

## Mitigations tied to this case

- **No server-held key with a drain-everything permission** (OAK-M37 HSM/MPC custody, OAK-M15 operator separation). The rewards wallet should only be able to deposit rewards, not to touch staked or locked funds. Enforce this in the Moat contract's role table so that a stolen backend cannot widen it. In this incident the same wallets carried Emergency Withdraw, so one server compromise reached every participating Moat. The operator's v4 design, which has a "Rewards Admin" restricted to depositing rewards, is the same control.
- **Emergency function that can only return funds to their owners, behind a multisig** (OAK-M15 owner multisig, OAK-M38 time-windowed limits). v3 Emergency Withdraw "transfers them to a specified address", callable by the automated wallets. A destination fixed to depositors, and callable only by an owner multisig, breaks the step where the attacker named their own address.
- **Hardened operator hosting accounts** (no existing OAK-Mnn covers cloud-account hardening; a new mitigation is proposed). Mandatory phishing-resistant second factor and login rate-limiting on the cloud account that hosts any component able to reach signing keys. This breaks the entry step, a brute-force attack on one team member's hosting account.
- **Outflow alert tied to the existing pause** (OAK-M34 emergency pause, OAK-M39 watcher network). The operator's own timeline shows withdrawals continuing "over the following hours" from wallet to wallet. An alert on the first Emergency Withdraw to a non-owner address would have left most of the Moats intact.

## Public references

- `[moatspostmortem2026]` — Moats App, "Moats App Security Incident Post Mortem" (2026-11-22): <https://minerxbt.substack.com/p/moats-app-security-incident-post>
- `[moatsxthread2026]` — Moats App (@Moats_app), "To the projects and communities who trusted Moats App: we are deeply sorry." (2026-11-22): <https://x.com/Moats_app/status/2124348472606531593>
- `[slowmist2026]` — SlowMist Hacked, Moats App entry (2026-11-19): <https://hacked.slowmist.io/>
- `[moatsmay2026]` — Moats App, "Automated Reward Wallet Attack Postmortem" (2026-05-08), an earlier, separate incident on the same legacy reward infrastructure: <https://minerxbt.substack.com/p/automated-reward-wallet-attack-postmortem>
