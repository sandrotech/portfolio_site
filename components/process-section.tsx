const steps = [
  ["01", "Diagnóstico", "Entendimento do problema, usuários, integrações e prioridades."],
  ["02", "Escopo e proposta", "Definição de entregas, riscos, cronograma e investimento."],
  ["03", "Prototipação e arquitetura", "Validação dos fluxos e das decisões estruturais antes da construção completa."],
  ["04", "Desenvolvimento e validação", "Entregas por etapas, revisão dos fluxos e acompanhamento do cliente."],
  ["05", "Implantação e evolução", "Publicação, orientação de uso, monitoramento, suporte e melhorias acordadas."],
]
export function ProcessSection() { return <section id="process" className="scroll-mt-20 bg-card/30 py-20 sm:py-24"><div className="container mx-auto px-4"><div className="mx-auto max-w-6xl"><p className="section-eyebrow">Como o projeto acontece</p><h2 className="section-title">Clareza do diagnóstico à evolução</h2><p className="section-copy">Você acompanha as decisões e as entregas durante todo o projeto.</p><ol className="mt-10 grid gap-4 md:grid-cols-5">{steps.map(([number, title, text]) => <li key={number} className="rounded-xl border border-border bg-background p-5"><span className="text-sm font-bold text-primary">{number}</span><h3 className="mt-3 font-semibold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></li>)}</ol></div></div></section> }
