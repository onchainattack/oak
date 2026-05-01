# Polymarket Hype, Polymarket Scams: A Structured Look

*Polymarket is the largest prediction market on the public record. It runs on Polygon, settles in USDC, resolves via UMA's optimistic oracle, and was built by people doing serious work. It is also the highest-yield social-engineering target in crypto right now — across three structurally distinct attack surfaces that don't appear together in any post-mortem so far.*

*This is what a structured look at the Polymarket adversary surface yields. We document seven specific public incidents 2024–2026 across three vectors, map each to OAK Techniques, and identify five Technique-level gaps that the existing crypto-security taxonomy doesn't yet cover.*

[COVER IMAGE]

## Three vectors, one platform

Polymarket's adversary surface has three vectors that look like one thing in news coverage and like three different things in structured analysis:

**1. Account-level theft via the auth layer.** Polymarket users sign up via Magic Labs — a third-party authentication service that creates a non-custodial wallet bound to the user's email address. From the user's perspective this is "log in with your email." From the protocol's perspective it is a non-custodial wallet whose access path runs through a third-party off-chain identity provider. When the auth provider is compromised, the wallet is compromised. The user's hardware wallet, Permit2 warnings, and wallet-extension defenses are not in the loop.

**2. Resolution-layer manipulation.** Polymarket markets resolve via UMA's optimistic oracle — a token-weighted vote over a natural-language claim. UMA's market cap during 2025 was approximately $95M; individual disputed markets have exceeded $237M in volume. The oracle is economically smaller than the prizes it adjudicates. This is a stable disequilibrium that gets worse as Polymarket scales.

**3. Off-platform brand impersonation.** Polymarket has no token (yet). The official-channel-amplified ambiguity around "POLY airdrop coming" feeds a long tail of typosquat claim sites. The Polymarket brand also gets impersonated by Telegram bots and GitHub-distributed "Polymarket trading" tools. These aren't Polymarket attacks — they're brand-equity attacks that Polymarket carries the reputation cost for.

Each vector has documented public incidents. Each is mappable to existing or proposed OAK Techniques. Each has structural properties that the broader crypto-security taxonomy doesn't yet capture cleanly.

## Vector 1: account-level theft via the auth layer

**September 2024.** Polymarket disclosed that "a small number of users" lost funds when an attacker abused a third-party authentication tool to call `proxy()` on Magic-derived wallets and transfer USDC to attacker-controlled addresses. The on-chain transaction was a *valid* signed transaction. The user did not sign anything — Magic Labs signed, on the user's behalf, after auth-flow compromise. There was no signing-time anomaly to detect from a user's wallet view.

**November 2025.** A coordinated phishing campaign on Polymarket's comment section drained ≥$500,000 from users. The campaign worked by buying YES+NO shares on high-volume markets — Polymarket pins "top comments" by combined position size, not by reaction count, so the attacker's pinned phishing comment stayed pinned regardless of community downvotes. The pinned comment offered "private markets with better odds" and linked to a cloned Polymarket login page with a fake Cloudflare turnstile. Victims entered their email and email-magic-link verification code; the attacker authenticated to Magic Labs as the user and drained the wallet.

**December 2025.** A repeat of the September 2024 pattern: Polymarket again attributed account compromises to "a third-party login tool." Affected accounts had logged in via email magic-link, including some with 2FA enabled.

**The structural property that makes this distinctive**: in each of these cases, **none of the standard Web3 wallet defenses are in the loop**. There is no `eth_signTypedData` to flag. There is no Permit2 spender warning. There is no hardware-wallet display divergence to catch. The credential-capture stage is bank-style, not Web3-style. This is the same surface that any crypto application built on Magic Labs / Privy / Web3Auth / Dynamic exposes — and OAK v0.1 has no Technique that captures it. The proposed v0.x addition: **embedded-wallet identity-provider compromise** as a sub-class under T11 (Custody and Signing Infrastructure).

[IMAGE 2 — Vector breakdown diagram, optional]

## Vector 2: resolution-layer manipulation

**March 2025 — Ukraine mineral deal market** (~$7M volume). The market asked: "Ukraine agrees to Trump mineral deal before April?" Resolution rules required "official information from the US and Ukrainian governments." No deal was signed. The market resolved YES anyway, after a single UMA whale cast ~5M tokens via three wallets representing ~25% of the resolution vote. Polymarket publicly described this as an "unprecedented governance attack" and refused refunds, citing UMA's decentralised structure.

