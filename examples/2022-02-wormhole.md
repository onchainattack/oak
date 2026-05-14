# Wormhole Bridge — Ethereum ↔ Solana — 2022-02-02

**Loss:** \~\$325M (~120,000 wETH minted on the Ethereum side without a corresponding lock).
**Recovery:** the loss was made whole by Jump Crypto (Wormhole's developer-affiliated market-maker), which replaced the funds.
**OAK Techniques observed:** OAK-T9.004 (Access-Control Misconfiguration) — primary mechanistic classification; OAK-T10.002 (Message-Verification Bypass) — operational classification (it is also a bridge incident with a verification-function failure); **OAK-T10.007** (Bridge Validator Economic-Incentive Misalignment) — structural condition; the Wormhole bridge was secured by a 19-member Guardian set where the Guardians' economic stake was not bonded on-chain — there was no slashing mechanism, meaning the bridge security model relied entirely on the Guardians' off-chain reputation and legal-entity liability rather than on cryptoeconomic incentives.
**Attribution:** **pseudonymous** attacker. Subsequent counter-exploitation by Jump Crypto recovered approximately \$140M from the original attacker's downstream position; the broader case did not receive a publicly named attribution.

**Key teaching point:** Wormhole's structural lesson — that bridges must validate every authority involved in cross-chain message processing, not just the message contents — has been broadly absorbed by post-2022 bridge architectures. As of OAK v0.1, the dominant remaining T9.004/T10.002 risk class is *upgrade-introduced* validation flaws (Nomad pattern), not original-deployment flaws (Wormhole pattern), reflecting the industry's improvement in pre-deployment review at the cost of upgrade-path review.

## Summary

On February 2, 2022, an attacker exploited a deprecated signature-verification function on the Solana side of the Wormhole bridge. The function did not validate the address of the "guardian" account (the cross-chain authoritative validator entity) being passed in. The attacker constructed a forged validator action approval (VAA) calling `complete_wrapped` to mint approximately 120,000 wETH on the Ethereum side of the bridge — with no corresponding lock on the Solana side. The minted wETH was then "legitimately" extracted from the bridge.

For OAK's purposes, Wormhole is the **boundary case** between T9.004 and T10.002. Mechanistically, the failure mode is missing access-control on the verification function — a generic T9.004 access-control flaw. Operationally, this is a bridge incident with a message-verification bypass — a T10.002 case. OAK classifies it primarily under T9.004 and cross-references under T10.002, with this worked example linked from both Technique pages.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-02-02 (T+0) | Attacker constructs a VAA calling `post_vaa` referencing a counterfeit guardian-account address that the verification function does not validate | **T9.004 / T10.002 setup** |
| same transaction | `complete_wrapped` mints \~120,000 wETH on the Ethereum side without a corresponding lock | **T9.004 / T10.002 extraction** |
| same transaction | Attacker withdraws minted wETH from the bridge | T5-equivalent outflow |
| 2022-02-02 (within hours) | Wormhole disclosure; Jump Crypto announces it will replace the loss | (response) |
| Subsequent | Jump Crypto counter-exploits the attacker's downstream position, recovering \~\$140M | (recovery) |

## What defenders observed

- **Pre-event (audit / formal-verification layer):** the deprecated signature-verification function was a standing access-control flaw from the moment it was deployed. Pre-deployment formal verification of "every cross-chain message authority is validated against the guardian set before consumption" would have caught the issue.
- **At-event:** the forged VAA was processed in a single transaction; runtime detection had no usable signal.
- **Post-event:** the `complete_wrapped` mint event without a corresponding lock event was the unambiguous on-chain artefact; per-bridge invariant monitoring ("mints on side A must be paired with locks on side B in a bounded window") would have flagged the anomaly within blocks but not before extraction settled.
- **Recovery layer:** Jump Crypto's loss replacement is the primary reason this incident is more often discussed as a "case study" than as a "loss event" — the actual user impact was minimal, but the structural lesson (missing-guardian-validation in the bridge contract) is generalisable to bridges across the industry.

## What this example tells contributors writing future Technique pages

- **Boundary cases between T9 and T10 are real.** Wormhole is the canonical example; OAK accepts cross-classification when both the mechanistic (T9) and operational (T10) classifications fit cleanly. Contributors should not feel obliged to choose one — explicit cross-references are the right move.
- **Recovery via developer-affiliated market-maker is unusual.** Jump Crypto's loss replacement reflects a specific governance and incentive structure around Wormhole that does not generalise. Contributors writing future bridge examples should not assume an analogous recovery path exists; the Wormhole case is a rare exception.
- **Per-bridge invariant monitoring is a deployable mitigation.** The "mint without lock" invariant is straightforward to instrument; that the industry took years to broadly adopt this kind of monitoring is itself a defensive baseline observation contributors should preserve when writing T10.002 cases.

## Public references

- [Halborn — Explained: The Wormhole Hack (February 2022)](https://www.halborn.com/blog/post/explained-the-wormhole-hack-february-2022) — primary technical post-mortem.
- [Chainalysis — Wormhole Hack: Lessons From The Wormhole Exploit](https://www.chainalysis.com/blog/wormhole-hack-february-2022/) — forensic and lessons-learned analysis.
- [Elliptic — Stolen funds from the Wormhole hack on the move, after laying dormant for almost a year](https://www.elliptic.co/blog/analysis/stolen-funds-from-the-wormhole-hack-on-the-move-after-laying-dormant-for-almost-a-year) — laundering-route follow-up reporting.
- [Blockworks — Jump Crypto Just Counter-Exploited the Wormhole Hacker for \$140 Million](https://blockworks.com/news/jump-crypto-wormhole-hack-recovery) — counter-exploit and recovery reporting.

## Discussion

Wormhole's structural lesson — that bridges must validate every authority involved in cross-chain message processing, not just the message contents — has been broadly absorbed by post-2022 bridge architectures. As of OAK v0.1, the dominant remaining T9.004/T10.002 risk class is *upgrade-introduced* validation flaws (Nomad pattern), not original-deployment flaws (Wormhole pattern), reflecting the industry's improvement in pre-deployment review at the cost of upgrade-path review.

Contributors writing future Wormhole-era flashbacks (i.e., other 2022-era bridge cases) should preserve the Jump-Crypto-specific recovery context in the per-incident discussion; treating Wormhole's recovery as the industry baseline overstates how much of the industry has analogous recovery paths.

- **T10.007 surface: absent economic bonding for the Guardian set.** The Wormhole bridge's security model relied on a supermajority (13/19) Guardian threshold to authorise cross-chain messages. However, the Guardian set's economic stake was not bonded on-chain — there was no slashing mechanism that would penalise Guardian misbehaviour. The Guardians faced no on-chain financial penalty for signing fraudulent VAAs. The bridge's security model therefore relied entirely on off-chain reputation and legal-entity liability rather than on cryptoeconomic incentives. This is the structural T10.007 condition: the aggregate slashable validator (Guardian) stake was effectively $0, while the bridge's TVL was ~$3.8B, creating a stake/TVL ratio of 0 — the limiting case of economic-incentive misalignment. Although the proximate exploit (T9.004/T10.002) bypassed the Guardian signature requirement via a missing `verify_account` check rather than through Guardian self-dealing, the absent economic bonding surfaces the structural vulnerability: even if the signature verification had been correct, the 13-of-19 Guardian threshold would have been economically attractive to compromise because there was no on-chain stake at risk. Post-incident, Wormhole expanded the Guardian set to 19 members with published identities, but the economic-bonding gap remains a structural T10.007 surface at v0.1 — Guardian misbehaviour still lacks an on-chain slashing mechanism. The Wormhole case is the canonical demonstration that a bridge's validator/Guardian economic incentive structure matters *independently* of the verification-predicate correctness: a bridge with perfect verification code but zero economic bonding for its validator set is a bridge whose security assumption does not hold under the economic-rationality standard that the bridge's own documentation invokes.
