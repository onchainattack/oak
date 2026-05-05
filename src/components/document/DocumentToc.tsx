import { siteData } from "../../data/generated";

// In-page table of contents derived from the document's precompiled TOC.
// Used in MarkdownDocument's sidebar AND on every detail page's sidebar
// so readers can jump to a section in the inlined markdown body without
// needing to open the raw view.

export default function DocumentToc({ path }: { path: string }) {
  const indexEntry = siteData.documentIndex[path as keyof typeof siteData.documentIndex];
  const toc = indexEntry?.toc;
  if (!toc || toc.length === 0) return null;

  return (
    <nav className="document-toc" aria-label="On this page">
      {toc.map((item) => {
        const slug = item
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
        return (
          <a
            key={item}
            href={`#${slug}`}
            onClick={(event) => {
              event.preventDefault();
              const heading = window.document.querySelector(`#${CSS.escape(slug)}`);
              if (heading) {
                heading.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            {item}
          </a>
        );
      })}
    </nav>
  );
}
