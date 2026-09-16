import { useRef, useState } from "react";
import { artist, articles, awards, featuredFilm, projects, type Film } from "@/data/content";
import { photo, photoSrcSet, photoUrl } from "@/lib/images";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/motion";
import { usePageTitle } from "@/lib/usePageTitle";
import { ArticleRow } from "@/components/ArticleRow";
import { AwardRow } from "@/components/AwardRow";
import { FilmPreview } from "@/components/FilmPreview";
import { HoverPreview } from "@/components/HoverPreview";
import { ImageReveal } from "@/components/ImageReveal";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TextReveal } from "@/components/TextReveal";
import { TransitionLink } from "@/components/PageTransition";
import { VideoViewer } from "@/components/VideoViewer";

const heroImage = photo(13258166, 6016, 4016, "Mist enveloping a mountain range at dusk.");

export function Home() {
  usePageTitle();
  const [film, setFilm] = useState<Film | null>(null);

  return (
    <>
      <Hero />
      <Intro />
      <SelectedWork />
      <FilmSection onPlay={setFilm} />
      <Recognition />
      <Journal />
      <AboutSection />
      <Contact />
      <VideoViewer film={film} onClose={() => setFilm(null)} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 01 · Hero                                                           */
/* ------------------------------------------------------------------ */

function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const image = el.querySelector("[data-hero-image]");
      const items = el.querySelectorAll("[data-hero-item]");
      gsap
        .timeline({ defaults: { ease: EASE.out } })
        .fromTo(image, { opacity: 0, scale: 1.04 }, { opacity: 1, duration: 1.6, ease: "power2.out" }, 0)
        .to(image, { scale: 1, duration: 8, ease: EASE.slow }, 0)
        .fromTo(items, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.14 }, 0.6);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-theme="dark"
      aria-label="Introduction"
      className="relative flex h-[100svh] min-h-[600px] flex-col justify-end overflow-hidden bg-ink text-paper"
    >
      <div data-hero-image className="absolute inset-0 will-change-transform">
        <img
          src={photoUrl(heroImage, 1600)}
          srcSet={photoSrcSet(heroImage)}
          sizes="100vw"
          alt={heroImage.alt}
          width={heroImage.width}
          height={heroImage.height}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-ink/30 via-transparent to-ink/60" />

      <div className="container-x relative z-10 pb-8 md:pb-12">
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-9">
            <p data-hero-item className="label text-paper/75">
              {artist.roles}
            </p>
            <h1 data-hero-item className="mt-5 font-display text-[clamp(2.75rem,6.2vw,5.75rem)] font-light leading-[0.95] tracking-[-0.01em]">
              {artist.name}
            </h1>
            <p data-hero-item className="mt-6 max-w-xl font-display text-[clamp(1.4rem,2.2vw,2rem)] font-light italic leading-tight text-paper/85">
              {artist.statement}
            </p>
          </div>
          <div
            data-hero-item
            className="label col-span-12 flex items-end justify-between text-paper/70 md:col-span-3 md:flex-col md:items-end md:gap-4"
          >
            <span>Based in {artist.location}</span>
            <span aria-hidden="true">Scroll ↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 02 · Introduction                                                   */
/* ------------------------------------------------------------------ */

function Intro() {
  return (
    <section className="container-x py-28 md:py-44" aria-labelledby="intro-heading">
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <Reveal className="col-span-12 flex items-center gap-4 md:col-span-3">
          <span className="label-sm text-accent">01</span>
          <span aria-hidden="true" className="h-px w-10 bg-line" />
          <h2 id="intro-heading" className="label text-muted">
            Selected Practice
          </h2>
        </Reveal>
        <div className="col-span-12 md:col-span-9">
          <TextReveal
            as="p"
            lines={["Photography, film and visual", "stories shaped by people,", "places and moments."]}
            className="display-statement text-[clamp(2.25rem,5vw,4.75rem)]"
          />
          <div className="mt-14 grid grid-cols-12 gap-x-6 md:mt-20">
            <Reveal className="col-span-12 flex flex-col gap-7 md:col-span-7 md:col-start-6" delay={0.15}>
              <p className="text-base leading-[1.8] text-muted">{artist.bio[0]}</p>
              <TransitionLink to="/about" className="label link-line self-start">
                About the artist →
              </TransitionLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 03 · Selected work                                                  */
/* ------------------------------------------------------------------ */

function SelectedWork() {
  return (
    <section className="container-x py-12 md:py-20" aria-label="Selected work">
      <SectionHeading
        index="02"
        label="Selected Work"
        subtitle="Personal series, films and commissions, sequenced as they were made."
        action={{ label: "All projects", to: "/work" }}
      />
      <div className="mt-20 flex flex-col gap-y-28 md:mt-28 md:gap-y-44">
        {projects.slice(0, 4).map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 04 · Film                                                           */
/* ------------------------------------------------------------------ */

function FilmSection({ onPlay }: { onPlay: (film: Film) => void }) {
  return (
    <section data-theme="dark" className="mt-28 bg-ink py-28 text-paper md:mt-44 md:py-40" aria-label="Film">
      <div className="container-x">
        <SectionHeading dark index="03" label="Film" title={["Some stories are better", "experienced in motion."]} />
        <Reveal className="mt-16 md:mt-24">
          <FilmPreview film={featuredFilm} onPlay={onPlay} />
        </Reveal>
        {featuredFilm.projectSlug && (
          <Reveal className="mt-8 flex justify-end" delay={0.1}>
            <TransitionLink to={`/work/${featuredFilm.projectSlug}`} className="label link-line text-paper/70 hover:text-paper">
              See the project →
            </TransitionLink>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 05 · Recognition                                                    */
/* ------------------------------------------------------------------ */

function Recognition() {
  const listRef = useRef<HTMLElement>(null);
  return (
    <section className="container-x py-28 md:py-40" aria-label="Recognition">
      <SectionHeading
        index="04"
        label="Recognition"
        title={["A record of selected awards,", "exhibitions and honors."]}
        action={{ label: "Full archive", to: "/awards" }}
      />
      <Reveal as="ul" containerRef={listRef} stagger={0.06} className="mt-16 md:mt-24">
        {awards.slice(0, 5).map((award) => (
          <AwardRow key={award.id} award={award} />
        ))}
      </Reveal>
      <HoverPreview listRef={listRef} portrait={false} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 06 · Journal                                                        */
/* ------------------------------------------------------------------ */

function Journal() {
  const listRef = useRef<HTMLElement>(null);
  return (
    <section className="container-x py-12 md:py-20" aria-label="Journal">
      <SectionHeading
        index="05"
        label="Journal"
        title={["Stories, conversations and", "perspectives on the work."]}
        action={{ label: "All articles", to: "/journal" }}
      />
      <Reveal as="ul" containerRef={listRef} stagger={0.06} className="mt-16 md:mt-24">
        {articles.map((article) => (
          <ArticleRow key={article.slug} article={article} />
        ))}
      </Reveal>
      <HoverPreview listRef={listRef} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 07 · About                                                          */
/* ------------------------------------------------------------------ */

function AboutSection() {
  return (
    <section className="container-x py-28 md:py-44" aria-labelledby="about-heading">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 sm:col-span-8 md:col-span-5">
          <ImageReveal image={artist.portrait} ratio="4/5" sizes="(min-width: 768px) 40vw, (min-width: 640px) 66vw, 100vw" />
        </div>
        <div className="col-span-12 flex flex-col justify-center md:col-span-6 md:col-start-7">
          <Reveal className="flex items-center gap-4">
            <span className="label-sm text-accent">06</span>
            <span aria-hidden="true" className="h-px w-10 bg-line" />
            <h2 id="about-heading" className="label text-muted">
              About the artist
            </h2>
          </Reveal>
          <TextReveal
            as="p"
            lines={["Photographer, filmmaker", "and visual storyteller."]}
            className="display-statement mt-8 text-[clamp(2rem,3.6vw,3.5rem)]"
          />
          <Reveal className="mt-8 text-base leading-[1.8] text-muted" delay={0.1}>
            <p>{artist.bio[0]}</p>
          </Reveal>
          <Reveal className="mt-12" delay={0.15}>
            <p className="label-sm text-muted">Practice</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
              {artist.practice.map((item) => (
                <li key={item} className="border-t border-line py-2 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="mt-10" delay={0.2}>
            <TransitionLink to="/about" className="label link-line">
              Full biography →
            </TransitionLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 08 · Contact                                                        */
/* ------------------------------------------------------------------ */

function Contact() {
  const items = [
    { label: "Email", value: artist.email, href: artist.emailHref },
    { label: "Location", value: artist.location },
    { label: "Instagram", value: artist.instagram, href: artist.instagramHref, external: true },
    { label: "Vimeo", value: artist.vimeo, href: artist.vimeoHref, external: true },
  ];

  return (
    <section className="container-x border-t border-line py-28 md:py-44" aria-labelledby="contact-heading">
      <Reveal className="flex items-center gap-4">
        <span className="label-sm text-accent">07</span>
        <span aria-hidden="true" className="h-px w-10 bg-line" />
        <h2 id="contact-heading" className="label text-muted">
          Contact
        </h2>
      </Reveal>
      <TextReveal
        as="p"
        lines={["Let's make something", "worth remembering."]}
        className="display-statement mt-10 max-w-5xl text-[clamp(2.5rem,6.5vw,6.25rem)]"
      />
      <Reveal className="mt-16 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-24" stagger={0.08}>
        {items.map((item) => (
          <div key={item.label} className="col-span-6 flex flex-col gap-2 border-t border-line pt-4 md:col-span-3">
            <span className="label-sm text-muted">{item.label}</span>
            {item.href ? (
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className="link-line self-start text-base"
              >
                {item.value}
              </a>
            ) : (
              <span className="text-base">{item.value}</span>
            )}
          </div>
        ))}
      </Reveal>
    </section>
  );
}
