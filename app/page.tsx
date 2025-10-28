import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { StackSection } from "@/components/stack-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <StackSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
