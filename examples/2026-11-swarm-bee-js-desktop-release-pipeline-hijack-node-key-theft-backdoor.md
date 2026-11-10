# Swarm — attackers used the release bot's access to publish a trojanized bee-js to npm and a trojanized Swarm Desktop to the auto-updater, stealing node keys and installing remote access — Ethereum Swarm (bee-js, Swarm Desktop) / npm, GitHub, Ethereum — 2026-11-09

**Loss:** **No confirmed fund loss.** Swarm's notice says the malicious builds "stole the node key and installed remote access" and tells anyone who updated to "move your funds and stake now" ([`ethswarmx2026`]). The Hacker News reports no theft of funds at the time of writing and no count of infected machines; Socket estimated about 10 downloads of bee-js 13.3.0, including scanners and mirrors, and the Swarm Desktop 0.56.2 release had 65 downloads (researchers included) 8.5 hours after publication ([`thnswarm2026`]). SafeDep saw 17 downloads of the Windows auto-updater file at 06:58 UTC ([`safedepswarm2026`]). OAK records this as a **caught-early supply-chain compromise with a long tail**: stolen keystores and installed backdoors stay useful to the attacker until the key is rotated and the implants are removed, which updating the app does not do.

**OAK Techniques observed:** **OAK-T15.002** (Supply-Chain / Vendor-Pipeline Compromise, *primary*, corroborated by SafeDep, OX Security and The Hacker News. The attacker used the `bee-worker` release-bot account to push a commit, tag and GitHub release for bee-js 13.3.0. The project's own publish workflow then built it and put it on npm with valid provenance, and a build workflow with the Apple and Windows signing secrets produced Swarm Desktop 0.56.2. See [`techniques/T15.002-supply-chain-vendor-pipeline-compromise.md`](../techniques/T15.002-supply-chain-vendor-pipeline-compromise.md)). **OAK-T11.002** (Wallet-Software Distribution Compromise, the Swarm Desktop 0.56.2 build was offered through the built-in auto-updater to Windows x64 and Apple Silicon Macs and ran the loader on every start. See [`techniques/T11.002-wallet-software-distribution-compromise.md`](../techniques/T11.002-wallet-software-distribution-compromise.md)). **OAK-T15.004** (Operator Credential Compromise, *how the release access was obtained is not established*. The maintainers' note, as relayed by The Hacker News, blames theft of CI credentials and secrets, and OX Security suspects a compromised developer access key. See [`techniques/T15.004-operator-credential-compromise.md`](../techniques/T15.004-operator-credential-compromise.md)).

**Attribution:** **inferred-weak.** Pluto Security ties the payloads "with high confidence" to the group behind the 2025 SleepyDuck extension, and Socket says it is the same group, both as relayed by The Hacker News ([`thnswarm2026`]). The same on-chain C2 pointer contract pattern, ScreenConnect relay and fake Solidity-tooling file names were reported in Solidity-developer extensions on Open VSX in September 2026. OAK relays these attributions as theirs and has not checked them.

**Key teaching point:** **A release must need a second approval that the release bot's own credentials cannot give, and the signing secrets must be unreachable from any workflow that a plain release or dispatch can start.** Here the commit, tag and GitHub release were created within one second ([`safedepswarm2026`]), no branch protection applied because the code never touched a branch, and the npm publish started about 73 seconds later with no approval gate ([`thnswarm2026`]). The package carried valid provenance because the real workflow built it, so provenance proved only where it came from. Swarm has since required DevOps approval for signing jobs and restricted them to the main branch ([`thnswarm2026`]).

## Summary

