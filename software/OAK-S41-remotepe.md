# OAK-S41 — RemotePE

**Type:** malware (Windows fileless remote-access-trojan)
**Aliases:** RemotePE (canonical Fox-IT / NCC Group naming, September 2025); DPAPILoader / RemotePELoader (the two preceding loader stages in the three-stage chain, sometimes reported as part of the same family).
**Active:** yes — first discovered September 2025; active campaigns tracked through Q1–Q2 2026.
**First observed:** 2025-09 (Fox-IT / NCC Group discovery and public disclosure; the Iassvc.dll DPAPILoader stage has been observed in the wild since November 2023, suggesting the loader infrastructure predates the RemotePE final-stage payload).
**Used by Groups:** **OAK-G01 Lazarus Group** (DPRK Reconnaissance General Bureau — confirmed-grade institutional attribution via Fox-IT / NCC Group analysis; the family's tradecraft fingerprint — social-engineering-led initial access against crypto/fintech targets, DPAPI environmental keying, Hell's Gate + ETW patching for EDR evasion, memory-only final-stage execution — is consistent with the broader OAK-G01 intrusion architecture documented across TraderTraitor, AppleJeus, Manuscrypt, TigerRAT, and BeaverTail/InvisibleFerret).
**Host platforms:** Windows (the only platform observed in public reporting; Fox-IT analysis describes a Windows-only implementation; DPAPI environmental keying is a Windows-native mechanism; no macOS or Linux variants documented as of v0.1).
**Observed Techniques:** OAK-T15.001 (Social Engineering of Operator Personnel — Telegram-based fake-trading-firm personas + fake Calendly/Picktime scheduling lures are the documented initial-access vector); OAK-T15.003 (Operator-Endpoint Compromise — the RemotePE RAT is the persistent-access implant establishing the operator-controlled foothold on the compromised endpoint); OAK-T11.001 (Third-Party Signing/Custody Vendor Compromise — the downstream on-chain extraction surface for the fintech/crypto-firm targeting profile documented in Fox-IT reporting, consistent with the broader OAK-G01 T11.001 pattern).

## Description

RemotePE is a fully fileless (memory-resident) Windows remote-access-trojan attributed to the DPRK-state-sponsored Lazarus Group (OAK-G01), first publicly documented by Fox-IT, an NCC Group affiliate, in September 2025. The family is purpose-built for low-forensic-visibility persistent access against banks, cryptocurrency exchanges, and fintech companies. The canonical reference is the Fox-IT / NCC Group technical analysis published in September 2025 (`[foxitremotepe2025]`), complemented by TRM Labs reporting on the broader DPRK crypto-theft aggregate for the 2026 campaign window (`[trmlabsdprk2026]`).

The malware operates through a tightly coordinated three-stage chain, each stage designed to minimise disk operations and evade endpoint-detection-and-response (EDR) tooling:

**Stage 1 — DPAPILoader (Iassvc.dll).** A dynamic-link library deployed as a Windows service or via sideloading. The loader uses the Windows Data Protection API (DPAPI) to decrypt a payload stored on disk — this is *environmental keying*: the payload can only be decrypted on the specific host where it was encrypted, making offline analysis and sandbox detonation ineffective. The Iassvc.dll filename has been observed in the wild since November 2023.

**Stage 2 — RemotePELoader.** The DPAPI-decrypted payload. RemotePELoader establishes an HTTP connection to the operator-controlled C2 server (canonically observed at `aes-secure[.]net`), performs an initial check-in with `at_check=True`, receives a session identifier (`ai_session`), and polls for the final-stage payload. The loader employs **Hell's Gate** for indirect syscall invocation (bypassing userland API hooks) and **ETW patching** (disabling Event Tracing for Windows to suppress telemetry from the loader's own execution). Delivery of the final-stage RemotePE payload is *actor-in-the-loop* — the operator manually approves the escalation, consistent with the broader Lazarus "human-in-the-loop" operational pattern.

**Stage 3 — RemotePE RAT.** The final-stage payload is decrypted and executed entirely in memory. It never touches the filesystem. Once active, RemotePE reads its embedded C2 configuration, beacons to the operator-controlled server, and enters a command-and-control loop supporting operator-driven file-system enumeration, process enumeration and control, file upload/download, and live-shell capability. The memory-only execution model means the payload leaves no forensic trace on disk — traditional dead-box forensics and signature-based antivirus are ineffective against it.

The initial-access vector is social engineering via Telegram: operators pose as employees of legitimate trading firms, using fake copies of Calendly and Picktime scheduling tools to arrange meetings with targets. Once a meeting is approved, the chain of events proceeds until the first-stage DPAPILoader is delivered. This "human-in-the-loop" method — where the operator evaluates the target's responsiveness before committing malware — is a hallmark of Lazarus operational discipline and distinguishes RemotePE campaigns from automated phishing.

In at least one documented incident, a decentralised finance (DeFi) firm had its infrastructure compromised by three different RATs — RemotePE, PondRAT, and ThemeForestRAT — that were sequentially deployed and replaced one another, demonstrating Lazarus's operational practice of maintaining redundant access paths into high-value targets.

