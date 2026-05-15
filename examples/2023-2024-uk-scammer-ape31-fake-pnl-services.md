# UK Scammer @ape_31 — Fake PNL Screenshot Funnel to Paid Scam Services — 2023-2024

**Loss:** $650K+ from 250+ victims across 16 tracked exchange deposit addresses. Individual victims lost $250-$3K, with one victim blackmailed for $20K additional after initial payment.
**OAK Techniques observed:** OAK-T2 (Token/Investment Fraud) — fake trading performance to sell non-existent copy-trading services; OAK-T4 (Social Engineering/Phishing) — multi-stage manipulation including fake API keys, fabricated PNL screenshots, and blackmail escalation.
**Attribution:** **pseudonymous** — UK-based scammer operating under X/Twitter handles @ape_31 and @60711. UK Telecom IP address 81.78.179.107 logged into victim's TradingView account. Voice recording obtained. Identity not publicly confirmed.

**Key teaching point:** The @ape_31 scam demonstrates the **fake PNL → paid service → blackmail escalation** pattern: (1) scammer posts fabricated PNL screenshots from a Bybit demo account; (2) runs a secondary "news" account to funnel followers; (3) offers copy-trading for $250-$500; (4) gives victim a fake API key that "shows" profitable trades (which don't exist); (5) demands more money — in one case escalating from $500 to a $20K demand with "0 liquidation price" claims; (6) blocks victim on payment. Detection approach: the TradingView login IP (81.78.179.107 — UK Telecom) is an attribution artifact; Bybit demo account screenshots have identifiable UI markers; correlated on-chain analysis of deposit addresses across 250+ victims reveals the scam's full scale.

## Summary

From ~2023 to September 2024, a UK-based scammer operating under the handles @ape_31 and @60711 defrauded 250+ victims for a total of $650K+. The scam was a service-fraud model, not a wallet drain — victims voluntarily paid for trading services that were never delivered.

**Scam architecture:**

1. **Fake PNL screenshots (credibility layer):** @ape_31 posts screenshots from a Bybit demo account (testnet with simulated funds) showing massive profits. The demo UI is indistinguishable from a real trading account.
2. **News account funnel (amplification layer):** A secondary account poses as a crypto news aggregator, resharing @ape_31's content and driving followers to the primary account. Creates the illusion of third-party validation.
3. **Copy-trading pitch ($250-$500 entry):** Followers who believe the PNL are offered copy-trading access. Payment is made in crypto.
4. **Fake API key (retention/trust layer):** After payment, the scammer provides an API key to "watch" the trades — which are completely fabricated. The victim sees fake PNL screenshots showing large profits, building trust.
5. **Blackmail escalation:** Once trust is established, the scammer demands more money. One victim who paid $500 was asked for $20K additional to "trade for them," claiming a "0 liquidation price" to make it seem risk-free.
6. **Block on payment:** Victims are blocked immediately upon sending funds.

**Three documented victim examples:**

- **Victim 1:** Sent $500 for copy-trading. Scammer then demanded $20K with "0 liq price" claim. Theft address: `HTUWbdMsbzcVa6KwJ6PTiSqTpLmsQ...`
- **Victim 2:** Sent $3K. Scammer claimed he could take balance "from 10K to 100K in a few days" with no risk.
- **Victim 3:** Sent $500. Scammer logged into the victim's TradingView account from UK Telecom IP `81.78.179.107` — a direct attribution artifact.

An attempted OTC scam was also recorded — the scammer convinced another target into a video call, which was recorded with audio. A second victim confirmed the same voice, corroborating a single individual.

ZachXBT graphed 16 exchange deposit addresses from victim-shared wallets that received $650K+ from 250+ people over the past year.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| ~2023 | @ape_31 begins posting fake PNL screenshots from Bybit demo account; news account funnel active | **T2 fake performance** |
| ~2023-2024 | 250+ victims pay $250-$3K+ for non-existent copy-trading services | **T4 social engineering funnel** |
| ~2023-2024 | Escalation: victims blackmailed for additional funds ($500→$20K) | **T4 blackmail escalation** |
| ~2023-2024 | Scammer logs into victim TradingView from UK IP 81.78.179.107 | (attribution artifact) |
| 2024-09-30 | ZachXBT publishes investigation. 16 deposit addresses graphed. Voice recording obtained | (public disclosure) |

## What defenders observed

- **Fake API key as a trust retention mechanism:** The scammer didn't just take the $500 and disappear — he provided a fake API key that showed fabricated trades. This extended the scam lifecycle: the victim, seeing "profits," was primed to send more money. The fake API key is a novel retention tactic beyond simple block-on-payment.
- **TradingView IP login as attribution artifact:** The scammer logged into a victim's TradingView account from IP `81.78.179.107` (UK Telecom). This is a hard attribution artifact — IP addresses from consumer ISPs are closer to physical identity than on-chain data.
- **Cross-victim voice matching:** The OTC scam video call recording was matched to another victim's experience — same voice. Audio matching across victims is a low-tech but high-confidence attribution technique.
- **16 deposit addresses, one scammer:** The 16 exchange deposit addresses collected from victims are the on-chain detection surface. Cross-referencing these addresses can identify additional victims who haven't reported.
- **Bybit demo account as the credibility engine:** The entire scam is built on the indistinguishability of Bybit's demo mode from real trading. The demo account UI is the single point of failure in the victim's verification process.

## What this example tells contributors

- **TradingView/Exchange IP logs are a T4 attribution data source.** When a scammer logs into a victim's account (TradingView, exchange, portfolio tracker), the IP address is logged. OAK T4 detection data sources should include "victim account access logs" with IP address, timestamp, and user agent as attribution fields.
- **API key as fake proof-of-work is a T4 sub-technique.** The fake API key that "shows" fabricated trades is a specific social engineering technique — it extends the victim's trust window and enables additional extraction. T4 should include "fake verification artifact" as a sub-technique.
- **Voice recording matching across victims.** Audio recordings from different victims can be matched to confirm a single threat actor. This is a cross-victim attribution technique applicable to any social engineering scam involving phone or video calls.
- **Demo account watermarking is a platform-level mitigation.** Bybit and other exchanges could add visible "DEMO" watermarks or UI color changes to demo mode screens to prevent this specific scam. This is a UI-level mitigation with near-zero cost.

## Public references

- [ZachXBT — UK Scammer @ape_31 Investigation (X/Twitter)](https://x.com/zachxbt/status/1840749550304125401)
- Scammer handles: @ape_31, @60711 (X/Twitter).
- Attribution artifact: UK Telecom IP `81.78.179.107` (TradingView login).
- 16 tracked exchange deposit addresses. 250+ victims. $650K+ cumulative.
- Voice recording of OTC scam attempt obtained and corroborated by second victim.
