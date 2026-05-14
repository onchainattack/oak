# Resolv Labs Private-Key Compromise and Unlimited USR Mint — Mar 2026 — $25M

**Loss:** approximately $25M in extracted value. The attacker compromised a Resolv Labs private key that controlled the USR token's mint function, minting approximately 80 million USR tokens (stable-value tokens intended to be 1:1 backed) without any oracle check or mint-cap limit. The attacker swapped the minted USR for USDC, DAI, and ETH on DEX pools, extracting approximately $25M before the USR price depegged from its $1 target. The exploit demonstrated a dual safety-mechanism failure: no oracle verification of mint legitimacy (the mint function did not check whether corresponding collateral had been deposited) and no mint-cap limit (the mint function had no ceiling on the total mintable supply per transaction or per address).

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — the root cause was a private-key compromise granting the attacker access to a privileged mint function. The function's access control was not misconfigured per se — the key was compromised — but the function lacked the secondary safety mechanisms that would have limited the blast radius of a key compromise.) **OAK-T11** (Custody / Signing — the incident is a T11-class event at the operator-key layer: the compromise of a protocol's privileged signing key, rather than a user's wallet key or an exchange's hot-wallet key. The operator-side key-management failure is the load-bearing vulnerability.)

**Attribution:** **pseudonymous** attacker; on-chain address identified but not linked to a named individual. The compromise vector (phishing, insider, infrastructure breach, or operational-security failure) was not publicly disclosed at the time of writing.

**Key teaching point:** **The Resolv Labs exploit is the canonical "single-key compromise with no blast-radius limiters" case: the attacker gained access to one privileged key, and that key granted unlimited, unchecked mint authority with no secondary circuit-breaker.** The dual absence of oracle verification (no check that minted USR corresponded to deposited collateral) and mint-cap limitation (no ceiling on mintable supply per call, per address, or per time window) meant the key compromise converted directly into an unlimited-mint exploit — the attacker's extraction was bounded only by DEX liquidity, not by any protocol-level safety mechanism. The structural lesson is that **privileged functions — mint, upgrade, pause, withdraw — should always have secondary safety mechanisms independent of the access-control layer: an oracle check (does the mint correspond to collateral?), a rate limit (how much can be minted per block/hour?), and a time delay (can the mint be executed instantly or must it pass through a timelock?).** The absence of these mechanisms makes any key compromise catastrophic rather than contained.

## Summary

Resolv Labs is a DeFi protocol issuing USR, a stable-value token designed to maintain a 1:1 peg to the US dollar. USR was backed by a collateral pool of stablecoins (USDC, DAI) and yield-bearing assets. The protocol's mint function allowed authorised addresses to mint new USR tokens — intended to be used for protocol operations, liquidity provisioning, and user redemptions against deposited collateral.

On March 22, 2026, an attacker gained control of a private key with mint authority over the USR token contract. The attacker called the mint function to create approximately 80 million USR tokens — far exceeding the protocol's collateral backing. The mint function had two critical design omissions:

1. **No oracle check.** The mint function did not verify that the minted amount corresponded to collateral deposited in the protocol's reserves. A well-designed mint function should check: `mint_amount <= total_collateral - total_supply` or should route through a deposit function that atomically mints against a verified deposit. Resolv's mint function checked neither — it minted whatever amount the caller requested.

2. **No mint-cap limit.** The mint function had no ceiling on the mintable supply — no per-transaction cap (e.g., max 1M USR per mint call), no per-address cap (e.g., max 10M USR per address per day), and no time-window limit (e.g., max 50M USR per 24-hour period). An attacker who could call the mint function could mint unlimited USR in a single transaction.

The attacker executed the standard exploit chain:

1. **Compromise key.** Gain access to the privileged mint-authority private key (vector not publicly disclosed).

2. **Unlimited mint.** Call the mint function to create ~80M USR tokens.

3. **DEX dump.** Swap minted USR for USDC, DAI, and ETH on Uniswap V3, Curve, and other DEX pools where USR traded against stablecoins. The massive USR supply flood collapsed USR's price from ~$1.00 toward near-zero.

