# Pirate Chain — two validation failures let a transaction create ~39.8M ARRR, ~20% of supply, eleven days after the Ironwood upgrade — Pirate Chain (ARRR) / Pirate Chain L1 — 2026-10-14

**Loss:** **~39.8M ARRR minted without authorisation (~20% of supply).** SlowMist's tracker values it at ~\$10.7M; the amount actually realised is unknown, because the coins went straight into the Sapling shielded pool. NonKYC restricted an account that received related deposits. Pirate Chain has not reported loss of existing user balances beyond the dilution.

**OAK Techniques observed:** **OAK-T9.014** (Protocol-Client Consensus Bug — *primary*, per the project. Pirate Chain: *"a transaction validation vulnerability in Pirate Chain source code … allowed the unauthorized creation of approximately 39.8 million ARRR"*, combining **"two validation failures bypassing the issuance check and incorrect interpretation of the output scripts."** The flaw sat in the new transparent supply-accounting layer around Ironwood's turnstile, activated 2026-10-03. The project says notary keys and the shielded-pool cryptography are not compromised. See [`techniques/T9.014-protocol-client-consensus-bug.md`](../techniques/T9.014-protocol-client-consensus-bug.md)).

**Attribution:** **pseudonymous.**

**Key teaching point:** **A turnstile only protects supply if every path into the pool goes through it.** The upgrade added accounting meant to stop a shielded pool paying out more than entered it; a transaction that both skipped the issuance check and was mis-parsed at its outputs created coins the turnstile never saw, and moved them where nobody can follow. New consensus code next to a shielded pool deserves the same scrutiny as the cryptography, because the shielding hides the evidence afterwards.

## Summary

On 2026-10-14 developers found the unauthorised issuance and announced a rollback to 20:00 UTC that day, asking exchanges to suspend ARRR deposits and withdrawals. On 2026-10-15 the team withdrew the rollback: *"Because Pirate Chain is decentralized, it is not possible to freeze the network or unilaterally rollback its blockchain history."* dPoW notaries suspended notarisations, exchanges and pools were asked to pause, and users were asked not to move funds while a recovery plan and post-mortem are prepared.

## Root-cause evidence

- **Technique:** OAK-T9.014
- **Source:** <https://x.com/PirateChain/status/2110774266123767871>
- **Source type:** operator
- **Confidence:** reported
- **Evidence:** Pirate Chain states a transaction-validation flaw combining an issuance-check bypass and mis-interpreted output scripts minted ~39.8M ARRR. The technical post-mortem is still to come, so the exact code path is not yet published.

## Public references

- `[piratechainupdate2026]` — Pirate Chain on X, "Pirate Chain Import Exploit Update" (2026-10-15): <https://x.com/PirateChain/status/2110774266123767871>
- `[piratechainrollback2026]` — Pirate Chain on X, initial rollback notice (2026-10-15): <https://x.com/PirateChain/status/2110556351948595344>
- `[cryptotimespirate2026]` — The Crypto Times, "Pirate Chain Exploit Mints 39.8M ARRR, Rollback Plan Dropped" (2026-10-16): <https://www.cryptotimes.io/2026/10/16/pirate-chain-exploit-mints-39-8m-arrr-rollback-plan-dropped/>
- `[cryptobriefingpirate2026]` — Crypto Briefing, "Pirate Chain exploit mints around 39.8 million ARRR, team proposes rollback" (2026-10-15): <https://cryptobriefing.com/pirate-chain-exploit-arrr-rollback/>
