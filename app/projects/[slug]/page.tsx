import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { CaseStudyNav } from "@/components/case-study-nav";
import { ProjectDiagram } from "@/components/project-diagrams";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: `${project.name} · Rinil Parmar`,
      description: project.description,
    },
  };
}

function Block({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border py-10">
      <Reveal>
        <span className="mono-label text-accent">{label}</span>
        <div className="mt-4">{children}</div>
      </Reveal>
    </section>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const cs = project.caseStudy;

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-6 pb-24 pt-32 sm:pt-40">
        <Reveal>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm text-ink-secondary transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            All projects
          </Link>
        </Reveal>

        <header className="mt-8">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs tracking-widest text-accent">
                {project.langTag}
              </span>
              <span className="rounded-full border border-border-strong px-2.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider text-ink-muted">
                {project.status}
              </span>
            </div>
            <h1 className="mt-4 text-balance text-4xl font-medium tracking-tight text-ink sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-3 text-lg text-ink-secondary">{project.tagline}</p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-secondary">
              {project.description}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-border py-6 sm:grid-cols-4">
              <div>
                <dt className="mono-label">Role</dt>
                <dd className="mt-1 text-sm text-ink">{project.role}</dd>
              </div>
              <div>
                <dt className="mono-label">Timeline</dt>
                <dd className="mt-1 text-sm text-ink">{project.period}</dd>
              </div>
              <div className="col-span-2">
                <dt className="mono-label">Links</dt>
                <dd className="mt-1 flex flex-wrap gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-ink transition-colors hover:text-accent"
                    >
                      <Github className="h-4 w-4" />
                      Repository
                      <ArrowUpRight className="h-3 w-3 text-ink-muted" />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-ink transition-colors hover:text-accent"
                    >
                      Live demo
                      <ArrowUpRight className="h-3 w-3 text-ink-muted" />
                    </a>
                  )}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-[0.6875rem] text-ink-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </header>

        {project.images && project.images.length > 0 && (
          <div className="mt-10 space-y-6">
            {project.images.map((img, i) => (
              <Reveal key={img.src} delay={i * 0.05}>
                <figure className="overflow-hidden rounded-xl border border-border bg-surface-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    loading="lazy"
                    className="h-auto w-full"
                  />
                  {img.caption && (
                    <figcaption className="border-t border-border px-4 py-3 text-xs leading-relaxed text-ink-muted">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            ))}
          </div>
        )}

        {cs && (
          <div className="mt-8">
            <CaseStudyNav />

            <Block id="problem" label="Problem">
              <p className="text-base leading-relaxed text-ink-secondary">
                {cs.problem}
              </p>
            </Block>

            <Block id="constraints" label="Constraints">
              <ul className="space-y-3">
                {cs.constraints.map((c) => (
                  <li
                    key={c}
                    className="flex gap-3 text-base leading-relaxed text-ink-secondary"
                  >
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {c}
                  </li>
                ))}
              </ul>
            </Block>

            <Block id="contributions" label="My contributions">
              <ul className="space-y-3">
                {cs.contributions.map((c) => (
                  <li
                    key={c}
                    className="flex gap-3 text-base leading-relaxed text-ink-secondary"
                  >
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {c}
                  </li>
                ))}
              </ul>
            </Block>

            <Block id="architecture" label="System architecture">
              <p className="text-base leading-relaxed text-ink-secondary">
                {cs.architecture}
              </p>
              <ProjectDiagram slug={project.slug} />
            </Block>

            <Block id="decisions" label="Key decisions & trade-offs">
              <div className="space-y-5">
                {cs.decisions.map((d) => (
                  <div
                    key={d.title}
                    className="rounded-lg border border-border bg-surface p-5"
                  >
                    <h3 className="text-base font-medium text-ink">{d.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                      {d.body}
                    </p>
                  </div>
                ))}
              </div>
            </Block>

            <Block id="stack" label="Technology choices">
              <ul className="divide-y divide-border">
                {cs.stackWhy.map((s) => (
                  <li
                    key={s.tech}
                    className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[160px_1fr] sm:gap-4"
                  >
                    <span className="font-mono text-sm text-ink">{s.tech}</span>
                    <span className="text-sm leading-relaxed text-ink-secondary">
                      {s.why}
                    </span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block id="implementation" label="Implementation">
              <ul className="space-y-3">
                {cs.implementation.map((c) => (
                  <li
                    key={c}
                    className="flex gap-3 text-base leading-relaxed text-ink-secondary"
                  >
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-border-strong" />
                    {c}
                  </li>
                ))}
              </ul>
            </Block>

            <Block id="testing" label="Testing & deployment">
              <p className="text-base leading-relaxed text-ink-secondary">
                {cs.testing}
              </p>
            </Block>

            <Block id="results" label="Results">
              <ul className="space-y-3">
                {cs.results.map((c) => (
                  <li
                    key={c}
                    className="flex gap-3 text-base leading-relaxed text-ink"
                  >
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {c}
                  </li>
                ))}
              </ul>
            </Block>

            <Block id="lessons" label="Lessons learned">
              <ul className="space-y-3">
                {cs.lessons.map((c) => (
                  <li
                    key={c}
                    className="flex gap-3 text-base leading-relaxed text-ink-secondary"
                  >
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-border-strong" />
                    {c}
                  </li>
                ))}
              </ul>
            </Block>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
