import type { SectorId } from "@/lib/sectors"

export type SolutionType =
  | "sistema-web"
  | "automacao"
  | "integracao"
  | "portal"
  | "dashboard"
  | "site"
  | "aplicacao-interna"

export const solutionTypeLabels: Record<SolutionType, string> = {
  "sistema-web": "Sistema web",
  automacao: "Automação",
  integracao: "Integração",
  portal: "Portal",
  dashboard: "Dashboard",
  site: "Site",
  "aplicacao-interna": "Aplicação interna",
}

export type Project = {
  id: string
  slug: string
  title: string
  description: string
  sector: SectorId
  image?: string
  imageAlt: string
  challenge?: string
  solution?: string
  result?: string
  url?: string
  status?: "concept" | "real"
  solutionTypes?: SolutionType[]
  featured?: boolean
  published: boolean
  order?: number
}

// Exemplos conceituais baseados em desafios recorrentes de operação. Não representam clientes ou resultados publicados.
const staticProjects = [
  {
    id: "gestao-pedidos-estoque", slug: "gestao-integrada-pedidos-estoque", sector: "varejo", status: "concept",
    title: "Gestão integrada de pedidos e estoque",
    description: "Sistema para centralizar pedidos, estoque, fornecedores, movimentações e indicadores comerciais.",
    challenge: "Informações distribuídas em planilhas e sistemas que não se comunicam.",
    solution: "Painel web integrado com controle de pedidos, estoque, alertas e visão consolidada da operação.",
    solutionTypes: ["sistema-web", "integracao", "dashboard"], image: "/modern-erp-dashboard-interface.jpg",
    imageAlt: "Interface conceitual de gestão de pedidos, estoque e indicadores", featured: true, published: true, order: 1,
  },
  {
    id: "crm-propostas-contratos", slug: "crm-propostas-contratos", sector: "servicos", status: "concept",
    title: "CRM de propostas e contratos",
    description: "Sistema para organizar oportunidades, propostas, contratos, responsáveis e próximos passos.",
    challenge: "Negociações acompanhadas por mensagens, planilhas e anotações isoladas.",
    solution: "Fluxo comercial centralizado com etapas, tarefas, histórico e alertas automáticos.",
    solutionTypes: ["sistema-web", "automacao", "dashboard"], image: "/crm_fidelidade.png",
    imageAlt: "Interface conceitual de CRM com propostas, contratos e etapas comerciais", featured: true, published: true, order: 2,
  },
  {
    id: "painel-entregas-ocorrencias", slug: "painel-entregas-ocorrencias", sector: "logistica", status: "concept",
    title: "Painel de entregas e ocorrências",
    description: "Visão centralizada de entregas, prazos, ocorrências, responsáveis e status da operação.",
    challenge: "Baixa visibilidade sobre atrasos e ocorrências durante as entregas.",
    solution: "Painel operacional com filtros, alertas e integração com fontes de dados existentes.",
    solutionTypes: ["dashboard", "sistema-web", "integracao"],
    imageAlt: "Dashboard conceitual para acompanhar entregas, prazos e ocorrências", featured: true, published: true, order: 3,
  },
  {
    id: "agendamento-atendimento", slug: "agendamento-gestao-atendimento", sector: "saude", status: "concept",
    title: "Agendamento e gestão de atendimento",
    description: "Sistema para agendas, confirmação de consultas, organização do atendimento e acompanhamento operacional.",
    challenge: "Alto volume de contatos manuais e dificuldade para visualizar a ocupação das agendas.",
    solution: "Agenda centralizada com automações de confirmação e painel de acompanhamento dos atendimentos.",
    solutionTypes: ["sistema-web", "automacao", "integracao"], image: "/medconnect_pep.png",
    imageAlt: "Interface conceitual de agenda e gestão operacional de atendimentos", featured: true, published: true, order: 4,
  },
  {
    id: "ordens-producao", slug: "ordens-producao-rastreabilidade", sector: "industria", status: "concept",
    title: "Ordens de produção e rastreabilidade",
    description: "Sistema para acompanhar ordens, etapas, responsáveis, apontamentos e status de produção.",
    challenge: "Dificuldade para consolidar informações da produção e identificar gargalos.",
    solution: "Painel centralizado com registro das etapas e indicadores operacionais.",
    solutionTypes: ["sistema-web", "dashboard", "integracao"], image: "/checkout_analytics.png",
    imageAlt: "Painel conceitual de ordens de produção e rastreabilidade", featured: true, published: true, order: 5,
  },
  {
    id: "portal-cursos", slug: "portal-cursos-treinamentos", sector: "educacao", status: "concept",
    title: "Portal de cursos e treinamentos",
    description: "Portal para cursos, turmas, participantes, conteúdos, certificados e comunicação.",
    challenge: "Gestão de inscrições, materiais e certificados realizada em diferentes ferramentas.",
    solution: "Ambiente centralizado para administração e acompanhamento dos participantes.",
    solutionTypes: ["portal", "sistema-web", "automacao"], image: "/creative-project-management-tool.jpg",
    imageAlt: "Portal conceitual para cursos, turmas, conteúdos e certificados", featured: true, published: true, order: 6,
  },
  {
    id: "gestao-leads-imoveis", slug: "gestao-leads-imoveis", sector: "imobiliario", status: "concept",
    title: "Gestão de leads e imóveis",
    description: "Sistema para organizar imóveis, contatos, interesses, visitas, propostas e documentos.",
    challenge: "Leads e informações dos imóveis distribuídos entre planilhas e canais de atendimento.",
    solution: "Painel comercial com histórico, etapas do atendimento, filtros e automações de acompanhamento.",
    solutionTypes: ["sistema-web", "automacao", "dashboard"],
    imageAlt: "Painel conceitual de gestão de leads, imóveis, visitas e propostas", featured: true, published: true, order: 7,
  },
  {
    id: "portal-b2b", slug: "portal-b2b-clientes-representantes", sector: "varejo", status: "concept",
    title: "Portal B2B para clientes e representantes",
    description: "Portal para consulta de produtos, preços, pedidos, documentos e histórico comercial.",
    challenge: "Equipe comercial dependente de atendimentos manuais para tarefas repetitivas.",
    solution: "Área autenticada para clientes e representantes consultarem informações e registrarem solicitações.",
    solutionTypes: ["portal", "sistema-web", "integracao"], image: "/portal_fornecedores.png",
    imageAlt: "Portal B2B conceitual para clientes, representantes, produtos e pedidos", published: true, order: 8,
  },
  {
    id: "portal-cliente", slug: "portal-cliente-solicitacoes", sector: "servicos", status: "concept",
    title: "Portal do cliente e gestão de solicitações",
    description: "Área autenticada para documentos, solicitações, chamados, aprovações e acompanhamento de serviços.",
    challenge: "Clientes solicitando informações por diferentes canais, sem histórico centralizado.",
    solution: "Portal com solicitações, documentos, atualizações de status e notificações.",
    solutionTypes: ["portal", "automacao", "integracao"], image: "/corporate-intranet-dashboard.jpg",
    imageAlt: "Portal conceitual para documentos, chamados e solicitações de clientes", published: true, order: 9,
  },
  {
    id: "equipes-servicos-externos", slug: "gestao-equipes-servicos-externos", sector: "logistica", status: "concept",
    title: "Gestão de equipes e serviços externos",
    description: "Sistema para distribuir atividades, registrar visitas, anexar evidências e acompanhar equipes externas.",
    challenge: "Ordens de serviço distribuídas por mensagens e sem acompanhamento padronizado.",
    solution: "Aplicação responsiva para equipes externas e painel administrativo para a gestão.",
    solutionTypes: ["sistema-web", "aplicacao-interna", "automacao"],
    imageAlt: "Aplicação conceitual para equipes externas, visitas e ordens de serviço", published: true, order: 10,
  },
  {
    id: "controle-acesso-rastreabilidade", slug: "controle-acesso-rastreabilidade", sector: "saude", status: "concept",
    title: "Controle de acesso e rastreabilidade",
    description: "Solução para registrar acessos, movimentações, responsáveis e etapas de processos internos.",
    challenge: "Dificuldade para identificar quem realizou cada ação e em qual momento.",
    solution: "Sistema com permissões, histórico de atividades e trilha de auditoria.",
    solutionTypes: ["aplicacao-interna", "sistema-web", "integracao"], image: "/smartstock_ai.png",
    imageAlt: "Interface conceitual de permissões, histórico e trilha de auditoria", published: true, order: 11,
  },
  {
    id: "manutencao-ativos", slug: "gestao-manutencao-ativos", sector: "industria", status: "concept",
    title: "Gestão de manutenção e ativos",
    description: "Solução para manutenção preventiva, chamados, ativos, peças, responsáveis e histórico de intervenções.",
    challenge: "Manutenções realizadas sem agenda centralizada ou histórico confiável.",
    solution: "Sistema para planos de manutenção, ordens de serviço, alertas e acompanhamento dos ativos.",
    solutionTypes: ["aplicacao-interna", "automacao", "dashboard"],
    imageAlt: "Dashboard conceitual de manutenção preventiva, chamados e ativos", published: true, order: 12,
  },
] satisfies readonly Project[]

export async function getProjects(): Promise<Project[]> {
  return staticProjects.filter((project) => project.published).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((project) => ({ ...project, solutionTypes: project.solutionTypes ? [...project.solutionTypes] : undefined }))
}
