# Veil Cash — the verifying key set delta equal to gamma, so the pairing equation accepted proofs nobody had to compute — Veil Cash / Base — 2026-02-20

**Loss:** **2.9 ETH (~\$5,000)** — the entire **0.1 ETH privacy pool**, drained through **29 fraudulent `withdraw()` calls in a single transaction** with fabricated nullifier hashes and forged proofs, by an address that had **never deposited**. **Decurity** detected the attack and rescued the remaining pools; the exploiter **returned the funds unprompted**. Days later **FoomCash** was drained through the same misconfiguration. The dollar figure is trivial and close to irrelevant — what was broken was the **soundness of the proof system**, and the same key misconfiguration in a pool of any size pays out the whole pool.

**OAK Techniques observed:** **OAK-T9.015.001** (*forward candidate* — **degenerate inputs to zero-knowledge proof verifiers**, the sub-class proposed under **OAK-T9.015** for the case where the defect is in a **cryptographic verifier accepting a degenerate configuration** rather than in an application-layer check. This entry is its **first anchor**. The Groth16 verifying key had **`delta2` set equal to `gamma2`** — both left as the **BN128 G2 generator point**, the library default — which collapses the pairing equation's soundness and lets anyone construct a satisfying proof for **arbitrary public inputs** with no witness at all. See [`techniques/T9.015-degenerate-input-signature-verification-bypass.md`](../techniques/T9.015-degenerate-input-signature-verification-bypass.md)). **OAK-T9.004** (Access-Control Misconfiguration — recorded as the *deployment-configuration* shape and secondary: the contract logic was not wrong, the **key material it was deployed with** was.)

**Attribution:** **pseudonymous.** On-chain identifiers only. The party returned the drained ETH without negotiation or a public claim; OAK records the return as disposition metadata and reads nothing further into it.

**Key teaching point:** **A zero-knowledge verifier does not fail loudly — it keeps verifying, and starts returning true for everything.** Every other failure in this corpus produces a visible artefact: a revert, a balance that does not reconcile, a signature that does not recover. A verifying key with `delta == gamma` produces **valid-looking proofs that pass**, and the only way to notice is to check the key itself. Two structural points follow. First, **the exploitable value is the pool, not the bug**: the attacker took \$5K because the pool held \$5K, and the identical key in a pool holding \$50M pays out \$50M with the same transaction shape. Second, **the defect lives in ceremony output, not in source code** — `delta2` and `gamma2` are parameters produced by the trusted setup and pasted into the deployed verifier, which is why source review, unit tests and even a full audit of the circuit can all pass while the deployment is unsound. Pashov Audit Group, who had audited Veil, noted the misconfigured `Verifier` contract was **out of scope for the engagement**. The control is a **deployment-time assertion on the verifying key**: that `delta2 != gamma2`, that neither is the generator, and that every G1/G2 element is in the correct subgroup — four checks, runnable against any deployed verifier by anyone.

## Summary

**Veil Cash** is a privacy protocol on **Base** using **Groth16** zk-SNARK proofs to let a depositor withdraw to a fresh address without linking the two. Withdrawal is gated by a proof verified on-chain against a **verifying key** fixed at deployment.

Groth16's soundness depends on the verifying key's **`gamma`** and **`delta`** elements being independent — they separate the public-input commitment from the proof-specific randomisation. Veil's deployed verifier had **both set to the same value: the BN128 G2 generator**, which is what a verifier template contains before real ceremony output is substituted in.

With `delta2 == gamma2`, the pairing check no longer binds a proof to a witness. On **2026-02-20**, an attacker deployed a contract that forged proofs for **arbitrary public inputs**, including **nullifier hashes that corresponded to no deposit**, and called **`withdraw()` 29 times in one transaction** against the **0.1 ETH pool**, taking **2.9 ETH**. No deposit was ever made.

**Decurity** identified the attack and moved to rescue the remaining pools. The exploiter later **returned the funds**. Within days, **FoomCash** — running the same misconfiguration — was drained by a copycat.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| (standing) | Verifier deployed with a Groth16 verifying key whose **`delta2` equals `gamma2`**, both the **BN128 G2 generator** — the untouched template default | (latent T9.015.001 defect) |
| (standing) | The `Verifier` contract is **outside the audit engagement's scope**; circuit and application review do not cover deployed key material | (review-scope gap) |
| 2026-02-20 | Attacker deploys a contract that **forges proofs for arbitrary public inputs**; calls **`withdraw()` 29 times in a single transaction** with fabricated nullifier hashes | **T9.015.001 exploitation** |
| same transaction | **2.9 ETH** — the entire 0.1 ETH pool — leaves to an address that never deposited | (extraction) |
| shortly after | **Decurity** detects the attack and rescues the remaining pools | (external detection) |
| after | Exploiter **returns the drained ETH** unprompted | (disposition) |
| days later | **FoomCash** drained through the same verifying-key misconfiguration | (class repeat) |

## What defenders observed

- **The proof system did not break; it was deployed broken.** There is no bug in Groth16 and none in Veil's circuit. The failure is entirely in the constant that was shipped, which makes it invisible to every review layer that reads code rather than deployed state. **Verifying keys are configuration, and configuration is what nobody diffs.**
- **The check is four lines and anyone can run it.** `delta2 != gamma2`; neither equals the curve generator; all G1/G2 points are on-curve and in the correct subgroup. Run against the deployed contract's public constants, this class is detectable **before** an attack, by an outside party, with no privileged access. As far as the public record shows, nobody was running it.
- **A copycat landed within days, which is how this class propagates.** The same default appears wherever a verifier template is deployed without substituting real ceremony output, so one public exploit turns into a scan of every comparable deployment. FoomCash was the second; the population of unaudited-verifier privacy pools is the rest.
- **The loss says nothing about the severity.** \$5K is the pool size, not the blast radius. This is the clearest case in the corpus for **separating defect severity from realised loss** when scoring: identical defect, identical transaction, and the payout is whatever the contract holds.
- **Audit scope excluded the one file that mattered.** The auditors said so publicly and precisely. It is the same structural failure as the Exactly Protocol periphery contract (2023-08) and the ether.fi legacy queue (2026-09): **scope is drawn around the code the team thinks of as theirs, and attackers read the deployment.**

## Public references

- `[rektunfinishedproof2026]` — Rekt, "The Unfinished Proof": <https://rekt.news/the-unfinished-proof>
- `[darknavyveil2026]` — DARKNAVY, "Veil Cash Groth16 Forgery" (the `delta2 == gamma2` verifying-key misconfiguration and the forged-proof withdrawal path): <https://www.darknavy.org/web3/exploits/veil-cash-groth16-forgery/>
- `[veilcashpoc2026]` — Public proof-of-concept reproduction, "groth16 verifier had `delta2 == gamma2`": <https://github.com/DK27ss/VeilCash-5K-PoC>
- `[pashovveil2026]` — Pashov Audit Group statement that the misconfigured `Verifier` contract was out of scope for their Veil engagement: <https://x.com/PashovAuditGrp/status/2025598503255167195>
- `[coinsbenchveil2026]` — CoinsBench, "Forging zkSNARK Proofs via Misconfigured Verification Keys: The Veil_01_ETH Exploit": <https://coinsbench.com/forging-zksnark-proofs-via-misconfigured-verification-keys-the-veil-01-eth-exploit-2a6bb7d0078b>

## Discussion

**OAK-T9.015** was minted in 2026-07 on the Bonzo Lend / Supra anchor, where an all-zero signature against a zero-point public key satisfied a pairing equation trivially. The distinction it preserves is between **an application-layer check that is missing (T10.002)** and **a cryptographic primitive that returns true on a degenerate input (T9.015)** — different owners, different audit scopes, different fixes. `TAXONOMY-GAPS.md` proposed **T9.015.001** as the sub-class for the same defect in a **proof verifier** rather than a signature verifier, and flagged it *"mint once anchored."* This is that anchor, and it arrived from the opposite direction: Bonzo's degenerate input was in the *message*, Veil's is in the *key*.

That difference is worth keeping in the definition when the sub-class is minted. A degenerate **input** is supplied by an attacker at call time and can be rejected by input validation. A degenerate **key** is supplied by the deploying team once and is validated by nobody — it is trusted precisely because it is a constant. Both produce the same observable (a verifier returning true without a witness), and only the second one is exploitable by *everyone* from the moment of deployment, permanently, with no precondition.

The corpus now holds two cases in the class (Bonzo 2026-07, Veil 2026-02) plus a same-class repeat at **FoomCash** days after Veil. Contributors documenting the next one should record **which element was degenerate and who supplied it** — attacker, ceremony, or template default — because that field determines whether the mitigation is input validation, ceremony verification, or a deployment assertion.
