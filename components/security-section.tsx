import { DatabaseBackup, FileText, KeyRound, LifeBuoy, ScrollText, Waypoints } from "lucide-react"
const items = [
  [Waypoints, "Integração com o cenário existente", "Decisões técnicas consideram sistemas, restrições e prioridades já presentes na operação."],
  [KeyRound, "Controle de acesso", "Perfis e permissões são desenhados conforme os papéis e a sensibilidade de cada fluxo."],
  [ScrollText, "Rastreabilidade", "Logs e registros de auditoria podem apoiar diagnóstico, segurança e prestação de contas."],
  [DatabaseBackup, "Continuidade", "Estratégias de backup, monitoramento e recuperação são definidas conforme a criticidade."],
  [FileText, "Documentação", "Decisões, integrações e rotinas importantes são documentadas para facilitar manutenção."],
  [LifeBuoy, "Evolução e suporte", "A implantação considera acompanhamento, correções e próximos ciclos acordados."],
]
export function SecuritySection() { return <section className="py-20 sm:py-24"><div className="container mx-auto px-4"><div className="mx-auto max-w-6xl"><div className="max-w-3xl"><p className="section-eyebrow">Diferenciais e sustentação</p><h2 className="section-title">Decisões técnicas conectadas ao risco do negócio</h2><p className="section-copy">Segurança, observabilidade e manutenção são tratadas como requisitos do projeto — não como selos ou promessas absolutas.</p></div><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map(([Icon, title, text]) => { const ItemIcon = Icon as typeof KeyRound; return <article key={title as string} className="rounded-xl border border-border bg-card p-6"><ItemIcon className="h-6 w-6 text-primary" aria-hidden="true" /><h3 className="mt-4 font-semibold">{title as string}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text as string}</p></article> })}</div></div></div></section> }
