import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { useHref, useLocation, useNavigate } from "react-router-dom";
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from "@/lib/motion";
import { useScroll } from "@/components/SmoothScroll";

type TransitionApi = { go: (to: string) => void };

const TransitionContext = createContext<TransitionApi>({ go: () => {} });
const PageRefContext = createContext<RefObject<HTMLDivElement | null> | null>(null);

/**
 * Coordinates route changes: the outgoing page fades and lifts slightly,
 * the scroll position is reset while nothing is visible, then the incoming
 * page fades up. Honors prefers-reduced-motion by navigating instantly.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollTo } = useScroll();
  const pageRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const locationRef = useRef(location);
  locationRef.current = location;

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  }, []);

  const go = useCallback(
    (to: string) => {
      if (busy.current) return;
      const current = locationRef.current.pathname + locationRef.current.search;
      if (to === current) {
        scrollTo(0);
        return;
      }
      const el = pageRef.current;
      if (prefersReducedMotion() || !el) {
        window.scrollTo(0, 0);
        scrollTo(0, { immediate: true });
        navigate(to);
        return;
      }
      busy.current = true;
      gsap.to(el, {
        opacity: 0,
        y: -14,
        duration: 0.45,
        ease: EASE.in,
        onComplete: () => {
          // Reset scroll while the page is invisible so the next page's
          // scroll-triggered reveals are measured from the top.
          window.scrollTo(0, 0);
          scrollTo(0, { immediate: true });
          busy.current = false;
          navigate(to);
        },
      });
    },
    [navigate, scrollTo],
  );

  return (
    <TransitionContext.Provider value={{ go }}>
      <PageRefContext.Provider value={pageRef}>{children}</PageRefContext.Provider>
    </TransitionContext.Provider>
  );
}

export const usePageTransition = () => useContext(TransitionContext);

/** Wraps routed content. Re-keys on pathname so each page mounts fresh. */
export function PageTransition({ children }: { children: ReactNode }) {
  const pageRef = useContext(PageRefContext);
  const location = useLocation();
  const { scrollTo } = useScroll();
  const scrollToRef = useRef(scrollTo);
  scrollToRef.current = scrollTo;

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    scrollToRef.current(0, { immediate: true });
    const el = pageRef?.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { clearProps: "all" });
      ScrollTrigger.refresh();
      return;
    }

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: EASE.out,
        clearProps: "transform,opacity",
        onComplete: () => ScrollTrigger.refresh(),
      },
    );
    return () => {
      tween.kill();
    };
  }, [location.pathname, pageRef]);

  return (
    <div ref={pageRef} key={location.pathname}>
      {children}
    </div>
  );
}

type TransitionLinkProps = { to: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

/** A real anchor (keyboard + middle-click friendly) that routes through the page transition. */
export function TransitionLink({ to, onClick, children, ...rest }: TransitionLinkProps) {
  const { go } = usePageTransition();
  const href = useHref(to);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (rest.target && rest.target !== "_self") return;
    event.preventDefault();
    go(to);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
