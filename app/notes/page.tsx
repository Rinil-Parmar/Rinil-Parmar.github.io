import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { notes } from "@/data/notes";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Engineering notes by Rinil Parmar on backend systems, concurrency, and the trade-offs behind real projects.",
};

export default function NotesPage() {
  return (
    <>
      <Reveal>
        <span className="mono-label text-accent">Engineering notes</span>
        <h1 className="mt-3 text-balance text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          Writing about the hard parts.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-secondary">
          Short, practical notes on the engineering decisions behind my
          projects: the problems, the patterns, and why I chose them.
        </p>
      </Reveal>

      <div className="mt-14 divide-y divide-border border-t border-border">
        {notes.map((note, i) => (
          <Reveal key={note.slug} delay={i * 0.05}>
            <Link
              href={`/notes/${note.slug}`}
              className="group block py-8 transition-opacity"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-ink-muted">
                  {note.date} · {note.readingTime}
                </span>
                <div className="flex gap-1.5">
                  {note.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.625rem] text-ink-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <h2 className="mt-3 text-xl font-medium tracking-tight text-ink transition-colors group-hover:text-accent">
                {note.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-secondary">
                {note.summary}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink-secondary transition-colors group-hover:text-ink">
                Read note
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}
