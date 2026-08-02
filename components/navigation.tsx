"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { siteConfig } from "@/config/site"
import { LeadCta } from "@/components/lead-cta"
import { cn } from "@/lib/utils"
import { brandConfig } from "@/config/brand"

export function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("")
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true })
    const observer = new IntersectionObserver((entries) => { const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]; if (visible) setActive(visible.target.id) }, { rootMargin: "-20% 0px -65%", threshold: [0.05, 0.25, 0.5] })
    siteConfig.navigation.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section) })
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect() }
  }, [])
  function goTo(id: string) { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }) }
  return <header className={cn("fixed inset-x-0 top-0 z-40 border-b border-transparent transition-all duration-200", scrolled ? "border-border bg-card/90 shadow-[0_8px_24px_rgba(49,91,138,0.08)] backdrop-blur-xl" : "bg-background/75 backdrop-blur-md")}>
    <a href="#content" className="sr-only z-[60] rounded bg-card p-3 focus:not-sr-only focus:absolute focus:left-3 focus:top-3">Ir para o conteúdo</a>
    <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 lg:h-20">
      <button onClick={() => goTo("hero")} className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" aria-label="STech Sistemas — ir ao início">
        <Image src={brandConfig.logoCompact} alt="" width={brandConfig.symbolWidth} height={brandConfig.symbolHeight} priority className="h-9 w-9 shrink-0 object-contain lg:h-11 lg:w-11" />
        <span className="block text-left"><span className="block text-base font-bold leading-tight text-primary sm:text-lg">STech<span className="hidden sm:inline"> Sistemas</span></span><span className="hidden text-[10px] text-muted-foreground sm:block">Sistemas, Integrações e Automações</span></span>
      </button>
      <nav className="hidden items-center gap-4 xl:flex" aria-label="Navegação principal">{siteConfig.navigation.map((item) => <button key={item.id} onClick={() => goTo(item.id)} aria-current={active === item.id ? "page" : undefined} className={cn("text-sm text-muted-foreground transition-colors hover:text-primary", active === item.id && "font-medium text-primary")}>{item.label}</button>)}</nav>
      <div className="hidden xl:block"><LeadCta source="navigation" event="navigation_cta_click" label="Falar sobre meu projeto" /></div>
      <button className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card shadow-sm xl:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Fechar menu" : "Abrir menu"}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
    </div>
    {open && <nav id="mobile-menu" aria-label="Navegação mobile" className="border-t border-border bg-card/95 px-4 pb-5 shadow-lg backdrop-blur-xl xl:hidden"><div className="container mx-auto flex flex-col py-3">{siteConfig.navigation.map((item) => <button key={item.id} onClick={() => goTo(item.id)} className="min-h-11 border-b border-border/60 text-left text-sm transition-colors hover:text-primary">{item.label}</button>)}<LeadCta source="navigation_mobile" event="navigation_cta_click" label="Falar sobre meu projeto" className="mt-4 w-full" /></div></nav>}
  </header>
}
