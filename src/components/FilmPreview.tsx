import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import type { Film } from "@/data/content";
import { isFinePointer, prefersReducedMotion } from "@/lib/motion";

type FilmPreviewProps = {
  film: Film;
  onPlay: (film: Film) => void;
  dark?: boolean;
  showMeta?: boolean;
  className?: string;
};

/**
 * Cinematic still with a minimal play indicator. On desktop a silent preview
 * starts streaming only while hovered (nothing is fetched otherwise), and
 * only once the block is near the viewport.
 */
export function FilmPreview({ film, onPlay, dark = true, showMeta = true, className }: FilmPreviewProps) {
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el || !isFinePointer() || prefersReducedMotion()) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const startPreview = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => undefined);
  };
  const stopPreview = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    setPlaying(false);
  };

  return (
    <div ref={root} className={className}>
      <button
        type="button"
        onClick={() => onPlay(film)}
        onPointerEnter={startPreview}
        onPointerLeave={stopPreview}
        onFocus={startPreview}
        onBlur={stopPreview}
        data-cursor="PLAY"
        aria-label={`Play ${film.title}`}
        className="group relative block aspect-[4/5] w-full overflow-hidden bg-plate-dark text-left sm:aspect-video md:aspect-[21/9]"
      >
        <img
          src={film.poster}
          alt={film.posterAlt}
          loading="lazy"
          decoding="async"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.03]"
        />
        {near && (
          <video
            ref={videoRef}
            src={film.src}
            muted
            loop
            playsInline
            preload="none"
            tabIndex={-1}
            aria-hidden="true"
            onPlaying={() => setPlaying(true)}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-editorial",
              playing ? "opacity-100" : "opacity-0",
            )}
          />
        )}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-ink/15 transition-colors duration-700 ease-editorial group-hover:bg-ink/25"
        />
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/80 text-paper transition-transform duration-700 ease-editorial group-hover:scale-110 md:h-20 md:w-20"
        >
          <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" className="ml-0.5">
            <path d="M0 0L14 8L0 16V0Z" />
          </svg>
        </span>
        <span aria-hidden="true" className="label-sm absolute bottom-5 left-5 text-paper/80">
          Play film
        </span>
        <span aria-hidden="true" className="label-sm absolute bottom-5 right-5 text-paper/80">
          {film.duration}
        </span>
      </button>

      {showMeta && (
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between md:mt-6">
          <h3 className={cn("font-display text-3xl font-light leading-none md:text-4xl", dark ? "text-paper" : "text-ink")}>
            {film.title}
          </h3>
          <p className={cn("label", dark ? "text-paper/60" : "text-muted")}>
            {film.year} · {film.duration} · {film.category}
          </p>
        </div>
      )}
    </div>
  );
}
