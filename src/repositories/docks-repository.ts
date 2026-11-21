import { Dock } from "@prisma/client";
import { DockCreateInput } from "../entities/dock";

export interface DocksRepository {
    findById(id: String): Promise<Dock>;
    findByCode(code: String): Promise<Dock>
    findMany(): Promise<Dock>;
    create(data: DockCreateInput): Promise<Dock>;
}
