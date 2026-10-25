import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import type { Project } from "@/data/projects";

const statusStyles: Record<Project["status"], string> = {
  Active: "text-accent border-accent/40",
  Shipped: "text-accent border-accent/40",
  "In deployment": "text-accent border-accent/40",
  Research: "text-ink-muted border-border-strong",
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="mono-label">
          {String(index + 1).padStart(2, "0")} / {project.featured ? "Featured" : "Project"}
        </span>
        <span className="font-mono text-[0.625rem] tracking-widest text-accent">
          {project.langTag}
        </span>
      </div>

      <h3 className="mb-1.5 text-lg font-medium text-ink">{project.name}</h3>
      <p className="mb-4 text-sm text-ink-secondary">{project.tagline}</p>

      <ul className="mb-6 flex-1 space-y-2">
        {project.highlights.slice(0, 2).map((h) => (
          <li
            key={h}
            className="flex gap-2 text-sm leading-relaxed text-ink-secondary"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            {h}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between border-t border-border pt-4">
        <span
          className={`rounded-full border px-2.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider ${statusStyles[project.status]}`}
        >
          {project.status}
        </span>
        <span className="flex items-center gap-3 text-ink-muted">
          {project.github && <Github className="h-4 w-4" />}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
        </span>
      </div>
    </Link>
  );
}
