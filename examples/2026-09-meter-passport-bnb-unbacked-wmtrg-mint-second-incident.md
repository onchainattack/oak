# Meter Passport — the same bridge mints unbacked wrapped tokens on BNB Chain four and a half years after the first time — Meter Passport / BNB Smart Chain — 2026-09-24

**Loss:** **~\$2.3M** of **unbacked wrapped MTRG** minted on BNB Chain across **~2 transactions** per Blockaid, part of it **sold on PancakeSwap**; one linked address was reported holding ~\$1.18M. Realised loss depends on what the sales cleared and is not published. Addresses reported: `0xEe2EEEED4Ed8580669ED924abEb49f27f7D0Bd65`, `0x7db6ac6Fa3c8aa2c6FB9BdCD4800e8BAacDd2EE8`; wMTRG at `0xbd2949f67dcdc549c6ebe98696449fa79d988a9f`.

**OAK Techniques observed:** **OAK-T10.002** (Message-Verification Bypass — *class inferred from effect, mechanism undisclosed*. Wrapped MTRG was minted on the destination chain **without the underlying being locked on the source**, which is the T10.002 effect. **Meter has published nothing on the cause** and did not respond to press; whether the fault is in message validation, a signer, or a handler is unknown. OAK follows the Symbiosis (2026-09) precedent: class recorded, mechanism marked undisclosed. See [`techniques/T10.002-message-verification-bypass.md`](../techniques/T10.002-message-verification-bypass.md)). **OAK-T5.003** (Hidden-Mint Dilution — effect-side, for the unbacked supply dumped into PancakeSwap).

**Attribution:** **pseudonymous.**

**Key teaching point:** **The second incident on the same bridge is the one that says the first fix was local.** Meter Passport lost ~\$4.3M in February 2022 when a deposit handler trusted caller-supplied data about what had been deposited ([`2022-02-meter-bridge.md`](2022-02-meter-bridge.md)). Whatever the 2026 root cause turns out to be, the invariant that failed both times is the same — **destination supply must not exceed source lockup** — and it is checkable continuously from outside the bridge. A supply-vs-lockup monitor with an automatic mint pause would have stopped this at the first transaction.

## Summary

On 2026-09-24 Blockaid detected an attacker minting wrapped MTRG on BNB Chain through Meter Passport without any underlying deposit — ~\$2.3M across about two transactions — and selling part of it on PancakeSwap. Meter has not described the cause. This is the bridge's second unbacked-mint incident after February 2022.

## Timeline (UTC, 2026-09-24)

| When | Event | OAK ref |
|---|---|---|
| — | Attacker mints wMTRG via Passport with no source lockup (~2 txs, ~\$2.3M) | **T10.002 (effect)** |
| — | Part sold on PancakeSwap | **T5.003** |
| — | Blockaid alerts; attack described as ongoing | (detection) |

## Public references

- `[blockaidmeter2026]` — Blockaid on X, Meter Passport exploit alert: <https://x.com/blockaid_/status/2103121249706877178>
- `[cryptotimesmeter2026]` — The Crypto Times, "Meter Passport Exploit Reportedly Mints \$2.3 Million in Unbacked MTRG" (2026-09-24; addresses; no response from Meter): <https://www.cryptotimes.io/2026/09/24/meter-passport-exploit-reportedly-mints-2-3-million-in-unbacked-mtrg/>
- `[phemexmeter2026]` — Phemex News, "Meter Exploit: \$2.3M Unbacked MTRG Minted on BNB Chain": <https://phemex.com/news/article/meter-protocol-under-active-exploit-on-bnb-chain-as-attacker-mints-23m-in-unbacked-tokens-97771>

Revision trigger: any Meter post-mortem.
