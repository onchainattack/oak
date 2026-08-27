# OAK-M48 — Unsolicited-Code Quarantine and Pre-Execution Manifest Review

**Class:** operational
**Audience:** developer, protocol, custody-vendor, trading-desk

**Maps to Techniques:** OAK-T15.001, OAK-T15.003, OAK-T11.009, OAK-T15.002

## Description

A handling invariant for code that arrives rather than code you went looking for: **unsolicited code is evaluated on a machine that holds nothing, or it is not evaluated at all — and before any package-manager command runs, every manifest in the tree is read as text.**

The mitigation exists because the decision developers are asked to make — *is this code malicious?* — is the wrong decision, and it is one the attacker gets to keep improving. The corpus's lure repositories are built specifically to survive inspection: the 2026-08 OnChainAttack specimen contained **no attacker payload at all**, only a base64-encoded pointer to a mutable record on a public JSON-hosting service, fetched at import time and handed to `Function.constructor`. There was nothing in the repository to find, its file hashes said nothing about what would execute, and the operator could change the payload after delivery without touching the repository. Against that construction, reading more carefully is not a stronger version of the right answer; it is the wrong axis.

M48 moves the decision onto two properties the attacker cannot improve. The first is **direction**: did you seek this code, or did it seek you? Unsolicited delivery is a precondition of the attack — the operator must initiate — so a rule keyed to direction has no exploitable gradient, in the same way [`OAK-M45`](./OAK-M45-inbound-contact-refusal.md) resolves inbound-contact impersonation without asking the user to evaluate the impersonator. The second is **what the machine holds**: a workstation with no keys, no sessions, no SSH agent and no cloud credentials produces a bounded outcome regardless of what the code turns out to do, and that boundary holds even when the analysis is wrong.

### Heuristics this rule must displace

Each of the following is a check a careful developer performs **and passes** on the way to executing the payload. They are listed because supplementing them is not sufficient — they have to be replaced.

- **"I will read the code before I run it."** Passes. The repository is a pointer, not a weapon; the malicious content is fetched at runtime from a mutable remote record. Reading is necessary, but it does not bound what executes.
- **"I will install with `--ignore-scripts`."** Passes, and is the most dangerous of the five because it feels like a boundary. It blocks lifecycle hooks, but a loader checked into ordinary application source — an Express route, a config module, a test helper — is reached by the next `npm start`, test run, or editor-triggered import. `--ignore-scripts` defers execution; it does not prevent it.
- **"I will only install the dependencies, not run the project."** Passes. `prepare` runs on a bare `npm install`. So do `preinstall`, `install` and `postinstall`. Installation *is* execution, and the widely-taught focus on `postinstall` specifically leaves `prepare` unexamined.
- **"A scanner cleared the repository."** Passes. There is no attacker code in the tree to detect, and a clean result today makes no claim about tomorrow, because the served stage is mutable at the operator's discretion.
- **"The invitation came from the real platform and passed SPF, DKIM and DMARC."** Passes, because it did. A genuine GitHub collaboration invitation from an attacker-controlled account is authentic mail about hostile content. No mail-authentication control was defeated, because none was attacked.

### Pre-execution manifest review

Performed as text, before any package-manager command, on the assumption that the reviewer is looking for *what runs on install* rather than for malice:

1. **Read the root manifest's `scripts` block in full** — `preinstall`, `install`, `postinstall`, `prepare`, `prepublish`, `prepack`. Any hook that starts a server, spawns a process, or reaches the network is disqualifying on its own.
2. **Read every nested manifest**, not only the root. The 2026-08 specimen declared a package with a published malware advisory (`grayavatar`, `MAL-2025-6012`) in `server/package.json`, unreachable from a root install and easy to miss by reviewing one file.
3. **Check unpinned and `latest` specifiers on low-profile packages** against OSV before installing anything. `latest` on an obscure dependency means the maintainer, not the manifest, decides what you get.
4. **Treat an absent lockfile as a finding** on a project presented as real work. It removes the resolved dependency set from review.
5. **Grep the tree for the execution primitives** the loader family needs: `Function.constructor` / `new Function(`, `eval(`, `child_process` / `execSync` / `spawnSync`, `atob(` / `Buffer.from(..., 'base64')`, `os.tmpdir()`, long base64 literals, raw IPv4 literals, and remote code-storage hosts (public JSON-record services, paste sites, raw gist endpoints, tunnelling hosts). Presence is not proof; **absence is not clearance**, for the reason in the first heuristic above.

