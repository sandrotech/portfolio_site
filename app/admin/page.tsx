"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Project = {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    color: string;
    url?: string;
};

type Message = {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
};

export default function AdmnPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    async function loadAll() {
        setLoading(true);
        try {
            const [pRes, mRes] = await Promise.all([
                fetch("/api/projects", { cache: "no-store" }),
                fetch("/api/messages", { cache: "no-store" }),
            ]);
            const [pData, mData] = await Promise.all([pRes.json(), mRes.json()]);
            setProjects(pData || []);
            setMessages(mData || []);
        } catch {
            setProjects([]);
            setMessages([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadAll();
    }, []);

    return (
        <div className="p-6 md:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-primary">Dashboard</h1>
                    <p className="text-sm text-muted-foreground">
                        Visão geral — Projetos e Mensagens
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={loadAll} variant="outline">
                        Recarregar
                    </Button>
                    <Button
                        onClick={async () => {
                            await fetch("/api/logout", { method: "POST" });
                            window.location.href = "/login";
                        }}
                        className="bg-red-600 text-white hover:bg-red-700"
                    >
                        Sair
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="grid gap-4">
                    <div className="h-40 rounded-xl bg-card animate-pulse" />
                    <div className="h-40 rounded-xl bg-card animate-pulse" />
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-6">
                    <section className="lg:col-span-2 space-y-4">
                        <h2 className="text-lg font-semibold text-primary">
                            Projetos ({projects.length})
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {projects.map((p) => (
                                <div
                                    key={p.id}
                                    className="rounded-xl border border-border/60 bg-card/40 hover:bg-card/60 transition p-4 flex flex-col gap-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-14 h-14 rounded-md overflow-hidden bg-muted/10 flex-shrink-0">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={p.image || "/placeholder.svg"}
                                                alt={p.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-medium truncate">{p.title}</div>
                                            <div className="text-xs text-muted-foreground truncate">
                                                {p.url || "—"}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {p.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {p.tags?.map((t) => (
                                            <span
                                                key={t}
                                                className="px-2 py-0.5 text-[11px] rounded-full bg-primary/10 text-primary border border-primary/20"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-primary">
                            Mensagens ({messages.length})
                        </h2>
                        <div className="space-y-3 max-h-[70vh] overflow-auto pr-2">
                            {messages.map((m) => (
                                <div
                                    key={m.id}
                                    className="rounded-xl border border-border/60 bg-card/40 hover:bg-card/60 p-3"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">{m.name}</div>
                                            <div className="text-xs text-muted-foreground break-all">
                                                {m.email}
                                            </div>
                                        </div>
                                        <div className="text-xs text-muted-foreground whitespace-nowrap">
                                            {new Date(m.createdAt).toLocaleString("pt-BR", {
                                                dateStyle: "short",
                                                timeStyle: "short",
                                            })}
                                        </div>
                                    </div>
                                    <div className="mt-2 text-sm whitespace-pre-line">
                                        {m.message}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}
