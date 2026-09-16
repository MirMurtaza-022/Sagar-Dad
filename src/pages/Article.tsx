import { useParams } from "react-router-dom";
import { adjacentArticle, getArticle, getProject } from "@/data/content";
import { usePageTitle } from "@/lib/usePageTitle";
import { ImageReveal } from "@/components/ImageReveal";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { TransitionLink } from "@/components/PageTransition";
import { NotFound } from "@/pages/NotFound";

export function ArticlePage() {
  const { slug } = useParams();
  const article = getArticle(slug);
  usePageTitle(article?.title);

  if (!article) return <NotFound />;

  const related = getProject(article.relatedProject);
  const next = adjacentArticle(article.slug);

  return (
    <article>
      {/* Masthead */}
      <header className="container-x pb-14 pt-36 md:pb-20 md:pt-48">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <Reveal className="label flex items-center gap-4 text-muted">
            <span>{article.publication}</span>
            <span aria-hidden="true" className="h-px w-6 bg-line" />
            <span>{article.category}</span>
          </Reveal>
          <TextReveal
            as="h1"
            lines={[article.title]}
            className="display-statement mt-8 text-[clamp(2.4rem,5.6vw,5.5rem)] uppercase tracking-[0.01em]"
          />
          <Reveal className="label-sm mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-muted" delay={0.2}>
            <span>Words by {article.author}</span>
            <span aria-hidden="true">·</span>
            <span>{article.date}</span>
          </Reveal>
        </div>
      </header>

      {/* Hero */}
      <div className="container-x">
        <ImageReveal image={article.hero} ratio={null} className="aspect-[4/5] sm:aspect-[3/2] md:aspect-[16/9]" priority sizes="100vw" />
        <p className="label-sm mt-3 text-muted">{article.hero.alt}</p>
      </div>

      {/* Body */}
      <div className="container-x py-20 md:py-28">
        <div className="mx-auto flex max-w-[68ch] flex-col gap-8">
          <Reveal>
            <p className="text-lg leading-[1.8] text-ink/85 md:text-[1.15rem]">{article.excerpt}</p>
          </Reveal>
          {article.body.map((block, i) =>
            block.type === "quote" ? (
              <Reveal key={i} className="my-6 md:my-10">
                <blockquote className="border-l border-accent pl-7 md:pl-10">
                  <p className="font-display text-3xl font-light italic leading-tight md:text-[2.5rem]">{block.text}</p>
                  {block.cite && <cite className="label-sm mt-5 block not-italic text-muted">— {block.cite}</cite>}
                </blockquote>
              </Reveal>
            ) : (
              <Reveal key={i}>
                <p className="text-base leading-[1.85] text-ink/85">{block.text}</p>
              </Reveal>
            ),
          )}
        </div>
      </div>

      {/* Additional photography */}
      <section className="container-x" aria-label="Additional photography">
        <div className="grid grid-cols-12 gap-x-4 md:gap-x-6">
          <div className="col-span-6 md:col-span-5 md:col-start-2">
            <ImageReveal image={article.gallery[0]} ratio="4/5" sizes="(min-width: 768px) 40vw, 50vw" />
          </div>
          <div className="col-span-6 md:col-span-4 md:col-start-8 md:mt-28">
            <ImageReveal image={article.gallery[1]} ratio="4/5" sizes="(min-width: 768px) 32vw, 50vw" delay={0.1} />
          </div>
        </div>
      </section>

      {/* Related project */}
      {related && (
        <section className="container-x py-28 md:py-40" aria-labelledby="related-heading">
          <Reveal className="flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-10 bg-line" />
            <h2 id="related-heading" className="label text-muted">
              Related project
            </h2>
          </Reveal>
          <TransitionLink
            to={`/work/${related.slug}`}
            data-cursor="OPEN"
            className="group mt-10 grid grid-cols-12 items-center gap-x-6 gap-y-6"
          >
            <div className="col-span-5 md:col-span-3">
              <ImageReveal image={related.cover} ratio="4/5" sizes="(min-width: 768px) 25vw, 40vw" hover />
            </div>
            <Reveal className="col-span-7 flex flex-col md:col-span-6 md:col-start-5">
              <span className="label-sm text-accent">{related.number}</span>
              <span className="mt-3 font-display text-[clamp(1.75rem,3.5vw,3.5rem)] font-light leading-[1.02]">{related.title}</span>
              <span className="label mt-3 text-muted">
                {related.category} · {related.year}
              </span>
              <span className="label-sm mt-5 inline-flex items-center gap-2 transition-transform duration-500 ease-editorial group-hover:translate-x-1">
                View project <span aria-hidden="true">→</span>
              </span>
            </Reveal>
          </TransitionLink>
        </section>
      )}

      {/* Next article */}
      <nav aria-label="Article navigation" className="container-x">
        <TransitionLink
          to={`/journal/${next.slug}`}
          className="group flex flex-col gap-3 border-t border-line py-12 md:flex-row md:items-baseline md:justify-between md:py-16"
        >
          <span className="label-sm text-muted">Next article →</span>
          <span className="font-display text-2xl font-light uppercase leading-none tracking-[0.02em] transition-transform duration-600 ease-editorial group-hover:translate-x-2 md:text-4xl">
            {next.title}
          </span>
          <span className="label text-muted">
            {next.publication} · {next.year}
          </span>
        </TransitionLink>
      </nav>
    </article>
  );
}
