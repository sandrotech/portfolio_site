"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { ArrowUpRight, Check, LayoutDashboard, Workflow } from "lucide-react"
import type { Project, SolutionType } from "@/lib/projectsStore"
import { solutionTypeLabels } from "@/lib/projectsStore"
import { sectorIds, sectorMeta, type SectorId } from "@/lib/sectors"
import { LeadCta } from "@/components/lead-cta"
import { TrackedLink } from "@/components/tracked-link"
import { trackConversion } from "@/lib/analytics"
import { cn } from "@/lib/utils"

type ProjectFilter = "todos" | SectorId

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectFilter>("todos")
  const filters = useMemo(() => {
    const available = new Set(projects.map((project) => project.sector))
    return [{ id: "todos" as const, label: "Todos" }, ...sectorIds.filter((id) => available.has(id)).map((id) => ({ id, label: sectorMeta[id].shortLabel }))]
  }, [projects])
  const visible = filter === "todos" ? projects : projects.filter((project) => project.sector === filter)

  function selectFilter(next: ProjectFilter) {
    setFilter(next)
    trackConversion("project_filter_select", { filter: next, sector: next === "todos" ? undefined : next, source: "cases" })
  }

  return <section id="cases" className="scroll-mt-20 py-20 sm:py-24"><div className="container mx-auto px-4"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div className="max-w-3xl"><p className="section-eyebrow">Cases e soluções</p><h2 className="section-title">Possibilidades de tecnologia para diferentes empresas</h2><p className="section-copy">Exemplos de desenvolvimento de sistemas sob medida, automação de processos, integração de sistemas, portais empresariais e dashboards operacionais. Cada item está identificado como solução conceitual e seria adaptado ao processo e à realidade da empresa.</p></div><ProjectFilters filters={filters} active={filter} onSelect={selectFilter} /></div>{visible.length === 0 ? <p className="mt-10 rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">Nenhuma solução disponível neste filtro.</p> : <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{visible.map((project) => <ProjectCard key={project.id} project={project} />)}</div>}<CasesEmptyState /></div></div></section>
}

function ProjectFilters({ filters, active, onSelect }: { filters: { id: ProjectFilter; label: string }[]; active: ProjectFilter; onSelect: (id: ProjectFilter) => void }) {
  return <div className="-mx-4 flex max-w-[calc(100%+2rem)] snap-x snap-mandatory flex-nowrap gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:max-w-full sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0" aria-label="Filtrar soluções">{filters.map((item) => { const selected = active === item.id; return <button key={item.id} type="button" onClick={() => onSelect(item.id)} aria-pressed={selected} className={cn("inline-flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium text-muted-foreground shadow-sm transition-colors duration-200 hover:border-primary/50 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary", selected && "border-primary bg-primary text-primary-foreground hover:text-primary-foreground")}>{selected && <Check className="h-4 w-4" aria-hidden="true" />}{item.label}</button> })}</div>
}

function ProjectCard({ project }: { project: Project }) {
  const sector = sectorMeta[project.sector]
  const statusLabel = project.status === "real" ? "Projeto realizado" : "Solução conceitual"
  return <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_10px_30px_rgba(49,91,138,0.08)]"><ProjectVisual project={project} /><div className="flex flex-1 flex-col p-6"><div className="flex items-start justify-between gap-3"><span className="rounded-full border border-primary/15 bg-card-highlight px-3 py-1 text-xs font-semibold text-[var(--deep-navy)]">{statusLabel} · {sector.shortLabel}</span>{project.url && <a href={project.url} target="_blank" rel="noreferrer" aria-label={`Abrir referência de ${project.title}`} onClick={() => trackConversion("project_view", { projectId: project.id, projectTitle: project.title, sector: project.sector })} className="shrink-0 rounded p-2 transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary"><ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>}</div><h3 className="mt-4 text-xl font-bold">{project.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>{project.challenge && <p className="mt-4 text-sm leading-relaxed"><strong>Desafio:</strong> {project.challenge}</p>}{project.solution && <p className="mt-2 text-sm leading-relaxed"><strong>Solução proposta:</strong> {project.solution}</p>}{project.status === "real" && project.result && <p className="mt-2 text-sm leading-relaxed"><strong>Resultado documentado:</strong> {project.result}</p>}<div className="mt-5 flex flex-wrap gap-2" aria-label="Tipos de solução">{project.solutionTypes?.slice(0, 3).map((type) => <SolutionTag key={type} type={type} />)}</div><LeadCta source="cases" sector={project.sector} projectId={project.id} projectTitle={project.title} event="project_lead_click" label="Tenho um desafio parecido" initialMessage={`Gostaria de conversar sobre uma solução parecida com: ${project.title}.`} className="mt-5 w-full" /></div></article>
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.image) return <div className="relative aspect-[16/10] overflow-hidden bg-card-highlight"><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" /></div>
  const Icon = sectorMeta[project.sector].icon
  return <div role="img" aria-label={project.imageAlt} className="relative aspect-[16/10] overflow-hidden bg-[radial-gradient(circle_at_80%_15%,rgba(14,175,164,0.22),transparent_28%),linear-gradient(145deg,#DFEBF8,#F8FBFF)] p-5"><div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,42,76,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,42,76,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" /><div className="relative flex h-full gap-3 rounded-xl border border-white/80 bg-card/90 p-4 shadow-lg"><div className="flex w-12 shrink-0 flex-col items-center gap-3 rounded-lg bg-[var(--deep-navy)] py-3 text-white"><Icon className="h-5 w-5 text-cyan-200" aria-hidden="true" /><Workflow className="h-4 w-4 opacity-60" aria-hidden="true" /><LayoutDashboard className="h-4 w-4 opacity-60" aria-hidden="true" /></div><div className="flex flex-1 flex-col gap-3"><span className="h-3 w-2/3 rounded-full bg-primary/25" /><span className="h-2 w-full rounded-full bg-border" /><div className="grid flex-1 grid-cols-2 gap-2"><span className="rounded-md bg-card-highlight" /><span className="rounded-md border border-border bg-background" /></div><span className="h-2 w-4/5 rounded-full bg-accent/25" /></div></div></div>
}

function SolutionTag({ type }: { type: SolutionType }) {
  return <span className="rounded-full border border-border bg-background-alt px-3 py-1 text-xs font-medium text-[var(--deep-navy)]">{solutionTypeLabels[type]}</span>
}

function CasesEmptyState() {
  return <div className="relative mt-12 overflow-hidden rounded-2xl border border-primary/25 bg-card-highlight p-7 sm:p-9"><div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-accent/15 blur-2xl" aria-hidden="true" /><div className="relative max-w-3xl"><h3 className="text-2xl font-bold text-[var(--deep-navy)]">Não encontrou exatamente o seu segmento?</h3><p className="mt-3 leading-relaxed text-muted-foreground">A solução não precisa partir de um modelo pronto. A STech pode analisar seu processo atual, os sistemas envolvidos e os pontos que ainda dependem de tarefas manuais.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><LeadCta source="cases_other" label="Explicar meu desafio" initialMessage="Gostaria de explicar um desafio específico da minha empresa." /><TrackedLink event="cases_automation_click" properties={{ source: "cases_other" }} href="#automations" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-primary/25 bg-card px-5 py-3 font-semibold text-primary transition-colors duration-200 hover:bg-background-alt">Conhecer as automações</TrackedLink></div></div></div>
}
