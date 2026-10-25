import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/profile";

const socials = [
  { href: profile.links.github, label: "GitHub", icon: Github },
  { href: profile.links.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="scroll-mt-20 border-t border-border bg-surface-2"
    >
      <div className="mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <span className="mono-label text-accent">Contact</span>
          <h2 className="mt-3 max-w-xl text-balance text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Let&apos;s build something that works beyond the demo.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-secondary">
            Open to software engineering roles across Canada — backend, cloud,
            full-stack, and applied AI. The fastest way to reach me is email.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="group mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-contrast transition-opacity hover:opacity-90"
          >
            <Mail className="h-4 w-4" />
            {profile.email}
          </a>
        </Reveal>

        <div className="mt-16 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-ink-muted">
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </p>
          <ul className="flex items-center gap-5">
            {socials.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm text-ink-secondary transition-colors hover:text-ink"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  {!href.startsWith("mailto") && (
                    <ArrowUpRight className="h-3 w-3 text-ink-muted" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
