# Cascade — pre-launch depositors farming reward points had their USDC locked until mainnet, so when the CLS vault was drained none of them could have withdrawn first — Cascade (Arbitrum) — 2026-07-16

**Loss:** **~\$1.34M USDC** taken from Cascade's **CLS vault**, which held **pre-launch deposits that users could not withdraw**. The attacker bridged the proceeds from **Arbitrum to Solana**, then to **Ethereum via Relay Protocol**, converting into **DAI**. Cascade halted trading across the platform. Cascade closed a **\$15M seed round led by Polychain and Variant in December 2025**, marketing itself as a "neo-brokerage" offering 24/7 perpetual trading across crypto, commodities, and tokenised pre-IPO equities, with mainnet targeted for Q1 2026.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary, inferred-strong, mechanism not fully disclosed*. Public reporting describes a vault exploit that drained locked USDC deposits and characterises it as a suspected security vulnerability in the CLS vault, but **no root-cause analysis has been published**, and OAK does not have the specific failing predicate. The technique assignment reflects the class of control that must have failed for a third party to move vault-held deposits; it should be revised if a root cause is published. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). **OAK-T7.003** (Cross-Chain Bridge Laundering — Arbitrum → Solana → Ethereum, a deliberate multi-hop chain-switching path rather than a single bridge crossing).

**Attribution:** **pseudonymous.** No named individual or group, and no public link to a tracked OAK actor. The laundering path is the most distinctive observable: **Arbitrum → Solana → Ethereum via Relay Protocol, ending in DAI**, a routing choice that crosses two virtual machines and is more consistent with deliberate trail-breaking than with a convenience swap.

**Key teaching point:** **A points-farming deposit is a custody arrangement wearing the clothes of a product, and locking withdrawals removes the only defence a depositor has.** Cascade's "First Wave" invited users to deposit USDC on Arbitrum to accrue reward points ahead of a public launch, with funds **locked until mainnet trading went live**. That structure produced a vault holding real user money, in production, before the product it belonged to existed — and therefore before the operational maturity, monitoring, and incident-response capability that a live venue develops. When the vault was drained, **no depositor could have exited even with perfect awareness**, because withdrawal was disabled by design. The asymmetry is the whole lesson: the lock served the operator's launch economics, while every unit of risk it created landed on the depositor. Users evaluating a points campaign should treat "funds locked until launch" as a statement that the operator's pre-launch security posture is the *only* thing standing between them and total loss, and operators running one should hold pre-launch deposits behind the same controls as live customer funds — segregation, withdrawal caps, multi-party control, and monitoring — or not lock them at all.

## Summary

**Cascade** is a self-described "neo-brokerage" building 24/7 perpetual trading across crypto, commodities, and tokenised pre-IPO equities such as OpenAI, SpaceX, and Stripe. It raised a **\$15M seed round led by Polychain and Variant in December 2025** and targeted mainnet for Q1 2026.

Ahead of public launch, Cascade ran an **invite-only "First Wave"** campaign in which users deposited **USDC on Arbitrum** into the **CLS vault** to earn reward points. Those **pre-allocated funds were locked until mainnet trading went live**, meaning depositors had **no withdrawal access** at any point before the incident.

On **2026-07-16**, an attacker drained approximately **\$1.34M USDC** from the CLS vault. Cascade confirmed the incident and **halted trading across the platform**.

The exploiter **bridged the stolen funds from Arbitrum to Solana**, then routed them **to Ethereum via Relay Protocol**, converting into **DAI**.

The specific vulnerability has **not been publicly root-caused** at the level of a named function or failing check; reporting describes it as a suspected security vulnerability in the CLS vault that allowed the locked deposits to be moved.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2025-12 | Cascade closes a \$15M seed round led by Polychain and Variant; mainnet targeted for Q1 2026 | (context) |
| (standing) | Invite-only "First Wave" campaign accrues reward points against USDC deposited into the CLS vault on Arbitrum; funds locked until mainnet launch, no withdrawal path for depositors | (standing exposure) |
| 2026-07-16 | CLS vault drained of ~\$1.34M USDC | **T9.004 exploitation** |
| 2026-07-16 | Cascade confirms the incident and halts trading across the platform | (operator response) |
| after | Proceeds bridged Arbitrum → Solana, then to Ethereum via Relay Protocol, converted into DAI | **T7.003** |

## What defenders observed

