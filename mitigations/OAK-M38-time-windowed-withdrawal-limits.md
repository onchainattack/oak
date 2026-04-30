# OAK-M38 — Time-Windowed Withdrawal Limits

**Class:** architecture
**Audience:** protocol, designer, custody-vendor
**Maps to Techniques:** OAK-T5.001, OAK-T5.002, OAK-T5.005, OAK-T9.001, OAK-T9.002, OAK-T9.004, OAK-T9.005, OAK-T10.001, OAK-T11.001, OAK-T11.002, OAK-T11.003

## Description

Time-windowed withdrawal limits are protocol-and-custody-architecture caps on cumulative-outflow over a rolling time window (per-user, per-pool, per-protocol, per-vault, per-bridge). The defensive principle is that even when an attacker successfully reaches the extraction step, the absolute loss is bounded by the time-window-cumulative-cap rather than by the attacker's ability to drain the entire pool in a single transaction or in a tight sequence.

Distinguish from OAK-M11 rate-limiting (which is per-block-cap and per-tx-cap): M38 is the **rolling-cumulative variant** that captures slow-extraction OAK-T5.002 patterns and operator-side authority-abuse OAK-T11.001 patterns that single-block-cap or per-tx-cap mitigations do not bound. The two classes compose; M11 bounds per-block extraction, M38 bounds rolling-window extraction, and a well-designed treasury or pool architecture deploys both.

Canonical implementations include Aave V3's per-asset and per-user borrow caps and supply caps; Compound's per-market borrow-and-supply caps; Cetus's emergency cap deployed as part of the post-incident recovery package after the May 2025 incident (`examples/2025-05-cetus.md`); custody-vendor withdrawal-velocity gating at Coinbase Custody / BitGo / Fireblocks; and bridge-side per-asset-per-day caps deployed at Wormhole, Stargate, and several other major bridges in the post-Ronin (`examples/2022-03-ronin-bridge.md`) and post-Wormhole (`examples/2022-02-wormhole.md`) period.

## How it applies

- **OAK-T5.001 (Hard LP Drain) / T5.002 (Slow LP Trickle).** Time-windowed pool-outflow caps directly bound the maximum extractable amount in either fast-or-slow extraction events; the slow-trickle class (T5.002) is specifically the case where M11 per-block-caps fail and M38 rolling-window-caps succeed.
- **OAK-T5.005 (Treasury-Management Exit).** Time-windowed treasury-outflow caps from a multisig-controlled treasury bound the maximum loss from operator-side authority abuse to a per-window-cap rather than the entire treasury balance; pairs with OAK-M22 rotate-on-disclosure and OAK-M05 authority-graph enumeration.
- **OAK-T9.001 / T9.002 / T9.004 / T9.005 (Smart-Contract Exploit class).** When an exploit reaches the extraction step, time-windowed protocol-outflow caps bound the absolute loss; defenders can use the window-cap to gain operational time for emergency-pause (OAK-M34) or whitehat-rescue (OAK-M35) actions before the attacker fully drains the protocol. UwU Lend (`examples/2024-06-uwu-lend.md`), Onyx (`examples/2024-09-onyx.md`), and Hundred Finance (`examples/2023-04-hundred-finance.md`) are cases where bounded per-window outflow would have substantially reduced the realised loss.
- **OAK-T10.001 (Bridge Validator/Signer Key Compromise).** Per-asset-per-day bridge-side caps bound the maximum loss when a validator-set compromise reaches the withdrawal step; Ronin Bridge ($625M) and Wormhole ($325M) are cases where per-asset-per-day caps would have meaningfully bounded the loss. Many bridges adopted such caps after these events.
- **OAK-T11.001 / T11.002 / T11.003 (Custody-side compromise).** Custody-vendor withdrawal-velocity gating bounds the maximum loss from custody-vendor compromise to a per-window-cap. Bybit February 2025 (`examples/2025-02-bybit.md`) is a $1.5B case where time-windowed caps at the custody-vendor layer would have meaningfully bounded the loss.

## Limitations

- **Cap-tuning trade-offs.** Caps too tight degrade legitimate-user experience; caps too loose fail to bound material-incident loss. Time-windowed caps require continuous tuning against legitimate-flow telemetry.
- **Caps interact with M34 emergency-pause as the composite mitigation.** A cap-bound exploit followed by an emergency-pause produces a much smaller loss than either mitigation alone; defenders should design cap-and-pause as a single workflow rather than as independent mechanisms.
- **Caps do not prevent the underlying vulnerability.** Time-windowed caps bound loss but do not address the underlying exploit; defenders must compose with OAK-M16 pre-deployment audit, OAK-M03 continuous bytecode-diff monitoring, and the appropriate detection-class mitigations.
- **Cross-chain caps require coordination across multiple deployments.** Per-bridge caps are per-deployment; an attacker who can extract via multiple uncoordinated bridges from a single source-chain protocol can sometimes circumvent any one bridge's cap. Coordinated multi-bridge caps and per-protocol-aggregate caps are the appropriate composite design.
- **Caps can be circumvented if access-control is itself compromised at sufficient privilege.** An attacker with administrative authority to update the cap (OAK-T9.004 / OAK-T11.002) can lift the cap before extraction; the cap-update authority must be subject to the same OAK-M22 rotate-on-disclosure and OAK-M05 authority-graph-enumeration discipline as the underlying signing-key authority.

## Reference implementations

- **Protocol-side caps.** Aave V3 (per-asset borrow / supply caps + isolation-mode caps), Compound V3 (per-market caps), Curve (per-pool caps via gauge weights), Cetus post-May-2025 emergency caps, Hyperliquid per-asset trading caps.
- **Custody-side caps.** Coinbase Custody and BitGo per-customer per-day withdrawal caps; Fireblocks transaction-policy framework supporting time-windowed caps; Bybit and Binance per-customer withdrawal limits.
- **Bridge-side caps.** Wormhole per-asset-per-day caps deployed post-Wormhole-incident; Stargate per-pool caps; LayerZero per-OApp throttle policies.

## Citations

- `[chainalysis2024lockbit]` — Chainalysis 2024 LockBit and ransomware-laundering tracking; relevant for the per-day-aggregate-flow-bounds context.
- `[chainalysis2024dprk]` — Chainalysis 2024 DPRK report; documents aggregate per-incident extraction figures that motivate cap-deployment at the sector level.
- `[ellipticronin2022]` — Elliptic Ronin Bridge 2022 writeup; canonical case where per-asset-per-day bridge caps would have bounded the loss.
- `[halbornwintermute2022]` — Halborn Wintermute writeup; relevant for the authority-abuse extraction context where time-windowed treasury caps would have bounded the loss.
- `[chainalysis2025rug]` — Chainalysis 2025 rug-pull report; relevant for the slow-extraction T5.002 cohort context.