**July 2025 — Zelenskyy-suit market** (~$237M volume). The market asked whether Zelenskyy would be photographed in a suit before June 30. Multiple major outlets — Reuters, AP, AFP — described his June 24 NATO outfit as a suit. UMA voters resolved NO on July 1, citing lack of "credible reporting consensus." Top 10 UMA voters held ~6.5M UMA (~30% of average vote). UMA's market cap during the dispute window was ~$95M — less than half the disputed market's volume.

**December 2025 — UFO declassification market** (~$16M volume). Resolved YES despite no documents released. Whales bought near-par into finalisation; the community labelled it "proof-of-whales."

**April 2026 — US–Iran ceasefire extension** (~$77M volume). Despite Trump, the Pakistani PM, the UN Secretary-General, and major media all confirming extension, YES traded at <1% probability. Polymarket itself formally challenged the UMA vote — the first instance of the platform contesting its own oracle.

**March 2026 — Iran missile strike on Israel** ($14–23M volume). Polymarket bettors who lost ~$900,000 on a "Will Iran strike Israel?" market sent **death threats to Times of Israel correspondent Emanuel Fabian**, demanding he rewrite his report so the market would resolve in their favour. Fabian published a first-person account; Washington Post and Haaretz corroborated. The journalist did not change his reporting; the market resolved per his published account; the perpetrators were not publicly identified.

This is the first publicly documented case in crypto-prediction-market history of physical coercion of an off-chain human reporter as an attack vector against the resolution layer.

**The structural property that makes this distinctive**: existing OAK T9.001 (Oracle Price Manipulation) covers numerical price-feed manipulation. The mitigations are mechanical — TWAP, multi-venue feeds, deviation halts. None of those mitigations apply when the "oracle" is a token-weighted vote on natural-language claims, and none of them contemplate physical coercion of human reporters.

The proposed v0.x addition: **T9.006 — Subjective-Oracle Resolution Manipulation**, with four sub-patterns:

- **T9.006.001** — DVM vote capture by economically-interested holder (Ukraine mineral deal, UFO market, Zelenskyy suit)
- **T9.006.002** — Resolution-spec ambiguity exploitation (the "what is a suit" / "what counts as a deal" class)
- **T9.006.003** — Off-chain resolution-source coercion (Iran-strike journalist threats)
- **T9.006.004** — Platform-override of oracle outcome (Barron Trump / DJT memecoin precedent)

This is not a sub-class of T9.001. It is a different attacker, a different defender, a different mitigation surface, and — in the Iran-strike case — a different threat-model layer entirely.

## Vector 3: off-platform brand impersonation

**January 2026 — Polycule trading bot** ($230K). A Telegram-distributed "Polymarket copy-trading bot" branded itself as Polymarket-integrated, accumulated user deposits in an operator-controlled wallet, and announced a "hack" on January 13. The operators went into communication blackout; no follow-up, no public operator identification. Polymarket clarified it had no relationship with Polycule. This fits the soft-rug pattern: a custodial third-party tool absorbs platform brand-trust without contractual basis, runs deposits, and exits citing an unverifiable compromise.

**December 2025 – April 2026 — Trader-tooling supply-chain attacks.** Malicious npm package `polymarket-clob` plus sibling packages (`sha256-validation`, `solana-utils-sdk`, `synced-plus-agent`) read `wallet.txt` / `wallets.json` / `keys/*.json` from developer filesystems and exfiltrated them to attacker-controlled IPs. The hijacked `dev-protocol` GitHub organisation (a real Japanese DeFi project whose org credentials were compromised) was used to publish 20+ "polymarket-copytrading-bot-*" repositories with inflated stars and trojan dependencies that exfiltrated `.env` files containing Polygon private keys. The infrastructure overlapped with Vidar Stealer C2 endpoints.

**The structural property that makes this distinctive**: T11.002 (Wallet-Software Distribution Compromise) covers compromise of the wallet *binary*. The Polymarket trader-tooling campaign targets a different cohort with a different on-disk asset — the developer's `.env` / `wallet.txt` / private-key file. The attack does not need a wallet binary to be compromised; it directly reads the developer's plaintext key storage and signs transactions on the developer's own infrastructure.

