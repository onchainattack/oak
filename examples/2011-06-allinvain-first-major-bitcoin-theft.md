# Allinvain — 25,000 BTC taken from an unencrypted wallet on a Windows PC — Bitcoin — 2011-06-13

**Loss:** **25,000 BTC**, reported by the victim on [BitcoinTalk](https://bitcointalk.org/index.php?topic=16457.0). [ESET](https://www.eset.com/blog/en/bitcoin-wallet-hacked-heisted-500k) estimated about $500,000 at the time and noted the theft was reported, not independently verified; [CSO Online](https://www.csoonline.com/article/531434/data-protection-symantec-uncovers-bitcoin-stealing-trojan.html) gave "more than $400,000" at June 17 rates. Recovery: none is reported on the opened pages.

**OAK Techniques observed:** none — the entry method is not established. The victim suspected a trojan or direct access to his computer ([BitcoinTalk](https://bitcointalk.org/index.php?topic=16457.0)); [CSO Online](https://www.csoonline.com/article/531434/data-protection-symantec-uncovers-bitcoin-stealing-trojan.html) says it is "not clear" how it was done. The Operator-Side Credential Compromise page covers operator accounts, not a private holder's PC, so it is not declared.

**Attribution:** **unattributed** — no opened page names a person or group.

**Key teaching point:** **Do not keep a spendable, unencrypted wallet file on an internet-connected general-purpose PC.** The victim wrote that the wallet file on the disk was not encrypted and that he should have moved the funds to a separate non-Windows computer ([BitcoinTalk](https://bitcointalk.org/index.php?topic=16457.0)).

## Summary

On 2011-06-13 the user "allinvain" posted that he had woken up to find a large part of his balance sent to `1KPTdMb6p7H3YCwsyFqrEmKGmsHqe1Q3jg`, with a transaction time of 6/13/2011 12:52 (EST) ([BitcoinTalk](https://bitcointalk.org/index.php?topic=16457.0)). He wrote that the funds belonged to `1J18yk7D353z3gRVcdbS7PV5Q8h5w6oWWG`, that his backups of the wallet were encrypted but the wallet file on the disk was not, and that the theft came right after someone broke into his Slush's pool account. He first took that for a brute-forced pool password and changed it from another computer, without suspecting his whole system. ESET reported the theft as following an infection of his computer and said malware read the unencrypted wallet file ([ESET](https://www.eset.com/blog/en/bitcoin-wallet-hacked-heisted-500k), 2011-06-16), while CSO Online (2011-06-17) said it was unclear how the coins were taken or whether malware was used, and did not link the theft to the Symantec-discovered trojan it described. Following the funds was done by forum members; the victim linked three transaction and address lists and tracking code in the thread.

## Timeline (UTC)

Stages: **Entry**, **Take**, **Money**, **Response**. The only time on an opened page is the victim's EST transaction time; the other times are undisclosed.

| When | What happened | OAK |
|---|---|---|
| Before 2011-06-13 (undisclosed) | Victim's Slush's pool account broken into; wallet file on his Windows PC not encrypted ([BitcoinTalk](https://bitcointalk.org/index.php?topic=16457.0)) | none — entry method not established |
| 2011-06-13 12:52 EST | Large part of the balance sent from `1J18yk7D353z3gRVcdbS7PV5Q8h5w6oWWG` to `1KPTdMb6p7H3YCwsyFqrEmKGmsHqe1Q3jg` ([BitcoinTalk](https://bitcointalk.org/index.php?topic=16457.0)) | none — entry method not established |
| 2011-06-13 20:47 (forum time as shown) | Victim posts the thread and asks for help tracing the funds ([BitcoinTalk](https://bitcointalk.org/index.php?topic=16457.0)) | response |
| After 2011-06-13 | Forum users track the coins; the victim links transaction and address lists and shares his tracking program ([BitcoinTalk](https://bitcointalk.org/index.php?topic=16457.0)). Final destination and any off-ramp: undisclosed on opened pages | none — no on-chain trace by OAK |

Key addresses:

- Sending address (per the victim) — [`1J18yk7D353z3gRVcdbS7PV5Q8h5w6oWWG`](https://mempool.space/address/1J18yk7D353z3gRVcdbS7PV5Q8h5w6oWWG)
- First receiving address — [`1KPTdMb6p7H3YCwsyFqrEmKGmsHqe1Q3jg`](https://mempool.space/address/1KPTdMb6p7H3YCwsyFqrEmKGmsHqe1Q3jg)

## Root-cause evidence

- **Technique:** none — entry method not established
- **Source:** <https://bitcointalk.org/index.php?topic=16457.0>; <https://www.eset.com/blog/en/bitcoin-wallet-hacked-heisted-500k>; <https://www.csoonline.com/article/531434/data-protection-symantec-uncovers-bitcoin-stealing-trojan.html>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** The victim's own thread gives the addresses, the unencrypted wallet file and the preceding pool-account break-in. ESET says malware read the wallet file; CSO Online says the method is unclear. Which is right is unresolved.

## Public references

- allinvain, "I just got hacked - any help is welcome! (25,000 BTC stolen)", BitcoinTalk (2011-06-13): <https://bitcointalk.org/index.php?topic=16457.0>
- ESET, "Bitcoin wallet hacked, heisted 500k" (2011-06-16): <https://www.eset.com/blog/en/bitcoin-wallet-hacked-heisted-500k>
- CSO Online, "Symantec uncovers Bitcoin-stealing trojan" (2011-06-17): <https://www.csoonline.com/article/531434/data-protection-symantec-uncovers-bitcoin-stealing-trojan.html>
