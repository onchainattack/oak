# Dritan Kapllani Jr — Social Engineering Theft — 2024–2026

**Loss:** $19M+ from multiple victims via social engineering thefts targeting crypto holders.
**OAK Techniques observed:** OAK-T4.007 (Native App Social Phishing / Engagement-Weighted Platforms) — primary; OAK-T7 (Laundering) — post-exploit.
**Attribution:** **confirmed** — Dritan Kapllani Jr, US-based threat actor. Connected on-chain to John Daghita ("Lick") via a B4B (business) relationship. John Daghita was investigated for $40M+ theft from US government seizure addresses.

**Key teaching point:** The Dritan Kapllani Jr case demonstrates the **social engineering specialist** profile: a threat actor who specializes exclusively in social engineering thefts (not smart contract exploits, not ransomware) from crypto holders. The profile is characterized by: luxury lifestyle flexing (cars, watches, private jets, gambling), B4B relationships with other social engineering scammers, and targeting of high-net-worth crypto holders identified through public wallet activity. Detection approach: monitor for threat actors who flex luxury lifestyle on social media while receiving large crypto inflows from addresses linked to known victim reports.

## Summary

Dritan Kapllani Jr is a US-based threat actor tied to $19M+ in social engineering thefts targeting crypto holders. He publicly flexed luxury cars, watches, private jets, and casino gambling — all funded by stolen crypto. ZachXBT assisted affected parties by uncovering on-chain activity linking Dritan to the thefts.

Dritan had a B4B (business-for-business) relationship with John Daghita ("Lick"), who was investigated for stealing $40M+ from US government seizure addresses. Dritan helped Daghita launder some of the proceeds. This B4B dynamic — social engineering scammers cross-referring victims and sharing laundering infrastructure — is a recurring pattern.

The case was held from publication until charges became public, at which point ZachXBT released the on-chain evidence.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2024~2026 | Dritan conducts social engineering thefts against crypto holders. $19M+ stolen | **T4.007 social engineering** |
| 2024~2025 | B4B relationship with John Daghita (Lick). Laundering and victim cross-referral | **T7 laundering coordination** |
| 2026-01 | John Daghita arrested. Investigation reveals $40M+ stolen from US gov seizure addresses | (legal) |
| 2026-05-12 | ZachXBT publishes Dritan investigation after charges become public. On-chain evidence ties Dritan to $19M+ in thefts | (public disclosure) |

## What defenders observed

- **Lifestyle forensics:** Dritan's social media showed luxury cars, watches, private jets, and casino gambling — lifestyle spending inconsistent with any legitimate income source. For a social engineering threat actor, lifestyle flexing is a forensic signature.
- **B4B cross-referral:** Dritan and John Daghita shared victims, laundering infrastructure, and operational knowledge. This B4B pattern — scammers doing business with other scammers — creates on-chain clusters that are larger and more detectable than isolated actors.
- **On-chain linkage:** Dritan's addresses were connected to John Daghita's addresses through shared deposit destinations, revealing the B4B relationship even before either was identified.
- **Delayed publication:** ZachXBT held the investigation until charges were filed, illustrating the operational security considerations of publishing attribution before law enforcement action.

## What this example tells contributors

- **Social engineering specialist is a distinct actor profile.** Unlike Lazarus Group (state-sponsored, multi-vector) or ransomware gangs (extortion model), Dritan represents the "pure social engineering" threat actor: no technical exploits, just phone calls and credential theft. OAK's actor taxonomy should distinguish between exploit-based and social-engineering-specialist threat actors.
- **B4B relationships create on-chain clusters.** When two social engineering scammers do business together (laundering, victim referral), their on-chain activity overlaps. This overlap is detectable as a cluster even if individual thefts are small and would not individually trigger alerts.
- **Lifestyle spending is an attribution signal.** Threat actors who flex luxury purchases on social media create a paper trail: the address that received stolen funds → the exchange that converted to fiat → the car dealership, watch dealer, or casino. OAK attribution methodology should include lifestyle forensic analysis as a standard step.

## Public references

- [ZachXBT — Dritan Kapllani Jr Investigation (X/Twitter)](https://twitter.com/zachxbt/status/1920845187586105848)
- [ZachXBT — John Daghita (Lick) Investigation (X/Twitter)](https://twitter.com/zachxbt/status/1882857096382484480)
- On-chain evidence: documented in ZachXBT investigation threads.
