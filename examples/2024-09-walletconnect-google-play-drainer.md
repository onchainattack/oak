# WalletConnect-impersonating Google Play mobile drainer — Android/multi-chain — 2024-03 to 2024-09

**Loss:** approximately **$70,000** in cryptocurrency stolen from over **150 identified victims** across a ~5-month campaign. The primary malicious app achieved **10,000+ downloads** on Google Play; a secondary app achieved 5,000+ downloads. Per-victim losses were individually small (median ~$450) but the campaign is the first documented mobile-focused crypto drainer distributed via Google Play at scale and the canonical T4.006 (WalletConnect Session Hijack) anchor at v0.1.

**OAK Techniques observed:** **OAK-T4.006** (WalletConnect Session Hijack — primary; the victim was induced to install a malicious Android app masquerading as WalletConnect, establishing a WalletConnect session with attacker-controlled infrastructure; the session was then used to solicit malicious signing payloads) + **OAK-T4.004** (Allowance/Approve-Pattern Drainer — chained extraction; once the session was established, the MS Drainer backend prompted the victim to sign an unlimited-allowance `approve()` transaction granting the attacker address `0xf721d710e7C27323CC0AeE847bA01147b0fb8dBF` spend authority, followed by `transferFrom` extraction to attacker-controlled wallet `0xfac247a19Cc49dbA87130336d3fd8dc8b6b944e1`) + **OAK-T6.001** (Source-Verification Mismatch — the app presented as a legitimate "WalletConnect" utility in the Google Play listing with fake reviews and consistent branding, while the installed APK contained the MS Drainer payload and IP/User-Agent-based redirection logic to evade Play Store review).

**Attribution:** **pseudonymous** — the Google Play developer account operated under the name **UNS LIS**, which also published a fake "Uniswap DeFI" app (`com.lis.uniswapconverter`) active around May–June 2023. No public attribution to a named individual or actor group at v0.1. The MS Drainer C2 infrastructure (`cakeserver[.]online`) is the load-bearing attribution surface; Check Point Research identified the drainer as the first mobile-exclusive drainer operation in the public record.

**Key teaching point:** This is the canonical T4.006 anchor: the attacker did not compromise a legitimate dApp's frontend (T4.002) or phish for signatures via a fake website (T4.001) — they distributed a **malicious mobile app that established WalletConnect sessions with attacker infrastructure**, using the session-establishment step as the access-acquisition primitive. The session itself was the attack surface; the chained T4.004 approve-drain was the extraction mechanism. The case demonstrates that **app-store distribution is a viable T4.006 distribution channel** and that Google Play's review process did not detect the IP/User-Agent-based redirection logic across the ~5-month operational window.

## Summary

In approximately March or April 2024, a malicious Android app was published on Google Play under the developer name "UNS LIS." The app used multiple display names — "Mestox Calculator," "WalletConnect - DeFi & NFTs," and "WalletConnect - Airdrop Wallet" — to appear in search results for users looking for WalletConnect, the widely-used Web3 wallet-connection protocol. WalletConnect itself had no official mobile app at the time; the attacker exploited this gap by publishing an unofficial app that users searching Google Play for "WalletConnect" would find and install.

The app employed a two-stage evasion mechanism to bypass Google Play's review process:
1. **IP/User-Agent redirection:** After installation, the app checked the device's IP address and User-Agent string. Matching targets (mobile devices in target geographies) were redirected to a backend simulating the Web3Inbox service. Non-matching targets (desktop browsers, security-scanner IP ranges) were redirected to a legitimate website, making the app appear benign during automated review.
2. **Anti-analysis protections:** The app included code to prevent debugging and static analysis, further frustrating automated review.

Once a victim installed the app and initiated a WalletConnect session, the MS Drainer backend (C2: `cakeserver[.]online`) instructed the victim to sign transactions through the established session. The primary transaction was an ERC-20 `approve()` call granting unlimited spend authority to attacker address `0xf721d710e7C27323CC0AeE847bA01147b0fb8dBF`. After approval, the drainer executed `transferFrom` calls to move tokens to a separate attacker-controlled wallet (`0xfac247a19Cc49dbA87130336d3fd8dc8b6b944e1`). Because the approval was unlimited, the attacker could continue draining tokens from victims who never revoked the approval — a standing-exposure surface identical to the UniCats 2020 pattern (T4.004).

Check Point Research identified the campaign and published their findings on approximately 2024-09-28. By the time of disclosure, the primary app had accumulated over 10,000 downloads and the campaign had claimed over 150 victims across approximately $70,000 in losses. The app was most popular in Nigeria, Portugal, and Ukraine. Google removed the app from the Play Store following the disclosure, but APK distributions remained available through third-party stores.

