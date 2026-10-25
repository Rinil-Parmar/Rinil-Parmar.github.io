"use client";

import { useEffect, useState } from "react";

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

export function CaseStudyNav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Case study sections"
      className="sticky top-[4.5rem] z-30 -mx-1 flex flex-wrap gap-1.5 rounded-lg border border-border bg-surface-2/90 p-2 backdrop-blur"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={isActive ? "true" : undefined}
            className={`rounded-md px-2.5 py-1 font-mono text-xs transition-colors ${
              isActive
                ? "bg-accent-soft text-accent"
                : "text-ink-secondary hover:bg-surface hover:text-ink"
            }`}
          >
            {s.label}
          </a>
        );
      })}
    </nav>
  );
}
