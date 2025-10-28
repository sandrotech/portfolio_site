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

type FormState = {
    id?: string;
    title: string;
    description: string;
    image: string;
    tagsText: string; // tags em string "Next.js, Tailwind"
    color: string;
    url: string;
};

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);

    // modal state
    const [showModal, setShowModal] = useState(false);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState<FormState>({
        title: "",
        description: "",
        image: "",
        tagsText: "",
        color: "from-blue-500 to-cyan-500",
        url: "",
    });

    // carregar lista
    useEffect(() => {
        (async () => {
            setLoading(true);
            const res = await fetch("/api/projects", { cache: "no-store" });
            const data = await res.json();
            setProjects(data);
            setLoading(false);
        })();
    }, []);

    // abrir modal "novo"
    function handleNew() {
        setForm({
            title: "",
            description: "",
            image: "",
            tagsText: "",
            color: "from-blue-500 to-cyan-500",
            url: "",
        });
        setShowModal(true);
    }

    // abrir modal "editar"
    function handleEdit(p: Project) {
        setForm({
            id: p.id,
            title: p.title,
            description: p.description,
            image: p.image,
            tagsText: p.tags.join(", "),
            color: p.color,
            url: p.url ?? "",
        });
        setShowModal(true);
    }

    // deletar
    async function handleDelete(p: Project) {
        const ok = confirm(`Apagar "${p.title}"?`);
        if (!ok) return;

        await fetch(`/api/projects/${p.id}`, {
            method: "DELETE",
        });

        setProjects((prev) => prev.filter((x) => x.id !== p.id));
    }

    // salvar (criar ou editar)
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);

        const payload = {
            title: form.title.trim(),
            description: form.description.trim(),
            image: form.image.trim(),
            tags: form.tagsText
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
            color: form.color.trim(),
            url: form.url.trim(),
        };

        if (form.id) {
            // update
            const res = await fetch(`/api/projects/${form.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const updated = await res.json();

            setProjects((prev) =>
                prev.map((p) => (p.id === updated.id ? updated : p))
            );
        } else {
            // create
            const res = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const created = await res.json();

            setProjects((prev) => [created, ...prev]);
        }

        setSaving(false);
        setShowModal(false);
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-primary">Projetos</h1>
                    <p className="text-sm text-muted-foreground">
                        Gerencie os cards que aparecem no seu portfólio.
                    </p>
                </div>

                <Button
                    onClick={handleNew}
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                    Novo Projeto
                </Button>
            </div>

            {/* Tabela / lista */}
            <div className="rounded-xl border border-border bg-card/30 backdrop-blur-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-card/50 border-b border-border text-left">
                        <tr className="text-muted-foreground">
                            <th className="p-4 font-medium">Projeto</th>
                            <th className="p-4 font-medium hidden md:table-cell">
                                Descrição
                            </th>
                            <th className="p-4 font-medium hidden lg:table-cell">Tags</th>
                            <th className="p-4 font-medium hidden lg:table-cell">Color</th>
                            <th className="p-4 font-medium text-right">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td className="p-6 text-center text-muted-foreground" colSpan={5}>
                                    Carregando...
                                </td>
                            </tr>
                        ) : projects.length === 0 ? (
                            <tr>
                                <td className="p-6 text-center text-muted-foreground" colSpan={5}>
                                    Nenhum projeto cadastrado.
                                </td>
                            </tr>
                        ) : (
                            projects.map((p) => (
                                <tr
                                    key={p.id}
                                    className="border-b border-border/50 hover:bg-card/60 transition"
                                >
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-md overflow-hidden border border-border bg-muted/20 flex-shrink-0">
                                                {/* preview img */}
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={p.image || "/placeholder.svg"}
                                                    alt={p.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="min-w-0">
                                                <div className="font-medium text-foreground">
                                                    {p.title}
                                                </div>
                                                <div className="text-xs text-muted-foreground truncate">
                                                    {p.url || "—"}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="p-4 align-top hidden md:table-cell text-muted-foreground max-w-[320px]">
                                        <div className="line-clamp-3 leading-relaxed">
                                            {p.description}
                                        </div>
                                    </td>

                                    <td className="p-4 align-top hidden lg:table-cell">
                                        <div className="flex flex-wrap gap-1">
                                            {p.tags?.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-primary/30 text-primary bg-primary/10"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </td>

                                    <td className="p-4 align-top hidden lg:table-cell">
                                        <code className="text-[11px] bg-muted/20 px-2 py-1 rounded">
                                            {p.color}
                                        </code>
                                    </td>

                                    <td className="p-4 align-top text-right whitespace-nowrap">
                                        <div className="flex gap-2 justify-end">
                                            <Button
                                                variant="outline"
                                                className="text-xs"
                                                onClick={() => handleEdit(p)}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                className="text-xs bg-red-600 hover:bg-red-700"
                                                onClick={() => handleDelete(p)}
                                            >
                                                Excluir
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* overlay */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => !saving && setShowModal(false)}
                    />

                    {/* card */}
                    <div className="relative w-full max-w-xl bg-background border border-border rounded-xl shadow-xl p-6 space-y-6 z-10">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-primary">
                                    {form.id ? "Editar Projeto" : "Novo Projeto"}
                                </h2>
                                <p className="text-xs text-muted-foreground">
                                    Preencha para {form.id ? "atualizar" : "criar"} o card.
                                </p>
                            </div>

                            <button
                                className="text-muted-foreground hover:text-foreground text-sm"
                                disabled={saving}
                                onClick={() => setShowModal(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* título */}
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-foreground">
                                    Título
                                </label>
                                <input
                                    className="w-full rounded-lg border border-border bg-card/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                                    value={form.title}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, title: e.target.value }))
                                    }
                                    required
                                />
                            </div>

                            {/* descrição */}
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-foreground">
                                    Descrição
                                </label>
                                <textarea
                                    className="w-full min-h-[80px] rounded-lg border border-border bg-card/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, description: e.target.value }))
                                    }
                                    required
                                />
                            </div>

                            {/* imagem */}
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-foreground">
                                    URL da Imagem
                                </label>
                                <input
                                    className="w-full rounded-lg border border-border bg-card/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                                    placeholder="/sports-arena-management-dashboard.jpg"
                                    value={form.image}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, image: e.target.value }))
                                    }
                                    required
                                />
                                <p className="text-[10px] text-muted-foreground">
                                    Pode ser caminho local em /public ou uma URL externa.
                                </p>
                            </div>

                            {/* tags */}
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-foreground">
                                    Tags (separadas por vírgula)
                                </label>
                                <input
                                    className="w-full rounded-lg border border-border bg-card/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                                    placeholder="Next.js, Tailwind, PostgreSQL"
                                    value={form.tagsText}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, tagsText: e.target.value }))
                                    }
                                />
                            </div>

                            {/* color */}
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-foreground">
                                    Gradiente Tailwind (from-... to-...)
                                </label>
                                <input
                                    className="w-full rounded-lg border border-border bg-card/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                                    placeholder="from-blue-500 to-cyan-500"
                                    value={form.color}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, color: e.target.value }))
                                    }
                                />
                                <p className="text-[10px] text-muted-foreground">
                                    Isso alimenta o brilho colorido do card.
                                </p>
                            </div>

                            {/* url */}
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-foreground">
                                    URL externa (opcional)
                                </label>
                                <input
                                    className="w-full rounded-lg border border-border bg-card/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                                    placeholder="https://meuprojeto.com"
                                    value={form.url}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, url: e.target.value }))
                                    }
                                />
                            </div>

                            {/* footer modal */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={saving}
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={saving}
                                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                                >
                                    {saving
                                        ? form.id
                                            ? "Salvando..."
                                            : "Criando..."
                                        : form.id
                                            ? "Salvar Alterações"
                                            : "Criar Projeto"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
