# NEAR Intents — a bug at the seam between the Omni deposit/withdrawal layer and the intents contract let USDT leave a BNB Chain treasury — NEAR Intents / BNB Chain — 2026-10-01

**Loss:** **~\$3.8M USDT**, drained from a treasury contract on BNB Chain over two days. **Returned in full on 2026-10-02** after a 48-hour ultimatum; NEAR Intents had also committed to compensating users. Disposition is neutral metadata.

**OAK Techniques observed:** **OAK-T10.002** (Message Verification Bypass — *provisional*. The team describes the root cause as a bug in **how the Omni deposit and withdrawal layer interacted with the main NEAR Intents contract**: the treasury released funds on the strength of a cross-system message it should not have accepted. See [`techniques/T10.002-message-verification-bypass.md`](../techniques/T10.002-message-verification-bypass.md)). **No technical post-mortem has been published**; the mapping moves if one does.

**Attribution:** **pseudonymous.** GM Alex Shevchenko said the team had identified the exploiter; ZachXBT traced funds to KuCoin and bridged to Bitcoin before the return. An on-chain message from the exploiter apologised.

**Key teaching point:** **An intents system is a bridge whose verification is spread across components, and the bug lives where one component assumes the other checked.** The SHIELD monitoring layer caught it and the fix shipped within an hour, but deposits and withdrawals on 11 networks paused for ~12 hours: the blast radius of a seam bug is every chain the seam serves.

## Summary

On 2026-10-01 an attacker exploited a flaw in the handoff between NEAR Intents' Omni deposit/withdrawal infrastructure and its intents contract, withdrawing ~\$3.8M USDT from a BNB Chain treasury. NEAR Intents paused services on 11 networks, patched within an hour, and gave the identified exploiter 48 hours. The funds came back in full on 2026-10-02; the investigation closed 2026-10-04.

## Root-cause evidence

- **Technique:** OAK-T10.002
- **Source:** <https://decrypt.co/380014/near-intents-recovers-3-8-million-after-48-hour-ultimatum>; <https://x.com/near_intents/status/2105642219357241796>
- **Source type:** operator
- **Confidence:** reported
- **Evidence:** NEAR Intents says a bug in how the Omni deposit/withdrawal layer interacted with the main contract allowed the drain. No technical post-mortem; the operator names the component, not the failing check, so the T10.002 mapping is provisional.

## Public references

- `[decryptnearintents2026]` — Decrypt, "'We Have Identified You, Sir': Near Intents Recovers \$3.8 Million After 48-Hour Ultimatum" (2026-10-04): <https://decrypt.co/380014/near-intents-recovers-3-8-million-after-48-hour-ultimatum>
- `[cryptobriefingnearintents2026]` — Crypto Briefing, "NEAR Intents recovers \$3.8 million from exploit and closes its investigation": <https://cryptobriefing.com/near-intents-recovers-exploit-funds/>
- `[slowmistnearintents2026]` — NEAR Intents on X, incident statement (cited by SlowMist Hacked): <https://x.com/near_intents/status/2105642219357241796>
