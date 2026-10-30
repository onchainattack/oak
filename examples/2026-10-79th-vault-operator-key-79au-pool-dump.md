# 79th Vault — the operator key could move 2M project tokens, so stealing it was the same as owning the pool's USDT — 79th Vault (79AU) / BNB Chain — 2026-10-07

**Loss:** **~\$12.5M** — **~16,249 BNB** (16,200 in some reports) realised by selling into the 79AU/USDT PancakeSwap pool, whose USDT reserve fell from **~\$15.2M to ~\$3.9M**. **15,000 BNB (~\$11M) was returned to the team on 2026-10-09** (PeckShield); 30 BNB went to KuCoin; the remainder is unaccounted for. Disposition is recorded as neutral metadata.

**OAK Techniques observed:** **OAK-T11.014** (Operator Privileged-Key Compromise — *primary, operator-stated*: the team says an attacker **"obtained its operator's private key … through a flaw in account-permission management."** See [`techniques/T11.014-operator-privileged-key-compromise.md`](../techniques/T11.014-operator-privileged-key-compromise.md)). **OAK-T5.001** (Hard LP Drain — *extraction shape*: the operator hot wallet withdrew **2.01M 79AU** from a contract and sold it back through **~95 trades**, converting privileged supply into the pool's quote asset. The shape is the same whoever holds the key). Defimon's first alert named **insider activity** as an alternative to key theft; OAK records the operator's account and does not exclude it.

**Re-mapped 2026-10-11:** primary Technique moved from T15.004 to [`T11.014-operator-privileged-key-compromise`](../techniques/T11.014-operator-privileged-key-compromise.md).

**Attribution:** **pseudonymous.** The operator says the attack address is identified and a white-hat settlement under its bug-bounty framework was offered; the return of 15,000 BNB followed.

**Key teaching point:** **A key that can release project-token supply into a pool is a key to the pool's reserves.** The 79AU hot wallet needed no exploit: it held the permission to move 2M tokens, and the AMM paid for them. Rate limits and timelocks on treasury token movements are what bound this, not key hygiene alone.

## Summary

On 2026-10-07 the 79th Vault operator's hot wallet moved 2.01M 79AU out of a contract and sold it into the PancakeSwap 79AU/USDT pool in about 95 trades, draining ~\$11.3M of USDT and converting the proceeds to ~16,249 BNB. The team attributed it to a stolen operator key, repaired the affected permissions, and offered a settlement. On 2026-10-09 the attacker returned 15,000 BNB.

## Timeline (UTC)

Read it as three stages. **Get in**: an operator key is obtained through weak account-permission management. **Take**: the operator wallet moves 79AU out of the pool contract and sells it back into the pool. **Move and respond**: proceeds become BNB, most of it is later returned.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-07 (undisclosed) | An attacker obtains an operator's private key "through a flaw in account-permission management" (79th Vault statement). How the key was obtained is not published. Defimon's first alert named insider activity as an alternative. The 79AU contract has an `OPERATOR_ROLE`-only function that can move tokens from the pool and update its reserves. | **T11.014** |
| 2026-10-07 07:25–08:25 | The operator wallet moves 2.01M 79AU out of the pool in seven transactions (10,000; 100,000; 100,000; 300,000; 500,000; 500,000; 500,000) to another address (TokenPost; KuCoin News citing PeckShield). | **T11.014** |
| 2026-10-07 (same window) | The 79AU is sold back into the 79AU/USDT PancakeSwap pool in about 95 transactions. The pool's USDT reserve falls from about \$15.2M to \$3.9M and the price spikes briefly (TokenPost). | **T5.001** |
| 2026-10-07 | The USDT is converted on-chain into 16,249 BNB, sent to a separate address. The operator wallet sends a further 3.79 BNB to the same address 41 seconds later (TokenPost). | — |
| 2026-10-07 | The `OPERATOR_ROLE` permission is revoked afterwards (TokenPost). | response |
| 2026-10-08 | 79th Vault publishes a statement: permissions repaired and reviewed, attack addresses identified, a white-hat settlement offered under its bug-bounty framework, the other party has replied (79th Vault on X). | response |
| 2026-10-09 | The attacker returns 15,000 BNB (about \$11M) to the project's designated wallet, and had sent 30 BNB to KuCoin. The rest is unaccounted for (PeckShield via KuCoin News). | response |

Key addresses:

- Operator hot wallet (compromised) — full address not published
- Receiving address for the withdrawn 79AU and the 16,249 BNB — full address not published
- 79AU contract and 79AU/USDT PancakeSwap pool — full addresses not published
- Project wallet that received the returned 15,000 BNB — full address not published

## Root-cause evidence

- **Technique:** OAK-T11.014
- **Source:** <https://www.tokenpost.com/news/technology/28660>; <https://x.com/79thVault/status/2108244949963833685>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** 79th Vault states an attacker obtained its operator's private key through a flaw in account-permission management and used it to move 79AU into the pool. Defimon's insider alternative is not excluded by the operator's account.

## Public references

- `[tokenpost79thvault2026]` — TokenPost, "79th Vault Says Operator's Private Key Was Compromised in Attack" (2026-10-08): <https://www.tokenpost.com/news/technology/28660>
- `[tokenpost79thvaultloss2026]` — TokenPost, "79thVault Loses About \$12.5 Million After 79AU Tokens Drained on BNB Chain": <https://www.tokenpost.com/news/technology/27869>
- `[kucoin79aureturn2026]` — KuCoin News, "79AU Hot Wallet Attacker Returns 15,000 BNB Worth \$11M" (2026-10-09): <https://www.kucoin.com/news/flash/79au-hot-wallet-attacker-returns-15-000-bnb-worth-11m>
- `[slowmist79thvault2026]` — 79th Vault on X, incident statement (cited by SlowMist Hacked): <https://x.com/79thVault/status/2108244949963833685>
