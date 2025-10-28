"use client"

import { useEffect, useRef, useState } from "react"
import { GraduationCap, Briefcase, Brain, Heart } from "lucide-react"

const highlights = [
  {
    icon: GraduationCap,
    title: "Formação Acadêmica",
    description: "Graduado em Análise e Desenvolvimento de Sistemas pela Estácio",
  },
  {
    icon: Brain,
    title: "MBA em IA",
    description: "Especialização em Inteligência Artificial e Machine Learning",
  },
  {
    icon: Briefcase,
    title: "Technical Advisor II",
    description: "Experiência em consultoria técnica e arquitetura de soluções",
  },
  {
    icon: Heart,
    title: "Entusiasta Tech",
    description: "Apaixonado por Python, JavaScript, Next.js, Django e DevOps",
  },
]

export function AboutSection() {
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
    <section id="about" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Sobre Mim</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Mais do que desenvolver sistemas, gosto de construir ideias e conectar pessoas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {highlights.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className={cn(
                    "group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-500",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center">
            <blockquote className="text-2xl md:text-3xl font-medium italic text-balance">
              "Transformando complexidade em simplicidade, código em experiências."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
