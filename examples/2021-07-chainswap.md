# ChainSwap bridge unauthorised-mint exploit — multi-chain (Ethereum, BSC) — 2021-07-02 and 2021-07-11

**Loss:** two separate events in July 2021: an earlier incident of about \$800K (July 2), and a second exploit on July 10-11 in which the attacker's wallet held tokens valued at about \$4.4M `[rektchainswap]`. A cumulative figure of about \$8M is reported by some outlets `[investingchainswap]`; Rekt's own figures are \$800K then \$4.4M `[rektchainswap]`. The earlier "SlowMist / Peckshield / CertiK triangulation" claim was unsourced and is removed.
**OAK Techniques observed:** **OAK-T10.002** (Message Verification Bypass — the bridge's Ethereum-side `receive` function accepted a call with a weak authentication check, so the attacker could mint bridged-token supply to addresses of their choosing `[rektchainswap]`). **OAK-T9.004** (Access-Control Misconfiguration — the weak authorisation check on the mint path). **OAK-T7.001** (Mixer-Routed Hop) — Rekt notes the attacker's wallet was funded from Tornado Cash and that about 456 ETH was cashed out via 1inch `[rektchainswap]`; routing of *proceeds* through Tornado is not established in the cited sources.
**Attribution:** **pseudonymous** — no named-individual attribution. Rekt records ChainSwap's claim to have received an email from the attacker and questions it `[rektchainswap]`.
**Corrected 2026-10-11:** The mechanism was rewritten: sources describe a weak-authentication mint flaw on existing bridged tokens (20 tokens on BSC), not deployment of a malicious token contract; loss figures and the Tornado Cash role were narrowed to what sources state; unsourced remediation and comparison claims removed.

**Key teaching point:** **Bridge mint authorisation must be bound to a verified message, not to attacker-supplied parameters.** Per Rekt, the attacker passed a new address as the "signature" on each call, bypassing the weak auth check and minting tokens directly to chosen addresses `[rektchainswap]`. A second incident within days of the first indicates that the first response did not close the root cause class.

## Summary

ChainSwap was a cross-chain bridge linking Ethereum, BSC, Polygon and Huobi Eco Chain `[forklogchainswap]`. In July 2021 it was exploited twice:

1. **July 2, 2021:** an earlier incident with losses of about \$800K `[rektchainswap]`. Sources consulted did not describe its mechanism.

2. **July 10-11, 2021:** the attacker called the `receive` function of the per-token proxy Factory contracts on Ethereum, minting tokens to addresses of their choosing; the auth check was weak (a new address was supplied as the signature each time) and each call paid a 0.005 ETH fee. On BSC the exploit targeted 20 tokens; for Wilder World's WILD, 40 repeated transactions each minted 500,000 WILD (20M total), sold for about 650 WBNB on PancakeSwap `[rektchainswap]`. Affected projects included Wilder World, Antimatter, Optionroom and Umbrellabank `[halbornchainswap]`. Date is given as July 10 by Halborn and July 11 by Rekt's linked post-mortem.

Whether the second exploit used a flaw related to the first patch is not established by the sources consulted; the earlier claim that it did, and that ChainSwap commissioned a full audit and a token-registry gate, was unsourced and is removed. The earlier comparison with Poly Network and Thorchain sub-classes is OAK-internal framing rather than sourced fact.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021-07-02 | First incident, about \$800K `[rektchainswap]` | (mechanism not sourced) |
| 2021-07-10/11 | Second exploit: unauthorised mint via weak auth on `receive`; 20 BSC tokens targeted `[rektchainswap]` `[halbornchainswap]` | T10.002 + T9.004 |
| 2021-07-10/11 | Attacker cashes out ~456 ETH via 1inch; wallet had been funded from Tornado Cash `[rektchainswap]` | T7.001 (funding side) |

## What defenders observed

- **Mint paths must verify message provenance.** The exploited `receive` path accepted an attacker-supplied value in place of a real signature `[rektchainswap]`.
- **Thin DEX pools amplify mint exploits.** Minted WILD was sold into a WILD/WBNB pool, depleting it, and several affected tokens lost most of their value `[rektchainswap]` `[halbornchainswap]`.

## What this example tells contributors writing future Technique pages

- **Record whether an incident involved one or several exploit events.** ChainSwap had two events in about nine days.
- **The mechanism here is an unauthorised mint on existing bridged tokens, not token deployment.** Contributors should not reuse the earlier "cross-chain token-deployment authorisation" sub-pattern label for this case.

## Public references

- `[rektchainswap]` — Rekt, "ChainSwap - REKT" (2021-07-13): <https://rekt.news/chainswap-rekt>
- `[halbornchainswap]` — Halborn, "Explained: The ChainSwap Hack (July 2021)": <https://halborn.com/explained-the-chainswap-hack-july-2021>
- `[forklogchainswap]` — Forklog, "Hackers drain more than \$4M from DeFi projects due to ChainSwap vulnerability": <https://forklog.com/en/hackers-drain-more-than-4m-from-defi-projects-due-to-chainswap-vulnerability/>
- `[investingchainswap]` — Investing.com, "\$8 Million Lost In Major ChainSwap Exploit": <https://investing.com/analysis/8-million-lost-in-major-chainswap-exploit-200590819>

## Discussion

ChainSwap July 2021 is a bridge unauthorised-mint case: weak authentication on a mint path allowed minting of bridged tokens to arbitrary addresses. The earlier text of this file framed it as the canonical "cross-chain token-deployment authorisation" sub-pattern; the sources consulted do not support that framing. Mechanism details beyond the weak auth check (Rekt's account) are not confirmed by an operator post-mortem seen here. Technique mapping (T10.002 vs a minting-authority T9.004 case) may merit review.
