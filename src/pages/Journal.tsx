import { useRef } from "react";
import { articles } from "@/data/content";
import { usePageTitle } from "@/lib/usePageTitle";
import { ArticleRow } from "@/components/ArticleRow";
import { HoverPreview } from "@/components/HoverPreview";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function JournalPage() {
  usePageTitle("Journal");
  const listRef = useRef<HTMLElement>(null);

  return (
    <section className="container-x pb-28 pt-36 md:pb-40 md:pt-48" aria-label="Journal">
      <SectionHeading
        as="h1"
        size="lg"
        label="Journal"
        title={["Stories, conversations and", "perspectives on the work."]}
        subtitle="Features, interviews and essays published about the practice."
      />
      <Reveal as="ul" containerRef={listRef} stagger={0.06} className="mt-20 md:mt-28">
        {articles.map((article) => (
          <ArticleRow key={article.slug} article={article} />
        ))}
      </Reveal>
      <HoverPreview listRef={listRef} />
    </section>
  );
}
