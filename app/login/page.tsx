"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function hex(buffer: ArrayBuffer) {
    return Array.from(new Uint8Array(buffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}

async function sha256Hex(message: string) {
    const enc = new TextEncoder();
    const data = enc.encode(message);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return hex(hash);
}

export default function LoginPage() {
    const router = useRouter();
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const hashed = await sha256Hex(value);
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ hash: hashed }),
            });

            if (res.ok) {
                router.push("/admin");
            } else {
                setError("Senha incorreta");
            }
        } catch (err) {
            console.error(err);
            setError("Erro inesperado");
        } finally {
            setLoading(false);
            setValue("");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_20%_20%,rgba(24,36,96,.35)_0%,rgba(0,0,0,0)_70%)]">
            <div className="w-full max-w-3xl px-6 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <div className="hidden lg:flex flex-col justify-center rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 border border-border p-8">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold">Acesso Administrador</h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                Painel privado — autorizado apenas para proprietário.
                            </p>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                            <div className="w-56 h-56 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-semibold">
                                AB
                            </div>
                        </div>
                        <div className="mt-6 text-xs text-muted-foreground">
                            Dica: use um teclado seguro e mantenha sua senha privada.
                        </div>
                    </div>

                    <div className="bg-card/30 border border-border backdrop-blur-sm rounded-xl p-6 sm:p-10">
                        <h1 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-4">
                            Entrar no Painel
                        </h1>

                        <p className="text-sm text-muted-foreground text-center mb-6">
                            Informe a senha para acessar o painel privado.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-xs font-medium">Senha</label>

                                <div className="mt-2 relative">
                                    <input
                                        inputMode="text"
                                        type="password"
                                        autoComplete="new-password"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        onPaste={(e) => e.preventDefault()}
                                        onCopy={(e) => e.preventDefault()}
                                        onCut={(e) => e.preventDefault()}
                                        placeholder="••••••••••"
                                        aria-label="Senha do administrador"
                                        className="w-full text-sm rounded-lg border border-border bg-background/60 px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40"
                                    />
                                    <div className="absolute right-3 top-3 text-[10px] text-muted-foreground">
                                        input protegido
                                    </div>
                                </div>
                            </div>

                            {error && <div className="text-red-500 text-sm">{error}</div>}

                            <div className="flex gap-3">
                                <Button
                                    type="submit"
                                    disabled={loading || value.length === 0}
                                    className="w-full bg-gradient-to-r from-primary to-secondary text-white"
                                >
                                    {loading ? "Entrando..." : "Entrar"}
                                </Button>
                                <button
                                    type="button"
                                    onClick={() => setValue("")}
                                    className="w-32 hidden sm:inline-flex justify-center items-center rounded-lg border border-border bg-card/10 px-3 py-2 text-sm"
                                >
                                    Limpar
                                </button>
                            </div>

                            <div className="text-[11px] text-muted-foreground text-center">
                                Protegido: hash SHA-256 enviado. Use HTTPS em produção.
                            </div>
                        </form>

                        <div className="mt-6 text-center text-[12px] text-muted-foreground">
                            Acesso restrito — uso pessoal.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
