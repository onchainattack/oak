# Initial-Liquidity Backdoor and Locked-Liquidity Spoof Cohort — 2021–2025 — Aggregate $100M+

**Loss:** Aggregate loss estimated at $100M+ across the combined initial-liquidity-backdoor and locked-liquidity-spoof sub-cohorts spanning 2021–2025. The SafeMoon case alone (~$200M alleged misappropriation from the purportedly-locked pool per the SEC complaint) accounts for the majority of the named-loss total; the remaining cases are distributed across hundreds of individual rug pulls documented at cohort scale in industry retrospectives. The loss figure is an estimate — precise attribution of individual rug-pull losses to the specific liquidity-authority gap (T2.002 vs. T2.004 vs. a simpler T2.001 depth-plant) is structurally difficult from public blockchain data alone.

**OAK Techniques observed:** **OAK-T2.004** (Initial-Liquidity Backdoor — the operator's pool-creation transaction structurally retains backdoor withdrawal authority over the initial LP. The backdoor is embedded at the moment the pool is constructed: shadow LP mint recipients, upgradeable pool contracts with admin LP-withdraw paths, concentrated-liquidity attacker-controlled tick ranges, mint-recipient indirection through intermediary contracts, and per-pool privileged-role retention. T2.004 is distinct from T2.001 because the depth profile may look entirely normal — the pool can pass static depth/FDV gates while remaining fully drainable by the operator.) **OAK-T2.002** (Locked-Liquidity Spoof — a claim of "locked liquidity" that, on inspection, does not constrain the deployer's ability to remove liquidity in practice. Four operational sub-patterns: partial-coverage lock, short-duration lock, lookalike locker, and authority-override lock. The marketing claim and the on-chain authority structure disagree.)

**Attribution:** **unattributed** — The cohort spans independent operators across Ethereum, BSC, Polygon, Avalanche, Solana, Arbitrum, and Base. SafeMoon (BSC) is the largest named case with federal enforcement attribution; the memecoin partial-lock cohort (2024–2025, BSC + Solana) is the highest-volume sub-pattern.

**Key teaching point:** **T2.002 and T2.004 attack the liquidity-authority structure at different layers — T2.002 at the post-creation lock-representation layer, T2.004 at the creation-transaction layer — and a pool that is secure against one is not automatically secure against the other.** A pool whose creation transaction embedded a shadow-LP backdoor (T2.004) cannot be secured by locking the visible LP tokens in a legitimate locker (T2.002 defence) — the backdoor path to the shadow-LP supply bypasses the locker entirely. Conversely, a pool whose creation transaction is clean (no T2.004 backdoor) can still rug through a lookalike locker or authority-override lock (T2.002). The defender must verify both the creation-transaction authority structure (T2.004 surface) and the lock-claim authority structure (T2.002 surface) — verifying only one leaves the other as a standing rug surface.

## Summary

This cohort entry documents two distinct but complementary T2 sub-patterns that together cover the full lifecycle of liquidity-authority deception: **T2.004 attacks the creation moment** (embedding the backdoor before any lock decision exists), and **T2.002 attacks the lock claim** (misrepresenting the constraint that the lock actually imposes). A rug-pull operator may use either, both, or neither depending on the sophistication of the launch and the expected scrutiny of the target audience.

### T2.004: Initial-Liquidity Backdoor

The backdoor is embedded at pool-creation time. By the time an LP token reaches a locker (or fails to), the operator-controlled withdrawal path has already been constructed. Five operational sub-patterns are observed:

**Router-mediated LP mint to multiple recipients.** A pool-creation router mints LP tokens to a legitimate-looking LP-provider address AND to one or more operator-controlled "shadow LP" addresses in the same transaction. The headline LP recipient passes static depth checks; the shadow-LP balance is invisible to LP-holder enumerators that filter on the headline recipient. When the operator exits, they withdraw via the shadow-LP balance rather than the visible LP — the visible LP may even remain locked in a legitimate locker while the shadow supply is drained.

