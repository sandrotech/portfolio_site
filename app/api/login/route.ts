import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { hash } = body as { hash?: string };

        if (!hash) {
            return NextResponse.json({ ok: false, error: "missing" }, { status: 400 });
        }

        const expected = process.env.ADMIN_PASSWORD_HASH;
        if (!expected) {
            console.error("ADMIN_PASSWORD_HASH not set");
            return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
        }

        if (hash === expected) {
            const res = NextResponse.json({ ok: true });
            res.cookies.set("admin", "ok", {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7,
            });
            return res;
        }

        return NextResponse.json({ ok: false }, { status: 401 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}
