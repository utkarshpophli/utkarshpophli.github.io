export type Project = {
  id: string;
  title: string;
  blurb: string;
  tags: string[];
  href: string;
  img?: { src: string; alt: string; w: number; h: number };
  big?: string; // typographic fallback when there is no image
};

export const projects: Project[] = [
  {
    id: "tryon",
    title: "Virtual Try-On",
    blurb:
      "Try on clothes digitally with AI-powered image synthesis for a seamless and realistic virtual fitting experience.",
    tags: ["Computer vision", "Image processing"],
    href: "https://github.com/utkarshpophli/virtual-try-on-outfit-change",
    img: { src: "/img/tryon.webp", alt: "The same model shown in three generated outfits", w: 1080, h: 1080 },
  },
  {
    id: "llama",
    title: "LLaMA Math Wizard",
    blurb: "A fine-tuned LLaMA built for cracking math problems with AI-powered precision.",
    tags: ["LLM", "Fine-tuning", "NLP"],
    href: "https://github.com/utkarshpophli/llama-math-finetuning",
    img: { src: "/img/llama.webp", alt: "A llama in front of a chalkboard of equations", w: 710, h: 710 },
  },
  {
    id: "gita",
    title: "Gita Guru",
    blurb:
      "An AI companion that pairs the Bhagavad Gita with modern language models to offer personalized guidance and insights.",
    tags: ["LLM", "Fine-tuning", "NLP"],
    href: "https://github.com/utkarshpophli/bhagavad_gita_llama",
    img: { src: "/img/gita.webp", alt: "Bhagavad-Gita-LLM title card", w: 813, h: 428 },
  },
  {
    id: "gemma",
    title: "Gemma Fine-tuning with LoRA",
    blurb: "Fine-tuning Gemma for a tailored language model, using LoRA and Keras.",
    tags: ["TensorFlow", "Keras", "LoRA"],
    href: "https://github.com/utkarshpophli/gemma-finetuning-keras-lora",
    big: "LoRA",
  },
  {
    id: "mlp",
    title: "MLP Fusion Image Classifier",
    blurb:
      "A comparative study of MLP-Mixer, FNet and gMLP architectures for image classification, evaluated on a custom dataset.",
    tags: ["TensorFlow", "Computer vision"],
    href: "https://github.com/utkarshpophli/MLP-fusion-image-classifier",
    img: { src: "/img/mlp.webp", alt: "Grid of sample images grouped by class", w: 1200, h: 1252 },
  },
];
