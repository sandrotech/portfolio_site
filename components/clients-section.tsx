"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const clients = [
  {
    name: "Casa do Frango",
    logo: "/clientes/casa_do_frango.png",
  },
  {
    name: "Costa Frutas",
    logo: "/clientes/costafrutas.png",
  },
  {
    name: "Natural Luz",
    logo: "/clientes/logo (1).png",
  },
  {
    name: "Ultra Distribuição",
    logo: "/clientes/logo-oficial-sem-fundo-3-SBuBwb76KXWYNeVP.avif",
  },
  {
    name: "Cliente",
    logo: "/clientes/logo.png",
  },
  {
    name: "Serra Sul Morangos",
    logo: "/clientes/serrasulmorangos.png",
  },
]

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

export function ClientsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="clients" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary/10 via-background to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">

          {/* Section header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Clientes</h2>
            <p className="text-xl text-muted-foreground">
              Empresas que confiam no meu trabalho
            </p>
          </div>

          {/* Clients Carousel — infinite horizontal marquee with high contrast cards */}
          <div className="relative overflow-hidden">
            {/* Fade masks adjusted so they don't cover the visible items too early */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="flex gap-8 animate-marquee whitespace-nowrap py-4">
              {[...clients, ...clients, ...clients, ...clients].map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 group relative rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 cursor-default overflow-hidden bg-white hover:scale-105 hover:shadow-lg hover:shadow-primary/5 w-[320px] h-[200px] p-6 flex items-center justify-center"
                  style={{
                    transitionDelay: `${(index % clients.length) * 80}ms`,
                  }}
                >
                  {/* Logo wrapper positioned relatively to take up the padded card space */}
                  <div className="relative w-full h-full">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      style={{ objectFit: "contain" }}
                      className="transition-transform duration-500 group-hover:scale-105"
                      sizes="300px"
                    />
                  </div>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/15 blur-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hint */}
          <p className="text-center text-xs text-white/25 mt-4 flex items-center justify-center gap-1.5">
            <span className="inline-block w-4 h-px bg-white/20" />
            Passe o mouse para pausar
            <span className="inline-block w-4 h-px bg-white/20" />
          </p>

        </div>
      </div>
    </section>
  )
}
