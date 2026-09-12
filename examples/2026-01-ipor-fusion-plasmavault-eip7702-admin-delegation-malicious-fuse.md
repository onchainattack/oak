# IPOR Fusion — the admin account had delegated itself to a contract that would call anything, and a legacy vault would run any module it was handed — IPOR Fusion PlasmaVault / Arbitrum — 2026-01-06

**Loss:** **336,000 USDC** — the full balance of one **legacy PlasmaVault** on Arbitrum. Roughly **\$267,000** moved through an intermediary wallet into **Tornado Cash**. **Hexagate** and **Blockaid** alerted the IPOR team the same day. IPOR **refunded every affected depositor from its treasury**; the vault represented **under 1% of assets** on the Fusion platform, and the exploited configuration was confined to **vaults deployed before stricter fuse-validation rules** were introduced.

**OAK Techniques observed:** **OAK-T13.004** (EIP-7702 Delegation Abuse — *primary structural condition*, and an unusual instance of it: the delegation being abused belonged to **the protocol's own administrator account**, not to a phished user. The admin had delegated to a contract exposing **an arbitrary-call function**, so anything able to reach that path inherited admin-authorised execution. See [`techniques/T13.004-eip7702-delegation-abuse.md`](../techniques/T13.004-eip7702-delegation-abuse.md)). **OAK-T9.004** (Access-Control Misconfiguration — the second half, without which the first is inert: the vault's **`instantWithdraw`** lacked validation, letting **unauthenticated fuses** — the pluggable modules that execute withdrawals — run arbitrary code. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). **OAK-T11.013** (Legacy-Version Maintenance Attack Surface — the vault predated Fusion's stricter fuse-authorisation model and kept running under the old rules while the platform's current vaults enforced explicit validation). **OAK-T7.001** (Mixer-Routed Hop — ~\$267K to Tornado Cash).

**Attribution:** **pseudonymous.** On-chain identifiers only; no named individual, group, or link to a tracked OAK actor.

**Key teaching point:** **EIP-7702 moved account abstraction into ordinary EOAs, which means an operator key can now be a smart contract with whatever behaviour someone attached to it — and the protocol's own admin is the account where that matters most.** The corpus's other 7702 entries are user-side: a victim signs a delegation and a sweeper empties their wallet. This one inverts it. Nobody phished IPOR. The administrator delegated to a helper that could make arbitrary calls — operationally convenient, and a standing grant of *the admin's authority* to anything that could route through it. Combined with a vault that would execute an unvalidated module, the two produced a path that neither defect opens alone. The reusable controls are specific: **enumerate what your privileged accounts have delegated to and treat a delegate with an arbitrary-call function as equivalent to publishing the key**; and **a pluggable-module architecture must authorise the module, not the caller** — "which fuse is this, and did we approve it?" is the check, and the legacy vaults were the ones that never asked.

## Summary

**IPOR Fusion** is a vault platform; a **PlasmaVault** executes strategies through **fuses** — pluggable modules that carry out operations such as withdrawals. Newer vaults require **explicit authorisation and validation** for any fuse execution. Vaults deployed before that model was introduced did not.

Two conditions existed at once on **2026-01-06**. First, one legacy vault's **`instantWithdraw`** path **did not validate the fuse it was handed**, so an unauthenticated module could execute arbitrary logic inside the vault's context. Second, the **administrator account had delegated under EIP-7702 to a contract carrying an arbitrary-call function** — a smart-account convenience that turned the admin's authority into something reachable by whatever could drive that contract.

The attacker combined them: **inject a malicious fuse into the vault**, then activate it. The fuse initiated withdrawals with no authorisation check standing in the way and moved the vault's entire **336,000 USDC** to an attacker-controlled address. About **\$267,000** was routed onward through an intermediary wallet into **Tornado Cash**.

**Hexagate** and **Blockaid** flagged the draining transactions to IPOR the same day. IPOR confirmed the scope was limited to legacy vaults, stated that current Fusion vaults' fuse-authorisation rules make the same path impossible, and **refunded all affected depositors from treasury**.

## Timeline (UTC, 2026-01-06 unless noted)

| When | Event | OAK ref |
|---|---|---|
| (standing) | Legacy PlasmaVault runs with an **`instantWithdraw`** path that **does not validate the fuse**; newer vaults require explicit fuse authorisation | **standing T11.013 + T9.004 condition** |
| (standing) | The **administrator account delegates under EIP-7702** to a contract exposing an **arbitrary-call function** | **standing T13.004 condition** |
| 2026-01-06 | Attacker **injects a malicious fuse** into the legacy vault and activates it | **T13.004 + T9.004 exploitation** |
| same window | Fuse initiates unauthorised withdrawals; **336,000 USDC** leaves the vault | (extraction) |
| same window | **~\$267,000** routed via an intermediary wallet into **Tornado Cash** | **T7.001** |
| 2026-01-06 | **Hexagate** and **Blockaid** alert IPOR to the draining transactions | (external detection, same day) |
| after | IPOR confirms scope limited to pre-standard legacy vaults (<1% of platform assets) and **refunds all depositors from treasury** | (operator response) |

