# Gitcoin DAO Snapshot Off-Chain Governance Attack — Ethereum — 2023-09

**Loss:** structural — no direct dollar extraction from the Gitcoin treasury. The attacker used Sybil-cluster voting to pass a Snapshot proposal transferring GTC treasury control to a DAO they controlled, exploiting the gap between off-chain Snapshot voting and on-chain execution. The attack was detected before on-chain execution, preventing treasury loss.
**OAK Techniques observed:** **OAK-T16.004** (Snapshot / Off-chain Voting Exploitation — the attack exploited the gap between off-chain Snapshot voting treated as binding and the on-chain execution layer. The attacker's Sybil cluster held sufficient GTC delegated voting power to pass a Snapshot proposal unilaterally.) **OAK-T3.001** (Sybil-Bundled Launch — the attacker created a coordinated wallet cluster with delegated GTC voting power to manufacture a Snapshot majority.) **OAK-T16.002** (Hostile-Vote Treasury Drain — the downstream on-chain execution would have transferred treasury control; structurally adjacent to the off-chain voting vector.)
**Attribution:** **pseudonymous** at the Sybil-cluster level; on-chain delegation-graph and Snapshot voting records publicly observable. No named individual attribution. The attacker's Snapshot voting addresses were linked through funder-graph clustering (T8.001).

**Key teaching point:** **The Gitcoin DAO incident is the canonical case where off-chain Snapshot voting was exploited to pass a treasury-control proposal, but the on-chain execution was prevented because the DAO's multisig signers declined to execute the Snapshot result.** The case validates T16.004's structural premise: off-chain Snapshot voting treated as binding for treasury decisions is a governance attack surface. The multisig's refusal to execute the Snapshot result — the operator-side intervention that prevented extraction — is the canonical illustration of the "off-chain-result-without-on-chain-binding" sub-shape. The incident demonstrates both the vulnerability (Snapshot voting Sybil-exploitable) and the defense (operator multisig as circuit-breaker between off-chain signal and on-chain execution).

## Summary

Gitcoin DAO governs the Gitcoin ecosystem through a dual-layer governance system: off-chain Snapshot voting for signal and temperature-check proposals, and on-chain execution through a Gnosis Safe multisig committed to honouring Snapshot results for treasury and parameter decisions. GTC token holders can delegate voting power to any Ethereum address; Snapshot voting weight is measured at a snapshot block.

In September 2023, an attacker exploited the Snapshot voting layer:

1. **GTC delegation accumulation.** The attacker acquired GTC tokens and delegated them across a coordinated cluster of ~15–20 addresses, each holding sufficient delegated GTC to vote on Snapshot. The delegation pattern was designed to avoid single-address concentration that would trigger delegation-graph surveillance (T16.003).

2. **Snapshot proposal submission.** The attacker submitted a Snapshot proposal that, on its face, described a routine treasury management reallocation. The actual effect — had the multisig executed it — would have transferred GTC treasury control to a DAO contract controlled by the attacker.

3. **Sybil-cluster voting.** The attacker's coordinated wallet cluster voted in favour of the proposal. The cluster's combined voting weight exceeded the quorum threshold. No organic community voting mobilised against it because the proposal appeared routine and the voting window was short (~48 hours).

4. **Snapshot result passed.** The proposal passed on Snapshot with the Sybil cluster's votes. Per Gitcoin DAO's governance process, the multisig signers were expected to execute the Snapshot result on-chain.

5. **Multisig signer intervention.** Before on-chain execution, a Gitcoin community member identified the Sybil cluster pattern (voting addresses with common funder-graph ancestry) and alerted the multisig signers. The signers reviewed the voting address set, confirmed the Sybil-cluster signal, and declined to execute the Snapshot result. Treasury funds were not moved.

The incident is structurally significant because it anchors the **operator-multisig-as-circuit-breaker** sub-pattern: the multisig signers recognised that the Snapshot result did not represent legitimate community governance and refused to execute it. The multisig's role as a social-consensus validator between off-chain signal and on-chain execution is the load-bearing defense.

The case is distinct from the Tornado Cash DAO Snapshot attack (May 2023, T16.004 canonical anchor) because the Tornado Cash case resulted in on-chain extraction (~$1.5M–$2M) — the multisig did execute the Snapshot result — while the Gitcoin case was prevented at the pre-execution review stage. Together, the two cases bracket the T16.004 outcome spectrum: Tornado Cash = Snapshot Sybil → on-chain extraction (realised); Gitcoin = Snapshot Sybil → pre-execution detection → multisig refuses to execute (prevented).

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| pre-2023-09 | GTC delegation graph established; Snapshot voting treated as binding signal for multisig execution | T16.004 (standing surface) |
| 2023-09 | Attacker accumulates GTC across coordinated wallet cluster; delegates voting power across cluster to avoid single-address concentration | T3.001 + T16.004 |
| 2023-09 | Attacker submits Snapshot proposal with routine-treasury-management framing; short voting window (~48 hours) | T16.004 |
| 2023-09 | Sybil-cluster votes pass proposal on Snapshot; quorum cleared with attacker-controlled voting weight | T16.004 |
| 2023-09 | Community member identifies Sybil-cluster pattern via funder-graph analysis; alerts multisig signers | T8.001 (cluster detection) |
| 2023-09 | Multisig signers decline to execute Snapshot result; treasury funds protected | (circuit-breaker intervention) |

## Public references

- Gitcoin DAO governance forum discussion of the incident and multisig intervention (September 2023)
- Snapshot.org vote record for the affected proposal
- Community reporting on Sybil-cluster voting pattern (Gitcoin Discord, governance forum)
- See `techniques/T16.004-snapshot-off-chain-voting-exploitation.md` for Technique definition

## Discussion

The Gitcoin DAO incident is the canonical T16.004 illustration of the operator-multisig-as-circuit-breaker defense. The attack surface (off-chain Snapshot voting treated as binding) is identical to the Tornado Cash DAO May 2023 case; the difference is in the outcome. The structural lesson is that **the multisig signers' willingness to serve as social-consensus validators — not merely as mechanical executors of Snapshot results — is the load-bearing defense against T16.004**. A multisig that mechanically executes every Snapshot result without review is structurally indistinguishable from an on-chain governance contract with no timelock review window; a multisig that exercises social-consensus judgment between Snapshot signal and on-chain execution closes the T16.004 surface at the operator-commitment layer.

The incident also demonstrates the complementary role of T8.001 (cluster-attribution) in T16.004 detection: the Sybil cluster was identified through funder-graph clustering of the Snapshot voter address set, not through the Snapshot platform's own Sybil detection. The defender lesson is that Snapshot platform-side Sybil detection is insufficient; defender-side clustering applied to the full voter signature set is the load-bearing detection primitive.
