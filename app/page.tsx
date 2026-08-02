import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { CapabilitiesSection } from "@/components/capabilities-section"
import CasesSection from "@/components/cases-section"
import { SectorCardsSection } from "@/components/sector-cards-section"
import { SocialProofSection } from "@/components/social-proof-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { ServicesSection } from "@/components/services-section"
import { ProcessSection } from "@/components/process-section"
import { SecuritySection } from "@/components/security-section"
import { FaqSection } from "@/components/faq-section"
import { FinalCtaSection } from "@/components/final-cta-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { AutomationsSection } from "@/components/automations-section"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { LeadModalProvider } from "@/components/lead-modal"
import { getProjects } from "@/lib/projectsStore"
import { faqs } from "@/config/faq"
import { headers } from "next/headers"
import { getSiteUrl } from "@/config/site-url"
import { contactConfig } from "@/config/contact"

export default async function Home() {
  const projects = await getProjects()
  const nonce = (await headers()).get("x-nonce") ?? undefined
  const siteUrl = getSiteUrl().toString()
  const organizationId = `${siteUrl}#organization`
  const personId = `${siteUrl}#alessandro-barbosa`
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": ["Organization", "ProfessionalService"], "@id": organizationId, name: "STech Sistemas", url: siteUrl, logo: new URL("/brand/stech-logo-horizontal.png", siteUrl).toString(), description: "Sistemas, sites, integrações e automações sob medida para empresas.", founder: { "@id": personId } },
      { "@type": "Person", "@id": personId, name: "Alessandro Barbosa", jobTitle: "Fundador e responsável técnico", worksFor: { "@id": organizationId }, sameAs: [contactConfig.linkedin, contactConfig.github] },
      { "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    ],
  }
  return (
    <LeadModalProvider>
      <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Navigation />
      <main id="content">
        <HeroSection />
        <SocialProofSection />
        <ServicesSection />
        <AutomationsSection />
        <CasesSection projects={projects} />
        <SectorCardsSection />
        <ProcessSection />
        <SecuritySection />
        <TestimonialsSection />
        <AboutSection />
        <CapabilitiesSection />
        <FaqSection />
        <FinalCtaSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </LeadModalProvider>
  )
}
