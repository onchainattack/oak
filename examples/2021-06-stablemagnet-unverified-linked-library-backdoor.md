# StableMagnet — the explorer verified the contract but not the library it called, so the published source and the deployed behaviour were different programs — StableMagnet (SMAG) / BNB Chain — 2021-06-23

**Loss:** **~\$27M** — **8M USDT**, **7.2M USDC** and **7M BUSD** taken from the StableMagnet **3Pool**, plus balances pulled from wallets that had approved the protocol. Roughly **\$24M was reported returned on 2022-12-01**, about eighteen months later, following law-enforcement and investigator pressure. OAK records the recovery as disposition metadata; the mechanism is what the entry is for.

**OAK Techniques observed:** **OAK-T6.001** (Source-Verification Mismatch — *primary, and the corpus's canonical named anchor for this Technique*. BscScan and Etherscan verify that **the contract's own source matches its deployed bytecode**. They did **not** verify the code of a **linked external library** the contract called. StableMagnet's operators published clean source for the contract and deployed a **different library** behind it, so every reader who checked the verification badge was reading a program that was not the one running. See [`techniques/T6.001-source-verification-mismatch.md`](../techniques/T6.001-source-verification-mismatch.md)). **OAK-T5.001** (Hard LP Drain — the pool's stablecoin reserves were removed in a single operator action). **OAK-T1.003** (Renounced-but-not-Really — the *effect* the deception produced: a contract presented as reviewable and constrained, retaining an operator capability that the published code did not contain).

**Attribution:** **inferred-strong** — attributed to **the project team itself** at the entity level by unanimous contemporaneous reporting and by the later return of funds under investigator and law-enforcement pressure; no individual is named in the sources cited here. This was not an external exploit: the backdoor was placed by the people who deployed the protocol, which is why the corpus files it under T6 (Defense Evasion) rather than T9. No public indictment is recorded in the sources OAK cites here; the return of funds followed investigator and law-enforcement involvement reported at the time.

**Key teaching point:** **"Verified source" answers one question — does this contract's own bytecode match this source — and everybody reads it as answering a different one: does this deployment behave the way the code I just read says it does.** The gap between those two questions is exactly the size of whatever the contract delegates to. StableMagnet's operators did not defeat verification; they **used it**, publishing honest source for the part the explorer checks and putting the backdoor in the part it does not. Three consequences for defenders. First, **the verification badge is scoped, and the scope is not displayed** — a reader sees a green check with no indication that a linked library was excluded from it. Second, **the audit surface must follow delegation**: libraries, proxies, delegatecall targets and external modules are part of the deployed program, and reviewing only the verified file reviews only part of it. Third, and most durable: **the backdoor spent user approvals**, so the protocol did not need to hold your funds to take them — approving it was enough.

## Summary

**StableMagnet** launched on **BNB Chain** as a stablecoin AMM, with a **3Pool** holding USDT, USDC and BUSD. Its contracts were published and showed as **verified** on BscScan.

Explorer verification establishes that the **source submitted for a contract compiles to that contract's deployed bytecode**. Solidity contracts may also call **external libraries at a separate address**, and at the time explorers **did not verify the code deployed at those library addresses**. The published source therefore described the contract truthfully while saying nothing reliable about the library it delegated to.

StableMagnet's operators deployed a **library that differed from the one implied by the published source**, containing a backdoor. On **2021-06-23** they used it: about **\$27M** left the 3Pool — **8M USDT, 7.2M USDC, 7M BUSD** — and the backdoor additionally allowed transfers **from wallets that had granted the protocol an allowance**.

