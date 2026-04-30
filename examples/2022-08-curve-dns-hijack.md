# Curve Finance frontend DNS hijack — Ethereum — 2022-08

**Loss reported:** \~\$575K from users who interacted with the cloned UI during the incident window.
**OAK Techniques observed:** OAK-T4.002 (Compromised Front-End Permit Solicitation) — primary; OAK-T7.001 (Mixer-Routed Hop) downstream as the proceeds were routed through Tornado Cash (per public reporting of the laundering route).
**Status:** registrar-side compromise (`iwantmyname` nameserver) identified and corrected; protocol redirected `.fi` to neutral nameservers and operated from an alternate domain (`curve.finance`) until stabilised.

## Summary

In August 2022, an attacker served a cloned Curve Finance UI from the protocol's primary domain by compromising the upstream DNS nameserver at the protocol's registrar (`iwantmyname`). Users who interacted with the cloned UI during the active window were prompted to approve a malicious contract via the wallet signing flow; approximately \$575K was extracted from users who signed during the window. The Curve team responded by redirecting `.fi` to neutral nameservers, taking the affected site offline while regaining control, and operating from `curve.finance` in the interim.

## OAK-T4.002 mapping

This is a textbook OAK-T4.002 case because the compromise occurred at the front-end / DNS layer rather than at the protocol's smart-contract layer:

- **What was *not* compromised:** Curve's smart contracts.
- **What *was* compromised:** the path between the user's browser and the protocol's intended UI, via a registrar-side nameserver compromise.
- **What the user signed:** an authorisation whose actual scope did not match the protocol's normal interaction patterns — the canonical OAK-T4.002 indicator.

## What defenders observed

- **Pre-event:** registrar-side controls (registry-lock, 2FA, change-control on nameserver settings) at upstream DNS provider were the relevant exposure surface; no on-chain artefact would have shown anomaly until the cloned UI was live.
- **At-event:** spike in permit-grant events from a known-protocol's user base going to a non-protocol contract — the OAK-T4.002 detection signal listed in the Technique page.
- **Post-event:** funds traced to centralized exchanges and to Tornado Cash, mapping the downstream as an OAK-T7.001 event chained to the T4.002 source.

## What this example tells contributors writing future Technique pages

- **OAK-T4.002 may exist without any contract bug at the protocol.** A common mis-classification is to attribute incidents to the protocol's contracts when the compromise was at the front-end / DNS layer. Examples should be precise about *where* the compromise happened.
- **T4.002 detection often requires inputs from outside the on-chain telemetry surface.** Public DNS / hosting change-control feeds are part of the detection methodology, not on-chain data alone. The Curve incident is a good example of a Technique that benefits from coordinating with traditional CTI sources.
- **Mitigations should be split between protocol-side (registry-lock, change-control) and user-side (verify destination contract against canonical lists before signing).**

## Public references

- `[rektcurve2022]` — rekt.news forensic write-up.

## Discussion

The Curve incident has had outsized influence on the OAK-T4.002 page's Mitigations section because the responsible defensive controls (registrar-side registry-lock, DNS change-control, canonical-contract publication for wallet allowlists) were not novel — they were widely-recommended practices that the broader DeFi protocol set had not uniformly implemented. The post-incident wave of registry-lock adoption across major DeFi protocols suggests this incident moved the baseline of expected defensive posture; contributors writing post-2022 T4.002 examples should evaluate the affected protocol's defensive posture against this updated baseline rather than the pre-2022 one.
