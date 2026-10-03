import Stage from "@/components/stage/Stage";
import SceneDirector from "@/components/stage/SceneDirector";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Nav from "@/components/ui/Nav";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Preloader from "@/components/chapters/Preloader";
import Hero from "@/components/chapters/Hero";
import Experience from "@/components/chapters/Experience";
import Showcase from "@/components/showcase/Showcase";
import { showcases } from "@/content/showcases";
import Work from "@/components/chapters/Work";
import Journey from "@/components/chapters/Journey";
import Skills from "@/components/chapters/Skills";
import Credentials from "@/components/chapters/Credentials";
import Contact from "@/components/chapters/Contact";

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-(--z-preloader) focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-onaccent"
      >
        Skip to content
      </a>
      <Preloader />
      <SmoothScroll />
      <Stage />
      <Nav />
      <ScrollProgress />
      <main id="main" className="relative z-(--z-content)">
        <Hero />
        <Experience />
        {showcases.map((sc, i) => (
          <Showcase key={sc.id} data={sc} order={showcases.length + 2 - i} />
        ))}
        <Work />
        <Journey />
        <Skills />
        <Credentials />
        <Contact />
      </main>
      <SceneDirector />
    </>
  );
}
