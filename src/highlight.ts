// Tiny dependency-free token highlighters for the in-app document viewer.
// Returns HTML strings with .hl-* span wrappers; styling lives in styles.css.
// Not a real parser — regex-based and good enough for OAK detection-spec
// YAML and the prose pseudocode inside detection_logic.pseudocode.

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const highlightYaml = (raw: string): string => {
  const lines = raw.split("\n");
  return lines
    .map((line) => {
      const escaped = escapeHtml(line);
      // line comment
      const commentSplit = escaped.match(/^([^#]*?)(\s+#.*|#.*)$/);
      let body = escaped;
      let comment = "";
      if (commentSplit) {
        body = commentSplit[1];
        comment = `<span class="hl-comment">${commentSplit[2]}</span>`;
      }
      // key: value
      body = body.replace(
        /^(\s*-?\s*)([A-Za-z_][\w.\-]*)(\s*:)(\s|$)/,
        (_m, indent, key, colon, tail) =>
          `${indent}<span class="hl-key">${key}</span>${colon}${tail}`,
      );
      // list marker
      body = body.replace(
        /^(\s*)(-)(\s)/,
        (_m, indent, dash, sp) =>
          `${indent}<span class="hl-punct">${dash}</span>${sp}`,
      );
      // double-quoted string
      body = body.replace(
        /(&quot;[^&]*?&quot;)/g,
        '<span class="hl-string">$1</span>',
      );
      // single-quoted string
      body = body.replace(
        /(&#39;[^&]*?&#39;)/g,
        '<span class="hl-string">$1</span>',
      );
      // numbers (incl. durations/percent suffixes)
      body = body.replace(
        /(\b\d+(?:\.\d+)?(?:[dhms])?\b)/g,
        '<span class="hl-number">$1</span>',
      );
      // booleans / null
      body = body.replace(
        /\b(true|false|null|None)\b/g,
        '<span class="hl-const">$1</span>',
      );
      // block-scalar markers
      body = body.replace(
        /:(\s)(\||&gt;)(\s|$)/,
        ': $1<span class="hl-punct">$2</span>$3',
      );
      return body + comment;
    })
    .join("\n");
};

const PSEUDO_KEYWORDS = new Set([
  "for", "each", "in", "if", "and", "or", "not", "else", "elif",
  "return", "emit", "while", "break", "continue", "any", "all",
  "match", "case", "is", "None", "True", "False",
]);

export const highlightPseudo = (raw: string): string => {
  const lines = raw.split("\n");
  return lines
    .map((line) => {
      const escaped = escapeHtml(line);
      const commentSplit = escaped.match(/^([^#]*?)(\s+#.*|#.*)$/);
      let body = escaped;
      let comment = "";
      if (commentSplit) {
        body = commentSplit[1];
        comment = `<span class="hl-comment">${commentSplit[2]}</span>`;
      }
      // strings
      body = body.replace(
        /(&quot;[^&]*?&quot;)/g,
        '<span class="hl-string">$1</span>',
      );
      // numbers
      body = body.replace(
        /(\b\d+(?:\.\d+)?\b)/g,
        '<span class="hl-number">$1</span>',
      );
      // keywords (word-boundary, case-sensitive)
      body = body.replace(/\b([A-Za-z_]\w*)\b/g, (_m, word) => {
        if (PSEUDO_KEYWORDS.has(word)) {
          return `<span class="hl-keyword">${word}</span>`;
        }
        return word;
      });
      // PATH_X labels
      body = body.replace(
        /\b(PATH_[A-Z]+|PATH [A-Z]+)\b/g,
        '<span class="hl-label">$1</span>',
      );
      return body + comment;
    })
    .join("\n");
};
