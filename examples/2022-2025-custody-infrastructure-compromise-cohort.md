# Custody Infrastructure Compromise Cohort — 2022–2025

**OAK Techniques observed:** OAK-T11.003, OAK-T11.004

**Attribution:** **unattributed** (aggregate cohort).
**Loss:** T11.003 ~$234.9M (WazirX / Liminal multisig, July 2024) + ~$285M (Drift Protocol durable-nonces DPRK exploit, April 2026 — Solana-native analogue); T11.004 ~$160M (Wintermute Profanity, September 2022) + ~$3.3M+ (non-Wintermute Profanity cohort, September–December 2022) + multi-year cohort tail through 2023–2024.

**Key teaching point:** Both Techniques represent custody-side failures where the loss mechanism operates at the *key-management infrastructure layer* rather than at the on-chain contract-correctness layer. T11.003 modifies the smart contract controlling the multisig itself to reshape the authorisation predicate; T11.004 exploits a cryptographically-defective key-generation tool to recover private keys offline. Neither requires ongoing user interaction — once the multisig is modified (T11.003) or the private key is recovered (T11.004), extraction is a direct on-chain transfer indistinguishable from a legitimate signed transaction.

## Summary

## Timeline

T11.003 from 2024-07 (WazirX canonical); T11.004 from 2022-09 (Profanity disclosure by 1inch, Wintermute ~$160M canonical).

## T11.003 — In-Use Multisig Smart-Contract Manipulation

The attacker, having obtained partial signing authority, modifies the smart contract controlling the multisig itself — changing the signer set, replacing the multisig's logic, or upgrading a proxy to attacker-controlled implementation logic. Once modified, subsequent extractions require no further signatures from the legitimate signer set.

Canonical case: **WazirX / Liminal multisig — Ethereum — 2024-07-18 — ~$234.9M.** The multisig used a 3-of-5 + 1 authorisation predicate (5 WazirX signers + 1 Liminal Custody signer). The attackers obtained partial multisig access via the third-party custody surface (T11.001 entry vector), then altered the smart contract controlling the multisig so that further extractions did not require additional WazirX signatures. G01 Lazarus Group attribution. See `examples/2024-07-wazirx.md`.

Solana-native analogue: **Drift Protocol durable-nonces exploit — April 2026 — ~$285M.** Security-Council members tricked into pre-signing durable-nonce transactions that subsequently transferred admin authority. See `examples/2026-04-drift-protocol-durable-nonces-dprk.md`.

The defender's signal is the **contract-modification event** — monitor multisig-modification and proxy-upgrade events at known custodial-multisig contracts.

## T11.004 — Insufficient-Entropy Key Generation

The off-chain key-generation tool seeds its CSPRNG with materially less entropy than the curve floor (32-bit seed against a 256-bit curve for the canonical Profanity case), reducing the effective private-key search space from ~2^256 to a brute-forceable ~2^32. Once the entropy collapse is disclosed, affected keys can be recovered offline by any sufficiently-resourced attacker — GPU-feasible in hours-to-days.

Canonical cases:

- **Wintermute — Ethereum — 2022-09-20 — ~$160M.** Wintermute used the Profanity vanity-address generator for a gas-saving leading-zeros vault admin address. After the 1inch disclosure (2022-09-15), Wintermute moved ETH out of the directly-exposed hot wallet but did not revoke admin authority; the attacker extracted via the un-rotated admin path. See `examples/2022-09-wintermute.md`.
- **Profanity vanity-address cohort — Ethereum — 2022-09 to 2022-12 — ~$3.3M+.** Non-Wintermute Profanity-affected wallets drained by multiple pseudonymous attackers. See `examples/2022-09-wintermute-profanity-cohort.md`.
- **Profanity cohort tail — 2023–2024.** Continued sporadic extractions from un-rotated Profanity-affected addresses, including DeFi protocol deployer addresses with un-rotated admin authority. See `examples/2024-03-ether-fi-profanity-entropy-cohort.md`.

The half-life-of-known-vulnerability-after-disclosure is the load-bearing operational metric: even after a high-profile disclosure with explicit rotation guidance, a non-trivial fraction of affected addresses remain un-rotated and continue to be drained over a long tail.

## Public references

- `[wazirxwiki2024]` — WazirX multisig compromise
- `[crystalwazirx2024]` — Crystal Blockchain WazirX analysis
- `[drift2026durable]` — Drift Protocol durable-nonces exploit
- `[1inchprofanity2022]` — 1inch Profanity vanity-address generator disclosure (32-bit seed)
- `[halbornwintermute2022]` — Halborn Wintermute post-mortem