A secondary app, "Walletconnect | Web3Inbox" (`co.median.android.kaebpq`), also published by UNS LIS, had been on the Play Store since approximately February 2024 and achieved over 5,000 downloads. The same developer had previously published a fake "Uniswap DeFI" app active around May–June 2023.

Check Point Research characterized the operation as "the first time a cryptocurrency drainer has exclusively targeted mobile device users" — prior drainer campaigns had targeted desktop browser extensions and web-based dApp interactions. The mobile-exclusive distribution via Google Play, combined with the session-establishment entry vector (rather than phishing-website or compromised-frontend), makes this the canonical T4.006 anchor at v0.1.

## Timeline (UTC unless noted)

| When | Event | OAK ref |
|---|---|---|
| 2023-05 to 2023-06 | Developer "UNS LIS" publishes fake "Uniswap DeFI" app on Google Play; active for approximately one month | (pre-campaign — developer fingerprint) |
| 2024-02 | Secondary app "Walletconnect \| Web3Inbox" published on Google Play by UNS LIS; accumulates 5,000+ downloads | T4.006 (secondary distribution surface) |
| 2024-03 to 2024-04 (approx.) | Primary app ("Mestox Calculator" / "WalletConnect - DeFi & NFTs" / "WalletConnect - Airdrop Wallet") published on Google Play; IP/User-Agent redirection evasion active | **T4.006 deployment** |
| 2024-03 to 2024-09 | Campaign operational; victims install app, establish WalletConnect sessions, sign unlimited-approval transactions; MS Drainer extracts ~$70,000 across 150+ victims | **T4.006 execution → T4.004 extraction** |
| 2024-09-28 (approx.) | Check Point Research publishes findings; Google removes primary app from Play Store; campaign disrupted | (defender response — public disclosure) |
| 2024-09 onward | APK distributions persist through third-party stores; victims with unrevoked approvals remain exposed | T4.004 (standing-approval surface persists) |

## What defenders observed

- **Pre-event (app-store distribution surface):** WalletConnect had no official mobile app, but users searching Google Play for "WalletConnect" encountered the malicious app as a top result due to fake reviews, consistent branding, and keyword targeting. The app-store distribution surface was the load-bearing access-acquisition channel — without it, the attacker would have needed phishing websites or social-engineering to initiate sessions.

- **Pre-event (developer fingerprint):** UNS LIS had previously published "Uniswap DeFI" in mid-2023 — another DeFi-brand-impersonation app. The developer fingerprint was visible to app-store-moderation-level monitoring but was not cross-referenced against the new WalletConnect-impersonating publications.

- **At-event (session-establishment):** The WalletConnect session was established between the victim's wallet and attacker-controlled infrastructure through the malicious app. The session-establishment event was the T4.006 signal — the victim consented to connect their wallet to what they believed was a legitimate WalletConnect interface, and the established session became the channel for subsequent malicious transaction solicitation.

- **At-event (chained T4.004 extraction):** Once the session was established, the MS Drainer C2 (`cakeserver[.]online`) instructed the victim to sign an unlimited ERC-20 `approve()`. The approve-pattern drain was the extraction mechanism chained from the T4.006 entry vector. The attacker used separate addresses for the approval grantee (`0xf721...`) and the extraction destination (`0xfac2...`), a standard T4.004 obfuscation pattern.

- **Post-event (standing-approval surface):** Because victims granted unlimited approvals, the attacker retained the ability to drain tokens from wallets that never revoked the approval — a standing T4.004 exposure identical to the UniCats 2020 pattern. Google removed the app but could not revoke on-chain approvals.

## What this example tells contributors writing future Technique pages

- **T4.006 is the session-establishment entry vector; T4.004 is the chained extraction mechanism.** The WalletConnect Google Play campaign is the cleanest separation of T4.006 (access acquisition via malicious app-install → session-establishment) from T4.004 (extraction via unlimited-approval drain) in the v0.1 corpus. The session-establishment step is the load-bearing T4.006 surface — the victim consented to connect, and the connection became the channel. Contributors writing future T4.006 cases should expect the chained-Technique pattern and explicitly map the entry vector (T4.006) to the extraction mechanism (typically T4.001, T4.004, or T4.005).

