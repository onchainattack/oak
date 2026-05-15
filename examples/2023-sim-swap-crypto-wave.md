# SIM Swap Wave — Multi-Victim Telecom Attack — 2023

**Loss:** $13.3M+ across 54 identified SIM swaps targeting crypto holders (4-month period, Aug–Nov 2023).
**OAK Techniques observed:** OAK-T4.007 (Native App Social Phishing) — SIM swap as the account takeover primitive; OAK-T6 (Authorization / Key Compromise) — credential reset via telecom compromise.
**Attribution:** **Multiple actors** — SIM swapping is a service sold by specialized threat actors on Telegram. Individual swappers are often teenagers/young adults. Some identified and arrested; most remain pseudonymous.

**Key teaching point:** SIM swap is the most effective account takeover primitive in crypto because it bypasses 2FA. The attacker calls the victim's mobile carrier, socially engineers a customer service rep into transferring the victim's phone number to a SIM card they control, then uses SMS-based password resets to take over exchange, email, and social media accounts. Detection is almost entirely pre-incident: hardware 2FA (YubiKey), carrier SIM lock PINs, and removing SMS as a 2FA method.

## Summary

Between August and November 2023, $13.3M+ was stolen from 54+ crypto holders via SIM swap attacks. The MO is consistent:

1. Attacker obtains victim's name, phone number, and mobile carrier (from data brokers or social media)
2. Attacker calls carrier customer support, impersonating the victim
3. Once the phone number is transferred to the attacker's SIM, they trigger password resets on the victim's email, exchange, and social media accounts (all of which send 2FA codes via SMS)
4. Exchange accounts are drained. Social media accounts are used to post phishing links to the victim's followers, amplifying the theft
5. Funds are laundered through instant exchanges and mixers

The attack is asymmetric: the defender's security (hardware wallet, strong passwords) is bypassed entirely through the telecom layer. The victim's crypto security is irrelevant once the attacker controls their phone number.

## Timeline (aggregated across 54 cases)

| When | Event | OAK ref |
|---|---|---|
| Pre-attack | Attacker obtains victim's name, phone number, carrier from data broker or OSINT | (targeting) |
| T+0 | Attacker calls victim's carrier, impersonates victim, requests SIM transfer. Carrier processes without adequate verification | **T4.007 telecom social engineering** |
| T+5min | Victim's phone loses service. Attacker's phone now receives all SMS/calls for victim's number | **T6 credential reset access** |
| T+10min | Attacker triggers password resets on email, exchanges, social media → receives SMS 2FA codes → takes over all accounts | **T4.007 account takeover** |
| T+30min | Exchange accounts drained. Social media used to post phishing links to followers | **T5 drain** |
| T+1h+ | Funds laundered through instant exchanges | **T7 laundering** |

## What defenders observed

- **Pre-incident:** All 54 victims used SMS-based 2FA on at least one critical account (exchange, email, or social media). The carrier was the weakest link.
- **During incident:** The victim's phone suddenly loses service ("No Service" / "SOS only"). This is the critical real-time signal — the SIM has been transferred. Acting within minutes can prevent account takeovers.
- **Post-incident:** Password reset confirmations arrive via email (the attacker-triggered resets). Exchange withdrawal confirmations arrive after the fact.
- **Carrier response:** Some carriers offer SIM lock PINs or "number lock" features. Adoption is low. Carrier customer support is the attack surface.

## What this example tells contributors

- **SIM swap is the telecom-layer T4 attack.** It bypasses all crypto-native security. T4 technique pages should include telecom-layer account takeover as a distinct vector from software phishing and platform impersonation.
- **SMS 2FA is a vulnerability, not a security control.** For crypto holders, SMS 2FA is worse than no 2FA — it creates a single point of failure (the carrier's customer support). Hardware 2FA (YubiKey, Titan) is the mitigation.
- **The 54-victim clustering is a detection opportunity.** Carriers could detect anomalous SIM transfer patterns: multiple transfers on different accounts requested from the same caller ID, or transfers followed by password reset storms on linked accounts.
- **Social media amplification is a secondary effect.** After taking over the victim's X/Twitter, attackers post phishing links to followers. One SIM swap can cascade to 10+ additional phishing victims.

## Public references

- [ZachXBT — SIM Swap Wave Investigation (X/Twitter)](https://twitter.com/zachxbt/status/1694470432093409312)
- [FCC — SIM Swap Consumer Advisory](https://www.fcc.gov/sim-swapping)
- 54 documented SIM swaps: ZachXBT investigation thread.
