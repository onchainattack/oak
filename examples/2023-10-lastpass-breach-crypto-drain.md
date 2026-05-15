# LastPass Breach → Crypto Drain — Multi-Victim Seed Phrase Exposure — 2023-10

**Loss:** $4.4M+ drained from 25+ victims in a single day (October 25, 2023); cumulative losses from LastPass breach exceed $250M+ across the crypto victim population.
**OAK Techniques observed:** OAK-T6 (Authorization / Key Compromise) — seed phrase/private key exposure via compromised password manager vault; OAK-T5 (Asset Drain) — systematic drain of identified wallets.
**Attribution:** **pseudonymous** — threat actor(s) systematically decrypting LastPass vaults and extracting crypto-relevant secrets. Attribution to specific individuals not public.

**Key teaching point:** The LastPass breach demonstrates the **password manager as key compromise vector** — users who stored seed phrases or private keys in LastPass vaults had those secrets exposed when the vaults were breached and decrypted. The attack is structurally distinct from phishing (the user never interacts with the attacker) and from hot wallet compromise (the attack surface was a third-party service, not the user's device). Detection approach: LastPass published breach notifications; crypto users who had ever stored wallet secrets in LastPass should have immediately migrated all funds to new wallets. On-chain, the detection is post-hoc: systematic draining of wallets whose seed phrases were known to be in breached LastPass vaults.

## Summary

In 2022, LastPass (a password manager with 25M+ users) suffered a breach where encrypted customer vaults were exfiltrated. The breach was disclosed in stages through 2022-2023. By October 2023, threat actors had successfully decrypted a significant number of vaults and were systematically extracting crypto wallet secrets.

On October 25, 2023, alone, ~$4.4M was drained from 25+ victims. The total crypto losses from the LastPass breach are estimated at $250M+. The attackers specifically targeted vaults containing seed phrases, private keys, and exchange credentials.

The structural tragedy: many victims were security-conscious users who had followed best practices (using a password manager, strong unique passwords) but were undone by the password manager itself being breached. The "secure storage" was the vulnerability.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2022-08 | LastPass breach: encrypted customer vaults exfiltrated | (breach) |
| 2022~2023 | Breach disclosed in stages. Users advised to change passwords, migrate crypto wallets | (disclosure) |
| 2023 | Threat actors decrypt vaults. Extract seed phrases, private keys, exchange credentials | **T6 key exposure** |
| 2023-10-25 | $4.4M drained from 25+ victims in a single day — systematic drain wave | **T5 systematic drain** |
| 2023~2025 | Cumulative crypto losses from LastPass breach estimated at $250M+ | (ongoing drain) |

## What defenders observed

- **Pre-incident:** Users stored crypto wallet secrets in LastPass — a third-party cloud service. The data was encrypted at rest, but the encryption relied on the user's master password (which, if weak, could be brute-forced from the exfiltrated vaults).
- **During breach:** Encrypted vaults exfiltrated from LastPass infrastructure. Users could not detect this — LastPass disclosed it.
- **Post-breach:** Systematic draining of wallets whose seed phrases were in decrypted vaults. Multiple victims drained on the same day (Oct 25, 2023) indicates automated or batched processing of decrypted vaults by threat actors.
- **Long tail:** Victims continue to be drained years after the breach, as threat actors progressively decrypt more vaults (brute-forcing weaker master passwords first, stronger ones over time).

## What this example tells contributors

- **Password manager compromise is a T6 sub-type.** The user did not make a security error — they used a recommended tool that was itself breached. T6 should model "third-party secret storage compromise" as distinct from individual key mismanagement.
- **The time gap between breach and drain creates a defense window.** LastPass disclosed the breach. Users who immediately migrated their crypto to new wallets (generated outside LastPass) were protected even if their vault was later decrypted. The time window between breach disclosure and drain is the defense opportunity.
- **Drain clustering across victims is a detection signal.** 25+ victims drained on the same day from unrelated wallets suggests a common breach source. Cross-referencing victim reports for common service usage (all used LastPass) can identify the breach vector.

## Public references

- [ZachXBT — LastPass Crypto Drain (X/Twitter)](https://twitter.com/zachxbt/status/1717901088521687330)
- [LastPass — Security Breach Disclosure](https://blog.lastpass.com/posts/incident-1-2022)
- Cumulative losses: $250M+ estimated across crypto victim population.
