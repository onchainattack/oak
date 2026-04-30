# OAK-M03 — Continuous Bytecode-Diff Monitoring

**Class:** detection
**Audience:** vendor, risk-team

**Maps to Techniques:** OAK-T1.003, OAK-T1.004, OAK-T2.004, OAK-T6.001, OAK-T6.003, OAK-T9.004, OAK-T11.003

## Description

Continuous Bytecode-Diff Monitoring is the post-deployment counterpart to OAK-M01: instead of binding source-to-bytecode once at listing time, the defender continuously watches every contract that has been declared in scope (a venue's listed-token universe, a custodian's contract whitelist, a risk-team's protocol watchlist) for *changes* to the executing bytecode. The relevant signals are EIP-1967 admin-slot writes, transparent-proxy `upgradeTo` / `upgradeToAndCall` calls, UUPS-pattern proxy implementation pointer changes, beacon-proxy beacon updates, `selfdestruct`-then-`CREATE2`-redeploy at the same address, and on Solana the equivalent `Upgradeable BPF` program-data pointer changes.

The defensive principle is that the source-bytecode binding established at listing is a *snapshot*, not a property. A contract that was safe yesterday can be made unsafe today by a single proxy-upgrade transaction, and a contract that was reviewed against benign bytecode can be repointed at a backdoored implementation between blocks. Treating bytecode as immutable when it is in fact mutable is the systematic error this mitigation closes. The monitoring is most load-bearing for proxy-pattern contracts (where upgrades are *expected* and the question is whether each individual upgrade is *governed*) and for `selfdestruct`-permitting deployments (where redeploys at the same address are *unexpected* and any occurrence is a P0 signal).

OAK-M03 surfaces detection events fast enough that downstream defenders (venues delisting, wallet vendors warning, custodians pausing inflows) can act before the upgraded contract is exercised against held positions. The mitigation has two operating modes: alerting (push notification on event) and gating (programmatic block of dependent operations until the new implementation is reviewed).

## How it applies

- **OAK-T1.003 (Renounced-but-not-Really):** post-listing implementation swaps on proxy-pattern tokens are the canonical pivot from "renounced" to "controlled-again"; OAK-M03 catches the pivot transaction directly, before the new admin path is exercised.
- **OAK-T1.004 (Blacklist / Pausable Weaponisation):** an upgrade that adds a blacklist or pause predicate to an originally clean transfer-logic path is a T1.004 activation event; bytecode-diff monitoring surfaces the upgrade transaction, paired with OAK-M01 recompile-on-diff to confirm the new bytecode contains the gating predicate.
- **OAK-T2.004 (Initial Liquidity Backdoor):** for pool wrappers and LP-token contracts that are themselves upgradeable, OAK-M03 catches post-listing repointing toward backdoor-bearing implementations.
- **OAK-T6.001 (Source-Verification Mismatch):** the time-evolved variant of T6.001 — verified source matches at listing, then diverges via upgrade — is unreachable for OAK-M01 (which is one-shot) but is the canonical signal for OAK-M03.
- **OAK-T6.003 (Audit of Different Bytecode Version):** an audit performed against implementation v1 has zero defensive weight against implementation v2; OAK-M03 makes the implementation-vs-audited-bytecode drift legible by alerting at every implementation change.
- **OAK-T9.004 (Access-Control Misconfiguration):** misconfigurations introduced by upgrade (where v1 was correctly-configured and v2 ships a bug or a deliberate bypass) are caught at the upgrade-event boundary rather than only after exploitation.
- **OAK-T11.003 (Multisig Contract Manipulation):** unannounced contract-modification events on custodial multisigs are the structural T11.003 signal; OAK-M03 is the detection surface, paired with the mandatory-disclosure expectation from the custodian.

## Limitations

OAK-M03 detects the *event* but not its *intent* — a legitimate, governance-approved upgrade and a malicious admin-key-compromise upgrade present identically at the bytecode level. Distinguishing them requires out-of-band signal (announcement on the project's published change-control channel, governance-vote tally, time-lock window) which the detection layer cannot synthesize on its own. False-positive volume is high for protocols with active legitimate upgrade cadence, which forces alert-fatigue management and risks under-reaction at the moment of compromise. Monitoring is also chain-asymmetric: EVM EIP-1967 slots are well-standardised and easy to watch, while custom proxy patterns (Diamond / EIP-2535, custom-storage proxies) and non-EVM equivalents require per-pattern detector logic. Finally, the mitigation says nothing about the *new* implementation's properties — it tells you the bytecode changed, not whether the change is dangerous; OAK-M01 + OAK-M02 must run on the new implementation for the chain to close.

## Reference implementations

- OpenZeppelin Defender — production-grade EIP-1967 admin-slot monitoring with policy-driven alerts; one of the canonical commercial deployments of OAK-M03.
- Forta — open detection network with EIP-1967 / proxy-upgrade detector bots; suitable for self-hosted defender pipelines.
- Tenderly — alert framework with proxy-upgrade and admin-slot watchers as first-class primitives.
- `mg-detectors-rs` — runtime bytecode-diff and proxy-implementation-pointer change detectors planned; v0.1 status is partial coverage on Solana program-data pointer changes, EVM coverage in progress.
- Etherscan / Blockscout proxy-upgrade event surfaces — passive, UI-side; suitable for manual review but not for sub-block alerting.
- Custom event-listener pipelines over JSON-RPC (`eth_getLogs` filtered on the EIP-1967 admin / implementation slots) — the open-source baseline that the commercial offerings wrap.

## Citations

- `[nomicproxybackdoor]` — proxy-backdoor pattern retrospective; the structural class OAK-M03 is designed to catch.
- `[quillauditsbackdoor]` — proxy-and-backdoor combination patterns; downstream consumer of OAK-M03 alerts.
- `[chainalysis2025rug]` — cohort-scale evidence that proxy-upgrade-after-listing is a recurring rug-pull pattern.
- `[halbornwintermute2022]` — Wintermute 2022 retrospective; relevant to the broader theme of post-deployment authority changes that bytecode-diff monitoring surfaces (alongside OAK-M05 for authority graph).
