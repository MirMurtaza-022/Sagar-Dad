import { cn } from "@/utils/cn";
import type { Film, GalleryItem } from "@/data/content";
import type { Photo } from "@/lib/images";
import { ImageReveal } from "@/components/ImageReveal";
import { Reveal } from "@/components/Reveal";
import { FilmPreview } from "@/components/FilmPreview";

type ProjectGalleryProps = {
  items: GalleryItem[];
  onPlay: (film: Film) => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

function Plate({ index, caption, className }: { index: number; caption?: string; className?: string }) {
  return (
    <figcaption className={cn("label-sm mt-3 flex items-baseline justify-between gap-6 text-muted", className)}>
      <span>{caption ?? ""}</span>
      <span>Plate {pad(index)}</span>
    </figcaption>
  );
}

/**
 * Sequenced like a visual essay: full-width, offset landscape, centred
 * portrait, editorial pairs, full-bleed cinematic frames, film and short
 * text interludes. Never a uniform card grid.
 */
export function ProjectGallery({ items, onPlay }: ProjectGalleryProps) {
  let plate = 0;
  const next = () => ++plate;

  return (
    <div className="flex flex-col gap-y-16 md:gap-y-28">
      {items.map((item, i) => {
        switch (item.type) {
          case "full": {
            const n = next();
            return (
              <figure key={i} className="container-x">
                <ImageReveal image={item.image} ratio="3/2" sizes="100vw" />
                <Plate index={n} caption={item.caption} />
              </figure>
            );
          }
          case "landscape": {
            const n = next();
            const right = item.align === "right";
            return (
              <figure key={i} className="container-x grid grid-cols-12 gap-x-6">
                <div className={cn("col-span-12 md:col-span-9", right ? "md:col-start-4" : "md:col-start-1")}>
                  <ImageReveal image={item.image} ratio="3/2" sizes="(min-width: 768px) 75vw, 100vw" />
                  <Plate index={n} caption={item.caption} />
                </div>
              </figure>
            );
          }
          case "portrait": {
            const n = next();
            const col =
              item.align === "left"
                ? "md:col-span-5 md:col-start-2"
                : item.align === "right"
                  ? "md:col-span-5 md:col-start-7"
                  : "md:col-span-6 md:col-start-4";
            return (
              <figure key={i} className="container-x grid grid-cols-12 gap-x-6">
                <div className={cn("col-span-12 sm:col-span-8 sm:col-start-3", col)}>
                  <ImageReveal image={item.image} ratio="4/5" sizes="(min-width: 768px) 45vw, (min-width: 640px) 66vw, 100vw" />
                  <Plate index={n} caption={item.caption} />
                </div>
              </figure>
            );
          }
          case "pair": {
            const a = next();
            const b = next();
            const [first, second] = item.images as [Photo, Photo];
            return (
              <figure key={i} className="container-x grid grid-cols-12 gap-x-4 md:gap-x-6">
                <div className="col-span-6 md:col-span-5 md:col-start-2">
                  <ImageReveal image={first} ratio="4/5" sizes="(min-width: 768px) 40vw, 50vw" />
                  <Plate index={a} />
                </div>
                <div className="col-span-6 md:col-span-4 md:col-start-8 md:mt-28">
                  <ImageReveal image={second} ratio="4/5" sizes="(min-width: 768px) 32vw, 50vw" delay={0.1} />
                  <Plate index={b} />
                </div>
                {item.caption && (
                  <figcaption className="label-sm col-span-12 mt-3 text-muted md:col-span-5 md:col-start-2">{item.caption}</figcaption>
                )}
              </figure>
            );
          }
          case "cinematic": {
            const n = next();
            return (
              <figure key={i}>
                <ImageReveal
                  image={item.image}
                  ratio={null}
                  className="aspect-[4/5] sm:aspect-[3/2] md:aspect-[21/9]"
                  sizes="100vw"
                />
                <Plate index={n} caption={item.caption} className="container-x" />
              </figure>
            );
          }
          case "video":
            return (
              <div key={i} className="container-x">
                <Reveal>
                  <FilmPreview film={item.film} onPlay={onPlay} dark={false} />
                </Reveal>
              </div>
            );
          case "text":
            return (
              <div key={i} className="container-x">
                <Reveal>
                  <p className="mx-auto max-w-2xl text-center font-display text-2xl font-light italic leading-snug text-ink/80 md:text-[2rem]">
                    {item.text}
                  </p>
                </Reveal>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
