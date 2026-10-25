import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-36 sm:pt-44">
        <Reveal>
          <p className="mono-label mb-6 flex items-center gap-2 text-accent">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            {profile.role} · Canada
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="max-w-3xl text-balance text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-6xl">
            {profile.tagline}
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-secondary sm:text-lg">
            {profile.intro}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="#work"
              className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-contrast transition-opacity hover:opacity-90"
            >
              Explore projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border-strong px-5 py-2.5 text-sm font-medium text-ink-secondary transition-colors hover:text-ink"
            >
              <FileText className="h-4 w-4" />
              View résumé
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
