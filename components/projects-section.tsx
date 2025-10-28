"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Plus } from "lucide-react";

// importa o JSON estático
import projectsData from "@/data/projects.json";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  color: string; // ex: "from-blue-500 to-cyan-500"
  url?: string;
};

export default function ProjectsSection() {
  // agora usamos direto o json, sem filtro de `active`
  const projects = projectsData as Project[];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const amount = 400;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* fundo leve em degradê pra separar a seção do resto */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(24,36,96,.35)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-primary/5/[0.03] to-background" />

      <div className="relative z-10 container mx-auto px-4 space-y-12">
        {/* Cabeçalho da seção */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Projetos
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Alguns trabalhos e plataformas que desenvolvo com foco em produto
            digital real
          </p>
        </div>

        <div className="relative">
          {/* Botões laterais de scroll (desktop) */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none z-10 px-4">
            <Button
              size="icon"
              variant="outline"
              onClick={() => scroll("left")}
              className="pointer-events-auto bg-background/80 backdrop-blur-sm hover:bg-primary/20 border-primary/50 text-foreground"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
            </Button>

            <Button
              size="icon"
              variant="outline"
              onClick={() => scroll("right")}
              className="pointer-events-auto bg-background/80 backdrop-blur-sm hover:bg-primary/20 border-primary/50 text-foreground"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Lista horizontal com os cards de projeto */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex-shrink-0 w-[90vw] md:w-[500px] snap-center group"
              >
                <div className="relative h-full rounded-2xl bg-card border border-border/60 overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
                  {/* Imagem de capa do projeto */}
                  <div className="relative h-64 overflow-hidden">
                    {/* overlay gradiente custom de cada projeto */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br opacity-20 ${project.color}`}
                    />

                    <img
                      src={
                        project.image && project.image.trim() !== ""
                          ? project.image
                          : "/placeholder.svg"
                      }
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Conteúdo do card */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold text-foreground">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {project.description}
                    </p>

                    {/* Tags / stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Botão de ação (link do projeto se tiver url) */}
                    {project.url && project.url.trim() !== "" ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="w-full group/btn bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-foreground">
                          Ver Detalhes
                          <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </Button>
                      </a>
                    ) : (
                      <Button
                        className="w-full group/btn bg-gradient-to-r from-primary to-secondary opacity-60 cursor-default"
                        disabled
                      >
                        Ver Detalhes
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Card final chamando contato / orçamento */}
            <a
              href="#contact"
              className="flex-shrink-0 w-[90vw] md:w-[500px] snap-center"
            >
              <div className="h-full rounded-2xl border border-dashed border-primary/40 hover:border-primary/70 transition-colors flex items-center bg-card/20 p-6 md:p-8 cursor-pointer group">
                <div className="flex flex-col md:flex-row md:items-start gap-6 text-left">
                  {/* bolinha com + */}
                  <div className="flex-shrink-0">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors border border-primary/40">
                      <Plus className="h-8 w-8 text-primary" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-foreground">
                      Quer algo assim na sua empresa?
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base">
                      Fala comigo pra criar ou evoluir seu produto.
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
