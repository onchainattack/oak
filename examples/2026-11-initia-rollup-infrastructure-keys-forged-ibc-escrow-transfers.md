# Initia — compromised rollup infrastructure keys let an attacker forge IBC transfers that emptied the L1 escrow accounts backing several rollups — Initia L1 (interwoven-1) / Noble — 2026-11-10

**Loss:** **~\$615K** per Initia's preliminary review: about \$605,000 USDC left Initia through Noble, plus about \$10,000 in other tokens, before the L1 was halted. CertiK Alert counted a larger outflow, **~\$636K across 16 successful IBC transfers** to Noble from one Initia address. Most of the remaining assets moved out of the escrow accounts were still on the halted L1 when Initia posted. Full scope was still under investigation. No recovery or reimbursement statement had been published at the time of writing.

**OAK Techniques observed:** **OAK-T11.014** (Operator Privileged-Key Compromise — *primary, operator-stated, preliminary*. Initia: "the transfers were made using compromised rollup infrastructure keys allowing an attacker to fabricate IBC transfers". Initia has not said which keys these are or why the L1 accepted the transfers; OAK reads it as the L1 trusting those keys to speak for the rollups. How the keys were obtained is not disclosed. See [`techniques/T11.014-operator-privileged-key-compromise.md`](../techniques/T11.014-operator-privileged-key-compromise.md)). **OAK-T7.003** (Cross-Chain Bridge Laundering — the stolen USDC was sent over IBC to Noble, the exit toward other chains; this is the step Initia names, and nothing past Noble is published).

**Attribution:** **unattributed.** No attacker address on Initia, Noble or any other chain has been published.

**Key teaching point:** **A rollup's infrastructure keys must not be able to move the L1 escrow beyond what that rollup's own deposits cover.** Here the keys alone were enough to draw down escrow accounts that hold assets for several rollups, and a per-rollup withdrawal cap or rate limit enforced on the L1 would have bounded the loss to one key's quota.

Related but a different incident: [Initia, 2026-10-23, MoveVM script-cache bug and unbacked credit](2026-10-initia-movevm-script-cache-unbacked-credit-bridge-exit.md). The October case was a VM bug with no key involved. Rektradar also treats it as distinct from this one.

## Summary

On 2026-11-10 Initia halted its L1 at 06:18 UTC, in coordination with validators, after it identified unauthorised transfers from the escrow accounts that hold assets bridged to several rollups. Its preliminary finding was that compromised rollup infrastructure keys were used to fabricate IBC transfers. About \$605,000 USDC left through Noble, with about \$10K of other tokens, before the pause. Initia posted this at 07:07 UTC. CertiK Alert flagged the outflow at 10:28 UTC. Initia gave no attacker address and no transaction hash.

## Timeline (UTC)

Stages: **Entry** (how the keys were taken: undisclosed), **Execution** (forged IBC transfers out of escrow), **Money** (USDC to Noble), **Response** (halt). Times come from Initia's post and CertiK Alert's post. Initia's post did not date the first transfer or the key theft.

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-10 (undisclosed) | An attacker obtains rollup infrastructure keys. Which keys, from which rollup(s), and how they were obtained are not published. | **T11.014** |
| Before 2026-11-10 06:18 (exact time undisclosed) | Using those keys the attacker fabricates IBC transfers that move assets out of the L1 escrow accounts holding assets bridged to several rollups. CertiK Alert counts 16 successful IBC transfers to Noble, about \$636K, from the Initia address below. | **T11.014** |
| Before 2026-11-10 06:18 | About \$605,000 USDC leaves Initia through Noble, plus about \$10K in other tokens (Initia). Where it went from Noble is undisclosed. | **T7.003** |
| 2026-11-10 06:18 | Initia halts the L1 in coordination with validators as a protective measure. | response |
| 2026-11-10 07:07 | Initia posts the preliminary finding: forged IBC transfers via compromised rollup infrastructure keys. Most assets moved out of escrow remain on the halted L1. Initia is working with security teams, validators and exchanges to fix the scope. | response |
| 2026-11-10 10:28 | CertiK Alert reports ~\$636K across 16 IBC transfers to Noble from the Initia address below. | — |

Key addresses:

