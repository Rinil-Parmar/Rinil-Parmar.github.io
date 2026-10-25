"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/data/profile";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#about", label: "About" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openPalette = () =>
    window.dispatchEvent(new Event("open-command-palette"));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/#top"
          className="font-mono text-base font-medium text-ink"
          aria-label={`${profile.name}, home`}
        >
          {profile.initials}
          <span className="text-accent">.</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="mr-1 hidden items-center gap-1 sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-md px-3 py-2 text-sm text-ink-secondary transition-colors hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command menu"
            className="flex items-center gap-2 rounded-md border border-border px-2.5 py-2 text-sm text-ink-muted transition-colors hover:border-border-strong hover:text-ink-secondary"
          >
            <Search className="h-3.5 w-3.5" />
            <kbd className="hidden font-mono text-xs sm:inline">⌘K</kbd>
          </button>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
