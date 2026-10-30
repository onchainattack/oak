# NEAR Intents — a bug at the seam between the Omni deposit/withdrawal layer and the intents contract let USDT leave a BNB Chain treasury — NEAR Intents / BNB Chain — 2026-10-01

**Loss:** **~\$3.8M USDT**, drained from a treasury contract on BNB Chain over two days. **Returned in full on 2026-10-02** after a 48-hour ultimatum; NEAR Intents had also committed to compensating users. Disposition is neutral metadata.

**OAK Techniques observed:** **OAK-T7.003** (Cross-Chain Bridge Laundering — ZachXBT traced the funds to KuCoin and bridged to Bitcoin before the return; see [`techniques/T7.003-cross-chain-bridge-laundering.md`](../techniques/T7.003-cross-chain-bridge-laundering.md)). **OAK-T10.002** (Message Verification Bypass — *provisional*. The team describes the root cause as a bug in **how the Omni deposit and withdrawal layer interacted with the main NEAR Intents contract**: the treasury released funds on the strength of a cross-system message it should not have accepted. See [`techniques/T10.002-message-verification-bypass.md`](../techniques/T10.002-message-verification-bypass.md)). **No technical post-mortem has been published**; the mapping moves if one does.

**Attribution:** **pseudonymous.** GM Alex Shevchenko said the team had identified the exploiter; ZachXBT traced funds to KuCoin and bridged to Bitcoin before the return. An on-chain message from the exploiter apologised.

**Key teaching point:** **An intents system is a bridge whose verification is spread across components, and the bug lives where one component assumes the other checked.** The SHIELD monitoring layer caught it and the fix shipped within an hour, but deposits and withdrawals on 11 networks paused for ~12 hours: the blast radius of a seam bug is every chain the seam serves.

## Summary

On 2026-10-01 an attacker exploited a flaw in the handoff between NEAR Intents' Omni deposit/withdrawal infrastructure and its intents contract, withdrawing ~\$3.8M USDT from a BNB Chain treasury. NEAR Intents paused services on 11 networks, patched within an hour, and gave the identified exploiter 48 hours. The funds came back in full on 2026-10-02; the investigation closed 2026-10-04.

## Timeline (UTC)

Read it as three stages. **Flaw**: a seam bug between two components. **Take**: one BNB Chain treasury drained. **After**: services paused and patched, then the funds came back in full. Times are from the NEAR Intents statement and Decrypt; the Crypto Briefing page was not retrievable.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-01 (since when: undisclosed) | A bug exists in how the Omni deposit and withdrawal infrastructure interacts with the NEAR Intents smart contract. The treasury on BNB Chain releases funds on a cross-system message it should not have accepted. No post-mortem names the failing check. | **T10.002** |
| Before the drain (undisclosed) | Funding and rehearsal are not published. | — |
| 2026-10-01 (time undisclosed) | The attacker withdraws **~\$3.8M USDT** from the BNB Chain treasury contract. Transaction hashes are not published in the cited sources. | **T10.002** |
| 2026-10-01 → 10-02 | ZachXBT traces the stolen funds to KuCoin and bridges to Bitcoin (Decrypt). Exact dates and addresses are not published. | T7.003 |
| 2026-10-01 12:53:20 | NEAR Intents says services were stopped after an incident was detected. It reports the contract-side vulnerability patched, expects NEAR Intents and near.com to resume within about 1 hour, and says deposits and withdrawals on 11 networks (BSC, Polygon, TON, Optimism, Avalanche, Stellar, Monad, LayerX, Adi, Scroll, Plasma) stay down ~12 hours more. Loss ~\$3.8M, to be compensated in full; incident reported to law enforcement. | response |
| 2026-10-01 | GM Alex Shevchenko posts Bitcoin, BNB/Ethereum and Solana return addresses, tells the attacker "We have identified you, sir" and gives 48 hours to return the funds. | response |
| 2026-10-02 | The funds are returned in full. An on-chain message that appears to come from the exploiter says "we were in the wrong". Shevchenko: "We are stopping the investigation." (Decrypt). Return transactions and addresses are not published. | response |

Key addresses:

- No addresses or transaction hashes are published in the cited sources (treasury contract, attacker, return addresses, KuCoin deposit all unnamed).

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
