const groups = [
  ["Aplicações web", ["Next.js", "React", "TypeScript", "Django"]],
  ["APIs e integrações", ["Node.js", "Python", "REST", "WebSockets"]],
  ["Dados e dashboards", ["PostgreSQL", "Business Intelligence", "Analytics"]],
  ["Infraestrutura e deploy", ["Docker", "Nginx", "VPS", "Monitoramento"]],
  ["Versionamento e automação", ["Git", "CI/CD", "Testes", "Documentação"]],
]
export function StackSection() { return <section className="py-20 sm:py-24"><div className="container mx-auto px-4"><div className="mx-auto max-w-6xl"><div className="text-center"><p className="section-eyebrow">Capacidades técnicas</p><h2 className="section-title">Tecnologias escolhidas conforme o desafio</h2><p className="section-copy mx-auto">A stack apoia a solução. A escolha considera integração, manutenção, desempenho e conhecimento disponível no projeto.</p></div><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">{groups.map(([title, technologies]) => <article key={title as string} className="rounded-xl border border-border bg-card p-5"><h3 className="font-semibold text-primary">{title as string}</h3><ul className="mt-4 space-y-2 text-sm text-muted-foreground">{(technologies as string[]).map((tech) => <li key={tech}>{tech}</li>)}</ul></article>)}</div></div></div></section> }
