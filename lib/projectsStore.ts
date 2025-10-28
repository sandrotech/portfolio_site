import { promises as fs } from "fs";
import path from "path";

export type Project = {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    color: string; // ex: "from-blue-500 to-cyan-500"
    url?: string;
};

const dataFile = path.join(process.cwd(), "data", "projects.json");

async function readFile(): Promise<Project[]> {
    const raw = await fs.readFile(dataFile, "utf-8");
    return JSON.parse(raw) as Project[];
}

async function writeFile(projects: Project[]) {
    await fs.writeFile(dataFile, JSON.stringify(projects, null, 2), "utf-8");
}

export async function getProjects(): Promise<Project[]> {
    return await readFile();
}

export async function getProject(id: string): Promise<Project | undefined> {
    const projects = await readFile();
    return projects.find((p) => p.id === id);
}

export async function addProject(p: Omit<Project, "id"> & { id: string }) {
    const projects = await readFile();
    projects.push(p as Project);
    await writeFile(projects);
    return p;
}

export async function updateProject(
    id: string,
    data: Partial<Omit<Project, "id">>
) {
    const projects = await readFile();
    const idx = projects.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;

    projects[idx] = { ...projects[idx], ...data };
    await writeFile(projects);
    return projects[idx];
}

export async function deleteProject(id: string) {
    const projects = await readFile();
    const filtered = projects.filter((p) => p.id !== id);
    await writeFile(filtered);
    return { ok: true };
}
