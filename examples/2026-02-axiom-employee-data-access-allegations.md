# Axiom — alleged employee misuse of internal support tools to view private user wallets for trading — Axiom trading platform — 2026-02-26 (alleged conduct from early 2025)

**Loss:** **undisclosed.** No victim loss and no profit figure is established. ZachXBT said he could not identify specific profitable trades without Axiom's internal logs, citing "the high volume of meme coin trades tied to related addresses" ([Decrypt](https://decrypt.co/359223/y-combinator-backed-axiom-employees-accused-insider-trading-zachxbt)). He shared a screenshot of exchange balances allegedly tied to one employee showing around \$300,000 ([Decrypt](https://decrypt.co/359223/y-combinator-backed-axiom-employees-accused-insider-trading-zachxbt)). The \$390M figure in ZachXBT's thread is Axiom's revenue to date, not a loss ([ZachXBT post 2/](https://x.com/zachxbt/status/2027016082536714503)).

**OAK Techniques observed:** none — the allegation is that employees with legitimate access to internal customer-support tools looked up private wallets and may have traded on it. Nothing was compromised and no price or order-book primitive was manipulated, so no existing Technique fits. The only insider-trading Technique in the taxonomy is specific to prediction markets and does not describe this. Candidate gap: platform-employee misuse of customer wallet data. The conduct is alleged and no trade is confirmed.

**Attribution:** **unattributed** to any charged person. ZachXBT alleges that multiple Axiom employees took part and describes one as a senior business development employee based in New York ([Decrypt](https://decrypt.co/359223/y-combinator-backed-axiom-employees-accused-insider-trading-zachxbt), [The Block](https://www.theblock.co/post/391423/zachxbt-investigation-into-alleged-employee-insider-trading)). No source opened here reports charges or a regulatory action, so this file does not name the individual.

**Key teaching point:** **Restrict and log every internal tool that can resolve a user to a wallet, and alert when a staff member's lookups line up with that staff member's own trades.** Per ZachXBT, the tools let staff find users by referral code, wallet address or user ID, and he described Axiom's internal access controls as unusually permissive ([The Block](https://www.theblock.co/post/391423/zachxbt-investigation-into-alleged-employee-insider-trading)).

## Summary

Axiom is a crypto trading platform founded in 2024 that went through Y Combinator's Winter 2025 batch ([ZachXBT post 2/](https://x.com/zachxbt/status/2027016082536714503)). On 2026-02-26 ZachXBT, who says he was retained to investigate misconduct allegations at Axiom, published a thread alleging that multiple Axiom employees abused the lack of access controls on internal tools to look up sensitive user details and track private wallet activity since early 2025 ([ZachXBT post 1/](https://x.com/zachxbt/status/2027016064534757659)).

Decrypt and The Block relay the thread. Audio clips cited by ZachXBT have the employee saying he could track any user by referral code, wallet address or user ID, and that he researched wallets slowly to avoid suspicion; ZachXBT also shared screenshots of the internal dashboard showing wallets linked to specific traders ([The Block](https://www.theblock.co/post/391423/zachxbt-investigation-into-alleged-employee-insider-trading), [Decrypt](https://decrypt.co/359223/y-combinator-backed-axiom-employees-accused-insider-trading-zachxbt)). The thread alleges the group mapped private wallets to influencers ([Decrypt](https://decrypt.co/359223/y-combinator-backed-axiom-employees-accused-insider-trading-zachxbt)). The outlets did not verify the audio, screenshots or wallet mapping.

Axiom replied on X that it was shocked and disappointed to hear someone on its team abused internal customer support tools to look up user wallets, that it had removed access to these tools, and that it would continue to investigate ([Decrypt](https://decrypt.co/359223/y-combinator-backed-axiom-employees-accused-insider-trading-zachxbt)).

## Timeline (UTC)

Stages: **Entry** (tool access), **Preparation** (wallet lists), **Execution** (alleged trading), **Funds** (not traced), **Response**. Dates are from the thread and the press reports; no times are published.

| When | What happened | OAK |
|---|---|---|
| 2024 | Axiom founded; Y Combinator Winter 2025 batch ([ZachXBT post 2/](https://x.com/zachxbt/status/2027016082536714503)) | — |
| Early 2025 onward | Per ZachXBT, employees use internal tools without effective access controls to look up user wallets ([ZachXBT post 1/](https://x.com/zachxbt/status/2027016064534757659)) | none — insider access, no Technique fits |
| Undisclosed | Per ZachXBT, wallet lists of traders and influencers compiled; trades on that information alleged but not confirmed ([Decrypt](https://decrypt.co/359223/y-combinator-backed-axiom-employees-accused-insider-trading-zachxbt)) | none |
| Undisclosed | Funds: no on-chain trace of profits published; exchange-balance screenshot of about \$300,000 allegedly tied to one employee ([Decrypt](https://decrypt.co/359223/y-combinator-backed-axiom-employees-accused-insider-trading-zachxbt)) | — |
| 2026-02-26 | ZachXBT publishes the thread ([post 1/](https://x.com/zachxbt/status/2027016064534757659)) | — |
| 2026-02-26 | Axiom removes access to the tools and says it will investigate ([Decrypt](https://decrypt.co/359223/y-combinator-backed-axiom-employees-accused-insider-trading-zachxbt)) | response |

Key addresses: undisclosed. No wallet address is printed in full on a page opened for this pass.

## Root-cause evidence

- **Technique:** none
- **Source:** <https://x.com/zachxbt/status/2027016064534757659>; <https://x.com/zachxbt/status/2027016082536714503>; <https://decrypt.co/359223/y-combinator-backed-axiom-employees-accused-insider-trading-zachxbt>; <https://www.theblock.co/post/391423/zachxbt-investigation-into-alleged-employee-insider-trading>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** One investigator's thread, relayed by two outlets that did not verify the audio or screenshots. Axiom's statement concedes that someone abused internal support tools to look up user wallets. Whether any trade profited from it is unestablished.

## Public references

- ZachXBT, thread post 1/ (2026-02-26): <https://x.com/zachxbt/status/2027016064534757659>
- ZachXBT, thread post 2/ (2026-02-26): <https://x.com/zachxbt/status/2027016082536714503>
- Decrypt, "Y Combinator-Backed Axiom Exchange Employees Accused of Insider Trading: ZachXBT": <https://decrypt.co/359223/y-combinator-backed-axiom-employees-accused-insider-trading-zachxbt>
- The Block, "ZachXBT names Axiom in investigation into alleged employee insider trading" (2026-02-26): <https://www.theblock.co/post/391423/zachxbt-investigation-into-alleged-employee-insider-trading>
