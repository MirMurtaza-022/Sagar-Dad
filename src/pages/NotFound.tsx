import { usePageTitle } from "@/lib/usePageTitle";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { TransitionLink } from "@/components/PageTransition";

export function NotFound() {
  usePageTitle("Not found");
  return (
    <section className="container-x flex min-h-[70vh] flex-col justify-center pb-28 pt-40">
      <Reveal className="label flex items-center gap-4 text-muted">
        <span className="label-sm text-accent">404</span>
        <span aria-hidden="true" className="h-px w-10 bg-line" />
        <span>Page not found</span>
      </Reveal>
      <TextReveal as="h1" lines={["This frame is empty."]} className="display-statement mt-8 text-[clamp(2.5rem,6vw,6rem)]" />
      <Reveal className="mt-10" delay={0.2}>
        <TransitionLink to="/" className="label link-line">
          Return home →
        </TransitionLink>
      </Reveal>
    </section>
  );
}
