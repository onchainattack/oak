# Force Bridge admin-key drainage — Ethereum / BNB Chain — 2025-06-01

**Loss:** approximately \$3.76M extracted from the Force Bridge cross-chain bridge (\~\$3.127M on Ethereum, \~\$634K on BNB Chain). The attacker drained token after token by calling admin-restricted functions (`unlock()`, `withdraw()`, `transferOwnership()`) on both chain deployments. Proceeds were converted to ETH and laundered through Tornado Cash and FixedFloat.
**Recovery:** none of material consequence. No public restitution, bounty negotiation, or law-enforcement recovery action at v0.1 cutoff. The bridge was already in a publicly-announced sunset window (withdrawal period June 1–November 30, 2025, announced May 31); the exploit occurred on the first day of the sunset window.
**OAK Techniques observed:** **OAK-T10.001** (Validator / Signer Key Compromise) — primary; the attacker possessed admin credentials authorising privileged functions across both chain deployments of the bridge, consistent with either external key compromise or insider access. **OAK-T7.001** (Mixer-Routed Hop — proceeds were laundered through Tornado Cash and FixedFloat). **OAK-T9.004** (Access-Control Misconfiguration) — secondary; the admin-access model concentrated bridge-wide drainage authority in a single key or a tightly-held key set without timelock or multi-signature constraints that would have bounded the extraction velocity.
**Attribution:** **pseudonymous** — no named individual or group attributed. Multiple industry analysts noted the timing (bridge sunset announced May 31; drainage executed June 1) as structurally suspicious and consistent with an insider or an operator-adjacent party. The Rekt article characterised the pattern as "When the locksmith is the one robbing the vault." No public OAK-G01 attribution.
**Key teaching point:** **Bridge sunset/retirement windows are an elevated-risk surface.** The Force Bridge attacker struck within 24 hours of the sunset announcement, when the operator's operational attention was on the wind-down and the withdrawal window had just opened — a structurally predictable window of maximum extractable value against minimum defender attention. The case extends the T10.001 surface to include the *bridge-lifecycle-end* sub-pattern: a bridge at end-of-life may have reduced operational monitoring, fewer active defenders, and a withdrawal window that explicitly encourages large outflows, all of which lower the attacker's detection-risk floor.

## Summary

Force Bridge was a cross-chain bridge operated within the Nervos Network ecosystem, connecting Ethereum and BNB Chain. On May 31, 2025, Magickbase (the operator entity) announced Force Bridge's sunset: a withdrawal window would run from June 1 through November 30, 2025, during which users should withdraw their assets; after the window, the bridge would cease operations.

On June 1, 2025 — the first day of the withdrawal window — an attacker holding admin credentials called privileged functions (`unlock()`, `withdraw()`, `transferOwnership()`) on both the Ethereum and BNB Chain deployments of the bridge. The attacker systematically unlocked and drained token after token across both chains, converting the extracted assets to ETH and routing them through Tornado Cash and FixedFloat. The total extracted was approximately \$3.76M (\~\$3.127M on Ethereum, \~\$634K on BNB Chain).

Multiple failed transactions preceded the successful extraction on both chains, suggesting the attacker was testing the access surface. The attacker's funding transaction occurred the day *before* the sunset announcement — timing that multiple industry analysts flagged as suspicious and consistent with insider or operator-adjacent access.

The incident is the canonical 2025 worked example for the **bridge-lifecycle-end** sub-pattern of T10.001: a bridge at end-of-life where the sunset announcement, the withdrawal window, and the reduced operational-monitoring posture collectively create an elevated-risk surface.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-June 2025 | Force Bridge operates as a cross-chain bridge between Ethereum and BNB Chain in the Nervos Network ecosystem; admin-key custody model in place | T10.001 surface (latent) |
| 2025-05-30 | Attacker's Ethereum funding transaction executes — the day *before* the public sunset announcement | (pre-positioning signal) |
| 2025-05-31 | Magickbase announces Force Bridge sunset; withdrawal window set for June 1 – November 30, 2025 | (bridge-lifecycle-end surface opens) |
| 2025-06-01 | Attacker executes multiple failed transactions on both chains, testing the admin-access surface | (pre-exploit probing) |
| 2025-06-01 (same window) | Attacker calls `unlock()`, `withdraw()`, `transferOwnership()` across both deployments; drains ~$3.76M; converts to ETH; routes through Tornado Cash and FixedFloat | **T10.001 + T7.001 extraction** |
| 2025-06-01 (within hours) | Magickbase publishes initial alert on X; Cyvers and Hacken publish threat-alert and forensic threads | (operator + forensics response) |
| 2025-06-02 | Magickbase publishes "investigation" update; no formal post-mortem with root-cause analysis published | (limited transparency) |
| Continuing | No public restitution, arrest, or recovery at v0.1 cutoff | (zero recovery) |

## What defenders observed

- **The sunset-timing correlation is the load-bearing signal.** The attacker funded their wallet on May 30, Magickbase announced the sunset on May 31, and the drainage executed on June 1. The funding-precedes-announcement timing is structurally improbable for an external attacker discovering the bridge independently; it is more consistent with a party who knew the announcement was coming. Defenders reviewing bridge-lifecycle-end surfaces should treat the pre-announcement window as an elevated-risk period for insider or operator-adjacent action.
- **Admin-key concentration enabled single-actor drainage.** The attacker drained tokens across both chain deployments using the same set of admin-restricted functions. This implies the admin-access surface was not sharded across independent signers or across chain-specific keys — a single key or a tightly-held set of keys controlled the full bridge treasury across both chains. The mitigation surface is multi-signature admin access with per-chain key separation.
- **The withdrawal window was the attacker's cover.** June 1 was the first day users were expected to withdraw assets from the bridge. Large outflows on that day would not, in isolation, trigger defender alerting — they were the expected behaviour. The attacker selected the one day when their extraction would blend maximally with legitimate user withdrawals.
- **No timelock or velocity limit bounded the extraction.** The admin functions executed immediately with no delay, no per-transaction value cap, and no multi-signature quorum. A timelock on admin-restricted functions — even a short one (e.g., 24 hours) — would have given the operator time to detect and respond. A per-transaction or per-day value cap would have limited the extraction velocity and preserved residual funds for user recovery.
- **Laundering through Tornado Cash and FixedFloat closed the recovery window.** The proceeds entered mixing infrastructure within hours of the extraction, foreclosing on-chain recovery. FixedFloat's non-KYC instant-exchange model provided a second laundering rail alongside Tornado Cash.

