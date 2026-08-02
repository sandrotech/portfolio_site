import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { brandConfig } from "@/config/brand"
import { LeadCta } from "@/components/lead-cta"
import { TrackedLink } from "@/components/tracked-link"

const trust = ["Projetos liderados por Alessandro Barbosa", "Atendimento direto", "Desenvolvimento e implantação"]

export function HeroSection() {
  return <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(21,94,239,0.13),transparent_34%),radial-gradient(circle_at_84%_34%,rgba(14,175,164,0.12),transparent_31%),linear-gradient(145deg,#F3F7FC_0%,#FBFDFF_48%,#E8F0F9_100%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,42,76,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,42,76,0.055)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
    <div className="container relative z-10 mx-auto grid items-center gap-10 px-4 py-12 lg:grid-cols-[1.35fr_.65fr] lg:py-16">
      <div className="max-w-4xl">
        <div className="mb-6 hidden w-fit max-w-[480px] sm:block"><Image src={brandConfig.logoHorizontal} alt="STech Sistemas" width={brandConfig.logoWidth} height={brandConfig.logoHeight} priority className="h-auto w-full" /></div>
        <div className="mb-6 flex items-center gap-3 sm:hidden"><Image src={brandConfig.logoCompact} alt="" width={brandConfig.symbolWidth} height={brandConfig.symbolHeight} priority className="h-14 w-14 shrink-0 object-contain" /><span><span className="block text-2xl font-bold leading-tight text-primary">STech Sistemas</span><span className="block text-xs text-muted-foreground">Sistemas, Integrações e Automações</span></span></div>
        <p className="section-eyebrow">Sistemas • Integrações • Automações</p>
        <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">Sistemas, sites e automações sob medida para empresas.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">A STech desenvolve sistemas web, sites profissionais, landing pages e integrações com WhatsApp, Telegram, e-mail, APIs e sistemas internos — do diagnóstico à implantação.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row"><LeadCta source="hero" event="hero_primary_cta_click" label="Falar sobre meu projeto" /><TrackedLink event="hero_secondary_cta_click" properties={{ source: "hero" }} href="#solutions" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-card px-5 py-3 font-semibold shadow-sm transition-colors duration-200 hover:border-primary/50 hover:bg-card-highlight">Conhecer as soluções</TrackedLink></div>
        <ul className="mt-7 grid gap-3 text-sm sm:grid-cols-3">{trust.map((item) => <li key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />{item}</li>)}</ul>
      </div>
      <div className="mx-auto max-w-sm text-center"><div className="relative mx-auto aspect-square w-56 overflow-hidden rounded-full border-4 border-card shadow-[0_24px_60px_rgba(16,42,76,0.18)] ring-2 ring-accent/35 sm:w-72"><Image src="/images/alessandro-profile.png" alt="Alessandro Barbosa, fundador e responsável técnico da STech Sistemas" fill priority sizes="(max-width: 640px) 224px, 288px" className="object-cover object-top" /></div><p className="mt-5 font-semibold">Alessandro Barbosa</p><p className="text-sm text-muted-foreground">Fundador e responsável técnico da STech Sistemas</p></div>
    </div>
  </section>
}
