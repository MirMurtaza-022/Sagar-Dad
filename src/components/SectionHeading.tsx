import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { TransitionLink } from "@/components/PageTransition";

type SectionHeadingProps = {
  /** Small chapter index, e.g. "05" */
  index?: string;
  /** Uppercase label — the section's semantic heading. */
  label: string;
  /** Large serif statement, one entry per line. */
  title?: ReactNode[];
  subtitle?: string;
  action?: { label: string; to: string };
  dark?: boolean;
  className?: string;
  as?: "h1" | "h2";
  size?: "md" | "lg";
};

export function SectionHeading({
  index,
  label,
  title,
  subtitle,
  action,
  dark = false,
  className,
  as = "h2",
  size = "md",
}: SectionHeadingProps) {
  const Heading = as;
  return (
    <div className={cn("grid grid-cols-12 gap-x-6 gap-y-8", className)}>
      <Reveal className="col-span-12 flex items-center gap-4">
        {index && <span className="label-sm text-accent">{index}</span>}
        <span aria-hidden="true" className={cn("h-px w-10", dark ? "bg-paper/25" : "bg-line")} />
        <Heading className={cn("label", dark ? "text-paper/70" : "text-muted")}>{label}</Heading>
      </Reveal>

      {title && (
        <TextReveal
          as="p"
          lines={title}
          className={cn(
            "display-statement col-span-12 lg:col-span-9",
            size === "lg" ? "text-[clamp(2.4rem,5.2vw,5rem)]" : "text-[clamp(2rem,4.2vw,4rem)]",
          )}
        />
      )}

      {(subtitle || action) && (
        <div
          className={cn(
            "col-span-12 flex flex-col gap-6",
            title
              ? "lg:col-span-3 lg:items-end lg:justify-end lg:text-right"
              : "sm:flex-row sm:items-baseline sm:justify-between",
          )}
        >
          {subtitle && (
            <Reveal delay={0.15}>
              <p className={cn("max-w-xs text-sm leading-relaxed", dark ? "text-paper/70" : "text-muted")}>{subtitle}</p>
            </Reveal>
          )}
          {action && (
            <Reveal delay={0.25}>
              <TransitionLink to={action.to} className="label link-line">
                {action.label} →
              </TransitionLink>
            </Reveal>
          )}
        </div>
      )}
    </div>
  );
}
