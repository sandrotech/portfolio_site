"use client"

import { useEffect, useState } from "react"
import { ArrowUp, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <p className="text-sm">
              Criado com paixão por{" "}
              <span className="font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Alessandro Barbosa
              </span>{" "}
              © 2025
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Full Stack Developer</span>
            <span>•</span>
            <span>Tech Innovator</span>
            <span>•</span>
            <span>Network Builder</span>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      {showBackToTop && (
        <Button
          size="icon"
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg shadow-primary/50 animate-float z-50"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </footer>
  )
}
