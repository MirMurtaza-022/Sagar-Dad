import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { gsap, EASE, isFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * Minimal custom cursor for fine-pointer devices only.
 * A small dot follows the pointer; over elements marked `data-cursor="OPEN"`
 * (or VIEW / PLAY) it expands into a labelled disc. Touch devices and users
 * who prefer reduced motion keep the native cursor.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const activeRef = useRef<Element | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (isFinePointer() && !prefersReducedMotion()) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    document.documentElement.classList.add("has-cursor");

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(ring, { scale: 0.6 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.34, ease: EASE.out });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.34, ease: EASE.out });

    let shown = false;

    const hideRing = () => {
      activeRef.current = null;
      gsap.to(ring, { opacity: 0, scale: 0.6, duration: 0.35, ease: EASE.out, overwrite: "auto" });
      gsap.to(dot, { scale: 1, duration: 0.3, overwrite: "auto" });
    };

    const onMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      if (!shown) {
        shown = true;
        gsap.to(dot, { opacity: 1, duration: 0.3 });
      }
    };

    const onOver = (e: PointerEvent) => {
      const el = e.target as Element | null;
      if (!el) return;
      const target = el.closest("[data-cursor]");
      if (target) {
        if (target === activeRef.current) return;
        activeRef.current = target;
        label.textContent = target.getAttribute("data-cursor") ?? "";
        gsap.to(ring, { opacity: 1, scale: 1, duration: 0.45, ease: EASE.out, overwrite: "auto" });
        gsap.to(dot, { scale: 0, duration: 0.3, overwrite: "auto" });
        return;
      }
      const interactive = el.closest("a, button, [role='button'], summary");
      gsap.to(dot, { scale: interactive ? 2.2 : 1, duration: 0.35, ease: EASE.out, overwrite: "auto" });
    };

    const onOut = (e: PointerEvent) => {
      const active = activeRef.current;
      if (!active) return;
      const to = e.relatedTarget as Node | null;
      if (to && active.contains(to)) return;
      hideRing();
    };

    const onLeaveWindow = () => {
      shown = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };

    const onDown = () => {
      if (activeRef.current) gsap.to(ring, { scale: 0.92, duration: 0.2, overwrite: "auto" });
    };
    const onUp = () => {
      if (activeRef.current) gsap.to(ring, { scale: 1, duration: 0.3, overwrite: "auto" });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [enabled]);

  // Reset the expanded state whenever the route changes (the hovered element is gone).
  useEffect(() => {
    if (!enabled || !ringRef.current || !dotRef.current) return;
    activeRef.current = null;
    gsap.to(ringRef.current, { opacity: 0, scale: 0.6, duration: 0.3, overwrite: "auto" });
    gsap.to(dotRef.current, { scale: 1, duration: 0.3, overwrite: "auto" });
  }, [location.pathname, enabled]);

  if (!enabled) return null;

  return createPortal(
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] h-2.5 w-2.5 rounded-full bg-paper mix-blend-difference will-change-transform"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] flex h-[88px] w-[88px] items-center justify-center rounded-full bg-paper text-ink will-change-transform"
      >
        <span ref={labelRef} className="label-sm" />
      </div>
    </>,
    document.body,
  );
}
