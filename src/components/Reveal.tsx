import { createElement, useCallback, useRef, type ReactNode, type RefObject } from "react";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/motion";

type Tag = "div" | "section" | "ul" | "li" | "p" | "header" | "footer" | "figure" | "aside" | "span";

type RevealProps = {
  children: ReactNode;
  as?: Tag;
  className?: string;
  delay?: number;
  y?: number;
  /** Animate direct children one after another. */
  stagger?: number;
  id?: string;
  /** Optional external ref to the rendered element. */
  containerRef?: RefObject<HTMLElement | null>;
};

/** Scroll-triggered fade + gentle rise. Static under reduced motion. */
export function Reveal({ children, as = "div", className, delay = 0, y = 24, stagger, id, containerRef }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      ref.current = node;
      if (containerRef) containerRef.current = node;
    },
    [containerRef],
  );

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const targets = stagger ? Array.from(el.children) : el;
      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.9,
        ease: EASE.out,
        delay,
        stagger,
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    },
    { scope: ref },
  );

  return createElement(as, { ref: setRef, className, id }, children);
}
