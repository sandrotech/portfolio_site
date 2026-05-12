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
