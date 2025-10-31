import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const pathname = url.pathname;

    const isAdmn = pathname.startsWith("/admn");
    const isLogin = pathname === "/login" || pathname.startsWith("/login/");

    const cookie = req.cookies.get("admin")?.value;

    if (isAdmn && cookie !== "ok") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isLogin && cookie === "ok") {
        return NextResponse.redirect(new URL("/admn", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admn/:path*", "/login"],
};
