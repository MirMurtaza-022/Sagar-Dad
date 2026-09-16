import { useMemo, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { awards, type AwardCategory } from "@/data/content";
import { usePageTitle } from "@/lib/usePageTitle";
import { AwardRow } from "@/components/AwardRow";
import { HoverPreview } from "@/components/HoverPreview";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

type Filter = "All" | AwardCategory;
const filters: Filter[] = ["All", "Photography", "Film", "Exhibitions"];

export function AwardsPage() {
  usePageTitle("Recognition");
  const [filter, setFilter] = useState<Filter>("All");
  const listRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => (filter === "All" ? awards : awards.filter((a) => a.category === filter)), [filter]);
  const years = useMemo(() => Array.from(new Set(visible.map((a) => a.year))), [visible]);

  return (
    <section className="container-x pb-28 pt-36 md:pb-40 md:pt-48" aria-label="Awards archive">
      <SectionHeading
        as="h1"
        size="lg"
        label="Recognition"
        title={["A record of selected awards,", "exhibitions and honors."]}
        subtitle="Awards, festival selections and exhibitions, listed by year."
      />

      {/* Filters */}
      <div className="mt-16 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-line pt-6 md:mt-24" role="group" aria-label="Filter by category">
        {filters.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={cn(
                "label link-line inline-flex items-center gap-2 transition-colors duration-300",
                active ? "link-line-active text-ink" : "text-muted hover:text-ink",
              )}
            >
              {active && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />}
              {f}
            </button>
          );
        })}
        <span className="label-sm ml-auto text-muted" aria-live="polite">
          {visible.length} {visible.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {/* Timeline */}
      <div ref={listRef} className="mt-12 md:mt-16">
        <div key={filter}>
        {years.map((year) => (
          <Reveal key={year} className="relative grid grid-cols-12 gap-x-6 border-t border-line py-10 md:py-14">
            <div className="col-span-12 md:col-span-2">
              <p className="font-display text-4xl font-light leading-none md:sticky md:top-32 md:text-5xl">{year}</p>
            </div>
            <div className="relative col-span-12 mt-6 md:col-span-10 md:mt-0 md:border-l md:border-line md:pl-10">
              <span aria-hidden="true" className="absolute -left-[3px] top-2 hidden h-[5px] w-[5px] rounded-full bg-accent md:block" />
              <ul>
                {visible
                  .filter((a) => a.year === year)
                  .map((award) => (
                    <AwardRow key={award.id} award={award} variant="timeline" />
                  ))}
              </ul>
            </div>
          </Reveal>
        ))}
        </div>
      </div>

      <HoverPreview listRef={listRef} portrait={false} />
    </section>
  );
}
