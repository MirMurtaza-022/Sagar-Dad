import { projects, type Project } from "@/data/content";
import { usePageTitle } from "@/lib/usePageTitle";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";

const sequence: Project["layout"][] = ["left", "right", "portrait", "full"];

export function WorkPage() {
  usePageTitle("Work");
  return (
    <section className="container-x pb-28 pt-36 md:pb-40 md:pt-48" aria-label="All projects">
      <SectionHeading
        as="h1"
        size="lg"
        label="Work"
        title={["Selected photography", "and film."]}
        subtitle={`${String(projects.length).padStart(2, "0")} projects — personal series, films and commissions.`}
      />
      <div className="mt-24 flex flex-col gap-y-28 md:mt-36 md:gap-y-44">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} layout={sequence[i % sequence.length]} />
        ))}
      </div>
    </section>
  );
}
