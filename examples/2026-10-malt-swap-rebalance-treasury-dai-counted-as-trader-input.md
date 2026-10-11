# MALT — the swap's own rebalancing pulled DAI from the treasury, and the swap counted it as the trader's payment — MALT / EVM — 2026-10-03

**Loss:** **~\$72K.** The project says the flaw is fixed and affected users will be compensated.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*, per SlowMist. During a swap, rebalancing withdrew DAI from MALT's **Capital Source** and returned it to the pool; the swap's invariant check then read **post-hook balances** and treated that treasury DAI as caller-supplied input, so a small input bought out-sized MALT. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)).

**Re-mapped 2026-10-11:** primary Technique moved from T9.004 to [`T9.016-contract-accounting-state-invariant-flaw`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md).

**Attribution:** **pseudonymous.**

**Key teaching point:** **Measure what the trader paid before anything else touches the balance.** An invariant checked after an internal hook can be satisfied by the protocol's own money.

## Summary

On 2026-10-03 an attacker made small-input swaps on MALT that triggered rebalancing from the Capital Source; the treasury DAI returned to the pool was counted toward the swap's input check, letting the attacker take out more MALT than paid for. Losses were ~\$72K; the project patched and pledged compensation.

## Public references

- `[cryptonewsmalt2026]` — Cryptonews.net, "MALT Loses \$72K After Flawed Swap Lets Attacker Tap Treasury DAI" (2026-10-03): <https://cryptonews.net/news/security/33535167/>
- `[slowmistmalt2026]` — SlowMist on X, MALT alert: <https://x.com/SlowMist_Team/status/2106418632041668784>
