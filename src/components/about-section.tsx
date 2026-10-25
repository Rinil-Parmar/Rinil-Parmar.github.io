import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/profile";

const education = [
  {
    school: "University of Windsor",
    degree: "Master of Applied Computing",
    period: "Sep 2025 – Dec 2026 (Expected)",
  },
  {
    school: "Dharmsinh Desai University",
    degree: "B.Tech, Computer Engineering",
    period: "Aug 2020 – May 2024",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24">
      <SectionHeading label="About" title="Engineer, by habit." />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="space-y-4 text-sm leading-relaxed text-ink-secondary sm:text-base">
            <p>{profile.about}</p>
          </div>

          <div className="mt-10">
            <span className="mono-label">Education</span>
            <ul className="mt-4 space-y-4">
              {education.map((e) => (
                <li
                  key={e.school}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-border pb-4"
                >
                  <div>
                    <p className="text-sm font-medium text-ink">{e.school}</p>
                    <p className="text-sm text-ink-secondary">{e.degree}</p>
                  </div>
                  <span className="font-mono text-xs text-ink-muted">
                    {e.period}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div>
            <span className="mono-label">Capabilities</span>
            <div className="mt-4 space-y-6">
              {profile.skills.map((group) => (
                <div key={group.label}>
                  <p className="mb-2.5 text-sm font-medium text-ink">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-ink-secondary"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
