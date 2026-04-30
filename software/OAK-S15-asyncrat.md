# OAK-S15 — AsyncRAT

**Type:** malware (open-source remote access trojan)
**Aliases:** Async RAT, AsyncRAT C#
**Active:** yes (2019-present; continuously forked and rebuilt)
**First observed:** 2019-01 (initial public release of the open-source C# project on GitHub)
**Used by Groups:** ecosystem-wide / not Group-specific (open-source codebase; widely forked into private and rebranded builds)
**Host platforms:** Windows (primary; .NET Framework / .NET Core targets)
**Observed Techniques:** OAK-T11.002, OAK-T4.004, OAK-T4.005

## Description

AsyncRAT is an open-source Windows remote-access trojan written in C#, originally published as a GitHub project in early 2019. As a publicly-available, multi-feature RAT codebase, it has been continuously forked, rebranded, and modified by a wide range of operators — from low-skill commodity criminals to mid-tier targeted-operation actors — and has spawned a recognised family tree of derivatives including DcRat, VenomRAT, QuasarRAT-influenced builds, and numerous private rebrands.

AsyncRAT itself is not a crypto-stealer in the narrow sense; it is a multipurpose remote-access trojan providing keylogging, screen capture, file exfiltration, plugin loading, persistence, and operator-driven command execution. Its OAK relevance is as an **ingress / staging-platform for credential-theft and crypto-wallet siphoning chains**: operators deploy AsyncRAT (or a fork) to obtain initial foothold and persistence, then load stealer modules, browser-data harvesters, or wallet-targeting plugins to extract crypto-relevant material. The endpoint behaviour places it on the same OAK-T4.004 / T4.005 / T11.002 surface as the dedicated commodity stealers, but with broader operator latitude (operator-controlled rather than autonomous-stealer behaviour).

Because the source is public and forks proliferate, AsyncRAT is not a single attributable artefact — vendor reports use "AsyncRAT-family" or "AsyncRAT-derived" framing, and per-incident attribution is generally to the deploying operator rather than to the AsyncRAT project itself.

## Observed examples

- Long-running presence in commodity-malware distribution chains since 2019; AsyncRAT and DcRat builds are repeatedly catalogued as among the most-distributed RAT families in annual commodity-malware retrospectives.
- Use as a staging platform in multi-stage crypto-theft chains: AsyncRAT initial foothold → secondary stealer module (sometimes RedLine / Lumma / sibling) → wallet-data exfiltration → drainer cashout. The per-stage attribution typically distinguishes AsyncRAT from the stealer payload.
- Multiple targeted operations against crypto-adjacent victims (exchange employees, wallet developers, DeFi project contributors) have used AsyncRAT-family builds as the persistence layer; specific incident attributions vary by vendor and are not consolidated under a single OAK Group.
- Distribution via phishing emails with malicious documents, cracked-software bundles, fake game / cheat installers, and supply-chain lures into developer ecosystems (npm, PyPI, NuGet).

## Detection / attribution signals

- Endpoint: characteristic .NET-assembly artefacts, AsyncRAT-family configuration-block patterns (panel host, port, version string, mutex naming conventions), and persistence via scheduled tasks or registry Run keys are well-catalogued by EDR vendors.
- Network: AsyncRAT default C2 protocol patterns are public (the protocol is in the open-source repo); private forks frequently retain recognisable framing even after re-encryption. Distinctive port choices (often 4-digit ranges) and TLS-with-self-signed certificate patterns are common in commodity deployments.
- YARA / signature: extensive public YARA coverage exists for AsyncRAT-family builds, including for common DcRat / VenomRAT forks. Matches typically require operator-side configuration overlap rather than identifying AsyncRAT-author identity.
- Operator inference: the choice of secondary modules loaded after AsyncRAT establishes foothold (commodity stealer vs. custom wallet harvester vs. lateral-movement tooling) is more diagnostic of operator intent and capability tier than the AsyncRAT presence itself.

## Citations

- `[asyncratorigingithub2019]` — original AsyncRAT open-source repository (historical reference). *(NEW citation — see summary.)*
- `[asyncratmandiant2023]` — Mandiant / vendor reporting on AsyncRAT-family deployment in targeted operations. *(NEW citation — see summary.)*

## Discussion

AsyncRAT is one of the cleanest cases in the OAK Software axis of an artefact whose **open-source nature breaks the usual Software-to-Group mapping**. Unlike a closed commodity-MaaS family (RedLine, Lumma) where the buyer-affiliate boundary is at least conceptually defined, AsyncRAT is a freely-forkable codebase — any actor can take it, modify it, rebrand it, and deploy it without any relationship to the original author or to any other deployer. OAK records it as ecosystem-wide and refuses Group attribution at the AsyncRAT level itself.

Lineage: AsyncRAT is downstream of QuasarRAT (an earlier open-source C# RAT) in design influence; its own forks include DcRat, VenomRAT, and a long tail of private rebrands. The family tree continues to expand and OAK does not attempt to enumerate forks exhaustively in the Software axis — the operationally useful framing is "AsyncRAT-family" with per-incident operator attribution where forensics support it.

For OAK's purposes, the load-bearing point is that **AsyncRAT presence is an ingress-and-control signal, not a crypto-theft attribution**. The crypto-theft attribution belongs to whichever stealer module, drainer, or operator action follows AsyncRAT foothold — and that is where defender effort is best directed once AsyncRAT-family signatures are detected.
