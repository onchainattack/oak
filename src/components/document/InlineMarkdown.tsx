import { siteData } from "../../data/generated";
import { useDocumentHtml } from "../../lib";

export default function InlineMarkdown({ path }: { path: string }) {
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
  return (
    <div
      className="markdown-body markdown-shell"
      dangerouslySetInnerHTML={{ __html: documentHtml.html }}
    />
  );
}
