# LocalBitcoins social-engineering compromise — Bitcoin — 2015-01-27

**Loss:** approximately \$20K in BTC stolen from LocalBitcoins users via social engineering of the platform's help desk / live chat feature.
**OAK Techniques observed:** **OAK-T15.003** (Operator-Endpoint Compromise — broadly construed; the help-desk live-chat surface was the operator-side endpoint whose state was manipulated via social-engineering pretext, enabling the attacker to act with operator-level authority over user accounts). **OAK-T4.001** (Access Acquisition — broadly construed; the social engineering of the help desk is a member of the T4 Access-Acquisition tactic family, though the Permit2-specific sub-technique description does not map directly to pre-EIP-712 social-engineering access acquisition; the case is classified under T4.001 as the closest available access-acquisition anchor in the 2015 pre-smart-contract era).
**Attribution:** **pseudonymous (unattributed to a named group).** Social-engineering pretext targeted the LocalBitcoins support staff rather than the platform's technical infrastructure.
**Key teaching point:** **The LocalBitcoins January 2015 help-desk social-engineering incident is the canonical pre-smart-contract-era "operator-as-vector" access-acquisition case: the attacker did not exploit a technical vulnerability but instead socially engineered the human support layer to gain operator-level access to user accounts.** The case predates the dominant 2022+ T4.x Permit2 / frontend-compromise patterns and anchors the social-engineering lineage within the Access Acquisition tactic.

## Summary

LocalBitcoins, a Finland-based peer-to-peer Bitcoin marketplace founded in 2012, was a platform connecting Bitcoin buyers and sellers with an escrow service and a web-of-trust reputation system. In January 2015, an attacker socially engineered the LocalBitcoins help desk / live chat support staff, convincing them to grant access to user accounts or to facilitate unauthorized transactions.

The incident resulted in approximately \$20K in BTC losses across multiple affected users. The attacker exploited the live-chat interface — a support-function surface that had operator-level authority over user accounts — rather than any technical vulnerability in the LocalBitcoins platform itself. The platform's forums and messaging system were also reported to have been compromised in a related operation.

LocalBitcoins responded by strengthening support-staff verification procedures and implementing additional authentication gates for sensitive account actions initiated via support channels. The incident is notable as one of the earliest documented cases where the attack surface was the human support layer of a cryptocurrency platform rather than its wallet, server, or smart-contract infrastructure.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2015-01-27 (circa) | Attacker socially engineers LocalBitcoins help desk / live chat staff; gains operator-level access to user accounts | T15.003 (operator-side surface manipulation) + T4.001 (access acquisition via social engineering) |
| 2015-01 T+ | ~$20K BTC drained from affected user accounts; platform forums/messaging also reported compromised | (extraction event) |
| 2015-01 to 2015-02 | LocalBitcoins hardens support-staff verification; additional authentication gates added for support-mediated account actions | (remediation) |

## Realised extraction

Approximately \$20K in BTC; no confirmed recovery reported.

## T4.001 classification note

The T4.001 sub-technique at v0.1 is defined primarily around Permit2 signature-based authority misuse (EIP-712 / Permit2 phishing in the EVM context, dominant from ~2022 onward). The LocalBitcoins 2015 case is classified under T4.001 as the pre-smart-contract ancestor of the access-acquisition lineage: the social engineering of a platform's human support layer to acquire operator-level access is structurally a member of the T4 (Access Acquisition) tactic family. The case anchors the pre-Permit2, pre-EIP-712 era of access acquisition in OAK's historical record and serves as a reference for the "human-support-layer-as-access-vector" sub-pattern that recurred in later incidents (help-desk compromise at exchanges, support-staff credential phishing, and insider-co-opted support personnel).

## References

- LocalBitcoins community forum and user reports, January 2015
- LocalBitcoins platform security-incident response and hardening, 2015
- BitcoinTalk and Reddit community discussion threads, January 2015
