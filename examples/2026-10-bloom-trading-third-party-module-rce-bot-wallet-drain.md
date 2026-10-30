# Bloom Trading — remote code execution through a third-party module drained 49 bot wallets without touching private keys — Bloom (trading bot) / Solana — 2026-10-26

**Loss:** **~9,408 SOL (~\$947K)** from 49 wallets belonging to 9 users. Bloom says it will reimburse 100%.

**OAK Techniques observed:** **OAK-T15.003** (Operator-Endpoint Compromise — *primary, operator-stated*. Bloom: the attack "exploited a third-party module through a complex Remote Code Execution (RCE) vulnerability"; "No private keys were accessed or compromised". Code running inside Bloom's infrastructure could move custodial bot wallets without exporting keys. See [`techniques/T15.003-operator-endpoint-compromise.md`](../techniques/T15.003-operator-endpoint-compromise.md)). The module is not named.

**Attribution:** **unattributed.**

**Key teaching point:** **"No keys leaked" is not reassurance when the server signs.** A custodial trading bot whose backend can sign for users is exposed to every dependency running in that backend.

## Summary

Bloom published its findings on 2026-10-26 and is tracing funds.

## Root-cause evidence

- **Technique:** OAK-T15.003
- **Source:** <https://x.com/BloomTrading/status/2114646392010359238>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** Bloom names RCE via a third-party module and rules out key compromise; the module and vulnerability are undisclosed.

## Public references

- `[bloomstatement2026]` — Bloom on X (2026-10-26): <https://x.com/BloomTrading/status/2114646392010359238>
