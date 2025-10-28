import { NextResponse } from "next/server";
import { getProjects, addProject, Project } from "@/lib/projectsStore";
import { customAlphabet } from "nanoid";

export const runtime = "nodejs";        // garante acesso a fs
export const dynamic = "force-dynamic"; // evita cache em prod

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export async function GET() {
    const projects = await getProjects();
    return NextResponse.json(projects);
}

export async function POST(req: Request) {
    const body = (await req.json()) as Omit<Project, "id">;

    const newProject: Project = {
        id: body.title
            ? body.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "")
            : nanoid(),
        title: body.title,
        description: body.description,
        image: body.image,
        tags: body.tags ?? [],
        color: body.color ?? "from-blue-500 to-cyan-500",
        url: body.url ?? "",
    };

    const saved = await addProject(newProject);
    return NextResponse.json(saved, { status: 201 });
}
