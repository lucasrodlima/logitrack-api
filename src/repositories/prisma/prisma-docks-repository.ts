import { Dock, DockCreateInput, DockStatus } from "../../entities/dock";
import { DocksRepository } from "../docks-repository";
import { prisma } from "../../lib/prisma";

export class PrismaDocksRepository implements DocksRepository {

    async findById(id: string): Promise<Dock | null> {
        return await prisma.dock.findUnique({ where: { id } });
    }

    async findByCode(code: string): Promise<Dock | null> {
        return await prisma.dock.findUnique({ where: { code } });
    }

    async findMany(): Promise<Dock[]> {
        return await prisma.dock.findMany({ orderBy: { code: 'asc' } })
    }

    async create(data: DockCreateInput): Promise<Dock> {
        return await prisma.dock.create({
            data,
        });
    }

    async updateStatus(id: string, status: DockStatus): Promise<Dock> {
        return await prisma.dock.update({
            where: { id },
            data: { status },
        });
    }
}
