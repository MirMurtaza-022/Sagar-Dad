import { createElement, useRef, type ReactNode } from "react";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/motion";

type Tag = "h1" | "h2" | "h3" | "p" | "div" | "span" | "blockquote";

type TextRevealProps = {
  as?: Tag;
  /** Each entry is one line; lines are masked and rise one after another. */
  lines: ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
  /** Play on mount instead of waiting for scroll (hero use). */
  immediate?: boolean;
  id?: string;
};

export function TextReveal({
  as = "p",
  lines,
  className,
  delay = 0,
  stagger = 0.1,
  immediate = false,
  id,
}: TextRevealProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const targets = el.querySelectorAll("[data-line]");
      gsap.set(targets, { yPercent: 118 });
      gsap.to(targets, {
        yPercent: 0,
        duration: 1.05,
        ease: EASE.out,
        stagger,
        delay,
        scrollTrigger: immediate ? undefined : { trigger: el, start: "top 90%", once: true },
      });
    },
    { scope: root },
  );

  return createElement(
    as,
    { ref: root, className, id },
    lines.map((line, index) => (
      <span key={index} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
        <span data-line className="block will-change-transform">
          {line}
        </span>
      </span>
    )),
  );
}
