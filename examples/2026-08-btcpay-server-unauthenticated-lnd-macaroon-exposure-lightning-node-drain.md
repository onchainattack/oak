# BTCPay Server — an unauthenticated remote flaw exposed LND macaroon credentials, and merchant Lightning nodes were drained — BTCPay Server (self-hosted payment processor) / Bitcoin Lightning (LND) — 2026-08-07

**Loss:** **undisclosed.** BTCPay says "funds were stolen" from "some users" and gives no total or per-user figure (BTCPay advisory and post-incident post). CoinDesk: BTCPay "has not disclosed how many users were affected or how much bitcoin was taken". Foundation and Citadel21 were named as victims in the press; neither amount is published in the sources read. A recovery bounty of 10% of recovered funds, capped at 3 BTC for full recovery, was announced by BTCPay.

**OAK Techniques observed:** **OAK-T15.004** (Operator-Side Credential Compromise — *primary, closest fit, not an exact one*). The stolen item is an operator credential: the LND admin macaroon, which authorises spending from the node. It was taken from the operator's own server by an unauthenticated remote request, not from a registrar, cloud or SSO account, so the fit with T15.004's usual surfaces is partial. The flaw that exposed the files is **undisclosed** by BTCPay; the Technique is chosen for the control that breaks the chain (credentials that are rotated, not reachable from the internet, and not valid for fund movement by themselves). See [`techniques/T15.004-operator-credential-compromise.md`](../techniques/T15.004-operator-credential-compromise.md). **OAK-T11.012** (Server-Side Raw Private-Key Storage — *secondary, for the 2026-11-01 follow-on only*: BTCPay says Bitcoin and Litecoin were taken from hot wallets, "which hold spending keys on the server"). See [`techniques/T11.012-server-side-raw-private-key-storage.md`](../techniques/T11.012-server-side-raw-private-key-storage.md).

**Attribution:** **unattributed.** No source names an actor. Bitcoin Red Team members reported the flaw; they are the reporters, not the attackers.

**Key teaching point:** **A credential file that can move funds must not be reachable without authentication, and a patch does not revoke what was already copied.** BTCPay's own post says "updating after the fact is not enough" and to treat the machine as compromised. A merchant who patches but keeps the old macaroons, the old host and the old seed is still exposed.

## Summary

On 2026-08-07 BTCPay Server (a free, open-source, self-hosted Bitcoin payment processor) published a security advisory: a critical vulnerability was being actively exploited, present in every version before 2.4.2. An unauthenticated remote attacker could obtain LND `.macaroon` credential files, which let the holder take control of an LND node and move its funds. Press reports that Foundation (hardware-wallet maker) and Citadel21 had Lightning nodes drained, with channels closed and funds swept. BTCPay narrowed the scope after review: its on-chain wallets, including hot wallets generated in BTCPay, were not affected by the LND credential flaw, but funds in LND's own on-chain wallet were at risk.

BTCPay published its post-incident post on 2026-08-10 and updated it on 2026-11-02. On 2026-11-01 it reported a second wave: hot wallets on BTCPay Servers running 2.4.1 or older were swept, and it said the attackers "used a different method to exploit the vulnerability fixed in 2.4.2". That wave is recorded below as a follow-on, with the limits of what BTCPay has published.

## Timeline (UTC)

Stages: **Flaw** (unauthenticated credential exposure in all versions before 2.4.2), **Take** (macaroons used against LND nodes, channels closed, funds swept), **Money** (undisclosed), **Response** (2.4.2, guidance, bounty, hardening), then the **2026-11-01 follow-on** against hot wallets. Times are as published; exact times of the August drains are not.