## Infection chain (sequence diagram)

```sequenceDiagram
    participant D as DPAPILoader
    participant RPL as RemotePELoader
    participant RP as RemotePE
    participant C2 as C2 server

    Note over D: Windows service or sideloaded
    Note over RPL: DPAPI-encrypted on disk
    Note over RP: memory only

    D->>RPL: decrypt and execute in memory
    Note over RPL: HellsGate + ETW patch
    Note over RPL: read C2 config

    RPL->>C2: check-in (at_check=True)
    C2-->>RPL: session ID (ai_session)

    RPL->>C2: poll for payload
    C2-->>RPL: deliver RemotePE (actor-in-loop)

    RPL->>RP: decrypt and execute in memory
    Note over RP: read C2 config

    RP->>C2: beacon to C2
    C2-->>RP: commands
    RP->>C2: command output
```

## Observed examples

- **DeFi firm triple-RAT compromise (2025–2026).** Fox-IT / NCC Group reporting documents a DeFi firm whose infrastructure was compromised by RemotePE, PondRAT, and ThemeForestRAT in sequence — the three RATs replaced one another over time, demonstrating Lazarus's redundant-access operational pattern for high-value targets. Attribution: inferred-strong (DPRK-nexus, consistent with OAK-G01 tradecraft fingerprint).
- **Broader fintech/crypto targeting campaign (September 2025–ongoing).** The Fox-IT analysis describes RemotePE as deployed against banks, crypto exchanges, and fintech companies through the Telegram-social-engineering + fake-Calendly/Picktime initial-access vector. Specific victim names are not public as of v0.1; the targeting profile is consistent with the OAK-G01 financial-funding cluster.
- **TRM Labs 2026 aggregate.** TRM Labs reports that Lazarus Group stole approximately $577M in cryptocurrency in the first four months of 2026, accounting for 76% of all crypto thefts globally, despite only two major hacking incidents (`[trmlabsdprk2026]`). RemotePE is one of the documented tooling families in the 2025–2026 campaign window contributing to this aggregate; the precise per-tool attribution fraction is not public.
- **2026 OAK on-chain example surface.** No individual named-incident OAK `examples/` entry exists for a RemotePE-specific compromise as of v0.1. The OAK angle is the OAK-T15.001 → T15.003 entry-vector pairing feeding OAK-T11.001 / T11.003 downstream on-chain extraction — the same structural pattern documented across the broader OAK-G01 incident list (Bybit, WazirX, DMM Bitcoin, Radiant Capital).

## Detection / attribution signals

Defenders should treat RemotePE detection as a host-layer + network-layer joint problem, with a particular emphasis on *in-memory forensics* given the family's diskless design:

- **Host-layer in-memory forensics** — the RemotePE final-stage payload never touches the filesystem; detection requires live-memory analysis (process memory dumps, injected-code detection in legitimate process trees, anomalous memory-region permissions). Traditional dead-box forensics and signature-based antivirus are ineffective.
- **DPAPI environmental-keying artifacts** — the Stage 1 DPAPILoader uses Windows DPAPI to encrypt the Stage 2 payload on disk; the encrypted blob is host-specific and cannot be decrypted offline. Defenders should monitor for anomalous DPAPI decryption calls from non-standard service binaries, particularly DLLs loaded via service registration or sideloading under names that mimic legitimate Windows system components (e.g., Iassvc.dll).
- **Hell's Gate indirect-syscall detection** — RemotePELoader uses Hell's Gate to resolve syscall numbers dynamically from ntdll.dll memory (bypassing userland API hooks) and ETW patching to suppress Event Tracing for Windows telemetry. Defenders should monitor for: (a) indirect syscall invocation patterns (syscall instructions originating outside ntdll.dll memory), (b) ETW provider registration tampering, and (c) anomalous process behavior from processes that have had their ETW tracing disabled.
- **Network-layer telemetry** — the C2 check-in pattern is distinctive: an HTTP request with `at_check=True` followed by session establishment (`ai_session` return) and periodic polling for the final-stage payload. The canonical C2 domain is `aes-secure[.]net`. Defenders should consume current IOCs from Fox-IT / NCC Group published indicator lists and from live CTI-vendor feeds.
- **Social-engineering pre-delivery signals** — unsolicited Telegram outreach from personas claiming to represent trading firms, accompanied by links to fake Calendly or Picktime scheduling pages; this is the highest-yield top-of-funnel signal and should be incorporated into security-awareness training for engineering and operations staff at crypto exchanges, custody vendors, and fintech firms.
- **Multi-RAT redundancy pattern** — Fox-IT reporting documents Lazarus deploying RemotePE alongside PondRAT and ThemeForestRAT on the same compromised infrastructure, with the RATs replacing one another over time. Detection of any one of these families on an endpoint should trigger a comprehensive hunt for the others; a single-RAT finding likely underestimates the scope of compromise.
- **CTI vendor coverage** — Fox-IT / NCC Group (canonical discovery and technical analysis; `[foxitremotepe2025]`), TRM Labs (DPRK crypto-theft aggregate and campaign-level tracking; `[trmlabsdprk2026]`).

