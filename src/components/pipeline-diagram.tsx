"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";

export type PipelineStep = {
  id: string;
  label: string;
  sub: string;
  icon: React.ElementType;
  detail: string;
  why: string;
};

export function PipelineDiagram({
  label,
  steps,
  footnote,
  initial,
}: {
  label: string;
  steps: PipelineStep[];
  footnote?: string;
  initial?: string;
}) {
  const [activeId, setActiveId] = useState(initial ?? steps[0].id);
  const reduce = useReducedMotion();
  const active = steps.find((s) => s.id === activeId) ?? steps[0];
  const ActiveIcon = active.icon;

  return (
    <figure className="rounded-xl border border-border bg-surface-2 p-5 sm:p-6">
      <figcaption className="mb-5 flex items-center justify-between">
        <span className="mono-label">{label}</span>
        <span className="hidden font-mono text-xs text-ink-muted sm:inline">
          Select a stage
        </span>
      </figcaption>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <ol className="space-y-1">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = step.id === activeId;
            return (
              <li key={step.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(step.id)}
                  aria-pressed={isActive}
                  className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                    isActive
                      ? "border-accent bg-accent-soft"
                      : "border-border bg-surface hover:border-border-strong"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border ${
                      isActive
                        ? "border-accent text-accent"
                        : "border-border text-ink-muted"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block text-sm font-medium ${
                        isActive ? "text-ink" : "text-ink-secondary"
                      }`}
                    >
                      {step.label}
                    </span>
                    <span className="block font-mono text-xs text-ink-muted">
                      {step.sub}
                    </span>
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div
                    className="flex justify-start py-0.5 pl-[1.65rem]"
                    aria-hidden
                  >
                    <ArrowDown className="h-3.5 w-3.5 text-ink-muted" />
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          className="h-fit rounded-lg border border-border bg-surface p-5 lg:sticky lg:top-24"
        >
          <div className="flex items-center gap-2.5">
            <ActiveIcon className="h-5 w-5 text-accent" />
            <h4 className="text-base font-medium text-ink">{active.label}</h4>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
            {active.detail}
          </p>
          <div className="mt-4 rounded-md border border-border bg-surface-2 p-3.5">
            <span className="mono-label text-accent">Why it works this way</span>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">
              {active.why}
            </p>
          </div>
        </motion.div>
      </div>

      {footnote && (
        <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-ink-muted">
          {footnote}
        </p>
      )}
    </figure>
  );
}
