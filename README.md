# Rinil Parmar — Portfolio

Personal software-engineering portfolio. Built as a statically-exported
Next.js app and deployed to GitHub Pages.

**Design direction:** Engineering Studio — dark graphite / warm-white editorial
layout with a single mint accent, monospace technical labels, and one
interactive architecture diagram.

## Stack

- **Next.js 15** (App Router) + **TypeScript** (strict), `output: "export"`
- **Tailwind CSS v4**
- **Motion** (entrance animations, reduced-motion aware)
- **cmdk** command palette (⌘K / Ctrl+K)
- **lucide-react** icons, **next-themes** dark/light

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to ./out
```

## Content

All content lives in typed data files — no CMS, no fabricated metrics:

- `src/data/profile.ts` — identity, summary, skills
- `src/data/experience.ts` — work history
- `src/data/projects.ts` — projects + full case-study content

Add your résumé as `public/resume.pdf` to wire up the "View résumé" links.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the static
site and publishes it to GitHub Pages. Served at the repository root.
