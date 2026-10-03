export type ShowcaseLink = { label: string; href: string };
export type ShowcaseFrame = { src: string; alt: string; title: string; body: string };

export type Showcase = {
  id: string;
  headline: string;
  summary: string;
  links: ShowcaseLink[];
  stack: string[];
  note?: string;
  aspect: string; // CSS aspect-ratio of the device frame
  frameSize: { w: number; h: number };
  video: { src: string; poster: string; label: string };
  videoCaption: { title: string; body: string };
  frames: ShowcaseFrame[];
};

export const showcases: Showcase[] = [
  {
    id: "papertrail",
    headline: "Every claim, a page, an exact quote.",
    summary:
      "Paper Trail turns an AI/ML paper into a workspace where every claim points back to a page and an exact quote. A verifier written as ordinary code, not a model, checks each quote against the page it cites.",
    links: [{ label: "View on GitHub", href: "https://github.com/utkarshpophli/PaperTrail" }],
    stack: ["Next.js 16", "React 19", "TypeScript", "FastAPI", "PostgreSQL + pgvector", "PyMuPDF"],
    note: "Runs on the model you choose: NVIDIA NIM, Anthropic, OpenAI, Gemini, OpenRouter, Groq, Ollama, LM Studio or llama.cpp.",
    aspect: "16 / 10",
    frameSize: { w: 1440, h: 900 },
    video: { src: "/papertrail/demo.mp4", poster: "/papertrail/demo-poster.jpg", label: "Paper Trail product demo" },
    videoCaption: { title: "Watch the demo", body: "A walkthrough of Paper Trail working on a real paper." },
    frames: [
      {
        src: "/papertrail/story.jpg",
        alt: "Paper Trail story mode showing a paper map and key numbers",
        title: "Read it as a story",
        body: "The paper becomes a narrative with a paper map and the key numbers up front. Every section ends in source tags.",
      },
      {
        src: "/papertrail/evidence.jpg",
        alt: "Paper Trail evidence drawer showing a claim and its exact passage",
        title: "Open the evidence",
        body: "Click a source tag and the drawer shows the claim, its kind, its status and the exact passage from that page.",
      },
      {
        src: "/papertrail/claims.jpg",
        alt: "Paper Trail claims list with verification status for each quote",
        title: "Verified by code",
        body: "Each quote is searched on the page it cites and marked verified, partially matched, mismatch or not found.",
      },
      {
        src: "/papertrail/health.jpg",
        alt: "Paper Trail evidence health panel showing coverage gaps",
        title: "See where evidence is thin",
        body: "Evidence health is computed in your browser, with no model involved: verified counts, uncited pages and weakly supported sections.",
      },
    ],
  },
  {
    id: "glow",
    headline: "One sentence in, a finished file out.",
    summary:
      "GLOW (General Local Offline Windows-agent) is an autonomous, vision-first assistant that sees, understands and controls a Windows PC, through a Planner, Executor and Verifier and 92 custom tools.",
    links: [{ label: "View on GitHub", href: "https://github.com/utkarshpophli/GLOW" }],
    stack: ["Python", "PyQt6", "Multi-agent", "Vision-first"],
    note: "Works with Groq, Gemini Vision, Claude, OpenAI and local Ollama models.",
    aspect: "16 / 9",
    frameSize: { w: 1600, h: 900 },
    video: { src: "/showcase/glow/video.mp4", poster: "/showcase/glow/poster.jpg", label: "GLOW film" },
    videoCaption: { title: "Watch the film", body: "A 21-second film of GLOW at work." },
    frames: [
      {
        src: "/showcase/glow/f1.jpg",
        alt: "GLOW's glowing orb above a text bar with the request typed in",
        title: "Say it in a sentence",
        body: "Type a plain-English request, like asking GLOW to analyze a chart on your screen and save a summary to report.txt.",
      },
      {
        src: "/showcase/glow/f2.jpg",
        alt: "The GLOW wordmark with its full name beneath",
        title: "An agent that can see",
        body: "General Local Offline Windows-agent: it can see, understand, and control your Windows PC.",
      },
      {
        src: "/showcase/glow/f3.jpg",
        alt: "Planner, Executor and Verifier stages beside four completed steps and a created report.txt",
        title: "Plan, act, verify",
        body: "A vision loop takes a screenshot, analyzes it, acts, then checks the result. The file holds the real analysis, not placeholders.",
      },
      {
        src: "/showcase/glow/f4.jpg",
        alt: "A counter reading 92 tools beside eight tool categories",
        title: "92 tools",
        body: "File and OS, browser, Office, AI-powered, vision, system, dev and input tools: comprehensive Windows automation.",
      },
    ],
  },
  {
    id: "mlscratch",
    headline: "Watch the maths run.",
    summary:
      "Machine Learning Algorithms From Scratch: 14 classic algorithms in Python and NumPy, with a Streamlit app that visualizes each one in interactive Plotly charts.",
    links: [
      { label: "View on GitHub", href: "https://github.com/utkarshpophli/ml-algorithms-from-scratch" },
      {
        label: "Live demo",
        href: "https://ml-algorithms-from-scratch-lnvbwmqcoy5ds2vzmrbf7w.streamlit.app/",
      },
    ],
    stack: ["Python", "NumPy", "Plotly", "Streamlit"],
    aspect: "16 / 9",
    frameSize: { w: 1600, h: 900 },
    video: {
      src: "/showcase/mlscratch/video.mp4",
      poster: "/showcase/mlscratch/poster.jpg",
      label: "Machine Learning Algorithms From Scratch film",
    },
    videoCaption: { title: "Watch the film", body: "A 22-second film of the algorithms running." },
    frames: [
      {
        src: "/showcase/mlscratch/f1.jpg",
        alt: "Streamlit app showing linear regression fitted to scattered points, with error metrics",
        title: "Gradient descent, live",
        body: "Weights start at zero and the repo's own update rule fits the line. The error metrics update as it learns.",
      },
      {
        src: "/showcase/mlscratch/f2.jpg",
        alt: "The algorithm menu open in the Streamlit sidebar",
        title: "Pick any algorithm",
        body: "The sidebar lists every algorithm in the app, from Linear Regression to Activation Function.",
      },
      {
        src: "/showcase/mlscratch/f3.jpg",
        alt: "K-Means clustering with five colored clusters and their centroids",
        title: "K-Means, step by step",
        body: "Plot Steps shows the centroids moving and the clusters reassigning, iteration by iteration.",
      },
      {
        src: "/showcase/mlscratch/f4.jpg",
        alt: "Relu, sigmoid, tanh and linear activation functions drawn on a number plane",
        title: "Activation functions",
        body: "Relu, sigmoid, tanh and linear: the activation functions the neural network code is built on.",
      },
    ],
  },
];
