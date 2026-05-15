# Harmony Horizon Bridge light-client verification economic-security gap — Ethereum / Harmony — 2022-06-23/24

**Loss:** approximately \$100M (approximately \$99.6M tracked by Elliptic at time of event; ETH, BNB, USDT, USDC, DAI extracted across 14 transactions on Ethereum and Binance Smart Chain).
**OAK Techniques observed:** **OAK-T10.005** (Light-Client Verification Bypass — sub-case (c), Consensus-Rule Modelling Mismatch — the Horizon Bridge's security model reduced to a 2-of-5 validator-signature threshold check; the verification primitive was a multisig threshold verification that was cryptographically correct but economically insufficient relative to the bridge's TVL; the verification model encoded "two signatures suffice" without encoding the economic-security requirement that the validator threshold should be infeasible to compromise given the asset value at stake). **OAK-T10.001** (Validator-Signer Key Compromise — the proximate entry vector; the attacker compromised two of the five signing keys through off-chain server access, meeting the 2-of-5 threshold the bridge's verification primitive required).
**Attribution:** **confirmed**. Elliptic attributed the incident to Lazarus Group / APT38 within days of the event (June 2022) based on laundering-pattern overlap with the Ronin case and wallet-cluster analysis. The FBI confirmed Lazarus Group / APT38 attribution on January 23, 2023, tying the case to the "TraderTraitor" DPRK campaign label.
**Key teaching point:** **A bridge whose security reduces to a threshold-signature verification where the threshold is economically inadequate is a T10.005 surface — the verification primitive (multisig check) functions correctly as specified, but the specification itself failed to encode the economic-security requirement that the threshold should be infeasible to compromise given the bridge's TVL.** The Horizon Bridge's 2-of-5 threshold was the load-bearing architectural decision: two compromised keys out of five was a sufficient quorum, and the \$100M TVL made that quorum an economically rational target. The incident demonstrates that T10.005 is not confined to zk-proof-bridge circuit-soundness failures — the "consensus-rule modelling mismatch" sub-case (c) applies whenever the verification model fails to encode the real-world security requirements.

## Summary

The Harmony Horizon Bridge connected Ethereum (and Binance Smart Chain) to the Harmony chain. The bridge's security model reduced to a multisig threshold verification: outbound asset transfers required signatures from at least 2 of 5 designated validator addresses. The verification primitive — a plain 2-of-5 multisig check — was cryptographically correct: it accepted exactly those transactions that carried two valid signatures from the designated set, and rejected all others.

The structural vulnerability was at the economic-security layer, not at the cryptographic layer. A 2-of-5 threshold means that an attacker who compromises any two of the five signing keys controls the bridge. With approximately \$100M in TVL, the bridge was a rational target: the attacker needed to compromise two hot-wallet servers (which held the signing keys in plaintext for operational signing purposes), not five. The verification model encoded "two signatures pass the check" but did not encode "two signatures should not be sufficient to authorise \$100M in outbound transfers."

On June 23–24, 2022, the attacker compromised two of the five signer key-holding servers through off-chain infrastructure access, signed 14 extraction transactions across Ethereum and BSC, and drained the bridge. Post-incident, Harmony reconfigured the Ethereum-side bridge multisig from 2-of-5 to 4-of-5 — acknowledging that the original threshold had been economically inadequate for the bridge's TVL.

This framing — verification-primitive correct but economically insufficient — is the T10.005 sub-case (c) surface. The bridge's verification model was too weak for the asset value it protected, structurally parallel to a light-client that verifies headers but not validator-set transitions, or a proof system whose circuit encodes a consensus rule that is technically correct but too permissive. The Harmony Horizon case is the cleanest illustration that T10.005's verification-model-mismatch surface applies even when the verification primitive is a simple multisig rather than a zk-SNARK circuit — the gap between what the verification checks and what the defender needed it to check is the T10.005 attack surface.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-event (bridge design) | Horizon Bridge deployed with 2-of-5 multisig verification; threshold too low for ~$100M TVL | T10.005 (consensus-rule modelling mismatch — the verification model's economic insufficiency was the structural surface) |
| Pre-event (off-chain) | Attacker compromises Harmony infrastructure, gaining access to plaintext signer keys on hot-wallet servers | (off-chain entry vector) |
| 2022-06-23 ~12:30 | First extraction transactions on Ethereum side; two compromised signing keys meet the 2-of-5 verification threshold | **T10.001** (key compromise) + **T10.005** (verification-model-bypass — the verification primitive accepted the signatures because it was specified to accept any two) |
| 2022-06-23/24 | 14 transactions across Ethereum and BSC extract ~$100M | T10.001 extraction |
| 2022-06-24 | Harmony team publicly discloses | — |
| 2022-06-27 onward | Non-ETH assets swapped to ETH; ~$96M routed through Tornado Cash | T7.001 |
| 2022-06 (within days) | Elliptic attributes to Lazarus Group / APT38 | inferred-strong attribution |
| 2023-01-13 | DPRK actors begin layering >$60M through RAILGUN | T7.001 (alternate-mixer continuation) |
| 2023-01-23 | FBI confirms Lazarus Group / APT38 attribution | confirmed attribution |
| 2023-06 onward | Harmony reconfigures Ethereum-side bridge multisig from 2-of-5 to 4-of-5 | operator-side mitigation (verification-threshold correction) |

## Realised extraction

Approximately \$100M in ETH, BNB, USDT, USDC, and DAI.

## OAK technique classification rationale

The classification as T10.005 (sub-case (c), Consensus-Rule Modelling Mismatch) alongside T10.001 (Validator-Signer Key Compromise) captures both layers of the incident. T10.001 captures the proximate entry vector — the attacker compromised two signing keys. T10.005 captures the structural precondition — the bridge's verification model was specified around a 2-of-5 threshold without encoding the economic-security requirement that the threshold should be infeasible to compromise given the bridge's TVL. The post-incident remediation confirms this reading: Harmony did not merely rotate the compromised keys (the T10.001 response); they raised the threshold from 2-of-5 to 4-of-5 (the T10.005 response — correcting the verification model). The two-Technique classification captures both the "how they got in" (T10.001) and the "why the threshold was too low" (T10.005).

## Public references

- Elliptic forensic write-up (loss size, multisig-compromise vector, Tornado Cash laundering route, same-week Lazarus attribution)
- FBI press release (January 23, 2023) confirming Lazarus Group / APT38 attribution and tying to "TraderTraitor" DPRK campaign
- Halborn technical post-mortem (2-of-5 multisig configuration, plaintext-key hot-wallet hypothesis, post-incident move to 4-of-5)
- See companion example at `examples/2022-06-harmony-horizon.md` for the T10.001-only framing and Lazarus-attribution timeline detail
