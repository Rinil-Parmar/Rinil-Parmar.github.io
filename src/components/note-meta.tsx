import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackToNotes() {
  return (
    <Link
      href="/notes"
      className="group inline-flex items-center gap-2 text-sm text-ink-secondary transition-colors hover:text-ink"
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
      All notes
    </Link>
  );
}

export function NoteMeta({
  date,
  readingTime,
}: {
  date: string;
  readingTime: string;
}) {
  return (
    <p className="mt-3 font-mono text-xs text-ink-muted">
      {date} · {readingTime}
    </p>
  );
}
