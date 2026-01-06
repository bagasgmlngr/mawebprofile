export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section id="home" className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Welcome
          </h1>
          <p className="text-slate-400 text-lg">
            Portfolio is under construction...
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen w-full flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">About Me</h2>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen w-full flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Skills</h2>
        </div>
      </section>

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