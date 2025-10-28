"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type ContactMessage = {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
};

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);

    async function load() {
        setLoading(true);
        try {
            const res = await fetch("/api/messages", { cache: "no-store" });
            const data = await res.json();
            setMessages(data);
        } catch {
            setMessages([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl md:text-3xl font-bold">
                    Mensagens de Contato
                </h1>
                <Button variant="outline" onClick={load}>
                    Recarregar
                </Button>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-xl border bg-card h-32 animate-pulse"
                        />
                    ))}
                </div>
            ) : messages.length === 0 ? (
                <div className="text-muted-foreground text-sm">
                    Nenhuma mensagem recebida ainda.
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className="rounded-xl border bg-card p-5 flex flex-col gap-3"
                        >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                                <div>
                                    <div className="font-semibold text-lg leading-tight">
                                        {msg.name}
                                    </div>
                                    <div className="text-sm text-muted-foreground break-all">
                                        {msg.email}
                                    </div>
                                </div>

                                <div className="text-xs text-muted-foreground whitespace-nowrap">
                                    {new Date(msg.createdAt).toLocaleString("pt-BR", {
                                        dateStyle: "short",
                                        timeStyle: "short",
                                    })}
                                </div>
                            </div>

                            <div className="text-sm leading-relaxed whitespace-pre-line">
                                {msg.message}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
