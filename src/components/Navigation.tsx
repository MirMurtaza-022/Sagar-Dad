import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import { artist, navLinks } from "@/data/content";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/motion";
import { TransitionLink } from "@/components/PageTransition";
import { useScroll } from "@/components/SmoothScroll";

/**
 * Fixed, scroll-aware navigation.
 * - Compacts and softens once the page has scrolled.
 * - Hides on downward scroll, returns on upward scroll.
 * - Switches to light text while a `data-theme="dark"` section sits beneath it.
 */
export function Navigation() {
  const location = useLocation();
  const { lock, unlock } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [onDark, setOnDark] = useState(() => location.pathname === "/");
  const [open, setOpen] = useState(false);
  const openRef = useRef(open);
  openRef.current = open;
  const wasOpen = useRef(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  /* Scroll behaviour */
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 64);
      const delta = y - last;
      if (Math.abs(delta) > 8) {
        setHidden(delta > 0 && y > 360 && !openRef.current);
        last = y;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Light-on-dark detection: observe the strip of viewport the nav occupies */
  useEffect(() => {
    setHidden(false);
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-theme="dark"]'));
    if (sections.length === 0) {
      setOnDark(false);
      return;
    }
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setOnDark(visible.size > 0);
      },
      { rootMargin: "0px 0px -94% 0px", threshold: 0 },
    );
    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, [location.pathname]);

  /* Close on route change */
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  /* Scroll lock, focus management, escape */
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      setHidden(false);
      lock();
      const id = requestAnimationFrame(() => {
        document.querySelector<HTMLElement>("#mobile-menu a")?.focus();
      });
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        cancelAnimationFrame(id);
        window.removeEventListener("keydown", onKey);
      };
    }
    unlock();
    if (wasOpen.current) {
      wasOpen.current = false;
      menuButtonRef.current?.focus();
    }
  }, [open, lock, unlock]);

  const light = onDark && !open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[translate,padding,opacity,color] duration-500 ease-editorial",
          hidden ? "-translate-y-full" : "translate-y-0",
          scrolled ? "py-4 opacity-85 focus-within:opacity-100 hover:opacity-100" : "py-6 md:py-8",
          light ? "text-paper" : "text-ink",
        )}
      >
        {/* Soft fade behind the compacted nav so passing text never collides with it */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[170%] transition-opacity duration-500 ease-editorial",
            scrolled && !open ? "opacity-100" : "opacity-0",
            light ? "bg-linear-to-b from-ink/70 via-ink/30 to-ink/0" : "bg-linear-to-b from-paper via-paper/85 to-paper/0",
          )}
        />
        <nav aria-label="Primary" className="container-x flex items-center justify-between">
          <TransitionLink to="/" className="label link-line" aria-label={`${artist.name} — home`}>
            {artist.name}
          </TransitionLink>

          <ul className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => {
              const active = location.pathname === link.to || location.pathname.startsWith(link.to + "/");
              return (
                <li key={link.to}>
                  <TransitionLink
                    to={link.to}
                    aria-current={active ? "page" : undefined}
                    className={cn("label link-line inline-flex items-center gap-2", active && "link-line-active")}
                  >
                    {active && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />}
                    {link.label}
                  </TransitionLink>
                </li>
              );
            })}
          </ul>

          <button
            ref={menuButtonRef}
            type="button"
            className="label md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </nav>
      </header>

      <MobileMenu open={open} />
    </>
  );
}

function MobileMenu({ open }: { open: boolean }) {
  const [mounted, setMounted] = useState(open);
  const root = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !mounted) return;
      const items = el.querySelectorAll("[data-menu-item]");

      if (open) {
        if (prefersReducedMotion()) {
          gsap.set(el, { opacity: 1 });
          gsap.set(items, { opacity: 1, y: 0 });
          return;
        }
        gsap
          .timeline()
          .fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power2.out" })
          .fromTo(items, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: EASE.out }, 0.1);
        return;
      }

      if (prefersReducedMotion()) {
        setMounted(false);
        return;
      }
      gsap.to(el, { opacity: 0, duration: 0.35, ease: EASE.in, onComplete: () => setMounted(false) });
    },
    { dependencies: [open, mounted], scope: root },
  );

  if (!mounted) return null;

  return (
    <div
      ref={root}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      data-lenis-prevent
      className="fixed inset-0 z-40 flex flex-col justify-between bg-paper px-5 pb-8 pt-28 text-ink md:hidden"
    >
      <nav aria-label="Mobile">
        <ul className="flex flex-col">
          {navLinks.map((link, index) => {
            const active = location.pathname === link.to || location.pathname.startsWith(link.to + "/");
            return (
              <li key={link.to} data-menu-item className="border-t border-line first:border-t-0">
                <TransitionLink
                  to={link.to}
                  aria-current={active ? "page" : undefined}
                  className="flex items-baseline justify-between py-5"
                >
                  <span className="font-display text-5xl font-light leading-none">{link.label}</span>
                  <span className={cn("label-sm", active ? "text-accent" : "text-muted")}>0{index + 1}</span>
                </TransitionLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div data-menu-item className="flex flex-col gap-4 border-t border-line pt-6">
        <p className="font-display text-2xl font-light italic leading-tight">{artist.statement}</p>
        <div className="label-sm flex flex-wrap justify-between gap-3 text-muted">
          <a href={artist.emailHref} className="link-line">
            {artist.email}
          </a>
          <a href={artist.instagramHref} className="link-line" target="_blank" rel="noreferrer">
            {artist.instagram}
          </a>
        </div>
      </div>
    </div>
  );
}
