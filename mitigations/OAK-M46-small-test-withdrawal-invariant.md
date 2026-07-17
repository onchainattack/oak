# OAK-M46 — Small-Test-Withdrawal Invariant and Advance-Fee Refusal

**Class:** user-behavioural
**Audience:** retail-user, custody-customer, venue, regulator

**Maps to Techniques:** OAK-T11.005, OAK-T11.005.001, OAK-T11.005.002, OAK-T11.005.003, OAK-T11.010

## Description

The canonical user-side control for the largest retail-loss class in the corpus, named as a candidate Mitigation by [`OAK-T11.005`](../techniques/T11.005-operator-side-fake-platform-fraud.md) itself and promoted here: **deposit a small amount, withdraw it in full, and confirm settlement before depositing anything that matters.** Its companion is the terminal rule that closes the same surface from the other end: **a withdrawal that requires an inbound payment is not a withdrawal.**

The invariant works because of what a fake platform actually is. There is no exchange behind the interface — no order book, no matching engine, no chain. As T11.005 puts it, "the deposit destination is a single operator-controlled wallet and the 'balance' is a Postgres row." Every artefact the user is invited to evaluate — the chart, the P&L, the order history, the confirmations, the rising number — is presentation-layer fiction under total operator control, and it is *tuned* to survive scrutiny because surviving scrutiny is the product. Exactly one artefact is not under operator control: whether value actually leaves. The test withdrawal is the only probe that touches the one thing they cannot fake, which is why it discriminates where diligence on everything else does not.

The advance-fee leg matters because it is where the victim's loss is most often doubled. Withdrawal tax, verification fee, compliance deposit, anti-money-laundering bond, unlock payment: each is a second extraction aimed at someone who has already demonstrated they will pay and is now under duress. The rule states the finding plainly — payment has never released funds, in any case in the corpus, once — because a victim reasoning about *whether this particular fee is legitimate* has already accepted the frame and will pay. The demand for a fee is not an obstacle standing between the victim and their money; it is confirmation that the money is gone.

## How it applies

- **OAK-T11.005 (Operator-side Fake-Platform Fraud):** the parent surface. The test withdrawal is the discriminator across every sub-pattern because all of them share the property that the balance is a claim and the withdrawal is the only fact.
- **OAK-T11.005.001 (Fake-CEX / Pig-Butchering Platform):** defeats the fattening phase directly. The technique's engine is fictitious profit inducing larger deposits; a user who tests withdrawal *before* the fattening starts exits at the cost of the test. A user who tests only after fattening has already lost the deposit — timing is the whole mitigation, and the rule must fire on the first deposit, not the largest.
- **OAK-T11.005.002 (Fake-Custodian / Fake-Asset-Manager Fraud):** partially blunted, and this must be stated honestly. Ponzi-structured operators *do* honour early withdrawals from new deposits — that is the credibility mechanism. The test passes and the platform is still fraudulent. Here the invariant is necessary but not sufficient, and the advance-fee leg does the work later, at collapse.
- **OAK-T11.005.003 (Compound-Operated Investment-Fraud Platforms):** same mechanics at industrial scale. The advance-fee leg additionally covers the follow-on recovery fraud these operations run against their own victims — the same compound, sometimes the same operator, on a different script.
- **OAK-T11.010 (Off-chain Counterparty-Risk Insolvency):** partial and probabilistic rather than decisive. A recurring test withdrawal against a *legitimate but insolvent* venue can surface settlement delay before a freeze, which is often the first externally-visible symptom. It will not distinguish insolvency from a routine operational delay, and a solvent venue can fail a test for boring reasons.

## Limitations

Ponzi-structured operators (T11.005.002) defeat the withdrawal test by design during the payout phase. Anyone presenting this invariant as a complete test for investment fraud is overstating it; it is decisive against fictitious-balance platforms and merely indicative against Ponzi-structured ones.

Fails entirely outside the deposit-custody surface. It says nothing about self-custody compromise, approval drainers, phishing, or contract exploits, where no third party holds the funds and there is nothing to withdraw *from*.

Requires the user to run it before the emotional commitment forms, which is precisely when it feels least necessary. The corpus's pig-butchering cases are relationship-first: by the time the deposit is contemplated, the victim's trust attaches to a person, not a platform, and a test withdrawal reads as an insult to that person. The rule is cheap in dollars and expensive in social friction, and the friction is engineered.

The advance-fee leg is stated as an absolute ("payment has never worked") on the basis of the corpus rather than on a proof. It is the right thing to tell a user, because probabilistic hedging in this specific moment produces payment. But the absolute is an empirical claim about OAK's observed set, and it should be re-tested rather than inherited.

Finally: the mitigation OAK's own T11.005 credits with the largest realised prevention is neither this nor any user-side rule — it is **retail-bank debit-card monitoring** (FBI Operation Level Up: 5,831+ victims notified, \$359M+ prevented by April 2025). A user-behavioural control is the last line here, not the strongest one, and the corpus is unambiguous that institutional interdiction outperforms it.

## Reference implementations

- **No production tooling, and none is possible.** This is a user action performed against an adversary-controlled interface.
- **Venue-side (adjacent):** licensed-VASP registry publication by regulators, which supports the pre-deposit check this rule pairs with. Registry coverage is per-jurisdiction and incomplete.
- **Retail-bank deposit-destination monitoring** — the highest-realised-prevention control on this surface, operating at the fiat on-ramp rather than at the user. See T11.005's Mitigations section.

## Citations

- See [`techniques/T11.005-operator-side-fake-platform-fraud.md`](../techniques/T11.005-operator-side-fake-platform-fraud.md) — names the small-test-withdrawal-before-deposit invariant as the canonical user-side mitigation, and records the Mitigation-mapping gap this entry fills.
- See [`examples/2023-09-jpex-hong-kong.md`](../examples/2023-09-jpex-hong-kong.md) — ~\$200M, 2,600+ victims; subway advertising and KOL endorsement as the credibility layer; 70+ arrests, almost all promoters.
- See [`examples/2024-01-kk-park-compound-takedown.md`](../examples/2024-01-kk-park-compound-takedown.md) — compound-scale operation; runs recovery services against the victims of its own fraud.
- See [`examples/2025-01-huione-guarantee-fake-cex.md`](../examples/2025-01-huione-guarantee-fake-cex.md) — the escrow/settlement layer beneath the compound ecosystem.
