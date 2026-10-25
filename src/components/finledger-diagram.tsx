"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  CheckCircle2,
  Database,
  GitBranch,
  Inbox,
  Radio,
  Scale,
  Send,
} from "lucide-react";

type Node = {
  id: string;
  label: string;
  sub: string;
  icon: React.ElementType;
  detail: string;
  why: string;
};

const nodes: Node[] = [
  {
    id: "request",
    label: "Write request",
    sub: "Client / API",
    icon: Send,
    detail:
      "Every balance-changing request, whether a posting or a transfer, enters through a single API surface.",
    why: "One entry point means there is no side door that can bypass validation.",
  },
  {
    id: "funnel",
    label: "Write funnel",
    sub: "Single mutation path",
    icon: GitBranch,
    detail:
      "All mutations are routed through one funnel that validates, balances, and appends in a defined order.",
    why: "Validation and balancing live in exactly one place instead of scattered across endpoints.",
  },
  {
    id: "idempotency",
    label: "Idempotency check",
    sub: "Replay-safe",
    icon: CheckCircle2,
    detail:
      "Each request carries an idempotency key. A repeated key returns the original result instead of posting again.",
    why: "Network retries and client bugs can't double-post to a financial ledger.",
  },
  {
    id: "posting",
    label: "Double-entry posting",
    sub: "Debits = credits",
    icon: Scale,
    detail:
      "The entry is recorded as balanced debit and credit lines; an unbalanced posting is rejected.",
    why: "Double-entry is self-checking, so the books can't silently drift out of balance.",
  },
  {
    id: "ledger",
    label: "Append-only ledger",
    sub: "PostgreSQL",
    icon: Database,
    detail:
      "Entries are appended, never updated or deleted. Corrections are new entries referencing the original.",
    why: "An immutable history is auditable and can be replayed to reconstruct any balance.",
  },
  {
    id: "outbox",
    label: "Transactional outbox",
    sub: "Same transaction",
    icon: Inbox,
    detail:
      "The event to publish is written to an outbox table inside the same DB transaction as the ledger entry.",
    why: "The entry and its event commit or fail together, with no dual-write inconsistency.",
  },
  {
    id: "kafka",
    label: "Kafka",
    sub: "Committed events",
    icon: Radio,
    detail:
      "A relay publishes committed outbox rows to Kafka for downstream consumers, in order.",
    why: "Consumers see every committed change exactly once, without polling the database.",
  },
];

export function FinLedgerDiagram() {
  const [activeId, setActiveId] = useState("funnel");
  const reduce = useReducedMotion();
  const active = nodes.find((n) => n.id === activeId)!;

  return (
    <figure className="rounded-xl border border-border bg-surface-2 p-5 sm:p-6">
      <figcaption className="mb-5 flex items-center justify-between">
        <span className="mono-label">Write path · interactive</span>
        <span className="hidden font-mono text-xs text-ink-muted sm:inline">
          Select a stage
        </span>
      </figcaption>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <ol className="space-y-1">
          {nodes.map((node, i) => {
            const Icon = node.icon;
            const isActive = node.id === activeId;
            return (
              <li key={node.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(node.id)}
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
                      {node.label}
                    </span>
                    <span className="block font-mono text-xs text-ink-muted">
                      {node.sub}
                    </span>
                  </span>
                </button>
                {i < nodes.length - 1 && (
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
            <active.icon className="h-5 w-5 text-accent" />
            <h4 className="text-base font-medium text-ink">{active.label}</h4>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
            {active.detail}
          </p>
          <div className="mt-4 rounded-md border border-border bg-surface-2 p-3.5">
            <span className="mono-label text-accent">Why it's built this way</span>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">
              {active.why}
            </p>
          </div>
        </motion.div>
      </div>

      <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-ink-muted">
        Reads are served by a separate path that queries balances and history
        from the append-only ledger, so reporting never contends with the write
        funnel.
      </p>
    </figure>
  );
}
