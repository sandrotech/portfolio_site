import {
  Blocks,
  BriefcaseBusiness,
  Building2,
  Factory,
  GraduationCap,
  HeartPulse,
  ShoppingCart,
  Truck,
  type LucideIcon,
} from "lucide-react"

export const sectorIds = ["varejo", "saude", "servicos", "logistica", "industria", "educacao", "imobiliario", "outros"] as const

export type SectorId = (typeof sectorIds)[number]

type SectorMeta = {
  label: string
  shortLabel: string
  description: string
  icon: LucideIcon
}

export const sectorMeta: Record<SectorId, SectorMeta> = {
  varejo: {
    label: "Varejo e distribuição",
    shortLabel: "Varejo",
    description: "Sistemas para pedidos, estoque, fornecedores, representantes, vendas, indicadores e integração entre canais.",
    icon: ShoppingCart,
  },
  saude: {
    label: "Saúde e clínicas",
    shortLabel: "Saúde",
    description: "Soluções para agendamento, atendimento, gestão operacional, controle de acesso, integrações e rastreabilidade.",
    icon: HeartPulse,
  },
  servicos: {
    label: "Serviços profissionais",
    shortLabel: "Serviços",
    description: "Portais, CRMs, propostas, contratos, chamados, documentos, aprovações e acompanhamento do relacionamento com clientes.",
    icon: BriefcaseBusiness,
  },
  logistica: {
    label: "Logística e operações",
    shortLabel: "Logística",
    description: "Sistemas para entregas, rotas, ocorrências, coletas, transportadoras, equipes externas e visibilidade operacional.",
    icon: Truck,
  },
  industria: {
    label: "Indústria e produção",
    shortLabel: "Indústria",
    description: "Soluções para ordens de produção, manutenção, qualidade, apontamentos, rastreabilidade e integração de dados.",
    icon: Factory,
  },
  educacao: {
    label: "Educação e treinamentos",
    shortLabel: "Educação",
    description: "Portais para matrículas, cursos, turmas, conteúdos, certificados, comunicação e acompanhamento dos participantes.",
    icon: GraduationCap,
  },
  imobiliario: {
    label: "Construção e imobiliário",
    shortLabel: "Imobiliário",
    description: "Sistemas para obras, imóveis, documentos, atendimento de leads, propostas, vistorias e acompanhamento de etapas.",
    icon: Building2,
  },
  outros: {
    label: "Outras operações",
    shortLabel: "Outros",
    description: "Cada empresa possui processos específicos. A solução pode ser desenhada a partir do fluxo, dos sistemas e dos objetivos do negócio.",
    icon: Blocks,
  },
}
