import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { featuredProjects } from "@/data/projects";

export function FeaturedWork() {
  return (
    <section id="work" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24">
      <SectionHeading
        label="Selected engineering work"
        title="Systems built to stay correct under load."
        description="Backend services, developer tooling, and applied AI. Each one has a case study on the architecture and the trade-offs behind it."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {featuredProjects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05} className="h-full">
            <ProjectCard project={p} index={i} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <Link
          href="/projects"
          className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink-secondary transition-colors hover:text-ink"
        >
          View all projects
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Reveal>
    </section>
  );
}
