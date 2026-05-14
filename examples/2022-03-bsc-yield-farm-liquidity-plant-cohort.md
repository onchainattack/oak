# BSC yield-farm single-sided liquidity-plant cohort — Binance Smart Chain — 2022-Q1 through 2022-Q3

**Loss:** cumulative — the 2022 BSC yield-farming ecosystem produced a recurring pattern of token launches where the deployer seeded a PancakeSwap LP with single-sided depth (the project token paired against BNB or BUSD, with the token side comprising the dominant LP value) and the paired asset was withdrawn once retail LP contributions filled the BNB/BUSD side. Individual incident losses ranged from low tens of thousands to low millions; the cumulative pattern is the structural concern.
**OAK Techniques observed:** **OAK-T2.001** (Single-Sided Liquidity Plant — the deployer established the PancakeSwap LP with the project token comprising the majority of pool depth; once retail participants added BNB/BUSD to the other side, the deployer withdrew their token side, extracting the paired asset. The LP was structurally a deposit trap from genesis). **OAK-T5.001** (Hard LP Drain — the operational extraction leg; the deployer's withdrawal of the token side from the LP constituted a direct drain of the paired asset contributed by retail LPs). **OAK-T1.003** (onlyOwner / Proxy Rug — the token contract typically retained owner privileges enabling the LP manipulation or supply-side extraction).
**Attribution:** **pseudonymous-cohort** — the deployer addresses across the 2022 BSC yield-farm rug cohort form a recurring cluster graph at the funder level; individual operator identities are not publicly attributed.
**Key teaching point:** **The 2022 BSC single-sided LP plant is the canonical T2.001 deposited-trap sub-pattern.** The structural signature — deployer seeds LP with token side, retail fills the paired side, deployer withdraws — is distinguishable from the T2.002 (Locked-Liquidity Spoof) pattern where liquidity is claimed to be locked but is withdrawable. The two sub-patterns frequently co-occur in the same incident (an operator may plant one-sided LP AND claim it is locked), and OAK contributors should check for both T2.001 and T2.002 when a BSC token launch fits either sub-pattern.

## Summary

The 2022 BSC yield-farming ecosystem produced a recurring and structurally uniform token-launch pattern: a project would deploy a token contract with yield-farming branding, seed a PancakeSwap LP with the token paired against BNB or BUSD, market the yield-farming opportunity to attract retail LP contributions, then withdraw the deployer's token-side liquidity once sufficient paired-asset depth accumulated. The LP was structurally a single-sided deposit trap from genesis — the token side (controlled by the deployer) represented the dominant LP value, and the paired-asset side (contributed by retail) was the extraction target.

The pattern is the canonical T2.001 instantiation for 2022, distinct from the T1.001 (Modifiable Tax / Anti-sell) pattern of the 2021 SafeMoon wave (`examples/2021-03-safemoon.md`) and from the T2.002 (Locked-Liquidity Spoof) pattern exemplified by AnubisDAO (`examples/2021-10-anubisdao.md`). The structural signature — deployer-seeded token-side depth, retail-filled paired-asset side, deployer withdrawal — recurs across dozens of 2022 BSC yield-farm launches and is the load-bearing T2.001 worked example for the year.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-Q1 to Q3 | Recurring BSC token launches seed single-sided PancakeSwap LPs | **T2.001** (establishment) |
| 2022 (per-incident) | Retail participants add paired-asset (BNB/BUSD) LP contributions | T2.001 (retail fill) |
| 2022 (per-incident) | Deployer withdraws token-side LP, extracting paired asset | **T5.001** (extraction) |

## Public references

- `[certik2022bsc]` — CertiK's 2022 BSC security retrospective documenting the yield-farm rug-pull pattern and the single-sided LP plant as a recurring structural signature.
- `[peckshield2022bsc]` — PeckShield's 2022 BSC rug-pull tracking documenting the LP-plant pattern across the year's token-launch cohort.
- `[chainalysis2025rug]` — broader rug-pull cohort context.

## Discussion

The 2022 BSC single-sided LP plant cohort is included as the structural T2.001 anchor for 2022. The case closes the T2×2022 near-threshold gap at v0.1 and is the canonical deposited-trap sub-pattern of T2.001, structurally distinct from the 2021 SafeMoon T1.001/T2.002 pattern and from the 2023+ cross-chain deployer-cluster T2 patterns. Contributors writing future T2.001 pages should treat the 2022 BSC yield-farm cohort as the reference sub-pattern for the single-sided LP plant deployed at token launch.