## What defenders observed

- **Two defects, neither sufficient alone, and that is the pattern worth carrying.** An unvalidated fuse path with a well-behaved admin delegate is a bug waiting for a privilege it cannot get. An admin delegating to an arbitrary-call contract, in a platform where every vault validates its modules, is bad practice with no exit. **Composition is what made this exploitable**, which is why single-finding severity ratings keep under-pricing this class — the same observation the corpus records at Dream Health Chain and RedSonic.
- **The delegation surface of privileged accounts is enumerable and almost nobody enumerates it.** Post-Pectra, any EOA can carry delegated code, including operator keys. The question *"what have our admin, deployer and treasury accounts delegated to, and what can that code do?"* is answerable from chain state at any moment, and the answer changes without a contract deployment or a governance vote.
- **This is EIP-7702 abuse pointed at a protocol rather than at a user.** OAK's existing 7702 entries — the CrimeEnjoyor sweeper population, the delegation-phishing cohorts — all describe a user tricked into signing. Recording an operator-side instance matters because the mitigation is different in kind: user-side is a signing-UX and wallet-warning problem, operator-side is a **key-management policy** problem, and the control is an inventory rather than a prompt.
- **Same-day third-party detection, and none of it was the protocol's own.** Hexagate and Blockaid caught the draining transactions. Monitoring bought the containment, not the vault's own checks — worth stating plainly, because the reimbursement makes this look like a well-handled incident and the handling started with an outside alert.
- **"Legacy" here means eleven months, not five years.** Fusion's stricter fuse-authorisation rules postdate the vault; the vault kept operating under the older model with real deposits in it. The T11.013 lesson repeats: **a security-model upgrade that is not applied retroactively creates a population of contracts running the exact configuration you decided was unsafe.**

## Public references

- `[cryptotimesipor2026]` — The Crypto Times, "IPOR's Fusion PlasmaVault Hit by \$336K Exploit via EIP-7702 Flaw" (2026-01-07; the missing `instantWithdraw` validation, the admin account's delegation to a contract with an arbitrary-call function, and the malicious fuse injection): <https://www.cryptotimes.io/2026/01/07/ipors-fusion-plasmavault-hit-by-336k-exploit-via-eip-7702-flaw/>
- `[phemexipor2026]` — Phemex News, "Security Flaw in IPOR's Fusion Allows Exploit of Plasma Vault" (unauthenticated fuses running arbitrary code; scope confined to legacy vaults): <https://phemex.com/news/article/security-flaw-in-ipors-fusion-allows-exploit-of-plasma-vault-51824>
- `[cryptonewsipor2026]` — CryptoNews, "IPOR Labs Loses \$336K in Arbitrum Vault Exploit, Vows Full Refund" (Hexagate and Blockaid alerts on 2026-01-06; ~\$267K through Tornado Cash; full depositor refund from treasury; under 1% of platform assets): <https://cryptonews.com/news/ipor-labs-loses-336k-in-arbitrum-vault-exploit-vows-full-refund/>

## Discussion

OAK's account-abstraction coverage for 2026 has been shaped by volume: paymaster griefing at bundler scale, and the **CrimeEnjoyor** delegation-phishing population where over 97% of observed EIP-7702 delegations point at sweeper contracts. Both describe abstraction as a **retail** hazard — a user signs something, a drainer collects.

IPOR is the operator-side counterpart, and the corpus needed one. The delegation that mattered was the **protocol's own administrator's**, configured deliberately, presumably for convenience, and it converted an ordinary missing-validation bug in a legacy vault into a full drain. The distinction OAK should keep when this class grows: **whose account carries the delegation** determines both the blast radius and the mitigation. A user delegation costs that user their balance and is addressed at the wallet-warning layer. An operator delegation costs whatever that operator can authorise and is addressed by key-management policy — specifically, by treating *delegate code* as part of the key's attack surface and inventorying it on the same schedule as signer lists and multisig membership.

For contributors: when documenting a 7702 incident, record **the delegating account's role** (user, operator, deployer, treasury) and **what the delegate contract can do** as separate fields. The corpus currently has three 2026 entries in this Tactic and they differ almost entirely along those two axes rather than along the mechanism.
