# Ronin Bridge upgrade initialization failure — Ronin / Ethereum — 2024-08-06

**Loss:** approximately \$12M temporarily extracted from the Ronin Bridge on 2024-08-06 (The Block: ~\$11.8M; roughly 4,000 ETH and 2M USDC, the USDC amount being the per-transaction withdrawal maximum). **Recovery:** full — an MEV bot front-ran other actors' manual attempts to exploit the flaw and withdrew the funds first; its operators then returned them (ETH first, USDC a couple of hours later) and Ronin paid a \$500K bug bounty. This entry covers both the vulnerability and the rescue (a duplicate rescue-only entry was merged into it on 2026-10-11).
**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary*. The 2024-08-06 upgrade skipped `initializeV3`, leaving `_totalOperatorWeight` and `minimumVoteWeight` at zero, so the bridge's withdrawal authorisation check accepted any signature set (Halborn). The predicate existed and ran; it was evaluated against an uninitialised threshold. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). **Not T10.001:** no validator or signer key was compromised.

**Re-mapped 2026-10-11:** primary Technique moved from T10.001 (no key was compromised) to [`T9.004-access-control-misconfiguration`](../techniques/T9.004-access-control-misconfiguration.md).
**Attribution:** **pseudonymous.** The actors who withdrew the funds were an MEV bot whose operators behaved as white hats and returned the funds; the operators are not identified in the sources reviewed. No state-actor attribution.

**Corrected 2026-10-11:** Mechanism corrected from an un-gated `upgradeTo`/malicious implementation to a skipped `initializeV3` call that left `minimumVoteWeight` at 0 (Halborn); per-transaction cap and \$500K bounty added; the unverified "~80 minutes" return window and unsourced third-party write-ups removed.

**Key teaching point:** **A proxy upgrade that ships an initializer but never calls it can silently zero a security threshold.** The August 2024 upgrade defined both a v3 and a v4 initialization function but only v4 was called. The v3 function would have set `_totalOperatorWeight`; without it `minimumVoteWeight` stayed at its default of zero, so withdrawal approvals needed no meaningful operator signatures. Post-upgrade validation must assert that every security parameter (thresholds, weights, roles) holds its intended non-default value, not just that the upgrade transaction succeeded.

## Summary

Ronin is the Axie Infinity / Sky Mavis EVM-compatible sidechain whose bridge was the target of the March 2022 validator-key compromise (~\$625M, see `2022-03-ronin-bridge.md`). The August 2024 incident is structurally distinct: a bridge contract upgrade on 2024-08-06 introduced a bug in which the v3 initialization function was never executed. Per Halborn, this left `_totalOperatorWeight` unset and `minimumVoteWeight` at zero, which effectively disabled the cross-chain withdrawal vote check. Ronin's own statement, as quoted by Decrypt, said the update "introduced an issue leading the bridge to misinterpret the required bridge operators vote threshold to withdraw funds."

An MEV bot front-ran other actors' manual attempts to exploit the flaw and withdrew about 4,000 ETH and 2M USDC (the USDC cap being the per-transaction maximum). Ronin paused the bridge, said the actors appeared to be acting as white hats, and the funds were returned the same day. Ronin's bug bounty program paid the white hats \$500,000. Verichains, quoted by Cointelegraph, observed that the protocol could have lost the full amount had the front-run not occurred.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-08-06 (before) | Bridge contract upgrade deployed; v3 initializer not called, leaving vote-weight threshold at 0 | **T9.004 surface created (latent)** |
| 2024-08-06 09:37 | First transfer of ~3,996 ETH out of the bridge (The Block) | **T9.004 exploitation** |
| 2024-08-06 10:11 | Nearly \$2M in USDC transferred (The Block) | (extraction) |
| 2024-08-06 10:15 | Bridge paused (The Block) | (operator response) |
| 2024-08-06 (afternoon) | ETH returned; remaining USDC confirmed received a couple of hours later | recovery |
| 2024-08 onward | Ronin audits the code before reopening the bridge (Halborn) | (remediation) |

## What defenders observed

- **Initializer coverage must be tested.** The upgrade defined two initialization functions but called only one; the skipped function was dead code that silently left a security parameter at zero. Automated checks can detect uncalled initializers, and the Solidity compiler's pruning of unused code makes this easy to miss by inspection.
- **A zero threshold should fail closed.** A vote-weight threshold of 0 meant any caller passed verification. Contracts should revert when a threshold is below an expected minimum.
- **The rescue was luck-conditional.** The MEV bot reached the funds first and then returned them; Verichains noted a faster-paying attacker could have drained the full balance. This should not be treated as a reliable defensive control.

## What this example tells contributors writing future Technique pages

- **Distinguish key compromise from verification-threshold failure.** Both end in forged or unapproved withdrawals, but the 2022 case required stolen keys and the 2024 case required no keys at all.

## Public references

- `[theblockronin2024]` — The Block, "Ronin bridge pauses amid \$11.8 million outflow to MEV bot white hats" (2024-08-06): <https://www.theblock.co/post/309707/ronin-bridge-pauses>
- `[halbornronin2024]` — Halborn, "Explained: The Ronin Network Hack (August 2024)" (2024-08-08): <https://www.halborn.com/blog/post/explained-the-ronin-network-hack-august-2024>
- `[decryptronin2024]` — Decrypt, "Ronin gaming network recovers swiped Ethereum after \$12 million attack" (2024-08): <https://kakapo.decrypt.co/243343/ronin-gaming-network-recovers-swiped-ethereum-12-million-attack>
- `[cointelegraphroninverichains2024]` — Cointelegraph, "Ronin bridge hack upgrade script Verichains" (2024-08): <https://cointelegraph.com/news/ronin-bridge-hack-upgrade-script-verichains>
