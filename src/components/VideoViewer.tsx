import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Film } from "@/data/content";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/motion";
import { useScroll } from "@/components/SmoothScroll";

type VideoViewerProps = {
  film: Film | null;
  onClose: () => void;
};

/**
 * Cinematic full-screen viewer. Playback starts silently — sound is opt-in —
 * with native controls kept for keyboard and assistive technology.
 */
export function VideoViewer({ film, onClose }: VideoViewerProps) {
  const { lock, unlock } = useScroll();
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [muted, setMuted] = useState(true);
  const open = film !== null;

  const requestClose = useCallback(() => {
    const el = root.current;
    videoRef.current?.pause();
    if (!el || prefersReducedMotion()) {
      onClose();
      return;
    }
    gsap.to(el, { opacity: 0, duration: 0.35, ease: EASE.in, onComplete: onClose });
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    setMuted(true);
    lock();
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        requestClose();
        return;
      }
      if (e.key === "Tab" && root.current) {
        const focusables = root.current.querySelectorAll<HTMLElement>("button, video, [href], [tabindex]:not([tabindex='-1'])");
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlock();
      previouslyFocused?.focus();
    };
  }, [open, lock, unlock, requestClose]);

  useGSAP(
    () => {
      const el = root.current;
      if (!open || !el || prefersReducedMotion()) return;
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
      gsap.fromTo(
        el.querySelector("[data-stage]"),
        { scale: 0.975, y: 12 },
        { scale: 1, y: 0, duration: 0.9, ease: EASE.out, clearProps: "transform" },
      );
    },
    { dependencies: [open], scope: root },
  );

  if (!film) return null;

  return createPortal(
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={`${film.title} — film viewer`}
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex flex-col bg-ink text-paper"
    >
      <div className="container-x label flex items-center justify-between gap-6 py-5">
        <p className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <span>{film.title}</span>
          <span className="text-paper/50">{film.year}</span>
          <span className="hidden text-paper/50 sm:inline">{film.duration}</span>
          <span className="hidden text-paper/50 md:inline">{film.category}</span>
        </p>
        <div className="flex items-center gap-6">
          <button
            type="button"
            aria-pressed={!muted}
            onClick={() => {
              const v = videoRef.current;
              if (!v) return;
              v.muted = !v.muted;
              setMuted(v.muted);
            }}
            className="link-line hidden sm:inline-flex items-center gap-2"
          >
            <span aria-hidden="true" className={`h-1 w-1 rounded-full ${muted ? "bg-paper/40" : "bg-accent"}`} />
            {muted ? "Sound off" : "Sound on"}
          </button>
          <button ref={closeRef} type="button" onClick={requestClose} className="link-line">
            Close ✕
          </button>
        </div>
      </div>

      <div
        className="container-x flex flex-1 items-center justify-center pb-10"
        onClick={(e) => {
          if (e.target === e.currentTarget) requestClose();
        }}
      >
        <div data-stage className="w-full max-w-[1400px]">
          <video
            ref={videoRef}
            className="aspect-video w-full bg-black outline-offset-4"
            src={film.src}
            poster={film.poster}
            controls
            autoPlay
            muted
            playsInline
            preload="metadata"
            aria-label={film.title}
            onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
