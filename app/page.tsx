import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Section */}
      <section id="projects" className="min-h-screen w-full flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Projects</h2>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen w-full flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Contact</h2>
        </div>
      </section>
    </main>
  );
}