export const profile = {
  name: "Rinil Parmar",
  initials: "RP",
  role: "Software Engineer",
  location: "Windsor, ON · Canada",
  tagline: "Building software that works beyond the demo.",
  intro:
    "I design and build reliable backend systems, cloud infrastructure, and AI-powered tools, from architecture through deployment.",
  about:
    "I'm a Master of Applied Computing student at the University of Windsor with production experience across backend microservices, full-stack applications, and applied AI. I care about systems that stay correct under load: idempotent APIs, event-driven pipelines, double-entry ledgers, and agent workflows with real audit trails. Most of what I build ends up on GitHub, containerized, and wired to CI.",
  email: "parmar7f@uwindsor.ca",
  phone: "519-566-7353",
  links: {
    github: "https://github.com/Rinil-Parmar",
    linkedin: "https://www.linkedin.com/in/parmar-rinil-078a311b4/",
    leetcode: "https://leetcode.com/u/parmarrinila2002/",
    resume: "/resume.pdf",
  },
  // Organized by engineering capability, not logo soup.
  skills: [
    {
      label: "Languages",
      items: ["Java", "Python", "Go", "TypeScript", "JavaScript", "SQL", "C/C++"],
    },
    {
      label: "Backend & APIs",
      items: [
        "Spring Boot",
        "REST / Microservices",
        "Apache Kafka",
        "Node.js / Express",
        "Flask",
        "WebSockets",
      ],
    },
    {
      label: "Data & AI",
      items: [
        "PostgreSQL",
        "MySQL",
        "SQLite / DuckDB",
        "PyTorch",
        "RAG / Embeddings",
        "LLM Agents",
      ],
    },
    {
      label: "Cloud & DevOps",
      items: [
        "AWS",
        "Docker",
        "Kubernetes",
        "GitHub Actions",
        "Jenkins",
        "Linux",
      ],
    },
  ],
} as const;

export type Profile = typeof profile;
