import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-xs tracking-widest text-accent">
        404
      </span>
      <h1 className="mt-4 text-3xl font-medium tracking-tight text-ink">
        This page isn&apos;t in the ledger.
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-secondary">
        The link may be broken or the page may have moved.
      </p>
      <Link
        href="/"
        className="group mt-8 inline-flex items-center gap-2 rounded-md border border-border-strong px-5 py-2.5 text-sm font-medium text-ink-secondary transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back home
      </Link>
    </main>
  );
}
