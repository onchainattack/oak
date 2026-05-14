# Discord bookmark-phishing drainer campaign via server-boost mechanic — EVM/Solana — 2024-08 to 2024-10

**Loss:** approximately **$2.1 million** in aggregate across over 600 identified victims during a ~10-week campaign. The attacker exploited Discord's server-boost and announcement-channel mechanics to anchor phishing links in high-visibility positions within large DeFi and NFT community servers. Individual victim losses ranged from $500 to $85,000, with the median around $3,500.

**OAK Techniques observed:** **OAK-T4.007** (Native-app Social Phishing on Engagement-Weighted Platforms — primary; the distribution surface was Discord's server-boost and announcement-channel mechanics, which the attacker purchased or social-engineered to occupy high-visibility message slots within legitimate community servers) + **OAK-T4.001** (Permit2 Signature-Based Authority Misuse — chained extraction; the phishing site solicited Permit2 signatures granting token-spend authority to an attacker-controlled address, with the Permit2 payload disguised as a "server-verification signature" for Discord account linking) + **OAK-T4.004** (Allowance/Approve-Pattern Drainer — alternate extraction path where Permit2 was not supported by the victim's token contract; the drainer fell back to standard `approve()` grants).

**Attribution:** **pseudonymous** — the campaign operated through compromised Discord moderator accounts and purchased server-boost subscriptions. The phishing infrastructure rotated domains every 48–72 hours using bulletproof hosting providers. The drainer-kit fingerprint matched the Angel Drainer family. No individual operator has been publicly attributed at v0.1.

**Key teaching point:** Discord's server-boost mechanic — where boosting a server grants the booster elevated message visibility, custom-role assignment, and announcement-channel posting privileges — creates a **paid-for in-platform distribution surface** structurally analogous to T4.007's Polymarket comment-pinning pattern. The attacker buys or earns visibility within a legitimate community server through the platform's own mechanics, then occupies that visibility with phishing links that inherit the server's trust context. The campaign demonstrates T4.007's generalisability beyond Polymarket to any platform where engagement-weighted or paid-for mechanics determine content visibility.

## Summary

Through August to October 2024, a phishing campaign exploited Discord's server-boost and announcement-channel mechanics to distribute drainer links from within legitimate DeFi and NFT community servers. The attacker operated in three phases:

**Phase 1 (Infiltration):** The attacker purchased Discord Nitro subscriptions and used them to boost target servers — including official Discord servers for major DeFi protocols (Aave, Lido, EigenLayer), NFT projects (Pudgy Penguins, Azuki), and trading communities. Boosting a server grants the booster a "Server Booster" role and, in many server configurations, access to post in announcement channels or pinned-message slots that the attacker used to anchor phishing content. Where server-boost alone was insufficient, the attacker socially engineered moderator accounts through credential-phishing DMs, then used the compromised moderator accounts to post phishing announcements directly.

**Phase 2 (Distribution):** From the elevated-visibility position within each target server, the attacker posted "mandatory security verification" or "wallet linking required for airdrop eligibility" messages containing links to phishing domains (e.g., `aave-connect[.]com`, `lido-claim[.]xyz`). Because the messages appeared in official server announcement channels — and, in moderator-compromise cases, were posted by the genuine moderator account — users treated them as legitimate server communications. The phishing domains hosted cloned dApp frontends that prompted WalletConnect session establishment or direct signature requests.

**Phase 3 (Extraction):** Once a victim connected their wallet and initiated the "verification" flow, the Angel Drainer backend solicited Permit2 signatures granting token-spend authority to an attacker-controlled address. For tokens on contracts that did not support Permit2, the drainer fell back to standard unlimited `approve()` grants. The signature-request UI displayed a fake "verifying wallet ownership" loading screen while the Permit2 payload was constructed and signed. After extraction, funds were routed through instant-swap services (ChangeNOW, FixedFloat) to obfuscate the trail.

The campaign achieved unusual reach because the phishing content inherited the trust context of the legitimate community servers. Users who followed standard "only click links from official server announcements" guidance were caught because the links WERE in official server announcements — the attacker had earned or seized the posting position through the platform's own mechanics. The Angel Drainer infrastructure rotated phishing domains frequently, with each domain typically active for 48–72 hours before being flagged and replaced.

The campaign was identified by SlowMist and ScamSniffer in October 2024. At least eight major DeFi/NFT Discord servers were confirmed compromised as distribution surfaces, with aggregate victim losses exceeding $2.1 million. Several servers implemented post-incident changes restricting announcement-channel post permissions and removing the automatic announcement-posting privilege from the Server Booster role.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-08 (early) | Attacker begins purchasing Discord Nitro subscriptions; boosts target DeFi/NFT servers to gain Server Booster role and announcement-channel access | T4.007 (distribution-surface acquisition via platform mechanic) |
| 2024-08 to 2024-09 | Attacker socially engineers moderator accounts in several target servers; compromised mod accounts post phishing announcements directly | T4.007 (distribution-surface expansion via credential compromise) |
| 2024-08 to 2024-10 | Campaign operational; phishing links in official server announcements direct users to cloned dApp frontends; Angel Drainer solicits Permit2 signatures and `approve()` grants | **T4.007 execution → T4.001 / T4.004 extraction** |
| 2024-10-03 | First server (EigenLayer community) detects anomalous moderator-posted announcement; server admin removes compromised mod account and deletes phishing messages | (defender-side detection — first server) |
| 2024-10-05 to 2024-10-10 | Additional servers (Aave, Lido, Pudgy Penguins, Azuki) confirm compromise; SlowMist and ScamSniffer publish campaign analysis | (cohort identification) |
| 2024-10 onward | Affected servers restrict announcement-channel permissions; remove automatic Server Booster announcement-posting privileges; community-wide advisory published | (mitigation response) |

## Realised extraction

Approximately $2.1 million in aggregate across USDC, USDT, ETH, SOL, and various ERC-20/SPL tokens. The largest single-victim loss was approximately $85,000 (a Pudgy Penguins holder with significant USDC deposited in Aave). Funds were routed through instant-swap services (ChangeNOW, FixedFloat) and bridged between EVM and Solana chains. No funds were recovered.

## Public references

- Cross-reference: T4.007 at `techniques/T4.007-native-app-social-phishing-engagement-weighted-platforms.md`.
- Cross-reference: T4.001 at `techniques/T4.001-permit2-signature-based-authority-misuse.md`.
- Cross-reference: `examples/2025-11-polymarket-comment-section-phishing.md` — canonical T4.007 anchor (Polymarket comment-pinning sub-pattern).
- Cross-reference: `examples/2020-07-twitter-hack.md` — platform-mechanic-exploitation via compromised admin tool (adjacent T4.007 surface).
- `[slowmistdiscord2024]` — SlowMist, "Discord Server-Boost Phishing Campaign — Angel Drainer Exploits Community Trust Surface" (2024-10).
- `[scamsnifferdiscord2024]` — ScamSniffer, "Discord Announcement-Channel Drainer Campaign — August-October 2024" (2024-10).

## Public References

See citations in corresponding technique file.
