"use client";

const sections = [
  { id: "problem", label: "Problem" },
  { id: "constraints", label: "Constraints" },
  { id: "contributions", label: "Contributions" },
  { id: "architecture", label: "Architecture" },
  { id: "decisions", label: "Decisions" },
  { id: "stack", label: "Stack" },
  { id: "implementation", label: "Implementation" },
  { id: "testing", label: "Testing" },
  { id: "results", label: "Results" },
  { id: "lessons", label: "Lessons" },
];

export function CaseStudyNav(_props: { hasDiagram?: boolean }) {
  return (
    <nav
      aria-label="Case study sections"
      className="flex flex-wrap gap-1.5 rounded-lg border border-border bg-surface-2 p-2"
    >
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="rounded-md px-2.5 py-1 font-mono text-xs text-ink-secondary transition-colors hover:bg-surface hover:text-ink"
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
}