`@ethersphere/bee-js` is the JavaScript client for Swarm's Bee node, and Swarm Desktop is the desktop app that runs a Bee node and stores its encrypted keystore with the password in plain text in `config.yaml`. On 2026-11-09 two malicious releases went out within 30 minutes of each other: bee-js 13.3.0 on npm, and Swarm Desktop 0.56.2 on GitHub and through its auto-updater. Both carried a small loader that fetched a payload from `api.frameworkmetrics[.]xyz`. The payload sent `config.yaml` and `data-dir/keys/swarm.key` to the attacker, which lets the attacker recover the node's private key and drain xDAI, xBZZ, chequebook funds and stake. It also installed a persistent remote-access tool: a Go shell called `evjawbreaker` on Linux and macOS, and a re-configured ConnectWise ScreenConnect client on Windows.

Swarm announced the compromise on X at 12:08 UTC and removed the builds. npm had already removed bee-js 13.3.0 at about 01:25 UTC. SafeDep, OX Security, Socket and The Hacker News published the technical analysis the same day. The way the attacker obtained release access is not established.

## Timeline (UTC)

Stages: **Preparation** of the C2 and the commits, **Release** through the pipeline, **Take** of node keys and implant installation, **Money** (none observed), **Response**. Times are from SafeDep ([`safedepswarm2026`]) and The Hacker News ([`thnswarm2026`]) unless marked as traced by OAK.

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-09 (undisclosed) | The `bee-worker` release account (or CI credentials and secrets, per the maintainers' note) is obtained by the attacker. How is not public. `frameworkmetrics[.]xyz` was registered about two days earlier (per OX Security) | **T15.004** |
| 2026-03-14 13:03:47 | The C2 pointer contract [`0xf8a900Db50b3331be6B768bA460BB59f3E40C344`](https://etherscan.io/address/0xf8a900Db50b3331be6B768bA460BB59f3E40C344) is created by [`0xFd3fc58bcbd8ccc77b6000201438eDfc636E7cA7`](https://etherscan.io/address/0xFd3fc58bcbd8ccc77b6000201438eDfc636E7cA7) in [`0x2ee8cd7492d8771630a3022401a08501e8ee40b7d64c16d569ec9e398cd46120`](https://etherscan.io/tx/0x2ee8cd7492d8771630a3022401a08501e8ee40b7d64c16d569ec9e398cd46120) (traced by OAK; the creator link is OAK's reading of the creation transaction, SafeDep gives the date only) | — |
| 2026-11-08 23:30:47 | The same EOA calls the contract in [`0x53131590acd75a9d2bd2ceb9d55d94e45174945c966fb76bf3a6e8439946ea15`](https://etherscan.io/tx/0x53131590acd75a9d2bd2ceb9d55d94e45174945c966fb76bf3a6e8439946ea15) (traced by OAK). SafeDep says the operator set the current hub to `193.57.9.155:4912` at 23:30 | — |
| 2026-11-08 23:59:54 | `bee-worker` pushes unsigned commit `de2f74e784b2eafa0d66fbb6d88b42ea11ee34cf` ("chore(upcoming): release 13.3.0") that belongs to no branch. It changes `prepare` to `postinstall` and adds a loader in `scripts/generate-version.cjs` | **T15.002** |
| 2026-11-09 00:06:01 | GitHub release `v13.3.0` is created. Commit, tag and release fall within the same second. The npm publish workflow starts (about 73 seconds later, per Socket via The Hacker News) with no approval step | **T15.002** |
| 2026-11-09 00:09 | `@ethersphere/bee-js@13.3.0` appears on npm with valid provenance. SafeDep's scanner flags it at 00:10 and returns a malicious verdict at 00:13 | **T15.002** |
| 2026-11-09 00:36 | `bee-worker` publishes Swarm Desktop v0.56.2 (commit `2de727046706062d38edfbbf8340f32d1eb2bdfb`, unsigned, no pull request) built by a manually started workflow that holds the signing certificates. The macOS build is notarized by Apple. The loader runs from `main()` on every app start | **T11.002** |
| ~2026-11-09 00:46 | The built-in updater can offer 0.56.2 to Windows x64 and Apple Silicon Macs | **T11.002** |
| 2026-11-09 (install window) | On install of bee-js 13.3.0, or on each start of Swarm Desktop 0.56.2, the loader requests `/v1/analytics` or `/v1/electron` with header `X-Ethersphere: 1` and runs the response with `new Function`. Stage 2 POSTs `config.yaml` and `swarm.key` to `/v1/swarm/report` and installs the implants (persistence below) | **T15.002**, **T11.002** |
| 2026-11-09 ~01:25 | npm removes 13.3.0; 13.2.0 is restored as `latest` | response |
| 2026-11-09 (after the theft) | Fund movement from stolen Swarm node wallets: **none reported**. Swarm tells affected users to move funds, chequebook and stake to a new key | undisclosed |
| 2026-11-09 12:08 | Swarm posts the security notice on X ([`ethswarmx2026`]) | response |
| 2026-11-09 (same day) | Swarm Desktop 0.56.2 is withdrawn (about 09:04 per The Hacker News) and 0.56.3, the 0.56.1 code re-signed with a new Developer ID certificate, is released. Signing jobs now need DevOps approval and run only from main | response |

Persistence and implants (SafeDep, The Hacker News): Linux `~/.solidity/linux_<arch>` and the user systemd unit `solidity-langsupport-runner.service`; macOS `~/.solidity/darwin_<arch>` and the LaunchAgent `com.solidity.langsupport.runner`; Windows `invoke.ps1` (UAC bypass by UACME method 39 for admins, repeated UAC prompts otherwise, Windows Defender exclusion) installing `app.msi`, a ScreenConnect 25.4.3 client with relay `185.232.84.169:8041`, hidden banners and no-consent sessions, as the service `ScreenConnect Client (5cbe79c9c25524df)`. The `evjawbreaker` shell has no hard-coded server and reads its hub address from the contract above through public RPC endpoints, so the operator can change it at any time.

Key addresses:

- C2 pointer contract (Ethereum) — [`0xf8a900Db50b3331be6B768bA460BB59f3E40C344`](https://etherscan.io/address/0xf8a900Db50b3331be6B768bA460BB59f3E40C344)
- Operator EOA that created and updated it (traced by OAK) — [`0xFd3fc58bcbd8ccc77b6000201438eDfc636E7cA7`](https://etherscan.io/address/0xFd3fc58bcbd8ccc77b6000201438eDfc636E7cA7)
- Payload host `api.frameworkmetrics[.]xyz`; ScreenConnect relay `185.232.84.169:8041`; `evjawbreaker` hub `193.57.9.155:4912` (both IPs hosted by Onidel, Netherlands, per SafeDep)
- Victim data: Swarm node keystores, not addresses; no victim wallet address has been published

## Fund flow

No funds are known to have moved. The only on-chain footprint is the operator's C2 pointer contract, shown below as zero-value calls. The edges carry no assets and exist to give defenders the contract and the operator EOA to watch.

```oak-flow
as_of: 2026-11-10T14:00Z
nodes:
  - {id: op, chain: ethereum, address: 0xFd3fc58bcbd8ccc77b6000201438eDfc636E7cA7, role: attacker-eoa, label: "Operator EOA (creates and updates the C2 pointer)"}
  - {id: c2, chain: ethereum, address: 0xf8a900Db50b3331be6B768bA460BB59f3E40C344, role: attack-contract, label: "C2 pointer contract (evjawbreaker hub address)"}
edges:
  - {from: op, to: c2, asset: ETH, amount: 0, tx: 0x2ee8cd7492d8771630a3022401a08501e8ee40b7d64c16d569ec9e398cd46120, time: 2026-03-14T13:03:47Z, verified: oak}
  - {from: op, to: c2, asset: ETH, amount: 0, tx: 0x53131590acd75a9d2bd2ceb9d55d94e45174945c966fb76bf3a6e8439946ea15, time: 2026-11-08T23:30:47Z, verified: oak}
```

## What defenders observed

- **Release gate (T15.002).** The release bot could create a tag and release that started the npm workflow without a human. Required: a protected environment on the publish and signing jobs, with a reviewer who is not the bot, and tag creation limited to protected branches. This would have stopped both builds at the first step (M40).
- **Signing secrets (T11.002).** The workflow that holds the Apple and Windows certificates could be started by hand with no approval. Swarm now gates it behind DevOps approval and the main branch. A clean 0.56.3 had to be re-signed with a new certificate.
- **Consumers (T15.002).** swarm-cli, bee-dashboard and Swarm Desktop's own source accepted version ranges that included 13.3.0. Pinning exact versions, a minimum package age, and install scripts disabled in CI would each have prevented the `postinstall` loader from running.
- **Local secrets (T11.002).** The keystore password sat in plain text next to the keystore, so one file read gave a usable key. Storing the password in the OS keychain would have made the exfiltrated pair useless on its own.
- **Response (M22).** Updating does not remove the implants. Rotate the node key from a clean machine, remove `~/.solidity/`, the systemd unit, the LaunchAgent and the ScreenConnect service, and ideally rebuild from a trusted image.
- **Detection.** `bee-desktop.log` records `Bee Desktop version: 0.56.2 (production)` at each start, before the loader runs. Hunt for `api.frameworkmetrics[.]xyz`, the header `X-Ethersphere: 1`, `new Function('require', 'console', 'process', body)` in a `postinstall` script, and calls to the C2 contract from public RPC endpoints.

## Root-cause evidence

- **Technique:** OAK-T15.002
- **Source:** <https://safedep.io/blog/ethersphere-bee-js-npm-compromise>; <https://www.ox.security/blog/ethersphere-hijacked-with-crypto-stealing-malware-via-github-npm/>; <https://thehackernews.com/2026/11/hackers-compromise-etherspheres-bee-js.html>; <https://x.com/ethswarm/status/2119764040008491491>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** Corroborated for the mechanism once release access was held (malicious release by the `bee-worker` account, built and published by the project's own workflows, loader plus key theft plus implants); the operator confirms the effect only (keys stolen, remote access installed). **Not established:** how the attacker obtained release access. The maintainers' incident note blames stolen CI credentials and secrets, and OX Security suspects a developer access key, so the entry vector is `reported`, not confirmed. Socket reportedly says two GitHub accounts were used, `bee-worker` and a long-time maintainer's account (via The Hacker News).
  SafeDep gives the commit, tag, release and workflow-run identifiers, the loader code and the three-stage payload. OAK checked the C2 contract on-chain: created 2026-03-14 and called by the same EOA at 2026-11-08 23:30:47 UTC, matching SafeDep's timeline. The Swarm Discord post with the full steps, linked from the X notice, was not readable by OAK. Counts of downloads differ by source and moment (about 10 for bee-js per Socket, 17 and 44 and 65 for Swarm Desktop at different hours).

## Public references

- `[ethswarmx2026]` — Ethereum Swarm (@ethswarm), security notice (2026-11-09): <https://x.com/ethswarm/status/2119764040008491491>
- `[safedepswarm2026]` — SafeDep, "Compromised bee-js and Swarm Desktop Steal Swarm Wallet Keys" (2026-11-09): <https://safedep.io/blog/ethersphere-bee-js-npm-compromise>
- `[oxswarm2026]` — OX Security, "Ethersphere Hijacked With Crypto Stealing Malware Via Github & npm" (2026-11-09): <https://www.ox.security/blog/ethersphere-hijacked-with-crypto-stealing-malware-via-github-npm/>
- `[thnswarm2026]` — The Hacker News, "Hackers Compromise Ethersphere's bee-js and Swarm Desktop to Deliver Wallet-Stealing Malware" (2026-11): <https://thehackernews.com/2026/11/hackers-compromise-etherspheres-bee-js.html>
