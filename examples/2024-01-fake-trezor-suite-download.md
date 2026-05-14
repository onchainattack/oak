# Fake Trezor Suite download phishing campaign — multi-chain — 2024

**Loss:** estimated \$3.2M aggregated across ~80+ individual victims who downloaded a trojanised "Trezor Suite" application from a typosquat domain impersonating the official Trezor download page. The fake application prompted users to enter their seed phrase into a "recovery verification" flow, exfiltrating the seed phrase directly to attacker-controlled infrastructure.
**OAK Techniques observed:** **OAK-T11.007.003** (Brand-Trust-Leveraged Active Phishing for Seed-Phrase Exfiltration) — primary; the attacker leveraged Trezor's brand trust through a typosquat-domain download page that visually mirrored the official Trezor Suite download experience. The trojanised application faked a "firmware corruption" error and prompted the user to enter their seed phrase for "recovery verification" — the canonical T11.007.003 channel-counterfeiting pattern. The legitimate hardware device was never compromised; the attack was against the user's trust in the vendor's software-distribution channel.
**Attribution:** **inferred-strong** at the campaign-operator level. The typosquat domain infrastructure was traced to a known phishing-as-a-service operator cluster. No named-individual indictment at v0.1.
**Key teaching point:** **The fake Trezor Suite download campaign demonstrates that T11.007.003's channel-counterfeiting surface extends beyond email and physical-mail phishing to the software-distribution channel — the user's trust that the downloaded application is the legitimate vendor's software is the attack surface, and the legitimate-vendor-never-asks-for-seed-phrase invariant is the load-bearing mitigation regardless of the phishing channel.**

## Summary

In 2024, a phishing campaign targeted Trezor hardware-wallet users through a typosquat domain (`trezor-suite-download.com` and variants) that visually mirrored the official Trezor Suite download page. The campaign was discovered after approximately 80 victims reported drained wallets to Trezor's support channels and to industry forensics (ZachXBT).

The attack chain:

1. **Typosquat-domain download page:** Victims arrived at the typosquat domain via search-engine ads (Google Ads malvertising), social-media links, or phishing emails. The page was a pixel-perfect replica of the official Trezor Suite download page.
2. **Trojanised application download:** The downloaded "Trezor Suite" application was a repackaged version of the legitimate application with a malicious code fragment swapped in. The application functioned normally for routine operations but contained a seeded "firmware corruption" error that triggered after a randomized number of launches.
3. **Fake recovery-verification flow:** When the seeded error triggered, the application displayed a screen warning that the device's firmware had been corrupted and that the user needed to enter their seed phrase for a "recovery verification" process. The screen mimicked Trezor's legitimate visual design language and included a progress bar, a "verification" status indicator, and a customer-support chat widget — all UI-side fictions.
4. **Seed-phrase exfiltration:** Users who entered their seed phrase into the fake recovery flow had their seed phrase transmitted to attacker-controlled infrastructure. Drains followed within hours.

The structural T11.007.003 feature is channel counterfeiting: the hardware device was legitimate, the Trezor firmware was legitimate, and the user's interaction with the device up to the point of seed-phrase entry was legitimate. The attack surface was the software-distribution channel — the user's trust that the downloaded application was the genuine vendor software.

The legitimate-vendor-never-asks-for-seed-phrase invariant is the binding mitigation: Trezor Suite (the legitimate application) never requests the seed phrase. Any companion application that prompts for seed-phrase entry is definitively malicious, regardless of how convincing the visual design and error narrative appear.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-Q2 | Typosquat domains registered (`trezor-suite-download.com` and variants); trojanised Trezor Suite application prepared | (campaign preparation) |
| 2024-Q2–Q3 | Google Ads malvertising, social-media links, and phishing emails drive traffic to typosquat download page | **T11.007.003** (channel-counterfeiting acquisition) |
| 2024-Q2–Q3 | Victims download trojanised application; seeded "firmware corruption" error triggers after randomized launch count; fake recovery-verification flow solicits seed phrase | **T11.007.003** (seed-phrase exfiltration) |
| 2024-Q3 | ~80+ victims identified; ~\$3.2M aggregate loss across multiple chains | **T11.007.003** extraction |
| 2024-Q3 | Trezor issues security advisory; warns users to download Trezor Suite exclusively from `trezor.io`; typosquat domains taken down | (vendor response) |
| Continuing | Perpetrators not publicly identified; proceeds laundered through standard mixing rails | (attribution state) |

## Realised extraction

Approximately \$3.2M aggregated across ~80+ victims. No public recovery.

## Public references

- Cross-reference: T11.007.003 at `techniques/T11.007.003-brand-trust-active-phishing-seed-exfiltration.md`.
- Cross-reference: 2023-2026-fake-firmware-update-phishing-cohort at `examples/2023-2026-fake-firmware-update-phishing-cohort.md` (canonical T11.007.003 anchor, broader firmware-update/recovery-app phishing cohort).

## Public References

See citations in corresponding technique file.
