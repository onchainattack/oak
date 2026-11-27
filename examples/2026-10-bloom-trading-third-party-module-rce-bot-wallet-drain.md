# Bloom Trading — remote code execution through a third-party module drained 49 bot wallets without touching private keys — Bloom (trading bot) / Solana — 2026-10-26

**Loss:** **~9,408 SOL (~\$947K)** from 49 wallets belonging to 9 users, per [Bloom](https://x.com/BloomTrading/status/2114646392010359238). Bitquery counts 48 wallets and ~\$953K ([Bitquery](https://bitquery.io/investigations/bloom-trading-bot-hack)). Bloom says it will reimburse 100%.

**OAK Techniques observed:** **OAK-T15.003** (Operator-Endpoint Compromise — *primary, operator-stated*. Bloom: the attack "exploited a third-party module through a complex Remote Code Execution (RCE) vulnerability"; "No private keys were accessed or compromised". Code running inside Bloom's infrastructure could move custodial bot wallets without exporting keys. See [`techniques/T15.003-operator-endpoint-compromise.md`](../techniques/T15.003-operator-endpoint-compromise.md)). The module is not named. Bitquery's on-chain reconstruction finds each drain was a plain SOL transfer signed by the wallet's own key, and that Bloom holds those keys for its users; this is consistent with server-side code signing for users and in tension with a reading that no key was used ([Bitquery](https://bitquery.io/investigations/bloom-trading-bot-hack)).

**Attribution:** **unattributed.**

**Key teaching point:** **"No keys leaked" is not reassurance when the server signs.** A custodial trading bot whose backend can sign for users is exposed to every dependency running in that backend.

## Summary

Bloom published its findings on 2026-10-26 and is tracing funds ([Bloom](https://x.com/BloomTrading/status/2114646392010359238)). Bitquery places the drain at about 01:03 to 01:04 UTC on 2026-10-26, roughly 94 seconds in total, with all 9,408.21 SOL sitting untouched in one holding wallet as of its 07:34 UTC snapshot ([Bitquery](https://bitquery.io/investigations/bloom-trading-bot-hack)).

## Timeline (UTC)

Bloom's statement gives no clock times, transaction hashes or addresses; Bitquery's reconstruction supplies them. Stages that neither describes are marked undisclosed.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-26 (undisclosed) | A third-party module used in Bloom's infrastructure contains a Remote Code Execution (RCE) flaw. The module is not named and the date it was introduced is not published. | **T15.003** |
| 2026-10-26 01:00:28 | The attacker tests one wallet with a 0.01 SOL transfer, [`4PzAaBNv86D1igC5VVb3JwCxXbb13W7MS6WmUmMq8SFtnZSm8ErhgygKHSsg5exfSCARAH4JLkm6GApRUTCXwZBM`](https://solscan.io/tx/4PzAaBNv86D1igC5VVb3JwCxXbb13W7MS6WmUmMq8SFtnZSm8ErhgygKHSsg5exfSCARAH4JLkm6GApRUTCXwZBM) ([Bitquery](https://bitquery.io/investigations/bloom-trading-bot-hack)). | **T15.003** |
| Before 2026-10-26 (undisclosed) | Preparation (funding, tooling, exploitation of the module) is not published by Bloom. | — |
| 2026-10-26 01:03:07 to 01:04:41 | Wallets of 9 users are drained, largest balance first, about 9,408 SOL in total ([Bitquery](https://bitquery.io/investigations/bloom-trading-bot-hack)). Bloom says the attack exploited a third-party module and that no private keys were accessed or compromised ([Bloom](https://x.com/BloomTrading/status/2114646392010359238)). First full drain: [`5qXWqiDfgQ8ixdVPXMA2w9NAymFu8KWeXDFi7NWJ7RDbZysyPXLWJrkz41dQFUQ5nNxJWeT3xBLZSsbsFrkfdSiR`](https://solscan.io/tx/5qXWqiDfgQ8ixdVPXMA2w9NAymFu8KWeXDFi7NWJ7RDbZysyPXLWJrkz41dQFUQ5nNxJWeT3xBLZSsbsFrkfdSiR); last: [`25uyG7WYrC4p3UWGKKKjgNTDsQvoyjqPE5QoMzqqF77QrqpV1qH4GmFz952tzXN2yjWD4zabHPZbSDvHaYa4gYRM`](https://solscan.io/tx/25uyG7WYrC4p3UWGKKKjgNTDsQvoyjqPE5QoMzqqF77QrqpV1qH4GmFz952tzXN2yjWD4zabHPZbSDvHaYa4gYRM). | **T15.003** |
| 2026-10-26 04:30:56 | The attacker consolidates 9,408.21 SOL into a holding wallet in [`ADe8xTkY71BXz5ehqWhxqpgsGyFqzhw6dH1FNbURrj4G9hQMcQAWunKULWMGzimJQh47CPYJkpdL4xveMqK9Fvi`](https://solscan.io/tx/ADe8xTkY71BXz5ehqWhxqpgsGyFqzhw6dH1FNbURrj4G9hQMcQAWunKULWMGzimJQh47CPYJkpdL4xveMqK9Fvi) ([Bitquery](https://bitquery.io/investigations/bloom-trading-bot-hack)). | — |
| 2026-10-26 07:34 | Bitquery's snapshot: all SOL still untouched in the holding wallet; no exchange, bridge or mixer touched it ([Bitquery](https://bitquery.io/investigations/bloom-trading-bot-hack)). Later movement is undisclosed. Bloom says it is tracing the funds and exploring recovery and freezing options. | — |
| 2026-10-26 09:12 | Bloom publishes its statement: attack vector identified, scope confirmed at 49 wallets of 9 users, broader wallet exposure ruled out, and 100% reimbursement promised to secure wallets designated by the affected users. | response |

Key addresses (from [Bitquery](https://bitquery.io/investigations/bloom-trading-bot-hack)):

- Attacker collecting wallet — [`7kY8qx8MqJ7Rz2vMhgHETdZLHcTp1oM78AA9dmE9p8BQ`](https://solscan.io/account/7kY8qx8MqJ7Rz2vMhgHETdZLHcTp1oM78AA9dmE9p8BQ)
- Attacker holding wallet (9,408.21 SOL) — [`6nYyCzJJzErbmfxvXqzbAqwoBzNvXUiwr15KCkcgmoe9`](https://solscan.io/account/6nYyCzJJzErbmfxvXqzbAqwoBzNvXUiwr15KCkcgmoe9)

## Root-cause evidence

- **Technique:** OAK-T15.003
- **Source:** <https://x.com/BloomTrading/status/2114646392010359238>
- **Source type:** operator
- **Confidence:** reported
- **Evidence:** Bloom names RCE via a third-party module and rules out key compromise; the module and vulnerability are undisclosed. Bitquery, an independent on-chain analysis, shows wallet-key-signed plain transfers and says the cause is unconfirmed, so the mechanism stays operator-stated.

## Public references

- `[bloomstatement2026]` — Bloom on X (2026-10-26): <https://x.com/BloomTrading/status/2114646392010359238>
- Bitquery, on-chain reconstruction (2026-10-26): <https://bitquery.io/investigations/bloom-trading-bot-hack>
