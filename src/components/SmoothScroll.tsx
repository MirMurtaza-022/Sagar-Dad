import Lenis from "lenis";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

type ScrollTarget = number | string | HTMLElement;

type ScrollApi = {
  lenis: Lenis | null;
  scrollTo: (target: ScrollTarget, options?: { immediate?: boolean; offset?: number }) => void;
  lock: () => void;
  unlock: () => void;
};

const noop = () => {};

const ScrollContext = createContext<ScrollApi>({ lenis: null, scrollTo: noop, lock: noop, unlock: noop });

/**
 * Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger and the
 * scroll position always agree. Disabled entirely when the user prefers
 * reduced motion — native scrolling is used instead.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({
      autoRaf: false,
      lerp: 0.09,
      smoothWheel: true,
      anchors: false,
    });

    const onScroll = () => ScrollTrigger.update();
    instance.on("scroll", onScroll);

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  const api = useMemo<ScrollApi>(
    () => ({
      lenis,
      scrollTo: (target, options) => {
        if (lenis) {
          lenis.scrollTo(target, { immediate: options?.immediate, offset: options?.offset ?? 0, force: true });
          return;
        }
        const behavior: ScrollBehavior = options?.immediate ? "auto" : "smooth";
        if (typeof target === "number") {
          window.scrollTo({ top: target, behavior });
          return;
        }
        const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
        el?.scrollIntoView({ behavior, block: "start" });
      },
      lock: () => {
        lenis?.stop();
        document.documentElement.style.overflow = "hidden";
      },
      unlock: () => {
        lenis?.start();
        document.documentElement.style.overflow = "";
      },
    }),
    [lenis],
  );

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>;
}

export const useScroll = () => useContext(ScrollContext);
