# Genesis Creditor — Multi-Stage Impersonation Social Engineering — 2024-08-19

**Loss:** ~$243M in BTC, ETH, and other crypto assets from a single Genesis Global Capital creditor.
**OAK Techniques observed:** OAK-T4.007 (Native App Social Phishing / Engagement-Weighted Platforms) — primary; OAK-T7 (Laundering) — post-exploit.
**Attribution:** **Identified** — three threat actors: Malone Iam ("Greavys"), Veer Chetal ("Wiz"), and Jeandiel Serrano ("Box"). Malone arrested in Miami (Sep 2024); Wiz and Box at large as of investigation date. A fourth associate, Aakaash ("Light/Dark"), assisted with laundering.

**Key teaching point:** This is the largest known social engineering theft against a single individual in crypto history. The attack demonstrates the **multi-stage impersonation escalation** pattern: the attackers chained spoofed calls (Google Support → Gemini Support), each stage extracting credentials or authorizations that enabled the next. The victim was a sophisticated institutional creditor, not a retail user. The laundering used 15+ exchanges with rapid cross-asset swapping (BTC→LTC→ETH→XMR) to break traceability.

## Summary

On August 19, 2024, three threat actors executed a highly sophisticated social engineering attack against a single Genesis Global Capital creditor, stealing approximately $243M in cryptocurrency. The attackers:

1. Called the victim spoofing Google Support, compromising personal accounts (email, cloud storage) to extract sensitive financial information
2. Called again spoofing Gemini Support, using the compromised information to gain trust and obtain wallet credentials
3. Drained the victim's crypto assets to attacker-controlled addresses
4. Split the proceeds three ways, laundering through 15+ exchanges with rapid cross-asset swaps (BTC → LTC → ETH → XMR)

ZachXBT traced the full on-chain flow and identified the three principals through a combination of on-chain analysis, leaked screen-share recordings, and private database searches. The private video recording showing the threat actors' live reaction to receiving $238M became key evidence. Malone Lam was arrested by FBI in Miami in September 2024; the other two remain at large.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-Aug 2024 | Attackers research target: a Genesis creditor with large crypto holdings | (preparation) |
| 2024-08-19 ~T+0h | Call #1: Spoof Google Support number → compromise personal email/cloud accounts → extract financial account information | **T4.007 impersonation stage 1** |
| 2024-08-19 ~T+1h | Call #2: Spoof Gemini Support → use compromised info to gain trust → obtain wallet credentials | **T4.007 impersonation stage 2** |
| 2024-08-19 ~T+2h | $243M drained from victim wallets to attacker-controlled addresses. 4,064 BTC ($238M) transferred in single tx | **T4.007 drain** |
| 2024-08-19~Sep | Laundering: funds split three ways, swapped BTC→LTC→ETH→XMR via 15+ exchanges, eXch, THORSwap | **T7 laundering** |
| 2024-09 | Malone Lam (Greavys) arrested in Miami by FBI. Wiz (Veer Chetal) and Box (Jeandiel Serrano) remain at large | (legal action) |
| 2024-09-19 | ZachXBT publishes full investigation with on-chain tracing of all three principals | (public disclosure) |

## What defenders observed

- **Pre-attack (targeting phase):** The attackers accessed personal information (name, email, phone, associated financial accounts) enabling convincing impersonation. The victim was a known creditor in the Genesis bankruptcy — this information asymmetry was the initial foothold.
- **During attack (impersonation chain):** Two spoofed calls in sequence — Google then Gemini. Each stage used credentials/information from the previous stage to build trust. The pattern is: **Stage N extracts data → Stage N+1 uses that data as proof of legitimacy**.
- **Post-attack (on-chain):** Funds moved from theft addresses to 15+ centralized exchanges within hours. The laundering used rapid cross-asset swaps (BTC→LTC→ETH) with Monero as the final hop. Each principal received a distinct share traceable on-chain.
- **Forensic (screen-share recording):** A private video recording showed the threat actors' live reaction to receiving $238M — phone notifications, celebration, discussion of laundering. This recording was key forensic evidence for attribution.

## What this example tells contributors writing future Technique pages

- **Multi-stage impersonation chaining is the T4.007++ pattern.** The attackers used NOT a single impersonation but a chain: Google Support → Gemini Support. Each stage provides credentials that authenticate the next stage. Detection engineers should model these as a state machine: `{stage_N_extracted_fields} ⊢ {stage_N+1_impersonation_target}`.
- **High-net-worth targeting is a structural feature, not an edge case.** The victim was a Genesis creditor — the attackers knew or inferred the target had large crypto holdings before the attack. T4 technique descriptions should explicitly cover "pre-attack target selection via public financial information" as part of the kill chain.
- **Laundering speed is a detection signal.** The funds moved from theft to 15+ exchanges within hours. Normal institutional transfers do not exhibit this velocity + exchange fan-out pattern. The laundering tempo is itself a detection signal for social engineering thefts.
- **Screen-share/recording artifacts are a forensic goldmine.** Threat actors recording their own reactions created the attribution evidence. Contributors writing T4 examples should note that social engineering attackers often record themselves (for clout, for associates), creating forensic artifacts beyond on-chain data.

## Public references

- [ZachXBT — Investigation Thread (X/Twitter)](https://twitter.com/zachxbt/status/1836752923830702392) — 14-part investigation with on-chain tracing of all three principals.
- [FBI / DOJ — Malone Lam arrest (Sep 2024)](https://www.justice.gov/) — Malone Iam ("Greavys") arrested in Miami.
- Theft BTC transaction: `4b277ba298830ea538086114803b9487558bb093c2caaf2496b1ce15457f5ef96`
- Laundering addresses: documented in ZachXBT thread (15+ exchange deposit addresses, eXch, THORSwap).

## Discussion

The Genesis Creditor case is structurally important to OAK because it demonstrates the upper bound of social engineering sophistication: multi-stage impersonation chains against institutional targets. The attack surface is not a smart contract — it's the human authentication layer between a custodian and their exchange/wallet provider. T4.007 (Native App Social Phishing) covers the impersonation vector, but the multi-stage chaining pattern is not yet explicitly modelled in OAK's T4 sub-technique hierarchy.

The attribution chain in this case is worth cataloguing: on-chain tracing + leaked screen recordings + private database phone number search → identification of all three principals. Contributors writing actor profiles (`actors/`) should use this case as the canonical example of how on-chain evidence combines with OSINT forensic artifacts to produce attribution even when the attackers use mixers and cross-chain swaps.