## What this example tells contributors writing future Technique pages

- **T10.001 has a bridge-lifecycle-end sub-pattern.** Force Bridge is the canonical 2025 case: a bridge at end-of-life where the sunset announcement triggers a withdrawal window that the attacker exploits as cover, and where the operator's reduced operational-monitoring posture lowers the detection-risk floor. Future T10.001 contributions should track the bridge-lifecycle-end sub-pattern as a discrete risk surface.
- **Sunset announcements are elevated-risk events that warrant heightened monitoring, not reduced monitoring.** The Force Bridge pattern — attacker strikes immediately after the sunset announcement, using the withdrawal window as cover — is a structurally predictable dynamic. Protocol operators announcing a bridge sunset should treat the announcement-to-window-close period as a heightened-monitoring period, not a wind-down period.
- **Admin-key concentration is a T10.001 enabler even where no external compromise is proven.** The Force Bridge case does not depend on whether the attacker was an insider or an external key-compromiser; the load-bearing enabler was that a single key or tightly-held key set controlled the full bridge treasury. Multi-signature admin access with per-chain key separation is the mitigation, and it applies regardless of the compromise vector.
- **Funding-precedes-announcement is a high-confidence insider signal.** The May 30 funding vs. May 31 announcement delta is the kind of temporal signal that defenders should treat as high-confidence insider-action evidence. Bridge operators should monitor for pre-announcement transactions against admin-restricted functions and treat any such transaction as a critical alert.

## Public references

- [Rekt — Force Bridge](https://rekt.news/force-bridge-rekt/) — primary forensic write-up; canonical source for the \$3.76M figure, the Ethereum / BNB Chain split, the admin-function enumeration, the suspicious-timing analysis, and the attacker address — `[rektforcebridge2025]`.
- [Magickbase — initial alert (X)](https://x.com/magickbase/status/1929375666396418247) — operator-side initial acknowledgement.
- [Magickbase — investigation update (X)](https://x.com/magickbase/status/1929480862698987786) — operator-side follow-up; limited technical detail.
- [Cyvers — threat alert (X)](https://x.com/CyversAlerts/status/1929428359856935185) — real-time threat-alert thread.
- [Hacken — forensic thread (X)](https://x.com/hackenclub/status/1929451310060892202) — forensic analysis thread.
- [Extractor — access-control analysis (X)](https://x.com/extractor_web3/status/1929444219757756584) — access-control surface characterisation.
- [The Block — coverage article](https://www.theblock.co/post/356535/hackers-drain-over-3-million-in-crypto-from-nervos-networks-force-cross-chain-bridge-say-security-analysts) — contemporaneous industry coverage.
- [Force Bridge sunset portal](https://sunset.forcebridge.com/) — official sunset/withdrawal interface.

## Citations

- `[rektforcebridge2025]` — Rekt Force Bridge forensic write-up; primary source for technical details and the insider-timing analysis.
- `[magickbaseforcebridge2025]` — Magickbase operator-side communications.
- `[cyversforcebridge2025]` — Cyvers threat-alert thread.
- `[hackenforcebridge2025]` — Hacken forensic thread.
- `[theblockforcebridge2025]` — The Block industry coverage.

## Discussion

Force Bridge June 2025 is the OAK v0.1 reference case for the **bridge-lifecycle-end** sub-pattern of T10.001. The case is structurally informative because the sunset announcement, the withdrawal window, and the admin-key concentration composed into a clean extraction surface that an attacker (whether insider or external key-compromiser) exploited within 24 hours of the announcement.

The temporal signal — attacker funding on May 30, sunset announcement on May 31, drainage on June 1 — is the strongest insider-action signal in the v0.1 T10 corpus. It does not prove insider action (an external attacker could have independently discovered the bridge and coincidentally funded before the announcement), but the conjunction of funding-precedes-announcement, strike-on-first-day-of-withdrawal-window, and admin-key-possession is structurally improbable as coincidence and should be treated as a high-confidence insider-action indicator.

The Force Bridge case also extends the T10.001 surface beyond the canonical validator/signer-key-compromise framing (Ronin, Harmony Horizon) to include the *admin-key-concentration* sub-pattern: a bridge where the full treasury is controllable by a single admin key or a tightly-held key set, without timelock, multi-signature quorum, or per-transaction velocity limits. The Ronin and Harmony cases involved multi-signature validator sets where the attacker needed to compromise a threshold of keys; Force Bridge appears to have required only one key or a smaller set, making the compromise surface structurally narrower and the detection surface correspondingly smaller.

For bridge operators planning sunsets or end-of-life transitions: the Force Bridge case argues for treating the sunset window as a heightened-monitoring period, for ensuring admin access is multi-signature and timelocked even during wind-down, and for monitoring pre-announcement admin-function calls as critical alerts. The bridge-lifecycle-end surface is now a demonstrated operational risk, not a theoretical concern.
