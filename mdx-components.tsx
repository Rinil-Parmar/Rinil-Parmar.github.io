import type { MDXComponents } from "mdx/types";

// Styles MDX content to match the Engineering Studio design system.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mt-10 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 scroll-mt-24 border-t border-border pt-8 text-xl font-medium tracking-tight text-ink">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-lg font-medium text-ink">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mt-5 text-base leading-relaxed text-ink-secondary">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-accent underline underline-offset-4 transition-opacity hover:opacity-80"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="mt-5 space-y-2.5 text-base leading-relaxed text-ink-secondary">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2.5 pl-5 text-base leading-relaxed text-ink-secondary marker:text-ink-muted">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="flex gap-3 [ol_&]:list-item [ol_&]:pl-1">
        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent [ol_&]:hidden" />
        <span className="min-w-0 flex-1">{children}</span>
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-accent pl-4 text-base italic leading-relaxed text-ink-secondary">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="rounded border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-ink">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mt-6 overflow-x-auto rounded-xl border border-border bg-surface-2 p-4 font-mono text-sm leading-relaxed text-ink [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-ink-secondary">
        {children}
      </pre>
    ),
    hr: () => <hr className="mt-10 border-border" />,
    strong: ({ children }) => (
      <strong className="font-medium text-ink">{children}</strong>
    ),
    ...components,
  };
}
