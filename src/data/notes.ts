export type Note = {
  slug: string;
  title: string;
  date: string; // display string, e.g. "October 2026"
  summary: string;
  tags: string[];
  readingTime: string;
};

// Source of truth for the notes listing. Each note's full content lives in
// app/notes/<slug>/page.mdx.
export const notes: Note[] = [
  {
    slug: "approval-gated-deploys",
    title: "Rootless Docker, and a deploy you have to approve",
    date: "October 2026",
    summary:
      "When you deploy to a shared university VM, the guardrails are the feature. How Heritage ECM ships Mayan safely with rootless Docker, Nginx, and an approval-gated pipeline.",
    tags: ["DevOps", "Docker", "CI/CD"],
    readingTime: "5 min read",
  },
  {
    slug: "the-transactional-outbox",
    title: "The transactional outbox, and why I write events to a table",
    date: "October 2026",
    summary:
      "A ledger that publishes to Kafka has two things to get right at once. Here's the dual-write problem and the outbox pattern I used in FinLedger to sidestep it.",
    tags: ["Backend", "Kafka", "Postgres"],
    readingTime: "5 min read",
  },
  {
    slug: "one-time-downloads",
    title: "Making a one-time download actually one-time",
    date: "October 2026",
    summary:
      "\"Single use\" is a concurrency problem before it's a crypto one. How SecureShare guarantees exactly one download even when two requests race.",
    tags: ["Concurrency", "Security"],
    readingTime: "4 min read",
  },
];

export function getNote(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}
