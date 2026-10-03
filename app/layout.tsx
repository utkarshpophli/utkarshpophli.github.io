import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Utkarsh Pophli | AI and ML Engineer",
  description:
    "Machine learning engineer shipping GenAI and agentic systems to production. Experience at Fractal Analytics, Green Rider Technology and Siemens R&D, plus the open-source Paper Trail.",
  authors: [{ name: "Utkarsh Pophli" }],
  openGraph: {
    title: "Utkarsh Pophli | AI and ML Engineer",
    description: "GenAI and agentic systems, from concept to production.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0e10",
  width: "device-width",
  initialScale: 1,
};

// Runs before first paint: picks the theme and flags motion preferences so
// nothing flashes. Entrance states in globals.css only apply with .js-anim.
const bootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(!t){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}d.dataset.theme=t}catch(e){d.dataset.theme="dark"}if(matchMedia("(prefers-reduced-motion: reduce)").matches){d.setAttribute("data-reduce","")}else{d.classList.add("js-anim")}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
