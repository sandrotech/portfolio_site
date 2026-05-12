export type Project = {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    color: string;
    url?: string | null;
};

// Projetos iniciais estáticos com o foco setorial premium (Varejo e Saúde)
let staticProjects: Project[] = [
    {
        id: "varejofacil-bi",
        title: "Dashboard BI VarejoFácil",
        description: "Plataforma completa de Business Intelligence em tempo real para redes de supermercados. Integração direta com PDVs e ERPs para análise de checkout, ruptura de estoque, controle de margem e fluxo de caixa de forma instantânea.",
        image: "/modern-erp-dashboard-interface.jpg",
        tags: ["React", "Next.js", "BI", "ERP", "Varejo", "PostgreSQL"],
        color: "from-orange-500 to-amber-600",
        url: "https://github.com/sandrotech"
    },
    {
        id: "medconnect-pep",
        title: "Prontuário Eletrônico MedConnect",
        description: "Sistema de Prontuário Eletrônico do Paciente (PEP) integrado para clínicas e hospitais. Totalmente adequado à LGPD e normas da ANS, com telemedicina integrada, agendamento inteligente e controle de prescrições.",
        image: "/medconnect_pep.png",
        tags: ["Next.js", "Node.js", "LGPD", "Telemedicina", "ANS", "TailwindCSS"],
        color: "from-cyan-500 to-teal-600",
        url: "https://github.com/sandrotech"
    },
    {
        id: "smartstock-ai",
        title: "SmartStock AI - Gestão de Estoque",
        description: "Sistema inteligente de previsão de demanda e gestão de reabastecimento automático para supermercados, utilizando algoritmos de IA para reduzir a ruptura de gôndola em até 40%.",
        image: "/smartstock_ai.png",
        tags: ["Python", "Machine Learning", "Next.js", "AI", "Varejo", "Estoque"],
        color: "from-orange-600 to-red-500",
        url: "https://github.com/sandrotech"
    },
    {
        id: "portal-fornecedores",
        title: "Portal de Fornecedores & Pedidos",
        description: "Plataforma integrada de compras e gestão de pedidos de reabastecimento para supermercados. Automação completa do envio de ordens de compra, rastreio de entrega por fornecedores e controle de recebimento de notas fiscais.",
        image: "/portal_fornecedores.png",
        tags: ["Next.js", "Node.js", "PostgreSQL", "ERPs", "Notas Fiscais", "Logística"],
        color: "from-amber-500 to-orange-600",
        url: "https://github.com/sandrotech"
    },
    {
        id: "automacao-checkout",
        title: "Checkout Real-Time & Analytics",
        description: "Sistema de faturamento e telemetria de frente de caixa para supermercados. Captura dados de PDVs em tempo real, gerando dashboards analíticos de velocidade de checkout, ticket médio por operador e alertas de ociosidade.",
        image: "/checkout_analytics.png",
        tags: ["React", "WebSockets", "Go", "Redis", "Grafana", "Dashboards"],
        color: "from-orange-500 to-rose-600",
        url: "https://github.com/sandrotech"
    },
    {
        id: "crm-fidelidade",
        title: "CRM Varejo - Gestão de Fidelidade",
        description: "Plataforma de fidelidade e automação de campanhas de marketing para supermercados. Segmentação inteligente de clientes com base no comportamento de compras, envio de ofertas personalizadas via WhatsApp e painel de retorno sobre investimento (ROI).",
        image: "/crm_fidelidade.png",
        tags: ["Next.js", "Python", "AI", "WhatsApp API", "Campaigns", "Analytics"],
        color: "from-yellow-500 to-amber-600",
        url: "https://github.com/sandrotech"
    }
];

export async function getProjects(): Promise<Project[]> {
    return [...staticProjects];
}

export async function getProject(id: string): Promise<Project | null> {
    const project = staticProjects.find(p => p.id === id);
    return project ? { ...project } : null;
}

export async function addProject(p: Omit<Project, "id"> & { id: string }) {
    const newProject: Project = { ...p };
    staticProjects.unshift(newProject);
    return newProject;
}

export async function updateProject(
    id: string,
    data: Partial<Omit<Project, "id">>
) {
    const index = staticProjects.findIndex(p => p.id === id);
    if (index === -1) return null;

    staticProjects[index] = {
        ...staticProjects[index],
        ...data
    };
    return staticProjects[index];
}

export async function deleteProject(id: string) {
    staticProjects = staticProjects.filter(p => p.id !== id);
    return { ok: true };
}
