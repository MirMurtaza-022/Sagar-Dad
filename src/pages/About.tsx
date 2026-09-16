import { artist } from "@/data/content";
import { usePageTitle } from "@/lib/usePageTitle";
import { ImageReveal } from "@/components/ImageReveal";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function AboutPage() {
  usePageTitle("About");

  return (
    <article className="pt-36 md:pt-48">
      <header className="container-x pb-16 md:pb-24">
        <SectionHeading as="h1" size="lg" label="About the artist" title={["Photographer, filmmaker", "and visual storyteller."]} />
      </header>

      {/* Portrait + biography */}
      <section className="container-x" aria-label="Biography">
        <div className="grid grid-cols-12 gap-x-6 gap-y-14">
          <div className="col-span-12 sm:col-span-9 md:col-span-5">
            <ImageReveal image={artist.portrait} ratio="4/5" priority sizes="(min-width: 768px) 40vw, (min-width: 640px) 75vw, 100vw" />
            <p className="label-sm mt-3 flex justify-between text-muted">
              <span>{artist.name}</span>
              <span>{artist.location}</span>
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <Reveal>
              <h2 className="label text-muted">Biography</h2>
            </Reveal>
            <Reveal className="mt-6 flex flex-col gap-6 text-base leading-[1.85] text-ink/85" delay={0.1}>
              <p className="font-display text-2xl font-light leading-snug text-ink md:text-[1.75rem]">{artist.bio[0]}</p>
              {artist.bio.slice(1).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </Reveal>

            <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12">
              <Reveal className="col-span-12 sm:col-span-6" delay={0.1}>
                <h2 className="label-sm text-muted">Practice</h2>
                <ul className="mt-5 flex flex-col">
                  {artist.practice.map((item, i) => (
                    <li key={item} className="flex items-baseline justify-between gap-4 border-t border-line py-3">
                      <span className="font-display text-xl font-light">{item}</span>
                      <span className="label-sm text-muted">0{i + 1}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal className="col-span-12 sm:col-span-6" delay={0.15}>
                <h2 className="label-sm text-muted">Selected clients</h2>
                <ul className="mt-5 flex flex-col">
                  {artist.clients.map((client, i) => (
                    <li key={`${client}-${i}`} className="border-t border-line py-3 text-sm">
                      {client}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Interlude */}
      <div className="mt-28 md:mt-44">
        <ImageReveal image={artist.secondaryImage} ratio={null} className="aspect-[4/5] sm:aspect-[3/2] md:aspect-[21/9]" sizes="100vw" />
      </div>

      {/* Exhibitions + collaborations */}
      <section className="container-x py-28 md:py-40" aria-label="Exhibitions and collaborations">
        <div className="grid grid-cols-12 gap-x-6 gap-y-16">
          <Reveal className="col-span-12 md:col-span-3">
            <h2 className="label text-muted">Exhibitions</h2>
          </Reveal>
          <Reveal as="ul" className="col-span-12 md:col-span-9" stagger={0.06}>
            {artist.exhibitions.map((e, i) => (
              <li key={i} className="grid grid-cols-12 items-baseline gap-x-4 gap-y-1 border-t border-line py-5 last:border-b">
                <span className="label col-span-3 text-muted md:col-span-2">{e.year}</span>
                <span className="col-span-9 font-display text-2xl font-light leading-tight md:col-span-5">{e.title}</span>
                <span className="col-span-9 col-start-4 text-sm text-muted md:col-span-5 md:col-start-auto md:text-right">
                  {e.venue}, {e.location}
                </span>
              </li>
            ))}
          </Reveal>

          <Reveal className="col-span-12 md:col-span-3">
            <h2 className="label text-muted">Collaborations</h2>
          </Reveal>
          <Reveal as="ul" className="col-span-12 md:col-span-9" stagger={0.06}>
            {artist.collaborations.map((c, i) => (
              <li key={i} className="border-t border-line py-5 font-display text-2xl font-light leading-tight last:border-b">
                {c}
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Enquiries */}
      <section className="container-x border-t border-line py-20 md:py-28" aria-label="Enquiries">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <Reveal className="col-span-12 md:col-span-3">
            <h2 className="label text-muted">Enquiries</h2>
          </Reveal>
          <Reveal className="col-span-12 flex flex-col gap-6 md:col-span-9" delay={0.1}>
            <p className="max-w-2xl font-display text-2xl font-light leading-snug md:text-3xl">
              For commissions, exhibitions, print sales and press, write to{" "}
              <a href={artist.emailHref} className="link-line link-line-active">
                {artist.email}
              </a>
              .
            </p>
            <div className="label flex flex-wrap gap-x-8 gap-y-2 text-muted">
              <a href={artist.instagramHref} target="_blank" rel="noreferrer" className="link-line">
                Instagram
              </a>
              <a href={artist.vimeoHref} target="_blank" rel="noreferrer" className="link-line">
                Vimeo
              </a>
              <a href={artist.linkedinHref} target="_blank" rel="noreferrer" className="link-line">
                LinkedIn
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
