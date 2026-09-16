import type { Article } from "@/data/content";
import { photoUrl } from "@/lib/images";
import { TransitionLink } from "@/components/PageTransition";

/** Large horizontal journal entry. Hover shifts the title and floats a related still. */
export function ArticleRow({ article }: { article: Article }) {
  return (
    <li className="border-t border-line last:border-b">
      <TransitionLink
        to={`/journal/${article.slug}`}
        data-preview={photoUrl(article.image, 480)}
        className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-3 py-8 md:py-10"
      >
        <span className="label-sm col-span-2 text-accent md:col-span-1">{article.number}</span>
        <h3 className="col-span-10 font-display text-[clamp(1.75rem,3.2vw,3rem)] font-light uppercase leading-[1.05] tracking-[0.02em] transition-transform duration-600 ease-editorial group-hover:translate-x-3 md:col-span-7">
          {article.title}
        </h3>
        <span className="label col-span-10 col-start-3 text-muted md:col-span-3 md:col-start-auto">
          {article.publication} · {article.year}
        </span>
        <span className="label-sm col-span-10 col-start-3 text-muted md:col-span-1 md:col-start-auto md:text-right">
          {article.category}
        </span>
      </TransitionLink>
    </li>
  );
}