- **Pre-event (locked deposits invert the normal risk-transfer).** In a live venue, a user who becomes uneasy can withdraw; that option is the depositor's primary control. A points campaign that locks funds until launch deletes it, so the operator's pre-launch security posture becomes the depositor's sole protection — at exactly the stage where that posture is least mature.
- **Pre-event (production custody before production readiness).** The vault held real user funds in production while the product around it was still pre-launch. Pre-launch deposit vaults should be scoped into security review, monitoring, and incident response as live customer-funds systems, because that is what they are, irrespective of what the roadmap calls them (M23, M35).
- **Pre-event (funding and backing are not security signals).** A \$15M round led by well-known funds says nothing about vault controls. This is the same category error OAK records at [`examples/2026-07-triple-a-hot-wallet-compromise-deposit-addresses-left-live.md`](2026-07-triple-a-hot-wallet-compromise-deposit-addresses-left-live.md), where a MAS licence coexisted with a 31-hour hot-wallet drain: institutional validation is metadata about counterparty credibility, not about mechanism exposure.
- **At-event (a locked vault has an unambiguous expected outflow of zero).** This is the cheapest monitoring rule in the corpus. If deposits cannot be withdrawn until launch, then **any** outflow before launch is anomalous by definition — no baselining, no thresholds, no false positives. A vault under a withdrawal lock should alert on the first unit that leaves (M04, M05).
- **At-event (no withdrawal cap on a locked vault).** With a monitoring rule that trivial available and unused, a hard per-window egress cap would have bounded the loss mechanically even without detection.
- **Response (chain-switching laundering).** Arbitrum → Solana → Ethereum crosses EVM and non-EVM environments, which breaks single-ecosystem tracing tooling and slows analyst attribution. Recording the full hop sequence — including the specific bridge, here Relay Protocol — is what lets later cases be clustered against this routing pattern (M06).

## Public references

- `[cryptotimescascade2026]` — The Crypto Times, "Polychain-Backed Cascade Hacked for \$1.34M in Locked User Funds" (the \$1.34M USDC loss from the CLS vault, the invite-only "First Wave" points campaign with USDC deposited on Arbitrum, funds locked until mainnet launch leaving depositors with no withdrawal access, the \$15M Polychain- and Variant-led seed round of December 2025, and the neo-brokerage positioning with Q1 2026 mainnet target): <https://www.cryptotimes.io/2026/07/16/polychain-backed-cascade-hacked-for-1-34m-in-locked-user-funds/>
- `[cryptotimesweek0719]` — The Crypto Times, "Crypto Loses Over \$20M in a Week as Ostium, Across, Cascade Get Hacked" (2026-07-16 dating, Arbitrum scope, the \$1.34M figure, and the Arbitrum → Solana → Ethereum-via-Relay-Protocol laundering path): <https://www.cryptotimes.io/2026/07/19/crypto-loses-over-20m-in-a-week-as-ostium-across-cascade-get-hacked/>
- `[tronweeklycascade2026]` — TronWeekly, "Cascade Loses \$1.3 Million In Hack As Trading Halts Across Platform" (independent confirmation of the loss and the platform-wide trading halt): <https://www.tronweekly.com/cascade-loses-1-3-million-in-hack-as-trading/>
- `[ababnewscascade2026]` — ABAB News, "Cascade CLS Vault Suspected Security Vulnerability Leads to \$1.3 Million Loss" (the CLS vault as the affected component and the suspected-vulnerability characterisation, i.e. the absence of a published root cause): <https://www.ababnews.com/news/facf18e2-603d-4b01-921f-c7813024777b>

## Discussion

Cascade's mechanism is the least well-documented in OAK's July 2026 cohort, and the entry is deliberately conservative about that — the technique assignment records the class of control that had to fail rather than asserting a specific defect nobody has published. Contributors should revise it if a root-cause analysis appears. That gap is itself a finding worth recording: a \$1.34M loss at a well-funded team produced no public post-mortem, so no other operator running a pre-launch deposit vault can check whether they share the exposure. Compare [`examples/2026-07-across-solana-relayer-anchor-event-discriminator-forgery.md`](2026-07-across-solana-relayer-anchor-event-discriminator-forgery.md) from the following day, where a published root cause — a missing 8-byte discriminator check — turned one team's incident into an actionable check for every Solana event consumer.

The structural contribution here is the **points-farming deposit vault** as a recurring and under-examined exposure class. It has become a standard pre-launch growth mechanism: invite users to park capital for future reward allocation, lock it to prevent mercenary churn, and launch later. Each element makes sense commercially and the combination produces a predictable security shape — meaningful custodied balances, held in production, before the operator has live-system operational maturity, with the depositors' exit option removed for the operator's benefit. The lock is what converts an ordinary early-stage risk into a total one, since a depositor who correctly reads the risk still cannot act on it.

The monitoring asymmetry is the sharpest practical takeaway. A locked vault has an **expected pre-launch outflow of exactly zero**, which makes it one of the easiest systems in DeFi to monitor correctly — a single alert on any egress, with no tuning required and no plausible false positive. That such a rule was apparently not in place is the clearest evidence for the general point: pre-launch vaults are not being operated as the live customer-funds systems they functionally are.
