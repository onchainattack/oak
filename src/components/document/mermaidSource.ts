/** Fenced `mermaid` already contains its declaration; shorthand fences may not. */
export function mermaidSource(raw: string, language?: string): string {
  if (!language || language === "mermaid") return raw;
  if (raw.trimStart().startsWith(language)) return raw;
  return `${language}\n${raw}`;
}
