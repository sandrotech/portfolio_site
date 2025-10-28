import { promises as fs } from "fs";
import path from "path";

export type ContactMessage = {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "messages.json");

export async function readMessages(): Promise<ContactMessage[]> {
    try {
        const raw = await fs.readFile(FILE, "utf-8");
        return JSON.parse(raw) as ContactMessage[];
    } catch (e: any) {
        // se o arquivo ainda não existe, começa vazio
        if (e?.code === "ENOENT") return [];
        throw e;
    }
}

export async function writeMessages(list: ContactMessage[]) {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(list, null, 2), "utf-8");
}
