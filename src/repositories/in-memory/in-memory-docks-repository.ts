import { randomUUID } from "node:crypto";
import { Dock, DockCreateInput } from "../../entities/dock";
import { DocksRepository } from "../docks-repository";

export class InMemoryDocksRepository implements DocksRepository {
    public items: Dock[] = [];

    async findById(id: string): Promise<Dock | null> {
        return this.items.find((item) => item.id === id) ?? null;
    }

    async findByCode(code: string): Promise<Dock | null> {
        return this.items.find((item) => item.code === code) ?? null;
    }

    async findMany(): Promise<Dock[]> {
        return this.items;
    }

    async create(data: DockCreateInput): Promise<Dock> {
        const dock: Dock = {
            id: randomUUID(),
            code: data.code,
            description: data.description ?? null,
            status: data.status ?? 'AVAILABLE',
            createdAt: new Date(),
        }

        this.items.push(dock);

        return dock;
    }
}
