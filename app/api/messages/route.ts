import { NextResponse } from "next/server";
import { readMessages, writeMessages, type ContactMessage } from "@/lib/messagesStore";

export const dynamic = "force-dynamic"; // garante que não vai cachear

export async function GET() {
    const list = await readMessages();

    // ordenar mais recente primeiro
    const ordered = [...list].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(ordered);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // validações básicas
        if (
            !body.name ||
            typeof body.name !== "string" ||
            !body.email ||
            typeof body.email !== "string" ||
            !body.message ||
            typeof body.message !== "string"
        ) {
            return NextResponse.json(
                { error: "Campos inválidos" },
                { status: 400 }
            );
        }

        const now = new Date().toISOString();

        const newItem: ContactMessage = {
            id: crypto.randomUUID(),
            name: body.name.trim(),
            email: body.email.trim(),
            message: body.message.trim(),
            createdAt: now,
        };

        const list = await readMessages();
        list.unshift(newItem); // joga no topo
        await writeMessages(list);

        return NextResponse.json(newItem, { status: 201 });
    } catch (err: any) {
        return NextResponse.json(
            { error: err?.message ?? "Erro ao salvar mensagem" },
            { status: 500 }
        );
    }
}