The proposed v0.x addition: **trader-tooling supply-chain compromise targeting `.env` private keys** as a sub-class under T11. Detection signals are off-chain at the package-registry level — SafeDep / StepSecurity / Snyk / Socket-class behavioural analysis on package install scripts; reproducible-build verification for high-trust packages; mandatory two-person rule on package publication.

For the Polycule pattern, the proposed addition is **third-party brand-impersonation custodial soft-rug** as a sub-class under T5 (Value Extraction). Distinct from T5.005 (Treasury-Management Exit) because the operator never had a fiduciary relationship with the platform whose brand they used. Detection requires platform-layer trademark / domain / Telegram-handle surveillance plus authoritative third-party-service-registry publication.

## What this teaches about the broader crypto adversary surface

The Polymarket cohort isn't unique. Each of the five proposed Technique additions generalises:

- **Embedded-wallet identity-provider compromise** applies to any application built on Magic Labs / Privy / Dynamic / Web3Auth — increasingly the default consumer-onboarding pattern in 2025-2026.
- **Native-app social phishing on engagement-weighted platforms** applies to any platform where in-app message visibility is determined by a paid-for or engagement-weighted mechanic the attacker can manipulate (Friend.tech, pump.fun, Farcaster).
- **Pre-token brand-anticipation phishing** applies to any high-trust crypto platform without a token — the platform's official-channel-amplified ambiguity is the lure.
- **Subjective-oracle resolution manipulation** applies to UMA, Kleros, Reality.eth, Augur REP — every platform whose oracle adjudicates natural-language claims via token-weighted vote.
- **Trader-tooling supply-chain targeting `.env` private keys** applies to any platform with active retail bot-building activity. Polymarket is one canonical case; copy-trading bots on derivatives platforms, MEV automation tooling, arbitrage bots are all on the same substrate.

What's distinctive about Polymarket is that it has all five at once, in scale, on the public record. That makes it the canonical case-study for the v0.x update of any crypto-attack taxonomy that aims to be honest about the actual adversary surface.

## What we're doing about it

We've added these five Technique candidates to the OAK roadmap (`TAXONOMY-GAPS.md`) and published seven worked examples covering the Polymarket cohort:

- `2024-09-polymarket-magic-labs-takeover.md`
- `2025-03-polymarket-uma-ukraine-mineral-deal.md`
- `2025-07-polymarket-zelenskyy-suit.md`
- `2025-11-polymarket-comment-section-phishing.md`
- `2026-01-polymarket-polycule-bot.md`
- `2026-01-polymarket-trader-tooling-supply-chain.md`
- `2026-03-polymarket-iran-strike-journalist-coercion.md`

Each example carries OAK's standard attribution-strength label (`confirmed` / `inferred-strong` / `inferred-weak`), citation discipline, and references the proposed v0.x Technique it would map to once the v0.x update lands.

If you operate Polymarket, UMA, Magic Labs, or any platform in the adjacent surface — and you have notes that disagree with what's documented above — write to us. The correction process is at `corrections@onchainattack.org`.

If you build AI tooling and want your assistant to query this corpus directly during your audit, IR, or research work, plug in **oak-mcp**:

```json
{
  "mcpServers": {
    "oak": {
      "command": "npx",
      "args": ["-y", "github:onchainattack/oak-mcp"]
    }
  }
}
```

Your AI then has structured access to 14 attack tactics, 62 techniques, 142+ documented incidents (including the seven Polymarket cases above), and 416 machine-readable relationships during your work — instead of stale, hallucinated approximations from training data.

The Polymarket cohort is one platform's worth of structured attack-surface analysis. The thesis of OAK is that AI-native crypto needs this kind of structured knowledge layer for every platform — open, citable, current, and honest about what doesn't fit existing taxonomy.

The work is open. The corrections channel is open. Contributions welcome.

---

**Links**

- OAK framework: [github.com/onchainattack/oak](https://github.com/onchainattack/oak)
- MCP server: [github.com/onchainattack/oak-mcp](https://github.com/onchainattack/oak-mcp)
- Site: [onchainattack.org](https://onchainattack.org)
- Corrections: `corrections@onchainattack.org`

*OAK is an open, vendor-neutral knowledge base of adversary tactics and techniques observed against on-chain assets. Content under CC-BY-SA 4.0, tooling under MIT.*
