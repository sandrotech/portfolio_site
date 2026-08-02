export const siteConfig = {
  name: "STech Sistemas",
  brand: "STech Sistemas — Sistemas, Integrações e Automações",
  positioning: "STech Sistemas, liderada por Alessandro Barbosa",
  responseTime: "TODO: confirmar com Alessandro o prazo de retorno comercial",
  navigation: [
    { id: "solutions", label: "Soluções" },
    { id: "automations", label: "Automações" },
    { id: "cases", label: "Projetos" },
    { id: "process", label: "Como trabalhamos" },
    { id: "about", label: "Quem lidera" },
    { id: "contact", label: "Contato" },
  ],
} as const

export const sectorStyles = {
  varejo: { label: "Varejo e distribuição", accent: "orange" },
  saude: { label: "Saúde e clínicas", accent: "teal" },
  outros: { label: "Serviços e outras empresas", accent: "blue" },
} as const
