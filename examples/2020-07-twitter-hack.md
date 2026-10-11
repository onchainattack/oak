# Twitter internal-tool compromise and Bitcoin scam campaign — 2020-07-15

**Loss:** at least \$118,000 in bitcoin fraud losses per the NYDFS investigation, as summarised by Hinshaw `[hinshaw1]`. The incident is structurally foundational for the T15.001 + T4.007 chain: a social-engineering compromise of a major platform's internal tools was weaponised to push scam content through verified high-follower accounts. Three people were charged: two in a federal complaint (N.D. California) and one, a 17-year-old, in Florida state court `[sophos1]``[aljazeera1]`. The Florida defendant, Graham Ivan Clark, pleaded guilty to 30 charges and received a three-year sentence followed by three years of probation `[abcplea]`.

**OAK Techniques observed:** **OAK-T15.001** (Social Engineering of Operator Personnel) — primary; the attackers used phone-based spear-phishing (vishing) and social-engineering techniques to persuade Twitter employees to grant access to Twitter's internal administrative tools, which included the ability to reset account email addresses, disable multi-factor authentication, and post tweets as any account. The T15.001 page's "credential-and-access" sub-pattern is directly exercised: the attackers did not compromise Twitter's infrastructure through software exploitation; they persuaded authorised personnel to grant them access to the tooling that Twitter employees themselves used to perform account-support actions. **OAK-T4.007** (Native App Social Phishing Engagement on Weighted Platforms) — the scam tweets posted from verified high-follower accounts (45 tweeted from, per `[sophos1]`) (including Bill Gates, Elon Musk and Joe Biden per the IRS affidavit `[sophos1]`) constituted a platform-native phishing campaign where the trust signal was not a fake domain or a spoofed email — it was the verified-checkmark and follower-count of the compromised accounts themselves. The attack exploited the *platform's own trust infrastructure* (verified status, follower graph) as the amplification mechanism. **OAK-T8.001** (Cluster Reuse) — the scam Bitcoin addresses used in the Twitter hack were retained from the original classification; the cited sources do not state that forensic vendors linked the addresses to prior campaigns, so this mapping is unverified. **OAK-T7.001** (Mixer-Routed Hop) — retained from the original classification; routing through mixers is not stated in the cited sources.

**Attribution:** **confirmed**. The U.S. Attorney's Office for the Northern District of California announced charges on 2020-07-31 against Mason Sheppard ("Chaewon", 19, of Bognor Regis, UK: conspiracy to commit wire fraud, conspiracy to commit money laundering, intentional access to a protected computer) and Nima Fazeli ("Rolex", 22, of Orlando, Florida: aiding and abetting intentional access to a protected computer); the third defendant, 17-year-old Graham Clark, was charged by the Hillsborough County State Attorney's Office in Tampa `[doj1]``[sophos1]`. The cited sources confirm Clark's guilty plea and sentence `[abcplea]`; they do not establish pleas or sentences for Sheppard and Fazeli.

**Key teaching point:** **Platform-internal-tool compromise converts individual-user security diligence into an irrelevant control — the attacker is operating from inside the platform's trust boundary, and no user-side countermeasure can prevent posting as the compromised account.** Callers posing as Twitter IT staff persuaded four employees to hand over credentials `[hinshaw1]`; the administrative tooling those employees used then became the attack path.

**Corrected 2026-10-11:** Defendant name corrected from "Nino" to Nima Fazeli; removed the claim that all three defendants pleaded guilty (confirmed only for Clark), the "~130 accounts compromised / ~400 victim transactions / mixer / Chainalysis-TRM cluster" claims (sources give 45 accounts tweeted from, \$118K+ losses), and unsourced Senate-inquiry and two-hour verified-account-block specifics.

## Summary

On 2020-07-15 attackers who had socially engineered access to Twitter's internal administrative tools took over high-profile accounts and posted "send bitcoin and get double back" scam tweets `[sophos1]`. Twitter reported targeting of 130 accounts, tweets from 45, and DM-inbox access to 36 (AP coverage of Twitter's 2020-07-30 disclosure, not re-verified against a primary page here); the Sophos summary of the charging documents says 45 accounts were taken over `[sophos1]`.

Per the NYDFS report as summarised by Hinshaw, the hackers phoned Twitter employees posing as IT department staff and tricked four into giving up login credentials; the accounts hijacked belonged to politicians, celebrities, entrepreneurs and several DFS-regulated cryptocurrency firms `[hinshaw1]`. The IRS affidavit states that no bitcoin was ever returned, much less doubled `[sophos1]`.

The federal charges were announced 2020-07-31, the same day the Hillsborough County State Attorney's Office announced the arrest of Graham Clark `[doj1]``[sophos1]`. Clark later pleaded guilty and was sentenced as a youthful offender `[abcplea]`.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2020-07-15 | Phone social engineering of Twitter employees yields credentials for internal tools | **T15.001** |
| 2020-07-15 | Scam tweets posted from verified accounts; bitcoin sent to attacker addresses | **T4.007** |
| 2020-07-31 | Federal charges against Sheppard and Fazeli; Florida arrest of Clark | (attribution) |
| 2020-10-14/16 | NYDFS publishes its investigation report | (regulatory report) |
| 2021 | Clark pleads guilty to 30 charges; three years plus three years' probation | (judicial resolution) |

## What this example tells contributors writing future Technique pages

- **Platform-internal-tool compromise is a T15.001 sub-pattern in which the harm is amplified phishing reach**, not direct asset extraction from the compromised platform.
- **T4.007 requires the platform's own trust signals** (verification, follower graph, native posting) as the amplification mechanism.
- **Criminal attribution came within about two weeks** of the incident (charges and arrest on 2020-07-31), but plea outcomes differ across defendants and only Clark's is confirmed in the sources cited here.

## Public references

- `[doj1]` — U.S. Attorney's Office, N.D. California, "Three Individuals Charged Alleged Roles in Twitter Hack" (2020-07-31): <https://www.justice.gov/usao-ndca/pr/three-individuals-charged-alleged-roles-twitter-hack>
- `[sophos1]` — Sophos, "Twitter hack: three suspects charged in the US" (2020-08): <https://www.sophos.com/en-us/blog/twitter-hack-three-suspects-charged-in-the-us>
- `[aljazeera1]` — Al Jazeera, "Three men charged in connection with celebrity Twitter hack" (2020-07-31): <https://www.aljazeera.com/amp/news/2020/7/31/three-men-charged-in-connection-with-celebrity-twitter-hack>
- `[hinshaw1]` — Hinshaw & Culbertson, "NYS DFS Publishes its Investigative Report of the Twitter Hack of July 2020" (2020-10-16): <https://www.hinshawlaw.com/en/insights/blogs/consumer-crossroads-where-financial-services-and-litigation-intersect/nys-dfs-publishes-its-investigative-report-of-the-twitter-hack-of-july-2020>
- `[abcplea]` — ABC Action News, "Teen behind Twitter hack to serve 3 years in juvenile facility, 3 years probation": <https://www.abcactionnews.com/news/region-hillsborough/teen-behind-twitter-hack-to-serve-3-years-in-juvenile-facility-3-years-probation>
