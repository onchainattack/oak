# Onyx Protocol year-plus fork-vulnerability exposure — Ethereum — 2024

**Loss:** ~$3.8M drained from Onyx Protocol on Ethereum (2024-09-26 incident). Earlier exploit on Onyx on 2023-10-31 (~\$2.1M) via the same Compound V2 empty-market vulnerability. Aggregate losses across multiple Onyx exploits exceed $5M.
**OAK Techniques observed:** **OAK-T9.007** (Fork Substrate Vulnerability Not Mitigated — *primary*. Onyx ran a Compound V2 fork and was exploited twice through the same publicly documented empty-market weakness, 2023-10-31 and 2024-09-26). **OAK-T9.011** (Precision-Loss / Rounding Attack — the empty-market class works by inflating a market's exchange rate when supply is near zero and exploiting rounding on redemption). Onyx itself attributed the 2024 loss to an NFT-liquidation contract that failed to validate input; ForkLog reports the empty-market issue. The previous **T9.004** label had no source support and was removed 2026-10-11.
**Attribution:** **pseudonymous** — attacker addresses identified on-chain.

**Key teaching point:** Onyx demonstrates the multi-exploit fork pattern: the same protocol forking the same upstream codebase was exploited multiple times across more than a year because the fork operator addressed the specific exploit rather than the underlying vulnerability class. Each post-exploit remediation was point-fix rather than class-fix, leaving sibling attack surfaces unpatched.

**Corrected 2026-10-11:** 2024 exploit date changed from November to 2024-09-26 and its mechanism restated (empty-market precision issue / NFT-liquidation flaw, not governance-parameter manipulation); 2023 exploit details clarified.

## Summary

Onyx Protocol was a lending protocol on Ethereum forked from Compound Finance V2. The protocol was exploited on 2023-10-31 (~\$2.1M); rekt reports the attacker abused the newly added PEPE market (listed via Onyx governance Proposal 22) using the Compound V2 empty-market donation/rounding bug. The Onyx team applied a point-fix for the specific exploited vector but did not comprehensively audit the remaining Compound V2 vulnerability surface. On 2024-09-26 a second attack drained ~\$3.8M (VUSD, XCN, DAI, WBTC, USDT). ForkLog describes it as the known Compound V2 precision issue with a near-empty market; Onyx said the exploit stemmed from its NFT-liquidation contract, which did not properly validate input and allowed an inflated self-liquidation reward. Sources differ on the exact vector; neither involves governance-parameter manipulation.

The multi-exploit pattern across the same fork is the structural T9.007 signal: if the fork operator treats each exploit as an isolated incident rather than as evidence that the entire forked-vulnerability surface requires class-level remediation, subsequent exploits against different vectors on the same fork are likely.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-10-31 | Onyx Protocol exploited via the Compound V2 empty-market bug on the new PEPE market (Proposal 22); ~\$2.1M drained | T9.007 (first exploit) |
| 2023-11 - 2024-09 | Year-plus window: Onyx applies point-fix for the October 2023 vector but does not remediate the full Compound V2 vulnerability surface | T9.007 (unpatched) |
| 2024-09-26 | Second exploit (empty-market precision issue per ForkLog; NFT-liquidation contract flaw per Onyx); ~\$3.8M drained | T9.007 (second exploit) |

## Public references

- `[rektonyx2023]` — rekt.news, "Onyx Protocol - REKT" (2023-11-02): <https://rekt.news/onyx-protocol-rekt> (the ~\$2.1M 2023 empty-market exploit)
- `[hackenonyx2023]` — Hacken, "Onyx Protocol hack" (2023-11): <https://hacken.io/discover/onyx-protocol-hack/> (Proposal 22 PEPE market; 2023 exploit)
- `[w3iggonyx2024]` — Web3 is Going Just Great, "Onyx hacked for \$3.8 million via the same exploit used against them less than a year ago" (2024-09-26): <https://web3isgoinggreat.com/single/onyx-hack-2>
- `[forklogonyx2024]` — ForkLog, "Hackers exploit old vulnerability to breach Onyx for \$3.8 million" (2024-09-26): <https://forklog.com/en/hackers-exploit-old-vulnerability-to-breach-onyx-for-3-8-million>
