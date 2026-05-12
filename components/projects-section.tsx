"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import { BudgetModal } from "@/components/budget-modal";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  color: string;
  url?: string | null;
  isCta?: boolean;
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // States for budget modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState<"varejo" | "saude" | null>(null);
  const [selectedProjectName, setSelectedProjectName] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleProjectClick = (project: Project) => {
    const isSaude = project.tags.some(
      (t) =>
        t.toLowerCase() === "saude" ||
        t.toLowerCase() === "saúde" ||
        t.toLowerCase() === "hospitalar" ||
        t.toLowerCase() === "clínica" ||
        t.toLowerCase() === "ans"
    );
    setSelectedSector(isSaude ? "saude" : "varejo");
    setSelectedProjectName(project.title);
    setIsModalOpen(true);
  };

  const handleCtaClick = () => {
    setSelectedSector("varejo");
    setSelectedProjectName(null);
    setIsModalOpen(true);
  };

  // Build the items list for marquee (projects + 1 premium CTA card)
  const baseItems: Project[] = [
    ...projects,
    {
      id: "custom-cta-card",
      title: "Quer algo assim na sua empresa?",
      description: "Desenvolvo softwares de alta performance sob medida para o seu negócio comercial ou hospitalar.",
      image: "",
      tags: ["Sistemas", "Automação", "Vendas", "Fidelidade", "Customizado"],
      color: "from-primary to-secondary",
      isCta: true,
    },
  ];

  // Double the list to make the infinite loop transition completely invisible
  const doubledItems = [...baseItems, ...baseItems];

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background radial and linear gradients for premium ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(229,124,31,0.08)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-primary/5/[0.02] to-background" />

      {/* Embedded inline styles for smooth CSS GPU-accelerated marquee */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-container {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: marquee 45s linear infinite;
        }
        .marquee-container:hover {
          animation-play-state: paused;
        }
        /* Completely hide any native scrollbars */
        .hide-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .hide-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>

      <div className="relative z-10 container mx-auto px-4 space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Projetos & Soluções
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Alguns trabalhos e plataformas de alta fidelidade que posso desenvolver sob medida para a sua empresa.
          </p>
        </div>

        {/* Infinite Marquee Wrapper with side fade-out gradients */}
        <div className="relative w-full overflow-hidden py-4 hide-scrollbar">
          {/* Side blur/fade-out shadows */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

          {loading ? (
            <div className="flex gap-6 justify-center py-16">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="w-[320px] md:w-[450px] h-[520px] rounded-2xl bg-card/40 border border-border/40 animate-pulse flex-shrink-0"
                />
              ))}
            </div>
          ) : (
            <div className="marquee-container">
              {doubledItems.map((project, index) => {
                const uniqueKey = `${project.id}-${index}`;

                // CTA Card rendering
                if (project.isCta) {
                  return (
                    <div
                      key={uniqueKey}
                      onClick={handleCtaClick}
                      className="flex-shrink-0 w-[290px] sm:w-[350px] md:w-[420px] h-[520px] rounded-2xl border border-dashed border-primary/30 hover:border-primary/60 transition-all duration-300 flex items-center bg-card/10 p-6 md:p-8 cursor-pointer group hover:bg-card/25"
                    >
                      <div className="flex flex-col gap-6 text-left h-full justify-between py-6">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors border border-primary/20">
                          <Plus className="h-7 w-7 text-primary group-hover:rotate-90 transition-transform duration-300" />
                        </div>

                        <div className="space-y-3">
                          <h3 className="text-2xl font-bold text-foreground">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        <Button className="w-full bg-gradient-to-r from-primary to-secondary text-foreground font-semibold h-11 rounded-xl">
                          Fazer Orçamento Sob Medida
                        </Button>
                      </div>
                    </div>
                  );
                }

                // Regular Project Card rendering
                return (
                  <div
                    key={uniqueKey}
                    onClick={() => handleProjectClick(project)}
                    className="flex-shrink-0 w-[290px] sm:w-[350px] md:w-[420px] h-[520px] rounded-2xl bg-card border border-border/50 overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 cursor-pointer group flex flex-col justify-between"
                  >
                    {/* Project Cover Image */}
                    <div className="relative h-56 overflow-hidden flex-shrink-0">
                      {/* Gradient overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br opacity-15 ${project.color}`}
                      />

                      <img
                        src={
                          project.image && project.image.trim() !== ""
                            ? project.image
                            : "/placeholder.svg"
                        }
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex flex-col justify-between flex-grow gap-4">
                      <div className="space-y-2">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-muted-foreground leading-relaxed text-xs md:text-sm line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      <div className="space-y-4">
                        {/* Tags / Stack */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags?.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 text-[10px] md:text-xs font-semibold rounded-full bg-primary/5 text-primary border border-primary/10"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags?.length > 4 && (
                            <span className="px-2.5 py-0.5 text-[10px] md:text-xs font-semibold rounded-full bg-muted text-muted-foreground border border-border">
                              +{project.tags.length - 4}
                            </span>
                          )}
                        </div>

                        {/* Order CTA Button */}
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectClick(project);
                          }}
                          className="w-full group/btn bg-gradient-to-r from-primary to-secondary hover:opacity-95 text-foreground font-semibold h-10 rounded-xl"
                        >
                          Orçamento sob Medida
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Budget Modal Integration */}
      <BudgetModal
        isOpen={isModalOpen}
        sector={selectedSector}
        projectName={selectedProjectName}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
