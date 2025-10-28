"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Plus } from "lucide-react"

const projects = [
  {
    title: "ArenaConnect",
    description: "Sistema completo de gestão para arenas esportivas com agendamento, pagamentos e controle de acesso.",
    image: "/sports-arena-management-dashboard.jpg",
    tags: ["Next.js", "Django", "PostgreSQL"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "SportConnect",
    description: "Plataforma social esportiva que conecta atletas, organiza campeonatos e cria comunidades.",
    image: "/sports-social-network-platform.jpg",
    tags: ["React", "Node.js", "MongoDB"],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "ERP Cometa",
    description: "ERP modular para supermercados com gestão de estoque, vendas, financeiro e relatórios avançados.",
    image: "/modern-erp-dashboard-interface.jpg",
    tags: ["Python", "Django", "Redis"],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "DesignFlow",
    description: "Sistema de gestão criativa para agências com controle de projetos, clientes e entregas.",
    image: "/creative-project-management-tool.jpg",
    tags: ["Next.js", "TypeScript", "Supabase"],
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Intranet Cometa",
    description: "Rede corporativa interna com comunicação, documentos, RH e gestão de equipes.",
    image: "/corporate-intranet-dashboard.jpg",
    tags: ["React", "Django", "Docker"],
    color: "from-indigo-500 to-blue-500",
  },
  {
    title: "Wedding Site",
    description: "Site de casamento interativo com confirmação de presença, lista de presentes e galeria de fotos.",
    image: "/elegant-wedding-website.jpg",
    tags: ["Next.js", "Tailwind", "Vercel"],
    color: "from-pink-500 to-rose-500",
  },
]

export function ProjectsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Projetos</h2>
            <p className="text-xl text-muted-foreground">Soluções que transformam ideias em realidade</p>
          </div>

          <div className="relative">
            {/* Scroll buttons */}
            <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none z-10 px-4">
              <Button
                size="icon"
                variant="outline"
                onClick={() => scroll("left")}
                className="pointer-events-auto bg-background/80 backdrop-blur-sm hover:bg-primary/20 border-primary/50"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => scroll("right")}
                className="pointer-events-auto bg-background/80 backdrop-blur-sm hover:bg-primary/20 border-primary/50"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Projects scroll container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {projects.map((project, index) => (
                <div key={index} className="flex-shrink-0 w-[90vw] md:w-[500px] snap-center group">
                  <div className="relative h-full rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
                    {/* Project image */}
                    <div className="relative h-64 overflow-hidden">
                      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-20", project.color)} />
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Project content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action button */}
                      <Button className="w-full group/btn bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        Ver Detalhes
                        <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add project card */}
              <div className="flex-shrink-0 w-[90vw] md:w-[500px] snap-center">
                <div className="h-full rounded-2xl border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors flex items-center justify-center cursor-pointer group animate-pulse-glow">
                  <div className="text-center space-y-4 p-8">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Plus className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Novo Projeto</h3>
                      <p className="text-muted-foreground">Em breve...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