**Upgradeable pool contracts with admin LP-withdraw paths.** The pool is deployed behind a proxy (EIP-1967, transparent, UUPS) whose admin role can withdraw underlying tokens without going through the normal LP-token burn flow. The LP-token contract reports a correct total supply; the underlying reserve balance is lower because the admin has drained it through the proxy path. No LP-token burn event is emitted; the drain is invisible to LP-token-supply-based monitoring.

**Concentrated-liquidity attacker-controlled tick range (Uniswap V3-style).** The pool is initialised with a tick range whose effective trading band excludes the realistic price-discovery zone, or whose position NFT is owned by a deployer-clustered address with no constraint on `decreaseLiquidity` / `collect`. Withdrawal is gated by position-NFT control rather than LP-token burn — a surface that older LP-token-burn-based lockers do not cover at all.

**Mint-recipient indirection.** The LP-mint recipient is an intermediary contract (multisig, vesting wrapper, custodian wrapper) that surface-presents as a third-party custody role but whose authority structure resolves back to the deployer cluster. The intermediary passes a naive "LP held by independent custodian" check while remaining deployer-controlled.

**Per-pool privileged-role retention.** Pool factories that support per-pool roles (fee collector, oracle setter, emergency withdrawer) deploy with one or more such roles assigned to the deployer. At least one role admits an LP-equivalent withdrawal effect — an `EMERGENCY_WITHDRAW_ROLE` or `RESCUE_ROLE` that can drain reserves without interacting with the LP-token contract.

The T2.004 detection surface is the pool-creation transaction trace: enumerating all LP-mint recipients, checking for proxy deployments, inventorying admin roles, and tracing LP-position-NFT ownership. None of these checks are performed by standard DEX UI tooling at v0.1.

### T2.002: Locked-Liquidity Spoof

The locked-liquidity spoof is the most mature and highest-volume T2 sub-pattern because it exploits the gap between the marketing claim ("LP locked") and the on-chain authority structure (locker contract type, lock coverage, lock duration, administrative-override surface). Four operational sub-patterns are documented:

**Partial-coverage lock.** The lock receipt covers only a fraction of total LP supply (typical: 30–50% locked, remainder deployer-controlled). The marketing claim implies full lock. The unlocked portion is drained within hours-to-days of the liquidity peak. This is the highest-volume sub-pattern in the 2024–2025 memecoin wave.

**Short-duration lock.** The lock duration is materially shorter than the implied investor time horizon (e.g., 30-day lock marketed as "long-term commitment"). The lock is technically real but the temporal mismatch makes it functionally equivalent to no lock for investors with a longer horizon.

**Lookalike locker.** LP is held in a locker contract that visually resembles a known legitimate locker (Unicrypt, Team Finance, PinkLock, Mudra Locker) but is a deployer-deployed contract with administrative override. The locker address is typically one character different from the canonical locker (typo-squat), or shares the same address on a different chain (address-overlap, crossing into T2.003 territory). The user's verification consists of checking "is there a lock receipt?" rather than "is the locker contract the canonical one?"

**Authority-override lock.** The lock receipt is issued by a legitimate locker, but the locker contract retains administrative roles (early-release `onlyOwner` function, `transferOwnership` callable by deployer) that allow the deployer to retrieve LP before the claimed unlock date. The lock is "real" in the narrow sense of being issued by a legitimate locker, but the locker's own authority structure is not trustless — a subtlety invisible to users who treat "locked on Unicrypt" as a binary condition.

**Named cases:**

- **SafeMoon (SFM) — BSC — SEC complaint filed 2023-11-01 — ~$200M alleged.** The U.S. SEC complaint specifically documents that "large portions of the liquidity pool were never locked" despite the project's public claim that locked pools made a rug pull impossible. The executive team is alleged to have misappropriated approximately $200M from the purportedly-locked pool. The case is the textbook T2.002 partial-coverage sub-pattern documented at the federal enforcement level. Source: `[secsafemoon2023]`.

- **Memecoin partial-lock cohort — BSC + Solana — 2024–2025.** Industry retrospectives (`[chainalysis2025rug]`, `[slowmist2024report]`) document the pattern at cohort scale: the typical playbook is a 30–50% partial lock marketed as full lock, with the unlocked portion drained within hours-to-days of the liquidity peak. Per-incident write-ups are published on a rolling basis by ZachXBT and ScamSniffer.

