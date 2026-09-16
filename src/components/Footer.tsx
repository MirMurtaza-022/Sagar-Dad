import { useLocation } from "react-router-dom";
import { artist, navLinks } from "@/data/content";
import { TransitionLink } from "@/components/PageTransition";
import { useScroll } from "@/components/SmoothScroll";

const pageLabel = (pathname: string) => {
  if (pathname === "/") return "Home";
  if (pathname.startsWith("/work/")) return "Project";
  if (pathname.startsWith("/journal/")) return "Article";
  const match = navLinks.find((l) => pathname.startsWith(l.to));
  return match ? match.label : "Index";
};

export function Footer() {
  const year = new Date().getFullYear();
  const location = useLocation();
  const { scrollTo } = useScroll();

  const social = [
    { label: "Instagram", value: artist.instagram, href: artist.instagramHref },
    { label: "Vimeo", value: artist.vimeo, href: artist.vimeoHref },
    { label: "LinkedIn", value: artist.linkedin, href: artist.linkedinHref },
  ];

  return (
    <footer className="container-x border-t border-line py-14 md:py-20">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 md:col-span-4">
          <p className="font-display text-3xl font-light leading-none">{artist.name}</p>
          <p className="label mt-3 text-muted">{artist.roles}</p>
          <p className="mt-6 max-w-xs font-display text-xl font-light italic leading-snug text-muted">
            {artist.statement}
          </p>
        </div>

        <nav aria-label="Footer" className="col-span-6 md:col-span-3">
          <p className="label-sm mb-5 text-muted">Index</p>
          <ul className="flex flex-col gap-2">
            <li>
              <TransitionLink to="/" className="label link-line">
                Home
              </TransitionLink>
            </li>
            {navLinks.map((link) => (
              <li key={link.to}>
                <TransitionLink to={link.to} className="label link-line">
                  {link.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-6 md:col-span-3">
          <p className="label-sm mb-5 text-muted">Elsewhere</p>
          <ul className="flex flex-col gap-2">
            {social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="label link-line">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a href={artist.emailHref} className="label link-line">
                Email
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-12 md:col-span-2 md:text-right">
          <button type="button" onClick={() => scrollTo(0)} className="label link-line">
            Back to top ↑
          </button>
        </div>
      </div>

      <div className="label-sm mt-16 flex flex-col gap-3 text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {artist.name}. All rights reserved.
        </p>
        <p className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-line" />
          <span>
            {pageLabel(location.pathname)} — {year}
          </span>
        </p>
      </div>
    </footer>
  );
}
