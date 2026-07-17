# OAK-M45 — Inbound-Contact Refusal and Out-of-Band Callback

**Class:** user-behavioural
**Audience:** retail-user, custody-customer, venue, vendor

**Maps to Techniques:** OAK-T11.007.003, OAK-T11.005.001, OAK-T11.005.002, OAK-T4.010

## Description

A channel-level invariant that resolves an entire class of impersonation without requiring the user to evaluate the impersonator: **treat inbound contact claiming to be support as the attack, terminate it, and re-establish the channel from a contact point held before the contact occurred.**

The mitigation's leverage comes from moving the decision away from *content* and onto *direction*. Content-based defence — spotting a wrong domain, an odd phrasing, a bad accent, a spoofed number — is a contest the defender loses over time, because every content signal the defender learns is a signal the attacker can buy or fix. Direction is not improvable by the attacker: to run the attack at all they must initiate. A rule that refuses all inbound support contact therefore has no exploitable gradient, which is why it outperforms every "how to spot a scam call" checklist in the corpus.

The rule's second function is defeating the manufactured clock. Support-impersonation scripts universally assert that the account is being drained *now* and that hanging up will cost the victim their money. That urgency is not incidental — it exists specifically to prevent the callback, because the callback is the only step that reliably kills the attack. Recognising urgency-to-prevent-verification *as the tell* inverts the script's own mechanism: the harder the caller resists being called back, the more certain the diagnosis. Naming this explicitly is the load-bearing part of the mitigation, because the emergency is precisely what makes a normally-careful person skip the verification step.

## How it applies

- **OAK-T11.007.003 (Brand-Trust-Leveraged Active Phishing for Seed-Phrase Exfiltration):** the technique is channel counterfeiting — the device is genuine and the *communication* is attacker-controlled. Refusing the inbound channel and reconnecting through the vendor's published support path defeats the campaign at its only load-bearing step, independent of how well the counterfeit channel is executed. Pairs with [`OAK-M44`](./OAK-M44-seed-phrase-disclosure-refusal.md), which holds as terminal defence if the channel rule fails.
- **OAK-T11.005.001 (Fake-CEX / Pig-Butchering Platform):** acquisition for this technique is inbound by construction — an unsolicited message, a wrong-number opener, a dating-app match, a friendly stranger with an investment insight. The rule applies to the *relationship*, not just to support calls: an investment platform that arrives via inbound contact from someone who found you is the technique's own entry vector.
- **OAK-T11.005.002 (Fake-Custodian / Fake-Asset-Manager Fraud):** same acquisition shape, arriving as MLM recruitment or an "AI-trading" pitch. Refusing inbound-sourced investment platforms removes the reader from the funnel before the fattening phase begins, which is the only phase where refusal is cheap.
- **OAK-T4.010 (Fake Security-Tool / Browser-Extension Phishing):** a significant sub-flow is inbound "we noticed suspicious activity on your wallet — install our scanner" contact. The rule intercepts it at the channel; [`OAK-M44`](./OAK-M44-seed-phrase-disclosure-refusal.md) intercepts it at the payload.

## Limitations

**The largest inbound-impersonation surface in the corpus has no Technique to map to.** Voice/phone impersonation of a *custodial venue's* support to an end user — the Coinbase-support-impersonation class, ~\$300M/yr, with named arrests — is currently mapped to OAK-T4.007, whose scope is engagement-weighted in-platform distribution mechanics (comment-pinning, reply-ranking) and does not cover a spoofed phone call. T11.007.003 is parented under hardware-wallet compromise and does not reach exchange support either. This mitigation therefore under-declares its real coverage, and will keep doing so until the gap is filled. See `TAXONOMY-GAPS.md`.

Does nothing against outbound-initiated compromise: a user who searches for support and lands on a paid ad for a fake support line (T4.008) has initiated the contact themselves and this rule never fires. That surface belongs to [`OAK-M47`](./OAK-M47-first-party-acquisition.md).

Does nothing once the relationship is established. The rule is an acquisition-phase control; a victim three months into a pig-butchering relationship is no longer receiving *inbound contact from a stranger*, they are talking to someone they believe they know. By the deposit phase, this mitigation has already failed and [`OAK-M46`](./OAK-M46-small-test-withdrawal-invariant.md) is the remaining line.

The rule also carries a real false-positive cost that should be stated rather than minimised: legitimate institutions do make outbound calls, and a user applying this rule will hang up on some of them. That cost is correct to pay — the callback resolves the legitimate case at the price of a few minutes — but a mitigation that pretends it is free will not be followed.

## Reference implementations

- **Venue-side (partial, uneven):** in-app-only support channels with no outbound voice; published verification that support never calls; caller-ID anti-spoofing at the carrier layer (STIR/SHAKEN in the US, patchy internationally and trivially bypassed via VoIP origination).
- **Vendor-side:** published "we will never call you" statements. The corpus indicates these do not reach the user at the moment of the call.
- **No production tooling.** This is a human refusal executed under engineered stress. The nearest structural control is venue-side elimination of the outbound-voice channel entirely, which removes the attacker's cover story.

## Citations

- See [`examples/2023-2026-coinbase-support-impersonation.md`](../examples/2023-2026-coinbase-support-impersonation.md) — the class anchor; ~\$300M/yr; data-broker-sourced personal detail; named arrests (rare in the corpus). Currently mis-mapped to T4.007 — see Limitations.
- See [`examples/2024-08-genesis-creditor-social-engineering.md`](../examples/2024-08-genesis-creditor-social-engineering.md) — the class's best-established anchor and the one this mitigation is actually specified against: two chained spoofed calls an hour apart (Google Support, then Gemini Support, each stage's extraction authenticating the next), \$243M, attribution `confirmed`, three named principals, one arrest. The callback rule breaks the chain at either stage.
- See [`examples/2026-01-hardware-wallet-social-engineering.md`](../examples/2026-01-hardware-wallet-social-engineering.md) — \$282M+, larger but **weaker evidence**: no public source establishes the impersonation channel, so whether this mitigation would have reached it is unknown. Cited for scale, not as a mechanism anchor.
- See [`examples/2024-01-kk-park-compound-takedown.md`](../examples/2024-01-kk-park-compound-takedown.md) — the inbound acquisition script at industrial scale.
