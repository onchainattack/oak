> **QUARANTINED 2026-11-27 — not part of the OAK corpus.** The 2026-11 source pass rewrote this file from the pages it could open and found no crypto attack to record: forged legal requests were filed with stolen government email accounts against a crypto investigator's posts; no theft, key or wallet is involved, and OAK does not file general breaches without a crypto loss. It is kept here, outside `examples/`, and can return if a source documents an incident.

# Italian government emails used to reach Twitter's Legal Request portal — forged takedown and disclosure requests — Twitter (X) / no chain — 2023-07-26

**Loss:** No crypto loss is reported. [ZachXBT](https://crypto.news/scammers-hack-twitter-portal-using-stolen-italian-government-emails/) reported an attempted takedown of five of his tweets, which Twitter rejected; the [Arbitrum Foundation](https://coinedition.com/scammers-use-fake-emails-to-control-twitter-and-ban-accounts/) reportedly received a request framed as an emergency disclosure. No amount is attributed to this incident by either page.

**OAK Techniques observed:** none — the reported mechanism (stolen Italian government email access used to file forged legal requests in a social platform's portal) touches no wallet, key or on-chain authority, so no OAK Technique page fits. This is a platform-abuse case adjacent to OAK's scope.

**Attribution:** **unattributed** — [ZachXBT suggested](https://coinedition.com/scammers-use-fake-emails-to-control-twitter-and-ban-accounts/) that a phishing scammer known as "Chase HZ" might be involved, because that person had messaged him on Telegram about the request; the same page calls the link unconfirmed.

**Key teaching point:** **A legal-request portal must not treat a government email domain as proof that a request is real.** [Per ZachXBT](https://crypto.news/scammers-hack-twitter-portal-using-stolen-italian-government-emails/), the scammers used stolen Italian government emails; a platform that checks only the sender domain, with no second check of the named officer or a signed request, can be fed forged takedowns.

## Summary

On 2023-07-26 the on-chain investigator ZachXBT said that scammers had stolen Italian government emails to access the Twitter Legal Request portal ([Coin Edition](https://coinedition.com/scammers-use-fake-emails-to-control-twitter-and-ban-accounts/), [crypto.news](https://crypto.news/scammers-hack-twitter-portal-using-stolen-italian-government-emails/)). He said the access was used to ban accounts, look up information and remove posts. He reported being targeted himself: a takedown request for five of his tweets about scams he had exposed, which Twitter did not accept ([crypto.news](https://crypto.news/scammers-hack-twitter-portal-using-stolen-italian-government-emails/)). Coin Edition adds that the Arbitrum Foundation reportedly received an emergency disclosure request on Twitter from the scammers. Neither page says how the government emails were obtained, how many requests succeeded, or whether Twitter commented. Those points are undisclosed.

The X post [x.com/zachxbt/status/1695929732158636422](https://x.com/zachxbt/status/1695929732158636422) that this file previously cited is dated 2023-08-27 and is about fake verified-organisation phishing accounts, not this incident; the original 2023-07-26 post was not opened here.

## Timeline (UTC)

Stages: **Entry** (government email access), **Execution** (forged requests), **Response**. Dates come from the two news pages; times are undisclosed.

| When | What happened | OAK |
|---|---|---|
| Before 2023-07-26 (undisclosed) | Italian government email accounts obtained by the scammers, method undisclosed ([crypto.news](https://crypto.news/scammers-hack-twitter-portal-using-stolen-italian-government-emails/)) | none — no Technique fits |
| Before 2023-07-26 (undisclosed) | Forged requests filed in the Twitter Legal Request portal: takedown of five of ZachXBT's tweets; reportedly an emergency disclosure request naming the Arbitrum Foundation ([Coin Edition](https://coinedition.com/scammers-use-fake-emails-to-control-twitter-and-ban-accounts/)) | none — no Technique fits |
| 2023-07-26 | ZachXBT publishes the claim and asks Twitter to review the reports and revoke access to the compromised email account ([crypto.news](https://crypto.news/scammers-hack-twitter-portal-using-stolen-italian-government-emails/)) | response |
| 2023-07-27 | Twitter reportedly declined to act on the takedown request ([Coin Edition](https://coinedition.com/scammers-use-fake-emails-to-control-twitter-and-ban-accounts/)) | response |

Key addresses: none; no on-chain component is reported.

## Root-cause evidence

- **Technique:** none — platform-portal abuse, not a crypto-asset attack
- **Source:** <https://crypto.news/scammers-hack-twitter-portal-using-stolen-italian-government-emails/>; <https://coinedition.com/scammers-use-fake-emails-to-control-twitter-and-ban-accounts/>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** Both pages relay ZachXBT's same-week claim; neither shows the portal records or a Twitter statement. How the emails were obtained and what the portal verified are unknown.

## Public references

- crypto.news, "Scammers hack Twitter portal using stolen Italian government emails" (2023-07-27): <https://crypto.news/scammers-hack-twitter-portal-using-stolen-italian-government-emails/>
- Coin Edition, "Scammers Use Fake Emails to Control Twitter and Ban Accounts" (2023-07-27): <https://coinedition.com/scammers-use-fake-emails-to-control-twitter-and-ban-accounts/>
