"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react"
import Image from "next/image"

const roles = ["Full Stack Developer", "Tech Innovator", "Network Builder", "Problem Solver"]

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

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 animate-gradient" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
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
              Transformo ideias em sistemas reais, unindo desenvolvimento, design e estratégia. Crio soluções completas
              e adoro construir conexões que geram impacto.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity group"
              >
                Ver Projetos
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToContact}
                className="border-primary/50 hover:bg-primary/10 bg-transparent"
              >
                <Linkedin className="mr-2 h-4 w-4" />
                Conectar
              </Button>
              <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Currículo
              </Button>
            </div>

            <div className="flex gap-4 justify-center lg:justify-start pt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card hover:bg-primary/20 transition-colors group"
              >
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card hover:bg-primary/20 transition-colors group"
              >
                <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:alessandro@example.com"
                className="p-3 rounded-full bg-card hover:bg-primary/20 transition-colors group"
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
