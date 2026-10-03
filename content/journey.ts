export type Stop = {
  id: string;
  org: string;
  role: string;
  period: string;
  body: string;
  imgs: { src: string; alt: string; w: number; h: number }[];
};

export const journey: Stop[] = [
  {
    id: "wybble",
    org: "Wybble.ai",
    role: "Data Scientist Intern",
    period: "Oct 2023 - Dec 2023",
    body: "Researched, built machine learning models and designed data-driven applications. Data analysis got 30% more efficient and product development improved by 20%.",
    imgs: [
      { src: "/img/wybble-pose.webp", alt: "Cricket batsman with a pose-estimation skeleton overlay", w: 1200, h: 1200 },
      { src: "/img/wybble-seg.webp", alt: "Traffic scene with colour-coded segmentation", w: 800, h: 555 },
    ],
  },
  {
    id: "ntpc",
    org: "NTPC Singrauli",
    role: "Project Intern",
    period: "May 2023 - Jun 2023",
    body: "Improved technical documentation, researched emerging technologies and ran quality assurance tests, which raised efficiency and interoperability and reduced failures.",
    imgs: [
      { src: "/img/ntpc-site.webp", alt: "Electrical transformer yard at the power plant", w: 1400, h: 788 },
      { src: "/img/ntpc-plant.webp", alt: "Power plant chimneys in morning haze", w: 1400, h: 566 },
    ],
  },
  {
    id: "iiitm",
    org: "ABV-IIITM Gwalior",
    role: "Research Intern",
    period: "Aug 2022 - Sep 2022",
    body: "Led a project on decentralized cyber-physical systems, improved image recognition accuracy and contributed insights on machine learning and blockchain. The work resulted in an IEEE publication.",
    imgs: [
      { src: "/img/iiitm.webp", alt: "Illustration of a secured computer workstation", w: 1024, h: 1024 },
      { src: "/img/iiitm-fig1.webp", alt: "Architecture diagram from the research paper", w: 344, h: 371 },
    ],
  },
  {
    id: "mits",
    org: "Madhav Institute of Technology & Science",
    role: "B.Tech in Internet of Things",
    period: "2020 - 2024",
    body: "Graduated from MITS Gwalior with a CGPA of 8.32 out of 10.",
    imgs: [{ src: "/img/ecell.webp", alt: "Illustrated campus coworking hall", w: 1024, h: 1024 }],
  },
];
