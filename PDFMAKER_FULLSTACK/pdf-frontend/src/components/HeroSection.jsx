export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="glow-ring h-96 w-96 md:h-[600px] md:w-[600px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <h1 className="hero-title mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
          Convert & Transform Your Documents
        </h1>
        
        <p className="hero-subtitle mb-8">
          Fast, secure, and easy PDF conversion tools. Convert images to PDF, PDFs to Word, merge, split, and compress your files in seconds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#image-to-pdf"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Get Started
          </a>
          <a
            href="#tools"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-border bg-secondary/50 text-foreground hover:bg-secondary transition-colors font-semibold"
          >
            Explore Tools
          </a>
        </div>
      </div>
    </section>
  );
}