4. **Launder.** Bridge extracted stablecoins and ETH through cross-chain bridges and mixing protocols (Tornado Cash analogues on L2s).

The exploit was detected within minutes of the mint transaction — on-chain monitors flagged the anomalous mint volume. However, the attacker had already executed the DEX swaps in the same transaction bundle as the mint (using a multicall or bundler contract), extracting the DEX liquidity before USR's price could fully adjust to the new supply. The $25M extraction was bounded primarily by USR's DEX liquidity depth: the attacker could only extract what the DEX pools would pay for USR before the price collapsed.

Resolv Labs acknowledged the exploit and paused protocol operations. The recovery plan involved protocol-treasury funds and a potential token reissuance, but the $25M loss represented a material fraction of the protocol's total value locked.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| pre-2026-03 | Resolv Labs USR token deployed; mint function lacks oracle check and mint-cap limit; privileged mint-authority key held by protocol operators | T9.004 + T11 (standing vulnerability) |
| 2026-03-22 | Attacker compromises mint-authority private key; calls mint function; creates ~80M USR tokens | T9.004 + T11 |
| 2026-03-22 | Attacker dumps minted USR on DEX pools; extracts ~$25M in USDC, DAI, ETH; USR price collapses from ~$1.00 to near-zero | T9.004 (unlimited-mint price collapse) |
| 2026-03-22 | Resolv Labs detects exploit; pauses protocol operations; announces recovery plan | (incident response) |
| 2026-03 onward | Investigation into key-compromise vector ongoing; protocol considers reissuance with added oracle-check and mint-cap safety mechanisms | (remediation) |

## Public references

- Resolv Labs official incident announcement and post-mortem (March 2026)
- On-chain forensic analysis of the mint transaction and DEX dump pattern
- USR/USDC and USR/DAI pool analytics showing price collapse and extraction volume
- See `techniques/T9.004-access-control-misconfiguration.md` and `techniques/T11` custody techniques for Technique definitions

## Discussion

The Resolv Labs exploit is the canonical "single-key compromise with no blast-radius limiters" case in the T9.004/T11 intersection. The attack is structurally simple — gain a key, call a function, dump on DEX — but the design-level failure (no oracle check, no mint cap) amplified the key compromise from a contained incident (the attacker mints a limited amount based on collateral verification) to an unlimited-extraction event.

The dual-absence pattern (no oracle check AND no mint cap) is instructive for defender risk assessment: each missing mechanism is independently a vulnerability, but their combination is multiplicative. A mint function with an oracle check but no cap would limit the attacker to minting against deposited collateral — the attacker could still extract value but only up to the collateral amount. A mint function with a cap but no oracle check would limit the attacker to the cap — the extraction is bounded even without collateral verification. A mint function with neither is unbounded extraction — the attacker mints everything the DEX will buy.

The operator-key management failure (T11) is the load-bearing root cause: the attacker gained access to a privileged key. The protocol's T11 surface — how the mint-authority key was stored, who had access, whether it was in a multisig or a single-key wallet, whether it was online (hot) or offline (cold) — determines the likelihood of key compromise. The T9.004 surface — whether the mint function had secondary safety mechanisms — determines the blast radius once a compromise occurs. The combined T11 + T9.004 surface is the defender's risk equation: `expected_loss = P(key_compromise) × extraction_volume_per_compromise`. Reducing P(key_compromise) is a T11 mitigation (multisig, cold storage, access controls); reducing extraction_volume_per_compromise is a T9.004 mitigation (oracle checks, mint caps, timelocks).

The Resolv Labs incident anchors both the T9 × 2026 and T11 × 2026 matrix cells (contributing to the P1 backfill targets for those tactics) and provides the canonical 2026 worked example of the unlimited-mint-from-compromised-key pattern that has recurred throughout DeFi history (EasyFi 2021, Ankr aBNBc 2022, and now Resolv 2026).
