import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/layout/CustomCursor";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Demos from "@/components/sections/Demos";
import Skills from "@/components/sections/Skills";
import Timeline from "@/components/sections/Timeline";
import Contact from "@/components/sections/Contact";
import SectionRule from "@/components/ui/SectionRule";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <SectionRule />
        <About />
        <SectionRule />
        <Projects />
        <SectionRule />
        <Demos />
        <SectionRule />
        <Skills />
        <SectionRule />
        <Timeline />
        <SectionRule />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