Roughly **\$24M of the proceeds was reported returned on 2022-12-01**, after sustained investigator and law-enforcement attention.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| (pre-launch) | Contracts published and **verified** on BscScan; the **linked library's deployed code is outside verification scope** | **standing T6.001 condition** |
| (pre-launch) | A **library differing from the published source** is deployed at the linked address, carrying an operator backdoor | **T6.001 — the deception** |
| (operating) | Users deposit into the **3Pool** and grant the protocol **allowances** | (exposure accumulates) |
| 2021-06-23 | Operators drain **8M USDT, 7.2M USDC, 7M BUSD** (~\$27M); the backdoor also reaches **wallets that had approved the protocol** | **T5.001 + T6.001 exploitation** |
| 2022-12-01 | About **\$24M reported returned** after investigator and law-enforcement pressure | (disposition, T+~17 months) |

## What defenders observed

- **The lie was placed exactly where the tooling stops looking.** Nothing about the contract's own source was false. A reviewer reading it, and an automated scanner parsing it, would both find a clean stablecoin AMM — because the part that mattered was at another address that the verification badge silently did not cover. **Any assurance signal with an undisclosed scope becomes an attack surface**, and this is the cleanest demonstration of it in the corpus.
- **Delegation is the boundary of a review, and it is enumerable.** A contract's libraries, proxy implementations, delegatecall targets and external modules are readable from its bytecode and its storage. The check — *for every address this contract delegates to, is that address's code verified and reviewed?* — is mechanical, cheap, and the whole defence here.
- **Approvals turned a pool drain into a wallet drain.** The 3Pool's reserves were the headline, but the backdoor also moved balances out of wallets that had merely granted an allowance. Five years before the ether.fi and Gondi cases, the same property is doing the same work: **a standing approval is a grant to whatever that address's code decides to do**, and the code here was chosen to abuse it.
- **Recovery took seventeen months and was not a protocol control.** About \$24M came back through investigation and legal pressure, not through anything in the system's design. It should not be read as mitigation: at the moment of the drain there was no on-chain mechanism that could have stopped or reversed it.

## Public references

- `[rektstablemagnet2021]` — Rekt, "StableMagnet — Rekt": <https://rekt.news/stablemagnet-rekt>
- `[w3iggstablemagnet2021]` — Web3 Is Going Just Great, "StableMagnet makes off with \$27 million in rug pull" (2021-06-23; the linked-library substitution that explorers do not verify): <https://www.web3isgoinggreat.com/?id=2021-06-23-0>
- `[quadrigastablemagnet2021]` — Quadriga Initiative case study, "Jun 2021 — StableMagnet Exit Scam — \$27m" (asset breakdown: 8M USDT, 7.2M USDC, 7M BUSD from the 3Pool; the approval-reaching backdoor; the later return of funds): <https://www.quadrigainitiative.com/casestudy/stablemagnetexitscam.php>
- `[halbornstablemagnet2021]` — Halborn, "Explained: The StableMagnet Rugpull (June 2021)": <https://halborn.com/explained-the-stablemagnet-rugpull-june-2021>

## Discussion

Until now `techniques/T6.001-source-verification-mismatch.md` stated plainly that **OAK did not name a canonical incident for the Technique** — it carried the 2020 Uniswap honeypot wave as cohort-level evidence and the 2025-12 USPD clandestine-proxy case, and asked contributors for a named anchor. StableMagnet is that anchor, and it is a better one than a more recent case would be, because the deception is **structural rather than clever**: it needs no obfuscation, no compiler trick and no hidden opcode, only the knowledge that the explorer's badge covers one address and the program spans two.

The Technique's modern descendants all preserve that shape while moving the unverified component. **USPD's CPIMP** (2025-12) hid behind a proxy whose implementation slot pointed somewhere the reader was not looking. **Audius** (2022-07) turned a storage-slot collision into re-initialisable governance. **TeamPCP's TanStack compromise** (2026-05) shipped malicious npm versions carrying **valid SLSA Build Level 3 provenance** — the same manoeuvre one layer up the supply chain, where the attestation is truthful about a build and silent about intent. In every case the assurance mechanism functioned correctly and answered a narrower question than its audience believed.

For contributors: when documenting a T6.001 case, record **which artefact was verified, by whom, and what that verification actually covered** as three separate fields. The interesting finding is almost never that verification failed — it is the distance between what it asserted and what a reader took it to mean.