- **Lookalike-locker cohort — BSC — 2022 onward.** Deployer-deployed locker contracts visually resembling Unicrypt / Team Finance / PinkLock have been documented across rug-pull retrospectives. The pattern relies on users verifying "is the LP locked?" at the marketing-claim level rather than verifying the locker contract address against the canonical locker's published deployment address.

### T2.002 + T2.004 combined playbook

The most sophisticated operators use both Techniques in sequence: the pool-creation transaction embeds a shadow-LP backdoor (T2.004), and the visible LP is partially locked in a lookalike locker (T2.002). The user who checks "is there a lock?" sees a lock receipt and is satisfied. The user who checks "is the pool depth normal?" sees normal depth and is satisfied. Neither check surfaces the shadow-LP balance or the lookalike-locker authority structure. The combined playbook is the worst-case defender scenario because it requires both creation-transaction-level and lock-claim-level verification — a workflow no existing tooling supports end-to-end.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021 | Locked-liquidity-spoof pattern first characterised in industry rug-pull retrospectives | T2.002 (class emergence) |
| 2021–2022 | Lookalike-locker sub-pattern emerges on BSC; deployer-deployed lockers visually resembling Unicrypt / Team Finance / PinkLock | T2.002 (lookalike-locker) |
| 2022 onward | Initial-liquidity-backdoor pattern characterised at industry-survey scale in backdoor-code static-analysis research | T2.004 (class emergence) |
| 2023-11-01 | SafeMoon SEC complaint: ~$200M alleged misappropriation from purportedly-locked pool; partial-coverage sub-pattern documented at federal enforcement level | T2.002 (canonical named case) |
| 2024–2025 | Memecoin partial-lock cohort: 30–50% partial locks marketed as full lock across BSC and Solana; hundreds of individual rug pulls | T2.002 (highest-volume sub-pattern) |
| 2021–2025 | Combined T2.002 + T2.004 playbook observed in sophisticated multi-chain rug-pull operations; no systematic verification tooling deployed | T2.002 + T2.004 (ongoing) |

## Public references

- `[secsafemoon2023]` — SEC complaint against SafeMoon LLC et al., filed 2023-11-01 in the U.S. District Court for the Eastern District of New York
- `[chainalysis2025rug]` — Chainalysis annual crypto-crime reporting documenting lock-misrepresentation as a recurring rug-pull enabler
- `[slowmist2024report]` — SlowMist annual blockchain security report documenting memecoin rug-pull patterns
- `[tmrugpull2026]` — TM-RugPull dataset: ~1,028 multi-chain rug-pull projects spanning 2016–2025
- ZachXBT and ScamSniffer per-incident write-ups on a rolling basis for memecoin partial-lock cases
- See `techniques/T2.004-initial-liquidity-backdoor.md` and `techniques/T2.002-locked-liquidity-spoof.md` for Technique definitions
- See also `techniques/T2.001-single-sided-liquidity-plant.md` (structurally distinct — depth-profile failure rather than authority-structure failure) and `techniques/T2.003-cross-chain-locked-liquidity-spoof.md` (cross-chain variant of the lock-spoof class)

## Discussion

The T2.002 + T2.004 cluster is the most operationally significant liquidity-establishment deception surface at v0.1 because it covers the two structural layers — creation-transaction authority and lock-claim constraint — that together determine whether a pool's liquidity is genuinely constrained. The defender's workflow problem is that verifying both layers requires tooling that spans the pool-creation transaction trace (T2.004 surface), the locker-contract authority enumeration (T2.002 surface), and the cross-chain lock-receipt-to-pool binding (T2.003 surface, covered in the companion cohort entry). No existing DEX UI, block explorer, or portfolio tracker performs any of these three verifications automatically. The gap between the marketing-claim verification surface (which is the only surface most users interact with) and the authority-structure verification surface (which is the only surface that actually constrains the deployer) remains the structural enabler for the entire T2 Technique family.
