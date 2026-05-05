import { siteData } from "../../data/generated";
import { useDocumentHtml } from "../../lib";
import { handleMarkdownLinkClick, REPO_URL, reportIssueUrl } from "../../routing";
import { highlightYaml } from "../../highlight";
import Breadcrumb from "../layout/Breadcrumb";
import DocumentHero from "./DocumentHero";
import DocumentToc from "./DocumentToc";

export default function MarkdownDocument({
  path,
  onClose,
  onOpenDoc,
}: {
  path: string;
  onClose: () => void;
  onOpenDoc: (path: string) => void;
}) {
  const indexEntry = siteData.documentIndex[path as keyof typeof siteData.documentIndex];
  const documentHtml = useDocumentHtml(path);

  const documentKind = path.startsWith("examples/")
    ? "Incident"
    : path.startsWith("techniques/")
      ? "Technique"
      : path.startsWith("actors/")
        ? "Actor"
        : path.startsWith("tactics/")
          ? "Tactic"
          : path.startsWith("mitigations/")
            ? "Mitigation"
            : path.startsWith("software/")
              ? "Software"
              : "Document";

  const docBreadcrumb = [
    { label: documentKind === "Document" ? "Documents" : `${documentKind}s`, onClick: onClose },
    { label: indexEntry?.title ?? path },
  ];

  return (
    <section className="document-page">
      <Breadcrumb onBack={onClose} items={docBreadcrumb} />

      <div className="document-layout">
        <aside className="document-sidebar">
          <span>{documentKind}</span>
          <strong>{indexEntry?.title ?? path}</strong>
          <code>{path}</code>
          <DocumentToc path={path} />
          <div className="detail-actions detail-actions-stack">
            <a
              className="button button-secondary"
              href={reportIssueUrl(documentKind, path, indexEntry?.title ?? path)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Report inaccuracy
            </a>
            <a
              className="button button-secondary"
              href={`${REPO_URL}/blob/main/${path}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View source on GitHub
            </a>
          </div>
        </aside>

        <article className="markdown-shell">
          {!indexEntry && (
            <p className="document-state">
              This document is not in the precompiled site bundle yet.
            </p>
          )}
          {indexEntry && documentHtml.status === "loading" && (
            <p className="document-state">Loading document body…</p>
          )}
          {indexEntry && documentHtml.status === "missing" && (
            <p className="document-state">Document body not available.</p>
          )}
          {indexEntry && documentHtml.status === "loaded" && !path.endsWith(".md") && (
            <pre className="raw-document">
              <code
                dangerouslySetInnerHTML={{
                  __html: path.endsWith(".yml") || path.endsWith(".yaml")
                    ? highlightYaml(documentHtml.html)
                    : documentHtml.html,
                }}
              />
            </pre>
          )}
          {indexEntry && documentHtml.status === "loaded" && path.endsWith(".md") && (
            <>
              <DocumentHero
                kind={documentKind}
                path={path}
                title={indexEntry.title}
                meta={indexEntry.meta ?? []}
              />
              <div
                className="markdown-body"
                onClick={(event) => handleMarkdownLinkClick(event, path, onOpenDoc)}
                dangerouslySetInnerHTML={{ __html: documentHtml.html }}
              />
            </>
          )}
        </article>
      </div>
      </section>
  );
}