## How it applies

- **OAK-T15.001 (Social Engineering of Operator Personnel):** the technique's payload step is a repository, installer or attachment that must be executed to be evaluated. M48 is the control that makes the pretext's success irrelevant — the operator may win every social exchange and still reach only a machine that holds nothing. This is the layer to invest in, because pretext recognition is not reliably improvable: the 2026-08 anchor's pretext ran to completion against a target who maintains the technique page.
- **OAK-T15.003 (Operator-Endpoint Compromise):** M48 is what keeps T15.001 from becoming T15.003. The endpoint state the attacker is buying — implant on a machine with signing material, sessions and repository access — is unreachable if the evaluation host has none of those. The rule's value is that it bounds the outcome without requiring the analysis to be correct.
- **OAK-T11.009 (Trader-Tooling Supply-Chain Compromise targeting `.env` Private Keys):** the cohort's target is plaintext key material in developer environments. An evaluation host with no `.env`, no `wallet.json` and no `keys/` directory removes the objective rather than the access path.
- **OAK-T15.002 (Supply-Chain / Vendor-Pipeline Compromise):** partial only. M48 governs code you did not ask for; it does not reach a compromised version of a dependency you deliberately chose, which is [`OAK-M40`](./OAK-M40-supply-chain-package-integrity.md).

## Limitations

**A container is not a boundary when it is mounted like a workstation.** The rule is defeated in practice by the conveniences that make analysis comfortable: a mounted home directory, a forwarded SSH agent, a bind-mounted Docker socket, a cloud config directory, or the host's source repositories. Any one of these returns the blast radius to the host. Network isolation matters equally — the 2026-08 specimen's first action on execution was an outbound fetch, and static analysis of it required no network at all.

**It does not reach code you sought out.** A malicious version of a dependency you chose, a compromised SDK, or a hijacked package under a name you typed yourself is outside this rule by construction. That surface is M40 and dependency pinning with reviewed diffs.

**It does not survive time pressure, and the technique is built around that.** The population targeted is job seekers on a stated 40–50 minute clock, often mid-process and motivated to comply. A rule that requires provisioning a disposable environment before starting the clock is a rule that loses to urgency unless the environment exists *in advance*. The operational form is therefore a standing, pre-built evaluation VM — created before it is needed, not in response to the message that needs it.

**It does not tell you whether to engage.** M48 governs handling, not participation. A developer may have entirely legitimate reasons to complete a real take-home assessment; the rule constrains where that happens, not whether.

**Absence of findings in manifest review is not clearance.** Stated twice here on purpose. Manifest review reliably catches lifecycle-hook execution and declared-malicious dependencies. It does not catch a loader in application source, and it cannot catch a payload that is not present in the tree.

## Reference implementations

- **Ephemeral evaluation VM** with no host mounts, no credential forwarding, egress logging, and a snapshot restored per evaluation. Provisioned in advance.
- **`npm install --ignore-scripts`** — useful as *one* layer, explicitly **not** a boundary; see the heuristic list above.
- **Manifest linting in CI** for lifecycle hooks that spawn processes or reach the network; OSV / advisory lookup on every declared dependency including nested manifests.
- **Egress allowlisting** from build and evaluation environments — the control that survives runtime-assembled hostnames, header-channel exfiltration and mutable remote stages alike.
- **Detection content for the loader shape rather than the payload:** the 2026-08 anchor ships a YARA rule matching the *loader's* structure, because the loader is the stable, hashable artefact and the payload hash is a perishable observation with a timestamp attached.

## Citations

- See [`examples/2026-08-onchainattack-maintainer-fake-assessment-lure.md`](../examples/2026-08-onchainattack-maintainer-fake-assessment-lure.md) — first-party collection; the specimen that motivates every heuristic in the displacement list above: `prepare` as trigger, loader in application source, no payload in the tree, mutable remote stage, authentic platform delivery.
- See [`examples/2026-07-injective-sdk-npm-trusted-publisher-key-exfiltration.md`](../examples/2026-07-injective-sdk-npm-trusted-publisher-key-exfiltration.md) — the trigger-design counterpart: a payload that fires on key derivation rather than on install, defeating install-time scanning entirely.
- See [`examples/2026-01-polymarket-trader-tooling-supply-chain.md`](../examples/2026-01-polymarket-trader-tooling-supply-chain.md) — the T11.009 target cohort, and what an evaluation host holding no key material removes.
