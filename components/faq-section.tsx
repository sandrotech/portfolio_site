"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { trackConversion } from "@/lib/analytics"
import { cn } from "@/lib/utils"
import { faqs } from "@/config/faq"

export function FaqSection() { const [open, setOpen] = useState<number | null>(null); return <section id="faq" className="bg-card/30 py-20 sm:py-24"><div className="container mx-auto px-4"><div className="mx-auto max-w-3xl"><div className="text-center"><p className="section-eyebrow">Perguntas frequentes</p><h2 className="section-title">O que considerar antes de começar</h2></div><div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-background px-5">{faqs.map(([question, answer], index) => { const expanded = open === index; return <div key={question}><h3><button className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left font-semibold focus-visible:outline-2 focus-visible:outline-primary" aria-expanded={expanded} aria-controls={`faq-${index}`} onClick={() => { setOpen(expanded ? null : index); if (!expanded) trackConversion("faq_open", { faq: index }) }}>{question}<ChevronDown className={cn("h-5 w-5 shrink-0 transition-transform", expanded && "rotate-180")} aria-hidden="true" /></button></h3>{expanded && <div id={`faq-${index}`} className="pb-5 pr-8 text-sm leading-relaxed text-muted-foreground">{answer}</div>}</div> })}</div></div></div></section> }
