export type Skill = { name: string; used?: string };
export type SkillGroup = { id: string; label: string; blurb: string; hue: number; skills: Skill[] };

// "used" is only set where the resume or the Paper Trail README backs it up.
export const skillGroups: SkillGroup[] = [
  {
    id: "agents",
    hue: 200, // HSL hue shared by the UI and the graph
    label: "Agents and orchestration",
    blurb: "Multi-agent systems that plan, act and verify.",
    skills: [
      { name: "LangGraph", used: "Fractal, Green Rider" },
      { name: "Temporal workflows", used: "Fractal" },
      { name: "Multi-agent orchestration", used: "Fractal, GLOW" },
      { name: "LangChain" },
      { name: "CrewAI" },
      { name: "LlamaIndex" },
      { name: "Microsoft Copilot Studio" },
      { name: "Tool integrations" },
      { name: "Agentic memory" },
    ],
  },
  {
    id: "genai",
    hue: 275, // HSL hue shared by the UI and the graph
    label: "LLM and GenAI",
    blurb: "From retrieval to fine-tuning, with guardrails.",
    skills: [
      { name: "RAG pipelines", used: "Fractal, Siemens" },
      { name: "Chunking and embeddings", used: "Fractal, Siemens" },
      { name: "Structured outputs", used: "Fractal" },
      { name: "Prompt and model management", used: "Fractal" },
      { name: "Fine-tuning" },
      { name: "LoRA" },
      { name: "QLoRA" },
      { name: "RLHF" },
      { name: "Guardrails" },
      { name: "Responsible AI" },
    ],
  },
  {
    id: "ml",
    hue: 110, // HSL hue shared by the UI and the graph
    label: "ML and deep learning",
    blurb: "Models built on linear algebra, probability, statistics and optimization.",
    skills: [
      { name: "Time series modeling", used: "Siemens" },
      { name: "NLP" },
      { name: "Named entity recognition" },
      { name: "Text classification" },
      { name: "PyTorch" },
      { name: "TensorFlow" },
      { name: "Hugging Face Transformers" },
      { name: "scikit-learn" },
      { name: "XGBoost" },
      { name: "LightGBM" },
      { name: "spaCy" },
      { name: "OpenCV" },
    ],
  },
  {
    id: "cloud",
    hue: 38, // HSL hue shared by the UI and the graph
    label: "Cloud and MLOps",
    blurb: "Containerized, monitored and shipped through pipelines.",
    skills: [
      { name: "Azure OpenAI Service", used: "Fractal, Green Rider" },
      { name: "AKS", used: "Fractal" },
      { name: "Docker", used: "Fractal" },
      { name: "CI/CD pipelines", used: "Fractal, Green Rider" },
      { name: "AWS", used: "Siemens" },
      { name: "Azure AI Foundry" },
      { name: "Azure ML" },
      { name: "Azure AI Search" },
      { name: "SageMaker" },
      { name: "Bedrock" },
      { name: "Vertex AI" },
      { name: "Kubernetes" },
      { name: "vLLM" },
      { name: "Ollama" },
    ],
  },
  {
    id: "eval",
    hue: 5, // HSL hue shared by the UI and the graph
    label: "Evaluation",
    blurb: "Scoring models before and after they ship.",
    skills: [
      { name: "MLflow", used: "Siemens" },
      { name: "Offline regression testing", used: "Fractal, Siemens" },
      { name: "Benchmark design", used: "Fractal" },
      { name: "Automated and human evaluation" },
      { name: "BLEU" },
      { name: "ROUGE" },
    ],
  },
  {
    id: "software",
    hue: 165, // HSL hue shared by the UI and the graph
    label: "Software and data",
    blurb: "Clean Python and the data stores behind it.",
    skills: [
      { name: "Python" },
      { name: "SQL" },
      { name: "FastAPI", used: "Paper Trail" },
      { name: "PostgreSQL", used: "Paper Trail" },
      { name: "TypeScript", used: "Paper Trail" },
      { name: "Next.js", used: "Paper Trail" },
      { name: "REST APIs", used: "Siemens" },
      { name: "Design patterns" },
      { name: "Asynchronous programming" },
      { name: "Automated testing" },
      { name: "MongoDB" },
      { name: "Pinecone" },
      { name: "ChromaDB" },
      { name: "FAISS" },
    ],
  },
];
