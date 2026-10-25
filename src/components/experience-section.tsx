import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { experience } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="scroll-mt-20 border-y border-border bg-surface-2"
    >
      <div className="mx-auto max-w-5xl px-6 py-24">
        <SectionHeading
          label="Experience"
          title="Where I've shipped."
          description="Production backend and full-stack work across enterprise and startup environments."
        />

        <ol className="relative border-l border-border">
          {experience.map((job, i) => (
            <li key={job.company} className="relative pl-8">
              <Reveal delay={i * 0.05}>
                <span
                  className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-accent"
                  aria-hidden
                />
                <div className={i === experience.length - 1 ? "pb-2" : "pb-12"}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-base font-medium text-ink">
                      {job.title}
                      <span className="text-ink-secondary"> · </span>
                      {job.url ? (
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-0.5 text-ink-secondary transition-colors hover:text-accent"
                        >
                          {job.company}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <span className="text-ink-secondary">{job.company}</span>
                      )}
                    </h3>
                    <span className="font-mono text-xs text-ink-muted">
                      {job.period}
                    </span>
                  </div>

                  <p className="mt-1 font-mono text-xs text-ink-muted">
                    {job.location}
                  </p>

                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-secondary">
                    {job.summary}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {job.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-2.5 text-sm leading-relaxed text-ink-secondary"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-border-strong" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-[0.6875rem] text-ink-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
