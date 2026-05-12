export type ContactMessage = {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: Date;
};

// Mensagens iniciais estáticas para preencher o painel administrativo de forma premium e profissional
let staticMessages: ContactMessage[] = [
    {
        id: "msg-1",
        name: "Ricardo Silva",
        email: "gerencia@supermercados-silva.com.br",
        message: "Alessandro, excelente o suporte no BI do VarejoFácil. A velocidade de resposta nos checkouts melhorou drasticamente após a sua refatoração nas consultas e integração com a API local.",
        createdAt: new Date("2026-05-10T14:30:00Z")
    },
    {
        id: "msg-2",
        name: "Dra. Amanda Costa",
        email: "diretoria@clinicamedconnect.com.br",
        message: "Parabéns pela dedicação na adequação da nossa clínica à LGPD no Prontuário MedConnect. A telemedicina ficou super fluida, os médicos estão adorando a agilidade do sistema.",
        createdAt: new Date("2026-05-11T09:15:00Z")
    }
];

export async function readMessages(): Promise<ContactMessage[]> {
    return [...staticMessages];
}

export async function writeMessages(list: ContactMessage[]) {
    staticMessages = [...list];
}

export async function createMessage(data: Omit<ContactMessage, "id" | "createdAt">) {
    const newMessage: ContactMessage = {
        id: `msg-${Math.random().toString(36).substr(2, 9)}`,
        name: data.name,
        email: data.email,
        message: data.message,
        createdAt: new Date()
    };
    staticMessages.unshift(newMessage);
    return newMessage;
}
