"use client"

import { useEffect, useRef, useState } from "react"
import { Code2, Server, GitBranch, Container, Cloud } from "lucide-react"

const stacks = [
  { name: "Python", icon: Code2, color: "from-blue-500 to-yellow-500" },
  { name: "JavaScript", icon: Code2, color: "from-yellow-400 to-yellow-600" },
  { name: "TypeScript", icon: Code2, color: "from-blue-600 to-blue-400" },
  { name: "Next.js", icon: Server, color: "from-gray-800 to-gray-600" },
  { name: "Django", icon: Server, color: "from-green-700 to-green-500" },
  { name: "Node.js", icon: Server, color: "from-green-600 to-green-400" },
  { name: "Git", icon: GitBranch, color: "from-orange-600 to-red-600" },
  { name: "Docker", icon: Container, color: "from-blue-500 to-blue-700" },
  { name: "Nginx", icon: Cloud, color: "from-green-600 to-green-800" },
  { name: "VPS", icon: Cloud, color: "from-purple-600 to-purple-800" },
]

export function StackSection() {
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
    <section id="stack" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Tech Stack</h2>
            <p className="text-xl text-muted-foreground">Ferramentas e tecnologias que domino</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {stacks.map((stack, index) => {
              const Icon = stack.icon
              return (
                <div
                  key={index}
                  className={cn(
                    "group relative p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-500 cursor-pointer",
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90",
                  )}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity rounded-xl"
                    style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
                  />

                  <div className="relative flex flex-col items-center gap-3">
                    <div
                      className={cn(
                        "p-4 rounded-lg bg-gradient-to-br transition-transform group-hover:scale-110",
                        stack.color,
                      )}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <span className="font-medium text-center">{stack.name}</span>
                  </div>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
