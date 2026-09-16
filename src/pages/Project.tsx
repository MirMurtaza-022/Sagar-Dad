import { useState } from "react";
import { useParams } from "react-router-dom";
import { adjacentProjects, getProject, type Film } from "@/data/content";
import { isPortrait } from "@/lib/images";
import { usePageTitle } from "@/lib/usePageTitle";
import { ImageReveal } from "@/components/ImageReveal";
import { ProjectGallery } from "@/components/ProjectGallery";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { TransitionLink } from "@/components/PageTransition";
import { VideoViewer } from "@/components/VideoViewer";
import { NotFound } from "@/pages/NotFound";

export function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  usePageTitle(project?.title);
  const [film, setFilm] = useState<Film | null>(null);

  if (!project) return <NotFound />;

  const { prev, next } = adjacentProjects(project.slug);
  const portraitCover = isPortrait(project.cover);
  const meta: [string, string][] = [
    ["Client", project.meta.client],
    ["Role", project.meta.role],
    ["Year", project.meta.year],
    ["Location", project.meta.location],
    ["Medium", project.meta.medium],
  ];

  return (
    <article>
      {/* Title block */}
      <header className="container-x pb-14 pt-36 md:pb-20 md:pt-48">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <Reveal className="col-span-12 flex items-center gap-4">
            <span className="label-sm text-accent">{project.number}</span>
            <span aria-hidden="true" className="h-px w-10 bg-line" />
            <span className="label text-muted">Project</span>
          </Reveal>
          <TextReveal
            as="h1"
            lines={[project.title]}
            className="display-statement col-span-12 text-[clamp(2.75rem,7vw,7rem)] lg:col-span-9"
          />
          <Reveal
            className="label col-span-12 flex flex-wrap gap-x-8 gap-y-2 text-muted lg:col-span-3 lg:flex-col lg:items-end lg:justify-end lg:gap-y-1"
            delay={0.2}
          >
            <span>{project.category}</span>
            <span>{project.year}</span>
            <span>{project.location}</span>
          </Reveal>
        </div>
      </header>

      {/* Hero */}
      {portraitCover ? (
        <div className="container-x">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="col-span-12 sm:col-span-10 sm:col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4">
              <ImageReveal
                image={project.cover}
                ratio="4/5"
                priority
                sizes="(min-width: 1024px) 50vw, (min-width: 768px) 66vw, 100vw"
              />
            </div>
          </div>
        </div>
      ) : (
        <ImageReveal
          image={project.cover}
          ratio={null}
          className="aspect-[4/5] sm:aspect-[3/2] md:aspect-[21/9]"
          priority
          sizes="100vw"
        />
      )}

      {/* Description + metadata */}
      <section className="container-x py-20 md:py-32" aria-label="About this project">
        <div className="grid grid-cols-12 gap-x-6 gap-y-14">
          <Reveal className="col-span-12 flex flex-col gap-7 md:col-span-7 md:col-start-2 lg:col-span-6 lg:col-start-3">
            {project.description.map((paragraph, i) => (
              <p key={i} className="font-display text-2xl font-light leading-snug md:text-[1.85rem]">
                {paragraph}
              </p>
            ))}
          </Reveal>
          <Reveal className="col-span-12 md:col-span-3 md:col-start-10" delay={0.1}>
            <dl className="flex flex-col border-t border-line">
              {meta.map(([term, value]) => (
                <div key={term} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                  <dt className="label-sm text-muted">{term}</dt>
                  <dd className="text-right text-sm">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Sequence */}
      <ProjectGallery items={project.gallery} onPlay={setFilm} />

      {/* Previous / next */}
      <nav aria-label="Project navigation" className="container-x mt-28 md:mt-44">
        <div className="grid grid-cols-2 border-t border-line">
          <TransitionLink
            to={`/work/${prev.slug}`}
            className="group flex flex-col gap-3 border-r border-line py-12 pr-6 md:py-20"
          >
            <span className="label-sm text-muted">← Previous project</span>
            <span className="font-display text-2xl font-light leading-none transition-transform duration-600 ease-editorial group-hover:-translate-x-2 md:text-4xl">
              {prev.title}
            </span>
            <span className="label text-muted">
              {prev.number} · {prev.category}
            </span>
          </TransitionLink>
          <TransitionLink
            to={`/work/${next.slug}`}
            className="group flex flex-col items-end gap-3 py-12 pl-6 text-right md:py-20"
          >
            <span className="label-sm text-muted">Next project →</span>
            <span className="font-display text-2xl font-light leading-none transition-transform duration-600 ease-editorial group-hover:translate-x-2 md:text-4xl">
              {next.title}
            </span>
            <span className="label text-muted">
              {next.number} · {next.category}
            </span>
          </TransitionLink>
        </div>
      </nav>

      <VideoViewer film={film} onClose={() => setFilm(null)} />
    </article>
  );
}
