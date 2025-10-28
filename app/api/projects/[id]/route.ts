import { NextResponse } from "next/server";
import {
    getProject,
    updateProject,
    deleteProject,
    Project,
} from "@/lib/projectsStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteParams = {
    params: { id: string };
};

// GET /api/projects/:id
export async function GET(_: Request, { params }: RouteParams) {
    const project = await getProject(params.id);
    if (!project) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(project);
}

// PUT /api/projects/:id
export async function PUT(req: Request, { params }: RouteParams) {
    const data = (await req.json()) as Partial<Omit<Project, "id">>;
    const updated = await updateProject(params.id, data);

    if (!updated) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
}

// DELETE /api/projects/:id
export async function DELETE(_: Request, { params }: RouteParams) {
    await deleteProject(params.id);
    return NextResponse.json({ ok: true });
}
