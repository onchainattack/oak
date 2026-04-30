# OAK-M11 — Rate-Limiting and Per-Block Caps

**Class:** architecture
**Audience:** protocol, designer

**Maps to Techniques:** OAK-T5.001, OAK-T5.002, OAK-T9.001, OAK-T9.002, OAK-T10.001, OAK-T10.002

## Description

Rate-limiting and per-block caps are the architectural mitigation that bounds the *speed* of value extraction from a protocol, regardless of the underlying authorisation correctness or the attacker's preferred Technique. The mitigation surface includes per-transaction caps (no single tx may move more than `X` of the protected asset), per-block caps (no single block may aggregate more than `Y` of outflow), per-time-window caps (no rolling N-minute / N-hour window may aggregate more than `Z`), and per-account caps where the protocol has a meaningful account abstraction.

The mitigation is *structurally orthogonal* to authorisation: it does not assume the caller is malicious or honest, and it does not assume the call path is exploit-free. It assumes only that legitimate usage fits below the cap and unusual aggregate outflow is worth pausing-and-reviewing. This makes rate-limiting a backstop against the *failure-mode* of every other mitigation: if oracle-manipulation defences (OAK-M09) are bypassed, if reentrancy defences (OAK-M10) are bypassed, if a bridge's verification logic (OAK-M12 / T10.002) is bypassed, the rate-limit caps the resulting extraction's *throughput*, buying the protocol time to detect, pause, and respond.

Implementations land in three architectural patterns. First, *protocol-native caps* (per-pool withdrawal caps in lending markets; per-block mint caps in stablecoins; per-bridge per-asset daily caps). Second, *circuit-breaker-coupled caps* (e.g., the EIP-7265 / "ERC-7265 Circuit Breakers" proposal pattern; protocols pause when caps trip). Third, *governance-time-locked caps* on cap-changes themselves (preventing an attacker who has gained governance control from raising caps and immediately draining — see T9.003 territory). A complete deployment combines all three: the cap, the breaker that fires when the cap trips, and the time-lock on cap-changes.

For OAK this mitigation appears across *exit-class* Techniques (T5.001 Hard LP Drain, T5.002 Slow LP Trickle Removal), *exploit-class* Techniques (T9.001 / T9.002), and *bridge-class* Techniques (T10.001 / T10.002) — anywhere the defender's question is "even if the authorisation is wrong, how much can leave per block."

## How it applies

- **OAK-T5.001 (Hard LP Drain):** per-pool / per-block withdrawal caps bound the throughput of a single-block LP-removal pattern; LP-vesting / LP-lock contracts (separately tracked) are the upstream complement, but rate-limiting is the architectural backstop when LP authority structure is itself the problem.
- **OAK-T5.002 (Slow LP Trickle Removal):** per-time-window cumulative caps directly mitigate the trickle pattern — a 24-hour or 7-day rolling cap on cumulative LP outflow denies the slow-drain Technique its defining property of staying below per-tx alert thresholds. This is the canonical T5.002 mitigation surface.
- **OAK-T9.001 (Oracle Price Manipulation):** in the *oracle-recovery* failure mode where a deviation circuit-breaker (OAK-M09) leaves a protocol unable to liquidate underwater positions immediately, per-block liquidation caps (combined with phased re-enablement) bound the cascading-liquidation surface during recovery. OAK-M11 is the recovery-side complement to OAK-M09.
- **OAK-T9.002 (Flash-Loan-Enabled Exploit):** flash-loan attacks land their entire payload in a single transaction; a per-tx cap is the simplest and most blunt mitigation against the worst-case extraction size, even when the attack-path-specific defence has failed. Pair with OAK-M09 + OAK-M10.
- **OAK-T10.001 (Validator / Signer Key Compromise):** per-bridge per-asset daily caps bound the extraction throughput of a key-compromise event; the Ronin 2022 incident motivated industry-wide adoption of bridge daily caps and is the canonical T10.001 + OAK-M11 worked example.
- **OAK-T10.002 (Message-Verification Bypass):** per-bridge per-asset per-block caps bound the extraction throughput of a verification-bypass exploit; combined with the runtime invariant pause-on-anomaly recommendation in T10.002, the cap is the bound on damage in the window between exploit-start and operator-initiated pause.

## Limitations

Caps that are too tight degrade legitimate usage; caps that are too loose are operationally meaningless. Calibration is the open problem and is necessarily protocol-specific (depending on legitimate-throughput distribution, treasury size, attacker time-cost, recovery-process latency). The cap-calibration question is itself an active research surface and is not standardised.

A circuit-breaker that pauses on cap-trip introduces a denial-of-service surface; an attacker who can engineer a legitimate-looking cap-trip can pause the protocol without an extraction. Cap-changes that are *not* time-locked are an attractive governance-attack target (T9.003): the attacker raises caps in the same proposal that authorises the drain. Time-locked cap-changes are essential.

Rate-limiting is throughput-bounded, not extraction-prevention: it does not stop the underlying Technique, it bounds the per-block damage. For attackers willing to extract over multiple blocks (T5.002 by definition; some T10.001 incidents in slow-extraction mode) the cap merely *spreads* the extraction; the *cumulative* cap is the mitigation, not the per-block cap.

Cross-protocol rate-limiting (where the attacker fragments outflow across multiple protocols / pools / bridges) escapes per-protocol caps. The defender's response is per-cluster rate-limiting at downstream off-ramps (which intersects OAK-M07 / cross-chain attribution graph) rather than per-protocol caps.

## Reference implementations

- **EIP-7265 / ERC-7265 Circuit Breakers** — proposed standard for protocol-level circuit-breaker primitives coupled with caps; not yet final.
- **Aave v3 supply / borrow caps + isolation mode** — production per-asset and per-account caps with governance-time-locked changes.
- **Compound v3 supply caps + speed-limited governance** — cap + time-lock pattern in production.
- **MakerDAO debt ceilings + Surplus Buffer + ESM (Emergency Shutdown Module)** — cap + breaker + governance-time-lock combined; the canonical multi-layered example.
- **Major bridges (LayerZero, Wormhole, Axelar, Across, Hop) per-asset daily caps** — production per-bridge caps motivated by T10.001 / T10.002 incidents; calibration varies materially across bridges.
- **OpenZeppelin Defender / governance-time-lock contracts** — operational tooling for time-locked cap changes.

## Citations

- `[ellipticronin2022]` — Ronin 2022 incident; canonical T10.001 worked example motivating bridge per-asset daily caps.
- `[mandiantnomad2022]` — Nomad 2022 incident; canonical T10.002 worked example motivating per-block / runtime-invariant pause-on-anomaly.
- `[chainalysis2025rug]` — exit-class Technique aggregate; empirical scale across T5.001 / T5.002.
- `[owaspscstop10]` — multiple categories (Price Oracle Manipulation, Flash-Loan Attacks) where rate-limiting is a defence-in-depth layer.
- `[rektcurve2022]`, `[vyperpostmortem2023]` — Curve incidents 2022 / 2023; defence-in-depth motivation for rate-limiting as a backstop when other mitigations fail.
- `[ethfoundationdaohardfork2016]` — DAO 2016; historical motivation for protocol-level extraction-throughput bounds.
