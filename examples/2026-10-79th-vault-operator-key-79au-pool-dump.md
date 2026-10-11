# 79th Vault — the operator key could move 2M project tokens, so stealing it was the same as owning the pool's USDT — 79th Vault (79AU) / BNB Chain — 2026-10-07

**Loss:** **~\$12.5M** — **~16,249 BNB** (16,200 in some reports) realised by selling into the 79AU/USDT PancakeSwap pool, whose USDT reserve fell from **~\$15.2M to ~\$3.9M**. **15,000 BNB (~\$11M) was returned to the team on 2026-10-09** (PeckShield); 30 BNB went to KuCoin; the remainder is unaccounted for. Disposition is recorded as neutral metadata.

**OAK Techniques observed:** **OAK-T15.004** (Operator Credential Compromise — *primary, operator-stated*: the team says an attacker **"obtained its operator's private key … through a flaw in account-permission management."** See [`techniques/T15.004-operator-credential-compromise.md`](../techniques/T15.004-operator-credential-compromise.md)). **OAK-T5.001** (Hard LP Drain — *extraction shape*: the operator hot wallet withdrew **2.01M 79AU** from a contract and sold it back through **~95 trades**, converting privileged supply into the pool's quote asset. The shape is the same whoever holds the key). Defimon's first alert named **insider activity** as an alternative to key theft; OAK records the operator's account and does not exclude it.

**Attribution:** **pseudonymous.** The operator says the attack address is identified and a white-hat settlement under its bug-bounty framework was offered; the return of 15,000 BNB followed.

**Key teaching point:** **A key that can release project-token supply into a pool is a key to the pool's reserves.** The 79AU hot wallet needed no exploit: it held the permission to move 2M tokens, and the AMM paid for them. Rate limits and timelocks on treasury token movements are what bound this, not key hygiene alone.

## Summary

On 2026-10-07 the 79th Vault operator's hot wallet moved 2.01M 79AU out of a contract and sold it into the PancakeSwap 79AU/USDT pool in about 95 trades, draining ~\$11.3M of USDT and converting the proceeds to ~16,249 BNB. The team attributed it to a stolen operator key, repaired the affected permissions, and offered a settlement. On 2026-10-09 the attacker returned 15,000 BNB.

## Public references

- `[tokenpost79thvault2026]` — TokenPost, "79th Vault Says Operator's Private Key Was Compromised in Attack" (2026-10-08): <https://www.tokenpost.com/news/technology/28660>
- `[tokenpost79thvaultloss2026]` — TokenPost, "79thVault Loses About \$12.5 Million After 79AU Tokens Drained on BNB Chain": <https://www.tokenpost.com/news/technology/27869>
- `[kucoin79aureturn2026]` — KuCoin News, "79AU Hot Wallet Attacker Returns 15,000 BNB Worth \$11M" (2026-10-09): <https://www.kucoin.com/news/flash/79au-hot-wallet-attacker-returns-15-000-bnb-worth-11m>
- `[slowmist79thvault2026]` — 79th Vault on X, incident statement (cited by SlowMist Hacked): <https://x.com/79thVault/status/2108244949963833685>
