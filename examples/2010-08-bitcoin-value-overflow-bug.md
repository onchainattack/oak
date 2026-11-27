# Bitcoin value overflow bug — output-sum overflow let one transaction create about 184 billion BTC — Bitcoin protocol / Bitcoin — 2010-08-15

**Loss:** None realised. One transaction in block 74638 created 184,467,440,737.09551616 BTC across three outputs, per the [Bitcoin Wiki](https://en.bitcoin.it/wiki/Value_overflow_incident). The wiki states that the bad transaction "no longer exists for people using the longest chain" once the patched chain overtook the bad one at block height 74691 on 2010-08-16.

**OAK Techniques observed:** **OAK-T9.014** (Protocol-Client Consensus Bug — *primary*. The transaction-checking code did not handle outputs so large that their sum overflowed, per the [Bitcoin Wiki](https://en.bitcoin.it/wiki/Value_overflow_incident); thread participants worked out that each output was checked individually but their sum was not, per the [BitcoinTalk thread](https://bitcointalk.org/index.php?topic=822.0). The bug is in node software, not a smart contract. See [`techniques/T9.014-protocol-client-consensus-bug.md`](../techniques/T9.014-protocol-client-consensus-bug.md)).

**Attribution:** **unattributed** — none of the opened pages names the creator of the transaction or any of the three receiving addresses; the [Bitcoin Wiki](https://en.bitcoin.it/wiki/Value_overflow_incident) says it does not list them.

**Key teaching point:** **Consensus code that sums amounts must check the sum, not only each term, and reject any single output above the money supply.** The 2010 fix, per the [Bitcoin Wiki](https://en.bitcoin.it/wiki/Value_overflow_incident), rejected overflow transactions and any transaction paying more than 21 million BTC in one output. A node-level range check on both individual and summed values closes this class.

## Summary

On 2010-08-15 a forum user noticed a block whose two outputs each paid 92233720368.54277039 BTC ([BitcoinTalk, "Strange block 74638"](https://bitcointalk.org/index.php?topic=822.0)). Other participants identified the figure as 2^63 / 10^8, that is INT64_MAX in satoshis, and concluded that the sum of the two outputs overflowed to a negative number and passed validation. The [Bitcoin Wiki](https://en.bitcoin.it/wiki/Value_overflow_incident) records the transaction as creating 184,467,440,737.09551616 BTC, paid to three addresses: 92.2 billion BTC to each of two addresses and an extra 0.01 BTC to the block solver. A patched client carrying a soft-forking rule change was published within five hours of discovery. Unpatched nodes kept building on the bad chain for a time; the patched chain overtook it at block 74691 on 2010-08-16, after which all nodes accepted it.

[NVD](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2010-5139) records the flaw as CVE-2010-5139: "Integer overflow in wxBitcoin and bitcoind before 0.3.11 allows remote attackers to bypass intended economic restrictions and create many bitcoins via a crafted Bitcoin transaction." The CVE was published 2012-08-06, two years after the event.

## Timeline (UTC)

Times in the thread are given in CDT by a participant ([BitcoinTalk](https://bitcointalk.org/index.php?topic=822.0)) and are left in CDT here; they are a forum poster's reading of block timestamps, not an official record.

| When | What happened | OAK |
|---|---|---|
| Before 2010-08-15 | The transaction-checking code does not handle outputs whose sum overflows ([Bitcoin Wiki](https://en.bitcoin.it/wiki/Value_overflow_incident)); a thread participant says versions "up to ver 0.3.8 at least" were affected ([BitcoinTalk](https://bitcointalk.org/index.php?topic=822.0)) | **T9.014** |
| 2010-08-15, block 74638 timestamp 12:05:57 CDT per [BitcoinTalk](https://bitcointalk.org/index.php?topic=822.0) | Block 74638 (hash `0000000000790ab3f22ec756ad43b6ab569abf0bddeb97c67a6f7b1470a7ec1c`) contains transaction [`4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b`](https://mempool.space/tx/4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b) paying two outputs of 92.2 billion BTC ([Bitcoin Wiki](https://en.bitcoin.it/wiki/Value_overflow_incident)) | **T9.014** |
| 2010-08-15, 01:08:49 PM CDT per [BitcoinTalk](https://bitcointalk.org/index.php?topic=822.0) | A forum user opens the "Strange block 74638" thread; within about an hour others identify INT64_MAX and the overflowing sum | detection |
| 2010-08-15, shortly after | A thread participant advises that the network should "probablt shut down whatever you can and by no means make nor accept any transactions" (sic); another says they stopped generating on their nodes ([BitcoinTalk](https://bitcointalk.org/index.php?topic=822.0)) | response |
| 2010-08-15, within five hours of discovery | A new client with a soft-forking rule rejecting overflow transactions and any output above 21 million BTC is published; the commit is titled "Fix for block 74638" ([Bitcoin Wiki](https://en.bitcoin.it/wiki/Value_overflow_incident)). A thread participant puts the patch push to SVN at about five hours and mentions a 0.3.10 release "the next day" ([BitcoinTalk](https://bitcointalk.org/index.php?topic=822.0)); the wiki gives no version number | response |
| 2010-08-16, block 74691 (hash `00000000005c22d199706df1c38b38d76f8401920dcbe91edf3417f8847da707`) | The patched chain overtakes the bad chain; all nodes accept it and the overflow transaction no longer exists on the longest chain ([Bitcoin Wiki](https://en.bitcoin.it/wiki/Value_overflow_incident)) | response |
| Where the created coins went | None spent per the opened pages; the wiki does not list the receiving addresses and says the 0.5 BTC the transaction consumed has not been used since | undisclosed |

Key addresses: none printed in full on an opened page.

## Root-cause evidence

- **Technique:** OAK-T9.014
- **Source:** <https://en.bitcoin.it/wiki/Value_overflow_incident>; <https://bitcointalk.org/index.php?topic=822.0>; <https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2010-5139>
- **Source type:** independent-researcher
- **Confidence:** corroborated
- **Evidence:** The wiki and the contemporaneous forum thread agree on block 74638, the overflowing output sum and the soft-fork fix; NVD classes it as an integer overflow letting a crafted transaction create bitcoins. Not settled: the exact fixed version (the wiki gives none, the thread mentions 0.3.10, NVD says "before 0.3.11"), the identity of the transaction's creator, and the receiving addresses.

## Public references

- Bitcoin Wiki, "Value overflow incident": <https://en.bitcoin.it/wiki/Value_overflow_incident>
- BitcoinTalk, "Strange block 74638" thread (2010-08-15 to 2010-08-20): <https://bitcointalk.org/index.php?topic=822.0>
- NVD, CVE-2010-5139 record (JSON API): <https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2010-5139>
