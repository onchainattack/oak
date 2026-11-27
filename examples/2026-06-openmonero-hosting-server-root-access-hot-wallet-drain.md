# OpenMonero — root access to the hosting server, platform funds drained — Monero — 2026-06-08

**Loss:** **~200 XMR (~\$63,000).** A [bitcointalk.org thread](https://bitcointalk.org/index.php?topic=5585445.0) opened on 2026-06-10 states that about 200 XMR was stolen and that the operator confirmed all funds were lost. The [kycnot.me service page](https://kycnot.me/service/openmonero?showPending=true) records about 200 XMR (~\$63,000), which the operator said was all platform funds. The operator's own post in the thread does not state an amount. On 2026-06-25 the operator said top vendors were refunded and that 90 XMR had been refunded ([bitcointalk](https://bitcointalk.org/index.php?topic=5585445.0)). The kycnot.me page says no affected user had publicly confirmed a refund and that it had not verified the claim.

**OAK Techniques observed:** **OAK-T15.003** (Operator-Endpoint Compromise, signing-host sub-shape; the closest existing fit and a loose one). The operator says an attacker had root on the server through the hosting provider's dashboard, not through the OpenMonero application ([bitcointalk](https://bitcointalk.org/index.php?topic=5585445.0)). The sources do not publish how the funds were moved out, so no extraction Technique is assigned. See [`techniques/T15.003-operator-endpoint-compromise.md`](../techniques/T15.003-operator-endpoint-compromise.md).

**Attribution:** **unattributed.** No source names an actor or publishes an attacker address.

**Key teaching point:** **Keep the hosting provider's console and the wallet host out of one trust domain, and segment the wallet from the rest of the stack.** The operator said it "was hosting everything on one server" and that frontend and backend now run on separate servers with different providers ([bitcointalk](https://bitcointalk.org/index.php?topic=5585445.0)). The operator's account is that one root login on a single host reached the funds. Whether the cause was the provider's dashboard (operator) or an unpatched kernel and privilege escalation (the thread's original poster) is disputed, so a defender should cover both: restrict and monitor provider console access (VNC, rescue consoles, API tokens) and patch the host kernel.

## Summary

**OpenMonero** is a peer-to-peer Monero (XMR) marketplace described by [Monero Observer](https://monero.observer/openmonero-hacked-reports-all-funds-stolen/) as a LocalMonero clone. It had already reported a hack on 2025-06-06 in which, per the operator's announcement relayed by Monero Observer, "All funds (50-200 xmr) have been stolen". Per [kycnot.me](https://kycnot.me/service/openmonero?showPending=true), a further application-layer exploit on 2026-05-21 cost about 40 XMR. On 2026-06-08 an attacker obtained root access to the platform's server and took about 200 XMR, per [bitcointalk](https://bitcointalk.org/index.php?topic=5585445.0) and [kycnot.me](https://kycnot.me/service/openmonero?showPending=true). The site was down for almost two weeks, per the operator. On 2026-06-25 the operator said the cause was a vulnerability in the hosting provider's dashboard that gave someone direct root access via VNC. kycnot.me notes that the operator's explanation of the cause has changed three times (relayed, not quoted), and the thread's original poster argued it was an unpatched kernel ([bitcointalk](https://bitcointalk.org/index.php?topic=5585445.0)).

## Timeline (UTC)

The stages are flaw, take, money and response. No source gives a time of day. Dates are as reported in the cited pages.

| When | What happened | OAK |
|---|---|---|
| Before 2026-06-08 (undisclosed) | Frontend, backend and wallet ran on one server at the hosting provider (alexhost). The operator later said it was "hosting everything on one server" ([bitcointalk](https://bitcointalk.org/index.php?topic=5585445.0)). The thread's original poster says the kernel was unpatched. | **T15.003** |
| 2026-06-08 | An attacker gains root access to the server. The operator says through a vulnerability in the hosting provider's dashboard and direct root access via VNC ([bitcointalk](https://bitcointalk.org/index.php?topic=5585445.0)); the original poster says local privilege escalation. | **T15.003** |
| 2026-06-08 | About 200 XMR, which the operator said was all platform funds, leaves the platform ([kycnot.me](https://kycnot.me/service/openmonero?showPending=true)). The extraction method is undisclosed. | none — extraction method not published |
| 2026-06-08 onward | Destination of the XMR: undisclosed. No addresses or transaction hashes are published on any opened page. | — |
| 2026-06-10 | The incident is posted on [bitcointalk](https://bitcointalk.org/index.php?topic=5585445.0) (opening post dated 2026-06-10); kycnot.me lists the incident start as 2026-06-10. | response |
| 2026-06-24 | After the breach the admin resets all user 2FA tokens and urges password and settlement-wallet changes ([kycnot.me](https://kycnot.me/service/openmonero?showPending=true)). | response |
| 2026-06-25 | Operator post: top vendors refunded, the rest in two to four months per kycnot.me; "I take responsibility for the old setup"; frontend and backend moved to separate servers with different providers ([bitcointalk](https://bitcointalk.org/index.php?topic=5585445.0), [kycnot.me](https://kycnot.me/service/openmonero?showPending=true)). | response |

Key addresses: none published.

## Root-cause evidence

- **Technique:** OAK-T15.003
- **Source:** <https://bitcointalk.org/index.php?topic=5585445.0>; <https://kycnot.me/service/openmonero?showPending=true>
- **Source type:** operator
- **Confidence:** disputed
- **Evidence:** The operator's post of 2026-06-25 says the cause was a vulnerability in the hosting provider's dashboard that allowed root access via VNC. The thread's original poster says local privilege escalation, and argued in the thread that the cause was an unpatched kernel. kycnot.me says the operator's explanation has changed three times. No hosting-provider statement or forensic report was found. How the XMR was moved after root access, the exact amount and the destination are unknown.

## Public references

- bitcointalk.org, "OpenMonero hacked again! 200 XMR stolen" (opening post 2026-06-10; operator reply 2026-06-25, edited 2026-06-28): <https://bitcointalk.org/index.php?topic=5585445.0>
- kycnot.me, OpenMonero service page, incident list (read in 2026-11): <https://kycnot.me/service/openmonero?showPending=true>
- Monero Observer, "OpenMonero hacked, reports 'all funds stolen'" (2025-06-08, the earlier incident): <https://monero.observer/openmonero-hacked-reports-all-funds-stolen/>