| When | What happened | OAK |
|---|---|---|
| Before 2026-08-07 (undisclosed; BTCPay says "every version before 2.4.2") | A flaw in BTCPay Server lets an unauthenticated remote attacker obtain LND `.macaroon` files. The component, endpoint and root bug are not published ("We are not publishing technical details yet because operators still need time to update"). | **T15.004** |
| Before 2026-08-07 (undisclosed) | Bitcoin Red Team members report the flaw to BTCPay; BTCPay credits Craig Raw for responsible disclosure and Team Red (OpenSats) for helping analyze the exploit. BTCPay says attackers were already exploiting it when the public warning went out (CoinDesk). | — |
| Late 2026-08-07, "overnight" (CoinDesk; exact times undisclosed) | Attackers use the credentials against LND nodes. Foundation CEO Zach Herbert says its BTCPay Lightning node was drained overnight, with channels closed and funds swept; its on-chain hot wallet was untouched. Citadel21 says its node was swept but held little. The Defiant reports some drains happened before BTCPay's public alert. | **T15.004** |
| 2026-08-07 | BTCPay publishes "Security Advisory: Update BTCPay Server to 2.4.2 Immediately" and releases v2.4.2 ("critical vulnerability that is being actively exploited"). Guidance: update to 2.4.2 and LND 0.21.1, or take the server offline; replace macaroons; review LND activity for payments you did not make, unexpected channel closures and unfamiliar peers. | response |
| Undisclosed | Where the stolen Lightning funds went (on-chain sweeps, destinations, laundering) is not published in any source read. | — |
| 2026-08-10 | BTCPay posts "BTCPay Server Security Incident: Our Response and Next Steps": the flaw "allowed an attacker to obtain LND admin macaroon credentials from affected instances"; "Updating to BTCPay Server 2.4.2 now also updates LND and regenerates its admin macaroon." The BTCPay Server Foundation will donate 0.21 BTC each to Craig Raw and the Bitcoin Red Team fund (OpenSats); a 10% recovery bounty (cap 3 BTC) is announced. | response |
| 2026-09-08, 2026-10-05 | v2.4.4 and v2.4.5 harden the stack: unique random LND wallet passwords for new instances, unauthenticated LND setup and unlock routes blocked at the reverse proxy, and LND and Core Lightning APIs no longer exposed publicly by default. | response |
| 2026-11-01 13:46 | A hot-wallet drain occurs on a BTCPay Server (first exploitation date "has not been established"). BTCPay says Bitcoin and Litecoin were taken from hot wallets holding spending keys on the server, via "a different method to exploit the vulnerability fixed in 2.4.2". | **T11.012** |
| 2026-11-01 20:56 to 22:25 | First theft report received by email (20:56). BTCPay asks hosting providers such as LunaNode to take instances offline, and at 22:25 posts on X that hot wallets are being swept and operators should shut down (`./btcpay-down.sh`). | response |
| 2026-11-02 | BTCPay says the attack vector targeted versions 2.4.1 (2026-07-23) or older, and that it has no credible reports of drains on 2.4.7. Its advice: rebuild on a fresh VM, sweep funds to a new seed, rotate all credentials; "updating after the fact is not enough". | response |

Key addresses (reported by BTCPay as destinations of the 2026-11-01 wave; BTCPay warns balances "should not be treated as a confirmed total of losses" because some activity predates the thefts):

