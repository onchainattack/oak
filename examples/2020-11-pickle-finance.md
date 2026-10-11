# Pickle Finance "Evil Jar" exploit — the controller swapped between any two "jars" the caller named, including fake ones — Ethereum — 2020-11-21

**Loss:** **~\$19.76M** in DAI (held as Compound cDAI by the DAI pJar's strategy) `[forklogpickle2020]` `[halbornpickle2020]`. SlowMist dates the attack to 2020-11-22 (UTC+8 reporting); Pickle's own disclosure and ForkLog give 2020-11-21. The attacker did not use a flash loan `[forklogpickle2020]`. PICKLE fell about 57% `[forklogpickle2020]`.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary*. `ControllerV4.swapExactJarForJar` accepted two arbitrary jar addresses from the caller and never checked that they were real Pickle jars `[slowmistpickle2020]` `[halbornpickle2020]`. The attacker deployed fake "evil jars", passed them to the swap, and — in a second call using a fake jar as both source and destination — had the controller execute attacker-controlled calls with its own authority over the DAI strategy, moving the funds out. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). **OAK-T5.001** (Hard LP / Treasury Drain — the extraction).

**Corrected 2026-10-11:** the earlier text described an attacker "swapping the jar's strategy pointer to an Evil Jar without a timelock". The sources describe an unvalidated-input / arbitrary-call flaw in the controller's jar-swap function, not a strategy-pointer change by someone holding that authority. The Tornado Cash routing and the CORNICHON → DILL compensation narrative had no source and were removed.

**Attribution:** **pseudonymous.** The attacker has not been publicly identified.

**Key teaching point:** **A function that moves funds between "jars" must know what a jar is.** `swapExactJarForJar` trusted the caller to name legitimate jars; any contract that answered the jar interface could be named, and the controller then acted on its behalf. The control is an allowlist of jar addresses checked inside the function — the same shape as the Gondi, BonfireSwap and FlashLoopAdapter cases, where a periphery contract trusted caller-supplied counterparties.

## Summary

On 2020-11-21 an attacker exploited Pickle Finance's ControllerV4. Its `swapExactJarForJar` function took the addresses of a source and a destination jar as parameters without validating them. The attacker deployed fake jars and used the function to have the controller withdraw the DAI pJar's position (held as cDAI) and route it through attacker-controlled contracts, netting ~\$19.76M. Pickle disclosed the incident the same day.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2020-11-21 | Attacker deploys fake "evil jar" contracts | (setup) |
| 2020-11-21 | `swapExactJarForJar` called with the fake jars; controller withdraws the DAI pJar's cDAI position and executes attacker-controlled calls | **T9.004** |
| 2020-11-21 | ~\$19.76M DAI leaves the protocol | **T5.001** |
| 2020-11-21 / 22 | Pickle discloses; SlowMist publishes an analysis | (response) |

## Public references

- `[slowmistpickle2020]` — SlowMist, "Reveal the process of Pickle Finance being hacked": <https://slowmist.medium.com/slowmist-a981b3a2a3dc>
- `[halbornpickle2020]` — Halborn, "Explained: The DeFi Protocol Pickle Finance Hack (Nov 2020)": <https://www.halborn.com/blog/post/explained-the-defi-protocol-pickle-finance-hack-nov-2020>
- `[forklogpickle2020]` — ForkLog, "DeFi project Pickle Finance lost nearly \$20 million in hack": <https://forklog.com/en/defi-project-pickle-finance-lost-nearly-20-million-in-hack/>
- `[decryptpickle2020]` — Decrypt, "Pickle Finance hack": <https://decrypt.co/49149/pickle-finance-hack>

## Discussion

Pickle is an early, large instance of the periphery-contract pattern OAK tracks as candidate T9.004.001: a contract with authority over user funds acts on counterparties the caller supplies. In 2020 the counterparty was a "jar"; in later cases it is a market (Exactly 2023), a bundle (Gondi 2026), a Safe (FlashLoopAdapter 2026) or a `from` address (BonfireSwap 2026). The fix is the same in each: derive what may be acted on from state the contract controls, not from parameters.
