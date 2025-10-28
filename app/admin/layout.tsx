"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderGit2, Mail, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/components/ui/sheet";

function NavLink({
    href,
    icon: Icon,
    label,
    active,
    onClick,
}: {
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    active?: boolean;
    onClick?: () => void;
}) {
    return (
        <Link
            href={href}
            className={[
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                active
                    ? "bg-primary/15 text-primary border border-primary/30 shadow-[0_0_20px_rgba(0,92,255,0.3)]"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
            ].join(" ")}
            onClick={onClick}
        >
            <Icon
                className={[
                    "h-4 w-4",
                    active ? "text-primary" : "text-muted-foreground",
                ].join(" ")}
            />
            <span className="font-medium">{label}</span>
        </Link>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // navegação que vamos usar no desktop e no mobile
    const navItems = [
        {
            href: "/admin/projects",
            label: "Projetos",
            icon: FolderGit2,
        },
        {
            href: "/admin/messages",
            label: "Mensagens",
            icon: Mail,
        },
    ];

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_20%_20%,rgba(24,36,96,.35)_0%,rgba(0,0,0,0)_70%)] bg-background text-foreground flex">
            {/* SIDEBAR DESKTOP */}
            <aside className="hidden md:flex w-64 flex-col border-r border-border/60 bg-card/10 backdrop-blur-sm px-6 py-6">
                {/* Logo / título painel */}
                <div className="mb-8">
                    <div className="text-lg font-semibold text-primary leading-tight">
                        Painel Admin
                    </div>
                    <div className="text-[10px] text-muted-foreground/70">
                        v0.1 interno
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 space-y-2 text-sm">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.href}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                            active={pathname.startsWith(item.href)}
                        />
                    ))}
                </nav>

                {/* Rodapé sidebar */}
                <div className="mt-8 text-[10px] text-muted-foreground/60 leading-relaxed">
                    Acesso restrito.
                    Conteúdo sensível de clientes.
                </div>
            </aside>

            {/* ÁREA PRINCIPAL */}
            <div className="flex-1 min-w-0 flex flex-col">
                {/* HEADER (fixo no topo da área) */}
                <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border/60 bg-background/60 backdrop-blur-md px-4 py-4 md:px-8">
                    {/* lado esquerdo = botão mobile + título da página */}
                    <div className="flex items-center gap-4">
                        {/* MENU MOBILE */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="md:hidden border-border/60 bg-card/20 hover:bg-card/30"
                                >
                                    <Menu className="h-5 w-5 text-foreground" />
                                </Button>
                            </SheetTrigger>

                            <SheetContent
                                side="left"
                                className="w-64 bg-background border-border/60"
                            >
                                <SheetHeader className="mb-6">
                                    <SheetTitle className="text-left">
                                        Painel Admin
                                        <div className="text-[10px] text-muted-foreground/70 font-normal">
                                            v0.1 interno
                                        </div>
                                    </SheetTitle>
                                </SheetHeader>

                                <nav className="space-y-2">
                                    {navItems.map((item) => (
                                        <SheetClose asChild key={item.href}>
                                            <NavLink
                                                href={item.href}
                                                label={item.label}
                                                icon={item.icon}
                                                active={pathname.startsWith(
                                                    item.href
                                                )}
                                            />
                                        </SheetClose>
                                    ))}
                                </nav>

                                <div className="mt-10 text-[10px] text-muted-foreground/60 leading-relaxed">
                                    Acesso restrito.
                                    Conteúdo sensível de clientes.
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* Título da seção atual */}
                        <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground leading-none">
                                Admin
                            </span>
                            <span className="text-base font-semibold text-foreground leading-none">
                                {pathname.startsWith("/admin/projects")
                                    ? "Projetos"
                                    : pathname.startsWith("/admin/messages")
                                        ? "Mensagens"
                                        : "Dashboard"}
                            </span>
                        </div>
                    </div>

                    {/* lado direito = placeholder para actions futuras */}
                    <div className="flex items-center gap-2">
                        {/* exemplo de botão futuro: logout, salvar, etc */}
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-xs border-border/60 bg-card/20 hover:bg-card/30"
                        >
                            Sair
                        </Button>
                    </div>
                </header>

                {/* CONTEÚDO DAS PÁGINAS */}
                <main className="flex-1 min-w-0 px-4 py-6 md:px-8 md:py-10">
                    {/* container para o conteúdo da página */}
                    <div className="max-w-6xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
