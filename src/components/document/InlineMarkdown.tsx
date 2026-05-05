import { siteData } from "../../data/generated";
import { useDocumentHtml } from "../../lib";
import { handleMarkdownLinkClick } from "../../routing";

// Strip an entire <h2 id="slug">…</h2> heading and the run of HTML up
// to the next h2 / h3 at the same or higher level. Used by detail
// pages to suppress markdown sections that the page already renders
// as JSX cards (Mitigations, Real-world examples, etc.) so the same
// listing doesn't appear twice.
function stripSections(html: string, slugs: ReadonlyArray<string>): string {
  let result = html;
  for (const slug of slugs) {
    // Each section is <h2 id="slug"> ... </h2> followed by HTML until the
    // next <h2 id=...> or end of body. addHeadingIds ensures every h2
    // carries an id="slug" attribute.
    const re = new RegExp(
      `<h2 id="${slug}">[\\s\\S]*?(?=<h2 id="|$)`,
      "g",
    );
    result = result.replace(re, "");
  }
  return result;
}

export default function InlineMarkdown({
  path,
  onOpenDoc,
  hideSectionSlugs,
}: {
  path: string;
  onOpenDoc?: (path: string) => void;
  hideSectionSlugs?: ReadonlyArray<string>;
}) {
  const indexEntry = siteData.documentIndex[path as keyof typeof siteData.documentIndex];
  const documentHtml = useDocumentHtml(path);
  if (!indexEntry) {
    return <p className="document-state">Markdown content not available for this entry.</p>;
  }
  if (documentHtml.status === "loading") {
    return <p className="document-state">Loading document body…</p>;
  }
  if (documentHtml.status === "missing") {
    return <p className="document-state">Markdown content not available for this entry.</p>;
  }
  const html = hideSectionSlugs && hideSectionSlugs.length > 0
    ? stripSections(documentHtml.html, hideSectionSlugs)
    : documentHtml.html;
  return (
    <div
      className="markdown-body markdown-shell"
      onClick={
        onOpenDoc
          ? (event) => handleMarkdownLinkClick(event, path, onOpenDoc)
          : undefined
      }
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
