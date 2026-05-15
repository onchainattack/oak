# UniCats yield-farm approval backdoor — Ethereum — 2020-10-05

**Loss:** approximately **\$140,000–200,000** in UNI tokens stolen from at least two identified victims. The primary victim ("Jhon Doe") lost ~36,000 UNI (~\$132,000 at the time) plus additional tokens totalling ~\$140,000. At least one additional victim lost ~\$50,000. The attacker swapped the stolen UNI for ~416 WETH (~\$147,000) on Uniswap and routed proceeds through Tornado Cash.

**OAK Techniques observed:** **OAK-T4.004** (Allowance / Approve-Pattern Drainer — primary; the UniCats farming contract requested and received an unlimited UNI spend approval from users during deposit, then exploited the standing approval post-withdrawal via a `setGovernance` backdoor to drain tokens from user addresses) + **OAK-T1.003** (Token as Extraction Substrate — broadly construed; the MEOW token was deployed as the native token of the UniCats platform, serving as the bait that attracted users to deposit UNI into the farming contract; the token had no genuine economic function and existed solely as the extraction-infrastructure substrate in the same structural pattern as the YfdexF and Compounder tokens of the same 2020 wave) + **OAK-T7.001** (Mixer-Routed Hop — stolen funds routed through Tornado Cash) + **OAK-T6.001** (Source-Verification Mismatch — the contract's verified source presented a legitimate yield-farming interface while the deployed bytecode contained the `setGovernance` backdoor).

**Attribution:** **pseudonymous**. The UniCats developer operated under an anonymous identity and was never publicly identified. The scam was uncovered through on-chain forensic analysis by Alex Manuskin, a researcher at crypto wallet ZenGo, rather than through operator identification.

**Key teaching point:** UniCats is the canonical 2020 anchor for the **standing-approval-backdoor sub-pattern** of T4.004: the user granted an unlimited token approval during a legitimate-seeming deposit flow, withdrew from the farm believing the exposure had ended, but the contract retained the standing approval and a backdoor function (`setGovernance`) allowed the deployer to invoke `transferFrom` against the victim's address at any subsequent time. The case demonstrates that **an ERC-20 approval is a persistent grant, not a session-bound permission** — the approval survives withdrawal, survives time, and is only revocable by an explicit `approve(spender, 0)` transaction from the user.

## Summary

UniCats was a yield-farming platform on Ethereum that launched in late September or early October 2020, during the peak of the "DeFi Summer" yield-farming boom. The protocol had a native token called MEOW (an ERC-20) that users could farm by depositing UNI and other tokens. The user interface mimicked the design language of successful yield farms like Yam and SushiSwap, with "unique artwork and a user interface rather reminiscent of Yam or SushiSwap" (per CryptoSlate).

The platform's core deception was a two-part mechanism:

1. **Unlimited approval during deposit.** When users deposited tokens into UniCats, the platform requested permission to spend an *unlimited* number of tokens — a common UX pattern in DeFi that most users accepted without scrutiny. The approval was a standard ERC-20 `approve()` call granting the UniCats farming contract unlimited spend authority over the user's UNI balance.

2. **Backdoor `setGovernance` function.** The farming contract contained a `setGovernance` function that allowed the deployer to reassign governance authority to a controlled address. This function was not surfaced in the UI and was not part of the public description of the contract's behaviour. Once governance was reassigned, the attacker could invoke `transferFrom` against any address that had granted the unlimited approval, draining tokens even after the user had withdrawn from the farm.

The primary victim ("Jhon Doe" — a deliberate misspelling used by researcher Alex Manuskin to preserve privacy) discovered UniCats, deposited UNI with the unlimited approval, earned MEOW rewards for several days, then withdrew from the farm. The victim reasonably believed the exposure had ended. Days later, while the victim slept, the attacker used the `setGovernance` backdoor to execute two `transferFrom` calls — 26,000 UNI (~\$94,000) and 10,000 UNI (~\$38,000) — draining the victim's wallet of the UNI that had been returned from the farm plus additional UNI held in the same address.

The attacker created **per-victim intermediary contracts** to obfuscate the trail — "the developer creates additional smart contracts for each new victim to cover his tracks" (Manuskin). Stolen funds were swapped for WETH on Uniswap and routed through Tornado Cash, foreclosing the on-chain recovery window.

Alex Manuskin of ZenGo published the forensic analysis on 2020-10-05, identifying the `#BadApprove` pattern (a term ZenGo had previously coined) as the root cause: the combination of unlimited approval + persistent permission + backdoor invocation pathway.

The case is OAK's earliest well-documented T4.004 anchor: it predates the 2021–2023 drainer-as-a-service cohort and demonstrates the primitive pattern in its simplest form — a single farming contract, a single backdoor function, and the standing-approval surface that made the drain possible.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2020-09 (late) to 2020-10 (early) | UniCats launches on Ethereum; MEOW token and farming contract deployed; users begin depositing UNI with unlimited approval | T4.004 (standing-approval surface created) |
| 2020-10 (days before disclosure) | Primary victim deposits UNI, earns MEOW, withdraws from farm; unlimited approval remains active post-withdrawal | T4.004 (standing approval persists) |
| 2020-10 (night before disclosure) | Attacker invokes `setGovernance` backdoor → `transferFrom` drains ~36,000 UNI from victim while victim sleeps | **T4.004 execution** |
| 2020-10 (same window) | Additional victim drained for ~\$50,000; attacker uses per-victim intermediary contracts for obfuscation | T4.004 (multi-victim pattern) |
| 2020-10 (same window) | Stolen UNI swapped for ~416 WETH on Uniswap; proceeds routed through Tornado Cash | T7.001 (laundering) |
| 2020-10-05 | Alex Manuskin (ZenGo) publishes forensic analysis via Twitter and Decrypt; `#BadApprove` pattern documented | (defender response) |

## What defenders observed

- **Pre-event (approval surface):** The unlimited-approval UX pattern was standard across 2020 DeFi — most yield farms requested unlimited approvals to avoid repeated per-deposit approval transactions. The defender-side observation is that an unlimited approval is a persistent grant: it survives withdrawal, survives time, and is only revocable by an explicit `approve(spender, 0)` transaction. Wallet-level approval-revocation tooling did not exist at scale in 2020.

- **At-event (backdoor invocation):** The `setGovernance` call was an on-chain transaction visible on Etherscan. A monitoring indexer subscribed to governance-reassignment events on yield-farm contracts would have detected the precondition. In practice, no such monitoring was in place; the incident was detected retrospectively through manual on-chain analysis by ZenGo's research team.

- **At-event (transferFrom signal):** The `transferFrom` calls that drained the victim's UNI were the extraction signal. They originated from the UniCats contract (the approved spender) and targeted the victim's address as the `from` field — a signature consistent with T4.004 exploitation of a standing approval.

- **Post-event (per-victim obfuscation):** The attacker deployed unique intermediary contracts per victim, frustrating simple address-based clustering. Tornado Cash routing closed the on-chain recovery window. No funds recovered.

## What this example tells contributors writing future Technique pages

- **T4.004 has a standing-approval-backdoor sub-pattern distinct from the phishing-approval and frontend-compromise sub-patterns.** UniCats (2020-10) is the earliest well-documented T4.004 anchor in the OAK corpus. The user voluntarily granted the approval during a legitimate-seeming interaction; the backdoor was in the contract the user approved, not in a phishing interface or a compromised frontend. This distinguishes the case from T4.002 (Compromised Front-End Permit Solicitation) and T4.008 (Fake-DEX Clone-Frontend Phishing).

- **An ERC-20 approval is a persistent grant, not a session-bound permission.** The structural lesson is that `approve(spender, MAX_UINT256)` creates a standing exposure that survives the user's interaction with the spender contract. The only defence is explicit revocation (`approve(spender, 0)`) or wallet-level approval-management tooling. At the time of UniCats (2020-10), neither was standard user practice.

- **Per-victim intermediary contracts are a T4.004 obfuscation signal.** The attacker's use of unique intermediary contracts per victim is a behavioural indicator that recurs across the 2021–2023 drainer-as-a-service cohort. Future T4.004 contributions should record whether per-victim intermediary contracts were used.

- **The `#BadApprove` pattern naming by ZenGo is an early example of vendor-side pattern documentation.** Manuskin's public naming of the pattern (`#BadApprove`) and the distinction between intentional backdoors (UniCats) and unintentional vulnerabilities (Bancor) is a useful reference for T4.004 contributors documenting the evolution of drainer-pattern recognition.

## Public references

- `[decryptunicats2020]` — Decrypt, "Ethereum User Scammed For \$140,000 in Uniswap (UNI) Tokens" (2020-10-05): <https://decrypt.co/43927/ethereum-user-scammed-for-140000-in-uniswap-uni-tokens>
- `[cryptoslateunicats2020]` — CryptoSlate, "How an unfortunate Ethereum yield farmer lost \$140,000 in UNI overnight" (2020-10-05): <https://cryptoslate.com/how-an-unfortunate-ethereum-yield-farmer-lost-140000-in-uni-overnight/>
- `[blockchainnewsunicats2020]` — Blockchain.news, "\$140,000 in UNI Tokens Lost to a DeFi Yield Farming Scam: The Cautionary Tale of Jhon Doe" (2020-10-06): <https://blockchain.news/news/140000-uni-tokens-lost-defi-yield-farming-scam-cautionary-tale-jhon-doe>
- `[ambcryptounicats2020]` — AMBCrypto, "Yield farming project scams Ethereum users of \$200,000 worth of Uni" (2020-10-06): <https://eng.ambcrypto.com/yield-farming-project-scams-ethereum-users-of-200000-worth-of-uni/>
- `[bitcoininsiderunicats2020]` — BitcoinInsider, "This Crypto Investor Lost \$140,000 Worth of Uniswap Tokens to a Yield Farming Scam" (2020-10-06): <https://www.bitcoininsider.org/article/95307/crypto-investor-lost-140000-worth-uniswap-tokens-yield-farming-scam>
- `[zengeunicats2020]` — ZenGo, "UniCats Go Phishing" (2020-10): <https://zengo.com/unicats-go-phishing/> — Alex Manuskin's primary technical analysis coining the `#BadApprove` pattern term

## Citations

- `[decryptunicats2020]` — contemporaneous press; primary victim narrative and \$140,000 figure.
- `[cryptoslateunicats2020]` — contemporaneous press; overnight-drain timeline and Manuskin interview.
- `[blockchainnewsunicats2020]` — contemporaneous press; Jhon Doe case study.
- `[ambcryptounicats2020]` — contemporaneous press; multi-victim \$200,000 aggregate figure.
- `[bitcoininsiderunicats2020]` — contemporaneous press; victim narrative consolidation.
- `[zengeunicats2020]` — primary technical analysis; `#BadApprove` pattern documentation; `setGovernance` backdoor identification.

## Discussion

UniCats is the canonical 2020 anchor for the **standing-approval-backdoor sub-pattern** of T4.004 and the earliest well-documented case in the OAK corpus where a yield-farming contract exploited an unlimited ERC-20 approval via a deliberately planted backdoor function. The case demonstrates the structural property that **an ERC-20 approval is a persistent grant, not a session-bound permission**: the approval survived the user's withdrawal from the farm, and the `setGovernance` backdoor provided the invocation pathway for the `transferFrom` drain.

The case is structurally distinct from the two later T4.004 cohort categories:

- **Drainer-as-a-service (2021–2023):** industrial-scale operations with templated contracts, affiliate programs, and Telegram-based operator networks. UniCats predates this by at least a year and represents the hand-crafted, single-operator precursor.
- **Phishing-approval (2022–2024):** users are tricked into approving a malicious spender through a fake frontend or social-engineering attack. UniCats involved a *legitimate-seeming* deposit flow — the user intended to interact with the contract they approved; the backdoor was hidden inside it.

The per-victim intermediary-contract obfuscation pattern and the Tornado Cash routing are standard post-exploit behaviours that recur across the full T4.004 cohort through 2024. The ZenGo team's public naming of the `#BadApprove` pattern and the explicit distinction between intentional backdoors (UniCats) and unintentional vulnerabilities (the Bancor comparison cited in Manuskin's analysis) is an early example of vendor-side pattern documentation that predates the systematic taxonomy work of OAK by several years.
