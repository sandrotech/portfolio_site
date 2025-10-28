import React from "react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Sidebar */}
            <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card/20 backdrop-blur-sm p-6">
                <div className="text-xl font-bold mb-8 text-primary">Admin</div>

                <nav className="space-y-4 text-sm text-muted-foreground">
                    <a
                        href="/admin/projects"
                        className="block rounded-lg px-3 py-2 hover:bg-primary/10 hover:text-primary transition"
                    >
                        Projetos
                    </a>
                    {/* mais menus depois, ex: /admin/contato etc */}
                </nav>

                <div className="mt-auto text-xs text-muted-foreground/70">
                    v0.1 painel interno
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 min-w-0 p-6 md:p-10">{children}</main>
        </div>
    );
}
