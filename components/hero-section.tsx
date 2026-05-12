"use client"

import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"
import Image from "next/image"

const roles = [
  "Full Stack Developer",
  "Especialista em Varejo & Saúde",
  "Arquiteto de Soluções Digitais",
  "Tech Advisor — do código ao negócio",
]

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false)
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length)
        setIsTyping(true)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 animate-gradient" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* Left side - Profile Image */}
          <div className="flex justify-center lg:justify-end order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/50 shadow-2xl animate-float">
                <Image
                  src="/images/alessandro-profile.png"
                  alt="Alessandro Barbosa"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>


          {/* Right side - Content */}
          <div className="space-y-6 order-1 lg:order-2 text-center lg:text-left">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
                Alessandro Barbosa
              </h1>
              <div className="h-12 flex items-center justify-center lg:justify-start">
                <p
                  className={cn(
                    "text-xl md:text-2xl text-muted-foreground transition-opacity duration-500",
                    isTyping ? "opacity-100" : "opacity-0",
                  )}
                >
                  {roles[currentRole]}
                </p>
              </div>
            </div>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Construo sistemas completos para{" "}
              <span className="font-semibold" style={{ color: "#E57C1F" }}>Varejo &amp; Supermercados</span>{" "}
              e{" "}
              <span className="font-semibold" style={{ color: "#0F9AA8" }}>Saúde &amp; Hospitalar</span>{" "}—
              do back-end ao painel, com foco em negócio real.
            </p>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer p-2 hover:text-primary transition-colors z-20 group"
        aria-label="Rolar para Sobre Mim"
      >
        <ArrowDown className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
      </button>
    </section>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