- Initia address CertiK Alert names as the source of the 16 IBC transfers to Noble (Initia L1, interwoven-1) — [`init1nyn989pkt2tx3rfz4rhzwldlh67vy4t30ccyz9`](https://scan.initia.xyz/interwoven-1/accounts/init1nyn989pkt2tx3rfz4rhzwldlh67vy4t30ccyz9/txs). That it is an escrow account is inferred from the context of the two posts and is not stated by either.
- Attacker receiving address on Noble: undisclosed. Attacker keys, rollup identities and transaction hashes: undisclosed.

## Fund flow

Not traced by OAK: `tools/explorer.py` supports neither Initia nor Noble, and no destination address or tx hash is public. The edges are relayed from the cited sources and drawn dashed.

```oak-flow
as_of: 2026-11-10T12:00Z
nodes:
  - {id: esc, chain: initia, address: init1nyn989pkt2tx3rfz4rhzwldlh67vy4t30ccyz9, role: vulnerable-contract, label: "Initia L1 source address named by CertiK (escrow)"}
  - {id: noble, chain: noble, role: bridge, label: "Noble (IBC destination)"}
  - {id: unk, chain: noble, role: attacker-receiver, label: "Receiving address (undisclosed)"}
edges:
  - {from: esc, to: noble, asset: "USDC, about 605,000 (Initia) / about 636,000 across 16 transfers (CertiK)", time: 2026-11-10T06:18:00Z, technique: T7.003, verified: source, source: initiaxpost2026}
  - {from: noble, to: unk, asset: "USDC (onward path undisclosed)", technique: T7.003, verified: source, source: initiaxpost2026}
```

## Root-cause evidence

- **Technique:** OAK-T11.014
- **Source:** <https://x.com/initia/status/2120050740626628972>; <https://x.com/CertiKAlert/status/2120101370909151548>
- **Source type:** operator
- **Confidence:** reported
- **Evidence:** The operator's statement is same-day and explicitly preliminary, so it is not `confirmed`. CertiK Alert corroborates the outflow (16 IBC transfers to Noble) but not the key compromise.
  Initia says its investigation "so far indicates" that the transfers used compromised rollup infrastructure keys to fabricate IBC transfers out of the escrow accounts. Not published: which keys, how they were taken, why one rollup's keys could draw on escrow shared with other rollups, and the attacker's addresses. The Technique choice (T11.014 over a protocol-bug Technique) follows the operator's "compromised keys" wording and will change if the post-mortem finds a verification flaw.

## Mitigations tied to this case

- **Per-rollup withdrawal cap enforced on the L1** (OAK-M38 time-windowed withdrawal limits, OAK-M11 per-block caps). The L1 escrow module should count what each rollup has deposited and refuse IBC transfers beyond that amount or beyond a rolling window, so a stolen rollup key can only draw its own rollup's balance. This rule sits on the L1 and the rollup operator cannot switch it off. In this incident, 16 transfers worth about \$636K came out of accounts holding assets for several rollups, so a cap would have stopped the drain at one rollup's quota.
- **Threshold signing with operator separation for rollup infrastructure keys** (OAK-M15, OAK-M37 HSM/MPC custody). No single stolen key should authorise a transfer from the L1 escrow. Holding the keys in an HSM or MPC set with a separate approver breaks the step where one stolen key was enough.
- **Outflow alert on escrow accounts that triggers the existing halt** (OAK-M34 emergency pause, OAK-M39 watcher network). Initia halted at 06:18 UTC, and CertiK Alert flagged the outflow after four hours. An automatic pause on 16 transfers in a short window is the control that would have kept the rest of the escrow on the L1.

## Public references

- `[initiaxpost2026]` — Initia (@initia), "The Initia L1 was halted at 06:18 UTC on November 10 in coordination with validators" (2026-11-10): <https://x.com/initia/status/2120050740626628972>
- `[certikalert2026]` — CertiK Alert (@CertiKAlert), suspicious outflow of ~\$636K across 16 IBC transfers to Noble (2026-11-10): <https://x.com/CertiKAlert/status/2120101370909151548>
- `[rektradar2026]` — Rektradar, "Web3 Daily Exploits — 10 Nov 2026: Initia ~\$615K IBC Escrow Halt" (2026-11-10): <https://www.rektradar.xyz/web3-daily-exploits-10-nov-2026-initia-615k-ibc-escrow-halt/>
- `[defiant2026]` — The Defiant, "Initia Halts L1 After \$605,000 USDC Outflow, Team Says" (2026-11-10): <https://thedefiant.io/news/hacks/initia-halts-l1-after-605-000-usdc-outflow-team-says>
