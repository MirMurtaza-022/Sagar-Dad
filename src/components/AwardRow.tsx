import { cn } from "@/utils/cn";
import type { Award } from "@/data/content";
import { photoUrl } from "@/lib/images";
import { TransitionLink } from "@/components/PageTransition";

type AwardRowProps = {
  award: Award;
  /** `default`: year · status · award · project. `timeline`: status · award · project · category (year shown by the group). */
  variant?: "default" | "timeline";
};

/** One line of the recognition record. Hovering reveals a floating still via HoverPreview. */
export function AwardRow({ award, variant = "default" }: AwardRowProps) {
  const preview = award.image ? photoUrl(award.image, 480) : undefined;
  const rowClass = "group grid grid-cols-12 items-baseline gap-x-4 gap-y-1 py-6 md:py-7";
  const nameClass =
    "font-display text-2xl font-light leading-tight transition-transform duration-600 ease-editorial group-hover:translate-x-2 md:text-[1.75rem]";

  const content =
    variant === "timeline" ? (
      <>
        <span className="label col-span-12 text-accent md:col-span-3">{award.status}</span>
        <span className={cn(nameClass, "col-span-12 md:col-span-5")}>{award.name}</span>
        <span className="col-span-8 text-sm text-muted md:col-span-3">{award.project}</span>
        <span className="label-sm col-span-4 text-right text-muted md:col-span-1">{award.category}</span>
      </>
    ) : (
      <>
        <span className="label col-span-3 text-muted md:col-span-2">{award.year}</span>
        <span className="label col-span-9 text-accent md:col-span-3">{award.status}</span>
        <span className={cn(nameClass, "col-span-12 md:col-span-4")}>{award.name}</span>
        <span className="col-span-12 text-sm text-muted md:col-span-3 md:text-right">{award.project}</span>
      </>
    );

  return (
    <li className="border-t border-line last:border-b">
      {award.projectSlug ? (
        <TransitionLink
          to={`/work/${award.projectSlug}`}
          className={rowClass}
          data-preview={preview}
          aria-label={`${award.status}: ${award.name}, ${award.project}, ${award.year}`}
        >
          {content}
        </TransitionLink>
      ) : (
        <div className={rowClass} data-preview={preview}>
          {content}
        </div>
      )}
    </li>
  );
}
