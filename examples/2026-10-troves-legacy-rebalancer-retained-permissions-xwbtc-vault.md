# Troves — a replaced rebalancing contract kept its permissions on the xWBTC/WBTC vault, and was used to remove ~8.6 BTC — Troves / Starknet — 2026-10-31

**Loss:** **~8.6 BTC (preliminary)** per Troves' own statement ("a preliminary loss of approximately 8.6 BTC"); the on-chain message Troves sent says "approximately 8.57 WBTC-equivalent was removed". Troves gives no USD figure. Recovered: none reported as of 2026-11-03; Troves offered a 1 WBTC bounty for the return of the remainder.

**OAK Techniques observed:** **OAK-T9.004** (Access Control Misconfiguration — *primary*, operator-stated). Troves says "the exploit involved a legacy rebalancing contract that retained permissions after being replaced". A contract that was no longer meant to act on the vault still held the permission to do so, so the vault accepted a caller it should have rejected. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md). **OAK-T11.013** (Legacy-Version Maintenance Attack Surface — *considered, not assigned*): that Technique is about a deprecated version left in production with a known unpatched flaw; Troves does not say the old contract had a code flaw, only that its permissions were never removed. How the old contract was driven to take the funds is undisclosed.

**Attribution:** **unattributed.** No source names the actor or publishes an attacker address.

**Key teaching point:** **When a contract is replaced, revoking its roles on every vault is part of the migration, and an on-chain check should prove the old address holds none.** Troves revoked "the vulnerable legacy contract and every rebalancer permission on our LST vaults" about 40 minutes after the exploit; the same revocation done at the time of replacement would have left the legacy contract with nothing to call.

## Summary

On 2026-10-31 about 8.57 WBTC-equivalent was removed from the Troves xWBTC/WBTC vault on Starknet. At 14:45 UTC Troves posted that it had identified an exploit of that vault, that it involved a legacy rebalancing contract that retained permissions after being replaced, and that it had revoked the relevant permissions and paused the affected and potentially exposed vaults. At 14:50 UTC DefimonAlerts posted the text of an on-chain message from Troves to the exploiter, offering a 1 WBTC bounty. A later Troves update at 17:15 UTC named the three paused vaults. Troves has promised a detailed postmortem; none had been found at the time of writing.

## Timeline (UTC)

