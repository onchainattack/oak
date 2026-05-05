import { siteData } from "../../data/generated";

type TocItem = { label: string; slug: string };

// In-page table of contents. Combines two sources:
//   1. The precompiled markdown TOC (siteData.documentIndex[path].toc) —
//      headings that live INSIDE the markdown body the page renders.
//   2. Optional extraItems — sections the page composes around the markdown
//      body in JSX (e.g. 'Mitigations', 'Worked Examples', 'Relationship
//      neighborhood' on the Technique detail page). The corresponding
//      <section> on the page must carry id={slug} for the anchor to scroll.
//
// extraItems are appended after the markdown TOC and rendered with the
// same anchor click handler — preventDefault + smooth scroll, no hash
// in the URL.

export default function DocumentToc({
  path,
  extraItems,
  hideSectionSlugs,
}: {
  path: string;
  extraItems?: ReadonlyArray<TocItem>;
  // Mirror of the same prop on InlineMarkdown — slugs hidden from the
  // rendered HTML body must also disappear from the TOC, otherwise the
  // sidebar shows a heading whose anchor target was removed.
  hideSectionSlugs?: ReadonlyArray<string>;
}) {
  const indexEntry = siteData.documentIndex[path as keyof typeof siteData.documentIndex];
  const hidden = new Set(hideSectionSlugs ?? []);
  const markdownItems = (indexEntry?.toc ?? [])
    .map((label) => ({
      label,
      slug: label
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    }))
    .filter((item) => !hidden.has(item.slug));
  const items: TocItem[] = [...markdownItems, ...(extraItems ?? [])];
  if (items.length === 0) return null;

  return (
    <nav className="document-toc" aria-label="On this page">
      {items.map(({ label, slug }) => (
        <a
          key={slug}
          href={`#${slug}`}
          onClick={(event) => {
            event.preventDefault();
            const heading = window.document.querySelector(`#${CSS.escape(slug)}`);
            if (heading) {
              heading.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
