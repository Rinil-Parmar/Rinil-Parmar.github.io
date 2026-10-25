export type ProjectStatus =
  | "Active"
  | "Shipped"
  | "In deployment"
  | "Research";

export type CaseStudy = {
  problem: string;
  constraints: string[];
  contributions: string[];
  architecture: string;
  decisions: { title: string; body: string }[];
  stackWhy: { tech: string; why: string }[];
  implementation: string[];
  testing: string;
  results: string[];
  lessons: string[];
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  langTag: string;
  status: ProjectStatus;
  role: string;
  period: string;
  github?: string;
  demo?: string;
  featured: boolean;
  order: number;
  // Short bullets for the card / listing.
  highlights: string[];
  // Optional screenshots shown on the case-study page.
  images?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption?: string;
  }[];
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "aros",
    name: "Aros",
    tagline: "Multi-agent CLI orchestrator",
    description:
      "A Go CLI and TUI that coordinates Claude Code, OpenCode, and Copilot through explicit Plan → Divide → Work phases, with a judge agent, human approval gates, and dependency-aware parallel execution.",
    stack: ["Go", "Cobra", "errgroup", "TOML", "LLMs", "Claude Code / OpenCode"],
    langTag: "GO",
    status: "Active",
    role: "Creator & sole engineer",
    period: "2026",
    github: "https://github.com/Rinil-Parmar/aros",
    featured: true,
    order: 1,
    highlights: [
      "Plan → Divide → Work pipeline with a judge agent and human approval gates",
      "Dependency-aware parallel execution across Claude Code, OpenCode, and Copilot",
      "Fail-isolated runs: blocked tasks retry without restarting the whole job",
    ],
    images: [
      {
        src: "/projects/aros.png",
        alt: "Aros CLI terminal UI: the multi-agent orchestrator showing enabled agents (claude, copilot, opencode), the active session, and commands.",
        width: 1888,
        height: 1039,
        caption:
          "The Aros TUI: enabled agents and judge on the right, session and commands in the main pane.",
      },
    ],
    caseStudy: {
      problem:
        "Running several AI coding agents by hand is chaotic: they duplicate work, overwrite each other, and give you no structured way to approve what they do. Aros turns ad-hoc agent use into an explicit, reviewable workflow across Claude Code, OpenCode, and Copilot.",
      constraints: [
        "Must stay a fast, scriptable CLI and TUI, not a server or a web app",
        "Agents run real tools, so a human has to approve each phase before work proceeds",
        "Tasks have dependencies, so execution order must be derived from them, not hard-coded",
      ],
      contributions: [
        "Designed the Plan → Divide → Work phase model with a judge agent that synthesizes competing plans",
        "Built dependency-aware scheduling so independent tasks run in parallel (up to max_concurrent) and dependents wait",
        "Implemented fail-isolation: a failed task and its dependents are blocked while the rest of the run continues, and a re-run retries only the blocked tasks",
        "Integrated optional Secondmem memory so agents get prior context before planning and feed results back",
      ],
      architecture:
        "In Plan, each enabled agent drafts a plan in parallel and a judge agent synthesizes them; you approve or send feedback. In Divide, the judge breaks the plan into tasks with dependencies and an assignment table you approve. In Work, agents run in dependency order with errgroup-coordinated parallelism, pausing for critical decisions via a human-handoff marker. Config and session state live under .aros/ as TOML and JSON.",
      decisions: [
        {
          title: "Phases over a free-running loop",
          body: "Explicit Plan/Divide/Work phases with approval gates make the system inspectable and interruptible, instead of a black-box agent loop that is hard to reason about or stop.",
        },
        {
          title: "A judge agent to reconcile plans",
          body: "Having several agents draft in parallel and a judge synthesize them produces a stronger plan than trusting any single agent's first attempt.",
        },
        {
          title: "Fail-isolation over all-or-nothing",
          body: "Blocking a failed task and its dependents while the rest proceeds, then retrying only the blocked set, keeps long multi-agent runs cheap to recover.",
        },
      ],
      stackWhy: [
        { tech: "Go", why: "A single static binary that is trivial to distribute as a CLI, with first-class concurrency." },
        { tech: "errgroup", why: "Structured concurrency with coordinated cancellation for the dependency-ordered work phase." },
        { tech: "Cobra", why: "Ergonomic command and subcommand structure for the CLI surface." },
        { tech: "TOML + .aros/", why: "Readable, project-scoped configuration and session state that live beside the code." },
      ],
      implementation: [
        "Parallel plan drafting with judge-agent synthesis",
        "Dependency-ordered task execution bounded by max_concurrent",
        "Blocked-task tracking with targeted retries and subprocess timeouts",
        "Forward-only phase transitions with per-session state under .aros/",
      ],
      testing:
        "Phase transitions and the scheduler are exercised through Go's testing package; the CLI and TUI are validated against representative multi-task goals.",
      results: [
        "A working orchestrator that coordinates multiple real coding agents against one approved plan",
        "Long runs survive individual task failures and resume with targeted retries",
      ],
      lessons: [
        "Human approval gates are what make multi-agent automation trustworthy, not an obstacle to it.",
        "A shared working tree without locking is the real hazard in parallel agents — committing first or limiting concurrency matters more than raw speed.",
      ],
    },
  },
  {
    slug: "finledger",
    name: "FinLedger",
    tagline: "Double-entry financial book of record",
    description:
      "An append-only, double-entry accounting service with a single write funnel, separated read/write paths, idempotency enforcement, and a Kafka event outbox.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Apache Kafka", "Docker", "GitHub Actions"],
    langTag: "JAVA",
    status: "Active",
    role: "Creator & sole engineer",
    period: "2026",
    github: "https://github.com/Rinil-Parmar/finledger",
    featured: true,
    order: 2,
    highlights: [
      "Append-only double-entry ledger with a single write funnel",
      "Idempotency enforcement and a Kafka event outbox",
      "Separated read and write paths with structured logging",
    ],
    caseStudy: {
      problem:
        "Financial systems cannot tolerate lost, duplicated, or silently mutated transactions. FinLedger is a book of record that guarantees every balance change is auditable, idempotent, and reproducible from an immutable history.",
      constraints: [
        "Entries must be append-only, with no in-place updates or deletes",
        "The same request must never post twice, even on retries",
        "Reads must not contend with the write path",
      ],
      contributions: [
        "Modeled append-only double-entry accounting with balanced debit/credit postings",
        "Built a single write funnel so all mutations pass through one validated path",
        "Enforced idempotency keys to make retried requests safe",
        "Implemented a Kafka event outbox so downstream consumers see every committed change exactly once",
      ],
      architecture:
        "All writes enter through one funnel that validates, balances, and appends entries, then records an outbox event in the same transaction. A separate read path serves balances and history without competing with writes. Kafka publishes committed events from the outbox for downstream consumers.",
      decisions: [
        {
          title: "Single write funnel",
          body: "Routing every mutation through one path means validation, balancing, and idempotency are enforced in exactly one place instead of scattered across endpoints.",
        },
        {
          title: "Transactional outbox over direct publish",
          body: "Writing the event to an outbox inside the DB transaction avoids the dual-write problem, because the event and the ledger entry commit or fail together.",
        },
        {
          title: "Append-only storage",
          body: "An immutable history makes the ledger auditable and reconstructable; corrections are new entries, never edits.",
        },
      ],
      stackWhy: [
        { tech: "Spring Boot", why: "Mature transaction management and a clean service/repository structure for the write funnel." },
        { tech: "PostgreSQL", why: "Strong transactional guarantees for atomic entry + outbox writes." },
        { tech: "Apache Kafka", why: "Durable, ordered delivery of committed ledger events to consumers." },
        { tech: "Docker + GitHub Actions", why: "Reproducible builds and automated CI from the first commit." },
      ],
      implementation: [
        "Balanced double-entry posting with server-side validation",
        "Idempotency keys stored and checked on every write",
        "Transactional outbox pattern feeding Kafka",
        "Structured logging across the write and read paths",
      ],
      testing:
        "Service-level tests cover balancing rules, idempotent replay, and outbox behavior, run under GitHub Actions CI.",
      results: [
        "A ledger that is safe to retry and impossible to post twice",
        "An auditable, append-only history with downstream event delivery",
      ],
      lessons: [
        "The transactional outbox is the cleanest answer to the dual-write problem between a DB and a message bus.",
        "Idempotency belongs at the write boundary, not bolted on per endpoint.",
      ],
    },
  },
  {
    slug: "secondmem",
    name: "Secondmem",
    tagline: "Local-first knowledge management CLI",
    description:
      "A local, AI-assisted knowledge CLI with a full RAG pipeline, cosine-similarity retrieval over a SQLite vector store, an FTS5 keyword fallback, and citation lineage.",
    stack: ["Go", "SQLite", "RAG", "Embeddings", "OpenAI", "Ollama", "FTS5"],
    langTag: "GO",
    status: "Active",
    role: "Creator & sole engineer",
    period: "2026",
    github: "https://github.com/Rinil-Parmar/secondmem",
    featured: true,
    order: 3,
    highlights: [
      "Full RAG pipeline with cosine-similarity retrieval over a SQLite vector store",
      "FTS5 keyword fallback and SHA-256 deduplication",
      "Pluggable embeddings via OpenAI or local Ollama, with citation lineage",
    ],
    images: [
      {
        src: "/projects/secondmem.png",
        alt: "Secondmem CLI help output listing commands: ask, ingest, graph, rebalance, stats, tree, validate.",
        width: 1911,
        height: 1003,
        caption:
          "The secondmem CLI: ingest, ask, and manage the local LORE-GRAPH knowledge base.",
      },
    ],
    caseStudy: {
      problem:
        "Cloud note tools lock your knowledge into someone else's service and model. Secondmem keeps a searchable, AI-assisted knowledge base entirely on your machine, with retrieval you can trust and cite.",
      constraints: [
        "Must be local-first, with no required cloud dependency",
        "Retrieval must degrade gracefully when embeddings are unavailable",
        "Answers must be traceable back to their source notes",
      ],
      contributions: [
        "Built the full RAG pipeline: chunking, embedding, storage, retrieval, and synthesis",
        "Implemented cosine-similarity search over a SQLite-backed vector store",
        "Added an FTS5 keyword-graph fallback for when semantic search is not enough",
        "Enforced SHA-256 deduplication and a 70% semantic-similarity threshold, with citation lineage on every answer",
      ],
      architecture:
        "Documents are chunked, embedded (OpenAI or local Ollama), and stored as vectors in SQLite. Queries retrieve by cosine similarity with an FTS5 keyword fallback. A 7-step rebalance pipeline keeps the store consistent, and every answer carries citation lineage back to source chunks.",
      decisions: [
        {
          title: "SQLite as the vector store",
          body: "A single-file embedded database keeps Secondmem genuinely local and portable, with no server to run.",
        },
        {
          title: "Keyword fallback alongside vectors",
          body: "FTS5 catches exact-term matches that embeddings miss, so retrieval stays robust when semantics alone fall short.",
        },
        {
          title: "Pluggable embedding backends",
          body: "Supporting both OpenAI and Ollama lets the same tool run fully offline or with hosted models, the user's choice.",
        },
      ],
      stackWhy: [
        { tech: "Go", why: "A fast single binary that runs the whole pipeline locally with no runtime to install." },
        { tech: "SQLite + FTS5", why: "Embedded storage for vectors and a built-in full-text index in one file." },
        { tech: "OpenAI / Ollama", why: "Interchangeable embedding and generation backends, cloud or local." },
      ],
      implementation: [
        "Chunking and embedding pipeline with SHA-256 dedup",
        "Cosine-similarity retrieval plus FTS5 keyword graph",
        "Semantic-similarity checks at a 70% threshold",
        "7-step rebalance pipeline and citation lineage",
      ],
      testing:
        "Retrieval and dedup behavior are validated against representative note corpora; the pipeline is exercised end to end from ingest to cited answer.",
      results: [
        "A private knowledge base that answers questions with traceable citations",
        "Retrieval that stays useful offline via local embeddings",
      ],
      lessons: [
        "Hybrid retrieval (vectors + keywords) is far more reliable than either alone.",
        "Citation lineage turns an AI answer from a guess into something you can verify.",
      ],
    },
  },
  {
    slug: "remembering-lancers",
    name: "Remembering Lancers",
    tagline: "University of Windsor alumni discovery tool",
    description:
      "A full-stack Flask dashboard and configurable scraper that surfaces University of Windsor alumni records, built with the Alumni Department and IT as stakeholders.",
    stack: ["Python", "Flask", "PostgreSQL", "Beautiful Soup", "Docker", "Pytest"],
    langTag: "PYTHON",
    status: "In deployment",
    role: "Full-stack engineer",
    period: "2026 – Present",
    github: "https://github.com/Rinil-Parmar/remembering-lancers",
    featured: true,
    order: 4,
    highlights: [
      "Configurable scraper with resumable state and proximity keyword matching",
      "Searchable dashboard with CSV export and health-check endpoints",
      "Docker Compose, Pytest regression suite, and GitHub Actions CI",
    ],
    caseStudy: {
      problem:
        "The University of Windsor Alumni Department needed a way to discover and track alumni mentions across the web without re-running fragile one-off scripts. Remembering Lancers turns that into a resumable, searchable, privacy-aware tool.",
      constraints: [
        "Scraping must be resumable, since long runs cannot start over on failure",
        "Must respect privacy and data-governance expectations of a university stakeholder",
        "Needs to be operable by non-engineers through a dashboard",
      ],
      contributions: [
        "Built a configurable scraper with resumable state and proximity-based alumni keyword matching",
        "Developed a searchable dashboard with CSV export for the Alumni team",
        "Added health-check endpoints and a Pytest regression suite",
        "Containerized with Docker Compose and wired GitHub Actions CI",
      ],
      architecture:
        "A configurable scraper collects candidate pages, scores them with proximity-based keyword matching, and persists resumable state to PostgreSQL. A Flask dashboard serves search, filtering, and CSV export, with health-check endpoints for operational monitoring. The whole stack runs under Docker Compose.",
      decisions: [
        {
          title: "Resumable scraper state",
          body: "Persisting progress means a long crawl can recover from interruption instead of restarting, which matters for real-world runs.",
        },
        {
          title: "Dashboard for non-engineers",
          body: "The Alumni team operates the tool through search and export, not a terminal, so the UI is the real deliverable.",
        },
        {
          title: "Privacy by design",
          body: "Data governance was a first-class requirement given the university stakeholder, shaping what is stored and surfaced.",
        },
      ],
      stackWhy: [
        { tech: "Flask", why: "Lightweight, well-understood framework for the dashboard and health endpoints." },
        { tech: "Beautiful Soup", why: "Reliable HTML parsing for the configurable scraping layer." },
        { tech: "PostgreSQL", why: "Durable store for records and resumable scraper state." },
        { tech: "Docker Compose", why: "Reproducible multi-service setup for handoff to university infrastructure." },
      ],
      implementation: [
        "Proximity-based keyword matching to rank alumni mentions",
        "Resumable crawl state in PostgreSQL",
        "Search, filter, and CSV export in the dashboard",
        "Automated Pytest regression tests under CI",
      ],
      testing:
        "Automated Pytest regression tests guard the scraper and dashboard, run on every push through GitHub Actions.",
      results: [
        "A tool the Alumni Department can operate without engineering support",
        "Actively being deployed to University of Windsor infrastructure",
      ],
      lessons: [
        "Working with a real stakeholder makes data governance a design input, not an afterthought.",
        "Resumability is the difference between a demo scraper and one people actually run.",
      ],
    },
  },
  {
    slug: "secureshare",
    name: "SecureShare",
    tagline: "Secure one-time file sharing",
    description:
      "A secure file-sharing service with AES-GCM encryption at rest, 256-bit single-use access tokens, atomic one-time downloads, and replay prevention, live on Render.",
    stack: ["Python", "Flask", "PostgreSQL", "AES-GCM", "Pytest", "GitHub Actions"],
    langTag: "PYTHON",
    status: "Shipped",
    role: "Creator & sole engineer",
    period: "2026",
    github: "https://github.com/Rinil-Parmar/secure-one-time-file-sharing",
    demo: "https://secure-one-time-file-sharing.onrender.com/",
    featured: false,
    order: 5,
    highlights: [
      "AES-GCM encryption at rest with SHA-256 hashed 256-bit tokens",
      "Atomic one-time download with concurrent replay prevention",
      "15 Pytest tests, GitHub Actions CI, live on Render",
    ],
    images: [
      {
        src: "/projects/secureshare-upload.png",
        alt: "SecureShare upload screen: an AES-GCM encrypted confidential file with a configurable expiry and optional password.",
        width: 1881,
        height: 963,
        caption:
          "Creating a transfer: files are AES-GCM encrypted before storage, with a 1-minute-to-7-day expiry and optional password.",
      },
      {
        src: "/projects/secureshare-vault.png",
        alt: "SecureShare vault: a shared file with its latest link, expiry countdown, and a menu to create a new link or revoke the current one.",
        width: 1902,
        height: 949,
        caption:
          "The owner's vault: manage a file's active link, create a fresh one, or revoke access.",
      },
      {
        src: "/projects/secureshare-audit.png",
        alt: "SecureShare audit trail showing a completed download followed by a blocked attempt labelled 'link already used'.",
        width: 1885,
        height: 946,
        caption:
          "The audit trail proving one-time semantics: one successful download, then the next attempt blocked as 'link already used'.",
      },
    ],
    caseStudy: {
      problem:
        "Sharing a sensitive file over most tools leaves a copy sitting somewhere forever. SecureShare encrypts the file, hands out a single-use link, and guarantees exactly one download even under concurrent access.",
      constraints: [
        "A token must work exactly once, even if two requests race",
        "Files must be encrypted at rest, not just in transit",
        "Links must expire on a user-chosen schedule",
      ],
      contributions: [
        "Implemented AES-GCM encryption at rest and SHA-256 hashing of 256-bit access tokens",
        "Built atomic one-time download with concurrent replay prevention",
        "Added configurable expiration from 1 minute to 7 days and optional password protection",
        "Wrote 15 Pytest tests and GitHub Actions CI, and deployed to Render",
      ],
      architecture:
        "Uploaded files are encrypted with AES-GCM and stored in S3-compatible storage; metadata and hashed tokens live in Supabase PostgreSQL. A download atomically marks the token consumed so concurrent requests cannot both succeed. CSRF protection and a full audit log wrap the flow.",
      decisions: [
        {
          title: "Atomic token consumption",
          body: "Marking the token used in a single atomic step is what actually enforces one-time semantics under concurrency, because a check-then-act would race.",
        },
        {
          title: "AES-GCM at rest",
          body: "Authenticated encryption protects confidentiality and integrity of stored files, not just the transport.",
        },
        {
          title: "Hashed tokens",
          body: "Storing SHA-256 hashes means a database leak does not expose working download links.",
        },
      ],
      stackWhy: [
        { tech: "Flask", why: "Small surface area for a focused security-sensitive service." },
        { tech: "AES-GCM", why: "Authenticated encryption for confidentiality and tamper detection." },
        { tech: "Supabase PostgreSQL + S3 storage", why: "Managed, durable backing for metadata and encrypted blobs." },
        { tech: "Pytest + GitHub Actions", why: "A real test suite gating every deploy for security-critical paths." },
      ],
      implementation: [
        "256-bit access tokens, stored only as SHA-256 hashes",
        "Atomic one-time download with replay prevention",
        "Custom expiration (1 min–7 days) and optional password",
        "CSRF protection and a full audit log",
      ],
      testing:
        "15 Pytest tests cover encryption, token lifecycle, and replay prevention, run on GitHub Actions. Deployment is documented in DEPLOYMENT.md.",
      results: [
        "A live, deployed service enforcing true one-time downloads",
        "Security-critical paths guarded by an automated test suite",
      ],
      lessons: [
        "One-time semantics are a concurrency problem first and a crypto problem second.",
        "Storing hashes instead of secrets makes a breach far less damaging.",
      ],
    },
  },
  {
    slug: "ecg-arrhythmia-kan",
    name: "ECG Arrhythmia: KAN vs MLP",
    tagline: "KAN vs MLP for arrhythmia detection",
    description:
      "A benchmark comparing CNN+MLP and CNN+KAN classifiers on the MIT-BIH dataset for 5-class arrhythmia detection, with a live Streamlit dashboard.",
    stack: ["Python", "PyTorch", "Scikit-Learn", "Streamlit"],
    langTag: "PYTHON",
    status: "Research",
    role: "Creator & sole engineer",
    period: "2026",
    github: "https://github.com/Rinil-Parmar/ecg-arrhythmia-kan-comparison",
    featured: false,
    order: 6,
    highlights: [
      "5-class arrhythmia detection on 109K+ MIT-BIH beat segments",
      "CNN+KAN matched accuracy with ~11% fewer parameters",
      "98.0% accuracy, 0.992 macro AUC, live Streamlit dashboard",
    ],
    caseStudy: {
      problem:
        "Kolmogorov-Arnold Networks (KAN) are a newer alternative to MLP classification heads. This project asks a concrete question: on real ECG arrhythmia data, does a CNN+KAN head match a CNN+MLP head, and at what parameter cost?",
      constraints: [
        "Both models must share the same encoder for a fair comparison",
        "Evaluation must use a standard, recognized dataset",
        "Results must be inspectable, not just a single accuracy number",
      ],
      contributions: [
        "Built a shared 1D CNN encoder feeding both MLP and KAN classification heads",
        "Trained and evaluated 5-class detection on 109K+ MIT-BIH beat segments",
        "Measured accuracy, macro AUC, and parameter counts for both heads",
        "Shipped a live Streamlit dashboard to explore predictions",
      ],
      architecture:
        "A shared 1D CNN extracts features from ECG beat segments. Two interchangeable heads, an MLP and a KAN, sit on top, so differences come from the head alone. Metrics and predictions are surfaced through a Streamlit dashboard.",
      decisions: [
        {
          title: "Shared encoder, swappable head",
          body: "Holding the CNN encoder constant isolates the comparison to the classification head, which is the actual research question.",
        },
        {
          title: "Parameter count as a first-class metric",
          body: "Matching accuracy is only interesting alongside cost, so parameters are reported next to accuracy, not hidden.",
        },
      ],
      stackWhy: [
        { tech: "PyTorch", why: "Flexible model definition for the custom KAN head and shared encoder." },
        { tech: "MIT-BIH dataset", why: "A standard arrhythmia benchmark for credible, comparable results." },
        { tech: "Streamlit", why: "A fast way to make the model explorable rather than a static notebook." },
      ],
      implementation: [
        "1D CNN encoder over beat segments",
        "Interchangeable MLP and KAN classification heads",
        "Standard train/test evaluation with macro AUC",
        "Interactive Streamlit prediction dashboard",
      ],
      testing:
        "Models are evaluated on held-out MIT-BIH data with accuracy and macro-AUC reporting across all five classes.",
      results: [
        "98.0% accuracy and 0.992 macro AUC",
        "CNN+KAN matched accuracy with roughly 11% fewer parameters than CNN+MLP",
      ],
      lessons: [
        "KAN heads can be a genuinely cheaper alternative to MLPs at comparable accuracy.",
        "A fair architecture comparison lives or dies on holding everything else constant.",
      ],
    },
  },
  {
    slug: "cross-engine-cost-model",
    name: "Cross-Engine Cost Model",
    tagline: "Learned SQL engine selection",
    description:
      "A learned cost model that routes each query to SQLite or DuckDB using engineered features over TPC-H workloads, outperforming an always-DuckDB baseline.",
    stack: ["Python", "Scikit-Learn", "DuckDB", "SQLite", "Pandas", "NumPy"],
    langTag: "PYTHON",
    status: "Research",
    role: "Creator & sole engineer",
    period: "2026",
    github: "https://github.com/Rinil-Parmar/cross-engine-learned-cost-model",
    featured: false,
    order: 7,
    highlights: [
      "Routes queries between SQLite and DuckDB with 25 engineered features",
      "Trained on 3,100+ TPC-H benchmark variants",
      "98.94% accuracy, beating always-DuckDB by ~9pp",
    ],
    caseStudy: {
      problem:
        "No single query engine wins everywhere: SQLite is great for some shapes, DuckDB for others. This project learns, per query, which engine to use, instead of committing to one.",
      constraints: [
        "The router must decide from features available before execution",
        "Training data must be reproducible and benchmark-grounded",
        "It has to beat the obvious baseline of always picking the faster-on-average engine",
      ],
      contributions: [
        "Engineered 25 features describing each query and workload",
        "Generated 3,100+ TPC-H benchmark variants as labeled training data",
        "Trained Random Forest and Gradient Boosting routers with reproducible splits",
        "Built an automated ETL/ELT pipeline with full logging",
      ],
      architecture:
        "An automated pipeline runs TPC-H query variants on both engines to label the faster one, extracts 25 features per query, and trains tree-based classifiers to predict the better engine. Splits are fixed for reproducibility and the full pipeline is logged.",
      decisions: [
        {
          title: "Tree ensembles over deep models",
          body: "Random Forest and Gradient Boosting fit tabular, engineered features well and stay interpretable, the right tool for this data.",
        },
        {
          title: "Benchmark-generated labels",
          body: "Running both engines to label ground truth makes the training signal real measured latency, not a heuristic.",
        },
      ],
      stackWhy: [
        { tech: "Scikit-Learn", why: "Solid, well-tested implementations of the tree ensembles used for routing." },
        { tech: "DuckDB + SQLite", why: "The two engines being routed between, and the sources of ground-truth timings." },
        { tech: "Pandas / NumPy", why: "Feature engineering and dataset assembly over the benchmark runs." },
      ],
      implementation: [
        "25 engineered per-query features",
        "3,100+ labeled TPC-H variants",
        "Random Forest and Gradient Boosting routers",
        "Reproducible splits and full pipeline logging",
      ],
      testing:
        "Models are evaluated on held-out query variants with fixed splits for reproducibility.",
      results: [
        "98.94% routing accuracy",
        "Roughly 9 percentage points better than an always-DuckDB baseline",
      ],
      lessons: [
        "Engine selection is a learnable problem when you can generate honest labels.",
        "Reproducible splits are non-negotiable for trusting a benchmark result.",
      ],
    },
  },
  {
    slug: "heritage-ecm",
    name: "Heritage ECM",
    tagline: "Mayan EDMS on a university VM",
    description:
      "An enterprise content management platform (Mayan EDMS) for archaeological and historical research, deployed to a University of Windsor VM behind Nginx with an approval-gated GitHub Actions pipeline.",
    stack: ["Mayan EDMS", "Docker", "Nginx", "GitHub Actions", "PostgreSQL", "Linux VM"],
    langTag: "DEVOPS",
    status: "Active",
    role: "Platform & DevOps · Team 05",
    period: "2026",
    github: "https://github.com/Rinil-Parmar/heritage-ecm",
    featured: false,
    order: 8,
    highlights: [
      "Mayan EDMS on a University of Windsor VM (archeoecm.cs.uwindsor.ca), behind Nginx over HTTPS",
      "Approval-gated GitHub Actions deploy with a self-hosted VM runner and preflight validation",
      "Rootless-Docker Compose stack (Mayan, PostgreSQL, RabbitMQ, Redis) on persistent volumes",
    ],
    caseStudy: {
      problem:
        "Archaeological and historical research produces documents (maps, photographs, excavation reports, artifact records) that need structured storage, metadata, and controlled access. This COMP 8977 team project (Team 05) selects and operates an enterprise content management platform for that purpose, deployed safely to a University of Windsor VM.",
      constraints: [
        "Runs on a shared university VM, so Docker must be rootless and the app kept off the public interface",
        "Production deploys must be deliberate and owner-approved, never an automatic side effect of a merge",
        "Sensitive research data and secrets must never leak into Git, logs, or chat",
      ],
      contributions: [
        "Evaluated ECM platforms and selected Mayan EDMS over Alfresco for the research-document use case",
        "Deployed Mayan on a University of Windsor VM behind Nginx over HTTPS, with Docker bound to localhost",
        "Built an approval-gated GitHub Actions pipeline with a self-hosted VM runner, preflight checks, and a production environment gate",
        "Hardened the setup with rootless Docker, a protected main, required CI, and secrets kept only in the VM's .env",
      ],
      architecture:
        "Mayan EDMS runs as a rootless-Docker Compose project (archeoecm) on the VM: Mayan s4.12 with PostgreSQL, RabbitMQ, and Redis on persistent volumes, bound to 127.0.0.1:8080. Nginx reverse-proxies public HTTPS at archeoecm.cs.uwindsor.ca. Changes flow through a protected main with required CI; a manual deploy workflow runs preflight, pauses at an owner-approved production gate, then a self-hosted runner pulls images, applies Compose, and health-checks the app.",
      decisions: [
        {
          title: "Adopt Mayan, don't build an ECM",
          body: "A mature document platform provides versioning, metadata, and permissions out of the box, so the engineering effort goes into integration and safe operation rather than reinventing storage. Alfresco was evaluated and set aside.",
        },
        {
          title: "Manual, approval-gated deploys",
          body: "Merging to main never deploys. A human owner triggers deployment and approves the production environment gate, so every production change is deliberate, which is appropriate for irreplaceable research records.",
        },
        {
          title: "Rootless Docker, bound to localhost",
          body: "On a shared university VM, running Docker rootless and keeping Mayan on 127.0.0.1 behind Nginx limits blast radius and keeps the app off the public interface.",
        },
      ],
      stackWhy: [
        { tech: "Mayan EDMS", why: "A proven document platform with versioning, metadata, and role-based access built in." },
        { tech: "Docker Compose (rootless)", why: "Reproducible multi-service deployment without root on a shared VM." },
        { tech: "Nginx", why: "Reverse proxy and TLS termination so Mayan can stay bound to localhost." },
        { tech: "GitHub Actions + self-hosted runner", why: "CI validation plus an on-VM runner that applies deploys where the containers live." },
      ],
      implementation: [
        "Compose project archeoecm: Mayan s4.12 with PostgreSQL, RabbitMQ, and Redis on persistent volumes",
        "Nginx reverse proxy to Mayan on 127.0.0.1:8080 over public HTTPS",
        "Preflight workflow validating rootless Docker, Compose, and .env without exposing secrets",
        "Production environment gate requiring owner approval, with admin bypass disabled and deploys restricted to main",
      ],
      testing:
        "CI validates the repository and the Mayan Compose file on every pull request into protected main; the deploy workflow's preflight validates the VM environment, and a post-deploy health check confirms Mayan responds with a 200 or 302.",
      results: [
        "Mayan EDMS running on the university VM behind Nginx, deployed through an approval-gated pipeline",
        "A reproducible, owner-controlled deploy process with no direct pushes to production",
      ],
      lessons: [
        "On shared infrastructure, the deployment safeguards (rootless Docker, approval gates, localhost binding) are as much of the work as the application itself.",
        "Verified off-VM backups must come before a service is trusted with irreplaceable records, which is the next milestone.",
      ],
    },
  },
];

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);

export const allProjects = [...projects].sort((a, b) => a.order - b.order);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
