import { cn } from "@/utils/cn";
import type { Project } from "@/data/content";
import { ImageReveal } from "@/components/ImageReveal";
import { Reveal } from "@/components/Reveal";
import { TransitionLink } from "@/components/PageTransition";

type ProjectCardProps = {
  project: Project;
  layout?: Project["layout"];
  className?: string;
};

/**
 * Editorial project entry. Four compositions — large-left, large-right,
 * centred portrait and full-bleed — so the sequence never reads as a grid.
 * The whole card is one link; hover adds a slight scale, a faint veil and a
 * "View project" cue. Touch devices always see the cue.
 */
export function ProjectCard({ project, layout = project.layout, className }: ProjectCardProps) {
  const metaLine = [project.category, project.year, project.location].filter(Boolean).join(" · ");

  const cue = (
    <span
      className={cn(
        "label-sm mt-4 inline-flex items-center gap-2 text-ink",
        "-translate-x-2 opacity-0 transition-[opacity,translate] duration-500 ease-editorial",
        "group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
        "[@media(hover:none)]:translate-x-0 [@media(hover:none)]:opacity-100",
      )}
    >
      View project <span aria-hidden="true">→</span>
    </span>
  );

  const veil = (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-700 ease-editorial group-hover:bg-ink/10"
    />
  );

  if (layout === "full") {
    return (
      <article className={className}>
        <TransitionLink to={`/work/${project.slug}`} data-cursor="OPEN" className="group block">
          <div className="relative">
            <ImageReveal
              image={project.cover}
              ratio={null}
              className="aspect-[4/5] sm:aspect-[3/2] md:aspect-[21/9]"
              sizes="100vw"
              hover
            />
            {veil}
          </div>
          <Reveal className="mt-6 grid grid-cols-12 gap-x-6 gap-y-2 md:mt-8">
            <div className="col-span-12 flex items-baseline gap-5 md:col-span-8">
              <span className="label-sm text-accent">{project.number}</span>
              <h3 className="font-display text-[clamp(1.9rem,3.2vw,3.25rem)] font-light leading-[1.02]">{project.title}</h3>
            </div>
            <div className="col-span-12 flex flex-col md:col-span-4 md:items-end md:text-right">
              <p className="label text-muted">{metaLine}</p>
              {cue}
            </div>
          </Reveal>
        </TransitionLink>
      </article>
    );
  }

  if (layout === "portrait") {
    return (
      <article className={className}>
        <TransitionLink to={`/work/${project.slug}`} data-cursor="OPEN" className="group grid grid-cols-12 gap-x-6">
          <div className="relative col-span-12 sm:col-span-8 sm:col-start-3 md:col-span-6 md:col-start-4">
            <ImageReveal image={project.cover} ratio="4/5" sizes="(min-width: 768px) 50vw, (min-width: 640px) 66vw, 100vw" hover />
            {veil}
          </div>
          <Reveal className="col-span-12 mt-6 flex flex-col items-center text-center md:col-span-6 md:col-start-4 md:mt-8">
            <span className="label-sm text-accent">{project.number}</span>
            <h3 className="mt-3 font-display text-[clamp(1.9rem,3.2vw,3.25rem)] font-light leading-[1.02]">{project.title}</h3>
            <p className="label mt-3 text-muted">{metaLine}</p>
            {cue}
          </Reveal>
        </TransitionLink>
      </article>
    );
  }

  const right = layout === "right";

  return (
    <article className={className}>
      <TransitionLink
        to={`/work/${project.slug}`}
        data-cursor="OPEN"
        className="group grid grid-cols-12 items-end gap-x-6 gap-y-6"
      >
        <div className={cn("relative col-span-12 md:col-span-8 md:row-start-1", right ? "md:col-start-5" : "md:col-start-1")}>
          <ImageReveal image={project.cover} ratio="3/2" sizes="(min-width: 768px) 66vw, 100vw" hover />
          {veil}
        </div>
        <Reveal
          className={cn(
            "col-span-12 flex flex-col md:col-span-3 md:row-start-1 md:pb-1",
            right ? "md:col-start-1" : "md:col-start-10",
          )}
        >
          <span className="label-sm text-accent">{project.number}</span>
          <h3 className="mt-3 font-display text-[clamp(1.9rem,3vw,3rem)] font-light leading-[1.02]">{project.title}</h3>
          <p className="label mt-3 text-muted">{metaLine}</p>
          {cue}
        </Reveal>
      </TransitionLink>
    </article>
  );
}
