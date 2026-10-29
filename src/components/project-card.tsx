import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";

const statusStyles: Record<Project["status"], string> = {
  Active: "text-accent border-accent/40",
  Shipped: "text-accent border-accent/40",
  "In deployment": "text-accent border-accent/40",
  Research: "text-ink-muted border-border-strong",
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cover = project.images?.[0];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-border-strong"
    >
      {cover ? (
        <div className="aspect-[16/9] overflow-hidden border-b border-border bg-surface-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cover.src}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden border-b border-border bg-surface-2">
          <div className="absolute inset-0 bg-grid opacity-[0.35]" aria-hidden />
          <span className="relative font-mono text-2xl font-medium tracking-tight text-ink-secondary sm:text-3xl">
            {project.name}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="mono-label">
            {String(index + 1).padStart(2, "0")} / {project.featured ? "Featured" : "Project"}
          </span>
          <span className="font-mono text-[0.625rem] tracking-widest text-accent">
            {project.langTag}
          </span>
        </div>

        <h3 className="text-lg font-medium text-ink">{project.name}</h3>
        <p className="mt-1.5 text-sm text-ink-secondary">{project.tagline}</p>

        <div className="mt-5 flex-1" aria-hidden />

        <div className="flex items-center justify-between border-t border-border pt-4">
          <span
            className={`rounded-full border px-2.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider ${statusStyles[project.status]}`}
          >
            {project.status}
          </span>
          <span className="flex items-center gap-3 text-ink-muted">
            {project.demo && (
              <ExternalLink className="h-4 w-4 text-accent" aria-label="Live demo available" />
            )}
            {project.github && <Github className="h-4 w-4" />}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
          </span>
        </div>
      </div>
    </Link>
  );
}
