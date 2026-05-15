# Hardware Wallet Social Engineering — LTC/BTC — 2026-01-10

**Loss:** $282M+ in LTC and BTC from a single victim.
**OAK Techniques observed:** OAK-T4.007 (Native App Social Phishing / Engagement-Weighted Platforms) — primary.
**Attribution:** **Pseudonymous** — threat actor used social engineering via hardware wallet vendor impersonation.

**Key teaching point:** This is the second-largest known social engineering theft against a single individual (after the $243M Genesis Creditor case). The attack vector targets the **hardware wallet recovery path**, not the wallet software itself: the attacker impersonated hardware wallet support to trick the victim into revealing seed/recovery information. Detection is almost entirely pre-incident: user education about hardware wallet recovery procedures. On-chain detection is post-hoc (large unauthorized transfers from previously dormant addresses).

## Summary

On January 10, 2026, at approximately 11 PM UTC, a victim lost $282M+ in LTC and BTC after a social engineering attack. The attacker impersonated hardware wallet support, tricking the victim into revealing recovery information that enabled complete wallet compromise.

The case highlights the growing risk to high-net-worth individuals as hardware wallets — while secure against remote software attacks — remain vulnerable to social engineering of the recovery process. No hardware wallet firmware was compromised; the attack was purely at the human layer.

The incident was reported by ZachXBT after on-chain movements were detected.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| Pre-incident | Attacker identifies high-net-worth target with known hardware wallet usage | (targeting) |
| 2026-01-10 ~23:00 UTC | Social engineering: hardware wallet support impersonation. Victim tricked into revealing recovery information | **T4.007 impersonation** |
| 2026-01-10 ~23:00+ | $282M+ in LTC and BTC transferred to attacker-controlled addresses | **T5 drain** |
| Post-incident | Funds tracked on-chain; laundering pattern documented | **T7 laundering** |

## What defenders observed

- **Pre-incident:** The victim held large balances in addresses that had been dormant — a high-net-worth target signature. Dormant large-balance addresses are identifiable on-chain, making their owners potential targets.
- **During incident:** The attack was instantaneous once recovery information was compromised — no smart contract vulnerability, no blockchain exploit. The hardware wallet functioned as designed; the recovery path was the target.
- **Post-incident:** Unauthorized transfers from long-dormant addresses are a retrospective detection signal. Large transfers from addresses dormant for months/years are statistically anomalous.

## What this example tells contributors

- **Hardware wallet social engineering is a distinct T4 vector.** It exploits the recovery procedure (seed phrase, passphrase) rather than software/firmware. T4 sub-techniques should distinguish between software-level phishing (T4.001-T4.010) and recovery-path social engineering.
- **Dormant large-balance addresses are a target selection signal.** Attackers can identify high-net-worth individuals by scanning the UTXO set for large dormant balances. The transparency of the ledger is a targeting tool.
- **Detection is primarily pre-incident.** User education: hardware wallet support will NEVER ask for recovery phrases. On-chain monitoring can only detect the theft after it occurs.

## Public references

- [ZachXBT — Hardware Wallet Social Engineering (X/Twitter)](https://twitter.com/zachxbt/status/1879886346844180742)
