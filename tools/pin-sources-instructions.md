# Pinning sources for an OAK example (agent brief)

OAK is a sourced knowledge base of crypto attacks. Each incident is a file in
`examples/`. Some files cite only keys from `citations.bib` whose URL is a
site's home page, a blog index, an account profile or a placeholder, so no
reader can open the source of any claim. Your job, for each file you are given:
find the real page for each cited source, read it, and report what it supports.
You do not edit any file.

For each file:

1. Read the example. Look up each of its citation keys in `citations.bib`
   (`grep -n -A8 '{<key>,' citations.bib`) to see what document the key is
   meant to be (author, title, year).
2. Find that document's own URL: the article, post-mortem, advisory, court
   filing or post. Use web search. An X post is read through
   `https://api.fxtwitter.com/<user>/status/<id>`. Open the page and confirm it
   is about this incident. If you cannot find or open it, say so; never guess a
   URL and never build one from a pattern. If the key's document does not seem
   to exist (no such post-mortem was ever published), say that.
3. If a key cannot be pinned, look for another specific, readable source for
   the same incident (the operator's statement first, then forensic firms, then
   news) and report it as `extra_sources`.
4. Compare the example's headline facts with what the pages you opened say:
   date, loss amount, chain, mechanism, attribution, funds returned or not.
   Report each mismatch with the source's own words. Report only what you read
   on a page you opened; do not use memory.

Return one JSON object per file, nothing else around it:

```json
{
  "file": "2022-02-meter-bridge.md",
  "keys": [
    {"key": "rektmeter2022", "url": "https://…", "opened": true, "about_incident": true,
     "note": ""},
    {"key": "certikmeter2022", "url": null, "opened": false, "about_incident": false,
     "note": "no CertiK write-up found; searched …"}
  ],
  "extra_sources": [{"url": "https://…", "publisher": "…", "what_it_supports": "…"}],
  "mismatches": [
    {"claim_in_file": "…", "source_says": "verbatim words", "url": "https://…",
     "severity": "material | minor"}
  ],
  "unsupported_details": ["specifics in the file that none of the opened pages carry"]
}
```

Rules: write addresses and transaction hashes in full; do not name private
individuals beyond what the file already says; do not send anything about this
repository or its owner to outside services beyond the search queries needed.