- Bitcoin destination — [`bc1p0f7wmcnesrapznymf9ljdn04pudgmh96sqtrm9vmgqxdh666fh8qvn63r7`](https://mempool.space/address/bc1p0f7wmcnesrapznymf9ljdn04pudgmh96sqtrm9vmgqxdh666fh8qvn63r7). Traced by OAK on 2026-11-03: balance 0.03882761 BTC, 778 transactions, with small inbound transfers still arriving that day (for example [`b5c15f5c16d0742ef6181ae4a4c6b5b3204de422f9c6bd5088fc955c24759985`](https://mempool.space/tx/b5c15f5c16d0742ef6181ae4a4c6b5b3204de422f9c6bd5088fc955c24759985), 0.000809 BTC). OAK has not matched any transfer to a specific victim.
- Litecoin destination — [`ltc1qp49tmfdueyaqrmgrx0uyx4uegyygt8yt02whee`](https://live.blockcypher.com/ltc/address/ltc1qp49tmfdueyaqrmgrx0uyx4uegyygt8yt02whee/) (not checked by OAK; `tools/explorer.py` has no Litecoin support).

No addresses or transaction hashes for the August Lightning drains are published in the sources read.

## What is not known

- The vulnerable component, endpoint and root bug behind the 2.4.2 fix. BTCPay says details will be published later; as of 2026-11-03 the blog posts read link to an advisory but no technical write-up was found. No CVE is mentioned and GitHub's security-advisories page for the repository shows "There aren't any published security advisories."
- Whether the v2.4.2 changelog entry for a TOTP two-factor bypass via Greenfield Basic authentication (PR #7491) is related. The Defiant reports that "the flaw under attack is not the one disclosed in its changelog"; BTCPay's release notes credit the Red Team for the critical fix.
- Whether the LND password-change route that v2.4.4 says "bots were targeting" while the wallet is locked is the August vector. BTCPay does not say so.
- How the 2026-11-01 wave obtained the hot-wallet seeds, and what "a different method" means. BTCPay has not described it.
- Number of affected servers and total losses, in both waves; where the Lightning funds went; who the attackers are.

## Root-cause evidence

- **Technique:** OAK-T15.004 (closest fit; the root bug is undisclosed)
- **Source:** <https://blog.btcpayserver.org/security-advisory-btcpay-server-2-4-2/>; <https://blog.btcpayserver.org/btcpay-server-security-incident-response-and-next-steps/>; <https://blog.btcpayserver.org/btcpay-server-security-incident-2-4-1-and-earlier/>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** Confirmed for the effect (an unauthenticated remote attacker could obtain LND macaroon credentials, in versions before 2.4.2, and funds were stolen); the underlying software bug is **undisclosed**. BTCPay's advisory states that "an unauthenticated remote attacker" could obtain `.macaroon` files, that attacks it reviewed targeted `.macaroon` files, and that "funds were stolen". Its 2026-08-10 post states the flaw let an attacker "obtain LND admin macaroon credentials from affected instances". Press (CoinDesk, Decrypt, Unchained) repeats this and adds the victim reports. Not established: the code-level flaw, the full set of affected servers, the loss total, and the link between the August flaw and the November hot-wallet wave.

## For a merchant running BTCPay Server with LND

1. **Version.** Log in and read the footer. Before 2.4.2 means exposed; 2.4.1 or earlier was also the affected range in the November wave. Update, and confirm LND reports 0.21.1 or later.
2. **Macaroons.** Updating to 2.4.2 regenerates the admin macaroon. If you also expose LND through your own reverse proxy, Tor service or forwarded port, rotate those credentials separately; BTCPay says updating does not close those paths.
3. **LND event history.** Look in the LND logs and node UI for channel-close events you did not initiate, outgoing payments you did not make, unfamiliar peers and balance differences against your records. Report with timestamps and txids to `security@btcpayserver.org`.
4. **Do not stop at the patch.** If you ran an old version while internet-reachable, or lost funds, BTCPay says to treat the whole machine as compromised: new VM, new seed for hot wallets, credentials (hosting, SSH, application, API, Lightning) rotated from a clean device.
5. **Exposure.** Keep LND and Core Lightning APIs off the public internet (the default since 2.4.2/2.4.5) and keep spending keys for large balances off the server.

## Public references

- `[btcpayAdvisory2026]` — BTCPay Server Blog, "Security Advisory: BTCPay Server 2.4.2" (2026-08-07, last updated 2026-11-02): <https://blog.btcpayserver.org/security-advisory-btcpay-server-2-4-2/>
- `[btcpayResponse2026]` — BTCPay Server Blog, "BTCPay Server Security Incident: Our Response and Next Steps" (2026-08-10, updated 2026-11-02): <https://blog.btcpayserver.org/btcpay-server-security-incident-response-and-next-steps/>
- `[btcpayNov2026]` — BTCPay Server Blog, "Security Incident Affecting BTCPay Server 2.4.1 and Earlier" (2026-11-02): <https://blog.btcpayserver.org/btcpay-server-security-incident-2-4-1-and-earlier/>
- `[btcpay242Release]` — GitHub, BTCPay Server v2.4.2 release notes (2026-08-07): <https://github.com/btcpayserver/btcpayserver/releases/tag/v2.4.2>
- `[btcpay244Blog]` — BTCPay Server Blog, "BTCPay Server 2.4.4" (2026-09-08): <https://blog.btcpayserver.org/btcpay-server-2-4-4/>
- `[btcpay245Blog]` — BTCPay Server Blog, "BTCPay Server 2.4.5" (2026-10-05): <https://blog.btcpayserver.org/btcpay-server-2-4-5/>
- `[btcpayX20261101]` — BTCPay Server on X, hot-wallet sweep warning (2026-11-01 22:25 UTC): <https://x.com/BtcpayServer/status/2117020340815819262>
- `[btcpayX20261102]` — BTCPay Server on X, attack vector 2.4.1 or older (2026-11-02 04:07 UTC): <https://x.com/BtcpayServer/status/2117106238123123008>
- `[coindesk2026]` — CoinDesk, "Another bitcoin infrastructure exploit hits, this time draining merchant Lightning nodes" (2026-08-08): <https://coindesk.com/tech/2026/08/08/another-bitcoin-infrastructure-exploit-hits-this-time-draining-merchant-lightning-nodes>
- `[decrypt2026]` — Decrypt (2026-08-07): <https://decrypt.co/375159>
- `[defiant2026]` — The Defiant, "BTCPay Server tells operators to update or shut down over actively exploited flaw": <https://thedefiant.io/news/hacks/btcpay-server-tells-operators-to-update-or-shut-down-over-actively-exploited-flaw>
- `[unchained2026]` — Unchained (2026-08-10): <https://unchainedcrypto.com/bitcoin-lightning-nodes-drained-as-attackers-exploit-btcpay-vulnerability/>
- `[onekey2026]` — OneKey blog (2026-08-08): <https://onekey.so/blog/ecosystem/btcpay-server-critical-vulnerability-under-active-attack-upgrade-now-and-rotate-credentials-20260808112720/>
- `[radom2026]` — Radom (2026-08-10): <https://www.radom.com/insights/btcpay-exploit-self-hosted-payment-stacks-fast-patching>
- Earlier incident CoinDesk's "another" most plausibly refers to: [`examples/2026-07-coldcard-firmware-rng-fallback-entropy-collapse-sweep.md`](2026-07-coldcard-firmware-rng-fallback-entropy-collapse-sweep.md). CoinDesk itself does not name it (it links a 2026-08-06 piece on 85 critical bugs found by Bitcoin developers); Unchained's context line ties the BTCPay news to a Coldcard firmware flaw.
