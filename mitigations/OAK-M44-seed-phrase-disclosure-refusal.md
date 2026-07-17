# OAK-M44 — Seed-Phrase Disclosure Refusal and Storage Isolation

**Class:** user-behavioural
**Audience:** retail-user, custody-customer, wallet, vendor

**Maps to Techniques:** OAK-T11.006, OAK-T11.006.001, OAK-T11.006.002, OAK-T11.007.003, OAK-T4.010

## Description

The single behavioural invariant with the widest coverage across OAK's retail-victim surface: **a seed phrase is disclosed to nobody and stored on nothing that syncs.** It has two legs — an *active* leg (refuse every request for the phrase, without exception and without assessing the requester) and a *passive* leg (keep the phrase off every medium that replicates it beyond the holder's physical control).

The active leg works because the request itself is a complete signal. No legitimate party has ever needed a user's seed phrase: not vendor support, not an exchange, not a wallet developer, not a firmware updater, not a forensic tracer (which needs the public address), not a recovery service, not law enforcement. Because the set of legitimate requesters is *empty*, the user is relieved of the judgment call the attacker is trying to win. This is what makes the invariant robust where "be suspicious of unusual requests" is not: the attacker's whole craft is manufacturing a context in which the request seems reasonable, and this rule never evaluates the context.

The passive leg addresses a failure mode where the user makes no decision at all. In the T11.006.002 pattern the holder never uploads anything — the platform's default-on backup replicates the wallet's vault to cloud storage, and the seed's blast radius silently becomes every credential guarding that cloud account. The corpus's canonical cases are users who correctly refused to *write* the phrase anywhere risky and lost funds regardless, because the copy was made for them. The behavioural rule is therefore not "don't upload your seed" but "**verify what your device is uploading on your behalf**", which is a different and less intuitive action.

## How it applies

- **OAK-T11.006 (Cold-storage Seed-phrase Exfiltration at Rest):** the passive leg is the whole mitigation. If the phrase exists only on paper under the holder's physical control, no at-rest exfiltration surface exists to compromise, and the third-party breach that would otherwise be a total loss becomes irrelevant to the holder.
- **OAK-T11.006.001 (User-Initiated Plaintext-Equivalent Seed Storage):** directly negates the technique. The LastPass cohort's victims stored phrases in a password manager's encrypted notes — a decision that was defensible on its face and fatal in practice, because vault encryption is bound to a human-chosen master password and an exfiltrated vault can be brute-forced offline without rate limit, lockout, or alarm. The rule's value is that it does not require the user to correctly reason about offline brute-force economics.
- **OAK-T11.006.002 (Implicit Cloud-Custody via Default-On Cloud-Backup):** the only mitigation that reaches this technique, because the user takes no action to intercept. Requires an explicit per-app audit of backup state (iOS: Settings → Apple ID → iCloud → Manage Storage → Backups; Android: the wallet app's `allowBackup` manifest behaviour) performed *after* wallet installation and *after* every OS major upgrade, which can silently re-enable it.
- **OAK-T11.007.003 (Brand-Trust-Leveraged Active Phishing for Seed-Phrase Exfiltration):** the active leg is the terminal defence and it holds against every channel in the technique's scope — email, physical mail on real letterhead, trojanised companion apps, fake firmware-update flows. Each of those campaigns is a delivery mechanism whose payload is a seed-phrase request; refusing the payload defeats the campaign regardless of how convincing the channel is.
- **OAK-T4.010 (Fake Security-Tool / Browser-Extension Phishing):** the active leg survives the inversion this technique depends on. Counterfeit revoke.cash / wallet-security extensions convert the user's security-seeking behaviour into the compromise vector; a rule that refuses seed disclosure *to security tools specifically* is what breaks that inversion, since a genuine approval-revocation tool needs the connected account, never the phrase.

## Limitations

Covers seed disclosure and seed storage only. It does nothing against approval-based drainers (T4.001, T4.004, T4.005) or delegation abuse (T13.004), where the user is never asked for the phrase and the loss follows a signature the user was persuaded to make. A holder who follows this rule perfectly and signs a malicious approval loses the funds anyway.

Does not protect against physical-access extraction from the device itself (T11.007.002) or counterfeit hardware that never generated the user's phrase in the first place (T11.007.001) — in the counterfeit case the phrase was compromised at manufacture, so refusing to disclose it is moot.

The passive leg has a durability problem no behavioural rule fixes: a paper phrase is vulnerable to fire, flood, loss, and the holder's death, and the mitigations for *those* risks (a copy, a service, a safe deposit box, a shared secret) all reintroduce the surface this rule closes. OAK takes no position on that trade-off; it is a real one and it is where most sincere disagreement about seed hygiene actually lives.

Finally, the rule is only load-bearing at the moment it is tested, which is a moment engineered for maximum stress — an apparent emergency, an authoritative caller, a clock. Knowing the rule and holding it under that pressure are different capabilities, and the corpus contains no evidence about how well the second one transfers.

## Reference implementations

- **Wallet-side UX (partial coverage, vendor-dependent):** in-app hard blocks on entering a seed phrase into any flow other than restore; explicit anti-phishing copy at restore time; refusal to accept seed input from a paste buffer.
- **iOS / Android backup-state audit:** platform-native settings surfaces (per-app iCloud backup toggle; Android `allowBackup` manifest flag). No production tooling automates the audit or alerts on re-enablement.
- **No production tooling for the active leg.** It is a human refusal and there is nothing to install. Vendor security pages universally state "we will never ask for your recovery phrase"; the corpus indicates this statement does not reach users at the moment it is needed.

## Citations

- See [`examples/2022-12-lastpass-vault-cohort.md`](../examples/2022-12-lastpass-vault-cohort.md) — the T11.006.001 canonical cohort; multi-year offline brute-force of exfiltrated vaults.
- See [`examples/2022-04-icloud-metamask-seed-phrase-cohort.md`](../examples/2022-04-icloud-metamask-seed-phrase-cohort.md) — the T11.006.002 canonical case; default-on backup as the compromise path.
- See [`examples/2025-2026-trezor-impersonating-physical-mail-campaign.md`](../examples/2025-2026-trezor-impersonating-physical-mail-campaign.md) — T11.007.003 via physical mail, addressed from a five-year-old vendor breach.
- See [`examples/2023-2025-fake-revoke-cash-wallet-security-extension-phishing.md`](../examples/2023-2025-fake-revoke-cash-wallet-security-extension-phishing.md) — T4.010; the security-tool inversion.
