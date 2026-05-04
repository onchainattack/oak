import { siteData } from "../../data/generated";
import { useDocumentHtml } from "../../lib";
import { handleMarkdownLinkClick } from "../../routing";

export default function InlineMarkdown({
  path,
  onOpenDoc,
}: {
  path: string;
  onOpenDoc?: (path: string) => void;
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
  return (
    <div
      className="markdown-body markdown-shell"
      onClick={
        onOpenDoc
          ? (event) => handleMarkdownLinkClick(event, path, onOpenDoc)
          : undefined
      }
      dangerouslySetInnerHTML={{ __html: documentHtml.html }}
    />
  );
}
