# Demex — a forged "token deployed" report paired a \$10 token with canonical WETH, and the bridge paid out WETH unit for unit — Demex (bridge) / Ethereum, BNB Chain — 2026-09-25

**Loss:** **~\$191,929** per Demex's post-mortem: **64.78 WETH (~\$174.5K)** from the Ethereum gateway and **22.49 WBNB (~\$17.4K)** from BNB Chain. The attacker spent ~\$60 on ~95 nLEND and withdrew **87.27 nLEND (~\$10)** to trigger the releases. An identical sequence queued against Base was stopped by the halt; ~\$976K in other bridge reserves was protected. Demex says it will cover the shortfall; on 2026-10-13 it announced it will not reopen and is winding down.

**OAK Techniques observed:** **OAK-T10.002** (Cross-chain Message Verification Bypass — *primary*, per the operator's post-mortem. Demex's bridge module accepted **token-deployment reports** from the external-chain contract system, and the contract system accepted **instructions from the bridge module**; in the team's words, *"Neither side independently verified what the other reported."* The attacker used the generic execute flow to trigger a native token deployment and then submitted a **falsified report naming the canonical WETH contract as the newly deployed nLEND contract**. Both sides registered the pairing and the bridge released WETH against nLEND one for one. See [`techniques/T10.002-message-verification-bypass.md`](../techniques/T10.002-message-verification-bypass.md)).

**Attribution:** **pseudonymous.**

**Key teaching point:** **A token registry is part of the bridge's trust boundary, and a withdrawal limit must price what leaves.** The registry entry decided what each burned unit was worth on the other side, and it was writable by a report nobody checked. The \$50K / 24 h cap then valued the ~\$10 of nLEND being deducted rather than the ~\$192K being released, so the one control that should have bounded the loss read the attacker's side of the trade. nLEND was chosen because it used 18 decimals, like WETH and WBNB.

## Summary

On 2026-09-25 an attacker bought ~95 nLEND on Demex's order book, deployed a helper contract on Ethereum and, after four failed attempts and a rejected direct registration request (18:22 UTC), got a forged deployment report accepted through the execute flow at 18:29 UTC. Demex then mapped nLEND to WETH; the Ethereum withdrawal completed at 19:09 UTC and emptied the gateway's WETH. The same sequence took ~4 minutes on BNB Chain. A suspicious-activity alert fired three minutes after the first withdrawal; the admin multisig halted the chain before the Base attempt executed. The team says the two systems were never audited as a whole, bridge balances were not independently monitored and registry changes did not alert; a late-2024 audit and AI-assisted reviews had not flagged the flaw.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2026-06 | Four days of rejected probes (team cannot tie them to this attacker) | (reconnaissance) |
| 2026-09-25 13:03 | ~95 nLEND bought; helper contract deployed; four failed report attempts | (preparation) |
| 18:22 | Direct registration request rejected as unauthorised | — |
| 18:29 | Forged deployment report accepted via the execute flow; nLEND paired with WETH | **T10.002** |
| 19:09 | Ethereum WETH withdrawal completes | (extraction) |
| — | BNB Chain sequence, ~4 minutes; funds bridged to Ethereum | (extraction) |
| 19:47 | Base sequence queued; chain halted by admin multisig | (operator response) |
| 2026-09-29 | Post-mortem published | — |
| 2026-10-13 | Demex announces sunset and orderly withdrawals | — |

## Root-cause evidence

- **Technique:** OAK-T10.002
- **Source:** <https://blog.dem.exchange/25-sep-2026-demex-exploit-post-mortem/>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** Demex's post-mortem: the bridge module trusted deployment reports and the external contracts trusted the bridge module, with neither verifying the other; a falsified report registered canonical WETH as nLEND's pair, and the per-day cap priced the deducted nLEND, not the released WETH.

## Public references

- `[demexpostmortem2026]` — Demex, "25 Sep 2026 Demex Exploit Post-Mortem" (2026-09-29): <https://blog.dem.exchange/25-sep-2026-demex-exploit-post-mortem/>
- `[demexsunset2026]` — Demex, "Closing the Order Book" (2026-10-13): <https://blog.dem.exchange/demex-is-sunsetting/>
- `[ambcryptothreeexploits2026]` — AMBCrypto, "Crypto's security crisis deepens - 3 exploits rattle the market in 24 hours" (2026-10-15): <https://ambcrypto.com/cryptos-security-crisis-deepens-3-exploits-rattle-the-market-in-24-hours/>
