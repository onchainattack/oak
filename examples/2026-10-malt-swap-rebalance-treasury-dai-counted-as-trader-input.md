# MALT — the swap's own rebalancing pulled DAI from the treasury, and the swap counted it as the trader's payment — MALT / EVM — 2026-10-03

**Loss:** **~\$72K.** The project says the flaw is fixed and affected users will be compensated.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*, per SlowMist. During a swap, rebalancing withdrew DAI from MALT's **Capital Source** and returned it to the pool; the swap's invariant check then read **post-hook balances** and treated that treasury DAI as caller-supplied input, so a small input bought out-sized MALT. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)).

**Re-mapped 2026-10-11:** primary Technique moved from T9.004 to [`T9.016-contract-accounting-state-invariant-flaw`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md).

**Attribution:** **pseudonymous.**

**Key teaching point:** **Measure what the trader paid before anything else touches the balance.** An invariant checked after an internal hook can be satisfied by the protocol's own money.

## Summary

On 2026-10-03 an attacker made small-input swaps on MALT that triggered rebalancing from the Capital Source; the treasury DAI returned to the pool was counted toward the swap's input check, letting the attacker take out more MALT than paid for. Losses were ~\$72K; the project patched and pledged compensation.

## Timeline (UTC)

The SlowMist alert time is public; the exploit time is not stated in the cited sources.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-03 (undisclosed) | The vulnerable swap contract ([`0xfe6C096a2871337d4f6F7DD04Ebda733E94D7A13`](https://polygonscan.com/address/0xfe6C096a2871337d4f6F7DD04Ebda733E94D7A13)) records the caller's input and pre-swap reserves, calls an external `rebalanceHook` before sending output, then checks its invariant against final balances. Since when is not stated. | **T9.016** |
| 2026-10-03 (time undisclosed) | The attacker ([`0x8F103B6A0aD705bcE6357842A5fefEB49e8D83Ef`](https://polygonscan.com/address/0x8F103B6A0aD705bcE6357842A5fefEB49e8D83Ef)) sends negligible input; the hook withdraws DAI from the Capital Source into the pool, the check counts it as caller-supplied, and the attacker withdraws a disproportionate amount of MALT ([`0x915eccb5791508aa89a0a3f1385b26346b127ebb648b046e4cb558474ce8445b`](https://polygonscan.com/tx/0x915eccb5791508aa89a0a3f1385b26346b127ebb648b046e4cb558474ce8445b)). Preparation is not published. | **T9.016** |
| after the swap | Where the proceeds went is not stated (undisclosed). Loss ~\$72K. | — |
| 2026-10-03 16:18 | SlowMist publishes its alert. | response |
| after 2026-10-03 | The project says the flaw is fixed and affected users will be compensated; no post-mortem is published. | response |

Key addresses:

- Attacker — [`0x8F103B6A0aD705bcE6357842A5fefEB49e8D83Ef`](https://polygonscan.com/address/0x8F103B6A0aD705bcE6357842A5fefEB49e8D83Ef)
- Victim — [`0xF0d314849A3Bc9270a79110F25dBA2c8325A2AAC`](https://polygonscan.com/address/0xF0d314849A3Bc9270a79110F25dBA2c8325A2AAC)
- Vulnerable contract — [`0xfe6C096a2871337d4f6F7DD04Ebda733E94D7A13`](https://polygonscan.com/address/0xfe6C096a2871337d4f6F7DD04Ebda733E94D7A13)

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2106418632041668784>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist: rebalancing inside a swap pulled DAI from the Capital Source into the pool and the swap's validity check counted it as trader input. The project acknowledged a fix but published no analysis.

## Public references

- `[cryptonewsmalt2026]` — Cryptonews.net, "MALT Loses \$72K After Flawed Swap Lets Attacker Tap Treasury DAI" (2026-10-03): <https://cryptonews.net/news/security/33535167/>
- `[slowmistmalt2026]` — SlowMist on X, MALT alert: <https://x.com/SlowMist_Team/status/2106418632041668784>
