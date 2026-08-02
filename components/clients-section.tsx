import { ClipboardCheck, Code2, MessageSquareText, Rocket } from "lucide-react"

const trustSignals = [
  [MessageSquareText, "Atendimento direto", "A conversa comercial e técnica acontece com Alessandro, responsável pelo projeto."],
  [ClipboardCheck, "Diagnóstico antes da solução", "O processo, os usuários e as integrações são entendidos antes de definir a entrega."],
  [Code2, "Arquitetura e desenvolvimento", "As decisões técnicas são conectadas às necessidades reais da operação."],
  [Rocket, "Implantação e evolução", "A entrega considera publicação, acompanhamento e próximos ciclos acordados."],
]

export function ClientsSection() { return <section id="trust" aria-labelledby="trust-title" className="border-y border-border bg-card/40 py-12"><div className="container mx-auto px-4"><div className="mx-auto max-w-6xl"><h2 id="trust-title" className="sr-only">Como a STech conduz os projetos</h2><ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{trustSignals.map(([Icon,title,text]) => { const ItemIcon = Icon as typeof Code2; return <li key={title as string} className="rounded-xl border border-border bg-background p-5"><ItemIcon className="h-6 w-6 text-[var(--brand-cyan)]" aria-hidden="true" /><h3 className="mt-3 font-semibold">{title as string}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text as string}</p></li> })}</ul>{/* TODO: confirmar com Alessandro clientes, autorização de logos e depoimentos antes de publicar prova social nominal. */}</div></div></section> }
