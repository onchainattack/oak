# DPRK IT Worker Crypto Team Infiltration — Multi-Protocol — 2024-08

**Loss:** $1.3M stolen from a single protocol treasury via malicious code pushed by DPRK IT workers; 25+ crypto projects identified as infiltrated.
**OAK Techniques observed:** OAK-T4.007 (Native App Social Phishing / Engagement-Weighted Platforms) — hiring-stage social engineering; OAK-T11.007 (Supply Chain — Malicious Insider).
**Attribution:** **confirmed** — Democratic People's Republic of Korea (DPRK) IT worker network. Linked to Lazarus Group infrastructure.

**Key teaching point:** DPRK IT workers infiltrate crypto teams through standard hiring platforms, presenting as legitimate remote developers. Once hired and granted repository access, they push malicious code or exfiltrate private keys. The detection challenge is that they pass standard hiring checks — the attack is the hiring process itself. Detection approach: monitor for developers who share IP ranges with known DPRK worker infrastructure, use multiple pseudonymous identities, or request unusual access patterns shortly after onboarding.

## Summary

In August 2024, a crypto protocol team reached out to ZachXBT for assistance after $1.3M was stolen from their treasury. Investigation revealed the team had unknowingly hired multiple DPRK IT workers as remote developers. The workers had pushed malicious code that exfiltrated treasury funds.

ZachXBT traced the laundering path: theft address → Solana → deBridge → Ethereum → eXch (swap to BTC). The investigation further revealed that 25+ crypto projects had been infiltrated by the same DPRK IT worker network, often with multiple workers at the same company.

The DPRK IT worker scheme is a well-documented revenue stream for the DPRK regime. Workers present as remote developers (often claiming to be from China, Japan, or South Korea), use fake identities and resumes, pass technical interviews, and once hired, have legitimate access to codebases, private keys, and internal systems. The $1.3M theft was a direct treasury drain; other infiltrated projects may have had data exfiltrated or backdoors installed without immediate theft.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| Pre-2024 | DPRK IT workers apply to crypto protocol jobs via LinkedIn, Upwork, Discord, etc. using fake identities | **T11.007 supply chain infiltration** |
| 2024 | 25+ crypto projects infiltrated. Multiple workers placed at single companies for redundancy | **T4.007 social engineering at hiring** |
| 2024-05~08 | Malicious code pushed to one protocol's repository. Treasury access obtained via legitimate credentials | **T11.007 malicious insider** |
| 2024-08 | $1.3M drained from protocol treasury to theft address on Solana | **T5 drain** |
| 2024-08 | Laundering: Solana → deBridge → Ethereum → eXch (swap to BTC). Funds exit to DPRK-controlled infrastructure | **T7 laundering** |
| 2024-08-15 | ZachXBT publishes investigation; 25+ companies alerted | (public disclosure) |

## What defenders observed

- **Hiring-stage anomalies:** Workers used multiple pseudonymous identities. IP ranges overlapped with known DPRK worker infrastructure. Resumes listed overlapping employment timelines across different identities.
- **Post-hiring access patterns:** Workers requested access to private key material, treasury addresses, or deployment pipelines shortly after onboarding — faster than legitimate new hires typically do.
- **On-chain laundering path:** Solana → deBridge → Ethereum → eXch BTC swap. Consistent with DPRK laundering patterns observed in other Lazarus Group incidents.
- **Double-placement redundancy:** Multiple DPRK workers were placed at a single company, providing redundancy if one was discovered. This was detectable by cross-referencing IP ranges and identity artifacts across "different" employees.

## What this example tells contributors

- **The interview is the attack vector.** T11.007 (Supply Chain) typically models software dependency compromise. The DPRK IT worker pattern extends this to the human supply chain: the developer hired is the malicious dependency. T11 needs a sub-technique for "malicious insider via hiring social engineering."
- **Cross-team information sharing is a detection primitive.** 25+ companies were infiltrated by the same network. If one company detected the infiltration and shared indicators (identity artifacts, IP ranges, resume patterns), others could have been alerted. OAK should model this as a detection data source: "cross-organization insider indicator sharing."
- **Access velocity after onboarding is a signal.** Legitimate hires take weeks to request treasury access; infiltrators request it in days. This temporal signal is detectable by monitoring access request velocity for new hires.

## Public references

- [ZachXBT — DPRK IT Worker Investigation (X/Twitter)](https://twitter.com/zachxbt/status/1824047425822310580)
- [FBI — DPRK IT Worker Advisory (2024)](https://www.ic3.gov/PSA/2024/PSA240509)
- Laundering path: deBridge, eXch, documented in ZachXBT thread.
