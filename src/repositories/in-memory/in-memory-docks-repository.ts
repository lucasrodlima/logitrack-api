import { randomUUID } from "node:crypto";
import { Dock, DockCreateInput, DockStatus } from "../../entities/dock";
import { DocksRepository } from "../docks-repository";
import { DockNotFoundError } from "../../use-cases/errors/dock-not-found-error";

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

    async updateStatus(id: string, status: DockStatus): Promise<Dock> {
        const dockIndex = this.items.findIndex((item) => item.id === id);

        if (dockIndex === -1) {
            throw new DockNotFoundError();
        }

        this.items[dockIndex].status = status;

        return this.items[dockIndex];
    }
}
