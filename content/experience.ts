export type Viz = "down" | "up" | "ring" | "range";

export type Metric = {
  to: number;
  prefix?: string;
  suffix?: string;
  label: string;
  viz: Viz;
  from?: number; // start of the range, for "range" charts
};

export type Role = {
  id: string;
  company: string;
  initials: string;
  hue: number; // HSL hue for this role's colour
  role: string;
  place: string;
  period: string;
  metrics: Metric[]; // the first one is the hero metric
  bullets: string[];
};

export const experience: Role[] = [
  {
    id: "fractal",
    company: "Fractal Analytics",
    initials: "FA",
    hue: 200,
    role: "Data Scientist",
    place: "Pune",
    period: "11/2025 - Present",
    metrics: [
      { to: 40, suffix: "%", label: "lower multi-agent pipeline latency", viz: "down" },
      { to: 84, suffix: "%", label: "RAG retrieval precision, up from 61%", viz: "range", from: 61 },
      { to: 99, prefix: ">", suffix: "%", label: "uptime across 3 enterprise clients", viz: "ring" },
    ],
    bullets: [
      "Cut multi-agent pipeline latency by 40% across Fortune 500 deployments with a Temporal + LangGraph hybrid architecture, containerized with Docker and shipped through CI/CD gates.",
      "Raised RAG retrieval precision from 61% to 84% with a chunking and retrieval scoring framework built on offline regression checks, cutting hallucination incidents by 35%.",
      "Deployed enterprise GenAI services on Azure OpenAI Service and AKS, owning model selection, prompt management and structured output contracts.",
      "Authored ADRs and technical whitepapers on agentic AI platform architecture, contributing to engineering standards and reusable frameworks.",
    ],
  },
  {
    id: "greenrider",
    company: "Green Rider Technology",
    initials: "GR",
    hue: 38,
    role: "Software Engineer, AI/ML",
    place: "Gurugram",
    period: "09/2025 - 11/2025",
    metrics: [
      { to: 35, suffix: "%", label: "faster query resolution", viz: "up" },
      { to: 8, prefix: "<", suffix: "%", label: "agent fallback rate", viz: "ring" },
      { to: 25, suffix: "%", label: "developer productivity gain", viz: "up" },
    ],
    bullets: [
      "Built conversational AI agents over unstructured support data, with rubric-based evaluation and human-escalation triggers.",
      "Architected an enterprise coding assistant with a ReAct-style orchestration layer on Azure OpenAI Service, including retrieval quality evaluation and failure-mode tracing.",
      "Shipped reusable LangGraph templates with CI/CD hooks and onboarding guides, cutting prototype-to-production time by 30% and mentoring engineers across three product teams.",
    ],
  },
  {
    id: "siemens",
    company: "Siemens R&D",
    initials: "SR",
    hue: 165,
    role: "AI/ML Engineer",
    place: "Goa",
    period: "09/2024 - 09/2025",
    metrics: [
      { to: 60, suffix: "%", label: "less time to query internal documents", viz: "down" },
      { to: 25, suffix: "%", label: "model accuracy gain", viz: "up" },
      { to: 35, suffix: "%", label: "better signal quality", viz: "up" },
    ],
    bullets: [
      "Architected an enterprise RAG chatbot on AWS with retrieval scoring, chunking evaluation and a runbook covering alerting, degradation handling and incident response.",
      "Improved time series model accuracy and signal quality through EDA, feature engineering and hyperparameter optimization, tracked in MLflow and checked with offline regression tests and a Streamlit observability dashboard.",
      "Deployed containerized REST APIs on Azure with production monitoring and documented rollback procedures, resolving critical backend reliability issues on ElectrificationX.",
    ],
  },
];