Stages: **Flaw** (a replaced contract keeps its permissions), **Take** (the vault is drained through it), **Money** (destination undisclosed), **Response** (revoke, pause, bounty). Times are from the X post timestamps; the exploit transaction time is not given in any source read.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-31 (date undisclosed) | Troves replaced a rebalancing contract on the xWBTC/WBTC vault. The old contract "retained permissions after being replaced" (Troves). When the replacement happened and which permissions remained are undisclosed. | **T9.004** |
| Before 2026-10-31 (undisclosed) | Preparation by the exploiter: undisclosed. No funding source or deployed contract is published. | — |
| 2026-10-31, before 14:45 (exact time undisclosed) | Exploit transaction on Starknet, per the on-chain message: [`0x0634307777205294f636d481808a7b9a9e208415a26dd19c8ada269b9332e330`](https://starkscan.co/tx/0x0634307777205294f636d481808a7b9a9e208415a26dd19c8ada269b9332e330) ([Voyager](https://voyager.online/tx/0x0634307777205294f636d481808a7b9a9e208415a26dd19c8ada269b9332e330)). About 8.57 WBTC-equivalent left the xWBTC/WBTC vault. Not checked by OAK (Starknet is not supported by `tools/explorer.py`). | **T9.004** |
| After the exploit (undisclosed) | Where the funds went: undisclosed. Troves says it is working "with security partners to trace the funds". | — |
| 2026-10-31, ~40 min after the exploit | Troves revoked the legacy contract and "every rebalancer permission on our LST vaults" (update posted 17:15; first post at 14:45 already says permissions were revoked). | response |
| 2026-10-31 14:45 | Troves announces the exploit, ~8.6 BTC preliminary loss, limited to this vault, vaults paused. | response |
| 2026-10-31 14:49:59 | Troves sends an on-chain message from its Ethereum wallet ([Etherscan](https://etherscan.io/tx/0x6145fc3f07c0c8b903e6daf83e3b1465cad2636c4b04449cac82714347e259e9), traced by OAK: from `0x91926046e148c66869d71b9fa37306e82ddc8934` to `0x911c3bf11dfc5497a53a7a04ff7980532516f176`, no token transfers). It offers a 1 WBTC bounty, return open until 2026-11-03 23:59 UTC. | response |
| 2026-10-31 14:50 | DefimonAlerts posts the text of that message. | response |
| 2026-10-31 17:15 | Troves update: xWBTC/WBTC, xSTRK/STRK and xstrkBTC/strkBTC are paused as a precaution. | response |

Key addresses:

- Exploit transaction (Starknet), per source — [`0x0634307777205294f636d481808a7b9a9e208415a26dd19c8ada269b9332e330`](https://starkscan.co/tx/0x0634307777205294f636d481808a7b9a9e208415a26dd19c8ada269b9332e330)
- Troves recovery wallet (Ethereum) — [`0x91926046e148c66869d71B9Fa37306e82DDc8934`](https://etherscan.io/address/0x91926046e148c66869d71B9Fa37306e82DDc8934). Troves' designated return address, not an attacker address; it sent the on-chain message.
- Recipient of the on-chain message (Ethereum) — [`0x911c3bf11dfc5497a53a7a04ff7980532516f176`](https://etherscan.io/address/0x911c3bf11dfc5497a53a7a04ff7980532516f176) (traced by OAK; identity undisclosed, and the message gives no exploiter address)
- Legacy rebalancing contract, vault contract, exploiter address (Starknet) — undisclosed; no source read publishes them.

## What is not known

- The address of the legacy rebalancing contract, the vault and the exploiter. No source read publishes them.
- Which permission the old contract held, and how the exploiter made it act (a bug in it, a retained key, or another route).
- The exploit time, and when the contract was replaced.
- Where the ~8.57 WBTC-equivalent went, and whether any was returned.
- Whether other vaults held the same retained permission. Troves' first post says no other vault was impacted; its update says it revoked "every rebalancer permission on our LST vaults" and paused two more vaults as a precaution.

## Root-cause evidence

- **Technique:** OAK-T9.004
- **Source:** <https://x.com/trovesfi/status/2116541963755475375>; <https://x.com/trovesfi/status/2116579889986068900>; <https://x.com/DefimonAlerts/status/2116543245211587053>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** The operator's first post states: "The exploit involved a legacy rebalancing contract that retained permissions after being replaced." The mechanism class (stale permission on a replaced contract) is operator-stated; the details are not published and the postmortem was still pending. Defimon's post reproduces Troves' on-chain message and gives the same transaction and figure. RektRadar (secondary, <https://www.rektradar.xyz/web3-daily-exploits-01-nov-2026-premia-465k-troves-legacy-perm/>) repeats the operator's statement and says revocation came "about 40 minutes after discovery"; the operator's own update says "within ~40 min of the exploit", which is what this entry uses.

## Public references

- `[trovesfi2026a]` — Troves (X), "We identified an exploit affecting the Troves xWBTC/WBTC vault" (2026-10-31): <https://x.com/trovesfi/status/2116541963755475375>
- `[trovesfi2026b]` — Troves (X), "Update: within ~40 min of the exploit, we revoked the vulnerable legacy contract" (2026-10-31): <https://x.com/trovesfi/status/2116579889986068900>
- `[trovesfi2026c]` — Troves (X), bounty offer (2026-10-31): <https://x.com/trovesfi/status/2116545053191774295>
- `[defimon2026]` — DefimonAlerts (X), on-chain message text (2026-10-31): <https://x.com/DefimonAlerts/status/2116543245211587053>
- `[rektradar2026]` — RektRadar, "Web3 daily exploits 01 Nov 2026" (secondary): <https://www.rektradar.xyz/web3-daily-exploits-01-nov-2026-premia-465k-troves-legacy-perm/>
