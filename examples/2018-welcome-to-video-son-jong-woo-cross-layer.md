# Welcome to Video Son Jong-woo cross-layer de-anonymization — 2018

**Loss:** **Attribution event, not financial loss.** Son Jong-woo (Jong Woo Son), a South Korean national, was identified as the operator of Welcome To Video, a darknet child-sexual-exploitation site, through blockchain tracing of Bitcoin payments and the server's exposed IP address. IRS-CI, HSI, the UK National Crime Agency and the Korean National Police led the investigation.
**OAK Techniques observed:** **OAK-T8.005** (Operational Security Procedural Failure) — the investigators found the server's IP address in the site's source code, locating it in South Korea (Wikipedia), and traced Bitcoin payments to a wallet hosted at an exchange and registered to Son (DOJ, via press coverage). **OAK-T7.002** (CEX Deposit-Address Layering) — Bitcoin payments were followed through to exchange accounts.
**Attribution:** **confirmed** — Son was arrested in South Korea on 2018-03-05 (DOJ release) and convicted there (one-and-a-half years on retrial in May 2019; a further 24-month sentence in July 2022 for concealing proceeds, per Wikipedia). A US grand jury in D.C. indicted him on nine counts, announced 2019-10-16. South Korea's High Court denied US extradition on 2020-07-06, and no US conviction of Son is reported.
**Corrected 2026-10-11:** removed the unsourced claims of a real-name hosting registration with a personal billing email, "1.28M registered accounts", an "Operation Wish" taskforce, Son's 2019 extradition and a 2021 US conviction (extradition was denied); sourced the IP-in-source-code and exchange-wallet tracing.
**Key teaching point:** Welcome to Video is a worked example of how blockchain tracing plus a basic server-exposure error identify a darknet operator: the site's IP address was visible in its source code, which put the server in South Korea, and Bitcoin payments traced to a wallet at an exchange registered to Son tied the operator to a real identity. Publicly traceable payments to a KYC'd exchange account are what turned an anonymous site into a named defendant.

## Summary

Welcome To Video was a darknet site that advertised child-exploitation videos for download, paid for in Bitcoin. According to the DOJ's 2019 release, agents seized the server and arrested Son on 2018-03-05. About 8 terabytes of video were seized, containing more than 250,000 unique videos, and the server held more than one million Bitcoin addresses, indicating capacity for at least one million users. Wikipedia reports about 1.2 million members from 38 countries.

IRS-CI chief Don Fort credited "sophisticated tracing of bitcoin transactions" with locating the server, identifying the administrator and tracking the server to South Korea. Per the indictment as reported, investigators sent Bitcoin to the site's wallet during undercover operations; the wallet was hosted at an exchange and registered to Son. Wikipedia adds that the server's IP address was found in the site's source code.

The DOJ announced leads sent to 38 countries and arrests of 337 users (the Korean National Police reported 310 arrests in 32 countries). A civil forfeiture complaint sought funds from accounts used by 24 individuals in five countries. The release also says at least 23 minor victims were rescued.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2018-03-05 | Son arrested in South Korea; server seized (DOJ) | T8.005 / T7.002 |
| 2018-05 | Son charged in South Korea (Wikipedia) | (prosecution) |
| 2019-05 | South Korean court sentences Son to one and a half years on retrial (Wikipedia) | (conviction) |
| 2019-10-16 | DOJ announces D.C. indictment and 337 user arrests; KNPA announces results | (law enforcement) |
| 2020-07-06 | South Korean High Court denies US extradition (Wikipedia) | (extradition) |
| 2022-07 | Third Korean trial: 24 months for concealing proceeds (Wikipedia) | (conviction) |

## Public references

- `[doj2019wtv]` — US Department of Justice release, "South Korean National and Hundreds of Others Charged Worldwide in Takedown of Largest Darknet Child Pornography Website, Which Was Funded by Bitcoin" (2019-10-16), republished at Insider NJ: <https://www.insidernj.com/press-release/south-korean-national-hundreds-others-charged-worldwide-takedown-largest-darknet-child-pornography-website-funded-bitcoin/>
- `[wiki2019wtv]` — Wikipedia, "Welcome to Video case": <https://en.wikipedia.org/wiki/Welcome_to_Video_case>
- `[block2019wtv]` — The Block, "Feds take down one of the largest child exploitation sites; seeks to seize bitcoins" (2019-10-16): <https://www.theblock.co/news/regulation/2019-10-16-feds-take-down-one-of-the-largest-child-exploitation-sites-seeks-to-seize-bitcoins-43496>
