"use client";

import {
  AlertTriangle,
  Binary,
  Brain,
  CheckCircle2,
  ClipboardList,
  Cpu,
  Database,
  GitBranch,
  GitPullRequest,
  Globe,
  Inbox,
  ListFilter,
  Network,
  PlayCircle,
  Quote,
  Radio,
  Scale,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { PipelineDiagram, type PipelineStep } from "@/components/pipeline-diagram";

type DiagramConfig = {
  label: string;
  steps: PipelineStep[];
  footnote?: string;
  initial?: string;
};

const finledger: DiagramConfig = {
  label: "Write path · interactive",
  initial: "funnel",
  steps: [
    {
      id: "request",
      label: "Write request",
      sub: "Client / API",
      icon: Send,
      detail:
        "Every balance-changing request, whether a posting or a transfer, enters through a single API surface.",
      why: "One entry point means there is no side door that can bypass validation.",
    },
    {
      id: "funnel",
      label: "Write funnel",
      sub: "Single mutation path",
      icon: GitBranch,
      detail:
        "All mutations are routed through one funnel that validates, balances, and appends in a defined order.",
      why: "Validation and balancing live in exactly one place instead of scattered across endpoints.",
    },
    {
      id: "idempotency",
      label: "Idempotency check",
      sub: "Replay-safe",
      icon: CheckCircle2,
      detail:
        "Each request carries an idempotency key. A repeated key returns the original result instead of posting again.",
      why: "Network retries and client bugs can't double-post to a financial ledger.",
    },
    {
      id: "posting",
      label: "Double-entry posting",
      sub: "Debits = credits",
      icon: Scale,
      detail:
        "The entry is recorded as balanced debit and credit lines; an unbalanced posting is rejected.",
      why: "Double-entry is self-checking, so the books can't silently drift out of balance.",
    },
    {
      id: "ledger",
      label: "Append-only ledger",
      sub: "PostgreSQL",
      icon: Database,
      detail:
        "Entries are appended, never updated or deleted. Corrections are new entries referencing the original.",
      why: "An immutable history is auditable and can be replayed to reconstruct any balance.",
    },
    {
      id: "outbox",
      label: "Transactional outbox",
      sub: "Same transaction",
      icon: Inbox,
      detail:
        "The event to publish is written to an outbox table inside the same DB transaction as the ledger entry.",
      why: "The entry and its event commit or fail together, with no dual-write inconsistency.",
    },
    {
      id: "kafka",
      label: "Kafka",
      sub: "Committed events",
      icon: Radio,
      detail:
        "A relay publishes committed outbox rows to Kafka for downstream consumers, in order.",
      why: "Consumers see every committed change exactly once, without polling the database.",
    },
  ],
  footnote:
    "Reads are served by a separate path that queries balances and history from the append-only ledger, so reporting never contends with the write funnel.",
};

const aros: DiagramConfig = {
  label: "Agent workflow · interactive",
  initial: "plan",
  steps: [
    {
      id: "plan",
      label: "Plan",
      sub: "Parallel agent drafts",
      icon: ClipboardList,
      detail:
        "Each enabled agent (Claude Code, OpenCode, Copilot) drafts a plan in parallel, then a judge agent synthesizes them into one.",
      why: "Several independent drafts plus a reconciling judge beat any single agent's first guess.",
    },
    {
      id: "approve",
      label: "Approval gate",
      sub: "Human checkpoint",
      icon: UserCheck,
      detail:
        "You approve the synthesized plan or send feedback for another pass before anything is divided into work.",
      why: "Nothing proceeds on an agent's say-so; a human signs off at every phase boundary.",
    },
    {
      id: "divide",
      label: "Divide",
      sub: "Tasks + dependencies",
      icon: GitBranch,
      detail:
        "The judge breaks the approved plan into tasks, assigns each to an agent, and records dependencies in an assignment table you approve.",
      why: "Explicit dependencies are what let independent tasks run in parallel safely.",
    },
    {
      id: "work",
      label: "Work",
      sub: "Dependency-ordered",
      icon: Cpu,
      detail:
        "Agents execute tasks in dependency order, running in parallel up to max_concurrent (default 2). An agent pauses for a critical decision by emitting a human-handoff marker.",
      why: "Bounded concurrency with human pause points keeps autonomous work controllable.",
    },
    {
      id: "failure",
      label: "Blocking & retry",
      sub: "Fail-isolated",
      icon: AlertTriangle,
      detail:
        "A failed task and its dependents are marked blocked while the rest of the run continues; re-running work retries just the blocked tasks, and over-time subprocesses are killed.",
      why: "One failing task shouldn't sink the whole run, and retries stay cheap and targeted.",
    },
    {
      id: "memory",
      label: "Shared memory",
      sub: "Secondmem (optional)",
      icon: Brain,
      detail:
        "Agents query Secondmem for context before planning; approved plans and task outputs are ingested back, and work-phase agents receive that context in their prompts.",
      why: "Persistent memory carries context across phases and runs instead of starting cold.",
    },
  ],
  footnote:
    "Agents share one working tree with no locking, so Aros recommends committing to git first or setting max_concurrent = 1 to avoid two tasks overwriting the same file. Per-run logging of prompts and outputs is on the roadmap.",
};

const secondmem: DiagramConfig = {
  label: "Retrieval (RAG) · interactive",
  initial: "embed",
  steps: [
    {
      id: "embed",
      label: "Embed query",
      sub: "Vector search",
      icon: Binary,
      detail:
        "The question is embedded and compared by cosine similarity against every chunk vector stored in SQLite.",
      why: "Semantic search finds relevant passages even when the wording is different.",
    },
    {
      id: "topk",
      label: "Top-k context",
      sub: "Best 6 chunks",
      icon: ListFilter,
      detail:
        "The six most similar chunks are passed to the LLM as grounding context for the answer.",
      why: "A small, relevant context beats stuffing the whole knowledge base into the prompt.",
    },
    {
      id: "fallback",
      label: "Keyword + graph fallback",
      sub: "FTS5 + LORE-GRAPH",
      icon: Network,
      detail:
        "If no chunk matches, the LLM rewrites the question into FTS5 keywords, runs a prefix search, and expands along graph edges.",
      why: "Exact-term and structural matches catch what pure embeddings miss.",
    },
    {
      id: "synth",
      label: "Synthesize",
      sub: "Grounded answer",
      icon: Sparkles,
      detail:
        "The LLM composes an answer from the retrieved context, using local llama3.2 by default or OpenAI / Copilot.",
      why: "The answer is grounded in your own notes, not the model's training memory.",
    },
    {
      id: "cite",
      label: "Citations",
      sub: "--cite",
      icon: Quote,
      detail:
        "With the --cite flag, the source markdown paths that informed the answer are appended.",
      why: "An answer you can trace back to its source is one you can actually trust.",
    },
  ],
  footnote:
    "Ingestion runs first: SHA-256 dedup, LLM classification into topic markdown, semantic dedup at a 70% threshold, hierarchy update, a LORE-GRAPH node with topic edges, chunk embeddings in SQLite, and bidirectional cross-links. Everything stays on-device, with no cloud vector store.",
};

const heritage: DiagramConfig = {
  label: "Deploy pipeline · interactive",
  initial: "branch",
  steps: [
    {
      id: "branch",
      label: "Feature branch + PR",
      sub: "Protected main",
      icon: GitPullRequest,
      detail:
        "Changes go through a feature branch and a pull request into a protected main; direct pushes are blocked.",
      why: "A protected main with required review keeps the production source clean.",
    },
    {
      id: "ci",
      label: "CI validation",
      sub: "GitHub-hosted runner",
      icon: CheckCircle2,
      detail:
        "The 'Validate repository and Mayan Compose' check runs on a GitHub-hosted runner and must pass before merge. Merging does not deploy anything.",
      why: "Catching Compose and config errors before merge separates integration from deployment.",
    },
    {
      id: "dispatch",
      label: "Manual deploy workflow",
      sub: "validate | deploy",
      icon: PlayCircle,
      detail:
        "'Deploy Mayan to university VM' is triggered manually and offers a validate-only or a deploy operation.",
      why: "Production changes are deliberate actions, never an automatic side effect of a merge.",
    },
    {
      id: "preflight",
      label: "Preflight",
      sub: "No service changes",
      icon: ShieldCheck,
      detail:
        "Preflight checks rootless Docker and validates the VM Compose file and .env without exposing secrets, changing nothing that is running.",
      why: "Verify the environment is sound before touching live services.",
    },
    {
      id: "gate",
      label: "Approval gate",
      sub: "mayan-production",
      icon: UserCheck,
      detail:
        "The deploy job pauses at the mayan-production environment gate, which requires owner approval; admin bypass is disabled and deploys are restricted to main.",
      why: "A human owner authorizes every production deploy, with no bypass.",
    },
    {
      id: "runner",
      label: "Self-hosted runner",
      sub: "archeoecm-runner",
      icon: Server,
      detail:
        "A self-hosted runner on the VM (label ecm-deploy) pulls images and applies the Compose project with -p archeoecm.",
      why: "The deploy executes on the VM itself, right next to the containers it manages.",
    },
    {
      id: "serve",
      label: "Nginx → Mayan",
      sub: "archeoecm.cs.uwindsor.ca",
      icon: Globe,
      detail:
        "Nginx reverse-proxies public HTTPS to Mayan, which stays bound to 127.0.0.1:8080; a post-deploy health check expects a 200 or 302.",
      why: "Binding Mayan to localhost behind Nginx keeps the app off the public interface.",
    },
  ],
  footnote:
    "Services run as a rootless-Docker Compose project (archeoecm): Mayan EDMS s4.12 with PostgreSQL, RabbitMQ, and Redis on persistent volumes. Secrets stay in the VM's .env; verified off-VM backups are the next milestone.",
};

const diagrams: Record<string, DiagramConfig> = {
  finledger,
  aros,
  secondmem,
  "heritage-ecm": heritage,
};

export function ProjectDiagram({ slug }: { slug: string }) {
  const config = diagrams[slug];
  if (!config) return null;
  return (
    <div className="mt-8">
      <PipelineDiagram
        label={config.label}
        steps={config.steps}
        footnote={config.footnote}
        initial={config.initial}
      />
    </div>
  );
}
