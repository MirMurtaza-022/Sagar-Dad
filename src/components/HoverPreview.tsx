import { useEffect, useRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import { gsap, EASE, isFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * A small floating image that follows the pointer while hovering rows marked
 * with `data-preview="<image url>"` inside `listRef`. Desktop only.
 */
export function HoverPreview({ listRef, portrait = true }: { listRef: RefObject<HTMLElement | null>; portrait?: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const el = box.current;
    const image = img.current;
    if (!list || !el || !image || !isFinePointer() || prefersReducedMotion()) return;

    gsap.set(el, { opacity: 0, scale: 0.94, xPercent: 8, yPercent: -50 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.55, ease: EASE.out });
    const yTo = gsap.quickTo(el, "y", { duration: 0.55, ease: EASE.out });

    let current: string | null = null;

    const rowFrom = (target: EventTarget | null) =>
      target instanceof Element ? target.closest<HTMLElement>("[data-preview]") : null;

    const onOver = (e: PointerEvent) => {
      const row = rowFrom(e.target);
      if (!row) return;
      const src = row.dataset.preview ?? "";
      if (src !== current) {
        current = src;
        image.src = src;
      }
      xTo(e.clientX, e.clientX);
      yTo(e.clientY, e.clientY);
      gsap.to(el, { opacity: 1, scale: 1, duration: 0.5, ease: EASE.out, overwrite: "auto" });
    };

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onOut = (e: PointerEvent) => {
      const row = rowFrom(e.target);
      if (!row) return;
      const to = e.relatedTarget as Node | null;
      if (to && row.contains(to)) return;
      gsap.to(el, { opacity: 0, scale: 0.94, duration: 0.4, ease: EASE.out, overwrite: "auto" });
    };

    list.addEventListener("pointerover", onOver);
    list.addEventListener("pointermove", onMove, { passive: true });
    list.addEventListener("pointerout", onOut);
    return () => {
      list.removeEventListener("pointerover", onOver);
      list.removeEventListener("pointermove", onMove);
      list.removeEventListener("pointerout", onOut);
    };
  }, [listRef]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={box}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-40 w-40 overflow-hidden bg-plate opacity-0 will-change-transform lg:w-52 ${portrait ? "aspect-[4/5]" : "aspect-[3/2]"}`}
    >
      <img ref={img} alt="" className="h-full w-full object-cover" />
    </div>,
    document.body,
  );
}
