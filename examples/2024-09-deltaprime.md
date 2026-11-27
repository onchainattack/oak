# DeltaPrime Blue — compromised ProxyAdmin key used for malicious proxy upgrades, ~\$6M drained — Arbitrum — 2024-09-16

**Loss:** **\$5.98M** from DeltaPrime Blue on Arbitrum, per the project's own status post ([DeltaPrime on X](https://x.com/DeltaPrimeDefi/status/1835603279369125893)); Halborn says "nearly \$6 million", in various currencies later swapped to ETH ([Halborn](https://www.halborn.com/blog/post/explained-the-deltaprime-hack-september-2024)). DeltaPrime states that DeltaPrime Red on Avalanche "is not vulnerable" ([DeltaPrime on X](https://x.com/DeltaPrimeDefi/status/1835603279369125893)). Reimbursement terms: not established from the pages opened.

**OAK Techniques observed:** **OAK-T11.014** (Operator Privileged-Key Compromise — *primary*). DeltaPrime attributes the attack to a compromised private key and says the source was under investigation ([DeltaPrime on X](https://x.com/DeltaPrimeDefi/status/1835603279369125893)). Halborn describes an attacker holding the ProxyAdmin private key performing a malicious upgrade of the proxy contract, then deploying five malicious proxy contracts targeting different DeltaPrime contracts ([Halborn](https://www.halborn.com/blog/post/explained-the-deltaprime-hack-september-2024)). See [`techniques/T11.014-operator-privileged-key-compromise.md`](../techniques/T11.014-operator-privileged-key-compromise.md). How the key was obtained is undisclosed.

**Attribution:** **unattributed**. No source opened names an actor.

**Key teaching point:** **Upgrade authority over contracts that hold user deposits belongs behind a multi-signature wallet and cold storage, not a single key.** Halborn's reading is that the Arbitrum contracts were "likely protected only by a single private key", and that DeltaPrime said its Avalanche contracts did have these practices in place ([Halborn](https://www.halborn.com/blog/post/explained-the-deltaprime-hack-september-2024)). Halborn adds that audits cannot detect poor key security in code.

## Summary

On 2024-09-16 DeltaPrime reported that DeltaPrime Blue on Arbitrum was attacked at 6:14 AM CET and drained for \$5.98M because of a compromised private key ([DeltaPrime on X](https://x.com/DeltaPrimeDefi/status/1835603279369125893)). Halborn explains that the contracts used proxies, that the holder of the ProxyAdmin key swapped the proxy's implementation for a malicious one that inherited the original contract's access, and that the attacker drained deposited value ([Halborn](https://www.halborn.com/blog/post/explained-the-deltaprime-hack-september-2024)).

## Timeline (UTC)

Stages: **Entry** (key), **Take** (upgrades), **Money** (swap to ETH), **Response**. The only time in the sources is DeltaPrime's "6:14 AM CET"; it is not converted here.

| When | What happened | OAK |
|---|---|---|
| Before 2024-09-16 (undisclosed) | The ProxyAdmin private key leaves the project's control; the source is "currently under investigation" per DeltaPrime ([DeltaPrime on X](https://x.com/DeltaPrimeDefi/status/1835603279369125893)) | **T11.014** |
| 2024-09-16, 6:14 AM CET (per DeltaPrime) | DeltaPrime Blue (Arbitrum) is attacked and drained for \$5.98M ([DeltaPrime on X](https://x.com/DeltaPrimeDefi/status/1835603279369125893)) | **T11.014** |
| 2024-09-16 | The attacker upgrades the proxy to a malicious contract and deploys five malicious proxy contracts against different DeltaPrime contracts ([Halborn](https://www.halborn.com/blog/post/explained-the-deltaprime-hack-september-2024)) | **T11.014** |
| After the drain (undisclosed) | Drained assets are swapped to ETH ([Halborn](https://www.halborn.com/blog/post/explained-the-deltaprime-hack-september-2024)); onward movement and addresses undisclosed in the pages opened | — |
| 2024-09-16 08:55 UTC (post time) | DeltaPrime publishes its status post: key compromise, source under investigation, Red (Avalanche) not vulnerable ([DeltaPrime on X](https://x.com/DeltaPrimeDefi/status/1835603279369125893)) | response |

Key addresses: none printed in full in the sources opened (undisclosed).

## Root-cause evidence

- **Technique:** OAK-T11.014
- **Source:** <https://x.com/DeltaPrimeDefi/status/1835603279369125893>; <https://www.halborn.com/blog/post/explained-the-deltaprime-hack-september-2024>
- **Source type:** operator
- **Confidence:** corroborated
- **Evidence:** The operator states a compromised private key; Halborn independently describes the ProxyAdmin-key upgrade mechanism, though it also words the single-key point as "likely". No post-mortem, transaction hash or explanation of how the key leaked was found.

## Public references

- DeltaPrime, status post (2024-09-16): <https://x.com/DeltaPrimeDefi/status/1835603279369125893>
- Halborn, "Explained: The DeltaPrime Hack (September 2024)" (2024-09-17): <https://www.halborn.com/blog/post/explained-the-deltaprime-hack-september-2024>
