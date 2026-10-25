"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Command } from "cmdk";
import {
  ArrowUpRight,
  Briefcase,
  FileText,
  FolderGit2,
  Github,
  Home,
  Linkedin,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { allProjects } from "@/data/projects";
import { profile } from "@/data/profile";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const openEvt = () => setOpen(true);
    document.addEventListener("keydown", down);
    window.addEventListener("open-command-palette", openEvt);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", openEvt);
    };
  }, []);

  const run = useCallback((action: () => void) => {
    setOpen(false);
    // Let the dialog close before navigating/scrolling.
    requestAnimationFrame(action);
  }, []);

  const go = (href: string) => run(() => router.push(href));
  const external = (href: string) =>
    run(() => window.open(href, "_blank", "noopener,noreferrer"));

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      filter={(value, search) =>
        value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
      }
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-[14vh] backdrop-blur-sm data-[state=closed]:hidden"
      overlayClassName="fixed inset-0"
    >
      <div className="w-full max-w-xl overflow-hidden rounded-xl border border-border-strong bg-surface shadow-2xl">
        <Command.Input
          placeholder="Search projects, sections, links…"
          className="w-full border-b border-border bg-transparent px-4 py-3.5 text-sm text-ink outline-none placeholder:text-ink-muted"
        />
        <Command.List className="max-h-[52vh] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-ink-muted">
            No results found.
          </Command.Empty>

          <Command.Group
            heading="Navigation"
            className="mb-1 px-2 text-[0.6875rem] font-medium uppercase tracking-wider text-ink-muted [&_[cmdk-group-heading]]:px-1 [&_[cmdk-group-heading]]:py-1.5"
          >
            <Item icon={<Home />} onSelect={() => go("/#top")}>
              Home
            </Item>
            <Item icon={<FolderGit2 />} onSelect={() => go("/#work")}>
              Work
            </Item>
            <Item icon={<Briefcase />} onSelect={() => go("/#experience")}>
              Experience
            </Item>
            <Item icon={<User />} onSelect={() => go("/#about")}>
              About
            </Item>
          </Command.Group>

          <Command.Group
            heading="Projects"
            className="mb-1 px-2 text-[0.6875rem] font-medium uppercase tracking-wider text-ink-muted [&_[cmdk-group-heading]]:px-1 [&_[cmdk-group-heading]]:py-1.5"
          >
            {allProjects.map((p) => (
              <Item
                key={p.slug}
                icon={<FolderGit2 />}
                value={`${p.name} ${p.tagline} ${p.stack.join(" ")}`}
                onSelect={() => go(`/projects/${p.slug}`)}
              >
                <span className="flex-1">{p.name}</span>
                <span className="text-xs text-ink-muted">{p.tagline}</span>
              </Item>
            ))}
          </Command.Group>

          <Command.Group
            heading="Links"
            className="mb-1 px-2 text-[0.6875rem] font-medium uppercase tracking-wider text-ink-muted [&_[cmdk-group-heading]]:px-1 [&_[cmdk-group-heading]]:py-1.5"
          >
            <Item
              icon={<Github />}
              onSelect={() => external(profile.links.github)}
            >
              GitHub <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted" />
            </Item>
            <Item
              icon={<Linkedin />}
              onSelect={() => external(profile.links.linkedin)}
            >
              LinkedIn <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted" />
            </Item>
            <Item icon={<FileText />} onSelect={() => external(profile.links.resume)}>
              Résumé <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted" />
            </Item>
          </Command.Group>

          <Command.Group
            heading="Theme"
            className="px-2 text-[0.6875rem] font-medium uppercase tracking-wider text-ink-muted [&_[cmdk-group-heading]]:px-1 [&_[cmdk-group-heading]]:py-1.5"
          >
            <Item
              icon={resolvedTheme === "dark" ? <Sun /> : <Moon />}
              onSelect={() =>
                run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))
              }
            >
              Toggle {resolvedTheme === "dark" ? "light" : "dark"} mode
            </Item>
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
}

function Item({
  children,
  icon,
  onSelect,
  value,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  onSelect: () => void;
  value?: string;
}) {
  return (
    <Command.Item
      value={value}
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-ink-secondary aria-selected:bg-surface-2 aria-selected:text-ink [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-ink-muted"
    >
      {icon}
      {children}
    </Command.Item>
  );
}
