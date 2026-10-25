import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { allProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Engineering projects by Rinil Parmar: backend systems, developer tooling, applied AI, and data.",
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-5xl px-6 pb-24 pt-36 sm:pt-44">
        <Reveal>
          <span className="mono-label text-accent">All projects</span>
          <h1 className="mt-3 text-balance text-4xl font-medium tracking-tight text-ink sm:text-5xl">
            Everything I&apos;ve built in the open.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-secondary">
            Each project links to a case study covering the problem, the
            architecture, and the engineering trade-offs behind it.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {allProjects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.05}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