Note: omit specific file hashes and C2 IP addresses from this entry. Defenders should consume current IOCs from Fox-IT / NCC Group published indicator lists and from live Western-side CTI-vendor feeds.

## Citations

- `[foxitremotepe2025]` — Fox-IT / NCC Group technical analysis of RemotePE, September 2025; canonical discovery-and-analysis reference for the three-stage chain (DPAPILoader → RemotePELoader → RemotePE), the Hell's Gate + ETW patching evasion stack, the DPAPI environmental-keying mechanism, and the Telegram-social-engineering initial-access vector. *(NEW citation — see summary.)*
- `[trmlabsdprk2026]` — TRM Labs, "North Korea's Crypto Theft Dominance," 2026; reports $577M stolen by DPRK actors in January–April 2026 (76% of global crypto theft), $6B+ all-time since 2017. *(NEW citation — see summary.)*
- `[cisaaa22108a]` — CISA / FBI / Treasury joint advisory AA22-108A on TraderTraitor (broader OAK-G01 operator-cluster context). (Already in citations.bib per OAK-S08.)
- `[chainalysis2024dprk]` — Chainalysis DPRK crypto-theft aggregate reporting (broader OAK-G01 financial scale context). (Already in citations.bib per OAK-G01.)
- `[chainalysis2024laundering]` — Chainalysis 2024 laundering report (post-extraction T7.003 / T7.006 context for OAK-G01 proceeds). (Already in citations.bib per OAK-G01.)

## Discussion

**On fileless tradecraft as an evasion innovation.** RemotePE's defining architectural feature — a three-stage chain where only the first stage writes to disk and the final-stage RAT is purely memory-resident — represents a meaningful escalation in Lazarus's EDR-evasion capabilities. Prior Lazarus RAT families (Manuscrypt OAK-S10, TigerRAT OAK-S31, BeaverTail OAK-S29) all write components to disk at some stage of their execution. RemotePE's diskless final stage raises the defender's burden: detection requires live-memory forensics, network-layer telemetry, or pre-execution social-engineering signals. The tradecraft evolution is consistent with Lazarus's documented pattern of continuous capability improvement across successive campaign waves.

**On DPAPI environmental keying.** The use of Windows DPAPI to encrypt the Stage 2 payload is operationally significant: it binds the encrypted payload to the specific host (and user profile) where it was encrypted, making offline decryption and sandbox detonation impossible. This is a form of *environmental keying* that has been observed in other APT tooling but is a first for the Lazarus crypto-targeting cluster at this level of integration. The mechanism also means that incident responders cannot trivially decrypt the Stage 2 payload from a disk image — they need access to the live system and the specific user context under which the DPAPI encryption was performed.

**On the human-in-the-loop operational model.** All three stages of the RemotePE chain involve operator-side decision gates: the initial social-engineering phase requires the operator to build rapport and gain meeting approval; the RemotePELoader-to-RemotePE escalation requires the operator to approve final-stage delivery (`actor-in-loop` in the sequence diagram); and the post-compromise RAT operation is interactive (commands issued by the operator, not an automated script). This operational discipline — evaluating each target before committing the full toolchain — is a hallmark of Lazarus's high-value-target focus and distinguishes RemotePE campaigns from automated commodity-malware operations.

**On the triple-RAT redundancy pattern.** The Fox-IT documentation of a single DeFi firm's infrastructure being compromised by RemotePE, PondRAT, and ThemeForestRAT in sequence — with the RATs replacing one another — suggests an operational doctrine of *redundant access paths*. If one RAT is detected and remediated, the operator retains access through the others. Defenders discovering any single Lazarus RAT on an endpoint should assume the presence of additional, potentially different, implant families.

**On ecosystem position.** RemotePE is the *persistent-access* node in the Lazarus financial-funding chain. The family's operational role is comparable to TigerRAT (OAK-S31) in the Andariel sub-cluster and BeaverTail/InvisibleFerret (OAK-S29/S30) in the broader OAK-G01 cluster: establish a persistent operator-controlled foothold on a compromised endpoint, enabling downstream movement into signing infrastructure and eventual on-chain extraction via OAK-T11.001 / T11.003. The RemotePE innovation is the *fileless execution model*, which raises the defender's detection burden at the host layer without changing the structural position of the RAT in the broader intrusion chain.

**On the broader DPRK crypto-theft trajectory.** TRM Labs data places DPRK-attributed crypto theft at $577M for January–April 2026 (76% of all crypto thefts globally), up from 64% in 2025 and single-digit percentages in prior years. The all-time DPRK total exceeds $6B since 2017. RemotePE is a tooling-level manifestation of this macro trend: as the dollar stakes rise, Lazarus invests in more sophisticated evasion tradecraft to protect its access paths into high-value targets. The RemotePE fileless architecture is best understood as a response to the improving EDR posture of the crypto and fintech sectors — as defenders get better at detecting disk-based implants, the attackers move to memory-only execution.