- **App-store distribution is a viable T4.006 distribution channel distinct from phishing websites and compromised frontends.** Prior drainer campaigns distributed via phishing links (T4.001), compromised dApp frontends (T4.002), or social-engineering DM campaigns. The Google Play campaign demonstrates that official app stores can host T4.006-distributing applications for months before detection, and that IP/User-Agent-based redirection is sufficient to evade automated review at current (2024) app-store moderation capability.

- **The mobile-exclusive drainer surface is structurally distinct from the desktop-browser drainer surface.** Check Point Research characterized this as the first mobile-exclusive drainer. The mobile surface has different trust assumptions (users trust app-store-distributed apps more than random websites), different detection surfaces (app-store review vs. domain-registration monitoring), and different wallet-interaction patterns (deep links, mobile WalletConnect sessions). Contributors writing technique pages that span mobile and desktop surfaces should distinguish the two.

- **WalletConnect's "no official app" gap was the precondition.** Because WalletConnect had no official mobile app, there was no legitimate app for users to find on Google Play; the malicious app filled the vacuum. This is a recurring pattern: protocols without official mobile apps create a search-result vacuum that impersonators fill. Contributors writing future T4.006 cases should note whether the impersonated protocol had an official app at the time of the campaign.

## Public references

- `[checkpointwalletconnect2024]` — Check Point Research, "Fake WalletConnect App on Google Play Steals $70K" (2024-09): <https://research.checkpoint.com/2024/fake-walletconnect-app-on-google-play/>
- `[thehackernewswalletconnect2024]` — The Hacker News, "Crypto Scam App Disguised as WalletConnect Steals $70K in Five-Month Campaign" (2024-09-28): <https://thehackernews.com/2024/09/crypto-scam-app-disguised-as.html>
- `[pcmagwalletconnect2024]` — PCMag, "Uninstall Now: This Android App Is Secretly Stealing Crypto" (2024-09)
- `[cointelegraphwalletconnect2024]` — CoinTelegraph, "Crypto wallet drainer was on Google Play for months, stole $70K: Report" (2024-09)
- `[infosecuritywalletconnect2024]` — Infosecurity Magazine, "First Mobile Crypto Drainer Found on Google Play" (2024-09)

## Citations

- `[checkpointwalletconnect2024]` — primary forensic analysis; MS Drainer identification, C2 infrastructure, IP/User-Agent evasion mechanism, $70K figure, 150+ victim count.
- `[thehackernewswalletconnect2024]` — contemporaneous press; campaign timeline, app names, download counts, UNS LIS developer fingerprint.

## Discussion

The WalletConnect-impersonating Google Play drainer campaign is the canonical T4.006 (WalletConnect Session Hijack) anchor at v0.1. It is the first documented mobile-exclusive crypto drainer distributed via an official app store, and it demonstrates the T4.006 attack chain in its cleanest form: **app-store distribution → installation → session-establishment → malicious-transaction-solicitation → approve-pattern drain**.

The case is structurally distinct from the three canonical T4 entry-vector categories:

- **T4.001 (Permit2/Signature-Based Authority Misuse):** The victim signs a malicious payload on a legitimate-seeming interface; the signature itself authorizes the transfer. No session is established.
- **T4.002 (Compromised Front-End):** The attacker compromises a legitimate dApp's frontend distribution channel (DNS, CDN, npm package). The user visits the real dApp URL; the frontend serves malicious payloads.
- **T4.004 (Allowance/Approve-Pattern Drainer):** The victim grants an ERC-20 approval to a malicious spender. The approval is the access-acquisition primitive; no session is required.

T4.006 is the **session-establishment** entry vector: the malicious app is neither a compromised legitimate frontend nor a phishing website — it is a separately-distributed application that establishes a WalletConnect session the victim believes is legitimate. The session then becomes the channel for chained T4.001/T4.004 extraction.

The app-store distribution channel is the case's most operationally significant feature for defenders. The IP/User-Agent-based redirection logic that evaded Google Play's review for ~5 months is a low-cost evasion mechanism that future T4.006 campaigns can replicate. The defender-side mitigation is not at the app-store level alone — it requires wallet-side session-establishment warnings (flagging connections to non-allowlisted dApps), user education about the absence of official WalletConnect mobile apps, and on-chain approval-revocation tooling for post-compromise remediation.

The $70,000 loss figure is small relative to other OAK anchors, but the case's significance is at the **technique-anchoring layer**, not the loss-magnitude layer: it is the cleanest available public-record separation of T4.006 (session hijack) from T4.001/T4.004 (signature/approval extraction), and it anchors the mobile-app-store distribution sub-pattern that had not been publicly documented at the drainer scale before September 2024.
