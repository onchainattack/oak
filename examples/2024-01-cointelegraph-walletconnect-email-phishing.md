# Email Impersonation Phishing Wave — CoinTelegraph/WalletConnect/Token Terminal Impersonation — 2024-01

**Loss:** $580K+ stolen from victims who received phishing emails impersonating CoinTelegraph, WalletConnect, Token Terminal, and DeFi team email accounts.
**OAK Techniques observed:** OAK-T4 (Social Engineering/Phishing) — email-based brand impersonation targeting crypto media and infrastructure tool brands that users trust for communications.
**Attribution:** **Pseudonymous** — theft address `0xe7D13137923142A0424771E1778865b88752B3c7` identified. Attacker identity unknown.

**Key teaching point:** The January 2024 phishing wave demonstrates the **infrastructure-tool brand impersonation** pattern: the attacker impersonated NOT a wallet or exchange (where users expect to send money), but the communication and infrastructure tools that users trust for INFORMATION — CoinTelegraph (news), WalletConnect (connection protocol), Token Terminal (analytics), and DeFi team emails. Victims who received an email appearing to be from one of these trusted sources were directed to a phishing site. The impersonated brands were chosen because users have legitimate email relationships with them (newsletters, protocol notifications, airdrop announcements). Detection approach: monitor for newly registered domains visually similar to crypto media/infrastructure brands that are sending email; DMARC/SPF/DKIM validation on inbound emails from these domains would catch the impersonation.

## Summary

In January 2024, a phishing email campaign was detected impersonating multiple trusted crypto brands simultaneously:

- **CoinTelegraph** — crypto news media (users receive newsletter emails)
- **WalletConnect** — wallet connection protocol (users receive connection notification emails)
- **Token Terminal** — crypto analytics platform (users receive report emails)
- **DeFi team emails** — project team communications (users receive airdrop/governance emails)

The phishing emails directed recipients to a malicious site that drained wallets. The common element: all impersonated brands are ones that users LEGITIMATELY expect to receive emails from. The phishing emails blended into the victim's normal inbox experience.

The multi-brand approach (4+ brands simultaneously) increased the attack surface — a victim who wouldn't click a fake CoinTelegraph email might click a fake WalletConnect email, and vice versa.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2024-01-23 | Phishing emails sent impersonating CoinTelegraph, WalletConnect, Token Terminal, DeFi teams | **T4 email brand impersonation** |
| 2024-01-23 | $580K+ stolen. Theft address `0xe7D13...` published | **T5 asset drain** |
| 2024-01-23 | ZachXBT posts community alert | (public alert) |

## What defenders observed

- **Infrastructure brands, not exchange brands, as the impersonation vector.** Users are trained to be suspicious of emails claiming to be from exchanges ("Your Binance account is locked"). They are less suspicious of emails from media platforms, analytics tools, and wallet protocols — which are seen as information sources, not financial endpoints.
- **Multi-brand campaign = broader victim net.** Impersonating 4+ brands in a single campaign captures victims across different user segments (newsletter readers, DeFi users, protocol governance participants).
- **Email as the attack vector, not X/Twitter or Discord.** While most crypto phishing moved to social media, email remains effective because users have established trust relationships with newsletter and notification senders. The email channel has less community monitoring than social media.

## What this example tells contributors

- **Infrastructure-tool brand impersonation is a distinct T4 sub-pattern from exchange impersonation.** CoinTelegraph, WalletConnect, and Token Terminal are NOT places users send money — they're sources of information. The phishing email exploits the user's trust in the information source, not in a financial custodian. T4 should distinguish "financial platform impersonation" from "information/infrastructure tool impersonation."
- **Multi-brand phishing campaigns maximize victim coverage.** Using 4+ brands in one campaign captures victims across different user segments. The detection response: when a phishing domain is identified, check for sister domains targeting related brands — they're likely part of the same campaign.
- **Email DMARC/DKIM/SPF validation is a pre-victim detection layer.** Phishing emails from domains impersonating known brands will fail DMARC/DKIM/SPF validation if the receiving email server checks these records. This is a protocol-level mitigation that requires no blockchain integration.

## Public references

- [ZachXBT — Email Phishing Wave Alert (X/Twitter)](https://x.com/zachxbt/status/1749758932095205638)
- Theft address: `0xe7D13137923142A0424771E1778865b88752B3c7`
- Impersonated brands: CoinTelegraph, WalletConnect, Token Terminal, DeFi team emails.
- $580K+ stolen.
