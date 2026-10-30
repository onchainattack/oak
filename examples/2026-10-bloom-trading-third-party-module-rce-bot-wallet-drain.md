# Bloom Trading — remote code execution through a third-party module drained 49 bot wallets without touching private keys — Bloom (trading bot) / Solana — 2026-10-26

**Loss:** **~9,408 SOL (~\$947K)** from 49 wallets belonging to 9 users. Bloom says it will reimburse 100%.

**OAK Techniques observed:** **OAK-T15.003** (Operator-Endpoint Compromise — *primary, operator-stated*. Bloom: the attack "exploited a third-party module through a complex Remote Code Execution (RCE) vulnerability"; "No private keys were accessed or compromised". Code running inside Bloom's infrastructure could move custodial bot wallets without exporting keys. See [`techniques/T15.003-operator-endpoint-compromise.md`](../techniques/T15.003-operator-endpoint-compromise.md)). The module is not named.

**Attribution:** **unattributed.**

**Key teaching point:** **"No keys leaked" is not reassurance when the server signs.** A custodial trading bot whose backend can sign for users is exposed to every dependency running in that backend.

## Summary

Bloom published its findings on 2026-10-26 and is tracing funds.

## Timeline (UTC)

Bloom's statement is the only source, and it gives no clock times, transaction hashes or addresses. Stages that it does not describe are marked undisclosed.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-26 (undisclosed) | A third-party module used in Bloom's infrastructure contains a Remote Code Execution (RCE) flaw. The module is not named and the date it was introduced is not published. | **T15.003** |
| Before 2026-10-26 (undisclosed) | Preparation by the attacker (funding, tooling) is not published. | — |
| Before 2026-10-26 (undisclosed) | The attacker exploits the module and moves funds out of 49 bot wallets belonging to 9 users, about 9,408 SOL (about \$947K). Bloom says no private keys were accessed or compromised, so the code ran where it could move the custodial bot wallets without exporting keys. Transactions are not published. | **T15.003** |
| Undisclosed | Where the stolen SOL went (swaps, bridges, exchange deposits, holding address) is not published. Bloom says it is tracing the funds and exploring recovery and freezing options. | — |
| 2026-10-26 09:12 | Bloom publishes its statement: attack vector identified, scope confirmed at 49 wallets of 9 users, broader wallet exposure ruled out, and 100% reimbursement promised to secure wallets designated by the affected users. | response |

## Root-cause evidence

- **Technique:** OAK-T15.003
- **Source:** <https://x.com/BloomTrading/status/2114646392010359238>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** Bloom names RCE via a third-party module and rules out key compromise; the module and vulnerability are undisclosed.

## Public references

- `[bloomstatement2026]` — Bloom on X (2026-10-26): <https://x.com/BloomTrading/status/2114646392010359238>
